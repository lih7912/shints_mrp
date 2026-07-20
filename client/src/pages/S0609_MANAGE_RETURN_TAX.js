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
import { ServiceS0609_MANAGE_RETURN_TAX } from "../service/service_biz/ServiceS0609_MANAGE_RETURN_TAX";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyTBL_KSV_INVOICE_MST = {
    id: 0,
    TAX_NO: "",
    VENDOR_NAME: "",
    ITEM_NAME: "",
    IMPORT_DATE: "",
    TAX_AMT: "",
    RETURN_AMT: "",
    IS_RETURN: "",
    REASION: "",
};

const emptyTBL_KSV_INVOICE_MST1 = {
    id: 0,
    IN_DATE: "",
    EXPORT_INVOICE_NO: "",
    RETURN_DATE: "",
    RETURN_TAX: "",
    TAX_NO: "",
};

const emptyEDT_KSV_INVOICE_MST = {
    TAX_NO1: "",
    TAX_NO2: "",
    TAX_NO3: "",
    STATUS: "",
    VENDOR_CD: "",
    ITEM_NAME: "",
    IMPORT_DATE: "",
    IMPORT_TAX: "",
    RETURN_TAX: "",
    IS_NO_RETURN: "",
    REASION: "",
};

const emptyEDT_KSV_INVOICE_MST1 = {
    S_QRY_DATE: "",
    E_QRY_DATE: "",
    IS_NO_RETURN: "",
};

const emptyEDT_KSV_INVOICE_MST2 = {
    EXPORT_DATE: "",
    EXPORT_INVOICE_NO: "",
    RETURN_DATE: "",
    RETURN_AMT: "",
};

const S0609_MANAGE_RETURN_TAX = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0609_MANAGE_RETURN_TAXRef = useRef(null);
    if (!serviceS0609_MANAGE_RETURN_TAXRef.current) serviceS0609_MANAGE_RETURN_TAXRef.current = new ServiceS0609_MANAGE_RETURN_TAX();
    const serviceS0609_MANAGE_RETURN_TAX = serviceS0609_MANAGE_RETURN_TAXRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* TABLE KSV_INVOICE_MST*/
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST
    const [datasTBL_KSV_INVOICE_MST, setDatasTBL_KSV_INVOICE_MST] = useState(
        [],
    );
    const dt_TBL_KSV_INVOICE_MST = useRef(null);
    const [dataTBL_KSV_INVOICE_MST, setDataTBL_KSV_INVOICE_MST] = useState(
        emptyTBL_KSV_INVOICE_MST,
    );
    const [selectedTBL_KSV_INVOICE_MST, setSelectedTBL_KSV_INVOICE_MST] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_INVOICE_MST,
        setFlagSelectModeTBL_KSV_INVOICE_MST,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_INVOICE_MST

    const onRowClick1TBL_KSV_INVOICE_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_INVOICE_MST = argData;

        setDataTBL_KSV_INVOICE_MST(argTBL_KSV_INVOICE_MST);
    };

    const onRowClickTBL_KSV_INVOICE_MST = (event) => {
        let argTBL_KSV_INVOICE_MST = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST
    };

    /* TABLE KSV_INVOICE_MST1*/
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST1
    const [datasTBL_KSV_INVOICE_MST1, setDatasTBL_KSV_INVOICE_MST1] = useState(
        [],
    );
    const dt_TBL_KSV_INVOICE_MST1 = useRef(null);
    const [dataTBL_KSV_INVOICE_MST1, setDataTBL_KSV_INVOICE_MST1] = useState(
        emptyTBL_KSV_INVOICE_MST1,
    );
    const [selectedTBL_KSV_INVOICE_MST1, setSelectedTBL_KSV_INVOICE_MST1] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_INVOICE_MST1,
        setFlagSelectModeTBL_KSV_INVOICE_MST1,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_INVOICE_MST1

    const onRowClick1TBL_KSV_INVOICE_MST1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_INVOICE_MST1 = argData;

        setDataTBL_KSV_INVOICE_MST1(argTBL_KSV_INVOICE_MST1);
    };

    const onRowClickTBL_KSV_INVOICE_MST1 = (event) => {
        let argTBL_KSV_INVOICE_MST1 = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST1
    };

    /**EDIT KSV_INVOICE_MST */
    const [datasEDT_KSV_INVOICE_MST, setDatasEDT_KSV_INVOICE_MST] = useState(
        [],
    );
    const [dataEDT_KSV_INVOICE_MST, setDataEDT_KSV_INVOICE_MST] = useState(
        emptyEDT_KSV_INVOICE_MST,
    );

    const onInputChangeEDT_KSV_INVOICE_MST_TAX_NO1 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_TAX_NO2 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_TAX_NO3 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_STATUS = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const [
        datasEDT_KSV_INVOICE_MST_VENDOR_CD,
        setDatasEDT_KSV_INVOICE_MST_VENDOR_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST_VENDOR_CD,
        setDataEDT_KSV_INVOICE_MST_VENDOR_CD,
    ] = useState({});

    const onDropdownChangeEDT_KSV_INVOICE_MST_VENDOR_CD = (e, name) => {
        let val = (e.value && e.value.VENDOR_CD) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
        setDataEDT_KSV_INVOICE_MST_VENDOR_CD(e.value);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_ITEM_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onCalChangeEDT_KSV_INVOICE_MST_IMPORT_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };
        _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_IMPORT_TAX = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_RETURN_TAX = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onCheckboxChangeEDT_KSV_INVOICE_MST_IS_NO_RETURN = (e, name) => {
        let val = "";
        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_REASION = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    /**EDIT KSV_INVOICE_MST1 */
    const [datasEDT_KSV_INVOICE_MST1, setDatasEDT_KSV_INVOICE_MST1] = useState(
        [],
    );
    const [dataEDT_KSV_INVOICE_MST1, setDataEDT_KSV_INVOICE_MST1] = useState(
        emptyEDT_KSV_INVOICE_MST1,
    );

    const onCalChangeEDT_KSV_INVOICE_MST1_S_QRY_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };
        _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onCalChangeEDT_KSV_INVOICE_MST1_E_QRY_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };
        _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onCheckboxChangeEDT_KSV_INVOICE_MST1_IS_NO_RETURN = (e, name) => {
        let val = "";
        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    /**EDIT KSV_INVOICE_MST2 */
    const [datasEDT_KSV_INVOICE_MST2, setDatasEDT_KSV_INVOICE_MST2] = useState(
        [],
    );
    const [dataEDT_KSV_INVOICE_MST2, setDataEDT_KSV_INVOICE_MST2] = useState(
        emptyEDT_KSV_INVOICE_MST2,
    );

    const onCalChangeEDT_KSV_INVOICE_MST2_EXPORT_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_INVOICE_MST2 = { ...dataEDT_KSV_INVOICE_MST2 };
        _dataEDT_KSV_INVOICE_MST2[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST2(_dataEDT_KSV_INVOICE_MST2);
    };

    const onInputChangeEDT_KSV_INVOICE_MST2_EXPORT_INVOICE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST2 = { ...dataEDT_KSV_INVOICE_MST2 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST2[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST2(_dataEDT_KSV_INVOICE_MST2);
    };

    const onCalChangeEDT_KSV_INVOICE_MST2_RETURN_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_INVOICE_MST2 = { ...dataEDT_KSV_INVOICE_MST2 };
        _dataEDT_KSV_INVOICE_MST2[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST2(_dataEDT_KSV_INVOICE_MST2);
    };

    const onCalChangeEDT_KSV_INVOICE_MST2_RETURN_AMT = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_INVOICE_MST2 = { ...dataEDT_KSV_INVOICE_MST2 };
        _dataEDT_KSV_INVOICE_MST2[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST2(_dataEDT_KSV_INVOICE_MST2);
    };

    useEffect(() => {}, []);

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
        <div>
            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "22rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_INVOICE_MST}
                    size="small"
                    value={datasTBL_KSV_INVOICE_MST}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_INVOICE_MST}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_INVOICE_MST(true);
                        setSelectedTBL_KSV_INVOICE_MST(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_INVOICE_MST.length,
                        );
                        onRowClick1TBL_KSV_INVOICE_MST(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_INVOICE_MST}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 50 }}
                    emptyMessage="No TBL_KSV_INVOICE_MST found." // header={headerTBL_KSV_INVOICE_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="TAX_NO" header="수입신고번호" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" header="공급업체" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ITEM_NAME" header="품명" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="IMPORT_DATE" header="수입일" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="TAX_AMT" header="관세" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="RETURN_AMT" header="환급액" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="IS_RETURN" header="상태" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="REASION" header="사유" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
            </div>
            <Divider />
            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "49rem",
                    height: "22rem",
                    float: "left",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_INVOICE_MST1}
                    size="small"
                    value={datasTBL_KSV_INVOICE_MST1}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_INVOICE_MST1}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_INVOICE_MST1(true);
                        setSelectedTBL_KSV_INVOICE_MST1(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_INVOICE_MST1.length,
                        );
                        onRowClick1TBL_KSV_INVOICE_MST1(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_INVOICE_MST1}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 50 }}
                    emptyMessage="No TBL_KSV_INVOICE_MST1 found." //header={headerTBL_KSV_INVOICE_MST1}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="IN_DATE" header="수불일" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="EXPORT_INVOICE_NO" header="수출Invoice번호" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="RETURN_DATE" header="환급일" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="RETURN_TAX" header="환급액" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="TAX_NO" header="수입신고번호" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider
                layout="vertical"
                style={{ float: "left", height: "23rem", marginLeft: "2rem" }}
            />

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "49rem",
                    height: "22rem",
                    float: "left",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>수불일</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yymmdd"
                            id="id_EXPORT_DATE"
                            value={changeDateVal(
                                dataEDT_KSV_INVOICE_MST2.EXPORT_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_INVOICE_MST2_EXPORT_DATE(
                                    e,
                                    "EXPORT_DATE",
                                )
                            }
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
                    <p style={{ width: "8rem", display: "inline-block" }}>수출Invoice번호</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_EXPORT_INVOICE_NO"
                        value={dataEDT_KSV_INVOICE_MST2.EXPORT_INVOICE_NO}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_INVOICE_MST2_EXPORT_INVOICE_NO(
                                e,
                                "EXPORT_INVOICE_NO",
                            )
                        }
                    />
                </span>
                <span style={{ display: "inline-block", marginLeft: "6rem" }}>
                    <Button
                        label="수출등록"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={blankFn}
                    />
                    <Button
                        label="수출삭제"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={blankFn}
                    />
                    <Button
                        label="수출 Invoice 번호 수정"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={blankFn}
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "33rem",
                        marginTop: "1rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>환급일</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yymmdd"
                            id="id_RETURN_DATE"
                            value={changeDateVal(
                                dataEDT_KSV_INVOICE_MST2.RETURN_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_INVOICE_MST2_RETURN_DATE(
                                    e,
                                    "RETURN_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "25rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>환급액</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yymmdd"
                            id="id_RETURN_AMT"
                            value={changeDateVal(
                                dataEDT_KSV_INVOICE_MST2.RETURN_AMT,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_INVOICE_MST2_RETURN_AMT(
                                    e,
                                    "RETURN_AMT",
                                )
                            }
                        />
                    </div>
                </span>
                <span style={{ display: "inline-block" }}>
                    <Button
                        label="환급등록"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={blankFn}
                    />
                </span>
            </div>
            <Divider />

            <div style={{ width: "100rem", height: "17rem" }}>
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "60rem", height: "17rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>수입신고번호</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                                id="id_TAX_NO1"
                                value={dataEDT_KSV_INVOICE_MST.TAX_NO1}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_TAX_NO1(
                                        e,
                                        "TAX_NO1",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "10rem",
                            }}
                        >
                            <p style={{ width: "1rem", display: "inline-block", }}>-</p>
                            <InputText
                                style={{
                                    marginLeft: "1rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                                id="id_TAX_NO2"
                                value={dataEDT_KSV_INVOICE_MST.TAX_NO2}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_TAX_NO2(
                                        e,
                                        "TAX_NO2",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "10rem",
                            }}
                        >
                            <p style={{ width: "1rem", display: "inline-block", }}>-</p>
                            <InputText
                                style={{
                                    marginLeft: "1rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                                id="id_TAX_NO3"
                                value={dataEDT_KSV_INVOICE_MST.TAX_NO3}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_TAX_NO3(
                                        e,
                                        "TAX_NO3",
                                    )
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
                            <p style={{ width: "6rem", display: "inline-block", }}>상태</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "5rem",
                                }}
                                id="id_STATUS"
                                value={dataEDT_KSV_INVOICE_MST.STATUS}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_STATUS(
                                        e,
                                        "STATUS",
                                    )
                                }
                                disabled
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
                            <p style={{ width: "8rem", display: "inline-block", }}>공급업체</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_VENDOR_CD"
                                    value={dataEDT_KSV_INVOICE_MST_VENDOR_CD}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_INVOICE_MST_VENDOR_CD(
                                            e,
                                            "VENDOR_CD",
                                        )
                                    }
                                    options={datasEDT_KSV_INVOICE_MST_VENDOR_CD}
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>품명</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_ITEM_NAME"
                                value={dataEDT_KSV_INVOICE_MST.ITEM_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_ITEM_NAME(
                                        e,
                                        "ITEM_NAME",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "50rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>수입일</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yymmdd"
                                    id="id_IMPORT_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_INVOICE_MST.IMPORT_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_INVOICE_MST_IMPORT_DATE(
                                            e,
                                            "IMPORT_DATE",
                                        )
                                    }
                                />
                            </div>
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>관세</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "13rem",
                                }}
                                id="id_IMPORT_TAX"
                                value={dataEDT_KSV_INVOICE_MST.IMPORT_TAX}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_IMPORT_TAX(
                                        e,
                                        "IMPORT_TAX",
                                    )
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
                            <p style={{ width: "8rem", display: "inline-block", }}>관세환급불가</p>
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
                                    id="id_IS_NO_RETURN"
                                    checked={changeCheckBoxVal(
                                        dataEDT_KSV_INVOICE_MST.IS_NO_RETURN,
                                    )}
                                    onChange={(e) =>
                                        onCheckboxChangeEDT_KSV_INVOICE_MST_IS_NO_RETURN(
                                            e,
                                            "IS_NO_RETURN",
                                        )
                                    }
                                />
                            </div>
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>환급액</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "13rem",
                                }}
                                id="id_RETURN_TAX"
                                value={dataEDT_KSV_INVOICE_MST.RETURN_TAX}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_RETURN_TAX(
                                        e,
                                        "RETURN_TAX",
                                    )
                                }
                                disabled
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
                            <p style={{ width: "8rem", display: "inline-block", }}>사유</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_REASION"
                                value={dataEDT_KSV_INVOICE_MST.REASION}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_REASION(
                                        e,
                                        "REASION",
                                    )
                                }
                            />
                        </span>
                    </div>
                    <Divider
                        layout="vertical"
                        style={{ float: "left", height: "17.5rem" }}
                    />

                    <div style={{ width: "40rem", height: "17rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>기간</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "13rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yymmdd"
                                    id="id_S_QRY_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_INVOICE_MST1.S_QRY_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_INVOICE_MST1_S_QRY_DATE(
                                            e,
                                            "S_QRY_DATE",
                                        )
                                    }
                                />
                            </div>
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "15rem",
                            }}
                        >
                            <p style={{ width: "1rem", display: "inline-block", }}>~</p>
                            <div
                                style={{
                                    marginLeft: "1rem",
                                    display: "inline-block",
                                    width: "13rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yymmdd"
                                    id="id_E_QRY_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_INVOICE_MST1.E_QRY_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_INVOICE_MST1_E_QRY_DATE(
                                            e,
                                            "E_QRY_DATE",
                                        )
                                    }
                                />
                            </div>
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "10rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>완료포함</p>
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
                                    id="id_IS_NO_RETURN"
                                    checked={changeCheckBoxVal(
                                        dataEDT_KSV_INVOICE_MST1.IS_NO_RETURN,
                                    )}
                                    onChange={(e) =>
                                        onCheckboxChangeEDT_KSV_INVOICE_MST1_IS_NO_RETURN(
                                            e,
                                            "IS_NO_RETURN",
                                        )
                                    }
                                />
                            </div>
                        </span>
                        <span
                            style={{
                                display: "inline-block",
                                width: "22rem",
                                marginLeft: "1rem",
                            }}
                        >
                            <Button
                                label="조회"
                                style={{ height: "1.1rem" }}
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </span>
                        <span
                            style={{
                                display: "inline-block",
                                marginLeft: "12rem",
                            }}
                        >
                            <Button
                                label="월별환급액리스트"
                                style={{ height: "1.1rem" }}
                                className="p-button-text"
                                onClick={blankFn}
                            />

                            <Button
                                label="미환급액리스트"
                                style={{ height: "1.1rem" }}
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </span>
                    </div>
                </div>
            </div>

            <Toast ref={toast} />
            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "30rem" }}
            >
                <div className="formgrid grid">
                    <div>
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="조회"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="등록"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="수정"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="삭제"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="초기화"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="완료"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="완료취소"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </div>
            </div>

            <Divider />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0609_MANAGE_RETURN_TAX, comparisonFn);
