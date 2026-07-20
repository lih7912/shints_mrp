/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { AFDataTable } from "../components/AFDataTable";
import { AFColumn } from "../components/AFColumn";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
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
import { ServiceS0438_IMPORT_REGIST } from "../service/service_biz/ServiceS0438_IMPORT_REGIST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_ORDER_SHIP = {
    STATUS_CD: "",
    INVOICE_NO: "",
    LICENSE_NO: "",
    BUYER_CD: "",
    S_SHIP_DATE: "",
    E_SHIP_DATE: "",
    KIND: "",
    REMARK: "",
    VENDOR_CD: "",
};

const emptyQRY_KSV_ORDER_SHIP1 = {
    ORDER_CD: "",
};

const emptyEDT_KSV_ORDER_SHIP = {
    STATUS_CD: "",
    STATUS_NAME: "",
    CONFIRM_USER: "",
    LICENSE_DATE: "",
    LICENSE_NO: "",
    REMARK: "",
    IMPORT_FREIGHT_AMT: "",
    IMPORT_CLEARANCE_AMT: "",
    IMPORT_DUTY_AMT: "",
    IMPORT_HANDLING_AMT: "",
    TOTAL_IMPORT_COST: "",
    DUTY_ITEM: "",
    RETURN_REMARK: "",
    EXPORT_DATE: "",
    EXPORT_NO: "",
    RETURN_DATE: "",
    RETURN_AMT: "0",
    NOT_RETURN_TAX: "1",
};

const S0438_IMPORT_REGIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0438_IMPORT_REGISTRef = useRef(null);
    if (!serviceS0438_IMPORT_REGISTRef.current) serviceS0438_IMPORT_REGISTRef.current = new ServiceS0438_IMPORT_REGIST();
    const serviceS0438_IMPORT_REGIST = serviceS0438_IMPORT_REGISTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

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

        setLoadingTBL_KSV_ORDER_SHIP(true);

        // 2
        serviceS0438_IMPORT_REGIST.mgrQuery_LIST_1(_tData).then((data) => {
            setLoadingTBL_KSV_ORDER_SHIP(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray2 = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_ORDER_SHIP(tArray2);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        // search_CODE();
    };

    const search_LIST_4 = (argData) => {
        var tObj = {};
        tObj.INCOME_NO = argData;

        setDatasTBL_KSV_ORDER_SHIP1([]);
        setSelectedTBL_KSV_ORDER_SHIP1([]);

        // 3
        serviceS0438_IMPORT_REGIST.mgrQuery_LIST_4(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = [];
                data.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tArray.push(tObj);
                });
                setDatasTBL_KSV_ORDER_SHIP1(tArray);
                setDataTBL_KSV_ORDER_SHIP1(tArray[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
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
        serviceS0438_IMPORT_REGIST.mgrQuery_LIST_3(tInObj).then((data) => {
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

    const process_IMPORT_REGIST = () => {
        if (selectedTBL_KSV_ORDER_SHIP.length <= 0) {
            alert("작업할 데이터를 선택하세요.<br><br>Select the data you want to work with.");
            return;
        }

        var _tInput0 = { ...selectedTBL_KSV_ORDER_SHIP[0] };
        delete _tInput0.__typename;
        delete _tInput0.id;

        if (_tInput0.STATUS_CD === "End") {
            alert(
                "이미 End(전표처리 또는 Cost Confirm이 완료)처리가 되어 수정 할 수 없습니다.",
            );
            return;
        }

        process_IMPORT_REGIST_Sub();
    };

    const process_IMPORT_REGIST_Sub = () => {
        var _tInput0 = { ...selectedTBL_KSV_ORDER_SHIP[0] };
        delete _tInput0.__typename;
        delete _tInput0.id;

        var _tInput1 = { ...dataEDT_KSV_ORDER_SHIP };
        _tInput1.IMPORT_FREIGHT_AMT = _tInput1.IMPORT_FREIGHT_AMT.replaceAll(
            ",",
            "",
        );
        _tInput0.CURR_CD = freightAmtCurr.CD_CODE || "";
        _tInput1.IMPORT_FREIGHT_AMT_CURR = freightAmtCurr.CD_CODE || "";
        _tInput1.IMPORT_CLEARANCE_AMT =
            _tInput1.IMPORT_CLEARANCE_AMT.replaceAll(",", "");
        _tInput1.IMPORT_DUTY_AMT = _tInput1.IMPORT_DUTY_AMT.replaceAll(",", "");
        _tInput1.IMPORT_HANDLING_AMT = _tInput1.IMPORT_HANDLING_AMT.replaceAll(
            ",",
            "",
        );

        setLoadingTBL_KSV_ORDER_SHIP(true);
        serviceS0438_IMPORT_REGIST
            .mgrInsert_IMPORT_REGIST(_tInput0, _tInput1)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            if (data[0].CODE.includes("SUCC")) {
                                setDatasTBL_KSV_ORDER_SHIP([]);
                                search_LIST_1();
                            }
                        }
                    }
                } else {
                    // console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR:Insert Order Ship",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_IMPORT_CANCEL = () => {
        if (selectedTBL_KSV_ORDER_SHIP.length <= 0) return;

        var _tInput0 = { ...selectedTBL_KSV_ORDER_SHIP[0] };
        delete _tInput0.__typename;
        delete _tInput0.id;
        if (_tInput0.LICENSE_NO === "") {
            alert("Import처리가 된것만 Cancel 처리 할 수 있습니다<br><br>You can cancel only those that have been imported.");
            return;
        }

        var _tInput1 = { ...dataEDT_KSV_ORDER_SHIP };

        setDatasTBL_KSV_ORDER_SHIP([]);
        setLoadingTBL_KSV_ORDER_SHIP(true);
        serviceS0438_IMPORT_REGIST
            .mgrDelete_IMPORT_CANCEL(_tInput0, _tInput1)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            search_LIST_1();
                        }
                    }
                } else {
                    // console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR:Insert Order Ship",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_INSERT_EXPORT = () => {
        if (selectedTBL_KSV_ORDER_SHIP.length <= 0) return;

        var _tInput0 = { ...selectedTBL_KSV_ORDER_SHIP[0] };
        delete _tInput0.__typename;
        delete _tInput0.id;
        if (_tInput0.LICENSE_NO === "") {
            alert("Import 처리를 먼저 하십시요.<br><br>Please do the import process first.");
            return;
        }

        var _tInput1 = { ...dataEDT_KSV_ORDER_SHIP };

        setDatasTBL_KSV_ORDER_SHIP([]);
        setLoadingTBL_KSV_ORDER_SHIP(true);
        serviceS0438_IMPORT_REGIST
            .mgrInsert_INSERT_EXPORT(_tInput0, _tInput1)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            search_LIST_1();
                        }
                    }
                } else {
                    // console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR:Insert Order Ship",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_PROCESS_RETURN = () => {
        if (selectedTBL_KSV_ORDER_SHIP.length <= 0) return;

        var _tInput0 = { ...selectedTBL_KSV_ORDER_SHIP[0] };
        delete _tInput0.__typename;
        delete _tInput0.id;
        if (_tInput0.LICENSE_NO === "") {
            alert("Import 처리를 먼저 하십시요.<br><br>Please do the import process first.");
            return;
        }

        var _tInput1 = { ...dataEDT_KSV_ORDER_SHIP };

        setDatasTBL_KSV_ORDER_SHIP([]);
        setLoadingTBL_KSV_ORDER_SHIP(true);
        serviceS0438_IMPORT_REGIST
            .mgrInsert_PROCESS_RETURN(_tInput0, _tInput1)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            search_LIST_1();
                        }
                    }
                } else {
                    // console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
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

    const [
        datasQRY_KSV_ORDER_SHIP_BUYER_CD,
        setDatasQRY_KSV_ORDER_SHIP_BUYER_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_SHIP_BUYER_CD,
        setDataQRY_KSV_ORDER_SHIP_BUYER_CD,
    ] = useState({});

    const onInputChangeQRY_KSV_ORDER_SHIP_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

    const onInputChangeQRY_KSV_ORDER_SHIP_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

    const onInputChangeQRY_KSV_ORDER_SHIP_VENDOR_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

    const [datasQRY_KSV_ORDER_SHIP_KIND, setDatasQRY_KSV_ORDER_SHIP_KIND] =
        useState([]);
    const [dataQRY_KSV_ORDER_SHIP_KIND, setDataQRY_KSV_ORDER_SHIP_KIND] =
        useState({});

    const onDropdownChangeQRY_KSV_ORDER_SHIP_KIND = (e, name) => {
        let val = (e.value && e.value.KIND) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
        setDataQRY_KSV_ORDER_SHIP_KIND(e.value);
    };

    const [
        datasQRY_KSV_ORDER_SHIP_STATUS_CD,
        setDatasQRY_KSV_ORDER_SHIP_STATUS_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_SHIP_STATUS_CD,
        setDataQRY_KSV_ORDER_SHIP_STATUS_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_SHIP_STATUS_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
        setDataQRY_KSV_ORDER_SHIP_STATUS_CD(e.value);
    };

    const onInputChangeQRY_KSV_ORDER_SHIP_LICENSE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

    const onInputChangeQRY_KSV_ORDER_SHIP_INVOICE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

    const onCalChangeQRY_KSV_ORDER_SHIP_S_SHIP_DATE = (e, name) => {
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

    const onCalChangeQRY_KSV_ORDER_SHIP_E_SHIP_DATE = (e, name) => {
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

    const datasetEDT_KSV_ORDER_SHIP = (argData) => {
        var tObj = { ...dataEDT_KSV_ORDER_SHIP };
        tObj.STATUS_CD = argData.STATUS_CD;
        tObj.STATUS_NAME = argData.STATUS_CD;
        tObj.CONFIRM_USER = argData.CONFIRM_USER;
        tObj.LICENSE_DATE = argData.LICENSE_DATE;
        tObj.LICENSE_NO = argData.LICENSE_NO;
        tObj.REMARK = argData.REMARK;
        tObj.IMPORT_FREIGHT_AMT = serviceLib.numComAndFix(
            argData.IMPORT_FREIGHT_AMT1,
            2,
        );
        tObj.IMPORT_CLEARANCE_AMT = serviceLib.numComAndFix(
            argData.IMPORT_CLEARANCE_AMT1,
            2,
        );
        tObj.IMPORT_DUTY_AMT = serviceLib.numComAndFix(
            argData.IMPORT_DUTY_AMT,
            2,
        );

        var tHandlingAmt =
            parseFloat(argData.IMP_TOT_AMT) -
            parseFloat(argData.IMPORT_FREIGHT_AMT) -
            parseFloat(argData.IMPORT_CLEARANCE_AMT) -
            parseFloat(argData.IMPORT_DUTY_AMT);
        // tObj.IMPORT_HANDLING_AMT = serviceLib.numComAndFix(argData.IMPORT_HANDLING_AMT);
        tObj.IMPORT_HANDLING_AMT = serviceLib.numComAndFix(tHandlingAmt, 2);
        tObj.TOTAL_IMPORT_COST = serviceLib.numComAndFix(
            argData.IMP_TOT_AMT,
            2,
        );

        tObj.DUTY_ITEM = argData.DUTY_ITEM;
        tObj.RETURN_REMARK = argData.RETURN_REMARK;
        tObj.EXPORT_DATE = "";
        tObj.EXPORT_NO = "";
        tObj.RETURN_DATE = "";
        tObj.RETURN_AMT = "";
        tObj.NOT_RETURN_TAX = "1";
        setDataEDT_KSV_ORDER_SHIP(tObj);
    };

    const [disable_RETURN_TAX, setDisable_RETURN_TAX] = useState(true);
    const onCheckboxChangeEDT_KSV_ORDER_SHIP_NOT_RETURN_TAX = (e, name) => {
        let val = "";
        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };
        if (e.checked) {
            val = "1";
            setDisable_RETURN_TAX(true);
        } else {
            val = "0";
            setDisable_RETURN_TAX(false);
        }
        _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_DUTY_ITEM = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_TOTAL_IMPORT_COST = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_RETURN_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_EXPORT_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_RETURN_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_STATUS_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

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

    const onInputChangeEDT_KSV_ORDER_SHIP_LICENSE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_IMPORT_FREIGHT_AMT = (e, name) => {
        let val = e.target.value ?? "";

        if (!/^\d*\.?\d*$/.test(val)) return;

        let _data = { ...dataEDT_KSV_ORDER_SHIP };
        _data[name] = val;

        const toNumber = (v) => parseFloat((v || "0").replaceAll(",", "")) || 0;

        const total =
            toNumber(_data.IMPORT_FREIGHT_AMT) +
            toNumber(_data.IMPORT_CLEARANCE_AMT) +
            toNumber(_data.IMPORT_DUTY_AMT) +
            toNumber(_data.IMPORT_HANDLING_AMT);

        _data.TOTAL_IMPORT_COST = total.toString();

        setDataEDT_KSV_ORDER_SHIP(_data);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_IMPORT_CLEARANCE_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };
        let argData = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = Number(
                val.replaceAll(",", ""),
            ).toLocaleString();
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        var tmpVal = String(
            parseFloat(argData.IMPORT_FREIGHT_AMT.replaceAll(",", "")) +
                parseFloat(
                    _dataEDT_KSV_ORDER_SHIP[`${name}`].replaceAll(",", ""),
                ) +
                parseFloat(argData.IMPORT_DUTY_AMT.replaceAll(",", "")) +
                parseFloat(argData.IMPORT_HANDLING_AMT.replaceAll(",", "")),
        );
        _dataEDT_KSV_ORDER_SHIP[`TOTAL_IMPORT_COST`] = tmpVal;

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_IMPORT_DUTY_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };
        let argData = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = Number(
                val.replaceAll(",", ""),
            ).toLocaleString();
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        var tmpVal = String(
            parseFloat(argData.IMPORT_FREIGHT_AMT.replaceAll(",", "")) +
                parseFloat(argData.IMPORT_CLEARANCE_AMT.replaceAll(",", "")) +
                parseFloat(
                    _dataEDT_KSV_ORDER_SHIP[`${name}`].replaceAll(",", ""),
                ) +
                parseFloat(argData.IMPORT_HANDLING_AMT.replaceAll(",", "")),
        );
        _dataEDT_KSV_ORDER_SHIP[`TOTAL_IMPORT_COST`] = tmpVal;

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_IMPORT_HANDLING_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };
        let argData = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = Number(
                val.replaceAll(",", ""),
            ).toLocaleString();
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        var tmpVal = String(
            parseFloat(argData.IMPORT_FREIGHT_AMT.replaceAll(",", "")) +
                parseFloat(argData.IMPORT_CLEARANCE_AMT.replaceAll(",", "")) +
                parseFloat(argData.IMPORT_DUTY_AMT.replaceAll(",", "")) +
                parseFloat(
                    _dataEDT_KSV_ORDER_SHIP[`${name}`].replaceAll(",", ""),
                ),
        );
        _dataEDT_KSV_ORDER_SHIP[`TOTAL_IMPORT_COST`] = tmpVal;

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onCalChangeEDT_KSV_ORDER_SHIP_LICENSE_DATE = (e, name) => {
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

    const onCalChangeEDT_KSV_ORDER_SHIP_EXPORT_DATE = (e, name) => {
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

    const onCalChangeEDT_KSV_ORDER_SHIP_RETURN_DATE = (e, name) => {
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

    const [loadingTBL_KSV_ORDER_SHIP, setLoadingTBL_KSV_ORDER_SHIP] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_SHIP

    const onRowClick1TBL_KSV_ORDER_SHIP = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = { ...argData0[0] };
        } else {
            argData = { ...argData0 };
        }

        let argTBL_KSV_ORDER_SHIP = argData;

        setDataTBL_KSV_ORDER_SHIP(argTBL_KSV_ORDER_SHIP);

        if (argData.KIND === "제품수입") {
            argData.NOT_RETURN_TAX = "1";
            setDisable_RETURN_TAX(true);
        } else {
            argData.NOT_RETURN_TAX = "0";
            setDisable_RETURN_TAX(false);
        }

        datasetEDT_KSV_ORDER_SHIP(argData);

        if (argData.LICENSE_NO !== "" && argData.KIND === "자재수입")
            search_LIST_4(argData.LICENSE_NO);
    };

    const onRowClickTBL_KSV_ORDER_SHIP = (event) => {
        let argTBL_KSV_ORDER_SHIP = event.data;
        if (flagSelectModeTBL_KSV_ORDER_SHIP) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_SHIP
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
    const [loadingTBL_KSV_ORDER_SHIP1, setLoadingTBL_KSV_ORDER_SHIP1] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_SHIP1

    const editTBL_KSV_ORDER_SHIP1 = (argData) => {
        var tObj = { ...dataEDT_KSV_ORDER_SHIP };
        tObj.EXPORT_NO = argData.EXPORT_NO;
        tObj.EXPORT_DATE = argData.EXPORT_DATE;
        tObj.RETURN_DATE = argData.RETURN_DATE;
        tObj.RETURN_AMT = argData.RETURN_AMT;
        setDataEDT_KSV_ORDER_SHIP(tObj);
    };

    const onRowClick1TBL_KSV_ORDER_SHIP1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_SHIP1 = argData;
        editTBL_KSV_ORDER_SHIP1(argTBL_KSV_ORDER_SHIP1);
        setDataTBL_KSV_ORDER_SHIP1(argTBL_KSV_ORDER_SHIP1);
    };

    const onRowClickTBL_KSV_ORDER_SHIP1 = (event) => {
        let argTBL_KSV_ORDER_SHIP1 = event.data;
        if (flagSelectModeTBL_KSV_ORDER_SHIP1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_SHIP1
    };

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

    const [datasFreightAmtCurr, setDatasFreightAmtCurr] = useState([]);
    const [freightAmtCurr, setFreightAmtCurr] = useState("");
    useEffect(() => {
        var tRetDate = serviceLib.getCurrDate().substring(0, 8);

        var _tObj = {};
        _tObj.BUYER_CD = "";

        serviceS0438_IMPORT_REGIST.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_ORDER_SHIP_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_ORDER_SHIP_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_ORDER_SHIP_STATUS_CD(data.STATUS_CD);
                setDataQRY_KSV_ORDER_SHIP_STATUS_CD(data.STATUS_CD[0]);

                setDatasQRY_KSV_ORDER_SHIP_KIND(data.KIND);
                setDataQRY_KSV_ORDER_SHIP_KIND(data.KIND[0]);

                setDatasFreightAmtCurr(data.CURR_CD);
                setFreightAmtCurr(data.CURR_CD[9]); // KRW

                var tObj0 = { ...dataQRY_KSV_ORDER_SHIP };
                tObj0.S_SHIP_DATE = `${tRetDate.substring(0, 4)}0101`;
                tObj0.E_SHIP_DATE = `${tRetDate}`;
                setDataQRY_KSV_ORDER_SHIP(tObj0);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        // search_LIST_1();
    }, []);

    const blankFn = () => {};

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
                style={{ width: "123rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Status</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <Dropdown
                            style={{ width: "11rem" }}
                            id="id_ORDER_CD"
                            value={dataQRY_KSV_ORDER_SHIP_STATUS_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_SHIP_STATUS_CD(
                                    e,
                                    "STATUS_CD",
                                )
                            }
                            options={datasQRY_KSV_ORDER_SHIP_STATUS_CD}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Kind</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <Dropdown
                            style={{ width: "11rem" }}
                            id="id_ORDER_CD"
                            value={dataQRY_KSV_ORDER_SHIP_KIND}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_SHIP_KIND(
                                    e,
                                    "KIND",
                                )
                            }
                            options={datasQRY_KSV_ORDER_SHIP_KIND}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>C/I#</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <InputText
                            style={{ width: "11rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_ORDER_SHIP.INVOICE_NO}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_SHIP_INVOICE_NO(
                                    e,
                                    "INVOICE_NO",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Ship Date</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "11rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_DUE_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_ORDER_SHIP.S_SHIP_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_SHIP_S_SHIP_DATE(
                                    e,
                                    "S_SHIP_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "11rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_DUE_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_ORDER_SHIP.E_SHIP_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_SHIP_E_SHIP_DATE(
                                    e,
                                    "E_SHIP_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "23rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Tooltip
                            className="menuCodeTooltip"
                            target={`#btnSearch`}
                            content={`Alt+S`}
                            position="bottom"
                        />

                        <Button
                            style={{ width: "12rem" }}
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

                <span className="af-span-3" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>License#</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <InputText
                            style={{ width: "11rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_ORDER_SHIP.LICENSE_NO}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_SHIP_LICENSE_NO(
                                    e,
                                    "LICENSE_NO",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Buyer#</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <InputText
                            style={{ width: "11rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_ORDER_SHIP.BUYER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_SHIP_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Supplier</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <InputText
                            style={{ width: "11rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_ORDER_SHIP.VENDOR_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_SHIP_VENDOR_CD(
                                    e,
                                    "VENDOR_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Remark</p>
                    <div className="af-span-div" style={{ width: "52rem" }}>
                        <InputText
                            style={{ width: "52rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_ORDER_SHIP.REMARK}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_SHIP_REMARK(
                                    e,
                                    "REMARK",
                                )
                            }
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "35.5rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_SHIP}
                    size="small"
                    value={datasTBL_KSV_ORDER_SHIP}
                    loading={loadingTBL_KSV_ORDER_SHIP}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_ORDER_SHIP}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_ORDER_SHIP(true);
                        setSelectedTBL_KSV_ORDER_SHIP(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_ORDER_SHIP.length,
                        );
                        onRowClick1TBL_KSV_ORDER_SHIP(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_SHIP}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage="" //header={headerTBL_KSV_ORDER_SHIP}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="387px"
                >
                    <AFColumn field="KIND" header="Kind" style={{ width: "6rem" }} ></AFColumn>
                    {/*<AFColumn field="STATUS_CD" header="Status" style={{ width: '6rem' }} ></AFColumn>*/}
                    <AFColumn field="FACTORY_NAME" header="Factory" style={{ width: "6rem" }} ></AFColumn>
                    <AFColumn field="INVOICE_NO" header="C/I#" style={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="BUYER_CD" header="Buyer#" style={{ width: "4rem" }} ></AFColumn>
                    <AFColumn field="SHIP_DATE" header="Ship Date" style={{ width: "8rem" }} body={(rowData) => serviceLib.dateFormat(rowData.SHIP_DATE) } ></AFColumn>
                    <AFColumn field="NAT_CD" header="CountryCd" style={{ width: "3rem" }} hidden ></AFColumn>
                    <AFColumn field="NAT_NAME" header="Country" style={{ width: "6rem" }} ></AFColumn>
                    <AFColumn field="QTY" header="Ship Qty" style={{ width: "8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.formatNumber(rowData.QTY)} ></AFColumn>
                    <AFColumn field="SHIP_PRICE" header="Price" style={{ width: "8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.formatNumber(rowData.SHIP_PRICE, 4) } ></AFColumn>

                    <AFColumn field="IMP_ORD_AMT" header="Ord Amount" style={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.formatNumber(rowData.IMP_ORD_AMT, 4) } ></AFColumn>
                    <AFColumn field="IMP_TOT_AMT" header="Tot Amount" style={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.formatNumber(rowData.IMP_TOT_AMT, 4) } ></AFColumn>
                    <AFColumn field="CURR_CD" header="Curr" style={{ width: "4rem" }} ></AFColumn>
                    <AFColumn field="DELIVERY_TYPE_N" header="Ship Mode" style={{ width: "6rem" }} ></AFColumn>

                    <AFColumn field="LICENSE_NO" header="License#" style={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="LICENSE_DATE" header="License Date" style={{ width: "8rem" }} body={(rowData) => serviceLib.dateFormat(rowData.LICENSE_DATE) } ></AFColumn>
                    <AFColumn field="IMPORT_FREIGHT_AMT" header="Import Freight" style={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.formatNumber( rowData.IMPORT_FREIGHT_AMT, 4, ) } ></AFColumn>
                    <AFColumn field="IMPORT_CLEARANCE_AMT" header="Import Clearance" style={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.formatNumber( rowData.IMPORT_CLEARANCE_AMT, 4, ) } ></AFColumn>
                    <AFColumn field="IMPORT_DUTY_AMT" header="Import Duty" style={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.formatNumber(rowData.IMPORT_DUTY_AMT, 4) } ></AFColumn>
                    <AFColumn field="DOCU_NO" header="Docu#" style={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "70rem", height: "19rem" }}
            >
                <span className="af-span-3-0" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Status</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <InputText
                            disabled
                            style={{ width: "11rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.STATUS_NAME}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_STATUS_NAME(
                                    e,
                                    "STATUS_NAME",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Freight</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.IMPORT_FREIGHT_AMT}
                            className="text-right"
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_IMPORT_FREIGHT_AMT(
                                    e,
                                    "IMPORT_FREIGHT_AMT",
                                )
                            }
                        />
                    </div>
                    <Dropdown
                        className="text-center"
                        style={{ width: "6rem" }}
                        id="id_PO_CD"
                        filter
                        value={freightAmtCurr}
                        onChange={(e) => setFreightAmtCurr(e.target.value)}
                        options={datasFreightAmtCurr}
                        optionLabel="CD_NAME"
                        placeholder=""
                    ></Dropdown>
                </span>
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Save"
                            className="p-button-text"
                            onClick={process_IMPORT_REGIST}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>License Date</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "11rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_IN_DATE"
                            value={changeDateVal(
                                dataEDT_KSV_ORDER_SHIP.LICENSE_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_ORDER_SHIP_LICENSE_DATE(
                                    e,
                                    "LICENSE_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Clearance</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.IMPORT_CLEARANCE_AMT}
                            className="text-right"
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_IMPORT_CLEARANCE_AMT(
                                    e,
                                    "IMPORT_CLEARANCE_AMT",
                                )
                            }
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "4rem" }}>KRW</p>
                </span>
                <span className="af-span-3" style={{ width: "20rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Cancel"
                            className="p-button-text"
                            onClick={process_IMPORT_CANCEL}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>License No</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <InputText
                            style={{ width: "11rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.LICENSE_NO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_LICENSE_NO(
                                    e,
                                    "LICENSE_NO",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Duty</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.IMPORT_DUTY_AMT}
                            className="text-right"
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_IMPORT_DUTY_AMT(
                                    e,
                                    "IMPORT_DUTY_AMT",
                                )
                            }
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "4rem" }}>KRW</p>
                </span>
                <span className="af-span-3" style={{ width: "20rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Confirm User</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            disabled
                            style={{ width: "10rem" }}
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
                <span className="af-span-3" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Handling</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.IMPORT_HANDLING_AMT}
                            className="text-right"
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_IMPORT_HANDLING_AMT(
                                    e,
                                    "IMPORT_HANDLING_AMT",
                                )
                            }
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "4rem" }}>KRW</p>
                </span>
                <span className="af-span-3" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}> </p>
                </span>

                <span className="af-span-3" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}> </p>
                </span>
                <span className="af-span-3" style={{ width: "40rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Total Cost</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            disabled
                            style={{ width: "10rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.TOTAL_IMPORT_COST}
                            className="text-right"
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_TOTAL_IMPORT_COST(
                                    e,
                                    "TOTAL_IMPORT_COST",
                                )
                            }
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "4rem" }}>KRW</p>
                </span>

                <span className="af-span-3" style={{ width: "69rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Import Remark</p>
                    <div className="af-span-div" style={{ width: "51rem" }}>
                        <InputText
                            style={{ width: "35rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.REMARK}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_REMARK(
                                    e,
                                    "REMARK",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "9rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>환급불가</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_SINGAPORE_COMBINE"
                            checked={changeCheckBoxVal(
                                dataEDT_KSV_ORDER_SHIP.NOT_RETURN_TAX,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeEDT_KSV_ORDER_SHIP_NOT_RETURN_TAX(
                                    e,
                                    "NOT_RETURN_TAX",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "59rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>사유</p>
                    <div className="af-span-div" style={{ width: "51rem" }}>
                        <InputText
                            disabled={disable_RETURN_TAX}
                            style={{ width: "51rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.DUTY_ITEM}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_DUTY_ITEM(
                                    e,
                                    "DUTY_ITEM",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "9rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}> </p>
                </span>
                <span className="af-span-3" style={{ width: "59rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>품목</p>
                    <div className="af-span-div" style={{ width: "51rem" }}>
                        <InputText
                            disabled={disable_RETURN_TAX}
                            style={{ width: "51rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.RETURN_REMARK}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_RETURN_REMARK(
                                    e,
                                    "RETURN_REMARK",
                                )
                            }
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-second"
                style={{ width: "52rem", height: "19rem", marginLeft: "12px" }}
            >
                <span className="af-span-3" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>수출일</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <Calendar
                            showButtonBar
                            disabled={disable_RETURN_TAX}
                            style={{ width: "11rem" }}
                            dateFormat="yymmdd"
                            id="id_IN_DATE"
                            value={changeDateVal(
                                dataEDT_KSV_ORDER_SHIP.EXPORT_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_ORDER_SHIP_EXPORT_DATE(
                                    e,
                                    "EXPORT_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>수출C/I#</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <InputText
                            disabled={disable_RETURN_TAX}
                            style={{ width: "11rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.EXPORT_NO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_EXPORT_NO(
                                    e,
                                    "EXPORT_NO",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "9rem" }}>
                    <div className="af-span-div-btn" style={{ width: "8rem" }}>
                        <Button
                            disabled={disable_RETURN_TAX}
                            style={{ width: "9rem" }}
                            label="수출등록"
                            className="p-button-text"
                            onClick={process_INSERT_EXPORT}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>환급일</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <Calendar
                            showButtonBar
                            disabled={disable_RETURN_TAX}
                            style={{ width: "11rem" }}
                            dateFormat="yymmdd"
                            id="id_IN_DATE"
                            value={changeDateVal(
                                dataEDT_KSV_ORDER_SHIP.RETURN_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_ORDER_SHIP_RETURN_DATE(
                                    e,
                                    "RETURN_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>환급액</p>
                    <div className="af-span-div" style={{ width: "7rem" }}>
                        <InputText
                            disabled={disable_RETURN_TAX}
                            style={{ width: "7rem" }}
                            id="id_PO_CD"
                            value={serviceLib.formatNumber(
                                dataEDT_KSV_ORDER_SHIP.RETURN_AMT,
                                4,
                            )}
                            className="text-right"
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_RETURN_AMT(
                                    e,
                                    "RETURN_AMT",
                                )
                            }
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "3rem" }}>KRW</p>
                </span>
                <span className="af-span-3" style={{ width: "9rem" }}>
                    <div className="af-span-div-btn" style={{ width: "8rem" }}>
                        <Button
                            disabled={disable_RETURN_TAX}
                            style={{ width: "9rem" }}
                            label="환급완료"
                            className="p-button-text"
                            onClick={process_PROCESS_RETURN}
                        />
                    </div>
                </span>

                <div style={{ marginTop: "5px" }}>
                    <DataTable
                        ref={dt_TBL_KSV_ORDER_SHIP1}
                        size="small"
                        value={datasTBL_KSV_ORDER_SHIP1}
                        loading={loadingTBL_KSV_ORDER_SHIP1}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_ORDER_SHIP1}
                        onSelectionChange={(e) => {
                            setSelectedTBL_KSV_ORDER_SHIP1(e.value);
                            onRowClick1TBL_KSV_ORDER_SHIP1(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_ORDER_SHIP1}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage="" //header={headerTBL_KSV_ORDER_SHIP}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="149px"
                    >
                        <Column
                            field="EXPORT_DATE"
                            header="수출일"
                            style={{ width: "10rem" }}
                        ></Column>
                        <Column
                            field="EXPORT_NO"
                            header="수출Invoice#"
                            style={{ width: "10rem" }}
                        ></Column>
                        <Column
                            field="RETURN_DATE"
                            header="환급일"
                            style={{ width: "10rem" }}
                        ></Column>
                        <Column
                            field="RETURN_AMT"
                            header="환급액"
                            className="text-right"
                            body={(rowData) =>
                                serviceLib.formatNumber(rowData.RETURN_AMT, 4)
                            }
                            style={{ width: "10rem" }}
                        ></Column>
                    </DataTable>
                </div>
            </div>

            <Toast ref={toast} />

            <Dialog
                visible={createDialog}
                position="mid-center"
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
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Search"
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
                        scrollHeight="30rem"
                    >
                        <AFColumn field="ORDER_CD" header="Order" style={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="STYLE_NAME" header="Style" style={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="COLOR" header="Color" style={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="TOT_CNT" header="Order Qty" style={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="SHIP_CNT" header="Ship Qty" style={{ width: "10rem" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0438_IMPORT_REGIST, comparisonFn);
