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

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS030512_PO_MAKE_MRP_FIRST } from "../service/service_biz/ServiceS030512_PO_MAKE_MRP_FIRST";

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
    USER_ID: "",
    PO_SEQ: "",
    MATL_NAME: "",
    VENDOR_CD: "",
};

const emptyTBL_KSV_PO_MST = {
    id: 0,
    PO_STATUS_NAME: "",
    PO_STATUS: "",
    PO_SEQ: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    PO_TYPE_NAME: "",
    PO_TYPE: "",
    PO_CD: "",
    TARGET_ETA: "",
    REG_DATETIME: "",
    REG_USER: "",
    UPD_DATETIME: "",
    UPD_USER: "",
    MRP_PACK_FNAME: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    DOMESTIC_FLAG: "",
    IMPORT_FLAG: "",
    FACTORY_FLAG: "",
};

const S030512_PO_MAKE_MRP_FIRST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS030512_PO_MAKE_MRP_FIRST =
        new ServiceS030512_PO_MAKE_MRP_FIRST();

    const toast = useRef(null);

    /* progress */
    const [isProgress, setIsProgress] = useState(false);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* QRY KSV_PO_MST*/
    const [dataQRY_KSV_PO_MST, setDataQRY_KSV_PO_MST] =
        useState(emptyQRY_KSV_PO_MST);

    const onInputChangeQRY_KSV_PO_MST_PO_SEQ = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onInputChangeQRY_KSV_PO_MST_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onInputChangeQRY_KSV_PO_MST_VENDOR_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const [datasQRY_KSV_PO_MST_PO_TYPE, setDatasQRY_KSV_PO_MST_PO_TYPE] =
        useState([]);
    const [dataQRY_KSV_PO_MST_PO_TYPE, setDataQRY_KSV_PO_MST_PO_TYPE] =
        useState({});

    const [datasQRY_KSV_PO_MST_PO_STATUS, setDatasQRY_KSV_PO_MST_PO_STATUS] =
        useState([]);
    const [dataQRY_KSV_PO_MST_PO_STATUS, setDataQRY_KSV_PO_MST_PO_STATUS] =
        useState({});

    const onInputChangeQRY_KSV_PO_MST_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const [datasQRY_KSV_PO_MST_BUYER_CD, setDatasQRY_KSV_PO_MST_BUYER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MST_BUYER_CD, setDataQRY_KSV_PO_MST_BUYER_CD] =
        useState({});

    /* TABLE_KSV_PO_MST*/
    // DEFINE DATAGRID : TBL_KSV_PO_MST
    const [datasTBL_KSV_PO_MST, setDatasTBL_KSV_PO_MST] = useState([]);
    const dt_TBL_KSV_PO_MST = useRef(null);
    const [dataTBL_KSV_PO_MST, setDataTBL_KSV_PO_MST] =
        useState(emptyTBL_KSV_PO_MST);
    const [selectedTBL_KSV_PO_MST, setSelectedTBL_KSV_PO_MST] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MST, setFlagSelectModeTBL_KSV_PO_MST] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MST
    const searchMRP = () => {
        var _userInfo = serviceLib.getUserInfo();

        var _qryObj = { ...dataQRY_KSV_PO_MST };
        _qryObj.USER_ID = _userInfo.USER_ID;

        serviceS030512_PO_MAKE_MRP_FIRST
            .mgrQuery_CURRENT_MRP(_qryObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    setDatasTBL_KSV_PO_MST(data);
                    if (data.length <= 0) {
                        var _qryObj0 = { ...dataQRY_KSV_PO_MST };
                        _qryObj0.PO_CD = _qryObj.PO_CD;
                        _qryObj0.USER_ID = _qryObj.USER_ID;
                        _qryObj0.PO_SEQ = _qryObj.PO_ESQ;
                        setDataQRY_KSV_PO_MST(_qryObj0);
                    } else {
                        var _qryObj0 = { ...dataQRY_KSV_PO_MST };
                        _qryObj0.PO_CD = _qryObj.PO_CD;
                        _qryObj0.USER_ID = _qryObj.USER_ID;
                        _qryObj0.PO_SEQ = String(data[0].PO_SEQ);
                        setDataQRY_KSV_PO_MST(_qryObj0);
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const makeMRP = () => {
        var _qryObj = { ...dataQRY_KSV_PO_MST };

        var _tObj = {};
        _tObj.PO_CD = _qryObj.PO_CD;
        _tObj.USER_ID = _qryObj.USER_ID;

        //setIsProgress(true);

        serviceS030512_PO_MAKE_MRP_FIRST.makeMRP(_tObj).then((data) => {
            setIsProgress(false);
            if (typeof data.graphQLErrors === "undefined") {
                // searchNewMRP();
                searchMRP();
                console.log("makeMRP call => " + data.length);
            } else {
                console.log(
                    "makeMRP error => " + JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

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
            console.log("S030512_PO_MAKE_MRP_FIRST PO_CD :(param)" + tParam);
        } else {
            tParam = localStorage.getItem("AF_S0305_PO_CD");
            console.log("S0305 Po Cd: (localstorage)" + tParam);
            if (tParam === null) tParam = "PO23-0230";
        }

        var _userInfo = serviceLib.getUserInfo();
        var _qryObj = { ...dataQRY_KSV_PO_MST };
        // _qryObj.PO_CD = 'PO23-0229';
        _qryObj.PO_CD = tParam;
        _qryObj.USER_ID = _userInfo.USER_ID;
        setDataQRY_KSV_PO_MST(_qryObj);

        serviceS030512_PO_MAKE_MRP_FIRST
            .mgrQuery_CURRENT_MRP(_qryObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    setDatasTBL_KSV_PO_MST(data);
                    if (data.length <= 0) {
                        var _qryObj0 = { ...dataQRY_KSV_PO_MST };
                        _qryObj0.PO_CD = _qryObj.PO_CD;
                        _qryObj0.USER_ID = _qryObj.USER_ID;
                        _qryObj0.PO_SEQ = "1";
                        setDataQRY_KSV_PO_MST(_qryObj0);
                    } else {
                        var _qryObj0 = { ...dataQRY_KSV_PO_MST };
                        _qryObj0.PO_CD = _qryObj.PO_CD;
                        _qryObj0.USER_ID = _qryObj.USER_ID;
                        _qryObj0.PO_SEQ = String(data[0].PO_SEQ);
                        setDataQRY_KSV_PO_MST(_qryObj0);
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    }, []);

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
                        width: "27rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>PO</p>
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
                        width: "27rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>PO SEQ</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                        id="id_PO_SEQ"
                        value={dataQRY_KSV_PO_MST.PO_SEQ}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MST_PO_SEQ(e, "PO_SEQ")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "27rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Desc</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                        id="id_MATL_NAME"
                        value={dataQRY_KSV_PO_MST.MATL_NAME}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MST_MATL_NAME(
                                e,
                                "MATL_NAME",
                            )
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "27rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Supplier</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                        id="id_VENDOR_CD"
                        value={dataQRY_KSV_PO_MST.VENDOR_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MST_VENDOR_CD(
                                e,
                                "VENDOR_CD",
                            )
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
                    height: "28rem",
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
                    dataKey="MATL_CD"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 13 }}
                    emptyMessage="No TBL_KSV_PO_MST found."
                    //header={headerTBL_KSV_PO_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="26rem"
                >
                    <AFColumn field="PO_SEQ" header="PO Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" header="Order" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MATL_CD" header="Order" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" header="Desc" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="COLOR" header="Color" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="SPEC" header="Spec" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="UNIT" header="Unit" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="USE_PO_TYPE_NAME" header="Use type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PO_QTY" header="Po Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" header="M.price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="CURR_CD" header="Curr" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" header="Supplier" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MRP_SEQ" header="mrp seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MATL_SEQ" header="matl seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="REG_DATETIME" header="reg Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />
            {/* make mrp
        make mrp call
        stock check & po fix
        po revise
        material add
        po return */}
            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "14rem" }}
            >
                <div className="formgrid grid">
                    <div>
                        <Button
                            style={{ display: "inline-block", width: "15rem" }}
                            label="Current MRP"
                            className="p-button-text"
                            onClick={searchMRP}
                        />

                        <Button
                            style={{ display: "inline-block", width: "15rem" }}
                            label="Make MRP"
                            className="p-button-text"
                            onClick={makeMRP}
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

            <Dialog class="loadingModal" visible={isProgress} modal>
                <ProgressSpinner />
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S030512_PO_MAKE_MRP_FIRST, comparisonFn);
