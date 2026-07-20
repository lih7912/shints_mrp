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
import { ServiceS0207_PO_REGIST } from "../service/service_biz/ServiceS0207_PO_REGIST";

// import './page_common.scss';

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MST = {
    PO_CD: "",
    ORDER_CD: "",
    STYLE_CD: "",
    BUYER_CD: "",
    GOODS_FLAG: "",
    SAMPLE_FLAG: "",
    FACTORY_LC_FLAG: "",
};

const emptyTBL_KSV_ORDER_MST = {
    id: 0,
    ORDER_CD: "",
    STYLE_NAME: "",
    STYLE_CD: "",
    DUE_DATE: "",
    TOT_CNT: "",
    STATUS_NAME: "",
    STATUS_CD: "",
    FACTORY_NAME: "",
    FACTORY_CD: "",
};

const emptyTBL_KSV_PO_MST = {
    id: 0,
    PO_CD: "",
    ORDER_CD: "",
    DUE_DATE: "",
    TOT_CNT: "",
    STATUS_NAME: "",
    FACTORY_NAME: "",
    FACTORY_CD: "",
};

const emptyEDT_KSV_ORDER_MST = {
    ORDER_CD: "",
    STYLE_NAME: "",
    STYLE_CD: "",
    DUE_DATE: "",
    TOT_CNT: "",
    STATUS_NAME: "",
    STATUS_CD: "",
    FACTORY_NAME: "",
    FACTORY_CD: "",
};

const S0207_PO_REGIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0207_PO_REGISTRef = useRef(null);
    if (!serviceS0207_PO_REGISTRef.current) serviceS0207_PO_REGISTRef.current = new ServiceS0207_PO_REGIST();
    const serviceS0207_PO_REGIST = serviceS0207_PO_REGISTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /*QRY KSV_PO_MST */
    const [dataQRY_KSV_PO_MST, setDataQRY_KSV_PO_MST] =
        useState(emptyQRY_KSV_PO_MST);

    const onInputChangeQRY_KSV_PO_MST_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const [datasQRY_KSV_PO_MST_STYLE_CD, setDatasQRY_KSV_PO_MST_STYLE_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MST_STYLE_CD, setDataQRY_KSV_PO_MST_STYLE_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MST_STYLE_CD = (e, name) => {
        let val = (e.value && e.value.STYLE_CD) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
        setDataQRY_KSV_PO_MST_STYLE_CD(e.value);
    };

    const [datasQRY_KSV_PO_MST_BUYER_CD, setDatasQRY_KSV_PO_MST_BUYER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MST_BUYER_CD, setDataQRY_KSV_PO_MST_BUYER_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MST_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
        setDataQRY_KSV_PO_MST_BUYER_CD(e.value);
    };

    const onCheckboxChangeQRY_KSV_PO_MST_GOODS_FLAG = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MST[`${name}`] = val;
        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onCheckboxChangeQRY_KSV_PO_MST_SAMPLE_FLAG = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MST[`${name}`] = val;
        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onCheckboxChangeQRY_KSV_PO_MST_FACTORY_LC_FLAG = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MST[`${name}`] = val;
        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    /* TABLE KSV_ORDER_MST*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_MST
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

    const onRowClick1TBL_KSV_ORDER_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_MST = argData;

        setDataTBL_KSV_ORDER_MST(argTBL_KSV_ORDER_MST);
    };

    const onRowClickTBL_KSV_ORDER_MST = (event) => {
        let argTBL_KSV_ORDER_MST = event.data;
        if (flagSelectModeTBL_KSV_ORDER_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MST
    };

    const searchTBL_KSV_ORDER_MST = () => {
        serviceS0207_PO_REGIST
            .mgrQueryTBL_KSV_ORDER_MST(dataQRY_KSV_PO_MST)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        " cserviceS0207_PO_REGIST.mgrQueryTBL_KSV_ORDER_MST all => " +
                            data.length,
                    );
                    setDatasTBL_KSV_ORDER_MST(data);
                } else {
                    console.log(
                        "serviceS0207_PO_REGIST.mgrQueryTBL_KSV_ORDER_MST error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
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
            saveAsExcelFileTBL_KSV_ORDER_MST(excelBuffer, "PO_RESIST 목록");
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

    /**TABLE KSV_PO_MST */
    // DEFINE DATAGRID : TBL_KSV_PO_MST
    const [datasTBL_KSV_PO_MST, setDatasTBL_KSV_PO_MST] = useState([]);
    const dt_TBL_KSV_PO_MST = useRef(null);
    const [dataTBL_KSV_PO_MST, setDataTBL_KSV_PO_MST] =
        useState(emptyTBL_KSV_PO_MST);
    const [selectedTBL_KSV_PO_MST, setSelectedTBL_KSV_PO_MST] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MST, setFlagSelectModeTBL_KSV_PO_MST] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MST

    const onRowClick1TBL_KSV_PO_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MST = argData;

        setDataTBL_KSV_PO_MST(argTBL_KSV_PO_MST);
    };

    const onRowClickTBL_KSV_PO_MST = (event) => {
        let argTBL_KSV_PO_MST = event.data;
        if (flagSelectModeTBL_KSV_PO_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MST
    };

    /***EDIT KSV_ORDER_MST */

    const [datasEDT_KSV_ORDER_MST, setDatasEDT_KSV_ORDER_MST] = useState([]);
    const [dataEDT_KSV_ORDER_MST, setDataEDT_KSV_ORDER_MST] = useState(
        emptyEDT_KSV_ORDER_MST,
    );

    const saveEDT_KSV_ORDER_MST = () => {
        console.log(dataEDT_KSV_ORDER_MST.id);
        saveEDT_KSV_ORDER_MST_INSERT();
    };

    const saveEDT_KSV_ORDER_MST_INSERT = () => {
        let _datasSAVE_OBJ = [...selectedTBL_KSV_ORDER_MST];
        var tSaveObjArray = _datasSAVE_OBJ.map((col, i) => {
            var tObj = {};
            tObj = { ...col };
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            tObj.ORDER_FLAG = "1";
            tObj.MATL_SALE_FLAG = "0";
            tObj.FAC_LC_FLAG = "0";
            tObj.SAMPLE_FLAG = "0";
            return tObj;
        });

        serviceS0207_PO_REGIST
            .mgrInsertEDT_KSV_ORDER_MST(tSaveObjArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceS0207_PO_REGIST.mgrInsertEDT_KSV_ORDER_MST() call => " +
                            data.length,
                    );
                    // Search

                    var tQryObj = { ...dataQRY_KSV_PO_MST };
                    tQryObj.PO_CD = data[0].CODE;
                    tQryObj.ORDER_CD = "";
                    tQryObj.STYLE_CD = "";
                    tQryObj.BUYER_CD = "";
                    tQryObj.GOODS_FLAG = "";
                    tQryObj.FACTORY_LC_FLAG = "";

                    serviceS0207_PO_REGIST
                        .mgrQueryTBL_KSV_PO_MST(tQryObj)
                        .then((data) => {
                            if (typeof data.graphQLErrors === "undefined") {
                                console.log(
                                    " cserviceS0207_PO_REGIST.mgrQueryTBL_KSV_PO_MST all => " +
                                        data.length,
                                );
                                setDatasTBL_KSV_PO_MST(data);
                            } else {
                                console.log(
                                    "serviceS0207_PO_REGIST.mgrQueryTBL_KSV_PO_MST error => " +
                                        JSON.stringify(data.graphQLErrors),
                                );
                            }
                        });
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0207_PO_REGIST( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const onInputChangeEDT_KSV_ORDER_MST_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const onInputChangeEDT_KSV_ORDER_MST_STYLE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const onInputChangeEDT_KSV_ORDER_MST_STYLE_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const onInputChangeEDT_KSV_ORDER_MST_DUE_DATE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const onInputChangeEDT_KSV_ORDER_MST_TOT_CNT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const onInputChangeEDT_KSV_ORDER_MST_STATUS_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const onInputChangeEDT_KSV_ORDER_MST_STATUS_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const onInputChangeEDT_KSV_ORDER_MST_FACTORY_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const onInputChangeEDT_KSV_ORDER_MST_FACTORY_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };
    useEffect(() => {
        serviceS0207_PO_REGIST
            .mgrQueryTBL_KSV_ORDER_MST(dataQRY_KSV_PO_MST)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        " cserviceS0207_PO_REGIST.mgrQueryTBL_KSV_ORDER_MST all => " +
                            data.length,
                    );
                    setDatasTBL_KSV_ORDER_MST(data);
                } else {
                    console.log(
                        "serviceS0207_PO_REGIST.mgrQueryTBL_KSV_ORDER_MST error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        serviceS0207_PO_REGIST.mgrQueryTBL_KSV_ORDER_MST_CODE().then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    " serviceS0207_PO_REGIST.mgrQueryTBL_KSV_ORDER_MST_CODE  all => " +
                        data.STYLE.length,
                );
                setDatasQRY_KSV_PO_MST_BUYER_CD(data.BUYER);
                setDatasQRY_KSV_PO_MST_STYLE_CD(data.STYLE);
            } else {
                console.log(
                    "serviceS0207_PO_REGIST.mgrQueryTBL_KSV_ORDER_MST_CODE  error => " +
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

    return (
        <div>
            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "100rem",
                    height: "5rem",
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
                    <p style={{ width: "4rem", display: "inline-block" }}>Order</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_ORDER_CD"
                        value={dataQRY_KSV_PO_MST.ORDER_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MST_ORDER_CD(e, "ORDER_CD")
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
                    <p style={{ width: "4rem", display: "inline-block" }}>Style</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_STYLE_CD"
                            value={dataQRY_KSV_PO_MST_STYLE_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MST_STYLE_CD(
                                    e,
                                    "STYLE_CD",
                                )
                            }
                            options={datasQRY_KSV_PO_MST_STYLE_CD}
                            optionLabel="STYLE_NAME"
                            placeholder="All"
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span style={{ display: "inline-block", marginLeft: "5rem" }}>
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
                        onClick={searchTBL_KSV_ORDER_MST}
                    />

                    <Button
                        label="Excel"
                        style={{ height: "1.1rem", color: "green" }}
                        icon="pi pi-upload"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_ORDER_MST}
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
                    <p style={{ width: "4rem", display: "inline-block" }}>Buyer</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_BUYER_CD"
                            value={dataQRY_KSV_PO_MST_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MST_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_PO_MST_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder="All"
                            editable
                            filter
                        ></Dropdown>
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
                    <p style={{ width: "4rem", display: "inline-block" }}>Goods</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "3rem",
                        }}
                    >
                        <Checkbox
                            style={{
                                display: "inline-block",
                                width: "2rem",
                                marginLeft: "0.5rem",
                            }}
                            id="id_GOODS_FLAG"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MST.GOODS_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MST_GOODS_FLAG(
                                    e,
                                    "GOODS_FLAG",
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
                    <p style={{ width: "4rem", display: "inline-block" }}>Sample</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "3rem",
                        }}
                    >
                        <Checkbox
                            style={{
                                display: "inline-block",
                                width: "2rem",
                                marginLeft: "0.5rem",
                            }}
                            id="id_SAMPLE_FLAG"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MST.SAMPLE_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MST_SAMPLE_FLAG(
                                    e,
                                    "SAMPLE_FLAG",
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
                    <p style={{ width: "4rem", display: "inline-block" }}>Factory</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "3rem",
                        }}
                    >
                        <Checkbox
                            style={{
                                display: "inline-block",
                                width: "2rem",
                                marginLeft: "0.5rem",
                            }}
                            id="id_FACTORY_LC_FLAG"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MST.FACTORY_LC_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MST_FACTORY_LC_FLAG(
                                    e,
                                    "FACTORY_LC_FLAG",
                                )
                            }
                        />
                    </div>
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
                    ref={dt_TBL_KSV_ORDER_MST}
                    size="small"
                    value={datasTBL_KSV_ORDER_MST}
                    resizableColumns
                    columnResizeMode="fit"
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="multiple"
                    selection={selectedTBL_KSV_ORDER_MST}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_ORDER_MST(true);
                        setSelectedTBL_KSV_ORDER_MST(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_ORDER_MST.length,
                        );
                        onRowClick1TBL_KSV_ORDER_MST(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_MST}
                    dataKey="ORDER_CD"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 14 }}
                    emptyMessage=" "
                    //header={headerTBL_KSV_ORDER_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="28rem"
                >
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order CD" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style Name" style={{ width: "17rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STYLE_CD" headerClassName="t-header" header="Style CD" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DUE_DATE" headerClassName="t-header" header="Due Date" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="TOT_CNT" headerClassName="t-header" header="Qty" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STATUS_NAME" headerClassName="t-header" header="Status Name" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STATUS_CD" headerClassName="t-header" header="STATUS CD" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FACTORY_NAME" headerClassName="t-header" header="Factory Name" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FACTORY_CD" headerClassName="t-header" header="Factory CD" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div style={{ width: "100rem", height: "12rem", display: "none" }}>
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "90rem", height: "10rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Order CD</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_ORDER_CD"
                                value={dataEDT_KSV_ORDER_MST.ORDER_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST_ORDER_CD(
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Style Name</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_STYLE_NAME"
                                value={dataEDT_KSV_ORDER_MST.STYLE_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST_STYLE_NAME(
                                        e,
                                        "STYLE_NAME",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Style CD</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_STYLE_CD"
                                value={dataEDT_KSV_ORDER_MST.STYLE_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST_STYLE_CD(
                                        e,
                                        "STYLE_CD",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Due Date</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_DUE_DATE"
                                value={dataEDT_KSV_ORDER_MST.DUE_DATE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST_DUE_DATE(
                                        e,
                                        "DUE_DATE",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Qty</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_TOT_CNT"
                                value={dataEDT_KSV_ORDER_MST.TOT_CNT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST_TOT_CNT(
                                        e,
                                        "TOT_CNT",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Status</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_STATUS_NAME"
                                value={dataEDT_KSV_ORDER_MST.STATUS_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST_STATUS_NAME(
                                        e,
                                        "STATUS_NAME",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>STATUS CD</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_STATUS_CD"
                                value={dataEDT_KSV_ORDER_MST.STATUS_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST_STATUS_CD(
                                        e,
                                        "STATUS_CD",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Factory Name</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_FACTORY_NAME"
                                value={dataEDT_KSV_ORDER_MST.FACTORY_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST_FACTORY_NAME(
                                        e,
                                        "FACTORY_NAME",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Factory CD</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_FACTORY_CD"
                                value={dataEDT_KSV_ORDER_MST.FACTORY_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST_FACTORY_CD(
                                        e,
                                        "FACTORY_CD",
                                    )
                                }
                            />
                        </span>
                    </div>

                    <div style={{ width: "40rem", height: "30rem" }}></div>
                </div>
            </div>

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
                            onClick={saveEDT_KSV_ORDER_MST}
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

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "22rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MST}
                    size="small"
                    value={datasTBL_KSV_PO_MST}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MST}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MST(true);
                        setSelectedTBL_KSV_PO_MST(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KSV_PO_MST.length,
                        );
                        onRowClick1TBL_KSV_PO_MST(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MST}
                    dataKey="ORDER_CD"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 9 }}
                    emptyMessage=" "
                    //header={headerTBL_KSV_PO_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO CD" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order CD" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DUE_DATE" headerClassName="t-header" header="Due Date" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="TOT_CNT" headerClassName="t-header" header="Qty" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STATUS_NAME" headerClassName="t-header" header="Status" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FACTORY_NAME" headerClassName="t-header" header="Factory Name" style={{ width: "17rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FACTORY_CD" headerClassName="t-header" header="Factory CD" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>
            <Divider />
            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0207_PO_REGIST, comparisonFn);
