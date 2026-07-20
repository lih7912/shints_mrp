/* eslint-disable */
import axios from "axios";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Calendar } from "primereact/calendar";
import { AFDataTable } from "../components/AFDataTable";
import { AFColumn } from "../components/AFColumn";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";

import apiOption from "../assets/env_graphql";
import { ServiceS0113_KCD_BUYER } from "../service/service_biz/ServiceS0113_KCD_BUYER";
import { ServiceLib } from "../service/service_lib/ServiceLib";

import "primeflex/primeflex.css";
import "./page_common.scss";

import $ from "jquery";

const emptyTBL2 = {
    NAME: "",
    URL: "",
};

const FIXED_NEOE_TYPE_RAW = [
    { nm_mngd: "M/C", cd_mngd: "100" },
    { nm_mngd: "O/D", cd_mngd: "200" },
    { nm_mngd: "XMD출고매출", cd_mngd: "210" },
    { nm_mngd: "B/C", cd_mngd: "300" },
    { nm_mngd: "장갑", cd_mngd: "400" },
    { nm_mngd: "텐트", cd_mngd: "500" },
    { nm_mngd: "유상자재", cd_mngd: "600" },
    { nm_mngd: "캐주얼", cd_mngd: "610" },
    { nm_mngd: "아동복", cd_mngd: "620" },
    { nm_mngd: "단체복", cd_mngd: "630" },
    { nm_mngd: "ETP유상매출", cd_mngd: "640" },
    { nm_mngd: "ETP해외투자", cd_mngd: "650" },
    { nm_mngd: "기타", cd_mngd: "900" },
];

const MgrKcdBuyer = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0113_KCD_BUYERRef = useRef(null);
    if (!serviceS0113_KCD_BUYERRef.current) serviceS0113_KCD_BUYERRef.current = new ServiceS0113_KCD_BUYER();
    const serviceS0113_KCD_BUYER = serviceS0113_KCD_BUYERRef.current;
    const toast = useRef(null);

    // Qry
    let dataQRY1 = {
        BUYER_CD: "",
        BUYER_NAME: "",
        COMPANY_NAME: "",
        STATUS_CD: "0",
    };

    const [dataQRY1_BUYER_CD, setDataQRY1_BUYER_CD] = useState("");
    const [dataQRY1_BUYER_NAME, setDataQRY1_BUYER_NAME] = useState("");
    const [dataQRY1_COMPANY_NAME, setDataQRY1_COMPANY_NAME] = useState("");

    const [datasQRY1_STATUS_CD, setDatasQRY1_STATUS_CD] = useState([]);
    const [dataQRY1_STATUS_CD, setDataQRY1_STATUS_CD] = useState({});
    const editQRY1_STATUS_CD = (argValue) => {
        let tObj = datasQRY1_STATUS_CD.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataQRY1_STATUS_CD(tObj[0]);
    };

    const get_QRY1 = () => {
        var tObj = { ...dataQRY1 };
        tObj.BUYER_CD = dataQRY1_BUYER_CD;
        tObj.BUYER_NAME = dataQRY1_BUYER_NAME;
        tObj.COMPANY_NAME = dataQRY1_COMPANY_NAME;
        tObj.STATUS_CD = dataQRY1_STATUS_CD.CD_CODE;
        return tObj;
    };

    const put_QRY1 = (argData) => {
        setDataQRY1_BUYER_CD(argData.BUYER_CD);
        setDataQRY1_BUYER_NAME(argData.BUYER_NAME);
        setDataQRY1_COMPANY_NAME(argData.COMPANY_NAME);
        editQRY1_STATUS_CD(argData.STATUS_CD);
    };

    const [isAcPart, setIsAcPart] = useState("");
    const [isSMDPart, setIsSMDPart] = useState("");
    const [isEditStatusEnabled, setIsEditStatusEnabled] = useState(false);
    const [dataETC_USER_PART, setDataETC_USER_PART] = useState("");
    const [datasETC_SHINTS_USER, setDatasETC_SHINTS_USER] = useState([]);
    const [datasETC_TEAM_USER1, setDatasETC_TEAM_USER1] = useState([]);
    const [datasETC_CREDIT_RATING, setDatasETC_CREDIT_RATING] = useState([]);
    const [datasETC_BUYER_TEAM_INFO, setDatasETC_BUYER_TEAM_INFO] = useState(
        [],
    );
    const [datasETC_FILE_INFO, setDatasETC_FILE_INFO] = useState([]);
    const [dataETC_FILE_INFO, setDataETC_FILE_INFO] = useState({});
    const [dataETC_TITLE, setDataETC_TITLE] = useState("");

    const [datasETC_TEAM_USER, setDatasETC_TEAM_USER] = useState([]);
    const [dataETC_TEAM_USER, setDataETC_TEAM_USER] = useState({});
    const [dbName, setDbName] = useState("");

    const setFixedNeoeTypeOptions = () => {
        const tArray = FIXED_NEOE_TYPE_RAW.map((col, i) => ({
            id: i + 1,
            CD_CODE: col.cd_mngd,
            CD_NAME: col.nm_mngd,
        }));
        tArray.unshift({
            CD_CODE: " ",
            CD_NAME: " ",
        });
        setDatasEDIT1_NEOE_TYPE(tArray);
        setDataEDIT1_NEOE_TYPE(tArray[0]);
    };

    const loadNeoeTypeByDbName = () => {
        axios
            .get(
                `${window.location.protocol}//${window.location.hostname}:${apiOption.server_port}/restapi/db-name`,
            )
            .then((res) => {
                const currentDbName = (res?.data?.dbName || "").toString();
                setDbName(currentDbName);

                if (currentDbName.toLowerCase().includes("test")) {
                    setFixedNeoeTypeOptions();
                    return;
                }

                const tObj0 = { KEY1: "" };
                serviceS0113_KCD_BUYER
                    .mgrQuery_NEOE_CODE(tObj0)
                    .then((data) => {
                        if (typeof data.graphQLErrors === "undefined") {
                            const tArray = data.map((col, i) => ({
                                id: i + 1,
                                CD_CODE: col.cd_mngd,
                                CD_NAME: col.nm_mngd,
                            }));
                            tArray.unshift({
                                CD_CODE: " ",
                                CD_NAME: " ",
                            });
                            setDatasEDIT1_NEOE_TYPE(tArray);
                            setDataEDIT1_NEOE_TYPE(tArray[0]);
                        } else {
                            setFixedNeoeTypeOptions();
                        }
                    })
                    .catch(() => {
                        setFixedNeoeTypeOptions();
                    });
            })
            .catch(() => {
                setDbName("오류 발생");
                setFixedNeoeTypeOptions();
            });
    };

    const onChangePAY_BANK = (argData) => {
        setDataEDIT1_BANK_CD(argData);

        let tBankCd = argData.BANK_CD;
        let tBankName = argData.BANK_NAME;

        serviceS0113_KCD_BUYER.mgrQuery_BUYER_BANK(tBankCd).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    var tObj = { ...data[0] };
                    setDataEDIT1_BANK_NAME(tObj.BANK_NAME);
                    setDataEDIT1_ACCOUNT_NAME(tObj.ACCOUNT_NAME);
                    setDataEDIT1_ACCOUNT_NO(tObj.ACCOUNT_NO);
                }
            } else {
                console.log("check");
                // var tStr = data.graphQLErrors[0].message;
            }
        });
    };

    const onChangeETC_TEAM_USER = (argData) => {
        let val = argData.USER_ID;
        let val1 = argData.USER_NAME;

        console.log(val, val1);

        if (selectedTBL3.length <= 0) return;
        let selObj = { ...selectedTBL3[0] };

        console.log(
            selObj.FACTORY + "," + selObj.TEAM + "," + val + "," + val1,
        );

        var tArray = [];
        datasTBL3.forEach((col, i) => {
            var tObj = { ...col };
            if (col.FACTORY === selObj.FACTORY && col.TEAM === selObj.TEAM) {
                tObj.USER_ID = val;
                tObj.USER_NAME = val1;
                tArray.push(tObj);
            } else {
                tArray.push(tObj);
            }
        });
        setDatasTBL3(tArray);
        setDataETC_TEAM_USER(argData);
    };

    // Edit
    let dataEDIT1 = {
        BUYER_CD: "",
        STATUS_CD: "0",
        BUYER_NAME: "",
        BUYER_TEAM: "",
        NEOE_BUYER_CD: "",
        NEOE_BUYER_CD_MOM: "",
        BUYER_TYPE: "",
        NEOE_TYPE: "",
        REPRESENTATIVE: "",
        BANK_CD: "",
        BUYER_ABBR: "",
        BANK_NAME: "",
        USER_NAME: "",
        ACCOUNT_NAME: "",
        EMAIL: "",
        ACCOUNT_NO: "",
        TEL_NO: "",
        PAY_RULE: "",
        FAX_NO: "",
        TOLERANCE: "",
        NAT_CD: "",
        CREDIT_CURR: "",
        LOSS_FLAG: "",
        CREDIT_AMT: "",
        COMPANY_NAME: "",
        CREDIT_DATE: "",
        ADDR1: "",
        SHIP_ADDR1: "",
        SHIP_ADDR2: "",
        SHIP_ADDR3: "",
    };

    const [dataEDIT1_BUYER_CD, setDataEDIT1_BUYER_CD] = useState("");

    const [datasEDIT1_STATUS_CD, setDatasEDIT1_STATUS_CD] = useState([]);
    const [dataEDIT1_STATUS_CD, setDataEDIT1_STATUS_CD] = useState({});
    const editEDIT1_STATUS_CD = (argValue) => {
        let tObj = datasEDIT1_STATUS_CD.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDIT1_STATUS_CD(tObj[0]);
    };

    const [datasEDIT1_BUYER_TEAM, setDatasEDIT1_BUYER_TEAM] = useState([]);
    const [dataEDIT1_BUYER_TEAM, setDataEDIT1_BUYER_TEAM] = useState({});
    const editEDIT1_BUYER_TEAM = (argValue) => {
        let tObj = datasEDIT1_BUYER_TEAM.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDIT1_BUYER_TEAM(tObj[0]);
    };

    const [dataEDIT1_NEOE_BUYER_CD, setDataEDIT1_NEOE_BUYER_CD] = useState("");
    const [dataEDIT1_BUYER_NAME, setDataEDIT1_BUYER_NAME] = useState("");
    const [dataEDIT1_NEOE_BUYER_CD_MOM, setDataEDIT1_NEOE_BUYER_CD_MOM] =
        useState("");

    const [datasEDIT1_BUYER_TYPE, setDatasEDIT1_BUYER_TYPE] = useState([]);
    const [dataEDIT1_BUYER_TYPE, setDataEDIT1_BUYER_TYPE] = useState({});
    const editEDIT1_BUYER_TYPE = (argValue) => {
        let tObj = datasEDIT1_BUYER_TYPE.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDIT1_BUYER_TYPE(tObj[0]);
    };

    const [datasEDIT1_NEOE_TYPE, setDatasEDIT1_NEOE_TYPE] = useState([]);
    const [dataEDIT1_NEOE_TYPE, setDataEDIT1_NEOE_TYPE] = useState({});
    const editEDIT1_NEOE_TYPE = (argValue) => {
        let tObj = datasEDIT1_NEOE_TYPE.filter(
            (val) => val.CD_CODE === argValue,
        );
        if (typeof tObj === "undefined")
            setDataEDIT1_NEOE_TYPE(datasEDIT1_NEOE_TYPE[0]);
        else {
            if (tObj !== null && tObj.length > 0)
                setDataEDIT1_NEOE_TYPE(tObj[0]);
            else setDataEDIT1_NEOE_TYPE(datasEDIT1_NEOE_TYPE[0]);
        }
    };

    const [dataEDIT1_REPRESENTATIVE, setDataEDIT1_REPRESENTATIVE] =
        useState("");

    const [datasEDIT1_BANK_CD, setDatasEDIT1_BANK_CD] = useState([]);
    const [dataEDIT1_BANK_CD, setDataEDIT1_BANK_CD] = useState({});
    const editEDIT1_BANK_CD = (argValue) => {
        let tObj = datasEDIT1_BANK_CD.filter((val) => val.BANK_CD === argValue);
        setDataEDIT1_BANK_CD(tObj[0]);
    };

    const [dataEDIT1_BUYER_ABBR, setDataEDIT1_BUYER_ABBR] = useState("");
    const [dataEDIT1_BANK_NAME, setDataEDIT1_BANK_NAME] = useState("");
    const [dataEDIT1_USER_NAME, setDataEDIT1_USER_NAME] = useState("");
    const [dataEDIT1_ACCOUNT_NAME, setDataEDIT1_ACCOUNT_NAME] = useState("");
    const [dataEDIT1_EMAIL, setDataEDIT1_EMAIL] = useState("");
    const [dataEDIT1_ACCOUNT_NO, setDataEDIT1_ACCOUNT_NO] = useState("");
    const [dataEDIT1_TEL_NO, setDataEDIT1_TEL_NO] = useState("");

    const [datasEDIT1_PAY_RULE, setDatasEDIT1_PAY_RULE] = useState([]);
    const [dataEDIT1_PAY_RULE, setDataEDIT1_PAY_RULE] = useState({});
    const editEDIT1_PAY_RULE = (argValue) => {
        let tObj = datasEDIT1_PAY_RULE.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDIT1_PAY_RULE(tObj[0]);
    };

    const [dataEDIT1_FAX_NO, setDataEDIT1_FAX_NO] = useState("");

    const [datasEDIT1_TOLERANCE, setDatasEDIT1_TOLERANCE] = useState([]);
    const [dataEDIT1_TOLERANCE, setDataEDIT1_TOLERANCE] = useState({});
    const editEDIT1_TOLERANCE = (argValue) => {
        let tObj = datasEDIT1_TOLERANCE.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDIT1_TOLERANCE(tObj[0]);
    };

    const [datasEDIT1_NAT_CD, setDatasEDIT1_NAT_CD] = useState([]);
    const [dataEDIT1_NAT_CD, setDataEDIT1_NAT_CD] = useState({});
    const editEDIT1_NAT_CD = (argValue) => {
        let tObj = datasEDIT1_NAT_CD.filter((val) => val.NAT_CD === argValue);
        setDataEDIT1_NAT_CD(tObj[0]);
    };

    const [datasEDIT1_CREDIT_CURR, setDatasEDIT1_CREDIT_CURR] = useState([]);
    const [dataEDIT1_CREDIT_CURR, setDataEDIT1_CREDIT_CURR] = useState({});
    const editEDIT1_CREDIT_CURR = (argValue) => {
        let tObj = datasEDIT1_CREDIT_CURR.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDIT1_CREDIT_CURR(tObj[0]);
    };

    const [datasEDIT1_LOSS_FLAG, setDatasEDIT1_LOSS_FLAG] = useState([]);
    const [dataEDIT1_LOSS_FLAG, setDataEDIT1_LOSS_FLAG] = useState({});
    const editEDIT1_LOSS_FLAG = (argValue) => {
        let tObj = datasEDIT1_LOSS_FLAG.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDIT1_LOSS_FLAG(tObj[0]);
    };

    const [dataEDIT1_CREDIT_AMT, setDataEDIT1_CREDIT_AMT] = useState("");
    const [dataEDIT1_COMPANY_NAME, setDataEDIT1_COMPANY_NAME] = useState("");
    const [dataEDIT1_CREDIT_DATE, setDataEDIT1_CREDIT_DATE] = useState("");
    const [dataEDIT1_ADDR1, setDataEDIT1_ADDR1] = useState("");
    const [dataEDIT1_SHIP_ADDR1, setDataEDIT1_SHIP_ADDR1] = useState("");
    const [dataEDIT1_SHIP_ADDR2, setDataEDIT1_SHIP_ADDR2] = useState("");
    const [dataEDIT1_SHIP_ADDR3, setDataEDIT1_SHIP_ADDR3] = useState("");

    const get_EDIT1 = () => {
        var tObj = { ...dataEDIT1 };
        tObj.BUYER_CD = dataEDIT1_BUYER_CD;
        tObj.STATUS_CD = dataEDIT1_STATUS_CD.CD_CODE;
        tObj.NEOE_BUYER_CD = dataEDIT1_NEOE_BUYER_CD;
        tObj.BUYER_NAME = dataEDIT1_BUYER_NAME;
        if (typeof dataEDIT1_BUYER_TEAM === "undefined") tObj.BUYER_TEAM = "";
        else tObj.BUYER_TEAM = dataEDIT1_BUYER_TEAM.CD_CODE;
        tObj.NEOE_BUYER_CD_MOM = dataEDIT1_NEOE_BUYER_CD_MOM;
        tObj.BUYER_TYPE = dataEDIT1_BUYER_TYPE.CD_CODE;
        if (typeof dataEDIT1_NEOE_TYPE === "undefined" || dataEDIT1_NEOE_TYPE === null)
            tObj.NEOE_TYPE = "";
        else tObj.NEOE_TYPE = dataEDIT1_NEOE_TYPE.CD_CODE;
        tObj.REPRESENTATIVE = dataEDIT1_REPRESENTATIVE;
        tObj.BANK_CD = dataEDIT1_BANK_CD.BANK_CD;
        tObj.BUYER_ABBR = dataEDIT1_BUYER_ABBR;
        tObj.BANK_NAME = dataEDIT1_BANK_NAME;
        tObj.USER_NAME = dataEDIT1_USER_NAME;
        tObj.ACCOUNT_NAME = dataEDIT1_ACCOUNT_NAME;
        tObj.EMAIL = dataEDIT1_EMAIL;
        tObj.ACCOUNT_NO = dataEDIT1_ACCOUNT_NO;
        tObj.TEL_NO = dataEDIT1_TEL_NO;

        if (typeof dataEDIT1_PAY_RULE === "undefined") tObj.PAY_RULE = "";
        else tObj.PAY_RULE = dataEDIT1_PAY_RULE.CD_CODE;

        tObj.FAX_NO = dataEDIT1_FAX_NO;
        tObj.TOLERANCE = dataEDIT1_TOLERANCE.CD_CODE;
        tObj.NAT_CD = dataEDIT1_NAT_CD.NAT_CD;
        tObj.CREDIT_CURR = dataEDIT1_CREDIT_CURR.CD_CODE;
        tObj.LOSS_FLAG = dataEDIT1_LOSS_FLAG.CD_CODE;
        tObj.loss_flag = dataEDIT1_LOSS_FLAG.CD_CODE;
        tObj.CREDIT_AMT = dataEDIT1_CREDIT_AMT;
        tObj.COMPANY_NAME = dataEDIT1_COMPANY_NAME;
        tObj.CREDIT_DATE = dataEDIT1_CREDIT_DATE;
        tObj.ADDR1 = dataEDIT1_ADDR1;
        tObj.SHIP_ADDR1 = dataEDIT1_SHIP_ADDR1;
        tObj.SHIP_ADDR2 = dataEDIT1_SHIP_ADDR2;
        tObj.SHIP_ADDR3 = dataEDIT1_SHIP_ADDR3;
        return tObj;
    };

    const put_EDIT1 = (argData) => {
        var tLossFlag = "";
        var tNeoeType = "";

        if (typeof argData.loss_flag === "undefined")
            tLossFlag = argData.LOSS_FLAG;
        else tLossFlag = argData.loss_flag;

        if (typeof argData.NEOE_A23 === "undefined")
            tNeoeType = argData.NEOE_TYPE;
        else tNeoeType = argData.NEOE_A23;

        setDataEDIT1_BUYER_CD(argData.BUYER_CD);
        editEDIT1_STATUS_CD(argData.STATUS_CD);
        setDataEDIT1_NEOE_BUYER_CD(argData.NEOE_BUYER_CD);
        setDataEDIT1_BUYER_NAME(argData.BUYER_NAME);
        setDataEDIT1_NEOE_BUYER_CD_MOM(argData.NEOE_BUYER_CD_MOM);
        editEDIT1_BUYER_TYPE(argData.BUYER_TYPE);
        editEDIT1_NEOE_TYPE(tNeoeType);
        editEDIT1_BUYER_TEAM(argData.BUYER_TEAM);
        setDataEDIT1_REPRESENTATIVE(argData.REPRESENTATIVE);
        editEDIT1_BANK_CD(argData.BANK_CD);
        setDataEDIT1_BUYER_ABBR(argData.BUYER_ABBR);
        setDataEDIT1_BANK_NAME(argData.BANK_NAME);
        setDataEDIT1_USER_NAME(argData.USER_NAME);
        setDataEDIT1_ACCOUNT_NAME(argData.ACCOUNT_NAME);
        setDataEDIT1_EMAIL(argData.EMAIL);
        setDataEDIT1_ACCOUNT_NO(argData.ACCOUNT_NO);
        setDataEDIT1_TEL_NO(argData.TEL_NO);
        editEDIT1_PAY_RULE(argData.PAY_RULE);
        setDataEDIT1_FAX_NO(argData.FAX_NO);
        editEDIT1_TOLERANCE(argData.TOLERANCE);
        editEDIT1_NAT_CD(argData.NAT_CD);
        editEDIT1_CREDIT_CURR(argData.CREDIT_CURR);
        editEDIT1_LOSS_FLAG(tLossFlag);
        setDataEDIT1_CREDIT_AMT(argData.CREDIT_AMT);
        setDataEDIT1_COMPANY_NAME(argData.COMPANY_NAME);
        setDataEDIT1_CREDIT_DATE(argData.CREDIT_DATE);
        setDataEDIT1_ADDR1(argData.ADDR1);
        setDataEDIT1_SHIP_ADDR1(argData.SHIP_ADDR1);
        setDataEDIT1_SHIP_ADDR2(argData.SHIP_ADDR2);
        setDataEDIT1_SHIP_ADDR3(argData.SHIP_ADDR3);

        setDataETC_TEAM_USER(datasETC_TEAM_USER[0]);
        setDataTBL2(emptyTBL2);
    };

    const onKeyPress_EDIT1 = (e, name) => {
        if (e.key === "Enter") {
        }
    };

    ////

    /* TABLE S0101_KCD_BANK*/
    // DEFINE DATAGRID : TBL1
    let emptyTBL1 = {};

    const [datasTBL1, setDatasTBL1] = useState([]);
    const dt_TBL1 = useRef(null);
    const [dataTBL1, setDataTBL1] = useState(emptyTBL1);
    const [selectedTBL1, setSelectedTBL1] = useState([]);
    const [loadingTBL1, setLoadingTBL1] = useState(false);

    const editTBL1 = (argData) => {
        put_EDIT1(argData);
    };

    const onRowClick1TBL1 = (argData0) => {
        if (!argData0) return;
        var argData = {};
        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }
        let argTBL1 = argData;
        editTBL1(argTBL1);
        setDataTBL1(argTBL1);

        search_LIST_2(argData);
        search_LIST_3(argData);
    };

    const onRowClickTBL1 = (event) => {
        // Service : NawooAll:mgrQueryTBL1
    };

    const exportExcelTBL1 = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasTBL1);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL1(excelBuffer, "공장목록");
        });
    };

    const saveAsExcelFileTBL1 = (buffer, fileName) => {
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

    ///
    /* TABLE S0101_KCD_BANK*/
    // DEFINE DATAGRID : TBL2
    const [datasTBL2, setDatasTBL2] = useState([]);
    const dt_TBL2 = useRef(null);
    const [dataTBL2, setDataTBL2] = useState(emptyTBL2);
    const [selectedTBL2, setSelectedTBL2] = useState([]);
    const [loadingTBL2, setLoadingTBL2] = useState(false);

    const editTBL2 = (argData) => {
        // put_dataEDT_KCD_BANK(argData);
    };
    const onRowClick1TBL2 = (argData0) => {
        var argData = {};
        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }
        let argTBL2 = argData;
        editTBL2(argTBL2);
        setDataTBL2(argTBL2);

        // search_LIST_3(argData);
    };

    const onRowClickTBL2 = (event) => {
        // Service : NawooAll:mgrQueryTBL2
    };
    const onRowDoubleClick_TBL2 = (event) => {
        var tFileName = event.data.col3;
        let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
        var tUrl = `${_url1}filedown/buyer/` + tFileName;
        window.open(tUrl);
    };

    /* TABLE S0101_KCD_BANK*/
    // DEFINE DATAGRID : TBL3
    let emptyTBL3 = {};

    const [datasTBL3, setDatasTBL3] = useState([]);
    const dt_TBL3 = useRef(null);
    const [dataTBL3, setDataTBL3] = useState(emptyTBL3);
    const [selectedTBL3, setSelectedTBL3] = useState([]);
    const [loadingTBL3, setLoadingTBL3] = useState(false);

    const editTBL3 = (argData) => {
        // put_dataEDT_KCD_BANK(argData);
    };
    const onRowClick1TBL3 = (argData0) => {
        var argData = {};
        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL3 = argData;
        editTBL3(argTBL3);
        setDataTBL3(argTBL3);
    };

    const onRowClickTBL3 = (event) => {
        // Service : NawooAll:mgrQueryTBL3
    };

    /////
    const search_LIST_0 = () => {
        var tQry = get_QRY1();
        setLoadingTBL1(true);
        serviceS0113_KCD_BUYER.mgrQuery_BUYER_INFO(tQry).then((data) => {
            setLoadingTBL1(false);
            if (typeof data.graphQLErrors === "undefined") {
                setDatasTBL1(data);

                //console.log(datasBank_BuyerCD)
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        serviceS0113_KCD_BUYER.mgrQuery_BUYER_CODE("").then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY1_STATUS_CD(data.T_KCD_BUYER_STATUS_CD);
                setDataQRY1_STATUS_CD(data.T_KCD_BUYER_STATUS_CD[1]);

                setDatasEDIT1_STATUS_CD(data.T_KCD_BUYER_STATUS_CD);
                setDataEDIT1_STATUS_CD(data.T_KCD_BUYER_STATUS_CD[1]);

                setDatasEDIT1_BUYER_TYPE(data.T_KCD_BUYER_BUYER_TYPE);
                setDataEDIT1_BUYER_TYPE(data.T_KCD_BUYER_BUYER_TYPE[0]);

                setDatasEDIT1_BANK_CD(data.T_KCD_BUYER_BANK_CD);
                setDataEDIT1_BANK_CD(data.T_KCD_BUYER_BANK_CD[0]);

                setDatasEDIT1_PAY_RULE(data.T_KCD_BUYER_PAY_RULE);
                setDataEDIT1_PAY_RULE(data.T_KCD_BUYER_PAY_RULE[0]);

                setDatasEDIT1_LOSS_FLAG(data.T_KCD_BUYER_LOSS_FLAG);
                setDataEDIT1_LOSS_FLAG(data.T_KCD_BUYER_LOSS_FLAG[0]);

                setDatasEDIT1_NAT_CD(data.T_KCD_BUYER_NAT_CD);
                setDataEDIT1_NAT_CD(data.T_KCD_BUYER_NAT_CD[0]);

                setDatasEDIT1_CREDIT_CURR(data.T_KCD_BUYER_CREDIT_CURR);
                setDataEDIT1_CREDIT_CURR(data.T_KCD_BUYER_CREDIT_CURR[0]);

                setDatasEDIT1_TOLERANCE(data.T_KCD_BUYER_TOLERANCE);
                setDataEDIT1_TOLERANCE(data.T_KCD_BUYER_TOLERANCE[0]);

                setDatasEDIT1_BUYER_TEAM(data.T_KCD_BUYER_BUYER_TEAM);
                setDataEDIT1_BUYER_TEAM(data.T_KCD_BUYER_BUYER_TEAM[0]);
            } else {
                console.log("check");
                // var tStr = data.graphQLErrors[0].message;
            }
        });

        // NEOE_TYPE은 현재 DB명이 test가 포함이 안되어있을 때만 조회
        // 나머지는 아래의 값을 DatasEDIT1_NEOE_TYPE에 채움. CORS문제로 인해 일단은 NEOE_TYPE은 고정값으로 사용
        loadNeoeTypeByDbName();

        serviceS0113_KCD_BUYER.mgrQuery_BUYER_USER("").then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                data = data.map((col) => {
                    return {
                        ...col,
                        USER_ID_NAME: col.USER_NAME + "-" + col.USER_ID,
                    };
                });

                console.log(data);

                setDatasETC_SHINTS_USER(data);
                setDatasETC_TEAM_USER(data);
                setDatasETC_TEAM_USER1(data);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyerUser error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_1 = () => {
        var tQry = get_QRY1();
        setLoadingTBL1(true);
        process_RESET();
        setSelectedTBL1([]);
        serviceS0113_KCD_BUYER.mgrQuery_BUYER_INFO(tQry).then((data) => {
            setLoadingTBL1(false);
            if (typeof data.graphQLErrors === "undefined") {
                setDatasTBL1(data);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const handleSearchInputKeyDown = (e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        search_LIST_1();
    };

    const search_LIST_2 = (argData) => {
        setLoadingTBL2(true);
        serviceS0113_KCD_BUYER
            .mgrQuery_BUYER_FILEINFO(argData.BUYER_CD)
            .then((data) => {
                setLoadingTBL2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    setDatasTBL2(data);
                    setDatasETC_FILE_INFO(data);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const search_LIST_3 = (argData) => {
        setLoadingTBL3(true);
        serviceS0113_KCD_BUYER
            .mgrQuery_BUYER_TEAMINFO(argData.BUYER_CD)
            .then((data) => {
                setLoadingTBL3(false);
                if (typeof data.graphQLErrors === "undefined") {
                    var tArray = [];
                    data.forEach((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        tArray.push(tObj);
                    });

                    setDatasTBL3(tArray);
                    setDatasETC_BUYER_TEAM_INFO(tArray);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_RESET_QRY = () => {
        put_QRY1(dataQRY1);
        setDataETC_TITLE("");
        $("#inputFile").val("");
    };

    const process_RESET = () => {
        put_EDIT1(dataEDIT1);
        setDatasTBL1([]);
        setSelectedTBL1([]);
        setDatasTBL2([]);
        setSelectedTBL2([]);
        setDatasTBL3([]);
        setSelectedTBL3([]);
        setDataETC_TITLE("");
        $("#inputFile").val("");
    };

    function onlyNumberAndEnglish(str) {
        return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(str);
    }

    const saveKCD_BUYER = () => {
        // console.log(/^[A-Za-z0-9][A-Za-z0-9]*$/.test(dataKCD_BUYER.BUYER_CD));

        var dataKCD_BUYER = get_EDIT1();
        dataKCD_BUYER.id = 0;
        delete dataKCD_BUYER.LOSS_FLAG;

        if (dataKCD_BUYER.BUYER_CD.length > 3) {
            alert("BUYER_CD는 두자리 입력만 가능합니다<br><br>BUYER_CD can only be entered as two digits.");
            return;
        }
        if (!onlyNumberAndEnglish(dataKCD_BUYER.BUYER_CD)) {
            alert("BUYER_CD는 영어와 숫자만 입력만 가능합니다<br><br>BUYER_CD can only input English and numbers.");
            return;
        }

        dataKCD_BUYER.MOM_CD = " ";
        setLoadingTBL1(true);
        serviceS0113_KCD_BUYER
            .mgrInsert_BUYER_SAVE(dataKCD_BUYER)
            .then((data) => {
                setLoadingTBL1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) alert(data[0].CODE);

                    var tQry = get_QRY1();
                    tQry.BUYER_CD = dataKCD_BUYER.BUYER_CD;
                    serviceS0113_KCD_BUYER
                        .mgrQuery_BUYER_INFO(tQry)
                        .then((data) => {
                            if (typeof data.graphQLErrors === "undefined") {
                                setDatasTBL1(data);
                            } else {
                                console.log(
                                    "ServiceMgrKCD_BUYER.mgr1KcdBuyer error => " +
                                        JSON.stringify(data.graphQLErrors),
                                );
                            }
                        });
                } else {
                    var tQry = get_QRY1();
                    tQry.BUYER_CD = "";
                    serviceS0113_KCD_BUYER
                        .mgrQuery_BUYER_INFO(tQry)
                        .then((data) => {
                            if (typeof data.graphQLErrors === "undefined") {
                                setDatasTBL1(data);
                            } else {
                                console.log(
                                    "ServiceMgrKCD_BUYER.mgr1KcdBuyer error => " +
                                        JSON.stringify(data.graphQLErrors),
                                );
                            }
                        });
                }
            });
    };

    const btnSaveRef = useRef(null);
    const removeKCD_BUYER_TEAM_INFO = () => {
        if (selectedTBL3.length <= 0) {
            alert("삭제할 팀 멤버를 선택하세요<br><br>Select the team member you want to delete");
            return;
        }

        var tSelObj = { ...selectedTBL3[0] };

        console.log(tSelObj);

        var tArray = [];
        datasTBL3.forEach((col, i) => {
            var tObj = { ...col };
            if (col.USER_ID === tSelObj.USER_ID) {
                tObj.USER_ID = "";
                tObj.USER_NAME = "";
            }
            tArray.push(tObj);
        });
        setDatasTBL3(tArray);
        ///saveKCD_BUYER_TEAM_INFO();
        setTimeout(() => {
            btnSaveRef.current.click();
        }, 500);
    };

    const saveKCD_BUYER_TEAM_INFO = () => {
        var tInput = datasTBL3.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            return tObj;
        });

        serviceS0113_KCD_BUYER
            .mgrInsert_BUYER_TEAM_INFO_SAVE(tInput, dataEDIT1_BUYER_CD)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) alert(data[0].CODE);
                } else {
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

    const saveKCD_BUYER_FILE_INFO = (argFile) => {
        // setSubmittedKCD_BUYER(true);
        var tBuyerObj = get_EDIT1();
        let tFileObj = { ...dataETC_FILE_INFO };
        var tInput = {};
        tInput.BUYER_CD = tBuyerObj.BUYER_CD;
        tInput.title = dataETC_TITLE;

        if (argFile) {
            tInput.fileName = argFile.fileName;
            tInput.imgURL = argFile.imgURL;
            tInput.objectName = argFile.objectName;
        } else {
            tInput.fileName = tFileObj.fileName;
            tInput.imgURL = tFileObj.imgURL;
            tInput.objectName = tFileObj.objectName;
        }

        setLoadingTBL2(true);
        serviceS0113_KCD_BUYER
            .mgrInsert_BUYER_FILE_INFO_SAVE(tInput)
            .then((data) => {
                setLoadingTBL2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) alert(data[0].CODE);
                    serviceS0113_KCD_BUYER
                        .mgrQuery_BUYER_FILEINFO(tInput.BUYER_CD)
                        .then((data) => {
                            if (typeof data.graphQLErrors === "undefined") {
                                setDatasTBL2(data);
                            } else {
                                console.log(
                                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                                        JSON.stringify(data.graphQLErrors),
                                );
                            }
                        });
                } else {
                    var tStr = data.graphQLErrors[0];
                    toast.current.show({
                        severity: "success",
                        summary: "Query Error",
                        detail: tStr,
                        life: 3000,
                    });
                }
            });
    };

    const deleteKCD_BUYER = () => {
        var dataKCD_BUYER = get_EDIT1();
        dataKCD_BUYER.id = 0;
        delete dataKCD_BUYER.LOSS_FLAG;
        dataKCD_BUYER.MOM_CD = " ";

        serviceS0113_KCD_BUYER
            .mgrInsert_BUYER_DELETE(dataKCD_BUYER)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) alert(data[0].CODE);
                    process_RESET();
                    var tQry = get_QRY1();
                    tQry.BUYER_CD = dataKCD_BUYER.BUYER_CD;
                    serviceS0113_KCD_BUYER
                        .mgrQuery_BUYER_INFO(tQry)
                        .then((data) => {
                            if (typeof data.graphQLErrors === "undefined") {
                                setDatasTBL1(data);
                            } else {
                                console.log(
                                    "ServiceMgrKCD_BUYER.mgr1KcdBuyer error => " +
                                        JSON.stringify(data.graphQLErrors),
                                );
                            }
                        });
                } else {
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

    // Support
    const changeDateVal = (argVal) => {
        if (argVal === "") return argVal;
        var tType = typeof argVal;
        if (tType !== "string") {
            console.log(tType);
            return null;
        }

        var tYear = parseInt(argVal.substring(0, 4));
        var tMon = parseInt(argVal.substring(4, 6));
        var tDay = parseInt(argVal.substring(6, 8));

        return new Date(tYear, tMon - 1, tDay);
    };

    const getDateVal = (argVal) => {
        if (!argVal) return;

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

    const s3FileUpload = async (e) => {
        if (dataETC_TITLE === "") {
            alert("Title은 필수 입력입니다<br><br>Title is required");
            $("#inputFile").val("");
            return;
        }

        const fileName = e.target.files[0].name;
        const img = e.target.files[0];
        const formData = new FormData();
        formData.append("file", img);

        try {
            let tUrl = `${apiOption.apiuri}/restapi/imgUpload`;
            const s3UrlResponse = await axios.get(tUrl);
            console.log(s3UrlResponse.data.uploadURL);

            const presignedUrl = s3UrlResponse.data.uploadURL;
            const objectName = s3UrlResponse.data.imageName;
            await fetch(presignedUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": img.type,
                },
                body: img,
            });

            const imgURL = s3UrlResponse.data.uploadURL.split("?")[0];
            console.log("imgUrl :" + imgURL);

            var tObj = {};
            tObj.fileName = fileName;
            tObj.imgURL = imgURL;
            tObj.objectName = objectName;
            setDataETC_FILE_INFO(tObj);
            saveKCD_BUYER_FILE_INFO(tObj);
            $("#inputFile").val("");
            setDataETC_TITLE("");
        } catch (err) {
            console.log(err);
        }
    };

    const onDownloadFile = () => {
        if (
            dataTBL2.URL == null ||
            dataTBL2.URL == "" ||
            dataTBL2.URL == undefined
        ) {
            alert("파일을 선택해주세요<br><br>Please select a file");
        } else {
            serviceLib.downloadFile(dataTBL2.URL, dataTBL2.NAME);
        }
    };

    const s3FileDelete = async () => {
        try {
            if (
                dataTBL2.OBJECT_NAME == null ||
                dataTBL2.OBJECT_NAME == "" ||
                dataTBL2.OBJECT_NAME == undefined
            ) {
                alert("삭제할 파일을 선택해주세요<br><br>Please select the file you want to delete");
            } else {
                const body = {
                    objectName: dataTBL2.OBJECT_NAME,
                };
                let tUrl = `${apiOption.apiuri}/restapi/deleteImg`;
                const response = await axios.post(tUrl, body);

                console.log(response);

                if (response) {
                    serviceS0113_KCD_BUYER
                        .mgrQuery_BUYER_FILEINFO(dataEDIT1_BUYER_CD)
                        .then((data) => {
                            if (typeof data.graphQLErrors === "undefined") {
                                setDatasTBL2(data);
                            } else {
                                console.log(
                                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                                        JSON.stringify(data.graphQLErrors),
                                );
                            }
                        });
                } else {
                    alert("삭제 실패<br><br>Deletion failed");
                }
            }
        } catch (err) {
            alert("에러 발생<br><br>An error occurred");
            console.log(err);
        }
    };

    useEffect(() => {
        var tUserInfo = serviceLib.getUserInfo();
        setDataETC_USER_PART(tUserInfo.PART);

        const editStatusEnabledUsers = new Set([
            "haein",
            "jhoen",
            "lkj83",
            "kevin1",
            "lih7912",
            "won21kr",
        ]);
        const userId = String(tUserInfo.USER_ID || "").toLowerCase();
        setIsEditStatusEnabled(editStatusEnabledUsers.has(userId));

        if (tUserInfo.PART === "AC") {
            setIsAcPart(false);
        } else {
            setIsAcPart(true);
        }

        if (
            tUserInfo.PART === "S01" ||
            tUserInfo.PART === "S02" ||
            tUserInfo.PART === "S03" ||
            tUserInfo.PART === "S04" ||
            tUserInfo.PART === "S05" ||
            tUserInfo.PART === "S06"
        ) {
            setIsSMDPart(false);
        } else {
            setIsSMDPart(true);
        }

        let userIdRaw = tUserInfo.USER_ID;

        if (
            userIdRaw === "lih7912" ||
            userIdRaw === "chibumy" ||
            userIdRaw === "won21kr" ||
            userIdRaw === "kevin1" ||
            userIdRaw === "lkj83" ||
            userIdRaw === "changbae" ||
            userIdRaw === "trade1" ||
            userIdRaw === "haein" 
        ) {
            setIsAcPart(false);
            setIsSMDPart(false);
        }

        search_LIST_0();
    }, []);

    // ✅ useEffect로 데이터 변경 시 첫 행 자동 선택
    useEffect(() => {
        if (
            !loadingTBL1 &&
            datasTBL1?.length > 0 &&
            (!selectedTBL1 || selectedTBL1.length === 0)
        ) {
            const first = datasTBL1[0];
            setSelectedTBL1(first);
            onRowClick1TBL1([first]); // 선택 이벤트 동기화
        }
    }, [datasTBL1, loadingTBL1]);

    // ✅ 선택 해제 방지 (onSelectionChange에서 빈값 들어오면 막기)
    const handleSelectionChange = (e) => {
        if (!e.value || e.value.length === 0) return; // 선택 해제 방지
        setSelectedTBL1(e.value);
        onRowClick1TBL1(e.value);
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Buyer#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_EMAIL"
                            value={dataQRY1_BUYER_CD}
                            onKeyDown={handleSearchInputKeyDown}
                            onChange={(e) =>
                                setDataQRY1_BUYER_CD(e.target.value)
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Buyer Name</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            style={{ width: "12rem" }}
                            id="id_EMAIL"
                            value={dataQRY1_BUYER_NAME}
                            onKeyDown={handleSearchInputKeyDown}
                            onChange={(e) =>
                                setDataQRY1_BUYER_NAME(e.target.value)
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Company Name</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            style={{ width: "12rem" }}
                            id="id_EMAIL"
                            value={dataQRY1_COMPANY_NAME}
                            onKeyDown={handleSearchInputKeyDown}
                            onChange={(e) =>
                                setDataQRY1_COMPANY_NAME(e.target.value)
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Status</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            id="id_QryStatus"
                            style={{ width: "9rem" }}
                            value={dataQRY1_STATUS_CD}
                            onChange={(e) =>
                                setDataQRY1_STATUS_CD(e.target.value)
                            }
                            options={datasQRY1_STATUS_CD}
                            optionLabel="CD_NAME"
                            placeholder="Select One"
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Tooltip
                            className="menuCodeTooltip"
                            target={`#btnSearch`}
                            content={`Alt+S`}
                            position="bottom"
                        />

                        <Button
                            style={{ width: "10rem" }}
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            accessKey="S"
                            id="btnSearch"
                            className="p-button-text"
                            size="small"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Reset"
                            className="p-button-text"
                            size="small"
                            onClick={process_RESET_QRY}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Excel"
                            className="p-button-text green"
                            size="small"
                            onClick={exportExcelTBL1}
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "17rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL1}
                    size="small"
                    value={datasTBL1}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selection={selectedTBL1}
                    loading={loadingTBL1}
                    onSelectionChange={handleSelectionChange}
                    onRowClick={onRowClickTBL1}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="185px"
                >
                    <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COMPANY_NAME" headerClassName="t-header" header="Company" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BUYER_TEAM_NAME" headerClassName="t-header" header="Team" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USER_NAME" headerClassName="t-header" header="Charger" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PAY_RULE_NAME" headerClassName="t-header" header="Pay Rule" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CREDIT_AMT" headerClassName="t-header" header="Credit" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CREDIT_CURR" headerClassName="t-header" header="Curr" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STATUS_NAME" headerClassName="t-header" header="Status" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div style={{ height: "41rem" }}>
                <div
                    className="af-div-first"
                    style={{ width: "64rem", height: "41rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Buyer#</p>
                        <div className="af-span-div" style={{ width: "7rem" }}>
                            <InputText
                                style={{ width: "8rem" }}
                                id="id_BUYER_CD"
                                value={dataEDIT1_BUYER_CD}
                                onChange={(e) =>
                                    setDataEDIT1_BUYER_CD(e.target.value)
                                }
                                onKeyPress={(e) =>
                                    onKeyPress_EDIT1(e, "BUYER_CD")
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "15.5rem" }}>
                        <p className="af-span-p" style={{ width: "4.5rem" }}>Status</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <Dropdown
                                style={{ width: "10rem" }}
                                id="id_EditStatus"
                                value={dataEDIT1_STATUS_CD}
                                onChange={(e) =>
                                    setDataEDIT1_STATUS_CD(e.target.value)
                                }
                                options={datasEDIT1_STATUS_CD}
                                optionLabel="CD_NAME"
                                placeholder="Select One"
                                disabled={!isEditStatusEnabled}
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Team</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <Dropdown
                                style={{ width: "23rem" }}
                                id="id_STATUS_CD"
                                value={dataEDIT1_BUYER_TEAM}
                                onChange={(e) =>
                                    setDataEDIT1_BUYER_TEAM(e.target.value)
                                }
                                options={datasEDIT1_BUYER_TEAM}
                                optionLabel="CD_NAME"
                                placeholder="Select One"
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Buyer Name</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <InputText
                                style={{ width: "23rem" }}
                                id="id_BUYER_NAME"
                                value={dataEDIT1_BUYER_NAME}
                                onChange={(e) =>
                                    setDataEDIT1_BUYER_NAME(e.target.value)
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Neoe Type</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <Dropdown
                                style={{ width: "23rem" }}
                                id="id_NEOE_TYPE"
                                value={dataEDIT1_NEOE_TYPE}
                                onChange={(e) =>
                                    setDataEDIT1_NEOE_TYPE(e.target.value)
                                }
                                options={datasEDIT1_NEOE_TYPE}
                                optionLabel="CD_NAME"
                                placeholder="Select One"
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Buyer Type</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <Dropdown
                                style={{ width: "23rem" }}
                                id="id_BUYER_TYPE"
                                value={dataEDIT1_BUYER_TYPE}
                                onChange={(e) =>
                                    setDataEDIT1_BUYER_TYPE(e.target.value)
                                }
                                options={datasEDIT1_BUYER_TYPE}
                                optionLabel="CD_NAME"
                                placeholder="Select One"
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Neoe Byr#</p>
                        <div className="af-span-div" style={{ width: "7rem" }}>
                            <InputText
                                style={{ width: "7rem" }}
                                id="id_NEOE_BUYER_CD"
                                value={dataEDIT1_NEOE_BUYER_CD}
                                onChange={(e) =>
                                    setDataEDIT1_NEOE_BUYER_CD(e.target.value)
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Neoe Mom</p>
                        <div className="af-span-div" style={{ width: "7rem" }}>
                            <InputText
                                style={{ width: "7rem" }}
                                id="id_NEOE_BUYER_CD_MOM"
                                value={dataEDIT1_NEOE_BUYER_CD_MOM}
                                onChange={(e) =>
                                    setDataEDIT1_NEOE_BUYER_CD_MOM(
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Company</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <InputText
                                style={{ width: "23rem" }}
                                id="id_COMPANY_NAME"
                                value={dataEDIT1_COMPANY_NAME}
                                onChange={(e) =>
                                    setDataEDIT1_COMPANY_NAME(e.target.value)
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Pay Bank</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <Dropdown
                                id="id_BANK_CD"
                                style={{ width: "23rem" }}
                                value={dataEDIT1_BANK_CD}
                                onChange={(e) =>
                                    onChangePAY_BANK(e.target.value)
                                }
                                options={datasEDIT1_BANK_CD}
                                optionLabel="BANK_NAME"
                                placeholder="Select One"
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Representative</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <InputText
                                style={{ width: "23rem" }}
                                id="id_REPERSENTATIVE"
                                value={dataEDIT1_REPRESENTATIVE}
                                onChange={(e) =>
                                    setDataEDIT1_REPRESENTATIVE(e.target.value)
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Bank Name</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <InputText
                                style={{ width: "23rem" }}
                                id="id_BANK_NAME"
                                value={dataEDIT1_BANK_NAME}
                                onChange={(e) =>
                                    setDataEDIT1_BANK_NAME(e.target.value)
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Reg No</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <InputText
                                style={{ width: "23rem" }}
                                id="id_BUYER_ABBR"
                                value={dataEDIT1_BUYER_ABBR}
                                onChange={(e) =>
                                    setDataEDIT1_BUYER_ABBR(e.target.value)
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Acc Name</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <InputText
                                disabled={isAcPart}
                                style={{
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_ACCOUNT_NAME"
                                value={dataEDIT1_ACCOUNT_NAME}
                                onChange={(e) =>
                                    setDataEDIT1_ACCOUNT_NAME(e.target.value)
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Charge</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <InputText
                                style={{ width: "23rem" }}
                                id="id_USER_NAME"
                                value={dataEDIT1_USER_NAME}
                                onChange={(e) =>
                                    setDataEDIT1_USER_NAME(e.target.value)
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Acc No</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <InputText
                                disabled={isAcPart}
                                style={{ width: "23rem" }}
                                id="id_ACCOUNT_NO"
                                value={dataEDIT1_ACCOUNT_NO}
                                onChange={(e) =>
                                    setDataEDIT1_ACCOUNT_NO(e.target.value)
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Email</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <InputText
                                style={{
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_EMAIL"
                                value={dataEDIT1_EMAIL}
                                onChange={(e) =>
                                    setDataEDIT1_EMAIL(e.target.value)
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Pay Rule</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <Dropdown
                                disabled={isAcPart && isSMDPart}
                                id="id_PAY_RULE"
                                style={{ width: "23rem" }}
                                value={dataEDIT1_PAY_RULE}
                                onChange={(e) =>
                                    setDataEDIT1_PAY_RULE(e.target.value)
                                }
                                options={datasEDIT1_PAY_RULE}
                                optionLabel="CD_NAME"
                                placeholder="Select One"
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Tel No</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <InputText
                                style={{ width: "23rem" }}
                                id="id_TEL_NO"
                                value={dataEDIT1_TEL_NO}
                                onChange={(e) =>
                                    setDataEDIT1_TEL_NO(e.target.value)
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Tolerance</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <Dropdown
                                disabled={isAcPart}
                                style={{ width: "23rem" }}
                                id="id_NAT_CD"
                                value={dataEDIT1_TOLERANCE}
                                onChange={(e) =>
                                    setDataEDIT1_TOLERANCE(e.target.value)
                                }
                                options={datasEDIT1_TOLERANCE}
                                optionLabel="CD_NAME"
                                placeholder="Select One"
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Fax No</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <InputText
                                style={{ width: "23rem" }}
                                id="id_FAX_NO"
                                value={dataEDIT1_FAX_NO}
                                onChange={(e) =>
                                    setDataEDIT1_FAX_NO(e.target.value)
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Credit Curr</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <Dropdown
                                disabled={isAcPart}
                                id="id_BANK_CD"
                                style={{ width: "23rem" }}
                                value={dataEDIT1_CREDIT_CURR}
                                onChange={(e) =>
                                    setDataEDIT1_CREDIT_CURR(e.target.value)
                                }
                                options={datasEDIT1_CREDIT_CURR}
                                optionLabel="CD_NAME"
                                placeholder="Select One"
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Country</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <Dropdown
                                style={{ width: "23rem" }}
                                id="id_NAT_CD"
                                value={dataEDIT1_NAT_CD}
                                onChange={(e) =>
                                    setDataEDIT1_NAT_CD(e.target.value)
                                }
                                options={datasEDIT1_NAT_CD}
                                optionLabel="NAT_NAME"
                                placeholder="Select One"
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Credit Amt</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <InputText
                                disabled={isAcPart}
                                style={{ width: "23rem" }}
                                id="id_ACCOUNT_NO"
                                value={dataEDIT1_CREDIT_AMT}
                                onChange={(e) =>
                                    setDataEDIT1_CREDIT_AMT(e.target.value)
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Loss Rule</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <Dropdown
                                style={{ width: "14rem" }}
                                id="id_NAT_CD"
                                value={dataEDIT1_LOSS_FLAG}
                                onChange={(e) =>
                                    setDataEDIT1_LOSS_FLAG(e.target.value)
                                }
                                options={datasEDIT1_LOSS_FLAG}
                                optionLabel="CD_NAME"
                                placeholder="Select One"
                            ></Dropdown>
                            <Button
                                style={{ width: "8.5rem" }}
                                label="Apply"
                                className="p-button-text"
                                onClick={saveKCD_BUYER}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Valid</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <Calendar
                                showButtonBar
                                disabled={isAcPart}
                                dateFormat="yy-mm-dd"
                                id="id_START_DATE"
                                value={changeDateVal(dataEDIT1_CREDIT_DATE)}
                                onChange={(e) =>
                                    setDataEDIT1_CREDIT_DATE(
                                        getDateVal(e.value),
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "51rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Addr</p>
                        <div className="af-span-div" style={{ width: "40rem" }}>
                            <InputText
                                style={{ width: "40rem" }}
                                id="id_ADDR1"
                                value={dataEDIT1_ADDR1}
                                onChange={(e) =>
                                    setDataEDIT1_ADDR1(e.target.value)
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "51rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Ship Addr1</p>
                        <div className="af-span-div" style={{ width: "40rem" }}>
                            <InputText
                                style={{ width: "40rem" }}
                                id="id_SHIP_ADDR1"
                                value={dataEDIT1_SHIP_ADDR1}
                                onChange={(e) =>
                                    setDataEDIT1_SHIP_ADDR1(e.target.value)
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "11rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "10rem" }}
                        >
                            <Button
                                style={{ width: "10rem" }}
                                label="Save"
                                className="p-button-text"
                                onClick={saveKCD_BUYER}
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "51rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Ship Addr2</p>
                        <div className="af-span-div" style={{ width: "40rem" }}>
                            <InputText
                                style={{ width: "40rem" }}
                                id="id_SHIP_ADDR2"
                                value={dataEDIT1_SHIP_ADDR2}
                                onChange={(e) =>
                                    setDataEDIT1_SHIP_ADDR2(e.target.value)
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "11rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "10rem" }}
                        >
                            <Button
                                style={{ width: "10rem" }}
                                label="Reset"
                                className="p-button-text"
                                onClick={process_RESET}
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "51rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Ship Addr3</p>
                        <div className="af-span-div" style={{ width: "40rem" }}>
                            <InputText
                                style={{ width: "40rem" }}
                                id="id_SHIP_ADDR3"
                                value={dataEDIT1_SHIP_ADDR3}
                                onChange={(e) =>
                                    setDataEDIT1_SHIP_ADDR3(e.target.value)
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "11rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "10rem" }}
                        >
                            <Button
                                style={{ width: "10rem" }}
                                label="Delete"
                                className="p-button-text"
                                onClick={deleteKCD_BUYER}
                            />
                        </div>
                    </span>
                </div>

                <div
                    className="af-div-first"
                    style={{
                        width: "23rem",
                        height: "28.5rem",
                        marginLeft: "0.5rem",
                    }}
                >
                    <div
                        className="af-div-second"
                        style={{ width: "23rem", height: "28.5rem" }}
                    >
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_TBL2}
                            size="small"
                            value={datasTBL2}
                            resizableColumns
                            columnResizeMode="expand"
                            showGridlines
                            onRowDoubleClick={onRowDoubleClick_TBL2}
                            selection={selectedTBL2}
                            onSelectionChange={(e) => {
                                setSelectedTBL2(e.value);
                                onRowClick1TBL2(e.value);
                            }}
                            onRowClick={onRowClickTBL2}
                            dataKey="id"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" "
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="28.5rem"
                        >
                            <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                            <AFColumn field="TITLE" headerClassName="t-header" header="Title" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="NAME" headerClassName="t-header" header="File Name" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn field="UPD_DATETIME" headerClassName="t-header" header="Update Date" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        </AFDataTable>
                    </div>
                    <div
                        className="af-div-second"
                        style={{
                            width: "23rem",
                            height: "11.6rem",
                            backgroundColor: "white",
                        }}
                    >
                        <span className="af-span-3" style={{ width: "18rem" }}>
                            <p className="af-span-p" style={{ width: "3rem" }}>Title</p>
                            <div
                                className="af-span-div"
                                style={{ width: "10rem" }}
                            >
                                <InputText
                                    style={{ width: "18rem" }}
                                    id="id_SHIP_ADDR3"
                                    value={dataETC_TITLE}
                                    onChange={(e) =>
                                        setDataETC_TITLE(e.target.value)
                                    }
                                />
                            </div>
                        </span>
                        <span
                            style={{
                                height: "3rem",
                                display: "block",
                                width: "49rem",
                                marginTop: "1rem",
                            }}
                        >
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "25rem",
                                }}
                            >
                                <button style={{ width: "9rem" }}>
                                    <label
                                        className="inputFileCustom"
                                        htmlFor="inputFile"
                                    >
                                        File Upload
                                    </label>
                                </button>
                                <input
                                    type="file"
                                    id="inputFile"
                                    onChange={s3FileUpload}
                                    style={{ display: "none" }}
                                />
                            </div>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "block",
                                    width: "25rem",
                                    marginTop: "0.5rem",
                                }}
                            >
                                <button
                                    style={{ width: "9rem" }}
                                    onClick={onDownloadFile}
                                >
                                    <label className="inputFileCustom">
                                        File Download
                                    </label>
                                </button>
                            </div>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "25rem",
                                    marginTop: "0.5rem",
                                }}
                            >
                                <button
                                    style={{ width: "9rem", color: "white" }}
                                    onClick={s3FileDelete}
                                >
                                    File Delete
                                </button>
                            </div>
                        </span>
                    </div>
                </div>

                <div
                    className="af-div-first"
                    style={{
                        width: "35rem",
                        height: "41rem",
                        marginLeft: "0.5rem",
                    }}
                >
                    <div
                        className="af-div-second"
                        style={{ width: "35rem", height: "36rem" }}
                    >
                        <div style={{ width: "35rem", height: "36rem" }}>
                            <AFDataTable preventUnrelatedRerender
                                ref={dt_TBL3}
                                size="small"
                                value={datasTBL3}
                                resizableColumns
                                columnResizeMode="expand"
                                showGridlines
                                selectionMode="checkbox"
                                selection={selectedTBL3}
                                onSelectionChange={(e) => {
                                    setSelectedTBL3(e.value);
                                    onRowClick1TBL3(e.value);
                                }}
                                onRowClick={onRowClickTBL3}
                                dataKey="id"
                                className="datatable-responsive"
                                virtualScrollerOptions={{ itemSize: 20 }}
                                emptyMessage=" "
                                responsiveLayout="scroll"
                                scrollable
                                scrollHeight="36rem"
                            >
                                <AFColumn field="FACTORY" headerClassName="t-header" header="Factory" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                                <AFColumn field="TEAM" headerClassName="t-header" header="Job" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                                <AFColumn field="USER_ID" headerClassName="t-header" header="User Id" style={{ width: "20rem", flexBasis: "auto", }} ></AFColumn>
                                <AFColumn field="USER_NAME" headerClassName="t-header" header="User Name" style={{ width: "10rem", flexBasis: "auto", }} ></AFColumn>
                            </AFDataTable>
                        </div>
                        <div
                            className="af-div-second"
                            style={{
                                width: "33rem",
                                height: "3rem",
                                display: "flex",
                            }}
                        >
                            <div
                                className="af-span-div"
                                style={{ width: "15rem", display: "flex" }}
                            >
                                <Dropdown
                                    style={{ width: "15rem" }}
                                    id="id_TEAM_USER"
                                    value={dataETC_TEAM_USER}
                                    onChange={(e) =>
                                        onChangeETC_TEAM_USER(e.target.value)
                                    }
                                    options={datasETC_TEAM_USER}
                                    optionLabel="USER_ID_NAME"
                                    filter
                                    placeholder="Select One"
                                ></Dropdown>
                            </div>
                            <div
                                className="af-span-div"
                                style={{ display: "flex" }}
                            >
                                <Button
                                    style={{ width: "8rem" }}
                                    label="Save"
                                    className="p-button-text"
                                    onClick={saveKCD_BUYER_TEAM_INFO}
                                    ref={btnSaveRef}
                                />

                                <Button
                                    style={{ width: "8rem" }}
                                    label="Remove"
                                    className="p-button-text"
                                    onClick={removeKCD_BUYER_TEAM_INFO}
                                />
                            </div>
                        </div>
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

export default React.memo(MgrKcdBuyer, comparisonFn);
