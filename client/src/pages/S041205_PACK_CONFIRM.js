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
import { ServiceS041205_PACK_CONFIRM } from "../service/service_biz/ServiceS041205_PACK_CONFIRM";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyEDT_KSV_STOCK_OUT = {
    ETD: "",
    ETA: "",
};

const S041205_PACK_CONFIRM = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS041205_PACK_CONFIRMRef = useRef(null);
    if (!serviceS041205_PACK_CONFIRMRef.current) serviceS041205_PACK_CONFIRMRef.current = new ServiceS041205_PACK_CONFIRM();
    const serviceS041205_PACK_CONFIRM = serviceS041205_PACK_CONFIRMRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* EDIT KSV_STOCK_OUT*/
    const [datasEDT_KSV_STOCK_OUT, setDatasEDT_KSV_STOCK_OUT] = useState([]);
    const [dataEDT_KSV_STOCK_OUT, setDataEDT_KSV_STOCK_OUT] = useState(
        emptyEDT_KSV_STOCK_OUT,
    );

    const onCalChangeEDT_KSV_STOCK_OUT_ETD = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };
        _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    const onCalChangeEDT_KSV_STOCK_OUT_ETA = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };
        _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
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
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "100rem",
                    height: "4rem",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "23rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Confirm ETD</p>
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
                            id="id_ETD"
                            value={changeDateVal(dataEDT_KSV_STOCK_OUT.ETD)}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_STOCK_OUT_ETD(e, "ETD")
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Confirm ETA</p>
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
                            id="id_ETA"
                            value={changeDateVal(dataEDT_KSV_STOCK_OUT.ETA)}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_STOCK_OUT_ETA(e, "ETA")
                            }
                        />
                    </div>
                </span>

                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "71rem",
                        marginTop: "0.5rem",
                    }}
                >
                    <p style={{ width: "10rem", display: "inline-block" }}>Fix the Packing list?</p>
                </span>
            </div>

            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "31rem" }}
            >
                <div className="formgrid grid">
                    <div className="field col-6 md:col-6">
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Yes"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="No"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        {/* <Button style={{ display: 'inline-block', width: '10rem' }} label="Copy" icon="pi pi-check" className="p-button-text" onClick={blankFn} /> */}
                    </div>
                </div>
            </div>

            <Divider />

            <div style={{ width: "100rem", height: "30rem" }}>
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "60rem", height: "30rem" }}></div>

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

export default React.memo(S041205_PACK_CONFIRM, comparisonFn);
