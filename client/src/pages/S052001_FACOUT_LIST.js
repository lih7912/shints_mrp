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
import { ServiceS052001_FACOUT_LIST } from "../service/service_biz/ServiceS052001_FACOUT_LIST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_STOCK_FACIN = {
    S_OUT_DATE: "",
    E_OUT_DATE: "",
    BUYER_CD: "",
    PO_CD: "",
    ORDER_CD: "",
    MATL_NAME: "",
    SPEC: "",
    COLOR: "",
    DESC: "",
    UNIT: "",
    VENDOR_NAME: "",
};

const emptyTBL_KSV_STOCK_FACIN = {
    id: 0,
    PO_CD: "",
    IN_DATE: "",
    DELIVERY: "",
    VENDOR_NAME: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    PO_QTY: "",
    IN_QTY: "",
    ERR_QTY: "",
    LOCATION: "",
    MATL_CD: "",
    VENDOR_TYPE: "",
    BUYER_NAME: "",
    REG_USER: "",
};

const S052001_FACOUT_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS052001_FACOUT_LISTRef = useRef(null);
    if (!serviceS052001_FACOUT_LISTRef.current) serviceS052001_FACOUT_LISTRef.current = new ServiceS052001_FACOUT_LIST();
    const serviceS052001_FACOUT_LIST = serviceS052001_FACOUT_LISTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });
    const [buyerOptions, setBuyerOptions] = useState([
        { label: "SELECT BUYER", value: "" },
    ]);

    const process_CANCEL_FACOUT = () => {
        if (selectedTBL_KSV_STOCK_FACIN.length <= 0) return;

        var tObj0 = [...selectedTBL_KSV_STOCK_FACIN];

        var tIdx = 0;
        var tArray = [];
        for (tIdx = 0; tIdx < tObj0.length; tIdx++) {
            var tObj = { ...tObj0[tIdx] };
            Object.keys(tObj).forEach((col, i) => {
                if (tObj[`${col}`] === null || tObj[`${col}`] === " ") {
                    tObj[`${col}`] = "";
                }
            });
            delete tObj.id;
            delete tObj.__typename;
            tArray.push(tObj);
        }

        setDatasTBL_KSV_STOCK_FACIN([]);
        setLoadingTBL_KSV_STOCK_FACIN(true);
        serviceS052001_FACOUT_LIST
            .mgrInsert_CANCEL_FACOUT(tArray)
            .then((data) => {
                setLoadingTBL_KSV_STOCK_FACIN(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    if (data.length > 0) {
                        toast.current.show({
                            severity: "success",
                            summary: "SUCCE: Update Location",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                        search_LIST_1();
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "Error: Update Location",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const search_LIST_1 = () => {
        var tObj = { ...dataQRY_KSV_STOCK_FACIN };

        Object.keys(tObj).forEach((col, i) => {
            if (tObj[`${col}`] === null || tObj[`${col}`] === " ") {
                tObj[`${col}`] = "";
            }
        });

        setDatasTBL_KSV_STOCK_FACIN([]);
        setSelectedTBL_KSV_STOCK_FACIN([]);
        setLoadingTBL_KSV_STOCK_FACIN(true);

        // 2
        serviceS052001_FACOUT_LIST.mgrQuery_LIST_1(tObj).then((data) => {
            setLoadingTBL_KSV_STOCK_FACIN(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );

                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_STOCK_FACIN(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /*QRY KSV_STOCK_FACIN */
    const [dataQRY_KSV_STOCK_FACIN, setDataQRY_KSV_STOCK_FACIN] = useState(
        emptyQRY_KSV_STOCK_FACIN,
    );

    const onCalChangeQRY_KSV_STOCK_FACIN_S_OUT_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_STOCK_FACIN };
        _dataQRY_KSV_PO_MRP[`${name}`] = val;
        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_PO_MRP);
    };

    const onCalChangeQRY_KSV_STOCK_FACIN_E_OUT_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_STOCK_FACIN };
        _dataQRY_KSV_PO_MRP[`${name}`] = val;
        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_STOCK_FACIN_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
    };

    const onInputChangeQRY_KSV_STOCK_FACIN_VENDOR_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
    };

    const onInputChangeQRY_KSV_STOCK_FACIN_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
    };

    const onInputChangeQRY_KSV_STOCK_FACIN_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
    };

    const onInputChangeQRY_KSV_STOCK_FACIN_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
    };

    const onInputChangeQRY_KSV_STOCK_FACIN_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
    };

    const onInputChangeQRY_KSV_STOCK_FACIN = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
    };

    const onDropdownChangeQRY_KSV_STOCK_FACIN_BUYER_CD = (e, name) => {
        const val = e.value || "";
        const next = { ...dataQRY_KSV_STOCK_FACIN };
        next[`${name}`] = val;
        setDataQRY_KSV_STOCK_FACIN(next);
    };

    /* TABLE KSV_STOCK_FACIN*/
    // DEFINE DATAGRID : TBL_KSV_STOCK_FACIN
    const [datasTBL_KSV_STOCK_FACIN, setDatasTBL_KSV_STOCK_FACIN] = useState(
        [],
    );
    const dt_TBL_KSV_STOCK_FACIN = useRef(null);
    const [dataTBL_KSV_STOCK_FACIN, setDataTBL_KSV_STOCK_FACIN] = useState(
        emptyTBL_KSV_STOCK_FACIN,
    );
    const [selectedTBL_KSV_STOCK_FACIN, setSelectedTBL_KSV_STOCK_FACIN] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_STOCK_FACIN,
        setFlagSelectModeTBL_KSV_STOCK_FACIN,
    ] = useState(false);
    const [loadingTBL_KSV_STOCK_FACIN, setLoadingTBL_KSV_STOCK_FACIN] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_STOCK_FACIN

    const onRowClick1TBL_KSV_STOCK_FACIN = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_STOCK_FACIN = argData;

        setDataTBL_KSV_STOCK_FACIN(argTBL_KSV_STOCK_FACIN);
    };

    const exportExcelTBL_KSV_STOCK_FACIN = () => {
        const tArray = datasTBL_KSV_STOCK_FACIN.map((row) => ({
            "Out Date": serviceLib.dateFormat(row.OUT_DATE),
            "PO#": row.PO_CD,
            "Order#": row.ORDER_CD,
            Supplier: row.VENDOR_NAME,
            "Matl#": row.MATL_CD,
            Description: row.MATL_NAME,
            Color: row.COLOR,
            Spec: row.SPEC,
            "Po.Qty": serviceLib.numWithCommas(row.PO_QTY, 2),
            "Out.Qty": serviceLib.numWithCommas(row.OUT_QTY, 2),
            Unit: row.UNIT,
            Remark: row.remark,
            Purpose: row.PURPOSE,
            "Reg User": row.REG_USER,
        }));

        const userInfo = serviceLib.getUserInfo() || {};
        const userId = String(userInfo.USER_ID || "NOUSER").replace(
            /[^A-Za-z0-9_-]/g,
            "",
        );

        serviceLib.exportExcel(`FacOut_List_${userId}`, "FacOut_List", tArray);
    };

    useEffect(() => {
        var _tObj = {};
        _tObj.KEY1 = "";

        serviceS052001_FACOUT_LIST.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                const buyers = Array.isArray(data.BUYER_CD)
                    ? data.BUYER_CD
                    : [];
                const options = [
                    { label: "SELECT BUYER", value: "" },
                    ...buyers
                        .filter((row) => row.BUYER_CD && row.BUYER_CD.trim())
                        .map((row) => ({
                            label: row.BUYER_NAME,
                            value: row.BUYER_CD,
                        })),
                ];
                setBuyerOptions(options);
            } else {
                console.log(
                    "mgrQueryS052001_CODE error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    }, []);

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
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            value={dataQRY_KSV_STOCK_FACIN.BUYER_CD}
                            options={buyerOptions}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_FACIN_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            filter
                        />
                    </div>
                </span>

                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Matl#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_STOCK_FACIN.MATL_NAME}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_FACIN_MATL_NAME(
                                    e,
                                    "MATL_NAME",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "3rem" }}>Desc</p>
                    <div className="af-span-div" style={{ width: "22rem" }}>
                        <InputText
                            style={{ width: "22rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_STOCK_FACIN.DESC}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_FACIN(e, "DESC")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "3rem" }}>Color</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_STOCK_FACIN.COLOR}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_FACIN_COLOR(
                                    e,
                                    "COLOR",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Spec</p>
                    <div className="af-span-div" style={{ width: "14rem" }}>
                        <InputText
                            style={{ width: "14rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_STOCK_FACIN.SPEC}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_FACIN_SPEC(e, "SPEC")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "30rem" }}>
                    <p className="af-span-p" style={{ width: "3rem" }}>Unit</p>
                    <div className="af-span-div" style={{ width: "2rem" }}>
                        <InputText
                            style={{ width: "2rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_STOCK_FACIN.UNIT}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_FACIN(e, "UNIT")
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Out Date</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_IN_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_FACIN.S_OUT_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_FACIN_S_OUT_DATE(
                                    e,
                                    "S_OUT_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_IN_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_FACIN.E_OUT_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_FACIN_E_OUT_DATE(
                                    e,
                                    "E_OUT_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "14.5rem" }}>
                    <p className="af-span-p" style={{ width: "3rem" }}>PO#</p>
                    <div className="af-span-div" style={{ width: "10.5rem" }}>
                        <InputText
                            style={{ width: "10.5rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_STOCK_FACIN.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_FACIN_PO_CD(
                                    e,
                                    "PO_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "3rem" }}>Order#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_STOCK_FACIN.ORDER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_FACIN_ORDER_CD(
                                    e,
                                    "ORDER_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "28rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Supplier</p>
                    <div className="af-span-div" style={{ width: "22rem" }}>
                        <InputText
                            style={{ width: "22rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_STOCK_FACIN.VENDOR_NAME}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_FACIN_VENDOR_NAME(
                                    e,
                                    "VENDOR_NAME",
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
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <Button
                            label="Excel"
                            style={{ width: "9rem" }}
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_STOCK_FACIN}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "51rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_STOCK_FACIN}
                    size="small"
                    value={datasTBL_KSV_STOCK_FACIN}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    // metaKeySelection={false}
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_STOCK_FACIN}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KSV_STOCK_FACIN(e.value);
                        onRowClick1TBL_KSV_STOCK_FACIN(e.value);
                    }}
                    // onRowClick={onRowClickTBL_KSV_STOCK_FACIN}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_STOCK_FACIN}
                    loading={loadingTBL_KSV_STOCK_FACIN}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="47rem"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="OUT_DATE" headerClassName="t-header" header="Out Date" style={{ width: "8rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.OUT_DATE) } ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "12rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "12rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_QTY" headerClassName="t-header" header="Po.Qty" style={{ width: "4rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PO_QTY, 2) } ></AFColumn>
                    <AFColumn field="OUT_QTY" headerClassName="t-header" header="Out.Qty" style={{ width: "4rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.OUT_QTY, 2) } ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="remark" headerClassName="t-header" header="Remark" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PURPOSE" headerClassName="t-header" header="Purpose" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REG_USER" headerClassName="t-header" header="Reg User" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3.5rem" }}
            >
                {/*
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
                */}
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <div className="af-span-div-btn" style={{ width: "14rem" }}>
                        <Button
                            style={{ width: "14rem" }}
                            label="Cancel FacOut"
                            className="p-button-text"
                            onClick={process_CANCEL_FACOUT}
                        />
                    </div>
                </span>
                {/*
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="List"
                            className="p-button-text green"
                            onClick={blankFn}
                        />
                    </div>
                </span>
                */}
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S052001_FACOUT_LIST, comparisonFn);
