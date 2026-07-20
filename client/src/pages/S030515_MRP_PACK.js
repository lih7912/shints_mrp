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
import { ServiceS030515_MRP_PACK } from "../service/service_biz/ServiceS030515_MRP_PACK";

import "./page_common.scss";
import moment from "moment";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MST = {
    PO_CD: "",
    PO_SEQ: "",
    CURR_DATE: "",
    LOCAL_WORD: "",

    MRP_BY_ORDER: "",
    MRP_BY_STYLE: "",
    WITHOUT_PRICE: "",
};

const emptyTBL_KSV_PO_MST = {
    id: 0,
    ORDER_CD: "",
    STYLE_NAME: "",
    TOT_CNT: "",
    SIZE1_CNT: "",
};

const emptyTBL_KSV_PO_MST2 = {
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

const S030515_MRP_PACK = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS030515_MRP_PACKRef = useRef(null);
    if (!serviceS030515_MRP_PACKRef.current) serviceS030515_MRP_PACKRef.current = new ServiceS030515_MRP_PACK();
    const serviceS030515_MRP_PACK = serviceS030515_MRP_PACKRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    //
    const process_EMAIL = () => {
        if (datasTBL_KSV_PO_MST.length <= 0) {
            alert("No data to process.");
            return;
        }

        var tQryObj = { ...dataQRY_KSV_PO_MST };
        var tQryObj1 = {};
        tQryObj1.PO_CD = tQryObj.PO_CD;
        tQryObj1.PO_SEQ = tQryObj.PO_SEQ;
        tQryObj1.SEQ_COMMENT = "";

        var tArray = [...datasTBL_KSV_PO_MST];
        var tQryObj2 = [];
        tArray.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            tQryObj2.push(tObj);
        });

        setLoadingTBL_KSV_PO_MST(true);
        serviceS030515_MRP_PACK
            .mgrQuery_PROCESS_MAIL(tQryObj1, tQryObj2)
            .then((data) => {
                setLoadingTBL_KSV_PO_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                    }
                } else {
                    // console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                }
            });
    };

    const process_GENERATE = () => {
        var tQryObj = { ...dataQRY_KSV_PO_MST };
        var tQryObj1 = {};
        tQryObj1.PO_CD = tQryObj.PO_CD;
        tQryObj1.PO_SEQ = tQryObj.PO_SEQ;
        tQryObj1.SEQ_COMMENT = "";

        if (!tQryObj.PO_SEQ) {
            alert ('PO SEQ가 입력되어야 합니다');
            return;
        }

        setLoadingTBL_KSV_PO_MST(true);
        serviceS030515_MRP_PACK
            .mgrQuery_PROCESS_GENERATE(tQryObj1)
            .then(async (data) => {
                setLoadingTBL_KSV_PO_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    const message = data.length > 0 ? String(data[0].CODE ?? "") : "";
                    if (data.length > 0) {
                        alert(message);
                    }
                    search_QRY_ORDER({ PO_CD: tQryObj.PO_CD, PO_SEQ: tQryObj.PO_SEQ });

                    if (!message.toUpperCase().includes("ERROR")) {
                        const downloadCount = await downloadGeneratedFiles(
                            tQryObj.PO_CD,
                            tQryObj.PO_SEQ,
                        );
                        if (downloadCount === 0) {
                            alert("다운로드 가능한 생성 파일이 없습니다.");
                        }
                    }
                } else {
                    // console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                }
            });
    };

    const downloadGeneratedFiles = async (poCd, poSeq) => {
        const tInObj = {
            PO_CD: poCd,
            PO_SEQ: poSeq,
        };

        try {
            const data = await serviceS030515_MRP_PACK.mgrQuery_QRY_ORDER(tInObj);
            if (typeof data.graphQLErrors !== "undefined" || !Array.isArray(data)) {
                return 0;
            }

            const uniqueFiles = new Map();
            data.forEach((row) => {
                const fileUrl = String(row.FILE_URL ?? row.file_url ?? "").trim();
                const fileName = String(row.FILE_NAME ?? row.file_name ?? "").trim();
                if (!fileUrl) return;
                if (!fileName.includes(moment().format("YYYYMMDD"))) return;

                const key = `${fileUrl}||${fileName}`;
                if (!uniqueFiles.has(key)) {
                    uniqueFiles.set(key, { fileUrl, fileName });
                }
            });

            for (const file of uniqueFiles.values()) {
                await serviceLib.downloadFile(file.fileUrl, file.fileName);
            }

            return uniqueFiles.size;
        } catch (error) {
            console.log("downloadGeneratedFiles error => " + JSON.stringify(error));
            return 0;
        }
    };

    const search_QRY_ORDER = (argData) => {
        var tInObj = {};
        if (typeof argData?.PO_CD !== "undefined") {
            tInObj.PO_CD = argData.PO_CD;
            tInObj.PO_SEQ = argData.PO_SEQ;
        } else {
            tInObj.PO_CD = dataQRY_KSV_PO_MST.PO_CD;
            tInObj.PO_SEQ = dataQRY_KSV_PO_MST.PO_SEQ;
        }

        setLoadingTBL_KSV_PO_MST(true);
        setDatasTBL_KSV_PO_MST([]);

        serviceS030515_MRP_PACK.mgrQuery_QRY_ORDER(tInObj).then((data) => {
            setLoadingTBL_KSV_PO_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    setDatasTBL_KSV_PO_MST(
                        data.map((el, i) => ({ ...el, id: i + 1 })),
                    );
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const update_QRY_ORDER = (argData) => {
        var tInObj = {};
        if (typeof argData.PO_CD !== "undefined") {
            tInObj.PO_CD = argData.PO_CD;
            tInObj.PO_SEQ = argData.PO_SEQ;
        } else {
            var tQryObj = { ...dataQRY_KSV_PO_MST };
            tInObj.PO_CD = tQryObj.PO_CD;
            tInObj.PO_SEQ = tQryObj.PO_SEQ;
        }

        serviceS030515_MRP_PACK
            .mgrQuery_UPDATE_QRY_ORDER(tInObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const search_QRY_ORDER_COMBINED = (argData) => {
        if (typeof argData.PO_CD === "undefined") return;

        var tInObj = {};
        tInObj.PO_CD = argData.PO_CD;
        tInObj.PO_SEQ = argData.PO_SEQ;
        tInObj.ORDER_CD = argData.ORDER_CD;

        setLoadingTBL_KSV_PO_MST2(true);
        setDatasTBL_KSV_PO_MST2([]);
        serviceS030515_MRP_PACK
            .mgrQuery_QRY_ORDER_COMBINED(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_PO_MST2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].ORDER_CD.includes("ERROR")) {
                            alert(data[0].ORDER_CD);
                        } else {
                            setDatasTBL_KSV_PO_MST2(data);
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

    const downloadFile = async (argFileUrl, argFileName) => {
        serviceLib.downloadFile(argFileUrl, argFileName);
    };

    /* QRY KSV_PO_MST*/
    const [dataQRY_KSV_PO_MST, setDataQRY_KSV_PO_MST] =
        useState(emptyQRY_KSV_PO_MST);

    const onInputChangeQRY_KSV_PO_MST_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        // PO_CD일 경우 대문자/소문자 PO 처리
        if (name === "PO_CD") {
            val = val.trim();
            
            // 숫자로만 이루어진 값이고 PO/po로 시작하지 않으면 PO를 붙이기
            if (val && /^\d+$/.test(val)) {
                val = `PO${val}`;
            }
            // 그 외의 경우(PO/po로 이미 시작하거나 빈 칸 또는 다른 문자열)는 그대로 유지
        }

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

    const onDropdownChangeQRY_KSV_PO_MST_PO_SEQ = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
        setDataQRY_KSV_PO_MST_PO_SEQ(e.value);
    };

    /*TABLE KSV_PO_MST */
    // DEFINE DATAGRID : TBL_KSV_PO_MST
    const [isSearch_LIST_1, setIsSearch_LIST_1] = useState(false);

    const [loadingTBL_KSV_PO_MST, setLoadingTBL_KSV_PO_MST] = useState(false);
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
            var tHeader = `id_msg_${col.SIZE_NAME}_KSV_PO_MST_dt`;
            var tHeaderStr = serviceLib.getLocaleMessage(tHeader);
            var tColName = `SIZE_${col.SIZE_NAME}`;
            // return  <AFColumn field={col.field} header={tHeaderStr} headerStyle={{ width: '10rem',height:'1.8rem' }} bodyStyle={{ width: '10rem',height:'1.8rem' }} editor={(options) => cellEditorKSV_ORDER_MEM(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_MEM}></AFColumn>
            return (
                <AFColumn field={tColName} header={tHeaderStr} headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
            );
        },
    );

    const onRowDoubleClickTBL_KSV_PO_MST = (argData0) => {
        var tFileName = argData0.data[`FILE_NAME`];
        var tFileUrl = argData0.data[`FILE_URL`];
        console.log(tFileName, tFileUrl);
        downloadFile(tFileUrl, tFileName);

        var tQryObj = { ...dataQRY_KSV_PO_MST };
        update_QRY_ORDER(tQryObj);
    };

    const onRowClick1TBL_KSV_PO_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            if (argData0.length > 0) argData = argData0[argData0.length - 1];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MST = argData;

        setDataTBL_KSV_PO_MST(argTBL_KSV_PO_MST);

        search_QRY_ORDER_COMBINED(argData);
    };

    const onRowClickTBL_KSV_PO_MST = (event) => {
        let argTBL_KSV_PO_MST = event.data;
        if (flagSelectModeTBL_KSV_PO_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MST
    };

    /*TABLE KSV_PO_MST */
    // DEFINE DATAGRID : TBL_KSV_PO_MST2
    const [loadingTBL_KSV_PO_MST2, setLoadingTBL_KSV_PO_MST2] = useState(false);
    const [datasTBL_KSV_PO_MST2_COLS, setDatasTBL_KSV_PO_MST2_COLS] = useState(
        [],
    );
    const [datasTBL_KSV_PO_MST2, setDatasTBL_KSV_PO_MST2] = useState([]);
    const dt_TBL_KSV_PO_MST2 = useRef(null);
    const [dataTBL_KSV_PO_MST2, setDataTBL_KSV_PO_MST2] =
        useState(emptyTBL_KSV_PO_MST2);
    const [selectedTBL_KSV_PO_MST2, setSelectedTBL_KSV_PO_MST2] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MST2, setFlagSelectModeTBL_KSV_PO_MST2] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MST2

    /**TABLE KSV_PO_MST1 */
    // DEFINE DATAGRID : TBL_KSV_PO_MST1
    const [loadingTBL_KSV_PO_MST1, setLoadingTBL_KSV_PO_MST1] = useState(false);
    const [datasTBL_KSV_PO_MST1, setDatasTBL_KSV_PO_MST1] = useState([]);
    const dt_TBL_KSV_PO_MST1 = useRef(null);
    const [dataTBL_KSV_PO_MST1, setDataTBL_KSV_PO_MST1] =
        useState(emptyTBL_KSV_PO_MST1);
    const [selectedTBL_KSV_PO_MST1, setSelectedTBL_KSV_PO_MST1] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MST1, setFlagSelectModeTBL_KSV_PO_MST1] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MST1

    useEffect(() => {
        let tPO_CD = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length) {
            var tParams1 = tUrls[1].split("&");
            tParams1.map((col, i) => {
                var tObj = {};
                var tCols = col.split("=");

                if (tCols[0].includes("PO_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    console.log(tObj);
                    tPO_CD = tObj.value;
                    return tObj;
                }
            });
        }

        var tQryObj = { ...dataQRY_KSV_PO_MST };
        tQryObj.PO_CD = tPO_CD;
        tQryObj.PO_SEQ = "";
        setDataQRY_KSV_PO_MST(tQryObj);

        var tObj = {};
        tObj.PO_CD = tPO_CD;
        serviceS030515_MRP_PACK.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "mgrQuery_KSV_ORDER_MST call => " + data.PO_SEQ.length,
                );
                const poSeqOptions = Array.isArray(data.PO_SEQ)
                    ? data.PO_SEQ
                    : [];

                const targetOption = poSeqOptions.reduce((best, opt) => {
                    const rawSeq = String(opt?.CD_CODE ?? opt?.CD_NAME ?? "").trim();
                    const seqNum = Number(rawSeq);
                    if (!rawSeq || Number.isNaN(seqNum) || seqNum >= 97) return best;

                    if (!best || seqNum > best.seqNum) {
                        return { seqNum, option: opt };
                    }
                    return best;
                }, null)?.option;

                const selectedOption = targetOption || {};
                const selectedPoSeq = String(
                    selectedOption.CD_CODE ?? selectedOption.CD_NAME ?? "",
                ).trim();

                setDatasQRY_KSV_PO_MST_PO_SEQ(poSeqOptions);
                setDataQRY_KSV_PO_MST_PO_SEQ(selectedOption);
                setDataQRY_KSV_PO_MST({ ...tQryObj, PO_SEQ: selectedPoSeq });
                search_QRY_ORDER({ ...tQryObj, PO_SEQ: selectedPoSeq });
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
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "4rem" }}
            >
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>PO#</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            style={{ width: "12rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_PO_MST.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MST_PO_CD(e, "PO_CD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>PO Seq</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_PO_SEQ"
                            value={dataQRY_KSV_PO_MST_PO_SEQ}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MST_PO_SEQ(
                                    e,
                                    "PO_SEQ",
                                )
                            }
                            options={datasQRY_KSV_PO_MST_PO_SEQ}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <div className="af-span-div-btn" style={{ width: "14rem" }}>
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
                            style={{ width: "14rem" }}
                            className="p-button-text"
                            onClick={search_QRY_ORDER}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <div className="af-span-div-btn" style={{ width: "14rem" }}>
                        <Button
                            label="Email"
                            style={{ width: "14rem" }}
                            className="p-button-text"
                            onClick={process_EMAIL}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <div className="af-span-div-btn" style={{ width: "14rem" }}>
                        <Button
                            label="Generate Files"
                            style={{ width: "14rem" }}
                            className="p-button-text"
                            onClick={process_GENERATE}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "57rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MST}
                    size="small"
                    value={datasTBL_KSV_PO_MST}
                    loading={loadingTBL_KSV_PO_MST}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="multiple"
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
                    onRowDoubleClick={onRowDoubleClickTBL_KSV_PO_MST}
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    //header={headerTBL_KSV_PO_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="620px"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="PO_CD" header="Po#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="PO_SEQ" header="Po Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="KIND" header="Kind" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="TITLE" className="orange" header="Title" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="FILE_NAME" header="Name" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    {/*<AFColumn field="FILE_URL" header="Url" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>*/}
                </AFDataTable>
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S030515_MRP_PACK, comparisonFn);
