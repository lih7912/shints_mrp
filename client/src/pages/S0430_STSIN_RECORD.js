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
import { ProgressSpinner } from "primereact/progressspinner";
import { ContextMenu } from "primereact/contextmenu";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0430_STSIN_RECORD } from "../service/service_biz/ServiceS0430_STSIN_RECORD";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    USER_ID: "",
    BUYER_CD: "",
    PO_CD: "",
    VENDOR_CD: "",
    MRP_DATE: "",
    PU_STATUS: "",
};

const emptyQRY_KSV_PO_MRP2 = {
    IN_QTY: "",
};

const emptyQRY_KSV_PO_MRP1 = {
    BUYER_CD: "",
    PO_CD: "",
    VENDOR_CD: "",
    MRP_DATE: "",
};

const emptyTBL_KSV_PO_MRP4 = {
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
    VENDOR_NAME: "",
    EX_FACTORY: "",
    STS_IN_AMT: "",
    MOQ_AMT: "",
    MOQ_AMT_CURR: "",

    REG_USER: "",
    PAY_CONDITION: "",
    PAY_TYPE: "",
    PAY_DATE: "",
    BAL_AMT: "",
    SURCHARGE_AMT: "",
    SURCHARGE_AMT_CURR: "",

    BUYER_NAME: "",
    OVER_SHORT: "",
    PAY_TERM: "",

    BILL_TO: "",
};

const S0430_STSIN_RECORD = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0430_STSIN_RECORDRef = useRef(null);
    if (!serviceS0430_STSIN_RECORDRef.current) serviceS0430_STSIN_RECORDRef.current = new ServiceS0430_STSIN_RECORD();
    const serviceS0430_STSIN_RECORD = serviceS0430_STSIN_RECORDRef.current;

    const toast = useRef(null);
    const cm = useRef(null);

    /* progress */
    const [isProgress, setIsProgress] = useState(false);
    const [msgPopup, setMsgPopup] = useState(false);
    const [msgPopup1, setMsgPopup1] = useState(false);
    const [msgPopup2, setMsgPopup2] = useState(false);

    const [urlIframe4, setUrlIframe4] = useState("");
    const [createDialog4, setCreateDialog4] = useState(false);
    const hideDialog4 = () => {
        setCreateDialog4(false);
    };

    // Excel Upload states
    const [excelUploadDialog, setExcelUploadDialog] = useState(false);
    const [excelPreviewData, setExcelPreviewData] = useState([]);
    const excelFileInputRef = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    // dialog
    const [opKind, setOpKind] = useState("");
    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    const process_RESET_QTY = () => {
        var tArray = [];
        datasTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tObj = { ...col };
            if (tObj.SHIP_QTY > 0) tObj.SHIP_QTY = 0;
            else tObj.SHIP_QTY = tObj.BAL_IN_QTY;
            tArray.push(tObj);
        });
        setDatasTBL_KSV_PO_MRP2(tArray);
    };

    // ----- Excel Template Download -----
    const downloadExcelTemplate = () => {
        Promise.all([import("exceljs"), import("file-saver")]).then(
            ([exceljsModule, fileSaverModule]) => {
                var ExcelJS = exceljsModule.default || exceljsModule;
                var wb = new ExcelJS.Workbook();
                var ws = wb.addWorksheet("data");

                ws.columns = [
                    { header: "ID(Don't edit)", key: "id", width: 6 },
                    { header: "PU#", key: "puCd", width: 8 },
                    { header: "PO#", key: "poCd", width: 10 },
                    { header: "Seq", key: "poSeq", width: 5 },
                    { header: "Matl#", key: "matlCd", width: 10 },
                    { header: "Description", key: "matlName", width: 18 },
                    { header: "Color", key: "color", width: 10 },
                    { header: "Spec", key: "spec", width: 12 },
                    { header: "Current PO Qty", key: "currPoQty", width: 12 },
                    { header: "New PO Qty", key: "newPoQty", width: 12 },
                    { header: "Current Ship Qty", key: "currShipQty", width: 12 },
                    { header: "New Ship Qty", key: "newShipQty", width: 12 },
                    { header: "Current Surcharge", key: "currSurcharge", width: 12 },
                    { header: "New Surcharge", key: "newSurcharge", width: 12 },
                    { header: "New Reason", key: "newReason", width: 20 },
                    { header: "New Conf Flag", key: "newConfFlag", width: 12 },
                ];

                datasTBL_KSV_PO_MRP2.forEach((row) => {
                    ws.addRow({
                        id: row.id,
                        puCd: row.PU_CD,
                        poCd: row.PO_CD,
                        poSeq: row.PO_SEQ,
                        matlCd: row.MATL_CD,
                        matlName: row.MATL_NAME,
                        color: row.COLOR,
                        spec: row.SPEC,
                        currPoQty: parseFloat(row.BAL_IN_QTY || 0),
                        newPoQty: parseFloat(row.BAL_IN_QTY || 0),
                        currShipQty: parseFloat(row.SHIP_QTY || 0),
                        newShipQty: parseFloat(row.SHIP_QTY || 0),
                        currSurcharge: parseFloat(row.SURCHARGE_AMT || 0),
                        newSurcharge: parseFloat(row.SURCHARGE_AMT || 0),
                        newReason: row.SURCHARGE_REMARK || "",
                        newConfFlag: row.CONF_FLAG,
                    });
                });

                // 1) Initialize all data cells to General style.
                for (var rowNo = 2; rowNo <= ws.rowCount; rowNo++) {
                    for (var colNo = 1; colNo <= 16; colNo++) {
                        var dataCell = ws.getRow(rowNo).getCell(colNo);
                        dataCell.numFmt = "General";
                    }
                }

                // 2) Force QTY columns (I-L) to Number without decimal places.
                for (var rowNo = 2; rowNo <= ws.rowCount; rowNo++) {
                    [9, 10, 11, 12].forEach((colIdx) => {
                        var cell = ws.getRow(rowNo).getCell(colIdx);
                        var numericValue = Number(cell.value || 0);
                        cell.value = Number.isNaN(numericValue) ? 0 : numericValue;
                        cell.numFmt = "0";
                    });
                }

                wb.xlsx.writeBuffer().then((buf) => {
                    var EXCEL_TYPE =
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                    var blob = new Blob([buf], { type: EXCEL_TYPE });
                    fileSaverModule.default.saveAs(
                        blob,
                        `STSIN_upload_format_${new Date().getTime()}.xlsx`,
                    );
                });
            },
        );
    };

    // ----- Excel Upload -----
    const handleExcelUploadClick = () => {
        excelFileInputRef.current.value = "";
        excelFileInputRef.current.click();
    };

    const normalizeConfFlag = (val) => {
        var s = String(val || "").trim().toUpperCase();
        if (s === "1" || s === "W" || s === "Y" || s === "TRUE" || s === "T") return "1";
        return "0";
    };

    const normalizeExcelNumberInput = (value, fallbackValue) => {
        var rawValue = value;
        if (rawValue == null || String(rawValue).trim() === "") {
            rawValue = fallbackValue;
        }

        var cleaned = String(rawValue ?? "")
            .trim()
            .replace(/,/g, "");

        if (cleaned === "") return "0";

        var parsed = Number(cleaned);
        if (Number.isNaN(parsed)) {
            return String(fallbackValue ?? "0");
        }

        return String(parsed);
    };

    const updateMainConfFlag = (rowData, checked) => {
        var nextVal = checked ? "1" : "0";
        setDatasTBL_KSV_PO_MRP2((prev) =>
            prev.map((row) =>
                String(row.id) === String(rowData.id)
                    ? { ...row, CONF_FLAG: nextVal }
                    : row,
            ),
        );
        setSelectedTBL_KSV_PO_MRP2((prev) =>
            prev.map((row) =>
                String(row.id) === String(rowData.id)
                    ? { ...row, CONF_FLAG: nextVal }
                    : row,
            ),
        );
    };

    const updateMoqConfFlag = (rowData, checked) => {
        var nextVal = checked ? "1" : "0";
        setDatasTBL_KSV_PO_MRP4((prev) =>
            prev.map((row) =>
                String(row.id) === String(rowData.id)
                    ? { ...row, CONF_FLAG: nextVal }
                    : row,
            ),
        );
    };

    const calcPreviewOverShort = (row, newBalInQty) => {
        var tNewBalInQty = parseFloat(newBalInQty || 0);
        // 신규 PO 수량이 0에 가까우면 초과 판정 안 함 (이미 충분한 수량 예정)
        if (tNewBalInQty < 0.01) return false;
        
        var tMrpQty = parseFloat(row.MRP_QTY || 0);
        var tStockQty = parseFloat(row.STOCK_QTY || 0);
        var tMoqQty = parseFloat(row.MOQ_QTY || 0);
        var tStsInQty = parseFloat(row.PART_IN_QTY || 0);
        var tOverShortLimit = parseFloat(dataEDT_KSV_PO_MRP.OVER_SHORT || 0);
        var tCheckQty = tMrpQty - tStockQty + tMoqQty;
        if (Math.abs(tCheckQty) < 0.01) return false;
        var tCheckQty1 = tNewBalInQty + tStsInQty - tCheckQty;
        var tCheckRate = (tCheckQty1 / tCheckQty) * 100.0;
        
        console.log(`[Over Short] MRP=${tMrpQty}, STOCK=${tStockQty}, MOQ=${tMoqQty}, StsIn=${tStsInQty}, newBalQty=${tNewBalInQty} → checkQty=${tCheckQty}, checkQty1=${tCheckQty1}, Rate=${tCheckRate.toFixed(2)}% vs Limit=${tOverShortLimit}%`);
        
        return tCheckRate > tOverShortLimit;
    };

    const handleExcelFileChange = (e) => {
        var file = e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = (evt) => {
            import("xlsx").then((xlsx) => {
                var data = evt.target.result;
                var wb = xlsx.read(data, { type: "array" });
                var ws = wb.Sheets[wb.SheetNames[0]];
                var rows = xlsx.utils.sheet_to_json(ws, {
                    header: 1,
                    raw: false,
                    defval: "",
                });
                if (rows.length < 2) {
                    alert("업로드한 파일에 데이터가 없습니다.<br><br>No data in the uploaded file.");
                    return;
                }
                var header = rows[0];
                var findHeaderIndex = (...labels) => {
                    var normalizedHeader = header.map((col) =>
                        String(col || "")
                            .trim()
                            .toLowerCase(),
                    );
                    for (var i = 0; i < labels.length; i++) {
                        var normalizedLabel = String(labels[i] || "")
                            .trim()
                            .toLowerCase();
                        var idx = normalizedHeader.indexOf(normalizedLabel);
                        if (idx >= 0) return idx;
                    }
                    return -1;
                };
                var idHeaderIdx = header.findIndex(
                    (col) =>
                        typeof col === "string" &&
                        (col.trim() === "ID" ||
                            col.trim() === "ID(편집금지)" ||
                            col.trim().startsWith("ID")),
                );
                var colIdx = {
                    ID: idHeaderIdx,
                    PO_CD: findHeaderIndex("PO#", "PO"),
                    PO_SEQ: findHeaderIndex("Seq", "PO Seq", "PO_SEQ"),
                    BAL_IN_QTY_NEW: findHeaderIndex("신규 PO Qty", "New PO Qty"),
                    SHIP_QTY_NEW: findHeaderIndex("신규 Ship Qty", "New Ship Qty"),
                    SURCHARGE_AMT_NEW: findHeaderIndex("신규 Surcharge", "New Surcharge"),
                    SURCHARGE_REMARK_NEW: findHeaderIndex("신규 Reason", "New Reason"),
                    CONF_FLAG_NEW: findHeaderIndex("신규 Conf Flag", "New Conf Flag"),
                };

                if (colIdx.ID < 0) {
                    alert("엑셀 양식의 ID 컬럼을 찾을 수 없습니다. 최신 양식을 다시 다운로드해 사용해 주세요.<br><br>Cannot find ID column in Excel format. Please download and use the latest format.");
                    return;
                }

                var previewRows = [];
                var usedIds = new Set();
                rows.slice(1).forEach((row) => {
                    var idVal = String(row[colIdx.ID] || "").trim();
                    if (!idVal) return;

                    if (usedIds.has(idVal)) {
                        return;
                    }

                    var matched = datasTBL_KSV_PO_MRP2.find(
                        (g) => String(g.id) === idVal,
                    );
                    if (!matched) return;

                    usedIds.add(idVal);

                    var newBalInQty = normalizeExcelNumberInput(
                        row[colIdx.BAL_IN_QTY_NEW],
                        matched.BAL_IN_QTY,
                    );
                    var newShipQty = normalizeExcelNumberInput(
                        row[colIdx.SHIP_QTY_NEW],
                        matched.SHIP_QTY,
                    );
                    var newSurchargeAmt = normalizeExcelNumberInput(
                        row[colIdx.SURCHARGE_AMT_NEW],
                        matched.SURCHARGE_AMT,
                    );
                    var newReason = row[colIdx.SURCHARGE_REMARK_NEW] != null ? String(row[colIdx.SURCHARGE_REMARK_NEW]) : (matched.SURCHARGE_REMARK || "");
                    var newConfFlag = normalizeConfFlag(matched.CONF_FLAG);
                    if (colIdx.CONF_FLAG_NEW >= 0) {
                        var confCell = row[colIdx.CONF_FLAG_NEW];
                        newConfFlag = String(confCell || "").trim() === ""
                            ? "0"
                            : normalizeConfFlag(confCell);
                    }
                    var isOver = calcPreviewOverShort(matched, newBalInQty);
                    var hasFoc = parseFloat(newShipQty || 0) > parseFloat(newBalInQty || 0);
                    previewRows.push({
                        ...matched,
                        _newBalInQty: newBalInQty,
                        _newShipQty: newShipQty,
                        _newSurchargeAmt: newSurchargeAmt,
                        _newReason: newReason,
                        _newConfFlag: newConfFlag,
                        _isOver: isOver,
                        _hasFoc: hasFoc,
                        _wStock: false,
                    });
                });
                if (previewRows.length === 0) {
                    alert("매칭된 데이터가 없습니다. PO# 와 Seq를 확인해 주세요.<br><br>No matching data. Please check PO# and Seq.");
                    return;
                }
                setExcelPreviewData(previewRows);
                setExcelUploadDialog(true);
            });
        };
        reader.readAsArrayBuffer(file);
    };

    const updatePreviewRow = (idx, field, value) => {
        setExcelPreviewData((prev) => {
            var next = [...prev];
            var row = { ...next[idx], [field]: value };
            if (field === "_newBalInQty" || field === "_newShipQty") {
                var newBalInQty = field === "_newBalInQty" ? value : row._newBalInQty;
                var newShipQty = field === "_newShipQty" ? value : row._newShipQty;
                row._isOver = calcPreviewOverShort(row, newBalInQty);
                row._hasFoc = parseFloat(newShipQty || 0) > parseFloat(newBalInQty || 0);
            }
            next[idx] = row;
            return next;
        });
    };

    const getPreviewRowCellStyle = (rowData, isEditable, textAlign, contentPadding = "0 2px") => ({
        backgroundColor: rowData._isOver
            ? (isEditable ? "#ffe8a0" : "#fff3cd")
            : (isEditable ? "#d4edda" : "white"),
        width: "100%",
        height: "100%",
        padding: contentPadding,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent:
            textAlign === "right"
                ? "flex-end"
                : textAlign === "center"
                    ? "center"
                    : "flex-start",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        lineHeight: "1",
    });

    const previewColumnBodyStyle = { padding: "0" };

    const getPreviewNextInputId = (idx, fieldName) => {
        if (fieldName === "newConfFlag") return `excel_checkbox_${idx}`;
        return `excel_input_${idx}_${fieldName}`;
    };

    const handlePreviewCellEnter = (e, rowData, fieldName) => {
        if (e.key !== "Enter") return;
        e.preventDefault();

        var currIdx = excelPreviewData.findIndex(
            (row) => String(row.id) === String(rowData.id),
        );
        var nextIdx = currIdx + 1;
        if (currIdx < 0 || nextIdx >= excelPreviewData.length) return;

        var nextId = getPreviewNextInputId(nextIdx, fieldName);
        var nextEl = document.getElementById(nextId);
        if (!nextEl) return;
        nextEl.focus();
        if (typeof nextEl.select === "function") nextEl.select();
    };

    const bodyPreviewText = (field, textAlign, ellipsis) => (rowData) => (
        <div
            style={{
                ...getPreviewRowCellStyle(rowData, false, textAlign),
                ...(ellipsis
                    ? { overflow: "hidden", textOverflow: "ellipsis" }
                    : {}),
            }}
        >
            {rowData[field]}
        </div>
    );

    const bodyPreviewNumber = (field) => (rowData) => (
        <div style={getPreviewRowCellStyle(rowData, false, "right")}>
            {serviceLib.numWithCommas(rowData[field], 2)}
        </div>
    );

    const bodyPreviewInput = (field, domField, isNumber) => (rowData) => {
        var idx = excelPreviewData.findIndex(
            (row) => String(row.id) === String(rowData.id),
        );
        return (
            <div style={getPreviewRowCellStyle(rowData, true, isNumber ? "right" : "left", "0") }>
                <input
                    id={`excel_input_${idx}_${domField}`}
                    style={{
                        width: "100%",
                        padding: "0 2px",
                        margin: "0",
                        lineHeight: "1",
                        border: "none",
                        background: "transparent",
                        textAlign: isNumber ? "right" : "left",
                        boxSizing: "border-box",
                        fontSize: "1rem",
                    }}
                    type="text"
                    value={rowData[field] || ""}
                    onChange={(e) => updatePreviewRow(idx, field, e.target.value)}
                    onFocus={(e) => e.target.select()}
                    onKeyDown={(e) => handlePreviewCellEnter(e, rowData, domField)}
                />
            </div>
        );
    };

    const bodyPreviewConfFlag = (rowData) => {
        var idx = excelPreviewData.findIndex(
            (row) => String(row.id) === String(rowData.id),
        );
        return (
            <div style={getPreviewRowCellStyle(rowData, true, "center", "0")}>
                <Checkbox
                    inputId={`excel_checkbox_${idx}`}
                    checked={normalizeConfFlag(rowData._newConfFlag) === "1"}
                    onChange={(e) => updatePreviewRow(idx, "_newConfFlag", e.checked ? "1" : "0")}
                    onKeyDown={(e) => handlePreviewCellEnter(e, rowData, "newConfFlag")}
                />
            </div>
        );
    };

    const bodyPreviewOver = (rowData) => (
        <div
            style={{
                ...getPreviewRowCellStyle(rowData, false, "center"),
                color: rowData._isOver ? "#e06000" : "inherit",
                fontWeight: rowData._isOver ? "bold" : "normal",
            }}
        >
            {rowData._isOver ? "⚠ OVER" : "-"}
        </div>
    );

    const submitExcelUpload = () => {
        var updatedGrid = datasTBL_KSV_PO_MRP2.map((gridRow) => {
            var previewRow = excelPreviewData.find(
                (p) => String(p.id) === String(gridRow.id)
            );
            if (!previewRow) return gridRow;

            // BAL_IN_QTY 변경부터 순서대로 calcRowByField 적용
            var updated = { ...gridRow };
            var nextBalInQty = normalizeExcelNumberInput(
                previewRow._newBalInQty,
                gridRow.BAL_IN_QTY,
            );
            var nextShipQty = normalizeExcelNumberInput(
                previewRow._newShipQty,
                gridRow.SHIP_QTY,
            );
            var nextSurchargeAmt = normalizeExcelNumberInput(
                previewRow._newSurchargeAmt,
                gridRow.SURCHARGE_AMT,
            );

            // 1. BAL_IN_QTY 적용 (MOQ, OVER_SHORT, FOC, SHIP_QTY, SHIP_AMT 자동계산)
            if (nextBalInQty !== String(gridRow.BAL_IN_QTY)) {
                updated = calcRowByField(updated, "BAL_IN_QTY", nextBalInQty);
            } else {
                updated.BAL_IN_QTY = nextBalInQty;
            }

            // 2. SHIP_QTY 적용
            if (nextShipQty !== String(gridRow.SHIP_QTY)) {
                updated = calcRowByField(updated, "SHIP_QTY", nextShipQty);
            } else {
                updated.SHIP_QTY = nextShipQty;
            }

            // 3. SURCHARGE_AMT 적용 (PO_PRICE, SHIP_AMT 자동계산)
            if (nextSurchargeAmt !== String(gridRow.SURCHARGE_AMT)) {
                updated = calcRowByField(updated, "SURCHARGE_AMT", nextSurchargeAmt);
            } else {
                updated.SURCHARGE_AMT = nextSurchargeAmt;
            }

            // 4. 나머지 필드
            updated.SURCHARGE_REMARK = previewRow._newReason;
            updated.CONF_FLAG = normalizeConfFlag(previewRow._newConfFlag);
            updated.EXCEL_W_STOCK = previewRow._wStock ? "Y" : "N";

            return updated;
        });
        setDatasTBL_KSV_PO_MRP2(updatedGrid);
        var selectedRows = updatedGrid.filter((gridRow) =>
            excelPreviewData.some((p) => String(p.id) === String(gridRow.id))
        );
        setSelectedTBL_KSV_PO_MRP2(selectedRows);
        onRowClick1TBL_KSV_PO_MRP2(selectedRows);
        setExcelUploadDialog(false);
        setExcelPreviewData([]);
    };

    const popup_MATL_MST = (e) => {
        var tObj = {};
        if (typeof e.MATL_CD !== "undefined") {
            tObj = { ...e };
        } else {
            if (selectedTBL_KSV_PO_MRP2.length <= 0) return;
            tObj = { ...selectedTBL_KSV_PO_MRP2[0] };
        }

        var tUrl = `${window.location.origin}/#/`;
        tUrl += "S0301_MATL_RECORD?MATL_CD=" + tObj.MATL_CD;

        var tUrl2 = "S0301_MATL_RECORD?MATL_CD=" + tObj.MATL_CD;

        var tValObj = {
            key: "2-1",
            label: "Matl Record",
            icon: "pi pi-fw pi-user-edit",
            url1: "S0301_MATL_RECORD",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    // Search

    // Search KSV_STOCK_MEM
    const search_CODE = (argData) => {
        serviceS0430_STSIN_RECORD.mgrQuery_CODE().then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasEDT_KSV_PO_MRP_PAY_TYPE(data.PAY_TYPE);

                var tObj = { ...data.PAY_TYPE[0] };
                data.PAY_TYPE.forEach((col, i) => {
                    if (
                        col.CD_CODE === argData.PAY_CONDITION ||
                        col.CD_NAME === argData.PAY_CONDITION
                    )
                        tObj = { ...col };
                });
                setDataEDT_KSV_PO_MRP_PAY_TYPE(tObj);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_1 = (argPuCd) => {
        var tObj0 = window.sessionStorage.getItem("S0401_STSIN_INFO");
        var tObjs = JSON.parse(tObj0);

        var tInObjs = [];
        tObjs.forEach((col, i) => {
            var tObj = {};
            tObj.PU_CD = col.PU_CD;
            tInObjs.push(tObj);
        });

        setLoadingTBL_KSV_PO_MRP(true);

        // 3_1
        serviceS0430_STSIN_RECORD.mgrQuery_LIST_1(tInObjs).then((data) => {
            setLoadingTBL_KSV_PO_MRP(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.MESSAGE === "") {
                    var tArray = data.DATAS.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });

                    if (tArray.length > 0) {
                        setDataTBL_KSV_PO_MRP(tArray[0]);
                        setDatasTBL_KSV_PO_MRP(tArray);
                        datasetEDT_KSV_PO_MRP(tArray[0]);
                        search_CODE(tArray[0]);
                    }
                } else {
                    alert(data.MESSAGE);
                }
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2 = (argPuCd) => {
        var tObj0 = window.sessionStorage.getItem("S0401_STSIN_INFO");
        var tObjs = JSON.parse(tObj0);

        var tInObjs = [];
        tObjs.forEach((col, i) => {
            var tObj = {};
            tObj.PU_CD = col.PU_CD;
            tInObjs.push(tObj);
        });

        setLoadingTBL_KSV_PO_MRP2(true);

        // 4_2
        serviceS0430_STSIN_RECORD.mgrQuery_LIST_2(tInObjs).then((data) => {
            setLoadingTBL_KSV_PO_MRP2(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tObj.SHIP_AMT = String(
                        parseFloat(tObj.PO_PRICE) * parseFloat(tObj.SHIP_QTY),
                    );
                    return tObj;
                });

                setDatasTBL_KSV_PO_MRP2(tArray);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const process_ALL_SELECT = () => {
        if (selectedTBL_KSV_PO_MRP2.length === datasTBL_KSV_PO_MRP2.length) {
            setSelectedTBL_KSV_PO_MRP2([]);
        } else {
            setSelectedTBL_KSV_PO_MRP2(datasTBL_KSV_PO_MRP2);
        }
    };

    const process_MOQ_CONFIRM = () => {
        setCreateDialog4(false);

        var tArray = [];
        var tSelArray = [];
        var tChk = 0;
        datasTBL_KSV_PO_MRP4.forEach((col1, i1) => {
            if (!col1.MOQ_REASON) tChk = 1;
        });

        if (tChk === 1) {
            alert(`[MOQ Reason] must be selected. Select [MOQ Reason]`);
            return;
        }

        datasTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tObj = { ...col };
            datasTBL_KSV_PO_MRP4.forEach((col1, i1) => {
                if (tObj.MATL_CD === col1.MATL_CD)
                    tObj.MOQ_REASON = col1.MOQ_REASON;
            });
            selectedTBL_KSV_PO_MRP2.forEach((col1, i1) => {
                if (tObj.MATL_CD === col1.MATL_CD) tSelArray.push(tObj);
            });
            tArray.push(tObj);
        });

        setDatasTBL_KSV_PO_MRP2(tArray);
        setSelectedTBL_KSV_PO_MRP2(tSelArray);

        if (tChk === 0) process_INSERT_STS_FULLIN_sub2(opKind);
    };

    const process_MOQ_CANCEL = () => {
        setCreateDialog4(false);
    };

    const process_INSERT_STS_FULLIN = async () => {
        var tRetCheck = await confirm(
            `If you perform a STS-IN End, the purchase will be completed. You will no longer be able to perform Sts-In, Sts-Out, or Stock Cancel on the item in the future. Would you like to perform a STS-IN End ? (For a general Sts-In, use STS IN.)`,
        );
        if (tRetCheck);
        else return;

        setOpKind("FULL_IN");

        var tArray = [];
        selectedTBL_KSV_PO_MRP2.forEach((col, i) => {
            if (parseFloat(col.MOQ_QTY) > 0) {
                var tObj = { ...col };
                tObj.MOQ_REASON = "Moq";
                var tChk = 0;
                tArray.forEach((col2, i2) => {
                   if (col2.MATL_CD === tObj.MATL_CD) tChk = 1;
                });
                if (tChk <= 0) tArray.push(tObj);
            }
        });
        if (tArray.length > 0) {
            setDatasTBL_KSV_PO_MRP4(tArray);
            setCreateDialog4(true);
        } else {
            process_INSERT_STS_FULLIN_sub2("FULL_IN");
        }
    };

    const process_INSERT_STS_PARTIN = (argSelectedRows) => {
        setOpKind("PART_IN");

        var targetSelectedRows = Array.isArray(argSelectedRows)
            ? argSelectedRows
            : selectedTBL_KSV_PO_MRP2;

        setSelectedTBL_KSV_PO_MRP2(targetSelectedRows);

        var tCheckDouble = 0;
        var tArray = [];
        targetSelectedRows.forEach((col, i) => {
            if (parseFloat(col.MOQ_QTY) > 0) {
                var tObj = { ...col };
                tObj.MOQ_REASON = "Moq";
                var tChk = 0;
                tArray.forEach((col2, i2) => {
                    if (col2.MATL_CD === tObj.MATL_CD) tChk = 1;
                });
                if (tChk <= 0) tArray.push(tObj);
            }

            var tMrpQty = parseFloat(col.MRP_QTY);
            var tStsInQty = parseFloat(col.PART_IN_QTY) + parseFloat(col.SHIP_QTY);
            if (tStsInQty >= (tMrpQty * 1.9)) {
                tCheckDouble = 1;
            } 
        });
        /* // 임시로 막음. 5/6.  로직 보강
        if (tCheckDouble > 0) {
            alert (`We intend to "STS IN" a quantity more than double the "MRP Qty." Please double-check the "Ship Qty" and "Po Qty."`); 
            return;
        }
        */

        if (tArray.length > 0) {
            setDatasTBL_KSV_PO_MRP4(tArray);
            setCreateDialog4(true);
        } else {
            process_INSERT_STS_FULLIN_sub2("PART_IN", targetSelectedRows);
        }
    };

    const process_INSERT_STS_FULLIN_sub2 = (argKind, argSelectedRows) => {
        var tInEdit = { ...dataEDT_KSV_PO_MRP };
        var tInPuMst0 = { ...dataTBL_KSV_PO_MRP };
        var tInStockMem = [];
        var targetSelectedRows = Array.isArray(argSelectedRows)
            ? argSelectedRows
            : selectedTBL_KSV_PO_MRP2;

        targetSelectedRows = targetSelectedRows.map((row) => {
            var tLatestRow = datasTBL_KSV_PO_MRP2.find(
                (srcRow) => String(srcRow.id) === String(row.id),
            );
            return typeof tLatestRow === "undefined" ? row : tLatestRow;
        });

        if (tInEdit.PAY_TYPE === "") {
            tInEdit.PAY_TYPE = dataEDT_KSV_PO_MRP_PAY_TYPE.CD_CODE;
        }

        if (tInEdit.PU_CD === "") {
            alert("PU_CD는 필수 입력입니다<br><br>PU_CD is required input");
            return;
        }

        if (tInEdit.PAY_TYPE === "") {
            alert("PAY Type을 입력한후 진행하십시요<br><br>Please enter the PAY Type and proceed.");

            return;
        }
        tInEdit.IN_TYPE = argKind;

        var tInPuMst = [];
        if (typeof tInPuMst0.__typename !== "undefined")
            delete tInPuMst0.__typename;
        if (typeof tInPuMst0.id !== "undefined") delete tInPuMst0.id;
        tInPuMst.push(tInPuMst0);

        var tOverShort_Flag = 0;
        var tCheckFlag = 0;
        var tCheckFlag1 = 0;
        var tCheckFlag2 = 0;
        targetSelectedRows.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (
                parseFloat(tObj.OVERSHORT_RATE) > parseFloat(tInEdit.OVER_SHORT)
            ) {
                tOverShort_Flag = 1;
                console.log(tCheckFlag);
            }
            if (parseFloat(tObj.MASTER_PRICE) <= 0) {
                if (dataTBL_KSV_PO_MRP.VENDOR_TYPE === "4");
                else tCheckFlag = 1;
            }
            if (tObj.CONF_FLAG !== "W" && tObj.CONF_FLAG !== "1")
                tCheckFlag1 = 1;
            if (parseFloat(tObj.SHIP_QTY) < parseFloat(tObj.PO_QTY))
                tCheckFlag2 = 1;
            tInStockMem.push(tObj);
        });

        if (tOverShort_Flag === 1) {
            setMsgPopup(true);
        } else if (tCheckFlag === 1) {
            setMsgPopup1(true);
            return;
        } else if (tCheckFlag1 === 1) {
            /* 260108. material price conf방법이 결정될때까지 체크를 보류함. Won */

            process_INSERT_STS_FULLIN_SUB(argKind, targetSelectedRows);
        } else if (tCheckFlag2 === 1) {
            process_INSERT_STS_FULLIN_SUB(argKind, targetSelectedRows);
        } else {
            process_INSERT_STS_FULLIN_SUB(argKind, targetSelectedRows);
        }
    };

    const onFooterYes = () => {
        setMsgPopup(false);
        process_INSERT_STS_FULLIN_SUB(opKind);
    };

    const onFooterYes2 = () => {
        setMsgPopup2(false);
        process_INSERT_STS_FULLIN_SUB(opKind);
    };

    const process_INSERT_STS_FULLIN_SUB = (argInType, argSelectedRows) => {
        var tInEdit = { ...dataEDT_KSV_PO_MRP };
        var tInPuMst0 = { ...dataTBL_KSV_PO_MRP };
        var tInStockMem = [];
        var targetSelectedRows = Array.isArray(argSelectedRows)
            ? argSelectedRows
            : selectedTBL_KSV_PO_MRP2;

        targetSelectedRows = targetSelectedRows.map((row) => {
            var tLatestRow = datasTBL_KSV_PO_MRP2.find(
                (srcRow) => String(srcRow.id) === String(row.id),
            );
            return typeof tLatestRow === "undefined" ? row : tLatestRow;
        });

        tInEdit.IN_TYPE = argInType;

        if (tInEdit.PAY_TYPE === "") {
            tInEdit.PAY_TYPE = dataEDT_KSV_PO_MRP_PAY_TYPE.CD_CODE;
        }

        if (tInEdit.PAY_TYPE === "") {
            toast.current.show({
                severity: "success",
                summary: "Input Error",
                detail: "PAY_TYPE require!!",
                life: 3000,
            });
            return;
        }

        var tInPuMst = [];
        datasTBL_KSV_PO_MRP.forEach((col, i) => {
            var tOne = { ...col };
            if (typeof tOne.__typename !== "undefined") delete tOne.__typename;
            if (typeof tOne.id !== "undefined") delete tOne.id;
            tInPuMst.push(tOne);
        });

        var tCheckFlag = 0;
        targetSelectedRows.forEach((col, i) => {
            // if (parseFloat(tObj.OVERSHOT_RATE) > parseFloat(tInEdit)) tCheckFlag = 1;
            var tObj = { ...col };
            delete tObj.DATAS;
            delete tObj.id;
            delete tObj.__typename;
            delete tObj.EXCEL_W_STOCK;
            tObj.CONF_FLAG = normalizeConfFlag(tObj.CONF_FLAG);
            if (argInType === "FULL_IN") {
                tInStockMem.push(tObj);
            } else {
                if (parseFloat(tObj.SHIP_QTY) > 0) tInStockMem.push(tObj);
            }
        });

        if (tInStockMem.length <= 0) {
            alert(`작업할 데이터를 선택하세요:${argInType}<br><br>Please select data to process:${argInType}`);
            return;
        }

        var tCheckNaN = 0;
        tInStockMem.forEach((col, i) => {
            if (isNaN(col.PO_QTY)) tCheckNaN = 1;
            if (isNaN(col.SHIP_QTY)) tCheckNaN = 1;
        });
        if (tCheckNaN > 0) {
            alert("Check NaN. Contact IT Team");
            return;
        }

        setIsProgress(true);
        serviceS0430_STSIN_RECORD
            .mgrInsert_STS_FULLIN(tInEdit, tInPuMst, tInStockMem)
            .then((data) => {
                setIsProgress(false);
                if (typeof data.graphQLErrors === "undefined") {
                    // console.log("mgrInsert_STOCK_IN call => " + data.length);

                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            setSelectedTBL_KSV_PO_MRP2([]);
                            setDatasTBL_KSV_PO_MRP2([]);

                            var tObj0 = { ...dataTBL_KSV_PO_MRP };
                            var tInput0 = {};
                            tInput0.PU_CD = tObj0.PU_CD;

                            search_LIST_1(tInput0.PU_CD);
                            search_LIST_2(tInput0.PU_CD);
                        }
                    }
                } else {
                    // console.log("mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors));
                    toast.current.show({
                        severity: "success",
                        summary: "Fail:Stock_in",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP] =
        useState(emptyQRY_KSV_PO_MRP);

    const [datasQRY_KSV_PO_MRP_PU_STATUS, setDatasQRY_KSV_PO_MRP_PU_STATUS] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_PU_STATUS, setDataQRY_KSV_PO_MRP_PU_STATUS] =
        useState({});

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP2, setDataQRY_KSV_PO_MRP2] =
        useState(emptyQRY_KSV_PO_MRP2);

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

    // DEFINE DATAGRID : TBL_KSV_PO_MRP4
    const [loadingTBL_KSV_PO_MRP4, setLoadingTBL_KSV_PO_MRP4] = useState(false);

    const [datasMOQ_REASON, setDatasMOQ_REASON] = useState([]);
    const [datasTBL_KSV_PO_MRP4, setDatasTBL_KSV_PO_MRP4] = useState([]);
    const dt_TBL_KSV_PO_MRP4 = useRef(null);
    const [dataTBL_KSV_PO_MRP4, setDataTBL_KSV_PO_MRP4] =
        useState(emptyTBL_KSV_PO_MRP4);
    const [selectedTBL_KSV_PO_MRP4, setSelectedTBL_KSV_PO_MRP4] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP4, setFlagSelectModeTBL_KSV_PO_MRP4] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP4

    const onRowClick1TBL_KSV_PO_MRP4 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP4 = argData;

        setDataTBL_KSV_PO_MRP4(argTBL_KSV_PO_MRP4);
    };

    const onRowClickTBL_KSV_PO_MRP4 = (event) => {
        let argTBL_KSV_PO_MRP4 = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP4) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP4
    };

    const dropboxEditor1 = (options) => {
        return (
            <Dropdown
                appendTo={document.body}
                style={{ width: "9rem" }}
                value={options.value}
                onChange={(e) => {
                    // 1) PrimeReact 편집 커밋용
                    options.editorCallback(e.value);
                    // 2) 우리 테이블 상태 즉시 반영
                    upsertCell(options.rowData, options.field, e.value);
                }}
                onBlur={() => options.editorCallback(options.value)}
                onHide={() => options.editorCallback(options.value)}
                options={datasMOQ_REASON}
                optionLabel="CD_NAME"
                optionValue="CD_NAME"
                placeholder="Select"
            />
        );
    };

    const cellEditorTBL_KSV_PO_MRP4 = (options) => {
        if (options.field === "MOQ_REASON") return dropboxEditor1(options);
        else return textEditor1(options);
    };

    const upsertCell = (rowData, field, nextVal) => {
        setDatasTBL_KSV_PO_MRP4((prev) => {
            const idx = prev.findIndex((r) =>
                r?.id != null && rowData?.id != null
                    ? r.id === rowData.id
                    : r === rowData,
            );
            if (idx === -1) return prev;
            const next = [...prev];
            next[idx] = { ...next[idx], [field]: nextVal };
            return next;
        });
    };

    const onCellEditCompleteTBL_KSV_PO_MRP4 = () => {};

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

    const [sumPoQty, setSumPoQty] = useState(0);
    const onRowClick1TBL_KSV_PO_MRP2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP2 = argData;

        setDataTBL_KSV_PO_MRP2(argTBL_KSV_PO_MRP2);

        var tStsInAmt = 0;
        var tMoqAmt = 0;
        var tSurchargeAmt = 0;
        let sumPoQty = 0;
        argData0.forEach((col, i) => {
            tStsInAmt += parseFloat(col.PO_QTY) * parseFloat(col.PO_PRICE);
            tMoqAmt += parseFloat(col.MOQ_QTY) * parseFloat(col.PO_PRICE);
            tSurchargeAmt += parseFloat(col.SURCHARGE_AMT);
            sumPoQty += parseFloat(col.BAL_IN_QTY);
        });

        setDataEDT_KSV_PO_MRP((prev) => ({...prev, STS_IN_AMT: String(serviceLib.numToFixed(tStsInAmt, 2)), MOQ_AMT: String(serviceLib.numToFixed(tMoqAmt, 2)), SURCHARGE_AMT: String(serviceLib.numToFixed(tSurchargeAmt, 2))}));
        setSumPoQty(sumPoQty);
    };

    const onRowDoubleClickTBL_KSV_PO_MRP2 = (argData0) => {
        var tRemark = "";
        var tColName = "";
        var tKeys = Object.keys(argData0.data);
        tKeys.forEach((col, i) => {
            var tValue = argData0.data[`${col}`];
            if (tValue === argData0.originalEvent.target.innerText) {
                tColName = col;
            }
        });
        if (tColName === "MATL_CD") {
            var tObj = {};
            tObj.MATL_CD = argData0.originalEvent.target.innerText;
            popup_MATL_MST(tObj);
        }
    };

    // 순수 계산 함수: BAL_IN_QTY 또는 SHIP_QTY, SURCHARGE_AMT 변경 시 파생 값 계산
    const calcRowByField = (rowData, field, newValue) => {
        var row = { ...rowData };
        var tOverShortRate = parseFloat(dataEDT_KSV_PO_MRP.OVER_SHORT || 0) * 0.01;
        var tMrpQty = parseFloat(row.MRP_QTY || 0);
        var tStockQty = parseFloat(row.STOCK_QTY || 0);
        var tMoqQty = parseFloat(row.MOQ_QTY || 0);
        var tSaveMoqQty = parseFloat(row.SAVE_MOQ_QTY || 0);
        var tStsInQty = parseFloat(row.PART_IN_QTY || 0);
        var tBalInQty = parseFloat(row.BAL_IN_QTY || 0);
        var tSaveBalInQty = parseFloat(row.SAVE_BAL_IN_QTY || 0);
        var tMasterPrice = parseFloat(row.MASTER_PRICE || 0);
        var tSurAmt = parseFloat(row.SURCHARGE_AMT || 0);
        var tPoPrice = parseFloat(row.PO_PRICE || 0);

        if (field === "SURCHARGE_REMARK") {
            row[field] = newValue;
            return row;
        }

        if (field === "BAL_IN_QTY") {
            var tNewBalInQty = parseFloat(newValue || 0);
            var tDiffPoQty = tNewBalInQty - tSaveBalInQty;
            var tNewFocQty = 0;
            var tNewShipQty = tNewBalInQty;
            var tNewOverShortQty = 0;
            var tNewMoqQty = tSaveMoqQty;

            if (tDiffPoQty > 0) {
                tNewOverShortQty = tDiffPoQty;
                tNewFocQty = 0;
                tNewShipQty = tNewBalInQty;
            } else if (tDiffPoQty < 0) {
                var tWorkQty = -1 * tDiffPoQty;
                if (tWorkQty < tSaveMoqQty) {
                    tNewMoqQty = tSaveMoqQty - tWorkQty;
                    tNewOverShortQty = 0;
                } else {
                    tNewMoqQty = 0;
                    tNewOverShortQty = (tWorkQty - tMoqQty) * -1;
                }
                tNewFocQty = 0;
                tNewShipQty = tNewBalInQty;
            } else {
                tNewFocQty = 0;
                tNewShipQty = tNewBalInQty;
                tNewOverShortQty = 0;
                tNewMoqQty = tSaveMoqQty;
            }

            if (parseFloat(tNewBalInQty) === 0 && parseFloat(tNewOverShortQty) <= 0)
                tNewOverShortQty = 0;

            row.MOQ_QTY = String(tNewMoqQty);
            row.OVER_SHORT_QTY = String(tNewOverShortQty);
            row.BAL_IN_QTY = String(tNewBalInQty);
            row.FOC_QTY = String(tNewFocQty);

            var tShipAmt = tNewShipQty * tPoPrice;
            row.SHIP_QTY = String(tNewShipQty);
            row.SHIP_AMT = String(tShipAmt);
            row.OVER_SHORT_RATE = serviceLib.numToFixed(0, 2);

            if (tSurAmt > 0 && tNewBalInQty > 0) {
                var tCalcSurPrice = tSurAmt / tNewBalInQty;
                row.DIFF_PRICE = String(tCalcSurPrice);
                row.PO_PRICE = String(tMasterPrice + tCalcSurPrice);
            }
        }

        if (field === "SHIP_QTY") {
            var tNewShipQty = parseFloat(newValue || 0);
            if (tNewShipQty >= tBalInQty) {
                row.FOC_QTY = String(tNewShipQty - tBalInQty);
            } else {
                row.FOC_QTY = "0";
                row.BAL_IN_QTY = String(tNewShipQty);
                row.OVER_SHORT_QTY = String(tNewShipQty - tSaveBalInQty);
            }
            row.SHIP_QTY = String(tNewShipQty);
            row.SHIP_AMT = String(tNewShipQty * tPoPrice);
        }

        if (field === "SURCHARGE_AMT") {
            var tPoQty = parseFloat(row.BAL_IN_QTY || 0);
            if (tPoQty > 0) {
                var tInSurAmt = parseFloat(newValue || 0);
                var tCalcSurPrice = parseFloat(serviceLib.numToFixed(tInSurAmt / tPoQty, 4));
                var tNewPoPrice = tMasterPrice + tCalcSurPrice;
                row.SURCHARGE_AMT = String(tInSurAmt);
                row.SURCHARGE_PRICE = String(tCalcSurPrice);
                row.PO_PRICE = String(tNewPoPrice);
                row.SHIP_AMT = String(tNewPoPrice * tPoQty);
            }
        }

        return row;
    };

    const onCellEditCompleteKSV_PO_MRP2 = async (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        var tOverShortRate = parseFloat(dataEDT_KSV_PO_MRP.OVER_SHORT) * 0.01;

        var tSaveRowData = { ...rowData };

        if (field === "BAL_IN_QTY") {
            if (parseFloat(newValue) < 0) return;
        }

        if (rowData.PO_QTY <= 0) return;

        // PO_QTY : 사양할 총 수량
        // BAL_IN_QTY:  이번에 사야할 수량
        // SHIP_QTY ; 이번에 Ship할 수량

        if (field === "BAL_IN_QTY") {
            let nextSumPoQty = 0;

            selectedTBL_KSV_PO_MRP2.forEach((col) => {
                const isEditedRow = col.id === rowData.id; // 예시 키

                const val = isEditedRow
                    ? parseFloat(newValue || 0)
                    : parseFloat(col.BAL_IN_QTY || 0);

                if (!isNaN(val)) nextSumPoQty += val;
            });

            setSumPoQty(nextSumPoQty);
        }

        var tMrpQty = parseFloat(rowData.MRP_QTY);
        var tStockQty = parseFloat(rowData.STOCK_QTY);
        var tOrgPoQty = tMrpQty - tStockQty; // org po qty
        var tMoqQty = parseFloat(rowData.MOQ_QTY);
        var tSaveMoqQty = parseFloat(rowData.SAVE_MOQ_QTY);
        var tStsInQty = parseFloat(rowData.PART_IN_QTY);

        var tOverShortQty = parseFloat(rowData.OVER_SHORT_QTY);
        var tFocQty = parseFloat(rowData.FOC_QTY);
        var tShipQty = parseFloat(rowData.SHIP_QTY);
        var tPoQty = parseFloat(rowData.PO_QTY);
        var tSavePoQty = parseFloat(rowData.SAVE_PO_QTY);
        var tBalInQty = parseFloat(rowData.BAL_IN_QTY);
        var tSaveBalInQty = parseFloat(rowData.SAVE_BAL_IN_QTY);

        var tMasterPrice = parseFloat(rowData.MASTER_PRICE);
        var tSurPrice = parseFloat(rowData.SURCHARGE_PRICE);
        var tPoPrice = parseFloat(rowData.PO_PRICE);
        var tDiffPrice = parseFloat(rowData.DIFF_PRICE);
        var tSurAmt = parseFloat(rowData.SURCHARGE_AMT);

        var tOldBalAmt = parseFloat(rowData.SHIP_AMT);
        var tOldMoqAmt = tMoqQty * tPoPrice;
        var tOldSurchargeAmt = tSurAmt;

        var tCurrPoQty = tPoQty - tStsInQty;

        if (field === "SURCHARGE_AMT") {
            tPoQty = parseFloat(rowData.BAL_IN_QTY);
            if (tPoQty === 0) return;
        }

        if (field === "SURCHARGE_REMARK") {
            rowData[field] = newValue;
        } else {
            rowData[field] = String(
                serviceLib.getFloat(parseFloat(newValue), 2),
            );
        }

        if (field === "SHIP_QTY") {
            var tNewShipQty = parseFloat(newValue);

            var tNewFocQty = 0;
            var tNewBalInQty = 0;
            var tNewOverShortQty = 0;
            if (tNewShipQty >= tBalInQty) {
                tNewFocQty = tNewShipQty - tBalInQty;
                rowData.FOC_QTY = String(tNewFocQty);

                var tShipAmt = parseFloat(tNewShipQty) * tPoPrice;
                rowData.SHIP_QTY = String(tNewShipQty);
                rowData.SHIP_AMT = String(tShipAmt);
                setDataTBL_KSV_PO_MRP2(rowData);
            } else {
                tNewFocQty = 0;
                tNewBalInQty = tNewShipQty;
                tNewOverShortQty = tNewBalInQty - tSaveBalInQty;

                rowData.FOC_QTY = String(tNewFocQty);
                rowData.BAL_IN_QTY = String(tNewBalInQty);
                rowData.OVER_SHORT_QTY = String(tNewOverShortQty);

                var tShipAmt = parseFloat(tNewShipQty) * tPoPrice;
                rowData.SHIP_QTY = String(tNewShipQty);
                rowData.SHIP_AMT = String(tShipAmt);
                setDataTBL_KSV_PO_MRP2(rowData);
            }
        }

        if (field === "BAL_IN_QTY") {
            var tCheckQty = tMrpQty - tStockQty + tMoqQty;
            var tCheckQty1 =
                parseFloat(newValue) + parseFloat(tStsInQty) - tCheckQty;
            var tCheckRate = 0;
            var tNewBalInQty = parseFloat(newValue || 0);
            // 신규 PO 수량이 0에 가까우면 초과 판정 안 함
            if (tNewBalInQty < 0.01 || Math.abs(tCheckQty) < 0.01) {
                tCheckRate = 0;
            } else {
                tCheckRate = (tCheckQty1 / tCheckQty) * 100.0;
            }
            
            var tIsOver = 0;
            if (tCheckRate > parseFloat(dataEDT_KSV_PO_MRP.OVER_SHORT)) {
                if (
                    await confirm(
                        `Over Short Rate Exceed.(${tCheckRate.toFixed(2)}%). Do you over in all exceed qty?`,
                    )
                ) {
                    tIsOver = 1;
                }
            }
            
            var compPoQty = 0;

            var tNewBalInQty = parseFloat(newValue);
            var tDiffPoQty = tNewBalInQty - tSaveBalInQty;
            var tNewOverShortQty = 0;
            var tNewMoqQty = tSaveMoqQty;

            if (tDiffPoQty > 0) {
                var tBaseQty = (tNewBalInQty + tStsInQty) * tOverShortRate;
                tBaseQty = serviceLib.numToFixed(parseFloat(tBaseQty, 2));
                //if (tIsOver === 1) tBaseQty = tDiffPoQty + 1;
                //초과수량 전체다 OverIn으로 잡음 : 20260421
                tNewOverShortQty = tDiffPoQty;
                tNewFocQty = 0;
                tNewShipQty = tNewBalInQty;
                /*
                if (tBaseQty > tDiffPoQty) {
                    tNewOverShortQty = tDiffPoQty;
                    tNewFocQty = 0;
                    tNewShipQty = tNewBalInQty;
                } else {
                    tNewOverShortQty = tBaseQty;
                    tNewFocQty = tDiffPoQty - tBaseQty;
                    tNewShipQty = tNewBalInQty;
                    tNewBalInQty -= tNewFocQty;
                }
                */
            } else if (tDiffPoQty < 0) {
                var tWorkQty = -1 * tDiffPoQty;
                if (tWorkQty < tSaveMoqQty) {
                    tNewMoqQty = tSaveMoqQty - tWorkQty;
                    tNewOverShortQty = 0;
                } else {
                    tNewMoqQty = 0;
                    tNewOverShortQty = (tWorkQty - tMoqQty) * -1;
                }
                tNewFocQty = 0;
                tNewShipQty = tNewBalInQty;
            } else {
                tNewFocQty = 0;
                tNewMoqQty = tSaveMoqQty;
                tNewOverShortQty = 0;
                tNewShipQty = tNewBalInQty;
            }

            if (parseFloat(tNewBalInQty) === 0) {
                if (parseFloat(tNewOverShortQty) <= 0) {
                    tNewOverShortQty = 0;
                }
            }

            rowData.MOQ_QTY = String(tNewMoqQty);
            rowData.OVER_SHORT_QTY = String(tNewOverShortQty);
            rowData.BAL_IN_QTY = String(tNewBalInQty);
            rowData.FOC_QTY = String(tNewFocQty);

            var tShipAmt = parseFloat(tNewShipQty) * tPoPrice;
            rowData.SHIP_QTY = String(tNewShipQty);
            rowData.SHIP_AMT = String(tShipAmt);

            var tOverRate = 0;
            rowData.OVER_SHORT_RATE = serviceLib.numToFixed(
                parseFloat(tOverRate),
                2,
            );

            setDataTBL_KSV_PO_MRP2(rowData);

            if (tSurAmt > 0 && parseFloat(tNewBalInQty) !== 0) {
                var tSurPrice = tSurAmt / parseFloat(tNewBalInQty);
                if (tSurAmt > 0) {
                    rowData.DIFF_PRICE = String(tSurPrice);
                }
                var tPoPrice = tMasterPrice + tSurPrice;
                rowData.PO_PRICE = String(tPoPrice);
            }
            setDataTBL_KSV_PO_MRP2(rowData);
        }

        if (field === "SURCHARGE_AMT") {
            tPoQty = parseFloat(rowData.BAL_IN_QTY);
            var tInSurAmt = parseFloat(newValue);
            var tSurPrice = tInSurAmt / tPoQty;
            tSurPrice = serviceLib.numToFixed(parseFloat(tSurPrice), 4);
            tSurPrice = parseFloat(tSurPrice);
            // var tNewPoPrice = tPoPrice + tSurPrice;
            var tNewPoPrice = tMasterPrice + tSurPrice;
            var tNewShipAmt = tNewPoPrice * tPoQty;

            rowData.SURCHARGE_AMT = newValue;
            rowData.SURCHARGE_PRICE = String(tSurPrice);
            rowData.PO_PRICE = String(tNewPoPrice);
            rowData.SHIP_AMT = String(tNewShipAmt);
            setDataTBL_KSV_PO_MRP2(rowData);
        }

        var tNewBalAmt = parseFloat(rowData.SHIP_AMT);
        var tNewMoqAmt =
            parseFloat(rowData.MOQ_QTY) * parseFloat(rowData.PO_PRICE);
        var tNewSurchargeAmt = parseFloat(rowData.SURCHARGE_AMT);

        var tDiffBalAmt = tNewBalAmt - tOldBalAmt;
        var tDiffMoqAmt = tNewMoqAmt - tOldMoqAmt;
        var tDiffSurchargeAmt = tNewSurchargeAmt - tOldSurchargeAmt;

        var tEditObj = { ...dataEDT_KSV_PO_MRP };
        var tOldMoqAmt1 = parseFloat(tEditObj.MOQ_AMT);
        var tOldBalAmt1 = parseFloat(tEditObj.BAL_AMT);
        var tOldSurchargeAmt1 = parseFloat(tEditObj.SURCHARGE_AMT);
        var tNewMoqAmt1 = tOldMoqAmt1 + tDiffMoqAmt;
        var tNewBalAmt1 = tOldBalAmt1 + tDiffBalAmt;
        var tNewSurchargeAmt1 = tOldSurchargeAmt1 + tDiffSurchargeAmt;
        tEditObj.MOQ_AMT = String(tNewMoqAmt1);
        tEditObj.BAL_AMT = String(tNewBalAmt1);
        tEditObj.SURCHARGE_AMT = String(tNewSurchargeAmt1);
        setDataEDT_KSV_PO_MRP(tEditObj);

        var tUpdatedRow = { ...rowData };
        setDataTBL_KSV_PO_MRP2(tUpdatedRow);
        setDatasTBL_KSV_PO_MRP2((prev) =>
            prev.map((row) =>
                String(row.id) === String(tUpdatedRow.id) ? tUpdatedRow : row,
            ),
        );
        setSelectedTBL_KSV_PO_MRP2((prev) =>
            prev.map((row) =>
                String(row.id) === String(tUpdatedRow.id) ? tUpdatedRow : row,
            ),
        );
    };

    const cellEditorKSV_PO_MRP2 = (options) => {
        if (options.field === "SURCHARGE_REMARK")
            return textEditorText(options);
        else if (options.field === "SURCHARGE_AMT")
            return textEditorNum(options);
        else return textEditorNum(options);
    };

    const onChangeTextEdit = (e, options) => {
        console.log("onChangeTextEdit=>", e.target.value);
        options.editorCallback(e.target.value);
    };

    const changeInputValue = (argData) => {
        var tRet = "";
        if (argData === "") tRet = "";
        else {
            if (String(argData) === "0") tRet = "";
            else tRet = String(argData);
        }
        return tRet;
    };

    const handleFocus = (event) => event.target.select();

    const textEditorNum = (options) => {
        return (
            <InputText
                type="text"
                keyfilter="num"
                value={changeInputValue(options.value)}
                onChange={(e) => onChangeTextEdit(e, options)}
                onFocus={handleFocus}
            />
        );
    };

    const textEditorText = (options) => {
        return (
            <InputText
                type="text"
                value={changeInputValue(options.value)}
                onChange={(e) => onChangeTextEdit(e, options)}
                onFocus={handleFocus}
            />
        );
    };

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    const datasetEDT_KSV_PO_MRP = (argData) => {
        var tPayTypeObj = { ...datasEDT_KSV_PO_MRP_PAY_TYPE[0] };
        var tPayType = "";
        datasEDT_KSV_PO_MRP_PAY_TYPE.forEach((col, i) => {
            if (
                argData.PAY_CONDITION === col.CD_CODE ||
                argData.PAY_CONDITION === col.CD_NAME
            ) {
                tPayTypeObj = { ...col };
                tPayType = col.CD_CODE;
            }
        });

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };
        _dataEDT_KSV_PO_MRP.PU_CD = argData.PU_CD;
        _dataEDT_KSV_PO_MRP.VENDOR_NAME = argData.VENDOR_NAME;
        _dataEDT_KSV_PO_MRP.EX_FACTORY = argData.EX_FACTORY;
        _dataEDT_KSV_PO_MRP.STS_IN_AMT = serviceLib.numToFixed(
            parseFloat(argData.STS_IN_AMT, 2),
        );
        _dataEDT_KSV_PO_MRP.MOQ_AMT = serviceLib.numToFixed(
            parseFloat(argData.MOQ_AMT, 2),
        );
        _dataEDT_KSV_PO_MRP.MOQ_AMT_CURR = argData.CURR_CD;
        _dataEDT_KSV_PO_MRP.REG_USER = argData.REG_USER;
        _dataEDT_KSV_PO_MRP.PAY_CONDITION = tPayType;
        _dataEDT_KSV_PO_MRP.PAY_TYPE = tPayType;
        _dataEDT_KSV_PO_MRP.PAY_DATE = argData.PAY_DATE;
        _dataEDT_KSV_PO_MRP.BAL_AMT = serviceLib.numToFixed(
            parseFloat(argData.BAL_AMT, 2),
        );
        _dataEDT_KSV_PO_MRP.SURCHARGE_AMT = serviceLib.numToFixed(
            parseFloat(argData.SURCHARGE_AMT, 2),
        );
        _dataEDT_KSV_PO_MRP.SURCHARGE_AMT_CURR = argData.CURR_CD;
        _dataEDT_KSV_PO_MRP.BUYER_NAME = argData.BUYER_NAME;
        _dataEDT_KSV_PO_MRP.OVER_SHORT = argData.OVERSHORT_RATE;
        _dataEDT_KSV_PO_MRP.PAY_TERM = argData.PAY_TERM;
        _dataEDT_KSV_PO_MRP.BILL_TO = argData.BILL_TO;
        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);

        // setDataEDT_KSV_PO_MRP_PAY_TYPE(tPayTypeObj);
        // editEDT_KSV_PO_MRP_PAY_TYPE (argData.PAY_CONDITION);
    };

    const [datasEDT_KSV_PO_MRP_PAY_TYPE, setDatasEDT_KSV_PO_MRP_PAY_TYPE] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_PAY_TYPE, setDataEDT_KSV_PO_MRP_PAY_TYPE] =
        useState({});

    const onDropdownChangeEDT_KSV_PO_MRP_PAY_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_PAY_TYPE(e.value);
    };

    const onInputChangeEDT_KSV_PO_MRP_PU_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_VENDOR_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onCalChangeEDT_KSV_PO_MRP_EX_FACTORY = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }
        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };
        _dataEDT_KSV_PO_MRP[`${name}`] = val;
        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_STS_IN_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_MOQ_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_MOQ_AMT_CURR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_REG_USER = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onCalChangeEDT_KSV_PO_MRP_PAY_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }
        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };
        _dataEDT_KSV_PO_MRP[`${name}`] = val;
        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_BAL_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_SURCHARGE_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_SURCHARGE_AMT_CURR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_BUYER_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_OVER_SHORT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_PAY_TERM = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_BILL_TO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const menuModel = [
        {
            label: "All Select",
            icon: "pi pi-fw pi-search",
            command: () => process_ALL_SELECT({}),
        },
        {
            label: "Reset Qty",
            icon: "pi pi-fw pi-search",
            command: () => process_RESET_QTY({}),
        },
    ];

    ///

    useEffect(() => {
        let tPuCd = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            var tParams2 = tParams1.map((col, i) => {
                var tObj = {};
                var tCols = col.split("=");
                if (tCols[0].includes("PU_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tPuCd = tObj.value;
                }
            });
        }

        console.log(`STSIN_RECORD:${tPuCd}`);

        var tArray = [];
        var tObj = {};
        tObj.CD_CODE = "01";
        tObj.CD_NAME = "Moq";
        tArray.push(tObj);
        tObj = {};
        tObj.CD_CODE = "02";
        tObj.CD_NAME = "Left Over";
        tArray.push(tObj);
        setDatasMOQ_REASON(tArray);

        search_LIST_1(tPuCd);
        search_LIST_2(tPuCd);
    }, []);

    const footerContent = (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
                size="large"
                label="Yes"
                icon="pi pi-check"
                onClick={onFooterYes}
                autoFocus
            />
            <Button
                size="large"
                label="Cancel"
                icon="pi pi-check"
                onClick={() => setMsgPopup(false)}
                autoFocus
            />
        </div>
    );

    const footerContent1 = (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
                size="large"
                label="Cancel"
                icon="pi pi-check"
                onClick={() => setMsgPopup1(false)}
                autoFocus
            />
        </div>
    );

    const footerContent2 = (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
                size="large"
                label="Yes"
                icon="pi pi-check"
                onClick={onFooterYes2}
                autoFocus
            />
            <Button
                size="large"
                label="Cancel"
                icon="pi pi-check"
                onClick={() => setMsgPopup2(false)}
                autoFocus
            />
        </div>
    );

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
                style={{ width: "123rem", height: "9rem" }}
            >
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>PU#</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <InputText
                            style={{ width: "6rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.PU_CD}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_PU_CD(e, "PU_CD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Supplier</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <InputText
                            style={{ width: "15rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.VENDOR_NAME}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_VENDOR_NAME(
                                    e,
                                    "VENDOR_NAME",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Ex-Factory</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <Calendar
                            showButtonBar
                            disabled
                            style={{ width: "6rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_PO_DATE"
                            value={changeDateVal(dataEDT_KSV_PO_MRP.EX_FACTORY)}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_PO_MRP_EX_FACTORY(
                                    e,
                                    "EX_FACTORY",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>STS IN Amt</p>
                    <div className="af-span-div" style={{ width: "7rem" }}>
                        <InputText
                            disabled
                            style={{ width: "7rem" }}
                            id="id_TARGET_ETA"
                            className="text-right"
                            value={serviceLib.formatNumber(
                                dataEDT_KSV_PO_MRP.STS_IN_AMT,
                                2,
                            )}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_STS_IN_AMT(
                                    e,
                                    "STS_IN_AMT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>MOQ Amt</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <InputText
                            disabled
                            style={{ width: "6rem" }}
                            id="id_TARGET_ETA"
                            className="text-right"
                            value={serviceLib.formatNumber(
                                dataEDT_KSV_PO_MRP.MOQ_AMT,
                                2,
                            )}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_MOQ_AMT(
                                    e,
                                    "MOQ_AMT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "39rem" }}>
                    <div className="af-span-div" style={{ width: "3rem" }}>
                        <InputText
                            disabled
                            style={{ width: "3rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.MOQ_AMT_CURR}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_MOQ_AMT_CURR(
                                    e,
                                    "MOQ_AMT_CURR",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Purchaser</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <InputText
                            disabled
                            style={{ width: "6rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.REG_USER}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_REG_USER(
                                    e,
                                    "REG_USER",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Pay Rule</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Dropdown
                            style={{ width: "15rem" }}
                            id="id_PO_CD"
                            filter
                            value={dataEDT_KSV_PO_MRP_PAY_TYPE}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PO_MRP_PAY_TYPE(
                                    e,
                                    "PAY_TYPE",
                                )
                            }
                            options={datasEDT_KSV_PO_MRP_PAY_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Pay Date</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "6rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_PO_DATE"
                            value={changeDateVal(dataEDT_KSV_PO_MRP.PAY_DATE)}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_PO_MRP_PAY_DATE(
                                    e,
                                    "PAY_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Balance Amt</p>
                    <div className="af-span-div" style={{ width: "7rem" }}>
                        <InputText
                            disabled
                            style={{ width: "7rem" }}
                            id="id_TARGET_ETA"
                            className="text-right"
                            value={serviceLib.formatNumber(
                                dataEDT_KSV_PO_MRP.BAL_AMT,
                                2,
                            )}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_BAL_AMT(
                                    e,
                                    "BAL_AMT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Surcharge Amt</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <InputText
                            disabled
                            style={{ width: "6rem" }}
                            id="id_TARGET_ETA"
                            className="text-right"
                            value={serviceLib.formatNumber(
                                dataEDT_KSV_PO_MRP.SURCHARGE_AMT,
                                2,
                            )}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_SURCHARGE_AMT(
                                    e,
                                    "SURCHARGE_AMT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "4rem" }}>
                    <div className="af-span-div" style={{ width: "3rem" }}>
                        <InputText
                            disabled
                            style={{ width: "3rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.SURCHARGE_AMT_CURR}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_SURCHARGE_AMT_CURR(
                                    e,
                                    "SURCHARGE_AMT_CURR",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "30rem" }}>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Button
                            label="Reset"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Button
                            label="Material Record"
                            style={{ width: "10rem" }}
                            className="p-button-text orange"
                            onClick={popup_MATL_MST}
                        />
                    </div>
                </span>

                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <InputText
                            disabled
                            style={{ width: "6rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.BUYER_NAME}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_BUYER_NAME(
                                    e,
                                    "BUYER_NAME",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Over/Short</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <InputText
                            disabled
                            style={{ width: "15rem" }}
                            id="id_TARGET_ETA"
                            className="text-right"
                            value={dataEDT_KSV_PO_MRP.OVER_SHORT}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_OVER_SHORT(
                                    e,
                                    "OVER_SHORT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Period</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <InputText
                            disabled
                            style={{ width: "6rem" }}
                            id="id_TARGET_ETA"
                            className="text-right"
                            value={dataEDT_KSV_PO_MRP.PAY_TERM}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_PAY_TERM(
                                    e,
                                    "PAY_TERM",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Bill To</p>
                    <div className="af-span-div" style={{ width: "7rem" }}>
                        <InputText
                            disabled
                            style={{ width: "7rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.BILL_TO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_BILL_TO(
                                    e,
                                    "BILL_TO",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "21.5rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>SUM(PO Qty)</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <InputText
                            disabled
                            className="text-right"
                            style={{ width: "6rem" }}
                            id="id_TARGET_ETA"
                            value={serviceLib.formatNumber(sumPoQty)}
                        />
                    </div>
                </span>
                <div style={{ height: "0.5rem" }}>
                </div>
                <span className="af-span-3" style={{ width: "50rem" }}>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Button
                            label="STS In"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={process_INSERT_STS_PARTIN}
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "0rem" }}></p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Button
                            label="STS In end"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={process_INSERT_STS_FULLIN}
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "1rem" }}></p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Button
                            label="Excel Template"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={downloadExcelTemplate}
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "1rem" }}></p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Button
                            label="Excel Upload"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={handleExcelUploadClick}
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "52rem" }}
            >
                <ContextMenu model={menuModel} ref={cm} />
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP2}
                    editMode="cell"
                    size="small"
                    value={datasTBL_KSV_PO_MRP2}
                    tableStyle={{ tableLayout: "fixed" }}
                    onContextMenu={(e) => cm.current.show(e.originalEvent)}
                    resizableColumns
                    columnResizeMode="expand"
                    loading={loadingTBL_KSV_PO_MRP2}
                    // metaKeySelection={false}
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MRP2}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KSV_PO_MRP2(e.value);
                        onRowClick1TBL_KSV_PO_MRP2(e.value);
                    }}
                    // onRowClick={onRowClickTBL_KSV_PO_MRP2}
                    dataKey="id"
                    className="datatable-responsive"
                    onRowDoubleClick={onRowDoubleClickTBL_KSV_PO_MRP2}
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP2}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="568px"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>

                    <AFColumn field="PU_CD" headerClassName="t-header" header="PU#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_SEQ" headerClassName="t-header" header="Seq" style={{ width: "2rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MRP_QTY" headerClassName="t-header" header="MRP Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MRP_QTY, 2) } ></AFColumn>
                    <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Stock" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.STOCK_QTY, 2) } ></AFColumn>
                    <AFColumn field="MOQ_QTY" headerClassName="t-header" header="MOQ" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MOQ_QTY, 2) } ></AFColumn>
                    <AFColumn field="OVER_SHORT_QTY" headerClassName="t-header" header="Over/Short" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.OVER_SHORT_QTY,2) } ></AFColumn>
                    <AFColumn field="LEFTOVER_QTY" headerClassName="t-header" header="Left Over" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LEFTOVER_QTY, 2) } ></AFColumn>
                    <AFColumn field="PART_IN_QTY" headerClassName="t-header" header="Partial Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PART_IN_QTY, 2) } ></AFColumn>
                    <AFColumn field="BAL_IN_QTY" headerClassName="t-header" headerStyle={{ color: "green" }} header="PO Qty" style={{ width: "6rem", flexBasis: "auto" }} editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BAL_IN_QTY, 2) } ></AFColumn>
                    <AFColumn field="FOC_QTY" headerClassName="t-header" header="FOC" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.FOC_QTY, 2) } ></AFColumn>
                    <AFColumn field="SHIP_QTY" headerClassName="t-header" header="Ship Qty" style={{ width: "6rem", flexBasis: "auto", color: "green", }} editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHIP_QTY, 2) } ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MASTER_PRICE" headerClassName="t-header" header="Master Price" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MASTER_PRICE, 4) } ></AFColumn>
                    <AFColumn field="DIFF_PRICE" headerClassName="t-header" header="+/-" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.DIFF_PRICE, 4) } ></AFColumn>
                    <AFColumn field="PO_PRICE" headerClassName="t-header" header="PO price" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PO_PRICE, 4) } ></AFColumn>
                    <AFColumn field="SURCHARGE_AMT" headerClassName="t-header" header="Surcharge/Discount" style={{ width: "6rem", flexBasis: "auto", color: "green", }} editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SURCHARGE_AMT, 2) } ></AFColumn>
                    <AFColumn field="SURCHARGE_REMARK" headerClassName="t-header" header="Surcharge/Discount Reason" style={{ width: "6rem", flexBasis: "auto", color: "green", }} editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} ></AFColumn>
                    <AFColumn field="SHIP_AMT" headerClassName="t-header" header="Ship Amt" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHIP_AMT, 4) } ></AFColumn>
                    <AFColumn field="BAL_IN_QTY" headerClassName="t-header" header="Bal" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BAL_IN_QTY, 2) } ></AFColumn>
                    <AFColumn field="OVER_SHORT_RATE" headerClassName="t-header" header="%" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.OVER_SHORT_RATE, 2) } ></AFColumn>
                    <AFColumn
                        field="CONF_FLAG"
                        headerClassName="t-header"
                        header="Conf Flag"
                        style={{ width: "6rem", flexBasis: "auto" }}
                        bodyStyle={{ textAlign: "center" }}
                        body={(rowData) => (
                            <Checkbox
                                checked={normalizeConfFlag(rowData.CONF_FLAG) === "1"}
                                onChange={(e) =>
                                    updateMainConfFlag(rowData, e.checked)
                                }
                            />
                        )}
                    ></AFColumn>
                </AFDataTable>
            </div>

            <Toast ref={toast} />

            {/* Hidden file input for Excel upload */}
            <input
                type="file"
                accept=".xlsx,.xls"
                ref={excelFileInputRef}
                style={{ display: "none" }}
                onChange={handleExcelFileChange}
            />

            {/* Excel Upload Confirmation Dialog */}
            <Dialog
                visible={excelUploadDialog}
                position="mid-center"
                style={{ width: "160rem", height: "84rem", maxWidth: "85vw" }}
                header="PO Qty Upload Preview"
                modal={true}
                className="p-fluid"
                onHide={() => { setExcelUploadDialog(false); setExcelPreviewData([]); }}
            >
                <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    {/* Buttons */}
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                        <Button
                            label="Submit"
                            style={{ width: "9rem" }}
                            onClick={submitExcelUpload}
                        />
                        <Button
                            label="Cancel"
                            className="p-button-text"
                            style={{ width: "9rem" }}
                            onClick={() => { setExcelUploadDialog(false); setExcelPreviewData([]); }}
                        />
                        <span style={{ marginLeft: "1rem", display: "flex", alignItems: "center", gap: "1.5rem", fontSize: "1rem" }}>
                            <span><span style={{ display: "inline-block", width: "1rem", height: "1rem", backgroundColor: "#d4edda", border: "1px solid #aaa", marginRight: "0.3rem" }}></span>Changed Value (Editable) </span>
                            <span><span style={{ display: "inline-block", width: "1rem", height: "1rem", backgroundColor: "#fff3cd", border: "1px solid #aaa", marginRight: "0.3rem" }}></span>Over Short Rate Exceeded</span>
                            <span style={{ color: "#888", fontSize: "1rem" }}>• Green cells can be clicked to edit. &nbsp; • "-" indicates the column is not present in Excel and will not be changed.</span>
                        </span>
                    </div>
                    {/* Table */}
                    <div style={{ overflowX: "auto", overflowY: "hidden", flex: 1, paddingTop: "0.5rem" }}>
                        <AFDataTable preventUnrelatedRerender
                            size="small"
                            value={excelPreviewData}
                            dataKey="id"
                            tableStyle={{ tableLayout: "fixed", minWidth: "145rem" }}
                            resizableColumns
                            columnResizeMode="expand"
                            showGridlines
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="60vh"
                            emptyMessage=" "
                        >
                            {/*<AFColumn field="id" header="ID" style={{ width: "5rem", flexBasis: "auto" }} body={bodyPreviewText("id", "left", false)}></AFColumn>*/}
                            <AFColumn field="PU_CD" header="PU#" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={previewColumnBodyStyle} body={bodyPreviewText("PU_CD", "left", false)}></AFColumn>
                            <AFColumn field="PO_CD" header="PO#" style={{ width: "7rem", flexBasis: "auto" }} bodyStyle={previewColumnBodyStyle} body={bodyPreviewText("PO_CD", "left", false)}></AFColumn>
                            <AFColumn field="MATL_CD" header="Matl#" style={{ width: "8rem", flexBasis: "auto" }} bodyStyle={previewColumnBodyStyle} body={bodyPreviewText("MATL_CD", "left", false)}></AFColumn>
                            <AFColumn field="MATL_NAME" header="Description" style={{ width: "12rem", flexBasis: "auto" }} bodyStyle={previewColumnBodyStyle} body={bodyPreviewText("MATL_NAME", "left", true)}></AFColumn>
                            <AFColumn field="COLOR" header="Color" style={{ width: "8rem", flexBasis: "auto" }} bodyStyle={previewColumnBodyStyle} body={bodyPreviewText("COLOR", "left", false)}></AFColumn>
                            <AFColumn field="SPEC" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} bodyStyle={previewColumnBodyStyle} body={bodyPreviewText("SPEC", "left", true)}></AFColumn>
                            <AFColumn field="BAL_IN_QTY" header="Curr PO Qty" style={{ width: "8rem", flexBasis: "auto" }} bodyStyle={previewColumnBodyStyle} body={bodyPreviewNumber("BAL_IN_QTY")}></AFColumn>
                            <AFColumn field="_newBalInQty" header="New PO Qty" headerStyle={{ color: "green" }} style={{ width: "8rem", flexBasis: "auto" }} bodyStyle={previewColumnBodyStyle} body={bodyPreviewInput("_newBalInQty", "newBalInQty", true)}></AFColumn>
                            <AFColumn field="SHIP_QTY" header="Curr Ship Qty" style={{ width: "8rem", flexBasis: "auto" }} bodyStyle={previewColumnBodyStyle} body={bodyPreviewNumber("SHIP_QTY")}></AFColumn>
                            <AFColumn field="_newShipQty" header="New Ship Qty" headerStyle={{ color: "green" }} style={{ width: "8rem", flexBasis: "auto" }} bodyStyle={previewColumnBodyStyle} body={bodyPreviewInput("_newShipQty", "newShipQty", true)}></AFColumn>
                            <AFColumn field="SURCHARGE_AMT" header="Curr Surcharge" style={{ width: "9rem", flexBasis: "auto" }} bodyStyle={previewColumnBodyStyle} body={bodyPreviewNumber("SURCHARGE_AMT")}></AFColumn>
                            <AFColumn field="_newSurchargeAmt" header="New Surcharge" headerStyle={{ color: "green" }} style={{ width: "9rem", flexBasis: "auto" }} bodyStyle={previewColumnBodyStyle} body={bodyPreviewInput("_newSurchargeAmt", "newSurchargeAmt", true)}></AFColumn>
                            <AFColumn field="SURCHARGE_REMARK" header="Curr Reason" style={{ width: "10rem", flexBasis: "auto" }} bodyStyle={previewColumnBodyStyle} body={bodyPreviewText("SURCHARGE_REMARK", "left", true)}></AFColumn>
                            <AFColumn field="_newReason" header="New Reason" headerStyle={{ color: "green" }} style={{ width: "12rem", flexBasis: "auto" }} bodyStyle={previewColumnBodyStyle} body={bodyPreviewInput("_newReason", "newReason", false)}></AFColumn>
                            <AFColumn field="_newConfFlag" header="New Conf Flag" headerStyle={{ color: "green" }} style={{ width: "8rem", flexBasis: "auto" }} bodyStyle={previewColumnBodyStyle} body={bodyPreviewConfFlag}></AFColumn>
                            <AFColumn field="_isOver" header="Over Short" style={{ width: "8rem", flexBasis: "auto" }} bodyStyle={previewColumnBodyStyle} body={bodyPreviewOver}></AFColumn>
                        </AFDataTable>
                    </div>
                </div>
            </Dialog>

            {/* Moq Confirm Dialog */}
            <Dialog
                visible={createDialog4}
                position="mid-center"
                style={{
                    width: "120rem",
                    height: "40rem",
                    marginLeft: "0rem",
                    marginTop: "0rem",
                    paddingLeft: "0rem",
                    paddingTop: "0rem",
                }}
                header="Stock Reason Check"
                modal={true}
                className="p-fluid"
                onHide={hideDialog4}
            >
                <div className="af-div-main">
                    <div
                        className="af-div-first"
                        style={{ width: "120rem", height: "3rem" }}
                    >
                        <span
                            className="af-span-3-0"
                            style={{ width: "16rem" }}
                        >
                            <div
                                className="af-span-div-btn"
                                style={{ width: "14rem" }}
                            >
                                <Button
                                    label="OK"
                                    style={{ width: "14rem" }}
                                    className="p-button-text"
                                    onClick={process_MOQ_CONFIRM}
                                />
                            </div>
                        </span>
                        <span
                            className="af-span-3-0"
                            style={{ width: "16rem" }}
                        >
                            <div
                                className="af-span-div-btn"
                                style={{ width: "14rem" }}
                            >
                                <Button
                                    label="Cancel"
                                    style={{ width: "14rem" }}
                                    className="p-button-text"
                                    onClick={process_MOQ_CANCEL}
                                />
                            </div>
                        </span>
                    </div>
                    <div
                        className="af-div-first"
                        style={{ width: "120rem", height: "36rem" }}
                    >
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_TBL_KSV_PO_MRP4}
                            editMode="cell"
                            size="small"
                            value={datasTBL_KSV_PO_MRP4}
                            tableStyle={{ tableLayout: "fixed" }}
                            resizableColumns
                            columnResizeMode="expand"
                            loading={loadingTBL_KSV_PO_MRP4}
                            metaKeySelection={false}
                            showGridlines
                            selectionMode="multiple"
                            selection={selectedTBL_KSV_PO_MRP4}
                            onSelectionChange={(e) => {
                                setSelectedTBL_KSV_PO_MRP4(e.value);
                                onRowClick1TBL_KSV_PO_MRP4(e.value);
                            }}
                            onRowClick={onRowClickTBL_KSV_PO_MRP4}
                            dataKey="id"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" "
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="36rem"
                        >
                            <AFColumn field="PU_CD" headerClassName="t-header" header="PU#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="PO_SEQ" headerClassName="t-header" header="Seq" style={{ width: "2rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="MRP_QTY" headerClassName="t-header" header="MRP Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MRP_QTY, 2) } ></AFColumn>
                            <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Stock" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.STOCK_QTY, 2, ) } ></AFColumn>
                            <AFColumn field="MOQ_QTY" headerClassName="t-header" header="MOQ" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MOQ_QTY, 2) } ></AFColumn>

                            <AFColumn field="MOQ_REASON" headerClassName="t-header" header="Stock Reason Check" style={{ width: "10rem", color: "green" }} editor={(options) => cellEditorTBL_KSV_PO_MRP4(options) } onCellEditComplete={ onCellEditCompleteTBL_KSV_PO_MRP4 } ></AFColumn>
                            <AFColumn field="OVER_SHORT_QTY" headerClassName="t-header" header="Over/Short" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.OVER_SHORT_QTY, 2, ) } ></AFColumn>
                            <AFColumn field="LEFTOVER_QTY" headerClassName="t-header" header="Left Over" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.LEFTOVER_QTY, 2, ) } ></AFColumn>
                            <AFColumn field="PART_IN_QTY" headerClassName="t-header" header="Partial Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.PART_IN_QTY, 2, ) } ></AFColumn>
                            <AFColumn field="PO_QTY" headerClassName="t-header" headerStyle={{ color: "green" }} header="PO Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PO_QTY, 2) } ></AFColumn>
                            <AFColumn field="FOC_QTY" headerClassName="t-header" header="FOC" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.FOC_QTY, 2) } ></AFColumn>
                            <AFColumn field="SHIP_QTY" headerClassName="t-header" header="Ship Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.SHIP_QTY, 2, ) } ></AFColumn>
                            <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="MASTER_PRICE" headerClassName="t-header" header="Master Price" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.MASTER_PRICE, 4, ) } ></AFColumn>
                            <AFColumn field="DIFF_PRICE" headerClassName="t-header" header="+/-" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.DIFF_PRICE, 4, ) } ></AFColumn>
                            <AFColumn field="PO_PRICE" headerClassName="t-header" header="PO price" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.PO_PRICE, 4, ) } ></AFColumn>
                            <AFColumn field="SURCHARGE_AMT" headerClassName="t-header" header="Surcharge/Discount" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.SURCHARGE_AMT, 2, ) } ></AFColumn>
                            <AFColumn field="SURCHARGE_REMARK" headerClassName="t-header" header="Reason" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>

                            <AFColumn field="SHIP_AMT" headerClassName="t-header" header="Ship Amt" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.SHIP_AMT, 2, ) } ></AFColumn>
                            <AFColumn field="BAL_IN_QTY" headerClassName="t-header" header="Bal" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.BAL_IN_QTY, 2, ) } ></AFColumn>
                            <AFColumn field="OVER_SHORT_RATE" headerClassName="t-header" header="%" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.OVER_SHORT_RATE, 2, ) } ></AFColumn>
                            <AFColumn
                                field="CONF_FLAG"
                                headerClassName="t-header"
                                header="Conf Flag"
                                style={{ width: "6rem", flexBasis: "auto" }}
                                bodyStyle={{ textAlign: "center" }}
                                body={(rowData) => (
                                    <Checkbox
                                        checked={
                                            normalizeConfFlag(
                                                rowData.CONF_FLAG,
                                            ) === "1"
                                        }
                                        onChange={(e) =>
                                            updateMoqConfFlag(
                                                rowData,
                                                e.checked,
                                            )
                                        }
                                    />
                                )}
                            ></AFColumn>
                        </AFDataTable>
                    </div>
                </div>
            </Dialog>

            <Dialog
                visible={createDialog}
                position="top-right"
                style={{ width: "98vw" }}
                header=""
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            ></Dialog>

            <Dialog class="loadingModal" visible={isProgress} modal>
                <ProgressSpinner />
            </Dialog>

            <Dialog
                header="Confirm"
                visible={msgPopup}
                style={{ width: "20vw" }}
                onHide={() => setMsgPopup(false)}
                footer={footerContent}
            >
                <p className="text-center">
                    Over Short Rate가 4% 이상인 데이타가 있습니다.<br></br>
                    계속진행하시겠습니까?<br></br>
                    <br></br>
                    You have data with an Over Short Rate of 4% or more.
                    <br></br>
                    Do you want to proceed?
                </p>
            </Dialog>
            <Dialog
                header="Error"
                visible={msgPopup1}
                style={{ width: "20vw" }}
                onHide={() => setMsgPopup(false)}
                footer={footerContent1}
            >
                <p className="text-center">
                    Master Price가 0인 것이 있습니다.<br></br>
                    <br></br>
                    There is one with a master price of 0
                </p>
            </Dialog>
            <Dialog
                header="Confirm"
                visible={msgPopup2}
                style={{ width: "20vw" }}
                onHide={() => setMsgPopup(false)}
                footer={footerContent2}
            >
                <p className="text-center">
                    Master Price가 Fix되지 않은것이 있습니다.<br></br>
                    계속 진행하시겠습니까?<br></br>
                    <br></br>
                    Master Price has not been fixed.<br></br>
                    Do you want to continue?
                </p>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0430_STSIN_RECORD, comparisonFn);
