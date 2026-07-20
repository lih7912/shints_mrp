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
                console.log(result);
                resolve(JSON.parse(result));
            },
            error: function (request, status, error) {
                console.log(error);
            },
        });
    });
}

async function loginRecord(window, apolloOption, userId) {
    return await ajaxToRouter(
        "post",
        `${window.location.protocol}//${window.location.hostname}:${apolloOption.server_port}/restapi/login_record`,
        {
            userId: userId,
        },
    );
}

export { loginRecord };
