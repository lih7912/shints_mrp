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
import { Divider } from "primereact/divider";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { ScrollPanel } from "primereact/scrollpanel";
import { TabView, TabPanel } from "primereact/tabview";
import { Password } from "primereact/password";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0111_KCD_USER } from "../service/service_biz/ServiceS0111_KCD_USER";

const S0111_KCD_USER = () => {
    let emptyKCD_CODE = {
        id: 0,
        CD_GROUP: "",
        CD_CODE: "",
        CD_NAME: "",
        CD_FLAG: "",
    };

    const serviceLib = new ServiceLib();
    serviceLib.loginConfirm();
    const serviceS0111_KCD_USER = new ServiceS0111_KCD_USER();
    const [loading, setLoading] = useState(false);

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /*QRY KCD_USER */
    let emptyQRY_KCD_USER = {
        USER_CD: "",
        USER_NAME: "",
        FACTORY_CD: "",
        PART: "",
    };

    let emptyQRY_KCD_USERMENU = {
        USER_ID: "",
    };

    const [dataQRY_KCD_USER, setDataQRY_KCD_USER] = useState(emptyQRY_KCD_USER);
    const [dataQRY_KCD_USERMENU, setDataQRY_KCD_USERMENU] = useState(
        emptyQRY_KCD_USERMENU,
    );

    const onInputChangeQRY_KCD_USER_USER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_USER = { ...dataQRY_KCD_USER };

        let tTypeVal = _dataQRY_KCD_USER[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_USER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_USER[`${name}`] = parseInt(val);

        console.log(_dataQRY_KCD_USER);

        setDataQRY_KCD_USER(_dataQRY_KCD_USER);
    };

    const onInputChangeQRY_KCD_USER_PART = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_USER = { ...dataQRY_KCD_USER };

        let tTypeVal = _dataQRY_KCD_USER[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_USER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_USER[`${name}`] = parseInt(val);

        console.log(_dataQRY_KCD_USER);

        setDataQRY_KCD_USER(_dataQRY_KCD_USER);
    };

    const [datasQRY_KCD_USER_FACTORY_CD, setDatasQRY_KCD_USER_FACTORY_CD] =
        useState([]);
    const [dataQRY_KCD_USER_FACTORY_CD, setDataQRY_KCD_USER_FACTORY_CD] =
        useState({});

    const onDropdownChangeQRY_KCD_USER_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataQRY_KCD_USER = { ...dataQRY_KCD_USER };

        let tTypeVal = _dataQRY_KCD_USER[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KCD_USER[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KCD_USER[`${name}`] = parseInt(val);
        }

        console.log(_dataQRY_KCD_USER);

        setDataQRY_KCD_USER(_dataQRY_KCD_USER);
        setDataQRY_KCD_USER_FACTORY_CD(e.value);
    };

    /*TABLE KCD_USER */
    // DEFINE DATAGRID : TBL_KCD_USER
    let emptyTBL_KCD_USER = {
        id: 0,
        USER_ID: "",
        PASSWD: "",
        USER_NAME: "",
        FACTORY_NAME: "",
        FACTORY_CD: "",
        PART_NAME: "",
        PART: "",
        RANK_NAME: "",
        RANK: "",
        EMAIL: "",
        TEL_NO: "",
        CELLULAR: "",
        EMP_NO: "",
        BUYER_TEAM: "",
        USER_LEVEL: "",
        STATUS_NAME: "",
        STATUS_CD: "",
    };

    const [datasTBL_KCD_USER, setDatasTBL_KCD_USER] = useState([]);
    const dt_TBL_KCD_USER = useRef(null);
    const [dataTBL_KCD_USER, setDataTBL_KCD_USER] = useState(emptyTBL_KCD_USER);
    const [selectedTBL_KCD_USER, setSelectedTBL_KCD_USER] = useState([]);
    const [flagSelectModeTBL_KCD_USER, setFlagSelectModeTBL_KCD_USER] =
        useState(false);

    const [datasTBL_KCD_USER_BUYER, setDatasTBL_KCD_USER_BUYER] = useState([]);
    const dt_TBL_KCD_USER_BUYER = useRef(null);

    let emptyTBL_KCD_USERMENU = {
        id: 0,
        USER_ID: "",
        MENU_ID: "",
        MENU_NAME: "",
        AUTH_FLAG: "",
    };

    const [datasTBL_KCD_USERMENU, setDatasTBL_KCD_USERMENU] = useState([]);
    const dt_TBL_KCD_USERMENU = useRef(null);
    const [dataTBL_KCD_USERMENU, setDataTBL_KCD_USERMENU] = useState(
        emptyTBL_KCD_USERMENU,
    );
    const [selectedTBL_KCD_USERMENU, setSelectedTBL_KCD_USERMENU] = useState(
        [],
    );
    const [flagSelectModeTBL_KCD_USERMENU, setFlagSelectModeTBL_KCD_USERMENU] =
        useState(false);

    // DATAGRID CODE : TBL_KCD_USER

    const editTBL_KCD_USER = (argData) => {
        console.log(argData);

        datasetEDT_KCD_USER(argData);
    };

    const onRowClick1TBL_KCD_USER = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KCD_USER = argData;
        editTBL_KCD_USER(argTBL_KCD_USER);
        setDataTBL_KCD_USER(argTBL_KCD_USER);

        // Effect
        let _dataQRY_KCD_USERMENU = { ...dataQRY_KCD_USERMENU };
        _dataQRY_KCD_USERMENU.USER_ID = argData.USER_ID;

        serviceS0111_KCD_USER
            .mgrQueryTBL_KCD_USERMENU(_dataQRY_KCD_USERMENU)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceS0111_KCD_USER.mgrQueryTBL_KCD_USERMENU call => " +
                            data.length,
                    );
                    setDatasTBL_KCD_USERMENU(data);
                } else {
                    console.log(
                        "serviceS0111_KCD_USER.mgrQueryTBL_KCD_USERMENU error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        serviceS0111_KCD_USER
            .mgrQueryTBL_KCD_USER_BUYER(_dataQRY_KCD_USERMENU)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceS0111_KCD_USER.mgrQueryTBL_KCD_USER_BUYER call => " +
                            data.length,
                    );
                    setDatasTBL_KCD_USER_BUYER(data);
                } else {
                    console.log(
                        "serviceS0111_KCD_USER.mgrQueryTBL_KCD_USER_BUYER error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const onRowClickTBL_KCD_USER = (event) => {
        let argTBL_KCD_USER = event.data;
        if (flagSelectModeTBL_KCD_USER) return;

        // Service : NawooAll:mgrQueryTBL_KCD_USER
    };

    const searchTBL_KCD_USER = () => {
        clearSelectedTBL_KCD_USER();
        setLoading(true);

        serviceS0111_KCD_USER
            .mgrQueryTBL_KCD_USER(dataQRY_KCD_USER)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setLoading(false);
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_USER() call => " +
                            data.length,
                    );

                    console.log(data);
                    // USER_LEVEL이 2이면 "팀장"으로 변경
                    const updatedData = data.map((user) => ({
                        ...Object.fromEntries(
                            // 모든 속성에서 null을 ''로 변환
                            Object.entries(user).map(([key, value]) => [
                                key,
                                value === "null" ? "" : value,
                            ]),
                        ),
                        USER_LEVEL: user.USER_LEVEL === "2" ? "팀장" : "팀원",
                    }));

                    setDatasTBL_KCD_USER(updatedData);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_USER()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KCD_USER
    };

    const clearSelectedTBL_KCD_USER = () => {
        setSelectedTBL_KCD_USER([]);
        setFlagSelectModeTBL_KCD_USER(false);
    };

    const exportExcelTBL_KCD_USER = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasTBL_KCD_USER);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KCD_USER(excelBuffer, "사용자목록");
        });
    };

    const saveAsExcelFileTBL_KCD_USER = (buffer, fileName) => {
        import("file-saver").then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE =
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                let EXCEL_EXTENSION = ".xlsx";
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE,
                });
                module.default.saveAs(
                    data,
                    fileName +
                        "_export_" +
                        new Date().getTime() +
                        EXCEL_EXTENSION,
                );
            }
        });
    };

    /**EDIT KCD_USER */

    let emptyEDT_KCD_USER = {
        id: 0,
        USER_ID: "",
        PASSWD: "",
        USER_NAME: "",
        FACTORY_CD: "",
        PART: "",
        RANK: "",
        EMAIL: "",
        TEL_NO: "",
        CELLULAR: "",
        EMP_NO: "",
        BUYER_TEAM: "",
        USER_LEVEL: "",
        STATUS_CD: "",
    };

    const [datasEDT_KCD_USER, setDatasEDT_KCD_USER] = useState([]);
    const [dataEDT_KCD_USER, setDataEDT_KCD_USER] = useState(emptyEDT_KCD_USER);

    const datasetEDT_KCD_USER = (argData) => {
        var _argData = { ...dataEDT_KCD_USER };
        _argData.id = argData.id;
        _argData.USER_ID = argData.USER_ID;
        _argData.PASSWD = argData.PASSWD;
        _argData.USER_NAME = argData.USER_NAME;
        _argData.FACTORY_CD = argData.FACTORY_CD;
        _argData.PART = argData.PART;
        _argData.RANK = argData.RANK;
        _argData.EMAIL = argData.EMAIL;
        _argData.TEL_NO = argData.TEL_NO;
        _argData.CELLULAR = argData.CELLULAR;
        _argData.EMP_NO = argData.EMP_NO;
        _argData.BUYER_TEAM = argData.BUYER_TEAM;
        _argData.USER_LEVEL = argData.USER_LEVEL;
        _argData.STATUS_CD = argData.STATUS_CD;

        setDataEDT_KCD_USER(_argData);

        editEDT_KCD_USER_FACTORY_CD(_argData.FACTORY_CD);
        editEDT_KCD_USER_PART(_argData.PART);
        editEDT_KCD_USER_RANK(_argData.RANK);
        editEDT_KCD_USER_STATUS_CD(_argData.STATUS_CD);

        var tValue = "";
        if (_argData.USER_LEVEL === "팀원") tValue = "1";
        if (_argData.USER_LEVEL === "팀장") tValue = "2";
        editEDT_KCD_USER_LEVEL(tValue);
    };

    const resetEDT_KCD_USER = () => {
        setDataEDT_KCD_USER(emptyEDT_KCD_USER);
        datasetEDT_KCD_USER(emptyEDT_KCD_USER);

        // clearSelectedKCD_STYLE();
    };

    const saveEDT_KCD_USER = () => {
        console.log(dataEDT_KCD_USER);
        if (dataEDT_KCD_USER.id <= 0) {
            console.log("insert");
            saveEDT_KCD_USER_INSERT();
        } else {
            console.log("update");
            saveEDT_KCD_USER_UPDATE();
        }
    };

    const saveEDT_KCD_USER_INSERT = () => {
        let _datasEDT_KCD_USER = [...datasEDT_KCD_USER];
        let _dataEDT_KCD_USER = { ...dataEDT_KCD_USER };

        if (typeof _dataEDT_KCD_USER.__typename !== "undefined")
            delete _dataEDT_KCD_USER.__typename;

        let tArray = [];

        _dataEDT_KCD_USER.USER_LEVEL === "팀장"
            ? (_dataEDT_KCD_USER.USER_LEVEL = "2")
            : "1";
        _dataEDT_KCD_USER.BUYER_TEAM = _dataEDT_KCD_USER.BUYER_TEAM || "";
        _dataEDT_KCD_USER.CELLULAR = _dataEDT_KCD_USER.CELLULAR || "";
        _dataEDT_KCD_USER.EMP_NO = _dataEDT_KCD_USER.EMP_NO || "";

        tArray.push(_dataEDT_KCD_USER);
        console.log(_dataEDT_KCD_USER);

        serviceS0111_KCD_USER.mgrInsertEDT_KCD_USER(tArray).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceS0111_KCD_USER.mgrInsertEDT_KCD_USER() call => " +
                        data.length,
                );
                // Search
                serviceS0111_KCD_USER
                    .mgrQueryTBL_KCD_USER(dataQRY_KCD_USER)
                    .then((data) => {
                        if (typeof data.graphQLErrors === "undefined") {
                            console.log(
                                "ServiceS0111_KCD_USER.mgrQueryTBL_KCD_USER call => " +
                                    data.length,
                            );
                            setDatasTBL_KCD_USER(data);
                        } else {
                            console.log(
                                "serviceS0111_KCD_USER.mgrQueryTBL_KCD_USER error => " +
                                    JSON.stringify(data.graphQLErrors),
                            );
                        }
                    });
            } else {
                // var tStr = data.graphQLErrors[0].message;
                console.log(
                    "ServiceNawooAll.mgrInsertS0111_KCD_USER( error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const saveEDT_KCD_USER_UPDATE = () => {
        let _datasEDT_KCD_USER = [...datasEDT_KCD_USER];
        let _dataEDT_KCD_USER = { ...dataEDT_KCD_USER };

        if (typeof _dataEDT_KCD_USER.__typename !== "undefined")
            delete _dataEDT_KCD_USER.__typename;

        let tArray = [];

        _dataEDT_KCD_USER.USER_LEVEL === "팀장"
            ? (_dataEDT_KCD_USER.USER_LEVEL = "2")
            : "1";
        _dataEDT_KCD_USER.BUYER_TEAM = _dataEDT_KCD_USER.BUYER_TEAM || "";
        _dataEDT_KCD_USER.CELLULAR = _dataEDT_KCD_USER.CELLULAR || "";
        _dataEDT_KCD_USER.EMP_NO = _dataEDT_KCD_USER.EMP_NO || "";

        console.log(_dataEDT_KCD_USER);
        tArray.push(_dataEDT_KCD_USER);

        serviceS0111_KCD_USER.mgrUpdateEDT_KCD_USER(tArray).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceS0111_KCD_USER.mgrUpdateEDT_KCD_USER() call => " +
                        data.length,
                );
                getUserList();
                resetEDT_KCD_USER();
                // Search
            } else {
                // var tStr = data.graphQLErrors[0].message;
                console.log(
                    "ServiceNawooAll.mgrUpdateS0111_KCD_USER( error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const deleteEDT_KCD_USER = () => {
        let _datasEDT_KCD_USER = [...datasEDT_KCD_USER];
        let _dataEDT_KCD_USER = { ...dataEDT_KCD_USER };

        if (typeof _dataEDT_KCD_USER.__typename !== "undefined")
            delete _dataEDT_KCD_USER.__typename;

        let tArray = [];
        tArray.push(_dataEDT_KCD_USER);

        serviceS0111_KCD_USER.mgrDeleteEDT_KCD_USER(tArray).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceS0111_KCD_USER.mgrUpdateEDT_KCD_USER() call => " +
                        data.length,
                );
                getUserList();
                // Search
            } else {
                // var tStr = data.graphQLErrors[0].message;
                console.log(
                    "ServiceNawooAll.mgrUpdateS0111_KCD_USER( error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const onInputChangeEDT_KCD_USER_USER_ID = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_USER = { ...dataEDT_KCD_USER };

        let tTypeVal = _dataEDT_KCD_USER[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KCD_USER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_USER[`${name}`] = parseInt(val);

        setDataEDT_KCD_USER(_dataEDT_KCD_USER);
    };

    const onInputChangeEDT_KCD_USER_PASSWD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_USER = { ...dataEDT_KCD_USER };

        let tTypeVal = _dataEDT_KCD_USER[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KCD_USER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_USER[`${name}`] = parseInt(val);

        setDataEDT_KCD_USER(_dataEDT_KCD_USER);
    };

    const onInputChangeEDT_KCD_USER_USER_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_USER = { ...dataEDT_KCD_USER };

        let tTypeVal = _dataEDT_KCD_USER[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KCD_USER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_USER[`${name}`] = parseInt(val);

        setDataEDT_KCD_USER(_dataEDT_KCD_USER);
    };

    const [datasEDT_KCD_USER_FACTORY_CD, setDatasEDT_KCD_USER_FACTORY_CD] =
        useState([]);
    const [dataEDT_KCD_USER_FACTORY_CD, setDataEDT_KCD_USER_FACTORY_CD] =
        useState({});

    const editEDT_KCD_USER_FACTORY_CD = (argValue) => {
        let _dataEDT_KCD_USER_FACTORY_CD = datasEDT_KCD_USER_FACTORY_CD.filter(
            (val) => val.FACTORY_CD === argValue,
        );
        setDataEDT_KCD_USER_FACTORY_CD(_dataEDT_KCD_USER_FACTORY_CD[0]);
    };

    const onDropdownChangeEDT_KCD_USER_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataEDT_KCD_USER = { ...dataEDT_KCD_USER };

        let tTypeVal = _dataEDT_KCD_USER[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_USER[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_USER[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_USER(_dataEDT_KCD_USER);
        setDataEDT_KCD_USER_FACTORY_CD(e.value);
    };

    const [datasEDT_KCD_USER_PART, setDatasEDT_KCD_USER_PART] = useState([]);
    const [dataEDT_KCD_USER_PART, setDataEDT_KCD_USER_PART] = useState({});

    const editEDT_KCD_USER_PART = (argValue) => {
        let _dataEDT_KCD_USER_PART = datasEDT_KCD_USER_PART.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KCD_USER_PART(_dataEDT_KCD_USER_PART[0]);
    };

    const onDropdownChangeEDT_KCD_USER_PART = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KCD_USER = { ...dataEDT_KCD_USER };

        let tTypeVal = _dataEDT_KCD_USER[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_USER[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_USER[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_USER(_dataEDT_KCD_USER);
        setDataEDT_KCD_USER_PART(e.value);
    };

    const [datasEDT_KCD_USER_RANK, setDatasEDT_KCD_USER_RANK] = useState([]);
    const [dataEDT_KCD_USER_RANK, setDataEDT_KCD_USER_RANK] = useState({});

    const editEDT_KCD_USER_RANK = (argValue) => {
        let _dataEDT_KCD_USER_RANK = datasEDT_KCD_USER_RANK.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KCD_USER_RANK(_dataEDT_KCD_USER_RANK[0]);
    };

    const onDropdownChangeEDT_KCD_USER_RANK = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KCD_USER = { ...dataEDT_KCD_USER };

        let tTypeVal = _dataEDT_KCD_USER[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_USER[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_USER[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_USER(_dataEDT_KCD_USER);
        setDataEDT_KCD_USER_RANK(e.value);
    };

    const onInputChangeEDT_KCD_USER_EMAIL = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_USER = { ...dataEDT_KCD_USER };

        let tTypeVal = _dataEDT_KCD_USER[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KCD_USER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_USER[`${name}`] = parseInt(val);

        setDataEDT_KCD_USER(_dataEDT_KCD_USER);
    };

    const onInputChangeEDT_KCD_USER_TEL_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_USER = { ...dataEDT_KCD_USER };

        let tTypeVal = _dataEDT_KCD_USER[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KCD_USER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_USER[`${name}`] = parseInt(val);

        setDataEDT_KCD_USER(_dataEDT_KCD_USER);
    };

    const onInputChangeEDT_KCD_USER_CELLULAR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_USER = { ...dataEDT_KCD_USER };

        let tTypeVal = _dataEDT_KCD_USER[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KCD_USER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_USER[`${name}`] = parseInt(val);

        setDataEDT_KCD_USER(_dataEDT_KCD_USER);
    };

    const onInputChangeEDT_KCD_USER_EMP_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_USER = { ...dataEDT_KCD_USER };

        let tTypeVal = _dataEDT_KCD_USER[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KCD_USER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_USER[`${name}`] = parseInt(val);

        setDataEDT_KCD_USER(_dataEDT_KCD_USER);
    };

    const onInputChangeEDT_KCD_USER_BUYER_TEAM = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_USER = { ...dataEDT_KCD_USER };

        let tTypeVal = _dataEDT_KCD_USER[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KCD_USER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_USER[`${name}`] = parseInt(val);

        setDataEDT_KCD_USER(_dataEDT_KCD_USER);
    };

    const [datasEDT_KCD_USER_LEVEL, setDatasEDT_KCD_USER_LEVEL] = useState([]);
    const [dataEDT_KCD_USER_LEVEL, setDataEDT_KCD_USER_LEVEL] = useState({});

    const editEDT_KCD_USER_LEVEL = (argValue) => {
        let _dataEDT_KCD_USER_LEVEL = datasEDT_KCD_USER_LEVEL.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KCD_USER_LEVEL(_dataEDT_KCD_USER_LEVEL[0]);
    };

    const onDropdownChangeEDT_KCD_USER_LEVEL = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KCD_USER = { ...dataEDT_KCD_USER };

        let tTypeVal = _dataEDT_KCD_USER[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_USER[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_USER[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_USER(_dataEDT_KCD_USER);
        setDataEDT_KCD_USER_LEVEL(e.value);
    };

    const [datasEDT_KCD_USER_STATUS_CD, setDatasEDT_KCD_USER_STATUS_CD] =
        useState([]);
    const [dataEDT_KCD_USER_STATUS_CD, setDataEDT_KCD_USER_STATUS_CD] =
        useState({});

    const editEDT_KCD_USER_STATUS_CD = (argValue) => {
        let _dataEDT_KCD_USER_STATUS_CD = datasEDT_KCD_USER_STATUS_CD.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KCD_USER_STATUS_CD(_dataEDT_KCD_USER_STATUS_CD[0]);
    };

    const onDropdownChangeEDT_KCD_USER_STATUS_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KCD_USER = { ...dataEDT_KCD_USER };

        let tTypeVal = _dataEDT_KCD_USER[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_USER[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_USER[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_USER(_dataEDT_KCD_USER);
        setDataEDT_KCD_USER_STATUS_CD(e.value);
    };
    useEffect(() => {
        setLoading(true);
        // Effect
        getUserList();
    }, []);

    const getUserList = () => {
        serviceS0111_KCD_USER
            .mgrQueryTBL_KCD_USER(dataQRY_KCD_USER)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(data);
                    console.log(
                        "ServiceS0111_KCD_USER.mgrQueryTBL_KCD_USER call => " +
                            data.length,
                    );
                    setLoading(false);

                    // USER_LEVEL이 2이면 "팀장"으로 변경
                    const updatedData = data.map((user) => ({
                        ...Object.fromEntries(
                            // 모든 속성에서 null을 ''로 변환
                            Object.entries(user).map(([key, value]) => [
                                key,
                                value === "null" ? "" : value,
                            ]),
                        ),
                        USER_LEVEL: user.USER_LEVEL === "2" ? "팀장" : "팀원",
                    }));

                    setDatasTBL_KCD_USER(updatedData);
                } else {
                    console.log(
                        "serviceS0111_KCD_USER.mgrQueryTBL_KCD_USER error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        serviceS0111_KCD_USER.mgrQueryTBL_KCD_USER_CODE().then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceS0111_KCD_USER.mgrQueryTBL_KCD_USER_CODE call => " +
                        data.STATUS_CD.length,
                );
                setDatasQRY_KCD_USER_FACTORY_CD(data.FACTORY_CD);
                setDataQRY_KCD_USER_FACTORY_CD(data.FACTORY_CD[0]);

                setDatasEDT_KCD_USER_STATUS_CD(data.STATUS_CD);
                setDataEDT_KCD_USER_STATUS_CD(data.STATUS_CD[0]);

                setDatasEDT_KCD_USER_PART(data.PART);
                setDataEDT_KCD_USER_PART(data.PART[0]);

                setDatasEDT_KCD_USER_RANK(data.RANK);
                setDataEDT_KCD_USER_RANK(data.RANK[0]);

                var userLevelArr = [];
                var tObj1 = {};
                tObj1 = {};
                tObj1.CD_CODE = "";
                tObj1.CD_NAME = " ";
                userLevelArr.push(tObj1);
                tObj1 = {};
                tObj1.CD_CODE = "1";
                tObj1.CD_NAME = "팀원";
                userLevelArr.push(tObj1);
                tObj1 = {};
                tObj1.CD_CODE = "2";
                tObj1.CD_NAME = "팀장";
                userLevelArr.push(tObj1);
                setDatasEDT_KCD_USER_LEVEL(userLevelArr);
                setDataEDT_KCD_USER_LEVEL(userLevelArr[0]);

                setDatasEDT_KCD_USER_FACTORY_CD(data.FACTORY_CD);
                setDataEDT_KCD_USER_FACTORY_CD(data.FACTORY_CD[0]);
                setLoading(false);
            } else {
                console.log(
                    "serviceS0111_KCD_USER.mgrQueryTBL_KCD_USER error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const blankFn = () => {};

    // Support Area

    const [changePassWordModal, setChangePassWordModal] = useState(false);

    const hideChangePassWordModal = () => {
        setChangePassWordModal(false);
    };

    const showChangePassWordModal = () => {
        setChangePassWordModal(true);
    };

    const footerContent = (
        <div>
            <Button
                label="Cancel"
                icon="pi pi-times"
                onClick={hideChangePassWordModal}
                className="p-button-text"
                size="small"
            />

            <Button
                label="Save"
                icon="pi pi-check"
                onClick={blankFn}
                autoFocus
                size="small"
            />
        </div>
    );

    const onQryEnterKeyPress = (e) => {
        if (e.key === "Enter") {
            console.log("enter press here! ");
            searchTBL_KCD_USER();
        }
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span
                    className="af-span-3-0"
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        width: "30rem",
                    }}
                >
                    <span style={{ width: "10rem", display: "inline-block" }}>
                        
                        User ID/User Name
                    </span>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                        id="id_USER_CD"
                        value={dataQRY_KCD_USER.USER_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KCD_USER_USER_CD(e, "USER_CD")
                        }
                        onKeyPress={(e) => onQryEnterKeyPress(e)}
                    />
                </span>

                <span
                    className="af-span-3-0"
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        width: "22rem",
                    }}
                >
                    <span style={{ width: "2rem", display: "inline-block" }}>
                        
                        소속
                    </span>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                    >
                        <Dropdown
                            id="id_FACTORY_CD"
                            value={dataQRY_KCD_USER_FACTORY_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KCD_USER_FACTORY_CD(
                                    e,
                                    "FACTORY_CD",
                                )
                            }
                            options={datasQRY_KCD_USER_FACTORY_CD}
                            optionLabel="FACTORY_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span
                    className="af-span-3-0"
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        width: "20rem",
                    }}
                >
                    <span style={{ width: "3rem", display: "inline-block" }}>
                        
                        PART
                    </span>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_USER_CD"
                        value={dataQRY_KCD_USER.PART}
                        onChange={(e) =>
                            onInputChangeQRY_KCD_USER_PART(e, "PART")
                        }
                        onKeyPress={(e) => onQryEnterKeyPress(e)}
                    />
                </span>
                <div style={{ display: "inline-block", marginLeft: "1rem" }}>
                    <span className="block mt-2 md:mt-0 p-input-icon-left">
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
                            className="p-button-text"
                            onClick={searchTBL_KCD_USER}
                            size="small"
                        />

                        <Button
                            label="Excel"
                            className="p-button-text green"
                            onClick={exportExcelTBL_KCD_USER}
                            size="small"
                        />
                    </span>
                </div>
            </div>

            <div
                className="af-div-first"
                style={{ marginTop: "1rem", width: "123rem", height: "33rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KCD_USER}
                    size="small"
                    value={datasTBL_KCD_USER}
                    tableStyle={{ tableLayout: "auto" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    loading={loading}
                    selection={selectedTBL_KCD_USER}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KCD_USER(true);
                        setSelectedTBL_KCD_USER(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KCD_USER.length,
                        );
                        onRowClick1TBL_KCD_USER(e.value);
                    }}
                    onRowClick={onRowClickTBL_KCD_USER}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="360px"
                >
                    <AFColumn field="USER_ID" headerClassName="t-header" header="User ID" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} ></AFColumn>
                    {/*<AFColumn field="PASSWD" headerClassName='t-header' header="Passwd" style={{ flexBasis: 'auto' }} headerStyle={{ height: '1.8rem' }} bodyStyle={{ height: '1.8rem' }}></AFColumn>*/}
                    <AFColumn field="USER_NAME" headerClassName="t-header" header="User Name" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="FACTORY_NAME" headerClassName="t-header" header="Factory Name" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="FACTORY_CD" headerClassName="t-header" header="Factory#" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PART_NAME" headerClassName="t-header" header="Part" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PART" headerClassName="t-header" header="Part#" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="RANK_NAME" headerClassName="t-header" header="Rank" style={{ flexBasis: "auto", width: "4rem" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="USER_LEVEL" headerClassName="t-header" header="Level" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} ></AFColumn>
                    {/*<AFColumn field="RANK" headerClassName='t-header' header="Rank CD" style={{flexBasis:'auto', width: '6rem'}} headerStyle={{ height: '1.8rem' }} bodyStyle={{ height: '1.8rem' }}></AFColumn>*/}
                    <AFColumn field="EMAIL" headerClassName="t-header" header="Email" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="TEL_NO" headerClassName="t-header" header="Tel NO" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="CELLULAR" headerClassName="t-header" header="Cell NO" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="EMP_NO" headerClassName="t-header" header="EMP NO" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="BUYER_TEAM" headerClassName="t-header" header="BUYER Team" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="STATUS_NAME" headerClassName="t-header" header="Status" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} ></AFColumn>
                    {/*<AFColumn field="STATUS_CD" headerClassName='t-header' header="Status Cd" style={{ flexBasis: 'auto' }} headerStyle={{ height: '1.8rem' }} bodyStyle={{ height: '1.8rem' }}></AFColumn>*/}
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{
                    width: "123rem",
                    height: "24rem",
                    marginTop: "0.5rem",
                }}
            >
                <div className="flex mt-6">
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "32rem",
                            marginLeft: "10rem",
                        }}
                    >
                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                
                                사용자 ID
                            </span>
                            <InputText
                                style={{
                                    display: "inline-block",
                                    width: "18rem",
                                }}
                                id="id_USER_ID"
                                value={dataEDT_KCD_USER.USER_ID}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_USER_USER_ID(
                                        e,
                                        "USER_ID",
                                    )
                                }
                            />
                        </div>
                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                
                                사용자명
                            </span>
                            <InputText
                                style={{ display: "flex", width: "18rem" }}
                                value={dataEDT_KCD_USER.USER_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_USER_USER_NAME(
                                        e,
                                        "USER_NAME",
                                    )
                                }
                            />
                        </div>
                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                
                                부서
                            </span>
                            <Dropdown
                                id="id_PART"
                                style={{ width: "18rem" }}
                                value={dataEDT_KCD_USER_PART}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KCD_USER_PART(e, "PART")
                                }
                                options={datasEDT_KCD_USER_PART}
                                optionLabel="CD_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>

                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                
                                직위
                            </span>
                            <Dropdown
                                id="id_RANK"
                                style={{ width: "18rem" }}
                                value={dataEDT_KCD_USER_RANK}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KCD_USER_RANK(e, "RANK")
                                }
                                options={datasEDT_KCD_USER_RANK}
                                optionLabel="CD_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                
                                Level
                            </span>
                            <Dropdown
                                id="id_RANK"
                                style={{ width: "18rem" }}
                                value={dataEDT_KCD_USER_LEVEL}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KCD_USER_LEVEL(
                                        e,
                                        "USER_LEVEL",
                                    )
                                }
                                options={datasEDT_KCD_USER_LEVEL}
                                optionLabel="CD_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                
                                TEL NO
                            </span>
                            <InputText
                                style={{ display: "flex", width: "18rem" }}
                                value={dataEDT_KCD_USER.TEL_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_USER_TEL_NO(
                                        e,
                                        "TEL_NO",
                                    )
                                }
                            />
                        </div>
                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                
                                Byr.TEAM
                            </span>
                            <InputText
                                style={{ display: "flex", width: "18rem" }}
                                value={dataEDT_KCD_USER.BUYER_TEAM}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_USER_BUYER_TEAM(
                                        e,
                                        "BUYER_TEAM",
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "32rem",
                        }}
                    >
                        <div style={{ display: "flex" }} className="mt-2">
                            <span
                                onDoubleClick={() =>
                                    alert(dataEDT_KCD_USER.PASSWD)
                                }
                                style={{ width: "6rem", display: "flex" }}
                            >
                                
                                비밀번호
                            </span>
                            <Password
                                style={{
                                    display: "inline-block",
                                    width: "18rem",
                                }}
                                inputStyle={{ width: "18rem" }}
                                id="id_PASSWD"
                                value={dataEDT_KCD_USER.PASSWD}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_USER_PASSWD(
                                        e,
                                        "PASSWD",
                                    )
                                }
                            />

                            <Button
                                label="Change PW"
                                style={{ width: "7rem" }}
                                className="p-button-text"
                                onClick={showChangePassWordModal}
                            />
                        </div>
                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                
                                소속
                            </span>
                            <Dropdown
                                id="id_FACTORY_CD"
                                style={{ width: "18rem" }}
                                value={dataEDT_KCD_USER_FACTORY_CD}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KCD_USER_FACTORY_CD(
                                        e,
                                        "FACTORY_CD",
                                    )
                                }
                                options={datasEDT_KCD_USER_FACTORY_CD}
                                optionLabel="FACTORY_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                
                                Email
                            </span>
                            <InputText
                                style={{ display: "flex", width: "18rem" }}
                                value={dataEDT_KCD_USER.EMAIL}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_USER_EMAIL(e, "EMAIL")
                                }
                            />
                        </div>
                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                
                                Status
                            </span>
                            <Dropdown
                                id="id_STATUS_CD"
                                style={{ width: "18rem" }}
                                value={dataEDT_KCD_USER_STATUS_CD}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KCD_USER_STATUS_CD(
                                        e,
                                        "STATUS_CD",
                                    )
                                }
                                options={datasEDT_KCD_USER_STATUS_CD}
                                optionLabel="CD_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                
                                CELLULAR
                            </span>
                            <InputText
                                style={{ display: "flex", width: "18rem" }}
                                value={dataEDT_KCD_USER.CELLULAR}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_USER_CELLULAR(
                                        e,
                                        "CELLULAR",
                                    )
                                }
                            />
                        </div>
                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                
                                EMP NO
                            </span>
                            <InputText
                                style={{ display: "flex", width: "18rem" }}
                                value={dataEDT_KCD_USER.EMP_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_USER_EMP_NO(
                                        e,
                                        "EMP_NO",
                                    )
                                }
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "33rem",
                            marginLeft: "10rem",
                        }}
                    >
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_TBL_KCD_USER_BUYER}
                            size="small"
                            value={datasTBL_KCD_USER_BUYER}
                            tableStyle={{ tableLayout: "auto" }}
                            resizableColumns
                            columnResizeMode="expand"
                            showGridlines
                            loading={loading}
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" "
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="170px"
                        >
                            <AFColumn field="BUYER_CD" headerClassName="t-header" header="BUYER" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} ></AFColumn>
                            <AFColumn field="FACTORY" headerClassName="t-header" header="FACTORY" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} ></AFColumn>
                            <AFColumn field="TEAM" headerClassName="t-header" header="JOB" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} ></AFColumn>
                        </AFDataTable>
                    </div>
                </div>

                <div
                    className="field col-6 md:col-6 mt-5"
                    style={{ textAlign: "center", width: "100%" }}
                >
                    <Button
                        style={{ display: "inline-block", width: "9rem" }}
                        label="Save"
                        className="p-button-text"
                        onClick={saveEDT_KCD_USER}
                    />

                    <Button
                        style={{ display: "inline-block", width: "9rem" }}
                        label="Reset"
                        className="p-button-text"
                        onClick={resetEDT_KCD_USER}
                    />

                    <Button
                        style={{ display: "inline-block", width: "9rem" }}
                        label="Delete"
                        className="p-button-text"
                        onClick={deleteEDT_KCD_USER}
                    />
                </div>
            </div>

            <div style={{ width: "123rem", height: "2rem" }}>
                <div className="formgrid grid"></div>
            </div>

            <Divider />

            <Toast ref={toast} />

            <Dialog
                header="비밀번호 변경"
                footer={footerContent}
                visible={changePassWordModal}
                modal={false}
                style={{ width: "24rem" }}
                onHide={hideChangePassWordModal}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "flex",
                    }}
                >
                    <p style={{ width: "12rem", display: "inline-block" }}>기존 비밀번호</p>
                    <Password
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_USER_ID"
                        feedback={false}
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "flex",
                    }}
                >
                    <p style={{ width: "12rem", display: "inline-block" }}>새 비밀번호</p>
                    <Password
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_USER_ID"
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "flex",
                    }}
                >
                    <p style={{ width: "12rem", display: "inline-block" }}>새 비밀번호 확인</p>
                    <Password
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_USER_ID"
                    />
                </span>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0111_KCD_USER, comparisonFn);
