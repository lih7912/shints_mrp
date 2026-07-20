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
import { ServiceS0522_STOCK_LIST } from "../service/service_biz/ServiceS0522_STOCK_LIST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    BUYER_CD: "",
    PO_CD: "",
    ORDER_CD: "",
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

const emptyEDT_KSV_PO_MRP = {
    STOCK_DATE: "",
    CHARGER: "",
    OWNER_SHIP: "",
    REASON_MAKE: "",
    AUTHORITY: "",
    CONDITION: "",
    MANAGER: "",
    REMARK: "",
    PURPOSE: "",
};

const S0522_STOCK_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0522_STOCK_LISTRef = useRef(null);
    if (!serviceS0522_STOCK_LISTRef.current) serviceS0522_STOCK_LISTRef.current = new ServiceS0522_STOCK_LIST();
    const serviceS0522_STOCK_LIST = serviceS0522_STOCK_LISTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    // dialog
    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    // Search

    // Search KSV_STOCK_MEM
    const search_LIST_1 = () => {
        var tObj = { ...dataQRY_KSV_PO_MRP };

        var tInObj = {};
        tInObj.BUYER_CD = tObj.BUYER_CD;
        tInObj.PO_CD = tObj.PO_CD;
        tInObj.ORDER_CD = tObj.ORDER_CD;
        tInObj.MATL_NAME = "";
        tInObj.COLOR = "";
        tInObj.SPEC = "";
        tInObj.MATL_CD = "";
        tInObj.VENDOR_NAME = "";

        setLoadingTBL_KSV_PO_MRP(true);

        // 2
        serviceS0522_STOCK_LIST.mgrQuery_LIST_1(tInObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_PO_MRP(tArray);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP] =
        useState(emptyQRY_KSV_PO_MRP);

    const [datasQRY_KSV_PO_MRP_BUYER_CD, setDatasQRY_KSV_PO_MRP_BUYER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_BUYER_CD, setDataQRY_KSV_PO_MRP_BUYER_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_BUYER_CD(e.value);
    };

    const [datasQRY_KSV_PO_MRP_PO_CD, setDatasQRY_KSV_PO_MRP_PO_CD] = useState(
        [],
    );
    const [dataQRY_KSV_PO_MRP_PO_CD, setDataQRY_KSV_PO_MRP_PO_CD] = useState(
        {},
    );

    const onInputChangeQRY_KSV_PO_MRP_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const [datasQRY_KSV_PO_MRP_ORDER_CD, setDatasQRY_KSV_PO_MRP_ORDER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_ORDER_CD, setDataQRY_KSV_PO_MRP_ORDER_CD] =
        useState({});

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

        if (typeof argData0.length !== "undefined") {
            if (argData0.length <= 0) return;
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP = argData;

        setDataTBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);

        var tObj = { ...dataEDT_KSV_PO_MRP };
        tObj.STOCK_DATE = argData.STOCK_DATE;
        tObj.CHARGER = argData.CHARGER;
        tObj.OWNER_SHIP = argData.OWNER_SHIP;
        tObj.REASON_MAKE = argData.REASON_MAKE;
        tObj.AUTHORITY = argData.AUTHORITY;
        tObj.CONDITION = argData.CONDITION;
        tObj.MANAGER = argData.MANAGER;
        tObj.REMARK = argData.REMARK;
        tObj.PURPOSE = argData.PURPOSE;
        setDataEDT_KSV_PO_MRP(tObj);

        editEDT_KSV_PO_MRP_OWNER_SHIP(tObj.OWNER_SHIP);
        editEDT_KSV_PO_MRP_REASON_MAKE(tObj.REASON_MAKE);
        editEDT_KSV_PO_MRP_AUTHORITY(tObj.AUTHORITY);
        editEDT_KSV_PO_MRP_CONDITION(tObj.CONDITION);
        editEDT_KSV_PO_MRP_MANAGER(tObj.MANAGER);
        editEDT_KSV_PO_MRP_REMARK(tObj.REMARK);
        editEDT_KSV_PO_MRP_PURPOSE(tObj.PURPOSE);

        var tRetArray = [];

        var tArray = ["1", "2", "3", "4", "5", "LOST"];
        tArray.forEach((col, i) => {
            var tObj = {};
            tObj.SEQ = col;
            if (col === "LOST") tObj.QTY = parseFloat(argData.STOCK_QTY);
            else tObj.QTY = 0;
            tObj.LOCATION = "";
            tRetArray.push(tObj);
        });

        setDatasTBL_KSV_PO_MRP2(tRetArray);

        // search_LIST_2(argData);
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

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    const [datasEDT_KSV_PO_MRP_OWNER_SHIP, setDatasEDT_KSV_PO_MRP_OWNER_SHIP] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_OWNER_SHIP, setDataEDT_KSV_PO_MRP_OWNER_SHIP] =
        useState({});

    const editEDT_KSV_PO_MRP_OWNER_SHIP = (argValue) => {
        let _dataEDT_KSV_PO_MRP_OWNER_SHIP =
            datasEDT_KSV_PO_MRP_OWNER_SHIP.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_OWNER_SHIP(_dataEDT_KSV_PO_MRP_OWNER_SHIP[0]);
    };

    const [
        datasEDT_KSV_PO_MRP_REASON_MAKE,
        setDatasEDT_KSV_PO_MRP_REASON_MAKE,
    ] = useState([]);
    const [dataEDT_KSV_PO_MRP_REASON_MAKE, setDataEDT_KSV_PO_MRP_REASON_MAKE] =
        useState({});

    const editEDT_KSV_PO_MRP_REASON_MAKE = (argValue) => {
        let _dataEDT_KSV_PO_MRP_REASON_MAKE =
            datasEDT_KSV_PO_MRP_REASON_MAKE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_REASON_MAKE(_dataEDT_KSV_PO_MRP_REASON_MAKE[0]);
    };

    const [datasEDT_KSV_PO_MRP_AUTHORITY, setDatasEDT_KSV_PO_MRP_AUTHORITY] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_AUTHORITY, setDataEDT_KSV_PO_MRP_AUTHORITY] =
        useState({});

    const editEDT_KSV_PO_MRP_AUTHORITY = (argValue) => {
        let _dataEDT_KSV_PO_MRP_AUTHORITY =
            datasEDT_KSV_PO_MRP_AUTHORITY.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_AUTHORITY(_dataEDT_KSV_PO_MRP_AUTHORITY[0]);
    };

    const [datasEDT_KSV_PO_MRP_CONDITION, setDatasEDT_KSV_PO_MRP_CONDITION] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_CONDITION, setDataEDT_KSV_PO_MRP_CONDITION] =
        useState({});

    const editEDT_KSV_PO_MRP_CONDITION = (argValue) => {
        let _dataEDT_KSV_PO_MRP_CONDITION =
            datasEDT_KSV_PO_MRP_CONDITION.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_CONDITION(_dataEDT_KSV_PO_MRP_CONDITION[0]);
    };

    const [datasEDT_KSV_PO_MRP_MANAGER, setDatasEDT_KSV_PO_MRP_MANAGER] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_MANAGER, setDataEDT_KSV_PO_MRP_MANAGER] =
        useState({});

    const editEDT_KSV_PO_MRP_MANAGER = (argValue) => {
        let _dataEDT_KSV_PO_MRP_MANAGER = datasEDT_KSV_PO_MRP_MANAGER.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_PO_MRP_MANAGER(_dataEDT_KSV_PO_MRP_MANAGER[0]);
    };

    const [datasEDT_KSV_PO_MRP_REMARK, setDatasEDT_KSV_PO_MRP_REMARK] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_REMARK, setDataEDT_KSV_PO_MRP_REMARK] = useState(
        {},
    );

    const editEDT_KSV_PO_MRP_REMARK = (argValue) => {
        let _dataEDT_KSV_PO_MRP_REMARK = datasEDT_KSV_PO_MRP_REMARK.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_PO_MRP_REMARK(_dataEDT_KSV_PO_MRP_REMARK[0]);
    };

    const [datasEDT_KSV_PO_MRP_PURPOSE, setDatasEDT_KSV_PO_MRP_PURPOSE] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_PURPOSE, setDataEDT_KSV_PO_MRP_PURPOSE] =
        useState({});

    const editEDT_KSV_PO_MRP_PURPOSE = (argValue) => {
        let _dataEDT_KSV_PO_MRP_PURPOSE = datasEDT_KSV_PO_MRP_PURPOSE.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_PO_MRP_PURPOSE(_dataEDT_KSV_PO_MRP_PURPOSE[0]);
    };

    ///

    useEffect(() => {
        var tObj = {};
        serviceS0522_STOCK_LIST.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_PO_MRP_PO_CD(data.PO_CD);
                setDataQRY_KSV_PO_MRP_PO_CD(data.PO_CD[0]);

                setDatasQRY_KSV_PO_MRP_ORDER_CD(data.ORDER_CD);
                setDataQRY_KSV_PO_MRP_ORDER_CD(data.ORDER_CD[0]);

                setDatasEDT_KSV_PO_MRP_OWNER_SHIP(data.OWNER_SHIP);
                setDataEDT_KSV_PO_MRP_OWNER_SHIP(data.OWNER_SHIP[0]);

                setDatasEDT_KSV_PO_MRP_REASON_MAKE(data.REASON_MAKE);
                setDataEDT_KSV_PO_MRP_REASON_MAKE(data.REASON_MAKE[0]);

                setDatasEDT_KSV_PO_MRP_AUTHORITY(data.AUTHORITY);
                setDataEDT_KSV_PO_MRP_AUTHORITY(data.AUTHORITY[0]);

                setDatasEDT_KSV_PO_MRP_CONDITION(data.CONDITION);
                setDataEDT_KSV_PO_MRP_CONDITION(data.CONDITION[0]);

                setDatasEDT_KSV_PO_MRP_MANAGER(data.MANAGER);
                setDataEDT_KSV_PO_MRP_MANAGER(data.MANAGER[0]);

                setDatasEDT_KSV_PO_MRP_REMARK(data.REMARK);
                setDataEDT_KSV_PO_MRP_REMARK(data.REMARK[0]);

                setDatasEDT_KSV_PO_MRP_PURPOSE(data.PURPOSE);
                setDataEDT_KSV_PO_MRP_PURPOSE(data.PURPOSE[0]);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        // search_LIST_1();
        // search_LIST_2();
    }, []);

    // Support Area

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3.5rem" }}
            >
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_ORIGIN_PORT"
                            value={dataQRY_KSV_PO_MRP_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>PO#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_PO_CD(e, "PO_CD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Order#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.ORDER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_ORDER_CD(
                                    e,
                                    "ORDER_CD",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
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
                            style={{ width: "9rem" }}
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "55rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP}
                    size="small"
                    value={datasTBL_KSV_PO_MRP}
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_PO_MRP}
                    showGridlines
                    selectionMode="checkbox"
                    resizableColumns
                    columnResizeMode="expand"
                    selection={selectedTBL_KSV_PO_MRP}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MRP(true);
                        setSelectedTBL_KSV_PO_MRP(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KSV_PO_MRP.length,
                        );
                        onRowClick1TBL_KSV_PO_MRP(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MRP}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="55rem"
                >
                    <AFColumn field="STOCK_DATE" headerClassName="t-header" header="Out Date" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REASON_MAKE" headerClassName="t-header" header="Reason" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order#" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Desc" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Qty" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_STATUS_2" headerClassName="t-header" header="Type" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_STATUS" headerClassName="t-header" header="Type(Bef)" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="OWNER_SHIP" headerClassName="t-header" header="Owner" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="AUTHORITY" headerClassName="t-header" header="Authority" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CONDITION" headerClassName="t-header" header="Condition" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MANAGER" headerClassName="t-header" header="Manager" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PURPOSE" headerClassName="t-header" header="Purpose" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REASON_REMARK" headerClassName="t-header" header="Reason Remark" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
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
            ></Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0522_STOCK_LIST, comparisonFn);
