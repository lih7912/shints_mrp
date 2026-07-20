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
import { ServiceAFCommon } from "../service/service_lib/ServiceAFCommon";
import { ServiceS0516_STOCK_USE_CONFIRM } from "../service/service_biz/ServiceS0516_STOCK_USE_CONFIRM";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_STOCK_USE = {
    WAREHOUSE: "",
    PO_CD: "",
    PO_SEQ: "",
    VENDOR_CD: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    USE_DATE: "",
};

const emptyTBL_KSV_STOCK_USE = {
    id: 0,
    WARE_NAME: "",
    PO_CD: "",
    PO_SEQ: "",
    ORDER_CD: "",
    ORDER_MATL_CD: "",
    STOCK_MATL_CD: "",
    VENDOR_NAME: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    STOCK_STATUS: "",
    RACK: "",
    LOCATION: "",
    USE_QTY: "",
    ORG_QTY: "",
    USED_QTY: "",
    DEFACT: "",
    LOSS: "",
    CONF_FLAG: "",
    CONF_USER: "",
    CONF_DATETIME: "",
    USE_PO_CD: "",
    USE_ORDER_CD: "",
    USE_DATETIME: "",
};

const emptyTBL_KSV_STOCK_USE2 = {
    id: 0,
    WARE_NAME: "",
    PO_CD: "",
    PO_SEQ: "",
    ORDER_CD: "",
    ORDER_MATL_CD: "",
    STOCK_MATL_CD: "",
    VENDOR_NAME: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    STOCK_STATUS: "",
    RACK: "",
    LOCATION: "",
    USE_QTY: "",
    ORG_QTY: "",
    USED_QTY: "",
    DEFACT: "",
    LOSS: "",
    CONF_FLAG: "",
    CONF_USER: "",
    CONF_DATETIME: "",
    USE_PO_CD: "",
    USE_ORDER_CD: "",
    USE_DATETIME: "",
};


const S0516_STOCK_USE_CONFIRM = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceAFCommonRef = useRef(null);
    if (!serviceAFCommonRef.current) serviceAFCommonRef.current = new ServiceAFCommon();
    const serviceAFCommon = serviceAFCommonRef.current;
    const serviceS0516_STOCK_USE_CONFIRMRef = useRef(null);
    if (
        !serviceS0516_STOCK_USE_CONFIRMRef.current ||
        typeof serviceS0516_STOCK_USE_CONFIRMRef.current.mgrExport_EXCEL2 !== "function"
    )
        serviceS0516_STOCK_USE_CONFIRMRef.current =
            new ServiceS0516_STOCK_USE_CONFIRM();
    const serviceS0516_STOCK_USE_CONFIRM = serviceS0516_STOCK_USE_CONFIRMRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    //
    const onKeyPress_COMM_QRY = (e, name) => {
        if (e.key === "Enter") {
            search_COMM_QRY(name, e.target.value);
        }
    };

    const search_COMM_QRY = (argMode, argData) => {
        if (argMode === "BUYER")
            serviceAFCommon.mgrQuery_BUYER(argData).then((data) => {});
        if (argMode === "VENDOR")
            serviceAFCommon.mgrQuery_VENDOR(argData).then((data) => {
                if (data.length > 0) setDatasQRY_KSV_STOCK_USE_VENDOR_CD(data);
            });
        if (argMode === "STYLE")
            serviceAFCommon.mgrQuery_STYLE(argData).then((data) => {
                console.log("");
            });
    };

    const search_CODE = (argPoCd) => {
        var _tObj = {};
        _tObj.PO_CD = argPoCd;

        serviceS0516_STOCK_USE_CONFIRM.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (argPoCd === "") {
                    setDatasQRY_KSV_STOCK_USE_WAREHOUSE(data.FACTORY_WARE);
                    setDataQRY_KSV_STOCK_USE_WAREHOUSE(data.FACTORY_WARE[0]);

                    setDatasQRY_KSV_STOCK_USE_PO_CD(data.PO_CD);
                    setDataQRY_KSV_STOCK_USE_PO_CD(data.PO_CD[0]);

                    setDatasQRY_KSV_STOCK_USE_PO_SEQ(data.PO_SEQ);
                    setDataQRY_KSV_STOCK_USE_PO_SEQ(data.PO_SEQ[0]);

                    setDatasQRY_KSV_STOCK_USE_VENDOR_CD(data.VENDOR_CD);
                    setDataQRY_KSV_STOCK_USE_VENDOR_CD(data.VENDOR_CD[0]);

                    setDatasQRY_KSV_STOCK_USE_CONDITION(data.CONDITION);
                    setDataQRY_KSV_STOCK_USE_CONDITION(data.CONDITION[0]);
                } else {
                    setDatasQRY_KSV_STOCK_USE_PO_CD(data.PO_CD);
                    setDataQRY_KSV_STOCK_USE_PO_CD(data.PO_CD[0]);

                    setDatasQRY_KSV_STOCK_USE_PO_SEQ(data.PO_SEQ);
                    setDataQRY_KSV_STOCK_USE_PO_SEQ(data.PO_SEQ[0]);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_CODE_PO_SEQ = (argPoCd) => {
        var _tObj = {};
        _tObj.PO_CD = argPoCd;

        serviceS0516_STOCK_USE_CONFIRM
            .mgrQuery_CODE_PO_SEQ(_tObj)
            .then((data) => {
                console.log(data);
                if (typeof data.graphQLErrors === "undefined") {
                    setDatasQRY_KSV_STOCK_USE_PO_SEQ(data.PO_SEQ);
                    setDataQRY_KSV_STOCK_USE_PO_SEQ(data.PO_SEQ[0]);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const search_LIST_1 = () => {
        var _tData = { ...dataQRY_KSV_STOCK_USE };
        _tData.PO_CD = _tData.PO_CD.trim();
        _tData.CONDITION = dataQRY_KSV_STOCK_USE_CONDITION.CD_CODE;

        if (_tData.PO_CD === "") {
            alert("PO# is required");
            return;
        }

        setDatasTBL_KSV_STOCK_USE([]);
        setSelectedTBL_KSV_STOCK_USE([]);
        setLoadingTBL_KSV_STOCK_USE(true);
        serviceS0516_STOCK_USE_CONFIRM.mgrQuery_LIST_1(_tData).then((data) => {
            setLoadingTBL_KSV_STOCK_USE(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray2 = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_STOCK_USE(tArray2);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const process_STOCK_CONFIRM = () => {
        if (selectedTBL_KSV_STOCK_USE.length <= 0) return;

        var tInputs = [];
        var tCheck = 0;
        var tCheck1 = 0;
        selectedTBL_KSV_STOCK_USE.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;

            if (tObj.ORG_PO_CD) tInputs.push(tObj);

            //if (tObj.CONF_FLAG !== '2' && tObj.CONF_FLAG !== '1') {
            // tInputs.push(tObj);

            //}
        });

        //setDatasTBL_KSV_STOCK_USE([]);
        //setSelectedTBL_KSV_STOCK_USE([]);
        setLoadingTBL_KSV_STOCK_USE(true);
        serviceS0516_STOCK_USE_CONFIRM
            .mgrInsert_STOCK_CONFIRM(tInputs)
            .then((data) => {
                setLoadingTBL_KSV_STOCK_USE(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        search_LIST_1();
                    }
                } else {
                    console.log(
                        "mgrInesrt_STOCK_CONFIRM error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    /* QRY KSV_STOCK_USE*/
    const [dataQRY_KSV_STOCK_USE, setDataQRY_KSV_STOCK_USE] = useState(
        emptyQRY_KSV_STOCK_USE,
    );

    const [
        datasQRY_KSV_STOCK_USE_WAREHOUSE,
        setDatasQRY_KSV_STOCK_USE_WAREHOUSE,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_USE_WAREHOUSE,
        setDataQRY_KSV_STOCK_USE_WAREHOUSE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_USE_WAREHOUSE = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataQRY_KSV_STOCK_USE = { ...dataQRY_KSV_STOCK_USE };

        let tTypeVal = _dataQRY_KSV_STOCK_USE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_USE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_USE[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_USE(_dataQRY_KSV_STOCK_USE);
        setDataQRY_KSV_STOCK_USE_WAREHOUSE(e.value);
    };

    const [datasQRY_KSV_STOCK_USE_PO_CD, setDatasQRY_KSV_STOCK_USE_PO_CD] =
        useState([]);
    const [dataQRY_KSV_STOCK_USE_PO_CD, setDataQRY_KSV_STOCK_USE_PO_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_USE_PO_CD = (e, name) => {
        let val = "";
        if (typeof e.value === "string") val = e.value;
        else val = (e.value && e.value.PO_CD) || "";

        let _dataQRY_KSV_STOCK_USE = { ...dataQRY_KSV_STOCK_USE };

        let tTypeVal = _dataQRY_KSV_STOCK_USE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_USE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_USE[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_USE(_dataQRY_KSV_STOCK_USE);
        setDataQRY_KSV_STOCK_USE_PO_CD(e.value);

        search_CODE_PO_SEQ(val);
    };

    const [datasQRY_KSV_STOCK_USE_PO_SEQ, setDatasQRY_KSV_STOCK_USE_PO_SEQ] =
        useState([]);
    const [dataQRY_KSV_STOCK_USE_PO_SEQ, setDataQRY_KSV_STOCK_USE_PO_SEQ] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_USE_PO_SEQ = (e, name) => {
        let val = (e.value && e.value.PO_SEQ) || "";

        let _dataQRY_KSV_STOCK_USE = { ...dataQRY_KSV_STOCK_USE };

        let tTypeVal = _dataQRY_KSV_STOCK_USE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_USE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_USE[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_USE(_dataQRY_KSV_STOCK_USE);
        setDataQRY_KSV_STOCK_USE_PO_SEQ(e.value);
    };

    const [
        datasQRY_KSV_STOCK_USE_CONDITION,
        setDatasQRY_KSV_STOCK_USE_CONDITION,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_USE_CONDITION,
        setDataQRY_KSV_STOCK_USE_CONDITION,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_USE_CONDITION = (e, name) => {
        let val = e.value;

        let _dataQRY_KSV_STOCK_USE = { ...dataQRY_KSV_STOCK_USE };

        let tTypeVal = _dataQRY_KSV_STOCK_USE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_USE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_USE[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_USE(_dataQRY_KSV_STOCK_USE);
        setDataQRY_KSV_STOCK_USE_CONDITION(e.value);
    };

    const [
        datasQRY_KSV_STOCK_USE_VENDOR_CD,
        setDatasQRY_KSV_STOCK_USE_VENDOR_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_USE_VENDOR_CD,
        setDataQRY_KSV_STOCK_USE_VENDOR_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_USE_VENDOR_CD = (e, name) => {
        let val = (e.value && e.value.VENDOR_CD) || "";

        let _dataQRY_KSV_STOCK_USE = { ...dataQRY_KSV_STOCK_USE };

        let tTypeVal = _dataQRY_KSV_STOCK_USE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_USE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_USE[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_USE(_dataQRY_KSV_STOCK_USE);
        setDataQRY_KSV_STOCK_USE_VENDOR_CD(e.value);
    };

    const onInputChangeQRY_KSV_STOCK_USE_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_USE = { ...dataQRY_KSV_STOCK_USE };

        let tTypeVal = _dataQRY_KSV_STOCK_USE[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_USE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_USE[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_USE(_dataQRY_KSV_STOCK_USE);
    };

    const onInputChangeQRY_KSV_STOCK_USE_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_USE = { ...dataQRY_KSV_STOCK_USE };

        let tTypeVal = _dataQRY_KSV_STOCK_USE[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_USE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_USE[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_USE(_dataQRY_KSV_STOCK_USE);
    };

    const onInputChangeQRY_KSV_STOCK_USE_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_USE = { ...dataQRY_KSV_STOCK_USE };

        let tTypeVal = _dataQRY_KSV_STOCK_USE[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_USE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_USE[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_USE(_dataQRY_KSV_STOCK_USE);
    };

    const onInputChangeQRY_KSV_STOCK_USE_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_USE = { ...dataQRY_KSV_STOCK_USE };

        let tTypeVal = _dataQRY_KSV_STOCK_USE[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_USE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_USE[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_USE(_dataQRY_KSV_STOCK_USE);
    };

    const onInputChangeQRY_KSV_STOCK_USE_UNIT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_USE = { ...dataQRY_KSV_STOCK_USE };

        let tTypeVal = _dataQRY_KSV_STOCK_USE[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_USE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_USE[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_USE(_dataQRY_KSV_STOCK_USE);
    };

    const onKeyPress_QRY_KSV_STOCK_USE_PO_CD = (e, name) => {
        if (e.key === "Enter") {
            search_CODE(e.target.value);
        }
    };

    /*TABLE KSV_STOCK_USE */
    // DEFINE DATAGRID : TBL_KSV_STOCK_USE
    const [datasTBL_KSV_STOCK_USE, setDatasTBL_KSV_STOCK_USE] = useState([]);
    const dt_TBL_KSV_STOCK_USE = useRef(null);
    const [dataTBL_KSV_STOCK_USE, setDataTBL_KSV_STOCK_USE] = useState(
        emptyTBL_KSV_STOCK_USE,
    );
    const [selectedTBL_KSV_STOCK_USE, setSelectedTBL_KSV_STOCK_USE] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KSV_STOCK_USE,
        setFlagSelectModeTBL_KSV_STOCK_USE,
    ] = useState(false);
    const [loadingTBL_KSV_STOCK_USE, setLoadingTBL_KSV_STOCK_USE] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_STOCK_USE

    const onRowClickTBL_KSV_STOCK_USE = (event) => {
        var argData = { ...event.data };
        let argTBL_KSV_STOCK_USE = argData;

        setDataTBL_KSV_STOCK_USE(argTBL_KSV_STOCK_USE);

        // let argTBL_KSV_STOCK_USE = event.data;
        // if (flagSelectModeTBL_KSV_STOCK_USE) return;
        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_USE
    };

    useEffect(() => {
        search_CODE("");
    }, []);

    const onCellEditCompleteTBL_KSV_STOCK_USE = (e) => {
        let { rowData, newValue, value, field, originalEvent: event } = e;
        var tRowData = { ...rowData };

        if (!tRowData.ORG_PO_CD) return;

        var tNewValue = "";
        if (typeof newValue?.code !== "undefined") {
            tNewValue = newValue.code;
        } else {
            tNewValue = newValue;
        }

        tRowData[field] = tNewValue;

        var tShortQty =
            parseFloat(tRowData.USE_QTY) -
            parseFloat(tRowData.OKUSE_QTY) -
            parseFloat(tRowData.DEFECT_QTY);
        tRowData.SHORT_QTY = parseFloat(tShortQty).toFixed(2);

        var tBalance =
            parseFloat(tRowData.USE_QTY) - parseFloat(tRowData.OKUSE_QTY);
        tRowData.BALANCE = parseFloat(tBalance).toFixed(2);

        console.log(tRowData);

        var tArray = [];
        datasTBL_KSV_STOCK_USE.forEach((col, i) => {
            var tObj = { ...col };
            if (tObj.id === tRowData.id) {
                tArray.push(tRowData);
            } else {
                tArray.push(tObj);
            }
        });

        setDatasTBL_KSV_STOCK_USE(tArray);
    };

    // GUIDE: 에디터 컴포넌트에 onKeyDown 이벤트를 연결한다.
    const onChangeTextEdit = (e, options) => {
        options.editorCallback(e.target.value);
    };

    const handleFocus = (event) => event.target.select();

    const cellEditorTBL_KSV_STOCK_USE = (options) => {
        //if (options.field === 'REASON') return dropboxEditor(options);
        //else return textEditor(options);
        return textEditor(options);
    };

    const exOption = [
        { name: " ", code: "" },
        { name: "Cancel", code: "CANCEL" },
        { name: "Lost", code: "LOST" },
        { name: "Defect", code: "DEFECT" },
        { name: "Cannot Use", code: "NOT_USE" },
    ];

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => onChangeTextEdit(e, options)}
                onFocus={handleFocus}
            />
        );
    };

    const export_EXCEL = () => {
        if (!datasTBL_KSV_STOCK_USE.length) {
            return;
        }

        setLoadingTBL_KSV_STOCK_USE(true);

        let dataArr = [];
        datasTBL_KSV_STOCK_USE.forEach((col, i) => {
            var tObj = { ...col };
            delete tObj.id;
            delete tObj.__typename;
            tObj.ORG_QTY = parseFloat(tObj.ORG_QTY).toFixed(2);
            dataArr.push(tObj);
        });

        serviceS0516_STOCK_USE_CONFIRM.mgrExport_EXCEL(dataArr).then((data) => {
            setLoadingTBL_KSV_STOCK_USE(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data[0].CODE.includes("SUCCEED")) {
                    serviceLib.downloadFile(
                        data[0].CODE.split("?")[2].toString(),
                        data[0].CODE.split("?")[1].toString(),
                    );
                } else {
                    alert(data[0].CODE);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const export_STOCK_USE_LIST = () => {
        if (!selectedTBL_KSV_STOCK_USE.length) {
            return;
        }

        setLoadingTBL_KSV_STOCK_USE(true);

        let dataArr = [];
        selectedTBL_KSV_STOCK_USE.forEach((col, i) => {
            var tObj = { ...col };
            delete tObj.id;
            delete tObj.__typename;
            tObj.ORG_QTY = parseFloat(tObj.ORG_QTY).toFixed(2);
            if (tObj.ORG_PO_CD) dataArr.push(tObj);
        });

        serviceS0516_STOCK_USE_CONFIRM
            .mgrExport_STOCK_USE_LIST(dataArr)
            .then((data) => {
                setLoadingTBL_KSV_STOCK_USE(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data[0].CODE.includes("SUCCEED")) {
                        serviceLib.downloadFile(
                            data[0].CODE.split("?")[2].toString(),
                            data[0].CODE.split("?")[1].toString(),
                        );
                    } else {
                        alert(data[0].CODE);
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const export_STOCK_CHECK_FORM = () => {
        if (!selectedTBL_KSV_STOCK_USE.length) {
            return;
        }

        let dataArr = [];
        selectedTBL_KSV_STOCK_USE.forEach((col, i) => {
            var tObj = { ...col };
            delete tObj.id;
            delete tObj.__typename;
            tObj.ORG_QTY = parseFloat(tObj.ORG_QTY).toFixed(2);
            if (tObj.ORG_PO_CD) dataArr.push(tObj);
        });

        serviceS0516_STOCK_USE_CONFIRM
            .mgrExport_STOCK_CHECK_FORM(dataArr)
            .then((data) => {
                setLoadingTBL_KSV_STOCK_USE(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data[0].CODE.includes("SUCCEED")) {
                        serviceLib.downloadFile(
                            data[0].CODE.split("?")[2].toString(),
                            data[0].CODE.split("?")[1].toString(),
                        );
                    } else {
                        alert(data[0].CODE);
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    ///
    /*TABLE KSV_STOCK_USE */
    // 
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    }; 

    // DEFINE DATAGRID : TBL_KSV_STOCK_USE2
    const [datasTBL_KSV_STOCK_USE2, setDatasTBL_KSV_STOCK_USE2] = useState([]);
    const dt_TBL_KSV_STOCK_USE2 = useRef(null);
    const [dataTBL_KSV_STOCK_USE2, setDataTBL_KSV_STOCK_USE2] = useState(
        emptyTBL_KSV_STOCK_USE2,
    );
    const [selectedTBL_KSV_STOCK_USE2, setSelectedTBL_KSV_STOCK_USE2] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KSV_STOCK_USE2,
        setFlagSelectModeTBL_KSV_STOCK_USE2,
    ] = useState(false);
    const [loadingTBL_KSV_STOCK_USE2, setLoadingTBL_KSV_STOCK_USE2] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_STOCK_USE2
    const onRowClickTBL_KSV_STOCK_USE2 = (event) => {
        var argData = { ...event.data };
        let argTBL_KSV_STOCK_USE2 = argData;
        setDataTBL_KSV_STOCK_USE2(argTBL_KSV_STOCK_USE2);
    };

    const onCellEditCompleteTBL_KSV_STOCK_USE2 = (e) => {
        let { rowData, newValue, value, field, originalEvent: event } = e;
        var tRowData = { ...rowData };

        var tNewValue = "";
        if (typeof newValue?.code !== "undefined") {
            tNewValue = newValue.code;
        } else {
            tNewValue = newValue;
        }

        tRowData[field] = tNewValue;
        /*
        var tShortQty =
            parseFloat(tRowData.USE_QTY) -
            parseFloat(tRowData.OKUSE_QTY) -
            parseFloat(tRowData.DEFECT_QTY);
        tRowData.SHORT_QTY = parseFloat(tShortQty).toFixed(2);

        var tBalance =
            parseFloat(tRowData.USE_QTY) - parseFloat(tRowData.OKUSE_QTY);
        tRowData.BALANCE = parseFloat(tBalance).toFixed(2);

        console.log(tRowData);
        */

        var tArray = [];
        datasTBL_KSV_STOCK_USE2.forEach((col, i) => {
            var tObj = { ...col };
            if (tObj.id === tRowData.id) {
                tArray.push(tRowData);
            } else {
                tArray.push(tObj);
            }
        });
        setDatasTBL_KSV_STOCK_USE2(tArray);
    };

    const cellEditorTBL_KSV_STOCK_USE2 = (options) => {
        //if (options.field === 'REASON') return dropboxEditor(options);
        //else return textEditor(options);
        return textEditor(options);
    };

    const export_EXCEL2 = () => {
        if (!datasTBL_KSV_STOCK_USE2.length) {
            return;
        }

        let dataArr = [];
        datasTBL_KSV_STOCK_USE2.forEach((col) => {
            var tObj = { ...col };
            delete tObj.id;
            delete tObj.__typename;
            const poCdRaw = dataQRY_KSV_STOCK_USE.PO_CD;
            tObj.INPUT_PO_CD = String(poCdRaw).trim();
            dataArr.push(tObj);
        });

        setLoadingTBL_KSV_STOCK_USE2(true);

        serviceS0516_STOCK_USE_CONFIRM.mgrExport_EXCEL2(dataArr).then((data) => {
            setLoadingTBL_KSV_STOCK_USE2(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data[0].CODE.includes("SUCCEED")) {
                    serviceLib.downloadFile(
                        data[0].CODE.split("?")[2].toString(),
                        data[0].CODE.split("?")[1].toString(),
                    );
                } else {
                    alert(data[0].CODE);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    ///

    const popup_SEND_ETP = () => {

        var tArray = [];
        var tIdx = 1;
        datasTBL_KSV_STOCK_USE.forEach((col, i) => {
            if (col.WARE_NAME && 
                col.WARE_NAME.includes('BVT') &&
                col.PO_CD.substring(0, 2) === 'EO') {

                var tObj = {}; 
                tObj.id = tIdx; tIdx += 1;
                tObj.BUYER_CD = col.ORDER_CD.substring(0,2);
                tObj.ORG_PO_CD = col.ORG_PO_CD;
                tObj.ORG_MATL_CD = col.ORG_MATL_CD;
                tObj.INVOICE_NO = col.DELIVERY || '';
                tObj.HS_CODE = col.HS_CODE;
                tObj.COMPOSITION = col.COMPOSITION;
                tObj.BVT_NAME = '';
                tObj.MATL_NAME = col.MATL_NAME;
                tObj.COLOR = col.COLOR;
                tObj.SPEC = col.SPEC;
                tObj.VENDOR_NAME = col.VENDOR_NAME;
                tObj.ORIGIN = '';
                tObj.USE_QTY = col.USE_QTY;
                tObj.CT_QTY = '0';
                tObj.CT_NO = '';
                   
                var tWeight = parseFloat(col.USE_QTY) * parseFloat(col.WEIGHT) * 0.001;
                    tWeight = parseFloat(tWeight).toFixed(3);
                tObj.WEIGHT = tWeight;

                tObj.CBM = '';
                tObj.PRICE = col.PRICE;
                tObj.UNIT = col.UNIT;

                var tAmount = parseFloat(col.USE_QTY) * parseFloat(col.PRICE);
                    tAmount = parseFloat(tAmount).toFixed(2);
                tObj.AMOUNT = tAmount;

                tObj.REMARK = col.REMARK;
                tArray.push(tObj);
            }
        });
        setDatasTBL_KSV_STOCK_USE2(tArray);

        setCreateDialog(true);
    };

    const process_SEND_ETP = () => {
        if (selectedTBL_KSV_STOCK_USE.length <= 0) return;
        var tSelObj = { ...selectedTBL_KSV_STOCK_USE[0] };

        var tEditObj = {};
        tEditObj.SHIP_MODE = "1"; // SEA
        tEditObj.CT_NO = "1";
        tEditObj.SENDER = "";
        tEditObj.SHIP_DATE = "";
        tEditObj.WEIGHT = "0";
        tEditObj.RECEIVER = "";
        tEditObj.PAYMENT = "2";
        tEditObj.CBM = "0";
        tEditObj.BUYER_CD = tSelObj.ORDER_CD.substring(0, 2);
        tEditObj.ORIGIN_PORT = "HANOI";
        tEditObj.ETC_ORIGIN = "";
        tEditObj.TARGET_ETA = "";
        tEditObj.DESTINATION = "ETP";
        tEditObj.ETC_DESTINATION = "";
        tEditObj.AMOUNT = "0";
        tEditObj.SHIP_LINE = "";
        tEditObj.DESC = "BVT Stock";
        tEditObj.BL_NO = "";
        tEditObj.REMARK = "BVT Stock";
        tEditObj.PLACE_CD = "";
        tEditObj.STSOUT_CD = "";
        tEditObj.PO_CD = tSelObj.PO_CD;
        tEditObj.ORDER_CD = tSelObj.ORDER_CD;

        var tArray = [];
        selectedTBL_KSV_STOCK_USE.forEach((col, i) => {
            var tObj = {};
            tObj.MATL_CD = col.MATL_CD;
            tObj.MATL_NAME = col.MATL_NAME;
            tObj.COLOR = col.COLOR;
            tObj.SPEC = col.SPEC;
            tObj.MATL_PRICE = "0";
            tObj.CURR_CD = "";
            tObj.UNIT = col.UNIT;
            // tObj.PO_QTY = col.USE_QTY2;
            tObj.PO_QTY = col.OKUSE_QTY;
            tObj.VENDOR_NAME = col.VENDOR_NAME;
            if (col.ORG_PO_CD) tArray.push(tObj);
        });
        tEditObj.DATAS = [...tArray];

        sessionStorage.setItem("S0516_SEND_ETP_INFO", JSON.stringify(tEditObj));

        var tUrl = `${window.location.origin}/#/`;
        tUrl += "S0440_FREIGHT_REGIST?PO_CD=" + tSelObj.PO_CD;

        var tUrl2 = "S0440_FREIGHT_REGIST?PO_CD=" + tSelObj.PO_CD;

        var tValObj = {
            key: "4-12",
            label: "Freight Reg",
            url: "S0440_FREIGHT_REGIST",
            url1: "S0440_FREIGHT_REGIST",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
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

    const onCalChange = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_USE = { ...dataQRY_KSV_STOCK_USE };
        _dataQRY_KSV_STOCK_USE[`${name}`] = val;
        setDataQRY_KSV_STOCK_USE(_dataQRY_KSV_STOCK_USE);
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

    const getStockMatlCdMismatchClass = (rowData) => {
        const orderMatlCd = (rowData.MATL_CD || "").trim();
        const stockMatlCd = (rowData.ORG_MATL_CD || "").trim();
        return stockMatlCd !== "" && orderMatlCd !== stockMatlCd
            ? "stock-matl-mismatch"
            : "";
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>PO#</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            filter
                            style={{ width: "10rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_STOCK_USE_PO_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_USE_PO_CD(
                                    e,
                                    "PO_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_USE_PO_CD}
                            optionLabel="PO_CD"
                            placeholder=""
                            onKeyPress={(e) =>
                                onKeyPress_QRY_KSV_STOCK_USE_PO_CD(e, "PO_CD")
                            }
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>PO Seq</p>
                    <div className="af-span-div" style={{ width: "5rem" }}>
                        <Dropdown
                            style={{ width: "5rem" }}
                            value={dataQRY_KSV_STOCK_USE_PO_SEQ}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_USE_PO_SEQ(
                                    e,
                                    "PO_SEQ",
                                )
                            }
                            options={datasQRY_KSV_STOCK_USE_PO_SEQ}
                            optionLabel="PO_SEQ"
                            placeholder=""
                        ></Dropdown>
                    </div>
                    <p className="af-span-p" style={{ width: "5rem" }}>Condition</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_PO_SEQ"
                            value={dataQRY_KSV_STOCK_USE_CONDITION}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_USE_CONDITION(
                                    e,
                                    "CONDITION",
                                )
                            }
                            options={datasQRY_KSV_STOCK_USE_CONDITION}
                            optionLabel="CD_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>WareHouse</p>
                    <div className="af-span-div" style={{ width: "18rem" }}>
                        <Dropdown
                            style={{ width: "18rem" }}
                            id="id_WAREHOUSE"
                            value={dataQRY_KSV_STOCK_USE_WAREHOUSE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_USE_WAREHOUSE(
                                    e,
                                    "WAREHOUSE",
                                )
                            }
                            options={datasQRY_KSV_STOCK_USE_WAREHOUSE}
                            optionLabel="WARE_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>

                <span className="af-span-3-0" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Supplier</p>
                    <div className="af-span-div" style={{ width: "18rem" }}>
                        <Dropdown
                            filter
                            style={{ width: "18rem" }}
                            id="id_VENDOR_CD"
                            value={dataQRY_KSV_STOCK_USE_VENDOR_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_USE_VENDOR_CD(
                                    e,
                                    "VENDOR_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_USE_VENDOR_CD}
                            optionLabel="VENDOR_NAME"
                            placeholder=""
                            onKeyPress={(e) => onKeyPress_COMM_QRY(e, "VENDOR")}
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
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
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Excel"
                            style={{ width: "9rem" }}
                            className="p-button-text green"
                            onClick={export_EXCEL}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>MATL#</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_MATL_CD"
                            value={dataQRY_KSV_STOCK_USE.MATL_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_USE_MATL_CD(
                                    e,
                                    "MATL_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Desc</p>
                    <div className="af-span-div" style={{ width: "18rem" }}>
                        <InputText
                            style={{ width: "20.5rem" }}
                            id="id_MATL_NAME"
                            value={dataQRY_KSV_STOCK_USE.MATL_NAME}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_USE_MATL_NAME(
                                    e,
                                    "MATL_NAME",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Color</p>
                    <div className="af-span-div" style={{ width: "18rem" }}>
                        <InputText
                            style={{ width: "18rem" }}
                            id="id_COLOR"
                            value={dataQRY_KSV_STOCK_USE.COLOR}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_USE_COLOR(e, "COLOR")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Spec</p>
                    <div className="af-span-div" style={{ width: "18rem" }}>
                        <InputText
                            style={{ width: "18rem" }}
                            id="id_SPEC"
                            value={dataQRY_KSV_STOCK_USE.SPEC}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_USE_SPEC(e, "SPEC")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Use Date</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            style={{ width: "6rem" }}
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_USE.USE_DATE,
                            )}
                            onChange={(e) => onCalChange(e, "USE_DATE")}
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "4rem" }}>Unit</p>
                    <div className="af-span-div" style={{ width: "3rem" }}>
                        <InputText
                            style={{ width: "3rem" }}
                            id="id_UNIT"
                            value={dataQRY_KSV_STOCK_USE.UNIT}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_USE_UNIT(e, "UNIT")
                            }
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "51rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_STOCK_USE}
                    editMode="cell"
                    size="small"
                    value={datasTBL_KSV_STOCK_USE}
                    loading={loadingTBL_KSV_STOCK_USE}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="checkbox"
                    dataKey="id"
                    selection={selectedTBL_KSV_STOCK_USE}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KSV_STOCK_USE(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_STOCK_USE}
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_STOCK_USE}
                    disableSort={true}
                    rowClassName={(rowData) =>
                        !rowData.WARE_NAME ? "row-wh-empty" : ""
                    }
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="557px"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="WARE_NAME" headerClassName="t-header" header="W/H" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORG_PO_CD" headerClassName="t-header" header="Org.PO#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORG_PO_SEQ" headerClassName="t-header" header="Seq" style={{ width: "3rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="Use PO#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Use Order#" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Order Matl#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORG_MATL_CD" headerClassName="t-header" header="Stock Matl#" style={{ width: "6rem", flexBasis: "auto" }} bodyClassName={getStockMatlCdMismatchClass} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Desc" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CONDITION" headerClassName="t-header" header="Condition" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="RACK" headerClassName="t-header" header="Rack" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="LOCATION" headerClassName="t-header" header="Location" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORG_QTY" headerClassName="t-header" header="Org.Qty" style={{ width: "6rem", flexBasis: "auto", textAlign: "right", }} body={(r) => serviceLib.formatNumber(r.ORG_QTY)} bodyStyle={{ textAlign: "right" }} ></AFColumn>
                    <AFColumn field="USE_QTY" headerClassName="t-header" header="Use Qty" style={{ width: "6rem", flexBasis: "auto", textAlign: "right", }} body={(r) => serviceLib.formatNumber(r.USE_QTY)} bodyStyle={{ textAlign: "right" }} ></AFColumn>

                    {/* <!-- 20241001 추가 https://www.notion.so/shints/8-28-123-25c09bcd64ff8029a218f5f43ccf54ea?source=copy_link#27909bcd64ff8082afb7dfc1f10a27ca --> */}
                    <AFColumn field="OKUSE_QTY" headerClassName="t-header" header="OK Use" style={{ width: "6rem", flexBasis: "auto", textAlign: "right", }} body={(r) => serviceLib.formatNumber(r.OKUSE_QTY)} bodyStyle={{ textAlign: "right" }} className={(rowData) => !rowData.WARE_NAME ? "green" : "" } editor={(options) => { if (!options.rowData.WARE_NAME) return null; return cellEditorTBL_KSV_STOCK_USE(options); }} onCellEditComplete={onCellEditCompleteTBL_KSV_STOCK_USE} ></AFColumn>
                    <AFColumn field="DEFECT_QTY" headerClassName="t-header" header="Defect" style={{ width: "6rem", flexBasis: "auto", textAlign: "right", }} body={(r) => serviceLib.formatNumber(r.DEFECT_QTY)} bodyStyle={{ textAlign: "right" }} className={(rowData) => !rowData.WARE_NAME ? "green" : "" } editor={(options) => { if (!options.rowData.WARE_NAME) return null; return cellEditorTBL_KSV_STOCK_USE(options); }} onCellEditComplete={onCellEditCompleteTBL_KSV_STOCK_USE} ></AFColumn>
                    <AFColumn field="SHORT_QTY" headerClassName="t-header" header="Short" style={{ width: "6rem", flexBasis: "auto", textAlign: "right", }} body={(r) => serviceLib.formatNumber(r.SHORT_QTY)} bodyStyle={{ textAlign: "right" }} ></AFColumn>

                    <AFColumn field="BALANCE" headerClassName="t-header" header="Balance" style={{ width: "6rem", flexBasis: "auto", textAlign: "right", }} body={(r) => serviceLib.formatNumber(r.BALANCE)} bodyStyle={{ textAlign: "right" }} ></AFColumn>

                    <AFColumn forceWidth="150px" field="REASON" headerClassName="t-header" header="Remark" style={{ width: "12rem", flexBasis: "auto" }} className={(rowData) => !rowData.WARE_NAME ? "green" : "" } editor={(options) => { if (!options.rowData.WARE_NAME) return null; return cellEditorTBL_KSV_STOCK_USE(options); }} onCellEditComplete={onCellEditCompleteTBL_KSV_STOCK_USE} ></AFColumn>
                    <AFColumn field="USE_DATE" headerClassName="t-header" header="Use Date" style={{ width: "6rem", flexBasis: "auto" }} body={(r) => serviceLib.dateFormat(r.USE_DATE)} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "16rem" }}>
                    <div className="af-span-div-btn" style={{ width: "15rem" }}>
                        {/*<Button style={{ width: '15rem' }} label="Stock Confirm(Purchase))" className="p-button-text" onClick={process_STOCK_CONFIRM_PURCHASE} />*/}
                        <Button
                            style={{ width: "15rem" }}
                            label="Save"
                            className="p-button-text"
                            onClick={process_STOCK_CONFIRM}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "70rem" }}>
                    <div className="af-span-div-btn" style={{ width: "15rem" }}>
                        <Button
                            style={{ width: "15rem" }}
                            label="WareHouse"
                            className="p-button-text green"
                            onClick={export_STOCK_USE_LIST}
                        />
                    </div>
                    <div className="af-span-div-btn" style={{ width: "15rem" }}>
                        <Button
                            style={{ width: "15rem" }}
                            label="Stock Check Form"
                            className="p-button-text green"
                            onClick={export_STOCK_CHECK_FORM}
                        />
                    </div>
                    <div className="af-span-div-btn" style={{ width: "15rem" }}>
                        <Button
                            style={{ width: "15rem" }}
                            label="Send ETP"
                            className="p-button-text orange"
                            onClick={process_SEND_ETP}
                        />
                    </div>
                    <div className="af-span-div-btn" style={{ width: "15rem" }}>
                        <Button
                            style={{ width: "15rem" }}
                            label="Send ETP(Excel)"
                            className="p-button-text orange"
                            onClick={popup_SEND_ETP}
                        />
                    </div>
                </span>
            </div>
            <Toast ref={toast} />
            {/* Stock Check Dialog */}
            <Dialog
                visible={createDialog}
                position="mid-center"
                style={{
                    overflow: "hidden",
                    width: "122rem",
                    height: "70rem",
                    marginLeft: "0rem",
                    marginTop: "0rem",
                    paddingLeft: "0rem",
                    paddingTop: "0rem",
                }}
                header="Send ETP"
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <div
                    className="af-div-first"
                    style={{ width: "100%", height: "61rem" }}
                >

                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_STOCK_USE2}
                    editMode="cell"
                    size="small"
                    value={datasTBL_KSV_STOCK_USE2}
                    loading={loadingTBL_KSV_STOCK_USE2}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="checkbox"
                    dataKey="id"
                    selection={selectedTBL_KSV_STOCK_USE2}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KSV_STOCK_USE2(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_STOCK_USE2}
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_STOCK_USE2}
                    disableSort={true}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="557px"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORG_PO_CD" headerClassName="t-header" header="PO#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORG_MATL_CD" headerClassName="t-header" header="Code" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="INVOICE_NO" headerClassName="t-header" header="Delivery#" style={{ width: "13rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="HS_CODE" headerClassName="t-header" header="HS CODE" style={{ width: "13rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COMPOSITION" headerClassName="t-header" header="Composition" style={{ width: "13rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BVT_NAME" headerClassName="t-header" header="Vietnam Name" style={{ width: "13rem", flexBasis: "auto" }} 
                              editor={(options) => { return cellEditorTBL_KSV_STOCK_USE2(options); }} onCellEditComplete={onCellEditCompleteTBL_KSV_STOCK_USE2}
                    ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Desc" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORIGIN" headerClassName="t-header" header="Origin" style={{ width: "12rem", flexBasis: "auto" }} 
                              editor={(options) => { return cellEditorTBL_KSV_STOCK_USE2(options); }} onCellEditComplete={onCellEditCompleteTBL_KSV_STOCK_USE2}
                    ></AFColumn>
                    <AFColumn field="USE_QTY" headerClassName="t-header" header="In Qty" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CT_QTY" headerClassName="t-header" header="Ct Qty" style={{ width: "10rem", flexBasis: "auto" }} 
                              editor={(options) => { return cellEditorTBL_KSV_STOCK_USE2(options); }} onCellEditComplete={onCellEditCompleteTBL_KSV_STOCK_USE2}
                    ></AFColumn>
                    <AFColumn field="CT_NO" headerClassName="t-header" header="Ct No" style={{ width: "10rem", flexBasis: "auto" }} 
                              editor={(options) => { return cellEditorTBL_KSV_STOCK_USE2(options); }} onCellEditComplete={onCellEditCompleteTBL_KSV_STOCK_USE2}
                    ></AFColumn>
                    <AFColumn field="WEIGHT" headerClassName="t-header" header="Weight" style={{ width: "10rem", flexBasis: "auto" }} 
                              editor={(options) => { return cellEditorTBL_KSV_STOCK_USE2(options); }} onCellEditComplete={onCellEditCompleteTBL_KSV_STOCK_USE2}
                    ></AFColumn>
                    <AFColumn field="CBM" headerClassName="t-header" header="CBM" style={{ width: "10rem", flexBasis: "auto" }} 
                              editor={(options) => { return cellEditorTBL_KSV_STOCK_USE2(options); }} onCellEditComplete={onCellEditCompleteTBL_KSV_STOCK_USE2}
                    ></AFColumn>
                    <AFColumn field="PRICE" headerClassName="t-header" header="Price" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="AMOUNT" headerClassName="t-header" header="Amount" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "20rem", flexBasis: "auto" }} 
                              editor={(options) => { return cellEditorTBL_KSV_STOCK_USE2(options); }} onCellEditComplete={onCellEditCompleteTBL_KSV_STOCK_USE2}
                    ></AFColumn>
                </AFDataTable>
                </div>

                <div
                    className="af-div-first"
                    style={{ width: "99rem", height: "3rem" }}
                >
                    <span className="af-span-3-2" style={{ width: "11rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "10rem" }}
                        >
                            <Button
                                label="Excel"
                                style={{ width: "10rem" }}
                                className="p-button-text green"
                                onClick={export_EXCEL2}
                            />
                        </div>
                    </span>
                </div>
            </Dialog>

        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0516_STOCK_USE_CONFIRM, comparisonFn);
