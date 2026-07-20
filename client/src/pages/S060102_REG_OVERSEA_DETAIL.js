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
import { ServiceS060102_REG_OVERSEA_DETAIL } from "../service/service_biz/ServiceS060102_REG_OVERSEA_DETAIL";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyEDT_KSV_INVOICE_MST = {
    INVOICE_NO: "",
    ETA: "",
    DOC_REC_DATE: "",
    DOC_SEND_DATE: "",
    SHIP_ADVICE_DATE: "",
    FULL_DOC_REC_DATE: "",
    DHL_NO: "",
    TO: "",
    MEASUREMENT: "",
    GROSS_WEIGHT: "",
    TOTAL_CTNS: "",
    BL_NO: "",
    FORWARD_NAME: "",
    FREIGHT_COST: "",
    AIR_RATE: "",
    PAYMENT_TERM: "",
};

const S060102_REG_OVERSEA_DETAIL = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS060102_REG_OVERSEA_DETAIL =
        new ServiceS060102_REG_OVERSEA_DETAIL();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* EDIT KSV_INVOICE_MST*/
    const [datasEDT_KSV_INVOICE_MST, setDatasEDT_KSV_INVOICE_MST] = useState(
        [],
    );
    const [dataEDT_KSV_INVOICE_MST, setDataEDT_KSV_INVOICE_MST] = useState(
        emptyEDT_KSV_INVOICE_MST,
    );

    const onInputChangeEDT_KSV_INVOICE_MST_INVOICE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onCalChangeEDT_KSV_INVOICE_MST_ETA = (e, name) => {
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

    const onCalChangeEDT_KSV_INVOICE_MST_DOC_REC_DATE = (e, name) => {
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

    const onInputChangeEDT_KSV_INVOICE_MST_DOC_SEND_DATE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onCalChangeEDT_KSV_INVOICE_MST_SHIP_ADVICE_DATE = (e, name) => {
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

    const onCalChangeEDT_KSV_INVOICE_MST_FULL_DOC_REC_DATE = (e, name) => {
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

    const onInputChangeEDT_KSV_INVOICE_MST_DHL_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_TO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_MEASUREMENT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_GROSS_WEIGHT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_TOTAL_CTNS = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_BL_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_FORWARD_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_FREIGHT_COST = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_AIR_RATE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_PAYMENT_TERM = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    /* */

    useEffect(() => {}, []);

    const blankFn = () => {};

    // Support Area

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
                style={{ width: "100rem", height: "33rem", marginTop: "1rem" }}
            >
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "60rem", height: "33rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Invoice 번호</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_INVOICE_NO"
                                value={dataEDT_KSV_INVOICE_MST.INVOICE_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_INVOICE_NO(
                                        e,
                                        "INVOICE_NO",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>ETA</p>
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
                                    id="id_ETA"
                                    value={changeDateVal(
                                        dataEDT_KSV_INVOICE_MST.ETA,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_INVOICE_MST_ETA(
                                            e,
                                            "ETA",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Doc rec Date</p>
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
                                    id="id_DOC_REC_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_INVOICE_MST.DOC_REC_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_INVOICE_MST_DOC_REC_DATE(
                                            e,
                                            "DOC_REC_DATE",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Doc Send Date</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_DOC_SEND_DATE"
                                value={dataEDT_KSV_INVOICE_MST.DOC_SEND_DATE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_DOC_SEND_DATE(
                                        e,
                                        "DOC_SEND_DATE",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Ship advice Date</p>
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
                                    id="id_SHIP_ADVICE_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_INVOICE_MST.SHIP_ADVICE_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_INVOICE_MST_SHIP_ADVICE_DATE(
                                            e,
                                            "SHIP_ADVICE_DATE",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Full Doc recDate</p>
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
                                    id="id_FULL_DOC_REC_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_INVOICE_MST.FULL_DOC_REC_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_INVOICE_MST_FULL_DOC_REC_DATE(
                                            e,
                                            "FULL_DOC_REC_DATE",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>DHL</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_DHL_NO"
                                value={dataEDT_KSV_INVOICE_MST.DHL_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_DHL_NO(
                                        e,
                                        "DHL_NO",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>To</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_TO"
                                value={dataEDT_KSV_INVOICE_MST.TO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_TO(e, "TO")
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Measurement</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_MEASUREMENT"
                                value={dataEDT_KSV_INVOICE_MST.MEASUREMENT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_MEASUREMENT(
                                        e,
                                        "MEASUREMENT",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Gross Weight</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_GROSS_WEIGHT"
                                value={dataEDT_KSV_INVOICE_MST.GROSS_WEIGHT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_GROSS_WEIGHT(
                                        e,
                                        "GROSS_WEIGHT",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Total CTNS</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_TOTAL_CTNS"
                                value={dataEDT_KSV_INVOICE_MST.TOTAL_CTNS}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_TOTAL_CTNS(
                                        e,
                                        "TOTAL_CTNS",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>BL No</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_BL_NO"
                                value={dataEDT_KSV_INVOICE_MST.BL_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_BL_NO(
                                        e,
                                        "BL_NO",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Forward Name</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_FORWARD_NAME"
                                value={dataEDT_KSV_INVOICE_MST.FORWARD_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_FORWARD_NAME(
                                        e,
                                        "FORWARD_NAME",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Freight Cost</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_FREIGHT_COST"
                                value={dataEDT_KSV_INVOICE_MST.FREIGHT_COST}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_FREIGHT_COST(
                                        e,
                                        "FREIGHT_COST",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Air Rate</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_AIR_RATE"
                                value={dataEDT_KSV_INVOICE_MST.AIR_RATE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_AIR_RATE(
                                        e,
                                        "AIR_RATE",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Payment Term</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_PAYMENT_TERM"
                                value={dataEDT_KSV_INVOICE_MST.PAYMENT_TERM}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_PAYMENT_TERM(
                                        e,
                                        "PAYMENT_TERM",
                                    )
                                }
                            />
                        </span>
                    </div>

                    <div style={{ width: "40rem", height: "33rem" }}></div>
                </div>
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
            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S060102_REG_OVERSEA_DETAIL, comparisonFn);
