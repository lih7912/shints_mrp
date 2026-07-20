/* eslint-disable */
import React, { useState, useEffect, useRef, useCallback } from "react";
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

import axios from "axios";
import apiOption from "../assets/env_graphql";

import moment from "moment";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS051901_FACIN_LIST } from "../service/service_biz/ServiceS051901_FACIN_LIST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    IS_BVT: "",
    IS_ETP: "",
    STATUS_CD: "",
    BUYER_CD: "",
    BL_NO: "",
    PU_NO: "",

    S_ATA: "",
    E_ATA: "",
    USER_ID: "",
    MC_ID: "",
    PO_CD: "",
    SHIPMENT_CD: "",
    CUSTOMS_NO: "",

    S_FACIN_DATE: "",
    E_FACIN_DATE: "",

    SUPPLIER: "",
    DESCRIPTION: "",
    MATL_CD: "",
    SPEC: "",
    COLOR: "",
    UNIT: "",
    REMARK: "",
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
    FILE_NAME: "",
    LOCATION: "",
    FACIN_DATE: "",
};

const FacinListTable = React.memo(function FacinListTable({
    dtRef,
    datas,
    loading,
    selected,
    onSelectionChange,
    serviceLib,
}) {
    return (
        <AFDataTable
            ref={dtRef}
            preventUnrelatedRerender
            editMode="cell"
            size="small"
            value={datas}
            tableStyle={{ tableLayout: "fixed" }}
            resizableColumns
            columnResizeMode="expand"
            loading={loading}
            showGridlines
            selectionMode="checkbox"
            selection={selected}
            onSelectionChange={onSelectionChange}
            dataKey="id"
            className="datatable-responsive"
            virtualScrollerOptions={{ itemSize: 20 }}
            emptyMessage=" "
            responsiveLayout="scroll"
            scrollable
            scrollHeight="49rem"
        >
            <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
            <AFColumn field="ATA" headerClassName="t-header" header="ATA" style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.ATA)} ></AFColumn>
            <AFColumn field="FACIN_DATE" headerClassName="t-header" header="Facin Date" style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.FACIN_DATE) } ></AFColumn>
            <AFColumn field="INSPECT_DATE" headerClassName="t-header" header="Inspection Date" style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.INSPECT_DATE) } ></AFColumn>
            <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
            <AFColumn field="USER_ID" headerClassName="t-header" header="Purchaser" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
            <AFColumn field="DELIVERY_TYPE_N" headerClassName="t-header" header="Delivery" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
            <AFColumn field="BL_NO" headerClassName="t-header" header="BL#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
            <AFColumn field="CUSTOMS_NO" headerClassName="t-header" header="Customs#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
            <AFColumn field="ORIGIN_PORT" headerClassName="t-header" header="Origin" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
            <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
            <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
            <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
            <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
            <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
            <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
            <AFColumn
                field="STATUS_CD_N"
                headerClassName="t-header"
                header="Type(Bef)"
                style={{ width: "8rem", flexBasis: "auto" }}
            ></AFColumn>
            <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
            <AFColumn field="S_OUT_QTY" headerClassName="t-header" header="Ship Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.S_OUT_QTY, 2) } ></AFColumn>
            <AFColumn field="SHORTAGE_QTY" headerClassName="t-header" header="Short/Over" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHORTAGE_QTY, 2) } ></AFColumn>
            <AFColumn field="MOQ_QTY" headerClassName="t-header" header="MOQ+OverIn" style={{ width: "7rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MOQ_QTY, 0) } ></AFColumn>
            <AFColumn field="DEFECT_QTY" headerClassName="t-header" header="Defect" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.DEFECT_QTY, 2) } ></AFColumn>
            <AFColumn field="FACIN_QTY" headerClassName="t-header" header="Facin Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.FACIN_QTY, 2) } ></AFColumn>
            <AFColumn field="LOCATION" headerClassName="t-header" header="Location" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
            <AFColumn field="DELIVERY" headerClassName="t-header" header="Delivery#" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
            <AFColumn field="WEIGHT" headerClassName="t-header" header="Weight" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
            <AFColumn field="CBM" headerClassName="t-header" header="CBM" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
            <AFColumn field="CT_NO" headerClassName="t-header" header="C/T#" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
            <AFColumn field="FILE_NAME" headerClassName="t-header" header="Report" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
            <AFColumn field="MC_ID" headerClassName="t-header" header="M/C" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
            <AFColumn field="PU_CD" headerClassName="t-header" header="PU#" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
            <AFColumn field="SHIPMENT_CD" headerClassName="t-header" header="Shipment#" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
            <AFColumn field="FACTORY_CD" headerClassName="t-header" header="Factory" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
        </AFDataTable>
    );
});

const S051901_FACIN_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS051901_FACIN_LISTRef = useRef(null);
    if (
        !serviceS051901_FACIN_LISTRef.current ||
        typeof serviceS051901_FACIN_LISTRef.current.mgrExport_KeepNewPO !== "function" ||
        typeof serviceS051901_FACIN_LISTRef.current.mgrExport_MoveStock !== "function"
    ) {
        serviceS051901_FACIN_LISTRef.current = new ServiceS051901_FACIN_LIST();
    }
    const serviceS051901_FACIN_LIST = serviceS051901_FACIN_LISTRef.current;

    const toast = useRef(null);

    // File
    const [fileObj, setFileObj] = useState({});
    const [dataUrlFile1, setDataUrlFile1] = useState("");

    /* progress */
    const [isProgress, setIsProgress] = useState(false);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    // dialog
    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    // Search

    // Search KSV_STOCK_MEM
    const search_LIST_1 = (argData) => {
        var tObj = {};
        if (typeof argData.STSOUT_CD !== "undefined") tObj = { ...argData };
        else tObj = { ...dataQRY_KSV_PO_MRP };

        setLoadingTBL_KSV_PO_MRP2(true);

        // 2
        serviceS051901_FACIN_LIST.mgrQuery_LIST_1(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP2(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tObj.BAL_QTY =
                        parseFloat(tObj.S_OUT_QTY) -
                        parseFloat(tObj.SHORTAGE_QTY) -
                        parseFloat(tObj.DEFECT_QTY);
                    return tObj;
                });
                setDatasTBL_KSV_PO_MRP2(tArray);

                if (tArray.length > 0) {
                    var tEdit = { ...dataEDT_KSV_PO_MRP };
                    tEdit.FACIN_DATE = tArray[0].FACIN_DATE;
                    tEdit.LOCATION = tArray[0].LOCATION || "";
                    tEdit.FILE_NAME = tArray[0].FILE_NAME;
                    setDataEDT_KSV_PO_MRP(tEdit);
                }
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const process_RESET = () => {
        setDataQRY_KSV_PO_MRP_STATUS_CD(datasQRY_KSV_PO_MRP_STATUS_CD[0]);

        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        var tQry = { ...emptyQRY_KSV_PO_MRP };
        tQry.IS_BVT = "1";
        tQry.IS_ETP = "0";
        tQry.S_ATA = tRetDate;
        tQry.E_ATA = tRetDate;
        tQry.S_UPLOAD_DATE = tRetDate;
        tQry.E_UPLOAD_DATE = tRetDate;
        setDataQRY_KSV_PO_MRP(tQry);

        setDatasTBL_KSV_PO_MRP2([]);
        setSelectedTBL_KSV_PO_MRP2([]);
    };

    const process_KEEP_NEW_PO = async () => {
        try {
            if (!datasTBL_KSV_PO_MRP2 || datasTBL_KSV_PO_MRP2.length === 0) {
                alert("No data to export");
                return;
            }

            //setIsProgress(true);

            const exportRows = datasTBL_KSV_PO_MRP2.map((row) => ({
                ATA: row.ATA ?? "",
                BUYER_CD: row.BUYER_CD ?? "",
                VENDOR_NAME: row.VENDOR_NAME ?? "",
                USER_ID: row.USER_ID ?? "",
                PO_CD: row.PO_CD ?? "",
                OLD_PON: row.PO_CD ?? "",
                KEEP_NEW_PO: row.KEEP_NEW_PO ?? row.PO_CD ?? "",
                MATL_CD: row.MATL_CD ?? "",
                MATL_NAME: row.MATL_NAME ?? "",
                COLOR: row.COLOR ?? "",
                SPEC: row.SPEC ?? "",
                UNIT: row.UNIT ?? "",
                SHORTAGE_QTY: row.SHORTAGE_QTY ?? "0",
                DEFECT_QTY: row.DEFECT_QTY ?? "0",
                MOQ: row.MOQ == null ? 0 : Number(row.MOQ),
                STATUS_CD_N: row.STATUS_CD_N ?? "",
                DELIVERY: row.DELIVERY ?? "",
                LOCATION: row.LOCATION ?? "",
            }));

            const data = await serviceS051901_FACIN_LIST.mgrExport_KeepNewPO(exportRows);

            setIsProgress(false);

            const exportResult = Array.isArray(data)
                ? data
                : data?.mgrExport_S051901_KeepNewPO ?? [];
            const exportCode = exportResult?.[0]?.CODE ?? "";

            if (typeof data?.graphQLErrors === "undefined") {
                if (exportCode.includes("SUCC")) {
                    const exportParts = exportCode.split("?");
                    serviceLib.downloadFile(
                        exportParts[2].toString(),
                        exportParts[1].toString(),
                    );
                } else if (exportCode) {
                    alert(exportCode);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        } catch (err) {
            setIsProgress(false);
            console.error("Export error:", err);
            toast.current?.show({
                severity: "error",
                summary: "Export failed",
                detail: err.message,
                life: 2000,
            });
        }
    };

    const process_MOVE_STOCK = async () => {
        try {
            if (!datasTBL_KSV_PO_MRP2 || datasTBL_KSV_PO_MRP2.length === 0) {
                alert("No data to export");
                return;
            }

            //setIsProgress(true);

            const exportRows = datasTBL_KSV_PO_MRP2.map((row) => ({
                ATA: row.ATA ?? "",
                BUYER_CD: row.BUYER_CD ?? "",
                VENDOR_NAME: row.VENDOR_NAME ?? "",
                PO_CD: row.PO_CD ?? "",
                MATL_CD: row.MATL_CD ?? "",
                MATL_NAME: row.MATL_NAME ?? "",
                COLOR: row.COLOR ?? "",
                SPEC: row.SPEC ?? "",
                UNIT: row.UNIT ?? "",
                STATUS_CD: row.STATUS_CD ?? "",
                STATUS_CD_N: row.STATUS_CD_N ?? "",
                FACIN_QTY: row.FACIN_QTY == null ? 0 : Number(row.FACIN_QTY),
                MOQ: row.MOQ_QTY == null ? 0 : Number(row.MOQ_QTY),
                DELIVERY: row.DELIVERY ?? "",
                LOCATION: row.LOCATION ?? "",
                FACTORY_CD: row.FACTORY_CD ?? "",
            }));

            const data = await serviceS051901_FACIN_LIST.mgrExport_MoveStock(exportRows);

            setIsProgress(false);

            const exportResult = Array.isArray(data)
                ? data
                : data?.mgrExport_S051901_MoveStock ?? [];
            const exportCode = exportResult?.[0]?.CODE ?? "";

            if (typeof data?.graphQLErrors === "undefined") {
                if (exportCode.includes("SUCC")) {
                    const exportParts = exportCode.split("?");
                    serviceLib.downloadFile(
                        exportParts[2].toString(),
                        exportParts[1].toString(),
                    );
                } else if (exportCode) {
                    alert(exportCode);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        } catch (err) {
            setIsProgress(false);
            console.error("Export error:", err);
            toast.current?.show({
                severity: "error",
                summary: "Export failed",
                detail: err.message,
                life: 2000,
            });
        }
    };

    const process_UPDATE_LOCATION = () => {
        var tFileObj = {};
        if (typeof fileObj.TITLE === "undefined") {
            tFileObj.TITLE = "";
        } else {
            tFileObj = { ...fileObj };
        }
        tFileObj.FILE_KEY = dataQRY_KSV_PO_MRP.STSOUT_CD;
        tFileObj.STSOUT_CD = dataQRY_KSV_PO_MRP.STSOUT_CD;

        if (!dataEDT_KSV_PO_MRP.LOCATION) {
            alert(`Step-1:${dataEDT_KSV_PO_MRP.LOCATION}`);
            return;
        } else {
            alert(`Step-2:${dataEDT_KSV_PO_MRP.LOCATION}`);
        }

        var tObjs = [];
        selectedTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tObj0 = { ...col };

            delete tObj0.id;
            delete tObj0.__typename;
            delete tObj0.BAL_QTY;

            tObj0.LOCATION = dataEDT_KSV_PO_MRP.LOCATION;

            /*
            var tObj = {};
            tObj.PO_CD = tObj0.PO_CD;
            tObj.MATL_CD = tObj0.MATL_CD;
            tObj.MATL_NAME = tObj0.MATL_NAME;
            tObj.COLOR = tObj0.COLOR;
            tObj.SPEC = tObj0.SPEC;
            tObj.UNIT = tObj0.UNIT;
            tObj.S_OUT_QTY = tObj0.S_OUT_QTY;
            tObj.SHORTAGE_QTY = tObj0.SHORTAGE_QTY;
            tObj.DEFECT_QTY = tObj0.DEFECT_QTY;
            tObj.FACIN_QTY = tObj0.FACIN_QTY;
            tObj.LOCATION = dataEDT_KSV_PO_MRP.LOCATION;
            tObj.STSOUT_CD = tObj0.STSOUT_CD;
            tObj.FILE_NAME = fileObj.NAME;
            tObj.FILE_URL = fileObj.URL;
            tObj.FILE_OBJECT = fileObj.OBJECT_NAME;
            tObj.IN_DATE = "";
            tObj.FACIN_DATE = "";
            tObj.PACK_CD = tObj0.PACK_CD;
            */

            tObjs.push(tObj0);
        });

        //setIsProgress(true);
        setLoadingTBL_KSV_PO_MRP2(true);
        serviceS051901_FACIN_LIST
            .mgrInsert_UPDATE_LOCATION(tObjs)
            .then((data) => {
                setIsProgress(false);
                setLoadingTBL_KSV_PO_MRP2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        setSelectedTBL_KSV_PO_MRP2([]);
                        search_LIST_1({});
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

    const process_CANCEL = () => {

        var tObjs = [];
        selectedTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tObj0 = { ...col };

            delete tObj0.id;
            delete tObj0.__typename;
            delete tObj0.BAL_QTY;

            tObjs.push(tObj0);
        });

        //setIsProgress(true);
        setLoadingTBL_KSV_PO_MRP2(true);
        serviceS051901_FACIN_LIST
            .mgrInsert_CANCEL(tObjs)
            .then((data) => {
                setIsProgress(false);
                setLoadingTBL_KSV_PO_MRP2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        setSelectedTBL_KSV_PO_MRP2([]);
                        search_LIST_1({});
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

    const onInputChangeQRY_KSV_PO_MRP = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onCalChangeQRY_KSV_PO_MRP = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };
        _dataQRY_KSV_PO_MRP[`${name}`] = val;
        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const [datasQRY_KSV_PO_MRP_STATUS_CD, setDatasQRY_KSV_PO_MRP_STATUS_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_STATUS_CD, setDataQRY_KSV_PO_MRP_STATUS_CD] =
        useState({});

    const onInputChangeQRY_KSV_PO_MRP_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_CUSTOMS_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_USER_ID = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_MC_ID = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_BL_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_PU_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

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

    const onRowClick1TBL_KSV_PO_MRP2 = useCallback((argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP2 = argData;

        setDataTBL_KSV_PO_MRP2(argTBL_KSV_PO_MRP2);

        if (typeof argData === "undefined") return;

        var tFileCd = `${argData.STSOUT_CD}-${argData.PO_CD}-${argData.MATL_CD}`;

        let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
        var tUrl = `${_url1}fileupload2/facin/${tFileCd}/1`;
        setDataUrlFile1(tUrl);
    }, []);

    const onSelectionChangeTBL_KSV_PO_MRP2 = useCallback(
        (e) => {
            const rows = e.value;
            setSelectedTBL_KSV_PO_MRP2(rows);
            onRowClick1TBL_KSV_PO_MRP2(rows);
        },
        [onRowClick1TBL_KSV_PO_MRP2],
    );

    const exportExcelTBL_KSV_PO_MRP2 = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Matl List");

        const dataArr = datasTBL_KSV_PO_MRP2.map(
            ({ __typename, id, ...rest }) => rest,
        );

        // 헤더 정의
        const columns = Object.keys(dataArr[0]).map((key) => ({
            header: key,
            key,
        }));
        worksheet.columns = columns;

        // 데이터 추가
        dataArr.forEach((row) => worksheet.addRow(row));

        // 스타일 적용
        worksheet.eachRow((row, rowNumber) => {
            row.eachCell({ includeEmpty: true }, (cell) => {
                // 테두리
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                };

                // 제목줄은 노란색 + Bold
                if (rowNumber === 1) {
                    cell.fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: "FFFF00" },
                    };
                }

                cell.font = {
                    name: "Dotum", // 폰트명
                    size: 10, // 10포인트
                    bold: rowNumber === 1, // 제목줄은 Bold
                };

                // 빈칸도 값이 없으면 ''으로 통일
                if (cell.value === "undefined" || cell.value === "null") {
                    cell.value = "";
                }
            });
        });

        // 엑셀 저장
        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(
            new Blob([buffer]),
            `FACIN_LIST_${moment().format("YYYYMMDDHHMMss")}.xlsx`,
        );
    };

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    const onInputChangeEDT_KSV_PO_MRP_LOCATION = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        {
        }
        _dataEDT_KSV_PO_MRP.LOCATION = val;

        // alert(`${name}, ${val}, ${_dataEDT_KSV_PO_MRP.LOCATION}`);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    ///
    useEffect(() => {
        var tStsoutCds = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            var tParams2 = tParams1.map((col, i) => {
                var tObj = {};
                var tCols = col.split("=");

                if (tCols[0].includes("STSOUT_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tStsoutCds = tObj.value;
                }
            });
        }

        var tStsoutCdArray = tStsoutCds.split("|");

        var tObj = {};
        serviceS051901_FACIN_LIST.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_PO_MRP_STATUS_CD(data.STATUS_CD);
                setDataQRY_KSV_PO_MRP_STATUS_CD(data.STATUS_CD[2]);

                var tRetDate = serviceLib.getCurrDate().substring(0, 8);
                var tQry = { ...dataQRY_KSV_PO_MRP };
                tQry.S_ATA = `${tRetDate.substring(0, 6)}01`;
                tQry.E_ATA = `${tRetDate}`;
                setDataQRY_KSV_PO_MRP(tQry);

                setDataQRY_KSV_PO_MRP((prev) => {
                    const tRetDate = serviceLib.getCurrDate().substring(0, 8);
                    const next = {
                        ...prev,
                        S_ATA: `${tRetDate.substring(0, 6)}01`,
                        E_ATA: tRetDate,
                    };
                    const bvt = isTrue(next.IS_BVT);
                    const etp = isTrue(next.IS_ETP);
                    if (bvt === etp) {
                        next.IS_BVT = "1";
                        next.IS_ETP = "0";
                    } else {
                        next.IS_BVT = bvt ? "1" : "0";
                        next.IS_ETP = etp ? "1" : "0";
                    }
                    return next;
                });
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
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

    const onRadioChangeFactoryType = (e) => {
        // e.value: 'IS_BVT' 또는 'IS_ETP' (RadioButton value)
        const isBVT = e.value === "IS_BVT";
        setDataQRY_KSV_PO_MRP((prev) => ({
            ...prev,
            IS_BVT: isBVT ? "1" : "0",
            IS_ETP: isBVT ? "0" : "1",
        }));
    };

    const isTrue = (v) => v === true || v === "1" || v === 1;

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "10rem" }}
            >
                <div>
                    <span className="af-span-3-0" style={{ width: "7rem" }}>
                        <p className="af-span-p" style={{ width: "4rem" }}>BVT</p>
                        <div className="af-span-checkbox">
                            <RadioButton
                                inputId="BVT"
                                name="factoryType"
                                value="IS_BVT"
                                checked={isTrue(dataQRY_KSV_PO_MRP.IS_BVT)}
                                onChange={onRadioChangeFactoryType}
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "7rem" }}>
                        <p className="af-span-p" style={{ width: "4rem" }}>ETP</p>
                        <div className="af-span-checkbox">
                            <RadioButton
                                inputId="ETP"
                                name="factoryType"
                                value="IS_ETP"
                                checked={isTrue(dataQRY_KSV_PO_MRP.IS_ETP)}
                                onChange={onRadioChangeFactoryType}
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "4rem" }}>Buyer#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.BUYER_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP_BUYER_CD(
                                        e,
                                        "BUYER_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "3rem" }}>BL#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.BL_NO}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP_BL_NO(
                                        e,
                                        "BL_NO",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "2rem" }}>PU#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.PU_NO}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP_PU_NO(
                                        e,
                                        "PU_NO",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "21rem" }}>
                        <p className="af-span-p" style={{ width: "3rem" }}>PO</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.PO_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP_PO_CD(
                                        e,
                                        "PO_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div className="af-span-div" style={{ width: "9rem" }}>
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
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Button
                                label="Reset"
                                style={{ width: "9rem" }}
                                className="p-button-text"
                                onClick={process_RESET}
                            />
                        </div>
                    </span>
                </div>

                <span className="af-span-3" style={{ width: "25rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>ATA</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.S_ATA)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP(e, "S_ATA")
                            }
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.E_ATA)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP(e, "E_ATA")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "27rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Inspection Date</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(
                                dataQRY_KSV_PO_MRP.S_FACIN_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP(e, "S_FACIN_DATE")
                            }
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(
                                dataQRY_KSV_PO_MRP.E_FACIN_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP(e, "E_FACIN_DATE")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Purchaser</p>
                    <div className="af-span-div" style={{ width: "7rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.USER_ID}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_USER_ID(
                                    e,
                                    "USER_ID",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "14rem" }}>
                    <p className="af-span-p" style={{ width: "3rem" }}>MC</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.MC_ID}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_MC_ID(e, "MC_ID")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "10rem" }}>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Button
                            label="Excel"
                            style={{ width: "9rem" }}
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_PO_MRP2}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "10rem" }}>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Button
                            label="Cancel"
                            style={{ width: "9rem" }}
                            className="p-button-text"
                            onClick={process_CANCEL}
                        />
                    </div>
                </span>

                <span
                    className="af-span-3"
                    style={{ width: "100%", marginTop: "4px" }}
                >
                    <p className="af-span-p" style={{ width: "7rem" }}>Customs#</p>
                    <InputText
                        style={{ width: "10rem", marginLeft: "5px" }}
                        id="id_TARGET_ETA"
                        value={dataQRY_KSV_PO_MRP.CUSTOMS_NO}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP_CUSTOMS_NO(
                                e,
                                "CUSTOMS_NO",
                            )
                        }
                    />

                    <p className="af-span-p" style={{ width: "6rem" }}>Supplier</p>
                    <InputText
                        style={{ width: "10rem", marginLeft: "5px" }}
                        value={dataQRY_KSV_PO_MRP.SUPPLIER}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP(e, "SUPPLIER")
                        }
                    />

                    <p className="af-span-p" style={{ width: "7rem" }}>Description</p>
                    <InputText
                        style={{ width: "27.5rem", marginLeft: "5px" }}
                        value={dataQRY_KSV_PO_MRP.DESCRIPTION}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP(e, "DESCRIPTION")
                        }
                    />

                    <p className="af-span-p" style={{ width: "11.5rem" }}></p>
                    <span className="af-span-3" style={{ width: "10rem" }}>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Button
                                label="Move Stock"
                                style={{ width: "9rem" }}
                                className="p-button-text green"
                                onClick={process_MOVE_STOCK}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "10rem" }}>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Button
                                label="Keep New PO"
                                style={{ width: "9rem" }}
                                className="p-button-text green"
                                onClick={process_KEEP_NEW_PO}
                            />
                        </div>
                    </span>
                </span>
                <span
                    className="af-span-3"
                    style={{ width: "100%", marginTop: "4px" }}
                >
                    <p className="af-span-p" style={{ width: "7rem" }}>Matl#</p>
                    <InputText
                        style={{ width: "10rem", marginLeft: "5px" }}
                        value={dataQRY_KSV_PO_MRP.MATL_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP(e, "MATL_CD")
                        }
                    />

                    <p className="af-span-p" style={{ width: "6rem" }}>Spec</p>
                    <InputText
                        style={{ width: "10rem", marginLeft: "5px" }}
                        value={dataQRY_KSV_PO_MRP.SPEC}
                        onChange={(e) => onInputChangeQRY_KSV_PO_MRP(e, "SPEC")}
                    />

                    <p className="af-span-p" style={{ width: "7rem" }}>Color</p>
                    <InputText
                        style={{ width: "10rem", marginLeft: "5px" }}
                        value={dataQRY_KSV_PO_MRP.COLOR}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP(e, "COLOR")
                        }
                    />

                    <p className="af-span-p" style={{ width: "7rem" }}>UNIT</p>
                    <InputText
                        style={{ width: "10rem", marginLeft: "5px" }}
                        value={dataQRY_KSV_PO_MRP.UNIT}
                        onChange={(e) => onInputChangeQRY_KSV_PO_MRP(e, "UNIT")}
                    />

                    <p className="af-span-p" style={{ width: "7rem" }}>Remark</p>
                    <InputText
                        style={{ width: "27.5rem", marginLeft: "5px" }}
                        value={dataQRY_KSV_PO_MRP.REMARK}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP(e, "REMARK")
                        }
                    />
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "49rem" }}
            >
                <FacinListTable
                    dtRef={dt_TBL_KSV_PO_MRP2}
                    datas={datasTBL_KSV_PO_MRP2}
                    loading={loadingTBL_KSV_PO_MRP2}
                    selected={selectedTBL_KSV_PO_MRP2}
                    onSelectionChange={onSelectionChangeTBL_KSV_PO_MRP2}
                    serviceLib={serviceLib}
                />
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "4rem" }}
            >
                <span className="af-span-3-0" style={{ width: "24rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Location</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.LOCATION}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_LOCATION(
                                    e,
                                    "LOCATION",
                                )
                            }
                        />
                    </div>
                    <div className="af-span-div-btn" style={{ width: "5rem" }}>
                        <Button
                            style={{ width: "5rem" }}
                            label="Update"
                            className="p-button-text"
                            onClick={process_UPDATE_LOCATION}
                        />
                    </div>
                </span>
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
            ></Dialog>

            <Dialog class="loadingModal" visible={isProgress} modal>
                <ProgressSpinner />
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S051901_FACIN_LIST, comparisonFn);
