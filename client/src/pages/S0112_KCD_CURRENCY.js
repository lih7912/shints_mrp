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
import { Divider } from "primereact/divider";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { ScrollPanel } from "primereact/scrollpanel";
import { TabView, TabPanel } from "primereact/tabview";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0112_KCD_CURRENCY } from "../service/service_biz/ServiceS0112_KCD_CURRENCY";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KCD_CURRENCY = {
    START_DATE: "",
};

const emptyQRY_KCD_CURRENCY2 = {
    S_DATE: "",
    E_DATE: "",
    CURR_CD: "",
};

const emptyTBL_KCD_CURRENCY = {
    id: 0,
    CURR_CD: "",
    START_DATE: "",
    USD_RATE: "",
    WON_AMT: "",
    WON_AMT2: "",
};

const emptyTBL_KCD_CURRENCY2 = {
    id: 0,
    CURR_CD: "",
    START_DATE: "",
    USD_RATE: "",
    WON_AMT: "",
    WON_AMT2: "",
};

const S0112_KCD_CURRENCY = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0112_KCD_CURRENCYRef = useRef(null);
    if (!serviceS0112_KCD_CURRENCYRef.current) serviceS0112_KCD_CURRENCYRef.current = new ServiceS0112_KCD_CURRENCY();
    const serviceS0112_KCD_CURRENCY = serviceS0112_KCD_CURRENCYRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const searchNEOE_CURRENCY = () => {
        clearSelectedTBL_KCD_CURRENCY();
        console.log(dataQRY_KCD_CURRENCY);
        if (dataQRY_KCD_CURRENCY.START_DATE === "") {
            alert("날짜를 입력해주세요<br><br>Please enter the date");
            return;
        }

        var tObj = {};
        tObj.KEY1 = dataQRY_KCD_CURRENCY.START_DATE;

        serviceS0112_KCD_CURRENCY.mgrQuery_NEOE_CURRENCY(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length <= 0) {
                    console.log("더존에 데이타가 없습니다 " + data.length);
                    toast.current.show({
                        severity: "success",
                        summary: "NEOE Currency",
                        detail: "더존에 데이타가 없습니다",
                        life: 3000,
                    });
                    // searchNEOE_CURRENCY();
                } else {
                    // console.log("ServiceNawooAll.mgrQueryTBL_KCD_CURRENCY() call => " + data.length);
                    // CURR_SOUR, RATE_BASE
                    var tArray = [];
                    var tIdx = 0;
                    for (tIdx = 0; tIdx < 11; tIdx++) {
                        var tObj = {};
                        if (tIdx === 0) tObj.CURR_CD = "KRW";
                        if (tIdx === 1) tObj.CURR_CD = "USD";
                        if (tIdx === 2) tObj.CURR_CD = "JPY";
                        if (tIdx === 3) tObj.CURR_CD = "EUR";
                        if (tIdx === 4) tObj.CURR_CD = "GBP";
                        if (tIdx === 5) tObj.CURR_CD = "CHF";
                        if (tIdx === 6) tObj.CURR_CD = "HKD";
                        if (tIdx === 7) tObj.CURR_CD = "IDR";
                        if (tIdx === 8) tObj.CURR_CD = "CNY";
                        if (tIdx === 9) tObj.CURR_CD = "VND";
                        if (tIdx === 10) tObj.CURR_CD = "ETB";
                        tObj.START_DATE = dataQRY_KCD_CURRENCY.START_DATE;
                        tObj.USD_RATE = "0.0";
                        tObj.WON_AMT = "0.0";
                        tObj.WON_AMT2 = "0.0";
                        tArray.push(tObj);
                    }

                    var tWonAmt = 0;
                    tIdx = 0;
                    for (tIdx = 0; tIdx < data.length; tIdx++) {
                        var tObj1 = { ...data[tIdx] };
                        if (tObj1.CURR_SOUR === "001") {
                            tWonAmt = parseFloat(tObj1.RATE_BASE);
                            break;
                        }
                    }

                    tIdx = 0;
                    for (tIdx = 0; tIdx < data.length; tIdx++) {
                        var tObj1 = { ...data[tIdx] };
                        tObj1.RATE_BASE = serviceLib.getFloat(
                            tObj1.RATE_BASE,
                            8,
                        );
                        if (tObj1.CURR_SOUR === "001") {
                            // USD
                            var tInObj = { ...tArray[1] };
                            tInObj.USD_RATE = "1.0";
                            tInObj.WON_AMT = String(tObj1.RATE_BASE);
                            tInObj.WON_AMT2 = String(tObj1.RATE_BASE);
                            tArray[1] = tInObj;
                        }
                        if (tObj1.CURR_SOUR === "002") {
                            // JPY
                            var tInObj = { ...tArray[2] };
                            var tUsdRate =
                                parseFloat(tObj1.RATE_BASE) / tWonAmt / 100.0;
                            var tUsdRate1 =
                                parseFloat(tObj1.RATE_BASE) / tWonAmt;
                            tInObj.USD_RATE = String(
                                serviceLib.getFloat(tUsdRate, 8),
                            );
                            tInObj.WON_AMT = String(tObj1.RATE_BASE);
                            tInObj.WON_AMT2 = String(tObj1.RATE_BASE);
                            tArray[2] = tInObj;
                        }
                        if (tObj1.CURR_SOUR === "003") {
                            // EUR
                            var tInObj = { ...tArray[3] };
                            var tUsdRate =
                                parseFloat(tObj1.RATE_BASE) / tWonAmt;
                            var tUsdRate1 =
                                parseFloat(tObj1.RATE_BASE) / tWonAmt;
                            tInObj.USD_RATE = String(
                                serviceLib.getFloat(tUsdRate, 8),
                            );
                            tInObj.WON_AMT = String(tObj1.RATE_BASE);
                            tInObj.WON_AMT2 = String(tObj1.RATE_BASE);
                            tArray[3] = tInObj;
                        }
                        if (tObj1.CURR_SOUR === "GBP") {
                            // EUR
                            var tInObj = { ...tArray[4] };
                            var tUsdRate =
                                parseFloat(tObj1.RATE_BASE) / tWonAmt;
                            var tUsdRate1 =
                                parseFloat(tObj1.RATE_BASE) / tWonAmt;
                            tInObj.USD_RATE = String(
                                serviceLib.getFloat(tUsdRate, 8),
                            );
                            tInObj.WON_AMT = String(tObj1.RATE_BASE);
                            tInObj.WON_AMT2 = String(tObj1.RATE_BASE);
                            tArray[4] = tInObj;
                        }
                        if (tObj1.CURR_SOUR === "CHF") {
                            // EUR
                            var tInObj = { ...tArray[5] };
                            var tUsdRate =
                                parseFloat(tObj1.RATE_BASE) / tWonAmt;
                            var tUsdRate1 =
                                parseFloat(tObj1.RATE_BASE) / tWonAmt;
                            tInObj.USD_RATE = String(
                                serviceLib.getFloat(tUsdRate, 8),
                            );
                            tInObj.WON_AMT = String(tObj1.RATE_BASE);
                            tInObj.WON_AMT2 = String(tObj1.RATE_BASE);
                            tArray[5] = tInObj;
                        }
                        if (tObj1.CURR_SOUR === "HKD") {
                            // EUR
                            var tInObj = { ...tArray[6] };
                            var tUsdRate =
                                parseFloat(tObj1.RATE_BASE) / tWonAmt;
                            var tUsdRate1 =
                                parseFloat(tObj1.RATE_BASE) / tWonAmt;
                            tInObj.USD_RATE = String(
                                serviceLib.getFloat(tUsdRate, 8),
                            );
                            tInObj.WON_AMT = String(tObj1.RATE_BASE);
                            tInObj.WON_AMT2 = String(tObj1.RATE_BASE);
                            tArray[6] = tInObj;
                        }
                        if (tObj1.CURR_SOUR === "IDR") {
                            // EUR
                            var tInObj = { ...tArray[7] };
                            var tUsdRate =
                                parseFloat(tObj1.RATE_BASE) / tWonAmt;
                            var tUsdRate1 =
                                parseFloat(tObj1.RATE_BASE) / tWonAmt;
                            tInObj.USD_RATE = String(
                                serviceLib.getFloat(tUsdRate, 8),
                            );
                            tInObj.WON_AMT = String(tObj1.RATE_BASE);
                            tInObj.WON_AMT2 = String(tObj1.RATE_BASE);
                            tArray[7] = tInObj;
                        }
                        if (tObj1.CURR_SOUR === "004") {
                            // CNY
                            var tInObj = { ...tArray[8] };
                            var tUsdRate =
                                parseFloat(tObj1.RATE_BASE) / tWonAmt;
                            var tUsdRate1 =
                                parseFloat(tObj1.RATE_BASE) / tWonAmt;
                            tInObj.USD_RATE = String(
                                serviceLib.getFloat(tUsdRate, 8),
                            );
                            tInObj.WON_AMT = String(tObj1.RATE_BASE);
                            tInObj.WON_AMT2 = String(tObj1.RATE_BASE);
                            tArray[8] = tInObj;
                        }
                        if (tObj1.CURR_SOUR === "VND") {
                            // CNY
                            var tInObj = { ...tArray[9] };
                            var tUsdRate =
                                parseFloat(tObj1.RATE_BASE) / tWonAmt;
                            var tUsdRate1 =
                                parseFloat(tObj1.RATE_BASE) / tWonAmt;
                            tInObj.USD_RATE = String(
                                serviceLib.getFloat(tUsdRate, 8),
                            );
                            tInObj.WON_AMT = String(tObj1.RATE_BASE);
                            tInObj.WON_AMT2 = String(tObj1.RATE_BASE);
                            tArray[9] = tInObj;
                        }
                    }

                    var tInObj = { ...tArray[0] };
                    var tUsdRate = parseFloat("1.0") / tWonAmt;
                    var tUsdRate1 = parseFloat("1.0") / tWonAmt;
                    tInObj.USD_RATE = String(serviceLib.getFloat(tUsdRate, 8));
                    tInObj.WON_AMT = "1.0";
                    tInObj.WON_AMT2 = "1.0";
                    tArray[0] = tInObj;

                    var tInObj10 = { ...tArray[10] };
                    var tUsdRate10 = parseFloat("25.7347") / tWonAmt;
                    var tUsdRate10_1 = parseFloat("25.7347") / tWonAmt;
                    tInObj10.USD_RATE = String(
                        serviceLib.getFloat(tUsdRate10, 8),
                    );
                    tInObj10.WON_AMT = "25.7347";
                    tInObj10.WON_AMT2 = "25.7347";
                    tArray[10] = tInObj10;

                    var tArray1 = tArray.map((col, i) => {
                        var tObj = { ...col };
                        tObj.USD_RATE = serviceLib.getNumberFormat(
                            col.USD_RATE,
                            8,
                        );
                        tObj.WON_AMT = serviceLib.getNumberFormat(
                            col.WON_AMT,
                            8,
                        );
                        return tObj;
                    });
                    setDatasTBL_KCD_CURRENCY(tArray1);
                }
            } else {
                // var tStr = data.graphQLErrors[0].message;
                console.log(
                    "ServiceNawooAll.mgrQueryTBL_KCD_CURRENCY()error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        // Service : NawooAll:mgrQueryTBL_KCD_CURRENCY
    };

    /* QRY KCD_CURRENCY*/
    const [dataQRY_KCD_CURRENCY, setDataQRY_KCD_CURRENCY] = useState(
        emptyQRY_KCD_CURRENCY,
    );

    const onCalChangeQRY_KCD_CURRENCY_START_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }
        let _dataQRY_KCD_CURRENCY = { ...dataQRY_KCD_CURRENCY };
        _dataQRY_KCD_CURRENCY.START_DATE = val;
        setDataQRY_KCD_CURRENCY(_dataQRY_KCD_CURRENCY);
    };

    /* QRY KCD_CURRENCY2 */
    const [dataQRY_KCD_CURRENCY2, setDataQRY_KCD_CURRENCY2] = useState(
        emptyQRY_KCD_CURRENCY2,
    );

    const onCalChangeQRY_KCD_CURRENCY2_S_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }
        let _dataQRY_KCD_CURRENCY2 = { ...dataQRY_KCD_CURRENCY2 };
        _dataQRY_KCD_CURRENCY2[`${name}`] = val;
        setDataQRY_KCD_CURRENCY2(_dataQRY_KCD_CURRENCY2);
    };

    const onCalChangeQRY_KCD_CURRENCY2_E_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }
        let _dataQRY_KCD_CURRENCY2 = { ...dataQRY_KCD_CURRENCY2 };
        _dataQRY_KCD_CURRENCY2[`${name}`] = val;
        setDataQRY_KCD_CURRENCY2(_dataQRY_KCD_CURRENCY2);
    };

    const [datasQRY_KCD_CURRENCY2_CURR_CD, setDatasQRY_KCD_CURRENCY2_CURR_CD] =
        useState([]);
    const [dataQRY_KCD_CURRENCY2_CURR_CD, setDataQRY_KCD_CURRENCY2_CURR_CD] =
        useState({});

    const onDropdownChangeQRY_KCD_CURRENCY2_CURR_CD = (e, name) => {
        let val = (e.value && e.value.CD_NAME) || "";

        let _dataQRY_KCD_CURRENCY2 = { ...dataQRY_KCD_CURRENCY2 };

        let tTypeVal = _dataQRY_KCD_CURRENCY2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KCD_CURRENCY2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KCD_CURRENCY2[`${name}`] = parseInt(val);
        }

        setDataQRY_KCD_CURRENCY2(_dataQRY_KCD_CURRENCY2);
        setDataQRY_KCD_CURRENCY2_CURR_CD(e.value);
    };
    /**TABLE KCD_CURRENCY */
    // DEFINE DATAGRID : TBL_KCD_CURRENCY
    const [datasTBL_KCD_CURRENCY, setDatasTBL_KCD_CURRENCY] = useState([]);
    const dt_TBL_KCD_CURRENCY = useRef(null);
    const [dataTBL_KCD_CURRENCY, setDataTBL_KCD_CURRENCY] = useState(
        emptyTBL_KCD_CURRENCY,
    );
    const [selectedTBL_KCD_CURRENCY, setSelectedTBL_KCD_CURRENCY] = useState(
        [],
    );
    const [flagSelectModeTBL_KCD_CURRENCY, setFlagSelectModeTBL_KCD_CURRENCY] =
        useState(false);

    // DATAGRID CODE : TBL_KCD_CURRENCY

    const onRowClick1TBL_KCD_CURRENCY = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KCD_CURRENCY = argData;

        setDataTBL_KCD_CURRENCY(argTBL_KCD_CURRENCY);
    };

    const onRowClickTBL_KCD_CURRENCY = (event) => {
        let argTBL_KCD_CURRENCY = event.data;
        if (flagSelectModeTBL_KCD_CURRENCY) return;

        // Service : NawooAll:mgrQueryTBL_KCD_CURRENCY
    };

    const searchTBL_KCD_CURRENCY = () => {
        clearSelectedTBL_KCD_CURRENCY();
        console.log(dataQRY_KCD_CURRENCY);
        if (dataQRY_KCD_CURRENCY.START_DATE === "") {
            alert("날짜를 입력해주세요<br><br>Please enter the date");
            return;
        }

        serviceS0112_KCD_CURRENCY
            .mgrQueryTBL_KCD_CURRENCY(dataQRY_KCD_CURRENCY)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length <= 0) {
                        searchNEOE_CURRENCY();
                    } else {
                        console.log(
                            "ServiceNawooAll.mgrQueryTBL_KCD_CURRENCY() call => " +
                                data.length,
                        );

                        console.log(data);
                        var tArray = [];
                        var tIdx = 0;
                        for (tIdx = 0; tIdx < 11; tIdx++) {
                            var tObj = {};
                            if (tIdx === 0) tObj.CURR_CD = "KRW";
                            if (tIdx === 1) tObj.CURR_CD = "USD";
                            if (tIdx === 2) tObj.CURR_CD = "JPY";
                            if (tIdx === 3) tObj.CURR_CD = "EUR";
                            if (tIdx === 4) tObj.CURR_CD = "GBP";
                            if (tIdx === 5) tObj.CURR_CD = "CHF";
                            if (tIdx === 6) tObj.CURR_CD = "HKD";
                            if (tIdx === 7) tObj.CURR_CD = "IDR";
                            if (tIdx === 8) tObj.CURR_CD = "CNY";
                            if (tIdx === 9) tObj.CURR_CD = "VND";
                            if (tIdx === 10) tObj.CURR_CD = "ETB";
                            tObj.START_DATE = "";
                            tObj.USD_RATE = "0.0";
                            tObj.WON_AMT = "0.0";
                            tObj.WON_AMT2 = "0.0";
                            tArray.push(tObj);
                        }

                        data.forEach((col, i) => {
                            var tObj = { ...col };
                            if (tObj.CURR_CD === "KRW") tArray[0] = tObj;
                            if (tObj.CURR_CD === "USD") tArray[1] = tObj;
                            if (tObj.CURR_CD === "JPY") tArray[2] = tObj;
                            if (tObj.CURR_CD === "EUR") tArray[3] = tObj;
                            if (tObj.CURR_CD === "GBP") tArray[4] = tObj;
                            if (tObj.CURR_CD === "CHF") tArray[5] = tObj;
                            if (tObj.CURR_CD === "HKD") tArray[6] = tObj;
                            if (tObj.CURR_CD === "IDR") tArray[7] = tObj;
                            if (tObj.CURR_CD === "CNY") tArray[8] = tObj;
                            if (tObj.CURR_CD === "VND") tArray[9] = tObj;
                            if (tObj.CURR_CD === "ETB") tArray[10] = tObj;
                        });

                        var tArray1 = tArray.map((col, i) => {
                            var tObj = { ...col };
                            tObj.USD_RATE = serviceLib.getNumberFormat(
                                col.USD_RATE,
                                8,
                            );
                            tObj.WON_AMT = serviceLib.getNumberFormat(
                                col.WON_AMT,
                                8,
                            );
                            return tObj;
                        });
                        setDatasTBL_KCD_CURRENCY(tArray1);
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_CURRENCY()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KCD_CURRENCY
    };

    const clearSelectedTBL_KCD_CURRENCY = () => {
        setSelectedTBL_KCD_CURRENCY([]);
        setFlagSelectModeTBL_KCD_CURRENCY(false);
    };

    const exportExcelTBL_KCD_CURRENCY = (data) => {
        console.log("excel");
        import("xlsx").then((xlsx) => {
            console.log(datasTBL_KCD_CURRENCY);
            const worksheet = xlsx.utils.json_to_sheet(data);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KCD_CURRENCY(excelBuffer, "환율목록");
        });
    };

    const saveAsExcelFileTBL_KCD_CURRENCY = (buffer, fileName) => {
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

    const saveEDT_KCD_CURRENCY_INSERT = () => {
        let _datasTBL_KCD_CURRENCY = [...datasTBL_KCD_CURRENCY];
        let _dataTBL_KCD_CURRENCY = { ...dataTBL_KCD_CURRENCY };

        let tArray = [];
        let tIdx = 0;
        for (tIdx = 0; tIdx < _datasTBL_KCD_CURRENCY.length; tIdx++) {
            let tObj0 = _datasTBL_KCD_CURRENCY[tIdx];

            let wonAmt = parseFloat(tObj0.WON_AMT).toFixed(8);
            if (isNaN(wonAmt)) {
                alert("입력값이 잘못 되었습니다<br><br>Input value is incorrect");
                return;
            }

            let _tObj0 = { ...tObj0 };
            if (typeof _tObj0.__typename !== "undefined")
                delete _tObj0.__typename;

            tArray.push(_tObj0);
        }

        serviceS0112_KCD_CURRENCY
            .mgrInsertEDT_KCD_CURRENCY(tArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "serviceS0112_KCD_CURRENCY.mgrInsertEDT_KCD_CURRENCY call => " +
                            data.length,
                    );
                    alert("저장되었습니다<br><br>Saved");
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0108_KCD_PLACE( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const deleteEDT_KCD_CURRENCY_DELETE = () => {
        let _datasTBL_KCD_CURRENCY = [...datasTBL_KCD_CURRENCY];
        let _dataTBL_KCD_CURRENCY = { ...dataTBL_KCD_CURRENCY };

        let tArray = [];
        let tIdx = 0;
        for (tIdx = 0; tIdx < _datasTBL_KCD_CURRENCY.length; tIdx++) {
            let tObj0 = _datasTBL_KCD_CURRENCY[tIdx];

            let _tObj0 = { ...tObj0 };
            if (typeof _tObj0.__typename !== "undefined")
                delete _tObj0.__typename;

            tArray.push(_tObj0);
        }

        serviceS0112_KCD_CURRENCY
            .mgrDeleteEDT_KCD_CURRENCY(tArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "serviceS0112_KCD_CURRENCY.mgrInsertEDT_KCD_CURRENCY call => " +
                            data.length,
                    );
                    alert("삭제되었습니다<br><br>has been deleted");
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0108_KCD_PLACE( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    /**TABLE KCD_CURRENCY2 */
    // DEFINE DATAGRID : TBL_KCD_CURRENCY2
    const [datasTBL_KCD_CURRENCY2, setDatasTBL_KCD_CURRENCY2] = useState([]);
    const dt_TBL_KCD_CURRENCY2 = useRef(null);
    const [dataTBL_KCD_CURRENCY2, setDataTBL_KCD_CURRENCY2] = useState(
        emptyTBL_KCD_CURRENCY2,
    );
    const [selectedTBL_KCD_CURRENCY2, setSelectedTBL_KCD_CURRENCY2] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KCD_CURRENCY2,
        setFlagSelectModeTBL_KCD_CURRENCY2,
    ] = useState(false);

    // DATAGRID CODE : TBL_KCD_CURRENCY2

    const onRowClick1TBL_KCD_CURRENCY2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KCD_CURRENCY2 = argData;

        setDataTBL_KCD_CURRENCY2(argTBL_KCD_CURRENCY2);
    };

    const onRowClickTBL_KCD_CURRENCY2 = (event) => {
        let argTBL_KCD_CURRENCY2 = event.data;
        if (flagSelectModeTBL_KCD_CURRENCY2) return;

        // Service : NawooAll:mgrQueryTBL_KCD_CURRENCY2
    };

    const searchTBL_KCD_CURRENCY2 = () => {
        clearSelectedTBL_KCD_CURRENCY2();

        serviceS0112_KCD_CURRENCY
            .mgrQueryTBL_KCD_CURRENCY2(dataQRY_KCD_CURRENCY2)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_CURRENCY2() call => " +
                            data.length,
                    );
                    console.log(data);

                    let tArray = data.map((col, i) => {
                        let tObj = { ...col };
                        tObj.USD_RATE = serviceLib.getNumberFormat(
                            col.USD_RATE,
                            8,
                        );
                        tObj.WON_AMT = serviceLib.getNumberFormat(
                            col.WON_AMT,
                            8,
                        );
                        return tObj;
                    });

                    setDatasTBL_KCD_CURRENCY2(tArray);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_CURRENCY2()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KCD_CURRENCY2
    };

    const clearSelectedTBL_KCD_CURRENCY2 = () => {
        setSelectedTBL_KCD_CURRENCY2([]);
        setFlagSelectModeTBL_KCD_CURRENCY2(false);
    };

    useEffect(() => {
        serviceS0112_KCD_CURRENCY
            .mgrQueryTBL_KCD_CURRENCY_CODE()
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "serviceS0112_KCD_CURRENCY.mgrQueryTBL_KCD_CURRENCY_CODE call => " +
                            data.CURR_CD.length,
                    );
                    console.log(data.CURR_CD);
                    setDatasQRY_KCD_CURRENCY2_CURR_CD(data.CURR_CD);
                    setDataQRY_KCD_CURRENCY2_CURR_CD(data.CURR_CD[0]);

                    var tCurrDate = serviceLib.getCurrDate1();
                    var tObj = { ...dataQRY_KCD_CURRENCY };
                    tObj.START_DATE = tCurrDate;
                    setDataQRY_KCD_CURRENCY(tObj);

                    var tObj1 = { ...dataQRY_KCD_CURRENCY2 };
                    tObj1.S_DATE = tCurrDate;
                    tObj1.E_DATE = tCurrDate;
                    setDataQRY_KCD_CURRENCY2(tObj1);
                } else {
                    console.log(
                        "serviceS0112_KCD_CURRENCY.mgrQueryTBL_KCD_CURRENCY_CODE error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    }, []);

    // Support Area

    const changeDateVal = (argVal) => {
        if (typeof argVal === "undefined") return "";
        if (argVal === null) return "";
        if (argVal === "") return argVal;

        var tYear = parseInt(argVal.substring(0, 4));
        var tMon = parseInt(argVal.substring(4, 6));
        var tDay = parseInt(argVal.substring(6));

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
        console.log(tRet);
        return tRet;
    };

    /** */
    const cellEditor = (options) => {
        if (options.field === "WON_AMT") return textEditor(options);
        else return textEditor(options);
    };

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={String(options.value)}
                onChange={(e) => options.editorCallback(e.target.value)}
            />
        );
    };

    const onCellEditComplete = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        var tObjs = [...datasTBL_KCD_CURRENCY];
        var tWonAmt = parseFloat(tObjs[1].WON_AMT);

        var tUsdRate = parseFloat(newValue) / tWonAmt;
        if (rowData["CURR_CD"] === "VND" || rowData["CURR_CD"] === "JPY") {
            tUsdRate = parseFloat(newValue) / tWonAmt / 100.0;
        }

        console.log("tUsdRate" + tUsdRate);

        rowData["USD_RATE"] = String(serviceLib.getFloat(tUsdRate, 8));
        rowData["WON_AMT"] = String(serviceLib.getFloat(newValue, 8));

        // rowData[field] = serviceLib.getNumberFormat(String(newValue), 8);
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "60rem", height: "93vh" }}
            >
                <div
                    className="af-div-first"
                    style={{ width: "60rem", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>일자</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_START_DATE"
                                value={changeDateVal(
                                    dataQRY_KCD_CURRENCY.START_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KCD_CURRENCY_START_DATE(
                                        e,
                                        "START_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Tooltip
                                className="menuCodeTooltip"
                                target={`#btnSearch`}
                                content={`Alt+S`}
                                position="bottom"
                            />

                            <Button
                                style={{ width: "9rem" }}
                                label={
                                    <span>
                                        Search(<u>S</u>)
                                    </span>
                                }
                                accessKey="S"
                                id="btnSearch"
                                className="p-button-text"
                                onClick={searchTBL_KCD_CURRENCY}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label="Excel"
                                className="p-button-text green"
                                onClick={() =>
                                    exportExcelTBL_KCD_CURRENCY(
                                        datasTBL_KCD_CURRENCY,
                                    )
                                }
                            />
                        </div>
                    </span>
                </div>
                <div
                    className="af-div-first"
                    style={{ width: "60rem", height: "95%" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KCD_CURRENCY}
                        size="small"
                        value={datasTBL_KCD_CURRENCY}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KCD_CURRENCY}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KCD_CURRENCY(true);
                            setSelectedTBL_KCD_CURRENCY(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KCD_CURRENCY.length,
                            );
                            onRowClick1TBL_KCD_CURRENCY(e.value);
                        }}
                        onRowClick={onRowClickTBL_KCD_CURRENCY}
                        dataKey="CURR_CD"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="30rem"
                    >
                        <AFColumn field="CURR_CD" headerClassName="t-header" header="통화" style={{ width: "6rem", flexBasis: "auto" }} bodyClassName="t-header text-center" ></AFColumn>
                        <AFColumn field="USD_RATE" headerClassName="t-header" header="달러" style={{ width: "10rem", flexBasis: "auto" }} bodyClassName="col-right" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.USD_RATE, 8) } ></AFColumn>
                        <AFColumn field="WON_AMT" headerClassName="t-header" header="원화" style={{ width: "14rem", flexBasis: "auto" }} bodyClassName="col-right" editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.WON_AMT, 8) } ></AFColumn>
                    </AFDataTable>
                </div>
            </div>

            <div
                className="af-div-second"
                style={{ width: "63rem", height: "93vh" }}
            >
                <div
                    className="af-div-first"
                    style={{ width: "63rem", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "13rem" }}>
                        <p className="af-span-p" style={{ width: "3rem" }}>기간</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem", marginLeft: "0.5rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_DATE"
                                value={changeDateVal(
                                    dataQRY_KCD_CURRENCY2.S_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KCD_CURRENCY2_S_DATE(
                                        e,
                                        "S_DATE",
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
                                style={{ width: "9rem", marginLeft: "0.5rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_E_DATE"
                                value={changeDateVal(
                                    dataQRY_KCD_CURRENCY2.E_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KCD_CURRENCY2_E_DATE(
                                        e,
                                        "E_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "13rem" }}>
                        <p className="af-span-p" style={{ width: "3rem" }}>통화</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                id="id_CURR_CD"
                                style={{ width: "9rem" }}
                                value={dataQRY_KCD_CURRENCY2_CURR_CD}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KCD_CURRENCY2_CURR_CD(
                                        e,
                                        "CURR_CD",
                                    )
                                }
                                options={datasQRY_KCD_CURRENCY2_CURR_CD}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label={
                                    <span>
                                        Search(<u>S</u>)
                                    </span>
                                }
                                id="btnSearch"
                                className="p-button-text"
                                onClick={searchTBL_KCD_CURRENCY2}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label="Excel"
                                className="p-button-text green"
                                onClick={() =>
                                    exportExcelTBL_KCD_CURRENCY(
                                        datasTBL_KCD_CURRENCY2,
                                    )
                                }
                            />
                        </div>
                    </span>
                </div>
                <div
                    className="af-div-first"
                    style={{ width: "60rem", height: "95%" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KCD_CURRENCY2}
                        size="small"
                        value={datasTBL_KCD_CURRENCY2}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KCD_CURRENCY2}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KCD_CURRENCY2(true);
                            setSelectedTBL_KCD_CURRENCY2(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KCD_CURRENCY2.length,
                            );
                            onRowClick1TBL_KCD_CURRENCY2(e.value);
                        }}
                        onRowClick={onRowClickTBL_KCD_CURRENCY2}
                        className="datatable-responsive"
                        emptyMessage=" "
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="30rem"
                    >
                        <AFColumn field="START_DATE" headerClassName="t-header" header="일자" style={{ width: "8rem", flexBasis: "auto" }} bodyClassName="t-header text-center" body={(rowData) => serviceLib.dateFormat(rowData.START_DATE)}></AFColumn>
                        <AFColumn field="CURR_CD" headerClassName="t-header" header="통화" style={{ width: "8rem", flexBasis: "auto" }} bodyClassName="t-header text-center" ></AFColumn>
                        <AFColumn field="USD_RATE" headerClassName="t-header" header="달러" style={{ width: "12rem", flexBasis: "auto" }} bodyClassName="col-right text-right" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.USD_RATE, 8) } ></AFColumn>
                        <AFColumn field="WON_AMT" headerClassName="t-header" header="원화" style={{ width: "12rem", flexBasis: "auto" }} bodyClassName="col-right text-right" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.WON_AMT, 8) } ></AFColumn>
                        {/* <AFColumn field="WON_AMT2" header="원화2" headerStyle={{ width: '10rem' }} bodyStyle={{ width: '10rem' }}></AFColumn> */}
                    </AFDataTable>
                </div>
            </div>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Save"
                            className="p-button-text"
                            onClick={saveEDT_KCD_CURRENCY_INSERT}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Delete"
                            className="p-button-text"
                            onClick={deleteEDT_KCD_CURRENCY_DELETE}
                        />
                    </div>
                </span>
            </div>
            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0112_KCD_CURRENCY, comparisonFn);
