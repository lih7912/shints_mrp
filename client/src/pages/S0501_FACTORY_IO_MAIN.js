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
import { ServiceS0501_FACTORY_IO_MAIN } from "../service/service_biz/ServiceS0501_FACTORY_IO_MAIN";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_FACTORY_IN = {
    FACTORY_CD: "",
    PO_CD: "",
    ORDER_CD: "",
    MATL_CD: "",
    VENDOR_CD: "",
    MATL_NAME: "",
    COLOR: "",
    UNIT: "",
    SPEC: "",
    ETD: "",
    ETA: "",
    IN_DATE: "",
};

const emptyQRY_KSV_FACTORY_IN1 = {
    KIND: "",
};

const emptyTBL_KSV_FACTORY_IN1 = {
    id: 0,
};

const emptyTBL_KSV_FACTORY_IN = {
    id: 0,
    VENDOR_NAME: "",
    SEQ: 0,
    MATL_CD: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    NEED_QTY: "",
    STS_IN: "",
    STS_OUT: "",
    STOCK_USE: "",
    FAC_IN_TOT: "",
    ERROR: "",
    SHORT_AGE: "",
    OTHER: "",
    FAC_IN_BAL: "",
    FAC_OUT_TOT: "",
    FAC_OUT_BAL: "",
    LEFT_OVER: "",
    STOCK_MOVE: "",
    ADJUST: "",
    REMAIN: "",
    REMARK_STS: "",
};

const emptyEDT_KSV_FACTORY_IN1 = {
    ERROR: "",
    SHORT_AGE: "",
    OTHER: "",
    ADJUST: "",
    REMARK: "",
    IN_DATE: "",
};

const S0501_FACTORY_IO_MAIN = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0501_FACTORY_IO_MAINRef = useRef(null);
    if (!serviceS0501_FACTORY_IO_MAINRef.current) serviceS0501_FACTORY_IO_MAINRef.current = new ServiceS0501_FACTORY_IO_MAIN();
    const serviceS0501_FACTORY_IO_MAIN = serviceS0501_FACTORY_IO_MAINRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [data_OP_KIND, setData_OP_KIND] = useState("");

    /* QRY KSV_FACTORY_IN*/
    const [dataQRY_KSV_FACTORY_IN, setDataQRY_KSV_FACTORY_IN] = useState(
        emptyQRY_KSV_FACTORY_IN,
    );

    const [
        datasQRY_KSV_FACTORY_IN_FACTORY_CD,
        setDatasQRY_KSV_FACTORY_IN_FACTORY_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_FACTORY_IN_FACTORY_CD,
        setDataQRY_KSV_FACTORY_IN_FACTORY_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_FACTORY_IN_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataQRY_KSV_FACTORY_IN = { ...dataQRY_KSV_FACTORY_IN };

        let tTypeVal = _dataQRY_KSV_FACTORY_IN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_FACTORY_IN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_FACTORY_IN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_FACTORY_IN(_dataQRY_KSV_FACTORY_IN);
        setDataQRY_KSV_FACTORY_IN_FACTORY_CD(e.value);
    };

    const [datasQRY_KSV_FACTORY_IN_PO_CD, setDatasQRY_KSV_FACTORY_IN_PO_CD] =
        useState([]);
    const [dataQRY_KSV_FACTORY_IN_PO_CD, setDataQRY_KSV_FACTORY_IN_PO_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_FACTORY_IN_PO_CD = (e, name) => {
        let val = "";
        if (typeof e.value === "string") val = e.value;
        else val = (e.value && e.value.PO_CD) || "";

        let _dataQRY_KSV_FACTORY_IN = { ...dataQRY_KSV_FACTORY_IN };

        let tTypeVal = _dataQRY_KSV_FACTORY_IN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_FACTORY_IN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_FACTORY_IN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_FACTORY_IN(_dataQRY_KSV_FACTORY_IN);
        setDataQRY_KSV_FACTORY_IN_PO_CD(e.value);
    };

    const [
        datasQRY_KSV_FACTORY_IN_ORDER_CD,
        setDatasQRY_KSV_FACTORY_IN_ORDER_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_FACTORY_IN_ORDER_CD,
        setDataQRY_KSV_FACTORY_IN_ORDER_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_FACTORY_IN_ORDER_CD = (e, name) => {
        let val = (e.value && e.value.ORDER_CD) || "";

        let _dataQRY_KSV_FACTORY_IN = { ...dataQRY_KSV_FACTORY_IN };

        let tTypeVal = _dataQRY_KSV_FACTORY_IN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_FACTORY_IN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_FACTORY_IN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_FACTORY_IN(_dataQRY_KSV_FACTORY_IN);
        setDataQRY_KSV_FACTORY_IN_ORDER_CD(e.value);
    };

    const onInputChangeQRY_KSV_FACTORY_IN_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_FACTORY_IN = { ...dataQRY_KSV_FACTORY_IN };

        let tTypeVal = _dataQRY_KSV_FACTORY_IN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_FACTORY_IN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_FACTORY_IN[`${name}`] = parseInt(val);

        setDataQRY_KSV_FACTORY_IN(_dataQRY_KSV_FACTORY_IN);
    };

    const [
        datasQRY_KSV_FACTORY_IN_VENDOR_CD,
        setDatasQRY_KSV_FACTORY_IN_VENDOR_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_FACTORY_IN_VENDOR_CD,
        setDataQRY_KSV_FACTORY_IN_VENDOR_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_FACTORY_IN_VENDOR_CD = (e, name) => {
        let val = (e.value && e.value.VENDOR_CD) || "";

        let _dataQRY_KSV_FACTORY_IN = { ...dataQRY_KSV_FACTORY_IN };

        let tTypeVal = _dataQRY_KSV_FACTORY_IN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_FACTORY_IN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_FACTORY_IN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_FACTORY_IN(_dataQRY_KSV_FACTORY_IN);
        setDataQRY_KSV_FACTORY_IN_VENDOR_CD(e.value);
    };

    const onInputChangeQRY_KSV_FACTORY_IN_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_FACTORY_IN = { ...dataQRY_KSV_FACTORY_IN };

        let tTypeVal = _dataQRY_KSV_FACTORY_IN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_FACTORY_IN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_FACTORY_IN[`${name}`] = parseInt(val);

        setDataQRY_KSV_FACTORY_IN(_dataQRY_KSV_FACTORY_IN);
    };

    const [datasQRY_KSV_FACTORY_IN_UNIT, setDatasQRY_KSV_FACTORY_IN_UNIT] =
        useState([]);
    const [dataQRY_KSV_FACTORY_IN_UNIT, setDataQRY_KSV_FACTORY_IN_UNIT] =
        useState({});

    /* QRY KSV_FACOTRY_IN1*/
    const [dataQRY_KSV_FACTORY_IN1, setDataQRY_KSV_FACTORY_IN1] = useState(
        emptyQRY_KSV_FACTORY_IN1,
    );

    const [datasQRY_KSV_FACTORY_IN1_KIND, setDatasQRY_KSV_FACTORY_IN1_KIND] =
        useState([]);
    const [dataQRY_KSV_FACTORY_IN1_KIND, setDataQRY_KSV_FACTORY_IN1_KIND] =
        useState({});

    /**TABLE KSV_FACTORY_IN1 */
    const [datasTBL_KSV_FACTORY_IN1, setDatasTBL_KSV_FACTORY_IN1] = useState(
        [],
    );
    const dt_TBL_KSV_FACTORY_IN1 = useRef(null);
    const [dataTBL_KSV_FACTORY_IN1, setDataTBL_KSV_FACTORY_IN1] = useState(
        emptyTBL_KSV_FACTORY_IN1,
    );
    const [selectedTBL_KSV_FACTORY_IN1, setSelectedTBL_KSV_FACTORY_IN1] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_FACTORY_IN1,
        setFlagSelectModeTBL_KSV_FACTORY_IN1,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_FACTORY_IN1

    /**TABLE KSV_FACTORY_IN */
    // DEFINE DATAGRID : TBL_KSV_FACTORY_IN
    const [datasTBL_KSV_FACTORY_IN, setDatasTBL_KSV_FACTORY_IN] = useState([]);
    const dt_TBL_KSV_FACTORY_IN = useRef(null);
    const [dataTBL_KSV_FACTORY_IN, setDataTBL_KSV_FACTORY_IN] = useState(
        emptyTBL_KSV_FACTORY_IN,
    );
    const [selectedTBL_KSV_FACTORY_IN, setSelectedTBL_KSV_FACTORY_IN] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_FACTORY_IN,
        setFlagSelectModeTBL_KSV_FACTORY_IN,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_FACTORY_IN

    const onRowClick1TBL_KSV_FACTORY_IN = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_FACTORY_IN = argData;

        setDataTBL_KSV_FACTORY_IN(argTBL_KSV_FACTORY_IN);
    };

    const onRowClickTBL_KSV_FACTORY_IN = (event) => {
        let argTBL_KSV_FACTORY_IN = event.data;
        if (flagSelectModeTBL_KSV_FACTORY_IN) return;

        // Service : NawooAll:mgrQueryTBL_KSV_FACTORY_IN
    };

    const searchTBL_KSV_FACTORY_IN = () => {
        clearSelectedTBL_KSV_FACTORY_IN();

        serviceS0501_FACTORY_IO_MAIN
            .mgrQueryTBL_KSV_FACTORY_IN(dataQRY_KSV_FACTORY_IN)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_FACTORY_IN() call => " +
                            data.length,
                    );
                    setDatasTBL_KSV_FACTORY_IN(data);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_FACTORY_IN()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KSV_FACTORY_IN
    };

    const clearSelectedTBL_KSV_FACTORY_IN = () => {
        setSelectedTBL_KSV_FACTORY_IN([]);
        setFlagSelectModeTBL_KSV_FACTORY_IN(false);
    };

    const exportExcelTBL_KSV_FACTORY_IN = () => {};

    /**EDIT KSV_FACTORY_IN1 */
    const [datasEDT_KSV_FACTORY_IN1, setDatasEDT_KSV_FACTORY_IN1] = useState(
        [],
    );
    const [dataEDT_KSV_FACTORY_IN1, setDataEDT_KSV_FACTORY_IN1] = useState(
        emptyEDT_KSV_FACTORY_IN1,
    );

    useEffect(() => {
        var _tObj = {};
        _tObj.KEY1 = "";

        serviceS0501_FACTORY_IO_MAIN.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.PO_CD.length,
                );

                setDatasQRY_KSV_FACTORY_IN_FACTORY_CD(data.FACTORY_CD);
                setDataQRY_KSV_FACTORY_IN_FACTORY_CD(data.FACTORY_CD[0]);

                setDatasQRY_KSV_FACTORY_IN_PO_CD(data.PO_CD);
                setDataQRY_KSV_FACTORY_IN_PO_CD(data.PO_CD[0]);

                setDatasQRY_KSV_FACTORY_IN_ORDER_CD([]);

                setDatasQRY_KSV_FACTORY_IN_VENDOR_CD(data.VENDOR_CD);
                setDataQRY_KSV_FACTORY_IN_VENDOR_CD(data.VENDOR_CD[0]);

                setDatasQRY_KSV_FACTORY_IN_UNIT(data.MATL_UNIT);
                setDataQRY_KSV_FACTORY_IN_UNIT(data.MATL_UNIT[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    }, []);

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
                        width: "29rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Factory</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "20rem",
                        }}
                    >
                        <Dropdown
                            id="id_FACTORY_CD"
                            style={{ width: "20rem" }}
                            value={dataQRY_KSV_FACTORY_IN_FACTORY_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_FACTORY_IN_FACTORY_CD(
                                    e,
                                    "FACTORY_CD",
                                )
                            }
                            options={datasQRY_KSV_FACTORY_IN_FACTORY_CD}
                            optionLabel="FACTORY_CD"
                            editable
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
                    <p style={{ width: "4rem", display: "inline-block" }}>PO</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "8rem",
                        }}
                    >
                        <Dropdown
                            id="id_PO_CD"
                            value={dataQRY_KSV_FACTORY_IN_PO_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_FACTORY_IN_PO_CD(
                                    e,
                                    "PO_CD",
                                )
                            }
                            options={datasQRY_KSV_FACTORY_IN_PO_CD}
                            optionLabel="PO_CD"
                            editable
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
                    <p style={{ width: "4rem", display: "inline-block" }}>Order</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Dropdown
                            id="id_ORDER_CD"
                            value={dataQRY_KSV_FACTORY_IN_ORDER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_FACTORY_IN_ORDER_CD(
                                    e,
                                    "ORDER_CD",
                                )
                            }
                            options={datasQRY_KSV_FACTORY_IN_ORDER_CD}
                            optionLabel="ORDER_CD"
                            editable
                        />
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
                    <p style={{ width: "6rem", display: "inline-block" }}>Matl Cd</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "8rem",
                        }}
                        id="id_MATL_CD"
                        value={dataQRY_KSV_FACTORY_IN.MATL_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_FACTORY_IN_MATL_CD(
                                e,
                                "MATL_CD",
                            )
                        }
                    />
                </span>

                <span style={{ display: "inline-block" }}>
                    <Button
                        label="List"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={searchTBL_KSV_FACTORY_IN}
                    />

                    <Button
                        label="List2"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_FACTORY_IN}
                    />

                    <Button
                        label="List3"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_FACTORY_IN}
                    />
                </span>

                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "29rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Supplier</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "20rem",
                        }}
                    >
                        <Dropdown
                            id="id_VENDOR_CD"
                            style={{ width: "20rem" }}
                            value={dataQRY_KSV_FACTORY_IN_VENDOR_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_FACTORY_IN_VENDOR_CD(
                                    e,
                                    "VENDOR_CD",
                                )
                            }
                            options={datasQRY_KSV_FACTORY_IN_VENDOR_CD}
                            optionLabel="VENDOR_NAME"
                            editable
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Description</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                        id="id_MATL_NAME"
                        value={dataQRY_KSV_FACTORY_IN.MATL_NAME}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_FACTORY_IN_MATL_NAME(
                                e,
                                "MATL_NAME",
                            )
                        }
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
                    ref={dt_TBL_KSV_FACTORY_IN}
                    size="small"
                    value={datasTBL_KSV_FACTORY_IN}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_FACTORY_IN}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_FACTORY_IN(true);
                        setSelectedTBL_KSV_FACTORY_IN(e.value);
                        onRowClick1TBL_KSV_FACTORY_IN(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_FACTORY_IN}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 12 }}
                    emptyMessage=" "
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="26rem"
                >
                    <AFColumn field="COL_1" headerClassName="t-header" header="Supplier" style={{ width: "15rem", flexBasis: "auto" }} />

                    <AFColumn field="COL_2" headerClassName="t-header" header="No" style={{ width: "4rem", flexBasis: "auto" }} />

                    <AFColumn field="COL_3" headerClassName="t-header" header="Matl Cd" style={{ width: "8rem", flexBasis: "auto" }} />

                    <AFColumn field="COL_4" headerClassName="t-header" header="Matl Name" style={{ width: "8rem", flexBasis: "auto" }} />

                    <AFColumn field="COL_5" headerClassName="t-header" header="Color" style={{ width: "13rem", flexBasis: "auto" }} />

                    <AFColumn field="COL_6" headerClassName="t-header" header="Spec" style={{ width: "15rem", flexBasis: "auto" }} />

                    <AFColumn field="COL_7" headerClassName="t-header" header="Unit" style={{ width: "5rem", flexBasis: "auto" }} />
                </AFDataTable>
            </div>

            <Divider />
            <Toast ref={toast} />
            <Divider />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0501_FACTORY_IO_MAIN, comparisonFn);
