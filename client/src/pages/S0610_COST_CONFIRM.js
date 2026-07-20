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

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0610_COST_CONFIRM } from "../service/service_biz/ServiceS0610_COST_CONFIRM";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_ORDER_SHIP = {
    S_DATE: "",
    E_DATE: "",
    S_ETD: "",
    E_ETD: "",
    TYPE: "",
    COST_CURR: "",
    BUYER_CD: "",
    PO_CD: "",
    DETAIL: "",
    REG_USER: "",
    BUYER_TEAM: "",
};

const emptyQRY_KSV_ORDER_SHIP1 = {
    ORDER_CD: "",
};

const emptyEDT_KSV_ORDER_SHIP = {
    CONFIRM_DATE: "",
    CONFIRM_USER: "",
};

const S0610_COST_CONFIRM = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0610_COST_CONFIRMRef = useRef(null);
    if (!serviceS0610_COST_CONFIRMRef.current) serviceS0610_COST_CONFIRMRef.current = new ServiceS0610_COST_CONFIRM();
    const serviceS0610_COST_CONFIRM = serviceS0610_COST_CONFIRMRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });
    const [loadingTBL_KSV_ORDER_SHIP, setLoadingTBL_KSV_ORDER_SHIP] =
        useState(false);

    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    //

    //
    const [data_HEADER_STR, setData_HEADER_STR] = useState([]);

    const dynamicColumns_1 = data_HEADER_STR.map((col, i) => {
        var tHeader = `id_msg_${col}_KSV_ORDER_MST_dt`;
        var tHeaderStr = serviceLib.getLocaleMessage(tHeader);
        var tCol = `COL_${i}`;
        return (
            <AFColumn field={tCol} header={tHeaderStr} headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
        );

        // return  <AFColumn field={tCol} header={tHeaderStr} headerStyle={{ width: '10rem',height:'1.8rem' }} bodyStyle={{ width: '10rem',height:'1.8rem' }} editor={(options) => cellEditorKSV_ORDER_MEM(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_MEM}></AFColumn>
        //       return  <AFColumn field={col.field} header={tHeaderStr} headerStyle={{ width: '10rem',height:'1.8rem' }} bodyStyle={{ width: '10rem',height:'1.8rem' }} ></AFColumn>
    });

    const search_LIST_1 = () => {
        var _tData = { ...dataQRY_KSV_ORDER_SHIP };

        setDatasTBL_KSV_ORDER_SHIP([]);
        setSelectedTBL_KSV_ORDER_SHIP([]);

        console.log(dataQRY_KSV_ORDER_SHIP);

        setLoadingTBL_KSV_ORDER_SHIP(true);
        // 2
        serviceS0610_COST_CONFIRM.mgrQuery_LIST_1(_tData).then((data) => {
            setLoadingTBL_KSV_ORDER_SHIP(false);
            if (typeof data.graphQLErrors === "undefined") {
                // alert(`Data Count:${data.length}`);
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                if (data.length > 0) {
                    var tArray2 = data.map((col, i) => {
                        var tObj = { ...col };
                        return tObj;
                    });
                    setDatasTBL_KSV_ORDER_SHIP(tArray2);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        // search_CODE();
    };

    const search_LIST_3 = () => {
        var tInput0 = { ...dataQRY_KSV_ORDER_SHIP };
        var tInput = { ...dataQRY_KSV_ORDER_SHIP1 };

        setDatasTBL_KSV_ORDER_SHIP2([]);
        setSelectedTBL_KSV_ORDER_SHIP2([]);

        var tInObj = {};
        tInObj.ORDER_CD = tInput.ORDER_CD;
        tInObj.BUYER_CD = tInput0.BUYER_CD;

        // 4
        serviceS0610_COST_CONFIRM.mgrQuery_LIST_3(tInObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray = data.map((col, i) => {
                    var tOne = { ...col };
                    tOne.id = i + 1;
                    return tOne;
                });
                setDatasTBL_KSV_ORDER_SHIP2(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const process_APPLY = () => {
        var data = [...selectedTBL_KSV_ORDER_SHIP2];
        var tArray = [];
        var tIdx = 0;
        var tSeq = 0;
        for (tIdx = 0; tIdx < data.length; tIdx++) {
            var tOne = { ...data[tIdx] };
            var tSizeArray = tOne.SIZE_MEMBER.split(",");
            tSizeArray.forEach((col, i) => {
                var tOne1 = { ...tOne };
                tOne1.SIZE = col;
                tOne1.TOT_CNT = parseInt(
                    tOne.ORDER_SIZE_CNT.substring(i * 6, i * 6 + 6),
                );
                if (tOne.SHIP_SIZE_CNT === "") tOne1.SHIP_CNT = 0;
                else
                    tOne1.SHIP_CNT = parseInt(
                        tOne.SHIP_SIZE_CNT.substring(i * 6, i * 6 + 6),
                    );
                if (tOne.SHIP_CNT > tOne.TOT_CNT) tOne1.REMAIN_QTY = 0;
                else tOne1.REMAIN_QTY = tOne1.TOT_CNT - tOne1.SHIP_CNT;
                tOne1.SHIP_QTY = tOne1.REMAIN_QTY;
                tOne1.id = tSeq;
                tSeq += 1;
                if (i > 0) {
                    tOne1.ORDER_CD = "";
                    tOne1.STYLE_NAME = "";
                    tOne1.COLOR = "";
                }
                tArray.push(tOne1);
            });
        }
        setDatasTBL_KSV_ORDER_SHIP1(tArray);
    };

    const process_COST_CONFIRM = () => {
        if (selectedTBL_KSV_ORDER_SHIP.length <= 0) return;

        var tArray = [...selectedTBL_KSV_ORDER_SHIP];
        var _tInput0 = [];
        tArray.forEach((col, i) => {
            var tObj = { ...col };
            delete tObj.__typename;
            _tInput0.push(tObj);
        });

        var tObj = { ...dataEDT_KSV_ORDER_SHIP };
        var _tInput1 = {};
        _tInput1.CONFIRM_USER = tObj.CONFIRM_USER;
        _tInput1.CONFIRM_DATE = tObj.CONFIRM_DATE;

        serviceS0610_COST_CONFIRM
            .mgrInsert_COST_CONFIRM(_tInput0, _tInput1)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        if (data.length > 0) alert(data[0].CODE);
                        search_LIST_1();
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR:Insert Order Ship",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_COST_CANCEL = () => {
        if (selectedTBL_KSV_ORDER_SHIP.length <= 0) return;

        var tArray = [...selectedTBL_KSV_ORDER_SHIP];
        var _tInput0 = [];
        tArray.forEach((col, i) => {
            var tObj = { ...col };
            delete tObj.__typename;
            _tInput0.push(tObj);
        });

        var tObj = { ...dataEDT_KSV_ORDER_SHIP };
        var _tInput1 = {};
        _tInput1.CONFIRM_USER = tObj.CONFIRM_USER;
        _tInput1.CONFIRM_DATE = tObj.CONFIRM_DATE;

        serviceS0610_COST_CONFIRM
            .mgrInsert_COST_CANCEL(_tInput0, _tInput1)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        if (data.length > 0) alert(data[0].CODE);
                        search_LIST_1();
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR:Insert Order Ship",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    /*QRY KSV_STOCK_FACOUT */
    const [dataQRY_KSV_ORDER_SHIP, setDataQRY_KSV_ORDER_SHIP] = useState(
        emptyQRY_KSV_ORDER_SHIP,
    );

    const [datasQRY_KSV_ORDER_SHIP_TYPE, setDatasQRY_KSV_ORDER_SHIP_TYPE] =
        useState([]);
    const [dataQRY_KSV_ORDER_SHIP_TYPE, setDataQRY_KSV_ORDER_SHIP_TYPE] =
        useState({});

    const onDropdownChangeQRY_KSV_ORDER_SHIP_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
        setDataQRY_KSV_ORDER_SHIP_TYPE(e.value);
    };

    const [
        datasQRY_KSV_ORDER_SHIP_STYLE_CD,
        setDatasQRY_KSV_ORDER_SHIP_STYLE_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_SHIP_STYLE_CD,
        setDataQRY_KSV_ORDER_SHIP_STYLE_CD,
    ] = useState({});

    const [
        datasQRY_KSV_ORDER_SHIP_BUYER_CD,
        setDatasQRY_KSV_ORDER_SHIP_BUYER_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_SHIP_BUYER_CD,
        setDataQRY_KSV_ORDER_SHIP_BUYER_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_SHIP_BUYER_CD = (e, name) => {
        let val = "";
        if (typeof e.value === "string") {
            val = e.value;
        } else {
            val = (e.value && e.value.BUYER_CD) || "";
        }

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
        setDataQRY_KSV_ORDER_SHIP_BUYER_CD(e.value);
    };

    const [
        datasQRY_KSV_ORDER_SHIP_BUYER_TEAM,
        setDatasQRY_KSV_ORDER_SHIP_BUYER_TEAM,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_SHIP_BUYER_TEAM,
        setDataQRY_KSV_ORDER_SHIP_BUYER_TEAM,
    ] = useState({});

    const [datasQRY_KSV_ORDER_SHIP_CURR_CD, setDatasQRY_KSV_ORDER_SHIP_CURR_CD] =
        useState([]);
    const [dataQRY_KSV_ORDER_SHIP_CURR_CD, setDataQRY_KSV_ORDER_SHIP_CURR_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_ORDER_SHIP_BUYER_TEAM = (e, name) => {
        let val = e.value.CD_CODE;
        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        }

        console.log(_dataQRY_KSV_ORDER_SHIP);

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
        setDataQRY_KSV_ORDER_SHIP_BUYER_TEAM(e.value);
    };

    const onInputChangeQRY_KSV_ORDER_SHIP_DETAIL = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

    const onInputChangeQRY_KSV_ORDER_SHIP_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

    const onInputChangeQRY_KSV_ORDER_SHIP_REG_USER = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

    const onCalChangeQRY_KSV_ORDER_SHIP_S_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };
        _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

    const onCalChangeQRY_KSV_ORDER_SHIP_E_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };
        _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

    const onCalChangeQRY_KSV_ORDER_SHIP_S_ETD = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };
        _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

    const onCalChangeQRY_KSV_ORDER_SHIP_E_ETD = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };
        _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

    const onDropdownChangeQRY_KSV_ORDER_SHIP_CURR_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";
        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
        setDataQRY_KSV_ORDER_SHIP_CURR_CD(e.value);
    };

    /*QRY KSV_STOCK_FACOUT */
    const [dataQRY_KSV_ORDER_SHIP1, setDataQRY_KSV_ORDER_SHIP1] = useState(
        emptyQRY_KSV_ORDER_SHIP1,
    );

    const onInputChangeQRY_KSV_ORDER_SHIP1_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_SHIP1 = { ...dataQRY_KSV_ORDER_SHIP1 };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_SHIP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_SHIP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_SHIP1(_dataQRY_KSV_ORDER_SHIP1);
    };

    /*QRY KSV_STOCK_FACOUT */
    const [dataEDT_KSV_ORDER_SHIP, setDataEDT_KSV_ORDER_SHIP] = useState(
        emptyEDT_KSV_ORDER_SHIP,
    );

    const onInputChangeEDT_KSV_ORDER_SHIP_CONFIRM_USER = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onCalChangeEDT_KSV_ORDER_SHIP_CONFIRM_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };
        _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    /* TABLE KSV_STOCK_FACOUT*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_SHIP
    let emptyTBL_KSV_ORDER_SHIP = {};

    const [datasTBL_KSV_ORDER_SHIP, setDatasTBL_KSV_ORDER_SHIP] = useState([]);
    const dt_TBL_KSV_ORDER_SHIP = useRef(null);
    const [dataTBL_KSV_ORDER_SHIP, setDataTBL_KSV_ORDER_SHIP] = useState(
        emptyTBL_KSV_ORDER_SHIP,
    );
    const [selectedTBL_KSV_ORDER_SHIP, setSelectedTBL_KSV_ORDER_SHIP] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_SHIP,
        setFlagSelectModeTBL_KSV_ORDER_SHIP,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_SHIP

    const onRowClick1TBL_KSV_ORDER_SHIP = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_SHIP = argData;

        setDataTBL_KSV_ORDER_SHIP(argTBL_KSV_ORDER_SHIP);
    };

    const onRowClickTBL_KSV_ORDER_SHIP = (event) => {
        let argTBL_KSV_ORDER_SHIP = event.data;
        if (flagSelectModeTBL_KSV_ORDER_SHIP) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_SHIP
    };

    const exportExcelTBL_KSV_ORDER_SHIP = () => {
        var tArray = [];
        datasTBL_KSV_ORDER_SHIP.forEach((col, i) => {
            var tObj = {};
            tObj.COST_DATE = col.COST_DATE;
            tObj.TYPE = col.TYPE2;
            tObj.BUYER = col.BUYER_CD;
            tObj.DETAIL = col.DETAIL;
            tObj.Currency = col.COST_CURR;
            tObj.Amount = Number(col.COST_AMT);
            tObj.Reg_User = col.REG_USER;
            tObj.Confirm_User = col.CONFIRM_USER;
            tObj.BL_NO = col.BL_NO;
            tObj.SHIP_DATE = col.SHIP_DATE;
            tObj.Description = col.MATL_NAME;
            tObj.MATL_CD = col.MATL_CD;
            tObj.Suuplier = col.VENDOR_NAME;
            tArray.push(tObj);
        });
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(tArray);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KSV_ORDER_SHIP(excelBuffer, "Cost List");
        });
    };

    const saveAsExcelFileTBL_KSV_ORDER_SHIP = (buffer, fileName) => {
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

    /* TABLE KSV_STOCK_FACOUT*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_SHIP1
    let emptyTBL_KSV_ORDER_SHIP1 = {};

    const [datasTBL_KSV_ORDER_SHIP1, setDatasTBL_KSV_ORDER_SHIP1] = useState(
        [],
    );
    const dt_TBL_KSV_ORDER_SHIP1 = useRef(null);
    const [dataTBL_KSV_ORDER_SHIP1, setDataTBL_KSV_ORDER_SHIP1] = useState(
        emptyTBL_KSV_ORDER_SHIP1,
    );
    const [selectedTBL_KSV_ORDER_SHIP1, setSelectedTBL_KSV_ORDER_SHIP1] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_SHIP1,
        setFlagSelectModeTBL_KSV_ORDER_SHIP1,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_SHIP1

    /* TABLE KSV_STOCK_FACOUT*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_SHIP2
    let emptyTBL_KSV_ORDER_SHIP2 = {};

    const [datasTBL_KSV_ORDER_SHIP2, setDatasTBL_KSV_ORDER_SHIP2] = useState(
        [],
    );
    const dt_TBL_KSV_ORDER_SHIP2 = useRef(null);
    const [dataTBL_KSV_ORDER_SHIP2, setDataTBL_KSV_ORDER_SHIP2] = useState(
        emptyTBL_KSV_ORDER_SHIP2,
    );
    const [selectedTBL_KSV_ORDER_SHIP2, setSelectedTBL_KSV_ORDER_SHIP2] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_SHIP2,
        setFlagSelectModeTBL_KSV_ORDER_SHIP2,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_SHIP2

    const onRowClick1TBL_KSV_ORDER_SHIP2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_SHIP2 = argData;

        setDataTBL_KSV_ORDER_SHIP2(argTBL_KSV_ORDER_SHIP2);
    };

    const onRowClickTBL_KSV_ORDER_SHIP2 = (event) => {
        let argTBL_KSV_ORDER_SHIP2 = event.data;
        if (flagSelectModeTBL_KSV_ORDER_SHIP2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_SHIP2
    };

    useEffect(() => {
        var tRetDate = serviceLib.getCurrDate1();
        var tUserInfo = serviceLib.getUserInfo();
        var tObj0 = { ...dataEDT_KSV_ORDER_SHIP };
        tObj0.CONFIRM_USER = tUserInfo.USER_ID;
        tObj0.CONFIRM_DATE = tRetDate;
        setDataEDT_KSV_ORDER_SHIP(tObj0);

        var tQry = { ...dataQRY_KSV_ORDER_SHIP };
        tQry.S_DATE = `${tRetDate.substring(0, 4)}0101`;
        tQry.E_DATE = tRetDate;
        setDataQRY_KSV_ORDER_SHIP(tQry);

        var _tObj = {};
        _tObj.BUYER_CD = "";

        serviceS0610_COST_CONFIRM.mgrQuery_CODE(_tObj).then((data) => {
            console.log(data);
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_ORDER_SHIP_TYPE(data.TYPE);
                setDataQRY_KSV_ORDER_SHIP_TYPE(data.TYPE[0]);

                setDatasQRY_KSV_ORDER_SHIP_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_ORDER_SHIP_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_ORDER_SHIP_BUYER_TEAM(data.BUYER_TEAM);
                setDataQRY_KSV_ORDER_SHIP_BUYER_TEAM(data.BUYER_TEAM[0]);

                setDatasQRY_KSV_ORDER_SHIP_CURR_CD(data.CURR_CD || []);
                setDataQRY_KSV_ORDER_SHIP_CURR_CD((data.CURR_CD || [])[0] || {});
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        // search_LIST_1();
    }, []);

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

    const currSummaryRows = (() => {
        const toNum = (val) => {
            if (val === null || typeof val === "undefined") return 0;
            const parsed = parseFloat(String(val).replaceAll(",", ""));
            return Number.isFinite(parsed) ? parsed : 0;
        };

        const totalMap = new Map();
        const selectedMap = new Map();
        const selectedCountMap = new Map();

        datasTBL_KSV_ORDER_SHIP.forEach((row) => {
            const curr = (row.COST_CURR || "").trim();
            totalMap.set(curr, (totalMap.get(curr) || 0) + toNum(row.COST_AMT));
        });

        selectedTBL_KSV_ORDER_SHIP.forEach((row) => {
            const curr = (row.COST_CURR || "").trim();
            selectedMap.set(curr, (selectedMap.get(curr) || 0) + toNum(row.COST_AMT));
            selectedCountMap.set(curr, (selectedCountMap.get(curr) || 0) + 1);
        });

        const keys = Array.from(new Set([...totalMap.keys(), ...selectedMap.keys()]));
        keys.sort((a, b) => {
            if (a === "") return 1;
            if (b === "") return -1;
            return a.localeCompare(b);
        });

        return keys.map((curr) => ({
            curr,
            totalCost: totalMap.get(curr) || 0,
            selectedCost: selectedMap.get(curr) || 0,
            selectedCount: selectedCountMap.get(curr) || 0,
        }));
    })();

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "27rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Reg Date</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_DUE_DATE"
                            value={changeDateVal(dataQRY_KSV_ORDER_SHIP.S_DATE)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_SHIP_S_DATE(
                                    e,
                                    "S_DATE",
                                )
                            }
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_DUE_DATE"
                            value={changeDateVal(dataQRY_KSV_ORDER_SHIP.E_DATE)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_SHIP_E_DATE(
                                    e,
                                    "E_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Type</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Dropdown
                            style={{ width: "8rem" }}
                            filter
                            id="id_ORDER_CD"
                            value={dataQRY_KSV_ORDER_SHIP_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_SHIP_TYPE(
                                    e,
                                    "TYPE",
                                )
                            }
                            options={datasQRY_KSV_ORDER_SHIP_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Dropdown
                            style={{ width: "8rem" }}
                            filter
                            id="id_ORDER_CD"
                            editable
                            value={dataQRY_KSV_ORDER_SHIP_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_SHIP_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_ORDER_SHIP_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>PO#</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <InputText
                            style={{ width: "14em" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_ORDER_SHIP.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_SHIP_PO_CD(
                                    e,
                                    "PO_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Detail</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <InputText
                            style={{ width: "14em" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_ORDER_SHIP.DETAIL}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_SHIP_DETAIL(
                                    e,
                                    "DETAIL",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Reg User</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <InputText
                            style={{ width: "8rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_ORDER_SHIP.REG_USER}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_SHIP_REG_USER(
                                    e,
                                    "REG_USER",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>ETD</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_ETD"
                            value={changeDateVal(dataQRY_KSV_ORDER_SHIP.S_ETD)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_SHIP_S_ETD(e, "S_ETD")
                            }
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_ETD"
                            value={changeDateVal(dataQRY_KSV_ORDER_SHIP.E_ETD)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_SHIP_E_ETD(e, "E_ETD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "12rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Curr</p>
                    <div className="af-span-div" style={{ width: "7rem" }}>
                        <Dropdown
                            style={{ width: "7rem" }}
                            filter
                            id="id_COST_CURR"
                            value={dataQRY_KSV_ORDER_SHIP_CURR_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_SHIP_CURR_CD(
                                    e,
                                    "COST_CURR",
                                )
                            }
                            options={datasQRY_KSV_ORDER_SHIP_CURR_CD}
                            optionLabel="CD_NAME"
                            placeholder=" "
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Buyer Team</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Dropdown
                            style={{ width: "8rem" }}
                            filter
                            id="id_ORDER_CD"
                            value={dataQRY_KSV_ORDER_SHIP_BUYER_TEAM}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_SHIP_BUYER_TEAM(
                                    e,
                                    "BUYER_TEAM",
                                )
                            }
                            options={datasQRY_KSV_ORDER_SHIP_BUYER_TEAM}
                            optionLabel="CD_NAME"
                            placeholder=" "
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
                        <Tooltip
                            className="menuCodeTooltip"
                            target={`#btnSearch`}
                            content={`Alt+S`}
                            position="bottom"
                        />

                        <Button
                            style={{ width: "7rem" }}
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            accessKey="S"
                            id="btnSearch"
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
                        <Button
                            style={{ width: "6rem" }}
                            label="Excel"
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_ORDER_SHIP}
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "50.5rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_SHIP}
                    size="small"
                    value={datasTBL_KSV_ORDER_SHIP}
                    tableStyle={{ tableLayout: "fixed" }}
                    metaKeySelection={false}
                    loading={loadingTBL_KSV_ORDER_SHIP}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_ORDER_SHIP}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KSV_ORDER_SHIP(e.value);
                        onRowClick1TBL_KSV_ORDER_SHIP(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_SHIP}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage="No results found." //header={headerTBL_KSV_ORDER_SHIP}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="50.5rem"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="COST_DATE" header="Register Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} body={(row) => serviceLib.dateFormat(row.COST_DATE)} ></AFColumn>
                    <AFColumn field="TYPE2" header="Type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="ETD" header="ETD" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} body={(row) => serviceLib.dateFormat(row.ETD)} ></AFColumn>
                    <AFColumn field="BUYER_CD" header="Buyer#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="DETAIL" header="Detail" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="COST_CURR" header="Curr" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="COST_AMT" className="text-right" header="Amount" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} body={(row) => serviceLib.formatNumber(row.COST_AMT, 4)} ></AFColumn>
                    <AFColumn field="REG_USER" header="Reg User" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="CONFIRM_USER" header="Confirm User" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="BL_NO" header="BL#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="SHIP_DATE" header="Ship Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PO_CD" header="PO#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" header="Desc" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MATL_CD" header="Matl#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" header="Supplier" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PU_CD" header="Pu#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="STSIN_CD" header="STSin#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="TYPE" header="Type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "20rem", display: "flex", alignItems: "flex-start" }}
            >
                <div style={{ width: "33rem", display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.3rem" }}>
                    <span className="af-span-3-0" style={{ width: "28rem" }}>
                        <p className="af-span-p" style={{ width: "12rem" }}>Confirm User</p>
                        <div className="af-span-div" style={{ width: "15rem" }}>
                            <InputText
                                disabled
                                style={{ width: "15rem" }}
                                id="id_PO_CD"
                                value={dataEDT_KSV_ORDER_SHIP.CONFIRM_USER}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_SHIP_CONFIRM_USER(
                                        e,
                                        "CONFIRM_USER",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "28rem" }}>
                        <p className="af-span-p" style={{ width: "12rem" }}>Confirm Date</p>
                        <div className="af-span-div" style={{ width: "15rem" }}>
                            <Calendar
                                showButtonBar
                                disabled
                                style={{ width: "15rem" }}
                                dateFormat="yymmdd"
                                id="id_IN_DATE"
                                value={changeDateVal(
                                    dataEDT_KSV_ORDER_SHIP.CONFIRM_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_ORDER_SHIP_CONFIRM_DATE(
                                        e,
                                        "CONFIRM_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "13rem" }}>
                        <div className="af-span-div-btn" style={{ width: "12rem" }}>
                            <Button
                                style={{ width: "12rem" }}
                                label="Confirm"
                                className="p-button-text"
                                onClick={process_COST_CONFIRM}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "13rem" }}>
                        <div className="af-span-div-btn" style={{ width: "12rem" }}>
                            <Button
                                style={{ width: "12rem" }}
                                label="Cancel"
                                className="p-button-text"
                                onClick={process_COST_CANCEL}
                            />
                        </div>
                    </span>
                </div>

                <div style={{ marginLeft: "1rem", marginTop: "0.4rem" }}>
                    <table
                        style={{
                            borderCollapse: "collapse",
                            minWidth: "24rem",
                            fontSize: "1rem",
                        }}
                    >
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid #bdbdbd", padding: "0.3rem 0.6rem", backgroundColor: "#efefef", textAlign: "center" }}>
                                    CURR
                                </th>
                                <th style={{ border: "1px solid #bdbdbd", padding: "0.3rem 0.6rem", backgroundColor: "#efefef", textAlign: "center" }}>
                                    COST
                                </th>
                                <th style={{ border: "1px solid #bdbdbd", padding: "0.3rem 0.6rem", backgroundColor: "#efefef", textAlign: "center" }}>
                                    SELECTED
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currSummaryRows.map((row) => (
                                <tr key={`curr-summary-${row.curr || "empty"}`}>
                                    <td style={{ border: "1px solid #bdbdbd", padding: "0.25rem 0.6rem" }}>
                                        {row.curr || "(없음)"}
                                    </td>
                                    <td style={{ border: "1px solid #bdbdbd", padding: "0.25rem 0.6rem", textAlign: "right" }}>
                                        {serviceLib.numWithCommas(row.totalCost, 2)}
                                    </td>
                                    <td style={{ border: "1px solid #bdbdbd", padding: "0.25rem 0.6rem", textAlign: "right" }}>
                                        {row.selectedCount > 0
                                            ? serviceLib.numWithCommas(row.selectedCost, 2)
                                            : ""}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Toast ref={toast} />

            <Dialog
                visible={createDialog}
                position="top-right"
                style={{ width: "98vw" }}
                header=""
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "100rem",
                        height: "6rem",
                    }}
                >
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "24rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Order</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "10rem",
                            }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_ORDER_SHIP1.ORDER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_SHIP1_ORDER_CD(
                                    e,
                                    "ORDER_CD",
                                )
                            }
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "25rem",
                        }}
                    >
                        <Tooltip
                            className="menuCodeTooltip"
                            target={`#btnSearch`}
                            content={`Alt+S`}
                            position="bottom"
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            accessKey="S"
                            id="btnSearch"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={search_LIST_3}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Apply"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={process_APPLY}
                        />
                    </span>
                </div>
                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "99rem",
                        height: "30rem",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_ORDER_SHIP2}
                        size="small"
                        value={datasTBL_KSV_ORDER_SHIP2}
                        resizableColumns
                        columnResizeMode="fit"
                        metaKeySelection={false}
                        showGridlines
                        selectionMode="multiple"
                        selection={selectedTBL_KSV_ORDER_SHIP2}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_ORDER_SHIP2(true);
                            setSelectedTBL_KSV_ORDER_SHIP2(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_ORDER_SHIP2.length,
                            );
                            onRowClick1TBL_KSV_ORDER_SHIP2(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_ORDER_SHIP2}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 14 }}
                        emptyMessage="No TBL_KSV_ORDER_SHIP2 found." //header={headerTBL_KSV_ORDER_SHIP2}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="28rem"
                    >
                        <AFColumn field="ORDER_CD" header="Order" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="STYLE_NAME" header="Style" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="COLOR" header="Color" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="TOT_CNT" header="Order Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="SHIP_CNT" header="Ship Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0610_COST_CONFIRM, comparisonFn);
