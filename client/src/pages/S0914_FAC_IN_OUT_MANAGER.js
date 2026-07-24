/* eslint-disable */
import React, { useState, useRef, useEffect, useMemo } from "react";
import { AFDataTable } from "../components/AFDataTable";
import { AFColumn } from "../components/AFColumn";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Tooltip } from "primereact/tooltip";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0914_FAC_IN_OUT_MANAGER } from "../service/service_biz/S0914_FAC_IN_OUT_MANAGER";

const S0914_FAC_IN_OUT_MANAGER = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0914Ref = useRef(null);
    if (!serviceS0914Ref.current) serviceS0914Ref.current = new ServiceS0914_FAC_IN_OUT_MANAGER();
    const serviceS0914 = serviceS0914Ref.current;

    const [loading, setLoading] = useState(false);
    const [loadingTop, setLoadingTop] = useState(false);
    const [loadingBottomLeft, setLoadingBottomLeft] = useState(false);
    const [loadingBottomRight, setLoadingBottomRight] = useState(false);
    const [loadingBottomMOQ, setLoadingBottomMOQ] = useState(false);
    const [loadingStockDialog, setLoadingStockDialog] = useState(false);

    const [buyerOptions, setBuyerOptions] = useState([]);
    const [poOptions, setPoOptions] = useState([]);
    const [orderOptions, setOrderOptions] = useState([]);
    const [buyer, setBuyer] = useState("");
    const [poCd, setPoCd] = useState("");
    const [orderCd, setOrderCd] = useState("");

    const [topList, setTopList] = useState([]);
    const [bottomLeftList, setBottomLeftList] = useState([]);
    const [bottomRightList, setBottomRightList] = useState([]);
    const [bottomMOQList, setBottomMOQList] = useState([]);
    const [stockDialogVisible, setStockDialogVisible] = useState(false);
    const [stockDialogRows, setStockDialogRows] = useState([]);
    const [stockDialogMatlCd, setStockDialogMatlCd] = useState("");

    const [selectedTopList, setSelectedTopList] = useState([]);

    const [datasTBL_KSV_PO_MRP2_COL, setDatasTBL_KSV_PO_MRP2_COL] = useState(
        [],
    );

    const dynamicColumnsTBL_KSV_PO_MRP2 = useMemo(
        () =>
            datasTBL_KSV_PO_MRP2_COL.map((col, i) => {
                var tHeader = `id_msg_${col.field_name}_KSV_ORDER_MST_dt`;
                var tHeaderStr =
                    col.header || serviceLib.getLocaleMessage(tHeader);
                return (
                    <AFColumn
                        key={`${col.field}_${i}`}
                        field={col.field}
                        className="af-col"
                        header={tHeaderStr}
                        style={{ width: "12rem" }}
                        bodyStyle={{ textAlign: "right" }}
                    ></AFColumn>
                );
            }),
        [datasTBL_KSV_PO_MRP2_COL, serviceLib],
    );

    useEffect(() => {
        const fetchCode = async () => {
            try {
                setLoading(true);
                const result = await serviceS0914.getBuyerCd();

                if (result && result.graphQLErrors) {
                    console.log(
                        "mgrQuery_S0914_getBuyerCd error =>",
                        result.graphQLErrors,
                    );
                    return;
                }

                const buyers = result && result.BUYER ? result.BUYER : [];

                const options = [
                    { label: "SELECT BUYER", value: "" },
                    ...buyers.map((row) => ({
                        label: row.BUYER_NAME,
                        value: row.BUYER_CD,
                    })),
                ];

                setBuyerOptions(options);
            } catch (err) {
                console.log("getBuyerCd() error =>", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCode();
    }, []);

    async function searchPoCd(buyerCd) {
        if (!buyerCd) return;
        console.log(buyerCd);
        try {
            setLoading(true);

            const result = await serviceS0914.getPoCd({ BUYER_CD: buyerCd });

            if (result && result.graphQLErrors) {
                alert(result.graphQLErrors[0].message);
                return;
            }

            const poCdList = result && result.PO_CD ? result.PO_CD : [];

            const options = [
                { label: "SELECT PO CD", value: "" },
                ...poCdList.map((row) => ({
                    label: row.PO_CD,
                    value: row.PO_CD,
                })),
            ];

            setPoOptions(options);
            setPoCd(options[0].value);
        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
        }
    }

    async function searchOrderCd(poCd) {
        if (!poCd) return;

        try {
            setLoading(true);

            const result = await serviceS0914.getOrderCd({ PO_CD: poCd });

            if (result && result.graphQLErrors) {
                alert(result.graphQLErrors[0].message);
                return;
            }

            const orderCdList =
                result && result.ORDER_CD ? result.ORDER_CD : [];

            const options = [
                { label: "SELECT ORDER CD", value: "" },
                ...orderCdList.map((row) => ({
                    label: row.ORDER_CD,
                    value: row.ORDER_CD,
                })),
            ];

            setOrderOptions(options);
            setOrderCd(options[0].value);
        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
        }
    }

    async function searchTopList() {
        try {
            setLoadingTop(true);

            if (!poCd) {
                alert("PO# is required input value.");
                return;
            }

            const params = {
                PO_CD: (poCd || "").trim(),
                ORDER_CD: (orderCd || "").trim(),
                SUPPLIER: (qrySupplierRef.current || "").trim(),
                DESCRIPTION: (qryDescriptionRef.current || "").trim(),
                UNIT: (qryUnitRef.current || "").trim(),
                MATL_CD: (qryMatlCdRef.current || "").trim(),
                COLOR: (qryColorRef.current || "").trim(),
                SPEC: (qrySpecRef.current || "").trim(),
            };

            const result = await serviceS0914.getTopList(params);

            if (result && result.graphQLErrors) {
                console.log(
                    "getTopList error =>",
                    result.graphQLErrors[0].message,
                );
                alert(result.graphQLErrors[0].message);
                return;
            }

            var tObj = { ...result[0] };
            var tColArray = [];
            tObj.DATAS?.forEach((col1, i1) => {
                var tObj1 = {};
                tObj1.field = col1.ORDER_CD;
                tObj1.field_name = col1.ORDER_CD;
                tColArray.push(tObj1);

                var tObjMainUse = {};
                tObjMainUse.field = `${col1.ORDER_CD}_MAIN_USE`;
                tObjMainUse.field_name = `${col1.ORDER_CD}_MAIN_USE`;
                tObjMainUse.header = "MAIN USE";
                tColArray.push(tObjMainUse);
            });
            setDatasTBL_KSV_PO_MRP2_COL(tColArray);

            var tDataArray = [];

            console.log(result);
            result?.forEach((col2, i2) => {
                var tObj2 = { ...col2 };
                var totalMainUse = 0;
                tObj2.DATAS?.forEach((col3, i3) => {
                    tObj2[`${col3.ORDER_CD}`] = col3.ORDER_QTY;
                    tObj2[`${col3.ORDER_CD}_MAIN_USE`] = col3.MAIN_USE;

                    const parsedMainUse = Number(col3.MAIN_USE);
                    if (!Number.isNaN(parsedMainUse)) {
                        totalMainUse += parsedMainUse;
                    }
                });

                tObj2.MAINUSE = totalMainUse;
                tDataArray.push(tObj2);
            });

            setTopList(tDataArray);
        } catch (e) {
            console.log("searchTopList exception =>", e);
            alert(e);
        } finally {
            setLoadingTop(false);
        }
    }

    async function searchBottom(arg) {
        if (!arg) return;

        try {
            setLoadingBottomLeft(true);
            setLoadingBottomRight(true);
            setLoadingBottomMOQ(true);

            const params = {
                PO_CD: poCd,
                MATL_CD: arg.MATL_CD,
                UNIT: arg.UNIT,
                SHORTOVER: String(arg.SHORTOVER),
                FACINQTY: String(arg.FACIN),
            };

            console.log(params);

            const [leftResult, rightResult, moqResult] = await Promise.all([
                serviceS0914
                    .getBottomLeftList(params)
                    .finally(() => setLoadingBottomLeft(false)),
                serviceS0914
                    .getBottomRightList(params)
                    .finally(() => setLoadingBottomRight(false)),
                serviceS0914
                    .getBottomMOQList(params)
                    .finally(() => setLoadingBottomMOQ(false)),
            ]);

            if (leftResult && leftResult.graphQLErrors) {
                console.log(
                    "getBottomLeftList error =>",
                    leftResult.graphQLErrors[0].message,
                );
                alert(leftResult.graphQLErrors[0].message);
                return;
            }
            if (rightResult && rightResult.graphQLErrors) {
                console.log(
                    "getBottomRightList error =>",
                    rightResult.graphQLErrors[0].message,
                );
                alert(rightResult.graphQLErrors[0].message);
                return;
            }
            if (moqResult && moqResult.graphQLErrors) {
                console.log(
                    "getBottomMOQList error =>",
                    moqResult.graphQLErrors[0].message,
                );
                alert(moqResult.graphQLErrors[0].message);
                return;
            }
            setBottomLeftList(leftResult);
            setBottomRightList(rightResult);
            setBottomMOQList(moqResult);
        } catch (e) {
            console.log("searchBottom exception =>", e);
            alert(e);
        } finally {
            setLoadingBottomLeft(false);
            setLoadingBottomRight(false);
            setLoadingBottomMOQ(false);
        }
    }

    async function onStockCellDoubleClick(row) {
        const currentPoCd = (poCd || "").trim();
        const matlCd = (row?.MATL_CD || "").trim();

        if (!currentPoCd) {
            alert("PO# is required input value.");
            return;
        }

        if (!matlCd) {
            alert("Matl Cd is empty.");
            return;
        }

        try {
            setStockDialogVisible(true);
            setLoadingStockDialog(true);
            setStockDialogRows([]);
            setStockDialogMatlCd(matlCd);

            const result = await serviceS0914.getStockUseList({
                PO_CD: currentPoCd,
                MATL_CD: matlCd,
            });

            if (result && result.graphQLErrors) {
                alert(result.graphQLErrors[0].message);
                return;
            }

            setStockDialogRows(Array.isArray(result) ? result : []);
        } catch (e) {
            console.log("onStockCellDoubleClick exception =>", e);
            alert(e);
        } finally {
            setLoadingStockDialog(false);
        }
    }

    async function exportReport() {
        try {
            setLoading(true);

            const params = {
                PO_CD: poCd,
            };

            let result = await serviceS0914.exportReport(params);

            const { fileUrl, fileName } = parseDownloadResult(
                result,
                "exportReport",
            );
            serviceLib.downloadFile(fileUrl, fileName);
        } catch (e) {
            console.log("searchBottom exception =>", e);
            alert(e?.message || e);
        } finally {
            setLoading(false);
        }
    }

    async function exportReport2() {
        try {
            setLoading(true);

            const params = {
                PO_CD: (poCd || "").trim(),
                ORDER_CD: (orderCd || "").trim(),
                SUPPLIER: (qrySupplierRef.current || "").trim(),
                DESCRIPTION: (qryDescriptionRef.current || "").trim(),
                UNIT: (qryUnitRef.current || "").trim(),
                MATL_CD: (qryMatlCdRef.current || "").trim(),
                COLOR: (qryColorRef.current || "").trim(),
                SPEC: (qrySpecRef.current || "").trim(),
            };

            let result = await serviceS0914.exportReport2(params);

            const { fileUrl, fileName } = parseDownloadResult(
                result,
                "exportReport2",
            );
            serviceLib.downloadFile(fileUrl, fileName);
        } catch (e) {
            console.log("exportReport2 exception =>", e);
            alert(e?.message || e);
        } finally {
            setLoading(false);
        }
    }

    function parseDownloadResult(result, actionName) {
        if (result?.graphQLErrors?.[0]?.message) {
            throw new Error(result.graphQLErrors[0].message);
        }

        if (result instanceof Error) {
            throw result;
        }

        if (!Array.isArray(result) || result.length === 0) {
            console.log(`${actionName} invalid result =>`, result);
            throw new Error("No file was returned from server.");
        }

        const code = String(result?.[0]?.CODE || "");
        const parts = code.split("?");

        if (!code || parts.length < 3 || !parts[1] || !parts[2]) {
            console.log(`${actionName} invalid CODE =>`, result);
            throw new Error("Download file information is invalid.");
        }

        return {
            fileName: parts[1].toString(),
            fileUrl: parts[2].toString(),
        };
    }

    function windowOpen(where) {
        var tMatlCd = "";
        if (selectedTopList.MATL_CD) tMatlCd = selectedTopList.MATL_CD;

        const params = new URLSearchParams({
            BUYER_CD: buyer || "",
            PO_CD: poCd || "",
            ORDER_CD: orderCd || "",
            MATL_CD: tMatlCd || "",
        });

        let message = null;
        if (where === "FAC_OUT_RECORD") {
            message = {
                key: "5-6",
                label: "Fac-Out Record",
                url1: `S0520_FACOUT_RECORD?${params.toString()}`,
            };
        } else if (where === "FAC_IN_LIST") {
            // message = { key: '5-4', label: 'FAC-IN List', url1: `S051901_FACIN_LIST?${params.toString()}` };
            message = {
                key: "5-3",
                label: "Insepection Record",
                url1: `S0519_INSPECT_REPORT?${params.toString()}`,
            };
        } else {
            return;
        }

        window.parent.postMessage({ func: "call_url", message }, "*");
    }

    const qrySupplierRef = useRef("");
    const qryDescriptionRef = useRef("");
    const qryUnitRef = useRef("");
    const qryMatlCdRef = useRef("");
    const qryColorRef = useRef("");
    const qrySpecRef = useRef("");

    return (
        <div className="p-fluid af-div-main">
            {/* 상단 검색 영역 + 버튼 */}
            <div
                className="af-div-first"
                style={{
                    width: "123rem",
                    height: "2rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "2rem",
                    boxSizing: "border-box",
                    padding: "1rem",
                    marginTop: "1rem",
                }}
            >
                {/* Buyer */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                    }}
                >
                    <span style={{ minWidth: 30 }}>Buyer</span>
                    <Dropdown
                        value={buyer}
                        options={buyerOptions}
                        onChange={(e) => {
                            const next = e.value;
                            setBuyer(next);
                            searchPoCd(next);
                        }}
                        style={{ width: 200 }}
                        filter
                    />
                </div>

                {/* PO */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                    }}
                >
                    <span style={{ minWidth: 15 }}>PO#</span>
                    <Dropdown
                        value={poCd}
                        options={poOptions}
                        onChange={(e) => {
                            setPoCd(e.value);
                            searchOrderCd(e.value);
                        }}
                        style={{ width: 100 }}
                        filter
                        editable
                    />
                </div>

                {/* Order# */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                    }}
                >
                    <span style={{ minWidth: 40 }}>Order#</span>
                    <Dropdown
                        value={orderCd}
                        options={orderOptions}
                        onChange={(e) => setOrderCd(e.value)}
                        style={{ width: 100 }}
                        filter
                    />
                </div>

                {/* spacer */}
                <div style={{ flex: 1 }} />

                {/* 버튼 5개 */}
                <div style={{ display: "flex", gap: "0.25rem" }}>
                    <Tooltip
                        className="menuCodeTooltip"
                        target={`#btnSearch`}
                        content={`Alt+S`}
                        position="bottom"
                    />
                    <Button
                        style={{ width: 90 }}
                        label={
                            <span>
                                Search(<u>S</u>)
                            </span>
                        }
                        accessKey="S"
                        id="btnSearch"
                        onClick={() => searchTopList()}
                    />

                    <Button
                        style={{ width: 90 }}
                        className="p-button-text orange"
                        label="FAC IN Record"
                        onClick={() => windowOpen("FAC_IN_LIST")}
                    />

                    <Button
                        style={{ width: 90 }}
                        className="p-button-text orange"
                        label="FAC OUT Record"
                        onClick={() => windowOpen("FAC_OUT_RECORD")}
                    />
                    <Button
                        style={{ width: 90 }}
                        className="p-button-text green"
                        label="Excel"
                        onClick={() =>
                            serviceLib.exportExcel(
                                "FAC_IO_MANAGER",
                                "FAC_IO_MANAGER",
                                topList,
                            )
                        }
                    />
                    <Button
                        style={{ width: 90 }}
                        className="p-button-text green"
                        label="List"
                        onClick={() => exportReport()}
                    />

                    <Button
                        style={{ width: 90 }}
                        className="p-button-text green"
                        label="List2"
                        onClick={() => exportReport2()}
                    />
                </div>
            </div>
            <div
                className="af-div-first"
                style={{
                    width: "123rem",
                    height: "2rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "2rem",
                    boxSizing: "border-box",
                    padding: "1rem",
                }}
            >
                <div style={{ display: "flex", gap: "1rem" }}>
                    <span>Supplier</span>
                    <InputText
                        style={{ width: "15rem" }}
                        defaultValue=""
                        onChange={(e) => {
                            qrySupplierRef.current = e.target.value;
                        }}
                    />
                    <span>Description</span>
                    <InputText
                        style={{ width: "20rem" }}
                        defaultValue=""
                        onChange={(e) => {
                            qryDescriptionRef.current = e.target.value;
                        }}
                    />
                    <span>Unit</span>
                    <InputText
                        style={{ width: "5rem" }}
                        defaultValue=""
                        onChange={(e) => {
                            qryUnitRef.current = e.target.value;
                        }}
                    />
                    <span>Matl#</span>
                    <InputText
                        style={{ width: "8rem" }}
                        defaultValue=""
                        onChange={(e) => {
                            qryMatlCdRef.current = e.target.value;
                        }}
                    />
                    <span>Color</span>
                    <InputText
                        style={{ width: "20rem" }}
                        defaultValue=""
                        onChange={(e) => {
                            qryColorRef.current = e.target.value;
                        }}
                    />
                    <span>Spec</span>
                    <InputText
                        style={{ width: "20rem" }}
                        defaultValue=""
                        onChange={(e) => {
                            qrySpecRef.current = e.target.value;
                        }}
                    />
                </div>
            </div>

            {/* 상단 1단 그리드 */}
            <div
                className="af-div-first"
                style={{
                    width: "123rem",
                    height: "15rem",
                    marginBottom: "0.5rem",
                    padding: "0.5rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    value={topList}
                    dataKey="id"
                    size="small"
                    loading={loadingTop}
                    showGridlines
                    selectionMode="checkbox"
                    scrollable
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    rowHover
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    responsiveLayout="scroll"
                    onSelectionChange={(e) => {
                        const next = e.value;
                        setSelectedTopList(next);
                        searchBottom(next);
                    }}
                    selection={selectedTopList}
                >
                    <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerClassName="t-header" ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" />
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" />
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Desc" />
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" />
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" />
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" />

                    <AFColumn field="MRPQTY" headerClassName="t-header" header="MRP QTY" className="text-right" body={(row) => serviceLib.formatNumber(row.MRPQTY, 2)} />
                    <AFColumn field="STSIN" headerClassName="t-header" header="STS IN" className="text-right" body={(row) => serviceLib.formatNumber(row.STSIN, 2)} />
                    <AFColumn field="STSOUT" headerClassName="t-header" header="STS OUT" className="text-right" body={(row) => serviceLib.formatNumber(row.STSOUT, 2)} />
                    {/*<AFColumn field="ERROR" headerClassName="t-header" header="ERROR" className="text-right" body={(row) => serviceLib.formatNumber(row.ERROR)} />*/}
                    <AFColumn field="SHIPQTY" headerClassName="t-header" header="Ship Qty" className="text-right" body={(row) => serviceLib.formatNumber(row.SHIPQTY)} />
                    <AFColumn
                        field="STOCK"
                        headerClassName="t-header"
                        header="STOCK"
                        className="text-right orange"
                        body={(row) => (
                            <div
                                style={{ width: "100%", cursor: "pointer" }}
                                onDoubleClick={(e) => {
                                    e.stopPropagation();
                                    onStockCellDoubleClick(row);
                                }}
                                title="Double click to show stock detail"
                            >
                                {serviceLib.formatNumber(row.STOCK)}
                            </div>
                        )}
                    />
                    <AFColumn field="FACIN" headerClassName="t-header" header="FAC IN" className="text-right" body={(row) => serviceLib.formatNumber(row.FACIN)} />
                    <AFColumn field="SHORTOVER" headerClassName="t-header" header="SHORT/OVER" className="text-right" body={(row) => serviceLib.formatNumber(row.SHORTOVER)} />
                    <AFColumn field="DEFECT_A" headerClassName="t-header" header="DEFECT(A)" className="text-right" body={(row) => serviceLib.formatNumber(row.DEFECT_A)} />
                    <AFColumn field="DEFECT" headerClassName="t-header" header="DEFECT(E)" className="text-right" body={(row) => serviceLib.formatNumber(row.DEFECT)} />
                    <AFColumn field="MAINUSE" headerClassName="t-header" header="MAIN USE" className="text-right" body={(row) => serviceLib.formatNumber(row.MAINUSE)} />
                    <AFColumn field="OTHER" headerClassName="t-header" header="OTHER" className="text-right" body={(row) => serviceLib.formatNumber(row.OTHER)} />
                    <AFColumn field="TABLE_SHORT" headerClassName="t-header" header="Table Shortage" className="text-right" body={(row) => serviceLib.formatNumber(row.TABLE_SHORT)} />
                    <AFColumn field="KEEP_STOCK" headerClassName="t-header" header="Keep Stock" className="text-right" body={(row) => serviceLib.formatNumber(row.KEEP_STOCK)} />
                    <AFColumn field="LOST" headerClassName="t-header" header="Lost" className="text-right" body={(row) => serviceLib.formatNumber(row.LOST)} />
                    <AFColumn field="LINE_RETURN" headerClassName="t-header" header="Line Return" className="text-right" body={(row) => serviceLib.formatNumber(row.LINE_RETURN)} />
                    <AFColumn field="FACOUT" headerClassName="t-header" header="FAC OUT" className="text-right" body={(row) => serviceLib.formatNumber(row.FACOUT)} />
                    <AFColumn field="MOQ" headerClassName="t-header" header="MOQ+OVERIN" className="text-right" body={(row) => serviceLib.formatNumber(row.MOQ)} />
                    <AFColumn field="REMAIN_E" headerClassName="t-header" header="REMAIN(E)" className="text-right" body={(row) => serviceLib.formatNumber(row.REMAIN_E)} />
                    <AFColumn field="REMAIN_A" headerClassName="t-header" header="REMAIN(A)" className="text-right" body={(row) => serviceLib.formatNumber(row.REMAIN_A)} />
                    <AFColumn field="DELAYREMARK" headerClassName="t-header" header="Delay Report Remark" />
                    <AFColumn field="PRICE" headerClassName="t-header" header="PRICE($)" className="text-right" body={(row) => serviceLib.formatNumber(row.PRICE, 2)} />

                    {dynamicColumnsTBL_KSV_PO_MRP2}
                </AFDataTable>
            </div>

            {/* 하단 2단 그리드 영역 (좌/우) */}
            <div
                className="af-div-first"
                style={{
                    width: "123rem",
                    height: "25rem",
                    display: "flex",
                    gap: "0.5rem",
                }}
            >
                {/* 하단 좌측 테이블 */}
                <div
                    style={{
                        flex: 1,
                        padding: 5,
                        height: "24rem",
                        boxSizing: "border-box",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        value={bottomLeftList}
                        dataKey="id"
                        size="small"
                        loading={loadingBottomLeft}
                        showGridlines
                        scrollable
                        scrollHeight="24rem"
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        rowHover
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        responsiveLayout="scroll"
                    >
                        {/*<AFColumn field="SHIPMENTCD" headerClassName="t-header" header="Shipment#" />*/}
                        <AFColumn field="STSOUT_DATE" headerClassName="t-header" header="STSOUT Date" body={(row) => serviceLib.dateFormat(row.STSOUT_DATE)} />
                        <AFColumn field="PACKCD" headerClassName="t-header" header="Pack#" />
                        <AFColumn field="ATA" headerClassName="t-header" header="ATA" body={(row) => serviceLib.dateFormat(row.ATA)} />
                        <AFColumn field="BLNO" headerClassName="t-header" header="BL#" />
                        <AFColumn field="DELIVERY" headerClassName="t-header" header="Delivery#" />
                        {/*<AFColumn field="CTNO" headerClassName="t-header" header="C/T#" />*/}
                        {/*<AFColumn field="UNIT" headerClassName="t-header" header="Unit" />*/}
                        <AFColumn field="SHIPQTY" headerClassName="t-header" header="Ship Qty" className="text-right" body={(row) => serviceLib.formatNumber(row.SHIPQTY)} />
                        <AFColumn field="SHORTOVER" headerClassName="t-header" header="Short/Over" className="text-right" body={(row) => serviceLib.formatNumber(row.SHORTOVER) } />
                        <AFColumn field="DEFECT" headerClassName="t-header" header="Defect" className="text-right" body={(row) => serviceLib.formatNumber(row.DEFECT)} />
                        <AFColumn field="FACINQTY" headerClassName="t-header" header="FacIn Qty" className="text-right" body={(row) => serviceLib.formatNumber(row.FACINQTY) } />
                        <AFColumn field="LOCATION" headerClassName="t-header" header="Location" />
                        <AFColumn field="MC" headerClassName="t-header" header="M/C" />
                    </AFDataTable>
                </div>

                {/* 하단 우측 테이블 */}
                <div
                    style={{
                        flex: 1,
                        padding: 5,
                        height: "24rem",
                        boxSizing: "border-box",
                        display: "flex",
                        gap: "0.5rem",
                    }}
                >
                    <div style={{ flex: 1 }}>
                        {/* 왼쪽 테이블 */}
                        <AFDataTable preventUnrelatedRerender
                            value={bottomRightList}
                            dataKey="id"
                            size="small"
                            loading={loadingBottomRight}
                            showGridlines
                            scrollable
                            scrollHeight="24rem"
                            tableStyle={{ tableLayout: "fixed" }}
                            resizableColumns
                            columnResizeMode="expand"
                            rowHover
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" "
                            responsiveLayout="scroll"
                        >
                            <AFColumn field="OUTDATE" headerClassName="t-header" header="Out Date" body={(row) => serviceLib.dateFormat(row.OUTDATE) } />
                            <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order#" />
                            <AFColumn field="UNIT" headerClassName="t-header" header="Unit" />
                            <AFColumn field="OUTQTY" headerClassName="t-header" header="Out.Qty" className="text-right" body={(row) => serviceLib.formatNumber(row.OUTQTY) } />
                            <AFColumn
                                field="PURPOSE"
                                headerClassName="t-header"
                                header="Purpose"
                                body={(row) => row.PURPOSE ?? row.purpose ?? ""}
                            />
                            <AFColumn field="REMARK" headerClassName="t-header" header="Remark" />
                        </AFDataTable>
                    </div>
                    <div style={{ flex: 1 }}>
                        {/* 오른쪽 테이블 */}
                        <AFDataTable preventUnrelatedRerender
                            value={bottomMOQList}
                            dataKey="id"
                            size="small"
                            loading={loadingBottomMOQ}
                            showGridlines
                            scrollable
                            scrollHeight="24rem"
                            tableStyle={{ tableLayout: "fixed" }}
                            resizableColumns
                            columnResizeMode="expand"
                            rowHover
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" "
                            responsiveLayout="scroll"
                        >
                            <AFColumn field="USE_PO_CD" headerClassName="t-header" header="Use PO#" />
                            <AFColumn field="USE_ORDER_CD" headerClassName="t-header" header="Order#" />
                            <AFColumn field="USE_QTY" headerClassName="t-header" header="Use Qty" className="text-right" body={(row) => serviceLib.formatNumber(row.USE_QTY) } />
                            <AFColumn field="USE_DATETIME" headerClassName="t-header" header="Date" body={(row) => serviceLib.dateFormat(row.USE_DATETIME) } />
                        </AFDataTable>
                    </div>
                </div>
            </div>

            <Dialog
                header={`Stock Detail (PO#: ${poCd || ""} / Matl#: ${stockDialogMatlCd || ""})`}
                visible={stockDialogVisible}
                modal
                style={{ width: "120rem" }}
                contentStyle={{ height: "32rem" }}
                onHide={() => {
                    setStockDialogVisible(false);
                }}
            >
                <div style={{ height: "100%" }}>
                <AFDataTable preventUnrelatedRerender
                    value={stockDialogRows}
                    dataKey="id"
                    size="small"
                    loading={loadingStockDialog}
                    showGridlines
                    scrollable
                    scrollHeight="28rem"
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    rowHover
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    responsiveLayout="scroll"
                >
                    <AFColumn field="WARE_NAME" headerClassName="t-header" header="W/H" />
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO No" />
                    <AFColumn field="PO_SEQ" headerClassName="t-header" header="Seq" className="text-right" />
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order#" />
                    <AFColumn field="USE_ORDER_CD" headerClassName="t-header" header="Use Order#" />
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Stock Matl Cd" />
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" />
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Desc" />
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" />
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" />
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" />
                    <AFColumn field="RACK" headerClassName="t-header" header="Rack" />
                    <AFColumn field="LOCATION" headerClassName="t-header" header="Location" />
                    <AFColumn field="USE_QTY" headerClassName="t-header" header="Use Qty" className="text-right" body={(row) => serviceLib.formatNumber(row.USE_QTY)} />
                    <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Org. Qty" className="text-right" body={(row) => serviceLib.formatNumber(row.STOCK_QTY)} />
                    <AFColumn field="STOCK_IDX" headerClassName="t-header" header="stock idx" />
                </AFDataTable>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0914_FAC_IN_OUT_MANAGER, comparisonFn);
