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

async function changePassword(
    window,
    apolloOption,
    userId,
    newPassword,
    currentPassword,
) {
    return await ajaxToRouter(
        "post",
        `${window.location.protocol}//${window.location.hostname}:${apolloOption.server_port}/restapi/change_password`,
        {
            userId: userId,
            newPassword: newPassword,
            currentPassword: currentPassword,
        },
    );
}

async function getPassword(window, apolloOption, userId) {
    return await ajaxToRouter(
        "post",
        `${window.location.protocol}//${window.location.hostname}:${apolloOption.server_port}/restapi/get_password`,
        {
            userId: userId,
        },
    );
}
export { changePassword, getPassword };
