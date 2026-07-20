/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
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

import axios from "axios";
import apiOption from "../assets/env_graphql";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS043401_SHIPMENT_INFO } from "../service/service_biz/ServiceS043401_SHIPMENT_INFO";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    S_READY_DATE: "",
    E_READY_DATE: "",
    ORIGIN_PORT: "",
};

const emptyQRY_KSV_PO_MRP2 = {
    IN_QTY: "",
};

const emptyQRY_KSV_PO_MRP1 = {
    BUYER_CD: "",
    PO_CD: "",
    VENDOR_CD: "",
    MRP_DATE: "",
};

const emptyTBL_KSV_PO_MRP = {
    id: 0,
    OP_KIND: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    PO_CD: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    KIND1: "",
    MRP_DATE: "",
    ORDER_DATE: "",
    TARGET_ETA: "",
    READY_DATE: "",
    PI_ISSUE: "",
    PI_FIX: "",
    PI_FILE: "",
    PI_CD: "",
    AMOUNT: "",
    PAY_TYPE: "",
    TERM: "",
    REQUEST_DATE: "",
    BANKCOPY_DATE: "",
    CONFIRM_NO: "",
};

const emptyTBL_KSV_PO_MRP1 = {
    id: 0,
    OP_KIND: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    PO_CD: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    KIND1: "",
    MRP_DATE: "",
    ORDER_DATE: "",
    TARGET_ETA: "",
    READY_DATE: "",
    PI_ISSUE: "",
    PI_FIX: "",
    PI_FILE: "",
    PI_CD: "",
    AMOUNT: "",
    PAY_TYPE: "",
    TERM: "",
    REQUEST_DATE: "",
    BANKCOPY_DATE: "",
    CONFIRM_NO: "",
};

const emptyTBL_KSV_PO_MRP2 = {
    id: 0,
    OP_KIND: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    PO_CD: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    KIND1: "",
    MRP_DATE: "",
    ORDER_DATE: "",
    TARGET_ETA: "",
    READY_DATE: "",
    PI_ISSUE: "",
    PI_FIX: "",
    PI_FILE: "",
    PI_CD: "",
    AMOUNT: "",
    PAY_TYPE: "",
    TERM: "",
    REQUEST_DATE: "",
    BANKCOPY_DATE: "",
    CONFIRM_NO: "",
};

const emptyEDT_KCD_MATL_MST1 = {
    OFFER_SPEC: "",
};

const emptyEDT_KCD_MATL_MST = {
    HS_CD: "",
    COMP1: "",
    COMP1_P: "",
    COMP2: "",
    COMP2_P: "",
    COMP3: "",
    COMP3_P: "",
    COMP4: "",
    COMP4_P: "",
};

const emptyEDT_KSV_PO_MRP = {
    SHIPMENT_STATUS: "",
    SHIPMENT_CD: "",
    FIX_FLAG: "",

    SHIP_MODE: "",
    PLACE_CD: "",
    BL_FILE: "",

    ORIGIN_PORT: "",
    DESTINATION: "",
    PL_FILE: "",

    ETD: "",
    CONTAINER_NO: "",
    CI_FILE: "",

    SINGAPORE_COMBINE: "",
    COST_CURR: "",
    COST: 0,
    CBM: 0,

    BL_NO: "",
    SHIP_LINE: "",
    REMARK: "",

    ETA: "",

    INVOICE_CD: "",
};

const S043401_SHIPMENT_INFO = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS043401_SHIPMENT_INFORef = useRef(null);
    if (!serviceS043401_SHIPMENT_INFORef.current) serviceS043401_SHIPMENT_INFORef.current = new ServiceS043401_SHIPMENT_INFO();
    const serviceS043401_SHIPMENT_INFO = serviceS043401_SHIPMENT_INFORef.current;

    const toast = useRef(null);

    //
    const [isDestination, setIsDestination] = useState(true);

    // File
    const [dataUrlFile1, setDataUrlFile1] = useState("");

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({
        width: "65vw",
    });

    // dialog
    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);

    const [createDialogUpdateComp, setCreateDialogUpdateComp] = useState(false);
    const hideDialogUpdateComp = () => {
        setCreateDialogUpdateComp(false);
    };

    const [createDialogUpdateOfferSpec, setCreateDialogUpdateOfferSpec] =
        useState(false);
    const hideDialogUpdateOfferSpec = () => {
        setCreateDialogUpdateOfferSpec(false);
    };

    //
    const popup_UPDATE_COMP = () => {
        var tEDTObj = {
            ...dataEDT_KSV_PO_MRP,
        };

        var tObj = {};
        tObj.SHIPMENT_CD = tEDTObj.SHIPMENT_CD;
        tObj.REMARK = tEDTObj.REMARK;
        search_LIST_COMP(tObj);

        setCreateDialogUpdateComp(true);
    };

    const popup_UPDATE_OFFER_SPEC = () => {
        var tEDTObj = {
            ...dataEDT_KSV_PO_MRP,
        };

        var tObj = {};
        tObj.SHIPMENT_CD = tEDTObj.SHIPMENT_CD;
        tObj.REMARK = tEDTObj.REMARK;
        search_LIST_OFFER_SPEC(tObj);

        setCreateDialogUpdateOfferSpec(true);
    };

    // Search
    const search_PL_PRINT = () => {
        if (dataEDT_KSV_PO_MRP.FIX_FLAG !== "1") {
            alert("Shipment을 Fix후 작업해 주세요<br><br>Please fix the shipment before working on it.");
            return;
        }

        var tInObj = {};
        tInObj.SHIPMENT_CD = dataEDT_KSV_PO_MRP.SHIPMENT_CD;
        tInObj.PACK_CD = edtInvoiceNo;
        tInObj.MBL_NO = dataEDT_KSV_PO_MRP.BL_NO;
        tInObj.INVOICE_NO = edtInvoiceNo;
        tInObj.WEIGHT = valTOTAL_WEIGHT;
        tInObj.PORT = edtPort;

        var isNSR = 0;
        if (
            tInObj.PACK_CD.substring(
                tInObj.PACK_CD.length - 1,
                tInObj.PACK_CD.length,
            ) === "D"
        )
            isNSR = 1;

        // process_RESET();

        // setDatasTBL_KSV_ORDER_SHIP([]);
        // setSelectedTBL_KSV_ORDER_SHIP([]);

        // 2

        if (
            dataEDT_KSV_PO_MRP_SHIP_MODE.CD_CODE === "6" ||
            dataEDT_KSV_PO_MRP_SHIP_MODE.CD_CODE === "7" ||
            dataEDT_KSV_PO_MRP_SHIP_MODE.CD_CODE === "8" ||
            dataEDT_KSV_PO_MRP_SHIP_MODE.CD_CODE === "9"
        ) {
            // Express, Handcarry
            setLoadingTBL_KSV_PO_MRP(true);
            serviceS043401_SHIPMENT_INFO
                .mgrQuery_PL_PRINT_EXPRESS(tInObj)
                .then((data) => {
                    setLoadingTBL_KSV_PO_MRP(false);
                    if (typeof data.graphQLErrors === "undefined") {
                        if (data.length > 0) {
                            if (data[0].CODE.includes("SUCC"))
                                serviceLib.downloadFile(
                                    data[0].CODE.split("?")[2].toString(),
                                    data[0].CODE.split("?")[1].toString(),
                                );
                            else {
                                alert(data[0].CODE);
                            }
                        }
                    } else {
                        console.log(
                            "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                                JSON.stringify(data.graphQLErrors),
                        );
                    }
                });
        } else {
            setLoadingTBL_KSV_PO_MRP(true);

            var tCompany = "SHINTS";
            if (isNSR === 1) tCompany = "NSR";

            serviceS043401_SHIPMENT_INFO
                .mgrQuery_PL_PRINT({ ...tInObj, COMPANY: tCompany })
                .then((data) => {
                    setLoadingTBL_KSV_PO_MRP(false);
                    if (typeof data.graphQLErrors === "undefined") {
                        if (data.length > 0) {
                            if (data[0].CODE.includes("SUCC")) {
                                serviceLib.downloadFile(
                                    data[0].CODE.split("?")[2].toString(),
                                    data[0].CODE.split("?")[1].toString(),
                                );
                            } else {
                                alert(data[0].CODE);
                            }
                        }
                    } else {
                        console.log(
                            "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                                JSON.stringify(data.graphQLErrors),
                        );
                    }
                });
        }
    };

    // Search KSV_STOCK_MEM
    const search_LIST_1 = async (argData, argCodes) => {
        var tInObj = {};
        tInObj.SHIPMENT_CD = argData.SHIPMENT_CD;
        tInObj.STATUS = "";
        tInObj.REMARK = "";
        if (typeof argData.STATUS !== "undefined")
            tInObj.STATUS = argData.STATUS;
        if (typeof argData.REMARK !== "undefined")
            tInObj.REMARK = argData.REMARK;

        setLoadingTBL_KSV_PO_MRP(true);
        let data = await serviceS043401_SHIPMENT_INFO.mgrQuery_LIST_1(tInObj);

        setLoadingTBL_KSV_PO_MRP(false);
        if (typeof data.graphQLErrors === "undefined") {
            var sCBM = 0;
            var sCT_QTY = 0;
            var sWEIGHT = 0;
            var sOUT_QTY = 0;
            let sumMatlPrice = 0;
            var tArray = data.map((col, i) => {
                var tObj = {
                    ...col,
                };
                tObj.id = i + 1;
                sCBM += parseFloat(tObj.CBM);
                sCT_QTY += parseFloat(tObj.CT_QTY);
                sOUT_QTY += parseFloat(tObj.OUT_QTY);
                sWEIGHT += parseFloat(tObj.WEIGHT);
                sumMatlPrice = parseFloat(tObj.MATL_PRICE);

                if (
                    !col.TRADE_TERM ||
                    col.TRADE_TERM === null ||
                    col.TRADE_TERM === "undefined"
                ) {
                    tObj.TRADE_TERM = "";
                }

                return tObj;
            });

            setDataEDT_KSV_PO_MRP({
                ...dataEDT_KSV_PO_MRP,
                AMOUNT: sumMatlPrice,
            });
            setDatasTBL_KSV_PO_MRP(tArray);

            var tObj2 = {};
            tObj2.SHIPMENT_CD = tInObj.SHIPMENT_CD;
            tObj2.REMARK = "";

            setValTOTAL_CT_QTY(serviceLib.formatNumber(String(sCT_QTY)));
            setValTOTAL_OUT_QTY(serviceLib.formatNumber(String(sOUT_QTY)));
            setValTOTAL_WEIGHT(serviceLib.formatNumber(String(sWEIGHT), 2));
            setValTOTAL_CBM(serviceLib.formatNumber(String(sCBM), 2));

            var tQryObj = {
                ...argData,
            };
            tQryObj.CBM = String(sCBM);
            tQryObj.STATUS = argData.STATUS;

            await search_LIST_2(tObj2, argCodes);
        } else {
            console.log(
                "mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors),
            );
        }
    };

    const search_LIST_COMP = (argData) => {
        var tInObj = {};
        tInObj.SHIPMENT_CD = argData.SHIPMENT_CD;
        tInObj.STATUS = "";
        tInObj.REMARK = "";
        if (typeof argData.STATUS !== "undefined")
            tInObj.STATUS = argData.STATUS;
        if (typeof argData.REMARK !== "undefined")
            tInObj.REMARK = argData.REMARK;

        setLoadingTBL_KCD_MATL_MST(true);
        serviceS043401_SHIPMENT_INFO.mgrQuery_LIST_COMP(tInObj).then((data) => {
            setLoadingTBL_KCD_MATL_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = [];
                if (data.length > 0) {
                    data.forEach((col, i) => {
                        var tObj = {
                            ...col,
                        };
                        tObj.id = i + 1;
                        tObj.COMP1 =
                            tObj.COMP1_PERCENT != "0" &&
                            tObj.COMP1_PERCENT != null
                                ? `${tObj.COMP1} / ${tObj.COMP1_PERCENT}%`
                                : "";
                        tObj.COMP2 =
                            tObj.COMP2_PERCENT != "0" &&
                            tObj.COMP1_PERCENT != null
                                ? `${tObj.COMP2} / ${tObj.COMP2_PERCENT}%`
                                : "";
                        tObj.COMP3 =
                            tObj.COMP3_PERCENT != "0" &&
                            tObj.COMP1_PERCENT != null
                                ? `${tObj.COMP3} / ${tObj.COMP3_PERCENT}%`
                                : "";
                        tObj.COMP4 =
                            tObj.COMP4_PERCENT != "0" &&
                            tObj.COMP1_PERCENT != null
                                ? `${tObj.COMP4} / ${tObj.COMP4_PERCENT}%`
                                : "";
                        // tObj.HS_NAME = `(${tObj.HS_NO}) ${tObj.HS_NAME}`;
                        tObj.HS_NAME = `(${tObj.HS_CD}) ${tObj.HS_NAME}`;
                        tArray.push(tObj);
                    });
                    setSavesTBL_KCD_MATL_MST(tArray);

                    var tArray1 = [];
                    tArray.forEach((col, i) => {
                        var tObj = { ...col };
                        if (qryMAIN_MATL === "1" && tObj.MATL_TYPE === "M")
                            tArray1.push(tObj);
                        else if (qrySUB_MATL === "1" && tObj.MATL_TYPE === "S")
                            tArray1.push(tObj);
                        else {
                            if (qryMAIN_MATL === "1" && tObj.MATL_TYPE !== "M");
                            else if (
                                qrySUB_MATL === "1" &&
                                tObj.MATL_TYPE !== "S"
                            );
                            else tArray1.push(tObj);
                        }
                    });

                    setDatasTBL_KCD_MATL_MST(tArray1);
                }
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_OFFER_SPEC = (argData) => {
        var tInObj = {};
        tInObj.SHIPMENT_CD = argData.SHIPMENT_CD;
        tInObj.STATUS = "";
        tInObj.REMARK = "";
        if (typeof argData.STATUS !== "undefined")
            tInObj.STATUS = argData.STATUS;
        if (typeof argData.REMARK !== "undefined")
            tInObj.REMARK = argData.REMARK;

        setLoadingTBL_KCD_MATL_MST1(true);
        serviceS043401_SHIPMENT_INFO
            .mgrQuery_LIST_OFFER_SPEC(tInObj)
            .then((data) => {
                setLoadingTBL_KCD_MATL_MST1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    var tArray = [];
                    data.forEach((col, i) => {
                        var tObj = {
                            ...col,
                        };
                        tObj.id = i + 1;
                        tArray.push(tObj);
                    });
                    setDatasTBL_KCD_MATL_MST1(tArray);
                } else {
                    console.log(
                        "mgrQuery_PO_CD error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const search_LIST_2 = async (argData, argCodes) => {
        var tQryObj = {};
        tQryObj.SHIPMENT_CD = argData.SHIPMENT_CD;
        tQryObj.REMARK = "";
        if (!argData.REMARK);
        else tQryObj.REMARK = argData.REMARK;

        if (!argData.SHIPMENT_CD) {
            tQryObj = initialData;
        }

        console.log(initialData);
        setLoadingTBL_KSV_PO_MRP2(true);

        let data = await serviceS043401_SHIPMENT_INFO.mgrQuery_LIST_2(tQryObj);

        setLoadingTBL_KSV_PO_MRP2(false);
        if (typeof data.graphQLErrors === "undefined") {
            if (data.length > 0) {
                console.log('List2 Data', data[0]);

                var tObj = {
                    ...dataEDT_KSV_PO_MRP,
                };
                tObj.SHIPMENT_CD = data[0].SHIPMENT_CD;
                tObj.FIX_FLAG = data[0].FIX_FLAG;
                setEdtRemark(data[0].REMARK);
                setEdtInvoiceNo(data[0].INVOICE_NO);

                if (typeof argCodes !== "undefined") {
                    let shipModeIndex = argCodes.SHIP_MODE.findIndex(
                        (item) => item.CD_CODE === data[0].SHIP_MODE,
                    );
                    tObj.SHIP_MODE = data[0].SHIP_MODE;
                    setDatasEDT_KSV_PO_MRP_SHIP_MODE(argCodes.SHIP_MODE);
                    setDataEDT_KSV_PO_MRP_SHIP_MODE(
                        argCodes.SHIP_MODE[shipModeIndex],
                    );

                    let placeCdIndex = argCodes.PLACE_CD.findIndex(
                        (item) => item.PLACE_CD === data[0].PLACE_CD,
                    );
                    tObj.PLACE_CD = data[0].PLACE_CD;
                    setDatasEDT_KSV_PO_MRP_PLACE_CD(argCodes.PLACE_CD);
                    setDataEDT_KSV_PO_MRP_PLACE_CD(
                        argCodes.PLACE_CD[placeCdIndex],
                    );

                    console.log('---------1');
                    console.log(data[0].ORIGIN_PORT);
                    let originPortIndex = argCodes.ORIGIN_PORT.findIndex(
                        (item) => item.CD_NAME.includes(data[0].ORIGIN_PORT),
                    );
                    tObj.ORIGIN_PORT = data[0].ORIGIN_PORT;
                    setDatasEDT_KSV_PO_MRP_ORIGIN_PORT(argCodes.ORIGIN_PORT);
                    setDataEDT_KSV_PO_MRP_ORIGIN_PORT(
                        argCodes.ORIGIN_PORT[originPortIndex],
                    );
                } else {
                    let shipModeIndex = datasEDT_KSV_PO_MRP_SHIP_MODE.findIndex(
                        (item) => item.CD_CODE === data[0].SHIP_MODE,
                    );
                    tObj.SHIP_MODE = data[0].SHIP_MODE;
                    setDataEDT_KSV_PO_MRP_SHIP_MODE(
                        datasEDT_KSV_PO_MRP_SHIP_MODE[shipModeIndex],
                    );

                    let placeCdIndex = datasEDT_KSV_PO_MRP_PLACE_CD.findIndex(
                        (item) => item.PLACE_CD === data[0].PLACE_CD,
                    );
                    tObj.PLACE_CD = data[0].PLACE_CD;
                    setDataEDT_KSV_PO_MRP_PLACE_CD(
                        datasEDT_KSV_PO_MRP_PLACE_CD[placeCdIndex],
                    );

                    console.log('---------2');
                    console.log(data[0].ORIGIN_PORT);
                    let originPortIndex =
                        datasEDT_KSV_PO_MRP_ORIGIN_PORT.findIndex((item) =>
                            item.CD_NAME.includes(data[0].ORIGIN_PORT),
                        );
                    tObj.ORIGIN_PORT = data[0].ORIGIN_PORT;
                    setDataEDT_KSV_PO_MRP_ORIGIN_PORT(
                        datasEDT_KSV_PO_MRP_ORIGIN_PORT[originPortIndex],
                    );
                }

                if (typeof argCodes !== "undefined") {
                    let shipLineIndex = argCodes.SHIP_LINE.findIndex(
                        (item) => item.CD_CODE === data[0].SHIP_LINE,
                    );
                    tObj.SHIP_LINE = data[0].SHIP_LINE;
                    setDataEDT_KSV_PO_MRP_SHIP_LINE(
                        argCodes.SHIP_LINE[shipLineIndex],
                    );

                    let currIndex = argCodes.CURR_CD.findIndex(
                        (item) => item.CD_CODE === data[0].SHIPPING_COST_CURR,
                    );
                    tObj.COST_CURR = data[0].SHIPPING_COST_CURR;
                    setDataEDT_KSV_PO_MRP_COST_CURR(
                        argCodes.CURR_CD[currIndex],
                    );
                } else {
                    let shipLineIndex = datasEDT_KSV_PO_MRP_SHIP_LINE.findIndex(
                        (item) => item.CD_CODE === data[0].SHIP_LINE,
                    );
                    tObj.SHIP_LINE = data[0].SHIP_LINE;
                    setDataEDT_KSV_PO_MRP_SHIP_LINE(
                        datasEDT_KSV_PO_MRP_SHIP_LINE[shipLineIndex],
                    );

                    let currIndex = datasEDT_KSV_PO_MRP_COST_CURR.findIndex(
                        (item) => item.CD_CODE === data[0].SHIPPING_COST_CURR,
                    );
                    tObj.COST_CURR = data[0].SHIPPING_COST_CURR;
                    setDataEDT_KSV_PO_MRP_COST_CURR(
                        datasEDT_KSV_PO_MRP_COST_CURR[currIndex],
                    );
                }

                tObj.BL_FILE = data[0].BL_FILE;

                tObj.BL_NO = data[0].BL_NO;
                tObj.ETD = data[0].ETD;
                tObj.ETA = data[0].ETA;
                tObj.CONTAINER_NO = data[0].CONTAINER_NO;
                tObj.CI_FILE = data[0].CI_FILE;

                let destinationIndex =
                    datasEDT_KSV_PO_MRP_DESTINATION.findIndex(
                        (item) => item.CD_NAME === data[0].DESTINATION,
                    );
                tObj.DESTINATION = data[0].DESTINATION;
                tObj.DESTINATION_PORT = data[0].DESTINATION_PORT;
                setDataEDT_KSV_PO_MRP_DESTINATION(
                    datasEDT_KSV_PO_MRP_DESTINATION[destinationIndex],
                );

                tObj.COST = data[0].SHIPPING_COST;
                tObj.PL_FILE = data[0].PL_FILE;
                tObj.SINGAPORE_COMBINE = data[0].IS_SINGAPORE;
                tObj.REMARK = data[0].REMARK;
                tObj.SHIPMENT_STATUS = data[0].STATUS_N;

                if (typeof argData.CBM !== "undefined") {
                    tObj.CBM = argData.CBM;
                } else {
                    tObj.CBM = data[0].CBM;
                }
                setDataEDT_KSV_PO_MRP(tObj);

                if (typeof argCodes !== "undefined") {
                } else {
                    //editEDT_KSV_PO_MRP_SHIP_LINE(tObj.SHIP_LINE);
                    //editEDT_KSV_PO_MRP_SHIP_MODE(tObj.SHIP_MODE);
                    //editEDT_KSV_PO_MRP_PLACE_CD(tObj.PLACE_CD);
                    //editEDT_KSV_PO_MRP_DESTINATION(tObj.DESTINATION);
                }
                setDatasTBL_KSV_PO_MRP2(data);
            } else {
                setDatasTBL_KSV_PO_MRP2([]);
                setDataEDT_KSV_PO_MRP(emptyEDT_KSV_PO_MRP);
            }
        } else {
            console.log(
                "mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors),
            );
        }
    };

    const process_DOWNLOAD_BL_FILE = () => {
        if (dataEDT_KSV_PO_MRP.SHIPMENT_CD === "") {
            alert("미등록된 Shipment는 수정했습니다<br><br>Unregistered shipments have been corrected");
            return;
        }

        var tFileUrl = "";
        var tFileName = "";
        if (typeof dataKCD_FILEINFO.URL !== "undefined") {
            tFileUrl = dataKCD_FILEINFO.URL;
            tFileName = dataKCD_FILEINFO.NAME;
        } else if (datasTBL_KSV_PO_MRP2[0].BL_FILE !== "") {
            tFileUrl = datasTBL_KSV_PO_MRP2[0].BL_FILE_URL;
            tFileName = datasTBL_KSV_PO_MRP2[0].BL_FILE;
        }

        if (tFileUrl !== "") {
            serviceLib.downloadFile(tFileUrl, tFileName);
        }
    };

    const process_DELETE_FILE = async (fileTypeKey) => {
        const fileName = datasTBL_KSV_PO_MRP2[0][fileTypeKey];
        const fileUrl = datasTBL_KSV_PO_MRP2[0][`${fileTypeKey}_URL`];
        const fileKey = `${dataEDT_KSV_PO_MRP.SHIPMENT_CD}-${fileTypeKey}`;

        const tInObj = {
            FILE_KEY: fileKey,
            TITLE: `shipment ${fileTypeKey.toLowerCase().replace("_FILE", "")} file:${fileKey}`,
            NAME: `shipment_${fileTypeKey.toLowerCase()}`,
            URL: fileUrl,
            OBJECT_NAME: fileName,
        };

        serviceS043401_SHIPMENT_INFO
            .mgrDelete_FILE_DELETE(tInObj)
            .then((data) => {
                if (
                    typeof data.graphQLErrors === "undefined" &&
                    data.length > 0
                ) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        setDataEDT_KSV_PO_MRP((prev) => ({
                            ...prev,
                            [fileTypeKey]: "",
                        }));
                    }
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "Info",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_DELETE_BL_FILE = () => process_DELETE_FILE("BL_FILE");
    const process_DELETE_PL_FILE = () => process_DELETE_FILE("PL_FILE");
    const process_DELETE_CI_FILE = () => process_DELETE_FILE("CI_FILE");

    const process_DOWNLOAD_PL_FILE = () => {
        if (dataEDT_KSV_PO_MRP.SHIPMENT_CD === "") {
            alert("미등록된 Shipment는 수정했습니다<br><br>Unregistered shipments have been corrected");
            return;
        }

        var tFileUrl = "";
        var tFileName = "";
        if (typeof dataKCD_FILEINFO.URL !== "undefined") {
            tFileUrl = dataKCD_FILEINFO.URL;
            tFileName = dataKCD_FILEINFO.NAME;
        } else if (datasTBL_KSV_PO_MRP2[0].PL_FILE !== "") {
            tFileUrl = datasTBL_KSV_PO_MRP2[0].PL_FILE_URL;
            tFileName = datasTBL_KSV_PO_MRP2[0].PL_FILE;
        }

        if (tFileUrl !== "") {
            serviceLib.downloadFile(tFileUrl, tFileName);
        }
    };

    const process_DOWNLOAD_CI_FILE = () => {
        if (dataEDT_KSV_PO_MRP.SHIPMENT_CD === "") {
            alert("미등록된 Shipment는 수정했습니다<br><br>Unregistered shipments have been corrected");
            return;
        }

        var tFileUrl = "";
        var tFileName = "";
        if (typeof dataKCD_FILEINFO.URL !== "undefined") {
            tFileUrl = dataKCD_FILEINFO.URL;
            tFileName = dataKCD_FILEINFO.NAME;
        } else if (datasTBL_KSV_PO_MRP2[0].CI_FILE !== "") {
            tFileUrl = datasTBL_KSV_PO_MRP2[0].CI_FILE_URL;
            tFileName = datasTBL_KSV_PO_MRP2[0].CI_FILE;
        }

        if (tFileUrl !== "") {
            serviceLib.downloadFile(tFileUrl, tFileName);
        }
    };

    const process_ITEM_DELETE = (argData) => {
        if (dataEDT_KSV_PO_MRP.SHIPMENT_CD === "") {
            alert("미등록된 Shipment는 수정했습니다<br><br>Unregistered shipments have been corrected");
            return;
        }

        var tArray = [];

        console.log(selectedTBL_KSV_PO_MRP);

        selectedTBL_KSV_PO_MRP.forEach((col, i) => {
            var tObj = {};
            tObj.STSOUT_CD = col.STSOUT_CD;
            tArray.push(tObj);
        });

        if (selectedTBL_KSV_PO_MRP.length === datasTBL_KSV_PO_MRP.length) {
            alert("전체 Item 삭제는 Shipment 삭제를 이용하세요<br><br>To delete an entire item, use Delete Shipment.");
            return;
        }

        var tEDTObj = {
            ...dataEDT_KSV_PO_MRP,
        };
        var tObj = {
            ...datasTBL_KSV_PO_MRP2[0],
        };

        if (["4", "5"].includes(tEDTObj.SHIP_MODE)) {
            alert(
                "DHL, FEDEX는 DELETE만 가능합니다. SHIP REGIST에서 다시 설정해주세요.<br>DHL and FEDEX can only DELETE. Please set again in SHIP REGIST.",
            );
            return;
        }

        if (typeof tObj.id !== "undefined") delete tObj.id;
        if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
        tObj.SHIP_MODE = tEDTObj.SHIP_MODE;
        tObj.PLACE_CD = tEDTObj.PLACE_CD;
        tObj.ORIGIN_PORT = tEDTObj.ORIGIN_PORT;
        tObj.SHIP_LINE = tEDTObj.SHIP_LINE;
        tObj.BL_NO = tEDTObj.BL_NO;
        tObj.CONTAINER_NO = tEDTObj.CONTAINER_NO;
        tObj.DESTINATION = tEDTObj.DESTINATION;
        tObj.IS_SINGAPORE = tEDTObj.SINGAPORE_COMBINE;
        tObj.REMARK = tEDTObj.REMARK;
        tObj.ETD = tEDTObj.ETD;

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS043401_SHIPMENT_INFO
            .mgrUpdate_REMOVE_ITEM(tObj, tArray)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        var tObj = {};
                        tObj.SHIPMENT_CD = tEDTObj.SHIPMENT_CD;
                        tObj.REMARK = tEDTObj.REMARK;
                        search_LIST_2(tObj);
                        search_LIST_1(tObj);
                    }
                } else {
                    // console.log("mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors));
                    toast.current.show({
                        severity: "success",
                        summary: "Fail:Shipment Fix",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_UPDATE_HSCODE = (argData) => {
        if (dataEDT_KSV_PO_MRP.SHIPMENT_CD === "") {
            alert("Shipment# is required for update HS CODE");
            return;
        }

        var tInObj = {};
        tInObj.HS_NO = dataEDT_KCD_MATL_MST_HS_CD.HS_NO;
        tInObj.HS_NAME = dataEDT_KCD_MATL_MST_HS_CD.HS_NAME;

        var tInObj2 = [];
        selectedTBL_KCD_MATL_MST.forEach((col, i) => {
            var tObj = {};
            tObj.MATL_CD = col.MATL_CD;
            tObj.MATL_NAME = col.MATL_NAME;
            tInObj2.push(tObj);
        });

        setLoadingTBL_KCD_MATL_MST(true);
        serviceS043401_SHIPMENT_INFO
            .mgrUpdate_HSCODE(tInObj, tInObj2)
            .then((data) => {
                setLoadingTBL_KCD_MATL_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            setSelectedTBL_KCD_MATL_MST([]);
                            var tEDTObj = {
                                ...dataEDT_KSV_PO_MRP,
                            };
                            var tObj = {};
                            tObj.SHIPMENT_CD = tEDTObj.SHIPMENT_CD;
                            tObj.REMARK = tEDTObj.REMARK;
                            search_LIST_COMP(tObj);
                        }
                    }
                } else {
                    // console.log("mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors));
                    toast.current.show({
                        severity: "success",
                        summary: "Fail:Shipment Fix",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_UPDATE_COMP = (argData) => {
        if (dataEDT_KSV_PO_MRP.SHIPMENT_CD === "") {
            alert("미등록된 Shipment는 수정했습니다<br><br>Unregistered shipments have been corrected");
            return;
        }

        var tInObj = {};
        tInObj.COMP1 = dataEDT_KCD_MATL_MST_COMP1.CD_NAME;
        tInObj.COMP1_PERCENT = dataEDT_KCD_MATL_MST.COMP1_P;
        tInObj.COMP2 = dataEDT_KCD_MATL_MST_COMP2.CD_NAME;
        tInObj.COMP2_PERCENT = dataEDT_KCD_MATL_MST.COMP2_P;
        tInObj.COMP3 = dataEDT_KCD_MATL_MST_COMP3.CD_NAME;
        tInObj.COMP3_PERCENT = dataEDT_KCD_MATL_MST.COMP3_P;
        tInObj.COMP4 = dataEDT_KCD_MATL_MST_COMP4.CD_NAME;
        tInObj.COMP4_PERCENT = dataEDT_KCD_MATL_MST.COMP4_P;

        var tInObj2 = [];
        selectedTBL_KCD_MATL_MST.forEach((col, i) => {
            var tObj = {};
            tObj.MATL_CD = col.MATL_CD;
            tObj.MATL_NAME = col.MATL_NAME;
            tInObj2.push(tObj);
        });

        setLoadingTBL_KCD_MATL_MST(true);
        serviceS043401_SHIPMENT_INFO
            .mgrUpdate_COMP(tInObj, tInObj2)
            .then((data) => {
                setLoadingTBL_KCD_MATL_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            setSelectedTBL_KCD_MATL_MST([]);
                            var tEDTObj = {
                                ...dataEDT_KSV_PO_MRP,
                            };
                            var tObj = {};
                            tObj.SHIPMENT_CD = tEDTObj.SHIPMENT_CD;
                            tObj.REMARK = tEDTObj.REMARK;
                            search_LIST_COMP(tObj);
                        }
                    }
                } else {
                    // console.log("mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors));
                    toast.current.show({
                        severity: "success",
                        summary: "Fail:Shipment Fix",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_UPDATE_OFFER_SPEC = (argData) => {
        if (dataEDT_KSV_PO_MRP.SHIPMENT_CD === "") {
            alert("미등록된 Shipment는 수정했습니다<br><br>Unregistered shipments have been corrected");
            return;
        }

        var tInObj = {};
        tInObj.OFFER_SPEC = dataEDT_KCD_MATL_MST1.OFFER_SPEC;

        var tInObj2 = [];
        selectedTBL_KCD_MATL_MST1.forEach((col, i) => {
            var tObj = {};
            tObj.VENDOR_CD = col.VENDOR_CD;
            tObj.MATL_NAME = col.MATL_NAME;
            tObj.SPEC = col.SPEC;
            tInObj2.push(tObj);
        });

        setLoadingTBL_KCD_MATL_MST1(true);
        serviceS043401_SHIPMENT_INFO
            .mgrUpdate_OFFER_SPEC(tInObj, tInObj2)
            .then((data) => {
                setLoadingTBL_KCD_MATL_MST1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            setSelectedTBL_KCD_MATL_MST1([]);
                            var tEDTObj = {
                                ...dataEDT_KSV_PO_MRP,
                            };
                            var tObj = {};
                            tObj.SHIPMENT_CD = tEDTObj.SHIPMENT_CD;
                            tObj.REMARK = tEDTObj.REMARK;
                            search_LIST_OFFER_SPEC(tObj);
                        }
                    }
                } else {
                    // console.log("mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors));
                    toast.current.show({
                        severity: "success",
                        summary: "Fail:Shipment Fix",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_DELETE = async (argData) => {
        if (
            !(await confirm(
                "Are you sure you want to delete?<br>This will delete all shipment data.",
            ))
        ) {
            return;
        }

        if (dataEDT_KSV_PO_MRP.SHIPMENT_CD === "") {
            alert("ShipmentCD is empty.");
            return;
        }

        if (!Array.isArray(datasTBL_KSV_PO_MRP2) || datasTBL_KSV_PO_MRP2.length <= 0) {
            alert("There is no shipment row to delete.");
            return;
        }

        var tEDTObj = {
            ...dataEDT_KSV_PO_MRP,
        };

        var tObj = {
            ...datasTBL_KSV_PO_MRP2[0],
        };
        if (typeof tObj.id !== "undefined") delete tObj.id;
        if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
        tObj.SHIP_MODE = tEDTObj.SHIP_MODE;
        tObj.PLACE_CD = tEDTObj.PLACE_CD;
        tObj.ORIGIN_PORT = tEDTObj.ORIGIN_PORT;
        tObj.SHIP_LINE = tEDTObj.SHIP_LINE;
        tObj.BL_NO = tEDTObj.BL_NO;
        tObj.CONTAINER_NO = tEDTObj.CONTAINER_NO;
        tObj.DESTINATION = tEDTObj.DESTINATION;
        tObj.IS_SINGAPORE = tEDTObj.SINGAPORE_COMBINE;

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS043401_SHIPMENT_INFO.mgrDelete_SHIPMENT(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                    var tObj1 = {};
                    search_LIST_2(tObj1);
                    var tObj2 = {};
                    tObj2.SHIPMENT_CD = tObj.SHIPMENT_CD;
                    tObj2.REMARK = tObj.REMARK;
                    search_LIST_1(tObj2);
                }
            } else {
                // console.log("mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors));
                toast.current.show({
                    severity: "success",
                    summary: "Fail:Shipment Fix",
                    detail: "",
                    life: 3000,
                });
            }
        });
    };

    const process_FIX = async (argData) => {
        if (dataEDT_KSV_PO_MRP.SHIPMENT_CD === "") {
            alert("ShipmentCD is empty.");
            return;
        }

        if (!Array.isArray(datasTBL_KSV_PO_MRP2) || datasTBL_KSV_PO_MRP2.length <= 0) {
            alert("There is no shipment row to update.");
            return;
        }

        var tEDTObj = {
            ...dataEDT_KSV_PO_MRP,
        };

        var tObj = {
            ...datasTBL_KSV_PO_MRP2[0],
        };

        if (
            tEDTObj.SHIPMENT_STATUS === "Fixed" &&
            ["4", "5"].includes(tEDTObj.SHIP_MODE)
        ) {
            alert(
                "DHL, FEDEX는 Fixed를 Not Fixed로 변경 할 수 없습니다.<br><br>DHL and FEDEX cannot change Fixed to Not Fixed.",
            );
            return;
        }

        /*
        if (
            tEDTObj.SHIPMENT_STATUS === "Not Fixed" &&
            tEDTObj.SHIP_MODE === "11"
        ) {
            //SEA
            alert("SHIP MODE를 선택하세요.<br><br>Please change the ship mode");
            return;
        }
        */

        var isNSR = 0;
        if (tEDTObj.SHIPMENT_STATUS === "Not Fixed") {
            datasTBL_KSV_PO_MRP.forEach((col9, i9) => {
                if (col9.BUYER_NAME.includes("[nsr]")) isNSR = 1;
            });
        }

        if (
            tEDTObj.REMARK.substring(
                tEDTObj.REMARK.length - 1,
                tEDTObj.REMARK.length,
            ) === "D"
        )
            isNSR = 1;

        if (isNSR === 1) {
            if (
                tEDTObj.REMARK.substring(
                    tEDTObj.REMARK.length - 1,
                    tEDTObj.REMARK.length,
                ) === "D"
            ) {
                if (tEDTObj.SHIPMENT_STATUS === "Fixed") {
                    alert("NSR Shipment는 Fixed를 Not Fixed로 변경 할 수 없습니다.<br><br>NSR Shipment  cannot change Fixed to Not Fixed.");
                    return;
                }
            } else {
                if (tEDTObj.SHIPMENT_STATUS === "Fixed");
                else {
                    alert(`NSR buyer의 자재는 "${tEDTObj.REMARK}D" remark의 Shipment로 분리됩니다.`);
                }
            }
        }

        if (tEDTObj.SHIPMENT_STATUS === "Arrival") {
            alert("Arrival 상태는 Fix상태 수정이 불가합니다.<br><br>Arrival status cannot be modified in Fix status.");
            return;
        }
            
        let tUserInfo = serviceLib.getUserInfo();
        if (tEDTObj.SHIPMENT_STATUS === 'Discharged' ||
            tEDTObj.SHIPMENT_STATUS === 'On the way' ||
            tEDTObj.SHIPMENT_STATUS === 'END') {
            if (tUserInfo.USER_ID !== 'timothy' && 
                tUserInfo.USER_ID !== 'chuck' &&
                tUserInfo.USER_ID !== 'thuy' &&
                tUserInfo.USER_ID !== 'diuptt' &&
                tUserInfo.USER_ID !== 'kevin1' &&
                tUserInfo.USER_ID !== 'lih7912' &&
                tUserInfo.USER_ID !== 'won21kr'
            ) {
                alert("Fixed 상태는 팀장만 변경 가능합니다.<br><br>Only team leader can change Fixed status.");
                return;
            }
        }

        if (typeof tObj.id !== "undefined") delete tObj.id;
        if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
        tObj.SHIP_MODE = tEDTObj.SHIP_MODE;
        tObj.PLACE_CD = tEDTObj.PLACE_CD;
        tObj.ORIGIN_PORT = tEDTObj.ORIGIN_PORT;
        tObj.SHIP_LINE = tEDTObj.SHIP_LINE;
        tObj.BL_NO = tEDTObj.BL_NO;
        tObj.CONTAINER_NO = tEDTObj.CONTAINER_NO;
        tObj.DESTINATION = tEDTObj.DESTINATION;
        tObj.IS_SINGAPORE = tEDTObj.SINGAPORE_COMBINE;

        if (tObj.FIX_FLAG === null) tObj.FIX_FLAG = "0";

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS043401_SHIPMENT_INFO
            .mgrUpdate_SHIPMENT_FIX(tObj)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        var tObj1 = {};
                        tObj1.SHIPMENT_CD = tObj.SHIPMENT_CD;
                        search_LIST_2(tObj1);
                    }
                } else {
                    // console.log("mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors));
                    toast.current.show({
                        severity: "success",
                        summary: "Fail:Shipment Fix",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_UPDATE = (argData) => {
        if (!Array.isArray(datasTBL_KSV_PO_MRP2) || datasTBL_KSV_PO_MRP2.length <= 0) {
            alert("There is no shipment row to save.");
            return;
        }

        var tEDTObj = {
            ...dataEDT_KSV_PO_MRP,
        };

        var tObj = {
            ...datasTBL_KSV_PO_MRP2[0],
        };

        var tInputItem = [];
        datasTBL_KSV_PO_MRP.forEach((col, i) => {
            var tObj = {};
            tObj.BUYER_CD = col.BUYER_CD;
            tObj.WEIGHT = col.WEIGHT;
            tInputItem.push(tObj);
        });

        if (typeof tObj.id !== "undefined") delete tObj.id;
        if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
        tObj.SHIP_MODE = tEDTObj.SHIP_MODE;
        tObj.PLACE_CD = tEDTObj.PLACE_CD;
        tObj.ORIGIN_PORT = tEDTObj.ORIGIN_PORT;
        tObj.SHIP_LINE = tEDTObj.SHIP_LINE;
        tObj.BL_NO = tEDTObj.BL_NO;
        tObj.CONTAINER_NO = tEDTObj.CONTAINER_NO;
        tObj.DESTINATION = tEDTObj.DESTINATION;
        tObj.IS_SINGAPORE = tEDTObj.SINGAPORE_COMBINE;
        tObj.REMARK = edtRemark;
        tObj.ETD = tEDTObj.ETD;
        tObj.ETA = tEDTObj.ETA;
        tObj.CBM = tEDTObj.CBM;
        tObj.COST = tEDTObj.COST;
        tObj.SHIPPING_COST_CURR = tEDTObj.COST_CURR;
        tObj.INVOICE_NO = edtInvoiceNo;
        tObj.DESTINATION_PORT = edtPort;

        if (
            tObj.SHIP_MODE === "1" ||
            tObj.SHIP_MODE === "2" ||
            tObj.SHIP_MODE === "11"
        ) {
            // FCL, LCL, SEA
            if (tObj.BL_NO && !tObj.SHIP_LINE) {
                alert("Ship Line is required.");
                return;
            }

            if (
                tObj.SHIP_LINE === "TRUCK" ||
                tObj.SHIP_LINE === "AIR" ||
                tObj.SHIP_LINE === "FEDEX" ||
                tObj.SHIP_LINE === "DHL" ||
                tObj.SHIP_LINE === "UPS" ||
                tObj.SHIP_LINE === "Handcarry" ||
                tObj.SHIP_LINE.includes("EXPRESS")
            ) {
                alert(
                    "If select FCL/LCL/SEA, Ship Line can not be Truck/Air/Express",
                );
                return;
            }
        } else {
            if (
                tObj.SHIP_LINE !== "TRUCK" &&
                tObj.SHIP_LINE !== "AIR" &&
                tObj.SHIP_LINE !== "FEDEX" &&
                tObj.SHIP_LINE !== "DHL" &&
                tObj.SHIP_LINE !== "UPS" &&
                tObj.SHIP_LINE !== "Handcarry" &&
                !tObj.SHIP_LINE.includes("EXPRESS")
            ) {
                alert(
                    "If select other than FCL/LCL/SEA, Ship Line must be Truck/Air/Express",
                );
                return;
            }
        }

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS043401_SHIPMENT_INFO
            .mgrUpdate_SHIPMENT(tObj, tInputItem)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            var tCols = data[0].CODE.split(":");
                            var returnShipmentCd = tCols[2];

                            if (returnShipmentCd !== tEDTObj.SHIPMENT_CD) {
                                tEDTObj.SHIPMENT_CD = returnShipmentCd;
                                setDataEDT_KSV_PO_MRP(tEDTObj);
                            }

                            /*
                              CHK_BVT : "0"
                              CHK_ETP : "0"
                              CHK_OTHER : "0"
                              CHK_SHINTS : "1"
                              CURR_CD : "KRW"
                              SHIPMENT_CD : "SHIP26-003400"
                              SHIPPING_COST : "1525790"
                              SHIPPING_COST_PAID : "SHINTS"
                            */
                            if (parseFloat(dataEDT_KSV_PO_MRP.COST) > 0 && dataEDT_KSV_PO_MRP.BL_NO) {
                                var tInObj = {};
                                tInObj.CHK_BVT = '0';
                                tInObj.CHK_ETP = '0';
                                tInObj.CHK_OTHER = '0';
                                tInObj.CHK_SHINTS = '1';
                                tInObj.CURR_CD = dataEDT_KSV_PO_MRP_COST_CURR.CD_CODE;
                                tInObj.SHIPMENT_CD = tEDTObj.SHIPMENT_CD;
                                tInObj.SHIPPING_COST = dataEDT_KSV_PO_MRP.COST;
                                tInObj.SHIPPING_COST_PAID = 'SHINTS';
                                serviceS043401_SHIPMENT_INFO
                                    .mgrUpdate_COST(tInObj)
                                    .then((data) => {
                                        setLoadingTBL_KSV_PO_MRP(false);
                                        if (typeof data.graphQLErrors === "undefined") {
                                            if (data.length > 0) {
                                                alert(data[0].CODE);
                                                if (data[0].CODE.includes("SUCC")) {
                                                    ;
                                                }
                                            }
                                        }
                                    });
                            } else if (parseFloat(dataEDT_KSV_PO_MRP.COST) > 0 && !dataEDT_KSV_PO_MRP.BL_NO) {
                                setLoadingTBL_KSV_PO_MRP(false);
                                alert ('BL NO가 입력되지 않아 Shipping Cost가 Cost Confirmation에 반영되지 않습니다 ');
                            } else {
                                setLoadingTBL_KSV_PO_MRP(false);
                            }


                            if (
                                tObj.SHIP_MODE === "1" ||
                                tObj.SHIP_MODE === "2"
                            ) {
                                // FCL, LCL
                                if (
                                    [
                                        "sea",
                                        "stb",
                                        "ste",
                                        "fedex",
                                        "dhl",
                                    ].includes(tObj.BL_NO.toLowerCase())
                                ) {
                                    alert("Please check BL# and Ship Line.");
                                    return;
                                }

                                if (
                                    tObj.BL_NO &&
                                    tObj.SHIP_LINE &&
                                    ![
                                        "TRUCK",
                                        "FEDEX",
                                        "DHL",
                                        "UPS",
                                        "AIR",
                                        "EXPRESS",
                                        "Handcarry",
                                        "EXPRESS(3rd)",
                                        "EXPRESS(Pick-up)",
                                    ].includes(tObj.SHIP_LINE)
                                ) {
                                    axios
                                        .post(
                                            `${apiOption.apiuri}/restapi/tradlinx/track`,
                                            {
                                                bl_no: tObj.BL_NO,
                                                line_cd: tObj.SHIP_LINE,
                                            },
                                        )
                                        .then((response) => {
                                            console.log(response);
                                            var tObj = {};
                                            tObj.SHIPMENT_CD = returnShipmentCd;
                                            search_LIST_2(tObj);

                                            var tObj2 = {};
                                            tObj2.SHIPMENT_CD =
                                                returnShipmentCd;
                                            tObj2.REMARK = tEDTObj.REMARK;
                                            search_LIST_1(tObj2);

                                            setTimeout(() => {
                                                axios.post(
                                                    `${apiOption.apiuri}/restapi/tradlinx/refresh-pending`,
                                                );
                                            }, 10 * 1000);
                                        })
                                        .catch((err) => console.error(err));
                                }
                            }
                        } else {
                             setLoadingTBL_KSV_PO_MRP(false);
                        }
                    }
                } else {
                    setLoadingTBL_KSV_PO_MRP(false);
                    // console.log("mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors));
                    toast.current.show({
                        severity: "success",
                        summary: "Fail:Shipment Fix",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP] =
        useState(emptyQRY_KSV_PO_MRP);

    const [
        datasQRY_KSV_PO_MRP_ORIGIN_PORT,
        setDatasQRY_KSV_PO_MRP_ORIGIN_PORT,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP_ORIGIN_PORT, setDataQRY_KSV_PO_MRP_ORIGIN_PORT] =
        useState({});

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP2, setDataQRY_KSV_PO_MRP2] =
        useState(emptyQRY_KSV_PO_MRP2);

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP1, setDataQRY_KSV_PO_MRP1] =
        useState(emptyQRY_KSV_PO_MRP1);

    const [datasQRY_KSV_PO_MRP1_BUYER_CD, setDatasQRY_KSV_PO_MRP1_BUYER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_BUYER_CD, setDataQRY_KSV_PO_MRP1_BUYER_CD] =
        useState({});

    const [datasQRY_KSV_PO_MRP1_PO_CD, setDatasQRY_KSV_PO_MRP1_PO_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_PO_CD, setDataQRY_KSV_PO_MRP1_PO_CD] = useState(
        {},
    );

    const [datasQRY_KSV_PO_MRP1_PU_STATUS, setDatasQRY_KSV_PO_MRP1_PU_STATUS] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_PU_STATUS, setDataQRY_KSV_PO_MRP1_PU_STATUS] =
        useState({});

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP
    const [loadingTBL_KSV_PO_MRP, setLoadingTBL_KSV_PO_MRP] = useState(false);

    const [datasTBL_KSV_PO_MRP, setDatasTBL_KSV_PO_MRP] = useState([]);
    const dt_TBL_KSV_PO_MRP = useRef(null);
    const [dataTBL_KSV_PO_MRP, setDataTBL_KSV_PO_MRP] =
        useState(emptyTBL_KSV_PO_MRP);
    const [selectedTBL_KSV_PO_MRP, setSelectedTBL_KSV_PO_MRP] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP, setFlagSelectModeTBL_KSV_PO_MRP] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP

    const onRowClick1TBL_KSV_PO_MRP = (argData0) => {
        var argData = {};

        if (!argData0) return;

        if (typeof argData0.length !== "undefined") {
            if (argData0.length <= 0) return;
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP = argData;

        setDataTBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);

        if (argData.DESTINATION) setIsDestination(true);
        else setIsDestination(false);

        var tObj = {
            ...dataEDT_KSV_PO_MRP,
        };
        tObj.ORIGIN_PORT = argData.ORIGIN_PORT;
        tObj.ETA = argData.TARGET_ETA;
        tObj.DESTINATION = argData.DESTINATION;
        tObj.CBM = argData.CBM;
        setDataEDT_KSV_PO_MRP(tObj);

        editEDT_KSV_PO_MRP_DESTINATION(argData.DESTINATION);

        search_LIST_2(argData);
        // resetEDT_KSV_PO_MRP(argData);
    };

    const onRowClickTBL_KSV_PO_MRP = (event) => {
        let argTBL_KSV_PO_MRP = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP
    };

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP1
    const [loadingTBL_KSV_PO_MRP1, setLoadingTBL_KSV_PO_MRP1] = useState(false);

    const [datasTBL_KSV_PO_MRP1, setDatasTBL_KSV_PO_MRP1] = useState([]);
    const dt_TBL_KSV_PO_MRP1 = useRef(null);
    const [dataTBL_KSV_PO_MRP1, setDataTBL_KSV_PO_MRP1] =
        useState(emptyTBL_KSV_PO_MRP1);
    const [selectedTBL_KSV_PO_MRP1, setSelectedTBL_KSV_PO_MRP1] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP1, setFlagSelectModeTBL_KSV_PO_MRP1] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP1

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KCD_MATL_MST
    let emptyTBL_KCD_MATL_MST = {};

    const [loadingTBL_KCD_MATL_MST, setLoadingTBL_KCD_MATL_MST] =
        useState(false);
    const [datasTBL_KCD_MATL_MST, setDatasTBL_KCD_MATL_MST] = useState([]);
    const [savesTBL_KCD_MATL_MST, setSavesTBL_KCD_MATL_MST] = useState([]);
    const dt_TBL_KCD_MATL_MST = useRef(null);
    const [dataTBL_KCD_MATL_MST, setDataTBL_KCD_MATL_MST] = useState(
        emptyTBL_KCD_MATL_MST,
    );
    const [selectedTBL_KCD_MATL_MST, setSelectedTBL_KCD_MATL_MST] = useState(
        [],
    );
    const [flagSelectModeTBL_KCD_MATL_MST, setFlagSelectModeTBL_KCD_MATL_MST] =
        useState(false);

    // DATAGRID CODE : TBL_KCD_MATL_MST

    const onRowClickTBL_KCD_MATL_MST = (event) => {};

    let emptyTBL_KCD_MATL_MST1 = {};

    const [loadingTBL_KCD_MATL_MST1, setLoadingTBL_KCD_MATL_MST1] =
        useState(false);
    const [datasTBL_KCD_MATL_MST1, setDatasTBL_KCD_MATL_MST1] = useState([]);
    const dt_TBL_KCD_MATL_MST1 = useRef(null);
    const [dataTBL_KCD_MATL_MST1, setDataTBL_KCD_MATL_MST1] = useState(
        emptyTBL_KCD_MATL_MST1,
    );
    const [selectedTBL_KCD_MATL_MST1, setSelectedTBL_KCD_MATL_MST1] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KCD_MATL_MST1,
        setFlagSelectModeTBL_KCD_MATL_MST1,
    ] = useState(false);

    // DATAGRID CODE : TBL_KCD_MATL_MST1

    const onRowClickTBL_KCD_MATL_MST1 = (event) => {};

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP2
    const [loadingTBL_KSV_PO_MRP2, setLoadingTBL_KSV_PO_MRP2] = useState(false);

    const [datasTBL_KSV_PO_MRP2, setDatasTBL_KSV_PO_MRP2] = useState([]);
    const dt_TBL_KSV_PO_MRP2 = useRef(null);
    const [dataTBL_KSV_PO_MRP2, setDataTBL_KSV_PO_MRP2] =
        useState(emptyTBL_KSV_PO_MRP2);
    const [selectedTBL_KSV_PO_MRP2, setSelectedTBL_KSV_PO_MRP2] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP2, setFlagSelectModeTBL_KSV_PO_MRP2] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP2

    //
    const [dataEDT_KCD_MATL_MST1, setDataEDT_KCD_MATL_MST1] = useState(
        emptyEDT_KCD_MATL_MST1,
    );

    const onInputChangeEDT_KCD_MATL_MST1_OFFER_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST = {
            ...dataEDT_KCD_MATL_MST1,
        };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST1(_dataEDT_KCD_MATL_MST);
    };

    //
    const [dataEDT_KCD_MATL_MST, setDataEDT_KCD_MATL_MST] = useState(
        emptyEDT_KCD_MATL_MST,
    );

    const [qryMAIN_MATL, setQryMAIN_MATL] = useState(0);
    const [qrySUB_MATL, setQrySUB_MATL] = useState(0);
    const [qryIS_ALL, setQryIS_ALL] = useState(1);

    const onCheckboxChangeEDT_KCD_MATL_MST_MAIN_MATL = (e, name) => {
        let val = "";
        if (e.checked) {
            val = "1";
            setQryMAIN_MATL("1");
            setQrySUB_MATL("0");
            setQryIS_ALL("0");
        } else {
            val = "0";
        }

        if (val === "1") {
            var tArray = [];
            savesTBL_KCD_MATL_MST.forEach((col, i) => {
                if (col.MATL_TYPE === "M") {
                    var tObj = { ...col };
                    tArray.push(tObj);
                }
            });
        }
        setDatasTBL_KCD_MATL_MST(tArray);
    };

    const onCheckboxChangeEDT_KCD_MATL_MST_SUB_MATL = (e, name) => {
        let val = "";
        if (e.checked) {
            val = "1";
            setQryMAIN_MATL("0");
            setQrySUB_MATL("1");
            setQryIS_ALL("0");
        } else {
            val = "0";
        }
        if (val === "1") {
            var tArray = [];
            savesTBL_KCD_MATL_MST.forEach((col, i) => {
                if (col.MATL_TYPE === "S") {
                    var tObj = { ...col };
                    tArray.push(tObj);
                }
            });
        }
        setDatasTBL_KCD_MATL_MST(tArray);
    };

    const onCheckboxChangeEDT_KCD_MATL_MST_IS_ALL = (e, name) => {
        let val = "";
        if (e.checked) {
            val = "1";
            setQryMAIN_MATL("0");
            setQrySUB_MATL("0");
            setQryIS_ALL("1");
        } else {
            val = "0";
        }
        setDatasTBL_KCD_MATL_MST(savesTBL_KCD_MATL_MST);
    };

    const [datasEDT_KCD_MATL_MST_HS_CD, setDatasEDT_KCD_MATL_MST_HS_CD] =
        useState([]);
    const [dataEDT_KCD_MATL_MST_HS_CD, setDataEDT_KCD_MATL_MST_HS_CD] =
        useState({});

    const onDropdownChangeEDT_KCD_MATL_MST_HS_CD = (e, name) => {
        let val = (e.value && e.value.HS_NO) || "";

        let _dataEDT_KCD_MATL_MST = {
            ...dataEDT_KCD_MATL_MST,
        };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
        setDataEDT_KCD_MATL_MST_HS_CD(e.value);
    };

    const [datasEDT_KCD_MATL_MST_COMP1, setDatasEDT_KCD_MATL_MST_COMP1] =
        useState([]);
    const [dataEDT_KCD_MATL_MST_COMP1, setDataEDT_KCD_MATL_MST_COMP1] =
        useState({});

    const onDropdownChangeEDT_KCD_MATL_MST_COMP1 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KCD_MATL_MST = {
            ...dataEDT_KCD_MATL_MST,
        };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
        setDataEDT_KCD_MATL_MST_COMP1(e.value);
    };

    const [datasEDT_KCD_MATL_MST_COMP2, setDatasEDT_KCD_MATL_MST_COMP2] =
        useState([]);
    const [dataEDT_KCD_MATL_MST_COMP2, setDataEDT_KCD_MATL_MST_COMP2] =
        useState({});

    const onDropdownChangeEDT_KCD_MATL_MST_COMP2 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KCD_MATL_MST = {
            ...dataEDT_KCD_MATL_MST,
        };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
        setDataEDT_KCD_MATL_MST_COMP2(e.value);
    };

    const [datasEDT_KCD_MATL_MST_COMP3, setDatasEDT_KCD_MATL_MST_COMP3] =
        useState([]);
    const [dataEDT_KCD_MATL_MST_COMP3, setDataEDT_KCD_MATL_MST_COMP3] =
        useState({});

    const onDropdownChangeEDT_KCD_MATL_MST_COMP3 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KCD_MATL_MST = {
            ...dataEDT_KCD_MATL_MST,
        };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
        setDataEDT_KCD_MATL_MST_COMP3(e.value);
    };

    const [datasEDT_KCD_MATL_MST_COMP4, setDatasEDT_KCD_MATL_MST_COMP4] =
        useState([]);
    const [dataEDT_KCD_MATL_MST_COMP4, setDataEDT_KCD_MATL_MST_COMP4] =
        useState({});

    const onDropdownChangeEDT_KCD_MATL_MST_COMP4 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KCD_MATL_MST = {
            ...dataEDT_KCD_MATL_MST,
        };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
        setDataEDT_KCD_MATL_MST_COMP4(e.value);
    };

    const onInputChangeEDT_KCD_MATL_MST_COMP1_P = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST = {
            ...dataEDT_KCD_MATL_MST,
        };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
    };

    const onInputChangeEDT_KCD_MATL_MST_COMP2_P = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST = {
            ...dataEDT_KCD_MATL_MST,
        };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
    };

    const onInputChangeEDT_KCD_MATL_MST_COMP3_P = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST = {
            ...dataEDT_KCD_MATL_MST,
        };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
    };

    const onInputChangeEDT_KCD_MATL_MST_COMP4_P = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST = {
            ...dataEDT_KCD_MATL_MST,
        };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
    };

    /* QRY KSV_PO_MRP*/
    const [dataKCD_FILEINFO, setDataKCD_FILEINFO] = useState({});
    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    const [valTOTAL_CT_QTY, setValTOTAL_CT_QTY] = useState("0");
    const [valTOTAL_OUT_QTY, setValTOTAL_OUT_QTY] = useState("0");
    const [valTOTAL_WEIGHT, setValTOTAL_WEIGHT] = useState("0");
    const [valTOTAL_CBM, setValTOTAL_CBM] = useState("0");

    const [datasEDT_KSV_PO_MRP_SHIP_MODE, setDatasEDT_KSV_PO_MRP_SHIP_MODE] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_SHIP_MODE, setDataEDT_KSV_PO_MRP_SHIP_MODE] =
        useState({});

    const EXPRESS_LIST = [
        "DHL",
        "FEDEX",
        "EXPRESS",
        "Handcarry",
        "EXPRESS(3rd)",
        "EXPRESS(Pick-up)",
    ];

    const onDropdownChangeEDT_KSV_PO_MRP_SHIP_MODE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";
        let modeName = (e.value && e.value.CD_NAME) || "";

        let _dataEDT_KSV_PO_MRP = {
            ...dataEDT_KSV_PO_MRP,
        };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        if (EXPRESS_LIST.includes(modeName)) {
            // ship line 목록에서 동일한 이름 필터
            const shipLine = datasEDT_KSV_PO_MRP_SHIP_LINE?.find(
                (item) => item.CD_NAME === modeName,
            );

            if (shipLine) {
                _dataEDT_KSV_PO_MRP.SHIP_LINE = shipLine.CD_CODE;
                setDataEDT_KSV_PO_MRP_SHIP_LINE(shipLine.CD_CODE);
            }
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_SHIP_MODE(e.value);
    };

    const [datasEDT_KSV_PO_MRP_COST_CURR, setDatasEDT_KSV_PO_MRP_COST_CURR] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_COST_CURR, setDataEDT_KSV_PO_MRP_COST_CURR] =
        useState({});

    const onDropdownChangeEDT_KSV_PO_MRP_COST_CURR = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = {
            ...dataEDT_KSV_PO_MRP,
        };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_COST_CURR(e.value);
    };

    const [datasEDT_KSV_PO_MRP_SHIP_LINE, setDatasEDT_KSV_PO_MRP_SHIP_LINE] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_SHIP_LINE, setDataEDT_KSV_PO_MRP_SHIP_LINE] =
        useState({});

    const onDropdownChangeEDT_KSV_PO_MRP_SHIP_LINE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = {
            ...dataEDT_KSV_PO_MRP,
        };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_SHIP_LINE(e.value);
    };

    const [datasEDT_KSV_PO_MRP_PLACE_CD, setDatasEDT_KSV_PO_MRP_PLACE_CD] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_PLACE_CD, setDataEDT_KSV_PO_MRP_PLACE_CD] =
        useState({});

    const onDropdownChangeEDT_KSV_PO_MRP_PLACE_CD = (e, name) => {
        let val = (e.value && e.value.PLACE_CD) || "";

        console.log(val);

        let _dataEDT_KSV_PO_MRP = {
            ...dataEDT_KSV_PO_MRP,
        };
        _dataEDT_KSV_PO_MRP[`${name}`] = String(val);

        console.log(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_PLACE_CD(e.value);
    };

    const onInputChangeEDT_KSV_PO_MRP_BL_FILE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = {
            ...dataEDT_KSV_PO_MRP,
        };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_BL_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";
        val = val.replace(/\s+/g, "");

        let _dataEDT_KSV_PO_MRP = {
            ...dataEDT_KSV_PO_MRP,
        };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onPasteEDT_KSV_PO_MRP_BL_NO = (e, name) => {
        e.preventDefault();
        let val = (e.clipboardData && e.clipboardData.getData("text")) || "";
        val = val.replace(/\s+/g, "");

        let _dataEDT_KSV_PO_MRP = {
            ...dataEDT_KSV_PO_MRP,
        };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_PL_FILE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = {
            ...dataEDT_KSV_PO_MRP,
        };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onCalChangeEDT_KSV_PO_MRP_ETD = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_PO_MRP = {
            ...dataEDT_KSV_PO_MRP,
        };
        _dataEDT_KSV_PO_MRP[`${name}`] = val;
        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onCalChangeEDT_KSV_PO_MRP_ETA = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_PO_MRP = {
            ...dataEDT_KSV_PO_MRP,
        };
        _dataEDT_KSV_PO_MRP[`${name}`] = val;
        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_CONTAINER_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = {
            ...dataEDT_KSV_PO_MRP,
        };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_CI_FILE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = {
            ...dataEDT_KSV_PO_MRP,
        };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const [
        datasEDT_KSV_PO_MRP_DESTINATION,
        setDatasEDT_KSV_PO_MRP_DESTINATION,
    ] = useState([]);
    const [dataEDT_KSV_PO_MRP_DESTINATION, setDataEDT_KSV_PO_MRP_DESTINATION] =
        useState({});

    const editEDT_KSV_PO_MRP_DESTINATION = (argValue) => {
        let _dataEDT_KSV_PO_MRP_DESTINATION =
            datasEDT_KSV_PO_MRP_DESTINATION.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_DESTINATION(_dataEDT_KSV_PO_MRP_DESTINATION[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_DESTINATION = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = {
            ...dataEDT_KSV_PO_MRP,
        };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_DESTINATION(e.value);
    };

    const onCheckboxChangeEDT_KSV_PO_MRP_SINGAPORE_COMBINE = (e, name) => {
        let val = "";
        let _dataEDT_KSV_PO_MRP = {
            ...dataEDT_KSV_PO_MRP,
        };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_PO_MRP[`${name}`] = val;
        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_COST = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = {
            ...dataEDT_KSV_PO_MRP,
        };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const handleS3Upload = async (e, fileTypeKey, fieldName) => {
        const fileName = e.target.files[0].name;
        const img = e.target.files[0];
        if (!img) return;

        try {
            const uploadUrl = `${apiOption.apiuri}/restapi/imgUpload`;
            const {
                data: { uploadURL, imageName },
            } = await axios.get(uploadUrl);

            await fetch(uploadURL, {
                method: "PUT",
                headers: {
                    "Content-Type": img.type,
                },
                body: img,
            });

            const imgURL = uploadURL.split("?")[0];
            const tEdtObj = {
                ...dataEDT_KSV_PO_MRP,
            };
            const fileKey = `${tEdtObj.SHIPMENT_CD}-${fileTypeKey}`;

            const tInObj = {
                FILE_KEY: fileKey,
                TITLE: `shipment ${fileTypeKey.toLowerCase().replace("_FILE", "")} file:${fileKey}`,
                NAME: `${fileName}`,
                URL: imgURL,
                OBJECT_NAME: imageName,
            };

            serviceS043401_SHIPMENT_INFO
                .mgrInsert_FILE_ADD(tInObj)
                .then((data) => {
                    if (
                        typeof data.graphQLErrors === "undefined" &&
                        data.length > 0
                    ) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            tEdtObj[fieldName] = tInObj.NAME;
                            setDataEDT_KSV_PO_MRP(tEdtObj);
                            setDataKCD_FILEINFO(tInObj);
                            e.target.value = "";
                        }
                    } else {
                        toast.current.show({
                            severity: "success",
                            summary: "Info",
                            detail: "",
                            life: 3000,
                        });
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    const s3FileUpload_BL_FILE = (e) => handleS3Upload(e, "BL_FILE", "BL_FILE");
    const s3FileUpload_PL_FILE = (e) => handleS3Upload(e, "PL_FILE", "PL_FILE");
    const s3FileUpload_CI_FILE = (e) => handleS3Upload(e, "CI_FILE", "CI_FILE");

    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [initialData, setInitialData] = useState({});
    const [isShipLineDisabled, setIsShipLineDisabled] = useState(false);

    useEffect(async () => {
        let tSHIPMENT_CD = "";
        let tREMARK = "";
        let tSTATUS = "";
        let tSHIPPING_COST_CURR = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            var tParams2 = tParams1.map((col, i) => {
                var tObj = {};
                var tCols = col.split("=");
                tObj.key = tCols[0];
                tObj.value = tCols[1];

                if (tCols[0].includes("SHIPMENT_CD")) {
                    tSHIPMENT_CD = tObj.value;
                    return tObj;
                }
                if (tCols[0].includes("STATUS")) {
                    tSTATUS = decodeURIComponent(tObj.value);
                    return tObj;
                }

                if (tCols[0].includes("REMARK")) {
                    tREMARK = decodeURIComponent(tObj.value);
                    return tObj;
                }
                if (tCols[0].includes("CURR_CD")) {
                    tSHIPPING_COST_CURR = decodeURIComponent(tObj.value);
                    return tObj;
                }
            });
        }

        setInitialData({
            SHIPMENT_CD: tSHIPMENT_CD,
            REMARK: tREMARK,
        });

        let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
        var tUrl = `${_url1}fileupload2/shipment/${tSHIPMENT_CD}/1`;
        setDataUrlFile1(tUrl);

        var tObj = {};
        tObj.SHIPMENT_CD = tSHIPMENT_CD;
        tObj.STATUS = tSTATUS;
        tObj.REMARK = tREMARK;

        console.log(tObj);

        var tObj1 = { ...dataEDT_KSV_PO_MRP };
        console.log('Init Shipment Info', tObj1);

        let data = await serviceS043401_SHIPMENT_INFO.mgrQuery_CODE(tObj);

        if (typeof data.graphQLErrors === "undefined") {
            setDatasEDT_KSV_PO_MRP_COST_CURR(data.CURR_CD);
            let _tmpObj = data.CURR_CD.filter(
                (val) => val.CD_CODE === tObj1.SHIPPING_COST_CURR,
            );
            setDataEDT_KSV_PO_MRP_COST_CURR(_tmpObj[0]);

            setDatasEDT_KSV_PO_MRP_SHIP_LINE(data.SHIP_LINE);
            _tmpObj = data.SHIP_LINE.filter(
                (val) => val.CD_CODE === tObj1.SHIP_LINE,
            );
            setDataEDT_KSV_PO_MRP_SHIP_LINE(_tmpObj[0]);

            setDatasEDT_KSV_PO_MRP_SHIP_MODE(data.SHIP_MODE);
            _tmpObj = data.SHIP_MODE.filter(
                (val) => val.CD_CODE === tObj1.SHIP_MODE,
            );
            setDataEDT_KSV_PO_MRP_SHIP_MODE(_tmpObj[0]);

            setDatasEDT_KSV_PO_MRP_PLACE_CD(data.PLACE_CD);
            _tmpObj = data.PLACE_CD.filter(
                (val) => val.PLACE_CD === tObj1.PLACE_CD,
            );
            setDataEDT_KSV_PO_MRP_PLACE_CD(_tmpObj[0]);

            setDatasEDT_KSV_PO_MRP_DESTINATION(data.DESTINATION);

            const tDestinationObj =
                data.DESTINATION.find(
                    (val) => val.CD_NAME === dataEDT_KSV_PO_MRP?.DESTINATION,
                ) || null;

            setDataEDT_KSV_PO_MRP_DESTINATION(tDestinationObj);

            if (tDestinationObj?.CD_CODE) {
                const tPortList = PORT_MAP[tDestinationObj.CD_CODE] || [];
                setEdtPortList(tPortList);
                setEdtPort(tPortList.length > 0 ? tPortList[0].CD_CODE : "");
            } else {
                setEdtPortList([]);
                setEdtPort("");
            }

            setDatasEDT_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT);
            _tmpObj = data.ORIGIN_PORT.filter(
                (val) => val.CD_CODE === tObj1.ORIGIN_PORT,
            );
            setDataEDT_KSV_PO_MRP_ORIGIN_PORT(_tmpObj[0]);

            setDatasEDT_KCD_MATL_MST_HS_CD(data.HS_CODE);
            setDataEDT_KCD_MATL_MST_HS_CD(data.HS_CODE[1]);

            setDatasEDT_KCD_MATL_MST_COMP1(data.COMPOSITION);
            setDataEDT_KCD_MATL_MST_COMP1(data.COMPOSITION[0]);

            setDatasEDT_KCD_MATL_MST_COMP2(data.COMPOSITION);
            setDataEDT_KCD_MATL_MST_COMP2(data.COMPOSITION[0]);

            setDatasEDT_KCD_MATL_MST_COMP3(data.COMPOSITION);
            setDataEDT_KCD_MATL_MST_COMP3(data.COMPOSITION[0]);

            setDatasEDT_KCD_MATL_MST_COMP4(data.COMPOSITION);
            setDataEDT_KCD_MATL_MST_COMP4(data.COMPOSITION[0]);

            setDropdownOptions(
                data.HS_CODE.map((item) => ({
                    ...item,
                    label: `(${item.HS_NO}) ${item.HS_CD} ${item.HS_NAME}`,
                })),
            );
        } else {
            console.log(
                "mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors),
            );
        }

        await search_LIST_1(tObj, data);
    }, []);

    // Support Area

    const changeCheckBoxVal = (argVal) => {
        if (argVal === "1") return true;
        else return false;
    };

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

    const [
        datasEDT_KSV_PO_MRP_ORIGIN_PORT,
        setDatasEDT_KSV_PO_MRP_ORIGIN_PORT,
    ] = useState([]);
    const [dataEDT_KSV_PO_MRP_ORIGIN_PORT, setDataEDT_KSV_PO_MRP_ORIGIN_PORT] =
        useState({});

    const onDropdownChangeEDT_KSV_PO_MRP_ORIGIN_PORT = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_ORIGIN_PORT(e.value);
    };

    const pickOption = (code, options, key) => {
        if (!code || !Array.isArray(options) || options.length === 0)
            return null;
        return options.find((item) => item[key] === code) || null;
    };
    const pickOriginPort = (code, options) => {
        if (!code || !Array.isArray(options) || options.length === 0)
            return null;

        return (
            options.find(
                (item) =>
                    code.includes(item.CD_NAME) || item.CD_NAME.includes(code),
            ) || null
        );
    };

    useEffect(() => {
        setDataEDT_KSV_PO_MRP_SHIP_MODE(
            pickOption(
                dataEDT_KSV_PO_MRP?.SHIP_MODE,
                datasEDT_KSV_PO_MRP_SHIP_MODE,
                "CD_CODE",
            ),
        );

        setDataEDT_KSV_PO_MRP_PLACE_CD(
            pickOption(
                dataEDT_KSV_PO_MRP?.PLACE_CD,
                datasEDT_KSV_PO_MRP_PLACE_CD,
                "PLACE_CD",
            ),
        );

        setDataEDT_KSV_PO_MRP_DESTINATION(
            pickOption(
                dataEDT_KSV_PO_MRP?.DESTINATION,
                datasEDT_KSV_PO_MRP_DESTINATION,
                "CD_NAME",
            ),
        );

        setDataEDT_KSV_PO_MRP_ORIGIN_PORT(
            pickOriginPort(
                dataEDT_KSV_PO_MRP?.ORIGIN_PORT,
                datasEDT_KSV_PO_MRP_ORIGIN_PORT,
            ),
        );

        setDataEDT_KSV_PO_MRP_SHIP_LINE(
            pickOption(
                dataEDT_KSV_PO_MRP?.SHIP_LINE,
                datasEDT_KSV_PO_MRP_SHIP_LINE,
                "CD_CODE",
            ),
        );
    }, [
        dataEDT_KSV_PO_MRP?.SHIP_MODE,
        dataEDT_KSV_PO_MRP?.PLACE_CD,
        dataEDT_KSV_PO_MRP?.DESTINATION,
        dataEDT_KSV_PO_MRP?.ORIGIN_PORT,
        dataEDT_KSV_PO_MRP?.SHIP_LINE,
        datasEDT_KSV_PO_MRP_SHIP_MODE,
        datasEDT_KSV_PO_MRP_PLACE_CD,
        datasEDT_KSV_PO_MRP_DESTINATION,
        datasEDT_KSV_PO_MRP_ORIGIN_PORT,
        datasEDT_KSV_PO_MRP_SHIP_LINE,
    ]);

    const [edtInvoiceNo, setEdtInvoiceNo] = useState("");
    const [edtRemark, setEdtRemark] = useState("");
    const PORT_MAP = {
        BVT: [
            { CD_CODE: "HAIPHONG", CD_NAME: "HAIPHONG" },
            { CD_CODE: "HANOI", CD_NAME: "HANOI" },
            { CD_CODE: "HOCHIMINH", CD_NAME: "HOCHIMINH" },
        ],

        ETP: [
            { CD_CODE: "ADDIS ABABA", CD_NAME: "ADDIS ABABA" },
            { CD_CODE: "DJIBOUTI", CD_NAME: "DJIBOUTI" },
            { CD_CODE: "MOMBASA", CD_NAME: "MOMBASA" },
        ],

        SINGAPORE: [{ CD_CODE: "SINGAPORE", CD_NAME: "SINGAPORE" }],
    };

    const [edtPort, setEdtPort] = useState("");
    const [edtPortList, setEdtPortList] = useState([]);

    useEffect(() => {
        const tDestinationCd = dataEDT_KSV_PO_MRP_DESTINATION?.CD_CODE || "";

        if (!tDestinationCd) {
            setEdtPortList([]);
            setEdtPort("");
            return;
        }

        const tPortList = PORT_MAP[tDestinationCd] || [];
        setEdtPortList(tPortList);
        setEdtPort(tPortList.length > 0 ? tPortList[0].CD_CODE : "");
    }, [dataEDT_KSV_PO_MRP_DESTINATION]);

    useEffect(() => {
        console.log(edtPortList);

        if (!edtPortList || edtPortList.length === 0) return;
        if (!dataEDT_KSV_PO_MRP?.DESTINATION_PORT) return;

        const dbPort = dataEDT_KSV_PO_MRP.DESTINATION_PORT.trim();
        const matchedPort = edtPortList.find(
            (item) => item.CD_CODE.trim() === dbPort,
        );

        if (matchedPort) {
            setEdtPort(matchedPort.CD_CODE);
        }
    }, [edtPortList, dataEDT_KSV_PO_MRP]);

    return (
        <div className="af-div-main">
            <style>
                {`
                    .af-hide-first-row {
                        display: none !important;
                    }
                `}
            </style>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "39.5rem", paddingTop: "0.7rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP}
                    size="small"
                    value={datasTBL_KSV_PO_MRP}
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_PO_MRP}
                    metaKeySelection={false}
                    showGridlines
                    resizableColumns
                    columnResizeMode="expand"
                    selection={selectedTBL_KSV_PO_MRP}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MRP(true);
                        setSelectedTBL_KSV_PO_MRP(e.value);
                        onRowClick1TBL_KSV_PO_MRP(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MRP}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                    responsiveLayout="scroll"
                    scrollable
                    // scrollHeight="460px"
                    scrollHeight="39.5rem"
                    rowClassName={(rowData) => {
                        const isEmpty = (v) =>
                            v == null || String(v).trim() === "";
                        const shouldHide =
                            rowData.id === 1 &&
                            isEmpty(rowData.REG_USER) &&
                            isEmpty(rowData.BUYER_NAME) &&
                            isEmpty(rowData.PO_CD2) &&
                            isEmpty(rowData.VENDOR_CD);

                        if (shouldHide) {
                            return "af-hide-first-row";
                        }
                        return "";
                    }}
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                    <AFColumn field="REG_USER" headerClassName="t-header" header="Purchaser" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_CD2" headerClassName="t-header" header="PO#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="VENDOR_CD" headerClassName="t-header" header="Supplier Cd" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PERMIT" headerClassName="t-header" header="Permit" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="TRADE_TERM" headerClassName="t-header" header="Term" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORIGIN_PORT" headerClassName="t-header" header="Origin Port" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DESTINATION" headerClassName="t-header" header="Destination" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>

                    <AFColumn field="READY_DATE" headerClassName="t-header" header="Ready Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormatHMS(rowData.READY_DATE) } ></AFColumn>
                    <AFColumn field="TARGET_ETA" headerClassName="t-header" header="Target ETA" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormatHMS(rowData.TARGET_ETA) } ></AFColumn>
                    <AFColumn field="CT_QTY" headerClassName="t-header" header="CT Qty" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CT_QTY, 2) } ></AFColumn>
                    <AFColumn field="WEIGHT" headerClassName="t-header" header="Weight" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.WEIGHT, 3) } ></AFColumn>
                    <AFColumn field="CBM" headerClassName="t-header" header="CBM" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CBM, 2) } ></AFColumn>
                </AFDataTable>
            </div>

            {/* 상단 버튼 바 */}
            <div
                className="af-div-first"
                style={{
                    width: "123rem",
                    height: "250px",
                    marginBottom: "1rem",
                    flexDirection: "column",
                    display: "flex",
                    gap: "0.5rem",
                }}
            >
                <div
                    className="af-div-first"
                    style={{
                        width: "123rem",
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "0.5rem",
                    }}
                >
                    <Button
                        label="Ship Fix"
                        className="p-button-text"
                        onClick={process_FIX}
                        style={{ width: "10rem" }}
                    />

                    <Button
                        label="Ship Save"
                        className="p-button-text"
                        onClick={process_UPDATE}
                        style={{ width: "10rem" }}
                    />

                    <Button
                        label="Freight Remove"
                        className="p-button-text"
                        onClick={process_ITEM_DELETE}
                        style={{ width: "12rem" }}
                    />

                    <Button
                        label="Ship Delete"
                        className="p-button-text"
                        onClick={process_DELETE}
                        style={{ width: "10rem" }}
                    />
                </div>

                <div
                    className="af-form-container"
                    style={{
                        width: "123rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        marginTop: "1rem",
                    }}
                >
                    {/* 1행: Status, ETD, CT QTY, Invoice# + 버튼그룹 */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                            style={{
                                width: "24.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "7rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>Status</p>
                            <InputText
                                disabled
                                style={{ width: "16.5rem" }}
                                value={dataEDT_KSV_PO_MRP.SHIPMENT_STATUS}
                            />
                        </div>
                        <div
                            style={{
                                width: "24.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "7rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>ETD</p>
                            <Calendar
                                style={{ width: "16.5rem" }}
                                dateFormat="yy-mm-dd"
                                value={changeDateVal(dataEDT_KSV_PO_MRP.ETD)}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_PO_MRP_ETD(e, "ETD")
                                }
                            />
                        </div>
                        <div
                            style={{
                                width: "24.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "7rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>CT QTY</p>
                            <InputText
                                disabled
                                style={{ width: "16.5rem", textAlign: "right" }}
                                value={valTOTAL_CT_QTY}
                            />
                        </div>
                        <div
                            style={{
                                width: "24.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "7rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>Remark</p>
                            <InputText
                                style={{ width: "16.5rem" }}
                                value={edtRemark}
                                onChange={(e) => setEdtRemark(e.target.value)}
                            />
                        </div>
                        <div
                            style={{
                                width: "25rem",
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: "0.4rem",
                            }}
                        >
                            <Button
                                label="PL Print"
                                className="p-button-text green"
                                onClick={search_PL_PRINT}
                                style={{ width: "8.1rem", fontWeight: "bold" }}
                            />

                            <Button
                                label="Update Comp"
                                className="p-button-text orange"
                                onClick={popup_UPDATE_COMP}
                                style={{ width: "8.1rem", fontWeight: "bold" }}
                            />

                            <Button
                                label="Offer Spec"
                                className="p-button-text orange"
                                onClick={popup_UPDATE_OFFER_SPEC}
                                style={{ width: "8.1rem", fontWeight: "bold" }}
                            />
                        </div>
                    </div>

                    {/* 2행: Shipment#, ETA, Weight, BL File + 버튼그룹 */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                            style={{
                                width: "24.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "7rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>Shipment#</p>
                            <InputText
                                disabled
                                style={{ width: "16.5rem" }}
                                value={dataEDT_KSV_PO_MRP.SHIPMENT_CD}
                            />
                        </div>
                        <div
                            style={{
                                width: "24.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "7rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>ETA</p>
                            <Calendar
                                style={{ width: "16.5rem" }}
                                dateFormat="yy-mm-dd"
                                value={changeDateVal(dataEDT_KSV_PO_MRP.ETA)}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_PO_MRP_ETA(e, "ETA")
                                }
                            />
                        </div>
                        <div
                            style={{
                                width: "24.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "7rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>Weight</p>
                            <InputText
                                disabled
                                style={{ width: "16.5rem", textAlign: "right" }}
                                value={valTOTAL_WEIGHT}
                            />
                        </div>
                        <div
                            style={{
                                width: "24.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "7rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>BL File</p>
                            <InputText
                                style={{ width: "16.5rem" }}
                                value={dataEDT_KSV_PO_MRP.BL_FILE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP_BL_FILE(
                                        e,
                                        "BL_FILE",
                                    )
                                }
                            />
                        </div>
                        <div
                            style={{
                                width: "25rem",
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: "0.5rem",
                                marginLeft: "3px",
                            }}
                        >
                            <label
                                style={{
                                    width: "8.1rem",
                                    height: "1.6rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#6366F1",
                                    color: "white",
                                    borderRadius: "3px",
                                    cursor: "pointer",
                                    fontSize: "11px",
                                    fontWeight: "bold",
                                }}
                            >
                                Upload
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={s3FileUpload_BL_FILE}
                                />
                            </label>
                            <Button
                                label="Download"
                                className="p-button-text"
                                onClick={process_DOWNLOAD_BL_FILE}
                                style={{ width: "8.1rem" }}
                            />

                            <Button
                                label="Delete"
                                className="p-button-text"
                                onClick={process_DELETE_BL_FILE}
                                style={{ width: "8.1rem" }}
                            />
                        </div>
                    </div>

                    {/* 3행: Ship Mode, Container#, CBM, CI/PL File + 버튼그룹 */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                            style={{
                                width: "24.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "7rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>Ship Mode</p>
                            <Dropdown
                                style={{ width: "16.5rem" }}
                                value={dataEDT_KSV_PO_MRP_SHIP_MODE}
                                options={datasEDT_KSV_PO_MRP_SHIP_MODE}
                                optionLabel="CD_NAME"
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_SHIP_MODE(
                                        e,
                                        "SHIP_MODE",
                                    )
                                }
                            />
                        </div>
                        <div
                            style={{
                                width: "24.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "7rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>Container#</p>
                            <InputText
                                style={{ width: "16.5rem" }}
                                value={dataEDT_KSV_PO_MRP.CONTAINER_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP_CONTAINER_NO(
                                        e,
                                        "CONTAINER_NO",
                                    )
                                }
                            />
                        </div>
                        <div
                            style={{
                                width: "24.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "7rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>CBM</p>
                            <InputText
                                disabled
                                style={{ width: "16.5rem", textAlign: "right" }}
                                value={valTOTAL_CBM}
                            />
                        </div>
                        <div
                            style={{
                                width: "24.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "7rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>CI/PL File</p>
                            <InputText
                                style={{ width: "16.5rem" }}
                                value={dataEDT_KSV_PO_MRP.PL_FILE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP_PL_FILE(
                                        e,
                                        "PL_FILE",
                                    )
                                }
                            />
                        </div>
                        <div
                            style={{
                                width: "25rem",
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: "0.5rem",
                                marginLeft: "3px",
                            }}
                        >
                            <label
                                style={{
                                    width: "8.1rem",
                                    height: "1.6rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#6366F1",
                                    color: "white",
                                    borderRadius: "3px",
                                    cursor: "pointer",
                                    fontSize: "11px",
                                    fontWeight: "bold",
                                }}
                            >
                                Upload
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={s3FileUpload_PL_FILE}
                                />
                            </label>
                            <Button
                                label="Download"
                                className="p-button-text"
                                onClick={process_DOWNLOAD_PL_FILE}
                                style={{ width: "8.1rem" }}
                            />

                            <Button
                                label="Delete"
                                className="p-button-text"
                                onClick={process_DELETE_PL_FILE}
                                style={{ width: "8.1rem" }}
                            />
                        </div>
                    </div>

                    {/* 4행: Origin, Forward, Amount($), C/O File + 버튼그룹 */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                            style={{
                                width: "24.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "7rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>Origin</p>
                            <Dropdown
                                style={{ width: "16.5rem" }}
                                value={dataEDT_KSV_PO_MRP_ORIGIN_PORT}
                                options={datasEDT_KSV_PO_MRP_ORIGIN_PORT}
                                optionLabel="CD_NAME"
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_ORIGIN_PORT(
                                        e,
                                        "ORIGIN_PORT",
                                    )
                                }
                            />
                        </div>
                        <div
                            style={{
                                width: "24.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "7rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>Forward</p>
                            <Dropdown
                                style={{ width: "16.5rem" }}
                                value={dataEDT_KSV_PO_MRP_PLACE_CD}
                                options={datasEDT_KSV_PO_MRP_PLACE_CD}
                                optionLabel="PLACE_NAME"
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_PLACE_CD(
                                        e,
                                        "PLACE_CD",
                                    )
                                }
                            />
                        </div>
                        <div
                            style={{
                                width: "24.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "7rem", margin: 0, fontWeight: "bold", display: "flex", justifyContent: "flex-end", }}>Amount($)</p>
                            <InputText
                                disabled
                                style={{ width: "16.5rem", textAlign: "right" }}
                                value={serviceLib.formatNumber(
                                    dataEDT_KSV_PO_MRP.AMOUNT,
                                    3,
                                )}
                            />
                        </div>
                        <div
                            style={{
                                width: "24.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "7rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>C/O File</p>
                            <InputText
                                style={{ width: "16.5rem" }}
                                value={dataEDT_KSV_PO_MRP.CI_FILE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP_CI_FILE(
                                        e,
                                        "CI_FILE",
                                    )
                                }
                            />
                        </div>
                        <div
                            style={{
                                width: "25rem",
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: "0.rem",
                                marginLeft: "3px",
                            }}
                        >
                            <label
                                style={{
                                    width: "8.1rem",
                                    height: "1.6rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#6366F1",
                                    color: "white",
                                    borderRadius: "3px",
                                    cursor: "pointer",
                                    fontSize: "11px",
                                    fontWeight: "bold",
                                }}
                            >
                                Upload
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={s3FileUpload_CI_FILE}
                                />
                            </label>
                            <Button
                                label="Download"
                                className="p-button-text"
                                onClick={process_DOWNLOAD_CI_FILE}
                                style={{ width: "8.1rem" }}
                            />

                            <Button
                                label="Delete"
                                className="p-button-text"
                                onClick={process_DELETE_CI_FILE}
                                style={{ width: "8.1rem" }}
                            />
                        </div>
                    </div>

                    {/* 5행: Destination, MBL#, Ship Line, Singapore Combine */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                            style={{
                                width: "24.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "7rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>Destination</p>
                            <Dropdown
                                disabled={isDestination}
                                style={{ width: "16.5rem" }}
                                value={dataEDT_KSV_PO_MRP_DESTINATION}
                                options={datasEDT_KSV_PO_MRP_DESTINATION}
                                optionLabel="CD_NAME"
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_DESTINATION(
                                        e,
                                        "DESTINATION",
                                    )
                                }
                            />
                        </div>
                        <div
                            style={{
                                width: "24.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "7rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>MBL#</p>
                            <InputText
                                style={{ width: "16.5rem" }}
                                value={dataEDT_KSV_PO_MRP.BL_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP_BL_NO(
                                        e,
                                        "BL_NO",
                                    )
                                }
                                onPaste={(e) =>
                                    onPasteEDT_KSV_PO_MRP_BL_NO(
                                        e,
                                        "BL_NO",
                                    )
                                }
                            />
                        </div>
                        <div
                            style={{
                                width: "24.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "7rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>Ship Line</p>
                            <Dropdown
                                style={{ width: "16.5rem" }}
                                value={dataEDT_KSV_PO_MRP_SHIP_LINE}
                                options={datasEDT_KSV_PO_MRP_SHIP_LINE}
                                optionLabel="CD_NAME"
                                filter
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_SHIP_LINE(
                                        e,
                                        "SHIP_LINE",
                                    )
                                }
                            />
                        </div>

                        {(serviceLib.getUserInfo().PART === "07" ||
                            serviceLib.getUserInfo().USER_ID === "lih7912" ||
                            serviceLib.getUserInfo().USER_ID === "won21kr" ||
                            serviceLib.getUserInfo().USER_ID === "chibumy") && (
                            // 수출입팀만 보이도록
                            <div
                                style={{
                                    width: "24.5rem",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                }}
                            >
                                <p style={{ width: "13rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>Singapore Combine</p>
                                <Checkbox
                                    checked={changeCheckBoxVal(
                                        dataEDT_KSV_PO_MRP.SINGAPORE_COMBINE,
                                    )}
                                    onChange={(e) =>
                                        onCheckboxChangeEDT_KSV_PO_MRP_SINGAPORE_COMBINE(
                                            e,
                                            "SINGAPORE_COMBINE",
                                        )
                                    }
                                />
                            </div>
                        )}
                    </div>

                    {/* PORT */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                            style={{
                                width: "24.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "7rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>Port</p>
                            <Dropdown
                                style={{ width: "16.5rem" }}
                                value={edtPort}
                                options={edtPortList}
                                optionLabel="CD_NAME"
                                optionValue="CD_CODE"
                                onChange={(e) => setEdtPort(e.value)}
                            />
                        </div>
                    </div>

                    {/* 6행: Curr, Cost, Remark */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                            style={{
                                width: "24.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "4rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>Curr</p>
                            <Dropdown
                                style={{ width: "6.5rem" }}
                                value={dataEDT_KSV_PO_MRP_COST_CURR}
                                options={datasEDT_KSV_PO_MRP_COST_CURR}
                                optionLabel="CD_NAME"
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_COST_CURR(
                                        e,
                                        "COST_CURR",
                                    )
                                }
                            />

                            <p style={{ width: "4rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>Cost</p>
                            <InputText
                                style={{ width: "7.5rem", textAlign: "right" }}
                                value={dataEDT_KSV_PO_MRP.COST}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP_COST(e, "COST")
                                }
                            />
                        </div>
                        <div
                            style={{
                                width: "24.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "7rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>Invoice#</p>
                            <InputText
                                disabled={true}
                                style={{ width: "16.5rem" }}
                                value={edtInvoiceNo}
                            />
                        </div>
                        <div
                            style={{
                                width: "73rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ width: "7rem", margin: 0, display: "flex", justifyContent: "flex-end", }}>OUT QTY</p>
                            <InputText
                                disabled
                                style={{ width: "16.5rem", textAlign: "right" }}
                                value={valTOTAL_OUT_QTY}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Toast ref={toast} />

            <Dialog
                visible={createDialogUpdateComp}
                position="mid-center"
                style={{
                    overflow: "hidden",
                    width: "120rem",
                    height: "52rem",
                    marginLeft: "0rem",
                    marginTop: "0rem",
                    paddingLeft: "0rem",
                    paddingTop: "0rem",
                }}
                header="HS Code & Composition"
                modal={true}
                className="p-fluid"
                onHide={hideDialogUpdateComp}
            >
                <div
                    className="af-div-first"
                    style={{ width: "99rem", height: "10rem" }}
                >
                    <div style={{ marginTop: "0px" }}>
                        <div>
                            <span
                                className="af-span-3"
                                style={{ width: "7.5rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "6rem" }}
                                >Main</p>
                                <div className="af-span-checkbox">
                                    <Checkbox
                                        id="id_IS_SAMPLE"
                                        checked={changeCheckBoxVal(
                                            qryMAIN_MATL,
                                        )}
                                        onChange={(e) =>
                                            onCheckboxChangeEDT_KCD_MATL_MST_MAIN_MATL(
                                                e,
                                                "MAIN_MATL",
                                            )
                                        }
                                    />
                                </div>
                            </span>
                            <span
                                className="af-span-3"
                                style={{ width: "4.5rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "3rem" }}
                                >Sub</p>
                                <div className="af-span-checkbox">
                                    <Checkbox
                                        id="id_IS_SAMPLE"
                                        checked={changeCheckBoxVal(qrySUB_MATL)}
                                        onChange={(e) =>
                                            onCheckboxChangeEDT_KCD_MATL_MST_SUB_MATL(
                                                e,
                                                "SUB_MATL",
                                            )
                                        }
                                    />
                                </div>
                            </span>
                            <span
                                className="af-span-3"
                                style={{ width: "4.5rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "3rem" }}
                                >All</p>
                                <div className="af-span-checkbox">
                                    <Checkbox
                                        id="id_IS_SAMPLE"
                                        checked={changeCheckBoxVal(qryIS_ALL)}
                                        onChange={(e) =>
                                            onCheckboxChangeEDT_KCD_MATL_MST_IS_ALL(
                                                e,
                                                "IS_ALL",
                                            )
                                        }
                                    />
                                </div>
                            </span>
                        </div>
                        <div>
                            <span
                                className="af-span-3"
                                style={{ width: "53.5rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "6rem" }}
                                >Hs Code</p>
                                <div
                                    className="af-span-div"
                                    style={{ width: "46rem" }}
                                >
                                    <Dropdown
                                        style={{ width: "45.5rem" }}
                                        id="id_CURR_CD"
                                        value={dataEDT_KCD_MATL_MST_HS_CD}
                                        onChange={(e) =>
                                            onDropdownChangeEDT_KCD_MATL_MST_HS_CD(
                                                e,
                                                "HS_CD",
                                            )
                                        }
                                        options={dropdownOptions}
                                        optionLabel="label"
                                        placeholder=""
                                        filter
                                    />
                                </div>
                            </span>
                            <span
                                className="af-span-3"
                                style={{ width: "11rem" }}
                            >
                                <div
                                    className="af-span-div-btn"
                                    style={{ width: "10rem" }}
                                >
                                    <Button
                                        label="Update HS Code"
                                        style={{ width: "10rem" }}
                                        className="p-button-text"
                                        onClick={process_UPDATE_HSCODE}
                                    />
                                </div>
                            </span>
                        </div>
                        <div>
                            <span
                                className="af-span-3"
                                style={{ width: "19rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "6rem" }}
                                >COMP1</p>
                                <div
                                    className="af-span-div"
                                    style={{ width: "12rem" }}
                                >
                                    <Dropdown
                                        style={{ width: "12rem" }}
                                        id="id_CURR_CD"
                                        value={dataEDT_KCD_MATL_MST_COMP1}
                                        onChange={(e) =>
                                            onDropdownChangeEDT_KCD_MATL_MST_COMP1(
                                                e,
                                                "COMP1",
                                            )
                                        }
                                        options={datasEDT_KCD_MATL_MST_COMP1}
                                        optionLabel="CD_NAME"
                                        placeholder=""
                                        filter
                                    ></Dropdown>
                                </div>
                            </span>
                            <span
                                className="af-span-3"
                                style={{ width: "7rem" }}
                            >
                                <div
                                    className="af-span-div"
                                    style={{ width: "5rem" }}
                                >
                                    <InputText
                                        style={{ width: "5rem" }}
                                        id="id_ADD_AMT"
                                        value={dataEDT_KCD_MATL_MST.COMP1_P}
                                        onChange={(e) =>
                                            onInputChangeEDT_KCD_MATL_MST_COMP1_P(
                                                e,
                                                "COMP1_P",
                                            )
                                        }
                                    />
                                </div>
                                <p
                                    className="af-span-p"
                                    style={{ width: "1rem" }}
                                >%</p>
                            </span>
                            <span
                                className="af-span-3"
                                style={{ width: "19rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "6rem" }}
                                >COMP2</p>
                                <div
                                    className="af-span-div"
                                    style={{ width: "12rem" }}
                                >
                                    <Dropdown
                                        style={{ width: "12rem" }}
                                        id="id_CURR_CD"
                                        value={dataEDT_KCD_MATL_MST_COMP2}
                                        onChange={(e) =>
                                            onDropdownChangeEDT_KCD_MATL_MST_COMP2(
                                                e,
                                                "COMP2",
                                            )
                                        }
                                        options={datasEDT_KCD_MATL_MST_COMP2}
                                        optionLabel="CD_NAME"
                                        placeholder=""
                                        filter
                                    ></Dropdown>
                                </div>
                            </span>
                            <span
                                className="af-span-3"
                                style={{ width: "7rem" }}
                            >
                                <div
                                    className="af-span-div"
                                    style={{ width: "5rem" }}
                                >
                                    <InputText
                                        style={{ width: "5rem" }}
                                        id="id_ADD_AMT"
                                        value={dataEDT_KCD_MATL_MST.COMP2_P}
                                        onChange={(e) =>
                                            onInputChangeEDT_KCD_MATL_MST_COMP2_P(
                                                e,
                                                "COMP2_P",
                                            )
                                        }
                                    />
                                </div>
                                <p
                                    className="af-span-p"
                                    style={{ width: "1rem" }}
                                >%</p>
                            </span>
                            <span
                                className="af-span-3"
                                style={{ width: "11rem" }}
                            >
                                <div
                                    className="af-span-div-btn"
                                    style={{ width: "10rem" }}
                                >
                                    <Button
                                        label="Update Comp"
                                        style={{ width: "10rem" }}
                                        className="p-button-text"
                                        onClick={process_UPDATE_COMP}
                                    />
                                </div>
                            </span>
                        </div>

                        <div>
                            <span
                                className="af-span-3"
                                style={{ width: "19rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "6rem" }}
                                >COMP3</p>
                                <div
                                    className="af-span-div"
                                    style={{ width: "12rem" }}
                                >
                                    <Dropdown
                                        style={{ width: "12rem" }}
                                        id="id_CURR_CD"
                                        value={dataEDT_KCD_MATL_MST_COMP3}
                                        onChange={(e) =>
                                            onDropdownChangeEDT_KCD_MATL_MST_COMP3(
                                                e,
                                                "COMP3",
                                            )
                                        }
                                        options={datasEDT_KCD_MATL_MST_COMP3}
                                        optionLabel="CD_NAME"
                                        placeholder=""
                                        filter
                                    ></Dropdown>
                                </div>
                            </span>
                            <span
                                className="af-span-3"
                                style={{ width: "7rem" }}
                            >
                                <div
                                    className="af-span-div"
                                    style={{ width: "5rem" }}
                                >
                                    <InputText
                                        style={{ width: "5rem" }}
                                        id="id_ADD_AMT"
                                        value={dataEDT_KCD_MATL_MST.COMP3_P}
                                        onChange={(e) =>
                                            onInputChangeEDT_KCD_MATL_MST_COMP3_P(
                                                e,
                                                "COMP3_P",
                                            )
                                        }
                                    />
                                </div>
                                <p
                                    className="af-span-p"
                                    style={{ width: "1rem" }}
                                >%</p>
                            </span>
                            <span
                                className="af-span-3"
                                style={{ width: "19rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "6rem" }}
                                >COMP4</p>
                                <div
                                    className="af-span-div"
                                    style={{ width: "12rem" }}
                                >
                                    <Dropdown
                                        style={{ width: "12rem" }}
                                        id="id_CURR_CD"
                                        value={dataEDT_KCD_MATL_MST_COMP4}
                                        onChange={(e) =>
                                            onDropdownChangeEDT_KCD_MATL_MST_COMP4(
                                                e,
                                                "COMP4",
                                            )
                                        }
                                        options={datasEDT_KCD_MATL_MST_COMP4}
                                        optionLabel="CD_NAME"
                                        placeholder=""
                                        filter
                                    ></Dropdown>
                                </div>
                            </span>
                            <span
                                className="af-span-3"
                                style={{ width: "7rem" }}
                            >
                                <div
                                    className="af-span-div"
                                    style={{ width: "5rem" }}
                                >
                                    <InputText
                                        style={{ width: "5rem" }}
                                        id="id_ADD_AMT"
                                        value={dataEDT_KCD_MATL_MST.COMP4_P}
                                        onChange={(e) =>
                                            onInputChangeEDT_KCD_MATL_MST_COMP4_P(
                                                e,
                                                "COMP4_P",
                                            )
                                        }
                                    />
                                </div>
                                <p
                                    className="af-span-p"
                                    style={{ width: "1rem" }}
                                >%</p>
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    className="af-div-first"
                    style={{ width: "100%", height: "35rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KCD_MATL_MST}
                        editMode="cell"
                        size="small"
                        value={datasTBL_KCD_MATL_MST}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KCD_MATL_MST}
                        loading={loadingTBL_KCD_MATL_MST}
                        onSelectionChange={(e) => {
                            setSelectedTBL_KCD_MATL_MST(e.value);
                        }}
                        onRowClick={onRowClickTBL_KCD_MATL_MST}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" " //header={headerTBL_KCD_MATL_MST}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="35rem"
                    >
                        <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                        <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "20rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "20rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_NAME" headerClassName="t-header" header="Matl" style={{ width: "20rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="HS_NAME" headerClassName="t-header" header="Hs Code" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="COMP1" headerClassName="t-header" header="Comp1" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="COMP2" headerClassName="t-header" header="Comp2" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="COMP3" headerClassName="t-header" header="Comp3" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="COMP4" headerClassName="t-header" header="Comp4" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>

            <Dialog
                visible={createDialogUpdateOfferSpec}
                position="mid-center"
                style={{
                    overflow: "hidden",
                    width: "110rem",
                    height: "50rem",
                    marginLeft: "0rem",
                    marginTop: "0rem",
                    paddingLeft: "0rem",
                    paddingTop: "0rem",
                }}
                header="Offer Spec"
                modal={true}
                className="p-fluid"
                onHide={hideDialogUpdateOfferSpec}
            >
                <div
                    className="af-div-first"
                    style={{ width: "99rem", height: "20rem" }}
                >
                    <div style={{ marginTop: "0px" }}>
                        <div></div>
                        <div>
                            <span
                                className="af-span-3"
                                style={{ width: "50rem", height: "19rem" }}
                            >
                                <div
                                    className="af-span-div"
                                    style={{ width: "19rem" }}
                                >
                                    <InputTextarea
                                        style={{
                                            height: "19rem",
                                            width: "50rem",
                                        }}
                                        id="id_OFFER_SPEC"
                                        value={dataEDT_KCD_MATL_MST1.OFFER_SPEC}
                                        onChange={(e) =>
                                            onInputChangeEDT_KCD_MATL_MST1_OFFER_SPEC(
                                                e,
                                                "OFFER_SPEC",
                                            )
                                        }
                                        rows={23}
                                        cols={1}
                                    />
                                </div>
                            </span>
                            <span
                                className="af-span-3"
                                style={{ width: "11rem" }}
                            >
                                <div
                                    className="af-span-div-btn"
                                    style={{ width: "10rem" }}
                                >
                                    <Button
                                        label="Update"
                                        style={{ width: "10rem" }}
                                        className="p-button-text"
                                        onClick={process_UPDATE_OFFER_SPEC}
                                    />
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    className="af-div-first"
                    style={{ width: "100%", height: "25rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KCD_MATL_MST1}
                        editMode="cell"
                        size="small"
                        value={datasTBL_KCD_MATL_MST1}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KCD_MATL_MST1}
                        loading={loadingTBL_KCD_MATL_MST1}
                        onSelectionChange={(e) => {
                            setSelectedTBL_KCD_MATL_MST1(e.value);
                        }}
                        onRowClick={onRowClickTBL_KCD_MATL_MST1}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" " //header={headerTBL_KCD_MATL_MST}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="25rem"
                    >
                        <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                        <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "20rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_NAME" headerClassName="t-header" header="Matl" style={{ width: "20rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="OFFER_SPEC" headerClassName="t-header" header="Offer Spec" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S043401_SHIPMENT_INFO, comparisonFn);
