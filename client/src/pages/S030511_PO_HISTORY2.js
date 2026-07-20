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

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS030511_PO_HISTORY2 } from "../service/service_biz/ServiceS030511_PO_HISTORY2";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MST = {
    PO_CD: "",
    PO_STATUS: "",
};

const emptyTBL_KSV_PO_MST = {
    id: 0,
    ORDER_CD: "",
    STYLE_NAME: "",
    TOT_CNT: "",
    SIZE1_CNT: "",
};

const emptyTBL_KSV_PO_MST1 = {
    id: 0,
    PO_SEQ: "",
    ORDER_CD: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    ORDER_STATUS: "",
    MRP_QTY: "",
    ORDER_QTY: "",
    CHANGE_QTY: "",
    CHANGE_KIND: "",
    PRICE: "",
    CURR_CD: "",
    AMOUNT: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
};

const emptyTBL_KSV_PO_MST2 = {
    id: 0,
    PO_SEQ: "",
    ORDER_CD: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    ORDER_STATUS: "",
    ORG_SEQ: "",
    ORDER_QTY: "",
    CHANGE_QTY: "",
    CHANGE_KIND: "",
    REMARK: "",
    PRICE: "",
    CURR_CD: "",
    AMOUNT: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
};

const S030511_PO_HISTORY2 = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS030511_PO_HISTORY2Ref = useRef(null);
    if (!serviceS030511_PO_HISTORY2Ref.current) serviceS030511_PO_HISTORY2Ref.current = new ServiceS030511_PO_HISTORY2();
    const serviceS030511_PO_HISTORY2 = serviceS030511_PO_HISTORY2Ref.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* QRY KSV_PO_MST*/
    const [dataQRY_KSV_PO_MST, setDataQRY_KSV_PO_MST] =
        useState(emptyQRY_KSV_PO_MST);

    const onInputChangeQRY_KSV_PO_MST_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const [datasQRY_KSV_PO_MST_PO_SEQ, setDatasQRY_KSV_PO_MST_PO_SEQ] =
        useState([]);
    const [dataQRY_KSV_PO_MST_PO_SEQ, setDataQRY_KSV_PO_MST_PO_SEQ] = useState(
        {},
    );

    /*TABLE KSV_PO_MST */
    // DEFINE DATAGRID : TBL_KSV_PO_MST
    const [datasTBL_KSV_PO_MST_COLS, setDatasTBL_KSV_PO_MST_COLS] = useState(
        [],
    );
    const [datasTBL_KSV_PO_MST, setDatasTBL_KSV_PO_MST] = useState([]);
    const dt_TBL_KSV_PO_MST = useRef(null);
    const [dataTBL_KSV_PO_MST, setDataTBL_KSV_PO_MST] =
        useState(emptyTBL_KSV_PO_MST);
    const [selectedTBL_KSV_PO_MST, setSelectedTBL_KSV_PO_MST] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MST, setFlagSelectModeTBL_KSV_PO_MST] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MST
    const dynamicColumnsTBL_KSV_PO_MST = datasTBL_KSV_PO_MST_COLS.map(
        (col, i) => {
            var tHeader = `id_msg_${col.ORDER_CD}_KSV_PO_MST_dt`;
            var tHeaderStr = serviceLib.getLocaleMessage(tHeader);
            var tColName = `${col.ORDER_CD}`;
            // return  <AFColumn field={col.field} header={tHeaderStr} headerStyle={{ width: '10rem',height:'1.8rem' }} bodyStyle={{ width: '10rem',height:'1.8rem' }} editor={(options) => cellEditorKSV_ORDER_MEM(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_MEM}></AFColumn>
            return (
                <AFColumn field={tColName} header={tHeaderStr} headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
            );
        },
    );

    const onRowClick1TBL_KSV_PO_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MST = argData;

        setDataTBL_KSV_PO_MST(argTBL_KSV_PO_MST);
    };

    const onRowClickTBL_KSV_PO_MST = (event) => {
        let argTBL_KSV_PO_MST = event.data;
        if (flagSelectModeTBL_KSV_PO_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MST
    };

    /**TABLE KSV_PO_MST1 */
    // DEFINE DATAGRID : TBL_KSV_PO_MST1
    const [datasTBL_KSV_PO_MST1, setDatasTBL_KSV_PO_MST1] = useState([]);
    const dt_TBL_KSV_PO_MST1 = useRef(null);
    const [dataTBL_KSV_PO_MST1, setDataTBL_KSV_PO_MST1] =
        useState(emptyTBL_KSV_PO_MST1);
    const [selectedTBL_KSV_PO_MST1, setSelectedTBL_KSV_PO_MST1] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MST1, setFlagSelectModeTBL_KSV_PO_MST1] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MST1

    /**TABLE KSV_PO_MST2 */
    // DEFINE DATAGRID : TBL_KSV_PO_MST2
    const [datasTBL_KSV_PO_MST2, setDatasTBL_KSV_PO_MST2] = useState([]);
    const dt_TBL_KSV_PO_MST2 = useRef(null);
    const [dataTBL_KSV_PO_MST2, setDataTBL_KSV_PO_MST2] =
        useState(emptyTBL_KSV_PO_MST2);
    const [selectedTBL_KSV_PO_MST2, setSelectedTBL_KSV_PO_MST2] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MST2, setFlagSelectModeTBL_KSV_PO_MST2] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MST2

    useEffect(() => {
        let tParam = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            var tParams2 = tParams1.map((col, i) => {
                var tObj = {};
                var tCols = col.split("=");

                if (tCols[0].includes("PO_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    console.log(tObj);
                    return tObj;
                }
            });
            if (tParams2.length > 0) {
                tParam = tParams2[0].value;
            }
            console.log(tParams2);
        }

        if (tParam !== "") {
            console.log("S0305 Po Cd :(param)" + tParam);
        } else {
            tParam = localStorage.getItem("AF_S0305_PO_CD");
            console.log("S0305 Po Cd: (localstorage)" + tParam);
            if (tParam === null) tParam = "PO23-0229";
        }

        var tObj = {};
        // tObj.PO_CD = 'EO17-0123';
        tObj.PO_CD = tParam;
        tObj.PO_STATUS = "";
        setDataQRY_KSV_PO_MST(tObj);

        var tObj1 = {};
        // tObj1.PO_CD = 'EO17-0123';
        tObj1.PO_CD = tParam;

        serviceS030511_PO_HISTORY2
            .mgrQuery_KSV_ORDER_MST(tObj1)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQuery_KSV_ORDER_MST call => " + data.length,
                    );

                    setDatasTBL_KSV_PO_MST_COLS(data[0].ORDERS);

                    var tRetObjs = data.map((col, i) => {
                        var tObj = { ...col };

                        var tIdx = 0;
                        for (tIdx = 0; tIdx < col.ORDERS.length; tIdx++) {
                            var tColOne = col.ORDERS[tIdx];
                            tObj[`${tColOne.ORDER_CD}`] = tColOne.SUM_QTY;
                        }

                        return tObj;
                    });
                    setDatasTBL_KSV_PO_MST(tRetObjs);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    }, []);

    const blankFn = () => {};

    // Support Area

    return (
        <div>
            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "100rem",
                    height: "2rem",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "23rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>PO#</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                        id="id_PO_CD"
                        value={dataQRY_KSV_PO_MST.PO_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MST_PO_CD(e, "PO_CD")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "23rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>Status</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                        id="id_PO_CD"
                        value={dataQRY_KSV_PO_MST.PO_STATUS}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MST_PO_CD(e, "PO_STATUS")
                        }
                    />
                </span>
            </div>
            <div style={{ width: "100rem", height: "2rem" }}></div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "50rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MST}
                    size="small"
                    value={datasTBL_KSV_PO_MST}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MST}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MST(true);
                        setSelectedTBL_KSV_PO_MST(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KSV_PO_MST.length,
                        );
                        onRowClick1TBL_KSV_PO_MST(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MST}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 24 }}
                    emptyMessage="No TBL_KSV_PO_MST found."
                    //header={headerTBL_KSV_PO_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="48rem"
                >
                    <AFColumn field="VENDOR_NAME" header="Supplier" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" header="Matl" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="COLOR" header="Color" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="SPEC" header="Spec" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MATL_CD" header="M.Code" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="QTY_TYPE" header="Qty.T" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="TOT_QTY" header="Tot Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MINI_QTY" header="Mini Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    {dynamicColumnsTBL_KSV_PO_MST}
                </AFDataTable>
            </div>

            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "1rem" }}
            >
                <Button
                    style={{ display: "inline-block", width: "10rem" }}
                    label="조회"
                    icon="pi pi-times"
                    className="p-button-text"
                    onClick={blankFn}
                />

                <Button
                    style={{ display: "inline-block", width: "20rem" }}
                    label="발주수량가져오기"
                    icon="pi pi-check"
                    className="p-button-text"
                    onClick={blankFn}
                />

                <Button
                    style={{ display: "inline-block", width: "20rem" }}
                    label="입고수량초기화"
                    icon="pi pi-check"
                    className="p-button-text"
                    onClick={blankFn}
                />

                <Button
                    style={{ display: "inline-block", width: "15rem" }}
                    label="입고수량수정"
                    icon="pi pi-check"
                    className="p-button-text"
                    onClick={blankFn}
                />

                <Button
                    style={{ display: "inline-block", width: "15rem" }}
                    label="입고수량확정"
                    icon="pi pi-check"
                    className="p-button-text"
                    onClick={blankFn}
                />

                <Button
                    style={{ display: "inline-block", width: "10rem" }}
                    label="확정취소"
                    icon="pi pi-check"
                    className="p-button-text"
                    onClick={blankFn}
                />
            </div>

            <Divider />

            <div style={{ width: "100rem", height: "30rem" }}>
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "60rem", height: "30rem" }}></div>

                    <div style={{ width: "40rem", height: "30rem" }}></div>
                </div>
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S030511_PO_HISTORY2, comparisonFn);
