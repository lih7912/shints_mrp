const http = require('http');
const https = require('https');
const { execFile } = require('child_process');
const moment = require('moment-timezone');

const monitorPort = 3202;
const monitorUrls = (
    `https://127.0.0.1:${monitorPort}/restapi/ha-monitor,https://127.0.0.1:3311/restapi/ha-monitor`
)
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean)
    .map((url) => new URL(url));
const monitorIntervalMs = 30000;
const monitorTimeoutMs = 5000;
const failureThreshold = 1;
const restartCooldownMs = 300000;
const restartTargets = 'server,addon,client,menu,httpsProxyClient,httpsProxyMenu'
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean);

let consecutiveFailures = 0;
let restartInProgress = false;
let restartCooldownUntil = 0;
const preRestartKillCommands = [
    `pids=$(pgrep -af node | grep -v "ha_monitor.ts" | grep -v "ha:monitor" | awk '{print $1}' | grep -vx "${process.pid}" || true); if [ -n "$pids" ]; then kill -9 $pids; fi`,
];

function nowLabel() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

function sleep(ms) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function runShellCommand(command: string) {
    return new Promise<void>((resolve) => {
        execFile(
            'bash',
            ['-lc', command],
            { timeout: 10000 },
            (error, stdout, stderr) => {
                if (stdout) {
                    process.stdout.write(stdout);
                }
                if (stderr) {
                    process.stderr.write(stderr);
                }
                if (error) {
                    console.warn(
                        `[${nowLabel()}] [haMonitor] pre-restart command failed (continuing): ${command}`,
                    );
                }
                resolve();
            },
        );
    });
}

function restartServer(reason) {
    return new Promise<void>((resolve) => {
        const doRestart = () => {
            let pending = restartTargets.length;
            for (const target of restartTargets) {
                execFile('pm2', ['restart', target], (error, stdout, stderr) => {
                    if (stdout) {
                        process.stdout.write(stdout);
                    }
                    if (stderr) {
                        process.stderr.write(stderr);
                    }
                    if (error) {
                        console.error(
                            `[${nowLabel()}] [haMonitor] pm2 restart failed for '${target}':`,
                            error,
                        );
                    }

                    pending -= 1;
                    if (pending === 0) {
                        restartCooldownUntil = Date.now() + restartCooldownMs;
                        restartInProgress = false;
                        resolve();
                    }
                });
            }
        };

        if (restartInProgress) {
            resolve();
            return;
        }

        if (Date.now() < restartCooldownUntil) {
            console.log(
                `[${nowLabel()}] [haMonitor] restart cooldown active, skip restart: ${reason}`,
            );
            resolve();
            return;
        }

        restartInProgress = true;
        console.warn(
            `[${nowLabel()}] [haMonitor] restarting pm2 targets [${restartTargets.join(', ')}] because: ${reason}`,
        );

        if (restartTargets.length === 0) {
            console.error(
                `[${nowLabel()}] [haMonitor] no pm2 targets configured; set HA_MONITOR_PM2_TARGETS`,
            );
            restartCooldownUntil = Date.now() + restartCooldownMs;
            restartInProgress = false;
            resolve();
            return;
        }

        (async () => {
            for (const command of preRestartKillCommands) {
                await runShellCommand(`${command} >/dev/null 2>&1 || true`);
            }
            doRestart();
        })();
    });
}

function checkUrl(monitorUrl) {
    return new Promise<void>((resolve, reject) => {
        const client = monitorUrl.protocol === 'http:' ? http : https;
        const request = client.request(
            {
                hostname: monitorUrl.hostname,
                port: monitorUrl.port,
                path: `${monitorUrl.pathname}${monitorUrl.search}`,
                method: 'GET',
                rejectUnauthorized: false,
            },
            (response) => {
                const chunks: Buffer[] = [];

                response.on('data', (chunk) => chunks.push(chunk));
                response.on('end', () => {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
                        resolve();
                        return;
                    }

                    reject(
                        new Error(
                            `[${monitorUrl.toString()}] unexpected status ${response.statusCode}: ${Buffer.concat(chunks).toString('utf8')}`,
                        ),
                    );
                });
            },
        );

        request.setTimeout(monitorTimeoutMs, () => {
            request.destroy(
                new Error(
                    `[${monitorUrl.toString()}] timeout after ${monitorTimeoutMs}ms`,
                ),
            );
        });

        request.on('error', reject);
        request.end();
    });
}

async function checkServer() {
    if (monitorUrls.length === 0) {
        throw new Error('No monitor URL configured');
    }

    for (const monitorUrl of monitorUrls) {
        await checkUrl(monitorUrl);
    }
}

async function loop() {
    while (true) {
        try {
            await checkServer();
            if (consecutiveFailures > 0) {
                console.log(
                    `[${nowLabel()}] [haMonitor] server recovered after ${consecutiveFailures} failure(s)`,
                );
            }
            consecutiveFailures = 0;
        } catch (error) {
            consecutiveFailures += 1;
            console.warn(
                `[${nowLabel()}] [haMonitor] check failed (${consecutiveFailures}/${failureThreshold}):`,
                error,
            );

            if (consecutiveFailures >= failureThreshold) {
                await restartServer(String(error));
                consecutiveFailures = 0;
                console.log(
                    `[${nowLabel()}] [haMonitor] waiting ${restartCooldownMs / 1000}s after restart...`,
                );
                await sleep(restartCooldownMs);
                continue;
            }
        }

        await sleep(monitorIntervalMs);
    }
}

console.log(
    `[${nowLabel()}] [haMonitor] watching [${monitorUrls.map((url) => url.toString()).join(', ')}] every ${monitorIntervalMs}ms with timeout ${monitorTimeoutMs}ms; restart targets [${restartTargets.join(', ')}]`,
);

loop().catch((error) => {
    console.error(`[${nowLabel()}] [haMonitor] fatal error:`, error);
    process.exit(1);
});