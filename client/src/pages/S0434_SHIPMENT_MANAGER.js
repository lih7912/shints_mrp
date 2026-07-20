/* eslint-disable */
import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    useCallback,
} from "react";
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
import { FaMapMarkedAlt } from "react-icons/fa";
import { MultiSelect } from "primereact/multiselect";

import moment from "moment";
import axios from "axios";
import apiOption from "../assets/env_graphql";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0434_SHIPMENT_MANAGER } from "../service/service_biz/ServiceS0434_SHIPMENT_MANAGER";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    STATUS_CD: "",
    SHIP_MODE: "",
    ORIGIN_PORT: "",
    DESTINATION: "",
    S_ETA: "",
    E_ETA: "",
    S_ETD: "",
    E_ETD: "",
    REMARK: "",
    SHIPMENT_CD: "",
    BL_NO: "",
    SHIPPING_COST_CURR: "",
    INVOICE_NO: "",
};

const emptyQRY_KSV_PO_MRP2 = {
    IN_QTY: "",
};

const emptyTBL_KSV_PO_MRP = {
    UPD_DATETIME: "",
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
    SHIP_MODE: "",
    PLACE_CD: "",
    BL_FILE: "",

    ORIGIN_PORT: "",
    SHIP_LINE: "",
    BL_NO: "",

    ETA: "",
    CONTAINER_NO: "",
    CI_FILE: "",

    DESTINATION: "",
    SINGAPORE_COMBINE: "",
    COST: 0,

    PL_FILE: "",
};

const S0434_SHIPMENT_MANAGER = () => {
    const serviceLib = useMemo(() => new ServiceLib(), []);
    const serviceS0434_SHIPMENT_MANAGER = useMemo(
        () => new ServiceS0434_SHIPMENT_MANAGER(),
        [],
    );

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    //
    const [urlIframe, setUrlIframe] = useState("");
    const [createDialogTradlinxHistory, setCreateDialogTradlinxHistory] =
        useState(false);
    const [createDialog, setCreateDialog] = useState(false);

    const hideDialog = () => {
        setCreateDialog(false);
    };

    const popup_TRDLINX_HISTORY = useCallback(async (blNo) => {
        setCreateDialogTradlinxHistory(true);

        let resultHistory = (
            await axios.post(`${apiOption.apiuri}/restapi/tradlinx/history`, {
                bl_no: blNo,
            })
        ).data;
        setDatasTBL_KSV_TRADLINX(resultHistory);
    }, []);

    const hideDialogTradlinxHistory = () => {
        setCreateDialogTradlinxHistory(false);
    };

    const onRowDoubleClickTBL_KSV_PO_MRP = useCallback(
        (event) => {
            if (!event.data.SHIPMENT_CD) {
                alert("SHIP# is required.");
                return;
            }

            var tRemark = "";
            var tColName = "";
            var tKeys = Object.keys(event.data);
            var tEventValue = event.originalEvent.target.innerText;
            var tIdx = 0;
            for (tIdx = 0; tIdx < tKeys.length; tIdx++) {
                var col = tKeys[tIdx];
                var tValue = event.data[`${col}`];
                if (!tValue);
                else {
                    if (!tEventValue);
                    else {
                        if (typeof tValue === "string") {
                            if (tValue.trim() === tEventValue.trim()) {
                                tColName = col;
                                break;
                            }
                        }
                    }
                }
            }

            if (!tColName) return;
            if (tColName === "TRADLINX_STATUS") {
                popup_TRDLINX_HISTORY(event.data.BL_NO);
                return;
            }

            var tUrls = window.location.href.split("/");
            console.log("URL=>" + tUrls[2]);
            var tUrl1 = "";
            if (window.location.href.includes("3288")) {
                tUrl1 =
                    "http://afroba.iptime.org:3288/webapp/mrpapp/index.html#/";
            } else if (window.location.href.includes("3201")) {
                if (window.location.href.includes("afroba")) {
                    tUrl1 = "http://afroba.iptime.org:3201/#/";
                }
                if (window.location.href.includes("localhost")) {
                    tUrl1 = "http://localhost:3201/#/";
                }
            } else if (window.location.href.includes("3203")) {
                tUrl1 = "http://192.168.0.105:3203/#/";
            } else {
                tUrl1 = "http://localhost:3201/#/";
            }

            //sessionStorage.setItem('S043401_INFO', JSON.stringify(event.data, null, 4));

            // tUrl1 += "S020401_ORDER_INFO?ORDER_CD=" + event.data.ORDER_CD;
            tUrl1 = `${window.location.origin}/#/`;
            tUrl1 += `S043401_SHIPMENT_INFO?SHIPMENT_CD=${event.data.SHIPMENT_CD}&STATUS=${event.data.STATUS_N}&REMARK=${event.data.REMARK}&CURR_CD=${event.data.SHIPPING_COST_CURR}`;

            var tUrl2 = `S043401_SHIPMENT_INFO?SHIPMENT_CD=${event.data.SHIPMENT_CD}&STATUS=${event.data.STATUS_N}&REMARK=${event.data.REMARK}&CURR_CD=${event.data.SHIPPING_COST_CURR}`;
            var tValObj = {
                key: "4-11",
                label: "Shipment Info",
                icon: "pi pi-fw pi-user-edit",
                url1: "S043401_SHIPMENT_INFO",
            };
            var tArgObj = { ...tValObj };
            tArgObj.url1 = tUrl2;
            var tFuncObj = {};
            tFuncObj.func = "call_url";
            tFuncObj.message = { ...tArgObj };
            window.parent.postMessage(tFuncObj, "*");

            // setDlgHeader('SHIPMENT 조회');
        },
        [popup_TRDLINX_HISTORY],
    );

    const popup_SHIPMENT_REGIST = () => {
        const targetPage = "S0433_SHIPMENT_REGIST";
        const messagePayload = {
            key: "4-10",
            label: "Shipment Reg",
            icon: "pi pi-fw pi-user-edit",
            url1: targetPage,
        };
        const postMessageData = {
            func: "call_url",
            message: messagePayload,
        };

        window.parent.postMessage(postMessageData, "*");
    };

    const popup_FREIGHT_REGIST = () => {
        const targetPage = "S0440_FREIGHT_REGIST";
        const messagePayload = {
            key: "4-12",
            label: "Freight Reg",
            icon: "pi pi-fw pi-user-edit",
            url1: targetPage,
        };
        const postMessageData = {
            func: "call_url",
            message: messagePayload,
        };

        window.parent.postMessage(postMessageData, "*");
    };

    const popup_SHIPPING_COST = () => {
        const targetPage = "S0435_SHIPPING_COST";
        const messagePayload = {
            key: "4-13",
            label: "Shipping Cost",
            icon: "pi pi-fw pi-user-edit",
            url1: targetPage,
        };
        const postMessageData = {
            func: "call_url",
            message: messagePayload,
        };

        window.parent.postMessage(postMessageData, "*");
    };

    const popup_LOCAL_COST = () => {
        const targetPage = "S0436_LOCAL_COST";
        const messagePayload = {
            key: "4-14",
            label: "Local Cost",
            icon: "pi pi-fw pi-user-edit",
            url1: targetPage,
        };
        const postMessageData = {
            func: "call_url",
            message: messagePayload,
        };

        window.parent.postMessage(postMessageData, "*");
    };

    // Search

    const process_END = () => {
        if (!inEndDate) {
            alert("End Date을 입력하세요 <br><br>Please enter End Date");
            return;
        }

        var tObjs = [];
        selectedTBL_KSV_PO_MRP.forEach((col, i) => {
            var tObj = {};
            tObj.SHIPMENT_CD = col.SHIPMENT_CD;
            tObj.END_DATE = inEndDate;
            tObj.REMARK = col.REMARK;
            tObjs.push(tObj);
        });

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS0434_SHIPMENT_MANAGER.mgrInsert_END(tObjs).then((data) => {
            setLoadingTBL_KSV_PO_MRP(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        search_LIST_1();
                    }
                }
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const normalizeToYmd = (dateVal) => {
        if (!dateVal) return "";
        const onlyNum = String(dateVal).replace(/[^0-9]/g, "");
        if (onlyNum.length < 8) return "";
        return onlyNum.substring(0, 8);
    };

    // Search KSV_STOCK_MEM
    const search_LIST_1 = () => {
        setSelectedTBL_KSV_PO_MRP2([]);
        setDatasTBL_KSV_PO_MRP2([]);

        setSelectedTBL_KSV_PO_MRP([]);
        setDatasTBL_KSV_PO_MRP([]);

        var tObj = { ...dataQRY_KSV_PO_MRP };

        setLoadingTBL_KSV_PO_MRP(true);

        serviceS0434_SHIPMENT_MANAGER.mgrQuery_LIST_1(tObj).then(async (data) => {
            setLoadingTBL_KSV_PO_MRP(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });

                const etdSyncRows = tArray
                    .map((col) => {
                        const etdOld = normalizeToYmd(col.ETD);
                        const etdFromTradlinx = normalizeToYmd(col.TRADLINX_ETD);

                        if (!col.SHIPMENT_CD || !etdFromTradlinx || etdFromTradlinx === etdOld) {
                            return null;
                        }

                        return {
                            SHIPMENT_CD: col.SHIPMENT_CD,
                            ETD: etdFromTradlinx,
                        };
                    })
                    .filter((v) => !!v)
                    .filter(
                        (v, idx, arr) =>
                            arr.findIndex((x) => x.SHIPMENT_CD === v.SHIPMENT_CD) === idx,
                    );

                if (etdSyncRows.length > 0) {
                    try {
                        const syncResult = await serviceS0434_SHIPMENT_MANAGER.mgrUpdate_ETD_BY_TRADLINX(etdSyncRows);
                        const syncInfo = Array.isArray(syncResult) && syncResult.length > 0 ? syncResult[0] : null;

                        if (syncInfo && String(syncInfo.CODE || "").includes("SUCCEED")) {
                            toast.current?.show({
                                severity: "success",
                                summary: "ETD Sync",
                                detail: `${syncInfo.id || etdSyncRows.length}건 ETD가 TRADLINX_ETD로 동기화되었습니다. ETD Sync completed.`,
                                life: 5000,
                            });
                        } else if (syncInfo) {
                            toast.current?.show({
                                severity: "warn",
                                summary: "ETD Sync",
                                detail: syncInfo.CODE || "ETD 동기화 처리 결과를 확인해주세요.Please check the ETD sync result.",
                                life: 5000,
                            });
                        }

                        tArray = tArray.map((col) => {
                            const etdFromTradlinx = normalizeToYmd(col.TRADLINX_ETD);
                            if (!etdFromTradlinx) return col;
                            if (normalizeToYmd(col.ETD) === etdFromTradlinx) return col;
                            return {
                                ...col,
                                ETD: etdFromTradlinx,
                            };
                        });
                    } catch (e) {
                        console.log("mgrUpdate_ETD_BY_TRADLINX error => " + JSON.stringify(e));
                        toast.current?.show({
                            severity: "error",
                            summary: "ETD Sync",
                            detail: "ETD 동기화 중 오류가 발생했습니다.An error occurred during ETD synchronization.",
                            life: 5000,
                        });
                    }
                }

                setDatasTBL_KSV_PO_MRP(tArray);
                if (tArray.length > 0) {
                    tArray.forEach((col, i) => {
                        var tObj99 = { ...col };
                        if (col.UPD_DATETIME !== "")
                            setDataTBL_KSV_PO_MRP(tObj99);
                    });
                }
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

    const onInputChangeQRY_KSV_PO = (e, name, options) => {
        serviceLib.handleInputChange(e, name, dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP, options);
    };

    const onCalChangeQRY_KSV_PO = (e, name, setSetter) => {
        serviceLib.handleCalendarChange(e, name, dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP, setSetter);
    };

    const onDropdownChangeQRY_KSV_PO = (e, name, setSetter) => {
        serviceLib.handleDropdownChange(e, name, dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP, setSetter);
    };

    const onMultiChangeQRY_KSV_PO = (e, name, setSetter) => {
        serviceLib.handleMultiSelectChange(e, name, dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP, setSetter);
    };

    const [
        datasQRY_KSV_PO_MRP_ORIGIN_PORT,
        setDatasQRY_KSV_PO_MRP_ORIGIN_PORT,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP_ORIGIN_PORT, setDataQRY_KSV_PO_MRP_ORIGIN_PORT] =
        useState({});

    const [
        datasQRY_KSV_PO_MRP_DESTINATION,
        setDatasQRY_KSV_PO_MRP_DESTINATION,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP_DESTINATION, setDataQRY_KSV_PO_MRP_DESTINATION] =
        useState({});

    const [datasQRY_KSV_PO_MRP_SHIP_MODE, setDatasQRY_KSV_PO_MRP_SHIP_MODE] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_SHIP_MODE, setDataQRY_KSV_PO_MRP_SHIP_MODE] =
        useState([]);

    const [datasQRY_KSV_PO_MRP_STATUS_CD, setDatasQRY_KSV_PO_MRP_STATUS_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_STATUS_CD, setDataQRY_KSV_PO_MRP_STATUS_CD] =
        useState([]);

    const [datasQRY_KSV_PO_MRP_CURR_CD, setDatasQRY_KSV_PO_MRP_CURR_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_CURR_CD, setDataQRY_KSV_PO_MRP_CURR_CD] =
        useState({});

    //
    const [inEndDate, setInEndDate] = useState("");
    const onCalChangeInEndDate = (e, name) => {
        serviceLib.handleCalendarChange(e, name, {}, () => {}, (val) => setInEndDate(val));
    };

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP2, setDataQRY_KSV_PO_MRP2] =
        useState(emptyQRY_KSV_PO_MRP2);

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP
    const [loadingTBL_KSV_PO_MRP, setLoadingTBL_KSV_PO_MRP] = useState(false);

    const [datasTBL_KSV_PO_MRP, setDatasTBL_KSV_PO_MRP] = useState([]);
    const dt_TBL_KSV_PO_MRP = useRef(null);
    const dt_TBL_KSV_TRADLINX = useRef(null);
    const [datasTBL_KSV_TRADLINX, setDatasTBL_KSV_TRADLINX] = useState([]);
    const [dataTBL_KSV_PO_MRP, setDataTBL_KSV_PO_MRP] =
        useState(emptyTBL_KSV_PO_MRP);
    const [selectedTBL_KSV_PO_MRP, setSelectedTBL_KSV_PO_MRP] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP, setFlagSelectModeTBL_KSV_PO_MRP] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP

    const onRowClick1TBL_KSV_PO_MRP = useCallback((argData0) => {}, []);

    const onRowClickTBL_KSV_PO_MRP = useCallback((event) => {
        // if (typeof event.data !== 'undefined') search_LIST_2(event.data);
    }, []);
    const onSelectionChangeTBL_KSV_PO_MRP = useCallback(
        (e) => {
            const selectedRows = Array.isArray(e.value) ? e.value : [];
            setSelectedTBL_KSV_PO_MRP(selectedRows);
            onRowClick1TBL_KSV_PO_MRP(selectedRows);
        },
        [onRowClick1TBL_KSV_PO_MRP],
    );

    const exportExcelTBL_KSV_PO_MRP = () => {
        console.log(datasTBL_KSV_PO_MRP);
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(
                datasTBL_KSV_PO_MRP.map(({ __typename, ...rest }) => rest),
            );
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KSV_PO_MRP(excelBuffer, "Shipment_Manager");
        });
    };

    const saveAsExcelFileTBL_KSV_PO_MRP = (buffer, fileName) => {
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
    const [loadingTBL_KSV_TRADLINX, setLoadingTBL_KSV_TRADLINX] =
        useState(false);

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

    const [datasEDT_KSV_PO_MRP_SHIP_MODE, setDatasEDT_KSV_PO_MRP_SHIP_MODE] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_SHIP_MODE, setDataEDT_KSV_PO_MRP_SHIP_MODE] =
        useState({});

    const [datasEDT_KSV_PO_MRP_SHIP_LINE, setDatasEDT_KSV_PO_MRP_SHIP_LINE] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_SHIP_LINE, setDataEDT_KSV_PO_MRP_SHIP_LINE] =
        useState({});

    const [datasEDT_KSV_PO_MRP_PLACE_CD, setDatasEDT_KSV_PO_MRP_PLACE_CD] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_PLACE_CD, setDataEDT_KSV_PO_MRP_PLACE_CD] =
        useState({});

    const [
        datasEDT_KSV_PO_MRP_DESTINATION,
        setDatasEDT_KSV_PO_MRP_DESTINATION,
    ] = useState([]);
    const [dataEDT_KSV_PO_MRP_DESTINATION, setDataEDT_KSV_PO_MRP_DESTINATION] =
        useState({});

    ///

    useEffect(() => {
        serviceLib.loginConfirm();
    }, [serviceLib]);

    useEffect(() => {
        var tObj = {};
        serviceS0434_SHIPMENT_MANAGER.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_PO_MRP_SHIP_MODE(data.SHIP_MODE);
                //setDataQRY_KSV_PO_MRP_SHIP_MODE([data.SHIP_MODE[0]]);

                setDatasQRY_KSV_PO_MRP_DESTINATION(data.DESTINATION);
                setDataQRY_KSV_PO_MRP_DESTINATION(data.DESTINATION[0]);

                setDatasQRY_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT);
                setDataQRY_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT[0]);

                setDatasQRY_KSV_PO_MRP_STATUS_CD(data.STATUS_CD);
                //setDataQRY_KSV_PO_MRP_STATUS_CD(data.STATUS_CD[0]);

                setDatasQRY_KSV_PO_MRP_CURR_CD(data.CURR_CD || []);
                setDataQRY_KSV_PO_MRP_CURR_CD((data.CURR_CD || [])[0] || {});

                var tRetDate = serviceLib.getCurrDate();
                var tQry = { ...dataQRY_KSV_PO_MRP };
                tQry.S_ETA = "";
                tQry.E_ETA = "";
                tQry.S_ETD = "";
                tQry.E_ETD = "";
                setDataQRY_KSV_PO_MRP(tQry);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        // search_LIST_1();
    }, []);

    // Support Area

    const changeDateVal = (argVal) => {
        if (!argVal) return "";

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

    const formatDateCell = useCallback(
        (field) => (rowData) =>
            rowData[field]
                ? moment(rowData[field], "YYYYMMDDHHmmss").format(
                      "YYYY-MM-DD HH:mm",
                  )
                : "",
        [],
    );
    function getLastCronRun() {
        const now = moment();
        const hour = now.hour();
        const minute = now.minute();

        let runHour = hour - (hour % 2);
        let run = moment().hour(runHour).minute(0).second(0);

        if (run.isAfter(now)) {
            run = run.subtract(2, "hours");
        }
        return run.format("YYYY-MM-DD HH:mm");
    }

    const shipmentMainTable = useMemo(
        () => (
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
                onSelectionChange={onSelectionChangeTBL_KSV_PO_MRP}
                onRowClick={onRowClickTBL_KSV_PO_MRP}
                dataKey="id"
                className="datatable-responsive"
                onRowDoubleClick={onRowDoubleClickTBL_KSV_PO_MRP}
                virtualScrollerOptions={{ itemSize: 20 }}
                emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                responsiveLayout="scroll"
                scrollable
                scrollHeight="562px"
            >
                <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                <AFColumn field="STATUS_N" headerClassName="t-header" header={"Status"} style={{ width: "4rem", flexBasis: "auto" }} className="orange" ></AFColumn>
                <AFColumn field="FIX_FLAG" headerClassName="t-header" header="FIX" style={{ width: "3rem", flexBasis: "auto", textAlign: "center", }} body={(rowData) => rowData.FIX_FLAG === "1" ? ( <i className="pi pi-check" /> ) : null } />
                <AFColumn field="ETD" headerClassName="t-header" header={"ETD"} style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => {
                    const etdValue = rowData.TRADLINX_ETD || rowData.ETD;
                    return serviceLib.dateFormat(etdValue);
                }} ></AFColumn>
                <AFColumn field="SHIP_MODE_N" headerClassName="t-header" header={"Ship.Mode"} style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                <AFColumn field="ORG_ORIGIN_PORT" headerClassName="t-header" header={"Origin"} style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                <AFColumn field="DESTINATION" headerClassName="t-header" header={"Temp.Destination"} style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                <AFColumn field="ORG_DESTINATION" headerClassName="t-header" header={"Destination(org)"} style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                <AFColumn field="S_WEIGHT" headerClassName="t-header" header={"Weight"} style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.S_WEIGHT, 2) } ></AFColumn>
                <AFColumn field="S_CBM" headerClassName="t-header" header={"CBM"} style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.S_CBM, 2) } ></AFColumn>
                <AFColumn field="BL_NO" headerClassName="t-header" header={"BL.NO"} style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                <AFColumn field="ETA" headerClassName="t-header" header={"ETA"} style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.ETA)} ></AFColumn>
                <AFColumn field="SHIPPING_COST_CURR" headerClassName="t-header" header={"Curr"} style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                <AFColumn field="SHIPPING_COST" headerClassName="t-header" header={"Ship Cost"} style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHIPPING_COST, 2) } ></AFColumn>
                <AFColumn field="IMPORT_COST" headerClassName="t-header" header={"Import Cost"} style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.IMPORT_COST, 2) } ></AFColumn>
                <AFColumn field="INVOICE_NO" headerClassName="t-header" header={"Invoice#"} style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                <AFColumn field="REMARK" headerClassName="t-header" header={"Remark"} style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                <AFColumn field="SHIPMENT_CD" headerClassName="t-header" header={"Ship#"} style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                <AFColumn field="IS_SINGAPORE" headerClassName="t-header" header={"Singapore.Comb"} style={{ width: "3rem", flexBasis: "auto" }} ></AFColumn>
                <AFColumn field="TRADLINX_STATUS" className="orange" headerClassName="t-header" header={"TRDLNX.Status"} ></AFColumn>
                <AFColumn field="__map__" headerClassName="t-header" style={{ width: "10rem", flexBasis: "auto", textAlign: "center", }} header={"MAP"} body={(rowData) => { const blNo = rowData.BL_NO; if (!blNo || !rowData.TRADLINX_STATUS) return null; const url = `https://${window.location.hostname}:3202/restapi/tradlinx/mapview/bl/${encodeURIComponent(blNo)}`; return ( <a href={url} target="_blank" rel="noopener noreferrer" title="View Map" className="p-link" > <i className="pi pi-map-marker" /> </a> ); }} />
                <AFColumn field="TRADLINX_POL_NAME" headerClassName="t-header" header={"TRDLNX.POL"} ></AFColumn>
                <AFColumn field="TRADLINX_ETD" headerClassName="t-header" header={"TRDLNX.ETD"} body={formatDateCell("TRADLINX_ETD")} ></AFColumn>
                <AFColumn field="TRADLINX_ATD" headerClassName="t-header" header={"TRDLNX.ATD"} body={formatDateCell("TRADLINX_ATD")} ></AFColumn>
                <AFColumn field="TRADLINX_POD_NAME" headerClassName="t-header" header={"TRDLNX.POD"} ></AFColumn>
                <AFColumn field="TRADLINX_ETA" headerClassName="t-header" header={"TRDLNX.ETA"} body={formatDateCell("TRADLINX_ETA")} ></AFColumn>
                <AFColumn field="TRADLINX_ATA" headerClassName="t-header" header={"TRDLNX.ATA"} body={formatDateCell("TRADLINX_ATA")} ></AFColumn>
                <AFColumn field="TRADLINX_UPDATE_DATETIME" headerClassName="t-header" header={"Upd.D"} body={formatDateCell("TRADLINX_UPDATE_DATETIME")} ></AFColumn>
            </AFDataTable>
        ),

        [
            datasTBL_KSV_PO_MRP,
            loadingTBL_KSV_PO_MRP,
            selectedTBL_KSV_PO_MRP,
            onSelectionChangeTBL_KSV_PO_MRP,
            onRowClickTBL_KSV_PO_MRP,
            onRowDoubleClickTBL_KSV_PO_MRP,
            formatDateCell,
            serviceLib,
        ],
    );

    const currSummaryRows = useMemo(() => {
        const toNum = (val) => {
            if (val === null || typeof val === "undefined") return 0;
            const parsed = parseFloat(String(val).replaceAll(",", ""));
            return Number.isFinite(parsed) ? parsed : 0;
        };

        const totalMap = new Map();
        const selectedMap = new Map();
        const selectedCountMap = new Map();

        datasTBL_KSV_PO_MRP.forEach((row) => {
            const curr = (row.SHIPPING_COST_CURR || "").trim();
            const prev = totalMap.get(curr) || 0;
            totalMap.set(curr, prev + toNum(row.SHIPPING_COST));
        });

        selectedTBL_KSV_PO_MRP.forEach((row) => {
            const curr = (row.SHIPPING_COST_CURR || "").trim();
            const prev = selectedMap.get(curr) || 0;
            selectedMap.set(curr, prev + toNum(row.SHIPPING_COST));

            const prevCount = selectedCountMap.get(curr) || 0;
            selectedCountMap.set(curr, prevCount + 1);
        });

        const keys = Array.from(new Set([...totalMap.keys(), ...selectedMap.keys()]));
        keys.sort((a, b) => {
            if (a === "") return 1;
            if (b === "") return -1;
            return a.localeCompare(b);
        });

        return keys.map((curr) => {
            const totalCost = totalMap.get(curr) || 0;
            const selectedCost = selectedMap.get(curr) || 0;
            const selectedCount = selectedCountMap.get(curr) || 0;
            return {
                curr,
                totalCost,
                selectedCost,
                selectedCount,
            };
        });
    }, [datasTBL_KSV_PO_MRP, selectedTBL_KSV_PO_MRP]);

    const selectedShipmentSummary = useMemo(() => {
        const toNum = (val) => {
            if (val === null || typeof val === "undefined") return 0;
            const parsed = parseFloat(String(val).replaceAll(",", ""));
            return Number.isFinite(parsed) ? parsed : 0;
        };

        return selectedTBL_KSV_PO_MRP.reduce(
            (acc, row) => {
                acc.weight += toNum(row.S_WEIGHT);
                acc.cost += toNum(row.SHIPPING_COST);
                return acc;
            },
            { weight: 0, cost: 0 },
        );
    }, [selectedTBL_KSV_PO_MRP]);

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "8rem" }}
            >
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Status</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <MultiSelect
                            style={{ width: "12rem" }}
                            value={dataQRY_KSV_PO_MRP_STATUS_CD}
                            options={datasQRY_KSV_PO_MRP_STATUS_CD}
                            optionLabel="CD_NAME"
                            onChange={(e) =>
                                onMultiChangeQRY_KSV_PO(
                                    e,
                                    "STATUS_CD",
                                    setDataQRY_KSV_PO_MRP_STATUS_CD,
                                )
                            }
                            display="comma"
                            placeholder=""
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Ship Mode</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <MultiSelect
                            style={{ width: "12rem" }}
                            value={dataQRY_KSV_PO_MRP_SHIP_MODE}
                            onChange={(e) =>
                                onMultiChangeQRY_KSV_PO(
                                    e,
                                    "SHIP_MODE",
                                    setDataQRY_KSV_PO_MRP_SHIP_MODE,
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_SHIP_MODE}
                            optionLabel="CD_NAME"
                            display="comma"
                            placeholder=""
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Origin</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Dropdown
                            style={{ width: "12rem" }}
                            id="id_ORIGIN_PORT"
                            value={dataQRY_KSV_PO_MRP_ORIGIN_PORT}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO(
                                    e,
                                    "ORIGIN_PORT",
                                    setDataQRY_KSV_PO_MRP_ORIGIN_PORT,
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_ORIGIN_PORT}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Destination</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Dropdown
                            style={{ width: "12rem" }}
                            id="id_DESTINATION"
                            value={dataQRY_KSV_PO_MRP_DESTINATION}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO(
                                    e,
                                    "DESTINATION",
                                    setDataQRY_KSV_PO_MRP_DESTINATION,
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_DESTINATION}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div" style={{ width: "10rem" }}>
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
                <span className="af-span-3" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>End Date</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "10rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(inEndDate)}
                            onChange={(e) =>
                                onCalChangeInEndDate(e, "IN_END_DATE")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "6rem" }}>
                    <div className="af-span-div" style={{ width: "5rem" }}>
                        <Button
                            label="End"
                            style={{ width: "5rem" }}
                            className="p-button-text"
                            onClick={process_END}
                        />
                    </div>
                </span>

                <span
                    className="af-span-3"
                    style={{
                        width: "120",
                        marginTop: "0.5rem",
                        display: "inline-flex",
                        gap: "0.5rem",
                    }}
                >
                    <p className="af-span-p" style={{ width: "6rem" }}>ETD</p>
                    <Calendar
                        showButtonBar
                        style={{ width: "6rem" }}
                        dateFormat="yy-mm-dd"
                        id="id_ETA"
                        value={changeDateVal(dataQRY_KSV_PO_MRP.S_ETD)}
                        onChange={(e) =>
                            onCalChangeQRY_KSV_PO(e, "S_ETD")
                        }
                    />

                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <Calendar
                        showButtonBar
                        style={{ width: "6rem" }}
                        dateFormat="yy-mm-dd"
                        id="id_ETA"
                        value={changeDateVal(dataQRY_KSV_PO_MRP.E_ETD)}
                        onChange={(e) =>
                            onCalChangeQRY_KSV_PO(e, "E_ETD")
                        }
                    />

                    <p className="af-span-p" style={{ width: "6rem" }}>ETA</p>
                    <Calendar
                        showButtonBar
                        style={{ width: "6rem" }}
                        dateFormat="yy-mm-dd"
                        id="id_ETA"
                        value={changeDateVal(dataQRY_KSV_PO_MRP.S_ETA)}
                        onChange={(e) =>
                            onCalChangeQRY_KSV_PO(e, "S_ETA")
                        }
                    />

                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <Calendar
                        showButtonBar
                        style={{ width: "6em" }}
                        dateFormat="yy-mm-dd"
                        id="id_ETA"
                        value={changeDateVal(dataQRY_KSV_PO_MRP.E_ETA)}
                        onChange={(e) =>
                            onCalChangeQRY_KSV_PO(e, "E_ETA")
                        }
                    />

                    <p className="af-span-p" style={{ width: "6rem" }}>Invoice#</p>
                    <InputText
                        style={{ width: "12rem" }}
                        id="id_PO_CD"
                        value={dataQRY_KSV_PO_MRP.INVOICE_NO}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO(
                                e,
                                "INVOICE_NO",
                            )
                        }
                    />

                    <p className="af-span-p" style={{ width: "7.5rem" }}>Shipment#</p>
                    <InputText
                        style={{ width: "12rem" }}
                        id="id_PO_CD"
                        value={dataQRY_KSV_PO_MRP.SHIPMENT_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO(
                                e,
                                "SHIPMENT_CD",
                            )
                        }
                    />

                    <span
                        className="af-span-3"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginLeft: "12px",
                        }}
                    >
                        <Button
                            label="Excel"
                            style={{ width: "10rem" }}
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_PO_MRP}
                        />

                        <span
                            className="af-span-3"
                            style={{ marginLeft: "3.5rem" }}
                        >
                            <p className="af-span-p">Last Update : {getLastCronRun()}</p>
                        </span>
                    </span>
                </span>
                <span
                    className="af-span-3"
                    style={{ width: "52rem", marginTop: "7px" }}
                >
                    <p className="af-span-p" style={{ width: "6rem" }}>BL#</p>
                    <div className="af-span-div" style={{ width: "13rem" }}>
                        <InputText
                            style={{ width: "13rem" }}
                            value={dataQRY_KSV_PO_MRP.BL_NO}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO(e, "BL_NO", { removeSpace: true })
                            }
                        />
                    </div>

                    <p className="af-span-p" style={{ width: "4rem", marginLeft: "1rem" }}>Curr</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            value={dataQRY_KSV_PO_MRP_CURR_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO(
                                    e,
                                    "SHIPPING_COST_CURR",
                                    setDataQRY_KSV_PO_MRP_CURR_CD,
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_CURR_CD}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "41.5rem" }}
            >
                {shipmentMainTable}
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", display: "flex", flexDirection: "column", alignItems: "flex-start" }}
            >
                <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem", marginTop: "0.5rem", marginLeft: "0.3rem" }}>
                    <Button
                        style={{ width: "15rem" }}
                        label="Freight Regist"
                        className="p-button-text orange"
                        onClick={popup_FREIGHT_REGIST}
                    />
                    <Button
                        style={{ width: "15rem" }}
                        label="Shipment Regist"
                        className="p-button-text orange"
                        onClick={popup_SHIPMENT_REGIST}
                    />
                    <Button
                        style={{ width: "15rem" }}
                        label="Ship Cost Regist"
                        className="p-button-text orange"
                        onClick={popup_SHIPPING_COST}
                    />
                    <Button
                        style={{ width: "15rem" }}
                        label="local Cost Regist"
                        className="p-button-text orange"
                        onClick={popup_LOCAL_COST}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "row", gap: "1rem", marginTop: "0.5rem", marginLeft: "0.5rem", minHeight: "20rem"}}>
                    <div>
                        <table
                            style={{
                                borderCollapse: "collapse",
                                minWidth: "25rem",
                                fontSize: "1rem",
                            }}
                        >
                            <thead>
                                <tr>
                                    <th style={{ border: "1px solid #bdbdbd", padding: "0.3rem 0.6rem", backgroundColor: "#efefef", textAlign: "center" }}>
                                        CURR
                                    </th>
                                    <th style={{ border: "1px solid #bdbdbd", padding: "0.3rem 0.6rem", backgroundColor: "#efefef", textAlign: "center" }}>
                                        COST
                                    </th>
                                    <th style={{ border: "1px solid #bdbdbd", padding: "0.3rem 0.6rem", backgroundColor: "#efefef", textAlign: "center" }}>
                                        SELECTED
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currSummaryRows.map((row) => (
                                    <tr key={`curr-summary-${row.curr || "empty"}`}>
                                        <td style={{ border: "1px solid #bdbdbd", padding: "0.25rem 0.6rem" }}>
                                            {row.curr}
                                        </td>
                                        <td style={{ border: "1px solid #bdbdbd", padding: "0.25rem 0.6rem", textAlign: "right" }}>
                                            {serviceLib.numWithCommas(row.totalCost, 2)}
                                        </td>
                                        <td style={{ border: "1px solid #bdbdbd", padding: "0.25rem 0.6rem", textAlign: "right" }}>
                                            {row.selectedCount > 0
                                                ? serviceLib.numWithCommas(row.selectedCost, 2)
                                                : ""}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <table
                            style={{
                                borderCollapse: "collapse",
                                minWidth: "20rem",
                                fontSize: "1rem",
                            }}
                        >
                            <thead>
                                <tr>
                                    <th
                                        colSpan={2}
                                        style={{
                                            border: "1px solid #bdbdbd",
                                            padding: "0.3rem 0.6rem",
                                            backgroundColor: "#efefef",
                                            textAlign: "center",
                                        }}
                                    >
                                        SELECTED SHIPMENT WEIGHT
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ border: "1px solid #bdbdbd", padding: "0.25rem 0.6rem" }}>
                                        Weight
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #bdbdbd",
                                            padding: "0.25rem 0.6rem",
                                            textAlign: "right",
                                        }}
                                    >
                                        {serviceLib.numWithCommas(selectedShipmentSummary.weight, 2)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
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
            >
                <iframe
                    src={urlIframe}
                    width="1400px"
                    height="1000px"
                    id="id1"
                    className="myClassname"
                    scrolling="yes"
                />
            </Dialog>

            <Dialog
                visible={createDialogTradlinxHistory}
                position="mid-center"
                style={{
                    overflow: "hidden",
                    width: "80rem",
                    height: "50rem",
                    marginLeft: "0rem",
                    marginTop: "0rem",
                    paddingLeft: "0rem",
                    paddingTop: "0rem",
                }}
                header="Tradlinx History"
                modal={true}
                className="p-fluid"
                onHide={hideDialogTradlinxHistory}
            >
                <div
                    className="af-div-first"
                    style={{ width: "100%", height: "45rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_TRADLINX}
                        size="small"
                        value={datasTBL_KSV_TRADLINX}
                        loading={loadingTBL_KSV_TRADLINX}
                        resizableColumns
                        columnResizeMode="expand"
                        showGridlines
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="22rem"
                    >
                        <AFColumn field="tracking_status" headerClassName="t-header" header={"Status"} ></AFColumn>
                        <AFColumn field="route_order" headerClassName="t-header" header={"Order"} ></AFColumn>
                        <AFColumn field="pol_name" headerClassName="t-header" header={"POL"} ></AFColumn>
                        <AFColumn field="etd" headerClassName="t-header" header={"ETD"} body={formatDateCell("etd")} ></AFColumn>
                        <AFColumn field="atd" headerClassName="t-header" header={"ATD"} body={formatDateCell("atd")} ></AFColumn>
                        <AFColumn field="pod_name" headerClassName="t-header" header={"POD"} ></AFColumn>
                        <AFColumn field="eta" headerClassName="t-header" header={"ETA"} body={formatDateCell("eta")} ></AFColumn>
                        <AFColumn field="ata" headerClassName="t-header" header={"ATA"} body={formatDateCell("ata")} ></AFColumn>
                        <AFColumn field="update_datetime" headerClassName="t-header" header={"Upd.D"} body={formatDateCell("update_datetime")} ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0434_SHIPMENT_MANAGER, comparisonFn);
