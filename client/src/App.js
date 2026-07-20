/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Route, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import apolloOption from "./assets/env_graphql";

window.nativeAlert = window.alert;
window.nativeConfirm = window.confirm;
window.nativePrompt = window.prompt;
import {
    customAlert,
    customConfirm,
    customPrompt,
} from "./components/customConfirm";
window.alert = customAlert;
window.confirm = customConfirm;
window.prompt = customPrompt;

import S0000_LOGIN from "./pages/S0000_LOGIN";
//import APP_MAIN from './AppMain';
import S0101_KCD_FACTORY from "./pages/S0101_KCD_FACTORY";
import S0113_KCD_BUYER from "./pages/S0113_KCD_BUYER";
import S0114_KCD_SUPPLIER from "./pages/S0114_KCD_SUPPLIER";
import S0107_KCD_SIZEMST from "./pages/S0107_KCD_SIZEMST";
import S0110_KCD_BANK_QRY from "./pages/S0110_KCD_BANK_QRY";
import S0104_KCD_NATION from "./pages/S0104_KCD_NATION";
import S0105_KCD_HSCODE from "./pages/S0105_KCD_HSCODE";
import S0108_KCD_PLACE from "./pages/S0108_KCD_PLACE";
import S0111_KCD_USER from "./pages/S0111_KCD_USER";
import S0112_KCD_CURRENCY from "./pages/S0112_KCD_CURRENCY";
import S0200_KCD_STYLE from "./pages/S0200_KCD_STYLE";
import S0202_STYLE_COST from "./pages/S0202_STYLE_COST";
import S0203_SAMPLE_COST from "./pages/S0203_SAMPLE_COST";
import S020401_ORDER_INFO from "./pages/S020401_ORDER_INFO";
import S0204_ORDER_LIST from "./pages/S0204_ORDER_LIST";
import S0205_PI_MANAGER from "./pages/S0205_PI_MANAGER";
import S020602_ORDER_REG from "./pages/S020602_ORDER_REG";
import S020701_PO_MANAGER from "./pages/S020701_PO_MANAGER";
import S0208_CAPABOOK_RECORD_BVT from "./pages/S0208_CAPABOOK_RECORD_BVT";
import S0209_CAPABOOK_LIST_BVT from "./pages/S0209_CAPABOOK_LIST_BVT";
import S0212_NEGO_CMPT from "./pages/S0212_NEGO_CMPT";
import S0213_ORDER_REPORT from "./pages/S0213_ORDER_REPORT";
import S0214_ORDER_STATUS_BEFORE_AFTER_CHECK from "./pages/S0214_ORDER_STATUS_BEFORE_AFTER_CHECK";
import S0215_ORDER_STATUS_SHORTAGE from "./pages/S0215_ORDER_STATUS_SHORTAGE";
import S0216_SALES_MATL_PLAN_QRY from "./pages/S0216_SALES_MATL_PLAN_QRY";
import S0217_SALES_MATL_PLAN_LIST from "./pages/S0217_SALES_MATL_PLAN_LIST";
import S0218_EXCHANGE_RATE_RECORD from "./pages/S0218_EXCHANGE_RATE_RECORD";
import S0301_MATL_RECORD from "./pages/S0301_MATL_RECORD";
import S0302_MATL_SEARCH from "./pages/S0302_MATL_SEARCH";
import S030301_COPY_PRODUCT from "./pages/S030301_COPY_PRODUCT";
import S030302_COPY_STYLE from "./pages/S030302_COPY_STYLE";
import S030303_MRP_BY_SEARCH from "./pages/S030303_MRP_BY_SEARCH";
import S030304_ADD_SEQ_MRP_BY_ORDER from "./pages/S030304_ADD_SEQ_MRP_BY_ORDER";
import S0303_MRP_RECORD_STYLE from "./pages/S0303_MRP_RECORD_STYLE";
import S0307_MRP_RECORD_STYLE from "./pages/S0307_MRP_RECORD_STYLE";
import S030501_DEL_MRP_PACK from "./pages/S030501_DEL_MRP_PACK";
import S030502_PO_HISTORY from "./pages/S030502_PO_HISTORY";
import S030503_STOCK_CHECK from "./pages/S030503_STOCK_CHECK";
import S030504_REVISE from "./pages/S030504_REVISE";
import S030505_PO_RECORD_MATL_ADD from "./pages/S030505_PO_RECORD_MATL_ADD";
import S030506_NEW_PO_SAMPLE from "./pages/S030506_NEW_PO_SAMPLE";
import S030507_NEW_PO_FACTORY_SAMPLE from "./pages/S030507_NEW_PO_FACTORY_SAMPLE";
import S030510_PO_MAKE_MRP from "./pages/S030510_PO_MAKE_MRP";
import S030512_PO_MAKE_MRP_FIRST from "./pages/S030512_PO_MAKE_MRP_FIRST";
import S030511_PO_HISTORY2 from "./pages/S030511_PO_HISTORY2";
import S030513_MRP_LIST from "./pages/S030513_MRP_LIST";
import S030514_PO_LIST from "./pages/S030514_PO_LIST";
import S030515_MRP_PACK from "./pages/S030515_MRP_PACK";
import S030516_MATERIAL_PO_LIST from "./pages/S030516_MATERIAL_PO_LIST";
import S0305_MRP_MANAGER from "./pages/S0305_MRP_MANAGER";
import S0306_MRP_BY_ORDER from "./pages/S0306_MRP_BY_ORDER";
import S030602_MRP_BY_ORDER_STYLE from "./pages/S030602_MRP_BY_ORDER_STYLE";
import S0401_PURCHASING_MANAGER from "./pages/S0401_PURCHASING_MANAGER";
import S040100_PUR_MONITOR from "./pages/S040100_PUR_MONITOR";
import S040101_PURCHASER_REG from "./pages/S040101_PURCHASER_REG";
import S040102_PURCHASER_INFO from "./pages/S040102_PURCHASER_INFO";
import S0439_LC_DEPOSIT from "./pages/S0439_LC_DEPOSIT";
import S040201_PO_INFO from "./pages/S040201_PO_INFO";
import S040202_ORDER_SHEET from "./pages/S040202_ORDER_SHEET";
import S0402_PO_LIST_NEW from "./pages/S0402_PO_LIST_NEW";
import S0403_MATL_PO_LIST from "./pages/S0403_MATL_PO_LIST";
import S0404_PO_LIST from "./pages/S0404_PO_LIST";
import S0405_PO_MRP_LIST from "./pages/S0405_PO_MRP_LIST";
import S0406_STSIN_RECORD from "./pages/S0406_STSIN_RECORD";
import S0430_STSIN_RECORD from "./pages/S0430_STSIN_RECORD";
import S043001_STSIN_LIST from "./pages/S043001_STSIN_LIST";
import S043002_STSIN_INFO from "./pages/S043002_STSIN_INFO";
import S0431_STSOUT_RECORD from "./pages/S0431_STSOUT_RECORD";
import S043101_STSOUT_LIST from "./pages/S043101_STSOUT_LIST";
import S0433_SHIPMENT_REGIST from "./pages/S0433_SHIPMENT_REGIST";
import S0434_SHIPMENT_MANAGER from "./pages/S0434_SHIPMENT_MANAGER";
import S0440_FREIGHT_REGIST from "./pages/S0440_FREIGHT_REGIST";
import S0435_SHIPPING_COST from "./pages/S0435_SHIPPING_COST";
import S0436_LOCAL_COST from "./pages/S0436_LOCAL_COST";
import S043401_SHIPMENT_INFO from "./pages/S043401_SHIPMENT_INFO";
import S0407_STSIN_DEPOSIT_LC from "./pages/S0407_STSIN_DEPOSIT_LC";
import S0408_MATL_PRICE_UPDATE from "./pages/S0408_MATL_PRICE_UPDATE";
import S0410_STSIN_INPUT_LIST from "./pages/S0410_STSIN_INPUT_LIST";
import S0411_STSOUT_RECORD from "./pages/S0411_STSOUT_RECORD";
import S041201_HIS_CODE_REMARK from "./pages/S041201_HIS_CODE_REMARK";
import S041202_CT_QTY_CHECK from "./pages/S041202_CT_QTY_CHECK";
import S041203_COMP_BIN from "./pages/S041203_COMP_BIN";
import S041204_OFFER_SPEC from "./pages/S041204_OFFER_SPEC";
import S041205_PACK_CONFIRM from "./pages/S041205_PACK_CONFIRM";
import S041206_SEA_FREIGHT from "./pages/S041206_SEA_FREIGHT";
import S0412_STSOUT_LIST from "./pages/S0412_STSOUT_LIST";
import S0413_INVOICE_REG_MATL from "./pages/S0413_INVOICE_REG_MATL";
import S0414_INVOICE_QRY_MATL from "./pages/S0414_INVOICE_QRY_MATL";
import S0416_MATL_DELAY_REPORT from "./pages/S0416_MATL_DELAY_REPORT";
import S0417_MATL_FREIGHT from "./pages/S0417_MATL_FREIGHT";
import S0419_ENDDING_MATL_AMT_DOMESTIC from "./pages/S0419_ENDDING_MATL_AMT_DOMESTIC";
import S0423_TAXBILL from "./pages/S0423_TAXBILL";
import S0437_EXPORT_REGIST from "./pages/S0437_EXPORT_REGIST";
import S0438_IMPORT_REGIST from "./pages/S0438_IMPORT_REGIST";
import S0450_DELAY_REPORT from "./pages/S0450_DELAY_REPORT";
import S0501_FACTORY_IO_MAIN from "./pages/S0501_FACTORY_IO_MAIN";
import S0504_FACTORY_INPUT_LIST from "./pages/S0504_FACTORY_INPUT_LIST";
import S0505_FACTORY_INPUT_RECORD from "./pages/S0505_FACTORY_INPUT_RECORD";
import S0506_FACTORY_OUTPUT_LIST from "./pages/S0506_FACTORY_OUTPUT_LIST";
import S0507_FACTORY_OUTPUT_RECORD from "./pages/S0507_FACTORY_OUTPUT_RECORD";
import S0508_CAPABOOK_LIST_BVT from "./pages/S0508_CAPABOOK_LIST_BVT";
import S0509_RETURN_MATL from "./pages/S0509_RETURN_MATL";
import S0511_STOCK_RECORD from "./pages/S0511_STOCK_RECORD";
import S051201_STOCK_QTY_UPDATE_LOG from "./pages/S051201_STOCK_QTY_UPDATE_LOG";
import S0512_STOCK_LIST from "./pages/S0512_STOCK_LIST";
import S0513_SHIPPING_LIST from "./pages/S0513_SHIPPING_LIST";
import S051301_SHIPPING_REGIST from "./pages/S051301_SHIPPING_REGIST";
import S0514_SHIPPING_REGIST_BVT_OLD from "./pages/S0514_SHIPPING_REGIST_BVT_OLD";
import S0516_STOCK_USE_CONFIRM from "./pages/S0516_STOCK_USE_CONFIRM";
import S0517_STOCK_HISTORY from "./pages/S0517_STOCK_HISTORY";
import S0518_FACTORY_ARRIVAL from "./pages/S0518_FACTORY_ARRIVAL";
import S051801_FACTORY_ARRIVAL_ETP from "./pages/S051801_FACTORY_ARRIVAL_ETP";
import S0519_INSPECT_REPORT from "./pages/S0519_INSPECT_REPORT";
import S051901_FACIN_LIST from "./pages/S051901_FACIN_LIST";
import S0520_FACOUT_RECORD from "./pages/S0520_FACOUT_RECORD";
import S052001_FACOUT_LIST from "./pages/S052001_FACOUT_LIST";
import S0521_STOCK_RECORD_NEW from "./pages/S0521_STOCK_RECORD_NEW";
import S0522_STOCK_LIST from "./pages/S0522_STOCK_LIST";
import S0523_STOCK_MANAGER from "./pages/S0523_STOCK_MANAGER";
import S0530_INVOICE_LIST from "./pages/S0530_INVOICE_LIST";
import S0531_PENDDING_SHIPMENT from "./pages/S0531_PENDDING_SHIPMENT";
import S0601_INVOICE_REG_OVERSEA from "./pages/S0601_INVOICE_REG_OVERSEA";
import S0603_INVOICE_LIST from "./pages/S0603_INVOICE_LIST";
import S0604_IMPORT_CHARGE_RECORD from "./pages/S0604_IMPORT_CHARGE_RECORD";
import S0605_IMPORT_CHARGE_LIST from "./pages/S0605_IMPORT_CHARGE_LIST";
import S0607_LC_NEGO from "./pages/S0607_LC_NEGO";
import S0608_LC_NEGO_LIST from "./pages/S0608_LC_NEGO_LIST";
import S0609_MANAGE_RETURN_TAX from "./pages/S0609_MANAGE_RETURN_TAX";
import S0610_COST_CONFIRM from "./pages/S0610_COST_CONFIRM";
import S0801_DOCU_REGIST_DOMESTIC from "./pages/S0801_DOCU_REGIST_DOMESTIC";
import S080101_DOCU_REGIST_DOMESTIC from "./pages/S080101_DOCU_REGIST_DOMESTIC";
import S0802_DOCU_REGIST_OVERSEA from "./pages/S0802_DOCU_REGIST_OVERSEA";
import S0705_CMPT_PAYMENT from "./pages/S0705_CMPT_PAYMENT";
import S0702_DEBIT_NOTE from "./pages/S0702_DEBIT_NOTE";
import S0703_DEBIT_NOTE_FACTORY_BVT from "./pages/S0703_DEBIT_NOTE_FACTORY_BVT";
import S070301_DEBIT_NOTE_FACTORY_ETP from "./pages/S070301_DEBIT_NOTE_FACTORY_ETP";
import S0701_CREDIT_NOTE from "./pages/S0701_CREDIT_NOTE";
import S0707_MAN_INVOICE from "./pages/S0707_MAN_INVOICE";
import S0708_MANAGE_BUYER_INPUT from "./pages/S0708_MANAGE_BUYER_INPUT";
import S0709_MANAGE_INVOICE_AMT from "./pages/S0709_MANAGE_INVOICE_AMT";
import S0803_ETC_COST from "./pages/S0803_ETC_COST";
import S0914_FAC_IN_OUT_MANAGER from "./pages/S0914_FAC_IN_OUT_MANAGER";

import AF_S001 from "./pages/AF_S001";
import AF_S002 from "./pages/AF_S002";
import AF_S003 from "./pages/AF_S003";
import AF_S004 from "./pages/AF_S004";
import AF_S005 from "./pages/AF_S005";

import { Tooltip } from "primereact/tooltip";

import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "./assets/demo/flags/flags.css";
import "./assets/demo/Demos.scss";
import "./assets/layout/layout.scss";
import "./App.scss";

import { blindWrite } from "./blindWrite";
import $ from "jquery";

$(async function () {
    let userInfo = JSON.parse(window.sessionStorage.getItem("AF_ERP_USERINFO"));

    if (!userInfo) return;

    await blindWrite(window, apolloOption, userInfo.USER_ID);

    // 포커스된 input 요소의 내용을 전체 선택
    $("input").each((i, element) => {
        $(element).focus(() => {
            $(element).select();
        });
    });

    // jquery document ready가 react에서 비정상동작 하는 경우가 있음.
    setTimeout(async () => {
        $("input, select, textarea").attr("autocomplete", "off");
        console.log(window.location.href);
        if (window.location.href.includes("S020602_ORDER_REG")) {
            $(".layout-main").css("overflow-y", "auto");
        }
    }, 500);

    // 테이블이 부모 div와 맞지 않는 것을 늘려주기
    function adjustVirtualScrollerHeight() {
        $(".p-virtualscroller").each(function () {
            let parentDiv = $(this).closest(".af-div-first");
            if (parentDiv.length && parentDiv.length >= 1000) {
                let parentHeight = parentDiv.height();
                $(this).css("height", parentHeight + "px");
            }
        });
    }

    setTimeout(async () => {
        adjustVirtualScrollerHeight();
    }, 500);

    let isReplayingClick = false;

    function bindGuardedConfirmClick($el, message, options = {}) {
        const btn = $el[0];
        if (!btn) return;

        btn.addEventListener(
            "click",
            async function (e) {
                if (isReplayingClick) {
                    isReplayingClick = false;
                    return;
                }
                e.stopImmediatePropagation();
                e.preventDefault();

                console.log("------");
                const ok = await confirm(message, options);

                console.log("------", ok);
                if (ok) {
                    isReplayingClick = true;
                    btn.click();
                }
            },
            true, // useCapture
        );
    }

    const saveBtn = $('[aria-label="Save"]');
    const removeBtn = $('[aria-label="Remove"]');
    const deleteBtn = $('[aria-label="Delete"]');
    bindGuardedConfirmClick(
        saveBtn,
        "Would you like to save? (저장하시겠습니까?)",
    );
    bindGuardedConfirmClick(
        removeBtn,
        "Would you like to remove? (삭제하시겠습니까?)",
    );
    bindGuardedConfirmClick(
        deleteBtn,
        "Would you like to delete? (삭제하시겠습니까?)",
    );

    $(".af-div-first,.af-div-second")
        .filter(function () {
            const inlineWidth = this.style.width;
            const is123rem = inlineWidth === "123rem";
            const hasDataTable = $(this).find(".p-datatable").length > 0;

            return is123rem && hasDataTable;
        })
        .css("width", "100%");

    $(".af-div-first .p-datatable, .af-div-second .p-datatable").css({
        width: "99.3%",
        margin: "0 5px",
    });

    //$('.af-div-first').has('.p-datatable').addClass('af-div-with-table');
    //$('.af-div-second').has('.p-datatable').addClass('af-div-with-table');

    $(".af-div-first, .af-div-second").each(function () {
        const $el = $(this);

        // 상위에 S0306_MRP_BY_ORDER를 가진 af-div-main이 있다면 건너뜀
        if ($el.closest(".af-div-main").is(".S0306_MRP_BY_ORDER")) {
            return;
        }

        // .p-dialog 안에 포함되어 있으면 건너뜀
        if ($el.closest(".p-dialog").length > 0) {
            return;
        }

        const parentW = $(this).closest(".af-div-main").innerWidth();
        const selfW = $el.outerWidth();
        const isFull = Math.abs(selfW - parentW) < 1;

        if (isFull && $el.has(".p-datatable").length) {
            $el.addClass("af-div-with-table");
        }
    });

    setTimeout(() => {
        resizeAfDiv();
    }, 50);
});

// 창 크기 바뀔 때마다 재계산
$(window).on(
    "resize",
    (function () {
        let timer = null;
        const DELAY = 250;

        return function () {
            clearTimeout(timer);
            timer = setTimeout(resizeAfDiv, DELAY);
        };
    })(),
);

// TABLE 늘리기
function resizeAfDiv() {
    let $af = $(".af-div-with-table");
    let $afvsc = $(".af-div-with-table .p-virtualscroller");

    if (!$af.length) return;

    $af = $af.first();
    $afvsc = $afvsc.first();

    const siblingsHeight = $af
        .siblings(":visible")
        .toArray()
        .reduce((sum, el) => sum + $(el).outerHeight(true), 0);

    let viewportHeight = $(window).height() * 0.98;
    let targetHeight = viewportHeight - siblingsHeight;

    if (targetHeight <= 0) {
        return;
    }

    $af.height(Math.max(targetHeight, 0));
    $afvsc.height(Math.max(targetHeight * 0.99, 0));

    const $after = $af
        .nextAll(".af-div-first, .af-div-second")
        .filter(":visible");

    if (!$after.length) return;

    const $last = $after.last();
    const viewportBottom = $(window).scrollTop() + $(window).height();
    const lastBottom = $last.offset().top + $last.outerHeight(true);
    const gap = viewportBottom - lastBottom;

    if (gap > 0) {
        const newHeight = targetHeight + gap;
        $af.height(newHeight);
        $afvsc.height(newHeight);
    }
}

$(document).on("keydown", function (event) {
    if (event.altKey && event.key.toLowerCase() === "x") {
        event.preventDefault();

        // 부모 프레임에 메시지 보내기
        window.parent.postMessage(
            "focusParent",
            `https://${window.location.hostname}:3211`,
        );
    }
});

window.addEventListener("message", (event) => {
    if (event.data?.type === "CLEAR_AF_COLUMNS_ACTIVE") {
        const set = window.__AF_ACTIVE_KEYS;
        if (!set || set.size === 0) {
            console.info("[AF] no active AFDataTable keys to clear");
            return;
        }
        const keys = Array.from(set);
        keys.forEach((k) => localStorage.removeItem(k));
        console.info(`[AF] cleared ACTIVE-TAB column orders (${keys.length})`);
    }
});

window.addEventListener("message", function (event) {
    if (event.data && event.data.type === "RELOAD_ME") {
        window.location.reload();
    }
});

const App = () => {
    // const [scale, setScale] = useState(14.5);
    const [scale, setScale] = useState(10.9);
    const [layoutMode, setLayoutMode] = useState("overlay");
    const [layoutColorMode, setLayoutColorMode] = useState("light");
    const [inputStyle, setInputStyle] = useState("outlined");
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef &&
            copyTooltipRef.current &&
            copyTooltipRef.current.updateTargetEvents();
        setOverlayMenuActive(false);
        setMobileMenuActive(false);
    }, [location]);

    useEffect(() => {
        const blockF5 = (e) => {
            if (e.key === "F5" || e.keyCode === 116) {
                e.preventDefault();
                // Keep browser refresh blocked, but allow page-level F5 handlers.
                return;
            }
        };

        window.addEventListener("keydown", blockF5, true);

        return () => {
            window.removeEventListener("keydown", blockF5, true);
        };
    }, []);


    useEffect(() => {
        document.documentElement.style.fontSize = scale + "px";
    }, [scale]);

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    };

    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else
            element.className = element.className.replace(
                new RegExp(
                    "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
                    "gi",
                ),
                " ",
            );
    };

    const wrapperClass = classNames("layout-wrapper", {
        "layout-overlay": layoutMode === "overlay",
        "layout-static": layoutMode === "static",
        "layout-static-sidebar-inactive":
            staticMenuInactive && layoutMode === "static",
        "layout-overlay-sidebar-active":
            overlayMenuActive && layoutMode === "overlay",
        "layout-mobile-sidebar-active": mobileMenuActive,
        "p-input-filled": inputStyle === "filled",
        "p-ripple-disabled": ripple === false,
        "layout-theme-light": layoutColorMode === "light",
    });

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <Tooltip
                ref={copyTooltipRef}
                target=".block-action-copy"
                position="bottom"
                content="Copied to clipboard"
                event="focus"
            />
            <div className="layout-main-container-1">
                <div className="layout-main">
                    <Route path="/login" component={S0000_LOGIN} />
                    {/*<Route path="/main" component={APP_MAIN} />*/}
                    <Route path="/S0101_KCD_FACTORY" component={S0101_KCD_FACTORY} />
                    <Route path="/S0113_KCD_BUYER" component={S0113_KCD_BUYER} />
                    <Route path="/S0114_KCD_SUPPLIER" component={S0114_KCD_SUPPLIER} />
                    <Route path="/S0107_KCD_SIZEMST" component={S0107_KCD_SIZEMST} />
                    <Route path="/S0110_KCD_BANK_QRY" component={S0110_KCD_BANK_QRY} />
                    <Route path="/S0104_KCD_NATION" component={S0104_KCD_NATION} />
                    <Route path="/S0105_KCD_HSCODE" component={S0105_KCD_HSCODE} />
                    <Route path="/S0108_KCD_PLACE" component={S0108_KCD_PLACE} />
                    <Route path="/S0111_KCD_USER" component={S0111_KCD_USER} />
                    <Route path="/S0112_KCD_CURRENCY" component={S0112_KCD_CURRENCY} />
                    <Route path="/S0200_KCD_STYLE" component={S0200_KCD_STYLE} />
                    <Route path="/S0202_STYLE_COST" component={S0202_STYLE_COST} />
                    <Route path="/S0203_SAMPLE_COST" component={S0203_SAMPLE_COST} />
                    <Route path="/S0204_ORDER_LIST" component={S0204_ORDER_LIST} />
                    <Route path="/S020401_ORDER_INFO" component={S020401_ORDER_INFO} />
                    <Route path="/S020602_ORDER_REG" component={S020602_ORDER_REG} />
                    <Route path="/S0205_PI_MANAGER" component={S0205_PI_MANAGER} />
                    <Route path="/S020701_PO_MANAGER" component={S020701_PO_MANAGER} />
                    <Route path="/S0208_CAPABOOK_RECORD_BVT" component={S0208_CAPABOOK_RECORD_BVT} />
                    <Route path="/S0209_CAPABOOK_LIST_BVT" component={S0209_CAPABOOK_LIST_BVT} />
                    <Route path="/S0212_NEGO_CMPT" component={S0212_NEGO_CMPT} />
                    <Route path="/S0213_ORDER_REPORT" component={S0213_ORDER_REPORT} />
                    <Route path="/S0214_ORDER_STATUS_BEFORE_AFTER_CHECK" component={S0214_ORDER_STATUS_BEFORE_AFTER_CHECK} />
                    <Route path="/S0215_ORDER_STATUS_SHORTAGE" component={S0215_ORDER_STATUS_SHORTAGE} />
                    <Route path="/S0216_SALES_MATL_PLAN_QRY" component={S0216_SALES_MATL_PLAN_QRY} />
                    <Route path="/S0217_SALES_MATL_PLAN_LIST" component={S0217_SALES_MATL_PLAN_LIST} />
                    <Route path="/S0218_EXCHANGE_RATE_RECORD" component={S0218_EXCHANGE_RATE_RECORD} />
                    <Route path="/S0301_MATL_RECORD" component={S0301_MATL_RECORD} />
                    <Route path="/S0302_MATL_SEARCH" component={S0302_MATL_SEARCH} />
                    <Route path="/S030301_COPY_PRODUCT" component={S030301_COPY_PRODUCT} />
                    <Route path="/S030302_COPY_STYLE" component={S030302_COPY_STYLE} />
                    <Route path="/S030303_MRP_BY_SEARCH" component={S030303_MRP_BY_SEARCH} />
                    <Route path="/S030304_ADD_SEQ_MRP_BY_ORDER" component={S030304_ADD_SEQ_MRP_BY_ORDER} />
                    <Route path="/S0303_MRP_RECORD_STYLE" component={S0303_MRP_RECORD_STYLE} />
                    <Route path="/S0307_MRP_RECORD_STYLE" component={S0307_MRP_RECORD_STYLE} />
                    <Route path="/S030501_DEL_MRP_PACK" component={S030501_DEL_MRP_PACK} />
                    <Route path="/S030502_PO_HISTORY" component={S030502_PO_HISTORY} />
                    <Route path="/S030513_MRP_LIST" component={S030513_MRP_LIST} />
                    <Route path="/S030514_PO_LIST" component={S030514_PO_LIST} />
                    <Route path="/S030515_MRP_PACK" component={S030515_MRP_PACK} />
                    <Route path="/S030516_MATERIAL_PO_LIST" component={S030516_MATERIAL_PO_LIST} />
                    <Route path="/S030503_STOCK_CHECK" component={S030503_STOCK_CHECK} />
                    <Route path="/S030504_REVISE" component={S030504_REVISE} />
                    <Route path="/S030505_PO_RECORD_MATL_ADD" component={S030505_PO_RECORD_MATL_ADD} />
                    <Route path="/S030506_NEW_PO_SAMPLE" component={S030506_NEW_PO_SAMPLE} />
                    <Route path="/S030507_NEW_PO_FACTORY_SAMPLE" component={S030507_NEW_PO_FACTORY_SAMPLE} />
                    <Route path="/S030510_PO_MAKE_MRP" component={S030510_PO_MAKE_MRP} />
                    <Route path="/S030512_PO_MAKE_MRP_FIRST" component={S030512_PO_MAKE_MRP_FIRST} />
                    <Route path="/S030511_PO_HISTORY2" component={S030511_PO_HISTORY2} />
                    <Route path="/S0305_MRP_MANAGER" component={S0305_MRP_MANAGER} />
                    <Route path="/S0306_MRP_BY_ORDER" component={S0306_MRP_BY_ORDER} />
                    <Route path="/S030602_MRP_BY_ORDER_STYLE" component={S030602_MRP_BY_ORDER_STYLE} />
                    <Route path="/S0401_PURCHASING_MANAGER" component={S0401_PURCHASING_MANAGER} />
                    <Route path="/S040100_PUR_MONITOR" component={S040100_PUR_MONITOR} />
                    <Route path="/S040101_PURCHASER_REG" component={S040101_PURCHASER_REG} />
                    <Route path="/S040102_PURCHASER_INFO" component={S040102_PURCHASER_INFO} />
                    <Route path="/S0439_LC_DEPOSIT" component={S0439_LC_DEPOSIT} />
                    <Route path="/S040201_PO_INFO" component={S040201_PO_INFO} />
                    <Route path="/S040202_ORDER_SHEET" component={S040202_ORDER_SHEET} />
                    <Route path="/S0402_PO_LIST_NEW" component={S0402_PO_LIST_NEW} />
                    <Route path="/S0403_MATL_PO_LIST" component={S0403_MATL_PO_LIST} />
                    <Route path="/S0404_PO_LIST" component={S0404_PO_LIST} />
                    <Route path="/S0405_PO_MRP_LIST" component={S0405_PO_MRP_LIST} />
                    <Route path="/S0406_STSIN_RECORD" component={S0406_STSIN_RECORD} />
                    <Route path="/S0430_STSIN_RECORD" component={S0430_STSIN_RECORD} />
                    <Route path="/S043001_STSIN_LIST" component={S043001_STSIN_LIST} />
                    <Route path="/S043002_STSIN_INFO" component={S043002_STSIN_INFO} />
                    <Route path="/S0431_STSOUT_RECORD" component={S0431_STSOUT_RECORD} />
                    <Route path="/S043101_STSOUT_LIST" component={S043101_STSOUT_LIST} />
                    <Route path="/S0433_SHIPMENT_REGIST" component={S0433_SHIPMENT_REGIST} />
                    <Route path="/S0434_SHIPMENT_MANAGER" component={S0434_SHIPMENT_MANAGER} />
                    <Route path="/S0435_SHIPPING_COST" component={S0435_SHIPPING_COST} />
                    <Route path="/S0436_LOCAL_COST" component={S0436_LOCAL_COST} />
                    <Route path="/S043401_SHIPMENT_INFO" component={S043401_SHIPMENT_INFO} />
                    <Route path="/S0440_FREIGHT_REGIST" component={S0440_FREIGHT_REGIST} />
                    <Route path="/S0407_STSIN_DEPOSIT_LC" component={S0407_STSIN_DEPOSIT_LC} />
                    <Route path="/S0408_MATL_PRICE_UPDATE" component={S0408_MATL_PRICE_UPDATE} />
                    <Route path="/S0410_STSIN_INPUT_LIST" component={S0410_STSIN_INPUT_LIST} />
                    <Route path="/S0411_STSOUT_RECORD" component={S0411_STSOUT_RECORD} />
                    <Route path="/S041201_HIS_CODE_REMARK" component={S041201_HIS_CODE_REMARK} />
                    <Route path="/S041202_CT_QTY_CHECK" component={S041202_CT_QTY_CHECK} />
                    <Route path="/S041203_COMP_BIN" component={S041203_COMP_BIN} />
                    <Route path="/S041204_OFFER_SPEC" component={S041204_OFFER_SPEC} />
                    <Route path="/S041205_PACK_CONFIRM" component={S041205_PACK_CONFIRM} />
                    <Route path="/S041206_SEA_FREIGHT" component={S041206_SEA_FREIGHT} />
                    <Route path="/S0412_STSOUT_LIST" component={S0412_STSOUT_LIST} />
                    <Route path="/S0413_INVOICE_REG_MATL" component={S0413_INVOICE_REG_MATL} />
                    <Route path="/S0414_INVOICE_QRY_MATL" component={S0414_INVOICE_QRY_MATL} />
                    <Route path="/S0416_MATL_DELAY_REPORT" component={S0416_MATL_DELAY_REPORT} />
                    <Route path="/S0417_MATL_FREIGHT" component={S0417_MATL_FREIGHT} />
                    <Route path="/S0419_ENDDING_MATL_AMT_DOMESTIC" component={S0419_ENDDING_MATL_AMT_DOMESTIC} />
                    <Route path="/S0423_TAXBILL" component={S0423_TAXBILL} />
                    <Route path="/S0437_EXPORT_REGIST" component={S0437_EXPORT_REGIST} />
                    <Route path="/S0438_IMPORT_REGIST" component={S0438_IMPORT_REGIST} />
                    <Route path="/S0450_DELAY_REPORT" component={S0450_DELAY_REPORT} />
                    <Route path="/S0501_FACTORY_IO_MAIN" component={S0501_FACTORY_IO_MAIN} />
                    <Route path="/S0504_FACTORY_INPUT_LIST" component={S0504_FACTORY_INPUT_LIST} />
                    <Route path="/S0505_FACTORY_INPUT_RECORD" component={S0505_FACTORY_INPUT_RECORD} />
                    <Route path="/S0506_FACTORY_OUTPUT_LIST" component={S0506_FACTORY_OUTPUT_LIST} />
                    <Route path="/S0507_FACTORY_OUTPUT_RECORD" component={S0507_FACTORY_OUTPUT_RECORD} />
                    <Route path="/S0508_CAPABOOK_LIST_BVT" component={S0508_CAPABOOK_LIST_BVT} />
                    <Route path="/S0509_RETURN_MATL" component={S0509_RETURN_MATL} />
                    <Route path="/S0511_STOCK_RECORD" component={S0511_STOCK_RECORD} />
                    <Route path="/S051201_STOCK_QTY_UPDATE_LOG" component={S051201_STOCK_QTY_UPDATE_LOG} />
                    <Route path="/S0512_STOCK_LIST" component={S0512_STOCK_LIST} />
                    <Route path="/S0513_SHIPPING_LIST" component={S0513_SHIPPING_LIST} />
                    <Route path="/S051301_SHIPPING_REGIST" component={S051301_SHIPPING_REGIST} />
                    <Route path="/S0514_SHIPPING_REGIST_BVT_OLD" component={S0514_SHIPPING_REGIST_BVT_OLD} />
                    <Route path="/S0516_STOCK_USE_CONFIRM" component={S0516_STOCK_USE_CONFIRM} />
                    <Route path="/S0517_STOCK_HISTORY" component={S0517_STOCK_HISTORY} />
                    <Route path="/S0518_FACTORY_ARRIVAL" component={S0518_FACTORY_ARRIVAL} />
                    <Route path="/S051801_FACTORY_ARRIVAL_ETP" component={S051801_FACTORY_ARRIVAL_ETP} />
                    <Route path="/S0519_INSPECT_REPORT" component={S0519_INSPECT_REPORT} />
                    <Route path="/S051901_FACIN_LIST" component={S051901_FACIN_LIST} />
                    <Route path="/S0520_FACOUT_RECORD" component={S0520_FACOUT_RECORD} />
                    <Route path="/S052001_FACOUT_LIST" component={S052001_FACOUT_LIST} />
                    <Route path="/S0521_STOCK_RECORD_NEW" component={S0521_STOCK_RECORD_NEW} />
                    <Route path="/S0522_STOCK_LIST" component={S0522_STOCK_LIST} />
                    <Route path="/S0523_STOCK_MANAGER" component={S0523_STOCK_MANAGER} />
                    <Route path="/S0530_INVOICE_LIST" component={S0530_INVOICE_LIST} />
                    <Route path="/S0531_PENDDING_SHIPMENT" component={S0531_PENDDING_SHIPMENT} />
                    <Route path="/S0601_INVOICE_REG_OVERSEA" component={S0601_INVOICE_REG_OVERSEA} />
                    <Route path="/S0603_INVOICE_LIST" component={S0603_INVOICE_LIST} />
                    <Route path="/S0604_IMPORT_CHARGE_RECORD" component={S0604_IMPORT_CHARGE_RECORD} />
                    <Route path="/S0605_IMPORT_CHARGE_LIST" component={S0605_IMPORT_CHARGE_LIST} />
                    <Route path="/S0607_LC_NEGO" component={S0607_LC_NEGO} />
                    <Route path="/S0608_LC_NEGO_LIST" component={S0608_LC_NEGO_LIST} />
                    <Route path="/S0609_MANAGE_RETURN_TAX" component={S0609_MANAGE_RETURN_TAX} />
                    <Route path="/S0610_COST_CONFIRM" component={S0610_COST_CONFIRM} />
                    <Route path="/S0801_DOCU_REGIST_DOMESTIC" component={S0801_DOCU_REGIST_DOMESTIC} />
                    <Route path="/S080101_DOCU_REGIST_DOMESTIC" component={S080101_DOCU_REGIST_DOMESTIC} />
                    <Route path="/S0802_DOCU_REGIST_OVERSEA" component={S0802_DOCU_REGIST_OVERSEA} />
                    <Route path="/S0705_CMPT_PAYMENT" component={S0705_CMPT_PAYMENT} />
                    <Route path="/S0701_CREDIT_NOTE" component={S0701_CREDIT_NOTE} />
                    <Route path="/S0702_DEBIT_NOTE" component={S0702_DEBIT_NOTE} />
                    <Route path="/S0703_DEBIT_NOTE_FACTORY_BVT" component={S0703_DEBIT_NOTE_FACTORY_BVT} />
                    <Route path="/S070301_DEBIT_NOTE_FACTORY_ETP" component={S070301_DEBIT_NOTE_FACTORY_ETP} />
                    <Route path="/S0707_MAN_INVOICE" component={S0707_MAN_INVOICE} />
                    <Route path="/S0708_MANAGE_BUYER_INPUT" component={S0708_MANAGE_BUYER_INPUT} />
                    <Route path="/S0709_MANAGE_INVOICE_AMT" component={S0709_MANAGE_INVOICE_AMT} />
                    <Route path="/S0803_ETC_COST" component={S0803_ETC_COST} />
                    <Route path="/S0914_FAC_IN_OUT_MANAGER" component={S0914_FAC_IN_OUT_MANAGER} />
                    <Route path="/AF_S001" component={AF_S001} />
                    <Route path="/AF_S002" component={AF_S002} />
                    <Route path="/AF_S003" component={AF_S003} />
                    <Route path="/AF_S004" component={AF_S004} />
                    <Route path="/AF_S005" component={AF_S005} />
                </div>
            </div>
            <CSSTransition
                classNames="layout-mask"
                timeout={{ enter: 200, exit: 200 }}
                in={mobileMenuActive}
                unmountOnExit
            >
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>
        </div>
    );
};

export default App;
