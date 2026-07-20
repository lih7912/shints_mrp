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
import { ServiceS041201_HIS_CODE_REMARK } from "../service/service_biz/ServiceS041201_HIS_CODE_REMARK";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_STOCK_OUT = {
    MATL_CD: "",
    UNIT: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    VENDOR_NAME: "",
};

const emptyEDT_KSV_STOCK_OUT = {
    HS_CODE: "",
    COMBO1: "",
    COMBO2: "",
    COMBO3: "",
    DETAIL: "",
};

const S041201_HIS_CODE_REMARK = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS041201_HIS_CODE_REMARKRef = useRef(null);
    if (!serviceS041201_HIS_CODE_REMARKRef.current) serviceS041201_HIS_CODE_REMARKRef.current = new ServiceS041201_HIS_CODE_REMARK();
    const serviceS041201_HIS_CODE_REMARK = serviceS041201_HIS_CODE_REMARKRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const process_UPDATE_HSCODE = () => {
        var _tObj = { ...dataEDT_KSV_STOCK_OUT };
        _tObj.MATL_CD = dataQRY_KSV_STOCK_OUT.MATL_CD;
        _tObj.HS_CODE = dataEDT_KSV_STOCK_OUT.HS_CODE;
        console.log(_tObj);
        serviceS041201_HIS_CODE_REMARK.mgrInsert_HS_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                toast.current.show({
                    severity: "success",
                    summary: "Succeed: Hs code update ",
                    detail: "",
                    life: 3000,
                });
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "Error: Hs Code Update",
                    detail: "",
                    life: 3000,
                });
            }
        });
    };

    /*QRY KSV_STOCK_OUT */
    const [dataQRY_KSV_STOCK_OUT, setDataQRY_KSV_STOCK_OUT] = useState(
        emptyQRY_KSV_STOCK_OUT,
    );

    const onInputChangeQRY_KSV_STOCK_OUT_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_OUT = { ...dataQRY_KSV_STOCK_OUT };

        let tTypeVal = _dataQRY_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_OUT(_dataQRY_KSV_STOCK_OUT);
    };

    const onInputChangeQRY_KSV_STOCK_OUT_UNIT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_OUT = { ...dataQRY_KSV_STOCK_OUT };

        let tTypeVal = _dataQRY_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_OUT(_dataQRY_KSV_STOCK_OUT);
    };

    const onInputChangeQRY_KSV_STOCK_OUT_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_OUT = { ...dataQRY_KSV_STOCK_OUT };

        let tTypeVal = _dataQRY_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_OUT(_dataQRY_KSV_STOCK_OUT);
    };

    const onInputChangeQRY_KSV_STOCK_OUT_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_OUT = { ...dataQRY_KSV_STOCK_OUT };

        let tTypeVal = _dataQRY_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_OUT(_dataQRY_KSV_STOCK_OUT);
    };

    const onInputChangeQRY_KSV_STOCK_OUT_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_OUT = { ...dataQRY_KSV_STOCK_OUT };

        let tTypeVal = _dataQRY_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_OUT(_dataQRY_KSV_STOCK_OUT);
    };

    const onInputChangeQRY_KSV_STOCK_OUT_VENDOR_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_OUT = { ...dataQRY_KSV_STOCK_OUT };

        let tTypeVal = _dataQRY_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_OUT(_dataQRY_KSV_STOCK_OUT);
    };

    /* EDIT KSV_STOCK_OUT*/
    const [datasEDT_KSV_STOCK_OUT, setDatasEDT_KSV_STOCK_OUT] = useState([]);
    const [dataEDT_KSV_STOCK_OUT, setDataEDT_KSV_STOCK_OUT] = useState(
        emptyEDT_KSV_STOCK_OUT,
    );

    const [datasEDT_KSV_STOCK_OUT_HS_CODE, setDatasEDT_KSV_STOCK_OUT_HS_CODE] =
        useState([]);
    const [dataEDT_KSV_STOCK_OUT_HS_CODE, setDataEDT_KSV_STOCK_OUT_HS_CODE] =
        useState({});

    const onDropdownChangeEDT_KSV_STOCK_OUT_HS_CODE = (e, name) => {
        let val = (e.value && e.value.HS_CD) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        } else {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = String(val);
        }

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
        setDataEDT_KSV_STOCK_OUT_HS_CODE(e.value);
    };

    const onInputChangeEDT_KSV_STOCK_OUT_COMBO1 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        console.log(name + "=>" + tTypeVal);

        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    const onInputChangeEDT_KSV_STOCK_OUT_COMBO2 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    const onInputChangeEDT_KSV_STOCK_OUT_COMBO3 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    const onInputChangeEDT_KSV_STOCK_OUT_DETAIL = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    useEffect(() => {
        var tSrcData = { ...JSON.parse(localStorage.getItem("S041201_DATA")) };
        console.log(tSrcData);
        setDataQRY_KSV_STOCK_OUT(tSrcData);

        var _tObj = {};
        _tObj.MATL_CD = tSrcData.MATL_CD;
        _tObj.UNIT = tSrcData.UNIT;
        _tObj.MATL_NAME = tSrcData.MATL_NAME;
        _tObj.COLOR = tSrcData.COLOR;
        _tObj.SPEC = tSrcData.SPEC;
        _tObj.VENDOR_NAME = tSrcData.VENDOR_NAME;

        serviceS041201_HIS_CODE_REMARK.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.HS_CODE.length,
                );
                setDatasEDT_KSV_STOCK_OUT_HS_CODE(data.HS_CODE);
                setDataEDT_KSV_STOCK_OUT_HS_CODE(data.HS_CODE[0]);

                var _tData = { ...dataEDT_KSV_STOCK_OUT };
                _tData.COMBO1 = data.HS_COMP[1].PERMIT_COMPO1;
                _tData.COMBO2 = data.HS_COMP[1].PERMIT_COMPO2;
                _tData.COMBO3 = data.HS_COMP[1].PERMIT_COMPO3;
                _tData.DETAIL = data.HS_COMP[1].PERMIT_DETAIL;

                if (_tData.COMBO1 === null) _tData.COMBO1 = "";
                if (_tData.COMBO2 === null) _tData.COMBO2 = "";
                if (_tData.COMBO3 === null) _tData.COMBO3 = "";

                setDataEDT_KSV_STOCK_OUT(_tData);
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
                    height: "11rem",
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Matl Cd</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_MATL_CD"
                        value={dataQRY_KSV_STOCK_OUT.MATL_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_OUT_MATL_CD(e, "MATL_CD")
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Unit</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_UNIT"
                        value={dataQRY_KSV_STOCK_OUT.UNIT}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_OUT_UNIT(e, "UNIT")
                        }
                        disabled
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "60rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Matl Name</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "50rem",
                        }}
                        id="id_MATL_NAME"
                        value={dataQRY_KSV_STOCK_OUT.MATL_NAME}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_OUT_MATL_NAME(
                                e,
                                "MATL_NAME",
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
                        width: "60rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Color</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "50rem",
                        }}
                        id="id_COLOR"
                        value={dataQRY_KSV_STOCK_OUT.COLOR}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_OUT_COLOR(e, "COLOR")
                        }
                        disabled
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "60rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Spec</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "50rem",
                        }}
                        id="id_SPEC"
                        value={dataQRY_KSV_STOCK_OUT.SPEC}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_OUT_SPEC(e, "SPEC")
                        }
                        disabled
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "60rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Vendor</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "50rem",
                        }}
                        id="id_VENDOR_NAME"
                        value={dataQRY_KSV_STOCK_OUT.VENDOR_NAME}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_OUT_VENDOR_NAME(
                                e,
                                "VENDOR_NAME",
                            )
                        }
                        disabled
                    />
                </span>
            </div>

            <Divider />

            <div
                style={{
                    width: "100rem",
                    height: "9rem",
                    display: "inline-block",
                    marginTop: "1rem",
                }}
            >
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "100rem", height: "7rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "70rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>HS CODE</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "33rem",
                                }}
                            >
                                <Dropdown
                                    id="id_HS_CODE"
                                    style={{ width: "20rem" }}
                                    value={dataEDT_KSV_STOCK_OUT_HS_CODE}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_STOCK_OUT_HS_CODE(
                                            e,
                                            "HS_CODE",
                                        )
                                    }
                                    options={datasEDT_KSV_STOCK_OUT_HS_CODE}
                                    optionLabel="HS_NAME"
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Combo1</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "20rem",
                                }}
                                id="id_COMBO1"
                                value={dataEDT_KSV_STOCK_OUT.COMBO1}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_OUT_COMBO1(
                                        e,
                                        "COMBO1",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "30rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Combo2</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "20rem",
                                }}
                                id="id_COMBO2"
                                value={dataEDT_KSV_STOCK_OUT.COMBO2}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_OUT_COMBO2(
                                        e,
                                        "COMBO2",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "30rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Combo3</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "20rem",
                                }}
                                id="id_COMBO3"
                                value={dataEDT_KSV_STOCK_OUT.COMBO3}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_OUT_COMBO3(
                                        e,
                                        "COMBO3",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "70rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Detail</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "60rem",
                                }}
                                id="id_DETAIL"
                                value={dataEDT_KSV_STOCK_OUT.DETAIL}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_OUT_DETAIL(
                                        e,
                                        "DETAIL",
                                    )
                                }
                            />
                        </span>
                    </div>
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
                            label="Reset"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Update"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={process_UPDATE_HSCODE}
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

export default React.memo(S041201_HIS_CODE_REMARK, comparisonFn);
