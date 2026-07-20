/* eslint-disable */
import $ from "jquery";

async function ajaxToRouter(method, url, data) {
    return new Promise((resolve) => {
        $.ajax({
            type: method,
            url: url,
            headers: {
                "Content-Type": "application/json",
            },
            Accept: "application/json",
            dataType: "text",
            data: JSON.stringify(data),
            success: function (result) {
                resolve(JSON.parse(result));
            },
            error: function (request, status, error) {
                console.log(error);
            },
        });
    });
}

async function getStatus(window, apolloOption, userId) {
    return await ajaxToRouter(
        "post",
        `${window.location.protocol}//${window.location.hostname}:${apolloOption.server_port}/restapi/mrp/working_status`,
        {
            userId: userId,
        },
    );
}

let intervalId = new Array();

async function getMrpWorkingStatus(window, apolloOption, userInfoForAuth) {
    let userId = userInfoForAuth.userId;

    $(".workingMrpIcon").css("display", "flex");

    intervalId.push(
        setInterval(async () => {
            try {
                const result = await getStatus(window, apolloOption, userId);

                if (result == false) {
                    intervalId.forEach((interval) => clearInterval(interval));
                    $(".workingMrpIcon").css("display", "none");

                    sendReloadDataMessage();

                    setTimeout(() => {
                        sendReloadDataMessage();
                    }, 5000);
                }
            } catch (error) {
                console.error("Error fetching status:", error);
            }
        }, 5000),
    ); // 5초마다 실행
}

function sendReloadDataMessage() {
    const targetIframes = Array.from(document.querySelectorAll("iframe"));
    const targetIframe = targetIframes.find(
        (iframe) =>
            iframe.src.includes("S030513_MRP_LIST") &&
            iframe.src.includes("label=MRP_LIST"),
    );

    if (targetIframe && targetIframe.contentWindow) {
        const iframeOrigin = new URL(targetIframe.src).origin;
        targetIframe.contentWindow.postMessage("ReloadData", iframeOrigin);
        console.log(`ReloadData 메시지를 보냈습니다: ${iframeOrigin}`);
    } else {
        console.warn("대상 iframe을 찾을 수 없습니다.");
    }
}

export { getMrpWorkingStatus };
