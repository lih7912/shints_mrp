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
import { ServiceS0404_PO_LIST } from "../service/service_biz/ServiceS0404_PO_LIST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    PO_CD: "",
    ORDER_CD: "",
};

const emptyQRY_KSV_PO_MRP1 = {
    BUYER_CD: "",
    FACTORY_CD: "",
    COL1: "",
};

const emptyTBL_KSV_PO_MATLLIST = {
    id: 0,
    REG_USER: "",
    VENDOR_NAME: "",
    PR_NUM: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    TOT_CNT: "",
    STOCK_QTY: "",
    BAL_QTY: "",
};

const emptyEDT_KSV_PO_MATLLIST = {
    REG_USER: "",
    VENDOR_NAME: "",
    PR_NUM: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    TOT_CNT: "",
    STOCK_QTY: "",
    BAL_QTY: "",
};

const S0404_PO_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0404_PO_LISTRef = useRef(null);
    if (!serviceS0404_PO_LISTRef.current) serviceS0404_PO_LISTRef.current = new ServiceS0404_PO_LIST();
    const serviceS0404_PO_LIST = serviceS0404_PO_LISTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP] =
        useState(emptyQRY_KSV_PO_MRP);

    const [datasQRY_KSV_PO_MRP_PO_CD, setDatasQRY_KSV_PO_MRP_PO_CD] = useState(
        [],
    );
    const [dataQRY_KSV_PO_MRP_PO_CD, setDataQRY_KSV_PO_MRP_PO_CD] = useState(
        {},
    );

    const onDropdownChangeQRY_KSV_PO_MRP_PO_CD = (e, name) => {
        let val = "";
        console.log(typeof e.value);

        if (typeof e.value === "string") {
            val = e.value;
        } else {
            val = (e.value && e.value.PO_CD) || "";
        }

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_PO_CD(e.value);

        console.log("PO_CD change:" + val);
        if (val.length < 9) return;

        var _tObj = {};
        _tObj.PO_CD = val;
        _tObj.ORDER_CD = "";
        serviceS0404_PO_LIST.mgrQueryTBL_KSV_PO_MATLLIST(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                setDatasTBL_KSV_PO_MATLLIST(data);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const onInputChangeQRY_KSV_PO_MRP_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    /* QRY KSV_PO_MRP1*/

    const [dataQRY_KSV_PO_MRP1, setDataQRY_KSV_PO_MRP1] =
        useState(emptyQRY_KSV_PO_MRP1);

    const [datasQRY_KSV_PO_MRP1_BUYER_CD, setDatasQRY_KSV_PO_MRP1_BUYER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_BUYER_CD, setDataQRY_KSV_PO_MRP1_BUYER_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP1_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
        setDataQRY_KSV_PO_MRP1_BUYER_CD(e.value);
    };

    const [
        datasQRY_KSV_PO_MRP1_FACTORY_CD,
        setDatasQRY_KSV_PO_MRP1_FACTORY_CD,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP1_FACTORY_CD, setDataQRY_KSV_PO_MRP1_FACTORY_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP1_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
        setDataQRY_KSV_PO_MRP1_FACTORY_CD(e.value);
    };

    const [datasQRY_KSV_PO_MRP1_QRY_CD_3, setDatasQRY_KSV_PO_MRP1_QRY_CD_3] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_QRY_CD_3, setDataQRY_KSV_PO_MRP1_QRY_CD_3] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP1_QRY_CD_3 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
        setDataQRY_KSV_PO_MRP1_QRY_CD_3(e.value);
    };

    /**TABLE KSV_PO_MATLLIST */
    // DEFINE DATAGRID : TBL_KSV_PO_MATLLIST
    const [datasTBL_KSV_PO_MATLLIST, setDatasTBL_KSV_PO_MATLLIST] = useState(
        [],
    );
    const dt_TBL_KSV_PO_MATLLIST = useRef(null);
    const [dataTBL_KSV_PO_MATLLIST, setDataTBL_KSV_PO_MATLLIST] = useState(
        emptyTBL_KSV_PO_MATLLIST,
    );
    const [selectedTBL_KSV_PO_MATLLIST, setSelectedTBL_KSV_PO_MATLLIST] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_PO_MATLLIST,
        setFlagSelectModeTBL_KSV_PO_MATLLIST,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MATLLIST

    const onRowClick1TBL_KSV_PO_MATLLIST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MATLLIST = argData;

        setDataTBL_KSV_PO_MATLLIST(argTBL_KSV_PO_MATLLIST);
    };

    const onRowClickTBL_KSV_PO_MATLLIST = (event) => {
        let argTBL_KSV_PO_MATLLIST = event.data;
        if (flagSelectModeTBL_KSV_PO_MATLLIST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MATLLIST
    };

    const searchTBL_KSV_PO_MATLLIST = () => {
        clearSelectedTBL_KSV_PO_MATLLIST();

        // serviceS0404_PO_LIST.mgrQueryTBL_KSV_PO_MATLLIST(dataQRY_KSV_PO_MATLLIST).then(data => {
        //     if (typeof data.graphQLErrors === 'undefined') {
        //         console.log("ServiceNawooAll.mgrQueryTBL_KSV_PO_MATLLIST() call => " + data.length);
        //         setDatasTBL_KSV_PO_MATLLIST(data);
        //     } else {
        //         // var tStr = data.graphQLErrors[0].message;
        //         console.log("ServiceNawooAll.mgrQueryTBL_KSV_PO_MATLLIST()error => " + JSON.stringify(data.graphQLErrors));
        //
        //     }
        // });

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MATLLIST
    };

    const clearSelectedTBL_KSV_PO_MATLLIST = () => {
        setSelectedTBL_KSV_PO_MATLLIST([]);
        setFlagSelectModeTBL_KSV_PO_MATLLIST(false);
    };

    const exportExcelTBL_KSV_PO_MATLLIST = () => {};

    /**EDIT KSV_PO_MATLLIST */
    const [datasEDT_KSV_PO_MATLLIST, setDatasEDT_KSV_PO_MATLLIST] = useState(
        [],
    );
    const [dataEDT_KSV_PO_MATLLIST, setDataEDT_KSV_PO_MATLLIST] = useState(
        emptyEDT_KSV_PO_MATLLIST,
    );

    useEffect(() => {
        var tObj = { ...emptyQRY_KSV_PO_MRP };

        serviceS0404_PO_LIST.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.PO_CD.length,
                );
                setDatasQRY_KSV_PO_MRP_PO_CD(data.PO_CD);
                setDataQRY_KSV_PO_MRP_PO_CD(data.PO_CD[0]);

                setDatasQRY_KSV_PO_MRP1_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_PO_MRP1_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_PO_MRP1_FACTORY_CD(data.FACTORY_CD);
                setDataQRY_KSV_PO_MRP1_FACTORY_CD(data.FACTORY_CD[0]);
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
                    width: "49rem",
                    height: "10rem",
                    float: "left",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "49rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>PO</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                    >
                        <Dropdown
                            id="id_PO_CD"
                            value={dataQRY_KSV_PO_MRP_PO_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_PO_CD(e, "PO_CD")
                            }
                            options={datasQRY_KSV_PO_MRP_PO_CD}
                            optionLabel="PO_CD"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                    <p style={{ width: "10rem", display: "inline-block" }}>
                        
                        <Checkbox /> Include Price
                    </p>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "49rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Order</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                    >
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "15rem",
                            }}
                            id="id_REG_USER"
                            value={dataQRY_KSV_PO_MRP.ORDER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_ORDER_CD(
                                    e,
                                    "ORDER_CD",
                                )
                            }
                        />
                    </div>
                    <Button
                        label="Matl List(Combined)"
                        className="p-button-text"
                        onClick={searchTBL_KSV_PO_MATLLIST}
                    />
                </span>
                <span style={{ marginLeft: "5rem", marginTop: "3.5rem" }}>
                    <Button
                        label="Matl List Insert"
                        className="p-button-text"
                        onClick={searchTBL_KSV_PO_MATLLIST}
                    />
                    <Button
                        label="Remark Update"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_PO_MATLLIST}
                    />
                    <Button
                        label="Reset"
                        className="p-button-text"
                        onClick={searchTBL_KSV_PO_MATLLIST}
                    />
                    <Button
                        label="Matl List(Point)"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_PO_MATLLIST}
                    />
                </span>
                <span style={{ marginLeft: "30rem" }}>
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
                        style={{ height: "1.1rem" }}
                        icon="pi pi-search"
                        className="p-button-text"
                        onClick={searchTBL_KSV_PO_MATLLIST}
                    />

                    <Button
                        label="Excel"
                        style={{ height: "1.1rem", color: "green" }}
                        icon="pi pi-upload"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_PO_MATLLIST}
                    />
                </span>
            </div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "49rem",
                    height: "14rem",
                    float: "left",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>Report</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "28.5rem",
                        }}
                    >
                        <Dropdown
                            id="id_QRY_CD_1"
                            style={{ width: "28.5rem" }}
                            value={dataQRY_KSV_PO_MRP1_QRY_CD_3}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP1_QRY_CD_3(
                                    e,
                                    "QRY_CD_3",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP1_BUYER_CD}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "33rem",
                    }}
                >
                    {/* <p style={{ width: '8rem', display: 'inline-block' }}> Qry2 </p> */}
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "16rem",
                        }}
                    >
                        <Dropdown
                            id="id_QRY_CD_2"
                            value={dataQRY_KSV_PO_MRP1_FACTORY_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP1_FACTORY_CD(
                                    e,
                                    "FACTORY_CD",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP1_FACTORY_CD}
                            optionLabel="FACTORY_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "16rem",
                        }}
                    >
                        <Dropdown
                            id="id_QRY_CD_3"
                            value={dataQRY_KSV_PO_MRP1_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP1_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP1_BUYER_CD}
                            optionLabel="COM_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span style={{ marginTop: "3.5rem", marginLeft: "2rem" }}>
                    <Button
                        label="Buyer Order QTY"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_PO_MATLLIST}
                    />
                </span>
                <div style={{ marginLeft: "2rem" }}>
                    <Button
                        label="Matl Card"
                        className="p-button-text"
                        onClick={searchTBL_KSV_PO_MATLLIST}
                    />
                    <Button
                        label="Matl List(Net QTY)"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_PO_MATLLIST}
                    />

                    <Button
                        label="Matl List(PO QTY)"
                        className="p-button-text"
                        onClick={searchTBL_KSV_PO_MATLLIST}
                    />
                </div>
                <div style={{ marginLeft: "2rem" }}>
                    <Button
                        label="Order QTY"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_PO_MATLLIST}
                    />
                    <Button
                        label="Matl List(In QTY)"
                        className="p-button-text"
                        onClick={searchTBL_KSV_PO_MATLLIST}
                    />
                    <Button
                        label="Matl List(Out QTY)"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_PO_MATLLIST}
                    />
                </div>
                <div style={{ marginLeft: "2rem" }}>
                    <Button
                        label="Order QTY2"
                        className="p-button-text"
                        onClick={searchTBL_KSV_PO_MATLLIST}
                    />
                    <Button
                        label="Proforma Invoice"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_PO_MATLLIST}
                    />

                    <Button
                        label="Product Base"
                        className="p-button-text"
                        onClick={searchTBL_KSV_PO_MATLLIST}
                    />
                </div>
            </div>
            <Divider />

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "28rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MATLLIST}
                    size="small"
                    value={datasTBL_KSV_PO_MATLLIST}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MATLLIST}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MATLLIST(true);
                        setSelectedTBL_KSV_PO_MATLLIST(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_PO_MATLLIST.length,
                        );
                        onRowClick1TBL_KSV_PO_MATLLIST(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MATLLIST}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 13 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MATLLIST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="26rem"
                >
                    <AFColumn field="REG_USER" header="Reg User" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" header="Supplier" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PR_NUM" header="Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MATL_CD" header="Matl Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" header="Description" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="COLOR" header="Color" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="SPEC" header="Spec" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="UNIT" header="Unit" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="TOT_CNT" header="Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="STOCK_QTY" header="Stock" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="COL1" header="Balance" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="REMARK" header="Remark" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "71rem" }}
            >
                <div className="formgrid grid">
                    <div className="field col-6 md:col-6">
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Reset"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Save"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Copy"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </div>
            </div>

            <Divider />
            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0404_PO_LIST, comparisonFn);
