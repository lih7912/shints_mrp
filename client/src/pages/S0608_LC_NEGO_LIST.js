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

import ExcelJS from "exceljs";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0608_LC_NEGO_LIST } from "../service/service_biz/ServiceS0608_LC_NEGO_LIST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_INVOICE_MST = {
    BILL_TYPE: "",
    S_BILL_DATE: "",
    E_BILL_DATE: "",
    BUYER_CD: "",
    BANK_CD: "",
    INVOICE_NO: "",
    DEBIT_CD: "",
};

const emptyTBL_KSV_INVOICE_MST = {
    id: 0,
    REF_NO: "",
    BANK_NAME: "",
    BUYER_NAME: "",
    BILL_DATE: "",
    CURR_CD: "",
    BILL_AMT: "",
    CONFIRM_AMT: "",
    BAL_AMT: "",
    END_FLAG: "",
    BILL_TYPE: "",
};

const emptyTBL_KSV_INVOICE_MST1 = {
    id: 0,
    CREDIT_NO: "",
    AMOUNT: "",
};

const emptyTBL_KSV_INVOICE_MST2 = {
    id: 0,
    INVOICE_NO: "",
    CURR_CD: "",
    AMOUNT: "",
    SHIP_DATE: "",
    DUE_DATE: "",
    CURR_BILL_AMT: "",
    OA_NEGO: "",
    REMAIN_AMT: "",
    BUYER_NAME: "",
};

const emptyTBL_KSV_INVOICE_MST3 = {
    id: 0,
    KIND: "",
    CURR_CD: "",
    AMOUNT: "",
    IN_DATE: "",
    DUE_DATE: "",
    CURR_BILL_AMT: "",
    REMAIN_AMT: "",
    BUYER_NAME: "",
};

const emptyTBL_KSV_INVOICE_MST4 = {
    id: 0,
    BILL_AMT: "",
    REF_NO: "",
    EXCHANGE_RATE: "",
};

const S0608_LC_NEGO_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0608_LC_NEGO_LISTRef = useRef(null);
    if (!serviceS0608_LC_NEGO_LISTRef.current) serviceS0608_LC_NEGO_LISTRef.current = new ServiceS0608_LC_NEGO_LIST();
    const serviceS0608_LC_NEGO_LIST = serviceS0608_LC_NEGO_LISTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const process_RESET = () => {
        setDataQRY_KSV_INVOICE_MST(emptyQRY_KSV_INVOICE_MST);
        setDatasTBL_KSV_INVOICE_MST([]);
        setSelectedTBL_KSV_INVOICE_MST([]);
        setDatasTBL_KSV_INVOICE_MST1([]);
        setSelectedTBL_KSV_INVOICE_MST1([]);
    };

    const search_CODE = (argData) => {
        var _tObj = { ...argData };

        serviceS0608_LC_NEGO_LIST.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_INVOICE_MST_BANK_CD(data.BANK_CD);
                setDataQRY_KSV_INVOICE_MST_BANK_CD(data.BANK_CD[0]);

                setDatasQRY_KSV_INVOICE_MST_BILL_TYPE(data.BILL_TYPE);
                setDataQRY_KSV_INVOICE_MST_BILL_TYPE(data.BILL_TYPE[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_1 = () => {
        var _tData = { ...dataQRY_KSV_INVOICE_MST };

        if (_tData.INVOICE_NO !== "" && _tData.DEBIT_CD !== "") {
            alert("invoice_no, debit_cd중 하나만 입력가능합니다<br><br>Only one of invoice_no and debit_cd can be entered.");
            return;
        }

        setDatasTBL_KSV_INVOICE_MST([]);
        setSelectedTBL_KSV_INVOICE_MST([]);

        setLoadingTBL_KSV_INVOICE_MST(true);

        serviceS0608_LC_NEGO_LIST.mgrQuery_LIST_1(_tData).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );

                if (data.length <= 0) {
                    setDatasTBL_KSV_INVOICE_MST([]);
                    return;
                }

                var tArray2 = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_INVOICE_MST(tArray2);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2 = (argData) => {
        setDatasTBL_KSV_INVOICE_MST1([]);
        setSelectedTBL_KSV_INVOICE_MST1([]);
        setDatasTBL_KSV_INVOICE_MST2([]);
        setSelectedTBL_KSV_INVOICE_MST2([]);

        setLoadingTBL_KSV_INVOICE_MST1(true);

        serviceS0608_LC_NEGO_LIST.mgrQuery_LIST_2(argData).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST1(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.DATA1.length > 0) {
                    var tArray = [];
                    data.DATA1.forEach((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        tArray.push(tObj);
                    });
                    setDatasTBL_KSV_INVOICE_MST1(tArray);
                }
                if (data.DATA2.length > 0) {
                    var tArray1 = [];
                    data.DATA2.forEach((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        tArray1.push(tObj);
                    });
                    setDatasTBL_KSV_INVOICE_MST2(tArray1);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /* QRY KSV_INVOICE_MST*/
    const [dataQRY_KSV_INVOICE_MST, setDataQRY_KSV_INVOICE_MST] = useState(
        emptyQRY_KSV_INVOICE_MST,
    );

    const onInputChangeQRY_KSV_INVOICE_MST_DEBIT_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
    };

    const onInputChangeQRY_KSV_INVOICE_MST_INVOICE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
    };

    const [
        datasQRY_KSV_INVOICE_MST_BUYER_CD,
        setDatasQRY_KSV_INVOICE_MST_BUYER_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_INVOICE_MST_BUYER_CD,
        setDataQRY_KSV_INVOICE_MST_BUYER_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_BUYER_CD(e.value);
    };

    const onCalChangeQRY_KSV_INVOICE_MST_S_BILL_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };
        _dataQRY_KSV_INVOICE_MST[`${name}`] = val;
        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
    };

    const onCalChangeQRY_KSV_INVOICE_MST_E_BILL_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };
        _dataQRY_KSV_INVOICE_MST[`${name}`] = val;
        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
    };

    const [
        datasQRY_KSV_INVOICE_MST_BILL_TYPE,
        setDatasQRY_KSV_INVOICE_MST_BILL_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_INVOICE_MST_BILL_TYPE,
        setDataQRY_KSV_INVOICE_MST_BILL_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_BILL_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_BILL_TYPE(e.value);
    };

    const [
        datasQRY_KSV_INVOICE_MST_BANK_CD,
        setDatasQRY_KSV_INVOICE_MST_BANK_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_INVOICE_MST_BANK_CD,
        setDataQRY_KSV_INVOICE_MST_BANK_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_BANK_CD = (e, name) => {
        let val = (e.value && e.value.BANK_CD) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_BANK_CD(e.value);
    };

    const onKeyPress_QRY_KSV_INVOICE_MST_BANK_CD = (e, name) => {
        if (e.key === "Enter") {
            var tObj = {};
            tObj.BUYER_CD = dataQRY_KSV_INVOICE_MST.BUYER_CD;
            tObj.BANK_CD = e.target.value.trim();
            search_CODE(tObj);
        }
    };

    /* TABLE KSV_INVOICE_MST*/
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST
    const [loadingTBL_KSV_INVOICE_MST, setLoadingTBL_KSV_INVOICE_MST] =
        useState(false);

    const [datasTBL_KSV_INVOICE_MST, setDatasTBL_KSV_INVOICE_MST] = useState(
        [],
    );
    const dt_TBL_KSV_INVOICE_MST = useRef(null);
    const [dataTBL_KSV_INVOICE_MST, setDataTBL_KSV_INVOICE_MST] = useState(
        emptyTBL_KSV_INVOICE_MST,
    );
    const [selectedTBL_KSV_INVOICE_MST, setSelectedTBL_KSV_INVOICE_MST] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_INVOICE_MST,
        setFlagSelectModeTBL_KSV_INVOICE_MST,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_INVOICE_MST

    const onRowClick1TBL_KSV_INVOICE_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_INVOICE_MST = argData;

        setDataTBL_KSV_INVOICE_MST(argTBL_KSV_INVOICE_MST);

        var tInObj = {};
        tInObj.REF_NO = argData.REF_NO;
        tInObj.BILL_TYPE = argData.BILL_TYPE_CD;
        search_LIST_2(tInObj);
    };

    const onRowClickTBL_KSV_INVOICE_MST = (event) => {
        let argTBL_KSV_INVOICE_MST = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST
    };

    const exportExcelTBL_KSV_INVOICE_MST = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("TT입금리스트");

        const tArray = [];

        datasTBL_KSV_INVOICE_MST.forEach((col) => {
            const tCols = col.INVOICE_NO.split("/");
            const tCols1 = tCols[0].split(":");

            const tObj = {
                구분: col.BILL_TYPE,
                거래번호: col.REF_NO,
                Buyer: col.BUYER_NAME,
                총금액: col.TOT_AMT,
                Invice_No: tCols1[0],
                금액: tCols1[2],
                통화: col.CURR_CD,
                시작일: col.START_DATE,
                만기일: col.END_DATE,
                Balance: col.BAL_AMT,
                상환일: col.BILL_DATE,
                지연일수: col.DELAY_DAYS,
                지연이자: col.DELAY_INTERREST,
                Less_Charge: col.LESS_CHARGE,
                Bank: col.BANK_NAME,
            };
            tArray.push(tObj);

            if (tCols.length > 1) {
                tCols.forEach((col1, i1) => {
                    if (col1 !== "" && i1 > 0) {
                        const tCols1_1 = col1.split(":");

                        const tObj1 = {
                            구분: "",
                            거래번호: "",
                            Buyer: "",
                            총금액: "",
                            Invice_No: tCols1_1[0],
                            금액: tCols1_1[2],
                            통화: "",
                            시작일: col.START_DATE,
                            만기일: col.END_DATE,
                            Balance: "",
                            상환일: "",
                            지연일수: "",
                            지연이자: "",
                            Less_Charge: "",
                            Bank: "",
                        };
                        tArray.push(tObj1);
                    }
                });
            }
        });

        // 열 정의 (헤더)
        const headers = Object.keys(tArray[0]);
        worksheet.columns = headers.map((key) => ({
            header: key,
            key: key,
            width: 20,
        }));

        // 데이터 행 추가
        tArray.forEach((row) => {
            worksheet.addRow(row);
        });

        // 전체 셀에 테두리 적용 (빈 셀 포함)
        const rowCount = worksheet.rowCount;
        const colCount = worksheet.columnCount;
        const borderStyle = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
        };

        for (let i = 1; i <= rowCount; i++) {
            const row = worksheet.getRow(i);
            for (let j = 1; j <= colCount; j++) {
                const cell = row.getCell(j);
                if (!cell.value) cell.value = "";
                cell.border = borderStyle;
            }
        }

        // 열 폭 자동 조정
        worksheet.columns.forEach((column) => {
            let maxLength = column.header.length;
            column.eachCell?.({ includeEmpty: true }, (cell) => {
                const cellValue = cell.value ? cell.value.toString() : "";
                maxLength = Math.max(maxLength, cellValue.length);
            });
            column.width = maxLength + 2; // padding
        });

        // 버퍼 작성 및 다운로드
        const buffer = await workbook.xlsx.writeBuffer();
        saveAsExcelFileTBL_KSV_INVOICE_MST(buffer, "TT입금리스트");
    };

    const saveAsExcelFileTBL_KSV_INVOICE_MST = (buffer, fileName) => {
        const EXCEL_TYPE =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], { type: EXCEL_TYPE });
        saveAs(
            data,
            `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`,
        );
    };

    /**TABLE KSV_INVOICE_MST1 */
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST1
    const [loadingTBL_KSV_INVOICE_MST1, setLoadingTBL_KSV_INVOICE_MST1] =
        useState(false);

    const [datasTBL_KSV_INVOICE_MST1, setDatasTBL_KSV_INVOICE_MST1] = useState(
        [],
    );
    const dt_TBL_KSV_INVOICE_MST1 = useRef(null);
    const [dataTBL_KSV_INVOICE_MST1, setDataTBL_KSV_INVOICE_MST1] = useState(
        emptyTBL_KSV_INVOICE_MST1,
    );
    const [selectedTBL_KSV_INVOICE_MST1, setSelectedTBL_KSV_INVOICE_MST1] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_INVOICE_MST1,
        setFlagSelectModeTBL_KSV_INVOICE_MST1,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_INVOICE_MST1

    const onRowClick1TBL_KSV_INVOICE_MST1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_INVOICE_MST1 = argData;

        setDataTBL_KSV_INVOICE_MST1(argTBL_KSV_INVOICE_MST1);
    };

    const onRowClickTBL_KSV_INVOICE_MST1 = (event) => {
        let argTBL_KSV_INVOICE_MST1 = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST1
    };

    /**TABLE KSV_INVOICE_MST2 */
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST2
    const [loadingTBL_KSV_INVOICE_MST2, setLoadingTBL_KSV_INVOICE_MST2] =
        useState(false);

    const [datasTBL_KSV_INVOICE_MST2, setDatasTBL_KSV_INVOICE_MST2] = useState(
        [],
    );
    const dt_TBL_KSV_INVOICE_MST2 = useRef(null);
    const [dataTBL_KSV_INVOICE_MST2, setDataTBL_KSV_INVOICE_MST2] = useState(
        emptyTBL_KSV_INVOICE_MST2,
    );
    const [selectedTBL_KSV_INVOICE_MST2, setSelectedTBL_KSV_INVOICE_MST2] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_INVOICE_MST2,
        setFlagSelectModeTBL_KSV_INVOICE_MST2,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_INVOICE_MST2

    const onRowClick1TBL_KSV_INVOICE_MST2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_INVOICE_MST2 = argData;

        setDataTBL_KSV_INVOICE_MST2(argTBL_KSV_INVOICE_MST2);
    };

    const onRowClickTBL_KSV_INVOICE_MST2 = (event) => {
        let argTBL_KSV_INVOICE_MST2 = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST2
    };

    /**TABLE KSV_INVOICE_MST3 */
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST3
    const [loadingTBL_KSV_INVOICE_MST3, setLoadingTBL_KSV_INVOICE_MST3] =
        useState(false);

    const [datasTBL_KSV_INVOICE_MST3, setDatasTBL_KSV_INVOICE_MST3] = useState(
        [],
    );
    const dt_TBL_KSV_INVOICE_MST3 = useRef(null);
    const [dataTBL_KSV_INVOICE_MST3, setDataTBL_KSV_INVOICE_MST3] = useState(
        emptyTBL_KSV_INVOICE_MST3,
    );
    const [selectedTBL_KSV_INVOICE_MST3, setSelectedTBL_KSV_INVOICE_MST3] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_INVOICE_MST3,
        setFlagSelectModeTBL_KSV_INVOICE_MST3,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_INVOICE_MST3

    /**TABLE KSV_INVOICE_MST4 */
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST4
    const [loadingTBL_KSV_INVOICE_MST4, setLoadingTBL_KSV_INVOICE_MST4] =
        useState(false);

    const [datasTBL_KSV_INVOICE_MST4, setDatasTBL_KSV_INVOICE_MST4] = useState(
        [],
    );
    const dt_TBL_KSV_INVOICE_MST4 = useRef(null);
    const [dataTBL_KSV_INVOICE_MST4, setDataTBL_KSV_INVOICE_MST4] = useState(
        emptyTBL_KSV_INVOICE_MST4,
    );
    const [selectedTBL_KSV_INVOICE_MST4, setSelectedTBL_KSV_INVOICE_MST4] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_INVOICE_MST4,
        setFlagSelectModeTBL_KSV_INVOICE_MST4,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_INVOICE_MST4

    useEffect(() => {
        var _tObj = {};
        _tObj.BUYER_CD = "";
        _tObj.BANK_CD = "";
        search_CODE(_tObj);

        var tRetDate = serviceLib.getCurrDate().substring(0, 8);

        var tObj0 = { ...dataQRY_KSV_INVOICE_MST };
        tObj0.S_BILL_DATE = `${tRetDate.substring(0, 6)}01`;
        tObj0.E_BILL_DATE = `${tRetDate.substring(0, 6)}31`;
        setDataQRY_KSV_INVOICE_MST(tObj0);

        // search_LIST_1();
    }, []);

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
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>End Type</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Dropdown
                            style={{ width: "12rem" }}
                            id="id_BILL_TYPE"
                            value={dataQRY_KSV_INVOICE_MST_BILL_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_INVOICE_MST_BILL_TYPE(
                                    e,
                                    "BILL_TYPE",
                                )
                            }
                            options={datasQRY_KSV_INVOICE_MST_BILL_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>입금일</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_BILL_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_INVOICE_MST.S_BILL_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_INVOICE_MST_S_BILL_DATE(
                                    e,
                                    "S_BILL_DATE",
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
                            id="id_E_BILL_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_INVOICE_MST.E_BILL_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_INVOICE_MST_E_BILL_DATE(
                                    e,
                                    "E_BILL_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "70rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "60rem" }}>
                        <Dropdown
                            filter
                            style={{ width: "60rem" }}
                            id="id_BUYER_CD"
                            value={dataQRY_KSV_INVOICE_MST_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_INVOICE_MST_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_INVOICE_MST_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Invoice#</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            style={{ width: "12rem" }}
                            id="id_AMT"
                            value={dataQRY_KSV_INVOICE_MST.INVOICE_NO}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_INVOICE_MST_INVOICE_NO(
                                    e,
                                    "INVOICE_NO",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "31.5rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Debit#</p>
                    <div className="af-span-div" style={{ width: "23.5rem" }}>
                        <InputText
                            style={{ width: "23.5rem" }}
                            id="id_AMT"
                            value={dataQRY_KSV_INVOICE_MST.DEBIT_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_INVOICE_MST_DEBIT_CD(
                                    e,
                                    "DEBIT_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "70rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Bank</p>
                    <div className="af-span-div" style={{ width: "60rem" }}>
                        <Dropdown
                            filter
                            style={{ width: "60rem" }}
                            id="id_BUYER_CD"
                            value={dataQRY_KSV_INVOICE_MST_BANK_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_INVOICE_MST_BANK_CD(
                                    e,
                                    "BANK_CD",
                                )
                            }
                            options={datasQRY_KSV_INVOICE_MST_BANK_CD}
                            optionLabel="BANK_NAME"
                            placeholder=""
                            editable
                            onKeyPress={(e) =>
                                onKeyPress_QRY_KSV_INVOICE_MST_BANK_CD(
                                    e,
                                    "BANK_CD",
                                )
                            }
                        ></Dropdown>
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Reset"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={process_RESET}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Excel"
                            style={{ color: "green", width: "10rem" }}
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_INVOICE_MST}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "31rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_INVOICE_MST}
                    size="small"
                    value={datasTBL_KSV_INVOICE_MST}
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_INVOICE_MST}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_INVOICE_MST}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_INVOICE_MST(true);
                        setSelectedTBL_KSV_INVOICE_MST(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_INVOICE_MST.length,
                        );
                        onRowClick1TBL_KSV_INVOICE_MST(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_INVOICE_MST}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_INVOICE_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="31rem"
                >
                    <AFColumn field="BILL_TYPE" headerClassName="t-header" header="구분" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REF_NO" headerClassName="t-header" header="거래번호" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="TOT_AMT" headerClassName="t-header" header="금액" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_AMT, 2) } ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="통화" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="START_DATE" headerClassName="t-header" header="입금일" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormatHMS(rowData.START_DATE) } ></AFColumn>
                    <AFColumn field="END_DATE" headerClassName="t-header" header="만기일" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormatHMS(rowData.END_DATE) } ></AFColumn>
                    <AFColumn field="BAL_AMT" headerClassName="t-header" header="Balance" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BAL_AMT, 2) } ></AFColumn>
                    <AFColumn field="BILL_DATE" headerClassName="t-header" header="상환일" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormatHMS(rowData.BILL_DATE) } ></AFColumn>
                    <AFColumn field="DELAY_DAYS" headerClassName="t-header" header="지연일수" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DELAY_INTERREST" headerClassName="t-header" header="지연이자(W)" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="LESS_CHARGE" headerClassName="t-header" header="Less Charge" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BANK_NAME" headerClassName="t-header" header="Bank" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BANK_CD" headerClassName="t-header" header="Bank#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BANK_CD" headerClassName="t-header" header="Bank#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BILL_TYPE_CD" headerClassName="t-header" header="Type#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>
            <div
                className="af-div-first"
                style={{ width: "62rem", height: "20rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_INVOICE_MST1}
                    size="small"
                    value={datasTBL_KSV_INVOICE_MST1}
                    loading={loadingTBL_KSV_INVOICE_MST1}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_INVOICE_MST1}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_INVOICE_MST1(true);
                        setSelectedTBL_KSV_INVOICE_MST1(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_INVOICE_MST1.length,
                        );
                        onRowClick1TBL_KSV_INVOICE_MST1(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_INVOICE_MST1}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_INVOICE_MST1}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="20rem"
                >
                    <AFColumn field="REF_NO" headerClassName="t-header" header="거래번호" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="INVOICE_NO" headerClassName="t-header" header="Invoice번호" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DEBIT_CD" headerClassName="t-header" header="Debit번호" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BILL_AMT" headerClassName="t-header" header="금액" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BILL_AMT, 2) } ></AFColumn>
                </AFDataTable>
            </div>
            <div
                className="af-div-second"
                style={{ width: "61rem", height: "20rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_INVOICE_MST2}
                    size="small"
                    value={datasTBL_KSV_INVOICE_MST2}
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_INVOICE_MST2}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_INVOICE_MST2}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_INVOICE_MST2(true);
                        setSelectedTBL_KSV_INVOICE_MST2(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_INVOICE_MST2.length,
                        );
                        onRowClick1TBL_KSV_INVOICE_MST2(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_INVOICE_MST2}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_INVOICE_MST2}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="REF_NO" headerClassName="t-header" header="거래번호" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CREDIT_CD" headerClassName="t-header" header="Credit번호" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CREDIT_AMT" headerClassName="t-header" header="금액" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CREDIT_AMT, 2) } ></AFColumn>
                </AFDataTable>
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0608_LC_NEGO_LIST, comparisonFn);
