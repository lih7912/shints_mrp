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
import { ServiceS030501_DEL_MRP_PACK } from "../service/service_biz/ServiceS030501_DEL_MRP_PACK";

import "./page_common.scss";

const S0305_SEARCH_STORAGE_KEY = "S0305_MRP_MANAGER_SEARCH";
const S0305_REQUERY_STORAGE_KEY = "S0305_MRP_MANAGER_REQUERY";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyTBL_KSV_PO_MST = {
    id: 0,
    PO_CD: "",
    PO_SEQ: "",
    PO_TYPE_NAME: "",
    PO_TYPE: "",
    PO_STATUS_NAME: "",
    PO_STATUS: "",
    DEL_FLAG: "",
};

const S030501_DEL_MRP_PACK = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS030501_DEL_MRP_PACKRef = useRef(null);
    if (!serviceS030501_DEL_MRP_PACKRef.current) serviceS030501_DEL_MRP_PACKRef.current = new ServiceS030501_DEL_MRP_PACK();
    const serviceS030501_DEL_MRP_PACK = serviceS030501_DEL_MRP_PACKRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const notifyS0305Requery = () => {
        let searchCondition = {};

        try {
            const raw = sessionStorage.getItem(S0305_SEARCH_STORAGE_KEY);
            searchCondition = raw ? JSON.parse(raw) : {};
        } catch (error) {
            console.log(`S0305 search parse error => ${error}`);
        }

        sessionStorage.setItem(
            S0305_REQUERY_STORAGE_KEY,
            JSON.stringify(searchCondition || {}),
        );

        window.parent.postMessage(
            {
                func: "requery_s0305_mrp_manager",
                message: {
                    searchCondition,
                },
            },
            "*",
        );
    };

    const search_LIST_1 = (argPoCd) => {
        var tObj = {};
        tObj.PO_CD = argPoCd;

        serviceS030501_DEL_MRP_PACK
            .mgrQueryTBL_KSV_PO_MST(tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    setDatasTBL_KSV_PO_MST(data);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_DELETE_PO_MST = () => {
        if (selectedTBL_KSV_PO_MST.length <= 0) return;

        var tInObj = { ...selectedTBL_KSV_PO_MST[0] };
        if (typeof tInObj.__typename !== "undefined") delete tInObj.__typename;
        tInObj.USER_ID = serviceLib.getUserInfo().USER_ID;

        serviceS030501_DEL_MRP_PACK.mgrDelete_PO_MST(tInObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                alert(data[0].CODE);
                if (data.length > 0 && data[0].CODE.includes("SUCC")) {
                    var tObj = { ...datasTBL_KSV_PO_MST[0] };
                    var tPoCd = tObj.PO_CD;
                    search_LIST_1(tPoCd);
                    notifyS0305Requery();
                }
                // setSelectedTBL_KSV_PO_MRP([]);
                // search_LIST_2();
                // search_LIST_1();

                // queryNew(tVendorCd);
            } else {
                console.log(
                    "mgrDelete_PO_MST error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "Fail:mgrDelete_PO_MST",
                    detail: "Fail:mgrDelete_PO_MST",
                    life: 3000,
                });
            }
        });
    };

    /* TABLE KSV_PO_MST*/
    // DEFINE DATAGRID : TBL_KSV_PO_MST
    const [datasTBL_KSV_PO_MST, setDatasTBL_KSV_PO_MST] = useState([]);
    const dt_TBL_KSV_PO_MST = useRef(null);
    const [dataTBL_KSV_PO_MST, setDataTBL_KSV_PO_MST] =
        useState(emptyTBL_KSV_PO_MST);
    const [selectedTBL_KSV_PO_MST, setSelectedTBL_KSV_PO_MST] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MST, setFlagSelectModeTBL_KSV_PO_MST] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MST

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

    /* */

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
            // if (tParam === null) tParam = 'PO23-0007';
            if (tParam === null) tParam = "PO23-0231";
        }

        var tObj = {};
        // tObj.PO_CD = 'PO23-0229';
        tObj.PO_CD = tParam;

        serviceS030501_DEL_MRP_PACK
            .mgrQueryTBL_KSV_PO_MST(tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    setDatasTBL_KSV_PO_MST(data);
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
                    marginLeft: "2rem",
                    marginTop: "1rem",
                    width: "100rem",
                    height: "2rem",
                }}
                className="red"
            >
                차수 1번 발주를 삭제하면 모든 발주 정보가 삭제됩니다
            </div>
            <div style={{ width: "99%", height: "1rem" }}></div>

            <div
                className="af-div-first"
                style={{
                    width: "123rem",
                    height: "50rem",
                    marginBottom: "1rem",
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
                    virtualScrollerOptions={{ itemSize: 12 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="24rem"
                >
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_SEQ" headerClassName="t-header" header="Seq" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_TYPE_NAME" headerClassName="t-header" header="Kind" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_TYPE" headerClassName="t-header" header="Kind" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_STATUS_NAME" headerClassName="t-header" header="PO Status" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_STATUS" headerClassName="t-header" header="PO Status" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                style={{
                    width: "99%",
                    height: "2rem",
                    marginRight: "5rem",
                    marginTop: "5rem",
                }}
                className="text-right"
            >
                <Button
                    style={{ display: "inline-block", width: "10rem" }}
                    label="Delete"
                    className="p-button-text"
                    onClick={process_DELETE_PO_MST}
                />
            </div>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S030501_DEL_MRP_PACK, comparisonFn);
