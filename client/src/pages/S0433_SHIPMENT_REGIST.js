/* eslint-disable */
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { AFDataTable } from "../components/AFDataTable";
import { AFColumn } from "../components/AFColumn";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import axios from "axios";
import apiOption from "../assets/env_graphql";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0433_SHIPMENT_REGIST } from "../service/service_biz/ServiceS0433_SHIPMENT_REGIST";
import { ServiceS043401_SHIPMENT_INFO } from "../service/service_biz/ServiceS043401_SHIPMENT_INFO";

import "./page_common.scss";

const ShipmentTables = React.memo(function ShipmentTables({
    // left table
    dt_TBL_KSV_PO_MRP,
    datasTBL_KSV_PO_MRP,
    loadingTBL_KSV_PO_MRP,
    selectedTBL_KSV_PO_MRP,
    onSelectLeft,
    onRowClickLeft,
    serviceLib,

    // right table
    dt_TBL_KSV_PO_MRP2,
    datasTBL_KSV_PO_MRP2,
    loadingTBL_KSV_PO_MRP2,
    selectedTBL_KSV_PO_MRP2,
    popupTableData,
    onRowClickRight,
    onSelectRight,
    deleteRowButtonBody,
}) {
    const originBody = React.useCallback((r) => {
        return r.ORIGIN_PORT === "3RD"
            ? `${r.ORIGIN_PORT} (${r.ORG_ORIGIN_PORT})`
            : `${r.ORIGIN_PORT}`;
    }, []);

    const destBody = React.useCallback((r) => {
        return r.DESTINATION === "3RD"
            ? `${r.DESTINATION} (${r.ORG_DESTINATION})`
            : `${r.DESTINATION}`;
    }, []);

    const readyDateBody = React.useCallback(
        (rowData) => serviceLib.dateFormat(rowData.READY_DATE),
        [serviceLib],
    );

    const targetEtaBody = React.useCallback(
        (rowData) => serviceLib.dateFormatHMS(rowData.TARGET_ETA),
        [serviceLib],
    );

    const ctQtyBody = React.useCallback(
        (rowData) => serviceLib.numWithCommas(rowData.CT_QTY, 2),
        [serviceLib],
    );

    const weightBody = React.useCallback(
        (rowData) => serviceLib.numWithCommas(rowData.WEIGHT, 2),
        [serviceLib],
    );

    const cbmBody = React.useCallback(
        (rowData) => serviceLib.numWithCommas(rowData.CBM, 2),
        [serviceLib],
    );

    const etdBody = React.useCallback(
        (rowData) => serviceLib.dateFormatHMS(rowData.ETD),
        [serviceLib],
    );

    const weightFixed2Body = React.useCallback((rowData) => {
        const n = parseFloat(rowData.WEIGHT);
        return Number.isFinite(n) ? n.toFixed(2) : "";
    }, []);

    const cbmFixed4Body = React.useCallback((rowData) => {
        const n = parseFloat(rowData.CBM);
        return Number.isFinite(n) ? n.toFixed(4) : "";
    }, []);

    return (
        <>
            <div
                className="af-div-first"
                style={{ width: "80rem", height: "calc(100vh - 20rem)" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP}
                    size="small"
                    value={datasTBL_KSV_PO_MRP}
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_PO_MRP}
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="multiple"
                    resizableColumns
                    columnResizeMode="expand"
                    selection={selectedTBL_KSV_PO_MRP}
                    onSelectionChange={onSelectLeft}
                    onRowClick={onRowClickLeft}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="496px"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} />

                    <AFColumn field="SHIP_MODE_N" headerClassName="t-header" header={serviceLib.getLocaleMessage( "id_msg_Ship Mode_OP_KIND", )} style={{ width: "6rem", flexBasis: "auto" }} />

                    <AFColumn field="REG_USER" headerClassName="t-header" header={serviceLib.getLocaleMessage( "id_msg_Purchaser_OP_KIND", )} style={{ width: "6rem", flexBasis: "auto" }} />

                    <AFColumn field="BUYER_CD" headerClassName="t-header" header={serviceLib.getLocaleMessage( "id_msg_Buyer#_OP_KIND", )} style={{ width: "8rem", flexBasis: "auto" }} />

                    <AFColumn field="PO_CD2" headerClassName="t-header" header={serviceLib.getLocaleMessage( "id_msg_PO#_OP_KIND", )} style={{ width: "8rem", flexBasis: "auto" }} />

                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header={serviceLib.getLocaleMessage( "id_msg_Supplier_OP_KIND", )} style={{ width: "8rem", flexBasis: "auto" }} />

                    <AFColumn field="ORIGIN_PORT" headerClassName="t-header" header={serviceLib.getLocaleMessage( "id_msg_Origin_OP_KIND", )} style={{ width: "8rem", flexBasis: "auto" }} body={originBody} />

                    <AFColumn field="DESTINATION" headerClassName="t-header" header={serviceLib.getLocaleMessage( "id_msg_Destination_OP_KIND", )} style={{ width: "10rem", flexBasis: "auto" }} body={destBody} />

                    <AFColumn field="READY_DATE" headerClassName="t-header" header={serviceLib.getLocaleMessage( "id_msg_Ready Date_OP_KIND", )} style={{ width: "8rem", flexBasis: "auto" }} body={readyDateBody} />

                    <AFColumn field="TARGET_ETA" headerClassName="t-header" header={serviceLib.getLocaleMessage( "id_msg_ETA(T)_OP_KIND", )} style={{ width: "6rem", flexBasis: "auto" }} body={targetEtaBody} />

                    <AFColumn field="WEIGHT" headerClassName="t-header" header={serviceLib.getLocaleMessage( "id_msg_Weight_OP_KIND", )} style={{ width: "4rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={weightBody} />

                    <AFColumn field="CBM" headerClassName="t-header" header={serviceLib.getLocaleMessage( "id_msg_CBM_OP_KIND", )} style={{ width: "4rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={cbmBody} />

                    <AFColumn field="REMARK" headerClassName="t-header" header={serviceLib.getLocaleMessage( "id_msg_Remark_OP_KIND", )} style={{ width: "4rem", flexBasis: "auto" }} />
                </AFDataTable>
            </div>

            <div
                className="af-div-second"
                style={{
                    marginLeft: "0.5rem",
                    width: "calc(100% - 81rem)",
                    height: "calc(100vh - 20rem)",
                }}
            >
                <div
                    className="af-div-first"
                    style={{
                        width: "calc(100% - 1rem)",
                        height: "calc(100vh - 200px - 21rem)",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_PO_MRP2}
                        size="small"
                        value={datasTBL_KSV_PO_MRP2}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        loading={loadingTBL_KSV_PO_MRP2}
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_PO_MRP2}
                        onSelectionChange={onSelectRight}
                        onRowClick={onRowClickRight}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="calc(100vh - 200px)"
                    >
                        <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} />

                        <AFColumn field="ETD" headerClassName="t-header orange" className="orange" header={serviceLib.getLocaleMessage( "id_msg_ETD_KIND", )} style={{ width: "6rem", flexBasis: "auto" }} body={etdBody} />

                        <AFColumn field="ETA" headerClassName="t-header" header={serviceLib.getLocaleMessage( "id_msg_ETA_OP_KIND", )} style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.ETA) } />

                        <AFColumn field="TARGET_ETA" headerClassName="t-header" header={serviceLib.getLocaleMessage( "id_msg_ETA(T)_OP_KIND", )} style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.TARGET_ETA) } />

                        <AFColumn field="SHIP_MODE_N" headerClassName="t-header" header={serviceLib.getLocaleMessage( "id_msg_Ship Mode_KIND", )} style={{ width: "6rem", flexBasis: "auto" }} />

                        <AFColumn field="SHIP_MODE_N" headerClassName="t-header" header={serviceLib.getLocaleMessage( "id_msg_Ship Mode_KIND", )} style={{ width: "6rem", flexBasis: "auto" }} />

                        <AFColumn field="ORIGIN_PORT" headerClassName="t-header" header={serviceLib.getLocaleMessage( "id_msg_Origin_KIND", )} style={{ width: "8rem", flexBasis: "auto" }} />

                        <AFColumn field="DESTINATION" headerClassName="t-header" header={serviceLib.getLocaleMessage( "id_msg_Destination_KIND", )} style={{ width: "8rem", flexBasis: "auto" }} />

                        <AFColumn field="INVOICE_NO" headerClassName="t-header" header={serviceLib.getLocaleMessage( "id_msg_Invoice#_KIND", )} style={{ width: "10rem", flexBasis: "auto" }} />

                        <AFColumn field="WEIGHT" className="text-right" headerClassName="t-header" header={serviceLib.getLocaleMessage( "id_msg_Weight_KIND", )} style={{ width: "6rem", flexBasis: "auto" }} body={weightFixed2Body} />

                        <AFColumn field="CBM" className="text-right" headerClassName="t-header" header={serviceLib.getLocaleMessage( "id_msg_CBM_KIND", )} style={{ width: "6rem", flexBasis: "auto" }} body={cbmFixed4Body} />
                    </AFDataTable>
                </div>
                <div
                    className="af-div-second"
                    style={{
                        width: "calc(100% - 1rem)",
                        height: "200px",
                        paddingTop: "0.5rem",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        size="small"
                        value={popupTableData}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        showGridlines
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="200px"
                    >
                        <AFColumn field="REG_USER" header="Purchaser" />
                        <AFColumn field="BUYER_CD" header="Buyer#" />
                        <AFColumn field="PO_CD2" header="PO#" />
                        <AFColumn field="VENDOR_NAME" header="Supplier" />
                        <AFColumn field="READY_DATE" header="Ready Date" body={(rowData) => serviceLib.dateFormat(rowData.READY_DATE) } />

                        <AFColumn field="TARGET_ETA" header="ETA(T)" body={(rowData) => serviceLib.dateFormat(rowData.TARGET_ETA) } />

                        <AFColumn field="WEIGHT" header="Weight" body={(rowData) => Number(rowData.WEIGHT || 0).toFixed(2) } bodyStyle={{ textAlign: "right" }} />

                        <AFColumn field="CBM" header="CBM" body={(rowData) => Number(rowData.CBM || 0).toFixed(4) } bodyStyle={{ textAlign: "right" }} />

                        <AFColumn header="Remove" body={deleteRowButtonBody} style={{ width: "4rem", textAlign: "center" }} />
                    </AFDataTable>
                </div>
            </div>
        </>
    );
});

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    S_READY_DATE: "",
    E_READY_DATE: "",
    ORIGIN_PORT: "",
    DESTINATION: "",
    SHIP_MODE: "",
    PO_CD: "",
    SUPPLIER: "",
    IS_SINGAPORE: "0",
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
    SHIP_MODE: "",
    PLACE_CD: "",
    BL_FILE: "",

    ORIGIN_PORT: "",
    SHIP_LINE: "",
    BL_NO: "",

    ETD: "",
    CONTAINER_NO: "",
    CI_FILE: "",

    DESTINATION: "",
    IS_SINGAPORE: "",
    COST: "0",

    PL_FILE: "",
    REMARK: "",

    ETA_T: "",
    ETA: "",

    REMARK: "",
    INVOICE_NO: "",
};

const S0433_SHIPMENT_REGIST = () => {
    const serviceLib = React.useMemo(() => {
        const s = new ServiceLib();
        s.loginConfirm();
        return s;
    }, []);

    const serviceS0433_SHIPMENT_REGIST = React.useMemo(() => {
        return new ServiceS0433_SHIPMENT_REGIST();
    }, []);

    const serviceS043401_SHIPMENT_INFO = React.useMemo(() => {
        return new ServiceS043401_SHIPMENT_INFO();
    }, []);

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    // dialog
    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);

    // Search

    // Search KSV_STOCK_MEM

    const search_LIST_1 = () => {
        setSelectedTBL_KSV_PO_MRP([]);
        setDatasTBL_KSV_PO_MRP([]);

        var tObj = { ...dataQRY_KSV_PO_MRP };

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS0433_SHIPMENT_REGIST.mgrQuery_LIST_1(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_PO_MRP(tArray);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2 = () => {
        setSelectedTBL_KSV_PO_MRP2([]);
        setDatasTBL_KSV_PO_MRP2([]);
        setPopupTableData([]);

        var tObj = {};
        tObj.BUYER_CD = "";
        tObj.ORIGIN_PORT =
            dataQRY_KSV_PO_MRP_ORIGIN_PORT_SEARCH2?.CD_NAME?.split(" / ")[0] ||
            "";
        tObj.DESTINATION =
            dataQRY_KSV_PO_MRP_DESTINATION_SEARCH2?.CD_NAME || "";
        tObj.INVOICE_NO = dataQRY_KSV_PO_MRP_INVOICE_NO || "";

        setLoadingTBL_KSV_PO_MRP2(true);

        // 3_1
        serviceS0433_SHIPMENT_REGIST.mgrQuery_LIST_2(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP2(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tObj.REMARK = tObj.REMARK2;
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

    const process_RESET = () => {
        setSelectedTBL_KSV_PO_MRP([]);
        setSelectedTBL_KSV_PO_MRP2([]);
        setDataEDT_KSV_PO_MRP(emptyEDT_KSV_PO_MRP);
    };

    const process_ADD_SHIP = () => {
        if (
            selectedTBL_KSV_PO_MRP.length <= 0 ||
            selectedTBL_KSV_PO_MRP2.length <= 0
        ) {
            return;
        }

        var _tObj0 = { ...selectedTBL_KSV_PO_MRP2[0] };
        var argData = { ..._tObj0 };

        var tObj = { ...emptyEDT_KSV_PO_MRP };
        tObj.SHIP_MODE = argData.SHIP_MODE;
        tObj.PLACE_CD = argData.PLACE_CD;
        tObj.BL_FILE = argData.BL_FILE;
        tObj.ORIGIN_PORT = argData.ORIGIN_PORT;
        tObj.SHIP_LINE = argData.SHIP_LINE;
        tObj.BL_NO = argData.BL_NO;
        tObj.CONTAINER_NO = argData.CONTAINER_NO;
        tObj.CI_FILE = argData.CI_FILE;
        tObj.IS_SINGAPORE = argData.IS_SINGAPORE;
        tObj.COST = argData.COST;
        tObj.PL_FILE = argData.PL_FILE;
        tObj.ETD = argData.ETD;
        tObj.DESTINATION = argData.DESTINATION;

        tObj.SHIPMENT_CD = argData.SHIPMENT_CD;
        var tInput = { ...tObj };

        var tCheck = 0;
        var tCheck1 = 0;
        var tCheck2 = 0;
        var tCheck3 = 0;
        var tObjs = selectedTBL_KSV_PO_MRP.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (col.DESTINATION !== _tObj0.DESTINATION) {
                if (
                    (col.DESTINATION === "ETP" &&
                        _tObj0.DESTINATION === "SINGAPORE") ||
                    (col.DESTINATION === "BVT" && _tObj0.DESTINATION === "TN")
                ) {
                } else {
                    tCheck2 = 1;
                }
            }
            if (col.ORIGIN_PORT === _tObj0.DESTINATION) tCheck = 1;
            // if (col.ORIGIN_PORT !== _tObj0.ORIGIN_PORT) tCheck1 = 1;
            // if (col.SHIP_MODE_N !== _tObj0.SHIP_MODE_N) tCheck3 = 1;
            return tObj;
        });

        if (tCheck === 1) {
            resetEDT_KSV_PO_MRP();
            setSelectedTBL_KSV_PO_MRP([]);
            setSelectedTBL_KSV_PO_MRP2([]);
            alert("Same Origin/Destination is not allowed.");
            return;
        }
        if (tCheck1 === 1) {
            resetEDT_KSV_PO_MRP();
            setSelectedTBL_KSV_PO_MRP([]);
            setSelectedTBL_KSV_PO_MRP2([]);
            alert("Only same Origin can be added.");
            return;
        }
        if (tCheck2 === 1) {
            resetEDT_KSV_PO_MRP();
            setSelectedTBL_KSV_PO_MRP([]);
            setSelectedTBL_KSV_PO_MRP2([]);
            alert("Only same Destination can be added.");
            return;
        }
        if (tCheck3 === 1) {
            resetEDT_KSV_PO_MRP();
            setSelectedTBL_KSV_PO_MRP([]);
            setSelectedTBL_KSV_PO_MRP2([]);
            alert("Only same Ship Mode can be added.");
            return;
        }

        serviceS0433_SHIPMENT_REGIST
            .mgrInsert_ADD_SHIP(tInput, tObjs)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log("mgrInsert_STOCK_IN call => " + data[0].CODE);
                    toast.current.show({
                        severity: "success",
                        summary: "Success:Stock_in",
                        detail: data[0].CODE,
                        life: 3000,
                    });
                    resetEDT_KSV_PO_MRP();
                    setSelectedTBL_KSV_PO_MRP([]);
                    setSelectedTBL_KSV_PO_MRP2([]);
                    if (data[0].CODE.includes("SUCC")) {
                        search_LIST_1();
                        search_LIST_2();
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

    const process_INSERT_SHIPMENT = () => {
        var tInput = { ...dataEDT_KSV_PO_MRP };

        tInput.SHIP_MODE = dataEDT_KSV_PO_MRP_SHIP_MODE?.CD_CODE;
        tInput.ORIGIN_PORT = dataEDT_KSV_PO_MRP_ORIGIN_PORT?.CD_CODE;
        tInput.DESTINATION = dataEDT_KSV_PO_MRP_DESTINATION?.CD_CODE;
        tInput.SHIP_MODE = dataEDT_KSV_PO_MRP_SHIP_MODE?.CD_CODE;

        // FCL or LCL or SEA
        if (
            tInput.SHIP_MODE === "1" ||
            tInput.SHIP_MODE === "2" ||
            tInput.SHIP_MODE === "11"
        ) {
            if (
                tInput.SHIP_LINE === "TRUCK" ||
                tInput.SHIP_LINE === "AIR" ||
                tInput.SHIP_LINE === "FEDEX" ||
                tInput.SHIP_LINE === "DHL" ||
                tInput.SHIP_LINE === "UPS" ||
                tInput.SHIP_LINE === "Handcarry" ||
                tInput.SHIP_LINE.includes("EXPRESS")
            ) {
                alert(
                    "If select FCL/LCL/SEA, Ship Line can not be Truck/Air/Express",
                );
                return;
            }
        } else {
            if (
                tInput.SHIP_LINE !== "TRUCK" &&
                tInput.SHIP_LINE !== "AIR" &&
                tInput.SHIP_LINE !== "FEDEX" &&
                tInput.SHIP_LINE !== "DHL" &&
                tInput.SHIP_LINE !== "UPS" &&
                tInput.SHIP_LINE !== "Handcarry" &&
                !tInput.SHIP_LINE.includes("EXPRESS")
            ) {
                alert(
                    "If select other than FCL/LCL/SEA, Ship Line must be Truck/Air/Express",
                );
                return;
            }
        }

        tInput.COST = tInput.COST;
        tInput.SHIPMENT_CD = "";
        tInput.REG_USER = serviceLib.getUserInfo().USER_ID;

        console.log(tInput);

        if (
            tInput.ORIGIN_PORT === "" ||
            tInput.DESTINATION === "" ||
            tInput.ETD === "" ||
            tInput.SHIP_MODE === ""
        ) {
            alert(
                `Origin Port, Destination, ETD, Ship Mode is required field.`,
            );
            return;
        }

        var tCheck = 0;
        var tCheck1 = 0;
        var tSaveDestination = "";
        var tObjs = [];

        selectedTBL_KSV_PO_MRP.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (tInput.IS_SINGAPORE === "1" && col.ORIGIN_PORT === "SINGAPORE")
                tCheck = 1;
            if (i > 0 && tSaveDestination !== tObj.DESTINATION) tCheck1 = 1;
            tSaveDestination = tObj.DESTINATION;
            tObjs.push(tObj);
        });

        if (tCheck === 1) {
            alert("Singapore Origin is not allowed for Singapore Destination.");
            return;
        }
        if (tCheck1 === 1) {
            alert("Different Destination is not allowed.");
            return;
        }

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS0433_SHIPMENT_REGIST
            .mgrInsert_SHIPMENT(tInput, tObjs)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log("mgrInsert_STOCK_IN call => " + data[0].CODE);

                    if (data[0].CODE.length > 0) alert(data[0].CODE);

                    if (data[0].CODE.includes("SUCC")) {
                        var tCols = data[0].CODE.split(":");
                        var tShipmentCd = tCols[1];

                        setSelectedTBL_KSV_PO_MRP([]);
                        setSelectedTBL_KSV_PO_MRP2([]);
                        resetEDT_KSV_PO_MRP();
                        search_LIST_1();
                        search_LIST_2();

                        if (
                            tInput.SHIP_MODE === "1" ||
                            tInput.SHIP_MODE === "2"
                        ) {
                            // FCL, LCL
                            if (
                                ["sea", "stb", "ste", "fedex", "dhl"].includes(
                                    tInput.BL_NO.toLowerCase(),
                                )
                            ) {
                                alert("Please check BL# and Ship Line.");
                                return;
                            }

                            if (
                                tInput.BL_NO &&
                                tInput.SHIP_LINE &&
                                ![
                                    "TRUCK",
                                    "FEDEX",
                                    "DHL",
                                    "UPS",
                                    "AIR",
                                    "EXPRESS",
                                    "Handcarry",
                                    "EXPRESS(3rd)",
                                    "EXPRESS(Pick-up)",
                                ].includes(tInput.SHIP_LINE)
                            ) {
                                var tObj = {};
                                tObj.SHIP_LINE = tInput.SHIP_LINE;
                                tObj.BL_NO = tInput.BL_NO;
                                tObj.SHIPMENT_CD = tShipmentCd;

                                axios
                                    .post(
                                        `${apiOption.apiuri}/restapi/tradlinx/track`,
                                        {
                                            bl_no: tObj.BL_NO,
                                            line_cd: tObj.SHIP_LINE,
                                        },
                                    )
                                    .then((response) => {
                                        console.log(response);
                                        setSelectedTBL_KSV_PO_MRP([]);
                                        setSelectedTBL_KSV_PO_MRP2([]);
                                        resetEDT_KSV_PO_MRP();

                                        search_LIST_1();
                                        search_LIST_2();

                                        setTimeout(() => {
                                            axios.post(
                                                `${apiOption.apiuri}/restapi/tradlinx/refresh-pending`,
                                            );
                                        }, 10 * 1000);
                                    })
                                    .catch((err) => console.error(err));
                            } else {
                                setSelectedTBL_KSV_PO_MRP([]);
                                setSelectedTBL_KSV_PO_MRP2([]);
                                resetEDT_KSV_PO_MRP();

                                search_LIST_1();
                                search_LIST_2();
                            }
                        } else {
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

    const onInputChangeQRY_KSV_PO_MRP_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const [dataQRY_KSV_PO_MRP_INVOICE_NO, setDataQRY_KSV_PO_MRP_INVOICE_NO] =
        useState("");
    const onInputChangeQRY_KSV_PO_MRP_INVOICE_NO = (e, name) => {
        setDataQRY_KSV_PO_MRP_INVOICE_NO(e.target.value);
    };

    const onCalChangeQRY_KSV_PO_MRP_S_READY_DATE = (e, name) => {
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

    const onCalChangeQRY_KSV_PO_MRP_E_READY_DATE = (e, name) => {
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

    const [
        datasQRY_KSV_PO_MRP_ORIGIN_PORT,
        setDatasQRY_KSV_PO_MRP_ORIGIN_PORT,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP_ORIGIN_PORT, setDataQRY_KSV_PO_MRP_ORIGIN_PORT] =
        useState({});

    const [
        dataQRY_KSV_PO_MRP_ORIGIN_PORT_SEARCH2,
        setDataQRY_KSV_PO_MRP_ORIGIN_PORT_SEARCH2,
    ] = useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_ORIGIN_PORT = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_ORIGIN_PORT(e.value);
    };

    const [
        datasQRY_KSV_PO_MRP_DESTINATION,
        setDatasQRY_KSV_PO_MRP_DESTINATION,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP_DESTINATION, setDataQRY_KSV_PO_MRP_DESTINATION] =
        useState({});
    const [
        dataQRY_KSV_PO_MRP_DESTINATION_SEARCH2,
        setDataQRY_KSV_PO_MRP_DESTINATION_SEARCH2,
    ] = useState("");

    const onDropdownChangeQRY_KSV_PO_MRP_DESTINATION = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_DESTINATION(e.value);
    };

    const onDropdownChangeQRY_SEARCH_2 = (e, name) => {
        if (name === "ORIGIN_PORT") {
            setDataQRY_KSV_PO_MRP_ORIGIN_PORT_SEARCH2(e.value);
        } else if (name === "DESTINATION") {
            setDataQRY_KSV_PO_MRP_DESTINATION_SEARCH2(e.value);
        }
    };

    const [datasQRY_KSV_PO_MRP_SHIP_MODE, setDatasQRY_KSV_PO_MRP_SHIP_MODE] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_SHIP_MODE, setDataQRY_KSV_PO_MRP_SHIP_MODE] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_SHIP_MODE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_SHIP_MODE(e.value);
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

    const [isShipLineDisabled, setIsShipLineDisabled] = useState(false);
    const [datasEDT_KSV_PO_MRP_SHIP_MODE, setDatasEDT_KSV_PO_MRP_SHIP_MODE] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_SHIP_MODE, setDataEDT_KSV_PO_MRP_SHIP_MODE] =
        useState({});
    const [
        datasEDT_KSV_PO_MRP_ORIGIN_PORT,
        setDatasEDT_KSV_PO_MRP_ORIGIN_PORT,
    ] = useState([]);
    const [dataEDT_KSV_PO_MRP_ORIGIN_PORT, setDataEDT_KSV_PO_MRP_ORIGIN_PORT] =
        useState({});
    const [
        datasEDT_KSV_PO_MRP_DESTINATION,
        setDatasEDT_KSV_PO_MRP_DESTINATION,
    ] = useState([]);
    const [dataEDT_KSV_PO_MRP_DESTINATION, setDataEDT_KSV_PO_MRP_DESTINATION] =
        useState({});

    const onRowClick1TBL_KSV_PO_MRP = React.useCallback(
        (argData0) => {
            const argData = Array.isArray(argData0) ? argData0[0] : argData0;
            if (!argData) return;

            // console.log('===> Won1', argData0);
            if (Array.isArray(argData0));
            else return;

            // Ship Mode (객체 그대로)
            const shipModeObj =
                datasEDT_KSV_PO_MRP_SHIP_MODE.find(
                    (v) => v.CD_CODE === String(argData.SHIP_MODE),
                ) || null;

            console.log('-----', shipModeObj);
            const originObj =
                datasEDT_KSV_PO_MRP_ORIGIN_PORT.find(
                    (v) => v.CD_CODE === String(argData.ORIGIN_PORT),
                ) || null;

            const destObj =
                datasEDT_KSV_PO_MRP_DESTINATION.find(
                    (v) => v.CD_CODE === String(argData.DESTINATION),
                ) || null;

            let minTargetEta = "";

            var saveVal = 99999999;
            var saveVal1 = "";
            if (Array.isArray(argData0)) {
                argData0.forEach((col, i) => {
                    var tVal = parseFloat(col.TARGET_ETA.replace(/-/gi, ""));
                    if (tVal < saveVal) {
                        saveVal = tVal;
                        saveVal1 = col.TARGET_ETA;
                    }
                });
            }

            setDataEDT_KSV_PO_MRP((prev) => ({
                ...prev,
                SHIP_MODE: argData.SHIP_MODE,
                ORIGIN_PORT: argData.ORIGIN_PORT,
                DESTINATION: argData.DESTINATION,
                ETD: "",
                ETA_T: saveVal1,
                BL_NO: "",
                CONTAINER_NO: "",
                IS_SINGAPORE: "0",
            }));

            setDataEDT_KSV_PO_MRP_SHIP_MODE(shipModeObj);
            setDataEDT_KSV_PO_MRP_ORIGIN_PORT(originObj);
            setDataEDT_KSV_PO_MRP_DESTINATION(destObj);

            let shipModeName = "";

            switch (shipModeObj?.CD_CODE) {
                case "12":
                    shipModeName = "UPS";
                    break;
                case "10":
                    shipModeName = "TRUCK";
                    break;
                case "3":
                    shipModeName = "AIR";
                    break;
                case "4":
                    shipModeName = "FEDEX";
                    break;
                case "5":
                    shipModeName = "DHL";
                    break;
                case "6":
                    shipModeName = "EXPRESS";
                    break;
                case "7":
                    shipModeName = "Handcarry";
                    break;
                case "8":
                    shipModeName = "EXPRESS(3rd)";
                    break;
                case "9":
                    shipModeName = "EXPRESS(Pick-up)";
                    break;
                default:
                    shipModeName = "";
            }

            if (shipModeName !== "") {
                let shipLine = datasEDT_KSV_PO_MRP_SHIP_LINE.filter(
                    (val) => val.CD_CODE === shipModeName,
                );
                setDataEDT_KSV_PO_MRP_SHIP_LINE(shipLine[0]);
                setDataEDT_KSV_PO_MRP((prev) => ({
                    ...prev,
                    SHIP_LINE: shipLine[0]?.CD_CODE || "",
                }));
                setIsShipLineDisabled(true);
            } else {
                setIsShipLineDisabled(false);
            }
        },
        [
            datasEDT_KSV_PO_MRP_SHIP_MODE,
            datasEDT_KSV_PO_MRP_ORIGIN_PORT,
            datasEDT_KSV_PO_MRP_DESTINATION,
        ],
    );

    const onRowClickTBL_KSV_PO_MRP = React.useCallback(
        (event) => {
            let argTBL_KSV_PO_MRP = event.data;
            if (flagSelectModeTBL_KSV_PO_MRP) return;

            // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP
        },
        [flagSelectModeTBL_KSV_PO_MRP],
    );

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

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    const onRowClick1TBL_KSV_PO_MRP2 = React.useCallback(
        (argData0) => {
            let argData;

            // selection 경로
            if (Array.isArray(argData0)) {
                if (argData0.length === 0) return;
                argData = argData0[0];
            }
            // row click 경로
            else {
                argData = argData0;
            }

            if (!argData) return;

            setDataTBL_KSV_PO_MRP2(argData);

            // LEFT TABLE에서 TARGET_ETA 최소값 계산
            let minTargetEta = "";

            if (
                Array.isArray(datasTBL_KSV_PO_MRP) &&
                datasTBL_KSV_PO_MRP.length > 0
            ) {
                const nums = datasTBL_KSV_PO_MRP
                    .map((row) => Number(row.TARGET_ETA))
                    .filter((v) => Number.isFinite(v) && v > 0);

                if (nums.length > 0) {
                    minTargetEta = String(Math.min(...nums));
                }
            }

            setDataEDT_KSV_PO_MRP((prev) => ({
                ...prev,
                SHIP_MODE: argData.SHIP_MODE,
                PLACE_CD: argData.PLACE_CD,
                BL_FILE: argData.BL_FILE,
                ORIGIN_PORT: argData.ORIGIN_PORT,
                SHIP_LINE: argData.SHIP_LINE,
                BL_NO: argData.BL_NO,
                CONTAINER_NO: argData.CONTAINER_NO,
                CI_FILE: argData.CI_FILE,
                IS_SINGAPORE: argData.IS_SINGAPORE,
                COST: argData.COST,
                PL_FILE: argData.PL_FILE,
                ETD: argData.ETD,
                DESTINATION: argData.DESTINATION,
                INVOICE_NO: argData.INVOICE_NO,
                REMARK: argData.REMARK,
                ETA: argData.ETA,
                ETA_T: minTargetEta,
            }));

            editEDT_KSV_PO_MRP_SHIP_LINE(argData.SHIP_LINE);
            editEDT_KSV_PO_MRP_SHIP_MODE(argData.SHIP_MODE);
            editEDT_KSV_PO_MRP_PLACE_CD(argData.PLACE_CD);
            editEDT_KSV_PO_MRP_DESTINATION(argData.DESTINATION);
        },
        [datasTBL_KSV_PO_MRP],
    );

    const resetEDT_KSV_PO_MRP = (argData) => {
        var tObj = { ...emptyEDT_KSV_PO_MRP };
        setDataEDT_KSV_PO_MRP(tObj);
        editEDT_KSV_PO_MRP_SHIP_LINE("");
        editEDT_KSV_PO_MRP_SHIP_MODE("");
        editEDT_KSV_PO_MRP_PLACE_CD("");
        editEDT_KSV_PO_MRP_DESTINATION("");
    };

    const editEDT_KSV_PO_MRP_SHIP_MODE = useCallback((argValue) => {
        let _dataEDT_KSV_PO_MRP_SHIP_MODE =
            datasEDT_KSV_PO_MRP_SHIP_MODE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_SHIP_MODE(_dataEDT_KSV_PO_MRP_SHIP_MODE[0]);
    }, [datasEDT_KSV_PO_MRP_SHIP_MODE]);

    const onDropdownChangeEDT_KSV_PO_MRP_SHIP_MODE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_SHIP_MODE(e.value);

        let shipModeName = "";

        switch (val) {
            case "10":
                shipModeName = "TRUCK";
                break;
            case "3":
                shipModeName = "AIR";
                break;
            case "4":
                shipModeName = "FEDEX";
                break;
            case "5":
                shipModeName = "DHL";
                break;
            case "6":
                shipModeName = "EXPRESS";
                break;
            case "7":
                shipModeName = "Handcarry";
                break;
            case "8":
                shipModeName = "EXPRESS(3rd)";
                break;
            case "9":
                shipModeName = "EXPRESS(Pick-up)";
                break;
            default:
                shipModeName = "";
        }

        if (shipModeName !== "") {
            let shipLine = datasEDT_KSV_PO_MRP_SHIP_LINE.filter(
                (val) => val.CD_CODE === shipModeName,
            );
            setDataEDT_KSV_PO_MRP_SHIP_LINE(shipLine[0]);
            setDataEDT_KSV_PO_MRP({
                ...dataEDT_KSV_PO_MRP,
                SHIP_LINE: shipLine[0].CD_CODE,
            });
            setIsShipLineDisabled(true);
        } else {
            setIsShipLineDisabled(false);
        }
    };

    const [datasEDT_KSV_PO_MRP_SHIP_LINE, setDatasEDT_KSV_PO_MRP_SHIP_LINE] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_SHIP_LINE, setDataEDT_KSV_PO_MRP_SHIP_LINE] =
        useState({});

    const editEDT_KSV_PO_MRP_SHIP_LINE = useCallback((argValue) => {
        let _dataEDT_KSV_PO_MRP_SHIP_LINE =
            datasEDT_KSV_PO_MRP_SHIP_LINE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_SHIP_LINE(_dataEDT_KSV_PO_MRP_SHIP_LINE[0]);
    }, [datasEDT_KSV_PO_MRP_SHIP_LINE]);

    const onDropdownChangeEDT_KSV_PO_MRP_SHIP_LINE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_SHIP_LINE(e.value);
    };

    const [datasEDT_KSV_PO_MRP_PLACE_CD, setDatasEDT_KSV_PO_MRP_PLACE_CD] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_PLACE_CD, setDataEDT_KSV_PO_MRP_PLACE_CD] =
        useState({});
    const editEDT_KSV_PO_MRP_PLACE_CD = useCallback((argValue) => {
        let _dataEDT_KSV_PO_MRP_PLACE_CD = datasEDT_KSV_PO_MRP_PLACE_CD.filter(
            (val) => val.PLACE_CD === argValue,
        );
        setDataEDT_KSV_PO_MRP_PLACE_CD(_dataEDT_KSV_PO_MRP_PLACE_CD[0]);
    }, [datasEDT_KSV_PO_MRP_PLACE_CD]);
    const onDropdownChangeEDT_KSV_PO_MRP_PLACE_CD = (e, name) => {
        let val = (e.value && e.value.PLACE_CD) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_PLACE_CD(e.value);
    };

    const onInputChangeEDT_KSV_PO_MRP_INVOICE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        if (/[:\\\/:*?"<>|]/.test(val)) {
            alert('Special character ( : \\ / * ? " < > | ) is not allowed.');
            return;
        }

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        if (/[:\\\/:*?"<>|]/.test(val)) {
            alert('Special character ( : \\ / * ? " < > | ) is not allowed.');
            return;
        }

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_ORIGIN_PORT = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_ORIGIN_PORT(e.value);
    };

    const onInputChangeEDT_KSV_PO_MRP_BL_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onCalChangeEDT_KSV_PO_MRP_ETD = (e, name) => {
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

    const onInputChangeEDT_KSV_PO_MRP_CONTAINER_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const editEDT_KSV_PO_MRP_DESTINATION = useCallback((argValue) => {
        let _dataEDT_KSV_PO_MRP_DESTINATION =
            datasEDT_KSV_PO_MRP_DESTINATION.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_DESTINATION(_dataEDT_KSV_PO_MRP_DESTINATION[0]);
    }, [datasEDT_KSV_PO_MRP_DESTINATION]);

    const onDropdownChangeEDT_KSV_PO_MRP_DESTINATION = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_DESTINATION(e.value);
    };

    const onCheckboxChangeEDT_KSV_PO_MRP_IS_SINGAPORE = (e, name) => {
        let val = "";
        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_PO_MRP[`${name}`] = val;
        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onCheckboxChangeEDT_KSV_PO_MRP_IS_SINGAPORE_QRY = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MRP[`${name}`] = val;
        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const [s11Disabled, setS11Disabled] = useState(false);
    useEffect(() => {
        var tObj = {};
        serviceS0433_SHIPMENT_REGIST.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT);
                setDataQRY_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT[0]);

                setDatasEDT_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT);
                setDataEDT_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT[0]);

                setDatasQRY_KSV_PO_MRP_DESTINATION(data.DESTINATION);
                setDataQRY_KSV_PO_MRP_DESTINATION(data.DESTINATION[0]);

                setDatasEDT_KSV_PO_MRP_SHIP_LINE(data.SHIP_LINE);
                setDataEDT_KSV_PO_MRP_SHIP_LINE(data.SHIP_LINE[0]);

                setDatasEDT_KSV_PO_MRP_SHIP_MODE(data.SHIP_MODE);
                setDataEDT_KSV_PO_MRP_SHIP_MODE(data.SHIP_MODE[0]);

                setDatasQRY_KSV_PO_MRP_SHIP_MODE(data.SHIP_MODE);
                setDataQRY_KSV_PO_MRP_SHIP_MODE(data.SHIP_MODE[0]);

                setDatasEDT_KSV_PO_MRP_PLACE_CD(data.PLACE_CD);
                setDataEDT_KSV_PO_MRP_PLACE_CD(data.PLACE_CD[0]);

                setDatasEDT_KSV_PO_MRP_DESTINATION(data.DESTINATION);
                setDataEDT_KSV_PO_MRP_DESTINATION(data.DESTINATION[0]);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        search_LIST_1();
        search_LIST_2();

        let userInfo = JSON.parse(
            window.sessionStorage.getItem("AF_ERP_USERINFO"),
        );
        if (userInfo.PART === "S11") {
            /* 자재팀 */
            setS11Disabled(true);
        } else {
            setS11Disabled(false);
        }
    }, []);

    // Support Area

    const changeCheckBoxVal = (argVal) => {
        if (argVal === "1") return true;
        else return false;
    };

    const changeDateVal = (argVal) => {
        if (argVal === "") return argVal;
        var tType = typeof argVal;
        if (tType !== "string") {
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

    const originBody = React.useCallback(
        (r) =>
            r.ORIGIN_PORT === "3RD"
                ? `${r.ORIGIN_PORT} (${r.ORG_ORIGIN_PORT})`
                : `${r.ORIGIN_PORT}`,
        [],
    );

    const destBody = React.useCallback(
        (r) =>
            r.DESTINATION === "3RD"
                ? `${r.DESTINATION} (${r.ORG_DESTINATION})`
                : `${r.DESTINATION}`,
        [],
    );

    const readyDateBody = React.useCallback(
        (rowData) => serviceLib.dateFormat(rowData.READY_DATE),
        [serviceLib],
    );
    const targetEtaBody = React.useCallback(
        (rowData) => serviceLib.dateFormatHMS(rowData.TARGET_ETA),
        [serviceLib],
    );
    const ctQtyBody = React.useCallback(
        (rowData) => serviceLib.numWithCommas(rowData.CT_QTY, 2),
        [serviceLib],
    );
    const weightBody = React.useCallback(
        (rowData) => serviceLib.numWithCommas(rowData.WEIGHT, 2),
        [serviceLib],
    );
    const cbmBody = React.useCallback(
        (rowData) => serviceLib.numWithCommas(rowData.CBM, 2),
        [serviceLib],
    );
    const etdBody = React.useCallback(
        (rowData) => serviceLib.dateFormatHMS(rowData.ETD),
        [serviceLib],
    );

    const onSelectLeft = React.useCallback(
        (e) => {
            const next = e.value || [];
            setFlagSelectModeTBL_KSV_PO_MRP(true);
            setSelectedTBL_KSV_PO_MRP(next);
            onRowClick1TBL_KSV_PO_MRP(next);
        },
        [onRowClick1TBL_KSV_PO_MRP],
    );

    const [hoveredShipmentCd, setHoveredShipmentCd] = useState("");
    const onSelectRight = React.useCallback(
        (e) => {
            const next = e.value || [];
            setFlagSelectModeTBL_KSV_PO_MRP2(true);
            setSelectedTBL_KSV_PO_MRP2(next);
            onRowClick1TBL_KSV_PO_MRP2(next);
        },
        [onRowClick1TBL_KSV_PO_MRP2],
    );

    const onRowClickLeft = React.useCallback(
        (e) => {
            const rowData = e.data;
            if (!rowData) return;

            setFlagSelectModeTBL_KSV_PO_MRP(false);

            // 하단 세팅
            onRowClick1TBL_KSV_PO_MRP(rowData);
        },
        [onRowClick1TBL_KSV_PO_MRP],
    );

    const [popupVisible, setPopupVisible] = useState(false);
    const [popupTableData, setPopupTableData] = useState([]);

    const onRowClickRight = React.useCallback(
        (e) => {
            const rowData = e.data;
            if (!rowData) return;

            const target = e.originalEvent?.target;

            if (
                target?.closest(".p-checkbox") ||
                target?.closest(".p-selection-column")
            ) {
                return;
            }

            setHoveredShipmentCd(rowData.SHIPMENT_CD);
            setFlagSelectModeTBL_KSV_PO_MRP2(false);
            serachRightDetailTable(rowData);
            onRowClick1TBL_KSV_PO_MRP2(rowData);
        },
        [onRowClick1TBL_KSV_PO_MRP2],
    );

    const serachRightDetailTable = useCallback((argData) => {
        if (!argData?.SHIPMENT_CD) return;

        const tInObj = {
            SHIPMENT_CD: argData.SHIPMENT_CD,
            STATUS: "",
            REMARK: "",
        };

        serviceS043401_SHIPMENT_INFO.mgrQuery_LIST_1(tInObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                const tArray = data.map((col, idx) => ({
                    ...col,
                    id: idx + 1,
                }));

                // console.log('=====> Won2', tArray);

                setPopupTableData(tArray);

                // setPopupVisible(true);
            } else {
                console.log(
                    "mgrQuery_LIST_1 error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    }, [serviceS043401_SHIPMENT_INFO]);

    const onClickDeleteShipmentDetail = useCallback((rowData) => {
        confirmDialog({
            message: "Do you want remove item?",
            header: "Confirm",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Yes",
            rejectLabel: "No",
            className: "big-confirm-dialog",
            accept: () => {
                serviceS043401_SHIPMENT_INFO
                    .mgrUpdate_REMOVE_ITEM({ SHIPMENT_CD: hoveredShipmentCd }, [
                        { STSOUT_CD: rowData.STSOUT_CD },
                    ])
                    .then(() => {
                        rowData.SHIPMENT_CD = hoveredShipmentCd;
                        serachRightDetailTable(rowData);
                    });
            },
        });
    }, [hoveredShipmentCd, serachRightDetailTable, serviceS043401_SHIPMENT_INFO]);

    const deleteRowButtonBody = useCallback((rowData) => {
        return (
            <Button
                icon="pi pi-trash"
                className="p-button-sm p-button-info"
                onClick={() => onClickDeleteShipmentDetail(rowData)}
            />
        );
    }, [onClickDeleteShipmentDetail]);

    const shipmentTablesView = useMemo(
        () => (
            <ShipmentTables
                dt_TBL_KSV_PO_MRP={dt_TBL_KSV_PO_MRP}
                datasTBL_KSV_PO_MRP={datasTBL_KSV_PO_MRP}
                loadingTBL_KSV_PO_MRP={loadingTBL_KSV_PO_MRP}
                selectedTBL_KSV_PO_MRP={selectedTBL_KSV_PO_MRP}
                onSelectLeft={onSelectLeft}
                onRowClickLeft={onRowClickLeft}
                serviceLib={serviceLib}
                dt_TBL_KSV_PO_MRP2={dt_TBL_KSV_PO_MRP2}
                datasTBL_KSV_PO_MRP2={datasTBL_KSV_PO_MRP2}
                loadingTBL_KSV_PO_MRP2={loadingTBL_KSV_PO_MRP2}
                selectedTBL_KSV_PO_MRP2={selectedTBL_KSV_PO_MRP2}
                popupTableData={popupTableData}
                onSelectRight={onSelectRight}
                onRowClickRight={onRowClickRight}
                deleteRowButtonBody={deleteRowButtonBody}
            />
        ),
        [
            datasTBL_KSV_PO_MRP,
            loadingTBL_KSV_PO_MRP,
            selectedTBL_KSV_PO_MRP,
            onSelectLeft,
            onRowClickLeft,
            serviceLib,
            datasTBL_KSV_PO_MRP2,
            loadingTBL_KSV_PO_MRP2,
            selectedTBL_KSV_PO_MRP2,
            popupTableData,
            onSelectRight,
            onRowClickRight,
            deleteRowButtonBody,
        ],
    );

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{
                    width: "123rem",
                    height: "5rem",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignSelf: "center",
                }}
            >
                <div style={{ width: "81rem" }}>
                    <div
                        style={{
                            display: "flex",
                            gap: "0.5rem",
                            marginBottom: "0.5rem",
                            paddingTop: "1rem",
                            alignItems: "center",
                        }}
                    >
                        <p style={{ width: "6rem" }}> Ready Date </p>
                        <Calendar
                            showButtonBar
                            style={{ width: "6rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_READY_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_PO_MRP.S_READY_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_S_READY_DATE(
                                    e,
                                    "S_READY_DATE",
                                )
                            }
                        />

                        <p style={{ width: "1rem" }}> ~ </p>
                        <Calendar
                            showButtonBar
                            style={{ width: "6rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_READY_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_PO_MRP.E_READY_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_E_READY_DATE(
                                    e,
                                    "E_READY_DATE",
                                )
                            }
                        />

                        <p style={{ width: "4rem" }}> Origin </p>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_ORIGIN_PORT"
                            value={dataQRY_KSV_PO_MRP_ORIGIN_PORT}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_ORIGIN_PORT(
                                    e,
                                    "ORIGIN_PORT",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_ORIGIN_PORT}
                            optionLabel="CD_NAME"
                            placeholder=""
                            filter
                        ></Dropdown>
                        <p style={{ width: "6rem" }}> Destination </p>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_ORIGIN_PORT"
                            value={dataQRY_KSV_PO_MRP_DESTINATION}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_DESTINATION(
                                    e,
                                    "DESTINATION",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_DESTINATION}
                            optionLabel="CD_NAME"
                            placeholder=""
                            filter
                        ></Dropdown>
                        <p style={{ width: "6rem" }}> Ship Mode </p>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_ORIGIN_PORT"
                            value={dataQRY_KSV_PO_MRP_SHIP_MODE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_SHIP_MODE(
                                    e,
                                    "SHIP_MODE",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_SHIP_MODE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            filter
                        ></Dropdown>
                        <p style={{ width: "3rem" }}> PO# </p>
                        <InputText
                            style={{ width: "8rem" }}
                            id="id_BL_FILE"
                            value={dataQRY_KSV_PO_MRP.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_PO_CD(e, "PO_CD")
                            }
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: "0.5rem",
                            marginBottom: "0.5rem",
                        }}
                    >
                        <p style={{ width: "6rem" }}> Supplier </p>
                        <InputText
                            style={{ width: "11rem" }}
                            id="id_BL_FILE"
                            value={dataQRY_KSV_PO_MRP.SUPPLIER}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP(e, "SUPPLIER")
                            }
                        />

                        <p style={{ width: "10rem" }}> Singapore Combine </p>
                        <Checkbox
                            id="id_IS_SINGAPORE"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MRP.IS_SINGAPORE,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeEDT_KSV_PO_MRP_IS_SINGAPORE_QRY(
                                    e,
                                    "IS_SINGAPORE",
                                )
                            }
                        />

                        <Tooltip
                            className="menuCodeTooltip"
                            target={`#btnSearch`}
                            content={`Alt+S`}
                            position="bottom"
                        />

                        <p style={{ width: "5rem" }}></p>
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
                </div>

                <div style={{ width: "calc(100% - 82rem)" }}>
                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            paddingTop: "1rem",
                            alignItems: "center",
                        }}
                    >
                        <p style={{ width: "3rem" }}> Origin </p>
                        <Dropdown
                            style={{ width: "9rem" }}
                            value={dataQRY_KSV_PO_MRP_ORIGIN_PORT_SEARCH2}
                            onChange={(e) =>
                                onDropdownChangeQRY_SEARCH_2(e, "ORIGIN_PORT")
                            }
                            options={datasQRY_KSV_PO_MRP_ORIGIN_PORT}
                            optionLabel="CD_NAME"
                            placeholder=""
                            filter
                        ></Dropdown>
                        <p style={{ width: "6rem" }}> Destination </p>
                        <Dropdown
                            style={{ width: "9rem" }}
                            value={dataQRY_KSV_PO_MRP_DESTINATION_SEARCH2}
                            onChange={(e) =>
                                onDropdownChangeQRY_SEARCH_2(e, "DESTINATION")
                            }
                            options={datasQRY_KSV_PO_MRP_DESTINATION}
                            optionLabel="CD_NAME"
                            placeholder=""
                            filter
                        ></Dropdown>
                        <p style={{ width: "4rem" }}> Invoice# </p>
                        <InputText
                            style={{ width: "12rem" }}
                            value={dataQRY_KSV_PO_MRP_INVOICE_NO}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_INVOICE_NO(
                                    e,
                                    "INVOICE_NO",
                                )
                            }
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: "0.5rem",
                            paddingTop: "0.5rem",
                        }}
                    >
                        <Button
                            label={
                                <span>
                                    Search(<u>2</u>)
                                </span>
                            }
                            accessKey="2"
                            id="btnSearch"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={search_LIST_2}
                        />

                        <Button
                            label="Add Ship"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={process_ADD_SHIP}
                        />
                    </div>
                </div>
            </div>
            {shipmentTablesView}

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "12rem" }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginTop: "1rem",
                        flexWrap: "wrap",
                    }}
                >
                    <p style={{ width: "10rem", color: "red" }}> *Ship Mode</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Dropdown
                            style={{ width: "12rem" }}
                            id="id_SHIP_MODE"
                            value={dataEDT_KSV_PO_MRP_SHIP_MODE}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PO_MRP_SHIP_MODE(
                                    e,
                                    "SHIP_MODE",
                                )
                            }
                            options={datasEDT_KSV_PO_MRP_SHIP_MODE}
                            optionLabel="CD_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                    <p style={{ width: "10rem" }}> Forward </p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Dropdown
                            style={{ width: "12rem" }}
                            id="id_PLACE_CD"
                            value={dataEDT_KSV_PO_MRP_PLACE_CD}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PO_MRP_PLACE_CD(
                                    e,
                                    "PLACE_CD",
                                )
                            }
                            options={datasEDT_KSV_PO_MRP_PLACE_CD}
                            optionLabel="PLACE_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>

                    <p style={{ width: "10rem" }}> ETA(T) </p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "12rem" }}
                            dateFormat="yy-mm-dd"
                            value={changeDateVal(dataEDT_KSV_PO_MRP.ETA_T)}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_PO_MRP_ETD(e, "ETA_T")
                            }
                        />
                    </div>
                    <p style={{ width: "10rem" }}> ETA </p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "12rem" }}
                            dateFormat="yy-mm-dd"
                            value={changeDateVal(dataEDT_KSV_PO_MRP.ETA)}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_PO_MRP_ETD(e, "ETA")
                            }
                        />
                    </div>
                </div>

                <span className="af-span-3" style={{ width: "23rem" }}>
                    <p
                        className="af-span-p"
                        style={{ width: "10rem", color: "red" }}
                    >*Origin</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Dropdown
                            style={{ width: "12rem" }}
                            id="id_ORIGIN_PORT"
                            value={dataEDT_KSV_PO_MRP_ORIGIN_PORT}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PO_MRP_ORIGIN_PORT(
                                    e,
                                    "ORIGIN_PORT",
                                )
                            }
                            options={datasEDT_KSV_PO_MRP_ORIGIN_PORT}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Ship Line</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Dropdown
                            disabled={isShipLineDisabled}
                            style={{ width: "12rem" }}
                            id="id_SHIP_LINE"
                            value={dataEDT_KSV_PO_MRP_SHIP_LINE}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PO_MRP_SHIP_LINE(
                                    e,
                                    "SHIP_LINE",
                                )
                            }
                            options={datasEDT_KSV_PO_MRP_SHIP_LINE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>BL#</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            disabled={s11Disabled}
                            style={{ width: "12rem" }}
                            id="id_BL_NO"
                            value={dataEDT_KSV_PO_MRP.BL_NO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_BL_NO(e, "BL_NO")
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "23rem" }}>
                    <p
                        className="af-span-p"
                        style={{ width: "10rem", color: "red" }}
                    >*ETD</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "12rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(dataEDT_KSV_PO_MRP.ETD)}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_PO_MRP_ETD(e, "ETD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Container#</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            disabled={s11Disabled}
                            style={{ width: "12rem" }}
                            id="id_CONTAINER_NO"
                            value={dataEDT_KSV_PO_MRP.CONTAINER_NO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_CONTAINER_NO(
                                    e,
                                    "CONTAINER_NO",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Invoice#</p>
                    <div className="af-span-div" style={{ width: "40rem" }}>
                        <InputText
                            style={{ width: "40rem" }}
                            id="id_CI_FILE"
                            value={dataEDT_KSV_PO_MRP.INVOICE_NO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_INVOICE_NO(
                                    e,
                                    "INVOICE_NO",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "23rem" }}>
                    <p
                        className="af-span-p"
                        style={{ width: "10rem", color: "red" }}
                    >*Destination</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Dropdown
                            style={{ width: "12rem" }}
                            id="id_DESTINATION"
                            value={dataEDT_KSV_PO_MRP_DESTINATION}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PO_MRP_DESTINATION(
                                    e,
                                    "DESTINATION",
                                )
                            }
                            options={datasEDT_KSV_PO_MRP_DESTINATION}
                            optionLabel="CD_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Singapore Combine</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_IS_SINGAPORE"
                            checked={changeCheckBoxVal(
                                dataEDT_KSV_PO_MRP.IS_SINGAPORE,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeEDT_KSV_PO_MRP_IS_SINGAPORE(
                                    e,
                                    "IS_SINGAPORE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "73rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Remark</p>
                    <div className="af-span-div" style={{ width: "40rem" }}>
                        <InputText
                            style={{ width: "40rem" }}
                            value={dataEDT_KSV_PO_MRP.REMARK}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_REMARK(e, "REMARK")
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Ship Regist"
                            className="p-button-text"
                            onClick={process_INSERT_SHIPMENT}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={process_RESET}
                        />
                    </div>
                </span>
            </div>

            <Toast ref={toast} />

            <Dialog
                visible={popupVisible}
                style={{ width: "750px", height: " 250px", paddingTop: "0.5rem" }}
                header="Shipment Detail (For close this, Press [ESC])"
                modal
                onHide={() => setPopupVisible(false)}
                position="bottom-right"
                className="shipment-dialog"
            >
                <AFDataTable preventUnrelatedRerender
                    value={popupTableData}
                    size="small"
                    showGridlines
                    responsiveLayout="scroll"
                >
                    <AFColumn field="REG_USER" header="Purchaser" />
                    <AFColumn field="BUYER_CD" header="Buyer#" />
                    <AFColumn field="PO_CD2" header="PO#" />
                    <AFColumn field="VENDOR_NAME" header="Supplier" />
                    <AFColumn field="READY_DATE" header="Ready Date" body={(rowData) => serviceLib.dateFormat(rowData.READY_DATE) } />

                    <AFColumn field="TARGET_ETA" header="ETA(T)" body={(rowData) => serviceLib.dateFormat(rowData.TARGET_ETA) } />

                    <AFColumn field="WEIGHT" header="Weight" body={(rowData) => Number(rowData.WEIGHT || 0).toFixed(2) } bodyStyle={{ textAlign: "right" }} />

                    <AFColumn field="CBM" header="CBM" body={(rowData) => Number(rowData.CBM || 0).toFixed(4)} bodyStyle={{ textAlign: "right" }} />

                    <AFColumn header="Remove" body={deleteRowButtonBody} style={{ width: "4rem", textAlign: "center" }} />
                </AFDataTable>
            </Dialog>
            <ConfirmDialog />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0433_SHIPMENT_REGIST, comparisonFn);
