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
import { ServiceS030301_COPY_PRODUCT } from "../service/service_biz/ServiceS030301_COPY_PRODUCT";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KCD_STYLE = {
    STYLE_NAME: "",
};

const emptyQRY_KCD_STYLE1 = {
    STYLE_NAME: "",
};

const emptyTBL_KCD_STYLE = {
    id: 0,
    STYLE_NAME: "",
    STYLE_CD: "",
};

const emptyTBL_KCD_STYLE1 = {
    id: 0,
    STYLE_NAME: "",
    STYLE_CD: "",
};

const emptyTBL_KSV_PROD_MST = {
    id: 0,
    STYLE_NAME: "",
    STYLE_CD: "",
};

const emptyTBL_KSV_PROD_MST1 = {
    id: 0,
    STYLE_NAME: "",
    STYLE_CD: "",
};

const S030301_COPY_PRODUCT = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS030301_COPY_PRODUCTRef = useRef(null);
    if (!serviceS030301_COPY_PRODUCTRef.current) serviceS030301_COPY_PRODUCTRef.current = new ServiceS030301_COPY_PRODUCT();
    const serviceS030301_COPY_PRODUCT = serviceS030301_COPY_PRODUCTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const process_ADD = () => {
        if (typeof selectedTBL_KCD_STYLE.STYLE_CD === "undefined") return;
        if (typeof selectedTBL_KCD_STYLE1.STYLE_CD === "undefined") return;
        if (selectedTBL_KSV_PROD_MST.length <= 0) return;

        var tArray = [];
        selectedTBL_KSV_PROD_MST.forEach((col, i) => {
            var tFlag = 0;
            datasTBL_KSV_PROD_MST1.forEach((col1, i1) => {
                if (col.COLOR === col1.COLOR) tFlag = 1;
            });
            if (tFlag === 0) {
                var tObj = {};
                tObj.STYLE_CD = selectedTBL_KCD_STYLE.STYLE_CD;
                tObj.BUYER_CD = selectedTBL_KCD_STYLE.BUYER_CD;
                tObj.PROD_CD = col.PROD_CD;
                tArray.push(tObj);
            }
        });

        if (tArray.length <= 0) {
            alert("Add할 데이타가 없습니다<br><br>There is no data to add");
            return;
        }

        var tInObj = {};
        tInObj.STYLE_CD = selectedTBL_KCD_STYLE1.STYLE_CD;
        tInObj.BUYER_CD = selectedTBL_KCD_STYLE1.BUYER_CD;

        serviceS030301_COPY_PRODUCT
            .mgrInsert_ADD_PROD(tInObj, tArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_PROD2();
                        }
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_DEL = () => {
        if (typeof selectedTBL_KCD_STYLE1.STYLE_CD === "undefined") return;
        if (selectedTBL_KSV_PROD_MST1.length <= 0) return;

        var tArray = [];
        selectedTBL_KSV_PROD_MST1.forEach((col, i) => {
            var tObj = {};
            tObj.STYLE_CD = selectedTBL_KCD_STYLE1.STYLE_CD;
            tObj.BUYER_CD = selectedTBL_KCD_STYLE1.BUYER_CD;
            tObj.PROD_CD = col.PROD_CD;
            tArray.push(tObj);
        });

        if (tArray.length <= 0) {
            alert("Add할 데이타가 없습니다<br><br>There is no data to add");
            return;
        }

        var tInObj = {};
        tInObj.STYLE_CD = selectedTBL_KCD_STYLE1.STYLE_CD;
        tInObj.BUYER_CD = selectedTBL_KCD_STYLE1.BUYER_CD;

        serviceS030301_COPY_PRODUCT
            .mgrInsert_DEL_PROD(tInObj, tArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_PROD2();
                        }
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const search_STYLE1 = () => {
        var tObj0 = { ...dataQRY_KCD_STYLE };
        var tObj = {};
        tObj.STYLE_CD = tObj0.STYLE_NAME;
        setDatasTBL_KCD_STYLE([]);
        serviceS030301_COPY_PRODUCT.mgrQuery_QRY_STYLE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) setDatasTBL_KCD_STYLE(data);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_STYLE2 = (argData) => {
        var tObj0 = {};
        if (typeof argData.STYLE_NAME === "undefined") {
            tObj0 = { ...dataQRY_KCD_STYLE1 };
        } else {
            tObj0 = { ...argData };
        }
        var tObj = {};
        tObj.STYLE_CD = tObj0.STYLE_NAME;
        setDatasTBL_KCD_STYLE1([]);
        serviceS030301_COPY_PRODUCT.mgrQuery_QRY_STYLE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) setDatasTBL_KCD_STYLE1(data);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_PROD2 = () => {
        var argObj = {};
        argObj.STYLE_CD = selectedTBL_KCD_STYLE1.STYLE_CD;

        serviceS030301_COPY_PRODUCT.mgrQuery_QRY_PROD(argObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasTBL_KSV_PROD_MST1(data);
            } else {
            }
        });
    };

    /* QRY KCD_STYLE*/
    const [dataQRY_KCD_STYLE, setDataQRY_KCD_STYLE] =
        useState(emptyQRY_KCD_STYLE);

    const onInputChangeQRY_KCD_STYLE_STYLE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_STYLE = { ...dataQRY_KCD_STYLE };

        let tTypeVal = _dataQRY_KCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_STYLE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_STYLE[`${name}`] = parseInt(val);

        setDataQRY_KCD_STYLE(_dataQRY_KCD_STYLE);
    };

    /*QRY KCD_STYLE1 */
    const [dataQRY_KCD_STYLE1, setDataQRY_KCD_STYLE1] =
        useState(emptyQRY_KCD_STYLE1);

    const onInputChangeQRY_KCD_STYLE1_STYLE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_STYLE1 = { ...dataQRY_KCD_STYLE1 };

        let tTypeVal = _dataQRY_KCD_STYLE1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_STYLE1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_STYLE1[`${name}`] = parseInt(val);

        setDataQRY_KCD_STYLE1(_dataQRY_KCD_STYLE1);
    };

    /**TABLE KCD_STYLE */
    // DEFINE DATAGRID : TBL_KCD_STYLE
    const [datasTBL_KCD_STYLE, setDatasTBL_KCD_STYLE] = useState([]);
    const dt_TBL_KCD_STYLE = useRef(null);
    const [dataTBL_KCD_STYLE, setDataTBL_KCD_STYLE] =
        useState(emptyTBL_KCD_STYLE);
    const [selectedTBL_KCD_STYLE, setSelectedTBL_KCD_STYLE] = useState([]);
    const [flagSelectModeTBL_KCD_STYLE, setFlagSelectModeTBL_KCD_STYLE] =
        useState(false);

    // DATAGRID CODE : TBL_KCD_STYLE
    const onRowClick1TBL_KCD_STYLE = (argData0) => {
        var argObj = {};
        argObj.STYLE_CD = argData0.STYLE_CD;

        serviceS030301_COPY_PRODUCT.mgrQuery_QRY_PROD(argObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasTBL_KSV_PROD_MST(data);
            } else {
            }
        });
    };

    const onRowClickTBL_KCD_STYLE = (event) => {};

    // DEFINE DATAGRID : TBL_KCD_STYLE1
    const [datasTBL_KCD_STYLE1, setDatasTBL_KCD_STYLE1] = useState([]);
    const dt_TBL_KCD_STYLE1 = useRef(null);
    const [dataTBL_KCD_STYLE1, setDataTBL_KCD_STYLE1] =
        useState(emptyTBL_KCD_STYLE1);
    const [selectedTBL_KCD_STYLE1, setSelectedTBL_KCD_STYLE1] = useState([]);
    const [flagSelectModeTBL_KCD_STYLE1, setFlagSelectModeTBL_KCD_STYLE1] =
        useState(false);

    const onRowClick1TBL_KCD_STYLE1 = (argData0) => {
        var argObj = {};
        argObj.STYLE_CD = argData0.STYLE_CD;

        serviceS030301_COPY_PRODUCT.mgrQuery_QRY_PROD(argObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasTBL_KSV_PROD_MST1(data);
            } else {
            }
        });
    };

    const onRowClickTBL_KCD_STYLE1 = (event) => {};

    // DEFINE DATAGRID : TBL_KSV_PROD_MST
    const [datasTBL_KSV_PROD_MST, setDatasTBL_KSV_PROD_MST] = useState([]);
    const dt_TBL_KSV_PROD_MST = useRef(null);
    const [dataTBL_KSV_PROD_MST, setDataTBL_KSV_PROD_MST] = useState(
        emptyTBL_KSV_PROD_MST,
    );
    const [selectedTBL_KSV_PROD_MST, setSelectedTBL_KSV_PROD_MST] = useState(
        [],
    );
    const [flagSelectModeTBL_KSV_PROD_MST, setFlagSelectModeTBL_KSV_PROD_MST] =
        useState(false);

    // DEFINE DATAGRID : TBL_KSV_PROD_MST1
    const [datasTBL_KSV_PROD_MST1, setDatasTBL_KSV_PROD_MST1] = useState([]);
    const dt_TBL_KSV_PROD_MST1 = useRef(null);
    const [dataTBL_KSV_PROD_MST1, setDataTBL_KSV_PROD_MST1] = useState(
        emptyTBL_KSV_PROD_MST1,
    );
    const [selectedTBL_KSV_PROD_MST1, setSelectedTBL_KSV_PROD_MST1] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KSV_PROD_MST1,
        setFlagSelectModeTBL_KSV_PROD_MST1,
    ] = useState(false);

    const onRowClickTBL_KSV_PROD_MST1 = (event) => {};

    useEffect(() => {
        let tOrderCd = "";
        let tStyleCd = "";
        let tStyleName = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            tParams1.forEach((col, i) => {
                var tObj = {};
                var tCols = col.split("=");
                if (tCols[0].includes("STYLE_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tStyleCd = tObj.value;
                }
                if (tCols[0].includes("STYLE_NAME")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tStyleName = tObj.value;
                }
            });
        }

        var argObj = {};
        argObj.STYLE_NAME = tStyleCd;

        search_STYLE2(argObj);
    }, []);

    // Support Area

    return (
        <div className="af-div-main">
            {/* 1단 */}
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "30rem" }}
            >
                <div
                    className="af-div-first"
                    style={{ width: "70rem", height: "30rem" }}
                >
                    <div
                        className="af-div-first"
                        style={{ width: "70rem", height: "3rem" }}
                    >
                        <span
                            className="af-span-3-0"
                            style={{ width: "56rem" }}
                        >
                            <p className="af-span-p" style={{ width: "7rem" }}>Style</p>
                            <div
                                className="af-span-div"
                                style={{ width: "48rem" }}
                            >
                                <InputText
                                    style={{ width: "48rem" }}
                                    id="id_STYLE_NAME"
                                    value={dataQRY_KCD_STYLE.STYLE_NAME}
                                    onChange={(e) =>
                                        onInputChangeQRY_KCD_STYLE_STYLE_NAME(
                                            e,
                                            "STYLE_NAME",
                                        )
                                    }
                                />
                            </div>
                        </span>
                        <span
                            className="af-span-3-0"
                            style={{ width: "13rem" }}
                        >
                            <div
                                className="af-span-div-btn"
                                style={{ width: "12rem" }}
                            >
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
                                    style={{ width: "12rem" }}
                                    className="p-button-text"
                                    onClick={search_STYLE1}
                                />
                            </div>
                        </span>
                    </div>
                    <div
                        className="af-div-first"
                        style={{ width: "70rem", height: "26rem" }}
                    >
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_TBL_KCD_STYLE}
                            size="small"
                            value={datasTBL_KCD_STYLE}
                            tableStyle={{ tableLayout: "fixed" }}
                            resizableColumns
                            columnResizeMode="expand"
                            showGridlines
                            selectionMode="single"
                            selection={selectedTBL_KCD_STYLE}
                            onSelectionChange={(e) => {
                                setSelectedTBL_KCD_STYLE(e.value);
                                onRowClick1TBL_KCD_STYLE(e.value);
                            }}
                            onRowClick={onRowClickTBL_KCD_STYLE}
                            dataKey="STYLE_CD"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" "
                            //header={headerTBL_KCD_STYLE}
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="26rem"
                        >
                            <AFColumn field="STYLE_NAME" headerClassName="t-header" header="STYLE NAME" style={{ width: "14rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                            <AFColumn field="STYLE_CD" headerClassName="t-header" header="STYLE CD" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        </AFDataTable>
                    </div>
                </div>

                <div
                    className="af-div-second"
                    style={{ width: "50rem", height: "30rem" }}
                >
                    <div
                        className="af-div-first"
                        style={{ width: "50rem", height: "3rem" }}
                    >
                        <span
                            className="af-span-3-0"
                            style={{ width: "13rem" }}
                        >
                            <div
                                className="af-span-div-btn"
                                style={{ width: "12rem" }}
                            >
                                <Button
                                    label="Add"
                                    style={{ width: "12rem" }}
                                    className="p-button-text"
                                    onClick={process_ADD}
                                />
                            </div>
                        </span>
                    </div>
                    <div
                        className="af-div-first"
                        style={{ width: "50rem", height: "26rem" }}
                    >
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_TBL_KSV_PROD_MST}
                            size="small"
                            value={datasTBL_KSV_PROD_MST}
                            tableStyle={{ tableLayout: "fixed" }}
                            resizableColumns
                            columnResizeMode="expand"
                            metaKeySelection={false}
                            showGridlines
                            selectionMode="multiple"
                            selection={selectedTBL_KSV_PROD_MST}
                            onSelectionChange={(e) => {
                                setSelectedTBL_KSV_PROD_MST(e.value);
                            }}
                            // onRowClick={onRowClickTBL_KSV_PROD_MST}
                            dataKey="PROD_CD"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" "
                            // header={headerTBL_KSV_PROD_MST}
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="30rem"
                        >
                            <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "14rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                            <AFColumn field="PROD_CD" headerClassName="t-header" header="Prod#" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        </AFDataTable>
                    </div>
                </div>
            </div>

            {/* 2단 */}
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "30rem" }}
            >
                <div
                    className="af-div-first"
                    style={{ width: "70rem", height: "30rem" }}
                >
                    <div
                        className="af-div-first"
                        style={{ width: "70rem", height: "3rem" }}
                    >
                        <span
                            className="af-span-3-0"
                            style={{ width: "56rem" }}
                        >
                            <p className="af-span-p" style={{ width: "7rem" }}>Style</p>
                            <div
                                className="af-span-div"
                                style={{ width: "48rem" }}
                            >
                                <InputText
                                    style={{ width: "48rem" }}
                                    id="id_STYLE_NAME"
                                    value={dataQRY_KCD_STYLE1.STYLE_NAME}
                                    onChange={(e) =>
                                        onInputChangeQRY_KCD_STYLE1_STYLE_NAME(
                                            e,
                                            "STYLE_NAME",
                                        )
                                    }
                                />
                            </div>
                        </span>
                        <span
                            className="af-span-3-0"
                            style={{ width: "13rem" }}
                        >
                            <div
                                className="af-span-div-btn"
                                style={{ width: "12rem" }}
                            >
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
                                    style={{ width: "12rem" }}
                                    className="p-button-text"
                                    onClick={search_STYLE2}
                                />
                            </div>
                        </span>
                    </div>
                    <div
                        className="af-div-first"
                        style={{ width: "70rem", height: "26rem" }}
                    >
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_TBL_KCD_STYLE1}
                            size="small"
                            value={datasTBL_KCD_STYLE1}
                            tableStyle={{ tableLayout: "fixed" }}
                            resizableColumns
                            columnResizeMode="expand"
                            showGridlines
                            selection={selectedTBL_KCD_STYLE1}
                            onSelectionChange={(e) => {
                                setSelectedTBL_KCD_STYLE1(e.value);
                                onRowClick1TBL_KCD_STYLE1(e.value);
                            }}
                            onRowClick={onRowClickTBL_KCD_STYLE1}
                            dataKey="STYLE_CD"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" "
                            //header={headerTBL_KCD_STYLE1}
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="26rem"
                        >
                            <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                            <AFColumn field="STYLE_NAME" headerClassName="t-header" header="STYLE NAME" style={{ width: "14rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                            <AFColumn field="STYLE_CD" headerClassName="t-header" header="STYLE CD" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        </AFDataTable>
                    </div>
                </div>

                <div
                    className="af-div-second"
                    style={{ width: "50rem", height: "30rem" }}
                >
                    <div
                        className="af-div-first"
                        style={{ width: "50rem", height: "3rem" }}
                    >
                        <span
                            className="af-span-3-0"
                            style={{ width: "13rem" }}
                        >
                            <div
                                className="af-span-div-btn"
                                style={{ width: "12rem" }}
                            >
                                <Button
                                    label="Delete"
                                    style={{ width: "12rem" }}
                                    className="p-button-text"
                                    onClick={process_DEL}
                                />
                            </div>
                        </span>
                    </div>
                    <div
                        className="af-div-first"
                        style={{ width: "50rem", height: "26rem" }}
                    >
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_TBL_KSV_PROD_MST1}
                            size="small"
                            value={datasTBL_KSV_PROD_MST1}
                            tableStyle={{ tableLayout: "fixed" }}
                            metaKeySelection={false}
                            resizableColumns
                            columnResizeMode="expand"
                            showGridlines
                            selectionMode="multiple"
                            selection={selectedTBL_KSV_PROD_MST1}
                            onSelectionChange={(e) => {
                                setSelectedTBL_KSV_PROD_MST1(e.value);
                            }}
                            onRowClick={onRowClickTBL_KSV_PROD_MST1}
                            dataKey="PROD_CD"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" "
                            //header={headerTBL_KSV_PROD_MST1}
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="30rem"
                        >
                            <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "14rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                            <AFColumn field="PROD_CD" headerClassName="t-header" header="Prod#" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        </AFDataTable>
                    </div>
                </div>
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S030301_COPY_PRODUCT, comparisonFn);
