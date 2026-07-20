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
import { ServiceS0505_FACTORY_INPUT_RECORD } from "../service/service_biz/ServiceS0505_FACTORY_INPUT_RECORD";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_STOCK_FACIN = {
    PO_NO: "",
    DELIVERY: "",
    VENDOR_CD: "",
    MATL_NAME: "",
    COLOR: "",
    UNIT: "",
    SPEC: "",
    IN_DELIVERY: "",
};

const emptyTBL_KSV_STOCK_FACIN = {
    id: 0,
    VENDOR_NAME: "",
    PR_NUM: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    CURR_CD: "",
    MATL_PRICE: "",
    ORD_QTY: "",
    STOCK_QTY: "",
    TOT_QTY: "",
    REMARK: "",
    REMARK_BVT: "",
    ERROR: "",
    SHORT_AGE: "",
    OTHER: "",
    FACIN_VAL: "",
    REG_USER: "",
    INPUT: "",
    VENDOR_TYPE: "",
    PAY_TERM: "",
};

const S0505_FACTORY_INPUT_RECORD = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0505_FACTORY_INPUT_RECORD =
        new ServiceS0505_FACTORY_INPUT_RECORD();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    //
    const [data_HEADER_STR, setData_HEADER_STR] = useState([]);

    const dynamicColumns_1 = data_HEADER_STR.map((col, i) => {
        var tHeader = `id_msg_${col}_KSV_ORDER_MST_dt`;
        var tHeaderStr = serviceLib.getLocaleMessage(tHeader);
        var tCol = `COL_${i}`;
        return (
            <AFColumn field={tCol} headerClassName="t-header" header={tHeaderStr} style={{ width: "15rem", height: "1.8rem", flexBasis: "auto" }} ></AFColumn>
        );

        // return  <AFColumn field={tCol} header={tHeaderStr} headerStyle={{ width: '10rem',height:'1.8rem' }} bodyStyle={{ width: '10rem',height:'1.8rem' }} editor={(options) => cellEditorKSV_ORDER_MEM(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_MEM}></AFColumn>
        //       return  <AFColumn field={col.field} header={tHeaderStr} headerStyle={{ width: '10rem',height:'1.8rem' }} bodyStyle={{ width: '10rem',height:'1.8rem' }} ></AFColumn>
    });

    const search_LIST_1 = () => {
        var _tData = { ...dataQRY_KSV_STOCK_FACIN };

        setDatasTBL_KSV_STOCK_FACIN([]);
        setSelectedTBL_KSV_STOCK_FACIN([]);

        serviceS0505_FACTORY_INPUT_RECORD
            .mgrQuery_LIST_1(_tData)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );

                    // COL: 16, tot_qty- 17, etc_qty1, 2, 3, 4 -18/19/20/21, data2.length
                    var tIdx0 = 1;
                    var tArray = [...data.DATA1];

                    var tArray2 = [];
                    var tIdx = 0;
                    for (tIdx = 0; tIdx < tArray.length; tIdx++) {
                        var tOne = { ...tArray[tIdx] };

                        // IN_TOT
                        let tOne1 = data.DATA4.filter((col, i) => {
                            if (col.MATL_CD === tOne.MATL_CD) return col;
                        });
                        if (tOne1.length > 0) tOne.IN_TOT = tOne1[0].IN_QTY;
                        else tOne.IN_TOT = 0;

                        var tInputBal =
                            tOne.TOT_CNT - (tOne.IN_TOT + tOne.STOCK_QTY);
                        if (tInputBal < tOne.STS_OUT_QTY) tOne.INPUT = 0;
                        else tOne.INPUT = tOne.STS_OUT_QTY;
                        tOne.FACIN_VAL = tInputBal;

                        // ETC1
                        tOne.ETC_ERROR = 0;
                        tOne.ETC_SHORTAGE = 0;
                        tOne.ETC_OTHERS = 0;
                        tOne1 = data.DATA5.filter((col, i) => {
                            if (col.MATL_CD === tOne.MATL_CD) return col;
                        });
                        tOne1.forEach((col, i) => {
                            if (col.ETC_TYPE === "Error")
                                tOne.ETC_ERROR = col.IN_QTY;
                            if (col.ETC_TYPE === "Shortage")
                                tOne.ETC_SHORTAGE = col.IN_QTY;
                            if (col.ETC_TYPE === "Others")
                                tOne.ETC_OTHERS = col.IN_QTY;
                        });
                        tOne.ETC_GUBUN = "INPUT";

                        var tHeaderStr = [];
                        var tPos = 0;
                        data.DATA2.forEach((col, i) => {
                            var tHeader = col.IN_DATE + ":" + col.DELIVERY;
                            tHeaderStr.push(tHeader);
                            var tCol = `COL_${tPos}`;
                            tPos += 1;
                            tOne[`${tCol}`] = 0;
                        });
                        setData_HEADER_STR(tHeaderStr);

                        var tData0 = data.DATA3.filter((col, i) => {
                            if (col.MATL_CD === tOne.MATL_CD) return col;
                        });

                        var tIdx1 = 0;
                        for (tIdx1 = 0; tIdx1 < tData0.length; tIdx1++) {
                            var tOne2 = tData0[tIdx1];
                            var tFind = -1;
                            data.DATA2.forEach((col, i) => {
                                if (
                                    tOne2.IN_DATE === col.IN_DATE &&
                                    tOne2.DELIVERY === col.DELIVERY
                                )
                                    tFind = i;
                            });
                            if (tFind >= 0) {
                                var tColName = `COL_${tFind}`;
                                tOne[`${tColName}`] = tOne2.IN_QTY;
                            }
                        }
                        tOne.id = tIdx + 1;
                        tArray2.push(tOne);
                    }
                    setDatasTBL_KSV_STOCK_FACIN(tArray2);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_INSERT_FACIN = () => {
        var _tData = [...datasTBL_KSV_STOCK_FACIN];
        var tArray = [];
        _tData.forEach((col, i) => {
            var tObj = {};
            tObj.PO_CD = dataQRY_KSV_STOCK_FACIN.PO_NO;
            tObj.MATL_CD = col.MATL_CD;
            tObj.IN_DATE = "";
            tObj.IN_QTY = col.INPUT;
            tObj.DELIVERY = dataQRY_KSV_STOCK_FACIN.IN_DELIVERY;
            tObj.USER_ID = serviceLib.getUserInfo().USER_ID;
            if (tObj.IN_QTY > 0) tArray.push(tObj);
        });

        serviceS0505_FACTORY_INPUT_RECORD
            .mgrInsert_INSERT_FACIN(tArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "SUCCEED:Insert Facin",
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
                        summary: "ERROR:Insert Facin",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    /* QRY KSV_STOCK_FACEIN*/
    const [dataQRY_KSV_STOCK_FACIN, setDataQRY_KSV_STOCK_FACIN] = useState(
        emptyQRY_KSV_STOCK_FACIN,
    );

    const onInputChangeQRY_KSV_STOCK_FACIN_PO_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
    };

    const [
        datasQRY_KSV_STOCK_FACIN_DELIVERY,
        setDatasQRY_KSV_STOCK_FACIN_DELIVERY,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_FACIN_DELIVERY,
        setDataQRY_KSV_STOCK_FACIN_DELIVERY,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_FACIN_DELIVERY = (e, name) => {
        let val = (e.value && e.value.DELIVERY) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
        setDataQRY_KSV_STOCK_FACIN_DELIVERY(e.value);
    };

    const [
        datasQRY_KSV_STOCK_FACIN_VENDOR_CD,
        setDatasQRY_KSV_STOCK_FACIN_VENDOR_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_FACIN_VENDOR_CD,
        setDataQRY_KSV_STOCK_FACIN_VENDOR_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_FACIN_VENDOR_CD = (e, name) => {
        let val = (e.value && e.value.VENDOR_CD) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
        setDataQRY_KSV_STOCK_FACIN_VENDOR_CD(e.value);
    };

    const onInputChangeQRY_KSV_STOCK_FACIN_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
    };

    const onInputChangeQRY_KSV_STOCK_FACIN_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
    };

    const [datasQRY_KSV_STOCK_FACIN_UNIT, setDatasQRY_KSV_STOCK_FACIN_UNIT] =
        useState([]);
    const [dataQRY_KSV_STOCK_FACIN_UNIT, setDataQRY_KSV_STOCK_FACIN_UNIT] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_FACIN_UNIT = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
        setDataQRY_KSV_STOCK_FACIN_UNIT(e.value);
    };

    const onInputChangeQRY_KSV_STOCK_FACIN_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
    };

    const onInputChangeQRY_KSV_STOCK_FACIN_IN_DELIVERY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
    };

    /*TABLE KSV_STOCK_FACIN */
    // DEFINE DATAGRID : TBL_KSV_STOCK_FACIN
    const [datasTBL_KSV_STOCK_FACIN, setDatasTBL_KSV_STOCK_FACIN] = useState(
        [],
    );
    const dt_TBL_KSV_STOCK_FACIN = useRef(null);
    const [dataTBL_KSV_STOCK_FACIN, setDataTBL_KSV_STOCK_FACIN] = useState(
        emptyTBL_KSV_STOCK_FACIN,
    );
    const [selectedTBL_KSV_STOCK_FACIN, setSelectedTBL_KSV_STOCK_FACIN] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_STOCK_FACIN,
        setFlagSelectModeTBL_KSV_STOCK_FACIN,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_STOCK_FACIN

    const onRowClick1TBL_KSV_STOCK_FACIN = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_STOCK_FACIN = argData;

        setDataTBL_KSV_STOCK_FACIN(argTBL_KSV_STOCK_FACIN);
    };

    const onRowClickTBL_KSV_STOCK_FACIN = (event) => {
        let argTBL_KSV_STOCK_FACIN = event.data;
        if (flagSelectModeTBL_KSV_STOCK_FACIN) return;

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_FACIN
    };

    const searchTBL_KSV_STOCK_FACIN = () => {
        clearSelectedTBL_KSV_STOCK_FACIN();

        serviceS0505_FACTORY_INPUT_RECORD
            .mgrQueryTBL_KSV_STOCK_FACIN(dataQRY_KSV_STOCK_FACIN)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_STOCK_FACIN() call => " +
                            data.length,
                    );
                    setDatasTBL_KSV_STOCK_FACIN(data);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_STOCK_FACIN()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_FACIN
    };

    const clearSelectedTBL_KSV_STOCK_FACIN = () => {
        setSelectedTBL_KSV_STOCK_FACIN([]);
        setFlagSelectModeTBL_KSV_STOCK_FACIN(false);
    };

    const exportExcelTBL_KSV_STOCK_FACIN = () => {};

    useEffect(() => {
        var _tObj = {};
        _tObj.PO_CD = "PO23-0229";

        var _tData = { ...dataQRY_KSV_STOCK_FACIN };
        _tData.PO_NO = "PO23-0229";
        setDataQRY_KSV_STOCK_FACIN(_tData);

        serviceS0505_FACTORY_INPUT_RECORD.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.VENDOR_CD.length,
                );

                setDatasQRY_KSV_STOCK_FACIN_DELIVERY(data.DELIVERY);
                setDataQRY_KSV_STOCK_FACIN_DELIVERY(data.DELIVERY[0]);

                setDatasQRY_KSV_STOCK_FACIN_VENDOR_CD(data.VENDOR_CD);
                setDataQRY_KSV_STOCK_FACIN_VENDOR_CD(data.VENDOR_CD[0]);

                setDatasQRY_KSV_STOCK_FACIN_UNIT(data.MATL_UNIT);
                setDataQRY_KSV_STOCK_FACIN_UNIT(data.MATL_UNIT[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    }, []);

    const blankFn = () => {};

    // Support Area

    return (
        <div>
            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "100rem",
                    height: "8rem",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "20rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Po No</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_PO_NO"
                        value={dataQRY_KSV_STOCK_FACIN.PO_NO}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACIN_PO_NO(e, "PO_NO")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Delivery</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_DELIVERY"
                            value={dataQRY_KSV_STOCK_FACIN_DELIVERY}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_FACIN_DELIVERY(
                                    e,
                                    "DELIVERY",
                                )
                            }
                            options={datasQRY_KSV_STOCK_FACIN_DELIVERY}
                            optionLabel="DELIVERY"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "19rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Include End</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "1rem",
                        }}
                    >
                        <Checkbox
                            style={{
                                display: "inline-block",
                                width: "1rem",
                                marginLeft: "0.5rem",
                            }}
                        />
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Supplier</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_VENDOR_CD"
                            value={dataQRY_KSV_STOCK_FACIN_VENDOR_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_FACIN_VENDOR_CD(
                                    e,
                                    "VENDOR_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_FACIN_VENDOR_CD}
                            optionLabel="VENDOR_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "50rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Description</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_MATL_NAME"
                        value={dataQRY_KSV_STOCK_FACIN.MATL_NAME}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACIN_MATL_NAME(
                                e,
                                "MATL_NAME",
                            )
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "24rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Color</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                        id="id_COLOR"
                        value={dataQRY_KSV_STOCK_FACIN.COLOR}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACIN_COLOR(e, "COLOR")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "12rem",
                    }}
                >
                    <p style={{ width: "3rem", display: "inline-block" }}>Unit</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "8rem",
                        }}
                    >
                        <Dropdown
                            id="id_UNIT"
                            value={dataQRY_KSV_STOCK_FACIN_UNIT}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_FACIN_UNIT(
                                    e,
                                    "UNIT",
                                )
                            }
                            options={datasQRY_KSV_STOCK_FACIN_UNIT}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Spec</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_SPEC"
                        value={dataQRY_KSV_STOCK_FACIN.SPEC}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACIN_SPEC(e, "SPEC")
                        }
                    />
                </span>

                <span style={{ display: "inline-block" }}>
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
                        style={{ height: "1.1rem" }}
                        icon="pi pi-search"
                        className="p-button-text"
                        onClick={search_LIST_1}
                    />

                    <Button
                        label="Reset"
                        style={{ height: "1.1rem" }}
                        icon="pi pi-check"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_STOCK_FACIN}
                    />

                    <Button
                        label="Excel"
                        style={{ height: "1.1rem", color: "green" }}
                        icon="pi pi-upload"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_STOCK_FACIN}
                    />
                </span>
            </div>
            <div
                style={{ marginLeft: "1rem", width: "100rem", height: "2rem" }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "19rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>In Date</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            id="id_S_IN_DATE"
                        />
                    </div>
                </span>
                <span style={{ display: "inline-block" }}>
                    <Button
                        label="Factory In (From Packing)"
                        style={{ height: "1.1rem" }}
                        icon="pi pi-check"
                        className="p-button-text"
                        onClick={searchTBL_KSV_STOCK_FACIN}
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Delivery</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_IN_DELIVERY"
                        value={dataQRY_KSV_STOCK_FACIN.IN_DELIVERY}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACIN_IN_DELIVERY(
                                e,
                                "IN_DELIVERY",
                            )
                        }
                    />
                </span>
                <span style={{ display: "inline-block" }}>
                    <Button
                        label="Input"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={process_INSERT_FACIN}
                    />

                    <Button
                        label="Remark(BVT) Update"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={searchTBL_KSV_STOCK_FACIN}
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
                    ref={dt_TBL_KSV_STOCK_FACIN}
                    size="small"
                    value={datasTBL_KSV_STOCK_FACIN}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_STOCK_FACIN}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_STOCK_FACIN(true);
                        setSelectedTBL_KSV_STOCK_FACIN(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_STOCK_FACIN.length,
                        );
                        onRowClick1TBL_KSV_STOCK_FACIN(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_STOCK_FACIN}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 15 }}
                    emptyMessage=" " // header={headerTBL_KSV_STOCK_FACIN}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="28rem"
                >
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PR_NUM" headerClassName="t-header" header="No" style={{ width: "4rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Desc" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName="t-header" header="M price" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="TOT_CNT" headerClassName="t-header" header="Need Qty" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Stock Use" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="IN_TOT" headerClassName="t-header" header="Fac In Tot" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ETC_ERROR" headerClassName="t-header" header="Error" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ETC_SHORTAGE" headerClassName="t-header" header="ShortAge" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ETC_OTHER" headerClassName="t-header" header="Other" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FACIN_VAL" headerClassName="t-header" header="Facin Balance" style={{ width: "9rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="INPUT" headerClassName="t-header" header="Input Qty" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark(STS)" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REMARK_BVT" headerClassName="t-header" header="Remark(BVT)" style={{ width: "9rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="VENDOR_TYPE" headerClassName="t-header" header="Vendor Type" style={{ width: "9rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PAY_TERM" headerClassName="t-header" header="Pay Term" style={{ width: "9rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ETC_GUBUN" headerClassName="t-header" header="-" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    {dynamicColumns_1}
                </AFDataTable>
            </div>

            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "71rem" }}
            >
                <div className="formgrid grid">
                    <div className="field col-6 md:col-6">
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Reset"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Save"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Copy"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </div>
            </div>

            <Divider />

            <div style={{ width: "100rem", height: "30rem" }}>
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "60rem", height: "30rem" }}></div>

                    <div style={{ width: "40rem", height: "30rem" }}></div>
                </div>
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0505_FACTORY_INPUT_RECORD, comparisonFn);
