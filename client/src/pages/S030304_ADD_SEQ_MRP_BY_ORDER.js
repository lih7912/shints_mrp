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
import { ServiceS030304_ADD_SEQ_MRP_BY_ORDER } from "../service/service_biz/ServiceS030304_ADD_SEQ_MRP_BY_ORDER";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyTBL_KSV_ORDER_MEM = {
    id: 0,
};

const S030304_ADD_SEQ_MRP_BY_ORDER = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS030304_ADD_SEQ_MRP_BY_ORDER =
        new ServiceS030304_ADD_SEQ_MRP_BY_ORDER();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* TABLE KSV_ORDER_MEM*/
    const [saveProdCd, setSaveProdCd] = useState("");

    // DEFINE DATAGRID : TBL_KSV_ORDER_MEM
    const [loadingTBL_KSV_ORDER_MEM, setLoadingTBL_KSV_ORDER_MEM] =
        useState(false);
    const [datasTBL_KSV_ORDER_MEM, setDatasTBL_KSV_ORDER_MEM] = useState([]);
    const dt_TBL_KSV_ORDER_MEM = useRef(null);
    const [dataTBL_KSV_ORDER_MEM, setDataTBL_KSV_ORDER_MEM] = useState(
        emptyTBL_KSV_ORDER_MEM,
    );
    const [selectedTBL_KSV_ORDER_MEM, setSelectedTBL_KSV_ORDER_MEM] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KSV_ORDER_MEM,
        setFlagSelectModeTBL_KSV_ORDER_MEM,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_MEM
    const addProdMem = () => {
        let _insertObj = [];

        const sourceRows = Array.isArray(datasTBL_KSV_ORDER_MEM)
            ? datasTBL_KSV_ORDER_MEM
            : [];

        sourceRows.forEach((col) => {
            const baseObj = { ...col };
            if (typeof baseObj.__typename !== "undefined") {
                delete baseObj.__typename;
            }

            const prodList = (baseObj.PROD_CD || "").split("/");

            prodList.forEach((prod) => {
                const normalizedProd = String(prod || "").trim();
                if (!normalizedProd) return;
                _insertObj.push({
                    ...baseObj,
                    PROD_CD: normalizedProd,
                });
            });
        });

        if (_insertObj.length <= 0) {
            alert("전송할 PROD#이 없습니다.<br><br>There is no PROD# to send.");
            return;
        }

        setLoadingTBL_KSV_ORDER_MEM(true);

        console.log(_insertObj);

        serviceS030304_ADD_SEQ_MRP_BY_ORDER
            .mgrInsertEDT_KSV_PROD_MEM(_insertObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            setDatasTBL_KSV_ORDER_MEM([]);
                        }
                    }
                    // console.log("serviceS030304_ADD_SEQ_MRP_BY_ORDER.mgrQueryTBL_KSV_ORDER_MEM call => " + data.length);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "Insert ORDER_MRP Error",
                        detail: ``,
                        life: 3000,
                    });
                }
            });
    };

    const onRowClick1TBL_KSV_ORDER_MEM = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_MEM = argData;

        setDataTBL_KSV_ORDER_MEM(argTBL_KSV_ORDER_MEM);
    };

    const onRowClickTBL_KSV_ORDER_MEM = (event) => {
        let argTBL_KSV_ORDER_MEM = event.data;
        if (flagSelectModeTBL_KSV_ORDER_MEM) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MEM
    };

    /* */

    useEffect(() => {
        serviceS030304_ADD_SEQ_MRP_BY_ORDER
            .mgrQueryTBL_KSV_ORDER_MEM({
                STYLE_CD: serviceLib.getQueryParam("STYLE_CD"),
            })
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "serviceS030304_ADD_SEQ_MRP_BY_ORDER.mgrQueryTBL_KSV_ORDER_MEM call => " +
                            data.length,
                    );

                    const mergedMap = new Map();

                    for (const item of data) {
                        const key = `${item.PO_CD}|${item.ORDER_CD}`;
                        if (!mergedMap.has(key)) {
                            mergedMap.set(key, {
                                PO_CD: item.PO_CD,
                                ORDER_CD: item.ORDER_CD,
                                PROD_CD: item.PROD_CD,
                            });
                        } else {
                            const existing = mergedMap.get(key);
                            existing.PROD_CD += `/${item.PROD_CD}`;
                        }
                    }

                    const output = Array.from(mergedMap.values());
                    setDatasTBL_KSV_ORDER_MEM(output);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    }, []);

    return (
        <div
            className="af-div-main"
            style={{
                backgroundColor: "white",
                flexDirection: "column",
                display: "flex",
            }}
        >
            <div
                className="af-div-first"
                style={{ width: "580px", height: "200px" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_MEM}
                    size="small"
                    value={datasTBL_KSV_ORDER_MEM}
                    loading={loadingTBL_KSV_ORDER_MEM}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_ORDER_MEM}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_ORDER_MEM(true);
                        setSelectedTBL_KSV_ORDER_MEM(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_ORDER_MEM.length,
                        );
                        onRowClick1TBL_KSV_ORDER_MEM(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_MEM}
                    dataKey="ORDER_CD"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    //header={headerTBL_KSV_ORDER_MEM}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="500px"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    {/*<AFColumn field="PROD_CD" header="Prod#"  style={{ width: '6rem' ,height:'1.8rem',flexBasis:'auto'}} ></AFColumn>*/}
                    <AFColumn field="PO_CD" header="Po#" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORDER_CD" header="Order#" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    {/*<AFColumn field="STYLE_NAME" header="Style"  style={{ width: '20rem' ,height:'1.8rem',flexBasis:'auto'}} ></AFColumn>*/}
                </AFDataTable>
            </div>
            <div
                className="af-div-first"
                style={{ width: "580px", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Add"
                            className="p-button-text"
                            onClick={addProdMem}
                        />
                    </div>
                </span>
            </div>
            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S030304_ADD_SEQ_MRP_BY_ORDER, comparisonFn);
