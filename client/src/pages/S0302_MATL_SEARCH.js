/* eslint-disable */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AFDataTable } from "../components/AFDataTable";
import { AFColumn } from "../components/AFColumn";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { InputText } from "primereact/inputtext";
import axios from "axios";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0302_MATL_SEARCH } from "../service/service_biz/ServiceS0302_MATL_SEARCH";
import { ServiceS0301_MATL_RECORD } from "../service/service_biz/ServiceS0301_MATL_RECORD";

import "./page_common.scss";

const emptyQRY_KCD_MATL_MST = {
    MATL_NAME: "",
    COLOR: "",
    MATL_CD: "",
    SPEC: "",
    VENDOR_CD: "",
};

const emptyTBL_KCD_MATL_MST = {
    id: 0,
    MATL_TYPE2: "",
    MATL_CD: "",
    MATL_TYPE: "",
    MATL_TYPE_NAME: "",
    VENDOR_CD: "",
    VENDOR_NAME: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    UNIT_NAME: "",
    MATL_PRICE: "",
    CURR_CD: "",
    S_MATL_PRICE: "",
    S_CURR_CD: "",
    WEIGHT: "",
    BOX_UNIT: "",
    BOX_UNIT_NAME: "",
    STATUS_CD: "",
    STATUS_NAME: "",
    STATUS_CD_NAME: "",
    VENDOR_STATUS_CD: "",
    UPD_USER: "",
    REG_USER: "",
    VENDOR_TYPE: "",
    HS_CD: "",
    ADD_RATE: "",
    ADD_AMT: "",
    ADD_LOSS: "",
    REG_DATETIME: "",
};

const emptyTBL_KCD_MATL_MST1 = {
    id: 0,
    MATL_CD: "",
    PROD_CD: "",
    STYLE_NAME: "",
    NET: "",
    LOSS: "",
    USE_SIZE: "",
    REMARK: "",
    ORDER_CD: "",
    PO_CD: "",
};

const S0302_MATL_SEARCH = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0302_MATL_SEARCHRef = useRef(null);
    if (!serviceS0302_MATL_SEARCHRef.current) serviceS0302_MATL_SEARCHRef.current = new ServiceS0302_MATL_SEARCH();
    const serviceS0302_MATL_SEARCH = serviceS0302_MATL_SEARCHRef.current;
    const serviceS0301_MATL_RECORDRef = useRef(null);
    if (!serviceS0301_MATL_RECORDRef.current) serviceS0301_MATL_RECORDRef.current = new ServiceS0301_MATL_RECORD();
    const serviceS0301_MATL_RECORD = serviceS0301_MATL_RECORDRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* QRY KCD_MATL_MST*/
    const [dataQRY_KCD_MATL_MST, setDataQRY_KCD_MATL_MST] = useState(
        emptyQRY_KCD_MATL_MST,
    );

    const onInputChangeQRY_KCD_MATL_MST_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };

        let tTypeVal = _dataQRY_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
    };

    const onInputChangeQRY_KCD_MATL_MST_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };

        let tTypeVal = _dataQRY_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
    };

    const onInputChangeQRY_KCD_MATL_MST_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };

        let tTypeVal = _dataQRY_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
    };

    const onInputChangeQRY_KCD_MATL_MST_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };

        let tTypeVal = _dataQRY_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
    };

    const onInputChangeQRY_KCD_MATL_MST_VENDOR_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };

        let tTypeVal = _dataQRY_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
    };

    /*TABLE KCD_MATL_MST */
    // DEFINE DATAGRID : TBL_KCD_MATL_MST
    const [datasTBL_KCD_MATL_MST, setDatasTBL_KCD_MATL_MST] = useState([]);
    const dt_TBL_KCD_MATL_MST = useRef(null);
    const [dataTBL_KCD_MATL_MST, setDataTBL_KCD_MATL_MST] = useState(
        emptyTBL_KCD_MATL_MST,
    );
    const [selectedTBL_KCD_MATL_MST, setSelectedTBL_KCD_MATL_MST] = useState(
        [],
    );
    const [flagSelectModeTBL_KCD_MATL_MST, setFlagSelectModeTBL_KCD_MATL_MST] =
        useState(false);
    const [loadingTBL_KCD_MATL_MST, setLoadingTBL_KCD_MATL_MST] =
        useState(false);
    const [selectedTopColumnField, setSelectedTopColumnField] = useState("");
    const topTableColumnFields = useMemo(() => [
        "__checkbox__",
        "MATL_TYPE_NAME",
        "MATL_TYPE2_NAME",
        "MATL_CD",
        "VENDOR_NAME",
        "MATL_NAME",
        "COLOR",
        "SPEC",
        "UNIT",
        "MATL_PRICE",
        "CURR_CD",
        "S_MATL_PRICE",
        "S_CURR_CD",
        "STATUS_CD",
        "WEIGHT",
        "BOX_UNIT",
        "UPD_USER",
        "REG_USER",
        "VENDOR_TYPE",
        "HS_CD",
        "ADD_RATE",
        "ADD_AMT",
        "ADD_LOSS",
        "REG_DATETIME",
        "rep_matl_cd",
    ], []);

    // DATAGRID CODE : TBL_KCD_MATL_MST

    const onRowClick1TBL_KCD_MATL_MST = useCallback((argData0) => {
        if (!argData0) return;
        var argData = {};
        argData = argData0;

        let argTBL_KCD_MATL_MST = argData;

        setDataTBL_KCD_MATL_MST(argTBL_KCD_MATL_MST);

        var tObj = { ...dataQRY_KCD_MATL_MST };
        tObj.MATL_CD = argData.MATL_CD;

        serviceS0302_MATL_SEARCH
            .mgrQueryTBL_KCD_MATL_MST1(tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQueryTBL_KCD_MATL_MST1() call => " + data.length,
                    );

                    var tRetArray = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.SEQ = i + 1;
                        return tObj;
                    });

                    setDatasTBL_KCD_MATL_MST1(tRetArray);
                } else {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_MATL_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    }, [dataQRY_KCD_MATL_MST, serviceS0302_MATL_SEARCH]);

    const onRowClickTBL_KCD_MATL_MST = useCallback((event) => {
        if (flagSelectModeTBL_KCD_MATL_MST) return;
        const clickedCell = event?.originalEvent?.target?.closest?.("td");
        const rawCellIndex = clickedCell?.cellIndex;
        if (typeof rawCellIndex !== "number") return;

        // AFDataTable adds an index column at position 0, so shift by 1.
        const columnIndex = rawCellIndex - 1;
        if (columnIndex < 0 || columnIndex >= topTableColumnFields.length) return;

        const field = topTableColumnFields[columnIndex];
        if (!field || field === "__checkbox__") return;
        setSelectedTopColumnField(field);
    }, [flagSelectModeTBL_KCD_MATL_MST, topTableColumnFields]);

    const onCellClickTBL_KCD_MATL_MST = useCallback((event) => {
        const field = event?.field || event?.column?.props?.field || "";
        if (!field || field === "__checkbox__") return;

        setSelectedTopColumnField(field);
    }, []);

    const getTopColumnClassName = useCallback((field) => {
        return "";
    }, []);

    const getTopHeaderClassName = useCallback((field, baseClassName = "t-header") => {
        return baseClassName;
    }, []);

    const searchTBL_KCD_MATL_MST = () => {
        clearSelectedTBL_KCD_MATL_MST();

        setDatasTBL_KCD_MATL_MST([]);

        setLoadingTBL_KCD_MATL_MST(true);

        var tQryObj = {};
        tQryObj.MATL_CD = dataQRY_KCD_MATL_MST.MATL_CD;
        tQryObj.MATL_NAME = dataQRY_KCD_MATL_MST.MATL_NAME;
        tQryObj.COLOR = dataQRY_KCD_MATL_MST.COLOR;
        tQryObj.SPEC = dataQRY_KCD_MATL_MST.SPEC;
        tQryObj.VENDOR_CD = dataQRY_KCD_MATL_MST.VENDOR_CD;
        tQryObj.STATUS_CD = "";
        tQryObj.MATL_TYPE = "";

        serviceS0301_MATL_RECORD
            .mgrQueryTBL_KCD_MATL_MST(tQryObj)
            .then((data) => {
                setLoadingTBL_KCD_MATL_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.message !== "") alert(data.message);
                    var tArray = [];
                    data.datas.forEach((col, i) => {
                        var tObj = { ...col };
                        tArray.push(tObj);
                    });
                    setDatasTBL_KCD_MATL_MST(tArray);
                } else {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_MATL_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const handleSearchInputKeyDown = (e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        searchTBL_KCD_MATL_MST();
    };

    const search_EXCEL = () => {
        if (
            typeof selectedTBL_KCD_MATL_MST.MATL_CD === "undefined" ||
            selectedTBL_KCD_MATL_MST.MATL_CD === ""
        )
            return;
        var tObj = {};
        tObj.MATL_CD = selectedTBL_KCD_MATL_MST.MATL_CD;

        setLoadingTBL_KCD_MATL_MST(true);

        serviceS0302_MATL_SEARCH.mgrQuery_EXCEL(tObj).then((data) => {
            setLoadingTBL_KCD_MATL_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    if (data[0].CODE.includes("SUCC")) {
                        serviceLib.downloadFile(
                            data[0].CODE.split("?")[2].toString(),
                            data[0].CODE.split("?")[1].toString(),
                        );
                    }
                }
            } else {
                console.log(
                    "ServiceNawooAll.mgrQueryTBL_KCD_MATL_MST()error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const clearSelectedTBL_KCD_MATL_MST = () => {
        setSelectedTBL_KCD_MATL_MST([]);
        setFlagSelectModeTBL_KCD_MATL_MST(false);
    };

    /**TABLE KCD_MATL_MST1 */
    // DEFINE DATAGRID : TBL_KCD_MATL_MST1
    const [datasTBL_KCD_MATL_MST1, setDatasTBL_KCD_MATL_MST1] = useState([]);
    const dt_TBL_KCD_MATL_MST1 = useRef(null);
    const [dataTBL_KCD_MATL_MST1, setDataTBL_KCD_MATL_MST1] = useState(
        emptyTBL_KCD_MATL_MST1,
    );
    const [selectedTBL_KCD_MATL_MST1, setSelectedTBL_KCD_MATL_MST1] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KCD_MATL_MST1,
        setFlagSelectModeTBL_KCD_MATL_MST1,
    ] = useState(false);

    // DATAGRID CODE : TBL_KCD_MATL_MST1

    const onRowClick1TBL_KCD_MATL_MST1 = useCallback((argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KCD_MATL_MST1 = argData;

        setDataTBL_KCD_MATL_MST1(argTBL_KCD_MATL_MST1);
    }, []);

    const onRowClickTBL_KCD_MATL_MST1 = useCallback((event) => {
        let argTBL_KCD_MATL_MST1 = event.data;
        if (flagSelectModeTBL_KCD_MATL_MST1) return;
    }, [flagSelectModeTBL_KCD_MATL_MST1]);

    const handleSelectionChangeTBL_KCD_MATL_MST = useCallback((e) => {
        setSelectedTBL_KCD_MATL_MST(e.value);
        onRowClick1TBL_KCD_MATL_MST(e.value);
    }, [onRowClick1TBL_KCD_MATL_MST]);

    const handleSelectionChangeTBL_KCD_MATL_MST1 = useCallback((e) => {
        setSelectedTBL_KCD_MATL_MST1(e.value);
        onRowClick1TBL_KCD_MATL_MST1(e.value);
    }, [onRowClick1TBL_KCD_MATL_MST1]);

    const getStatusText = useCallback((rowData) => {
        const matlStatusCd = String(rowData?.STATUS_CD || "").trim();
        const vendorStatusCd = String(rowData?.VENDOR_STATUS_CD || "").trim();
        const statusName = String(
            rowData?.STATUS_CD_NAME || rowData?.STATUS_NAME || "",
        ).trim().toLowerCase();

        if (
            (matlStatusCd !== "" && matlStatusCd !== "0") ||
            (vendorStatusCd !== "" && vendorStatusCd !== "0") ||
            statusName === "unusable"
        ) {
            return "Unusable";
        }

        return rowData?.STATUS_CD_NAME || rowData?.STATUS_NAME || rowData?.STATUS_CD || "";
    }, []);

    const getRowClassName = useCallback((rowData) => {
        const matlStatusCd = String(rowData?.STATUS_CD || "").trim();
        const vendorStatusCd = String(rowData?.VENDOR_STATUS_CD || "").trim();
        const statusName = String(
            rowData?.STATUS_CD_NAME || rowData?.STATUS_NAME || "",
        ).trim().toLowerCase();

        return (matlStatusCd !== "" && matlStatusCd !== "0") ||
            (vendorStatusCd !== "" && vendorStatusCd !== "0") ||
            statusName === "unusable"
            ? "unusable-row"
            : "";
    }, []);

    const matlTable = useMemo(() => (
        <AFDataTable preventUnrelatedRerender
            ref={dt_TBL_KCD_MATL_MST}
            size="small"
            value={datasTBL_KCD_MATL_MST}
            loading={loadingTBL_KCD_MATL_MST}
            tableStyle={{ tableLayout: "fixed" }}
            resizableColumns
            columnResizeMode="expand"
            showGridlines
            selection={selectedTBL_KCD_MATL_MST}
            onSelectionChange={handleSelectionChangeTBL_KCD_MATL_MST}
            onRowClick={onRowClickTBL_KCD_MATL_MST}
            onCellClick={onCellClickTBL_KCD_MATL_MST}
            renderDependency={selectedTopColumnField}
            dataKey="MATL_CD"
            className="datatable-responsive"
            virtualScrollerOptions={{ itemSize: 20 }}
            emptyMessage=" "
            responsiveLayout="scroll"
            scrollable
            scrollHeight="327px"
            rowClassName={getRowClassName}
        >
            <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }}></AFColumn>
            <AFColumn field="MATL_TYPE_NAME" bodyClassName={getTopColumnClassName("MATL_TYPE_NAME")} headerClassName={getTopHeaderClassName("MATL_TYPE_NAME")} header="Kind" style={{ width: "10rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="MATL_TYPE2_NAME" bodyClassName={getTopColumnClassName("MATL_TYPE2_NAME")} headerClassName={getTopHeaderClassName("MATL_TYPE2_NAME")} header="Kind2" style={{ width: "10rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="MATL_CD" bodyClassName={getTopColumnClassName("MATL_CD")} headerClassName={getTopHeaderClassName("MATL_CD")} header="Matl#" style={{ width: "8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="VENDOR_NAME" bodyClassName={getTopColumnClassName("VENDOR_NAME")} headerClassName={getTopHeaderClassName("VENDOR_NAME")} header="Supplier" style={{ width: "10rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="MATL_NAME" bodyClassName={getTopColumnClassName("MATL_NAME")} headerClassName={getTopHeaderClassName("MATL_NAME")} header="Description" style={{ width: "18rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="COLOR" bodyClassName={getTopColumnClassName("COLOR")} headerClassName={getTopHeaderClassName("COLOR")} header="Color" style={{ width: "8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="SPEC" bodyClassName={getTopColumnClassName("SPEC")} headerClassName={getTopHeaderClassName("SPEC")} header="Spec" style={{ width: "15rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="UNIT" bodyClassName={getTopColumnClassName("UNIT")} headerClassName={getTopHeaderClassName("UNIT")} header="Unit" style={{ width: "5rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="MATL_PRICE" bodyClassName={getTopColumnClassName("MATL_PRICE")} headerClassName={getTopHeaderClassName("MATL_PRICE")} header="Price" style={{ width: "10rem", flexBasis: "auto" }} body={(rowData) => serviceLib.numWithCommas(rowData.MATL_PRICE, 4)} bodyStyle={{ textAlign: "right" }}></AFColumn>
            <AFColumn field="CURR_CD" bodyClassName={getTopColumnClassName("CURR_CD")} headerClassName={getTopHeaderClassName("CURR_CD")} header="Curr" style={{ width: "5rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="S_MATL_PRICE" bodyClassName={getTopColumnClassName("S_MATL_PRICE")} headerClassName={getTopHeaderClassName("S_MATL_PRICE")} header="S/Price" style={{ width: "10rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="S_CURR_CD" bodyClassName={getTopColumnClassName("S_CURR_CD")} headerClassName={getTopHeaderClassName("S_CURR_CD")} header="S/Curr" style={{ width: "5rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="STATUS_CD" bodyClassName={getTopColumnClassName("STATUS_CD")} headerClassName={getTopHeaderClassName("STATUS_CD")} header="Status" style={{ width: "8rem", flexBasis: "auto" }} body={getStatusText}></AFColumn>
            <AFColumn field="WEIGHT" bodyClassName={getTopColumnClassName("WEIGHT")} headerClassName={getTopHeaderClassName("WEIGHT")} header="Weight" style={{ width: "8rem", flexBasis: "auto" }} body={(rowData) => serviceLib.numWithCommas(rowData.WEIGHT, 2)} bodyStyle={{ textAlign: "right" }}></AFColumn>
            <AFColumn field="BOX_UNIT" bodyClassName={getTopColumnClassName("BOX_UNIT")} headerClassName={getTopHeaderClassName("BOX_UNIT")} header="Box" style={{ width: "8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="UPD_USER" bodyClassName={getTopColumnClassName("UPD_USER")} headerClassName={getTopHeaderClassName("UPD_USER")} header="Upd User" style={{ width: "8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="REG_USER" bodyClassName={getTopColumnClassName("REG_USER")} headerClassName={getTopHeaderClassName("REG_USER")} header="Reg User" style={{ width: "8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="VENDOR_TYPE" bodyClassName={getTopColumnClassName("VENDOR_TYPE")} headerClassName={getTopHeaderClassName("VENDOR_TYPE")} header="Supplier Type" style={{ width: "8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="HS_CD" bodyClassName={getTopColumnClassName("HS_CD")} headerClassName={getTopHeaderClassName("HS_CD")} header="Hs Cd" style={{ width: "8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="ADD_RATE" bodyClassName={getTopColumnClassName("ADD_RATE")} headerClassName={getTopHeaderClassName("ADD_RATE")} header="Add Rate" style={{ width: "8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="ADD_AMT" bodyClassName={getTopColumnClassName("ADD_AMT")} headerClassName={getTopHeaderClassName("ADD_AMT", "")} header="Add Amt" style={{ width: "8rem", flexBasis: "auto" }} body={(rowData) => serviceLib.numWithCommas(rowData.ADD_AMT, 2)} bodyStyle={{ textAlign: "right" }}></AFColumn>
            <AFColumn field="ADD_LOSS" bodyClassName={getTopColumnClassName("ADD_LOSS")} headerClassName={getTopHeaderClassName("ADD_LOSS")} header="Add Loss" style={{ width: "8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="REG_DATETIME" bodyClassName={getTopColumnClassName("REG_DATETIME")} headerClassName={getTopHeaderClassName("REG_DATETIME")} header="Reg Time" style={{ width: "8rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.REG_DATETIME)}></AFColumn>
            <AFColumn field="rep_matl_cd" bodyClassName={getTopColumnClassName("rep_matl_cd")} headerClassName={getTopHeaderClassName("rep_matl_cd")} header="Mom Matl#" style={{ width: "8rem", flexBasis: "auto" }}></AFColumn>
        </AFDataTable>
    ), [
        datasTBL_KCD_MATL_MST,
        loadingTBL_KCD_MATL_MST,
        selectedTBL_KCD_MATL_MST,
        selectedTopColumnField,
        topTableColumnFields,
        getRowClassName,
        getTopColumnClassName,
        getTopHeaderClassName,
        getStatusText,
        handleSelectionChangeTBL_KCD_MATL_MST,
        onCellClickTBL_KCD_MATL_MST,
        onRowClickTBL_KCD_MATL_MST,
        serviceLib,
    ]);

    const matlUsageTable = useMemo(() => (
        <AFDataTable preventUnrelatedRerender
            ref={dt_TBL_KCD_MATL_MST1}
            size="small"
            value={datasTBL_KCD_MATL_MST1}
            tableStyle={{ tableLayout: "fixed" }}
            resizableColumns
            columnResizeMode="expand"
            showGridlines
            selection={selectedTBL_KCD_MATL_MST1}
            onSelectionChange={handleSelectionChangeTBL_KCD_MATL_MST1}
            onRowClick={onRowClickTBL_KCD_MATL_MST1}
            dataKey="SEQ"
            className="datatable-responsive"
            virtualScrollerOptions={{ itemSize: 20 }}
            emptyMessage=" "
            responsiveLayout="scroll"
            scrollable
            scrollHeight="268px"
        >
            <AFColumn field="SEQ" headerClassName="t-header" header="SEQ" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="PO_CD" headerClassName="t-header" header={"PO#"} style={{ width: "5rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="PROD_CD" headerClassName="t-header" header="Prod Cd" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style" style={{ width: "20rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="NET" headerClassName="t-header" header="Net" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }}></AFColumn>
            <AFColumn field="LOSS" headerClassName="t-header" header="Loss" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }}></AFColumn>
            <AFColumn field="USE_SIZE" headerClassName="t-header" header="Size" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="REMARK" headerClassName="t-header" header="Usage" style={{ width: "18rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
        </AFDataTable>
    ), [
        datasTBL_KCD_MATL_MST1,
        selectedTBL_KCD_MATL_MST1,
        handleSelectionChangeTBL_KCD_MATL_MST1,
        onRowClickTBL_KCD_MATL_MST1,
    ]);

    useEffect(() => {}, []);

    const resetTBL_KCD_MATL_MST = () => {
        setDataQRY_KCD_MATL_MST(emptyQRY_KCD_MATL_MST);
        setDatasTBL_KCD_MATL_MST([]);
        setSelectedTBL_KCD_MATL_MST([]);
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "28rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Desc</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <InputText
                            style={{ width: "20rem" }}
                            id="id_MATL_NAME"
                            value={dataQRY_KCD_MATL_MST.MATL_NAME}
                            onKeyDown={handleSearchInputKeyDown}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_MATL_MST_MATL_NAME(
                                    e,
                                    "MATL_NAME",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "28rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Color</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <InputText
                            style={{ width: "20rem" }}
                            id="id_COLOR"
                            value={dataQRY_KCD_MATL_MST.COLOR}
                            onKeyDown={handleSearchInputKeyDown}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_MATL_MST_COLOR(e, "COLOR")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "48rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Matl#</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <InputText
                            style={{ width: "20rem" }}
                            id="id_MATL_CD"
                            value={dataQRY_KCD_MATL_MST.MATL_CD}
                            onKeyDown={handleSearchInputKeyDown}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_MATL_MST_MATL_CD(
                                    e,
                                    "MATL_CD",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "28rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Spec</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <InputText
                            style={{ width: "20rem" }}
                            id="id_SPEC"
                            value={dataQRY_KCD_MATL_MST.SPEC}
                            onKeyDown={handleSearchInputKeyDown}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_MATL_MST_SPEC(e, "SPEC")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "28rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Supplier</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <InputText
                            style={{ width: "20rem" }}
                            id="id_VENDOR_CD"
                            value={dataQRY_KCD_MATL_MST.VENDOR_CD}
                            onKeyDown={handleSearchInputKeyDown}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_MATL_MST_VENDOR_CD(
                                    e,
                                    "VENDOR_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span
                    className="af-span-3"
                    style={{ width: "28rem", marginLeft: "80px" }}
                >
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
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
                            style={{ width: "6rem" }}
                            className="p-button-text"
                            onClick={searchTBL_KCD_MATL_MST}
                        />
                    </div>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <Button
                            label="Reset"
                            style={{ width: "6rem" }}
                            className="p-button-text"
                            onClick={resetTBL_KCD_MATL_MST}
                        />
                    </div>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
                        <Button
                            label="Excel"
                            style={{ width: "6rem" }}
                            className="p-button-text green"
                            onClick={search_EXCEL}
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "20rem" }}
            >
                {matlTable}
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "40rem" }}
            >
                {matlUsageTable}
            </div>
            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0302_MATL_SEARCH, comparisonFn);
