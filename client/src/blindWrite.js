/* eslint-disable */
import $ from "jquery";
import { use } from "react";

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

async function getAuthInfo(window, apolloOption, userId, label) {
    return await ajaxToRouter(
        "post",
        `${window.location.protocol}//${window.location.hostname}:${apolloOption.server_port}/restapi/auth`,
        {
            userId: userId,
            authCd: -1,
            menuName: label,
        },
    );
}

async function getRank(window, apolloOption, userId) {
    return await ajaxToRouter(
        "post",
        `${window.location.protocol}//${window.location.hostname}:${apolloOption.server_port}/restapi/auth/user_info`,
        {
            userId: userId,
        },
    );
}

function allBlind() {
    let buttonList = $("button");
    buttonList.each((index, button) => {
        $(button).prop("disabled", true);
    });

    // MRP MANAGER 작업상태 초기화버튼 지우기(관리자만 보이게)
    $('[aria-label="Work Status Initialize"]').remove();
}

function allOpen() {
    let buttonList = $("button");
    buttonList.each((index, button) => {
        $(button).prop("disabled", false);
    });
}

// 특별하게 버튼을 켜고 끄는 함수(ex: OVER/SHORTAGE END권한)
function applySpecialAuthBtn(userId, level, part, location) {
    const isSMDPart =
        part === "S01" ||
        part === "S02" ||
        part === "S03" ||
        part === "S04" ||
        part === "S05" ||
        part === "S06";

    // ID Trade1(한국 무역팀), Garment Ship, Regist 권한
    if (userId === "trade1") {
        if (location.includes("S0513_SHIPPING_LIST")) {
            $('[aria-label="Regist"]').attr("disabled", false);
            $('[aria-label="Excel"]').attr("disabled", false);
        }
        if (location.includes("S051301_SHIPPING_REGIST")) {
            $("button").attr("disabled", false);
        }
    }

    if (location.includes("S0215_ORDER_STATUS_SHORTAGE")) {
        $('[aria-label="SHINTS End"]').attr("disabled", true);

        if (userId === "jhoen")
            $('[aria-label="SHINTS End"]').attr("disabled", false);
    }

    // 'Capa Record','Capa List' 강제로 대표아이디에게 열어주기
    if (
        userId === "kr" ||
        userId === "mt" ||
        userId === "sales1" ||
        userId === "sales2" ||
        userId === "sales3" ||
        userId === "sales4" ||
        userId === "sales5"
    ) {
        if (
            location.includes("S0208_CAPABOOK_RECORD_BVT") ||
            location.includes("S0209_CAPABOOK_LIST_BVT")
        ) {
            allOpen();
        }
    }

    if (location.includes("S0209_CAPABOOK_LIST_BVT")) {
        if (userId !== "eugene" && userId !== "ciara" && userId !== "jhoen")
            $("#isAll").closest(".af-span-3-0").remove();
    }

    if (location.includes("S0513_SHIPPING_LIST")) {
        if (userId === "lucky1") {
            allOpen();
        }
    }

    // STOCK RECORD
    if (location.includes("S0521")) {
        if (userId === "mira" || userId === "khe" || userId === "minsun") {
            allOpen();
        }
    }

    // STOCK MANAGER
    if (location.includes("S0523")) {
        if (userId === "mira" || userId === "khe" || userId === "minsun") {
            allOpen();
        }
    }

    if (location.includes("S030304_ADD_SEQ_MRP_BY_ORDER")) {
        allOpen();
    }

    // 자재팀 Shipment Manager - Freight regist / Shipment regist 활성
    if (location.includes("S0434_SHIPMENT_MANAGER") &&
            (part === "S11" || userId === 'merry' || userId === 'haipt' || userId === 'tham')
        ) {
        $('[aria-label="Freight Regist"]').attr("disabled", false);
        $('[aria-label="Shipment Regist"]').attr("disabled", false);
        $('[aria-label="Freight Regist"]').attr("disabled", false);
        $('[aria-label="Shipment Regist"]').attr("disabled", false);
    }

    // S0801 국내매출 전표등록/취소 - 재경팀(AC)만 활성화
    if (part !== "AC" && location.includes("S0801_DOCU_REGIST_DOMESTIC")) {
        $('[aria-label="전표등록"]').attr("disabled", false);
        $('[aria-label="전표취소"]').attr("disabled", false);
    }

    if (location.includes("MRP Manager")) {
        $('[aria-label="MRP Pack Down"]').attr("disabled", false);
        $('[aria-label="MRP List"]').attr("disabled", false);
        $('[aria-label="PO List"]').attr("disabled", false);
    }

    if (location.includes("S0113_KCD_BUYER")) {
        if (userId === "mira" || userId === "khe" || userId === "minsun") {
            allOpen();
        }
    }

    if (isSMDPart && location.includes("S0301_MATL_RECORD")) {
        $('[aria-label="Insert(F2)"]').attr("disabled", false);
        $('[aria-label="Copy(F5)"]').attr("disabled", false);
    }

    if (location.includes("S0703_DEBIT_NOTE_FACTORY_BVT")) {
        let userIdList = ["jhoen", "ciara", "jake", "ken", "andrew", "oliver"]; // 팀장
        if (!userIdList.includes(userId)) {
            $('[aria-label="Confirm"]').attr("disabled", true);
        }
    }

    if (location.includes("S0433_SHIPMENT_REGIST")) {
        if (
                part !== "07" &&
                part !== "S11" &&
                part !== "VPUR" &&
                part !== "VFP" &&
                part !== "VM" &&
                userId !== "bvt011" &&
                userId !== "haipt" &&
                userId !== "merry" &&
                userId !== "tham"
        ) // 수출입업무팀, 자재팀, VPUR, VFP, VM 아니면
        {
            $('[aria-label="Ship Regist"').attr("disabled", true);
        }
    }

    if (location.includes("S043401_SHIPMENT_INFO")) {
        if (
                part !== "07" &&
                part !== "S11" &&
                part !== "VPUR" &&
                part !== "VFP" &&
                part !== "VM" &&
                userId !== "bvt011" &&
                userId !== "haipt" &&
                userId !== "merry"
        ) // 수출입업무팀, 자재팀, VPUR, VFP, VM 아니면
        {
            $('[aria-label="Ship Delete"').attr("disabled", true);
        }
    }

    if (location.includes("S0517_STOCK_HISTORY")) {
        if (userId !== "mira" && userId !== "oanh" && userId !== "kevin1" && part !== 'M03') {
            $('[aria-label="Qty Update"]').attr("disabled", true);
        }
    }

    // End 재경팀
    // Cancel 재경팀
    if (location.includes("S0702_DEBIT_NOTE")) {
        if (part !== "AC") {
            $('[aria-label="Cancel"]').attr("disabled", true);
            $('[aria-label="End"]').attr("disabled", true);
        }
    }

    // End 재경팀
    // Cancel 재경팀
    if (location.includes("S0701_CREDIT_NOTE")) {
        if (part !== "AC") {
            $('[aria-label="Cancel"]').attr("disabled", true);
            $('[aria-label="End"]').attr("disabled", true);
        }
    }
}

function getLabelFromUrl() {
    const currentUrl = window.location.href; // 현재 URL 전체 가져오기
    const queryStart = currentUrl.lastIndexOf("?"); // '?' 위치 확인

    if (queryStart === -1) {
        console.log("쿼리 파라미터가 없습니다.");
        return null; // 쿼리 파라미터가 없는 경우
    }

    const queryString = currentUrl.substring(queryStart + 1); // '?' 이후의 문자열 가져오기

    const queryParams = queryString.split("&"); // '&'로 구분하여 파라미터 배열 생성

    // label 값 찾기
    for (const param of queryParams) {
        let [key, value] = param.split("="); // 키와 값 분리
        if (key === "label") {
            if (value.includes("Deposit")) value = "Deposit & L/C List";

            return decodeURIComponent(value); // URL 디코딩하여 반환
        }
    }

    console.log("label 파라미터를 찾을 수 없습니다.");
    return null; // label 파라미터가 없는 경우
}

async function blindWrite(window, apolloOption, userId) {
    if (window.location.href.includes("login")) {
        return;
    }

    if (
        userId === "lih7912" ||
        userId === "chibumy" ||
        userId === "lkj83" ||
        userId === "haein" ||
        userId === "bell1" ||
        userId === "mila" ||
        userId === "won21kr" ||
        userId.includes("test") ||
        userId === "brandon" ||
        userId === "kevin1"
    )
        return;

    if (window.location.href.split("?").length == 1) {
        allBlind();
        return;
    }

    let label = decodeURI(getLabelFromUrl(window));
    let authInfoList = await getAuthInfo(window, apolloOption, userId, label);
    let authInfo = authInfoList.afAuthPart;
    let authInfoUser = authInfoList.afAuthUser;
    let level = (await getRank(window, apolloOption, userId))[0].USER_LEVEL;
    let part = (await getRank(window, apolloOption, userId))[0].PART;


    // 부서별
    if (authInfo.length == 0) {
        allBlind();
    } else {
        if (authInfo[authInfo.length - 1].AUTH_CD == 0) {
            allBlind();
        } else if (authInfo[authInfo.length - 1].AUTH_CD == 1) {
            allBlind();

            let buttonList = $("button");
            buttonList.each((index, button) => {
                let label = $($(button).find(".p-button-label")[0]).text();

                if (
                    label.includes("Search") ||
                    label.includes("조회") ||
                    label.includes("Excel") ||
                    label.includes("Reset") ||
                    $(button).hasClass("green") ||
                    $(button).hasClass("orange")
                ) {
                    $(button).prop("disabled", false);
                }
            });
        } else {
            allOpen();
        }
    }

    if (authInfoUser.length) {
        console.log(authInfoUser);
        if (authInfoUser[0].AUTH_CD === 2) {
            allOpen();
        } else if (authInfoUser[0].AUTH_CD === 1) {
            allBlind();

            let buttonList = $("button");
            buttonList.each((index, button) => {
                let label = $($(button).find(".p-button-label")[0]).text();

                if (
                    label.includes("Search") ||
                    label.includes("조회") ||
                    label.includes("Excel") ||
                    label.includes("Reset") ||
                    $(button).hasClass("green") ||
                    $(button).hasClass("orange")
                ) {
                    $(button).prop("disabled", false);
                }
            });
        } else {
            allBlind();
        }
    }

    // 특별하게 버튼을 켜고 끄는 함수(ex: OVER/SHORTAGE END권한)
    applySpecialAuthBtn(userId, level, part, window.location.href);

    // 녹색버튼 모두 비활성화 (Order Manager만 켜둠)
    /*
    if (window.location.href.includes('S0204_ORDER_LIST')) {
        let buttonList = $('.green');
        buttonList.each( (index, button) => {
            $(button).prop('disabled', true);
        });
    }
    */
}
export { blindWrite };
