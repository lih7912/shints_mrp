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
import { ServiceS0206_ORDER_REG } from "../service/service_biz/ServiceS0206_ORDER_REG";

//import './page_common.scss';

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_ORDER_INFO = {
    ORDER_CD: "",
};

const emptyTBL_KSV_ORDER_MST = {
    id: 0,
    TYPE: "",
    NAT_CD: "",
    ORDER_QTY: "",
    ORDER_MEM: [],
};

const emptyTBL_KSV_ORDER_MEM = {
    id: 0,
    PROD_CD: "",
    ADD_FLAG: "",
    COLOR: "",
    TOT_CNT: "0",
    PRICE: "0",
    SIZE_CNT: "",
};

const emptyKCD_BUYER_FILE_INFO = {
    id: 0,
    col1: "",
    col2: "",
    col3: "",
};

const emptyTBL_KSV_PROD_MEM = {
    id: 0,
    COLOR: "",
    PROD_CD: "",
    STYLE_CD: "",
    TYPE: "",
    SEQ: "",
};

const emptyEDT_KSV_ORDER_MST = {
    STYLE_NAME: "",
    STYLE_CD: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    COLLECTION: "",
    USER_ID: "",
    BUYER_TEAM: "",

    IS_COMBINED: "",
    IS_SAMPLE: "",
    IS_FACTORY_FOB: "",
    IS_DL: "",
};

const emptyEDT_KSV_ORDER_MST1 = {
    ORDER_CD: "",
    ORDER_CD1: "",
    ORDER_CD2: "",
    FACTORY_CD: "",
    ORDER_QTY: "0", // Order Qty
    ADD_QTY: "0", // Order Qty
    ORDER_DATE: "", // Order Qty
    DUE_DATE: "", // Order Qty
    MATL_DUE_DATE: "",
    CURR_CD: "",
    NAT_CD: "",
    FOB: "",
    FOB_USD: "",
    SIZE_MEMBER: "",
    SIZE_GROUP: "",
    ETD: "",
    EXF: "",
};

const emptyEDT_KSV_ORDER_MST2 = {
    REF_ORDER_NO: "",
    REMARK1: "",
    REMARK2: "",
    NOTE: "",
    SAMPLE_LEVEL: "",
    SAMPLE_SEQ: "",
    SAMPLE_REASON: "",
};

const emptyEDT_KSV_ORDER_MST3 = {
    NAT_CD: "",
    DUE_DATE: "",
    IS_ADD_SHIP: "",
    RATE: "",
};

const S0206_ORDER_REG = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0206_ORDER_REGRef = useRef(null);
    if (!serviceS0206_ORDER_REGRef.current) serviceS0206_ORDER_REGRef.current = new ServiceS0206_ORDER_REG();
    const serviceS0206_ORDER_REG = serviceS0206_ORDER_REGRef.current;

    const toast = useRef(null);
    var tSaveTBL_KSV_ORDER_MST_ID = -1;

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* QRY */
    const [dataQRY_ORDER_INFO, setDataQRY_ORDER_INFO] =
        useState(emptyQRY_ORDER_INFO);

    /* TABLE KSV_ORDER_MST */
    const [datasTBL_KSV_ORDER_MST, setDatasTBL_KSV_ORDER_MST] = useState([]);
    const dt_TBL_KSV_ORDER_MST = useRef(null);
    const [dataTBL_KSV_ORDER_MST, setDataTBL_KSV_ORDER_MST] = useState(
        emptyTBL_KSV_ORDER_MST,
    );
    const [selectedTBL_KSV_ORDER_MST, setSelectedTBL_KSV_ORDER_MST] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KSV_ORDER_MST,
        setFlagSelectModeTBL_KSV_ORDER_MST,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_MST

    const addCombinedOrder = () => {
        if (dataEDT_KSV_ORDER_MST.IS_COMBINED !== "1") return;

        var tORDER_MST_ARRAY = [...datasTBL_KSV_ORDER_MST];
        var tWArray = [];

        var tIdx = 0;
        for (tIdx = 0; tIdx < tORDER_MST_ARRAY.length; tIdx++) {
            var tOne = tORDER_MST_ARRAY[tIdx];
            if (tOne.id === dataTBL_KSV_ORDER_MST.id) {
                tOne.ORDER_MEM = [...datasTBL_KSV_ORDER_MEM];
                tWArray.push(tOne);
            } else {
                tWArray.push(tOne);
            }
        }

        var tObjORDER_MST = {};
        tObjORDER_MST.id = tORDER_MST_ARRAY.length;
        tObjORDER_MST.TYPE = "Combined";
        tObjORDER_MST.NAT_CD = dataEDT_KSV_ORDER_MST3.NAT_CD;
        tObjORDER_MST.ORDER_QTY = 0;
        tObjORDER_MST.ORDER_MEM = [];
        tWArray.push(tObjORDER_MST);

        setDatasTBL_KSV_ORDER_MST(tWArray);
        setDataTBL_KSV_ORDER_MST(tObjORDER_MST);

        setSelectedTBL_KSV_ORDER_MST(tObjORDER_MST);

        setDatasTBL_KSV_ORDER_MEM([]);
        setSelectedTBL_KSV_PROD_MEM([]);

        tSaveTBL_KSV_ORDER_MST_ID = tObjORDER_MST.id;
    };

    const editTBL_KSV_ORDER_MST = (argData) => {};

    const onRowClick1TBL_KSV_ORDER_MST = (argData0) => {
        var tWArray = [...datasTBL_KSV_ORDER_MST];
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }
        tSaveTBL_KSV_ORDER_MST_ID = argData.id;

        var tMainArray = [];

        if (
            argData.TYPE === "Main" &&
            dataEDT_KSV_ORDER_MST.IS_COMBINED === "1" &&
            tWArray.length > 1
        ) {
            var _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };
            var _tTotalCnt = 0;
            var _tAddCnt = 0;

            var tTmpArray = [];
            var tIdx = 0;
            for (tIdx = 1; tIdx < datasTBL_KSV_ORDER_MST.length; tIdx++) {
                var tObj = { ...datasTBL_KSV_ORDER_MST[tIdx] };
                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < tObj.ORDER_MEM.length; tIdx1++) {
                    var tOne = { ...tObj.ORDER_MEM[tIdx1] };

                    var tFlag = -1;
                    var tIdx2 = 0;
                    for (tIdx2 = 0; tIdx2 < tTmpArray.length; tIdx2++) {
                        var tOne1 = tTmpArray[tIdx2];
                        if (
                            tOne.COLOR === tOne1.COLOR &&
                            tOne.ADD_FLAG === tOne1.ADD_FLAG
                        ) {
                            var tKeys = Object.keys(tOne1);
                            var tIdx3 = 0;
                            var tTotCnt = 0;
                            for (tIdx3 = 0; tIdx3 < tKeys.length; tIdx3++) {
                                var tKey = tKeys[tIdx3];
                                if (tKey.includes("SIZE_COL_")) {
                                    var tMainValue = parseInt(tOne1[`${tKey}`]);
                                    var tSubValue = parseInt(tOne[`${tKey}`]);
                                    tOne1[`${tKey}`] = tMainValue + tSubValue;
                                    tTotCnt += tMainValue + tSubValue;
                                }
                            }
                            tOne1.TOT_CNT = tTotCnt;
                            if (tOne.ADD_FLAG === "1")
                                _tAddCnt += tOne1.TOT_CNT;
                            else _tTotalCnt += tOne1.TOT_CNT;

                            tFlag = 0;
                            break;
                        }
                    }

                    if (tFlag < 0) tTmpArray.push(tOne);
                }
            }

            _dataEDT_KSV_ORDER_MST1.ORDER_QTY = _tTotalCnt;
            _dataEDT_KSV_ORDER_MST1.ADD_QTY = _tAddCnt;
            setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);

            let argTBL_KSV_ORDER_MST = argData;
            editTBL_KSV_ORDER_MST(argTBL_KSV_ORDER_MST);
            setDataTBL_KSV_ORDER_MST(argTBL_KSV_ORDER_MST);

            setSelectedTBL_KSV_ORDER_MST(argData);

            setDatasTBL_KSV_ORDER_MEM(tTmpArray);
            setDatasTBL_KSV_ORDER_MEM_MAIN(tTmpArray);
            // setDatasTBL_KSV_ORDER_MEM (tMainArray);
            // setDatasTBL_KSV_ORDER_MEM (argData.ORDER_MEM);

            setSelectedTBL_KSV_PROD_MEM([]);
            setSelectedTBL_KSV_ORDER_MEM([]);
        } else {
            let argTBL_KSV_ORDER_MST = argData;
            editTBL_KSV_ORDER_MST(argTBL_KSV_ORDER_MST);
            setDataTBL_KSV_ORDER_MST(argTBL_KSV_ORDER_MST);

            setSelectedTBL_KSV_ORDER_MST(argData);
            setDatasTBL_KSV_ORDER_MEM(argData.ORDER_MEM);
            setSelectedTBL_KSV_PROD_MEM([]);
            setSelectedTBL_KSV_ORDER_MEM([]);
        }
    };

    const onRowClickTBL_KSV_ORDER_MST = (event) => {
        let argTBL_KSV_ORDER_MST = event.data;
        if (flagSelectModeTBL_KSV_ORDER_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MEM
    };

    /* TABLE KSV_ORDER_MEM*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_MEM
    const [datasTBL_KSV_ORDER_MEM_MAIN, setDatasTBL_KSV_ORDER_MEM_MAIN] =
        useState([]);
    const [datasTBL_KSV_ORDER_MEM_COL, setDatasTBL_KSV_ORDER_MEM_COL] =
        useState([]);
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
    const insertORDER_MEM = () => {
        if (dataEDT_KSV_ORDER_MST3.IS_ADD_SHIP === "1") insertORDER_MEM_ADD();
        else insertORDER_MEM_NORMAL();
    };

    const insertORDER_MEM_NORMAL = () => {
        console.log("Order Mem Insert:" + selectedTBL_KSV_PROD_MEM.length);
        var tData0 = { ...dataEDT_KSV_ORDER_MST1 };

        var tObjArray = [...datasTBL_KSV_ORDER_MEM];
        var tIdx = 0;
        for (tIdx = 0; tIdx < selectedTBL_KSV_PROD_MEM.length; tIdx++) {
            var tProdMem = selectedTBL_KSV_PROD_MEM[tIdx];

            var tWObj = {};
            tWObj.PROD_CD = tProdMem.PROD_CD;
            tWObj.ADD_FLAG = "0";
            tWObj.COLOR = tProdMem.COLOR;
            tWObj.TOT_CNT = 0;
            tWObj.PRICE = tData0.FOB;
            tWObj.SIZE_CNT = "";

            var tIdx1 = 0;
            for (
                tIdx1 = 0;
                tIdx1 < datasTBL_KSV_ORDER_MEM_COL.length;
                tIdx1++
            ) {
                var tColObj = datasTBL_KSV_ORDER_MEM_COL[tIdx1];
                var tKeyName = tColObj.field;
                tWObj[`${tKeyName}`] = 0;
            }

            var tDataIdx = findIndexByIdTBL_KSV_ORDER_MEM(
                tWObj.COLOR,
                tWObj.ADD_FLAG,
            );
            if (tDataIdx < 0) {
                tWObj.id = tObjArray.length;
                tObjArray.push(tWObj);
            } else {
                // var tDataObj = datasTBL_KSV_ORDER_MEM[tDataIdx];
                // tObjArray.push(tDataObj);
            }
        }
        setDatasTBL_KSV_ORDER_MEM(tObjArray);
        var _dataTBL_KSV_ORDER_MST = { ...dataTBL_KSV_ORDER_MST };
        _dataTBL_KSV_ORDER_MST.ORDER_MEM = [...tObjArray];
        setDataTBL_KSV_ORDER_MST(_dataTBL_KSV_ORDER_MST);
    };

    const insertORDER_MEM_ADD = () => {
        console.log("Order Mem Insert:" + selectedTBL_KSV_PROD_MEM.length);
        var tData0 = { ...dataEDT_KSV_ORDER_MST1 };

        var _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        var _tAddQty = parseInt(_dataEDT_KSV_ORDER_MST1.ADD_QTY);

        var tWorkArray = [...datasTBL_KSV_ORDER_MEM];
        var tObjArray = [...datasTBL_KSV_ORDER_MEM];
        var tIdx = 0;
        for (tIdx = 0; tIdx < tObjArray.length; tIdx++) {
            var tObjOne = { ...tObjArray[tIdx] };

            var tKeys = Object.keys(tObjOne);
            var tIdx1 = 0;
            var tTot = 0;
            for (tIdx1 = 0; tIdx1 < tKeys.length; tIdx1++) {
                var tKey = tKeys[tIdx1];
                if (tKeys[tIdx1].includes("SIZE_COL_")) {
                    var tValue = parseInt(tObjOne[`${tKey}`]);
                    tObjOne[`${tKey}`] = parseInt(
                        tValue *
                            (parseInt(dataEDT_KSV_ORDER_MST3.RATE) / 100.0),
                    );
                    tTot += tObjOne[`${tKey}`];
                }
            }
            tObjOne.id = tObjArray.length + tIdx;
            tObjOne.TOT_CNT = tTot;
            tObjOne.ADD_FLAG = "1";
            tObjOne.PRICE = tData0.FOB;

            _tAddQty += tTot;

            tWorkArray.push(tObjOne);
        }
        setDatasTBL_KSV_ORDER_MEM(tWorkArray);

        _dataEDT_KSV_ORDER_MST1.ADD_QTY = _tAddQty;
        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);

        var _dataTBL_KSV_ORDER_MST = { ...dataTBL_KSV_ORDER_MST };
        _dataTBL_KSV_ORDER_MST.ORDER_MEM = [...tWorkArray];
        setDataTBL_KSV_ORDER_MST(_dataTBL_KSV_ORDER_MST);

        var tORDER_MST_ARRAY = [...datasTBL_KSV_ORDER_MST];
        var tWArray = [];
        var tIdx = 0;
        var tMainTotal = 0;
        var tMainAdd = 0;
        for (tIdx = 0; tIdx < tORDER_MST_ARRAY.length; tIdx++) {
            var tOne = tORDER_MST_ARRAY[tIdx];
            if (tOne.id === _dataTBL_KSV_ORDER_MST.id) {
                // tOne.ORDER_QTY = tTotCnt0;
                tOne.ORDER_MEM = [...tWorkArray];
                tWArray.push(tOne);
                // tMainTotal += tTotCnt0;
            } else {
                if (tOne.id > 0) {
                    // tMainTotal += tOne.ORDER_QTY;
                    tWArray.push(tOne);
                } else {
                    tWArray.push(tOne);
                }
            }
        }

        setDatasTBL_KSV_ORDER_MST(tWArray);
    };

    const onCellEditCompleteKSV_ORDER_MEM = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;
        var _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        var tIsAddFlag = rowData["ADD_FLAG"];
        var tSaveTotCnt = rowData["TOT_CNT"];
        var tSaveOldValue = rowData[field];

        var tSaveTotalCnt = parseInt(_dataEDT_KSV_ORDER_MST1.ORDER_QTY);
        var tSaveTotalAddCnt = parseInt(_dataEDT_KSV_ORDER_MST1.ADD_QTY);

        if (tSaveOldValue > newValue) {
            tSaveTotCnt -= tSaveOldValue - newValue;
            if (tIsAddFlag === "1") {
                tSaveTotalAddCnt -= tSaveOldValue - newValue;
            } else {
                tSaveTotalCnt -= tSaveOldValue - newValue;
            }
        } else if (tSaveOldValue < newValue) {
            tSaveTotCnt += newValue - tSaveOldValue;
            if (tIsAddFlag === "1") {
                tSaveTotalAddCnt += newValue - tSaveOldValue;
            } else {
                tSaveTotalCnt += newValue - tSaveOldValue;
            }
        }
        rowData[field] = newValue;
        rowData["TOT_CNT"] = tSaveTotCnt;

        _dataEDT_KSV_ORDER_MST1.ORDER_QTY = String(tSaveTotalCnt);
        _dataEDT_KSV_ORDER_MST1.ADD_QTY = String(tSaveTotalAddCnt);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);

        var _dataTBL_KSV_ORDER_MST = { ...dataTBL_KSV_ORDER_MST };

        var tTotCnt0 = datasTBL_KSV_ORDER_MEM.reduce((acc, curr) => {
            return acc + curr.TOT_CNT;
        }, 0);
        console.log("REDUCE: " + tTotCnt0);
        _dataTBL_KSV_ORDER_MST.ORDER_QTY = tTotCnt0;
        _dataTBL_KSV_ORDER_MST.ORDER_MEM = [...datasTBL_KSV_ORDER_MEM];

        setDataTBL_KSV_ORDER_MST(_dataTBL_KSV_ORDER_MST);

        var tORDER_MST_ARRAY = [...datasTBL_KSV_ORDER_MST];
        var tWArray = [];
        var tIdx = 0;
        var tMainTotal = 0;
        for (tIdx = 0; tIdx < tORDER_MST_ARRAY.length; tIdx++) {
            var tOne = tORDER_MST_ARRAY[tIdx];
            if (tOne.id === _dataTBL_KSV_ORDER_MST.id) {
                tOne.ORDER_QTY = tTotCnt0;
                tOne.ORDER_MEM = [...datasTBL_KSV_ORDER_MEM];
                tWArray.push(tOne);
                tMainTotal += tTotCnt0;
            } else {
                if (tOne.id > 0) {
                    tMainTotal += tOne.ORDER_QTY;
                    tWArray.push(tOne);
                } else {
                    tWArray.push(tOne);
                }
            }
        }
        var tTmpOne = tWArray[0];
        tTmpOne.ORDER_QTY = tMainTotal;
        tWArray[0] = tTmpOne;

        setDatasTBL_KSV_ORDER_MST(tWArray);
    };

    const cellEditorKSV_ORDER_MEM = (options) => {
        return textEditor(options);
    };

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => options.editorCallback(e.target.value)}
            />
        );
    };

    const dynamicColumnsTBL_KSV_ORDER_MEM = datasTBL_KSV_ORDER_MEM_COL.map(
        (col, i) => {
            var tHeader = `id_msg_${col.field_name}_KSV_ORDER_MST_dt`;
            var tHeaderStr = serviceLib.getLocaleMessage(tHeader);
            return (
                <AFColumn field={col.field} header={tHeaderStr} headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} editor={(options) => cellEditorKSV_ORDER_MEM(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_MEM} ></AFColumn>
            );

            //       return  <AFColumn field={col.field} header={tHeaderStr} headerStyle={{ width: '10rem',height:'1.8rem' }} bodyStyle={{ width: '10rem',height:'1.8rem' }} ></AFColumn>
        },
    );

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

    // const searchTBL_KSV_ORDER_MEM = () => {
    //     clearSelectedTBL_KSV_ORDER_MEM();

    //     serviceS0206_ORDER_REG.mgrQueryTBL_KSV_ORDER_MEM(dataQRY_KSV_ORDER_MEM).then(data => {
    //         if (typeof data.graphQLErrors === 'undefined') {
    //             console.log("ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MEM() call => " + data.length);
    //             setDatasTBL_KSV_ORDER_MEM(data);
    //         } else {
    //             // var tStr = data.graphQLErrors[0].message;
    //             console.log("ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MEM()error => " + JSON.stringify(data.graphQLErrors));
    //
    //         }
    //     });

    //     // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MEM
    // }

    const findIndexByIdTBL_KSV_ORDER_MEM = (argCOLOR, argADD_FLAG) => {
        let index = -1;
        for (let i = 0; i < datasTBL_KSV_ORDER_MEM.length; i++) {
            console.log("INPUT: " + argCOLOR + "," + argADD_FLAG);
            console.log(
                "DATA: " +
                    datasTBL_KSV_ORDER_MEM[i].COLOR +
                    "," +
                    datasTBL_KSV_ORDER_MEM[i].ADD_FLAG,
            );

            if (
                datasTBL_KSV_ORDER_MEM[i].COLOR === argCOLOR &&
                datasTBL_KSV_ORDER_MEM[i].ADD_FLAG === argADD_FLAG
            ) {
                index = i;
                break;
            }
        }
        console.log("RETURN: " + index);

        return index;
    };

    //
    const [dataUrlFile1, setDataUrlFile1] = useState("");
    const [dataFile1, setDataFile1] = useState("");

    const [datasKCD_BUYER_FILE_INFO, setDatasKCD_BUYER_FILE_INFO] = useState(
        [],
    );
    const [dataKCD_BUYER_FILE_INFO, setDataKCD_BUYER_FILE_INFO] = useState(
        emptyKCD_BUYER_FILE_INFO,
    );
    const [selectedKCD_BUYER_FILE_INFO, setSelectedKCD_BUYER_FILE_INFO] =
        useState([]);
    const [
        flagSelectModeKCD_BUYER_FILE_INFO,
        setFlagSelectModeKCD_BUYER_FILE_INFO,
    ] = useState(false);
    const dt_KCD_BUYER_FILE_INFO = useRef(null);
    const [createDialogKCD_BANK_FILE_INFO, setCreateDialogKCD_BANK_FILE_INFO] =
        useState(false);
    const [deleteDialogKCD_BANK_FILE_INFO, setDeleteDialogKCD_BANK_FILE_INFO] =
        useState(false);
    const [
        deleteDatasDialogKCD_BANK_FILE_INFO,
        setDeleteDatasDialogKCD_BANK_FILE_INFO,
    ] = useState(false);

    const onRowClick1KCD_BUYER_FILE_INFO = (argData) => {
        let argKCD_BUYER_FILE_INFO = argData;
        setDataKCD_BUYER_FILE_INFO(argData);
    };

    const onRowClickKCD_BUYER_FILE_INFO = (event) => {};

    const saveKCD_BUYER_FILE_INFO = (argFile) => {
        // setSubmittedKCD_BUYER(true);
        let _dataKCD_BUYER = { ...dataEDT_KSV_ORDER_MST1 };
        let _dataKCD_BUYER_FILE_INFO = { ...dataKCD_BUYER_FILE_INFO };

        var fileext = argFile.split(".")[1];

        var tInput = {};
        tInput.BUYER_CD = _dataKCD_BUYER.ORDER_CD;
        tInput.KIND = _dataKCD_BUYER_FILE_INFO.KIND;
        tInput.NAME = _dataKCD_BUYER_FILE_INFO.NAME;
        tInput.FILE_NAME = `${tInput.BUYER_CD}_${datasKCD_BUYER_FILE_INFO.length + 1}.${fileext}`;

        serviceS0206_ORDER_REG
            .mgrInsert_BUYER_FILE_INFO_SAVE(tInput)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    toast.current.show({
                        severity: "success",
                        summary: "Update TeamInfo",
                        detail: "VENDOR_CD:" + data,
                        life: 3000,
                    });
                    // setDataKCD_BUYER_CREDIT_RATING(_dataKCD_BUYER_CREDIT_RATING);

                    serviceS0206_ORDER_REG
                        .mgrQuery_BUYER_FILEINFO(tInput.BUYER_CD)
                        .then((data) => {
                            if (typeof data.graphQLErrors === "undefined") {
                                console.log(
                                    "ServiceMgrKCD_BUYER.mgr1KcdBuyerTeamInfo call => " +
                                        data.length,
                                );
                                setDatasKCD_BUYER_FILE_INFO(data);

                                var tUrls = window.location.href.split("/");
                                var tUrl = `http://afroba.iptime.org:3202/restapi/fileupload2/order/${tInput.BUYER_CD}/${data.length + 1}`;
                                setDataUrlFile1(tUrl);
                            } else {
                                console.log(
                                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                                        JSON.stringify(data.graphQLErrors),
                                );
                            }
                        });
                } else {
                    // setDataKCD_BUYER_CREDIT_RATING(emptyKCD_BUYER_CREDIT_RATING);

                    var tStr = data.graphQLErrors[0].message;
                    toast.current.show({
                        severity: "success",
                        summary: "Query Error",
                        detail: tStr,
                        life: 3000,
                    });
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdBuyerSave error => " +
                            JSON.stringify(data.graphQLErrors[0].message),
                    );
                }
            });
    };

    const onRowDoubleClick_KCD_BUYER_FILE_INFO = (event) => {
        var tFileName = event.data.col3;
        var tUrl =
            "http://afroba.iptime.org:3202/restapi/filedown/order/" + tFileName;
        window.open(tUrl);
    };

    const onFileUploadFile1 = (data) => {
        toast.current.show({
            severity: "info",
            summary: "Success",
            detail: "File1 Uploaded with Basic Mode",
        });
        saveKCD_BUYER_FILE_INFO(data.files[0].name);
    };

    const onInputChangeKCD_BUYER_FILE_INFO = (e, name) => {
        let val = (e.target && e.target.value) || "";
        let _dataKCD_BUYER_FILE_INFO = { ...dataKCD_BUYER_FILE_INFO };
        _dataKCD_BUYER_FILE_INFO[`${name}`] = val;

        setDataKCD_BUYER_FILE_INFO(_dataKCD_BUYER_FILE_INFO);
    };

    /* TABLE KSV_PROD_MEM */
    // DEFINE DATAGRID : TBL_KSV_ORDER_MEM1
    const [datasTBL_KSV_PROD_MEM, setDatasTBL_KSV_PROD_MEM] = useState([]);
    const dt_TBL_KSV_PROD_MEM = useRef(null);
    const [dataTBL_KSV_PROD_MEM, setDataTBL_KSV_PROD_MEM] = useState(
        emptyTBL_KSV_PROD_MEM,
    );
    const [selectedTBL_KSV_PROD_MEM, setSelectedTBL_KSV_PROD_MEM] = useState(
        [],
    );
    const [flagSelectModeTBL_KSV_PROD_MEM, setFlagSelectModeTBL_KSV_PROD_MEM] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PROD_MEM

    const onRowClick1TBL_KSV_PROD_MEM = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PROD_MEM = argData;

        setDataTBL_KSV_PROD_MEM(argTBL_KSV_PROD_MEM);
    };

    const onRowClickTBL_KSV_PROD_MEM = (event) => {
        let argTBL_KSV_PROD_MEM = event.data;
        if (flagSelectModeTBL_KSV_PROD_MEM) return;
    };

    /**EDIT_KSV_ORDER_MST */
    const [datasEDT_KSV_ORDER_MST, setDatasEDT_KSV_ORDER_MST] = useState([]);
    const [dataEDT_KSV_ORDER_MST, setDataEDT_KSV_ORDER_MST] = useState(
        emptyEDT_KSV_ORDER_MST,
    );

    const datasetEDT_KSV_ORDER_MST = (argData) => {
        var _argData = { ...dataEDT_KSV_ORDER_MST };
        _argData.STYLE_NAME = argData.STYLE_NAME;
        _argData.STYLE_CD = argData.STYLE_CD;
        _argData.BUYER_NAME = argData.BUYER_NAME;
        _argData.BUYER_CD = argData.BUYER_CD;
        _argData.COLLECTION = argData.COLLECTION;
        _argData.USER_ID = argData.USER_ID;
        _argData.BUYER_TEAM = argData.BUYER_TEAM;
        _argData.IS_COMBINED = argData.IS_COMBINED;
        _argData.IS_SAMPLE = argData.IS_SAMPLE;
        _argData.IS_FACTORY_FOB = argData.IS_FACTORY_FOB;
        _argData.IS_DL = argData.IS_DL;
        setDataEDT_KSV_ORDER_MST(_argData);
    };

    const resetEDT_KSV_ORDER_MST = () => {
        datasetEDT_KSV_ORDER_MST(emptyEDT_KSV_ORDER_MST);

        // clearSelectedKCD_STYLE();
    };

    const saveEDT_KSV_ORDER_MST = () => {
        var tObj = { ...dataEDT_KSV_ORDER_MST1 };
        if (tObj.ORDER_CD === "") saveEDT_KSV_ORDER_MST_INSERT();
    };

    const saveEDT_KSV_ORDER_MST_INSERT = () => {
        var tInsertObj = {};
        tInsertObj.ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        var tObjMST1 = { ...dataEDT_KSV_ORDER_MST1 };
        tObjMST1.ORDER_QTY = String(tObjMST1.ORDER_QTY);
        tObjMST1.ADD_QTY = String(tObjMST1.ADD_QTY);
        tInsertObj.ORDER_MST1 = tObjMST1;

        tInsertObj.ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };

        var tOrderMemArray = [];

        var tIdx = 0;
        for (tIdx = 0; tIdx < datasTBL_KSV_ORDER_MST.length; tIdx++) {
            var tOneObj = datasTBL_KSV_ORDER_MST[tIdx];
            var tObj = {};
            tObj.id = tOneObj.id;
            tObj.TYPE = tOneObj.TYPE;
            tObj.NAT_CD = tOneObj.NAT_CD;
            tObj.ORDER_QTY = String(tOneObj.ORDER_QTY);
            tObj.ADD_QTY = "0";
            tObj.ORDER_MEM = [];

            var tArray = [];
            if (tIdx === 0 && datasTBL_KSV_ORDER_MST.length > 1)
                tArray = [...datasTBL_KSV_ORDER_MEM_MAIN];
            else tArray = [...tOneObj.ORDER_MEM];

            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < tArray.length; tIdx1++) {
                var tOneObj1 = tArray[tIdx1];

                var tWObj = {};
                tWObj.id = tOneObj1.id;
                tWObj.PROD_CD = tOneObj1.PROD_CD;
                tWObj.ADD_FLAG = tOneObj1.ADD_FLAG;
                tWObj.COLOR = tOneObj1.COLOR;
                tWObj.TOT_CNT = String(tOneObj1.TOT_CNT);
                tWObj.PRICE = String(tOneObj1.PRICE);

                var tKeys = Object.keys(tOneObj1);
                var tIdx2 = 0;
                var tSizeCnt = "";
                for (tIdx2 = 0; tIdx2 < tKeys.length; tIdx2++) {
                    var tKey = tKeys[tIdx2];
                    if (tKey.includes("SIZE_COL")) {
                        var tValue = tOneObj1[`${tKey}`];
                        tSizeCnt += makeNumberFormat(tValue, 6);
                    }
                }
                tWObj.SIZE_CNT = tSizeCnt;
                tObj.ORDER_MEM.push(tWObj);
            }

            tOrderMemArray.push(tObj);
        }

        tInsertObj.ORDER_MST_ARRAY = [...tOrderMemArray];

        serviceS0206_ORDER_REG
            .mgrInsert_KSV_ORDER_MST(tInsertObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceS0206_ORDER_REG.mgrInsert_KSV_ORDER_MST() call => " +
                            data.length,
                    );
                    var tRetObj = data[0];

                    var tObjMST1 = { ...dataEDT_KSV_ORDER_MST1 };
                    tObjMST1.ORDER_CD = tRetObj.CODE;
                    setDataEDT_KSV_ORDER_MST1(tObjMST1);

                    var tUrls = window.location.href.split("/");
                    var tUrl = `http://afroba.iptime.org:3202/restapi/fileupload2/order/${tObjMST1.ORDER_CD}/1`;
                    setDataUrlFile1(tUrl);

                    // Search
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0206_ORDER_REG( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const onInputChangeEDT_KSV_ORDER_MST_STYLE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const [
        datasEDT_KSV_ORDER_MST_STYLE_CD,
        setDatasEDT_KSV_ORDER_MST_STYLE_CD,
    ] = useState([]);
    const [dataEDT_KSV_ORDER_MST_STYLE_CD, setDataEDT_KSV_ORDER_MST_STYLE_CD] =
        useState({});

    const editEDT_KSV_ORDER_MST_STYLE_CD = (argValue) => {
        let _dataEDT_KSV_ORDER_MST_STYLE_CD =
            datasEDT_KSV_ORDER_MST_STYLE_CD.filter(
                (val) => val.STYLE_CD === argValue,
            );
        setDataEDT_KSV_ORDER_MST_STYLE_CD(_dataEDT_KSV_ORDER_MST_STYLE_CD[0]);
    };

    const onDropdownChangeEDT_KSV_ORDER_MST_STYLE_CD = (e, name) => {
        let val = (e.value && e.value.STYLE_CD) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
        editEDT_KSV_ORDER_MST_STYLE_CD(e.value.STYLE_CD);

        var tQryObj = {};
        tQryObj.STYLE_CD = e.value.STYLE_CD;

        resetEDT_KSV_ORDER_MST();
        resetEDT_KSV_ORDER_MST1();
        resetEDT_KSV_ORDER_MST2();
        setDatasTBL_KSV_PROD_MEM([]);
        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MEM([]);

        serviceS0206_ORDER_REG
            .mgrQueryORDER_REG_QRY_STYLE_INFO(tQryObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "serviceS0206_ORDER_REG.mgrQueryORDER_REG_QRY_STYLE_INFO call(STYLE_CD) => " +
                            data.STYLE_CD.length,
                    );
                    console.log(
                        "serviceS0206_ORDER_REG.mgrQueryORDER_REG_QRY_STYLE_INFO call(BUYER_CD) => " +
                            data.BUYER_CD.length,
                    );
                    console.log(
                        "serviceS0206_ORDER_REG.mgrQueryORDER_REG_QRY_STYLE_INFO call(PROD_MST) => " +
                            data.PROD_MST.length,
                    );

                    var tStyleCd = data.STYLE_CD[0];
                    var tBuyerCd = data.BUYER_CD[0];

                    let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };
                    _dataEDT_KSV_ORDER_MST.STYLE_NAME = tStyleCd.STYLE_NAME;
                    _dataEDT_KSV_ORDER_MST.STYLE_CD = tStyleCd.STYLE_CD;
                    _dataEDT_KSV_ORDER_MST.BUYER_NAME = tBuyerCd.BUYER_NAME;
                    _dataEDT_KSV_ORDER_MST.BUYER_CD = tBuyerCd.BUYER_CD;
                    _dataEDT_KSV_ORDER_MST.IS_DL = tStyleCd.DL;
                    setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);

                    editEDT_KSV_ORDER_MST_BUYER_CD(tBuyerCd.BUYER_CD);
                    setDatasTBL_KSV_PROD_MEM(data.PROD_MST);
                } else {
                    console.log(
                        "serviceS0206_ORDER_REG.mgrQueryORDER_REG_QRY_STYLE_INFO error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const onInputChangeEDT_KSV_ORDER_MST_BUYER_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const [
        datasEDT_KSV_ORDER_MST_BUYER_CD,
        setDatasEDT_KSV_ORDER_MST_BUYER_CD,
    ] = useState([]);
    const [dataEDT_KSV_ORDER_MST_BUYER_CD, setDataEDT_KSV_ORDER_MST_BUYER_CD] =
        useState({});

    const editEDT_KSV_ORDER_MST_BUYER_CD = (argValue) => {
        let _dataEDT_KSV_ORDER_MST_BUYER_CD =
            datasEDT_KSV_ORDER_MST_BUYER_CD.filter(
                (val) => val.BUYER_CD === argValue,
            );
        setDataEDT_KSV_ORDER_MST_BUYER_CD(_dataEDT_KSV_ORDER_MST_BUYER_CD[0]);
    };

    const onDropdownChangeEDT_KSV_ORDER_MST_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
        editEDT_KSV_ORDER_MST_BUYER_CD(e.value.BUYER_CD);
    };

    const onInputChangeEDT_KSV_ORDER_MST_COLLECTION = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const onInputChangeEDT_KSV_ORDER_MST_USER_ID = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const onInputChangeEDT_KSV_ORDER_MST_BUYER_TEAM = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const onCheckboxChangeEDT_KSV_ORDER_MST_IS_SAMPLE = (e, name) => {
        let val = "";
        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const onCheckboxChangeEDT_KSV_ORDER_MST_IS_FACTORY_FOB = (e, name) => {
        let val = "";
        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const onInputChangeEDT_KSV_ORDER_MST_IS_DL = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    /**EDIT_KSV_ORDER_MST1 */
    const [datasEDT_KSV_ORDER_MST1, setDatasEDT_KSV_ORDER_MST1] = useState([]);
    const [dataEDT_KSV_ORDER_MST1, setDataEDT_KSV_ORDER_MST1] = useState(
        emptyEDT_KSV_ORDER_MST1,
    );

    const datasetEDT_KSV_ORDER_MST1 = (argData) => {
        var _argData = { ...dataEDT_KSV_ORDER_MST1 };
        _argData.ORDER_CD = argData.ORDER_CD;
        _argData.ORDER_CD1 = argData.ORDER_CD1;
        _argData.ORDER_CD2 = argData.ORDER_CD2;
        _argData.FACTORY_CD = argData.FACTORY_CD;
        _argData.ORDER_QTY = argData.ORDER_QTY;
        _argData.ADD_QTY = argData.ADD_QTY;
        _argData.ORDER_DATE = argData.ORDER_DATE;
        _argData.DUE_DATE = argData.DUE_DATE;
        _argData.MATL_DUE_DATE = argData.MATL_DUE_DATE;
        _argData.CURR_CD = argData.CURR_CD;
        _argData.NAT_CD = argData.NAT_CD;
        _argData.FOB = argData.FOB;
        _argData.FOB_USD = argData.FOB_USD;
        _argData.SIZE_MEMBER = argData.SIZE_MEMBER;
        _argData.SIZE_GROUP = argData.SIZE_GROUP;
        _argData.ETD = argData.ETD;
        _argData.EXF = argData.EXF;
        setDataEDT_KSV_ORDER_MST1(_argData);
    };

    const resetEDT_KSV_ORDER_MST1 = () => {
        datasetEDT_KSV_ORDER_MST1(emptyEDT_KSV_ORDER_MST1);
        editEDT_KSV_ORDER_MST1_CURR_CD(" ");
        editEDT_KSV_ORDER_MST1_NAT_CD(" ");
        editEDT_KSV_ORDER_MST1_FACTORY_CD(" ");
        editEDT_KSV_ORDER_MST1_SIZE_GROUP(" ");
        // clearSelectedKCD_STYLE();
    };

    const resetEDT_KSV_ORDER_MST0 = () => {
        editEDT_KSV_ORDER_MST_STYLE_CD("");

        resetEDT_KSV_ORDER_MST();
        resetEDT_KSV_ORDER_MST1();
        resetEDT_KSV_ORDER_MST2();
        setDatasTBL_KSV_PROD_MEM([]);
        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MEM([]);
    };

    const onInputChangeEDT_KSV_ORDER_MST1_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onInputChangeEDT_KSV_ORDER_MST1_ORDER_CD1 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onInputChangeEDT_KSV_ORDER_MST1_ORDER_CD2 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const [
        datasEDT_KSV_ORDER_MST1_FACTORY_CD,
        setDatasEDT_KSV_ORDER_MST1_FACTORY_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_ORDER_MST1_FACTORY_CD,
        setDataEDT_KSV_ORDER_MST1_FACTORY_CD,
    ] = useState({});

    const editEDT_KSV_ORDER_MST1_FACTORY_CD = (argValue) => {
        let _dataEDT_KSV_ORDER_MST1_FACTORY_CD =
            datasEDT_KSV_ORDER_MST1_FACTORY_CD.filter(
                (val) => val.FACTORY_CD === argValue,
            );
        setDataEDT_KSV_ORDER_MST1_FACTORY_CD(
            _dataEDT_KSV_ORDER_MST1_FACTORY_CD[0],
        );
    };

    const onDropdownChangeEDT_KSV_ORDER_MST1_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
        setDataEDT_KSV_ORDER_MST1_FACTORY_CD(e.value);
    };

    const onInputChangeEDT_KSV_ORDER_MST1_ORDER_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onInputChangeEDT_KSV_ORDER_MST1_ADD_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onCalChangeEDT_KSV_ORDER_MST1_ETD = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };
        _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onCalChangeEDT_KSV_ORDER_MST1_EXF = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };
        _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onCalChangeEDT_KSV_ORDER_MST1_ORDER_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };
        _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onCalChangeEDT_KSV_ORDER_MST1_DUE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };
        _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onCalChangeEDT_KSV_ORDER_MST1_MATL_DUE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };
        _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const [
        datasEDT_KSV_ORDER_MST1_CURR_CD,
        setDatasEDT_KSV_ORDER_MST1_CURR_CD,
    ] = useState([]);
    const [dataEDT_KSV_ORDER_MST1_CURR_CD, setDataEDT_KSV_ORDER_MST1_CURR_CD] =
        useState({});

    const editEDT_KSV_ORDER_MST1_CURR_CD = (argValue) => {
        let _dataEDT_KSV_ORDER_MST1_CURR_CD =
            datasEDT_KSV_ORDER_MST1_CURR_CD.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_ORDER_MST1_CURR_CD(_dataEDT_KSV_ORDER_MST1_CURR_CD[0]);
    };

    const onDropdownChangeEDT_KSV_ORDER_MST1_CURR_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
        setDataEDT_KSV_ORDER_MST1_CURR_CD(e.value);
    };

    const [datasEDT_KSV_ORDER_MST1_NAT_CD, setDatasEDT_KSV_ORDER_MST1_NAT_CD] =
        useState([]);
    const [dataEDT_KSV_ORDER_MST1_NAT_CD, setDataEDT_KSV_ORDER_MST1_NAT_CD] =
        useState({});

    const editEDT_KSV_ORDER_MST1_NAT_CD = (argValue) => {
        let _dataEDT_KSV_ORDER_MST1_NAT_CD =
            datasEDT_KSV_ORDER_MST1_NAT_CD.filter(
                (val) => val.NAT_CD === argValue,
            );
        setDataEDT_KSV_ORDER_MST1_NAT_CD(_dataEDT_KSV_ORDER_MST1_NAT_CD[0]);
    };

    const onDropdownChangeEDT_KSV_ORDER_MST1_NAT_CD = (e, name) => {
        let val = (e.value && e.value.NAT_CD) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
        setDataEDT_KSV_ORDER_MST1_NAT_CD(e.value);
    };

    const onInputChangeEDT_KSV_ORDER_MST1_FOB_USD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onInputChangeEDT_KSV_ORDER_MST1_FOB = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const [
        datasEDT_KSV_ORDER_MST1_SIZE_GROUP,
        setDatasEDT_KSV_ORDER_MST1_SIZE_GROUP,
    ] = useState([]);
    const [
        dataEDT_KSV_ORDER_MST1_SIZE_GROUP,
        setDataEDT_KSV_ORDER_MST1_SIZE_GROUP,
    ] = useState({});

    const editEDT_KSV_ORDER_MST1_SIZE_GROUP = (argValue) => {
        let _dataEDT_KSV_ORDER_MST1_SIZE_GROUP =
            datasEDT_KSV_ORDER_MST1_SIZE_GROUP.filter(
                (val) => val.SIZE_GROUP === argValue,
            );
        setDataEDT_KSV_ORDER_MST1_SIZE_GROUP(
            _dataEDT_KSV_ORDER_MST1_SIZE_GROUP[0],
        );
    };

    const onDropdownChangeEDT_KSV_ORDER_MST1_SIZE_GROUP = (e, name) => {
        let val = (e.value && e.value.SIZE_GROUP) || "";

        let name0 = "SIZE_GROUP";
        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name0}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST1[`${name0}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST1[`${name0}`] = parseInt(val);
        }

        let val1 = (e.value && e.value.SIZE_MEMBER) || "";
        let name1 = "SIZE_MEMBER";
        let tTypeVal1 = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal1 === "string" && typeof val1 === "string") {
            _dataEDT_KSV_ORDER_MST1[`${name1}`] = String(val1);
        } else if (typeof tTypeVal1 === "number" && typeof val1 === "string") {
            _dataEDT_KSV_ORDER_MST1[`${name1}`] = parseInt(val1);
        }

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
        setDataEDT_KSV_ORDER_MST1_SIZE_GROUP(e.value);

        var tSizeCols = e.value.SIZE_MEMBER.split(",");

        var tObjCols = [];
        var tIdx = 0;
        for (tIdx = 0; tIdx < tSizeCols.length; tIdx++) {
            var tObjColOne = {};
            tObjColOne.field_name = tSizeCols[tIdx];
            tObjColOne.field = "SIZE_COL_" + tSizeCols[tIdx];
            tObjColOne.kind = "EDIT";
            tObjCols.push(tObjColOne);
        }

        setDatasTBL_KSV_ORDER_MEM_COL(tObjCols);
        console.log("Change Size Memember: " + tObjCols.length);

        var tORDER_MST_ARRAY = [];
        var tObjORDER_MST = {};
        tObjORDER_MST.id = 0;
        tObjORDER_MST.TYPE = "Main";
        tObjORDER_MST.CURR_CD = "";
        tObjORDER_MST.ORDER_QTY = 0;
        tObjORDER_MST.ORDER_MEM = [];
        tORDER_MST_ARRAY.push(tObjORDER_MST);

        tSaveTBL_KSV_ORDER_MST_ID = 0;

        setDatasTBL_KSV_ORDER_MST(tORDER_MST_ARRAY);
        setDataTBL_KSV_ORDER_MST(tORDER_MST_ARRAY[0]);

        setSelectedTBL_KSV_ORDER_MST(tObjORDER_MST);
        setDatasTBL_KSV_ORDER_MEM([]);
        setSelectedTBL_KSV_PROD_MEM([]);
    };

    /**EDIT_KSV_ORDER_MST2 */
    const [datasEDT_KSV_ORDER_MST2, setDatasEDT_KSV_ORDER_MST2] = useState([]);
    const [dataEDT_KSV_ORDER_MST2, setDataEDT_KSV_ORDER_MST2] = useState(
        emptyEDT_KSV_ORDER_MST2,
    );

    const datasetEDT_KSV_ORDER_MST2 = (argData) => {
        var _argData = { ...dataEDT_KSV_ORDER_MST2 };
        _argData.REF_ORDER_NO = argData.REF_ORDER_NO;
        _argData.REMARK1 = argData.REMARK1;
        _argData.REMARK2 = argData.REMARK2;
        _argData.NOTE = argData.NOTE;
        _argData.SAMPLE_LEVEL = argData.SAMPLE_LEVEL;
        _argData.SAMPLE_SEQ = argData.SAMPLE_SEQ;
        _argData.SAMPLE_REASON = argData.SAMPLE_REASON;
        setDataEDT_KSV_ORDER_MST2(_argData);
    };

    const resetEDT_KSV_ORDER_MST2 = () => {
        datasetEDT_KSV_ORDER_MST2(emptyEDT_KSV_ORDER_MST2);
        editEDT_KSV_ORDER_MST2_SAMPLE_LEVEL(" ");
        editEDT_KSV_ORDER_MST2_SAMPLE_SEQ(" ");
        editEDT_KSV_ORDER_MST2_SAMPLE_REASON(" ");
        // clearSelectedKCD_STYLE();
    };

    const onInputChangeEDT_KSV_ORDER_MST2_REF_ORDER_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST2(_dataEDT_KSV_ORDER_MST2);
    };

    const onInputChangeEDT_KSV_ORDER_MST2_REMARK1 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST2(_dataEDT_KSV_ORDER_MST2);
    };

    const onInputChangeEDT_KSV_ORDER_MST2_REMARK2 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST2(_dataEDT_KSV_ORDER_MST2);
    };

    const onInputChangeEDT_KSV_ORDER_MST2_NOTE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST2(_dataEDT_KSV_ORDER_MST2);
    };

    const [
        datasEDT_KSV_ORDER_MST2_SAMPLE_LEVEL,
        setDatasEDT_KSV_ORDER_MST2_SAMPLE_LEVEL,
    ] = useState([]);
    const [
        dataEDT_KSV_ORDER_MST2_SAMPLE_LEVEL,
        setDataEDT_KSV_ORDER_MST2_SAMPLE_LEVEL,
    ] = useState({});

    const editEDT_KSV_ORDER_MST2_SAMPLE_LEVEL = (argValue) => {
        let _dataEDT_KSV_ORDER_MST2_SAMPLE_LEVEL =
            datasEDT_KSV_ORDER_MST2_SAMPLE_LEVEL.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_ORDER_MST2_SAMPLE_LEVEL(
            _dataEDT_KSV_ORDER_MST2_SAMPLE_LEVEL[0],
        );
    };

    const onDropdownChangeEDT_KSV_ORDER_MST2_SAMPLE_LEVEL = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST2[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_MST2(_dataEDT_KSV_ORDER_MST2);
        setDataEDT_KSV_ORDER_MST2_SAMPLE_LEVEL(e.value);
    };

    const [
        datasEDT_KSV_ORDER_MST2_SAMPLE_SEQ,
        setDatasEDT_KSV_ORDER_MST2_SAMPLE_SEQ,
    ] = useState([]);
    const [
        dataEDT_KSV_ORDER_MST2_SAMPLE_SEQ,
        setDataEDT_KSV_ORDER_MST2_SAMPLE_SEQ,
    ] = useState({});

    const editEDT_KSV_ORDER_MST2_SAMPLE_SEQ = (argValue) => {
        let _dataEDT_KSV_ORDER_MST2_SAMPLE_SEQ =
            datasEDT_KSV_ORDER_MST2_SAMPLE_SEQ.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_ORDER_MST2_SAMPLE_SEQ(
            _dataEDT_KSV_ORDER_MST2_SAMPLE_SEQ[0],
        );
    };

    const onDropdownChangeEDT_KSV_ORDER_MST2_SAMPLE_SEQ = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST2[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_MST2(_dataEDT_KSV_ORDER_MST2);
        setDataEDT_KSV_ORDER_MST2_SAMPLE_SEQ(e.value);
    };

    const [
        datasEDT_KSV_ORDER_MST2_SAMPLE_REASON,
        setDatasEDT_KSV_ORDER_MST2_SAMPLE_REASON,
    ] = useState([]);
    const [
        dataEDT_KSV_ORDER_MST2_SAMPLE_REASON,
        setDataEDT_KSV_ORDER_MST2_SAMPLE_REASON,
    ] = useState({});

    const editEDT_KSV_ORDER_MST2_SAMPLE_REASON = (argValue) => {
        let _dataEDT_KSV_ORDER_MST2_SAMPLE_REASON =
            datasEDT_KSV_ORDER_MST2_SAMPLE_REASON.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_ORDER_MST2_SAMPLE_REASON(
            _dataEDT_KSV_ORDER_MST2_SAMPLE_REASON[0],
        );
    };

    const onDropdownChangeEDT_KSV_ORDER_MST2_SAMPLE_REASON = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST2[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_MST2(_dataEDT_KSV_ORDER_MST2);
        setDataEDT_KSV_ORDER_MST2_SAMPLE_REASON(e.value);
    };

    /**EDIT_KSV_ORDER_MST3 */

    const [datasEDT_KSV_ORDER_MST3, setDatasEDT_KSV_ORDER_MST3] = useState([]);
    const [dataEDT_KSV_ORDER_MST3, setDataEDT_KSV_ORDER_MST3] = useState(
        emptyEDT_KSV_ORDER_MST3,
    );

    const onCheckboxChangeEDT_KSV_ORDER_MST3_IS_ADD_SHIP = (e, name) => {
        let val = "";
        let _dataEDT_KSV_ORDER_MST3 = { ...dataEDT_KSV_ORDER_MST3 };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_ORDER_MST3[`${name}`] = val;
        setDataEDT_KSV_ORDER_MST3(_dataEDT_KSV_ORDER_MST3);
    };

    const onInputChangeEDT_KSV_ORDER_MST3_RATE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST3 = { ...dataEDT_KSV_ORDER_MST3 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST3[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST3[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST3[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST3(_dataEDT_KSV_ORDER_MST3);
    };

    const [datasEDT_KSV_ORDER_MST3_NAT_CD, setDatasEDT_KSV_ORDER_MST3_NAT_CD] =
        useState([]);
    const [dataEDT_KSV_ORDER_MST3_NAT_CD, setDataEDT_KSV_ORDER_MST3_NAT_CD] =
        useState({});

    const onDropdownChangeEDT_KSV_ORDER_MST3_NAT_CD = (e, name) => {
        let val = (e.value && e.value.NAT_CD) || "";

        let _dataEDT_KSV_ORDER_MST3 = { ...dataEDT_KSV_ORDER_MST3 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST3[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST3[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST3[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_MST3(_dataEDT_KSV_ORDER_MST3);
        setDataEDT_KSV_ORDER_MST3_NAT_CD(e.value);
    };

    // END Edit

    useEffect(() => {
        // const serviceMgrKCD_VENDOR = new ServiceMgrKCD_VENDOR();
        let _tQryObj = {};
        _tQryObj.STYLE_NAME = "";
        _tQryObj.BUYER_NAME = "";

        serviceS0206_ORDER_REG.mgrQueryORDER_REG_QRY(_tQryObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "serviceS0206_ORDER_REG.mgrQueryORDER_REG_QRY call(STYLE_CD) => " +
                        data.CODE_STYLE_CD.length,
                );
                console.log(
                    "serviceS0206_ORDER_REG.mgrQueryORDER_REG_QRY call(FACTORY_CD) => " +
                        data.CODE_FACTORY_CD.length,
                );
                console.log(
                    "serviceS0206_ORDER_REG.mgrQueryORDER_REG_QRY call(BUYER_CD) => " +
                        data.CODE_BUYER_CD.length,
                );
                console.log(
                    "serviceS0206_ORDER_REG.mgrQueryORDER_REG_QRY call(NAT_CD) => " +
                        data.CODE_NAT_CD.length,
                );
                console.log(
                    "serviceS0206_ORDER_REG.mgrQueryORDER_REG_QRY call(CURR_CD) => " +
                        data.CODE_CURR_CD.length,
                );
                console.log(
                    "serviceS0206_ORDER_REG.mgrQueryORDER_REG_QRY call(SAMPLE_STEP) => " +
                        data.CODE_SAMPLE_STEP.length,
                );
                console.log(
                    "serviceS0206_ORDER_REG.mgrQueryORDER_REG_QRY call(SAMPLE_ROUND) => " +
                        data.CODE_SAMPLE_ROUND.length,
                );
                console.log(
                    "serviceS0206_ORDER_REG.mgrQueryORDER_REG_QRY call(SAMPLE_REASON) => " +
                        data.CODE_SAMPLE_REASON.length,
                );
                console.log(
                    "serviceS0206_ORDER_REG.mgrQueryORDER_REG_QRY call(SIZE_MST) => " +
                        data.CODE_SIZE_MST.length,
                );

                // ORDER_MEM

                setDatasEDT_KSV_ORDER_MST_STYLE_CD(data.CODE_STYLE_CD);
                setDataEDT_KSV_ORDER_MST_STYLE_CD(data.CODE_STYLE_CD[0]);
                setDatasEDT_KSV_ORDER_MST_BUYER_CD(data.CODE_BUYER_CD);
                setDataEDT_KSV_ORDER_MST_BUYER_CD(data.CODE_BUYER_CD[0]);

                setDatasEDT_KSV_ORDER_MST1_FACTORY_CD(data.CODE_FACTORY_CD);
                setDataEDT_KSV_ORDER_MST1_FACTORY_CD(data.CODE_FACTORY_CD[0]);
                setDatasEDT_KSV_ORDER_MST1_CURR_CD(data.CODE_CURR_CD);
                setDataEDT_KSV_ORDER_MST1_CURR_CD(data.CODE_CURR_CD[0]);
                setDatasEDT_KSV_ORDER_MST1_NAT_CD(data.CODE_NAT_CD);
                setDataEDT_KSV_ORDER_MST1_NAT_CD(data.CODE_NAT_CD[0]);
                setDatasEDT_KSV_ORDER_MST1_SIZE_GROUP(data.CODE_SIZE_MST);
                setDataEDT_KSV_ORDER_MST1_SIZE_GROUP(data.CODE_SIZE_MST[0]);

                setDatasEDT_KSV_ORDER_MST2_SAMPLE_LEVEL(data.CODE_SAMPLE_STEP);
                setDataEDT_KSV_ORDER_MST2_SAMPLE_LEVEL(
                    data.CODE_SAMPLE_STEP[0],
                );
                setDatasEDT_KSV_ORDER_MST2_SAMPLE_SEQ(data.CODE_SAMPLE_ROUND);
                setDataEDT_KSV_ORDER_MST2_SAMPLE_SEQ(data.CODE_SAMPLE_ROUND[0]);
                setDatasEDT_KSV_ORDER_MST2_SAMPLE_REASON(
                    data.CODE_SAMPLE_REASON,
                );
                setDataEDT_KSV_ORDER_MST2_SAMPLE_REASON(
                    data.CODE_SAMPLE_REASON[0],
                );

                setDatasEDT_KSV_ORDER_MST3_NAT_CD(data.CODE_NAT_CD);
                setDataEDT_KSV_ORDER_MST3_NAT_CD(data.CODE_NAT_CD[0]);

                console.log(
                    "serviceS0206_ORDER_REG.mgrQueryORDER_REG_QRY call(1) => " +
                        data.CODE_FACTORY_CD.length,
                );
            } else {
                console.log(
                    "serviceS0206_ORDER_REG.mgrQueryORDER_INFO error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    }, []);

    const blankFn = () => {};

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

    const makeNumberFormat = (tValue, tLeng) => {
        var tStr = String(tValue);
        var tRet0 = "000000000000000000";
        var tRet = tRet0.substring(0, 6 - tStr.length) + tStr;
        return tRet;
    };

    return (
        <div>
            <div
                style={{
                    marginTop: "1rem",
                    marginLeft: "0rem",
                    width: "100rem",
                    height: "18rem",
                }}
            >
                <div style={{ width: "100rem", float: "left" }}>
                    <div
                        style={{
                            marginLeft: "0rem",
                            width: "100rem",
                            height: "18rem",
                        }}
                    >
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "70rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Order</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_STYLE_NAME"
                                disabled
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "30rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Style Name</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "20rem",
                                }}
                                id="id_STYLE_NAME"
                                value={dataEDT_KSV_ORDER_MST.STYLE_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST_STYLE_NAME(
                                        e,
                                        "STYLE_NAME",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{ display: "inline-block", width: "19rem" }}
                        >
                            <div
                                style={{
                                    display: "inline-block",
                                    width: "18rem",
                                }}
                            >
                                <Tooltip
                                    className="menuCodeTooltip"
                                    target={`#btnSearch`}
                                    content={`Alt+S`}
                                    position="bottom"
                                />

                                <Button
                                    style={{ padding: "0rem" }}
                                    label={
                                        <span>
                                            Search(<u>S</u>)
                                        </span>
                                    }
                                    accessKey="S"
                                    id="btnSearch"
                                    icon="pi pi-check"
                                    className="p-button-text"
                                    onClick={blankFn}
                                />
                            </div>
                        </span>

                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "49rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Style</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "20rem",
                                }}
                            >
                                <Dropdown
                                    id="id_STYLE_CD"
                                    value={dataEDT_KSV_ORDER_MST_STYLE_CD}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_ORDER_MST_STYLE_CD(
                                            e,
                                            "STYLE_CD",
                                        )
                                    }
                                    options={datasEDT_KSV_ORDER_MST_STYLE_CD}
                                    optionLabel="STYLE_NAME"
                                    placeholder=""
                                    editable
                                    filter
                                ></Dropdown>
                            </div>
                        </span>

                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "49rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Buyer Name</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "20rem",
                                }}
                                id="id_BUYER_NAME"
                                value={dataEDT_KSV_ORDER_MST.BUYER_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST_BUYER_NAME(
                                        e,
                                        "BUYER_NAME",
                                    )
                                }
                            />
                        </span>

                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "49rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Buyer</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "20rem",
                                }}
                            >
                                <Dropdown
                                    id="id_BUYER_CD"
                                    value={dataEDT_KSV_ORDER_MST_BUYER_CD}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_ORDER_MST_BUYER_CD(
                                            e,
                                            "BUYER_CD",
                                        )
                                    }
                                    options={datasEDT_KSV_ORDER_MST_BUYER_CD}
                                    optionLabel="BUYER_NAME"
                                    placeholder=""
                                    editable
                                    filter
                                ></Dropdown>
                            </div>
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "20rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Factory</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "11rem",
                                }}
                            >
                                <Dropdown
                                    id="id_FACTORY_CD"
                                    value={dataEDT_KSV_ORDER_MST1_FACTORY_CD}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_ORDER_MST1_FACTORY_CD(
                                            e,
                                            "FACTORY_CD",
                                        )
                                    }
                                    options={datasEDT_KSV_ORDER_MST1_FACTORY_CD}
                                    optionLabel="FACTORY_NAME"
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
                                width: "30rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Order Date</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yy-mm-dd"
                                    id="id_ORDER_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_ORDER_MST1.ORDER_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_ORDER_MST1_ORDER_DATE(
                                            e,
                                            "ORDER_DATE",
                                        )
                                    }
                                />
                            </div>
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "30rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Due Date</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yy-mm-dd"
                                    id="id_DUE_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_ORDER_MST1.DUE_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_ORDER_MST1_DUE_DATE(
                                            e,
                                            "DUE_DATE",
                                        )
                                    }
                                />
                            </div>
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "24rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Collection</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "15rem",
                                }}
                                id="id_COLLECTION"
                                value={dataEDT_KSV_ORDER_MST.COLLECTION}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST_COLLECTION(
                                        e,
                                        "COLLECTION",
                                    )
                                }
                            />
                        </span>

                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "20rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>User Id</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_USER"
                                value={dataEDT_KSV_ORDER_MST.USER_ID}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST_USER_ID(
                                        e,
                                        "USER_ID",
                                    )
                                }
                            />
                        </span>

                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "20rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>User</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_BUYER_TEAM"
                                value={dataEDT_KSV_ORDER_MST.BUYER_TEAM}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST_BUYER_TEAM(
                                        e,
                                        "BUYER_TEAM",
                                    )
                                }
                            />
                        </span>

                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "8rem",
                            }}
                        >
                            <p style={{ width: "5rem", display: "inline-block", }}>Sample</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "2rem",
                                }}
                            >
                                <Checkbox
                                    style={{
                                        display: "inline-block",
                                        width: "2rem",
                                    }}
                                    id="id_IS_SAMPLE"
                                    checked={changeCheckBoxVal(
                                        dataEDT_KSV_ORDER_MST.IS_SAMPLE,
                                    )}
                                    onChange={(e) =>
                                        onCheckboxChangeEDT_KSV_ORDER_MST_IS_SAMPLE(
                                            e,
                                            "IS_SAMPLE",
                                        )
                                    }
                                />
                            </div>
                        </span>

                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "10rem",
                            }}
                        >
                            <p style={{ width: "7rem", display: "inline-block", }}>Factory FOB</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "2rem",
                                }}
                            >
                                <Checkbox
                                    style={{
                                        display: "inline-block",
                                        width: "2rem",
                                    }}
                                    id="id_IS_FACTORY_FOB"
                                    checked={changeCheckBoxVal(
                                        dataEDT_KSV_ORDER_MST.IS_FACTORY_FOB,
                                    )}
                                    onChange={(e) =>
                                        onCheckboxChangeEDT_KSV_ORDER_MST_IS_FACTORY_FOB(
                                            e,
                                            "IS_FACTORY_FOB",
                                        )
                                    }
                                />
                            </div>
                        </span>

                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "12rem",
                            }}
                        >
                            <p style={{ width: "4rem", display: "inline-block", }}>DL/ZL</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "7rem",
                                }}
                                id="id_DL"
                                value={dataEDT_KSV_ORDER_MST.IS_DL}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST_IS_DL(
                                        e,
                                        "IS_DL",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Size</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "24rem",
                                }}
                            >
                                <Dropdown
                                    id="id_SIZE_MEMBER"
                                    style={{ width: "24rem" }}
                                    value={dataEDT_KSV_ORDER_MST1_SIZE_GROUP}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_ORDER_MST1_SIZE_GROUP(
                                            e,
                                            "SIZE_GROUP",
                                        )
                                    }
                                    options={datasEDT_KSV_ORDER_MST1_SIZE_GROUP}
                                    optionLabel="SIZE_MEMBER"
                                    placeholder=""
                                    editable
                                ></Dropdown>
                            </div>
                        </span>
                        <span
                            style={{ display: "inline-block", width: "11rem" }}
                        >
                            <div
                                style={{
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Button
                                    style={{ padding: "0rem" }}
                                    label="Insert Capa"
                                    icon="pi pi-check"
                                    className="p-button-text"
                                    onClick={blankFn}
                                />
                            </div>
                        </span>
                        <span
                            style={{
                                marginLeft: "1rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "49rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Order Cd</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_ORDER_CD"
                                value={dataEDT_KSV_ORDER_MST1.ORDER_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST1_ORDER_CD(
                                        e,
                                        "ORDER_CD",
                                    )
                                }
                                disabled
                            />

                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_ORDER_CD1"
                                value={dataEDT_KSV_ORDER_MST1.ORDER_CD1}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST1_ORDER_CD1(
                                        e,
                                        "ORDER_CD1",
                                    )
                                }
                                disabled
                            />

                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_ORDER_CD2"
                                value={dataEDT_KSV_ORDER_MST1.ORDER_CD2}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST1_ORDER_CD2(
                                        e,
                                        "ORDER_CD2",
                                    )
                                }
                                disabled
                            />
                        </span>

                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "24rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Order Qty</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "14rem",
                                }}
                                id="id_ORDER_QTY"
                                value={dataEDT_KSV_ORDER_MST1.ORDER_QTY}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST1_ORDER_QTY(
                                        e,
                                        "ORDER_QTY",
                                    )
                                }
                                disabled
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "24rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Add Qty</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "14rem",
                                }}
                                id="id_ADD_QTY"
                                value={dataEDT_KSV_ORDER_MST1.ADD_QTY}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST1_ADD_QTY(
                                        e,
                                        "ADD_QTY",
                                    )
                                }
                                disabled
                            />
                        </span>

                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "49rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Matl Date</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yymmdd"
                                    id="id_MATL_DUE_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_ORDER_MST1.MATL_DUE_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_ORDER_MST1_MATL_DUE_DATE(
                                            e,
                                            "MATL_DUE_DATE",
                                        )
                                    }
                                />
                            </div>
                        </span>

                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "24rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Currency</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "14rem",
                                }}
                            >
                                <Dropdown
                                    id="id_CURR_CD"
                                    value={dataEDT_KSV_ORDER_MST1_CURR_CD}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_ORDER_MST1_CURR_CD(
                                            e,
                                            "CURR_CD",
                                        )
                                    }
                                    options={datasEDT_KSV_ORDER_MST1_CURR_CD}
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
                                width: "24rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Country</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "14rem",
                                }}
                            >
                                <Dropdown
                                    id="id_NAT_CD"
                                    value={dataEDT_KSV_ORDER_MST1_NAT_CD}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_ORDER_MST1_NAT_CD(
                                            e,
                                            "NAT_CD",
                                        )
                                    }
                                    options={datasEDT_KSV_ORDER_MST1_NAT_CD}
                                    optionLabel="NAT_NAME"
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
                                width: "24rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", color: "red", }}>*U.Price</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "14rem",
                                }}
                                id="id_FOB"
                                value={dataEDT_KSV_ORDER_MST1.FOB}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST1_FOB(
                                        e,
                                        "FOB",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "24rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>U.Price($)</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "14rem",
                                }}
                                id="id_FOB_USD"
                                value={dataEDT_KSV_ORDER_MST1.FOB_USD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST1_FOB_USD(
                                        e,
                                        "FOB_USD",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "20rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Price term</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_STYLE_NAME"
                            />
                        </span>
                    </div>
                </div>
            </div>

            <Divider />

            <div
                style={{ marginLeft: "0rem", width: "100rem", height: "2rem" }}
            >
                <div style={{ width: "100rem", float: "left" }}>
                    <div
                        style={{
                            width: "100rem",
                            height: "2rem",
                            marginTop: "1rem",
                        }}
                    >
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "19rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Buyer PO</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_REF_ORDER_NO"
                                value={dataEDT_KSV_ORDER_MST2.REF_ORDER_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST2_REF_ORDER_NO(
                                        e,
                                        "REF_ORDER_NO",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "21rem",
                            }}
                        >
                            <p style={{ width: "6rem", display: "inline-block", }}>Country</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "14rem",
                                }}
                            >
                                <Dropdown
                                    id="id_CURR_CD"
                                    value={dataEDT_KSV_ORDER_MST3_NAT_CD}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_ORDER_MST3_NAT_CD(
                                            e,
                                            "NAT_CD",
                                        )
                                    }
                                    options={datasEDT_KSV_ORDER_MST3_NAT_CD}
                                    optionLabel="NAT_NAME"
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
                                width: "16rem",
                            }}
                        >
                            <p style={{ width: "4rem", display: "inline-block", }}>EXF</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yy-mm-dd"
                                    id="id_EXF"
                                    value={changeDateVal(
                                        dataEDT_KSV_ORDER_MST1.EXF,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_ORDER_MST1_EXF(
                                            e,
                                            "EXF",
                                        )
                                    }
                                />
                            </div>
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "13rem",
                            }}
                        >
                            <p style={{ width: "2rem", display: "inline-block", }}>ETD</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yy-mm-dd"
                                    id="id_ORDER_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_ORDER_MST1.ETD,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_ORDER_MST1_ETD(
                                            e,
                                            "ETD",
                                        )
                                    }
                                />
                            </div>
                        </span>
                        <span
                            style={{
                                display: "inline-block",
                                marginLeft: "0.5rem",
                            }}
                        >
                            <div style={{ display: "inline-block" }}>
                                <Button
                                    style={{
                                        padding: "0rem",
                                        marginLeft: "0.5rem",
                                    }}
                                    label="Add Order"
                                    icon="pi pi-check"
                                    className="p-button-text"
                                    onClick={addCombinedOrder}
                                />

                                <Button
                                    style={{
                                        padding: "0rem",
                                        marginLeft: "1.8rem",
                                    }}
                                    label="Upd Order"
                                    icon="pi pi-check"
                                    className="p-button-text"
                                    onClick={blankFn}
                                />

                                <Button
                                    style={{
                                        padding: "0rem",
                                        marginLeft: "1.8rem",
                                    }}
                                    label="Del Order"
                                    icon="pi pi-check"
                                    className="p-button-text"
                                    onClick={blankFn}
                                />
                            </div>
                        </span>
                    </div>
                </div>
            </div>
            <div
                style={{
                    float: "left",
                    width: "100rem",
                    marginTop: "1rem",
                    height: "18rem",
                    marginLeft: "1rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_MST}
                    size="small"
                    value={datasTBL_KSV_ORDER_MST}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_ORDER_MST}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_ORDER_MST(true);
                        setSelectedTBL_KSV_ORDER_MST(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_ORDER_MST.length,
                        );
                        onRowClick1TBL_KSV_ORDER_MST(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_MST}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 8 }}
                    emptyMessage=" "
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="16rem"
                >
                    <AFColumn field="TYPE" headerClassName="t-header" header="Type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="NAT_CD" headerClassName="t-header" header="Country" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ORDER_QTY" headerClassName="t-header" header="Order Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
            </div>
            <Divider />

            <div
                style={{
                    width: "99rem",
                    height: "2rem",
                    marginTop: "1rem",
                    marginLeft: "1rem",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "11rem",
                    }}
                >
                    <p style={{ width: "5rem", display: "inline-block" }}>Add Ship</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "2rem",
                        }}
                    >
                        <Checkbox
                            style={{ display: "inline-block", width: "2rem" }}
                            id="id_IS_ADD_SHIP"
                            checked={changeCheckBoxVal(
                                dataEDT_KSV_ORDER_MST3.IS_ADD_SHIP,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeEDT_KSV_ORDER_MST3_IS_ADD_SHIP(
                                    e,
                                    "IS_ADD_SHIP",
                                )
                            }
                        />
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "20rem",
                    }}
                >
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                        id="id_RATE"
                        value={dataEDT_KSV_ORDER_MST3.RATE}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_ORDER_MST3_RATE(e, "RATE")
                        }
                    />

                    <p style={{ width: "5rem", display: "inline-block" }}>%</p>
                </span>
                <span style={{ display: "inline-block", width: "19rem" }}>
                    <div style={{ display: "inline-block", width: "18rem" }}>
                        <Button
                            style={{ padding: "0rem" }}
                            label="Add"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
                <span style={{ display: "inline-block", width: "19rem" }}>
                    <div style={{ display: "inline-block", width: "18rem" }}>
                        <Button
                            style={{ padding: "0rem" }}
                            label="Prod Insert"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={insertORDER_MEM}
                        />
                    </div>
                </span>
                <span style={{ display: "inline-block", width: "19rem" }}>
                    <div style={{ display: "inline-block", width: "18rem" }}>
                        <Button
                            style={{ padding: "0rem" }}
                            label="Prod Delete"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
            </div>
            <div
                style={{
                    marginLeft: "1rem",
                    width: "50rem",
                    float: "left",
                    marginLeft: "1rem",
                }}
            >
                <div
                    style={{
                        marginTop: "1rem",
                        width: "49rem",
                        height: "20rem",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_PROD_MEM}
                        size="small"
                        value={datasTBL_KSV_PROD_MEM}
                        metaKeySelection={false}
                        resizableColumns
                        columnResizeMode="fit"
                        showGridlines
                        selectionMode="multiple"
                        selection={selectedTBL_KSV_PROD_MEM}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_PROD_MEM(true);
                            setSelectedTBL_KSV_PROD_MEM(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_PROD_MEM.length,
                            );
                            onRowClick1TBL_KSV_PROD_MEM(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_PROD_MEM}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 9 }}
                        emptyMessage=" "
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="18rem"
                    >
                        <AFColumn field="COLOR" headerClassName="t-header" header="Color" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="PROD_CD" headerClassName="t-header" header="Prod Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="STYLE_CD" headerClassName="t-header" header="Style" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="TYPE" headerClassName="t-header" header="Type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="SEQ" headerClassName="t-header" header="Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </div>
            <div style={{ width: "49rem", height: "20rem", float: "left" }}>
                <div
                    style={{
                        marginTop: "1rem",
                        width: "49rem",
                        height: "20rem",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_ORDER_MEM}
                        size="small"
                        value={datasTBL_KSV_ORDER_MEM}
                        resizableColumns
                        columnResizeMode="fit"
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
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 9 }}
                        emptyMessage=" "
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="18rem"
                    >
                        <AFColumn field="PROD_CD" headerClassName="t-header" header="Prod Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="COLOR" headerClassName="t-header" header="Color" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="ADD_FLAG" headerClassName="t-header" header="Add Flag" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="TOT_CNT" headerClassName="t-header" header="Total" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="PRICE" headerClassName="t-header" header="Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        {dynamicColumnsTBL_KSV_ORDER_MEM}
                    </AFDataTable>
                </div>
            </div>

            <Divider />

            <div
                style={{ width: "100rem", height: "16rem", marginTop: "1rem" }}
            >
                <div style={{ float: "left", width: "60rem", height: "15rem" }}>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "38rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Buyer PO</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "18rem",
                            }}
                            id="id_REF_ORDER_NO"
                            value={dataEDT_KSV_ORDER_MST2.REF_ORDER_NO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_MST2_REF_ORDER_NO(
                                    e,
                                    "REF_ORDER_NO",
                                )
                            }
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>샘플단계</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "8rem",
                            }}
                        >
                            <Dropdown
                                id="id_SAMPLE_LEVEL"
                                value={dataEDT_KSV_ORDER_MST2_SAMPLE_LEVEL}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_ORDER_MST2_SAMPLE_LEVEL(
                                        e,
                                        "SAMPLE_LEVEL",
                                    )
                                }
                                options={datasEDT_KSV_ORDER_MST2_SAMPLE_LEVEL}
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
                            width: "38rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Remark1</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "18rem",
                            }}
                            id="id_REMARK1"
                            value={dataEDT_KSV_ORDER_MST2.REMARK1}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_MST2_REMARK1(
                                    e,
                                    "REMARK1",
                                )
                            }
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>차수</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "8rem",
                            }}
                        >
                            <Dropdown
                                id="id_SAMPLE_SEQ"
                                value={dataEDT_KSV_ORDER_MST2_SAMPLE_SEQ}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_ORDER_MST2_SAMPLE_SEQ(
                                        e,
                                        "SAMPLE_SEQ",
                                    )
                                }
                                options={datasEDT_KSV_ORDER_MST2_SAMPLE_SEQ}
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
                            width: "38rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Remark2</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                            id="id_REMARK2"
                            value={dataEDT_KSV_ORDER_MST2.REMARK2}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_MST2_REMARK2(
                                    e,
                                    "REMARK2",
                                )
                            }
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>원인</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "8rem",
                            }}
                        >
                            <Dropdown
                                id="id_SAMPLE_REASON"
                                value={dataEDT_KSV_ORDER_MST2_SAMPLE_REASON}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_ORDER_MST2_SAMPLE_REASON(
                                        e,
                                        "SAMPLE_REASON",
                                    )
                                }
                                options={datasEDT_KSV_ORDER_MST2_SAMPLE_REASON}
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
                            width: "54rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Note</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "44rem",
                            }}
                            id="id_NOTE"
                            value={dataEDT_KSV_ORDER_MST2.NOTE}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_MST2_NOTE(e, "NOTE")
                            }
                        />
                    </span>
                    <span style={{ display: "inline-block", width: "55rem" }}>
                        <div
                            style={{
                                marginLeft: "10rem",
                                display: "inline-block",
                                width: "18rem",
                            }}
                        >
                            <Button
                                style={{ padding: "0rem" }}
                                label="Save Order"
                                icon="pi pi-check"
                                className="p-button-text"
                                onClick={saveEDT_KSV_ORDER_MST}
                            />
                        </div>
                        <div
                            style={{ display: "inline-block", width: "18rem" }}
                        >
                            <Button
                                style={{ padding: "0rem" }}
                                label="Reset"
                                icon="pi pi-check"
                                className="p-button-text"
                                onClick={resetEDT_KSV_ORDER_MST0}
                            />
                        </div>
                    </span>
                </div>
                <div style={{ float: "left", width: "40rem", height: "15rem" }}>
                    <div style={{ width: "30rem", height: "12rem" }}>
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_KCD_BUYER_FILE_INFO}
                            size="small"
                            value={datasKCD_BUYER_FILE_INFO}
                            resizableColumns
                            columnResizeMode="fit"
                            showGridlines
                            onRowDoubleClick={
                                onRowDoubleClick_KCD_BUYER_FILE_INFO
                            }
                            selection={selectedKCD_BUYER_FILE_INFO}
                            onSelectionChange={(e) => {
                                setFlagSelectModeKCD_BUYER_FILE_INFO(true);
                                setSelectedKCD_BUYER_FILE_INFO(e.value);
                                console.log(
                                    "selected length:" +
                                        selectedKCD_BUYER_FILE_INFO.length,
                                );
                                onRowClick1KCD_BUYER_FILE_INFO(e.value);
                            }}
                            onRowClick={onRowClickKCD_BUYER_FILE_INFO}
                            dataKey="id"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 6 }}
                            emptyMessage=" "
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="12rem"
                        >
                            <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                            <AFColumn field="col1" headerClassName="t-header" header="종류" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                            <AFColumn field="col2" headerClassName="t-header" header="이름" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        </AFDataTable>
                    </div>
                    <div style={{ width: "30rem", height: "3rem" }}>
                        <span
                            style={{
                                height: "2rem",
                                display: "block",
                                width: "15rem",
                            }}
                        >
                            <p style={{ width: "4rem", display: "inline-block", }}>종류</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_SHIP_ADDR3"
                                value={dataKCD_BUYER_FILE_INFO.KIND}
                                onChange={(e) =>
                                    onInputChangeKCD_BUYER_FILE_INFO(e, "KIND")
                                }
                            />
                        </span>
                        <span
                            style={{
                                height: "2rem",
                                display: "block",
                                width: "29rem",
                            }}
                        >
                            <p style={{ width: "4rem", display: "inline-block", }}>이름</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_SHIP_ADDR3"
                                value={dataKCD_BUYER_FILE_INFO.NAME}
                                onChange={(e) =>
                                    onInputChangeKCD_BUYER_FILE_INFO(e, "NAME")
                                }
                            />
                        </span>
                        <span
                            style={{
                                height: "3rem",
                                display: "block",
                                width: "30rem",
                            }}
                        >
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "29rem",
                                }}
                            >
                                <FileUpload
                                    mode="basic"
                                    maxFileSize={10000000}
                                    label="Upload"
                                    chooseLabel="Upload"
                                    style={{ padding: "0rem" }}
                                    name="file1_doc"
                                    url={dataUrlFile1}
                                    onUpload={onFileUploadFile1}
                                />
                            </div>
                        </span>
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

export default React.memo(S0206_ORDER_REG, comparisonFn);
