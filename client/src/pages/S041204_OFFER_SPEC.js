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
import { ServiceS041204_OFFER_SPEC } from "../service/service_biz/ServiceS041204_OFFER_SPEC";

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
    VENDOR_NAME: "",
    MATL_NAME: "",
    SPEC: "",
    OFFER_SPEC: "",
};

const emptyEDT_KSV_STOCK_OUT = {
    PL_NO: "",
    IS_ALL: "",
    MATL_TYPE: "",
    OFFER_SPEC: "",
};

const S041204_OFFER_SPEC = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS041204_OFFER_SPECRef = useRef(null);
    if (!serviceS041204_OFFER_SPECRef.current) serviceS041204_OFFER_SPECRef.current = new ServiceS041204_OFFER_SPEC();
    const serviceS041204_OFFER_SPEC = serviceS041204_OFFER_SPECRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const update_OFFER_SPEC = () => {
        var _tObj = { ...dataEDT_KSV_STOCK_OUT };

        if (selectedTBL_KSV_STOCK_OUT.length <= 0) return;

        var _tInput = { ...selectedTBL_KSV_STOCK_OUT[0] };
        _tInput.OFFER_SPEC = _tObj.OFFER_SPEC;
        delete _tInput.__typename;
        delete _tInput.id;

        console.log(_tInput);

        var tArray = [];
        tArray.push(_tInput);

        serviceS041204_OFFER_SPEC.mgrInsert_OFFER_SPEC(tArray).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                toast.current.show({
                    severity: "success",
                    summary: "SUCCESS:Offer Spec Update",
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
                    summary: "ERROR:Offer Spec Update",
                    detail: "",
                    life: 3000,
                });
            }
        });
    };

    const search_OFFER_SPEC = () => {
        var tSrcData = { ...JSON.parse(localStorage.getItem("S041201_DATA")) };
        console.log(tSrcData);
        // setDataQRY_KSV_STOCK_OUT(tSrcData);

        // datasTBL_KSV_STOCK_OUT
        var _tObj = {};
        _tObj.PACK_CD = tSrcData.PACK_CD;
        _tObj.MATL_TYPE = "";

        serviceS041204_OFFER_SPEC.mgrQuery_OFFER_SPEC(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray = data.map((col, i) => {
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

        var _tEditData = { ...dataEDT_KSV_STOCK_OUT };
        _tEditData.OFFER_SPEC = argData.OFFER_SPEC;
        setDataEDT_KSV_STOCK_OUT(_tEditData);
    };

    const onRowClickTBL_KSV_STOCK_OUT = (event) => {
        let argTBL_KSV_STOCK_OUT = event.data;
        if (flagSelectModeTBL_KSV_STOCK_OUT) return;

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_OUT
    };

    /*EDIT KSV_STOCK_OUT */
    const [datasEDT_KSV_STOCK_OUT, setDatasEDT_KSV_STOCK_OUT] = useState([]);
    const [dataEDT_KSV_STOCK_OUT, setDataEDT_KSV_STOCK_OUT] = useState(
        emptyEDT_KSV_STOCK_OUT,
    );

    const onInputChangeEDT_KSV_STOCK_OUT_PL_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    const onInputChangeEDT_KSV_STOCK_OUT_OFFER_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    const onCheckboxChangeEDT_KSV_STOCK_OUT_IS_ALL = (e, name) => {
        let val = "";
        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    const [
        datasEDT_KSV_STOCK_OUT_MATL_TYPE,
        setDatasEDT_KSV_STOCK_OUT_MATL_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_STOCK_OUT_MATL_TYPE,
        setDataEDT_KSV_STOCK_OUT_MATL_TYPE,
    ] = useState({});

    const onDropdownChangeEDT_KSV_STOCK_OUT_MATL_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
        setDataEDT_KSV_STOCK_OUT_MATL_TYPE(e.value);
    };

    useEffect(() => {
        var tSrcData = { ...JSON.parse(localStorage.getItem("S041201_DATA")) };
        var _tEditData = { ...dataEDT_KSV_STOCK_OUT };
        _tEditData.PL_NO = tSrcData.PACK_CD;
        setDataEDT_KSV_STOCK_OUT(_tEditData);

        var _tObj = {};
        _tObj.PACK_CD = "";
        _tObj.MATL_TYPE = "";

        serviceS041204_OFFER_SPEC.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.MATL_TYPE.length,
                );

                setDatasEDT_KSV_STOCK_OUT_MATL_TYPE(data.MATL_TYPE);
                setDataEDT_KSV_STOCK_OUT_MATL_TYPE(data.MATL_TYPE[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        search_OFFER_SPEC();
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
                    height: "2rem",
                }}
            ></div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "22rem",
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
                    virtualScrollerOptions={{ itemSize: 9 }}
                    emptyMessage=" " // header={headerTBL_KSV_STOCK_OUT}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Desc" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="OFFER_SPEC" headerClassName="t-header" header="Offer Spec" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div style={{ width: "100rem", height: "10rem" }}>
                <div style={{ width: "60rem", height: "10rem", float: "left" }}>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "33rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>PL No</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                            id="id_PL_NO"
                            value={dataEDT_KSV_STOCK_OUT.PL_NO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_STOCK_OUT_PL_NO(e, "PL_NO")
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
                        <p style={{ width: "8rem", display: "inline-block" }}>All</p>
                        <div style={{ display: "inline-block", width: "1rem" }}>
                            <Checkbox
                                style={{
                                    display: "inline-block",
                                    width: "1rem",
                                    marginLeft: "0.5rem",
                                }}
                                id="id_IS_ALL"
                                checked={changeCheckBoxVal(
                                    dataEDT_KSV_STOCK_OUT.IS_ALL,
                                )}
                                onChange={(e) =>
                                    onCheckboxChangeEDT_KSV_STOCK_OUT_IS_ALL(
                                        e,
                                        "IS_ALL",
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
                            width: "50rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Matl Type</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                        >
                            <Dropdown
                                id="id_MATL_TYPE"
                                value={dataEDT_KSV_STOCK_OUT_MATL_TYPE}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_STOCK_OUT_MATL_TYPE(
                                        e,
                                        "MATL_TYPE",
                                    )
                                }
                                options={datasEDT_KSV_STOCK_OUT_MATL_TYPE}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                        <Button
                            label="Change M <-> S"
                            style={{ display: "inline-block" }}
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </span>
                </div>

                <div style={{ width: "40rem", height: "10rem", float: "left" }}>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "33rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Offer Spec</p>
                        <InputTextarea
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                            id="id_OFFER_SPEC"
                            value={dataEDT_KSV_STOCK_OUT.OFFER_SPEC}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_STOCK_OUT_OFFER_SPEC(
                                    e,
                                    "OFFER_SPEC",
                                )
                            }
                            rows={4}
                            cols={30}
                        />
                    </span>
                </div>
            </div>
            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "71rem" }}
            >
                <div className="formgrid grid">
                    <div className="field col-6 md:col-6">
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Inquiry"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={search_OFFER_SPEC}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Update"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={update_OFFER_SPEC}
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
            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S041204_OFFER_SPEC, comparisonFn);
