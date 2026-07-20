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
import { ServiceS041202_CT_QTY_CHECK } from "../service/service_biz/ServiceS041202_CT_QTY_CHECK";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyTBL_KSV_STOCK_OUT = {
    id: 0,
    VENDOR_NAME: "",
    VENDOR_CD: "",
    PERMIT: "",
    PL_NO: "",
    PL_NO_D: "",
    PL_NO_Z: "",
    TOT_QTY: "",
};

const S041202_CT_QTY_CHECK = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS041202_CT_QTY_CHECKRef = useRef(null);
    if (!serviceS041202_CT_QTY_CHECKRef.current) serviceS041202_CT_QTY_CHECKRef.current = new ServiceS041202_CT_QTY_CHECK();
    const serviceS041202_CT_QTY_CHECK = serviceS041202_CT_QTY_CHECKRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* TABLE KSV_STOCK_OUT*/
    const process_UPDATE_PERMIT = () => {
        var tSrcData = { ...JSON.parse(localStorage.getItem("S041201_DATA")) };
        console.log(tSrcData);

        var tInputArray = datasTBL_KSV_STOCK_OUT.map((col, i) => {
            var tObj = { ...col };
            delete tObj.__typename;
            delete tObj.id;
            tObj.PACK_CD = tSrcData.PACK_CD;
            if (tObj.PERMIT === "") tObj.PERMIT = "N";
            return tObj;
        });

        serviceS041202_CT_QTY_CHECK
            .mgrInsert_CT_QTY_CHECK(tInputArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "SUCCESS:Save Permit",
                        detail: data[0].CODE,
                        life: 3000,
                    });
                    search_UPDATE_PERMIT();
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR:Save Permit",
                        detail: "",
                        life: 3000,
                    });
                    search_UPDATE_PERMIT();
                }
            });
    };

    const search_UPDATE_PERMIT = () => {
        var tSrcData = { ...JSON.parse(localStorage.getItem("S041201_DATA")) };
        console.log(tSrcData);

        var tObj = {};
        // tObj.PACK_CD = tSrcData.PACK_CD;
        // tObj.PACK_CD = 'STB-S22-033';
        // tObj.USER_ID = 'window';
        tObj.PACK_CD = tSrcData.PACK_CD;
        tObj.USER_ID = serviceLib.getUserInfo().USER_ID;
        serviceS041202_CT_QTY_CHECK
            .mgrQuery_CT_QTY_CHECK_PRE(tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    var tArray = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    setDatasTBL_KSV_STOCK_OUT(tArray);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    // DEFINE DATAGRID : TBL_KSV_STOCK_OUT
    const [datasTBL_KSV_STOCK_OUT, setDatasTBL_KSV_STOCK_OUT] = useState([]);
    const dt_TBL_KSV_STOCK_OUT = useRef(null);
    const [dataTBL_KSV_STOCK_OUT, setDataTBL_KSV_STOCK_OUT] = useState(
        emptyTBL_KSV_STOCK_OUT,
    );
    const [selectedTBL_KSV_STOCK_OUT, setSelectedTBL_KSV_STOCK_OUT] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KSV_STOCK_OUT,
        setFlagSelectModeTBL_KSV_STOCK_OUT,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_STOCK_OUT

    const onRowClick1TBL_KSV_STOCK_OUT = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_STOCK_OUT = argData;

        setDataTBL_KSV_STOCK_OUT(argTBL_KSV_STOCK_OUT);
    };

    const onRowClickTBL_KSV_STOCK_OUT = (event) => {
        let argTBL_KSV_STOCK_OUT = event.data;
        if (flagSelectModeTBL_KSV_STOCK_OUT) return;

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_OUT
    };

    /* */

    useEffect(() => {
        search_UPDATE_PERMIT();
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
            ></div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "28rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_STOCK_OUT}
                    size="small"
                    value={datasTBL_KSV_STOCK_OUT}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_STOCK_OUT}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_STOCK_OUT(true);
                        setSelectedTBL_KSV_STOCK_OUT(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_STOCK_OUT.length,
                        );
                        onRowClick1TBL_KSV_STOCK_OUT(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_STOCK_OUT}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 13 }}
                    emptyMessage=" " //header={headerTBL_KSV_STOCK_OUT}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="26rem"
                >
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PERMIT" headerClassName="t-header" header="Permit" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CT_QTY" headerClassName="t-header" header="PL1 Qty" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CT_QTY2" headerClassName="t-header" header="PL2 Qty" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="TOT" headerClassName="t-header" header="Tot" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="VENDOR_CD" headerClassName="t-header" header="Supplier Cd" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "51rem" }}
            >
                <div className="formgrid grid">
                    <div>
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Reset Permit"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Saved"
                            className="p-button-text"
                            onClick={blankFn}
                            disabled
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Inquiry"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Save Permit"
                            className="p-button-text"
                            onClick={process_UPDATE_PERMIT}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Excel"
                            className="p-button-text green"
                            onClick={blankFn}
                        />
                    </div>
                </div>
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

export default React.memo(S041202_CT_QTY_CHECK, comparisonFn);
