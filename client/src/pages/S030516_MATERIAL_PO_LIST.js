/* eslint-disable */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { AFDataTable } from "../components/AFDataTable";
import { AFColumn } from "../components/AFColumn";
import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { RadioButton } from "primereact/radiobutton";
import moment from "moment";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS030516_MATERIAL_PO_LIST } from "../service/service_biz/ServiceS030516_MATERIAL_PO_LIST";

import "./page_common.scss";

const curYear = new Date().getFullYear();
const initSDate = `${curYear}0101`;
const initEDate = `${curYear}1231`;

const emptyQRY = {
    DATE_KIND: "1",   // "0" = PO Reg. Date, "1" = ETD (cpp: m_nRadioDate)
    S_DATE: initSDate,
    E_DATE: initEDate,
    PO_CD: "",
    BUYER_CD: "",
    VENDOR_CD: "",
    MATL_TYPE: "",
    VENDOR_TYPE: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    MATL_CD: "",
};

const sanitizeBuyerField = (value) => {
    const v = String(value ?? "").trim();
    return v.toLowerCase() === "empty" ? "" : v;
};

const normalizeBuyerOptions = (options = []) => {
    const normalized = options.map((item) => {
        const buyerCd = sanitizeBuyerField(item?.BUYER_CD);
        const buyerName = sanitizeBuyerField(item?.BUYER_NAME);
        let buyerLabel = "";
        if (buyerCd && buyerName) buyerLabel = `(${buyerCd}) ${buyerName}`;
        else if (buyerCd) buyerLabel = buyerCd;
        else if (buyerName) buyerLabel = buyerName;

        return {
            ...item,
            BUYER_CD: buyerCd,
            BUYER_NAME: buyerName,
            BUYER_LABEL: buyerLabel,
        };
    });

    if (normalized.length > 0) {
        normalized[0] = {
            ...normalized[0],
            BUYER_CD: "",
            BUYER_NAME: " ",
            BUYER_LABEL: " ",
        };
    }

    return normalized;
};

const S030516_MATERIAL_PO_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceRef = useRef(null);
    if (!serviceRef.current) serviceRef.current = new ServiceS030516_MATERIAL_PO_LIST();
    const service = serviceRef.current;

    const toast = useRef(null);
    const commonBtnStyle = { width: "6.5rem", height: "1.8rem", fontSize: "1rem" };
    const W = 0.8;
    const rw = (n) => `${n * W}rem`;

    /* QRY state */
    const [dataQRY, setDataQRY] = useState(emptyQRY);

    /* Dropdown: MATL_TYPE */
    const [datasMATL_TYPE, setDatasMATL_TYPE] = useState([]);
    const [dataMATL_TYPE, setDataMATL_TYPE] = useState({});

    /* Dropdown: VENDOR_TYPE */
    const [datasVENDOR_TYPE, setDatasVENDOR_TYPE] = useState([]);
    const [dataVENDOR_TYPE, setDataVENDOR_TYPE] = useState({});

    /* Dropdown: BUYER_CD */
    const [datasBUYER_CD, setDatasBUYER_CD] = useState([]);
    const [dataBUYER_CD, setDataBUYER_CD] = useState({});

    /* Dropdown: PO_CD */
    const [datasPO_CD, setDatasPO_CD] = useState([]);
    const [dataPO_CD, setDataPO_CD] = useState({});

    /* Dropdown: VENDOR_CD */
    const [datasVENDOR_CD, setDatasVENDOR_CD] = useState([]);
    const [dataVENDOR_CD, setDataVENDOR_CD] = useState({});

    /* Table */
    const [datasTBL, setDatasTBL] = useState([]);
    const [selectedTBL, setSelectedTBL] = useState([]);
    const [loadingTBL, setLoadingTBL] = useState(false);

    const onSelectionChangeTBL = useCallback((e) => {
        setSelectedTBL(e.value);
    }, []);

    /* ── date helpers ── */
    const changeDateVal = (argVal) => {
        if (!argVal || argVal === "") return null;
        if (typeof argVal !== "string") return null;
        return new Date(
            parseInt(argVal.substring(0, 4)),
            parseInt(argVal.substring(4, 6)) - 1,
            parseInt(argVal.substring(6, 8)),
        );
    };

    const getDateVal = (argVal) => {
        const d = argVal;
        const mm = d.getMonth() + 1;
        const mm_str = mm > 9 ? `${mm}` : `0${mm}`;
        const dd = d.getDate();
        const dd_str = dd > 9 ? `${dd}` : `0${dd}`;
        return `${d.getFullYear()}${mm_str}${dd_str}`;
    };

    /* ── handlers ── */
    const onCalChange = (e, name) => {
        const val1 = e.value || "";
        const val = val1 === "" ? "" : getDateVal(val1);
        setDataQRY((prev) => ({ ...prev, [name]: val }));
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        setDataQRY((prev) => ({ ...prev, [name]: val }));
    };

    const onDropdownChangeMATL_TYPE = (e) => {
        const val = (e.value && e.value.CD_CODE) || "";
        setDataQRY((prev) => ({ ...prev, MATL_TYPE: val }));
        setDataMATL_TYPE(e.value);
    };

    const onDropdownChangeVENDOR_TYPE = (e) => {
        const val = (e.value && e.value.CD_CODE) || "";
        setDataQRY((prev) => ({ ...prev, VENDOR_TYPE: val }));
        setDataVENDOR_TYPE(e.value);
    };

    // Buyer 변경 시 PO 목록 재로딩 (cpp: OnSelchangeCbBuyer → InitPoNo2)
    const onDropdownChangeBUYER_CD = (e) => {
        const val = sanitizeBuyerField(e.value && e.value.BUYER_CD);
        setDataQRY((prev) => ({ ...prev, BUYER_CD: val, PO_CD: "" }));
        setDataBUYER_CD(e.value);
        service.mgrQuery_PO_BY_BUYER({ BUYER_CD: val }).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasPO_CD(data);
                setDataPO_CD(data[0]);
            }
        });
    };

    // PO 변경 시 Vendor 목록 재로딩 (cpp: OnSelchangeCbPono → InitVendor2)
    const onDropdownChangePO_CD = (e) => {
        const val = (e.value && e.value.PO_CD) || "";
        setDataQRY((prev) => ({ ...prev, PO_CD: val, VENDOR_CD: "" }));
        setDataPO_CD(e.value);
        service.mgrQuery_VENDOR_BY_PO({ PO_CD: val }).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasVENDOR_CD(data);
                setDataVENDOR_CD(data[0]);
            }
        });
    };

    const onDropdownChangeVENDOR_CD = (e) => {
        const val = (e.value && e.value.VENDOR_CD) || "";
        setDataQRY((prev) => ({ ...prev, VENDOR_CD: val }));
        setDataVENDOR_CD(e.value);
    };

    const onKeyPress = (e) => {
        if (e.key === "Enter") searchQuery();
    };

    const hasRequiredSearchConditions = () => {
        const requiredFields = [
            dataQRY.PO_CD,
            dataQRY.MATL_NAME,
            dataQRY.COLOR,
            dataQRY.VENDOR_TYPE,
            dataQRY.VENDOR_CD,
            dataQRY.SPEC,
            dataQRY.MATL_CD,
            dataQRY.BUYER_CD,
        ];

        return requiredFields.some((val) => String(val ?? "").trim() !== "");
    };

    const download_FULL_DATA = async (downloadKind = "DATA") => {
        const reportFn =
            service.download_FULL_DATA || service.mgrQuery_Report || service.mgrQuery_REPORT;
        if (typeof reportFn !== "function") {
            console.log("download_FULL_DATA function not found on service", service);
            return;
        }

        const data = await reportFn.call(service, { ...dataQRY, DOWNLOAD_KIND: downloadKind });
        if (typeof data.graphQLErrors === "undefined") {
            if (Array.isArray(data) && data.length > 0 && data[0].CODE) {
                const cols = data[0].CODE.split("?");
                if (cols.length >= 3) {
                    serviceLib.downloadFile(cols[2].toString(), cols[1].toString());
                }
            }
        } else {
            console.log("download_FULL_DATA error => " + JSON.stringify(data.graphQLErrors));
        }
    };

    /* ── 조회 ── */
    const searchQuery = async () => {
        if (!hasRequiredSearchConditions()) {
            alert("PO / Desc / Color / Supplier Type / Supplier / Spec / Matl Cd / Buyer 조건 중 최소 1개는 입력해야 검색할 수 있습니다.<br><br>At least one of the following search conditions must be entered: PO / Desc / Color / Supplier Type / Supplier / Spec / Matl Cd / Buyer.");
            return;
        }

        setLoadingTBL(true);
        setDatasTBL([]);

        const countData = await service.mgrQuery_LIST_1_COUNT({ ...dataQRY });
        if (typeof countData.graphQLErrors !== "undefined") {
            setLoadingTBL(false);
            console.log("mgrQuery_LIST_1_COUNT error => " + JSON.stringify(countData.graphQLErrors));
            return;
        }

        const totalCnt = Number(countData?.ROW_CNT ?? 0);
        if (totalCnt > 1000) {
            setLoadingTBL(false);

            if (
                await confirm(
                    `1000건 초과 전체 리스트는 다운로드만 가능합니다.<br>계속하시겠습니까?<BR><BR>There are more than 1000 records. Only downloading the full list is possible.<br>Do you want to continue?<br><br>TOTAL:${totalCnt}`,
                )
            ) {
                setLoadingTBL(true);
                await download_FULL_DATA("LIST");
                setLoadingTBL(false);
            }

            return;
        }

        const data = await service.mgrQuery_LIST_1({ ...dataQRY });
        setLoadingTBL(false);
        if (typeof data.graphQLErrors === "undefined") {
            setDatasTBL(data.map((col, i) => ({ ...col, id: i + 1 })));
        } else {
            console.log("mgrQuery_LIST_1 error => " + JSON.stringify(data.graphQLErrors));
        }
    };

    /* ── 초기화 (cpp: OnBnReset) ── */
    const resetQuery = () => {
        setDataQRY((prev) => ({
            ...prev,
            PO_CD: "", BUYER_CD: "", VENDOR_CD: "",
            MATL_TYPE: "", VENDOR_TYPE: "",
            MATL_NAME: "", COLOR: "", SPEC: "", MATL_CD: "",
        }));
        setDataMATL_TYPE(datasMATL_TYPE[0] || {});
        setDataVENDOR_TYPE(datasVENDOR_TYPE[0] || {});
        setDataBUYER_CD(datasBUYER_CD[0] || null);
        setDataPO_CD(datasPO_CD[0] || {});
        setDataVENDOR_CD(datasVENDOR_CD[0] || {});
        setDatasTBL([]);
    };

    const blankFn = () => {};

    const exportExcel = async () => {
        const fileName = `material_po_list`;

        const table = datasTBL.map((r) => ({
            PO: r.PO_CD ?? "",
            Order: r.ORDER_CD ?? "",
            Style: r.STYLE_NAME ?? "",
            Supplier: r.VENDOR_NAME ?? "",
            Description: r.MATL_NAME ?? "",
            Color: r.COLOR ?? "",
            Spec: r.SPEC ?? "",
            Unit: r.UNIT ?? "",
            "Matl Cd": r.MATL_CD ?? "",
            Curr: r.CURR_CD ?? "",
            단가: Number(String(r.MATL_PRICE ?? "").replace(/,/g, "")) || 0,
            가격: Number(String(r.TOT_AMT ?? "").replace(/,/g, "")) || 0,
            소요량: Number(String(r.EXP_USEQTY ?? "").replace(/,/g, "")) || 0,
            발주량: Number(String(r.EXP_POQTY ?? "").replace(/,/g, "")) || 0,
            발주일: serviceLib.dateFormat(r.ORDER_DATE),
        }));

        await serviceLib.exportExcel(fileName, "material_po_list", table, {
            columnNumberFormats: {
                가격: "#,##0.00",
                단가: "#,##0.00",
            },
        });
    };

    const exportReport = async () => {
        setLoadingTBL(true);
        await download_FULL_DATA("DATA");
        setLoadingTBL(false);
    };
    
    /* ── init ── */
    useEffect(() => {
        service.mgrQuery_CODE({ BUYER_CD: "" }).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasMATL_TYPE(data.MATL_TYPE);
                setDataMATL_TYPE(data.MATL_TYPE[0]);
                setDatasVENDOR_TYPE(data.VENDOR_TYPE);
                setDataVENDOR_TYPE(data.VENDOR_TYPE[0]);
                const normalizedBuyerOptions = normalizeBuyerOptions(data.BUYER_CD || []);
                setDatasBUYER_CD(normalizedBuyerOptions);
                setDataBUYER_CD(normalizedBuyerOptions[0] || null);
                setDatasPO_CD(data.PO_CD);
                setDataPO_CD(data.PO_CD[0]);
                setDatasVENDOR_CD(data.VENDOR_CD);
                setDataVENDOR_CD(data.VENDOR_CD[0]);
            } else {
                console.log("mgrQuery_CODE error => " + JSON.stringify(data.graphQLErrors));
            }
        });
    }, []);

    /* ── render ── */
    return (
        <div style={{ width: "100%", height: "100%", minHeight: "calc(100vh - 7rem)", display: "flex", flexDirection: "column" }}>
            {/* ── Row 1: ○ PO Reg. Date [S_DATE] ~ [E_DATE] | PO | Matl Type | Desc | Color ── */}
            <div style={{ display: "flex", alignItems: "center", marginLeft: "1rem", marginRight: "1rem", marginTop: "1rem", minHeight: "2.2rem" }}>
                <span style={{ display: "inline-flex", alignItems: "center", width: rw(38), gap: "0.4rem" }}>
                    <RadioButton
                        value="0"
                        checked={dataQRY.DATE_KIND === "0"}
                        onChange={() => setDataQRY((prev) => ({ ...prev, DATE_KIND: "0" }))}
                    />
                    <p style={{ width: rw(8), display: "inline-block", margin: 0 }}>PO Reg. Date</p>
                    <div style={{ display: "inline-block", width: rw(10) }}>
                        <Calendar showButtonBar dateFormat="yy-mm-dd"
                            value={changeDateVal(dataQRY.S_DATE)}
                            onChange={(e) => onCalChange(e, "S_DATE")} />
                    </div>
                    <p style={{ margin: 0 }}>~</p>
                    <div style={{ display: "inline-block", width: rw(10) }}>
                        <Calendar showButtonBar dateFormat="yy-mm-dd"
                            value={changeDateVal(dataQRY.E_DATE)}
                            onChange={(e) => onCalChange(e, "E_DATE")} />
                    </div>
                </span>
                <span style={{ marginLeft: "0.4rem", display: "inline-flex", alignItems: "center", width: rw(16), gap: "0.4rem" }}>
                    <p style={{ width: rw(4), display: "inline-block" }}>PO</p>
                    <Dropdown style={{ width: rw(12) }} value={dataPO_CD}
                        onChange={onDropdownChangePO_CD} options={datasPO_CD}
                        optionLabel="PO_CD" placeholder="" editable filter />
                </span>
                <span style={{ marginLeft: "0.4rem", display: "inline-flex", alignItems: "center", width: rw(20), gap: "0.4rem" }}>
                    <p style={{ width: rw(7), display: "inline-block" }}>Matl Type</p>
                    <Dropdown style={{ width: rw(13) }} value={dataMATL_TYPE}
                        onChange={onDropdownChangeMATL_TYPE} options={datasMATL_TYPE}
                        optionLabel="CD_NAME" placeholder="" />
                </span>
                <span style={{ marginLeft: "0.4rem", display: "inline-flex", alignItems: "center", width: rw(20), gap: "0.4rem" }}>
                    <p style={{ width: rw(4), display: "inline-block" }}>Desc</p>
                    <InputText style={{ width: rw(15) }} value={dataQRY.MATL_NAME}
                        onChange={(e) => onInputChange(e, "MATL_NAME")} onKeyPress={onKeyPress} />
                </span>
                <span style={{ marginLeft: "0.4rem", display: "inline-flex", alignItems: "center", width: rw(14), gap: "0.4rem" }}>
                    <p style={{ width: rw(4), display: "inline-block" }}>Color</p>
                    <InputText style={{ width: rw(9) }} value={dataQRY.COLOR}
                        onChange={(e) => onInputChange(e, "COLOR")} onKeyPress={onKeyPress} />
                </span>
            </div>

            {/* ── Row 2: ● ETD | Supplier Type | Supplier | Spec | Matl Cd ── */}
            <div style={{ display: "flex", alignItems: "center", marginLeft: "1rem", marginRight: "1rem", marginTop: "0.3rem", minHeight: "2.2rem" }}>
                <span style={{ display: "inline-flex", alignItems: "center", width: rw(33.1), gap: "0.4rem" }}>
                    <RadioButton
                        value="1"
                        checked={dataQRY.DATE_KIND === "1"}
                        onChange={() => setDataQRY((prev) => ({ ...prev, DATE_KIND: "1" }))}
                    />
                    <p style={{ width: rw(3), margin: 0, display: "inline-block" }}>ETD</p>
                </span>
                <span style={{ marginLeft: "0.4rem", display: "inline-flex", alignItems: "center", width: rw(20), gap: "0.4rem" }}>
                    <p style={{ width: rw(9), display: "inline-block" }}>Supplier Type</p>
                    <Dropdown style={{ width: rw(11) }} value={dataVENDOR_TYPE}
                        onChange={onDropdownChangeVENDOR_TYPE} options={datasVENDOR_TYPE}
                        optionLabel="CD_NAME" placeholder="" />
                </span>
                <span style={{ marginLeft: "0.4rem", display: "inline-flex", alignItems: "center", width: rw(26), gap: "0.4rem" }}>
                    <p style={{ width: rw(6), display: "inline-block" }}>Supplier</p>
                    <Dropdown style={{ width: rw(20) }} value={dataVENDOR_CD}
                        onChange={onDropdownChangeVENDOR_CD} options={datasVENDOR_CD}
                        optionLabel="VENDOR_NAME" placeholder="" filter />
                </span>
                <span style={{ marginLeft: "0.4rem", display: "inline-flex", alignItems: "center", width: rw(19), gap: "0.4rem" }}>
                    <p style={{ width: rw(4), display: "inline-block" }}>Spec</p>
                    <InputText style={{ width: rw(15) }} value={dataQRY.SPEC}
                        onChange={(e) => onInputChange(e, "SPEC")} onKeyPress={onKeyPress} />
                </span>
                <span style={{ marginLeft: "0.4rem", display: "inline-flex", alignItems: "center", width: rw(13), gap: "0.4rem" }}>
                    <p style={{ width: rw(5), display: "inline-block" }}>Matl Cd</p>
                    <InputText style={{ width: rw(8) }} value={dataQRY.MATL_CD}
                        onChange={(e) => onInputChange(e, "MATL_CD")} onKeyPress={onKeyPress} />
                </span>
            </div>

            {/* ── Row 3: Buyer | 조회 Report 초기화 종료 | ... | List ── */}
            <div style={{ display: "flex", alignItems: "center", marginLeft: "1rem", marginRight: "1rem", marginTop: "0.3rem", minHeight: "2.4rem" }}>
                <span style={{ display: "inline-flex", alignItems: "center", width: rw(30), gap: "0.4rem" }}>
                    <p style={{ width: rw(5), display: "inline-block" }}>Buyer</p>
                    <Dropdown style={{ width: rw(24) }} value={dataBUYER_CD}
                        onChange={onDropdownChangeBUYER_CD} options={datasBUYER_CD}
                        optionLabel="BUYER_LABEL" placeholder="" filter />
                </span>
                <span style={{ marginLeft: "0.4rem", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
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
                        className="p-button-text"
                        style={commonBtnStyle}
                        onClick={searchQuery}
                    />
                    <Button label="List" style={commonBtnStyle} className="p-button-text green" onClick={exportExcel} />
                    <Button label="Data" style={commonBtnStyle} className="p-button-text green" onClick={exportReport} />
                    <Button label="Reset" style={commonBtnStyle} className="p-button-text" onClick={resetQuery} />
                </span>
                <span style={{ flex: 1 }} />
                {/*
                <span style={{ marginRight: "1rem" }}>
                    <Button label="List" style={commonBtnStyle} className="p-button-text orange" onClick={blankFn} />
                </span>
                */}
            </div>

            {/* ── Table ── */}
            <div style={{ marginLeft: "1rem", marginRight: "1rem", marginTop: "0.4rem", flex: 1, minHeight: 0, paddingBottom: "1rem" }}>
                <AFDataTable
                    preventUnrelatedRerender
                    size="small"
                    value={datasTBL}
                    loading={loadingTBL}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL}
                    onSelectionChange={onSelectionChangeTBL}
                    dataKey="id"
                    className="datatable-responsive"
                    emptyMessage=" "
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="flex"
                >
                    <AFColumn field="PO_CD"      header="PO"          headerClassName="t-header" />
                    <AFColumn field="ORDER_CD"   header="Order"       headerClassName="t-header" />
                    <AFColumn field="STYLE_NAME" header="Style"       headerClassName="t-header" />
                    <AFColumn field="VENDOR_NAME" header="Supplier"   headerClassName="t-header" />
                    <AFColumn field="MATL_NAME" header="Description"  headerClassName="t-header" />
                    <AFColumn field="COLOR"     header="Color"        headerClassName="t-header" />
                    <AFColumn field="SPEC"      header="Spec"         headerClassName="t-header" />
                    <AFColumn field="UNIT"      header="Unit"         headerClassName="t-header" bodyStyle={{ }} />
                    <AFColumn field="MATL_CD"   header="Matl Cd"      headerClassName="t-header" bodyStyle={{ }} />
                    <AFColumn field="CURR_CD"   header="Curr"         headerClassName="t-header" bodyStyle={{ }} />
                    <AFColumn field="MATL_PRICE" header="단가"        headerClassName="t-header" bodyStyle={{ textAlign: "right" }} body={(row) => serviceLib.formatNumber(row.MATL_PRICE, 2)} />
                    <AFColumn field="TOT_AMT"   header="가격"         headerClassName="t-header" bodyStyle={{ textAlign: "right" }} body={(row) => serviceLib.formatNumber(row.TOT_AMT, 2)} />
                    <AFColumn field="EXP_USEQTY" header="소요량"      headerClassName="t-header" bodyStyle={{ textAlign: "right" }} body={(row) => serviceLib.formatNumber(row.EXP_USEQTY)} />
                    <AFColumn field="EXP_POQTY" header="발주량"       headerClassName="t-header" bodyStyle={{ textAlign: "right" }} body={(row) => serviceLib.formatNumber(row.EXP_POQTY)} />
                    <AFColumn field="ORDER_DATE" header="발주일"      headerClassName="t-header" bodyStyle={{ }} body={(row) => serviceLib.dateFormat(row.ORDER_DATE)} />
                </AFDataTable>
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps?.location?.pathname === nextProps?.location?.pathname;
};

export default React.memo(S030516_MATERIAL_PO_LIST, comparisonFn);
