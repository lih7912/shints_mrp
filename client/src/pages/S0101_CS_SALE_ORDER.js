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
import { ServiceS0101_CS_SALE_ORDER } from "../service/service_biz/ServiceS0101_CS_SALE_ORDER";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_CS_SALE_ORDER = {
    S_DATE: "",
    E_DATE: "",
    USER_NAME: "",
    ORDER_TYPE: "",
};

const emptyTBL_CS_SALE_ORDER = {
    id: 0,
    WORK_DATE: "",
    WORK_TIME: "",
    BUYER_NAME: "",
    MODEL_NAME: "",
    OPTION1: "",
    USER_NAME: "",
    ACCESORY_FLAG: "",
};

const emptyTBL_CS_PRODUCT_SUB1 = {
    id: 0,
    KIND1: "",
    MODEL1: "",
    MODEL2: "",
    AMOUNT: "",
    QTY: "",
};

const emptyTBL_CS_PRODUCT_SUB2 = {
    id: 0,
    KIND1: "",
    MODEL1: "",
    MODEL2: "",
    AMOUNT: "",
    QTY: "",
};

const emptyEDT_CS_SALE_ORDER = {
    ORDER_NAME: "",
    BUYER_NAME: "",
    IN_DATE: "",
    USER_NAME: "",
    ORDER_TYPE: "",
    MODEL_NAME: "",
    OPTION1: "",
    OPTION2: "",
    CONTRACT_FLAG: "",
    VENDOR: "",
    WORK_DATE: "",
    WORK_TIME: "",
    WORK_FLAG: "",
    TEST_FLAG: "",
    WORK_USER: "",
    REMARK: "",
};

const S0101_CS_SALE_ORDER = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0101_CS_SALE_ORDERRef = useRef(null);
    if (!serviceS0101_CS_SALE_ORDERRef.current) serviceS0101_CS_SALE_ORDERRef.current = new ServiceS0101_CS_SALE_ORDER();
    const serviceS0101_CS_SALE_ORDER = serviceS0101_CS_SALE_ORDERRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* QRY */
    const [dataQRY_CS_SALE_ORDER, setDataQRY_CS_SALE_ORDER] = useState(
        emptyQRY_CS_SALE_ORDER,
    );

    const onCalChangeQRY_CS_SALE_ORDER_S_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_CS_SALE_ORDER = { ...dataQRY_CS_SALE_ORDER };
        _dataQRY_CS_SALE_ORDER[`${name}`] = val;
        setDataQRY_CS_SALE_ORDER(_dataQRY_CS_SALE_ORDER);
    };

    const onCalChangeQRY_CS_SALE_ORDER_E_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_CS_SALE_ORDER = { ...dataQRY_CS_SALE_ORDER };
        _dataQRY_CS_SALE_ORDER[`${name}`] = val;
        setDataQRY_CS_SALE_ORDER(_dataQRY_CS_SALE_ORDER);
    };

    const [
        datasQRY_CS_SALE_ORDER_USER_NAME,
        setDatasQRY_CS_SALE_ORDER_USER_NAME,
    ] = useState([]);
    const [
        dataQRY_CS_SALE_ORDER_USER_NAME,
        setDataQRY_CS_SALE_ORDER_USER_NAME,
    ] = useState({});

    const onDropdownChangeQRY_CS_SALE_ORDER_USER_NAME = (e, name) => {
        let val = (e.value && e.value.USER_NAME) || "";

        let _dataQRY_CS_SALE_ORDER = { ...dataQRY_CS_SALE_ORDER };

        let tTypeVal = _dataQRY_CS_SALE_ORDER[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_CS_SALE_ORDER[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_CS_SALE_ORDER[`${name}`] = parseInt(val);
        }

        setDataQRY_CS_SALE_ORDER(_dataQRY_CS_SALE_ORDER);
        setDataQRY_CS_SALE_ORDER_USER_NAME(e.value);
    };

    const [
        datasQRY_CS_SALE_ORDER_ORDER_TYPE,
        setDatasQRY_CS_SALE_ORDER_ORDER_TYPE,
    ] = useState([]);
    const [
        dataQRY_CS_SALE_ORDER_ORDER_TYPE,
        setDataQRY_CS_SALE_ORDER_ORDER_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_CS_SALE_ORDER_ORDER_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_NAME) || "";

        let _dataQRY_CS_SALE_ORDER = { ...dataQRY_CS_SALE_ORDER };

        let tTypeVal = _dataQRY_CS_SALE_ORDER[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_CS_SALE_ORDER[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_CS_SALE_ORDER[`${name}`] = parseInt(val);
        }

        setDataQRY_CS_SALE_ORDER(_dataQRY_CS_SALE_ORDER);
        setDataQRY_CS_SALE_ORDER_ORDER_TYPE(e.value);
    };

    /* TABLE_CS_SALE_ORDER */
    // DEFINE DATAGRID : TBL_CS_SALE_ORDER
    const [datasTBL_CS_SALE_ORDER, setDatasTBL_CS_SALE_ORDER] = useState([]);
    const dt_TBL_CS_SALE_ORDER = useRef(null);
    const [dataTBL_CS_SALE_ORDER, setDataTBL_CS_SALE_ORDER] = useState(
        emptyTBL_CS_SALE_ORDER,
    );
    const [selectedTBL_CS_SALE_ORDER, setSelectedTBL_CS_SALE_ORDER] = useState(
        [],
    );
    const [
        flagSelectModeTBL_CS_SALE_ORDER,
        setFlagSelectModeTBL_CS_SALE_ORDER,
    ] = useState(false);

    // DATAGRID CODE : TBL_CS_SALE_ORDER

    const onRowClick1TBL_CS_SALE_ORDER = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_CS_SALE_ORDER = argData;

        setDataTBL_CS_SALE_ORDER(argTBL_CS_SALE_ORDER);
    };

    const onRowClickTBL_CS_SALE_ORDER = (event) => {
        let argTBL_CS_SALE_ORDER = event.data;
        if (flagSelectModeTBL_CS_SALE_ORDER) return;

        // Service : NawooAll:mgrQueryTBL_CS_SALE_ORDER
    };

    /* TABLE_CS_PRODUCT_SUB1 */
    // DEFINE DATAGRID : TBL_CS_PRODUCT_SUB1
    const [datasTBL_CS_PRODUCT_SUB1, setDatasTBL_CS_PRODUCT_SUB1] = useState(
        [],
    );
    const dt_TBL_CS_PRODUCT_SUB1 = useRef(null);
    const [dataTBL_CS_PRODUCT_SUB1, setDataTBL_CS_PRODUCT_SUB1] = useState(
        emptyTBL_CS_PRODUCT_SUB1,
    );
    const [selectedTBL_CS_PRODUCT_SUB1, setSelectedTBL_CS_PRODUCT_SUB1] =
        useState([]);
    const [
        flagSelectModeTBL_CS_PRODUCT_SUB1,
        setFlagSelectModeTBL_CS_PRODUCT_SUB1,
    ] = useState(false);

    // DATAGRID CODE : TBL_CS_PRODUCT_SUB1

    const onRowClick1TBL_CS_PRODUCT_SUB1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_CS_PRODUCT_SUB1 = argData;

        setDataTBL_CS_PRODUCT_SUB1(argTBL_CS_PRODUCT_SUB1);
    };

    const onRowClickTBL_CS_PRODUCT_SUB1 = (event) => {
        let argTBL_CS_PRODUCT_SUB1 = event.data;
        if (flagSelectModeTBL_CS_PRODUCT_SUB1) return;

        // Service : NawooAll:mgrQueryTBL_CS_PRODUCT_SUB1
    };

    /* CS_PRODUCT_SUB2 */

    // DEFINE DATAGRID : TBL_CS_PRODUCT_SUB2
    const [datasTBL_CS_PRODUCT_SUB2, setDatasTBL_CS_PRODUCT_SUB2] = useState(
        [],
    );
    const dt_TBL_CS_PRODUCT_SUB2 = useRef(null);
    const [dataTBL_CS_PRODUCT_SUB2, setDataTBL_CS_PRODUCT_SUB2] = useState(
        emptyTBL_CS_PRODUCT_SUB2,
    );
    const [selectedTBL_CS_PRODUCT_SUB2, setSelectedTBL_CS_PRODUCT_SUB2] =
        useState([]);
    const [
        flagSelectModeTBL_CS_PRODUCT_SUB2,
        setFlagSelectModeTBL_CS_PRODUCT_SUB2,
    ] = useState(false);

    // DATAGRID CODE : TBL_CS_PRODUCT_SUB2

    const onRowClick1TBL_CS_PRODUCT_SUB2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_CS_PRODUCT_SUB2 = argData;

        setDataTBL_CS_PRODUCT_SUB2(argTBL_CS_PRODUCT_SUB2);
    };

    const onRowClickTBL_CS_PRODUCT_SUB2 = (event) => {
        let argTBL_CS_PRODUCT_SUB2 = event.data;
        if (flagSelectModeTBL_CS_PRODUCT_SUB2) return;

        // Service : NawooAll:mgrQueryTBL_CS_PRODUCT_SUB2
    };

    /* EDIT CS_SALE_ORDER */

    const [datasEDT_CS_SALE_ORDER, setDatasEDT_CS_SALE_ORDER] = useState([]);
    const [dataEDT_CS_SALE_ORDER, setDataEDT_CS_SALE_ORDER] = useState(
        emptyEDT_CS_SALE_ORDER,
    );

    const onInputChangeEDT_CS_SALE_ORDER_ORDER_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_CS_SALE_ORDER = { ...dataEDT_CS_SALE_ORDER };

        let tTypeVal = _dataEDT_CS_SALE_ORDER[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_CS_SALE_ORDER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_CS_SALE_ORDER[`${name}`] = parseInt(val);

        setDataEDT_CS_SALE_ORDER(_dataEDT_CS_SALE_ORDER);
    };

    const onInputChangeEDT_CS_SALE_ORDER_BUYER_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_CS_SALE_ORDER = { ...dataEDT_CS_SALE_ORDER };

        let tTypeVal = _dataEDT_CS_SALE_ORDER[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_CS_SALE_ORDER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_CS_SALE_ORDER[`${name}`] = parseInt(val);

        setDataEDT_CS_SALE_ORDER(_dataEDT_CS_SALE_ORDER);
    };

    const onCalChangeEDT_CS_SALE_ORDER_IN_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_CS_SALE_ORDER = { ...dataEDT_CS_SALE_ORDER };
        _dataEDT_CS_SALE_ORDER[`${name}`] = val;
        setDataEDT_CS_SALE_ORDER(_dataEDT_CS_SALE_ORDER);
    };

    const [
        datasEDT_CS_SALE_ORDER_USER_NAME,
        setDatasEDT_CS_SALE_ORDER_USER_NAME,
    ] = useState([]);
    const [
        dataEDT_CS_SALE_ORDER_USER_NAME,
        setDataEDT_CS_SALE_ORDER_USER_NAME,
    ] = useState({});

    const onDropdownChangeEDT_CS_SALE_ORDER_USER_NAME = (e, name) => {
        let val = (e.value && e.value.USER_NAME) || "";

        let _dataEDT_CS_SALE_ORDER = { ...dataEDT_CS_SALE_ORDER };

        let tTypeVal = _dataEDT_CS_SALE_ORDER[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_CS_SALE_ORDER[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_CS_SALE_ORDER[`${name}`] = parseInt(val);
        }

        setDataEDT_CS_SALE_ORDER(_dataEDT_CS_SALE_ORDER);
        setDataEDT_CS_SALE_ORDER_USER_NAME(e.value);
    };

    const [
        datasEDT_CS_SALE_ORDER_ORDER_TYPE,
        setDatasEDT_CS_SALE_ORDER_ORDER_TYPE,
    ] = useState([]);
    const [
        dataEDT_CS_SALE_ORDER_ORDER_TYPE,
        setDataEDT_CS_SALE_ORDER_ORDER_TYPE,
    ] = useState({});

    const onDropdownChangeEDT_CS_SALE_ORDER_ORDER_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_NAME) || "";

        let _dataEDT_CS_SALE_ORDER = { ...dataEDT_CS_SALE_ORDER };

        let tTypeVal = _dataEDT_CS_SALE_ORDER[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_CS_SALE_ORDER[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_CS_SALE_ORDER[`${name}`] = parseInt(val);
        }

        setDataEDT_CS_SALE_ORDER(_dataEDT_CS_SALE_ORDER);
        setDataEDT_CS_SALE_ORDER_ORDER_TYPE(e.value);
    };

    const [
        datasEDT_CS_SALE_ORDER_MODEL_NAME,
        setDatasEDT_CS_SALE_ORDER_MODEL_NAME,
    ] = useState([]);
    const [
        dataEDT_CS_SALE_ORDER_MODEL_NAME,
        setDataEDT_CS_SALE_ORDER_MODEL_NAME,
    ] = useState({});

    const onDropdownChangeEDT_CS_SALE_ORDER_MODEL_NAME = (e, name) => {
        let val = (e.value && e.value.MODEL1) || "";

        let _dataEDT_CS_SALE_ORDER = { ...dataEDT_CS_SALE_ORDER };

        let tTypeVal = _dataEDT_CS_SALE_ORDER[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_CS_SALE_ORDER[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_CS_SALE_ORDER[`${name}`] = parseInt(val);
        }

        setDataEDT_CS_SALE_ORDER(_dataEDT_CS_SALE_ORDER);
        setDataEDT_CS_SALE_ORDER_MODEL_NAME(e.value);
    };

    const [datasEDT_CS_SALE_ORDER_OPTION1, setDatasEDT_CS_SALE_ORDER_OPTION1] =
        useState([]);
    const [dataEDT_CS_SALE_ORDER_OPTION1, setDataEDT_CS_SALE_ORDER_OPTION1] =
        useState({});

    const onDropdownChangeEDT_CS_SALE_ORDER_OPTION1 = (e, name) => {
        let val = (e.value && e.value.CD_NAME) || "";

        let _dataEDT_CS_SALE_ORDER = { ...dataEDT_CS_SALE_ORDER };

        let tTypeVal = _dataEDT_CS_SALE_ORDER[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_CS_SALE_ORDER[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_CS_SALE_ORDER[`${name}`] = parseInt(val);
        }

        setDataEDT_CS_SALE_ORDER(_dataEDT_CS_SALE_ORDER);
        setDataEDT_CS_SALE_ORDER_OPTION1(e.value);
    };

    const [datasEDT_CS_SALE_ORDER_OPTION2, setDatasEDT_CS_SALE_ORDER_OPTION2] =
        useState([]);
    const [dataEDT_CS_SALE_ORDER_OPTION2, setDataEDT_CS_SALE_ORDER_OPTION2] =
        useState({});

    const onDropdownChangeEDT_CS_SALE_ORDER_OPTION2 = (e, name) => {
        let val = (e.value && e.value.CD_NAME) || "";

        let _dataEDT_CS_SALE_ORDER = { ...dataEDT_CS_SALE_ORDER };

        let tTypeVal = _dataEDT_CS_SALE_ORDER[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_CS_SALE_ORDER[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_CS_SALE_ORDER[`${name}`] = parseInt(val);
        }

        setDataEDT_CS_SALE_ORDER(_dataEDT_CS_SALE_ORDER);
        setDataEDT_CS_SALE_ORDER_OPTION2(e.value);
    };

    const onCheckboxChangeEDT_CS_SALE_ORDER_CONTRACT_FLAG = (e, name) => {
        let val = "";
        let _dataEDT_CS_SALE_ORDER = { ...dataEDT_CS_SALE_ORDER };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_CS_SALE_ORDER[`${name}`] = val;
        setDataEDT_CS_SALE_ORDER(_dataEDT_CS_SALE_ORDER);
    };

    const onInputChangeEDT_CS_SALE_ORDER_VENDOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_CS_SALE_ORDER = { ...dataEDT_CS_SALE_ORDER };

        let tTypeVal = _dataEDT_CS_SALE_ORDER[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_CS_SALE_ORDER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_CS_SALE_ORDER[`${name}`] = parseInt(val);

        setDataEDT_CS_SALE_ORDER(_dataEDT_CS_SALE_ORDER);
    };

    const onCalChangeEDT_CS_SALE_ORDER_WORK_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_CS_SALE_ORDER = { ...dataEDT_CS_SALE_ORDER };
        _dataEDT_CS_SALE_ORDER[`${name}`] = val;
        setDataEDT_CS_SALE_ORDER(_dataEDT_CS_SALE_ORDER);
    };

    const onInputChangeEDT_CS_SALE_ORDER_WORK_TIME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_CS_SALE_ORDER = { ...dataEDT_CS_SALE_ORDER };

        let tTypeVal = _dataEDT_CS_SALE_ORDER[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_CS_SALE_ORDER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_CS_SALE_ORDER[`${name}`] = parseInt(val);

        setDataEDT_CS_SALE_ORDER(_dataEDT_CS_SALE_ORDER);
    };

    const onCheckboxChangeEDT_CS_SALE_ORDER_WORK_FLAG = (e, name) => {
        let val = "";
        let _dataEDT_CS_SALE_ORDER = { ...dataEDT_CS_SALE_ORDER };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_CS_SALE_ORDER[`${name}`] = val;
        setDataEDT_CS_SALE_ORDER(_dataEDT_CS_SALE_ORDER);
    };

    const onCheckboxChangeEDT_CS_SALE_ORDER_TEST_FLAG = (e, name) => {
        let val = "";
        let _dataEDT_CS_SALE_ORDER = { ...dataEDT_CS_SALE_ORDER };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_CS_SALE_ORDER[`${name}`] = val;
        setDataEDT_CS_SALE_ORDER(_dataEDT_CS_SALE_ORDER);
    };

    const [
        datasEDT_CS_SALE_ORDER_WORK_USER,
        setDatasEDT_CS_SALE_ORDER_WORK_USER,
    ] = useState([]);
    const [
        dataEDT_CS_SALE_ORDER_WORK_USER,
        setDataEDT_CS_SALE_ORDER_WORK_USER,
    ] = useState({});

    const onDropdownChangeEDT_CS_SALE_ORDER_WORK_USER = (e, name) => {
        let val = (e.value && e.value.USER_NAME) || "";

        let _dataEDT_CS_SALE_ORDER = { ...dataEDT_CS_SALE_ORDER };

        let tTypeVal = _dataEDT_CS_SALE_ORDER[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_CS_SALE_ORDER[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_CS_SALE_ORDER[`${name}`] = parseInt(val);
        }

        setDataEDT_CS_SALE_ORDER(_dataEDT_CS_SALE_ORDER);
        setDataEDT_CS_SALE_ORDER_WORK_USER(e.value);
    };

    const onInputChangeEDT_CS_SALE_ORDER_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_CS_SALE_ORDER = { ...dataEDT_CS_SALE_ORDER };

        let tTypeVal = _dataEDT_CS_SALE_ORDER[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_CS_SALE_ORDER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_CS_SALE_ORDER[`${name}`] = parseInt(val);

        setDataEDT_CS_SALE_ORDER(_dataEDT_CS_SALE_ORDER);
    };

    /* */

    useEffect(() => {
        serviceS0101_CS_SALE_ORDER
            .mgrQueryTBL_CS_SALE_ORDER(dataQRY_CS_SALE_ORDER)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "serviceS0101_CS_SALE_ORDER.mgrQueryTBL_CS_SALE_ORDER call => " +
                            data.length,
                    );
                    setDatasTBL_CS_SALE_ORDER(data);
                } else {
                    console.log(
                        "serviceS0101_CS_SALE_ORDER.mgrQueryTBL_CS_SALE_ORDE error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        serviceS0101_CS_SALE_ORDER
            .mgrQueryTBL_CS_SALE_ORDER_CODE()
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "serviceS0101_CS_SALE_ORDER.mgrQueryTBL_CS_SALE_ORDER_CODE call => " +
                            data.USER_NAME.length,
                    );

                    setDatasQRY_CS_SALE_ORDER_USER_NAME(data.USER_NAME);
                    setDatasQRY_CS_SALE_ORDER_ORDER_TYPE(data.ORDER_TYPE);
                    setDatasEDT_CS_SALE_ORDER_USER_NAME(data.USER_NAME);
                    setDatasEDT_CS_SALE_ORDER_ORDER_TYPE(data.ORDER_TYPE);
                    setDatasEDT_CS_SALE_ORDER_OPTION1(data.OPTION1);
                    setDatasEDT_CS_SALE_ORDER_OPTION2(data.OPTION2);
                    setDatasEDT_CS_SALE_ORDER_WORK_USER(data.WORK_USER);
                } else {
                    console.log(
                        "serviceS0101_CS_SALE_ORDER.mgrQueryTBL_CS_SALE_ORDER_CODE error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
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
        <div>
            <div style={{ marginTop: "1rem", width: "100rem", height: "2rem" }}>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>납품일</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "22rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yymmdd"
                            id="id_S_DATE"
                            value={changeDateVal(dataQRY_CS_SALE_ORDER.S_DATE)}
                            onChange={(e) =>
                                onCalChangeQRY_CS_SALE_ORDER_S_DATE(e, "S_DATE")
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
                    <p style={{ width: "8rem", display: "inline-block" }}>~</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "22rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yymmdd"
                            id="id_E_DATE"
                            value={changeDateVal(dataQRY_CS_SALE_ORDER.E_DATE)}
                            onChange={(e) =>
                                onCalChangeQRY_CS_SALE_ORDER_E_DATE(e, "E_DATE")
                            }
                        />
                    </div>
                </span>
            </div>
            <div style={{ width: "100rem", height: "2rem" }}>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>영업담당자</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "22rem",
                        }}
                    >
                        <Dropdown
                            id="id_USER_NAME"
                            value={dataQRY_CS_SALE_ORDER_USER_NAME}
                            onChange={(e) =>
                                onDropdownChangeQRY_CS_SALE_ORDER_USER_NAME(
                                    e,
                                    "USER_NAME",
                                )
                            }
                            options={datasQRY_CS_SALE_ORDER_USER_NAME}
                            optionLabel="USER_NAME"
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
                    <p style={{ width: "8rem", display: "inline-block" }}>발주종류</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "22rem",
                        }}
                    >
                        <Dropdown
                            id="id_ORDER_TYPE"
                            value={dataQRY_CS_SALE_ORDER_ORDER_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_CS_SALE_ORDER_ORDER_TYPE(
                                    e,
                                    "ORDER_TYPE",
                                )
                            }
                            options={datasQRY_CS_SALE_ORDER_ORDER_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
            </div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "22rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_CS_SALE_ORDER}
                    size="small"
                    value={datasTBL_CS_SALE_ORDER}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_CS_SALE_ORDER}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_CS_SALE_ORDER(true);
                        setSelectedTBL_CS_SALE_ORDER(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_CS_SALE_ORDER.length,
                        );
                        onRowClick1TBL_CS_SALE_ORDER(e.value);
                    }}
                    onRowClick={onRowClickTBL_CS_SALE_ORDER}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 50 }}
                    emptyMessage="No TBL_CS_SALE_ORDER found."
                    header={headerTBL_CS_SALE_ORDER}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="WORK_DATE" header="납품일" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="WORK_TIME" header="납품시간" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" header="현장명" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="MODEL_NAME" header="모델명" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="OPTION1" header="옵션1" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="USER_NAME" header="영업담당자" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ACCESORY_FLAG" header="악세사리여부" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div style={{ width: "100rem", height: "2rem" }}>
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
                    <div style={{ width: "99rem", height: "30rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "70rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>납품명</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "60rem",
                                }}
                                id="id_ORDER_NAME"
                                value={dataEDT_CS_SALE_ORDER.ORDER_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_CS_SALE_ORDER_ORDER_NAME(
                                        e,
                                        "ORDER_NAME",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>현장명</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "22rem",
                                }}
                                id="id_BUYER_NAME"
                                value={dataEDT_CS_SALE_ORDER.BUYER_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_CS_SALE_ORDER_BUYER_NAME(
                                        e,
                                        "BUYER_NAME",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>발주일</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "22rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yymmdd"
                                    id="id_IN_DATE"
                                    value={changeDateVal(
                                        dataEDT_CS_SALE_ORDER.IN_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_CS_SALE_ORDER_IN_DATE(
                                            e,
                                            "IN_DATE",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>영업담당자</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "22rem",
                                }}
                            >
                                <Dropdown
                                    id="id_USER_NAME"
                                    value={dataEDT_CS_SALE_ORDER_USER_NAME}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_CS_SALE_ORDER_USER_NAME(
                                            e,
                                            "USER_NAME",
                                        )
                                    }
                                    options={datasEDT_CS_SALE_ORDER_USER_NAME}
                                    optionLabel="USER_NAME"
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
                            <p style={{ width: "8rem", display: "inline-block", }}>발주종류</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "22rem",
                                }}
                            >
                                <Dropdown
                                    id="id_ORDER_TYPE"
                                    value={dataEDT_CS_SALE_ORDER_ORDER_TYPE}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_CS_SALE_ORDER_ORDER_TYPE(
                                            e,
                                            "ORDER_TYPE",
                                        )
                                    }
                                    options={datasEDT_CS_SALE_ORDER_ORDER_TYPE}
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
                            <p style={{ width: "8rem", display: "inline-block", }}>모델명</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "22rem",
                                }}
                            >
                                <Dropdown
                                    id="id_MODEL_NAME"
                                    value={dataEDT_CS_SALE_ORDER_MODEL_NAME}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_CS_SALE_ORDER_MODEL_NAME(
                                            e,
                                            "MODEL_NAME",
                                        )
                                    }
                                    options={datasEDT_CS_SALE_ORDER_MODEL_NAME}
                                    optionLabel="MODEL1"
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
                            <p style={{ width: "8rem", display: "inline-block", }}>옵션1</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "22rem",
                                }}
                            >
                                <Dropdown
                                    id="id_OPTION1"
                                    value={dataEDT_CS_SALE_ORDER_OPTION1}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_CS_SALE_ORDER_OPTION1(
                                            e,
                                            "OPTION1",
                                        )
                                    }
                                    options={datasEDT_CS_SALE_ORDER_OPTION1}
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
                            <p style={{ width: "8rem", display: "inline-block", }}>옵션2</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "22rem",
                                }}
                            >
                                <Dropdown
                                    id="id_OPTION2"
                                    value={dataEDT_CS_SALE_ORDER_OPTION2}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_CS_SALE_ORDER_OPTION2(
                                            e,
                                            "OPTION2",
                                        )
                                    }
                                    options={datasEDT_CS_SALE_ORDER_OPTION2}
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
                            <p style={{ width: "8rem", display: "inline-block", }}>계약</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "22rem",
                                }}
                            >
                                <Checkbox
                                    style={{
                                        display: "inline-block",
                                        width: "20rem",
                                        marginLeft: 80,
                                    }}
                                    id="id_CONTRACT_FLAG"
                                    checked={changeCheckBoxVal(
                                        dataEDT_CS_SALE_ORDER.CONTRACT_FLAG,
                                    )}
                                    onChange={(e) =>
                                        onCheckboxChangeEDT_CS_SALE_ORDER_CONTRACT_FLAG(
                                            e,
                                            "CONTRACT_FLAG",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>업체</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "22rem",
                                }}
                                id="id_VENDOR"
                                value={dataEDT_CS_SALE_ORDER.VENDOR}
                                onChange={(e) =>
                                    onInputChangeEDT_CS_SALE_ORDER_VENDOR(
                                        e,
                                        "VENDOR",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>납품일</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "22rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yymmdd"
                                    id="id_WORK_DATE"
                                    value={changeDateVal(
                                        dataEDT_CS_SALE_ORDER.WORK_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_CS_SALE_ORDER_WORK_DATE(
                                            e,
                                            "WORK_DATE",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>납품시간</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "22rem",
                                }}
                                id="id_WORK_TIME"
                                value={dataEDT_CS_SALE_ORDER.WORK_TIME}
                                onChange={(e) =>
                                    onInputChangeEDT_CS_SALE_ORDER_WORK_TIME(
                                        e,
                                        "WORK_TIME",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>설치</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "22rem",
                                }}
                            >
                                <Checkbox
                                    style={{
                                        display: "inline-block",
                                        width: "20rem",
                                        marginLeft: 80,
                                    }}
                                    id="id_WORK_FLAG"
                                    checked={changeCheckBoxVal(
                                        dataEDT_CS_SALE_ORDER.WORK_FLAG,
                                    )}
                                    onChange={(e) =>
                                        onCheckboxChangeEDT_CS_SALE_ORDER_WORK_FLAG(
                                            e,
                                            "WORK_FLAG",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>시운전</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "22rem",
                                }}
                            >
                                <Checkbox
                                    style={{
                                        display: "inline-block",
                                        width: "20rem",
                                        marginLeft: 80,
                                    }}
                                    id="id_TEST_FLAG"
                                    checked={changeCheckBoxVal(
                                        dataEDT_CS_SALE_ORDER.TEST_FLAG,
                                    )}
                                    onChange={(e) =>
                                        onCheckboxChangeEDT_CS_SALE_ORDER_TEST_FLAG(
                                            e,
                                            "TEST_FLAG",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>납품담당자</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "22rem",
                                }}
                            >
                                <Dropdown
                                    id="id_WORK_USER"
                                    value={dataEDT_CS_SALE_ORDER_WORK_USER}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_CS_SALE_ORDER_WORK_USER(
                                            e,
                                            "WORK_USER",
                                        )
                                    }
                                    options={datasEDT_CS_SALE_ORDER_WORK_USER}
                                    optionLabel="USER_NAME"
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
                            <p style={{ width: "8rem", display: "inline-block", }}>처리내용</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "60rem",
                                }}
                                id="id_REMARK"
                                value={dataEDT_CS_SALE_ORDER.REMARK}
                                onChange={(e) =>
                                    onInputChangeEDT_CS_SALE_ORDER_REMARK(
                                        e,
                                        "REMARK",
                                    )
                                }
                            />
                        </span>
                    </div>
                </div>
            </div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "22rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_CS_PRODUCT_SUB1}
                    size="small"
                    value={datasTBL_CS_PRODUCT_SUB1}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_CS_PRODUCT_SUB1}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_CS_PRODUCT_SUB1(true);
                        setSelectedTBL_CS_PRODUCT_SUB1(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_CS_PRODUCT_SUB1.length,
                        );
                        onRowClick1TBL_CS_PRODUCT_SUB1(e.value);
                    }}
                    onRowClick={onRowClickTBL_CS_PRODUCT_SUB1}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 50 }}
                    emptyMessage="No TBL_CS_PRODUCT_SUB1 found."
                    header={headerTBL_CS_PRODUCT_SUB1}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="KIND1" header="구분" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="MODEL1" header="모델1" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="MODEL2" header="모델2" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="AMOUNT" header="단가" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="QTY" header="수량" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "22rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_CS_PRODUCT_SUB2}
                    size="small"
                    value={datasTBL_CS_PRODUCT_SUB2}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_CS_PRODUCT_SUB2}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_CS_PRODUCT_SUB2(true);
                        setSelectedTBL_CS_PRODUCT_SUB2(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_CS_PRODUCT_SUB2.length,
                        );
                        onRowClick1TBL_CS_PRODUCT_SUB2(e.value);
                    }}
                    onRowClick={onRowClickTBL_CS_PRODUCT_SUB2}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 50 }}
                    emptyMessage="No TBL_CS_PRODUCT_SUB2 found."
                    header={headerTBL_CS_PRODUCT_SUB2}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="KIND1" header="구분" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="MODEL1" header="모델1" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="MODEL2" header="모델2" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="AMOUNT" header="단가" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="QTY" header="수량" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0101_CS_SALE_ORDER, comparisonFn);
