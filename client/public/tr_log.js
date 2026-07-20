let currentDate = moment(); // 현재 날짜 저장

let currentPage = 1;
let isLoading = false;
let hasMoreData = true;

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

async function getBasicInfo(userId, menuCode, searchDate, keyword, seq, page) {
    return await ajaxToRouter(
        "post",
        `${window.location.protocol}//${window.location.hostname}:3202/restapi/tr_log/basic_info`,
        { userId, menuCode, searchDate, keyword, seq, page },
    );
}

async function getQuery(seq) {
    return await ajaxToRouter(
        "post",
        `${window.location.protocol}//${window.location.hostname}:3202/restapi/tr_log/query`,
        { seq },
    );
}

function setLoading(isVisible) {
    if (isVisible) {
        $("#loadingOverlay").show();
    } else {
        $("#loadingOverlay").hide();
    }
}

async function setTable(reset = true) {
    console.log("setTable called", reset, currentPage);
    if (isLoading) return;

    isLoading = true;
    setLoading(true);

    try {
        if (reset) {
            currentPage = 1;
            hasMoreData = true;
            $("#logTable tbody").empty();
        }

        if (!hasMoreData) {
            return;
        }

        let userId = $("#userId").val() || "";
        let menuCode = $("#menuCode").val() || "";
        let searchDate = $("#current-date").val();
        let keyword = $("#keyword").val() || "";
        let seq = $("#seq").val() || "";

        console.log("request page:", currentPage);
        let logList = await getBasicInfo(
            userId,
            menuCode,
            searchDate,
            keyword,
            seq,
            currentPage,
        );
        console.log("page:", currentPage);
        console.log("result length:", logList.length);

        if (seq) {
            hasMoreData = false;
        } else if (logList.length < 1000) {
            hasMoreData = false;
        }

        for (let log of logList) {
            let isMgrMenu = String(log.menu_code || "")
                .toLowerCase()
                .startsWith("mgr");
            let rowStyle = "";

            if (log.src.includes("ERROR")) {
                rowStyle = "background-color: pink;";
            } else if (isMgrMenu) {
                rowStyle = "background-color: #e6f7e6;";
            }

            $("#logTable tbody")
                .append(
                    `<tr onclick="showQuery(this)" class="logtableRow"
                    style="${rowStyle}">
                    <td>${log.user_id}</td>
                    <td>${log.timestamp}</td>
                    <td>${log.menu_code}</td>
                    <td>${log.src}</td>
                    <td>${log.transaction_seq}</td>
                </tr>`,
                )
                .closest("tbody")
                .find("tr")
                .last()
                .data("log", log);
        }

        currentPage++;
    } finally {
        isLoading = false;
        setLoading(false);
    }
}

async function showQuery(row) {
    let seq = $(row).data("log").transaction_seq;
    let queryContents = (await getQuery(seq))[0].query;
    let keyword = $("#keyword").val() || "";
    $("#queryArea").text(queryContents);

    $("tbody tr").removeClass("selected"); // 기존 선택된 행 제거
    $(row).addClass("selected"); // 클릭한 행에 클래스 추가

    if (Prism.languages.sql["custom-value"]) {
        delete Prism.languages.sql["custom-value"];
    }

    if (keyword) {
        let regexPattern = new RegExp(`.*${keyword}.*`, "gi");
        Prism.languages.insertBefore("sql", "string", {
            "custom-value": {
                pattern: regexPattern,
                alias: "important",
            },
        });
    }

    Prism.highlightAll();
}

function updateDateDisplay() {
    $("#current-date").val(currentDate.format("YYYY-MM-DD"));
}

$(document).ready(async function () {
    for (let i = 0; i < 100; i++) {
        history.pushState({}, "", generateUUID());
    }

    // 페이지 로드시 현재 날짜 표시
    updateDateDisplay();

    await setTable();
});

$("#current-date").on("change", function () {
    let selectedDate = $(this).val();

    if (selectedDate) {
        currentDate = moment(selectedDate, "YYYY-MM-DD");
    }
    setTable();
});

$("#clear-date").on("click", function () {
    $("#current-date").val("");
    setTable();
});

// 선택된 행을 이동하는 기능 추가
$(document).keydown(function (e) {
    let selectedRow = $("tbody tr.selected");

    if (selectedRow.length === 0) {
        return; // 선택된 행이 없으면 아무 작업도 하지 않음
    }

    let nextRow;
    if (e.key === "ArrowUp") {
        nextRow = selectedRow.prev("tr");
    } else if (e.key === "ArrowDown") {
        nextRow = selectedRow.next("tr");
    }

    if (nextRow && nextRow.length > 0) {
        selectedRow.removeClass("selected"); // 기존 선택 해제
        nextRow.addClass("selected"); // 새로운 행 선택
        showQuery(nextRow[0]); // showQuery 실행
    }
});

function generateUUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16),
    );
}

$(document).ready(function () {
    function toggleFilterVisibilityBySeq() {
        if ($("#seq").val().trim()) {
            $(".basic-filter-item").hide();
            $("#userId, #menuCode, #keyword").val("");
        } else {
            $(".basic-filter-item").show();
        }
    }

    // SEQ 입력 시 USER/MENU/KEYWORD 숨김 처리
    $("#seq").on("input", toggleFilterVisibilityBySeq);

    toggleFilterVisibilityBySeq();

    $("#logScrollArea").on("scroll", async function () {
        console.log("scroll");

        const scrollBottom =
            this.scrollHeight - this.scrollTop - this.clientHeight;

        if (scrollBottom < 30) {
            console.log("LOAD NEXT PAGE");
            await setTable(false);
        }
    });
});
