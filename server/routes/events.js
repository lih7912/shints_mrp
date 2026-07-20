const router = require('express').Router;
const events = router();
const clients = new Set();

const DEFAULT_MESSAGE =
    '개발팀이 수정내용을 5분안에 반영합니다.\n서버가 재시작되면 화면의 내용을 잃을 수 있고\n잠시 작동이 멈출 수 있습니다.\n\nDevelopment team will reflect the changes within 5 minutes.\nWhen the server restarts, you may lose the content on the screen and it may stop working for a while.';

function broadcast(payload) {
    const data = `data: ${JSON.stringify(payload)}\n\n`;
    const deadClients = [];
    for (const client of clients) {
        if (!client.writableEnded && !client.destroyed) {
            client.write(data);
        } else {
            deadClients.push(client);
        }
    }
    deadClients.forEach(client => clients.delete(client));
}

events.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (typeof res.flushHeaders === 'function') {
        res.flushHeaders();
    }

    res.write('retry: 5000\n\n');
    clients.add(res);
    console.log(`[SSE] Client connected. Total clients: ${clients.size}`);

    const heartbeatId = setInterval(() => {
        if (!res.writableEnded && !res.destroyed) {
            res.write(': keepalive\n\n');
        }
    }, 20000);

    req.on('close', () => {
        clients.delete(res);
        clearInterval(heartbeatId);
        console.log(`[SSE] Client disconnected. Total clients: ${clients.size}`);
    });
    
    res.on('error', (err) => {
        clients.delete(res);
        clearInterval(heartbeatId);
        console.error(`[SSE] Stream error:`, err.message);
    });
});

events.post('/events/send', (req, res) => {
    const rawMessage =
        req.body && typeof req.body.message === 'string' ? req.body.message : '';
    const message = rawMessage.trim() || DEFAULT_MESSAGE;
    const payload = {
        msg: message,
        timestamp: new Date().toISOString(),
    };

    broadcast(payload);

    res.send({
        ok: true,
        sent: clients.size,
        msg: message,
    });
});

module.exports = events;