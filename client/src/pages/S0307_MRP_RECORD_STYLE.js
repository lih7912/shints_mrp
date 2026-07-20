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
import { ServiceS0303_MRP_RECORD_STYLE } from "../service/service_biz/ServiceS0303_MRP_RECORD_STYLE";
import { ServiceS0307_MRP_RECORD_STYLE } from "../service/service_biz/ServiceS0307_MRP_RECORD_STYLE";
import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KCD_MATL_MST = {
    MATL_NAME: "",
    COLOR: "",
    MATL_CD: "",
    SPEC: "",
    VENDOR_NAME: "",
};

const emptyQRY_KCD_STYLE = {
    ORDER_CD: "",
    PO_CD: "",
    STYLE_CD: "",
    STYLE_NAME: "",
    COLOR: "",
    PROD_CD: "",
    ORDER_MRP_SEQ: "",
};

const emptyQRY_KSV_PROD_MEM = {
    MATL_CD: "",
};

const emptyTBL_KCD_MATL_MST = {
    id: 0,
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    MATL_PRICE: "",
    CURR_CD: "",
    UNIT: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    MATL_CD: "",
    STATUS_CD: "",
    STATUS_NAME: "",
};

const emptyTBL_KCD_STYLE = {
    id: 0,
    STYLE_NAME: "",
    STYLE_CD: "",
};

const emptyTBL_KSV_PROD_MEM = {
    MRP_CHECK: "",
    MATL_TYPE2: "",
    MATL_NAME: "",
    MATL_CD: "",
    COLOR: "",
    SPEC: "",
    MATL_PRICE: "",
    CURR_CD: "",
    UNIT: "",
    ADD_LOSS: "",
    USE_SIZE: "",
    REMARK: "",
    BVT_REMARK: "",
    COUNTRY: "",
    STD_NET: "",
    STD_LOSS: "",
    NET: "",
    LOSS: "",
    GROSS: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    STD_GROSS: "",
    SEQ: "",
};

const emptyTBL_KSV_PROD_MST = {
    id: 0,
};

const emptyEDT_KSV_PROD_MEM = {
    STD_FLAG: "",
    NET: "",
    LOSS: "",
    USE_SIZE: "",
    REMARK: "",
};

const S0307_MRP_RECORD_STYLE = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0303_MRP_RECORD_STYLERef = useRef(null);
    if (!serviceS0303_MRP_RECORD_STYLERef.current) serviceS0303_MRP_RECORD_STYLERef.current = new ServiceS0303_MRP_RECORD_STYLE();
    const serviceS0303_MRP_RECORD_STYLE = serviceS0303_MRP_RECORD_STYLERef.current;
    const serviceS0307_MRP_RECORD_STYLERef = useRef(null);
    if (!serviceS0307_MRP_RECORD_STYLERef.current) serviceS0307_MRP_RECORD_STYLERef.current = new ServiceS0307_MRP_RECORD_STYLE();
    const serviceS0307_MRP_RECORD_STYLE = serviceS0307_MRP_RECORD_STYLERef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    const search_ORDER_LIST = () => {
        var tObj = { ...dataQRY_KCD_STYLE };

        var tIn = {};
        tIn.ORDER_CD = tObj.ORDER_CD;

        serviceS0307_MRP_RECORD_STYLE
            .mgrQuery_SEARCH_ORDER_CD(tIn)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        var tObjs = [];
                        tObjs.push(data[0]);
                        setDatasTBL_KCD_STYLE(tObjs);

                        var tQry = { ...dataQRY_KCD_STYLE };
                        tQry.PO_CD = data[0].PO_CD;
                        tQry.STYLE_CD = data[0].STYLE_CD;
                        tQry.STYLE_NAME = data[0].STYLE_NAME;
                        setDataQRY_KCD_STYLE(tQry);

                        var tProdMsts = [];
                        data.forEach((col, i) => {
                            var tObj = {};
                            tObj.PROD_CD = col.PROD_CD;
                            tObj.COLOR = col.COLOR;
                            tObj.SIZE_LOSS = "0";
                            tObj.UPD_USER = "";
                            tObj.UPD_DATETIME = "";
                            tProdMsts.push(tObj);
                        });

                        setDatasTBL_KSV_PROD_MST(tProdMsts);
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "mgrQueryTBL_KCD_STYLE()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_MOVE_UP = () => {
        var tArray = [...datasTBL_KSV_PROD_MEM];
        var tOne = { ...dataTBL_KSV_PROD_MEM };

        if (parseInt(tOne.SEQ) === 1) return;

        var tNewArray = [];

        tArray.forEach((col, i) => {
            var tObj = { ...col };
            if (parseInt(tObj.SEQ) === parseInt(tOne.SEQ) - 1) {
                tNewArray.push(tOne);
                tNewArray.push(tObj);
            } else if (tObj.SEQ === tOne.SEQ) {
            } else {
                tNewArray.push(tObj);
            }
        });

        var tNewArray2 = [];
        tNewArray.forEach((col, i) => {
            var tObj = { ...col };
            tObj.SEQ = i + 1;
            tNewArray2.push(tObj);
        });

        setDatasTBL_KSV_PROD_MEM(tNewArray2);
        setSelectedTBL_KSV_PROD_MEM([]);
        setDataTBL_KSV_PROD_MEM({});
    };

    const process_MOVE_DOWN = () => {
        var tArray = [...datasTBL_KSV_PROD_MEM];
        var tOne = { ...dataTBL_KSV_PROD_MEM };

        if (parseInt(tOne.SEQ) === tArray.length) return;

        var tNewArray = [];

        tArray.forEach((col, i) => {
            var tObj = { ...col };
            if (tObj.SEQ === tOne.SEQ) {
            } else if (parseInt(tObj.SEQ) === parseInt(tOne.SEQ) + 1) {
                tNewArray.push(tObj);
                tNewArray.push(tOne);
            } else {
                tNewArray.push(tObj);
            }
        });

        var tNewArray2 = [];
        tNewArray.forEach((col, i) => {
            var tObj = { ...col };
            tObj.SEQ = i + 1;
            tNewArray2.push(tObj);
        });

        setDatasTBL_KSV_PROD_MEM(tNewArray2);
        setSelectedTBL_KSV_PROD_MEM([]);
        setDataTBL_KSV_PROD_MEM({});
    };

    const popup_COPY_PRODUCT = () => {
        var tUrls = window.location.href.split("/");
        console.log("URL=>" + tUrls[2]);
        var tUrl1 = "";
        if (window.location.href.includes("3288")) {
            tUrl1 = "http://afroba.iptime.org:3288/webapp/mrpapp/index.html#/";
        } else if (window.location.href.includes("3201")) {
            tUrl1 = "http://afroba.iptime.org:3201/#/";
        } else if (window.location.href.includes("3203")) {
            tUrl1 = "http://192.168.0.105:3203/#/";
        } else {
            tUrl1 = "http://localhost:3201/#/";
        }

        tUrl1 = `${window.location.origin}/#/`;
        tUrl1 += "S030701_COPY_PRODUCT";
        setUrlIframe(tUrl1);
        setCreateDialog(true);
    };

    const popup_STYLE_SEARCH = () => {
        var tUrls = window.location.href.split("/");
        console.log("URL=>" + tUrls[2]);
        var tUrl1 = "";
        if (window.location.href.includes("3288")) {
            tUrl1 = "http://afroba.iptime.org:3288/webapp/mrpapp/index.html#/";
        } else if (window.location.href.includes("3201")) {
            tUrl1 = "http://afroba.iptime.org:3201/#/";
        } else if (window.location.href.includes("3203")) {
            tUrl1 = "http://192.168.0.105:3203/#/";
        } else {
            tUrl1 = "http://localhost:3201/#/";
        }

        // var tSTYLE_CD = 'ST23-0734';
        var tSTYLE_CD = selectedTBL_KCD_STYLE[0].STYLE_CD;

        tUrl1 = `${window.location.origin}/#/`;
        tUrl1 += "S030702_COPY_STYLE?STYLE_CD=" + tSTYLE_CD;
        setUrlIframe(tUrl1);
        setCreateDialog(true);
    };

    const popup_MRP_BY_ORDER_SRCH = () => {
        var tUrls = window.location.href.split("/");
        console.log("URL=>" + tUrls[2]);
        var tUrl1 = "";
        if (window.location.href.includes("3288")) {
            tUrl1 = "http://afroba.iptime.org:3288/webapp/mrpapp/index.html#/";
        } else if (window.location.href.includes("3201")) {
            tUrl1 = "http://afroba.iptime.org:3201/#/";
        } else if (window.location.href.includes("3203")) {
            tUrl1 = "http://192.168.0.105:3203/#/";
        } else {
            tUrl1 = "http://localhost:3201/#/";
        }

        var tSTYLE_CD = "ST23-0830";
        var tSTYLE_CD = selectedTBL_KCD_STYLE[0].STYLE_CD;

        tUrl1 = `${window.location.origin}/#/`;
        tUrl1 += "S030703_MRP_BY_SEARCH?STYLE_CD=" + tSTYLE_CD;
        setUrlIframe(tUrl1);
        setCreateDialog(true);
    };

    const popup_ADD_SEQ = () => {
        if (selectedTBL_KSV_PROD_MST.length <= 0) return;

        var tUrls = window.location.href.split("/");
        console.log("URL=>" + tUrls[2]);
        var tUrl1 = "";
        if (window.location.href.includes("3288")) {
            tUrl1 = "http://afroba.iptime.org:3288/webapp/mrpapp/index.html#/";
        } else if (window.location.href.includes("3201")) {
            tUrl1 = "http://afroba.iptime.org:3201/#/";
        } else if (window.location.href.includes("3203")) {
            tUrl1 = "http://192.168.0.105:3203/#/";
        } else {
            tUrl1 = "http://localhost:3201/#/";
        }

        var tPROD_CD = "ST23-0830";
        var tPROD_CD = selectedTBL_KSV_PROD_MST[0].PROD_CD;

        tUrl1 = `${window.location.origin}/#/`;
        tUrl1 += "S030704_ADD_SEQ_MRP_BY_ORDER?PROD_CD=" + tPROD_CD;
        setUrlIframe(tUrl1);
        setCreateDialog(true);
    };

    /* QRY KCD_MATL_MST*/
    const [dataQRY_KCD_MATL_MST, setDataQRY_KCD_MATL_MST] = useState(
        emptyQRY_KCD_MATL_MST,
    );

    /* QRY KCD_STYLE */
    const [dataQRY_KCD_STYLE, setDataQRY_KCD_STYLE] =
        useState(emptyQRY_KCD_STYLE);

    const onInputChangeQRY_KCD_STYLE_ORDER_MRP_SEQ = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_STYLE = { ...dataQRY_KCD_STYLE };

        let tTypeVal = _dataQRY_KCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_STYLE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_STYLE[`${name}`] = parseInt(val);

        setDataQRY_KCD_STYLE(_dataQRY_KCD_STYLE);
    };

    const onInputChangeQRY_KCD_STYLE_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_STYLE = { ...dataQRY_KCD_STYLE };

        let tTypeVal = _dataQRY_KCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_STYLE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_STYLE[`${name}`] = parseInt(val);

        setDataQRY_KCD_STYLE(_dataQRY_KCD_STYLE);
    };

    const onInputChangeQRY_KCD_STYLE_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_STYLE = { ...dataQRY_KCD_STYLE };

        let tTypeVal = _dataQRY_KCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_STYLE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_STYLE[`${name}`] = parseInt(val);

        setDataQRY_KCD_STYLE(_dataQRY_KCD_STYLE);
    };

    const onInputChangeQRY_KCD_STYLE_STYLE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_STYLE = { ...dataQRY_KCD_STYLE };

        let tTypeVal = _dataQRY_KCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_STYLE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_STYLE[`${name}`] = parseInt(val);

        setDataQRY_KCD_STYLE(_dataQRY_KCD_STYLE);
    };

    const onInputChangeQRY_KCD_STYLE_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_STYLE = { ...dataQRY_KCD_STYLE };

        let tTypeVal = _dataQRY_KCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_STYLE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_STYLE[`${name}`] = parseInt(val);

        setDataQRY_KCD_STYLE(_dataQRY_KCD_STYLE);
    };

    const onInputChangeQRY_KCD_STYLE_PROD_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_STYLE = { ...dataQRY_KCD_STYLE };

        let tTypeVal = _dataQRY_KCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_STYLE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_STYLE[`${name}`] = parseInt(val);

        setDataQRY_KCD_STYLE(_dataQRY_KCD_STYLE);
    };

    /* QRY KSV_PROD_MEM*/

    const [dataQRY_KSV_PROD_MEM, setDataQRY_KSV_PROD_MEM] = useState(
        emptyQRY_KSV_PROD_MEM,
    );

    /**TABLE KCD_MATL_MST */

    // DEFINE DATAGRID : TBL_KCD_MATL_MST
    const [datasTBL_KCD_MATL_MST, setDatasTBL_KCD_MATL_MST] = useState([]);
    const dt_TBL_KCD_MATL_MST = useRef(null);
    const [dataTBL_KCD_MATL_MST, setDataTBL_KCD_MATL_MST] = useState(
        emptyTBL_KCD_MATL_MST,
    );
    const [selectedTBL_KCD_MATL_MST, setSelectedTBL_KCD_MATL_MST] = useState(
        [],
    );
    const [flagSelectModeTBL_KCD_MATL_MST, setFlagSelectModeTBL_KCD_MATL_MST] =
        useState(false);
    const [frozenTBL_KCD_MATL_MST, setFrozenTBL_KCD_MATL_MST] = useState([]);

    // DATAGRID CODE : TBL_KCD_MATL_MST

    const addMaterial = () => {
        if (selectedTBL_KCD_MATL_MST.length <= 0) return;

        var tObjArray = [...datasTBL_KSV_PROD_MEM];

        var el = { ...selectedTBL_KCD_MATL_MST[0] };
        var tObj = { ...emptyTBL_KSV_PROD_MEM };
        tObj.COLOR = el.COLOR;
        tObj.SPEC = el.SPEC;
        tObj.MATL_PRICE = el.MATL_PRICE;
        tObj.CURR_CD = el.CURR_CD;
        tObj.UNIT = el.UNIT;
        tObj.VENDOR_CD = el.VENDOR_CD;
        tObj.MATL_CD = el.MATL_CD;
        tObj.STD_NET = "0";
        tObj.STD_LOSS = "0";
        tObj.STD_GROSS = "0";
        tObj.ADD_LOSS = "0";
        tObj.PROD_CD = selectedTBL_KSV_PROD_MST[0].PROD_CD;
        tObj.MATL_NAME = el.MATL_NAME;
        tObj.MATL_TYPE2 = el.MATL_TYPE2;
        tObj.DL_FLAG = selectedTBL_KCD_STYLE[0].DL;

        tObj.NET = "0";
        tObj.LOSS = "0";
        tObj.GROSS = "0";

        console.log("Add Material(1)=>" + tObjArray.length);

        var wArray = [];

        if (selectedTBL_KSV_PROD_MEM.length > 0) {
            var tCompObj = {
                ...selectedTBL_KSV_PROD_MEM[
                    selectedTBL_KSV_PROD_MEM.length - 1
                ],
            };
            tObjArray.forEach((col, i) => {
                if (tCompObj.SEQ === col.SEQ) {
                    wArray.push(col);
                    wArray.push(tObj);
                } else {
                    wArray.push(col);
                }
            });
        } else {
            tObjArray.push(tObj);
            wArray = [...tObjArray];
        }

        console.log("Add Material(2)=>" + wArray.length);

        var tAddArray = wArray.map((col, i) => {
            var tObj = { ...col };
            tObj.SEQ = i + 1;
            return tObj;
        });

        setDatasTBL_KSV_PROD_MEM(tAddArray);

        saveEDT_KSV_PROD_MEM_INSERT(tAddArray);

        setSelectedTBL_KCD_MATL_MST([]);
    };

    const updateMaterial = () => {
        var tRetArray = datasTBL_KSV_PROD_MEM.map((el, i) => {
            // var tRetArray = selectedTBL_KSV_PROD_MEM.forEach((el, i) =>  {
            var tObj = { ...el };
            tObj.DL_FLAG = selectedTBL_KCD_STYLE[0].DL;
            tObj.SEQ = parseInt(tObj.SEQ);
            return tObj;
        });

        saveEDT_KSV_PROD_MEM_INSERT(tRetArray);
    };

    const deleteMaterial = () => {
        var tRetArray = [];

        var tObjArray = [...datasTBL_KSV_PROD_MEM];

        var tIdx = 0;
        for (tIdx = 0; tIdx < tObjArray.length; tIdx++) {
            var tOne = { ...tObjArray[tIdx] };
            var tIdx1 = 0;
            var tFlag = 0;
            for (tIdx1 = 0; tIdx1 < selectedTBL_KSV_PROD_MEM.length; tIdx1++) {
                var tOne1 = { ...selectedTBL_KSV_PROD_MEM[tIdx1] };
                if (tOne.MATL_CD === tOne1.MATL_CD && tOne.SEQ === tOne1.SEQ) {
                    tFlag = 1;
                    break;
                }
            }
            if (tFlag === 0) tRetArray.push(tOne);
        }

        var tAddArray = tRetArray.map((col, i) => {
            var tObj = { ...col };
            tObj.SEQ = i + 1;
            return tObj;
        });

        setSelectedTBL_KSV_PROD_MEM([]);
        setDatasTBL_KSV_PROD_MEM(tAddArray);
        saveEDT_KSV_PROD_MEM_INSERT(tAddArray);
        setSelectedTBL_KCD_MATL_MST([]);
    };

    const onRowClick1TBL_KCD_MATL_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KCD_MATL_MST = argData;

        setDataTBL_KCD_MATL_MST(argTBL_KCD_MATL_MST);
    };

    const onRowClickTBL_KCD_MATL_MST = (event) => {
        let argTBL_KCD_MATL_MST = event.data;
        if (flagSelectModeTBL_KCD_MATL_MST) return;

        // Service : NawooAll:mgrQueryTBL_KCD_MATL_MST
    };

    const resetTBL_KCD_MATL_MST = () => {
        setDataQRY_KCD_MATL_MST(emptyQRY_KCD_MATL_MST);
    };

    const searchTBL_KCD_MATL_MST = () => {
        var tInObj0 = { ...datasTBL_KCD_MATL_MST[0] };

        var tInObj = {};
        tInObj.MATL_NAME = tInObj0.MATL_NAME;
        tInObj.COLOR = tInObj0.COLOR;
        tInObj.MATL_CD = tInObj0.MATL_CD;
        tInObj.SPEC = tInObj0.SPEC;
        tInObj.VENDOR_NAME = tInObj0.VENDOR_NAME;

        clearSelectedTBL_KCD_MATL_MST();
        var tObj1 = { ...dataQRY_KCD_MATL_MST };

        serviceS0303_MRP_RECORD_STYLE
            .mgrQueryTBL_KCD_MATL_MST(tInObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQueryTBL_KCD_MATL_MST() call => " + data.length,
                    );
                    var tArray = [];
                    tInObj0.id = 1;
                    tArray.push(tInObj0);
                    data.forEach((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 2;
                        tArray.push(tObj);
                    });
                    setDatasTBL_KCD_MATL_MST(tArray);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "mgrQueryTBL_KCD_MATL_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const clearSelectedTBL_KCD_MATL_MST = () => {
        setSelectedTBL_KCD_MATL_MST([]);
        setFlagSelectModeTBL_KCD_MATL_MST(false);
    };

    const onCellEditCompleteTBL_KCD_MATL_MST = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        let _rowData = { ...rowData };

        if (_rowData[`id`] !== 1) return;

        console.log("field:" + field + "," + newValue + "," + _rowData[`id`]);

        _rowData[field] = newValue;

        var tSeq = _rowData[`MATL_CD`];
        var tData = [...datasTBL_KCD_MATL_MST];
        var tNewData = [];
        tData.forEach((col, i) => {
            var tObj = {};
            if (i === 0) {
                tObj = { ...emptyTBL_KCD_MATL_MST };
                tObj.id = 1;
                tObj.MATL_CD = _rowData.MATL_CD;
                tObj.MATL_NAME = _rowData.MATL_NAME;
                tObj.COLOR = _rowData.COLOR;
                tObj.SPEC = _rowData.SPEC;
                tObj.VENDOR_NAME = _rowData.VENDOR_NAME;
            } else {
                tObj = { ...col };
            }
            tNewData.push(tObj);
        });
        // console.log(tNewData);
        setDatasTBL_KCD_MATL_MST(tNewData);
        var tArray0 = [];
        tArray0.push(tNewData[0]);
        setFrozenTBL_KCD_MATL_MST(tArray0);
    };

    const cellEditorTBL_KCD_MATL_MST = (options) => {
        return textEditor(options);
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

    /**TABLE KSV_PROD_MEM */

    // DEFINE DATAGRID : TBL_KSV_PROD_MEM
    const [loadingTBL_KSV_PROD_MEM, setLoadingTBL_KSV_PROD_MEM] =
        useState(false);

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
    const onCellEditCompleteTBL_KSV_PROD_MEM = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;
        console.log("field:" + field + "," + newValue);

        let _rowData = { ...rowData };

        _rowData[field] = newValue;

        if (
            field === "USE_SIZE" ||
            field === "COUNTRY" ||
            field === "ADD_LOSS" ||
            field === "REMARK"
        ) {
        }

        if (field === "STD_NET" || field === "STD_LOSS") {
            var tStdLoss = 0.0;
            var tStdNet = 0.0;
            var tAddLoss = parseFloat(_rowData["ADD_LOSS"]);

            if (field === "STD_NET") {
                tStdNet = parseFloat(_rowData[field]);
                tStdLoss = parseFloat(_rowData["STD_LOSS"]);
            }
            if (field === "STD_LOSS") {
                tStdNet = parseFloat(_rowData["STD_NET"]);
                tStdLoss = parseFloat(_rowData[field]);
            }

            _rowData["STD_GROSS"] = String(
                tStdNet + tStdNet * (tStdLoss + tAddLoss) * 0.01,
            );

            console.log(
                "std_net/std_loss:" +
                    tStdNet +
                    "," +
                    tStdLoss +
                    "," +
                    tAddLoss +
                    rowData["STD_GROSS"],
            );
        }

        if (field === "NET" || field === "LOSS") {
            var tStdLoss = 0.0;
            var tStdNet = 0.0;
            var tAddLoss = parseFloat(_rowData["ADD_LOSS"]);

            if (field === "NET") {
                tStdNet = parseFloat(_rowData[field]);
                tStdLoss = parseFloat(_rowData["LOSS"]);
            }
            if (field === "LOSS") {
                tStdNet = parseFloat(_rowData["NET"]);
                tStdLoss = parseFloat(_rowData[field]);
            }

            _rowData["GROSS"] = String(
                tStdNet + tStdNet * (tStdLoss + tAddLoss) * 0.01,
            );
        }

        var tSeq = _rowData["SEQ"];

        console.log(_rowData);

        var tData = [...datasTBL_KSV_PROD_MEM];
        var tNewData = tData.map((col, i) => {
            var tObj = {};
            if (tSeq === col.SEQ) {
                tObj = { ..._rowData };
            } else {
                tObj = { ...col };
            }
            return tObj;
        });

        setDatasTBL_KSV_PROD_MEM(tNewData);
    };

    const cellEditorTBL_KSV_PROD_MEM = (options) => {
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

        // Service : NawooAll:mgrQueryTBL_KSV_PROD_MEM
    };

    /**TABLE KSV_PROD_MST */
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

    // DATAGRID CODE : TBL_KSV_PROD_MST

    const onRowClick1TBL_KSV_PROD_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PROD_MST = argData;

        setDataTBL_KSV_PROD_MST(argTBL_KSV_PROD_MST);

        var tObj0 = { ...dataQRY_KCD_STYLE };

        var tObj = {};
        tObj.ORDER_CD = tObj0.ORDER_CD;
        tObj.PROD_CD = argData.PROD_CD;
        tObj.DL_FLAG = "";

        serviceS0307_MRP_RECORD_STYLE
            .mgrQuery_SEARCH_PROD_MEM(tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQueryTBL_KSV_PROD_MEM() call => " + data.length,
                    );
                    setDatasTBL_KSV_PROD_MEM(data);

                    var tQry = { ...dataQRY_KCD_STYLE };
                    tQry.PROD_CD = data[0].PROD_CD;
                    tQry.ORDER_MRP_SEQ = data[0].ORDER_MRP_SEQ;
                    tQry.COLOR = argData.COLOR;
                    setDataQRY_KCD_STYLE(tQry);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "mgrQueryTBL_KSV_PROD_MEM()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const onRowClickTBL_KSV_PROD_MST = (event) => {
        let argTBL_KSV_PROD_MST = event.data;
        if (flagSelectModeTBL_KSV_PROD_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PROD_MST
    };

    const onCellEditCompleteTBL_KSV_PROD_MST = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;
        console.log("field:" + field + "," + newValue);

        let _rowData = { ...rowData };

        _rowData[field] = newValue;
        var tSeq = _rowData[`COLOR`];

        var tData = [...datasTBL_KSV_PROD_MST];
        var tNewData = tData.map((col, i) => {
            var tObj = {};
            if (tSeq === col.COLOR) {
                tObj = { ..._rowData };
            } else {
                tObj = { ...col };
            }
            return tObj;
        });
        setDatasTBL_KSV_PROD_MST(tNewData);
    };

    const cellEditorTBL_KSV_PROD_MST = (options) => {
        return textEditor(options);
    };

    /**EDIT KSV_PROD_MEM */
    const [datasEDT_KSV_PROD_MEM, setDatasEDT_KSV_PROD_MEM] = useState([]);
    const [dataEDT_KSV_PROD_MEM, setDataEDT_KSV_PROD_MEM] = useState(
        emptyEDT_KSV_PROD_MEM,
    );

    const saveEDT_KSV_PROD_MEM_INSERT = (argData) => {
        let _datasEDT_KSV_PROD_MEM = [...argData];

        let _insertObj = _datasEDT_KSV_PROD_MEM.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            return tObj;
        });

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0303_MRP_RECORD_STYLE
            .mgrInsertEDT_KSV_PROD_MEM(_insertObj)
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceS0307_MRP_RECORD_STYLE.mgrInsertEDT_KSV_PROD_MEM() call => " +
                            data.length,
                    );
                    // Search
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0307_MRP_RECORD_STYLE( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const onCheckboxChangeEDT_KSV_PROD_MEM_STD_FLAG = (e, name) => {
        let val = "";
        let _dataEDT_KSV_PROD_MEM = { ...dataEDT_KSV_PROD_MEM };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_PROD_MEM[`${name}`] = val;
        setDataEDT_KSV_PROD_MEM(_dataEDT_KSV_PROD_MEM);
    };

    const onInputChangeEDT_KSV_PROD_MEM_NET = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PROD_MEM = { ...dataEDT_KSV_PROD_MEM };

        let tTypeVal = _dataEDT_KSV_PROD_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PROD_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PROD_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_PROD_MEM(_dataEDT_KSV_PROD_MEM);
    };

    const onInputChangeEDT_KSV_PROD_MEM_LOSS = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PROD_MEM = { ...dataEDT_KSV_PROD_MEM };

        let tTypeVal = _dataEDT_KSV_PROD_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PROD_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PROD_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_PROD_MEM(_dataEDT_KSV_PROD_MEM);
    };

    const onInputChangeEDT_KSV_PROD_MEM_USE_SIZE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PROD_MEM = { ...dataEDT_KSV_PROD_MEM };

        let tTypeVal = _dataEDT_KSV_PROD_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PROD_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PROD_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_PROD_MEM(_dataEDT_KSV_PROD_MEM);
    };

    const onInputChangeEDT_KSV_PROD_MEM_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PROD_MEM = { ...dataEDT_KSV_PROD_MEM };

        let tTypeVal = _dataEDT_KSV_PROD_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PROD_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PROD_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_PROD_MEM(_dataEDT_KSV_PROD_MEM);
    };

    ///////

    useEffect(() => {
        // search_KCD_STYLE();

        var tArray = [];
        var tObj0 = { ...emptyTBL_KCD_MATL_MST };
        tObj0.id = 1;
        tArray.push(tObj0);

        setDatasTBL_KCD_MATL_MST(tArray);
        setFrozenTBL_KCD_MATL_MST(tArray);
    }, []);

    // Support Area

    const changeCheckBoxVal = (argVal) => {
        if (argVal === "1") return true;
        else return false;
    };

    const blankFn = () => {};

    return (
        <div className="af-div-main">
            {/* 1단   */}
            <div
                className="af-div-first"
                style={{ width: "61rem", height: "22rem" }}
            >
                <div
                    className="af-div-first"
                    style={{ width: "61rem", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Order#</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                style={{ width: "10rem" }}
                                id="id_MATL_NAME"
                                value={dataQRY_KCD_STYLE.ORDER_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KCD_STYLE_ORDER_CD(
                                        e,
                                        "ORDER_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "8rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "7rem" }}
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
                                style={{ width: "7rem" }}
                                className="p-button-text"
                                onClick={search_ORDER_LIST}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>PO#</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                style={{ width: "10rem" }}
                                id="id_MATL_NAME"
                                value={dataQRY_KCD_STYLE.PO_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KCD_STYLE_PO_CD(e, "PO_CD")
                                }
                            />
                        </div>
                    </span>
                </div>

                <div
                    className="af-div-first"
                    style={{ width: "30rem", height: "18rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "29rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>Style</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <InputText
                                style={{ width: "20rem" }}
                                id="id_MATL_NAME"
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

                    <span className="af-span-3" style={{ width: "29rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>Color</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <InputText
                                style={{ width: "20rem" }}
                                id="id_MATL_NAME"
                                value={dataQRY_KCD_STYLE.COLOR}
                                onChange={(e) =>
                                    onInputChangeQRY_KCD_STYLE_COLOR(e, "COLOR")
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "29rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>Prod#</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                style={{ width: "10rem" }}
                                id="id_MATL_NAME"
                                value={dataQRY_KCD_STYLE.PROD_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KCD_STYLE_PROD_CD(
                                        e,
                                        "PROD_CD",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "29rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>Order Mrp#</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                style={{ width: "10rem" }}
                                id="id_MATL_NAME"
                                value={dataQRY_KCD_STYLE.ORDER_MRP_SEQ}
                                onChange={(e) =>
                                    onInputChangeQRY_KCD_STYLE_ORDER_MRP_SEQ(
                                        e,
                                        "ORDER_MRP_SEQ",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "12rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "11rem" }}
                        >
                            <Button
                                label="Check"
                                style={{ width: "11rem" }}
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "12rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "11rem" }}
                        >
                            <Button
                                label="Del Last Seq"
                                style={{ width: "11rem" }}
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </div>
                    </span>
                </div>
                <div
                    className="af-div-second"
                    style={{ width: "30rem", height: "18rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_PROD_MST}
                        size="small"
                        value={datasTBL_KSV_PROD_MST}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_PROD_MST}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_PROD_MST(true);
                            setSelectedTBL_KSV_PROD_MST(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_PROD_MST.length,
                            );
                            onRowClick1TBL_KSV_PROD_MST(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_PROD_MST}
                        dataKey="PROD_CD"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" " //header={headerTBL_KSV_PROD_MST}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="18rem"
                    >
                        <AFColumn field="COLOR" headerClassName="t-header" header="COLOR" style={{ width: "12rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="SIZE_LOSS" headerClassName="t-header" header="SL" style={{ width: "3rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditorTBL_KSV_PROD_MST(options) } onCellEditComplete={ onCellEditCompleteTBL_KSV_PROD_MST } ></AFColumn>
                        <AFColumn field="UPD_USER" headerClassName="t-header" header="Upd User" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="UPD_DATETIME" headerClassName="t-header" header="Upd User" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    </AFDataTable>
                </div>
            </div>

            <div
                className="af-div-second"
                style={{ width: "62.5rem", height: "22rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KCD_MATL_MST}
                    size="small"
                    value={datasTBL_KCD_MATL_MST}
                    tableStyle={{ tableLayout: "fixed" }}
                    frozenValue={frozenTBL_KCD_MATL_MST}
                    resizableColumns
                    columnResizeMode="expand"
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="multiple"
                    selection={selectedTBL_KCD_MATL_MST}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KCD_MATL_MST(true);
                        setSelectedTBL_KCD_MATL_MST(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KCD_MATL_MST.length,
                        );
                        onRowClick1TBL_KCD_MATL_MST(e.value);
                    }}
                    onRowClick={onRowClickTBL_KCD_MATL_MST}
                    dataKey="MATL_CD"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 9 }}
                    emptyMessage=" "
                    //header={headerTBL_KCD_MATL_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="22rem"
                >
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditorTBL_KCD_MATL_MST(options) } onCellEditComplete={onCellEditCompleteTBL_KCD_MATL_MST} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Matl Name" style={{ width: "13rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditorTBL_KCD_MATL_MST(options) } onCellEditComplete={onCellEditCompleteTBL_KCD_MATL_MST} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "12rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditorTBL_KCD_MATL_MST(options) } onCellEditComplete={onCellEditCompleteTBL_KCD_MATL_MST} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "13rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditorTBL_KCD_MATL_MST(options) } onCellEditComplete={onCellEditCompleteTBL_KCD_MATL_MST} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditorTBL_KCD_MATL_MST(options) } onCellEditComplete={onCellEditCompleteTBL_KCD_MATL_MST} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Vendor" style={{ width: "11rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditorTBL_KCD_MATL_MST(options) } onCellEditComplete={onCellEditCompleteTBL_KCD_MATL_MST} ></AFColumn>
                </AFDataTable>
            </div>

            {/* 1단   */}

            {/* 2단   */}
            <div
                className="af-div-first"
                style={{ width: "20rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "9.5rem" }}>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Button
                            label="Copy Prod"
                            style={{ width: "8rem", color: "#ffbb7a" }}
                            className="p-button-text"
                            onClick={popup_COPY_PRODUCT}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "9rem" }}>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Button
                            label="Style Srch"
                            style={{ width: "8rem" }}
                            className="p-button-text orange"
                            onClick={popup_STYLE_SEARCH}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "19rem" }}>
                    <div className="af-span-div" style={{ width: "18rem" }}>
                        <Button
                            label="Mrp by Order Srch"
                            style={{ width: "18rem", color: "#ffbb7a" }}
                            className="p-button-text"
                            onClick={popup_MRP_BY_ORDER_SRCH}
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-second"
                style={{ width: "28rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "13.5rem" }}>
                    <div className="af-span-div" style={{ width: "13rem" }}>
                        <Button
                            label="Net/Lose Update"
                            style={{ width: "13rem" }}
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Button
                            label="Loss(S)->Loss"
                            style={{ width: "12rem" }}
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "4.5rem" }}>
                    <div className="af-span-div" style={{ width: "4rem" }}>
                        <Button
                            label="D/L"
                            style={{ width: "4rem" }}
                            className="p-button-text"
                            onClick={blankFn}
                        ></Button>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "4.5rem" }}>
                    <div className="af-span-div" style={{ width: "4rem" }}>
                        <Button
                            label="Z/L"
                            style={{ width: "4rem" }}
                            className="p-button-text"
                            onClick={blankFn}
                        ></Button>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "3.5rem" }}>
                    <div className="af-span-div" style={{ width: "3rem" }}>
                        <Button
                            label="X"
                            style={{ width: "3rem" }}
                            className="p-button-text"
                            onClick={blankFn}
                        ></Button>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Button
                            label="Change Loss(Sel)"
                            style={{ width: "12rem" }}
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-second"
                style={{ width: "30rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "8rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Standard</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_STD_FLAG"
                            checked={changeCheckBoxVal(
                                dataEDT_KSV_PROD_MEM.STD_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeEDT_KSV_PROD_MEM_STD_FLAG(
                                    e,
                                    "STD_FLAG",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "9rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>NET</p>
                    <div className="af-span-div" style={{ width: "4rem" }}>
                        <InputText
                            style={{ width: "4rem" }}
                            id="id_NET"
                            value={dataEDT_KSV_PROD_MEM.NET}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PROD_MEM_NET(e, "NET")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>SIZE</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <InputText
                            style={{ width: "6rem" }}
                            id="id_USE_SIZE"
                            value={dataEDT_KSV_PROD_MEM.USE_SIZE}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PROD_MEM_USE_SIZE(
                                    e,
                                    "USE_SIZE",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "8rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>All M</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_STD_FLAG"
                            checked={changeCheckBoxVal(
                                dataEDT_KSV_PROD_MEM.STD_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeEDT_KSV_PROD_MEM_STD_FLAG(
                                    e,
                                    "STD_FLAG",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "9rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>LOSS</p>
                    <div className="af-span-div" style={{ width: "4rem" }}>
                        <InputText
                            style={{ width: "4rem" }}
                            id="id_LOSS"
                            value={dataEDT_KSV_PROD_MEM.LOSS}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PROD_MEM_LOSS(e, "LOSS")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Usage</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <InputText
                            style={{ width: "6rem" }}
                            id="id_REMARK"
                            value={dataEDT_KSV_PROD_MEM.REMARK}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PROD_MEM_REMARK(
                                    e,
                                    "REMARK",
                                )
                            }
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-second"
                style={{ width: "28rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Matl Add"
                            className="p-button-text"
                            onClick={addMaterial}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Matl Update"
                            className="p-button-text"
                            onClick={updateMaterial}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "6rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>All Color</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_STD_FLAG"
                            checked={changeCheckBoxVal(
                                dataEDT_KSV_PROD_MEM.STD_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeEDT_KSV_PROD_MEM_STD_FLAG(
                                    e,
                                    "STD_FLAG",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "10rem" }}>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Matl Change"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "10rem" }}>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Matl Delete"
                            className="p-button-text"
                            onClick={deleteMaterial}
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-second"
                style={{ width: "16rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "6rem" }}>
                    <div className="af-span-div" style={{ width: "5rem" }}>
                        <Button
                            label="P.Srch"
                            style={{ width: "5rem" }}
                            className="p-button-text"
                            onClick={searchTBL_KCD_MATL_MST}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "8rem" }}>
                    <div className="af-span-div" style={{ width: "7rem" }}>
                        <Button
                            label="M.Srch"
                            style={{ width: "7rem" }}
                            className="p-button-text"
                            onClick={searchTBL_KCD_MATL_MST}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "6rem" }}>
                    <div className="af-span-div" style={{ width: "5rem" }}>
                        <Button
                            label="Reset"
                            style={{ width: "5rem" }}
                            className="p-button-text"
                            onClick={resetTBL_KCD_MATL_MST}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "8rem" }}>
                    <div className="af-span-div" style={{ width: "7rem" }}>
                        <Button
                            style={{ width: "7rem" }}
                            label="Add Seq"
                            className="p-button-text orange"
                            onClick={popup_ADD_SEQ}
                        />
                    </div>
                </span>
            </div>
            {/* 2단   */}

            {/* 3단   */}
            <div
                className="af-div-first"
                style={{ width: "120.5rem", height: "30rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PROD_MEM}
                    size="small"
                    value={datasTBL_KSV_PROD_MEM}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    loading={loadingTBL_KSV_PROD_MEM}
                    metaKeySelection={false}
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
                    dataKey="SEQ"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PROD_MEM}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="30rem"
                >
                    <AFColumn field="MRP_CHECK" headerClassName="t-header" header="C" style={{ width: "4rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_TYPE2" headerClassName="t-header" header="M.Type2" style={{ width: "4rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="MATL NAME" style={{ width: "13rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="MATL CD" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="COLOR" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="SPEC" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName="t-header" header="M.P" style={{ width: "4rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "4rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="UNIT" style={{ width: "4rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ADD_LOSS" headerClassName="t-header" header="ADDx" style={{ width: "4rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditorTBL_KSV_PROD_MEM(options) } onCellEditComplete={onCellEditCompleteTBL_KSV_PROD_MEM} ></AFColumn>
                    <AFColumn field="USE_SIZE" headerClassName="t-header" header="USE SIZE" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditorTBL_KSV_PROD_MEM(options) } onCellEditComplete={onCellEditCompleteTBL_KSV_PROD_MEM} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Usage" style={{ width: "13rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditorTBL_KSV_PROD_MEM(options) } onCellEditComplete={onCellEditCompleteTBL_KSV_PROD_MEM} ></AFColumn>

                    <AFColumn field="COUNTRY" headerClassName="t-header" header="Nat" style={{ width: "4rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STD_NET" headerClassName="t-header" header="Net(S)" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditorTBL_KSV_PROD_MEM(options) } onCellEditComplete={onCellEditCompleteTBL_KSV_PROD_MEM} ></AFColumn>
                    <AFColumn field="STD_LOSS" headerClassName="t-header" header="Loss(S)" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditorTBL_KSV_PROD_MEM(options) } onCellEditComplete={onCellEditCompleteTBL_KSV_PROD_MEM} ></AFColumn>
                    <AFColumn field="NET" headerClassName="t-header" header="NET" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditorTBL_KSV_PROD_MEM(options) } onCellEditComplete={onCellEditCompleteTBL_KSV_PROD_MEM} ></AFColumn>
                    <AFColumn field="LOSS" headerClassName="t-header" header="LOSS" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditorTBL_KSV_PROD_MEM(options) } onCellEditComplete={onCellEditCompleteTBL_KSV_PROD_MEM} ></AFColumn>
                    <AFColumn field="GROSS" headerClassName="t-header" header="GROSS" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="VENDOR NAME" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-second"
                style={{ width: "3rem", height: "30rem" }}
            >
                <span className="af-span-3-0" style={{ width: "3rem" }}>
                    <div className="af-span-div" style={{ width: "2rem" }}>
                        <Button
                            icon="pi pi-arrow-up"
                            rounded
                            outlined
                            style={{ width: "2rem" }}
                            onClick={process_MOVE_UP}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "3rem" }}>
                    <div className="af-span-div" style={{ width: "2rem" }}>
                        <Button
                            icon="pi pi-arrow-down"
                            rounded
                            outlined
                            style={{ width: "2rem" }}
                            onClick={process_MOVE_DOWN}
                        />
                    </div>
                </span>
            </div>

            <Toast ref={toast} />

            <Dialog
                visible={createDialog}
                position="mid-center"
                style={{ width: "122rem", height: "61rem" }}
                header=""
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <iframe
                    src={urlIframe}
                    width="1400px"
                    height="1000px"
                    id="id1"
                    className="myClassname"
                    scrolling="yes"
                />
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0307_MRP_RECORD_STYLE, comparisonFn);
