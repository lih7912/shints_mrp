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
import { Chart } from "primereact/chart";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceAF_S001 } from "../service/service_biz/ServiceAF_S001";
import { OverlayPanel } from "primereact/overlaypanel";

import "./page_common.scss";

const moment = require("moment");

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    USER_ID: "",
    HEIGHT: "",
    REG_DATETIME: "",
    KIND: "",
    KIND2: "",
    TIME: "",
    LENG: "",
    STEP: "",
    SIZE: "",
    PACE: "",
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
    PU_CD: "",

    BUYER_CD: "",
    PO_CD2: "",
    VENDOR_CD: "",
    MATL_TYPE: "",
    REG_USER: "",
    FACTORY_CD: "",
    SHIP_TO: "SHINTS BVT Co., Ltd.",
    BILL_TO: "Shin Textile Solutions Co., Ltd.",
    DEPOSIT_AMT: "0",
    DEPOSIT_FIX: "0",
    PI_NO: "",

    ORDER_DATE: "",
    DELIVERY_DATE: "",
    EXP_DELIVERY_DATE: "",
    PAY_DATE: "",

    PLACE_CD: "",
    NORMI: "",
    TRADE_TERM: "",
    SHIP_MODE: "",
    BILL_TYPE: "",
    CURR_CD: "",

    LC_FLAG: "",
    PAY_AMT: "",
    DEPOSIT_REQUEST: "",
    LC_REQUEST: "",

    ORIGIN_PORT: "",
};

const emptyEDT_KSV_PO_MRP2 = {
    REG_USER: "",
    VENDOR_NAME: "",
    PAY_CONDITION: "",
    CURRENCY: "",
    AMOUNT: "",
    DEPOSIT_AMOUNT: "",
    DEPOSIT_RATE: "",
    PAY_BANK: "",
    PAY_DATE: "",
};

const emptyEDT_KSV_PO_MRP3 = {
    REG_USER: "",
    BUYER_NAME: "",
    VENDOR_NAME: "",
    TRADE_TERM: "",
    AMOUNT: "",
    PAY_BANK: "",
    PAY_DATE: "",
};

const AF_S001 = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceAF_S001Ref = useRef(null);
    if (!serviceAF_S001Ref.current) serviceAF_S001Ref.current = new ServiceAF_S001();
    const serviceAF_S001 = serviceAF_S001Ref.current;

    const toast = useRef(null);
    const op = useRef(null);
    const dt_iframe = useRef(null);

    const [dlgInfo, setDlgInfo] = useState(false);
    const hideDlgInfo = () => {
        setDlgInfo(false);
    };

    const [resizeVal, setResizeVal] = useState(true);
    const [resizeModeVal, setResizeModeVal] = useState("expand");

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [chartDataTemp, setChartDataTemp] = useState({});
    const [chartDataECG, setChartDataECG] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const [styleVal1, setStyleVal1] = useState({
        width: "123rem",
        height: "2rem",
        marginLeft: "2rem",
        display: "none",
    });

    // Process

    // popup
    const [urlIframe, setUrlIframe] = useState("");

    const popup_INFO = (e) => {
        var tObj = { ...e.data };

        var tQry = { ...dataQRY_KSV_PO_MRP };
        tQry.USER_ID = tObj.USER_ID;
        tQry.HEIGHT = tObj.HEIGHT;
        tQry.REG_DATETImE = tObj.REG_DATETIME;
        tQry.KIND = tObj.KIND;
        tQry.KIND2 = tObj.KIND2;
        tQry.TIME = tObj.TIME;
        tQry.LENG = tObj.LENG;
        tQry.STEP = tObj.STEP;
        tQry.SIZE = tObj.SIZE;
        tQry.PACE = tObj.PACE;
        setDataQRY_KSV_PO_MRP(tQry);

        var tArray = [];
        var tDataAng = [];
        var tDataStep = [];
        var tDataLabel = [];
        tObj.MEMS.forEach((col, i) => {
            var tObj = { ...col };
            tDataAng.push(parseFloat(tObj.ANG));
            tDataStep.push(parseFloat(tObj.STEP));
            tDataLabel.push(tObj.WORK_SEQ);
            tArray.push(tObj);
        });
        setDatasTBL_KSV_PO_MRP2(tArray);

        const data = {
            labels: tDataLabel,
            datasets: [
                {
                    label: "상체기울기 ",
                    data: tDataAng,
                    fill: false,
                    borderColor: "rgba(255, 99, 132, 0.2)",
                    yAxisID: "y",
                    tension: 0.4,
                },
                {
                    label: "스텝수",
                    data: tDataStep,
                    fill: false,
                    yAxisID: "y1",
                    borderColor: "red",
                    tension: 0.4,
                },
            ],
        };
        setChartDataTemp(data);

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 1.5,
            plugins: {
                legend: {
                    labels: {
                        color: "black",
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "black",
                    },
                    grid: {
                        color: "rgba(255, 99, 132, 0.1)",
                    },
                },
                y: {
                    ticks: {
                        color: "black",
                    },
                    position: "left",
                    grid: {
                        color: "rgba(255, 99, 132, 0.1)",
                    },
                },
                y1: {
                    ticks: {
                        color: "black",
                    },
                    position: "right",
                    grid: {
                        color: "rgba(255, 99, 132, 0.1)",
                    },
                },
            },
        };
        setChartOptions(options);
    };

    // dialog
    const [createDialog, setCreateDialog] = useState(false);

    const [urlIframe2, setUrlIframe2] = useState("");
    const [createDialog2, setCreateDialog2] = useState(false);

    const [urlIframe3, setUrlIframe3] = useState("");
    const [createDialog3, setCreateDialog3] = useState(false);

    // popup

    // Search

    // Search KSV_STOCK_MEM

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP] =
        useState(emptyQRY_KSV_PO_MRP);

    const onInputChangeQRY_KSV_PO_MRP = (e, name) => {
        let val = (e.target && e.target.value) || "";
        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };
        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

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
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP = argData;

        setDataTBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);
    };

    const onRowClickTBL_KSV_PO_MRP = (event) => {
        let argTBL_KSV_PO_MRP = event.data;
        onRowClick1TBL_KSV_PO_MRP(event.data);
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

    const onRowClickTBL_KSV_PO_MRP2 = (event) => {
        let argTBL_KSV_PO_MRP2 = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP2
    };

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    const [datasEDT_KSV_PO_MRP_PLACE_CD, setDatasEDT_KSV_PO_MRP_PLACE_CD] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_PLACE_CD, setDataEDT_KSV_PO_MRP_PLACE_CD] =
        useState({});

    const [datasEDT_KSV_PO_MRP_NORMI, setDatasEDT_KSV_PO_MRP_NORMI] = useState(
        [],
    );
    const [dataEDT_KSV_PO_MRP_NORMI, setDataEDT_KSV_PO_MRP_NORMI] = useState(
        {},
    );

    const [datasEDT_KSV_PO_MRP_TRADE_TERM, setDatasEDT_KSV_PO_MRP_TRADE_TERM] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_TRADE_TERM, setDataEDT_KSV_PO_MRP_TRADE_TERM] =
        useState({});

    const [datasEDT_KSV_PO_MRP_SHIP_MODE, setDatasEDT_KSV_PO_MRP_SHIP_MODE] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_SHIP_MODE, setDataEDT_KSV_PO_MRP_SHIP_MODE] =
        useState({});

    const [datasEDT_KSV_PO_MRP_BILL_TYPE, setDatasEDT_KSV_PO_MRP_BILL_TYPE] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_BILL_TYPE, setDataEDT_KSV_PO_MRP_BILL_TYPE] =
        useState({});

    const [datasEDT_KSV_PO_MRP_CURR_CD, setDatasEDT_KSV_PO_MRP_CURR_CD] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_CURR_CD, setDataEDT_KSV_PO_MRP_CURR_CD] =
        useState({});

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP2, setDataEDT_KSV_PO_MRP2] =
        useState(emptyEDT_KSV_PO_MRP2);

    const [datasEDT_KSV_PO_MRP2_PAY_BANK, setDatasEDT_KSV_PO_MRP2_PAY_BANK] =
        useState([]);
    const [dataEDT_KSV_PO_MRP2_PAY_BANK, setDataEDT_KSV_PO_MRP2_PAY_BANK] =
        useState({});

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP3, setDataEDT_KSV_PO_MRP3] =
        useState(emptyEDT_KSV_PO_MRP3);

    const [datasEDT_KSV_PO_MRP3_PAY_BANK, setDatasEDT_KSV_PO_MRP3_PAY_BANK] =
        useState([]);
    const [dataEDT_KSV_PO_MRP3_PAY_BANK, setDataEDT_KSV_PO_MRP3_PAY_BANK] =
        useState({});

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP3
    let emptyTBL_KSV_PO_MRP3 = {};

    const [loadingTBL_KSV_PO_MRP3, setLoadingTBL_KSV_PO_MRP3] = useState(false);

    const [datasTBL_KSV_PO_MRP3, setDatasTBL_KSV_PO_MRP3] = useState([]);
    const dt_TBL_KSV_PO_MRP3 = useRef(null);
    const [dataTBL_KSV_PO_MRP3, setDataTBL_KSV_PO_MRP3] =
        useState(emptyTBL_KSV_PO_MRP3);
    const [selectedTBL_KSV_PO_MRP3, setSelectedTBL_KSV_PO_MRP3] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP3, setFlagSelectModeTBL_KSV_PO_MRP3] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP3

    ///

    useEffect(() => {
        window.addEventListener(
            "message",
            (e) => {
                if (e.data.message) {
                    if (e.data.message === "hideChildWindow") {
                        console.log("window message=>" + e.data.message);
                        hideDlgInfo();
                    }
                }
            },
            false,
        );

        var tObj = {};
        tObj.USER_ID = "user";
        tObj.KIND = "Running";
        tObj.KIND2 = "";

        setLoadingTBL_KSV_PO_MRP(true);
        serviceAF_S001.mgrQuery_LIST_1(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP(false);
            if (typeof data.graphQLErrors === "undefined") {
                setDatasTBL_KSV_PO_MRP(data);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    }, []);

    // Support Area

    return (
        <div className="af-div-main">
            <div style={{ height: "9rem" }}>
                <div
                    className="af-div-first"
                    style={{ width: "110rem", height: "6rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "21rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>User</p>
                        <div className="af-span-div" style={{ width: "12rem" }}>
                            <InputText
                                style={{ width: "12rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.USER_ID}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP(e, "USER_ID")
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "21rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>Date</p>
                        <div className="af-span-div" style={{ width: "12rem" }}>
                            <InputText
                                style={{ width: "12rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.REG_DATETIME}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP(
                                        e,
                                        "REG_DATETIME",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "21rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>Height</p>
                        <div className="af-span-div" style={{ width: "12rem" }}>
                            <InputText
                                style={{ width: "12rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.HEIGHT}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP(e, "HEIGHT")
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "21rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>Kind</p>
                        <div className="af-span-div" style={{ width: "12rem" }}>
                            <InputText
                                style={{ width: "12rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.KIND}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP(e, "KIND")
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "21rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>Kind2</p>
                        <div className="af-span-div" style={{ width: "12rem" }}>
                            <InputText
                                style={{ width: "12rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.KIND2}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP(e, "KIND2")
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "21rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>Time</p>
                        <div className="af-span-div" style={{ width: "12rem" }}>
                            <InputText
                                style={{ width: "12rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.TIME}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP(e, "TIME")
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "21rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>Leng</p>
                        <div className="af-span-div" style={{ width: "12rem" }}>
                            <InputText
                                style={{ width: "12rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.LENG}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP(e, "LENG")
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "21rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>Step</p>
                        <div className="af-span-div" style={{ width: "12rem" }}>
                            <InputText
                                style={{ width: "12rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.STEP}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP(e, "STEP")
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "21rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>활주폭</p>
                        <div className="af-span-div" style={{ width: "12rem" }}>
                            <InputText
                                style={{ width: "12rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.SIZE}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP(e, "SIZE")
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "21rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>페이스</p>
                        <div className="af-span-div" style={{ width: "12rem" }}>
                            <InputText
                                style={{ width: "12rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.PACE}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP(e, "PACE")
                                }
                            />
                        </div>
                    </span>
                </div>
            </div>

            <div
                className="af-div-first"
                style={{ width: "100rem", height: "20rem" }}
            >
                <span className="af-span-3-0" style={{ width: "100rem" }}>
                    <div className="af-span-div" style={{ width: "100rem" }}>
                        <Chart
                            type="line"
                            data={chartDataTemp}
                            options={chartOptions}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "10rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP}
                    size="small"
                    value={datasTBL_KSV_PO_MRP}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns={resizeVal}
                    columnResizeMode={resizeModeVal}
                    loading={loadingTBL_KSV_PO_MRP}
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MRP}
                    onRowDoubleClick={popup_INFO}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KSV_PO_MRP(e.value);
                    }}
                    onRowSelect={onRowClickTBL_KSV_PO_MRP}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                    responsiveLayout="scroll"
                    //scrollable scrollHeight="52rem"
                    scrollable
                    scrollHeight="10rem"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="USER_ID" headerClassName="t-header" header="User" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="REG_DATETIME" headerClassName="t-header" header="Date" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="HEIGHT" headerClassName="t-header" header="키" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="KIND" headerClassName="t-header" header="Kind" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="KIND2" headerClassName="t-header" header="Kind2" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="TIME" headerClassName="t-header" header="활동시간" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="LENG" headerClassName="t-header" header="거리" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="STEP" headerClassName="t-header" header="스텝수" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="SIZE" headerClassName="t-header" header="활주폭" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="PACE" headerClassName="t-header" header="페이스" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                </AFDataTable>
            </div>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "20rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP2}
                    size="small"
                    value={datasTBL_KSV_PO_MRP2}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns={resizeVal}
                    columnResizeMode={resizeModeVal}
                    loading={loadingTBL_KSV_PO_MRP2}
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MRP2}
                    // onRowDoubleClick={popup_INFO}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KSV_PO_MRP2(e.value);
                    }}
                    onRowSelect={onRowClickTBL_KSV_PO_MRP2}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP2}
                    responsiveLayout="scroll"
                    //scrollable scrollHeight="52rem"
                    scrollable
                    scrollHeight="20rem"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="USER_ID" headerClassName="t-header" header="User" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="REG_DATETIME" headerClassName="t-header" header="Date" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="HEIGHT" headerClassName="t-header" header="키" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="WORK_SEQ" headerClassName="t-header" header="Seq" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="KIND" headerClassName="t-header" header="Kind" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="KIND2" headerClassName="t-header" header="Kind2" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="TIME" headerClassName="t-header" header="활동시간" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="LENG" headerClassName="t-header" header="거리" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="STEP" headerClassName="t-header" header="스텝수" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="SIZE" headerClassName="t-header" header="활주폭" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="PACE" headerClassName="t-header" header="페이스" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Toast ref={toast} />
            <OverlayPanel
                style={{
                    width: "123rem",
                    height: "60rem",
                    marginLeft: "0rem",
                    marginTop: "0rem",
                }}
                ref={op}
                showCloseIcon
            >
                <iframe
                    src={urlIframe}
                    frameBorder="0"
                    ref={dt_iframe}
                    width="1360px"
                    height="670px"
                    id="id1"
                    className="myClassname"
                    scrolling="no"
                />
            </OverlayPanel>

            <Dialog
                visible={dlgInfo}
                position="top-right"
                style={{
                    width: "123rem",
                    height: "60rem",
                    marginLeft: "0rem",
                    marginTop: "0rem",
                    paddingLeft: "0rem",
                    paddingTop: "0rem",
                }}
                header="PU Info "
                modal={true}
                className="p-fluid"
                onHide={hideDlgInfo}
            >
                <iframe
                    src={urlIframe}
                    frameBorder="0"
                    ref={dt_iframe}
                    width="1360px"
                    height="670px"
                    id="id1"
                    className="myClassname"
                    scrolling="no"
                />
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(AF_S001, comparisonFn);
