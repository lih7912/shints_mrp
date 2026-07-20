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

async function getAuthBasicInfo() {
    return await ajaxToRouter(
        "post",
        `${window.location.protocol}//${window.location.hostname}:3202/restapi/auth/basic_info`,
        {},
    );
}

async function getAuthList(partName, userId, userName) {
    return await ajaxToRouter(
        "post",
        `${window.location.protocol}//${window.location.hostname}:3202/restapi/auth/list`,
        {
            partName,
            userId,
            userName,
        },
    );
}

async function updateAuth(editMode, menuName, target, authCd) {
    console.log({
        editMode,
        menuName,
        target,
        authCd,
    });

    return await ajaxToRouter(
        "post",
        `${window.location.protocol}//${window.location.hostname}:3202/restapi/auth/update`,
        {
            editMode,
            menuName,
            target,
            authCd,
        },
    );
}

$(document).ready(async function () {
    for (let i = 0; i < 100; i++) {
        history.pushState({}, "", generateUUID());
    }

    toastr.options = {
        closeButton: false,
        newestOnTop: true,
        progressBar: true,
        showDuration: "100",
        hideDuration: "1000",
        timeOut: "2500",
    };

    // 포커스 이벤트 핸들러
    $("#departmentFilter, #departmentSelect").on("focus", function () {
        clearAndDisable(
            "#userIdFilter, #userIdSelect, #userIdSearchBtn, #nameFilter, #nameSelect, #nameSearchBtn",
        );
    });

    $("#userIdFilter, #userIdSelect").on("focus", function () {
        clearAndDisable(
            "#departmentFilter, #departmentSelect, #departmentSearchBtn, #nameFilter, #nameSelect, #nameSearchBtn",
        );
    });

    $("#nameFilter, #nameSelect").on("focus", function () {
        clearAndDisable(
            "#departmentFilter, #departmentSelect, #departmentSearchBtn, #userIdFilter, #userIdSelect, #userIdSearchBtn",
        );
    });

    // 다른 곳 클릭 시 다시 활성화
    $(document).on("click", function (event) {
        if (!$(event.target).closest(".mb-3").length) {
            $(
                "#departmentFilter, #departmentSelect, #departmentSearchBtn, #userIdFilter, #userIdSelect, #userIdSearchBtn, #nameFilter, #nameSelect, #nameSearchBtn",
            ).prop("disabled", false);
        }
    });

    // 필드 및 버튼 비우고 비활성화
    function clearAndDisable(selector) {
        $(selector).each(function () {
            if ($(this).is("input")) {
                $(this).val(""); // 입력 필드 초기화
            } else if ($(this).is("select")) {
                $(this).prop("selectedIndex", 0); // SELECT 초기화
            }
            $(this).prop("disabled", true); // 비활성화
        });
    }

    $("#departmentSelect").children().remove();
    $("#userIdSelect").children().remove();
    $("#nameSelect").children().remove();

    let authBasicInfo = await getAuthBasicInfo();

    //console.log(authBasicInfo);

    $("#departmentSelect").append(
        `<option value="">부서를 선택하세요.</option>`,
    );
    for (let part of authBasicInfo.partCdList) {
        $("#departmentSelect").append(
            `<option value="${part.part_cd}">${part.part_name}(${part.part_cd})</option>`,
        );
    }

    $("#userIdSelect").append(
        `<option value="">USER ID를 선택하세요.</option>`,
    );
    for (let id of authBasicInfo.userIdList) {
        $("#userIdSelect").append(
            `<option value="${id.user_id}">${id.user_id} (${id.part}-${id.cd_name})</option>`,
        );
    }

    $("#nameSelect").append(
        `<option value="">사용자 이름을 선택하세요.</option>`,
    );
    for (let name of authBasicInfo.userNameList) {
        $("#nameSelect").append(
            `<option value="${name.user_name}">${name.user_name} (${name.part}-${name.cd_name})</option>`,
        );
    }
});

// 초기화 버튼 클릭 시 페이지 리로드
$("#resetBtn").on("click", function () {
    location.href = "/authority.html";
});

// 검색 버튼 이벤트 핸들러 (예제)
$("#departmentSearchBtn").on("click", async function () {
    let authList = await getAuthList($("#departmentSelect").val(), null, null);
    setAuthTable(authList, "part", $("#departmentSelect").val());
});
$("#userIdSearchBtn").on("click", async function () {
    let authList = await getAuthList(null, $("#userIdSelect").val(), null);
    setAuthTable(authList, "userId", $("#userIdSelect").val());
});
$("#nameSearchBtn").on("click", async function () {
    let authList = await getAuthList(null, null, $("#nameSelect").val());
    setAuthTable(authList, "userName", $("#nameSelect").val());
});

function setAuthTable(authList, editMode, target) {
    $("#authTable tbody").children().remove();

    //console.log(authList);

    for (let menu of authList) {
        let auth = menu.AUTH_CD;
        let read = "";
        let write = "";

        if (auth == 1) {
            read = "checked";
        }

        if (auth == 2) {
            read = "checked";
            write = "checked";
        }

        $("#authTable tbody")
            .append(
                `<tr>
                <td>${menu.menu_name}</td>
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input large-switch r" type="checkbox" ${read} onChange='setAuth(this, "r", "${editMode}", "${target}");'>
                            <span>읽기</span>
                        </input>
                    </div>
                </td>
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input large-switch rw" type="checkbox" ${write} onChange='setAuth(this, "rw", "${editMode}", "${target}");'>
                            <span>쓰기</span>
                        </input>
                    </div>
                </td>
            </tr>`,
            )
            .closest("tbody")
            .find("tr")
            .last()
            .data("authInfo", menu);
    }
}

async function setAuth(element, type, editMode, target) {
    // 이벤트가 발생한 input의 부모 tr 찾기
    const $row = $(element).closest("tr");

    // tr에 저장된 authInfo 데이터 가져오기
    const authInfo = $row.data("authInfo");

    console.log("Auth Info:", authInfo);

    // 권한 변경 처리
    if (type === "r") {
        console.log(`읽기 권한 변경: ${$(element).is(":checked")}`);
        $row.find(".rw").prop("checked", false);
    } else if (type === "rw") {
        console.log(`쓰기 권한 변경: ${$(element).is(":checked")}`);
        $row.find(".r").prop("checked", true);
    }

    let authCd = 0;
    if ($row.find(".r").prop("checked")) {
        authCd = 1;
    }
    if ($row.find(".rw").prop("checked")) {
        authCd = 2;
    }

    if (editMode == "part") {
        target = authInfo.part_cd;
    }

    await updateAuth(editMode, authInfo.menu_name, target, authCd);
    toastr.success("저장되었습니다.");
}

function generateUUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16),
    );
}
