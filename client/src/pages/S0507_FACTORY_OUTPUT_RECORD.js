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
import { ServiceS0507_FACTORY_OUTPUT_RECORD } from "../service/service_biz/ServiceS0507_FACTORY_OUTPUT_RECORD";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_STOCK_FACOUT = {
    PO_CD: "",
    ORDER_CD: "",
    VENDOR_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
};

const emptyTBL_KSV_STOCK_FACOUT = {
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
    REMAIN: "",
    NEED_QTY: "",
    FACOUT_TOT: "",
    FACOUT_BAL: "",
    OUTPUT: "",
    LIMIT: "",
    MATL_CD1: "",
    MATL_NAME1: "",
    COLOR1: "",
    SPEC1: "",
};

const S0507_FACTORY_OUTPUT_RECORD = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0507_FACTORY_OUTPUT_RECORD =
        new ServiceS0507_FACTORY_OUTPUT_RECORD();

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
            <AFColumn field={tCol} headerClassName="t-header" header={tHeaderStr} style={{ width: "7rem", height: "1.8rem", flexBasis: "auto" }} ></AFColumn>
        );

        // return  <AFColumn field={tCol} header={tHeaderStr} style={{ width: '10rem' ,height:'1.8rem',flexBasis:'auto'}} editor={(options) => cellEditorKSV_ORDER_MEM(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_MEM}></AFColumn>
        //       return  <AFColumn field={col.field} header={tHeaderStr} style={{ width: '10rem' ,height:'1.8rem',flexBasis:'auto'}} ></AFColumn>
    });

    const search_LIST_1 = () => {
        var _tData = { ...dataQRY_KSV_STOCK_FACOUT };

        if (_tData.ORDER_CD === "" || _tData.ORDER_CD === " ") return;

        setDatasTBL_KSV_STOCK_FACOUT([]);
        setSelectedTBL_KSV_STOCK_FACOUT([]);

        serviceS0507_FACTORY_OUTPUT_RECORD
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
                        var tOrderCnt = dataQRY_KSV_STOCK_FACOUT_ORDER_CD.id;
                        tOne.NEED_QTY = parseInt(
                            tOne.ORD_CNT.substring(
                                8 * tOrderCnt,
                                8 * tOrderCnt + 8,
                            ),
                        );
                        tOne.FACOUT_VAL = tOne.FAC_IN_QTY - tOne.FAC_OUT_QTY;
                        tOne.OUT_QTY = 0;
                        if (tOne.FACOUT_VAL > 0) {
                            if (tOne.NEED_QTY - tOne.FAC_ORDER_OUT_QTY > 0)
                                tOne.OUT_QTY =
                                    tOne.NEED_QTY - tOne.FAC_ORDER_OUT_QTY;
                            if (tOne.OUT_QTY > tOne.FACOUT_VAL) {
                                tOne.OUT_QTY = tOne.FACOUT_VAL;
                            }
                        }

                        tOne.ETC_GUBUN = "OUTPUT";

                        var tHeaderStr = [];
                        var tPos = 0;
                        data.OUT_DATE_INFO.forEach((col, i) => {
                            var tHeader = col.OUT_DATE;
                            tHeaderStr.push(tHeader);
                            var tCol = `COL_${tPos}`;
                            tPos += 1;
                            tOne[`${tCol}`] = 0;
                        });
                        setData_HEADER_STR(tHeaderStr);

                        var tData0 = data.ORDER_OUT_QTY.filter((col, i) => {
                            if (col.MATL_CD === tOne.MATL_CD) return col;
                        });

                        var tIdx1 = 0;
                        for (tIdx1 = 0; tIdx1 < tData0.length; tIdx1++) {
                            var tOne2 = tData0[tIdx1];
                            var tFind = -1;
                            data.OUT_DATE_INFO.forEach((col, i) => {
                                if (tOne2.OUT_DATE === col.OUT_DATE) tFind = i;
                            });
                            if (tFind >= 0) {
                                var tColName = `COL_${tFind}`;
                                tOne[`${tColName}`] = tOne2.OUT_QTY;
                            }
                        }
                        tOne.id = tIdx + 1;
                        tArray2.push(tOne);
                    }
                    setDatasTBL_KSV_STOCK_FACOUT(tArray2);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_INSERT_FACOUT = () => {
        var _tData = [...datasTBL_KSV_STOCK_FACOUT];
        var tArray = [];
        _tData.forEach((col, i) => {
            var tObj = {};
            tObj.PO_CD = dataQRY_KSV_STOCK_FACOUT.PO_CD;
            tObj.ORDER_CD = dataQRY_KSV_STOCK_FACOUT.ORDER_CD;
            tObj.OUT_QTY = col.OUT_QTY;
            tObj.MATL_CD = col.MATL_CD;
            tObj.USER_ID = serviceLib.getUserInfo().USER_ID;
            if (tObj.OUT_QTY > 0) tArray.push(tObj);
        });

        serviceS0507_FACTORY_OUTPUT_RECORD
            .mgrInsert_INSERT_FACOUT(tArray)
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

    /*QRY KSV_STOCK_FACOUT */
    const [dataQRY_KSV_STOCK_FACOUT, setDataQRY_KSV_STOCK_FACOUT] = useState(
        emptyQRY_KSV_STOCK_FACOUT,
    );

    const onInputChangeQRY_KSV_STOCK_FACOUT_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACOUT = { ...dataQRY_KSV_STOCK_FACOUT };

        let tTypeVal = _dataQRY_KSV_STOCK_FACOUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACOUT(_dataQRY_KSV_STOCK_FACOUT);
    };

    const [
        datasQRY_KSV_STOCK_FACOUT_ORDER_CD,
        setDatasQRY_KSV_STOCK_FACOUT_ORDER_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_FACOUT_ORDER_CD,
        setDataQRY_KSV_STOCK_FACOUT_ORDER_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_FACOUT_ORDER_CD = (e, name) => {
        let val = (e.value && e.value.ORDER_CD) || "";

        let _dataQRY_KSV_STOCK_FACOUT = { ...dataQRY_KSV_STOCK_FACOUT };

        let tTypeVal = _dataQRY_KSV_STOCK_FACOUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_FACOUT(_dataQRY_KSV_STOCK_FACOUT);
        setDataQRY_KSV_STOCK_FACOUT_ORDER_CD(e.value);
    };

    const [
        datasQRY_KSV_STOCK_FACOUT_VENDOR_CD,
        setDatasQRY_KSV_STOCK_FACOUT_VENDOR_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_FACOUT_VENDOR_CD,
        setDataQRY_KSV_STOCK_FACOUT_VENDOR_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_FACOUT_VENDOR_CD = (e, name) => {
        let val = (e.value && e.value.VENDOR_CD) || "";

        let _dataQRY_KSV_STOCK_FACOUT = { ...dataQRY_KSV_STOCK_FACOUT };

        let tTypeVal = _dataQRY_KSV_STOCK_FACOUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_FACOUT(_dataQRY_KSV_STOCK_FACOUT);
        setDataQRY_KSV_STOCK_FACOUT_VENDOR_CD(e.value);
    };

    const onInputChangeQRY_KSV_STOCK_FACOUT_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACOUT = { ...dataQRY_KSV_STOCK_FACOUT };

        let tTypeVal = _dataQRY_KSV_STOCK_FACOUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACOUT(_dataQRY_KSV_STOCK_FACOUT);
    };

    const onInputChangeQRY_KSV_STOCK_FACOUT_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACOUT = { ...dataQRY_KSV_STOCK_FACOUT };

        let tTypeVal = _dataQRY_KSV_STOCK_FACOUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACOUT(_dataQRY_KSV_STOCK_FACOUT);
    };

    const onInputChangeQRY_KSV_STOCK_FACOUT_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACOUT = { ...dataQRY_KSV_STOCK_FACOUT };

        let tTypeVal = _dataQRY_KSV_STOCK_FACOUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACOUT(_dataQRY_KSV_STOCK_FACOUT);
    };

    const [datasQRY_KSV_STOCK_FACOUT_UNIT, setDatasQRY_KSV_STOCK_FACOUT_UNIT] =
        useState([]);
    const [dataQRY_KSV_STOCK_FACOUT_UNIT, setDataQRY_KSV_STOCK_FACOUT_UNIT] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_FACOUT_UNIT = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_STOCK_FACOUT = { ...dataQRY_KSV_STOCK_FACOUT };

        let tTypeVal = _dataQRY_KSV_STOCK_FACOUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_FACOUT(_dataQRY_KSV_STOCK_FACOUT);
        setDataQRY_KSV_STOCK_FACOUT_UNIT(e.value);
    };

    /* TABLE KSV_STOCK_FACOUT*/
    // DEFINE DATAGRID : TBL_KSV_STOCK_FACOUT
    const [datasTBL_KSV_STOCK_FACOUT, setDatasTBL_KSV_STOCK_FACOUT] = useState(
        [],
    );
    const dt_TBL_KSV_STOCK_FACOUT = useRef(null);
    const [dataTBL_KSV_STOCK_FACOUT, setDataTBL_KSV_STOCK_FACOUT] = useState(
        emptyTBL_KSV_STOCK_FACOUT,
    );
    const [selectedTBL_KSV_STOCK_FACOUT, setSelectedTBL_KSV_STOCK_FACOUT] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_STOCK_FACOUT,
        setFlagSelectModeTBL_KSV_STOCK_FACOUT,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_STOCK_FACOUT

    const onRowClick1TBL_KSV_STOCK_FACOUT = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_STOCK_FACOUT = argData;

        setDataTBL_KSV_STOCK_FACOUT(argTBL_KSV_STOCK_FACOUT);
    };

    const onRowClickTBL_KSV_STOCK_FACOUT = (event) => {
        let argTBL_KSV_STOCK_FACOUT = event.data;
        if (flagSelectModeTBL_KSV_STOCK_FACOUT) return;

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_FACOUT
    };

    const exportExcelTBL_KSV_STOCK_FACOUT = () => {};

    useEffect(() => {
        var _tObj = {};
        _tObj.PO_CD = "PO23-0229";

        var _tData = { ...dataQRY_KSV_STOCK_FACOUT };
        _tData.PO_CD = "PO23-0229";
        setDataQRY_KSV_STOCK_FACOUT(_tData);

        serviceS0507_FACTORY_OUTPUT_RECORD.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.VENDOR_CD.length,
                );

                setDatasQRY_KSV_STOCK_FACOUT_ORDER_CD(data.ORDER_CD);
                setDataQRY_KSV_STOCK_FACOUT_ORDER_CD(data.ORDER_CD[0]);

                setDatasQRY_KSV_STOCK_FACOUT_VENDOR_CD(data.VENDOR_CD);
                setDataQRY_KSV_STOCK_FACOUT_VENDOR_CD(data.VENDOR_CD[0]);

                setDatasQRY_KSV_STOCK_FACOUT_UNIT(data.MATL_UNIT);
                setDataQRY_KSV_STOCK_FACOUT_UNIT(data.MATL_UNIT[0]);
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Po No</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_PO_CD"
                        value={dataQRY_KSV_STOCK_FACOUT.PO_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACOUT_PO_CD(e, "PO_CD")
                        }
                        disabled
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
                    <p style={{ width: "6rem", display: "inline-block" }}>Order</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                    >
                        <Dropdown
                            id="id_ORDER_CD"
                            value={dataQRY_KSV_STOCK_FACOUT_ORDER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_FACOUT_ORDER_CD(
                                    e,
                                    "ORDER_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_FACOUT_ORDER_CD}
                            optionLabel="ORDER_CD"
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
                        width: "18rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>Date</p>
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
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "13rem",
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
                            id="id_IS_TT"
                        />
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "27rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Supplier</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                    >
                        <Dropdown
                            id="id_VENDOR_CD"
                            value={dataQRY_KSV_STOCK_FACOUT_VENDOR_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_FACOUT_VENDOR_CD(
                                    e,
                                    "VENDOR_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_FACOUT_VENDOR_CD}
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
                        width: "70rem",
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
                        value={dataQRY_KSV_STOCK_FACOUT.MATL_NAME}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACOUT_MATL_NAME(
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
                        width: "21rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Color</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "12rem",
                        }}
                        id="id_COLOR"
                        value={dataQRY_KSV_STOCK_FACOUT.COLOR}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACOUT_COLOR(e, "COLOR")
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
                            value={dataQRY_KSV_STOCK_FACOUT_UNIT}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_FACOUT_UNIT(
                                    e,
                                    "UNIT",
                                )
                            }
                            options={datasQRY_KSV_STOCK_FACOUT_UNIT}
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
                        width: "26rem",
                    }}
                >
                    <p style={{ width: "3rem", display: "inline-block" }}>Spec</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "21.5rem",
                        }}
                        id="id_SPEC"
                        value={dataQRY_KSV_STOCK_FACOUT.SPEC}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACOUT_SPEC(e, "SPEC")
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
                        label="Excel"
                        style={{ height: "1.1rem", color: "green" }}
                        icon="pi pi-upload"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_STOCK_FACOUT}
                    />
                </span>
            </div>
            <div
                style={{
                    marginLeft: "1rem",
                    width: "100rem",
                    height: "2rem",
                    marginTop: "0.5rem",
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Date</p>
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
                        label="Output"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={process_INSERT_FACOUT}
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
                    ref={dt_TBL_KSV_STOCK_FACOUT}
                    size="small"
                    value={datasTBL_KSV_STOCK_FACOUT}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_STOCK_FACOUT}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_STOCK_FACOUT(true);
                        setSelectedTBL_KSV_STOCK_FACOUT(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_STOCK_FACOUT.length,
                        );
                        onRowClick1TBL_KSV_STOCK_FACOUT(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_STOCK_FACOUT}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 14 }}
                    emptyMessage=" " //header={headerTBL_KSV_STOCK_FACOUT}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="28rem"
                >
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "12rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PR_NUM" headerClassName="t-header" header="No" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Desc" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName="t-header" header="Price" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="TOT_CNT" headerClassName="t-header" header="Total Qty" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FACOUT_VAL" headerClassName="t-header" header="Remain Qty" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="NEED_QTY" headerClassName="t-header" header="Need Qty" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FAC_OUT_QTY" headerClassName="t-header" header="Fac Out Qty" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FAC_ORDER_OUT_QTY" headerClassName="t-header" header="Fac Out Qty(order)" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="OUT_QTY" headerClassName="t-header" header="Output Qty" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
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

export default React.memo(S0507_FACTORY_OUTPUT_RECORD, comparisonFn);
