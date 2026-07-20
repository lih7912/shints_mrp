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
import { ServiceS060101_QRY_BILL_AMT } from "../service/service_biz/ServiceS060101_QRY_BILL_AMT";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyTBL_KSV_INVOICE_MST = {
    id: 0,
    BILL_DATE: "",
    BILL_AMT: "",
    REF_NO: "",
};

const emptyEDT_KSV_INVOICE_BILL = {
    INVOICE_NO: "",
};

const S060101_QRY_BILL_AMT = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS060101_QRY_BILL_AMTRef = useRef(null);
    if (!serviceS060101_QRY_BILL_AMTRef.current) serviceS060101_QRY_BILL_AMTRef.current = new ServiceS060101_QRY_BILL_AMT();
    const serviceS060101_QRY_BILL_AMT = serviceS060101_QRY_BILL_AMTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /*TABLE KSV_INVOICE_MST */
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST
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
    };

    const onRowClickTBL_KSV_INVOICE_MST = (event) => {
        let argTBL_KSV_INVOICE_MST = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST
    };

    /* EDIT KSV_INVOICE_BILL*/
    const [datasEDT_KSV_INVOICE_BILL, setDatasEDT_KSV_INVOICE_BILL] = useState(
        [],
    );
    const [dataEDT_KSV_INVOICE_BILL, setDataEDT_KSV_INVOICE_BILL] = useState(
        emptyEDT_KSV_INVOICE_BILL,
    );

    const onInputChangeEDT_KSV_INVOICE_BILL_INVOICE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_BILL = { ...dataEDT_KSV_INVOICE_BILL };

        let tTypeVal = _dataEDT_KSV_INVOICE_BILL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_BILL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_BILL[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_BILL(_dataEDT_KSV_INVOICE_BILL);
    };

    useEffect(() => {}, []);

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
                    ref={dt_TBL_KSV_INVOICE_MST}
                    size="small"
                    value={datasTBL_KSV_INVOICE_MST}
                    resizableColumns
                    columnResizeMode="fit"
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
                    virtualScrollerOptions={{ itemSize: 50 }}
                    emptyMessage="No TBL_KSV_INVOICE_MST found." //header={headerTBL_KSV_INVOICE_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="26rem"
                >
                    <AFColumn field="BILL_DATE" header="입금일자" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="BILL_AMT" header="입금액" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="REF_NO" header="Ref No" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div
                style={{ width: "100rem", height: "4rem", marginTop: "0.5rem" }}
            >
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "60rem", height: "4rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Invoice 번호</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_INVOICE_NO"
                                value={dataEDT_KSV_INVOICE_BILL.INVOICE_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_BILL_INVOICE_NO(
                                        e,
                                        "INVOICE_NO",
                                    )
                                }
                            />
                        </span>
                    </div>

                    <div style={{ width: "40rem", height: "4rem" }}></div>
                </div>
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S060101_QRY_BILL_AMT, comparisonFn);
