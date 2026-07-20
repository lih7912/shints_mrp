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
import { Card } from "primereact/card";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0508_PRODUCTION_COMPLETE } from "../service/service_biz/ServiceS0508_PRODUCTION_COMPLETE";

// import './page_common.scss';

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_CAPABOOK_MEM = {
    BOOK_DATE: "",
    USER_NAME: "",
    NEW_DATE: "",
    PO_CD: "",
    IS_SAMPLE: "",
    FACTORY_CD: "",
};

const emptyTBL_KSV_CAPABOOK_MEM = {
    id: 0,
    JOB_CD: "",
    IN_DATE: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    PO_CD: "",
    ORDER_CD: "",
    STYLE_NAME: "",
    STYLE_CD: "",
    NR: "",
    QTY: "",
    MW: "",
    SHIP_DATE: "",
    S_ETA: "",
    M_ETA: "",
    SD: "",
    FOB: "",
    EXP_CMPT: "",
    NEGO_TYPE: "",
    EMBRO: "",
    TP: "",
    SP: "",
    LTHR: "",
    G: "",
    W: "",
    S: "",
    FND: "",
    DL: "",
    TPR: "",
    EMBOSSING: "",
    WASHING: "",
    DOWN: "",
    CUT: "",
    FTP: "",
    DTP: "",
    LAZE: "",
    BVT_KIND: "",
    SEQ: "",
    REMARK: "",
};

const emptyTBL_KSV_CAPABOOK_MEM1 = {
    id: 0,
    IN_DATE: "",
    STYLE_CD: "",
    STYLE_NAME: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    SHIP_DATE: "",
    JOB_CD: "",
    PO_CD: "",
    ORDER_CD: "",
    FOB: "",
    QTY: "",
    NR: "",
    REMARK: "",
    MW: "",
    SHIP_ETA: "",
    SAMPLE_ETA: "",
    MATL_ETA: "",
    S_ETA: "",
    M_ETA: "",
    SD: "",
    EXP_CMPT: "",
    NEGO_TYPE: "",
    EMBRO: "",
    TP: "",
    SP: "",
    LTHR: "",
    G: "",
    W: "",
    S: "",
    FND: "",
    DL: "",
    TPR: "",
    EMBOSSING: "",
    WASHING: "",
    DOWN: "",
    CUT: "",
    FTP: "",
    DTP: "",
    LAZE: "",
    BVT_KIND: "",
    SEQ: "",
};

const emptyEDT_KSV_CAPABOOK_MEM = {
    IN_DATE: "",
    STYLE_CD: "",
    STYLE_NAME: "",
    BUYER_CD: "",
    BUYER_CD: "",
    JOB_CD: "",
    PO_CD: "",
    ORDER_CD: "",
    FOB: "",
    QTY: "",
    NR: "",
    REMARK: "",
    MW: "",
    S_ETA: "",
    S_ETA: "",
    M_ETA: "",
    EXP_CMPT: "",
    BVT_KIND: "",
    TPR: "",
    EMBOSSING: "",
    WASHING: "",
    DL: "",
    S: "",
    FND: "",
    DOWN: "",
    CUT: "",
    EMBRO: "",
    TP: "",
    SP: "",
    LTHR: "",
    G: "",
    W: "",
    FTP: "",
    DTP: "",
    SD: "",
    NEGO_TYPE: "",
    LAZE: "",
    SEQ: "",
};

const S0508_PRODUCTION_COMPLETE = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0508_PRODUCTION_COMPLETE =
        new ServiceS0508_PRODUCTION_COMPLETE();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /*QRY KSV_CAPABOOK_MEM */

    const [dataQRY_KSV_CAPABOOK_MEM, setDataQRY_KSV_CAPABOOK_MEM] = useState(
        emptyQRY_KSV_CAPABOOK_MEM,
    );

    const onInputChangeQRY_KSV_CAPABOOK_MEM_BOOK_DATE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_CAPABOOK_MEM = { ...dataQRY_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataQRY_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_CAPABOOK_MEM(_dataQRY_KSV_CAPABOOK_MEM);
    };

    const onInputChangeQRY_KSV_CAPABOOK_MEM_USER_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_CAPABOOK_MEM = { ...dataQRY_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataQRY_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_CAPABOOK_MEM(_dataQRY_KSV_CAPABOOK_MEM);
    };

    const onCheckboxChangeQRY_KSV_CAPABOOK_MEM_IS_SAMPLE = (e, name) => {
        let val = "";
        let _dataQRY_KSV_CAPABOOK_MEM = { ...dataQRY_KSV_CAPABOOK_MEM };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }

        setDataQRY_KSV_CAPABOOK_MEM([]);

        _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = val;

        _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE = "";
        _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE = "";

        if (val === "0" && dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD === "BVT") {
            _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE =
                dataCAPABOOK_DATE.NEW_DATE_BVT;
            _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE = dataCAPABOOK_DATE.NEW_DATE_BVT;
        }
        if (val === "1" && dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD === "BVT") {
            _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE =
                dataCAPABOOK_DATE.NEW_DATE_SAMPLE_BVT;
            _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE =
                dataCAPABOOK_DATE.NEW_DATE_SAMPLE_BVT;
        }
        if (val === "0" && dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD === "ETP") {
            _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE =
                dataCAPABOOK_DATE.NEW_DATE_ETP;
            _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE = dataCAPABOOK_DATE.NEW_DATE_ETP;
        }
        if (val === "1" && dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD === "ETP") {
            _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE =
                dataCAPABOOK_DATE.NEW_DATE_SAMPLE_ETP;
            _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE =
                dataCAPABOOK_DATE.NEW_DATE_SAMPLE_ETP;
        }

        setDataQRY_KSV_CAPABOOK_MEM(_dataQRY_KSV_CAPABOOK_MEM);
    };

    const [
        datasQRY_KSV_CAPABOOK_MEM_FACTORY_CD,
        setDatasQRY_KSV_CAPABOOK_MEM_FACTORY_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_CAPABOOK_MEM_FACTORY_CD,
        setDataQRY_KSV_CAPABOOK_MEM_FACTORY_CD,
    ] = useState({});

    const editQRY_KSV_CAPABOOK_MEM_FACTORY_CD = (argValue) => {
        let _dataQRY_KSV_CAPABOOK_MEM_FACTORY_CD =
            datasQRY_KSV_CAPABOOK_MEM_FACTORY_CD.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataQRY_KSV_CAPABOOK_MEM_FACTORY_CD(
            _dataQRY_KSV_CAPABOOK_MEM_FACTORY_CD[0],
        );
    };

    const onDropdownChangeQRY_KSV_CAPABOOK_MEM_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_CAPABOOK_MEM = { ...dataQRY_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataQRY_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_CAPABOOK_MEM([]);

        _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE = "";
        _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE = "";

        if (
            e.value.CD_CODE === "BVT" &&
            dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE === "0"
        ) {
            _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE =
                dataCAPABOOK_DATE.NEW_DATE_BVT;
            _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE = dataCAPABOOK_DATE.NEW_DATE_BVT;
        }
        if (
            e.value.CD_CODE === "BVT" &&
            dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE === "1"
        ) {
            _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE =
                dataCAPABOOK_DATE.NEW_DATE_SAMPLE_BVT;
            _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE =
                dataCAPABOOK_DATE.NEW_DATE_SAMPLE_BVT;
        }
        if (
            e.value.CD_CODE === "ETP" &&
            dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE === "0"
        ) {
            _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE =
                dataCAPABOOK_DATE.NEW_DATE_ETP;
            _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE = dataCAPABOOK_DATE.NEW_DATE_ETP;
        }
        if (
            e.value.CD_CODE === "ETP" &&
            dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE === "1"
        ) {
            _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE =
                dataCAPABOOK_DATE.NEW_DATE_SAMPLE_ETP;
            _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE = dataCAPABOOK_DATE.NEW_DATE_ETP;
        }

        setDataQRY_KSV_CAPABOOK_MEM(_dataQRY_KSV_CAPABOOK_MEM);
        setDataQRY_KSV_CAPABOOK_MEM_FACTORY_CD(e.value);
    };

    /*TABLE KSV_CAPABOOK_MEM */
    // DEFINE DATAGRID : TBL_KSV_CAPABOOK_MEM
    const [dataCAPABOOK_DATE, setDataCAPABOOK_DATE] = useState({});

    const [datasTBL_KSV_CAPABOOK_MEM, setDatasTBL_KSV_CAPABOOK_MEM] = useState(
        [],
    );
    const dt_TBL_KSV_CAPABOOK_MEM = useRef(null);
    const [dataTBL_KSV_CAPABOOK_MEM, setDataTBL_KSV_CAPABOOK_MEM] = useState(
        emptyTBL_KSV_CAPABOOK_MEM,
    );
    const [selectedTBL_KSV_CAPABOOK_MEM, setSelectedTBL_KSV_CAPABOOK_MEM] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_CAPABOOK_MEM,
        setFlagSelectModeTBL_KSV_CAPABOOK_MEM,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_CAPABOOK_MEM

    const onRowClickTBL_KSV_CAPABOOK_MEM = (event) => {};

    const searchTBL_KSV_CAPABOOK_MEM = () => {
        clearSelectedTBL_KSV_CAPABOOK_MEM();

        let _tQryObj = {};
        _tQryObj.FACTORY_CD = dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD; // FC034 : BVT, FC044 : ETP
        _tQryObj.IS_SAMPLE = dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE;
        _tQryObj.PO_CD = "";
        _tQryObj.BOOK_DATE = dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE;
        _tQryObj.NEW_DATE = dataQRY_KSV_CAPABOOK_MEM.NEW_DATE;
        _tQryObj.USER_NAME = "sales1";

        setDatasTBL_KSV_CAPABOOK_MEM([]);

        serviceS0508_PRODUCTION_COMPLETE
            .mgrQueryTBL_KSV_CAPABOOK_MEM(_tQryObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    var _tObj = { ...dataQRY_KSV_CAPABOOK_MEM };
                    _tObj.BOOK_DATE = _tQryObj.BOOK_DATE;
                    _tObj.NEW_DATE = _tQryObj.NEW_DATE;
                    _tObj.PO_CD = _tQryObj.PO_CD;
                    _tObj.USER_NAME = _tQryObj.USER_NAME;
                    setDataQRY_KSV_CAPABOOK_MEM(_tObj);

                    setDatasTBL_KSV_CAPABOOK_MEM(data);
                    console.log(
                        "serviceS0508_PRODUCTION_COMPLETE.mgrQueryTBL_KSV_CAPABOOK_MEM call(1) => " +
                            data.length,
                    );
                } else {
                    console.log(
                        "serviceS0508_PRODUCTION_COMPLETE.mgrQueryTBL_KSV_CAPABOOK_MEM error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KSV_CAPABOOK_MEM
    };

    const clearSelectedTBL_KSV_CAPABOOK_MEM = () => {
        setSelectedTBL_KSV_CAPABOOK_MEM([]);
        setFlagSelectModeTBL_KSV_CAPABOOK_MEM(false);
    };

    /**TABLE KSV_CAPABOOK_MEM1 */
    // DEFINE DATAGRID : TBL_KSV_CAPABOOK_MEM1
    const [datasTBL_KSV_CAPABOOK_MEM1, setDatasTBL_KSV_CAPABOOK_MEM1] =
        useState([]);
    const dt_TBL_KSV_CAPABOOK_MEM1 = useRef(null);
    const [dataTBL_KSV_CAPABOOK_MEM1, setDataTBL_KSV_CAPABOOK_MEM1] = useState(
        emptyTBL_KSV_CAPABOOK_MEM1,
    );
    const [selectedTBL_KSV_CAPABOOK_MEM1, setSelectedTBL_KSV_CAPABOOK_MEM1] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_CAPABOOK_MEM1,
        setFlagSelectModeTBL_KSV_CAPABOOK_MEM1,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_CAPABOOK_MEM1

    /**EDIT KSV_CAPABOOK_MEM */

    const [datasEDT_KSV_CAPABOOK_MEM, setDatasEDT_KSV_CAPABOOK_MEM] = useState(
        [],
    );
    const [dataEDT_KSV_CAPABOOK_MEM, setDataEDT_KSV_CAPABOOK_MEM] = useState(
        emptyEDT_KSV_CAPABOOK_MEM,
    );

    const endCAPA = () => {
        saveEDT_KSV_CAPABOOK_MEM_CAPA_END();
    };
    const endCancel = () => {
        saveEDT_KSV_CAPABOOK_MEM_CAPA_CANCEL();
    };

    const saveEDT_KSV_CAPABOOK_MEM_CAPA_END = () => {
        let tArray = [];
        let tObj = {};
        tObj.FACTORY_CD = dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD;
        tObj.IS_SAMPLE = dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE;
        tObj.BOOK_DATE = dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE;
        tObj.USER_NAME = "sales1";
        tArray.push(tObj);

        serviceS0508_PRODUCTION_COMPLETE
            .mgrUpdateCAPA_END(tArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceS0508_PRODUCTION_COMPLETE.mgrUpdateCAPA_END() call => " +
                            data.length +
                            "," +
                            data[0].CODE,
                    );

                    var _dataQRY_KSV_CAPABOOK_MEM = {
                        ...dataQRY_KSV_CAPABOOK_MEM,
                    };
                    _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE = data[0].CODE;
                    setDataQRY_KSV_CAPABOOK_MEM(_dataQRY_KSV_CAPABOOK_MEM);

                    var _tUserId = "sales1";

                    serviceS0508_PRODUCTION_COMPLETE
                        .mgrQueryCAPABOOK_DATE(_tUserId)
                        .then((data) => {
                            if (typeof data.graphQLErrors === "undefined") {
                                setDataCAPABOOK_DATE(data);
                                setDatasTBL_KSV_CAPABOOK_MEM([]);
                            } else {
                                console.log(
                                    "serviceS0508_PRODUCTION_COMPLETE.mgrQueryCAPABOOK_DATE error => " +
                                        JSON.stringify(data.graphQLErrors),
                                );
                            }
                        });

                    // searchTBL_KSV_CAPABOOK_MEM();
                    // Search
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrUpdateCAPA_END( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const saveEDT_KSV_CAPABOOK_MEM_CAPA_CANCEL = () => {
        let tArray = [];
        let tObj = {};
        tObj.FACTORY_CD = dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD;
        tObj.IS_SAMPLE = dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE;
        tObj.BOOK_DATE = dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE;
        tObj.USER_NAME = "sales1";
        tArray.push(tObj);

        serviceS0508_PRODUCTION_COMPLETE
            .mgrUpdateCAPA_END_CANCEL(tArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceS0508_PRODUCTION_COMPLETE.mgrUpdateCAPA_END() call => " +
                            data.length,
                    );
                    // Search
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrUpdateCAPA_END( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    // const onInputChangeEDT_KSV_CAPABOOK_MEM_BUYER_CD = (e, name) => {
    //     let val = (e.target && e.target.value) || '';

    //     let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

    //     let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
    //     if (typeof tTypeVal === "string") _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
    //     else if (typeof tTypeVal === "number") _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

    //     setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    // }

    const [datasEDT_KSV_CAPABOOK_MEM_NR, setDatasEDT_KSV_CAPABOOK_MEM_NR] =
        useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_NR, setDataEDT_KSV_CAPABOOK_MEM_NR] =
        useState({});

    // const onCalChangeEDT_KSV_CAPABOOK_MEM_S_ETA = (e, name) => {
    //     let val1 = e.value || '';
    //     let val = '';
    //     if (val1 === '') {
    //         val = '';
    //     } else {
    //         val = getDateVal(val1);
    //     }

    //     let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };
    //     _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
    //     setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);

    //  }

    const [
        datasEDT_KSV_CAPABOOK_MEM_BVT_KIND,
        setDatasEDT_KSV_CAPABOOK_MEM_BVT_KIND,
    ] = useState([]);
    const [
        dataEDT_KSV_CAPABOOK_MEM_BVT_KIND,
        setDataEDT_KSV_CAPABOOK_MEM_BVT_KIND,
    ] = useState({});

    useEffect(() => {
        let _tUserId = "sales1";

        var tFactoryCd = [" ", "BVT", "ETP"];
        var tObjArray = tFactoryCd.map((col, i) => {
            var tObj = {};
            tObj.id = i;
            tObj.CD_CODE = col;
            tObj.CD_NAME = col;
            tObj.CD_GROUP = "FACTORY";
            return tObj;
        });
        setDatasQRY_KSV_CAPABOOK_MEM_FACTORY_CD(tObjArray);
        setDataQRY_KSV_CAPABOOK_MEM_FACTORY_CD(tObjArray[1]);
        editQRY_KSV_CAPABOOK_MEM_FACTORY_CD("BVT");

        var tNRCd = [" ", "NEW", "ER", "VR"];
        var tObjArray1 = tNRCd.map((col, i) => {
            var tObj = {};
            tObj.id = i;
            if (col === "NEW") tObj.CD_NAME = "NEW";
            else if (col === "ER") tObj.CD_NAME = "REPEAT_ETP";
            else if (col === "VR") tObj.CD_NAME = "REPEAT_BVT";
            tObj.CD_CODE = col;
            tObj.CD_GROUP = "NR_TYPEY";
            return tObj;
        });
        setDatasEDT_KSV_CAPABOOK_MEM_NR(tObjArray1);
        setDataEDT_KSV_CAPABOOK_MEM_NR(tObjArray1[0]);

        serviceS0508_PRODUCTION_COMPLETE
            .mgrQueryCAPABOOK_DATE(_tUserId)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setDataCAPABOOK_DATE(data);
                    console.log(
                        "serviceS0508_PRODUCTION_COMPLETE.mgrQueryCAPABOOK_DATE call(1) => " +
                            data.BOOK_DATE_BVT,
                    );
                    console.log(data);

                    setDatasEDT_KSV_CAPABOOK_MEM_BVT_KIND(data.BVT_KIND);
                    setDataEDT_KSV_CAPABOOK_MEM_BVT_KIND(data.BVT_KIND[0]);

                    // const serviceMgrKCD_VENDOR = new ServiceMgrKCD_VENDOR();
                    let _tQryObj = {};
                    _tQryObj.FACTORY_CD = " "; // FC034 : BVT, FC044 : ETP
                    _tQryObj.IS_SAMPLE = "0";
                    _tQryObj.PO_CD = "";
                    _tQryObj.BOOK_DATE = "";
                    _tQryObj.NEW_DATE = "";
                    _tQryObj.USER_NAME = "sales1";
                    setDataQRY_KSV_CAPABOOK_MEM(_tQryObj);
                } else {
                    console.log(
                        "serviceS0508_PRODUCTION_COMPLETE.mgrQueryCAPABOOK_DATE error => " +
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

    return (
        <div>
            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "100rem",
                    height: "3rem",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "21rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Book Date</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "12rem",
                        }}
                        id="id_BOOK_DATE"
                        value={dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_CAPABOOK_MEM_BOOK_DATE(
                                e,
                                "BOOK_DATE",
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
                    <p style={{ width: "8rem", display: "inline-block" }}>User</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "12rem",
                        }}
                        id="id_USER_NAME"
                        value={dataQRY_KSV_CAPABOOK_MEM.USER_NAME}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_CAPABOOK_MEM_USER_NAME(
                                e,
                                "USER_NAME",
                            )
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "12rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Sample</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "2rem",
                        }}
                    >
                        <Checkbox
                            style={{ display: "inline-block", width: "2rem" }}
                            id="id_IS_SAMPLE"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_CAPABOOK_MEM_IS_SAMPLE(
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
                        width: "25rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Factory</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                    >
                        <Dropdown
                            id="id_FACTORY"
                            value={dataQRY_KSV_CAPABOOK_MEM_FACTORY_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_CAPABOOK_MEM_FACTORY_CD(
                                    e,
                                    "FACTORY_CD",
                                )
                            }
                            options={datasQRY_KSV_CAPABOOK_MEM_FACTORY_CD}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span style={{ display: "inline-block" }}>
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
                        icon="pi pi-search"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={searchTBL_KSV_CAPABOOK_MEM}
                    />
                </span>
            </div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "45rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_CAPABOOK_MEM}
                    size="small"
                    value={datasTBL_KSV_CAPABOOK_MEM}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_CAPABOOK_MEM}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_CAPABOOK_MEM(true);
                        setSelectedTBL_KSV_CAPABOOK_MEM(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_CAPABOOK_MEM.length,
                        );
                    }}
                    onRowClick={onRowClickTBL_KSV_CAPABOOK_MEM}
                    dataKey="ORDER_CD"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 21 }}
                    emptyMessage=" " //header={headerTBL_KSV_CAPABOOK_MEM}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="42rem"
                >
                    <AFColumn field="JOB_CD" headerClassName="t-header" header="Job" style={{ width: "3rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BOOK_DATE" headerClassName="t-header" header="Book Date" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="IN_DATE" headerClassName="t-header" header="In Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer Name" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer CD" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order#" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style Name" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STYLE_CD" headerClassName="t-header" header="Style CD" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="NR" headerClassName="t-header" header="N/R" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="QTY" headerClassName="t-header" header="Qty" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MW" headerClassName="t-header" header="M/W" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SHIP_DATE" headerClassName="t-header" header="Ship Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="S_ETA" headerClassName="t-header" header="S ETA" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="M_ETA" headerClassName="t-header" header="M ETA" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SD" headerClassName="t-header" header="S/D" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FOB" headerClassName="t-header" header="FOB" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="EXP_CMPT" headerClassName="t-header" header="Exp CMPT" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="NEGO_TYPE" headerClassName="t-header" header="Nego TYPE" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="EMBRO" headerClassName="t-header" header="EMBRO" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="TP" headerClassName="t-header" header="T/P" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SP" headerClassName="t-header" header="S/P" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="LTHR" headerClassName="t-header" header="LTHR" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="G" headerClassName="t-header" header="G" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="W" headerClassName="t-header" header="W" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="S" headerClassName="t-header" header="S" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FND" headerClassName="t-header" header="FND" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DL" headerClassName="t-header" header="DL" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="TPR" headerClassName="t-header" header="TPR" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="EMBOSSING" headerClassName="t-header" header="EMBOSSING" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="WASHING" headerClassName="t-header" header="WASHING" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DOWN" headerClassName="t-header" header="DOWN" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CUT" headerClassName="t-header" header="CUT" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FTP" headerClassName="t-header" header="FTP" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DTP" headerClassName="t-header" header="DTP" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="LAZE" headerClassName="t-header" header="LAZE" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BVT_KIND" headerClassName="t-header" header="BVT" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SEQ" headerClassName="t-header" header="SEQ" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
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
                            label="End"
                            className="p-button-text"
                            onClick={endCAPA}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="End Cancel"
                            className="p-button-text"
                            onClick={endCancel}
                        />

                        <Button
                            style={{ display: "inline-block", width: "20rem" }}
                            label="CAPABOOK List"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Reset"
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

export default React.memo(S0508_PRODUCTION_COMPLETE, comparisonFn);
