/* eslint-disable */
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import classNames from "classnames";
import axios from "axios";
import { AFDataTable } from "../components/AFDataTable";
import { AFColumn } from "../components/AFColumn";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { ScrollPanel } from "primereact/scrollpanel";
import { TabView, TabPanel } from "primereact/tabview";

const moment = require("moment");

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0423_TAXBILL } from "../service/service_biz/ServiceS0423_TAXBILL";

import "primeflex/primeflex.css";
import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyEDT_KSV_STOCK_IN = {
    PAY_DATE: "",
    PAY_DATE_WEEK: "",
};

const emptyQRY_KSV_STOCK_IN = {
    BILL_CD: "",
    S_IN_DATE: "",
    E_IN_DATE: "",
    VENDOR_CD: "",

    TAX_KIND: "",
    S_PAY_DATE: "",
    E_PAY_DATE: "",
    REG_USER: "",
    GW_STATUS: "ALL",
    VENDOR_TYPE: "",
};

const emptyTBL_KSV_STOCK_IN = {
    id: 0,
    END_DATE: "",
    VENDOR_NAME: "",
    END_AMT: "",
    DC: "",
    DN: "",
    CURR_RATE: "",
    SUPPLIED_VALUE: "",
    VAL: "",
    PAY_AMT: "",
    CURR_CD: "",
    KRW_AMT: "",
    GW: "",
    TAX_BILL: "",
    TT_FLAG: "",
    PAY_DATE: "",
    TAXBILL_DATE: "",
    CALC_FLAG: "",
    PUR_APP: "",
    WARE_NAME: "",
    REMARK: "",
    PAY_REPORT: "",
    PAY_PRICE: "",
    VENDOR_CD: "",
    PAY_TERM: "",
    CALC_FLAG: "",
    CRCB_CD: "",
    WARE_CD: "",
};

const emptyTBL_KSV_STOCK_IN1 = {
    id: 0,
    PO_CD: "",
    BUYER: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    IN_QTY_TOT: "",
    IN_QTY_PAY: "",
    IN_CURR_CD: "",
    IN_PRICE: "",
    PAY_CURR_CD: "",
    PAY_PRICE: "",
    MATL_PRICE: "",
    TT_FLAG: "",
    WARE_NAME: "",
    PAY_AMT: "",
    END_FLAG: "",
    END_DATE: "",
    PAY_DATE: "",
    BILL_FLAG: "",
    BILL_DATE: "",
    VENDOR_NAME: "",
    PO_SEQ: "",
    ORDER_CD: "",
    MRP_SEQ: "",
    IN_DATETIME: "",
    MATL_SEQ: "",
    CALC_FLAG: "",
    VENDOR_CD: "",
    PUR_FACTORY: "",
    PAY_REPORT: "",
};

const emptyTBL_KSV_CRDB_MST = {
    id: 0,
    END_DATE: "",
    VENDOR_NAME: "",
    END_AMT: "",
    DC: "",
    DN: "",
    CURR_RATE: "",
    SUPPLIED_VALUE: "",
    VAL: "",
    PAY_AMT: "",
    CURR_CD: "",
    KRW_AMT: "",
    GW: "",
    TAX_BILL: "",
    TT_FLAG: "",
    PAY_DATE: "",
    TAXBILL_DATE: "",
    CALC_FLAG: "",
    PUR_APP: "",
    WARE_NAME: "",
    REMARK: "",
    PAY_REPORT: "",
    PAY_PRICE: "",
    VENDOR_CD: "",
    PAY_TERM: "",
    CALC_FLAG: "",
    CRCB_CD: "",
    WARE_CD: "",
};

const emptyTBL_KSV_CRDB_MST2 = {
    id: 0,
    END_DATE: "",
    VENDOR_NAME: "",
    END_AMT: "",
    DC: "",
    DN: "",
    CURR_RATE: "",
    SUPPLIED_VALUE: "",
    VAL: "",
    PAY_AMT: "",
    CURR_CD: "",
    KRW_AMT: "",
    GW: "",
    TAX_BILL: "",
    TT_FLAG: "",
    PAY_DATE: "",
    TAXBILL_DATE: "",
    CALC_FLAG: "",
    PUR_APP: "",
    WARE_NAME: "",
    REMARK: "",
    PAY_REPORT: "",
    PAY_PRICE: "",
    VENDOR_CD: "",
    PAY_TERM: "",
    CALC_FLAG: "",
    CRCB_CD: "",
    WARE_CD: "",
};

const emptyEDT_KSV_CRDB_MST = {
    CRDB_CD: "",
    PART_AMT: "",
    REST_AMT: "",
    PART_DATE: "",
};

const emptyQRY_KSV_CRDB_MST = {
    CRDB_CD: "",
    VENDOR_CD: "",
    CURR_CD: "",
};

const S0423_TAXBILL = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0423_TAXBILLRef = useRef(null);
    if (!serviceS0423_TAXBILLRef.current) serviceS0423_TAXBILLRef.current = new ServiceS0423_TAXBILL();
    const serviceS0423_TAXBILL = serviceS0423_TAXBILLRef.current;

    const toast = useRef(null);

    /* splitter 관련 */

    const [styleVal, setStyleVal] = useState({
        width: "123rem",
        height: "5rem",
    });

    const search_REPORT = (argData) => {
        if (selectedTBL_KSV_STOCK_IN.length <= 0) {
            alert("하나이상의 데이타를 선택하세요<br><br>Select one or more data");
            return;
        }

        var tArray = [];
        var tChk = 0;
        var tChk2 = 0;
        selectedTBL_KSV_STOCK_IN.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            // if (parseFloat(tObj.GW_STATUS) >= 1 && parseFloat(tObj.GW_STATUS) <= 5) tChk = 1;
            if (
                parseFloat(tObj.GW_STATUS) === 1 ||
                parseFloat(tObj.GW_STATUS) === 2
            )
                tChk = 1;
            if (tObj.DOCU_NO) tChk2 = 1;
            tArray.push(tObj);
        });

        if (tChk === 1) {
            alert("[GW] Processed items cannot be submitted to Group Ware.");
            return;
        }

        if (tChk2 === 1) {
            alert("[NEOE] Processed items cannot be submitted to Group Ware.");
            return;
        }

        setLoadingTBL_KSV_STOCK_IN(true);
        serviceS0423_TAXBILL.mgrQuery_REPORT(tArray).then((data) => {
            setLoadingTBL_KSV_STOCK_IN(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        serviceLib.downloadFile(
                            data[0].CODE.split("?")[2].toString(),
                            data[0].CODE.split("?")[1].toString(),
                        );
                        if (
                            typeof argData.OP_MODE !== "undefined" &&
                            argData.OP_MODE === "DOMESTIC"
                        ) {
                            process_GW_sub();
                        }
                        if (
                            typeof argData.OP_MODE !== "undefined" &&
                            argData.OP_MODE === "OVERSEA"
                        ) {
                            process_GW_IN_sub();
                        }
                    }
                }
            } else {
                console.log(
                    "Search List error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_REPORT_only = (argData) => {
        if (selectedTBL_KSV_STOCK_IN.length <= 0) {
            alert("하나이상의 데이타를 선택하세요<br><br>Select one or more data");
            return;
        }

        var tArray = [];
        var tChk = 0;
        selectedTBL_KSV_STOCK_IN.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (
                parseFloat(tObj.GW_STATUS) === 1 ||
                parseFloat(tObj.GW_STATUS) === 2
            )
                tChk = 1;
            tArray.push(tObj);
        });

        setLoadingTBL_KSV_STOCK_IN(true);
        serviceS0423_TAXBILL.mgrQuery_REPORT(tArray).then((data) => {
            setLoadingTBL_KSV_STOCK_IN(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    if (data[0].CODE.includes("SUCC")) {
                        serviceLib.downloadFile(
                            data[0].CODE.split("?")[2].toString(),
                            data[0].CODE.split("?")[1].toString(),
                        );
                    }
                }
            } else {
                console.log(
                    "Search List error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const process_RESET = () => {
        setDataQRY_KSV_STOCK_IN(emptyQRY_KSV_STOCK_IN);
        setSelectedTBL_KSV_STOCK_IN([]);
        resetTBL_KSV_STOCK_IN1();
    };

    const process_GW_IN = () => {
        if (selectedTBL_KSV_STOCK_IN.length <= 0) return;

        var tFlag1 = 0;
        var tFlag2 = 0;
        var tFlag3 = 0;
        var tSaveCompanyCode = "";
        var tFlag4 = 0;
        var tFlag5 = 0;
        var strFlag5 = '';

        selectedTBL_KSV_STOCK_IN.forEach((col, i) => {
            if (col.VENDOR_TYPE !== "3") tFlag1 += 1;
            // if (col.TAXBILL_CD === '') tFlag2 += 1;
            if (col.BILL_FLAG !== "O") tFlag2 += 1;
            if (col.BILL_FLAG !== "O") tFlag2 += 1;
            if (parseFloat(col.IN_PAY_AMT) <= 0) tFlag3 += 1;
            if (i !== 0) {
                if (tSaveCompanyCode !== col.COMPANY_CODE) tFlag4 = 1;
            }

            // 임시로 막음
            /*
            var tDiff = parseFloat(col.PO_AMT) - parseFloat(col.CHECK_PO_AMT);
            if (tDiff < -2 || tDiff > 2) {
                tFlag5 += 1;
                strFlag5 = `Check Po Amt. Contact IT Team. : ${col.BILL_CD} (${col.PO_AMT}/${col.CHECK_PO_AMT})`;
            }
            */

            tSaveCompanyCode = col.COMPANY_CODE;
        });

        if (tFlag5 > 0) {
            alert(strFlag5);
            return;
        }

        if (tFlag1 > 0) {
            alert("Do Payment IMPORT material only.(TTT)");
            return;
        }

        if (tFlag3 > 0) {
            alert("Pay Request must great than 0");
            return;
        }

        if (tFlag4 > 0) {
            alert("Select Same Company");
            return;
        }

        var tObj = {};
        tObj.OP_MODE = "OVERSEA";
        search_REPORT(tObj);
    };

    const process_GW_IN_sub = () => {
        if (selectedTBL_KSV_STOCK_IN.length <= 0) return;

        var tFlag1 = 0;
        var tFlag2 = 0;
        var tFlag3 = 0;

        selectedTBL_KSV_STOCK_IN.forEach((col, i) => {
            if (col.VENDOR_TYPE !== "3") tFlag1 += 1;
            // if (col.TAXBILL_CD === '') tFlag2 += 1;
            if (col.BILL_FLAG !== "O") tFlag2 += 1;
            if (parseFloat(col.IN_PAY_AMT) <= 0) tFlag3 += 1;
        });

        if (tFlag1 > 0) {
            alert("Do Payment IMPORT material only.");
            return;
        }

        if (tFlag3 > 0) {
            alert("Pay Request must great than 0");
            return;
        }

        request_GW_one_oversea();
    };

    const process_GW = () => {
        if (selectedTBL_KSV_STOCK_IN.length <= 0) return;

        var tFlag1 = 0;
        var tFlag2 = 0;
        var tFlag3 = 0;
        var tSaveCompanyCode = "";
        var tFlag4 = 0;
        var tFlag5 = 0;
        var strFlag5 = '';

        selectedTBL_KSV_STOCK_IN.forEach((col, i) => {
            if (col.VENDOR_TYPE === "3") tFlag1 += 1;
            // if (col.TAXBILL_CD === '') tFlag2 += 1;
            if (col.BILL_FLAG !== "O") tFlag2 += 1;
            if (parseFloat(col.IN_PAY_AMT) <= 0) tFlag3 += 1;
            if (i !== 0) {
                if (tSaveCompanyCode !== col.COMPANY_CODE) tFlag4 = 1;
            }

            /*
            var tDiff = parseFloat(col.PO_AMT) - parseFloat(col.CHECK_PO_AMT);
            if (tDiff < -2 || tDiff > 2) {
                tFlag5 += 1;
                strFlag5 = `Check Po Amt. Contact IT Team. : ${col.BILL_CD} (${col.PO_AMT}/${col.CHECK_PO_AMT})`;
            }
            */


            tSaveCompanyCode = col.COMPANY_CODE;
        });

        if (tFlag5 > 0) {
            alert(strFlag5);
            return;
        }

        if (tFlag1 > 0) {
            alert("Do Payment DOMESTIC material only. ");
            return;
        }

        if (tFlag3 > 0) {
            alert("Pay Request must great than 0");
            return;
        }

        if (tFlag4 > 0) {
            alert("Select Same Company");
            return;
        }

        var tObj = {};
        tObj.OP_MODE = "DOMESTIC";
        search_REPORT(tObj);
    };

    const process_GW_sub = () => {
        if (selectedTBL_KSV_STOCK_IN.length <= 0) return;

        var tFlag1 = 0;
        var tFlag2 = 0;
        var tFlag3 = 0;

        selectedTBL_KSV_STOCK_IN.forEach((col, i) => {
            if (col.VENDOR_TYPE !== "1") tFlag1 += 1;
            // if (col.TAXBILL_CD === '') tFlag2 += 1;
            if (col.BILL_FLAG !== "O") tFlag2 += 1;
            if (parseFloat(col.IN_PAY_AMT) <= 0) tFlag3 += 1;
        });

        if (tFlag1 > 0) {
            alert("Do Payment DOMESTIC material only.");
            return;
        }

        if (tFlag3 > 0) {
            alert("Pay Request must great than 0");
            return;
        }

        request_GW_one();
    };

    const process_GW_TAXBILL = () => {
        if (selectedTBL_KSV_STOCK_IN.length <= 0) return;

        var tFlag1 = 0;
        var tFlag2 = 0;
        var tFlag3 = 0;
        var tSaveCompanyCode = "";
        var tFlag4 = 0;

        selectedTBL_KSV_STOCK_IN.forEach((col, i) => {
            console.log(col.VENDOR_TYPE);

            if (col.VENDOR_TYPE !== "1") tFlag1 += 1;
            // if (col.TAXBILL_CD === '') tFlag2 += 1;
            if (col.BILL_FLAG !== "O") tFlag2 += 1;
            if (parseFloat(col.IN_PAY_AMT) + parseFloat(col.PAID_AMT) <= 0)
                tFlag3 += 1;
            if (i !== 0) {
                if (tSaveCompanyCode !== col.COMPANY_CODE) tFlag4 = 1;
            }
            tSaveCompanyCode = col.COMPANY_CODE;
        });

        if (tFlag1 > 0) {
            if (tSaveCompanyCode === 'shints') {
               alert("Do Payment DOMESTIC material only. ");
               return;
            } else {
               // NSR 의 경우 해외도 가능
               ;
            }
        }

        if (tFlag3 > 0) {
            alert("Pay Request must great than 0");
            return;
        }

        if (tFlag4 > 0) {
            alert("Select Same Company");
            return;
        }

        process_GW_TAXBILL_sub(tSaveCompanyCode);
    };

    const process_GW_BILL_END = async () => {
        if (selectedTBL_KSV_STOCK_IN.length <= 0) {
            alert("Select at least one item.");
            return;
        }

        var tCheck = 0;
        var tSaveObj = {};
        selectedTBL_KSV_STOCK_IN.forEach((col, i) => {
            if (i === 0) {
                tSaveObj = { ...col };
            } else {
                if (col.BILL_END_FLAG !== tSaveObj.BILL_END_FLAG) tCheck = 1;
                tSaveObj = { ...col };
            }
        });

        if (tCheck > 0) {
            alert("Select same BILL_END_FLAG.");
            return;
        }

        if (selectedTBL_KSV_STOCK_IN[0].BILL_END_FLAG === "END") {
            if (!(await confirm("Are you sure you want to Bill End Cancel?"))) {
                return;
            }
        } else {
            if (!(await confirm("Are you sure you want to Bill End ?"))) {
                return;
            }
        }

        let returnFlag = false;
        selectedTBL_KSV_STOCK_IN.forEach((col, i) => {
            if (col.BAL_AMT !== "0" || col.IN_PAY_AMT !== "0") {
                alert(
                    "Only items with 0 balance and 0 payment request can be processed.",
                );
                returnFlag = true;
            }
        });

        if (returnFlag) return;

        serviceS0423_TAXBILL
            .mgrUPDATE_BILL_END(
                selectedTBL_KSV_STOCK_IN.map(
                    ({ id, __typename, ...rest }) => rest,
                ),
            )
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_LIST_1();
                        }
                    }
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "FAILED: Bill End",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_GW_TAXBILL_sub = (argCompanyCode) => {
        if (selectedTBL_KSV_STOCK_IN.length <= 0) return;

        var tFlag1 = 0;
        var tFlag2 = 0;
        var tFlag3 = 0;

        selectedTBL_KSV_STOCK_IN.forEach((col, i) => {
            if (col.VENDOR_TYPE === "3") tFlag1 += 1;
            // if (col.TAXBILL_CD === '') tFlag2 += 1;
            if (col.BILL_FLAG !== "O") tFlag2 += 1;
            if (parseFloat(col.IN_PAY_AMT) + parseFloat(col.PAID_AMT) <= 0)
                tFlag3 += 1;
        });

        if (tFlag1 > 0) {
            if (argCompanyCode === 'shints') {
                alert("Do Payment DOMESTIC material only.");
                return;
            } else {
                // NSR 가능
                ;
            }
        }

        if (tFlag3 > 0) {
            alert("Pay Request must great than 0");
            return;
        }

        request_GW_taxbill();
    };

    const process_BVT_PAYMENT_REQUEST = () => {
        if (selectedTBL_KSV_STOCK_IN.length <= 0) return;

        const vendorSet = new Set(
            selectedTBL_KSV_STOCK_IN.map((item) => item.VENDOR_NAME),
        );

        if (vendorSet.size > 1) {
            alert("The selected items have different SUPPLIERs.");
            return;
        }

        setLoadingTBL_KSV_STOCK_IN(true);
        serviceS0423_TAXBILL
            .mgrQuery_BVT_PAYMENT_REQUEST(
                selectedTBL_KSV_STOCK_IN.map(
                    ({ __typename, id, BILL_END_FLAG, ...rest }) => rest,
                ),
                dataQRY_KSV_STOCK_IN,
            )
            .then((data) => {
                console.log(data);
                setLoadingTBL_KSV_STOCK_IN(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        }
                    }
                } else {
                    console.log(
                        "Search List error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const GW_WINDOW_NAME = "GW_TAXBILL_POPUP";
    const gwWinRef = useRef(null);

    const request_GW_one = () => {
        // 이미 열려 있으면 새로 안 띄움
        if (gwWinRef.current?.closed === false) {
            alert("이미 열려 있는 창이 있습니다.<br><br>There is already a window open.");
            gwWinRef.current.focus();
            return;
        }

        var tEdit = { ...dataEDT_KSV_STOCK_IN };
        var tIn = [...selectedTBL_KSV_STOCK_IN];
        var tIn1 = [...datasTBL_KSV_STOCK_IN1];

        if (tIn1.length < 4) return;

        let tCurrDate1 = serviceLib.getCurrDate1();
        let tKrwTotal = tIn1[3].KRW;
        let tUsdTotal = tIn1[3].USD;
        let tCnyTotal = tIn1[3].CNY;
        let tEurTotal = tIn1[3].EUR;
        let tGbpTotal = tIn1[3].GBP;
        let tJpyTotal = tIn1[3].JPY;
        let tOtherTotal = tIn1[3].OTHER;
        let tVndTotal = tIn1[3].VND;

        var tVendorCheck = 0;
        var tSaveVendorName = "";
        tIn.forEach((col, i) => {
            if (i === 0) {
                tSaveVendorName = col.VENDOR_NAME;
            } else {
                if (tSaveVendorName === col.VENDOR_NAME);
                else tVendorCheck = 1;
                tSaveVendorName = col.VENDOR_NAME;
            }
        });
        let vendorTitle = `${tIn[0].VENDOR_NAME} - `;
        // if (tIn.length > 1) vendorTitle = '';
        if (tVendorCheck > 0) vendorTitle = "";

        let currTotalTitle = ``;
        if (parseFloat(tCnyTotal) > 0) currTotalTitle += ` / CNY ${tCnyTotal}`;
        if (parseFloat(tEurTotal) > 0) currTotalTitle += ` / EUR ${tEurTotal}`;
        if (parseFloat(tGbpTotal) > 0) currTotalTitle += ` / GBP ${tGbpTotal}`;
        if (parseFloat(tJpyTotal) > 0) currTotalTitle += ` / JPY ${tJpyTotal}`;
        if (parseFloat(tOtherTotal) > 0)
            currTotalTitle += ` / OTHER ${tOtherTotal}`;
        if (parseFloat(tVndTotal) > 0) currTotalTitle += ` / VND ${tVndTotal}`;

        var tTitle = `[국내자재 일반송금] ${moment(tEdit.PAY_DATE, "YYYYMMDD").format("YYYY-MM-DD")} ${vendorTitle}KRW ${serviceLib.formatNumber(tKrwTotal)} / USD ${serviceLib.formatNumber(tUsdTotal, 2)}${currTotalTitle} (환종별 합계금액)`;
        var tInfo = `${moment(tEdit.PAY_DATE, "YYYYMMDD").format("YYYY-MM-DD")}/?/${tEdit.PAY_DATE_WEEK}/?/`;
        tIn1.forEach((col, i) => {
            if (i <= 3)
                tInfo += `${serviceLib.numWithCommas(col.KRW, 0)}/?/${serviceLib.numWithCommas(col.USD, 2)}/?/${serviceLib.numWithCommas(col.EUR, 2)}/?/${serviceLib.numWithCommas(col.GBP, 2)}/?/${serviceLib.numWithCommas(col.JPY, 2)}/?/${serviceLib.numWithCommas(col.CNY, 2)}/?/${serviceLib.numWithCommas(col.OTHER, 2)}/?/`;
        });

        var tPayType = "";
        var tDetail = "";
        var tBillCds = "";
        tIn.forEach((col, i) => {
            tDetail += `${col.id}/?/`;
            tDetail += `${col.TAX_KIND_N}/?/`;
            tDetail += `${col.VENDOR_NAME}/?/`;
            tDetail += `${col.BILL_CD}/?/`;
            tDetail  +=  `${moment(col.INVOICE_DATE, 'YYYYMMDD').format('YYYY-MM-DD')}/?/`;
            // tDetail += `${moment(tEdit.PAY_DATE, "YYYYMMDD").format("YYYY-MM-DD")}/?/`;
            tDetail += `${col.PAY_TERM}/?/`;
            tDetail += `${col.PAY_TYPE}/?/`;
            tDetail += `${serviceLib.formatNumber(col.IN_PAY_AMT, 2)}/?/`;
            /*
      tDetail  +=  `${col.PAY_AMT}/?/`;
      */
            tDetail += `${col.CURR_CD}/?/`;
            tDetail += `${col.BANK_NAME}/?/`;
            tDetail += `${col.ACCOUNT_NO}/?/`;
            tDetail += `${col.ACCOUNT_NAME}/?/`;
            tBillCds += `${col.SFTCODE}:`;
        });

        const post_data = {};
        post_data.data0 = tTitle;
        post_data.data1 = tInfo;
        post_data.data2 = tDetail;
        post_data.data3 = tBillCds;

        var tUserInfo = serviceLib.getUserInfo();

        let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
        axios
            .post(
                `${_url1}request_gw_taxbill/ML/${tCurrDate1}/${tUserInfo.USER_ID}`,
                post_data,
            )
            .then((response) => {
                console.log(response.data);
                console.log(
                    "GW RES DATA(GW_one): " +
                        response.data.data.ADDRESS +
                        "=>" +
                        response.data.data.APPROKEY,
                );
                // setUrlOrderInfo(response.data.data.ADDRESS);
                // searchORDER_INFO();
                gwWinRef.current = window.open(
                    response.data.data.ADDRESS,
                    GW_WINDOW_NAME,
                );

                // 닫힘 감시 — 닫히면 ref 초기화
                const timer = setInterval(() => {
                    if (gwWinRef.current?.closed) {
                        gwWinRef.current = null;
                        clearInterval(timer);
                    }
                }, 500);

                process_GW_update(response.data.data.APPROKEY, tEdit.PAY_DATE);
                // search_LIST_1();
            });
    };

    const request_GW_taxbill = () => {
        // 이미 열려 있으면 새로 안 띄움
        if (gwWinRef.current?.closed === false) {
            alert("이미 열려 있는 창이 있습니다.<br><br>There is already a window open.");
            gwWinRef.current.focus();
            return;
        }

        let tEdit = { ...dataEDT_KSV_STOCK_IN };
        let tIn = [...selectedTBL_KSV_STOCK_IN];
        let tIn1 = [...datasTBL_KSV_STOCK_IN1];

        if (tIn1.length < 4) return;

        let tCurrDate1 = serviceLib.getCurrDate1();
        let tKrwTotal = tIn1[3].KRW;
        let tUsdTotal = tIn1[3].USD;
        let tCnyTotal = tIn1[3].CNY;
        let tEurTotal = tIn1[3].EUR;
        let tGbpTotal = tIn1[3].GBP;
        let tJpyTotal = tIn1[3].JPY;
        let tOtherTotal = tIn1[3].OTHER;
        let tVndTotal = tIn1[3].VND;

        var tVendorCheck = 0;
        var tSaveVendorName = "";
        tIn.forEach((col, i) => {
            if (i === 0) {
                tSaveVendorName = col.VENDOR_NAME;
            } else {
                if (tSaveVendorName === col.VENDOR_NAME);
                else tVendorCheck = 1;
                tSaveVendorName = col.VENDOR_NAME;
            }
        });
        let vendorTitle = `${tIn[0].VENDOR_NAME} - `;
        // if (tIn.length > 1) vendorTitle = '';
        if (tVendorCheck > 0) vendorTitle = "";

        let currTotalTitle = ``;
        if (parseFloat(tCnyTotal) > 0) currTotalTitle += ` / CNY ${tCnyTotal}`;
        if (parseFloat(tEurTotal) > 0) currTotalTitle += ` / EUR ${tEurTotal}`;
        if (parseFloat(tGbpTotal) > 0) currTotalTitle += ` / GBP ${tGbpTotal}`;
        if (parseFloat(tJpyTotal) > 0) currTotalTitle += ` / JPY ${tJpyTotal}`;
        if (parseFloat(tOtherTotal) > 0)
            currTotalTitle += ` / OTHER ${tOtherTotal}`;
        if (parseFloat(tVndTotal) > 0) currTotalTitle += ` / VND ${tVndTotal}`;

        var tTitle = '';
        var tRequestType = '';
        if (tIn[0].VENDOR_TYPE === "3") {
            tTitle = `[해외자재 세금계산서 수취] ${vendorTitle}KRW ${serviceLib.formatNumber(tKrwTotal)} / USD ${serviceLib.formatNumber(tUsdTotal, 2)}${currTotalTitle} (환종별 합계금액)`;
            tRequestType = 'IT';
        } else {
            tTitle = `[국내자재 세금계산서 수취] ${vendorTitle}KRW ${serviceLib.formatNumber(tKrwTotal)} / USD ${serviceLib.formatNumber(tUsdTotal, 2)}${currTotalTitle} (환종별 합계금액)`;
            tRequestType = 'DT';
        }
        var tInfo = `${moment(tEdit.PAY_DATE, "YYYYMMDD").format("YYYY-MM-DD")}/?/${tEdit.PAY_DATE_WEEK}/?/`;
        tIn1.forEach((col, i) => {
            if (tIn[0].VENDOR_TYPE === "3") {
                if (i === 4) {
                    tInfo += `0/?/0/?/0/?/0/?/0/?/0/?/0/?/`;
                    tInfo += `0/?/0/?/0/?/0/?/0/?/0/?/0/?/`;
                    tInfo += `${serviceLib.numWithCommas(col.KRW, 0)}/?/${serviceLib.numWithCommas(col.USD, 2)}/?/${serviceLib.numWithCommas(col.EUR, 2)}/?/${serviceLib.numWithCommas(col.GBP, 2)}/?/${serviceLib.numWithCommas(col.JPY, 2)}/?/${serviceLib.numWithCommas(col.CNY, 2)}/?/${serviceLib.numWithCommas(col.OTHER, 2)}/?/`;
                    tInfo += `${serviceLib.numWithCommas(col.KRW, 0)}/?/${serviceLib.numWithCommas(col.USD, 2)}/?/${serviceLib.numWithCommas(col.EUR, 2)}/?/${serviceLib.numWithCommas(col.GBP, 2)}/?/${serviceLib.numWithCommas(col.JPY, 2)}/?/${serviceLib.numWithCommas(col.CNY, 2)}/?/${serviceLib.numWithCommas(col.OTHER, 2)}/?/`;
                }
            } else {
                if (i <= 3)
                    tInfo += `${serviceLib.numWithCommas(col.KRW, 0)}/?/${serviceLib.numWithCommas(col.USD, 2)}/?/${serviceLib.numWithCommas(col.EUR, 2)}/?/${serviceLib.numWithCommas(col.GBP, 2)}/?/${serviceLib.numWithCommas(col.JPY, 2)}/?/${serviceLib.numWithCommas(col.CNY, 2)}/?/${serviceLib.numWithCommas(col.OTHER, 2)}/?/`;
            }
        });

        var tPayType = "";
        var tDetail = "";
        var tBillCds = "";
        tIn.forEach((col, i) => {
            tDetail += `${col.id}/?/`;
            tDetail += `${col.BILL_CD}/?/`;
            tDetail += `${col.TAX_KIND_N}/?/`;
            tDetail += `${col.VENDOR_NAME}/?/`;
            tDetail += `${moment(col.INVOICE_DATE, "YYYYMMDD").format("YYYY-MM-DD")}/?/`;
            tDetail += `${col.CURR_CD}/?/`;

            var tPayAmt =
                parseFloat(col.PO_AMT) -
                parseFloat(col.DEPOSIT_AMT) -
                parseFloat(col.LC_AMT) -
                parseFloat(col.DEBIT_AMT) -
                parseFloat(col.DISCOUNT_AMT);
            tPayAmt = tPayAmt.toFixed(2);

            var tVatAmt = parseFloat(col.VAT_AMT);
            tVatAmt = tVatAmt.toFixed(2);

            var tTotAmt = parseFloat(tPayAmt) + parseFloat(tVatAmt);
            tTotAmt = tTotAmt.toFixed(2);

            tDetail += `${serviceLib.numWithCommas(tPayAmt, 2)}/?/`;
            tDetail += `${serviceLib.numWithCommas(tVatAmt, 2)}/?/`;
            tDetail += `${serviceLib.numWithCommas(tTotAmt, 2)}/?/`;
            tDetail += `${moment(col.PAY_DATE, "YYYYMMDD").format("YYYY-MM-DD")}/?/`;

            tBillCds += `${col.SFTCODE}:`;
        });

        const post_data = {};
        post_data.data0 = tTitle;
        post_data.data1 = tInfo;
        post_data.data2 = tDetail;
        post_data.data3 = tBillCds;

        var tUserInfo = serviceLib.getUserInfo();

        let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
        axios
            .post(
                `${_url1}request_gw_taxbill/${tRequestType}/${tCurrDate1}/${tUserInfo.USER_ID}`,
                post_data,
            )
            .then((response) => {
                console.log(response.data);
                console.log(
                    "GW RES DATA: " +
                        response.data.data.ADDRESS +
                        "=>" +
                        response.data.data.APPROKEY,
                );
                // setUrlOrderInfo(response.data.data.ADDRESS);
                // searchORDER_INFO();
                gwWinRef.current = window.open(
                    response.data.data.ADDRESS,
                    GW_WINDOW_NAME,
                );

                // 닫힘 감시 — 닫히면 ref 초기화
                const timer = setInterval(() => {
                    if (gwWinRef.current?.closed) {
                        gwWinRef.current = null;
                        clearInterval(timer);
                    }
                }, 500);

                process_GW_TAXBILL_update(response.data.data.APPROKEY);
                // search_LIST_1();
            });
    };

    const request_GW_one_oversea = () => {
        // 이미 열려 있으면 새로 안 띄움
        if (gwWinRef.current?.closed === false) {
            alert("이미 열려 있는 창이 있습니다.<br><br>There is already a window open.");
            gwWinRef.current.focus();
            return;
        }

        var tEdit = { ...dataEDT_KSV_STOCK_IN };
        var tIn = [...selectedTBL_KSV_STOCK_IN];
        var tIn1 = [...datasTBL_KSV_STOCK_IN1];

        if (tIn1.length < 4) return;

        let tCurrDate1 = serviceLib.getCurrDate1();
        let tKrwTotal = tIn1[3].KRW;
        let tUsdTotal = tIn1[3].USD;
        let tCnyTotal = tIn1[3].CNY;
        let tEurTotal = tIn1[3].EUR;
        let tGbpTotal = tIn1[3].GBP;
        let tJpyTotal = tIn1[3].JPY;
        let tOtherTotal = tIn1[3].OTHER;
        let tVndTotal = tIn1[3].VND;

        var tVendorCheck = 0;
        var tSaveVendorName = "";
        tIn.forEach((col, i) => {
            if (i === 0) {
                tSaveVendorName = col.VENDOR_NAME;
            } else {
                if (tSaveVendorName === col.VENDOR_NAME);
                else tVendorCheck = 1;
                tSaveVendorName = col.VENDOR_NAME;
            }
        });
        let vendorTitle = `${tIn[0].VENDOR_NAME} - `;
        // if (tIn.length > 1) vendorTitle = '';
        if (tVendorCheck > 0) vendorTitle = "";

        let currTotalTitle = ``;
        if (parseFloat(tCnyTotal) > 0) currTotalTitle += ` / CNY ${tCnyTotal}`;
        if (parseFloat(tEurTotal) > 0) currTotalTitle += ` / EUR ${tEurTotal}`;
        if (parseFloat(tGbpTotal) > 0) currTotalTitle += ` / GBP ${tGbpTotal}`;
        if (parseFloat(tJpyTotal) > 0) currTotalTitle += ` / JPY ${tJpyTotal}`;
        if (parseFloat(tOtherTotal) > 0)
            currTotalTitle += ` / OTHER ${tOtherTotal}`;
        if (parseFloat(tVndTotal) > 0) currTotalTitle += ` / VND ${tVndTotal}`;

        var tTitle = `[해외자재 송금요청] ${moment(tEdit.PAY_DATE, "YYYYMMDD").format("YYYY-MM-DD")} ${vendorTitle}KRW ${serviceLib.formatNumber(tKrwTotal)} / USD ${serviceLib.formatNumber(tUsdTotal, 2)}${currTotalTitle} (환종별 합계금액)`;
        var tInfo = `${moment(tEdit.PAY_DATE, "YYYYMMDD").format("YYYY-MM-DD")}/?/${tEdit.PAY_DATE_WEEK}/?/`;
        tIn1.forEach((col, i) => {
            if (i === 4)
                tInfo += `${serviceLib.numWithCommas(col.KRW, 0)}/?/${serviceLib.numWithCommas(col.USD, 2)}/?/${serviceLib.numWithCommas(col.EUR, 2)}/?/${serviceLib.numWithCommas(col.VND, 2)}/?/${serviceLib.numWithCommas(col.GBP, 2)}/?/${serviceLib.numWithCommas(col.JPY, 2)}/?/${serviceLib.numWithCommas(col.CNY, 2)}/?/${serviceLib.numWithCommas(col.OTHER, 2)}/?/`;
        });

        var tPayType = "";
        var tSwiftCode = "";
        var tDetail = "";
        var tBillCds = "";
        tIn.forEach((col, i) => {
            tDetail += `${col.id}/?/`;
            tDetail += `${col.VENDOR_NAME}/?/`;
            tDetail += `${col.BILL_CD}/?/`;
            // tDetail += `${moment(tEdit.PAY_DATE, "YYYYMMDD").format("YYYY-MM-DD")}/?/`;
            tDetail += `${moment(col.INVOICE_DATE, "YYYYMMDD").format("YYYY-MM-DD")}/?/`;
            tDetail += `${col.PAY_TERM}/?/`;
            tDetail += `${col.PAY_TYPE}/?/`;
            tDetail += `${serviceLib.formatNumber(col.IN_PAY_AMT, 2)}/?/`;
            /*
      tDetail  +=  `${col.PAY_AMT}/?/`;
       */
            tDetail += `${col.CURR_CD}/?/`;
            tDetail += `${col.BANK_NAME}/?/`;
            tDetail += `${col.ACCOUNT_NO}/?/`;
            tDetail += `${col.ACCOUNT_NAME}/?/`;
            tDetail += `${col.SFTCODE ? col.SFTCODE : ""}/?/`;
            tBillCds += `${col.BILL_CD}:`;
        });

        const post_data = {};
        post_data.data0 = tTitle;
        post_data.data1 = tInfo;
        post_data.data2 = tDetail;
        post_data.data3 = tBillCds;

        var tUserInfo = serviceLib.getUserInfo();

        let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
        axios
            .post(
                `${_url1}request_gw_taxbill/MI/${tCurrDate1}/${tUserInfo.USER_ID}`,
                post_data,
            )
            .then((response) => {
                console.log(response.data);
                console.log(
                    "GW RES DATA: " +
                        response.data.data.ADDRESS +
                        "=>" +
                        response.data.data.APPROKEY,
                );

                gwWinRef.current = window.open(
                    response.data.data.ADDRESS,
                    GW_WINDOW_NAME,
                );

                // 닫힘 감시 — 닫히면 ref 초기화
                const timer = setInterval(() => {
                    if (gwWinRef.current?.closed) {
                        gwWinRef.current = null;
                        clearInterval(timer);
                    }
                }, 500);

                process_GW_update(response.data.data.APPROKEY, tEdit.PAY_DATE);
                // search_LIST_1();
            });
    };

    const popup_BILL_REGIST = (argData) => {
        var tUrl = `${window.location.origin}/#/`;

        if (!argData.BILL_CD) {
            if (typeof argData.BILL_CD === "undefined");
            else return;
        }

        if (typeof argData.BILL_CD !== "undefined") {
            tUrl += `S0419_ENDDING_MATL_AMT_DOMESTIC?BILL_CD=${argData.BILL_CD}&VENDOR_CD=${argData.VENDOR_CD}&END_DATE=${argData.INVOICE_DATE}`;
        } else tUrl += `S0419_ENDDING_MATL_AMT_DOMESTIC`;

        console.log(argData);

        var tUrl2 = "";
        var tValObj = {};
        if (typeof argData.BILL_CD !== "undefined") {
            tUrl2 = `S0419_ENDDING_MATL_AMT_DOMESTIC?BILL_CD=${argData.BILL_CD}`;
            tValObj = {
                key: "3-7",
                label: "Bill Info",
                icon: "pi pi-fw pi-user-edit",
                url1: "S0419_ENDDING_MATL_AMT_DOMESTIC",
            };
        } else {
            tUrl2 = `S0419_ENDDING_MATL_AMT_DOMESTIC`;
            tValObj = {
                key: "3-7",
                label: "Bill Regist",
                icon: "pi pi-fw pi-user-edit",
                url1: "S0419_ENDDING_MATL_AMT_DOMESTIC",
            };
        }
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    const popup_UPDATE_DN = () => {
        search_LIST_4();
        setCreateDialog(true);
    };

    const process_UPDATE_DN = () => {
        var tArray0 = [...selectedTBL_KSV_STOCK_IN];
        var tArray = [];

        var tIdx = 0;
        for (tIdx = 0; tIdx < tArray0.length; tIdx++) {
            var tObj = { ...tArray0[tIdx] };
            Object.keys(tObj).forEach((col, i) => {
                if (tObj[`${col}`] === null || tObj[`${col}`] === " ") {
                    tObj[`${col}`] = "";
                }
            });
            delete tObj.id;
            delete tObj.__typename;
            tObj.TAXBILL_DATE = dataQRY_KSV_STOCK_IN.TAXBILL_DATE;
            tArray.push(tObj);
        }

        var tInObj1 = { ...dataEDT_KSV_CRDB_MST };

        var tInObj2 = { ...selectedTBL_KSV_CRDB_MST[0] };
        delete tInObj2.id;
        delete tInObj2.__typename;

        serviceS0423_TAXBILL
            .mgrInsert_UPDATE_DN(tArray, tInObj1, tInObj2)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            setCreateDialog(false);
                        }
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "FAILED: Taxbill",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_DELETE_DN = () => {
        var tArray0 = [...selectedTBL_KSV_STOCK_IN];
        var tArray = [];

        var tIdx = 0;
        for (tIdx = 0; tIdx < tArray0.length; tIdx++) {
            var tObj = { ...tArray0[tIdx] };
            Object.keys(tObj).forEach((col, i) => {
                if (tObj[`${col}`] === null || tObj[`${col}`] === " ") {
                    tObj[`${col}`] = "";
                }
            });
            delete tObj.id;
            delete tObj.__typename;
            tObj.TAXBILL_DATE = dataQRY_KSV_STOCK_IN.TAXBILL_DATE;
            tArray.push(tObj);
        }

        var tInObj1 = { ...dataEDT_KSV_CRDB_MST };

        var tInObj2 = { ...selectedTBL_KSV_CRDB_MST[0] };
        delete tInObj2.id;
        delete tInObj2.__typename;

        serviceS0423_TAXBILL
            .mgrInsert_DELETE_DN(tArray, tInObj1, tInObj2)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    if (data.length > 0)
                        toast.current.show({
                            severity: "success",
                            summary: "SUCCEED: Taxbill",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "FAILED: Taxbill",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_UPDATE_DC = () => {
        if (selectedTBL_KSV_STOCK_IN.length <= 0) {
            toast.current.show({
                severity: "success",
                summary: "INFO",
                detail: "선택된 항목이 없습니다",
                life: 3000,
            });
            return;
        }

        var tArray0 = [...selectedTBL_KSV_STOCK_IN];
        var tArray = [];

        var tIdx = 0;
        for (tIdx = 0; tIdx < tArray0.length; tIdx++) {
            var tObj = { ...tArray0[tIdx] };
            Object.keys(tObj).forEach((col, i) => {
                if (tObj[`${col}`] === null || tObj[`${col}`] === " ") {
                    tObj[`${col}`] = "";
                }
            });
            delete tObj.id;
            delete tObj.__typename;
            tObj.TAXBILL_DATE = dataQRY_KSV_STOCK_IN.TAXBILL_DATE;
            tArray.push(tObj);
        }

        setLoadingTBL_KSV_STOCK_IN(true);
        serviceS0423_TAXBILL.mgrInsert_UPDATE_DC(tArray).then((data) => {
            setLoadingTBL_KSV_STOCK_IN(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                if (data.length > 0) {
                    alert(data[0].CODE);

                    if (data[0].CODE.includes("SUCC")) {
                        search_LIST_1();
                    }
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "FAILED: Taxbill",
                    detail: "",
                    life: 3000,
                });
            }
        });
    };

    const process_UPDATE_PAY_DATE = () => {
        if (selectedTBL_KSV_STOCK_IN.length <= 0) {
            alert("Select at least one item.");
            return;
        }

        const tTargetPayDate = dataEDT_KSV_STOCK_IN.PAY_DATE || "";
        if (tTargetPayDate === "") {
            alert("Select Pay Date first.");
            return;
        }

        const tArray = selectedTBL_KSV_STOCK_IN.map((row) => {
            const tObj = { ...row };
            Object.keys(tObj).forEach((key) => {
                if (tObj[key] === null || tObj[key] === " ") {
                    tObj[key] = "";
                }
            });
            delete tObj.id;
            delete tObj.__typename;
            return tObj;
        });

        if (tArray.length <= 0) {
            alert("No data to update.");
            return;
        }

        setLoadingTBL_KSV_STOCK_IN(true);
        serviceS0423_TAXBILL
            .mgrUpdate_PAY_DATE(tArray, tTargetPayDate)
            .then((data) => {
                setLoadingTBL_KSV_STOCK_IN(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_LIST_1();
                        }
                    }
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "FAILED: Update Pay Date",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_GW_update = (argAppKey, argPayDate) => {
        var tArray0 = [...selectedTBL_KSV_STOCK_IN];
        var tArray = [];

        var tIdx = 0;
        for (tIdx = 0; tIdx < tArray0.length; tIdx++) {
            var tObj = { ...tArray0[tIdx] };
            Object.keys(tObj).forEach((col, i) => {
                if (tObj[`${col}`] === null || tObj[`${col}`] === " ") {
                    tObj[`${col}`] = "";
                }
            });
            delete tObj.id;
            delete tObj.__typename;

            tObj.APPROKEY = argAppKey;
            tObj.APPROKEY_TAXBILL = "";
            tObj.PAY_DATE = argPayDate;
            tArray.push(tObj);
        }

        // 5-3
        serviceS0423_TAXBILL.mgrInsert_GW(tArray).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    if (data[0].CODE.includes("ERR")) {
                        alert(data[0].CODE);
                    } else {
                        search_LIST_1();
                    }
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "FAILED: Taxbill",
                    detail: "",
                    life: 3000,
                });
            }
        });
    };

    const process_GW_TAXBILL_update = (argAppKey) => {
        var tArray0 = [...selectedTBL_KSV_STOCK_IN];
        var tArray = [];

        var tIdx = 0;
        for (tIdx = 0; tIdx < tArray0.length; tIdx++) {
            var tObj = { ...tArray0[tIdx] };
            Object.keys(tObj).forEach((col, i) => {
                if (tObj[`${col}`] === null || tObj[`${col}`] === " ") {
                    tObj[`${col}`] = "";
                }
            });
            delete tObj.id;
            delete tObj.__typename;
            tObj.APPROKEY = "";
            tObj.APPROKEY_TAXBILL = argAppKey;
            tArray.push(tObj);
        }

        // 5-3
        serviceS0423_TAXBILL.mgrInsert_GW_TAXBILL(tArray).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    if (data[0].CODE.includes("ERR")) alert(data[0].CODE);
                    search_LIST_1();
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "FAILED: Taxbill",
                    detail: "",
                    life: 3000,
                });
            }
        });
    };

    const process_TAXBILL_CANCEL = () => {
        var tArray0 = [...selectedTBL_KSV_STOCK_IN];
        var tArray = [];

        var tIdx = 0;
        var tCheck1 = 0;
        var tCheck2 = 0;
        for (tIdx = 0; tIdx < tArray0.length; tIdx++) {
            var tObj = { ...tArray0[tIdx] };
            Object.keys(tObj).forEach((col, i) => {
                if (tObj[`${col}`] === null || tObj[`${col}`] === " ") {
                    tObj[`${col}`] = "";
                }
            });
            delete tObj.id;
            delete tObj.__typename;
            tObj.TAXBILL_DATE = dataQRY_KSV_STOCK_IN.TAXBILL_DATE;

            if (tObj.APPROKEY) {
                if (
                    tObj.GW_STATUS_N &&
                    (tObj.GW_STATUS_N === "END" || tObj.GW_STATUS_N === "SEND")
                )
                    tCheck1 = 1;
            }
            if (tObj.DOCU_NO) tCheck2 = 1;

            tArray.push(tObj);
        }

        if (tCheck1 === 1) {
            alert("[GW] Bills in progress cannot be cancelled.");
            return;
        }

        if (tCheck2 === 1) {
            alert("A bill that has been issued cannot be cancelled.[NEOE NO]");
            return;
        }

        if (tArray.length > 0) {
            setLoadingTBL_KSV_STOCK_IN(true);
            serviceS0423_TAXBILL.mgrInsert_BILL_CANCEL(tArray).then((data) => {
                setLoadingTBL_KSV_STOCK_IN(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        search_LIST_1();
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "FAILED: Taxbill",
                        detail: "",
                        life: 3000,
                    });
                }
            });
        }
    };

    const search_LIST_1 = (arg) => {
        var tObj = { ...dataQRY_KSV_STOCK_IN };

        if (arg) {
            if (arg.BILL_CD) {
                tObj = { ...tObj, BILL_CD: arg.BILL_CD || "" };
            }
        }

        Object.keys(tObj).forEach((col, i) => {
            if (tObj[`${col}`] === null || tObj[`${col}`] === " ") {
                tObj[`${col}`] = "";
            }
        });

        let gwStatus = dataQRY_KSV_STOCK_IN_GW_STATUS.CD_NAME;

        setDatasTBL_KSV_STOCK_IN([]);
        setSelectedTBL_KSV_STOCK_IN([]);

        console.log(tObj);

        setLoadingTBL_KSV_STOCK_IN(true);
        serviceS0423_TAXBILL.mgrQuery_LIST_1(tObj).then((data) => {
            console.log(data);
            setLoadingTBL_KSV_STOCK_IN(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.MESSAGE !== "") alert(data.MESSAGE);
                var tArray = data.DATAS.map((col, i) => {
                    var tObj = { ...col };

                    tObj.PO_AMT = String(serviceLib.getFloat(tObj.PO_AMT, 2));
                    tObj.id = i + 1;

                    return tObj;
                });

                setDatasTBL_KSV_STOCK_IN(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_4 = () => {
        console.log(`LIST4: ${selectedTBL_KSV_STOCK_IN.length}`);
        var tObj0 = {
            ...selectedTBL_KSV_STOCK_IN[selectedTBL_KSV_STOCK_IN.length - 1],
        };

        var tObj = {};
        tObj.CRDB_CD = "";
        tObj.VENDOR_CD = tObj0.VENDOR_CD;
        tObj.CURR_CD = tObj0.CURR_CD;

        setDatasTBL_KSV_CRDB_MST([]);
        setSelectedTBL_KSV_CRDB_MST([]);
        setDatasTBL_KSV_CRDB_MST2([]);

        // 4
        serviceS0423_TAXBILL.mgrQuery_LIST_4(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_CRDB_MST(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_4_1 = (argData) => {
        var tObj = {};
        tObj.CRDB_CD = argData.CRDB_CD;
        tObj.VENDOR_CD = argData.MEESER_CD;
        tObj.CURR_CD = argData.CURR_CD;

        setDatasTBL_KSV_CRDB_MST2([]);
        setSelectedTBL_KSV_CRDB_MST2([]);

        // 4_1
        serviceS0423_TAXBILL.mgrQuery_LIST_4_1(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tMemAmt = 0;
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tMemAmt += parseFloat(tObj.CRDB_AMT);
                    return tObj;
                });
                setDatasTBL_KSV_CRDB_MST2(tArray);
                var tRestAmt = parseFloat(argData.CRDB_AMT) - tMemAmt;

                var tObj2 = { ...dataEDT_KSV_CRDB_MST };
                tObj2.CRDB_CD = argData.CRDB_CD;
                tObj2.PART_AMT = String(tRestAmt);
                tObj2.REST_AMT = tObj2.PART_AMT;
                setDataEDT_KSV_CRDB_MST(tObj2);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /* EDT KSV_STOCK_IN */
    const [dataEDT_KSV_STOCK_IN, setDataEDT_KSV_STOCK_IN] = useState(
        emptyEDT_KSV_STOCK_IN,
    );

    const onCalChangeEDT_KSV_STOCK_IN_PAY_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_STOCK_IN = { ...dataEDT_KSV_STOCK_IN };
        _dataEDT_KSV_STOCK_IN[`${name}`] = val;
        _dataEDT_KSV_STOCK_IN[`PAY_DATE_WEEK`] = serviceLib.getWeek(val);
        setDataEDT_KSV_STOCK_IN(_dataEDT_KSV_STOCK_IN);
    };

    const onInputChangeEDT_KSV_STOCK_IN_PAY_DATE_WEEK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_IN = { ...dataEDT_KSV_STOCK_IN };

        let tTypeVal = _dataEDT_KSV_STOCK_IN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_IN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_IN[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_IN(_dataEDT_KSV_STOCK_IN);
    };

    /* QRY KSV_STOCK_IN */
    const [dataQRY_KSV_STOCK_IN, setDataQRY_KSV_STOCK_IN] = useState(
        emptyQRY_KSV_STOCK_IN,
    );

    const onInputChangeQRY_KSV_STOCK_IN = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };

        let tTypeVal = _dataQRY_KSV_STOCK_IN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_IN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_IN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
    };

    const onInputChangeQRY_KSV_STOCK_IN_BILL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };

        let tTypeVal = _dataQRY_KSV_STOCK_IN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_IN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_IN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
    };

    const onCalChangeQRY_KSV_STOCK_IN_S_IN_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };
        _dataQRY_KSV_STOCK_IN[`${name}`] = val;
        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
    };

    const onCalChangeQRY_KSV_STOCK_IN_E_IN_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };
        _dataQRY_KSV_STOCK_IN[`${name}`] = val;
        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
    };

    const [
        datasQRY_KSV_STOCK_IN_VENDOR_CD,
        setDatasQRY_KSV_STOCK_IN_VENDOR_CD,
    ] = useState([]);
    const [dataQRY_KSV_STOCK_IN_VENDOR_CD, setDataQRY_KSV_STOCK_IN_VENDOR_CD] =
        useState({});

    const [
        datasQRY_KSV_STOCK_IN_VENDOR_TYPE,
        setDatasQRY_KSV_STOCK_IN_VENDOR_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_IN_VENDOR_TYPE,
        setDataQRY_KSV_STOCK_IN_VENDOR_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_IN_VENDOR_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };

        let tTypeVal = _dataQRY_KSV_STOCK_IN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
        setDataQRY_KSV_STOCK_IN_VENDOR_TYPE(e.value);
    };

    const [datasQRY_KSV_STOCK_IN_TAX_KIND, setDatasQRY_KSV_STOCK_IN_TAX_KIND] =
        useState([]);
    const [dataQRY_KSV_STOCK_IN_TAX_KIND, setDataQRY_KSV_STOCK_IN_TAX_KIND] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_IN_TAX_KIND = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };

        let tTypeVal = _dataQRY_KSV_STOCK_IN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
        setDataQRY_KSV_STOCK_IN_TAX_KIND(e.value);
    };

    const onCalChangeQRY_KSV_STOCK_IN_S_PAY_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };
        _dataQRY_KSV_STOCK_IN[`${name}`] = val;
        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
    };

    const onCalChangeQRY_KSV_STOCK_IN_E_PAY_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };
        _dataQRY_KSV_STOCK_IN[`${name}`] = val;
        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
    };

    const onInputChangeQRY_KSV_STOCK_IN_REG_USER = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };

        let tTypeVal = _dataQRY_KSV_STOCK_IN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_IN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_IN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
    };

    const [
        datasQRY_KSV_STOCK_IN_GW_STATUS,
        setDatasQRY_KSV_STOCK_IN_GW_STATUS,
    ] = useState([]);
    const [dataQRY_KSV_STOCK_IN_GW_STATUS, setDataQRY_KSV_STOCK_IN_GW_STATUS] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_IN_GW_STATUS = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };

        let tTypeVal = _dataQRY_KSV_STOCK_IN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
        setDataQRY_KSV_STOCK_IN_GW_STATUS(e.value);
    };

    /* TABLE KSV_STOCK_IN*/
    // DEFINE DATAGRID : TBL_KSV_STOCK_IN
    const [loadingTBL_KSV_STOCK_IN, setLoadingTBL_KSV_STOCK_IN] =
        useState(false);

    const [datasTBL_KSV_STOCK_IN, setDatasTBL_KSV_STOCK_IN] = useState([]);
    const dt_TBL_KSV_STOCK_IN = useRef(null);
    const [dataTBL_KSV_STOCK_IN, setDataTBL_KSV_STOCK_IN] = useState(
        emptyTBL_KSV_STOCK_IN,
    );
    const [selectedTBL_KSV_STOCK_IN, setSelectedTBL_KSV_STOCK_IN] = useState(
        [],
    );
    const [flagSelectModeTBL_KSV_STOCK_IN, setFlagSelectModeTBL_KSV_STOCK_IN] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_STOCK_IN

    const onRowSelectTBL_KSV_STOCK_IN = (e) => {
        var argData = { ...e.data };
        calcPlusTBL_KSV_STOCK_IN1(e.data);
    };

    const onRowUnselectTBL_KSV_STOCK_IN = (e) => {
        var argData = { ...e.data };
        calcMinusTBL_KSV_STOCK_IN1(e.data);
    };

    const onRowClickTBL_KSV_STOCK_IN = (event) => {
        var tEDT = { ...dataEDT_KSV_STOCK_IN };
        tEDT.PAY_DATE = event.data.PAY_DATE;
        tEDT.PAY_DATE_WEEK = serviceLib.getWeek(tEDT.PAY_DATE);
        setDataEDT_KSV_STOCK_IN(tEDT);

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_IN
    };

    const onRowDoubleClickTBL_KSV_STOCK_IN = (argData0) => {
        popup_BILL_REGIST(argData0.data);
    };

    const onCellEditCompleteKSV_STOCK_IN = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        var tPoAmt = parseFloat(rowData.PO_AMT);
        var tDepositAmt = parseFloat(rowData.DEPOSIT_AMT);
        var tLcAmt = parseFloat(rowData.LC_AMT);
        var tDebitAmt = parseFloat(rowData.DEBIT_AMT);
        var tDiscountAmt = parseFloat(rowData.DISCOUNT_AMT);
        var tVatAmt = parseFloat(rowData.VAT_AMT);
        var tPaidAmt = parseFloat(rowData.PAID_AMT);
        var tPayAmt = parseFloat(rowData.PAY_AMT);

        //if (tPaidAmt > 0) return;

        var tBalAmt = tPoAmt - tDepositAmt - tLcAmt - tDebitAmt - tPaidAmt;

        if (field === "DISCOUNT_AMT") {
            rowData[field] = String(
                serviceLib.getFloat(parseFloat(newValue), 4),
            );
            tDiscountAmt = parseFloat(rowData[field]);

            var tTmpPayAmt = tBalAmt - tDiscountAmt;
            if (tVatAmt > 0) {
                tVatAmt = serviceLib.getFloat(tTmpPayAmt * 0.1, 4);
                tPayAmt = tTmpPayAmt + tVatAmt;
                tPayAmt = serviceLib.getFloat(tPayAmt, 4);
            } else {
                tPayAmt = tTmpPayAmt;
            }

            rowData.VAT_AMT = String(tVatAmt);
            rowData.DISCOUNT_AMT = String(tDiscountAmt);
            rowData.BAL_AMT = String(tPayAmt);
            rowData.IN_PAY_AMT = String(tPayAmt);
            setDataTBL_KSV_STOCK_IN(rowData);

            var tTempObj = { ...rowData };
            tTempObj.PAY_AMT = tPayAmt;
            calcMinusTBL_KSV_STOCK_IN1(tTempObj);
        }
        if (field === "IN_PAY_AMT") {
            var tInPayAmt = parseFloat(newValue);
            tBalAmt = parseFloat(rowData.PAY_AMT);
            console.log("IN_PAY_AMT");
            if (tInPayAmt >= tBalAmt) {
                rowData[field] = String(
                    serviceLib.getFloat(tBalAmt - tPaidAmt, 4),
                );
            } else {
                rowData[field] = String(serviceLib.getFloat(tInPayAmt, 4));
            }
            setDataTBL_KSV_STOCK_IN(rowData);
        }

        recalcTBL_KSV_STOCK_IN1();
    };

    const cellEditorKSV_STOCK_IN = (options) => {
        if (options.field === "DISCOUNT_AMT") {
            return textEditorNum(options);
        } else if (options.field === "IN_PAY_AMT") {
            return textEditorNum(options);
        } else {
            return textEditorText(options);
        }
    };

    const onChangeTextEdit = (e, options) => {
        console.log("onChangeTextEdit=>", e.target.value);
        options.editorCallback(e.target.value);
    };

    const changeInputValue = (argData) => {
        var tRet = "";
        if (argData === "") tRet = "";
        else {
            if (String(argData) === "0") tRet = "";
            else tRet = String(argData);
        }
        return tRet;
    };

    const handleFocus = (event) => event.target.select();

    const textEditorNum = (options) => {
        return (
            <InputText
                type="text"
                keyfilter="num"
                value={changeInputValue(options.value)}
                onChange={(e) => onChangeTextEdit(e, options)}
                onFocus={handleFocus}
            />
        );
    };

    const textEditorText = (options) => {
        return (
            <InputText
                type="text"
                value={changeInputValue(options.value)}
                onChange={(e) => onChangeTextEdit(e, options)}
                onFocus={handleFocus}
            />
        );
    };

    /**TABLE KSV_STOCK_IN1 */
    // DEFINE DATAGRID : TBL_KSV_STOCK_IN1
    const [datasTBL_KSV_STOCK_IN1, setDatasTBL_KSV_STOCK_IN1] = useState([]);
    const dt_TBL_KSV_STOCK_IN1 = useRef(null);
    const [dataTBL_KSV_STOCK_IN1, setDataTBL_KSV_STOCK_IN1] = useState(
        emptyTBL_KSV_STOCK_IN1,
    );
    const [selectedTBL_KSV_STOCK_IN1, setSelectedTBL_KSV_STOCK_IN1] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KSV_STOCK_IN1,
        setFlagSelectModeTBL_KSV_STOCK_IN1,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_STOCK_IN1

    // 여기서 금액계산
    const recalcTBL_KSV_STOCK_IN1 = (argData0) => {
        if (!argData0) {
            argData0 = selectedTBL_KSV_STOCK_IN;
        }

        var tOrgArray = resetTBL_KSV_STOCK_IN1();

        var tIdx = 0;
        for (tIdx = 0; tIdx < argData0.length; tIdx++) {
            var tOne = { ...argData0[tIdx] };
            var tValue = "";
            var tArray0 = [];
            tOrgArray.forEach((col, i) => {
                var tObj = { ...col };
                if (tObj.KIND === tOne.TAX_KIND_N) {
                    // tValue = parseFloat(tObj[`${tOne.CURR_CD}`]) + parseFloat(tOne.PAY_AMT);

                    var tSelValue = parseFloat(tOne.IN_PAY_AMT);
                    if (tSelValue <= 0) {
                        var tSelValue = parseFloat(tOne.PAID_AMT);
                    }
                    tValue = parseFloat(tObj[`${tOne.CURR_CD}`]) + tSelValue;
                    tValue = serviceLib.getFloat(tValue, 4);
                    if (
                        tOne.VENDOR_TYPE_N !== "FACTORY" &&
                        tObj.KIND !== "BVT"
                    ) {
                        tObj[`${tOne.CURR_CD}`] = String(tValue);
                    } else {
                        tObj[`${tOne.CURR_CD}`] = 0;
                    }

                    tArray0.push(tObj);
                } else if (
                    tOne.VENDOR_TYPE_N === "DOMESTIC" &&
                    tObj.KIND === "국내합계"
                ) {
                    // tValue = parseFloat(tObj[`${tOne.CURR_CD}`]) + parseFloat(tOne.PAY_AMT);
                    var tSelValue = parseFloat(tOne.IN_PAY_AMT);
                    if (tSelValue <= 0) {
                        var tSelValue = parseFloat(tOne.PAID_AMT);
                    }
                    tValue = parseFloat(tObj[`${tOne.CURR_CD}`]) + tSelValue;
                    tValue = serviceLib.getFloat(tValue, 4);
                    tObj[`${tOne.CURR_CD}`] = String(tValue);
                    tArray0.push(tObj);
                } else if (
                    tOne.VENDOR_TYPE_N === "IMPORT" &&
                    tObj.KIND === "T/T"
                ) {
                    // tValue = parseFloat(tObj[`${tOne.CURR_CD}`]) + parseFloat(tOne.PAY_AMT);
                    var tSelValue = parseFloat(tOne.IN_PAY_AMT);
                    if (tSelValue <= 0) {
                        var tSelValue = parseFloat(tOne.PAID_AMT);
                    }
                    tValue = parseFloat(tObj[`${tOne.CURR_CD}`]) + tSelValue;
                    tValue = serviceLib.getFloat(tValue, 4);
                    tObj[`${tOne.CURR_CD}`] = String(tValue);
                    tArray0.push(tObj);
                } else if (
                    tOne.VENDOR_TYPE_N === "FACTORY" &&
                    tObj.KIND === "BVT"
                ) {
                    // tValue = parseFloat(tObj[`${tOne.CURR_CD}`]) + parseFloat(tOne.PAY_AMT);
                    var tSelValue = parseFloat(tOne.IN_PAY_AMT);
                    if (tSelValue <= 0) {
                        var tSelValue = parseFloat(tOne.PAID_AMT);
                    }
                    tValue = parseFloat(tObj[`${tOne.CURR_CD}`]) + tSelValue;
                    tValue = serviceLib.getFloat(tValue, 4);
                    tObj[`${tOne.CURR_CD}`] = String(tValue);
                    tArray0.push(tObj);
                } else {
                    tArray0.push(tObj);
                }
            });

            tOrgArray = [...tArray0];
        }
        if (argData0.length > 0) setDatasTBL_KSV_STOCK_IN1(tArray0);
        else setDatasTBL_KSV_STOCK_IN1(tOrgArray);
    };

    const calcPlusTBL_KSV_STOCK_IN1 = (argData) => {
        return;
    };

    const calcMinusTBL_KSV_STOCK_IN1 = (argData) => {
        return;
    };

    const resetTBL_KSV_STOCK_IN1 = () => {
        var tArray = [
            "KIND",
            "KRW",
            "USD",
            "VND",
            "EUR",
            "GBP",
            "JPY",
            "CNY",
            "OTHER",
        ];
        var tArray1 = ["과세", "영세", "면세", "국내합계", "T/T", "BVT"];

        var tRetArray = [];
        var tIdx = 0;
        for (tIdx = 0; tIdx < tArray1.length; tIdx++) {
            var tObj = {};
            tArray.forEach((col, i) => {
                if (i === 0) tObj[`${col}`] = tArray1[tIdx];
                else tObj[`${col}`] = "0";
            });
            tRetArray.push(tObj);
        }
        setDatasTBL_KSV_STOCK_IN1(tRetArray);
        return tRetArray;
    };

    const onRowSelectTBL_KSV_STOCK_IN1 = (e) => {
        var argData = { ...e.data };

        var tArray = [...selectedTBL_KSV_STOCK_IN1];
        tArray.push(argData);

        tArray.forEach((col, i) => {});

        var tEdit = { ...dataEDT_KSV_STOCK_IN };
        setDataEDT_KSV_STOCK_IN(tEdit);
    };

    const onRowUnselectTBL_KSV_STOCK_IN1 = (e) => {
        var argData = { ...e.data };

        var tArray = [];
        selectedTBL_KSV_STOCK_IN1.forEach((col, i) => {
            var tObj = { ...col };
            if (col.id !== argData.id) tArray.push(tObj);
        });

        var tTotPoAmt = 0;
        var tTotPayAmt = 0;

        tArray.forEach((col, i) => {});

        var tEdit = { ...dataEDT_KSV_STOCK_IN };
        setDataEDT_KSV_STOCK_IN(tEdit);
    };

    const onRowClickTBL_KSV_STOCK_IN1 = (event) => {
        let argTBL_KSV_STOCK_IN1 = event.data;
        if (flagSelectModeTBL_KSV_STOCK_IN1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_IN1
    };

    // TBL_KSV_CRDB_MST
    const [datasTBL_KSV_CRDB_MST, setDatasTBL_KSV_CRDB_MST] = useState([]);
    const dt_TBL_KSV_CRDB_MST = useRef(null);
    const [dataTBL_KSV_CRDB_MST, setDataTBL_KSV_CRDB_MST] = useState(
        emptyTBL_KSV_CRDB_MST,
    );
    const [selectedTBL_KSV_CRDB_MST, setSelectedTBL_KSV_CRDB_MST] = useState(
        [],
    );
    const [flagSelectModeTBL_KSV_CRDB_MST, setFlagSelectModeTBL_KSV_CRDB_MST] =
        useState(false);

    const [loadingTBL_KSV_CRDB_MST, setLoadingTBL_KSV_CRDB_MST] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_CRDB_MST

    const onRowClick1TBL_KSV_CRDB_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_CRDB_MST = argData;

        setDataTBL_KSV_CRDB_MST(argTBL_KSV_CRDB_MST);

        setDatasTBL_KSV_CRDB_MST2([]);
        search_LIST_4_1(argData);
    };

    const onRowClickTBL_KSV_CRDB_MST = (event) => {
        let argTBL_KSV_CRDB_MST = event.data;
        if (flagSelectModeTBL_KSV_CRDB_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_CRDB_MST
    };

    // KSV_CRDB_MST2
    const [datasTBL_KSV_CRDB_MST2, setDatasTBL_KSV_CRDB_MST2] = useState([]);
    const dt_TBL_KSV_CRDB_MST2 = useRef(null);
    const [dataTBL_KSV_CRDB_MST2, setDataTBL_KSV_CRDB_MST2] = useState(
        emptyTBL_KSV_CRDB_MST2,
    );
    const [selectedTBL_KSV_CRDB_MST2, setSelectedTBL_KSV_CRDB_MST2] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KSV_CRDB_MST2,
        setFlagSelectModeTBL_KSV_CRDB_MST2,
    ] = useState(false);
    const [loadingTBL_KSV_CRDB_MST2, setLoadingTBL_KSV_CRDB_MST2] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_CRDB_MST2

    const onRowClick1TBL_KSV_CRDB_MST2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_CRDB_MST2 = argData;

        setDataTBL_KSV_CRDB_MST2(argTBL_KSV_CRDB_MST2);
    };

    const onRowClickTBL_KSV_CRDB_MST2 = (event) => {
        let argTBL_KSV_CRDB_MST2 = event.data;
        if (flagSelectModeTBL_KSV_CRDB_MST2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_CRDB_MST2
    };

    const [isShintsUser, setIsShintsUser] = useState(null);

    useEffect(() => {
        var tRetDate = serviceLib.getCurrDate().substring(0, 8);

        var tObj0 = { ...dataQRY_KSV_STOCK_IN };
        tObj0.S_PAY_DATE = `${tRetDate.substring(0, 6)}01`;
        tObj0.E_PAY_DATE = `${tRetDate.substring(0, 6)}31`;
        setDataQRY_KSV_STOCK_IN(tObj0);

        var tUserInfo = serviceLib.getUserInfo();
        if (tUserInfo.company_code === "shints" || tUserInfo.USER_ID === "elly")
            setIsShintsUser(true);
        else setIsShintsUser(false);

        var _tObj = {};
        _tObj.INVOICE_NO = "";
        _tObj.PACK_CD = "";

        serviceS0423_TAXBILL.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_STOCK_IN_GW_STATUS(data.GW_STATUS);
                setDataQRY_KSV_STOCK_IN_GW_STATUS(data.GW_STATUS[0]);

                setDatasQRY_KSV_STOCK_IN_TAX_KIND(data.TAX_KIND);
                setDataQRY_KSV_STOCK_IN_TAX_KIND(data.TAX_KIND[0]);

                setDatasQRY_KSV_STOCK_IN_VENDOR_TYPE(data.VENDOR_TYPE);
                setDataQRY_KSV_STOCK_IN_VENDOR_TYPE(data.VENDOR_TYPE[0]);

                var tCurrDate1 = serviceLib.getCurrDate1();
                var tCurrWeek = serviceLib.getCurrWeek();

                var tEdit = { ...dataEDT_KSV_STOCK_IN };
                tEdit.PAY_DATE = tCurrDate1;
                tEdit.PAY_DATE_WEEK = tCurrWeek;
                setDataEDT_KSV_STOCK_IN(tEdit);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        let billCd = serviceLib.getQueryParam("BILL_CD");

        if (billCd && billCd !== "") {
            var tObj1 = { ...dataQRY_KSV_STOCK_IN };
            tObj1.BILL_CD = billCd;
            setDataQRY_KSV_STOCK_IN(tObj1);
            search_LIST_1(tObj1);
        }

        resetTBL_KSV_STOCK_IN1();
    }, []);

    // EDT
    const [dataEDT_KSV_CRDB_MST, setDataEDT_KSV_CRDB_MST] = useState(
        emptyEDT_KSV_CRDB_MST,
    );

    const onInputChangeEDT_KSV_CRDB_MST_CRDB_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CRDB_MST = { ...dataEDT_KSV_CRDB_MST };

        let tTypeVal = _dataEDT_KSV_CRDB_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CRDB_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CRDB_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_CRDB_MST(_dataEDT_KSV_CRDB_MST);
    };

    const onInputChangeEDT_KSV_CRDB_MST_PART_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CRDB_MST = { ...dataEDT_KSV_CRDB_MST };

        let tTypeVal = _dataEDT_KSV_CRDB_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CRDB_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CRDB_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_CRDB_MST(_dataEDT_KSV_CRDB_MST);
    };

    const onInputChangeEDT_KSV_CRDB_MST_REST_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CRDB_MST = { ...dataEDT_KSV_CRDB_MST };

        let tTypeVal = _dataEDT_KSV_CRDB_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CRDB_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CRDB_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_CRDB_MST(_dataEDT_KSV_CRDB_MST);
    };

    const onCalChangeEDT_KSV_CRDB_MST_PART_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_CRDB_MST = { ...dataEDT_KSV_CRDB_MST };
        _dataEDT_KSV_CRDB_MST[`${name}`] = val;
        setDataEDT_KSV_CRDB_MST(_dataEDT_KSV_CRDB_MST);
    };

    /* QRY KSV_CRDB_MST */
    const [dataQRY_KSV_CRDB_MST, setDataQRY_KSV_CRDB_MST] = useState(
        emptyQRY_KSV_CRDB_MST,
    );

    const onInputChangeQRY_KSV_CRDB_MST_CRDB_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_CRDB_MST = { ...dataQRY_KSV_CRDB_MST };

        let tTypeVal = _dataQRY_KSV_CRDB_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_CRDB_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_CRDB_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_CRDB_MST(_dataQRY_KSV_CRDB_MST);
    };

    const onInputChangeQRY_KSV_CRDB_MST_VENDOR_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_CRDB_MST = { ...dataQRY_KSV_CRDB_MST };

        let tTypeVal = _dataQRY_KSV_CRDB_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_CRDB_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_CRDB_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_CRDB_MST(_dataQRY_KSV_CRDB_MST);
    };

    const onInputChangeQRY_KSV_CRDB_MST_CURR_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_CRDB_MST = { ...dataQRY_KSV_CRDB_MST };

        let tTypeVal = _dataQRY_KSV_CRDB_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_CRDB_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_CRDB_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_CRDB_MST(_dataQRY_KSV_CRDB_MST);
    };

    // Dialog
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    // Support Area

    const changeDateVal = (argVal) => {
        if (argVal === "") return argVal;
        var tType = typeof argVal;
        if (tType !== "string") {
            console.log(tType);
            return null;
        }

        var tYear = parseInt(argVal.substring(0, 4));
        var tMon = parseInt(argVal.substring(4, 6));
        var tDay = parseInt(argVal.substring(6, 8));

        return new Date(tYear, tMon - 1, tDay);
    };

    const getDateVal = (argVal) => {
        var tDate = argVal;
        var mm = tDate.getMonth() + 1;
        var mm_str = "";
        if (mm > 9) mm_str = mm;
        else mm_str = "0" + mm;

        var dd = tDate.getDate();
        var dd_str = "";
        if (dd > 9) dd_str = dd;
        else dd_str = "0" + dd;

        var hours = tDate.getHours();
        var hours_str = "";
        if (hours > 9) hours_str = hours;
        else hours_str = "0" + hours;

        var minutes = tDate.getMinutes();
        var minutes_str = "";
        if (minutes > 9) minutes_str = minutes;
        else minutes_str = "0" + minutes;

        var seconds = tDate.getSeconds();
        var seconds_str = "";
        if (seconds > 9) seconds_str = seconds;
        else seconds_str = "0" + seconds;

        var yyyy = tDate.getFullYear().toString();

        var tRet = yyyy + mm_str + dd_str;
        return tRet;
    };

    const onRowSelectTBL_KSV_STOCK_INRef = useRef(null);
    const onRowUnselectTBL_KSV_STOCK_INRef = useRef(null);
    const onRowDoubleClickTBL_KSV_STOCK_INRef = useRef(null);
    const onRowClickTBL_KSV_STOCK_INRef = useRef(null);
    const onCellEditCompleteKSV_STOCK_INRef = useRef(null);
    const cellEditorKSV_STOCK_INRef = useRef(null);
    const recalcTBL_KSV_STOCK_IN1Ref = useRef(null);

    onRowSelectTBL_KSV_STOCK_INRef.current = onRowSelectTBL_KSV_STOCK_IN;
    onRowUnselectTBL_KSV_STOCK_INRef.current = onRowUnselectTBL_KSV_STOCK_IN;
    onRowDoubleClickTBL_KSV_STOCK_INRef.current =
        onRowDoubleClickTBL_KSV_STOCK_IN;
    onRowClickTBL_KSV_STOCK_INRef.current = onRowClickTBL_KSV_STOCK_IN;
    onCellEditCompleteKSV_STOCK_INRef.current = onCellEditCompleteKSV_STOCK_IN;
    cellEditorKSV_STOCK_INRef.current = cellEditorKSV_STOCK_IN;
    recalcTBL_KSV_STOCK_IN1Ref.current = recalcTBL_KSV_STOCK_IN1;

    const handleRowSelectTBL_KSV_STOCK_IN = useCallback((e) => {
        if (onRowSelectTBL_KSV_STOCK_INRef.current)
            onRowSelectTBL_KSV_STOCK_INRef.current(e);
    }, []);

    const handleRowUnselectTBL_KSV_STOCK_IN = useCallback((e) => {
        if (onRowUnselectTBL_KSV_STOCK_INRef.current)
            onRowUnselectTBL_KSV_STOCK_INRef.current(e);
    }, []);

    const handleRowDoubleClickTBL_KSV_STOCK_IN = useCallback((e) => {
        if (onRowDoubleClickTBL_KSV_STOCK_INRef.current)
            onRowDoubleClickTBL_KSV_STOCK_INRef.current(e);
    }, []);

    const handleRowClickTBL_KSV_STOCK_IN = useCallback((e) => {
        if (onRowClickTBL_KSV_STOCK_INRef.current)
            onRowClickTBL_KSV_STOCK_INRef.current(e);
    }, []);

    const handleSelectionChangeTBL_KSV_STOCK_IN = useCallback((e) => {
        const selectedRows = e.value || [];
        console.log("selected->" + selectedRows.length);
        if (recalcTBL_KSV_STOCK_IN1Ref.current)
            recalcTBL_KSV_STOCK_IN1Ref.current(selectedRows);
        setSelectedTBL_KSV_STOCK_IN(selectedRows);
    }, []);

    const handleCellEditCompleteKSV_STOCK_IN = useCallback((e) => {
        if (onCellEditCompleteKSV_STOCK_INRef.current)
            onCellEditCompleteKSV_STOCK_INRef.current(e);
    }, []);

    const handleCellEditorKSV_STOCK_IN = useCallback((options) => {
        if (cellEditorKSV_STOCK_INRef.current)
            return cellEditorKSV_STOCK_INRef.current(options);
        return null;
    }, []);

    return (
        <div className="af-div-main">
            <div className="af-div-first" style={styleVal}>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "3rem" }}>Bill#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_COLOR"
                            value={dataQRY_KSV_STOCK_IN.BILL_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_IN_BILL_CD(
                                    e,
                                    "BILL_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Inv Date</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_IN_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_IN.S_IN_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_IN_S_IN_DATE(
                                    e,
                                    "S_IN_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_IN_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_IN.E_IN_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_IN_E_IN_DATE(
                                    e,
                                    "E_IN_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Supplier</p>
                    <div className="af-span-div" style={{ width: "34rem" }}>
                        {/*<Dropdown style={{ width: '34rem' }} id="id_VENDOR_CD" filter value={dataQRY_KSV_STOCK_IN_VENDOR_CD} onChange={(e) => onDropdownChangeQRY_KSV_STOCK_IN_VENDOR_CD(e, 'VENDOR_CD')} options={datasQRY_KSV_STOCK_IN_VENDOR_CD} optionLabel="VENDOR_NAME" placeholder="" editable></Dropdown>*/}
                        <InputText
                            style={{ width: "34rem" }}
                            value={dataQRY_KSV_STOCK_IN.VANDOR_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_IN(e, "VENDOR_CD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "9rem" }}>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Tooltip
                            className="menuCodeTooltip"
                            target={`#btnSearch`}
                            content={`Alt+S`}
                            position="bottom"
                        />

                        <Button
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            accessKey="S"
                            id="btnSearch"
                            style={{ width: "8rem" }}
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "9rem" }}>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Button
                            label="Reset"
                            style={{ width: "8rem" }}
                            className="p-button-text"
                            onClick={process_RESET}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "9rem" }}>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Button
                            disabled={!isShintsUser}
                            label="Bill Regist"
                            style={{ width: "8rem" }}
                            className="p-button-text orange"
                            onClick={popup_BILL_REGIST}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "9rem" }}>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Button
                            disabled={!isShintsUser}
                            label="Download"
                            style={{ width: "8rem" }}
                            className="p-button-text green"
                            onClick={search_REPORT_only}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "3rem" }}>Type</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_VENDOR_CD"
                            filter
                            value={dataQRY_KSV_STOCK_IN_VENDOR_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_IN_VENDOR_TYPE(
                                    e,
                                    "VENDOR_TYPE",
                                )
                            }
                            options={datasQRY_KSV_STOCK_IN_VENDOR_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Pay Date</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_IN_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_IN.S_PAY_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_IN_S_PAY_DATE(
                                    e,
                                    "S_PAY_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_IN_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_IN.E_PAY_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_IN_E_PAY_DATE(
                                    e,
                                    "E_PAY_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Register</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <InputText
                            style={{ width: "6rem" }}
                            id="id_COLOR"
                            value={dataQRY_KSV_STOCK_IN.REG_USER}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_IN_REG_USER(
                                    e,
                                    "REG_USER",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "11rem" }}>
                    <p className="af-span-p" style={{ width: "2rem" }}>GW</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Dropdown
                            style={{ width: "8rem" }}
                            value={dataQRY_KSV_STOCK_IN_GW_STATUS}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_IN_GW_STATUS(
                                    e,
                                    "GW_STATUS",
                                )
                            }
                            options={datasQRY_KSV_STOCK_IN_GW_STATUS}
                            optionLabel="CD_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Bill Type</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_VENDOR_CD"
                            filter
                            value={dataQRY_KSV_STOCK_IN_TAX_KIND}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_IN_TAX_KIND(
                                    e,
                                    "TAX_KIND",
                                )
                            }
                            options={datasQRY_KSV_STOCK_IN_TAX_KIND}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "6.5rem" }}>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <Button
                            disabled={!isShintsUser}
                            style={{ width: "6rem" }}
                            label="Bill Cancel"
                            className="p-button-text"
                            onClick={process_TAXBILL_CANCEL}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "7rem" }}>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <Button
                            disabled={!isShintsUser}
                            style={{ width: "6rem" }}
                            label="Debit Apply"
                            className="p-button-text orange"
                            onClick={popup_UPDATE_DN}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "7rem" }}>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <Button
                            disabled={!isShintsUser}
                            style={{ width: "6rem" }}
                            label="DC Apply"
                            className="p-button-text"
                            onClick={process_UPDATE_DC}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "9rem" }}>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Button
                            style={{ width: "8rem" }}
                            label="Taxbill Confirm"
                            className="p-button-text orange"
                            onClick={process_GW_TAXBILL}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "6rem" }}>
                    <div className="af-span-div" style={{ width: "5rem" }}>
                        <Button
                            disabled={!isShintsUser}
                            style={{ width: "5rem" }}
                            label="Bill End"
                            className="p-button-text"
                            onClick={process_GW_BILL_END}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "41rem" }}
            >
                {useMemo(
                    () => (
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_TBL_KSV_STOCK_IN}
                            editMode="cell"
                            size="small"
                            value={datasTBL_KSV_STOCK_IN}
                            tableStyle={{ tableLayout: "fixed" }}
                            resizableColumns
                            columnResizeMode="expand"
                            loading={loadingTBL_KSV_STOCK_IN}
                            metaKeySelection={false}
                            showGridlines
                            selectionMode="multiple"
                            selection={selectedTBL_KSV_STOCK_IN}
                            onRowSelect={handleRowSelectTBL_KSV_STOCK_IN}
                            onRowUnselect={handleRowUnselectTBL_KSV_STOCK_IN}
                            onRowDoubleClick={handleRowDoubleClickTBL_KSV_STOCK_IN}
                            onSelectionChange={handleSelectionChangeTBL_KSV_STOCK_IN}
                            onRowClick={handleRowClickTBL_KSV_STOCK_IN}
                            dataKey="id"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" "
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="447px"
                        >
                            <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                            <AFColumn field="BILL_END_FLAG" headerClassName="t-header" header="End" style={{ width: "3rem", flexBasis: "auto" }} body={(row) => row.BILL_END_FLAG === "END" ? ( <i className="pi pi-check" aria-label="checked" style={{ display: "block", textAlign: "center", }} /> ) : ( "" ) } bodyClassName="text-center" />

                            <AFColumn field="VENDOR_TYPE_N" headerClassName="t-header" header="Supplier Type" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="TAX_KIND_N" headerClassName="t-header" header="Bill Type" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="BILL_CD" className="orange" headerClassName="t-header" header="Bill#" style={{ width: "9rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="INVOICE_DATE" headerClassName="t-header" header="Invoice Date" style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.INVOICE_DATE) } ></AFColumn>
                            <AFColumn field="INVOICE_NO" headerClassName="t-header" header="Invoice#" style={{ width: "9rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="PAY_DATE" headerClassName="t-header" header="Pay Date" style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.PAY_DATE) } ></AFColumn>
                            <AFColumn field="PAY_TYPE_N" headerClassName="t-header" header="Pay Term" style={{ width: "3rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "3rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="PO_AMT" headerClassName="t-header" header="Po Amt" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PO_AMT, 4) } ></AFColumn>
                            <AFColumn field="DEPOSIT_AMT" headerClassName="t-header" header={"Deposit Amt "} style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.DEPOSIT_AMT, 4) } ></AFColumn>
                            <AFColumn field="LC_AMT" headerClassName="t-header" header={"L/C Amt"} style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LC_AMT, 4) } ></AFColumn>
                            <AFColumn field="DEBIT_AMT" headerClassName="t-header" header="Debit" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.DEBIT_AMT, 4) } ></AFColumn>
                            <AFColumn field="DISCOUNT_AMT" headerClassName="t-header" header="Discount" style={{ color: "green", width: "6rem", flexBasis: "auto", }} editor={handleCellEditorKSV_STOCK_IN} onCellEditComplete={handleCellEditCompleteKSV_STOCK_IN} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.DISCOUNT_AMT, 4) } ></AFColumn>
                            <AFColumn field="VAT_AMT" headerClassName="t-header" header="Vat" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.formatNumber(rowData.VAT_AMT, 4) } ></AFColumn>
                            <AFColumn field="PAID_AMT" headerClassName="t-header" header="Paid" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PAID_AMT, 4) } ></AFColumn>
                            <AFColumn field="BAL_AMT" headerClassName="t-header" header="Bal Amt" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BAL_AMT, 4) } ></AFColumn>
                            <AFColumn field="IN_PAY_AMT" headerClassName="t-header" header="Pay Request" style={{ color: "green", width: "6rem", flexBasis: "auto", }} editor={handleCellEditorKSV_STOCK_IN} onCellEditComplete={handleCellEditCompleteKSV_STOCK_IN} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.IN_PAY_AMT, 4) } ></AFColumn>
                            <AFColumn field="BAL_DEBIT" headerClassName="t-header" header="Bal Debit" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BAL_DEBIT, 4) } ></AFColumn>
                            {/*<AFColumn field="PAY_TERM" headerClassName="t-header" header="Pay Term" style={{ width: "3rem", flexBasis: "auto" }} ></AFColumn>*/}
                            <AFColumn field="REG_USER" headerClassName="t-header" header="Register" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>

                            <AFColumn field="GW_STATUS_N" headerClassName="t-header" header="GW(Payment)" style={{ width: "4rem", flexBasis: "auto" }} body={(row) => { return row.GW_STATUS_N === "NEW" ? "" : row.GW_STATUS_N; }} ></AFColumn>
                            <AFColumn field="GW_STATUS_N_TAXBILL" headerClassName="t-header" header="GW(Taxbill)" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="PAY_BANK" headerClassName="t-header" header="Bank#" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="BANK_NAME" headerClassName="t-header" header="Bank" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="ACCOUNT_NO" headerClassName="t-header" header="Account#" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="ACCOUNT_NAME" headerClassName="t-header" header="Account" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="DOCU_NO" headerClassName="t-header" header="Neoe No(Payment)" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="DOCU_NO_TAXBILL" headerClassName="t-header" header="Neoe No(TaxBill)" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="TAXBILL_CD" headerClassName="t-header" header="Taxbill#" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="APPROKEY" headerClassName="t-header" header="ApproKey(Payment)" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="APPROKEY_TAXBILL" headerClassName="t-header" header="ApproKey(Taxbill)" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="GW_STATUS_CD" headerClassName="t-header" header="Gw Code(Payment)" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="GW_STATUS_CD_TAXBILL" headerClassName="t-header" header="Gw Code(Taxbill)" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="PAY_REPORT" headerClassName="t-header" header="Pay Report" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="BUY_DATE" headerClassName="t-header" header="Approval Date" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="PUR_FACTORY" headerClassName="t-header" header="Pur Factory" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="PUR_APP" headerClassName="t-header" header="Pur App" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="TT_FLAG" headerClassName="t-header" header="TT Flag" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="COMPANY_CODE" headerClassName="t-header" header="Compnay#" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="BILL_FLAG" headerClassName="t-header" header="Bill Ok" style={{ width: "3rem", flexBasis: "auto" }} body={(row) => row.BILL_FLAG === "1" ? ( <i className="pi pi-check" aria-label="checked" style={{ display: "block", textAlign: "center", }} /> ) : ( "" ) } bodyClassName="text-center" />
                            <AFColumn field="CHECK_PO_AMT" headerClassName="t-header" header="Chk Amt" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CHECK_PO_AMT, 4) } ></AFColumn>
                        </AFDataTable>
                    ),
                    [
                        datasTBL_KSV_STOCK_IN,
                        loadingTBL_KSV_STOCK_IN,
                        selectedTBL_KSV_STOCK_IN,
                        handleRowSelectTBL_KSV_STOCK_IN,
                        handleRowUnselectTBL_KSV_STOCK_IN,
                        handleRowDoubleClickTBL_KSV_STOCK_IN,
                        handleSelectionChangeTBL_KSV_STOCK_IN,
                        handleRowClickTBL_KSV_STOCK_IN,
                        handleCellEditorKSV_STOCK_IN,
                        handleCellEditCompleteKSV_STOCK_IN,
                        serviceLib,
                    ],
                )}
            </div>

            <div
                className="af-div-first"
                style={{ width: "80rem", height: "15rem", padding: "0.5rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_STOCK_IN1}
                    size="small"
                    value={datasTBL_KSV_STOCK_IN1}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="multiple"
                    selection={selectedTBL_KSV_STOCK_IN1}
                    onRowSelect={onRowSelectTBL_KSV_STOCK_IN1}
                    onRowUnselect={onRowUnselectTBL_KSV_STOCK_IN1}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KSV_STOCK_IN1(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_STOCK_IN1}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="15rem"
                >
                    <AFColumn field="KIND" headerClassName="t-header" header=" " style={{ width: "9rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="KRW" headerClassName="t-header" header="KRW" style={{ width: "9rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.KRW, 4) } ></AFColumn>
                    <AFColumn field="USD" headerClassName="t-header" header="USD" style={{ width: "9rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.USD, 4) } ></AFColumn>
                    <AFColumn field="VND" headerClassName="t-header" header="VND" style={{ width: "9rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.VND, 4) } ></AFColumn>
                    <AFColumn field="EUR" headerClassName="t-header" header="EUR" style={{ width: "9rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.EUR, 4) } ></AFColumn>
                    <AFColumn field="GBP" headerClassName="t-header" header="GBP" style={{ width: "9rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.GBP, 4) } ></AFColumn>
                    <AFColumn field="JPY" headerClassName="t-header" header="JPY" style={{ width: "9rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.JPY, 4) } ></AFColumn>
                    <AFColumn field="CNY" headerClassName="t-header" header="CNY" style={{ width: "9rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CNY, 4) } ></AFColumn>
                    <AFColumn field="OTHER" headerClassName="t-header" header="기타통화" style={{ width: "9rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.OTHER, 4) } ></AFColumn>
                </AFDataTable>
            </div>
            <div
                className="af-div-second"
                style={{ width: "43rem", height: "15rem" }}
            >
                <span className="af-span-3-0" style={{ width: "12.5rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Pay Date</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "8rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_IN_DATE"
                            value={changeDateVal(dataEDT_KSV_STOCK_IN.PAY_DATE)}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_STOCK_IN_PAY_DATE(
                                    e,
                                    "PAY_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "12.5rem" }}>
                    <div className="af-span-div" style={{ width: "5rem" }}>
                        <InputText
                            style={{ width: "5rem" }}
                            id="id_COLOR"
                            value={dataEDT_KSV_STOCK_IN.PAY_DATE_WEEK}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_STOCK_IN_PAY_DATE_WEEK(
                                    e,
                                    "PAY_DATE_WEEK",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "35rem" }}>
                    <div className="af-span-div" style={{ width: "16rem" }}>
                        <Button
                            style={{ width: "16rem" }}
                            label="Update Pay Date"
                            className="p-button-text"
                            onClick={process_UPDATE_PAY_DATE}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "35rem" }}>
                    <div className="af-span-div" style={{ width: "16rem" }}>
                        <Button
                            style={{ width: "16rem" }}
                            label="Domestic Payment Request"
                            className="p-button-text orange"
                            onClick={process_GW}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "35rem" }}>
                    <div className="af-span-div" style={{ width: "16rem" }}>
                        <Button
                            style={{ width: "16rem" }}
                            label="Import Payment Request"
                            className="p-button-text orange"
                            onClick={process_GW_IN}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "35rem" }}>
                    <div className="af-span-div" style={{ width: "16rem" }}>
                        <Button
                            style={{ width: "16rem" }}
                            label="BVT Payment Request"
                            className="p-button-text green"
                            onClick={process_BVT_PAYMENT_REQUEST}
                        />
                    </div>
                </span>
            </div>

            <Toast ref={toast} />
            {/* DN Update SUB 화면 */}
            <Dialog
                visible={createDialog}
                position="mid-center"
                style={{ width: "122rem", height: "50rem" }}
                header="Debit Apply"
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <div
                    className="af-div-first"
                    style={{ width: "120rem", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>CRDB#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_CRDB_MST.CRDB_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_CRDB_MST_CRDB_CD(
                                        e,
                                        "CDRB_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Supplier#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_CRDB_MST.VENDOR_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_CRDB_MST_VENDOR_CD(
                                        e,
                                        "VENDOR_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Curr</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_CRDB_MST.CURR_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_CRDB_MST_CURR_CD(
                                        e,
                                        "CURR_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                </div>
                <div
                    className="af-div-first"
                    style={{ width: "120rem", height: "26rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_CRDB_MST}
                        size="small"
                        value={datasTBL_KSV_CRDB_MST}
                        tableStyle={{ tableLayout: "fixed" }}
                        loading={loadingTBL_KSV_CRDB_MST}
                        resizableColumns
                        columnResizeMode="expand"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_CRDB_MST}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_CRDB_MST(true);
                            setSelectedTBL_KSV_CRDB_MST(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_CRDB_MST.length,
                            );
                            onRowClick1TBL_KSV_CRDB_MST(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_CRDB_MST}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" " //header={headerTBL_KSV_CRDB_MST}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="26rem"
                    >
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="CRDB_CD" headerClassName="t-header" header="Crdb#" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "2rem" }} field="CRDB_SEQ" headerClassName="t-header" header="Crdb Seq" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="CRDB_DATE" headerClassName="t-header" header="Issue Date" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "10rem" }} field="COM_NAME" headerClassName="t-header" header="Messer" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="CRDB_AMT" headerClassName="t-header" header="Amt" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="BALANCE" headerClassName="t-header" header="Bal" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "3rem" }} field="CURR_CD" headerClassName="t-header" header="Curr" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="USD_BAL" headerClassName="t-header" header="Usd Bal" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "10rem" }} field="TITLE" headerClassName="t-header" header="Title" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="REG_USER" headerClassName="t-header" header="Reg User" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="STOCK_QTY" headerClassName="t-header" header="Stock Qty" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="END_DATE" headerClassName="t-header" header="End date" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "10rem" }} field="REMARK" headerClassName="t-header" header="Remark" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "4rem" }} field="STATUS" headerClassName="t-header" header="Status" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="PO_CD" headerClassName="t-header" header="PO#" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "7rem" }} field="ORDER_CD" headerClassName="t-header" header="Order#" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="BANK" headerClassName="t-header" header="Bank" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="COM_CD" headerClassName="t-header" header="Messer#" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="STATUS_CD" headerClassName="t-header" header="Status#" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "3rem" }} field="BUYER_CD" headerClassName="t-header" header="Buyer#" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "10rem" }} field="BUYER_NAME" headerClassName="t-header" header="Buyer" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "10rem" }} field="PAYMENT_PLAN" headerClassName="t-header" header="Payment.P" ></AFColumn>
                    </AFDataTable>
                </div>

                <div
                    className="af-div-first"
                    style={{ width: "120rem", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>CRDB#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_CRDB_MST.CRDB_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CRDB_MST_CRDB_CD(
                                        e,
                                        "CDRB_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Part Amt</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_CRDB_MST.PART_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CRDB_MST_PART_AMT(
                                        e,
                                        "PART_AMT",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Rest Amt</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_CRDB_MST.REST_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CRDB_MST_REST_AMT(
                                        e,
                                        "REST_AMT",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Part Date</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataEDT_KSV_CRDB_MST.PART_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_CRDB_MST_PART_DATE(
                                        e,
                                        "PART_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "11rem" }}>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <Button
                                style={{ width: "10rem" }}
                                label="Update Dn"
                                className="p-button-text"
                                onClick={process_UPDATE_DN}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "11rem" }}>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <Button
                                style={{ width: "10rem" }}
                                label="Cancel Dn"
                                className="p-button-text"
                                onClick={process_DELETE_DN}
                            />
                        </div>
                    </span>
                </div>

                <div
                    className="af-div-first"
                    style={{ width: "120rem", height: "9rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_CRDB_MST2}
                        size="small"
                        value={datasTBL_KSV_CRDB_MST2}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="fit"
                        loading={loadingTBL_KSV_CRDB_MST2}
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_CRDB_MST2}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_CRDB_MST2(true);
                            setSelectedTBL_KSV_CRDB_MST2(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_CRDB_MST2.length,
                            );
                            onRowClick1TBL_KSV_CRDB_MST2(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_CRDB_MST2}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" " //header={headerTBL_KSV_CRDB_MST2}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="9rem"
                    >
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="END_DATE" headerClassName="t-header" header="End Date" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="CRDB_AMT" headerClassName="t-header" header="Amt" ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0423_TAXBILL, comparisonFn);
