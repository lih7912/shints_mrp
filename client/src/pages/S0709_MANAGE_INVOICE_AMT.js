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
import { ServiceS0709_MANAGE_INVOICE_AMT } from "../service/service_biz/ServiceS0709_MANAGE_INVOICE_AMT";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_INVOICE_MST = {
    BUYER_CD: "",
    S_BILL_DATE: "",
    E_BILL_DATE: "",
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

const S0709_MANAGE_INVOICE_AMT = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0709_MANAGE_INVOICE_AMT =
        new ServiceS0709_MANAGE_INVOICE_AMT();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const search_CODE = (argData) => {
        var _tObj = { ...argData };

        serviceS0709_MANAGE_INVOICE_AMT.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER_CD[0]);
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

        setDatasTBL_KSV_INVOICE_MST([]);
        setSelectedTBL_KSV_INVOICE_MST([]);

        setLoadingTBL_KSV_INVOICE_MST(true);

        serviceS0709_MANAGE_INVOICE_AMT.mgrQuery_LIST_1(_tData).then((data) => {
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

        setLoadingTBL_KSV_INVOICE_MST1(true);
        serviceS0709_MANAGE_INVOICE_AMT
            .mgrQuery_LIST_2(argData)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        var tArray = [];
                        data.forEach((col, i) => {
                            var tObj = { ...col };
                            tObj.id = i + 1;
                            tArray.push(tObj);
                        });
                        setDatasTBL_KSV_INVOICE_MST1(tArray);
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const search_LIST_3 = (argData) => {
        setDatasTBL_KSV_INVOICE_MST2([]);
        setSelectedTBL_KSV_INVOICE_MST2([]);

        setLoadingTBL_KSV_INVOICE_MST2(true);

        serviceS0709_MANAGE_INVOICE_AMT
            .mgrQuery_LIST_3(argData)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );

                    if (data.length <= 0) {
                        setDatasTBL_KSV_INVOICE_MST2([]);
                        return;
                    }

                    var tArray2 = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    setDatasTBL_KSV_INVOICE_MST2(tArray2);
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

    const [
        datasQRY_KSV_INVOICE_MST_BANK_CD,
        setDatasQRY_KSV_INVOICE_MST_BANK_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_INVOICE_MST_BANK_CD,
        setDataQRY_KSV_INVOICE_MST_BANK_CD,
    ] = useState({});

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
        tInObj.KIND = "1";
        tInObj.BUYER_CD = argData.BUYER_CD;
        tInObj.CURR_CD = argData.CURR_CD;
        tInObj.S_BILL_DATE = dataQRY_KSV_INVOICE_MST.S_BILL_DATE;
        tInObj.E_BILL_DATE = dataQRY_KSV_INVOICE_MST.E_BILL_DATE;
        search_LIST_2(tInObj);

        var tInObj1 = {};
        tInObj1.BUYER_CD = argData.BUYER_CD;
        tInObj1.BILL_DATE = dataQRY_KSV_INVOICE_MST.E_BILL_DATE;
        search_LIST_3(tInObj1);
    };

    const onRowClickTBL_KSV_INVOICE_MST = (event) => {
        let argTBL_KSV_INVOICE_MST = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST
    };

    const exportExcelTBL_KSV_INVOICE_MST = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("매출채권조회");

        // 헤더 설정
        const headers = [
            { header: "BUYER", key: "buyer", width: 15 },
            { header: "통화", key: "currency", width: 10 },
            { header: "기한초과", key: "overdue", width: 12 },
            { header: "1주이내도래", key: "due_in_1w", width: 15 },
            { header: "2주이내도래", key: "due_in_2w", width: 15 },
            { header: "2주이후도래", key: "due_after_2w", width: 15 },
            { header: "소계", key: "subtotal", width: 12 },
            { header: "기한초과일수", key: "overdue_days", width: 15 },
            { header: "기간이자누계", key: "interest_accum", width: 15 },
            { header: "초과DEBIT", key: "debit", width: 12 },
            { header: "초과CREDIT", key: "credit", width: 12 },
        ];

        worksheet.columns = headers;

        // 첫 번째 행에 제목
        const titleCell = worksheet.getCell("A1");
        titleCell.value = "매출채권조회리스트";
        titleCell.font = { size: 11, bold: true };
        titleCell.alignment = { horizontal: "left", vertical: "middle" };
        // 첫 번째 ROW B부터 K 컬럼까지 내용 삭제 (왜 생기는지 원인불명)
        for (let col = 2; col <= 11; col++) {
            // B부터 K까지는 2~11 컬럼 인덱스
            worksheet.getCell(1, col).value = ""; // 해당 셀 내용 제거
        }

        // 기간
        let periodCell = worksheet.getCell("G1");
        periodCell.value = `기간 : ${dataQRY_KSV_INVOICE_MST.S_BILL_DATE} ~ ${dataQRY_KSV_INVOICE_MST.E_BILL_DATE}`;
        periodCell.font = { color: { argb: "FF0000" }, bold: false };

        // 헤더 추가 (세 번째 행)
        worksheet.addRow();
        worksheet.addRow(headers.map((h) => h.header));

        // 헤더 스타일 적용
        const headerRow = worksheet.getRow(3);
        headerRow.eachCell((cell, colNumber) => {
            cell.font = { bold: true };
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "DCE6F1" }, // 하늘색 배경
            };
            cell.alignment = { horizontal: "center" };

            // 3번째 컬럼부터 마지막 컬럼까지 빨간 글씨
            if (colNumber >= 3) {
                cell.font = { color: { argb: "FF0000" }, bold: true };
            }

            // 헤더 실선 추가
            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
            };
        });

        // 데이터 추가 (네 번째 행부터)
        datasTBL_KSV_INVOICE_MST.forEach((item) => {
            const rowData = {
                buyer: item.BUYER_CD,
                currency: item.CURR_CD,
                overdue: Number(item.OVER_DATE),
                due_in_1w: Number(item.ONE_WEEK),
                due_in_2w: Number(item.TWO_WEEK),
                due_after_2w: Number(item.TWO_WEEK_AFTER),
                subtotal: Number(item.TOTAL),
                overdue_days: Number(item.TOTAL_DATE),
                interest_accum: Number(item.INTEREST),
                debit: Number(item.DEBIT),
                credit: Number(item.CREDIT),
            };
            const newRow = worksheet.addRow(rowData);

            // buyer와 소계 컬럼 배경색 적용
            newRow.getCell(1).font = { bold: true };
            newRow.getCell(1).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "DCE6F1" },
            };
            newRow.getCell(7).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "DCE6F1" },
            };

            // 데이터 행에 실선 적용
            newRow.eachCell((cell) => {
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                };
            });
        });

        // 3번째 컬럼부터 11번째 컬럼까지 숫자 포맷 적용
        for (let col = 3; col <= 11; col++) {
            worksheet.getColumn(col).numFmt = "#,##0.#0"; // 세 자리마다 콤마 표시
        }

        // G.TOTAL 행 삽입
        const totalRowIndex = worksheet.lastRow.number + 1;
        const totalRow = worksheet.addRow([]);
        totalRow.getCell(1).value = "G.TOTAL";
        totalRow.getCell(1).font = { border: true };

        for (let col = 1; col <= 11; col++) {
            let totalCell = worksheet.getCell(totalRow.number, col);
            totalCell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "DCE6F1" }, // 하늘색 배경
            };
            totalCell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
            };
        }

        totalRow.getCell(1).alignment = { horizontal: "left" };

        // 각 컬럼의 합계 계산
        headers.slice(2).forEach((header, index) => {
            const colIndex = index + 3; // 컬럼 인덱스 (3번째 컬럼부터)
            const sumFormula = `SUM(${worksheet.getColumn(colIndex).letter}4:${worksheet.getColumn(colIndex).letter}${totalRowIndex - 1})`;
            totalRow.getCell(colIndex).value = { formula: sumFormula }; // Excel 계산식 적용
            totalRow.getCell(colIndex).font = { bold: true };
            totalRow.getCell(colIndex).alignment = { horizontal: "right" };
        });

        // 엑셀 파일 다운로드
        workbook.xlsx
            .writeBuffer()
            .then((buffer) => {
                const blob = new Blob([buffer], {
                    type: "application/octet-stream",
                });
                saveAs(blob, `매출채권조회_${new Date().getTime()}.xlsx`);
            })
            .catch((err) => {
                console.error("Error writing excel file:", err);
            });
    };

    const saveAs = (buffer, fileName) => {
        import("file-saver").then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE =
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE,
                });
                module.default.saveAs(data, fileName);
            }
        });
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
        tObj0.E_BILL_DATE = `${tRetDate}`;
        setDataQRY_KSV_INVOICE_MST(tObj0);

        // search_LIST_1();
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
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "38rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "30rem" }}>
                        <Dropdown
                            filter
                            style={{ width: "30rem" }}
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
                <span className="af-span-3-0" style={{ width: "17rem" }}>
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
                            label="Excel"
                            style={{ width: "10rem" }}
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_INVOICE_MST}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="#Invoice List"
                            style={{ width: "10rem" }}
                            className="p-button-text green"
                            onClick={blankFn}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "35rem" }}
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
                    scrollHeight="381px"
                >
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", backgroundColor: "#ebdfe3", }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="통화" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="OVER_DATE" headerClassName="t-header" header="기한초과" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numComAndFix(rowData.OVER_DATE, 2) } ></AFColumn>
                    <AFColumn field="ONE_WEEK" headerClassName="t-header" header="1주이내도래" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numComAndFix(rowData.OVER_DATE, 2) } ></AFColumn>
                    <AFColumn field="TWO_WEEK" headerClassName="t-header" header="2주이내도래" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numComAndFix(rowData.ONE_WEEK, 2) } ></AFColumn>
                    <AFColumn field="TWO_WEEK_AFTER" headerClassName="t-header" header="2주이후도래" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numComAndFix(rowData.TWO_WEEK_AFTER, 2) } ></AFColumn>
                    <AFColumn field="TOTAL" headerClassName="t-header" header="소계" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", backgroundColor: "#e6f9e5", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numComAndFix(rowData.TOTAL, 2) } ></AFColumn>
                    <AFColumn field="TOTAL_DATE" headerClassName="t-header" header="기한초과일수" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numComAndFix(rowData.TOTAL_DATE, 0) } ></AFColumn>
                    <AFColumn field="INTEREST" headerClassName="t-header" header="기간이자누계" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numComAndFix(rowData.INTEREST, 2) } ></AFColumn>
                    <AFColumn field="DEBIT" headerClassName="t-header" header="초과Debit" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numComAndFix(rowData.DEBIT, 2) } ></AFColumn>
                    <AFColumn field="CREDIT" headerClassName="t-header" header="초과Credit" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numComAndFix(rowData.CREDIT, 2) } ></AFColumn>
                </AFDataTable>
            </div>
            <div
                className="af-div-first"
                style={{ width: "61rem", height: "22.4rem" }}
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
                    scrollHeight="244px"
                >
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="INVOICE_NO" headerClassName="t-header" header="Invoice#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="통화" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BALANCE" headerClassName="t-header" header="Balance" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numComAndFix(rowData.BALANCE, 2) } ></AFColumn>
                    <AFColumn field="SHIP_DATE" headerClassName="t-header" header="Ship Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormat(rowData.SHIP_DATE) } ></AFColumn>
                    <AFColumn field="DUE_DATE" headerClassName="t-header" header="Due Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormat(rowData.DUE_DATE) } ></AFColumn>
                    <AFColumn field="OVER_DATE" headerClassName="t-header" header="초과일수" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormat(rowData.OVER_DATE) } ></AFColumn>
                    <AFColumn field="INTEREST" headerClassName="t-header" header="이자" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numComAndFix(rowData.INTEREST, 2) } ></AFColumn>
                </AFDataTable>
            </div>
            <div
                className="af-div-second"
                style={{
                    marginLeft: "1rem",
                    width: "61rem",
                    height: "22.4rem",
                }}
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
                    scrollHeight="244px"
                >
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="INVOICE_NO" headerClassName="t-header" header="Debit/Credit#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", backgroundColor: "#ebdfe3", }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="통화" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BALANCE" headerClassName="t-header" header="Balance" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numComAndFix(rowData.BALANCE, 2) } ></AFColumn>
                    <AFColumn field="REG_DATE" headerClassName="t-header" header="Reg Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", backgroundColor: "#e6f9e5", }} body={(rowData) => serviceLib.dateFormat(rowData.REG_DATE) } ></AFColumn>
                    <AFColumn field="END_DATE" headerClassName="t-header" header="End Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", backgroundColor: "#d7c9e5", }} body={(rowData) => serviceLib.dateFormat(rowData.END_DATE) } ></AFColumn>
                </AFDataTable>
            </div>
            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0709_MANAGE_INVOICE_AMT, comparisonFn);
