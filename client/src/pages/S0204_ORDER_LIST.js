/* eslint-disable */
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { Card } from "primereact/card";
import { OverlayPanel } from "primereact/overlaypanel";
import { ContextMenu } from "primereact/contextmenu";
import CombinedOrderModal from "../components/CombinedOrderModal";
import axios from "axios";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0204_ORDER_LIST } from "../service/service_biz/ServiceS0204_ORDER_LIST";

import "./page_common.scss";

const OrderTable_KSV_ORDER_MST = React.memo(function OrderTable_KSV_ORDER_MST({
    dtRef,
    data,
    loading,
    selected,
    onSelectionChange,
    onRowDoubleClick,
    onRowClick,
    cm,
    serviceLib,
}) {
    return (
        <div
            className="af-div-first"
            style={{ width: "123rem", height: "47.5rem" }}
        >
            <ContextMenu
                model={[{ label: "Clear Select", command: () => {} }]}
                ref={cm}
            />
            <AFDataTable preventUnrelatedRerender
                ref={dtRef}
                size="small"
                value={data}
                tableStyle={{ tableLayout: "fixed" }}
                loading={loading}
                resizableColumns
                columnResizeMode="expand"
                metaKeySelection={false}
                showGridlines
                selectionMode="checkbox"
                selection={selected}
                onSelectionChange={onSelectionChange}
                onRowClick={onRowClick}
                dataKey="id"
                onRowDoubleClick={onRowDoubleClick}
                virtualScrollerOptions={{ itemSize: 20 }}
                emptyMessage=" "
                responsiveLayout="scroll"
                scrollable
                scrollHeight="flex"
            >
                <AFColumn selectionMode="multiple" field="__checkbox__" reordable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                <AFColumn field="PO_CD" header="PO#" style={{ width: "7rem" }} className="af-col" ></AFColumn>
                <AFColumn field="ORDER_CD" header="Order#" style={{ width: "7rem" }} className="af-col orange" ></AFColumn>
                <AFColumn field="REF_ORDER_NO" header="Buyer PO#" style={{ width: "7rem" }} className="af-col" ></AFColumn>
                <AFColumn field="STYLE_NAME" header="Style" style={{ width: "12rem" }} className="af-col" ></AFColumn>
                <AFColumn field="STATUS_NAME" header="Status" style={{ width: "5.5rem" }} className="af-col" ></AFColumn>
                <AFColumn field="ORDER_DATE" header="Order Date" body={(rowData) => serviceLib.dateFormat(rowData.ORDER_DATE) } style={{ width: "7.5rem" }} className="af-col" ></AFColumn>

                <AFColumn field="DUE_DATE" header="EXF" body={(rowData) => serviceLib.dateFormat(rowData.DUE_DATE)} style={{ width: "7rem" }} className="af-col" ></AFColumn>
                <AFColumn field="ETD" header="ETD" body={(rowData) => serviceLib.dateFormat(rowData.ETD)} style={{ width: "7rem" }} className="af-col" ></AFColumn>
                <AFColumn field="ORDER_QTY" header="Order Qty" body={(rowData) => serviceLib.numWithCommas(rowData.ORDER_QTY || rowData.TOT_CNT) } style={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} ></AFColumn>
                <AFColumn field="PO_CNT" header="Po Qty" body={(rowData) => serviceLib.numWithCommas( parseFloat(rowData.ORDER_QTY || rowData.TOT_CNT) - parseFloat(rowData.ADD_CNT), ) } style={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} ></AFColumn>
                <AFColumn field="ADD_CNT" header="Add Qty" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.ADD_CNT) } style={{ width: "6rem" }} className="af-col" ></AFColumn>
                <AFColumn field="SHIP_CNT" header="Ship Qty" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHIP_CNT) } style={{ width: "6rem" }} className="af-col" ></AFColumn>
                <AFColumn field="PRICE_TERM" header="Term" style={{ width: "12rem" }} className="af-col" ></AFColumn>
                <AFColumn field="CURR_CD" header="Curr" style={{ width: "3rem" }} className="af-col" ></AFColumn>
                <AFColumn field="AVR_PRICE" header="Price" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToFixed(rowData.AVR_PRICE, 2) } style={{ width: "6rem" }} className="af-col" ></AFColumn>
                <AFColumn field="USD_PRICE" header="Price($)" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToFixed(rowData.USD_PRICE, 2) } style={{ width: "6rem" }} className="af-col" ></AFColumn>
                <AFColumn field="FC_PRICE" header="Labor" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToFixed(rowData.FC_PRICE, 2) } style={{ width: "6rem" }} className="af-col" ></AFColumn>
                <AFColumn field="MATL_AMT" header="Material" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToAmt(rowData.MATL_AMT)} style={{ width: "6rem" }} className="af-col" ></AFColumn>
                <AFColumn field="ETC_AMT" header="ETC" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToAmt(rowData.ETC_AMT)} style={{ width: "6rem" }} className="af-col" ></AFColumn>
                <AFColumn field="MARGIN" header="Margin" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToFixed(rowData.MARGIN, 2)} style={{ width: "6rem" }} className="af-col" ></AFColumn>
                <AFColumn field="MARGIN2" header="%" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToFixed(rowData.MARGIN2, 2) } style={{ width: "6rem" }} className="af-col" ></AFColumn>
                <AFColumn field="REG_USER" header="Reg User" style={{ width: "7rem" }} className="af-col" ></AFColumn>
                <AFColumn field="BUYER_TEAM_N" header="Team" style={{ width: "7rem" }} className="af-col" ></AFColumn>
                <AFColumn field="REMARK" header="End Remark" style={{ width: "15rem" }} className="af-col" ></AFColumn>
                <AFColumn field="END_STATUS" header="End Status" style={{ width: "5rem" }} className="af-col" ></AFColumn>
                <AFColumn field="BUYER_NAME" header="Buyer" style={{ width: "12rem" }} className="af-col" ></AFColumn>
                <AFColumn field="STYLE_CD" header="Style CD" style={{ width: "6rem" }} className="af-col" ></AFColumn>
                <AFColumn field="AVR_PRICE" header="FOB AVR" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToFixed(rowData.AVR_PRICE, 2) } style={{ width: "6rem" }} className="af-col" ></AFColumn>
                <AFColumn field="STATUS_CD" header="Status CD" style={{ width: "3rem" }} className="af-col" ></AFColumn>
                <AFColumn field="FACTORY_NAME" header="Factory" style={{ width: "10rem" }} className="af-col" ></AFColumn>
                <AFColumn field="FACTORY_CD" header="Factory CD" style={{ width: "6rem" }} className="af-col" ></AFColumn>
                <AFColumn field="PI_CD" header="PI#" style={{ width: "10rem" }} className="af-col" ></AFColumn>
            </AFDataTable>
        </div>
    );
});

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY1_KSV_ORDER_MST = {
    ORDER_CD: "",
    STYLE_CD: "",
    AVR_PRICE: "",
    ORDER_QTY: "",
    CURR_CD: "",
    USD_PRICE: "",
};

const emptyQRY_KSV_ORDER_MST = {
    PO_CD: "",
    ORDER_CD: "",
    REF_ORDER_NO: "",
    IS_MAIN: "",
    IS_SAMPLE: "",
    IS_SHIP: "",
    IS_SHIP_DATE: "",
    S_SHIP_DATE: "",
    E_SHIP_DATE: "",
    IS_DUEDATE: "",
    S_DUE_DATE: "",
    E_DUE_DATE: "",
    S_ORDER_DATE: "",
    E_ORDER_DATE: "",
    STATUS_CD: "",
    REG_USER: "",
    STYLE_CD: "",
    BUYER_CD: "",
    BUYER_TEAM: "",
    FACTORY_CD: "",
};

const emptyTBL_KSV_ORDER_MST = {
    id: 0,
    PO_CD: "",
    ORDER_CD: "",
    REF_ORDER_NO: "",
    STYLE_NAME: "",
    STYLE_CD: "",
    ORDER_DATE: "",
    DUE_DATE: "",
    TOT_CNT: "",
    ADD_CNT: "",
    SHIP_CNT: "",
    AVR_PRICE: "",
    CURR_CD: "",
    USD_PRICE: "",
    FC_PRICE: "",
    MATL_AMT: "",
    ETC_AMT: "",
    MARGIN: "",
    MARGIN2: "",
    STATUS_NAME: "",
    STATUS_CD: "",
    END_STATUS: "",
    REMARK: "",
    REG_USER: "",
    FACTORY_NAME: "",
    FACTORY_CD: "",
};

const emptyTBL1_KSV_ORDER_MST = {
    SEQ: "",
    SHIP_QTY: "",
    AVR_PRICE: "",
    AVR_PRICE2: "",
};

const S0204_ORDER_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0204_ORDER_LISTRef = useRef(null);
    if (!serviceS0204_ORDER_LISTRef.current) serviceS0204_ORDER_LISTRef.current = new ServiceS0204_ORDER_LIST();
    const serviceS0204_ORDER_LIST = serviceS0204_ORDER_LISTRef.current;

    const toast = useRef(null);
    const op = useRef(null);
    const cm = useRef(null);
    const dt_iframe = useRef(null);
    const [urlIframe, setUrlIframe] = useState("");

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [popupDialog, setPopupDialog] = useState(false);
    const [popupMsg, setPopupMsg] = useState("");
    const [iframeKey, setIframeKey] = useState(0);
    const [fileUrl, setFileUrl] = useState("");
    const [fileName, setFileName] = useState("");

    const [styleVal1, setStyleVal1] = useState({
        zIndex: 100,
        display: "none",
        position: "absolute",
        top: "2px",
        left: "2px",
        width: "110rem",
        height: "100rem",
    });

    // Dialog
    const [dlgHeader_CHG_FOB, setDlgHeader_CHG_FOB] = useState("");
    const [createDialog_CHG_FOB, setCreateDialog_CHG_FOB] = useState(false);
    const hideDialog_CHG_FOB = () => {
        setCreateDialog_CHG_FOB(false);
    };

    const process_CHANGE_FOB = () => {
        if (datasTBL1_KSV_ORDER_MST.length <= 0) return;

        var tInObj1 = { ...dataQRY1_KSV_ORDER_MST };

        var tInObj2 = [];
        datasTBL1_KSV_ORDER_MST.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tInObj2.push(tObj);
        });

        setLoadingTBL1_KSV_ORDER_MST(true);
        serviceS0204_ORDER_LIST
            .mgrUpdate_CHANGE_FOB(tInObj1, tInObj2)
            .then((data) => {
                setLoadingTBL1_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0 && data[0].CODE.includes("SUCC")) {
                        toast.current.show({
                            severity: "success",
                            summary: "SUCCEED: Change Fob",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                    } else {
                        toast.current.show({
                            severity: "success",
                            summary: "FAILED: Change Fob",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                    }
                    // search_ORDER_LIST();
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "FAILED: Change Fob",
                        detail: "fatal error",
                        life: 3000,
                    });
                }
            });
    };

    const popup_CHANGE_FOB = () => {
        if (selectedTBL_KSV_ORDER_MST.length <= 0) return;
        if (selectedTBL_KSV_ORDER_MST.length > 1) return;

        var tObj = { ...selectedTBL_KSV_ORDER_MST[0] };

        var tQRY1 = { ...dataQRY1_KSV_ORDER_MST };
        tQRY1.ORDER_CD = tObj.ORDER_CD;
        tQRY1.STYLE_CD = tObj.STYLE_NAME;
        tQRY1.ORDER_QTY = tObj.ORDER_QTY || tObj.TOT_CNT;
        tQRY1.AVR_PRICE = tObj.AVR_PRICE;
        tQRY1.USD_PRICE = tObj.USD_PRICE;
        tQRY1.CURR_CD = tObj.CURR_CD;
        setDataQRY1_KSV_ORDER_MST(tQRY1);
        editQRY1_KSV_ORDER_MST_CURR_CD(tObj.CURR_CD);

        var tInObj = {};
        tInObj.ORDER_CD = tObj.ORDER_CD;
        setLoadingTBL_KSV_ORDER_MST(true);
        serviceS0204_ORDER_LIST.mgrQuery_ORDER_FOB(tInObj).then((data) => {
            setLoadingTBL_KSV_ORDER_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    setDatasTBL1_KSV_ORDER_MST(data);

                    var tSumAmt = 0;
                    var tSumQty = 0;
                    data.forEach((col, i) => {
                        tSumQty += parseFloat(col.SHIP_QTY);
                        tSumAmt +=
                            parseFloat(col.SHIP_QTY) * parseFloat(col.FOB);
                    });
                    var tPrice = tSumAmt / tSumQty;
                    if (tQRY1.CURR_CD === "KRW") tPrice = tPrice.toFixed(0);
                    else tPrice = tPrice.toFixed(4);

                    tQRY1.AVR_PRICE = tPrice;
                    setDataQRY1_KSV_ORDER_MST(tQRY1);

                    setCreateDialog_CHG_FOB(true);
                }
            } else {
                console.log(
                    "ServiceS0204_ORDER_LIS.mgrQueryTBL_KSV_ORDER_MST error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const [dlgHeader, setDlgHeader] = useState("");
    const [urlOrderInfo, setUrlOrderInfo] = useState("");

    const process_CHANGE_ORDER = () => {
        if (selectedTBL_KSV_ORDER_MST.length <= 0) return;
        if (selectedTBL_KSV_ORDER_MST.length > 1) return;

        var tOrderObj = { ...selectedTBL_KSV_ORDER_MST[0] };
        if (tOrderObj.ORDER_CD.substring(2, 4) !== "XX") {
            alert("가오더만 처리가능합니다.<br><br>Only TEMP orders can be processed.");
            return;
        }
        if (tOrderObj.STATUS_NAME === "Cancel") {
            alert("Cancel된 가오더는 변경처리 할수 없습니다.<br><br>Cancelled TEMP orders cannot be changed.");
            return;
        }

        var tUrls = window.location.href.split("/");
        console.log("URL=>" + tUrls[2]);
        var tUrl1 = "";
        if (window.location.href.includes("3288")) {
            tUrl1 = "http://afroba.iptime.org:3288/webapp/mrpapp/index.html#/";
        } else if (window.location.href.includes("3201")) {
            if (window.location.href.includes("afroba")) {
                tUrl1 = "http://afroba.iptime.org:3201/#/";
            }
            if (window.location.href.includes("localhost")) {
                tUrl1 = "http://localhost:3201/#/";
            }
        } else if (window.location.href.includes("3203")) {
            tUrl1 = "http://192.168.0.105:3203/#/";
        } else {
            tUrl1 = "http://localhost:3201/#/";
        }
        // tUrl1 += "S020401_ORDER_INFO?ORDER_CD=" + event.data.ORDER_CD;
        tUrl1 = `${window.location.origin}/#/`;
        tUrl1 += `S020602_ORDER_REG?XX_ORDER_CD=${tOrderObj.ORDER_CD}&XX_ORDER_QTY=${tOrderObj.ORDER_QTY || tOrderObj.TOT_CNT}&XX_ORDER_FACTORY=${tOrderObj.FACTORY_CD}`;

        var tUrl2 = `S020602_ORDER_REG?XX_ORDER_CD=${tOrderObj.ORDER_CD}&XX_ORDER_QTY=${tOrderObj.ORDER_QTY || tOrderObj.TOT_CNT}&STYLE_CD=${tOrderObj.STYLE_CD}&STYLE_NAME=${tOrderObj.STYLE_NAME}&XX_ORDER_FACTORY=${tOrderObj.FACTORY_CD}`;

        var tValObj = {
            key: "1-19",
            label: "Order Regist",
            icon: "pi pi-fw pi-user-edit",
            url1: "S020602_ORDER_REG",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    const process_COPY_ORDER = () => {
        if (selectedTBL_KSV_ORDER_MST.length <= 0) return;
        if (selectedTBL_KSV_ORDER_MST.length > 1) return;

        var tOrderObj = { ...selectedTBL_KSV_ORDER_MST[0] };

        var tUrls = window.location.href.split("/");
        console.log("URL=>" + tUrls[2]);
        var tUrl1 = "";
        if (window.location.href.includes("3288")) {
            tUrl1 = "http://afroba.iptime.org:3288/webapp/mrpapp/index.html#/";
        } else if (window.location.href.includes("3201")) {
            if (window.location.href.includes("afroba")) {
                tUrl1 = "http://afroba.iptime.org:3201/#/";
            }
            if (window.location.href.includes("localhost")) {
                tUrl1 = "http://localhost:3201/#/";
            }
        } else if (window.location.href.includes("3203")) {
            tUrl1 = "http://192.168.0.105:3203/#/";
        } else {
            tUrl1 = "http://localhost:3201/#/";
        }
        // tUrl1 += "S020401_ORDER_INFO?ORDER_CD=" + event.data.ORDER_CD;
        tUrl1 = `${window.location.origin}/#/`;
        tUrl1 += `S020602_ORDER_REG?CP_ORDER_CD=${tOrderObj.ORDER_CD}&CP_ORDER_QTY=${tOrderObj.ORDER_QTY || tOrderObj.TOT_CNT}`;

        var tUrl2 = `S020602_ORDER_REG?CP_ORDER_CD=${tOrderObj.ORDER_CD}&CP_ORDER_QTY=${tOrderObj.ORDER_QTY || tOrderObj.TOT_CNT}&STYLE_CD=${tOrderObj.STYLE_CD}&STYLE_NAME=${tOrderObj.STYLE_NAME}`;

        var tValObj = {
            key: "1-19",
            label: "Order Regist",
            icon: "pi pi-fw pi-user-edit",
            url1: "S020602_ORDER_REG",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    const search_CODE_BUYER_CD = (argBuyerCd) => {
        var tInObj = {};
        tInObj.BUYER_CD = argBuyerCd;
        tInObj.STYLE_CD = "";

        serviceS0204_ORDER_LIST
            .mgrQuery_ORDER_LIST_CODE(tInObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    // console.log("ServiceS0204_ORDER_LIS.mgrQuery_ORDER_LIST_CODE call => " + data.STATUS_CD.length);
                    setDatasQRY_KSV_ORDER_MST_STYLE_CD(data.STYLE);
                    setDataQRY_KSV_ORDER_MST_STYLE_CD(data.STYLE[0]);
                } else {
                    console.log(
                        "ServiceS0204_ORDER_LIS.mgrQueryTBL_KCD_FACTORY error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const excel_ORDER_SHEET = () => {
        if (selectedTBL_KSV_ORDER_MST.length <= 0) return;
        if (selectedTBL_KSV_ORDER_MST.length > 1) {
            alert("하나만 선택가능합니다.<br><br>Only one item can be selected.");
            return;
        }
        var tObj = { ...selectedTBL_KSV_ORDER_MST[0] };

        if (tObj.ORDER_TYPE === "1") {
            setOrderModalOrderCd(selectedTBL_KSV_ORDER_MST[0].ORDER_CD);
            setModalVisible(true);
        }

        if (tObj.ORDER_TYPE === "0") {
            excel_ORDER_SHEET_NORMAL();
        }
    };

    const excel_ORDER_SHEET_NORMAL = () => {
        if (selectedTBL_KSV_ORDER_MST.length <= 0) return;

        var tObj = { ...selectedTBL_KSV_ORDER_MST[0] };
        var tInObj = {};
        tInObj.ORDER_CD = tObj.ORDER_CD;
        setLoadingTBL_KSV_ORDER_MST(true);
        serviceS0204_ORDER_LIST
            .mgrQuery_ORDER_SHEET_NORMAL(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            toast.current.show({
                                severity: "success",
                                summary: "Success Order Sheet",
                                detail: data[0].CODE,
                                life: 3000,
                            });
                            console.log(
                                "Order Sheet Succeed => " + data[0].CODE,
                            );
                            setFileName(data[0].CODE.split("?")[1].toString());
                            setFileUrl(data[0].CODE.split("?")[2].toString());
                            downloadFile(data[0].CODE);
                        }
                    }
                } else {
                    console.log(
                        "ServiceS0204_ORDER_LIS.mgrQueryTBL_KSV_ORDER_MST error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [orderModalOrderCd, setOrderModalOrderCd] = useState(null);
    const [selectedOrders, setSelectedOrders] = useState([]); // 선택한 데이터 저장

    const excel_ORDER_SHEET_COMBINE = () => {
        console.log(selectedOrders);

        let selectedOrderList = [];

        for (let element of selectedOrders) {
            selectedOrderList.push({
                ORDER_CD: JSON.stringify({
                    order: element.order,
                    buyerPo: element.buyerPO,
                }),
            });
        }

        if (selectedOrderList.length <= 0) return;

        setLoadingTBL_KSV_ORDER_MST(true);
        serviceS0204_ORDER_LIST
            .mgrQuery_ORDER_SHEET_COMBINE({ ORDERS: selectedOrderList })
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            toast.current.show({
                                severity: "success",
                                summary: "Success Order Sheet",
                                detail: data[0].CODE,
                                life: 3000,
                            });
                            console.log(
                                "Order Sheet Succeed => " + data[0].CODE,
                            );

                            setFileName(data[0].CODE.split("?")[1].toString());
                            setFileUrl(data[0].CODE.split("?")[2].toString());
                            downloadFile(data[0].CODE);
                        }
                    }
                } else {
                    console.log(
                        "ServiceS0204_ORDER_LIS.mgrQueryTBL_KSV_ORDER_MST error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const downloadFile = async (data) => {
        const fileUrl = data.split("?")[2].toString();
        const fileName = data.split("?")[1].toString();

        serviceLib.downloadFile(fileUrl, fileName);
    };

    const excel_ORDER_LIST = () => {
        setLoadingTBL_KSV_ORDER_MST(true);
        serviceS0204_ORDER_LIST
            .mgrQuery_ORDER_LIST(dataQRY_KSV_ORDER_MST)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            toast.current.show({
                                severity: "success",
                                summary: "Success Order Sheet",
                                detail: data[0].CODE,
                                life: 3000,
                            });
                            console.log(
                                "Order Sheet Succeed => " + data[0].CODE,
                            );

                            setFileName(data[0].CODE.split("?")[1].toString());
                            setFileUrl(data[0].CODE.split("?")[2].toString());
                            downloadFile(data[0].CODE);
                        }
                    }
                } else {
                    console.log(
                        "ServiceS0204_ORDER_LIS.mgrQueryTBL_KSV_ORDER_MST error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const excel_ORDER_QTY = () => {
        if (selectedTBL_KSV_ORDER_MST.length <= 0) return;

        var tInObj = [];
        selectedTBL_KSV_ORDER_MST.forEach((col, i) => {
            var tObj = {};
            tObj.ORDER_CD = col.ORDER_CD;
            tInObj.push(tObj);
        });

        setLoadingTBL_KSV_ORDER_MST(true);
        serviceS0204_ORDER_LIST.mgrQuery_ORDER_QTY(tInObj).then((data) => {
            setLoadingTBL_KSV_ORDER_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    if (data[0].CODE.includes("SUCC")) {
                        toast.current.show({
                            severity: "success",
                            summary: "Success Order Sheet",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                        console.log("Order Sheet Succeed => " + data[0].CODE);

                        setFileName(data[0].CODE.split("?")[1].toString());
                        setFileUrl(data[0].CODE.split("?")[2].toString());
                        downloadFile(data[0].CODE);
                    }
                }
            } else {
                console.log(
                    "ServiceS0204_ORDER_LIS.mgrQueryTBL_KSV_ORDER_MST error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const process_END_ORDER = () => {
        if (selectedTBL_KSV_ORDER_MST.length <= 0) return;

        var tInObj = [];
        var tFlag1 = 0;
        var tFlag2 = 0;
        selectedTBL_KSV_ORDER_MST.forEach((col, i) => {
            var tObj = { ...col };
            console.log(tObj);
            if (tObj.ORDER_STATUS !== "8") tFlag1 = 1;
            var tObj1 = {};
            tObj1.ORDER_CD = tObj.ORDER_CD;
            tInObj.push(tObj1);
        });

        if (tFlag1 === 1) {
            alert("END Report된 Order 만 End 가능합니다.<br><br>Only orders reported as END can be ended.");
            return;
        }

        setLoadingTBL_KSV_ORDER_MST(true);
        serviceS0204_ORDER_LIST.mgrUpdate_END_ORDER(tInObj).then((data) => {
            setLoadingTBL_KSV_ORDER_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) alert(data[0].CODE);
                if (data.length > 0 && data[0].CODE.includes("SUCC")) {
                    searchTBL_KSV_ORDER_MST();
                    toast.current.show({
                        severity: "success",
                        summary: "SUCCEED: Delete Order",
                        detail: data[0].CODE,
                        life: 3000,
                    });
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "FAILED: Delete Order",
                        detail: data[0].CODE,
                        life: 3000,
                    });
                }
                // search_ORDER_LIST();
            } else {
                toast.current.show({
                    severity: "success",
                    summary: "FAILED: Delete Order",
                    detail: "fatal error",
                    life: 3000,
                });
            }
        });
    };

    const process_UPDATE_DETAIL = () => {
        if (selectedTBL_KSV_ORDER_MST.length <= 0) return;

        var tInObj = [];
        var tFlag1 = 0;
        var tFlag2 = 0;
        selectedTBL_KSV_ORDER_MST.forEach((col, i) => {
            var tObj = { ...col };
            var tObj1 = {};
            tObj1.ORDER_CD = tObj.ORDER_CD;
            tObj1.ORDER_STATUS = tObj.ORDER_STATUS;
            tObj1.PO_CD = tObj.PO_CD;
            tInObj.push(tObj1);
        });

        setLoadingTBL_KSV_ORDER_MST(true);
        serviceS0204_ORDER_LIST.mgrUpdate_UPDATE_DETAIL(tInObj).then((data) => {
            setLoadingTBL_KSV_ORDER_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0 && data[0].CODE.includes("SUCC")) {
                    toast.current.show({
                        severity: "success",
                        summary: "SUCCEED: Update Detail",
                        detail: data[0].CODE,
                        life: 3000,
                    });
                    searchTBL_KSV_ORDER_MST();
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "FAILED: Update Detail",
                        detail: data[0].CODE,
                        life: 3000,
                    });
                }
            } else {
                toast.current.show({
                    severity: "success",
                    summary: "FAILED: Update Detail",
                    detail: "fatal error",
                    life: 3000,
                });
            }
        });
    };

    const process_END_ORDER_CANCEL = () => {
        if (selectedTBL_KSV_ORDER_MST.length <= 0) return;

        var tInObj = [];
        var tFlag1 = 0;
        var tFlag2 = 0;
        selectedTBL_KSV_ORDER_MST.forEach((col, i) => {
            var tObj = { ...col };
            if (tObj.ORDER_STATUS !== "9") tFlag1 = 1;
            var tObj1 = {};
            tObj1.ORDER_CD = tObj.ORDER_CD;
            tInObj.push(tObj1);
        });

        if (tFlag1 === 1) {
            alert("END된 Order 만 End Cancel 가능합니다.<br><br>Only ended orders can be end-cancelled.");
            return;
        }

        setLoadingTBL_KSV_ORDER_MST(true);
        serviceS0204_ORDER_LIST
            .mgrUpdate_END_ORDER_CANCEL(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) alert(data[0].CODE);
                    if (data.length > 0 && data[0].CODE.includes("SUCC")) {
                        toast.current.show({
                            severity: "success",
                            summary: "SUCCEED: Delete Order",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                        searchTBL_KSV_ORDER_MST();
                    } else {
                        toast.current.show({
                            severity: "success",
                            summary: "FAILED: Delete Order",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                    }
                    // search_ORDER_LIST();
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "FAILED: Delete Order",
                        detail: "fatal error",
                        life: 3000,
                    });
                }
            });
    };

    /*QRY1 KSV_ORDER_MST */
    const [dataQRY1_KSV_ORDER_MST, setDataQRY1_KSV_ORDER_MST] = useState(
        emptyQRY1_KSV_ORDER_MST,
    );

    const onInputChangeQRY1_KSV_ORDER_MST_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY1_KSV_ORDER_MST = { ...dataQRY1_KSV_ORDER_MST };

        let tTypeVal = _dataQRY1_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY1_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY1_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataQRY1_KSV_ORDER_MST(_dataQRY1_KSV_ORDER_MST);
    };

    const onInputChangeQRY1_KSV_ORDER_MST_STYLE_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY1_KSV_ORDER_MST = { ...dataQRY1_KSV_ORDER_MST };

        let tTypeVal = _dataQRY1_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY1_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY1_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataQRY1_KSV_ORDER_MST(_dataQRY1_KSV_ORDER_MST);
    };

    const onInputChangeQRY1_KSV_ORDER_MST_ORDER_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY1_KSV_ORDER_MST = { ...dataQRY1_KSV_ORDER_MST };

        let tTypeVal = _dataQRY1_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY1_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY1_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataQRY1_KSV_ORDER_MST(_dataQRY1_KSV_ORDER_MST);
    };

    const onInputChangeQRY1_KSV_ORDER_MST_AVR_PRICE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY1_KSV_ORDER_MST = { ...dataQRY1_KSV_ORDER_MST };

        let tTypeVal = _dataQRY1_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY1_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY1_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataQRY1_KSV_ORDER_MST(_dataQRY1_KSV_ORDER_MST);
    };

    const onInputChangeQRY1_KSV_ORDER_MST_USD_PRICE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY1_KSV_ORDER_MST = { ...dataQRY1_KSV_ORDER_MST };

        let tTypeVal = _dataQRY1_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY1_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY1_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataQRY1_KSV_ORDER_MST(_dataQRY1_KSV_ORDER_MST);
    };

    const [
        datasQRY1_KSV_ORDER_MST_CURR_CD,
        setDatasQRY1_KSV_ORDER_MST_CURR_CD,
    ] = useState([]);
    const [dataQRY1_KSV_ORDER_MST_CURR_CD, setDataQRY1_KSV_ORDER_MST_CURR_CD] =
        useState({});

    const editQRY1_KSV_ORDER_MST_CURR_CD = (argValue) => {
        let _dataQRY1_KSV_ORDER_MST_CURR_CD =
            datasQRY1_KSV_ORDER_MST_CURR_CD.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataQRY1_KSV_ORDER_MST_CURR_CD(_dataQRY1_KSV_ORDER_MST_CURR_CD[0]);
    };

    const onDropdownChangeQRY1_KSV_ORDER_MST_CURR_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY1_KSV_ORDER_MST = { ...dataQRY1_KSV_ORDER_MST };

        let tTypeVal = _dataQRY1_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY1_KSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY1_KSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataQRY1_KSV_ORDER_MST(_dataQRY1_KSV_ORDER_MST);
        setDataQRY1_KSV_ORDER_MST_CURR_CD(e.value);
    };

    /*QRY KSV_ORDER_MST */
    const reset_QRY = () => {
        setDataQRY_KSV_ORDER_MST(emptyQRY_KSV_ORDER_MST);
        setDataQRY_KSV_ORDER_MST_STATUS_CD(datasQRY_KSV_ORDER_MST_STATUS_CD[0]);
        setDataQRY_KSV_ORDER_MST_BUYER_TEAM(
            datasQRY_KSV_ORDER_MST_BUYER_TEAM[0],
        );
        setDataQRY_KSV_ORDER_MST_REG_USER(datasQRY_KSV_ORDER_MST_REG_USER[0]);
        setDataQRY_KSV_ORDER_MST_STYLE_CD(datasQRY_KSV_ORDER_MST_STYLE_CD[0]);
        setDataQRY_KSV_ORDER_MST_BUYER_CD(datasQRY_KSV_ORDER_MST_BUYER_CD[0]);
        setDataQRY_KSV_ORDER_MST_FACTORY_CD(
            datasQRY_KSV_ORDER_MST_FACTORY_CD[0],
        );
        setDatasTBL_KSV_ORDER_MST([]);

        var tRetDateBef = `${serviceLib.getCurrDate().substring(0, 4)}0101`;
        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        var _tObj = emptyQRY_KSV_ORDER_MST;
        _tObj.S_SHIP_DATE = tRetDateBef;
        _tObj.E_SHIP_DATE = tRetDate;
        _tObj.S_DUE_DATE = tRetDateBef;
        _tObj.E_DUE_DATE = tRetDate;
        _tObj.S_ORDER_DATE = tRetDateBef;
        _tObj.E_ORDER_DATE = tRetDate;
        setDataQRY_KSV_ORDER_MST(_tObj);
    };

    const [dataQRY_KSV_ORDER_MST, setDataQRY_KSV_ORDER_MST] = useState(
        emptyQRY_KSV_ORDER_MST,
    );

    const onInputChangeQRY_KSV_ORDER_MST_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onInputChangeQRY_KSV_ORDER_MST_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onInputChangeQRY_KSV_ORDER_MST_REF_ORDER_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onCheckboxChangeQRY_KSV_ORDER_MST_IS_MAIN = (e, name) => {
        let val = "";
        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onCheckboxChangeQRY_KSV_ORDER_MST_IS_SHIP = (e, name) => {
        let val = "";
        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onCheckboxChangeQRY_KSV_ORDER_MST_IS_SAMPLE = (e, name) => {
        let val = "";
        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onCheckboxChangeQRY_KSV_ORDER_MST_IS_SHIP_DATE = (e, name) => {
        let val = "";
        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onCalChangeQRY_KSV_ORDER_MST_S_SHIP_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };
        _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onCalChangeQRY_KSV_ORDER_MST_E_SHIP_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };
        _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onCheckboxChangeQRY_KSV_ORDER_MST_IS_DUEDATE = (e, name) => {
        let val = "";
        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onCalChangeQRY_KSV_ORDER_MST_S_DUE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };
        _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onCalChangeQRY_KSV_ORDER_MST_E_DUE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };
        _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const [
        datasQRY_KSV_ORDER_MST_STATUS_CD,
        setDatasQRY_KSV_ORDER_MST_STATUS_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_MST_STATUS_CD,
        setDataQRY_KSV_ORDER_MST_STATUS_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_MST_STATUS_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
        setDataQRY_KSV_ORDER_MST_STATUS_CD(e.value);
    };

    const [
        datasQRY_KSV_ORDER_MST_BUYER_TEAM,
        setDatasQRY_KSV_ORDER_MST_BUYER_TEAM,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_MST_BUYER_TEAM,
        setDataQRY_KSV_ORDER_MST_BUYER_TEAM,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_MST_BUYER_TEAM = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
        setDataQRY_KSV_ORDER_MST_BUYER_TEAM(e.value);
    };

    const [
        datasQRY_KSV_ORDER_MST_REG_USER,
        setDatasQRY_KSV_ORDER_MST_REG_USER,
    ] = useState([]);
    const [dataQRY_KSV_ORDER_MST_REG_USER, setDataQRY_KSV_ORDER_MST_REG_USER] =
        useState({});

    const onDropdownChangeQRY_KSV_ORDER_MST_REG_USER = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
        setDataQRY_KSV_ORDER_MST_REG_USER(e.value);
    };

    const [
        datasQRY_KSV_ORDER_MST_STYLE_CD,
        setDatasQRY_KSV_ORDER_MST_STYLE_CD,
    ] = useState([]);
    const [dataQRY_KSV_ORDER_MST_STYLE_CD, setDataQRY_KSV_ORDER_MST_STYLE_CD] =
        useState({});

    const onInputChangeQRY_KSV_ORDER_MST_STYLE_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const [
        datasQRY_KSV_ORDER_MST_BUYER_CD,
        setDatasQRY_KSV_ORDER_MST_BUYER_CD,
    ] = useState([]);
    const [dataQRY_KSV_ORDER_MST_BUYER_CD, setDataQRY_KSV_ORDER_MST_BUYER_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_ORDER_MST_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
        setDataQRY_KSV_ORDER_MST_BUYER_CD(e.value);

        search_CODE_BUYER_CD(val);
    };

    const [
        datasQRY_KSV_ORDER_MST_FACTORY_CD,
        setDatasQRY_KSV_ORDER_MST_FACTORY_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_MST_FACTORY_CD,
        setDataQRY_KSV_ORDER_MST_FACTORY_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_MST_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
        setDataQRY_KSV_ORDER_MST_FACTORY_CD(e.value);
    };

    /* TABLE KSV_ORDER_MST*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_MST
    const [loadingTBL_KSV_ORDER_MST, setLoadingTBL_KSV_ORDER_MST] =
        useState(false);
    const [datasTBL_KSV_ORDER_MST, setDatasTBL_KSV_ORDER_MST] = useState([]);
    const dt_TBL_KSV_ORDER_MST = useRef(null);
    const [dataTBL_KSV_ORDER_MST, setDataTBL_KSV_ORDER_MST] = useState(
        emptyTBL_KSV_ORDER_MST,
    );
    const [selectedTBL_KSV_ORDER_MST, setSelectedTBL_KSV_ORDER_MST] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KSV_ORDER_MST,
        setFlagSelectModeTBL_KSV_ORDER_MST,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_MST

    const onRowClick1TBL_KSV_ORDER_MST = useCallback((e) => {
        const row = e.data;

        if (!row) return;

        let newSelected = Array.isArray(selectedTBL_KSV_ORDER_MST)
            ? [...selectedTBL_KSV_ORDER_MST]
            : [];

        const exists = newSelected.some((r) => r.id === row.id);

        if (exists) {
            newSelected = newSelected.filter((r) => r.id !== row.id);
        } else {
            newSelected.push(row);
        }

        setSelectedTBL_KSV_ORDER_MST(newSelected);

        setDataTBL_KSV_ORDER_MST(row);
    }, [selectedTBL_KSV_ORDER_MST]);

    const onRowDoubleClickTBL_KSV_ORDER_MST = useCallback((event) => {
        var tUrls = window.location.href.split("/");
        console.log("URL=>" + tUrls[2]);
        var tUrl1 = "";
        if (window.location.href.includes("3288")) {
            tUrl1 = "http://afroba.iptime.org:3288/webapp/mrpapp/index.html#/";
        } else if (window.location.href.includes("3201")) {
            if (window.location.href.includes("afroba")) {
                tUrl1 = "http://afroba.iptime.org:3201/#/";
            }
            if (window.location.href.includes("localhost")) {
                tUrl1 = "http://localhost:3201/#/";
            }
        } else if (window.location.href.includes("3203")) {
            tUrl1 = "http://192.168.0.105:3203/#/";
        } else {
            tUrl1 = "http://localhost:3201/#/";
        }
        // tUrl1 += "S020401_ORDER_INFO?ORDER_CD=" + event.data.ORDER_CD;
        tUrl1 = `${window.location.origin}/#/`;
        tUrl1 += `S020602_ORDER_REG?ORDER_CD=${event.data.ORDER_CD}&STYLE_CD=${event.data.STYLE_CD}&ORDER_STATUS=${event.data.STATUS_NAME}`;

        var tUrl2 = `S020602_ORDER_REG?ORDER_CD=${event.data.ORDER_CD}&STYLE_CD=${event.data.STYLE_CD}&ORDER_STATUS=${event.data.STATUS_NAME}`;

        var tValObj = {
            key: "1-20",
            label: "Order Info",
            icon: "pi pi-fw pi-user-edit",
            url1: "S020602_ORDER_REG",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");

        var tObjs = [...selectedTBL_KSV_ORDER_MST];
        tObjs.push(event.data);
        setSelectedTBL_KSV_ORDER_MST(tObjs);
    }, [selectedTBL_KSV_ORDER_MST]);

    const handleSelectionChangeTBL_KSV_ORDER_MST = useCallback(
        (e) => {
            setSelectedTBL_KSV_ORDER_MST(e.value);
            onRowClick1TBL_KSV_ORDER_MST(e.value);
        },
        [onRowClick1TBL_KSV_ORDER_MST],
    );

    const registORDER_INFO = () => {
        var tUrls = window.location.href.split("/");
        console.log("URL=>" + tUrls[2]);
        var tUrl1 = "";
        if (window.location.href.includes("3288")) {
            tUrl1 = "http://afroba.iptime.org:3288/webapp/mrpapp/index.html#/";
        } else if (window.location.href.includes("3201")) {
            if (window.location.href.includes("afroba")) {
                tUrl1 = "http://afroba.iptime.org:3201/#/";
            }
            if (window.location.href.includes("localhost")) {
                tUrl1 = "http://localhost:3201/#/";
            }
        } else if (window.location.href.includes("3203")) {
            tUrl1 = "http://192.168.0.105:3203/#/";
        } else {
            tUrl1 = "http://localhost:3201/#/";
        }
        tUrl1 = `${window.location.origin}/#/`;
        tUrl1 += "S020602_ORDER_REG";

        var tUrl2 = "S020602_ORDER_REG";

        var tValObj = {
            key: "1-19",
            label: "Order Regist",
            icon: "pi pi-fw pi-user-edit",
            url1: "S020602_ORDER_REG",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    const registPO_INFO = () => {
        if (selectedTBL_KSV_ORDER_MST.length <= 0) {
            alert("등록할 오더를 선택하십시요.<br><br>Please select an order to register.");
            return;
        }

        var tCheck = 0;
        var tCheck1 = 0;
        var tCheck2 = 0;
        var tSaveBuyerCd = "";
        var tSaveFactoryCd = "";
        selectedTBL_KSV_ORDER_MST.forEach((col, i) => {
            if (col.PO_CD !== "") tCheck = 1;
            if (
                tSaveBuyerCd !== "" &&
                tSaveBuyerCd !== col.ORDER_CD.substring(0, 2)
            )
                tCheck1 = 1;
            if (tSaveFactoryCd !== "" && tSaveFactoryCd !== col.FACTORY_CD)
                tCheck2 = 1;
            tSaveBuyerCd = col.ORDER_CD.substring(0, 2);
            tSaveFactoryCd = col.FACTORY_CD;
        });
        if (tCheck !== 0) {
            alert("이미 PO에 등록된 오더입니다.<br><br>This order is already registered in PO.");
            return;
        }
        if (tCheck1 !== 0) {
            alert("Buyer가 다른 오더는 PO에 등록할수 없습니다.<br><br>Orders with different buyers cannot be registered in PO.");
            return;
        }
        if (tCheck2 !== 0) {
            alert("공장이 다른 오더는 PO에 등록할수 없습니다.<br><br>Orders from different factories cannot be registered in PO.");
            return;
        }

        var tUrls = window.location.href.split("/");
        console.log("URL=>" + tUrls[2]);
        var tUrl1 = "";
        if (window.location.href.includes("3288")) {
            tUrl1 = "http://afroba.iptime.org:3288/webapp/mrpapp/index.html#/";
        } else if (window.location.href.includes("3201")) {
            if (window.location.href.includes("afroba")) {
                tUrl1 = "http://afroba.iptime.org:3201/#/";
            }
            if (window.location.href.includes("localhost")) {
                tUrl1 = "http://localhost:3201/#/";
            }
        } else if (window.location.href.includes("3203")) {
            tUrl1 = "http://192.168.0.105:3203/#/";
        } else {
            tUrl1 = "http://localhost:3201/#/";
        }
        tUrl1 = `${window.location.origin}/#/`;
        tUrl1 += "S020701_PO_MANAGER";

        var tUrl2 = "S020701_PO_MANAGER";

        var tFlag = 0;
        var tSaveBuyerCd = "";
        selectedTBL_KSV_ORDER_MST.forEach((col, i) => {
            if (i > 0 && tSaveBuyerCd !== col.ORDER_CD.substring(0, 2)) {
                tFlag = 1;
            }
            if (col.STATUS_NAME === "Waiting") tFlag = 2;
            if (i === 0) {
                tUrl1 += "?ORDER_CD=" + col.ORDER_CD + "|";
                tUrl2 += "?ORDER_CD=" + col.ORDER_CD + "|";
            } else {
                tUrl1 += col.ORDER_CD + "|";
                tUrl2 += col.ORDER_CD + "|";
            }
            tSaveBuyerCd = col.ORDER_CD.substring(0, 2);
        });

        if (tFlag === 1) {
            // setSelectedTBL_KSV_ORDER_MST([]);
            // setPopupMsg('같은 바이어만 작업가능합니다');
            // setPopupDialog(true);
            alert("Buyer가 다른 오더는 PO에 등록할수 없습니다.<br><br>Orders with different buyers cannot be registered in PO.");
            return;
        }
        if (tFlag === 2) {
            // setSelectedTBL_KSV_ORDER_MST([]);
            // setPopupMsg('Waiting상태는 PO 등록을 할수 없습니다.<br><br>Orders in Waiting status cannot be registered in PO.');
            // setPopupDialog(true);
            alert("Waiting상태는 PO 등록을 할수 없습니다.<br><br>Orders in Waiting status cannot be registered in PO.");
            return;
        }

        var tValObj = {
            key: "1-6",
            label: "PO Manager",
            icon: "pi pi-fw pi-user-edit",
            url1: "S020701_PO_MANAGER",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    const registPI_INFO = () => {
        if (selectedTBL_KSV_ORDER_MST.length <= 0) {
            alert("등록할 오더를 선택하십시요.<br><br>Please select an order to register.");
            return;
        }

        var tCheck = 0;
        var tCheck1 = 0;
        var tCheck2 = 0;
        var tSaveBuyerCd = "";
        var tSaveFactoryCd = "";
        selectedTBL_KSV_ORDER_MST.forEach((col, i) => {
            if (col.PI_CD !== "") tCheck = 1;
            if (
                tSaveBuyerCd !== "" &&
                tSaveBuyerCd !== col.ORDER_CD.substring(0, 2)
            )
                tCheck1 = 1;
            if (tSaveFactoryCd !== "" && tSaveFactoryCd !== col.FACTORY_CD)
                tCheck2 = 1;
            tSaveBuyerCd = col.ORDER_CD.substring(0, 2);
            tSaveFactoryCd = col.FACTORY_CD;
        });
        if (tCheck !== 0) {
            alert("PI에 등록된 오더는 PI에 등록할수 없습니다.<br><br>Orders already registered in PI cannot be registered again in PI.");
            return;
        }
        if (tCheck1 !== 0) {
            alert("Buyer가 다른 오더는 PI에 등록할수 없습니다.<br><br>Orders with different buyers cannot be registered in PI.");
            return;
        }
        if (tCheck2 !== 0) {
            alert("공장이 다른 오더는 PI에 등록할수 없습니다.<br><br>Orders from different factories cannot be registered in PI.");
            return;
        }

        var tUrls = window.location.href.split("/");
        console.log("URL=>" + tUrls[2]);
        var tUrl1 = "";
        if (window.location.href.includes("3288")) {
            tUrl1 = "http://afroba.iptime.org:3288/webapp/mrpapp/index.html#/";
        } else if (window.location.href.includes("3201")) {
            if (window.location.href.includes("afroba")) {
                tUrl1 = "http://afroba.iptime.org:3201/#/";
            }
            if (window.location.href.includes("localhost")) {
                tUrl1 = "http://localhost:3201/#/";
            }
        } else if (window.location.href.includes("3203")) {
            tUrl1 = "http://192.168.0.105:3203/#/";
        } else {
            tUrl1 = "http://localhost:3201/#/";
        }
        tUrl1 = `${window.location.origin}/#/`;
        tUrl1 += "S0205_PI_MANAGER";

        var tUrl2 = "S0205_PI_MANAGER";

        var tFlag = 0;
        var tSaveBuyerCd = "";
        selectedTBL_KSV_ORDER_MST.forEach((col, i) => {
            if (i > 0 && tSaveBuyerCd !== col.ORDER_CD.substring(0, 2)) {
                tFlag = 1;
            }
            if (i === 0) {
                tUrl1 += "?ORDER_CD=" + col.ORDER_CD + "|";
                tUrl2 += "?ORDER_CD=" + col.ORDER_CD + "|";
            } else {
                tUrl1 += col.ORDER_CD + "|";
                tUrl2 += col.ORDER_CD + "|";
            }
            tSaveBuyerCd = col.ORDER_CD.substring(0, 2);
        });

        if (tFlag === 1) {
            setSelectedTBL_KSV_ORDER_MST([]);
            setPopupDialog(true);
            return;
        }

        var tValObj = {
            key: "1-8",
            label: "PI Regist",
            icon: "pi pi-fw pi-user-edit",
            url1: "S0205_PI_MANAGER",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    const searchTBL_KSV_ORDER_MST = () => {
        clearSelectedTBL_KSV_ORDER_MST();

        setLoadingTBL_KSV_ORDER_MST(true);
        setDatasTBL_KSV_ORDER_MST([]);
        setSelectedTBL_KSV_ORDER_MST([]);

        serviceS0204_ORDER_LIST
            .mgrQueryTBL_KSV_ORDER_MST(dataQRY_KSV_ORDER_MST)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.message !== "") alert(data.message);
                    var tArray = [];

                    data.datas.forEach((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;

                        if (
                            tObj.REG_USER === "undefined" ||
                            tObj.REG_USER === null
                        ) {
                            tObj.REG_USER = "";
                        }

                        tArray.push(tObj);
                    });

                    setDatasTBL_KSV_ORDER_MST(tArray);
                } else {
                    console.log(
                        "ServiceS0204_ORDER_LIS.mgrQueryTBL_KSV_ORDER_MST error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MST
    };

    const handleSearchInputKeyDown = (e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        searchTBL_KSV_ORDER_MST();
    };

    const clearSelectedTBL_KSV_ORDER_MST = () => {
        setSelectedTBL_KSV_ORDER_MST([]);
        setFlagSelectModeTBL_KSV_ORDER_MST(false);
    };

    const exportExcelTBL_KSV_ORDER_MST = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasTBL_KSV_ORDER_MST);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KSV_ORDER_MST(excelBuffer, "오더목록");
        });
    };

    const saveAsExcelFileTBL_KSV_ORDER_MST = (buffer, fileName) => {
        import("file-saver").then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE =
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                let EXCEL_EXTENSION = ".xlsx";
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE,
                });
                module.default.saveAs(
                    data,
                    fileName +
                        "_export_" +
                        new Date().getTime() +
                        EXCEL_EXTENSION,
                );
            }
        });
    };

    /* TABLE KSV_ORDER_MST*/
    // DEFINE DATAGRID : TBL1_KSV_ORDER_MST
    const [loadingTBL1_KSV_ORDER_MST, setLoadingTBL1_KSV_ORDER_MST] =
        useState(false);
    const [datasTBL1_KSV_ORDER_MST, setDatasTBL1_KSV_ORDER_MST] = useState([]);
    const dt_TBL1_KSV_ORDER_MST = useRef(null);
    const [dataTBL1_KSV_ORDER_MST, setDataTBL1_KSV_ORDER_MST] = useState(
        emptyTBL1_KSV_ORDER_MST,
    );
    const [selectedTBL1_KSV_ORDER_MST, setSelectedTBL1_KSV_ORDER_MST] =
        useState([]);
    const [
        flagSelectModeTBL1_KSV_ORDER_MST,
        setFlagSelectModeTBL1_KSV_ORDER_MST,
    ] = useState(false);

    const onRowClick1TBL1_KSV_ORDER_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL1_KSV_ORDER_MST = argData;

        setDataTBL1_KSV_ORDER_MST(argTBL1_KSV_ORDER_MST);
    };

    const onRowDoubleClickTBL1_KSV_ORDER_MST = (event) => {
        // event.data.ORDER_CD
    };
    const onRowClickTBL1_KSV_ORDER_MST = (event) => {
        let argTBL1_KSV_ORDER_MST = event.data;
        // Service : NawooAll:mgrQueryTBL1_KSV_ORDER_MST
    };

    const onCellEditCompleteTBL1_KSV_ORDER_MST = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        let _rowData = { ...rowData };
        _rowData[field] = newValue;

        if (field === "FOB") _rowData["FOB100"] = newValue;

        var tSumQty = 0;
        var tSumAmt = 0;
        var tLastSeq = 0;

        var tData = [...datasTBL1_KSV_ORDER_MST];
        tData.forEach((col, i) => {
            if (col.FOB_SEQ === _rowData.FOB_SEQ) {
                tSumQty += parseInt(_rowData.SHIP_QTY);
                tSumAmt +=
                    parseInt(_rowData.SHIP_QTY) * parseFloat(_rowData.FOB);
                tLastSeq = i + 1;
                tData[i] = { ..._rowData };
            } else {
                tSumQty += parseInt(col.SHIP_QTY);
                tSumAmt += parseInt(col.SHIP_QTY) * parseFloat(col.FOB);
                tLastSeq = parseInt(col.FOB_SEQ);
            }
        });
        setDatasTBL1_KSV_ORDER_MST(tData);

        var tAvrPrice = tSumAmt / tSumQty;

        var tQryObj = { ...dataQRY1_KSV_ORDER_MST };
        tQryObj.AVR_PRICE = String(tAvrPrice);
        tQryObj.USD_PRICE = String(tAvrPrice);
        setDataQRY1_KSV_ORDER_MST(tQryObj);
    };

    const cellEditorTBL1_KSV_ORDER_MST = (options) => {
        return textEditor(options);
    };

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => options.editorCallback(e.target.value)}
            />
        );
    };

    const process_CLEAR_SELECT = () => {
        setSelectedTBL_KSV_ORDER_MST([]);
    };

    const menuModel = [
        {
            label: "Clear Select",
            icon: "pi pi-fw pi-search",
            command: () => process_CLEAR_SELECT(),
        },
    ];

    useEffect(() => {
        // var tRetDateBef = serviceLib.getCurrTimeAdd(-90).substring(0, 8);
        var tRetDateBef = `${serviceLib.getCurrDate().substring(0, 4)}0101`;
        var tRetDate = serviceLib.getCurrDate().substring(0, 8);

        window.addEventListener(
            "message",
            (e) => {
                if (e.data.message) {
                    if (e.data.message === "hideChildWindow") {
                        console.log("window message=>" + e.data.message);
                        hideORDER_INFO();
                    }
                }

                // hideORDER_INFO();
            },
            false,
        );

        var tInObj = {};
        tInObj.BUYER_CD = "";
        tInObj.STYLE_CD = "";

        serviceS0204_ORDER_LIST
            .mgrQuery_ORDER_LIST_CODE(tInObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceS0204_ORDER_LIS.mgrQuery_ORDER_LIST_CODE call => " +
                            data.STATUS_CD.length,
                    );
                    setDatasQRY_KSV_ORDER_MST_STATUS_CD(data.STATUS_CD);
                    setDataQRY_KSV_ORDER_MST_STATUS_CD(data.STATUS_CD[0]);

                    setDatasQRY1_KSV_ORDER_MST_CURR_CD(data.CURR_CD);
                    setDataQRY1_KSV_ORDER_MST_CURR_CD(data.CURR_CD[0]);

                    setDatasQRY_KSV_ORDER_MST_BUYER_TEAM(data.BUYER_TEAM);
                    setDataQRY_KSV_ORDER_MST_BUYER_TEAM(data.BUYER_TEAM[0]);

                    setDatasQRY_KSV_ORDER_MST_REG_USER(data.REG_USER);
                    setDataQRY_KSV_ORDER_MST_REG_USER(data.REG_USER[0]);

                    setDatasQRY_KSV_ORDER_MST_STYLE_CD(data.STYLE);
                    setDataQRY_KSV_ORDER_MST_STYLE_CD(data.STYLE[0]);

                    setDatasQRY_KSV_ORDER_MST_BUYER_CD(data.BUYER);
                    var tArray = [];
                    data.BUYER.forEach((col, i) => {
                        var tObj = { ...col };
                        if (tObj.BUYER_CD === tInObj.BUYER_CD)
                            tArray.push(tObj);
                    });
                    setDataQRY_KSV_ORDER_MST_BUYER_CD(tArray[0]);

                    var _tObj = { ...dataQRY_KSV_ORDER_MST };
                    _tObj.BUYER_CD = tInObj.BUYER_CD;
                    _tObj.S_SHIP_DATE = tRetDateBef;
                    _tObj.E_SHIP_DATE = tRetDate;
                    _tObj.S_DUE_DATE = tRetDateBef;
                    _tObj.E_DUE_DATE = tRetDate;
                    _tObj.S_ORDER_DATE = tRetDateBef;
                    _tObj.E_ORDER_DATE = tRetDate;
                    setDataQRY_KSV_ORDER_MST(_tObj);

                    setDatasQRY_KSV_ORDER_MST_FACTORY_CD(data.FACTORY);
                    setDataQRY_KSV_ORDER_MST_FACTORY_CD(data.FACTORY[0]);
                } else {
                    console.log(
                        "ServiceS0204_ORDER_LIS.mgrQueryTBL_KCD_FACTORY error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    }, []);

    // IFRAME_CODE : MgrKcdBankReg
    const [createDialogS020401_ORDER_INFO, setCreateDialogS020401_ORDER_INFO] =
        useState(false);
    const [urlS020401_ORDER_INFO, setUrlS020401_ORDER_INFO] = useState("");

    const hideORDER_INFO = () => {
        setCreateDialogS020401_ORDER_INFO(false);

        //        set_STYLEVAL1_N();
    };
    const hideDialogS020401_ORDER_INFO = () => {
        setCreateDialogS020401_ORDER_INFO(false);
        // console.log("hideDialogMgrKcdBankReg=>" + dataKCD_VENDOR.VENDOR_CD);
    };
    const createDialogFooterS020401_ORDER_INFO = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDialogS020401_ORDER_INFO}
            />
        </>
    );

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

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "10rem", display: "flex" }}
            >
                <div style={{ width: "120rem" }}>
                    <span className="af-span-3-0" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Order#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_ORDER_CD"
                                value={dataQRY_KSV_ORDER_MST.ORDER_CD}
                                onKeyDown={handleSearchInputKeyDown}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_ORDER_MST_ORDER_CD(
                                        e,
                                        "ORDER_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Main</p>
                        <div className="af-span-checkbox">
                            <Checkbox
                                id="id_IS_MAIN"
                                checked={changeCheckBoxVal(
                                    dataQRY_KSV_ORDER_MST.IS_MAIN,
                                )}
                                onChange={(e) =>
                                    onCheckboxChangeQRY_KSV_ORDER_MST_IS_MAIN(
                                        e,
                                        "IS_MAIN",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "28rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Status</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <Dropdown
                                style={{ width: "20rem" }}
                                id="id_STATUS_CD"
                                value={dataQRY_KSV_ORDER_MST_STATUS_CD}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_ORDER_MST_STATUS_CD(
                                        e,
                                        "STATUS_CD",
                                    )
                                }
                                options={datasQRY_KSV_ORDER_MST_STATUS_CD}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Reg User</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_REG_USER"
                                value={dataQRY_KSV_ORDER_MST_REG_USER}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_ORDER_MST_REG_USER(
                                        e,
                                        "REG_USER",
                                    )
                                }
                                options={datasQRY_KSV_ORDER_MST_REG_USER}
                                optionLabel="USER_NAME"
                                placeholder=""
                                editable
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Due Date</p>
                        <div className="af-span-checkbox">
                            <Checkbox
                                id="id_IS_DUEDATE"
                                checked={changeCheckBoxVal(
                                    dataQRY_KSV_ORDER_MST.IS_DUEDATE,
                                )}
                                onChange={(e) =>
                                    onCheckboxChangeQRY_KSV_ORDER_MST_IS_DUEDATE(
                                        e,
                                        "IS_DUEDATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_E_DUE_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_ORDER_MST.S_DUE_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_ORDER_MST_S_DUE_DATE(
                                        e,
                                        "S_DUE_DATE",
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
                                id="id_E_DUE_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_ORDER_MST.E_DUE_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_ORDER_MST_E_DUE_DATE(
                                        e,
                                        "E_DUE_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>PO#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_PO_CD"
                                value={dataQRY_KSV_ORDER_MST.PO_CD}
                                onKeyDown={handleSearchInputKeyDown}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_ORDER_MST_PO_CD(
                                        e,
                                        "PO_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "10rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Sample</p>
                        <div className="af-span-checkbox">
                            <Checkbox
                                id="id_IS_SAMPLE"
                                checked={changeCheckBoxVal(
                                    dataQRY_KSV_ORDER_MST.IS_SAMPLE,
                                )}
                                onChange={(e) =>
                                    onCheckboxChangeQRY_KSV_ORDER_MST_IS_SAMPLE(
                                        e,
                                        "IS_SAMPLE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "28rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Factory</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <Dropdown
                                style={{ width: "20rem" }}
                                id="id_FACTORY_CD"
                                value={dataQRY_KSV_ORDER_MST_FACTORY_CD}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_ORDER_MST_FACTORY_CD(
                                        e,
                                        "FACTORY_CD",
                                    )
                                }
                                options={datasQRY_KSV_ORDER_MST_FACTORY_CD}
                                optionLabel="FACTORY_NAME"
                                placeholder=""
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Team</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                d="id_BUYER_CD"
                                value={dataQRY_KSV_ORDER_MST_BUYER_TEAM}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_ORDER_MST_BUYER_TEAM(
                                        e,
                                        "BUYER_TEAM",
                                    )
                                }
                                options={datasQRY_KSV_ORDER_MST_BUYER_TEAM}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "10rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Ship Date</p>
                        <div className="af-span-checkbox">
                            <Checkbox
                                id="id_IS_SHIP_DATE"
                                checked={changeCheckBoxVal(
                                    dataQRY_KSV_ORDER_MST.IS_SHIP_DATE,
                                )}
                                onChange={(e) =>
                                    onCheckboxChangeQRY_KSV_ORDER_MST_IS_SHIP_DATE(
                                        e,
                                        "IS_SHIP_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "10rem" }}>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_SHIP_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_ORDER_MST.S_SHIP_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_ORDER_MST_S_SHIP_DATE(
                                        e,
                                        "S_SHIP_DATE",
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
                                id="id_S_SHIP_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_ORDER_MST.E_SHIP_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_ORDER_MST_E_SHIP_DATE(
                                        e,
                                        "E_SHIP_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Buyer#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_BUYER_CD"
                                value={dataQRY_KSV_ORDER_MST_BUYER_CD}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_ORDER_MST_BUYER_CD(
                                        e,
                                        "BUYER_CD",
                                    )
                                }
                                options={datasQRY_KSV_ORDER_MST_BUYER_CD}
                                optionLabel="BUYER_NAME"
                                placeholder=""
                                editable
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "10rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Not Ship</p>
                        <div className="af-span-checkbox">
                            <Checkbox
                                id="id_IS_SAMPLE"
                                checked={changeCheckBoxVal(
                                    dataQRY_KSV_ORDER_MST.IS_SHIP,
                                )}
                                onChange={(e) =>
                                    onCheckboxChangeQRY_KSV_ORDER_MST_IS_SHIP(
                                        e,
                                        "IS_SHIP",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "28rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Style#</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <InputText
                                style={{ width: "20rem" }}
                                id="id_REF_ORDER_NO"
                                value={dataQRY_KSV_ORDER_MST.STYLE_CD}
                                onKeyDown={handleSearchInputKeyDown}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_ORDER_MST_STYLE_CD(
                                        e,
                                        "STYLE_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Buyer Po#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_REF_ORDER_NO"
                                value={dataQRY_KSV_ORDER_MST.REF_ORDER_NO}
                                onKeyDown={handleSearchInputKeyDown}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_ORDER_MST_REF_ORDER_NO(
                                        e,
                                        "REF_ORDER_NO",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Tooltip
                                className="menuCodeTooltip"
                                target={`#btnSearch`}
                                content={`Alt+S`}
                                position="bottom"
                            />

                            <Button
                                style={{ width: "9rem" }}
                                label={
                                    <span>
                                        Search(<u>S</u>)
                                    </span>
                                }
                                accessKey="S"
                                id="btnSearch"
                                className="p-button-text"
                                onClick={searchTBL_KSV_ORDER_MST}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label="Excel"
                                className="p-button-text green"
                                onClick={exportExcelTBL_KSV_ORDER_MST}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label="Reset"
                                className="p-button-text"
                                onClick={reset_QRY}
                            />
                        </div>
                    </span>
                </div>

                <div style={{ width: "15rem", height: "10rem" }}>
                    <span className="af-span-3-0" style={{ width: "14rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "13rem" }}
                        >
                            <Button
                                style={{ width: "13rem" }}
                                label="Order Regist"
                                className="p-button-text orange"
                                onClick={registORDER_INFO}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "14rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "13rem" }}
                        >
                            <Button
                                style={{ width: "13rem" }}
                                label="PI Regist"
                                className="p-button-text orange"
                                onClick={registPI_INFO}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "14rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "13rem" }}
                        >
                            <Button
                                style={{ width: "13rem" }}
                                label="PO Regist"
                                className="p-button-text orange"
                                onClick={registPO_INFO}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "14rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "13rem" }}
                        >
                            <Button
                                style={{ width: "13rem" }}
                                label="Copy Order"
                                className="p-button-text orange"
                                onClick={process_COPY_ORDER}
                            />
                        </div>
                    </span>
                </div>
            </div>

            <OrderTable_KSV_ORDER_MST
                dtRef={dt_TBL_KSV_ORDER_MST}
                data={datasTBL_KSV_ORDER_MST}
                loading={loadingTBL_KSV_ORDER_MST}
                selected={selectedTBL_KSV_ORDER_MST}
                onSelectionChange={handleSelectionChangeTBL_KSV_ORDER_MST}
                onRowClick={onRowClick1TBL_KSV_ORDER_MST}
                onRowDoubleClick={onRowDoubleClickTBL_KSV_ORDER_MST}
                cm={cm}
                serviceLib={serviceLib}
            />

            <div
                className="af-div-second"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <div className="af-span-div-btn" style={{ width: "13rem" }}>
                        <Button
                            label="Order List"
                            style={{ width: "13rem" }}
                            className="p-button-text green"
                            onClick={excel_ORDER_LIST}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <div className="af-span-div-btn" style={{ width: "13rem" }}>
                        <Button
                            label="Order Qty"
                            style={{ width: "13rem" }}
                            className="p-button-text green"
                            onClick={excel_ORDER_QTY}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <div className="af-span-div-btn" style={{ width: "13rem" }}>
                        <Button
                            label="Order Sheet"
                            style={{ width: "13rem" }}
                            className="p-button-text green"
                            onClick={excel_ORDER_SHEET}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <div className="af-span-div-btn" style={{ width: "13rem" }}>
                        <Button
                            style={{ width: "13rem" }}
                            label="Change XX Order"
                            className="p-button-text orange"
                            onClick={process_CHANGE_ORDER}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "16rem" }}>
                    <div className="af-span-div-btn" style={{ width: "15rem" }}>
                        <Button
                            style={{ width: "15rem" }}
                            label="Change to Factory FOB"
                            className="p-button-text orange"
                            onClick={popup_CHANGE_FOB}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <div className="af-span-div-btn" style={{ width: "13rem" }}>
                        <Button
                            style={{ width: "13rem" }}
                            label="Order End"
                            className="p-button-text"
                            onClick={process_END_ORDER}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <div className="af-span-div-btn" style={{ width: "13rem" }}>
                        <Button
                            style={{ width: "13rem" }}
                            label="Cancel End"
                            className="p-button-text"
                            onClick={process_END_ORDER_CANCEL}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <div className="af-span-div-btn" style={{ width: "13rem" }}>
                        <Button
                            style={{ width: "13rem" }}
                            label="Update Detail"
                            className="p-button-text"
                            onClick={process_UPDATE_DETAIL}
                        />
                    </div>
                </span>
            </div>

            <Toast ref={toast} />

            <OverlayPanel
                style={{
                    width: "123rem",
                    height: "60rem",
                    marginLeft: "0rem",
                    marginTop: "0rem",
                }}
                ref={op}
                showCloseIcon
            >
                <iframe
                    src={urlIframe}
                    frameBorder="0"
                    ref={dt_iframe}
                    width="1360px"
                    height="670px"
                    id="id1"
                    className="myClassname"
                    scrolling="no"
                />
            </OverlayPanel>

            <div style={styleVal1}>
                <div
                    style={{
                        top: "2px",
                        right: "2px",
                        position: "absolute",
                        width: "4rem",
                        height: "4rem",
                    }}
                >
                    <i
                        className="pi pi-times"
                        style={{ fontSize: "2.5rem" }}
                        onClick={hideORDER_INFO}
                    ></i>
                </div>
                <iframe
                    src={urlOrderInfo}
                    key={iframeKey}
                    ref={dt_iframe}
                    width="1400px"
                    height="1100px"
                    id="id1"
                    className="myClassname"
                    scrolling="no"
                />
            </div>

            <Dialog
                visible={createDialogS020401_ORDER_INFO}
                position="mid-center"
                header={dlgHeader}
                modal={true}
                className="p-fluid"
                onHide={hideDialogS020401_ORDER_INFO}
            >
                <iframe
                    src={urlOrderInfo}
                    frameBorder="0"
                    ref={dt_iframe}
                    width="1300px"
                    height="670px"
                    id="id1"
                    className="myClassname"
                    scrolling="yes"
                />
            </Dialog>

            <Dialog
                header="Info"
                visible={popupDialog}
                style={{ width: "20vw" }}
                onHide={() => setPopupDialog(false)}
            >
                <p className="m-0">{popupMsg}</p>
            </Dialog>

            <Dialog
                visible={createDialog_CHG_FOB}
                position="mid-center"
                header="Change to Factory FOB"
                modal={true}
                className="p-fluid"
                onHide={hideDialog_CHG_FOB}
                style={{ width: "85rem" }}
            >
                <div
                    className="af-div-first"
                    style={{ width: "95%", height: "8rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "100%" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Order</p>
                        <div className="af-span-div" style={{ width: "12rem" }}>
                            <InputText
                                disabled
                                style={{ width: "12rem" }}
                                id="id_ORDER_CD"
                                value={dataQRY1_KSV_ORDER_MST.ORDER_CD}
                                onChange={(e) =>
                                    onInputChangeQRY1_KSV_ORDER_MST_ORDER_CD(
                                        e,
                                        "ORDER_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "100%" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Style</p>
                        <div
                            className="af-span-div"
                            style={{ width: "68.5rem" }}
                        >
                            <InputText
                                disabled
                                style={{ width: "68.5rem" }}
                                id="id_ORDER_CD"
                                value={dataQRY1_KSV_ORDER_MST.STYLE_CD}
                                onChange={(e) =>
                                    onInputChangeQRY1_KSV_ORDER_MST_STYLE_CD(
                                        e,
                                        "STYLE_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "14rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Order Qty</p>
                        <div className="af-span-div" style={{ width: "6rem" }}>
                            <InputText
                                disabled
                                style={{ width: "6rem" }}
                                id="id_ORDER_CD"
                                value={serviceLib.formatNumber(
                                    dataQRY1_KSV_ORDER_MST.ORDER_QTY,
                                    0,
                                )}
                                className="text-right"
                                onChange={(e) =>
                                    onInputChangeQRY1_KSV_ORDER_MST_ORDER_QTY(
                                        e,
                                        "ORDER_QTY",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <p className="af-span-p" style={{ width: "3rem" }}>Curr</p>
                        <div className="af-span-div" style={{ width: "6rem" }}>
                            <Dropdown
                                style={{ width: "6rem" }}
                                id="id_STATUS_CD"
                                value={dataQRY1_KSV_ORDER_MST_CURR_CD}
                                onChange={(e) =>
                                    onDropdownChangeQRY1_KSV_ORDER_MST_CURR_CD(
                                        e,
                                        "CURR_CD",
                                    )
                                }
                                options={datasQRY1_KSV_ORDER_MST_CURR_CD}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Usd Price</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                disabled
                                style={{ width: "9rem" }}
                                id="id_ORDER_CD"
                                value={serviceLib.formatNumber(
                                    dataQRY1_KSV_ORDER_MST.USD_PRICE,
                                    4,
                                )}
                                className="text-right"
                                onChange={(e) =>
                                    onInputChangeQRY1_KSV_ORDER_MST_USD_PRICE(
                                        e,
                                        "USD_PRICE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Avr Price</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                disabled
                                style={{ width: "9rem" }}
                                id="id_ORDER_CD"
                                value={serviceLib.formatNumber(
                                    dataQRY1_KSV_ORDER_MST.AVR_PRICE,
                                    4,
                                )}
                                className="text-right"
                                onChange={(e) =>
                                    onInputChangeQRY1_KSV_ORDER_MST_AVR_PRICE(
                                        e,
                                        "AVR_PRICE",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label="Save"
                                className="p-button-text"
                                onClick={process_CHANGE_FOB}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label="Cancel"
                                className="p-button-text"
                                onClick={hideDialog_CHG_FOB}
                            />
                        </div>
                    </span>
                </div>

                <div
                    className="af-div-first"
                    style={{ width: "100%", height: "44rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL1_KSV_ORDER_MST}
                        editMode="cell"
                        size="small"
                        value={datasTBL1_KSV_ORDER_MST}
                        tableStyle={{ tableLayout: "fixed" }}
                        loading={loadingTBL1_KSV_ORDER_MST}
                        resizableColumns
                        columnResizeMode="expand"
                        metaKeySelection={false}
                        showGridlines
                        selectionMode="multiple"
                        selection={selectedTBL1_KSV_ORDER_MST}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL1_KSV_ORDER_MST(true);
                            setSelectedTBL1_KSV_ORDER_MST(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL1_KSV_ORDER_MST.length,
                            );
                            onRowClick1TBL1_KSV_ORDER_MST(e.value);
                        }}
                        onRowClick={onRowClickTBL1_KSV_ORDER_MST}
                        dataKey="FOB_SEQ"
                        className="datatable-responsive"
                        onRowDoubleClick={onRowDoubleClickTBL1_KSV_ORDER_MST}
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="30rem"
                    >
                        <AFColumn field="FOB_SEQ" header="Seq" style={{ width: "6rem" }} className="af-col text-center" ></AFColumn>
                        <AFColumn field="SHIP_QTY" header="Qty" style={{ width: "7rem" }} className="af-col text-right" editor={(options) => cellEditorTBL1_KSV_ORDER_MST(options) } onCellEditComplete={ onCellEditCompleteTBL1_KSV_ORDER_MST } body={(row) => serviceLib.formatNumber(row.SHIP_QTY, 0) } ></AFColumn>
                        <AFColumn field="FOB" header="Fob" style={{ width: "7rem" }} className="af-col text-right" editor={(options) => cellEditorTBL1_KSV_ORDER_MST(options) } onCellEditComplete={ onCellEditCompleteTBL1_KSV_ORDER_MST } body={(row) => serviceLib.formatNumber(row.FOB, 4)} ></AFColumn>
                        <AFColumn field="FOB100" header="Fob(100%)" style={{ width: "7rem" }} className="af-col text-right" body={(row) => serviceLib.formatNumber(row.FOB100, 4) } ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>

            <CombinedOrderModal
                visible={modalVisible}
                onHide={(exit) => {
                    console.log(exit);
                    setModalVisible(false);
                    if (exit !== "EXIT") {
                        excel_ORDER_SHEET_COMBINE();
                    }
                }}
                onSelect={(selectedData) => {
                    setSelectedOrders(selectedData);
                }}
                orderCd={orderModalOrderCd}
            />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0204_ORDER_LIST, comparisonFn);
