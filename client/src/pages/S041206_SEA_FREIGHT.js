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
import { ServiceS041206_SEA_FREIGHT } from "../service/service_biz/ServiceS041206_SEA_FREIGHT";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyTBL_KSV_STOCK_OUT = {
    id: 0,
    BUYER_NAME: "",
    DELAY_REASON_NAME: "",
    CHARGE_KIND_NAME: "",
    BUYER_TEAM_NAME: "",
    FRT_PERCENT: "",
    AMOUNT: "",
    CURR_CD: "",
    PERCENT_FLAG: "",
    DISTRIBUTE_FLAG: "",
    FRT_FLAG: "",
};

const emptyEDT_KSV_STOCK_OUT = {
    PACK_CD: "",
    COST: "",
    CURR_CD: "",
    REASON_TYPE: "",
    CHARGE1: "",
    CHARGE2: "",
};

const S041206_SEA_FREIGHT = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS041206_SEA_FREIGHTRef = useRef(null);
    if (!serviceS041206_SEA_FREIGHTRef.current) serviceS041206_SEA_FREIGHTRef.current = new ServiceS041206_SEA_FREIGHT();
    const serviceS041206_SEA_FREIGHT = serviceS041206_SEA_FREIGHTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [data_CODE, setData_CODE] = useState({});

    const insert_SEA_FREIGHT = () => {
        var _tInput = {};
        _tInput.PACK_CD = dataEDT_KSV_STOCK_OUT.PACK_CD;

        console.log(_tInput);

        var tArray = [];
        tArray.push(_tInput);

        serviceS041206_SEA_FREIGHT
            .mgrInsert_INSERT_SEA_FREIGHT(_tInput)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "SUCCESS:Insert Sea Freight",
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
                        summary: "ERROR:Insert Sea Freight",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const update_SEA_FREIGHT = () => {
        var tEditData = { ...dataEDT_KSV_STOCK_OUT };

        if (tEditData.REASON_TYPE === "") {
            return;
        }

        var tArray = datasTBL_KSV_STOCK_OUT.map((col, i) => {
            var tObj = { ...col };
            delete tObj.id;
            delete tObj.__typename;
            tObj.PACK_CD = tEditData.PACK_CD;
            tObj.DELAY_REASON = tEditData.REASON_TYPE;
            tObj.CHARGE_KIND = tEditData.CHARGE1;
            tObj.BUYER_TEAM = tEditData.CHARGE2;
            return tObj;
        });

        serviceS041206_SEA_FREIGHT
            .mgrInsert_UPDATE_SEA_FREIGHT(tArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "SUCCESS:Insert Sea Freight",
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
                        summary: "ERROR:Insert Sea Freight",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const search_SEA_FREIGHT = () => {
        var tSrcData = { ...JSON.parse(localStorage.getItem("S041201_DATA")) };
        console.log(tSrcData);
        // setDataQRY_KSV_STOCK_OUT(tSrcData);

        // datasTBL_KSV_STOCK_OUT
        var _tObj = {};
        _tObj.PACK_CD = tSrcData.PACK_CD;

        serviceS041206_SEA_FREIGHT.mgrQuery_SEA_FREIGHT(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.data.length,
                );
                var tArray = data.data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_STOCK_OUT(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /* TABLE KSV_STOCK_OUT*/
    // DEFINE DATAGRID : TBL_KSV_STOCK_OUT
    const [datasTBL_KSV_STOCK_OUT, setDatasTBL_KSV_STOCK_OUT] = useState([]);
    const dt_TBL_KSV_STOCK_OUT = useRef(null);
    const [dataTBL_KSV_STOCK_OUT, setDataTBL_KSV_STOCK_OUT] = useState(
        emptyTBL_KSV_STOCK_OUT,
    );
    const [selectedTBL_KSV_STOCK_OUT, setSelectedTBL_KSV_STOCK_OUT] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KSV_STOCK_OUT,
        setFlagSelectModeTBL_KSV_STOCK_OUT,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_STOCK_OUT

    const onRowClick1TBL_KSV_STOCK_OUT = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_STOCK_OUT = argData;

        setDataTBL_KSV_STOCK_OUT(argTBL_KSV_STOCK_OUT);

        var _tObj = { ...dataEDT_KSV_STOCK_OUT };
        _tObj.CURR_CD = argData.CURR_CD;
        _tObj.COST = argData.AMOUNT;
        _tObj.REASON_TYPE = argData.DELAY_REASON;
        _tObj.CHARGE1 = argData.CHARGE_KIND;
        _tObj.CHARGE2 = argData.BUYER_TEAM;
        setDataEDT_KSV_STOCK_OUT(_tObj);

        editEDT_KSV_STOCK_OUT_REASON_TYPE(argData.DELAY_REASON);
        editEDT_KSV_STOCK_OUT_CHARGE1(argData.CHARGE_KIND);

        var tArray = [];
        var tObj = {};
        tObj.CD_CODE = argData.BUYER_TEAM;
        tObj.CD_NAME = argData.BUYER_TEAM_N;
        tArray.push(tObj);
        setDatasEDT_KSV_STOCK_OUT_CHARGE2(tArray);
        setDataEDT_KSV_STOCK_OUT_CHARGE2(tArray[0]);
    };

    const onRowClickTBL_KSV_STOCK_OUT = (event) => {
        let argTBL_KSV_STOCK_OUT = event.data;
        if (flagSelectModeTBL_KSV_STOCK_OUT) return;

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_OUT
    };

    const exportExcelTBL_KSV_STOCK_OUT = () => {};

    /* EDIT KSV_STOCK_OUT*/
    const [datasEDT_KSV_STOCK_OUT, setDatasEDT_KSV_STOCK_OUT] = useState([]);
    const [dataEDT_KSV_STOCK_OUT, setDataEDT_KSV_STOCK_OUT] = useState(
        emptyEDT_KSV_STOCK_OUT,
    );

    const onInputChangeEDT_KSV_STOCK_OUT_PACK_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    const onInputChangeEDT_KSV_STOCK_OUT_COST = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    const onInputChangeEDT_KSV_STOCK_OUT_CURR_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    const [
        datasEDT_KSV_STOCK_OUT_REASON_TYPE,
        setDatasEDT_KSV_STOCK_OUT_REASON_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_STOCK_OUT_REASON_TYPE,
        setDataEDT_KSV_STOCK_OUT_REASON_TYPE,
    ] = useState({});

    const editEDT_KSV_STOCK_OUT_REASON_TYPE = (argValue) => {
        let _dataEDT_KSV_STOCK_OUT_REASON_TYPE =
            datasEDT_KSV_STOCK_OUT_REASON_TYPE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_STOCK_OUT_REASON_TYPE(
            _dataEDT_KSV_STOCK_OUT_REASON_TYPE[0],
        );
    };

    const onDropdownChangeEDT_KSV_STOCK_OUT_REASON_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
        setDataEDT_KSV_STOCK_OUT_REASON_TYPE(e.value);
    };

    const [datasEDT_KSV_STOCK_OUT_CHARGE1, setDatasEDT_KSV_STOCK_OUT_CHARGE1] =
        useState([]);
    const [dataEDT_KSV_STOCK_OUT_CHARGE1, setDataEDT_KSV_STOCK_OUT_CHARGE1] =
        useState({});

    const editEDT_KSV_STOCK_OUT_CHARGE1 = (argValue) => {
        let _dataEDT_KSV_STOCK_OUT_CHARGE1 =
            datasEDT_KSV_STOCK_OUT_CHARGE1.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_STOCK_OUT_CHARGE1(_dataEDT_KSV_STOCK_OUT_CHARGE1[0]);
    };

    const onDropdownChangeEDT_KSV_STOCK_OUT_CHARGE1 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
        setDataEDT_KSV_STOCK_OUT_CHARGE1(e.value);

        /*
    Charge오른쪽 : charge_kind가 1일때 kcd_buyer, 
           2일때 kcd_vendor, 3일때 kcd_code where cd_group=‘buyer_team’ and cd_flag=‘’ 
           4일때 kcd_factory
    */
        if (val === "1") {
            var tArray = data_CODE.BUYER_CD.map((col, i) => {
                var tObj = { ...col };
                tObj.CD_CODE = col.BUYER_CD;
                tObj.CD_NAME = col.BUYER_NAME;
                return tObj;
            });
            setDatasEDT_KSV_STOCK_OUT_CHARGE2(tArray);
            setDataEDT_KSV_STOCK_OUT_CHARGE2(tArray[0]);
        }
        if (val === "2") {
            var tArray = data_CODE.VENDOR.map((col, i) => {
                var tObj = { ...col };
                tObj.CD_CODE = col.VENDOR_CD;
                tObj.CD_NAME = col.VENDOR_NAME;
                return tObj;
            });
            setDatasEDT_KSV_STOCK_OUT_CHARGE2(tArray);
            setDataEDT_KSV_STOCK_OUT_CHARGE2(tArray[0]);
        }
        if (val === "3") {
            var tArray = data_CODE.BUYER_TEAM.map((col, i) => {
                var tObj = { ...col };
                tObj.CD_CODE = col.CD_CODE;
                tObj.CD_NAME = col.CD_NAME;
                return tObj;
            });
            setDatasEDT_KSV_STOCK_OUT_CHARGE2(tArray);
            setDataEDT_KSV_STOCK_OUT_CHARGE2(tArray[0]);
        }
        if (val === "4") {
            var tArray = data_CODE.FACTORY_CD.map((col, i) => {
                var tObj = { ...col };
                tObj.CD_CODE = col.FACTORY_CD;
                tObj.CD_NAME = col.FACTORY_NAME;
                return tObj;
            });
            setDatasEDT_KSV_STOCK_OUT_CHARGE2(tArray);
            setDataEDT_KSV_STOCK_OUT_CHARGE2(tArray[0]);
        }
    };

    const [datasEDT_KSV_STOCK_OUT_CHARGE2, setDatasEDT_KSV_STOCK_OUT_CHARGE2] =
        useState([]);
    const [dataEDT_KSV_STOCK_OUT_CHARGE2, setDataEDT_KSV_STOCK_OUT_CHARGE2] =
        useState({});

    const onDropdownChangeEDT_KSV_STOCK_OUT_CHARGE2 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
        setDataEDT_KSV_STOCK_OUT_CHARGE2(e.value);
    };

    useEffect(() => {
        var tSrcData = { ...JSON.parse(localStorage.getItem("S041201_DATA")) };
        var _tEditData = { ...dataEDT_KSV_STOCK_OUT };
        _tEditData.PACK_CD = tSrcData.PACK_CD;
        setDataEDT_KSV_STOCK_OUT(_tEditData);

        var _tObj = {};
        _tObj.PACK_CD = "";

        serviceS041206_SEA_FREIGHT.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setData_CODE(data);

                setDatasEDT_KSV_STOCK_OUT_REASON_TYPE(data.REASON_TYPE);
                setDataEDT_KSV_STOCK_OUT_REASON_TYPE(data.REASON_TYPE[0]);

                setDatasEDT_KSV_STOCK_OUT_CHARGE1(data.CHARGE1);
                setDataEDT_KSV_STOCK_OUT_CHARGE1(data.CHARGE1[0]);

                setDatasEDT_KSV_STOCK_OUT_CHARGE2([]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        search_SEA_FREIGHT();
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
                    height: "2rem",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "15rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>PL No</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_PACK_CD"
                        value={dataEDT_KSV_STOCK_OUT.PACK_CD}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_STOCK_OUT_PACK_CD(e, "PACK_CD")
                        }
                        disabled
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "15rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>Cost</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_COST"
                        value={dataEDT_KSV_STOCK_OUT.COST}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_STOCK_OUT_COST(e, "COST")
                        }
                        disabled
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "15rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>Curr</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_CURR_CD"
                        value={dataEDT_KSV_STOCK_OUT.CURR_CD}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_STOCK_OUT_CURR_CD(e, "CURR_CD")
                        }
                        disabled
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
                        onClick={search_SEA_FREIGHT}
                    />

                    <Button
                        label="Update %"
                        style={{ height: "1.1rem" }}
                        icon="pi pi-check"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_STOCK_OUT}
                    />

                    <Button
                        label="Reset"
                        style={{ height: "1.1rem" }}
                        icon="pi pi-check"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_STOCK_OUT}
                    />

                    <Button
                        label="Excel"
                        style={{ height: "1.1rem", color: "green" }}
                        icon="pi pi-upload"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_STOCK_OUT}
                    />
                </span>
            </div>
            <div style={{ width: "100rem", height: "2rem" }}>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "22rem",
                    }}
                >
                    <p style={{ width: "5rem", display: "inline-block" }}>Reason</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                    >
                        <Dropdown
                            id="id_DELAY_REASON"
                            value={dataEDT_KSV_STOCK_OUT_REASON_TYPE}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_STOCK_OUT_REASON_TYPE(
                                    e,
                                    "REASON_TYPE",
                                )
                            }
                            options={datasEDT_KSV_STOCK_OUT_REASON_TYPE}
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
                        width: "17rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>100% Charge</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "8rem",
                        }}
                    >
                        <Dropdown
                            id="id_CHARGE_KIND"
                            value={dataEDT_KSV_STOCK_OUT_CHARGE1}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_STOCK_OUT_CHARGE1(
                                    e,
                                    "CHARGE1",
                                )
                            }
                            options={datasEDT_KSV_STOCK_OUT_CHARGE1}
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
                        width: "30rem",
                    }}
                >
                    {/* <p style={{ width: '8rem', display: 'inline-block' }}> Team </p> */}
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "29rem",
                        }}
                    >
                        <Dropdown
                            id="id_BUYER_TEAM"
                            style={{ width: "21rem" }}
                            value={dataEDT_KSV_STOCK_OUT_CHARGE2}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_STOCK_OUT_CHARGE2(
                                    e,
                                    "CHARGE2",
                                )
                            }
                            options={datasEDT_KSV_STOCK_OUT_CHARGE2}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span style={{ display: "inline-block" }}>
                    <Button
                        label="Insert"
                        style={{ height: "1.1rem" }}
                        icon="pi pi-check"
                        className="p-button-text"
                        onClick={insert_SEA_FREIGHT}
                    />

                    <Button
                        label="Update"
                        style={{ height: "1.1rem" }}
                        icon="pi pi-check"
                        className="p-button-text"
                        onClick={update_SEA_FREIGHT}
                    />
                </span>
            </div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "28rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_STOCK_OUT}
                    size="small"
                    value={datasTBL_KSV_STOCK_OUT}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_STOCK_OUT}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_STOCK_OUT(true);
                        setSelectedTBL_KSV_STOCK_OUT(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_STOCK_OUT.length,
                        );
                        onRowClick1TBL_KSV_STOCK_OUT(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_STOCK_OUT}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 13 }}
                    emptyMessage=" " //header={headerTBL_KSV_STOCK_OUT}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="26rem"
                >
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DELAY_REASON_N" headerClassName="t-header" header="Reason" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CHARGE_KIND_N" headerClassName="t-header" header="Charge" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BUYER_TEAM_N" headerClassName="t-header" header="Team" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="FRT_PERCENT" headerClassName="t-header" header="%" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="AMOUNT" headerClassName="t-header" header="Amount" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Cur" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PERCENT_FLAG" headerClassName="t-header" header="Percent" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DISTRIBUTE_FLAG" headerClassName="t-header" header="Distribute" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="FRT_FLAG" headerClassName="t-header" header="Freight" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
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

export default React.memo(S041206_SEA_FREIGHT, comparisonFn);
