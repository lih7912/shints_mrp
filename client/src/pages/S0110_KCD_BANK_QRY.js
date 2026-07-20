/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AFDataTable } from "../components/AFDataTable";
import { AFColumn } from "../components/AFColumn";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0110_KCD_BANK_QRY } from "../service/service_biz/ServiceS0110_KCD_BANK_QRY";
import apiOption from "../assets/env_graphql";
import $ from "jquery";

import "../App.scss";
import "./MgrKcdBank.scss";

const MgrKcdBank = () => {
    const toast = useRef(null);
    const dt_kcd_bank = useRef(null);
    const dt_kcd_vendor = useRef(null);

    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;

    const serviceS0110_KCD_BANK_QRYRef = useRef(null);
    if (!serviceS0110_KCD_BANK_QRYRef.current) serviceS0110_KCD_BANK_QRYRef.current = new ServiceS0110_KCD_BANK_QRY();
    const serviceS0110_KCD_BANK_QRY = serviceS0110_KCD_BANK_QRYRef.current;

    const findOption = (list, value, key = "CD_CODE") =>
        list.find((item) => item[key] === value) || {};
    const setSelectedOption = (list, setter, value, key = "CD_CODE") => {
        setter(findOption(list, value, key));
    };

    const getFirstRow = (data) => {
        if (Array.isArray(data)) return data[0] || {};
        return data || {};
    };

    const toIndexedRows = (rows = []) =>
        rows.map((row, index) => ({
            ...row,
            id: index + 1,
        }));

    const resetVendorGrid = () => {
        setDatasTBL_KCD_VENDOR([]);
        setSelectedTBL_KCD_VENDOR([]);
    };

    const toggleSwiftCodeInput = (bankType) => {
        $("#sftCodeInput").css("display", bankType === "2" ? "block" : "none");
    };

    const saveAsExcelFile = (buffer, fileName) => {
        import("file-saver").then((module) => {
            if (!module?.default) return;

            const EXCEL_TYPE =
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            const EXCEL_EXTENSION = ".xlsx";
            const data = new Blob([buffer], { type: EXCEL_TYPE });

            module.default.saveAs(
                data,
                `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`,
            );
        });
    };

    const exportExcel = (rows, fileName) => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(rows);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFile(excelBuffer, fileName);
        });
    };

    let dataQRY_KCD_BANK = {
        BANK_NAME: "",
        ACCOUNT_NAME: "",
        STATUS_CD: "",
        BANK_TYPE: "",
    };

    const [dataQRY_KCD_BANK_BANK_NAME, setDataQRY_KCD_BANK_BANK_NAME] =
        useState("");
    const [dataQRY_KCD_BANK_ACCOUNT_NAME, setDataQRY_KCD_BANK_ACCOUNT_NAME] =
        useState("");

    const [datasQRY_KCD_BANK_STATUS_CD, setDatasQRY_KCD_BANK_STATUS_CD] =
        useState([]);
    const [dataQRY_KCD_BANK_STATUS_CD, setDataQRY_KCD_BANK_STATUS_CD] =
        useState({});

    const [datasQRY_KCD_BANK_BANK_TYPE, setDatasQRY_KCD_BANK_BANK_TYPE] =
        useState([]);
    const [dataQRY_KCD_BANK_BANK_TYPE, setDataQRY_KCD_BANK_BANK_TYPE] =
        useState({});

    const [datasQRY_KCD_BANK_VENDOR_CD, setDatasQRY_KCD_BANK_VENDOR_CD] =
        useState([]);
    const [dataQRY_KCD_BANK_VENDOR_CD, setDataQRY_KCD_BANK_VENDOR_CD] =
        useState({});

    const get_dataQRY_KCD_BANK = () => ({
        ...dataQRY_KCD_BANK,
        BANK_NAME: dataQRY_KCD_BANK_BANK_NAME,
        ACCOUNT_NAME: dataQRY_KCD_BANK_ACCOUNT_NAME,
        STATUS_CD: dataQRY_KCD_BANK_STATUS_CD.CD_CODE,
        BANK_TYPE: dataQRY_KCD_BANK_BANK_TYPE.CD_CODE,
    });
    const put_dataQRY_KCD_BANK = (argData) => {
        setDataQRY_KCD_BANK_BANK_NAME(argData.BANK_NAME);
        setDataQRY_KCD_BANK_ACCOUNT_NAME(argData.ACCOUNT_NAME);
        setSelectedOption(
            datasQRY_KCD_BANK_STATUS_CD,
            setDataQRY_KCD_BANK_STATUS_CD,
            argData.STATUS_CD,
        );
        setSelectedOption(
            datasQRY_KCD_BANK_BANK_TYPE,
            setDataQRY_KCD_BANK_BANK_TYPE,
            argData.BANK_TYPE,
        );
    };

    const onKeyPress_QRY_KCD_BANK = (e, name) => {
        if (e.key === "Enter") {
            if (name === "BANK_NAME") search_LIST_1();
            if (name === "VENDOR_NAME") search_LIST_2();
        }
    };

    const [loading, setLoading] = useState(false);

    let dataEDT_KCD_BANK = {
        BANK_CD: "",
        BANK_NAME: "",
        ACCOUNT_NAME: "",
        ACCOUNT_NO: "",
        BANK_TYPE1: "",
        BANK_BRANCH: "",
        SFTCODE: "",
        ADDR1: "",
        STATUS_CD: "",
        UPD_USER: "",
    };

    const [saveFILE_INFO, setSaveFILE_INFO] = useState({});

    const [dataEDT_KCD_BANK_BANK_CD, setDataEDT_KCD_BANK_BANK_CD] =
        useState("");
    const [dataEDT_KCD_BANK_BANK_NAME, setDataEDT_KCD_BANK_BANK_NAME] =
        useState("");
    const [dataEDT_KCD_BANK_ACCOUNT_NAME, setDataEDT_KCD_BANK_ACCOUNT_NAME] =
        useState("");
    const [dataEDT_KCD_BANK_ACCOUNT_NO, setDataEDT_KCD_BANK_ACCOUNT_NO] =
        useState("");

    const [datasEDT_KCD_BANK_BANK_TYPE1, setDatasEDT_KCD_BANK_BANK_TYPE1] =
        useState([]);
    const [dataEDT_KCD_BANK_BANK_TYPE1, setDataEDT_KCD_BANK_BANK_TYPE1] =
        useState({});

    const [dataEDT_KCD_BANK_BANK_BRANCH, setDataEDT_KCD_BANK_BANK_BRANCH] =
        useState("");
    const [dataEDT_KCD_BANK_SFTCODE, setDataEDT_KCD_BANK_SFTCODE] =
        useState("");
    const [dataEDT_KCD_BANK_ADDR1, setDataEDT_KCD_BANK_ADDR1] = useState("");

    const [datasEDT_KCD_BANK_STATUS_CD, setDatasEDT_KCD_BANK_STATUS_CD] =
        useState([]);
    const [dataEDT_KCD_BANK_STATUS_CD, setDataEDT_KCD_BANK_STATUS_CD] =
        useState({});

    const [dataEDT_KCD_BANK_UPD_USER, setDataEDT_KCD_BANK_UPD_USER] =
        useState("");

    const get_dataEDT_KCD_BANK = () => ({
        ...dataEDT_KCD_BANK,
        BANK_CD: dataEDT_KCD_BANK_BANK_CD,
        BANK_NAME: dataEDT_KCD_BANK_BANK_NAME,
        ACCOUNT_NAME: dataEDT_KCD_BANK_ACCOUNT_NAME,
        ACCOUNT_NO: dataEDT_KCD_BANK_ACCOUNT_NO,
        BANK_TYPE1: dataEDT_KCD_BANK_BANK_TYPE1.CD_CODE,
        BANK_BRANCH: dataEDT_KCD_BANK_BANK_BRANCH,
        SFTCODE: dataEDT_KCD_BANK_SFTCODE,
        ADDR1: dataEDT_KCD_BANK_ADDR1,
        STATUS_CD: dataEDT_KCD_BANK_STATUS_CD.CD_CODE,
        UPD_USER: dataEDT_KCD_BANK_UPD_USER,
    });

    const put_dataEDT_KCD_BANK = (argData) => {
        if (!argData) return;

        setDataEDT_KCD_BANK_BANK_CD(argData.BANK_CD);
        setDataEDT_KCD_BANK_BANK_NAME(argData.BANK_NAME);
        setDataEDT_KCD_BANK_ACCOUNT_NAME(argData.ACCOUNT_NAME);
        setDataEDT_KCD_BANK_ACCOUNT_NO(argData.ACCOUNT_NO);
        setSelectedOption(
            datasEDT_KCD_BANK_BANK_TYPE1,
            setDataEDT_KCD_BANK_BANK_TYPE1,
            argData.BANK_TYPE1,
        );
        setDataEDT_KCD_BANK_BANK_BRANCH(argData.BANK_BRANCH);
        setDataEDT_KCD_BANK_SFTCODE(argData.SFTCODE);
        setDataEDT_KCD_BANK_ADDR1(argData.ADDR1);
        setSelectedOption(
            datasEDT_KCD_BANK_STATUS_CD,
            setDataEDT_KCD_BANK_STATUS_CD,
            argData.STATUS_CD,
        );
        setDataEDT_KCD_BANK_UPD_USER(argData.UPD_USER);
        toggleSwiftCodeInput(argData.BANK_TYPE1);
    };

    let emptyTBL_KCD_BANK = {};

    const [datasTBL_KCD_BANK, setDatasTBL_KCD_BANK] = useState([]);
    const [dataTBL_KCD_BANK, setDataTBL_KCD_BANK] = useState(emptyTBL_KCD_BANK);
    const [selectedTBL_KCD_BANK, setSelectedTBL_KCD_BANK] =
        useState(emptyTBL_KCD_BANK);
    const [loadingTBL_KCD_BANK, setLoadingTBL_KCD_BANK] = useState(false);

    const editTBL_KCD_BANK = (argData) => {
        put_dataEDT_KCD_BANK(argData);
    };

    const onRowClick1TBL_KCD_BANK = (argData0) => {
        const argData = getFirstRow(argData0);
        editTBL_KCD_BANK(argData);
        setDataTBL_KCD_BANK(argData);
        search_LIST_3(argData);
    };

    const exportExcelTBL_KCD_BANK = () => {
        exportExcel(datasTBL_KCD_BANK, "공장목록");
    };

    let emptyTBL_KCD_VENDOR = {};

    const [datasTBL_KCD_VENDOR, setDatasTBL_KCD_VENDOR] = useState([]);
    const [dataTBL_KCD_VENDOR, setDataTBL_KCD_VENDOR] =
        useState(emptyTBL_KCD_VENDOR);
    const [selectedTBL_KCD_VENDOR, setSelectedTBL_KCD_VENDOR] = useState([]);
    const [loadingTBL_KCD_VENDOR, setLoadingTBL_KCD_VENDOR] = useState(false);

    const onRowClick1TBL_KCD_VENDOR = (argData0) => {
        const argData = getFirstRow(argData0);
        setDataTBL_KCD_VENDOR(argData);
    };

    const process_RESET = () => {
        put_dataQRY_KCD_BANK(dataQRY_KCD_BANK);
        put_dataEDT_KCD_BANK(dataEDT_KCD_BANK);

        setDatasTBL_KCD_BANK([]);
        setSelectedTBL_KCD_BANK(emptyTBL_KCD_BANK);
        setDataTBL_KCD_BANK(emptyTBL_KCD_BANK);

        resetVendorGrid();
    };

    const GW_WINDOW_NAME = "GW_VENDOR_BANK_POPUP";
    const gwWinRef = useRef(null);
    const process_GW = () => {
        if (gwWinRef.current?.closed === false) {
            alert("이미 열려 있는 창이 있습니다.<br><br>There is already a window open.");
            gwWinRef.current.focus();
            return;
        }

        var tRetDate = serviceLib.getCurrDate();
        var tUserInfo = serviceLib.getUserInfo();

        if (
            selectedTBL_KCD_VENDOR.length <= 0 ||
            !selectedTBL_KCD_BANK?.BANK_CD
        ) {
            alert("GW 처리할 은행과 Supplier가 선택되지 않았습니다<br><br>GW Processing bank and supplier have not been selected");
            return;
        }

        var tInData1 = [...selectedTBL_KCD_VENDOR];
        var tInData2 = { ...selectedTBL_KCD_BANK };

        if (tInData2.fileName !== "") {
        } else {
            alert("계좌사본이 등록되지 않아 GW를 처리할수 없습니다<br><br>GW cannot be processed because the account copy is not registered.");
            return;
        }

        if (tInData1[0].GW_N === "종결" || tInData1[0].GW_N === "상신") {
            alert("종결/상신중인 계좌는 상신 할수 없습니다<br><br>Accounts that are closed/in the process of renewal cannot be renewed.");
            return;
        }

        var tPostObj = {};
        tPostObj.vendor_cd = "";
        tInData1.forEach((col, i) => {
            if (i === 0) tPostObj.vendor_cd = col.VENDOR_CD;
            else tPostObj.vendor_cd = ":" + col.VENDOR_CD;
        });

        delete tUserInfo.company_code;

        console.log(tInData2);
        console.log(tInData2.BANK_CD);

        let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
        axios
            .post(
                `${_url1}request_gw_vendor/${tInData2.BANK_CD}/${tRetDate}/${tUserInfo.USER_ID}`,
                tPostObj,
            )
            .then((response) => {
                console.log(response.data);
                console.log(
                    "GW RES DATA: " +
                        response.data.data.ADDRESS +
                        "=>" +
                        response.data.data.APPROKEY,
                );

                gwWinRef.current = window.open(
                    response.data.data.ADDRESS,
                    GW_WINDOW_NAME,
                );

                const timer = setInterval(() => {
                    if (gwWinRef.current?.closed) {
                        gwWinRef.current = null;
                        clearInterval(timer);
                    }
                }, 500);

                var tInData2_0 = { ...selectedTBL_KCD_BANK };

                let _inData = {};
                _inData.BANK_CD = tInData2_0.BANK_CD;
                setDatasTBL_KCD_VENDOR([]);
                setSelectedTBL_KCD_VENDOR([]);
                search_LIST_3(_inData);
            });
    };

    const search_LIST_1 = () => {
        var tInput = get_dataQRY_KCD_BANK();

        var tSelObj = { ...selectedTBL_KCD_BANK };

        setDatasTBL_KCD_BANK([]);
        setSelectedTBL_KCD_BANK(emptyTBL_KCD_BANK);

        setLoadingTBL_KCD_BANK(true);
        serviceS0110_KCD_BANK_QRY.mgrQuery_LIST_1(tInput).then((data) => {
            setLoadingTBL_KCD_BANK(false);
            if (typeof data.graphQLErrors === "undefined") {
                setDatasTBL_KCD_BANK(toIndexedRows(data));
                setSelectedTBL_KCD_BANK(tSelObj);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2 = () => {
        var tInput = { VENDOR_CD: "" };
        var tArray = [];
        var tObj = {};
        tObj.VENDOR_CD = "";
        tObj.VENDOR_NAME = "";
        tArray.push(tObj);
        setDatasQRY_KCD_BANK_VENDOR_CD(tArray);
        setDataQRY_KCD_BANK_VENDOR_CD(tArray[0]);

        serviceS0110_KCD_BANK_QRY.mgrQuery_LIST_2(tInput).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                const rows = toIndexedRows(data);
                setDatasQRY_KCD_BANK_VENDOR_CD(rows);
                setDataQRY_KCD_BANK_VENDOR_CD(rows[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_3 = (argData) => {
        var tInput = {};
        tInput.BANK_CD = argData?.BANK_CD;

        resetVendorGrid();

        setLoadingTBL_KCD_VENDOR(true);

        serviceS0110_KCD_BANK_QRY.mgrQuery_LIST_3(tInput).then((data) => {
            setLoadingTBL_KCD_VENDOR(false);
            if (typeof data.graphQLErrors === "undefined") {
                setDatasTBL_KCD_VENDOR(toIndexedRows(data));
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const process_INSERT = async () => {
        var tRetDate = serviceLib.getCurrDate();
        var tUserInfo = serviceLib.getUserInfo();

        if (
            !dataEDT_KCD_BANK_BANK_NAME ||
            !dataEDT_KCD_BANK_ACCOUNT_NAME ||
            !dataEDT_KCD_BANK_ACCOUNT_NO ||
            !dataEDT_KCD_BANK_BANK_TYPE1.CD_CODE
        ) {
            alert("Check mandatory values. (*red items)");
            return;
        }

        console.log(dataTBL_KCD_BANK);

        if (!dataTBL_KCD_BANK.fileName) {
            alert("Bank Copy is a mandatory value.");
            return;
        }

        if (dataEDT_KCD_BANK_BANK_TYPE1.CD_CODE === "2") {
            // 외화
            if (dataEDT_KCD_BANK_SFTCODE === "") {
                alert("SWIFT/IBAN is a mandatory value.");
                return;
            }
        }

        if (dataEDT_KCD_BANK_BANK_CD && dataEDT_KCD_BANK_BANK_CD !== "") {
            if (
                await confirm("다시 GW 상신 받아야 합니다. 진행하시겠습니까?<br><br>I need to get a GW award again. Do you want to proceed?")
            ) {
                process_UPDATE_BANK();
            }
        } else {
            process_INSERT_BANK();
        }
    };

    const process_INSERT_BANK = () => {
        var tInData1 = get_dataEDT_KCD_BANK();
        tInData1.REG_USER = serviceLib.getUserInfo().USER_ID;

        if (
            typeof dataTBL_KCD_BANK.fileName !== "undefined" &&
            dataTBL_KCD_BANK.fileName !== ""
        ) {
            tInData1.imgURL = dataTBL_KCD_BANK.imgURL;
            tInData1.fileName = dataTBL_KCD_BANK.fileName;
            tInData1.objectName = dataTBL_KCD_BANK.objectName;
        } else {
            tInData1.imgURL = "";
            tInData1.fileName = "";
            tInData1.objectName = "";
        }

        setLoadingTBL_KCD_BANK(true);
        serviceS0110_KCD_BANK_QRY
            .mgrInsert_INSERT_BANK(tInData1)
            .then((data) => {
                setLoadingTBL_KCD_BANK(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        if (data.length > 0) {
                            process_RESET();
                            alert(data[0].CODE);
                            search_LIST_1();
                        }
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR:Insert Bank",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_INSERT_VENDOR = () => {
        var tInData1 = get_dataEDT_KCD_BANK();
        if (tInData1.BANK_CD === "") {
            alert("등록된 Bank에 대해서만 Supplier추가가능합니다<br><br>Suppliers can only be added to registered banks.");
            return;
        }
        tInData1.REG_USER = serviceLib.getUserInfo().USER_ID;

        var tInData2_0 = { ...dataTBL_KCD_VENDOR };
        var tInData2 = {};
        tInData2.VENDOR_CD = dataQRY_KCD_BANK_VENDOR_CD.VENDOR_CD;

        serviceS0110_KCD_BANK_QRY
            .mgrInsert_UPDATE_VENDOR(tInData1, tInData2)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        alert(data[0].CODE);
                        let _inData = {};
                        _inData.BANK_CD = tInData1.BANK_CD;
                        setDatasTBL_KCD_VENDOR([]);
                        setSelectedTBL_KCD_VENDOR([]);
                        search_LIST_3(_inData);
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR:Insert Vendor",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_DELETE_VENDOR = async () => {
        if (
            selectedTBL_KCD_VENDOR.length <= 0 ||
            !selectedTBL_KCD_BANK?.BANK_CD
        )
            return;

        var tInData1 = { ...selectedTBL_KCD_VENDOR[0] };
        var tInData2 = { ...selectedTBL_KCD_BANK };

        console.log(tInData1);

        if (
            tInData1.GW_N === "응답대기" ||
            tInData1.GW_N === "" ||
            tInData1.GW_N === "반려" ||
            tInData1.GW_N === "NEW"
        ) {
            if (!(await confirm("GW 상태가 응답대기인것을 삭제 하시겠습니까?<br><br>Do you want to delete the GW status of waiting for response?")))
                return;
        } else {
            alert("GW 상태가 New, 응답대기, 반려만 삭제가능합니다.<br><br>Only GW status of New, waiting for response, or rejected can be deleted.");
            return;
        }

        var tObj = {};
        tObj.BANK_CD = tInData2.BANK_CD;
        tObj.VENDOR_CD = tInData1.VENDOR_CD;

        serviceS0110_KCD_BANK_QRY.mgrInsert_DELETE_VENDOR(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (typeof data.length === "undefined") {
                } else {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        let _inData = {};
                        _inData.BANK_CD = tObj.BANK_CD;
                        setDatasTBL_KCD_VENDOR([]);
                        setSelectedTBL_KCD_VENDOR([]);
                        search_LIST_3(_inData);
                    }
                    // console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "ERROR:Insert Vendor",
                    detail: JSON.stringify(data.graphQLErrors),
                    life: 3000,
                });
            }
        });
    };

    const process_UPDATE_BANK = () => {
        var tInData1 = get_dataEDT_KCD_BANK();
        tInData1.imgURL = dataTBL_KCD_BANK.imgURL;
        tInData1.fileName = dataTBL_KCD_BANK.fileName;
        tInData1.objectName = dataTBL_KCD_BANK.objectName;
        serviceS0110_KCD_BANK_QRY
            .mgrInsert_UPDATE_BANK(tInData1)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        if (data.length > 0) {
                            process_RESET();
                            alert(data[0].CODE);
                            search_LIST_1();
                        }
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR:Update Buyer",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_DELETE_BANK = () => {
        var tInData1 = get_dataEDT_KCD_BANK();
        let tInDataVendor = { ...datasTBL_KCD_VENDOR[0] };

        let deleteData = {
            VENDOR_CD: tInDataVendor.VENDOR_CD,
            BANK_CD: tInData1.BANK_CD,
        };

        if (datasTBL_KCD_VENDOR.length > 0) {
            alert("은행에 등록된 Supplier가 있어 삭제가 불가합니다<br><br>There is a supplier registered with the bank and cannot be deleted.");
            return;
        }

        serviceS0110_KCD_BANK_QRY
            .mgrInsert_DELETE_BANK(deleteData)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            process_RESET();
                            search_LIST_1();
                        }
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR:Delete Bank",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    /*File Upload */
    const [dataUrl, setDataUrl] = useState("");

    const s3FileUpload = async (e) => {
        // console.log('s3');
        // console.log(e.target);
        const fileName = e.target.files[0].name;
        const img = e.target.files[0];
        //console.log(img);
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
            console.log(selectedTBL_KCD_BANK);
            //  search_LIST_1();

            let _dataKCD_BANK = { ...dataTBL_KCD_BANK };
            _dataKCD_BANK.imgURL = imgURL;
            _dataKCD_BANK.fileName = fileName;
            _dataKCD_BANK.objectName = objectName;
            setDataTBL_KCD_BANK(_dataKCD_BANK);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setDataEDT_KCD_BANK_UPD_USER(serviceLib.getUserInfo().USER_ID);
        put_dataQRY_KCD_BANK(dataQRY_KCD_BANK);

        var _tObj = { ...dataQRY_KCD_BANK };

        serviceS0110_KCD_BANK_QRY.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KCD_BANK_STATUS_CD(data.QRY_STATUS_CD);
                setDataQRY_KCD_BANK_STATUS_CD(data.QRY_STATUS_CD[0]);

                setDatasEDT_KCD_BANK_STATUS_CD(data.QRY_STATUS_CD);
                setDataEDT_KCD_BANK_STATUS_CD(data.QRY_STATUS_CD[0]);

                setDatasQRY_KCD_BANK_BANK_TYPE(data.BANK_TYPE1);
                setDataQRY_KCD_BANK_BANK_TYPE(data.BANK_TYPE1[0]);

                setDatasEDT_KCD_BANK_BANK_TYPE1(data.BANK_TYPE1);
                setDataEDT_KCD_BANK_BANK_TYPE1(data.BANK_TYPE1[0]);

                var tArray = [];
                var tObj = {};
                tObj.VENDOR_CD = "";
                tObj.VENDOR_NAME = " ";
                tArray.push(tObj);
                setDatasQRY_KCD_BANK_VENDOR_CD(tArray);
                setDataQRY_KCD_BANK_VENDOR_CD(tArray[0]);
            } else {
                console.log(data);
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        search_LIST_1();
        search_LIST_2();
    }, []);

    const onDropdownChangeQRY_KCD_BANK_VENDOR_CD = (e, name) => {
        if (typeof e.value === "string") {
            var tArray = [];
            var tObj = {};
            var tVal = e.value;
            tObj.VENDOR_CD = e.value;
            if (tVal === "") tObj.VENDOR_NAME = " ";
            else tObj.VENDOR_NAME = e.value;
            tArray.push(tObj);
            setDatasQRY_KCD_BANK_VENDOR_CD(tArray);
            setDataQRY_KCD_BANK_VENDOR_CD(tObj);
        } else if (e.value == null) {
            var tArray = [];
            var tObj = {};
            var tVal = "";
            tObj.VENDOR_CD = " ";
            tArray.push(tObj);
            setDatasQRY_KCD_BANK_VENDOR_CD(tArray);
            setDataQRY_KCD_BANK_VENDOR_CD(tObj);
        } else {
            setDataQRY_KCD_BANK_VENDOR_CD(e.value);
        }
    };

    const onDownloadFile = () => {
        let fileName = dataTBL_KCD_BANK.fileName;
        let url = "";

        if (dataTBL_KCD_BANK.imgURL) url = dataTBL_KCD_BANK.imgURL;

        if (dataTBL_KCD_BANK.fileUrl) url = dataTBL_KCD_BANK.fileUrl;

        if (!url) {
            alert("Not exist attached file!");
            return;
        }

        serviceLib.downloadFile(url, fileName);
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", marginLeft: "0rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "24rem" }}>
                    <p
                        className="af-span-p"
                        style={{ width: "8rem", display: "inline-block" }}
                    >Bank Name</p>
                    <div className="af-span-div">
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "15rem",
                            }}
                            value={dataQRY_KCD_BANK_BANK_NAME}
                            onChange={(e) =>
                                setDataQRY_KCD_BANK_BANK_NAME(e.target.value)
                            }
                            placeholder=""
                            onKeyPress={(e) =>
                                onKeyPress_QRY_KCD_BANK(e, "BANK_NAME")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "24rem" }}>
                    <p
                        className="af-span-p"
                        style={{ width: "8rem", display: "inline-block" }}
                    >Account Name</p>
                    <div className="af-span-div">
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "15rem",
                            }}
                            value={dataQRY_KCD_BANK_ACCOUNT_NAME}
                            onChange={(e) =>
                                setDataQRY_KCD_BANK_ACCOUNT_NAME(e.target.value)
                            }
                            placeholder=""
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p
                        className="af-span-p"
                        style={{ width: "8rem", display: "inline-block" }}
                    >Status</p>
                    <div
                        className="af-span-div"
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Dropdown
                            id="id_QryStatus"
                            value={dataQRY_KCD_BANK_STATUS_CD}
                            onChange={(e) =>
                                setDataQRY_KCD_BANK_STATUS_CD(e.target.value)
                            }
                            options={datasQRY_KCD_BANK_STATUS_CD}
                            optionLabel="CD_NAME"
                            placeholder="All"
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p
                        className="af-span-p"
                        style={{ width: "8rem", display: "inline-block" }}
                    >Currency</p>
                    <div
                        className="af-span-div"
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Dropdown
                            id="id_QryStatus"
                            value={dataQRY_KCD_BANK_BANK_TYPE}
                            onChange={(e) =>
                                setDataQRY_KCD_BANK_BANK_TYPE(e.target.value)
                            }
                            options={datasQRY_KCD_BANK_BANK_TYPE}
                            optionLabel="CD_NAME"
                            placeholder="All"
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
                            onClick={process_RESET}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Excel"
                            className="p-button-text green"
                            onClick={exportExcelTBL_KCD_BANK}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{
                    marginLeft: "0",
                    width: "123rem",
                    marginTop: "0.5rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_kcd_bank}
                    size="small"
                    value={datasTBL_KCD_BANK}
                    resizableColumns
                    tableStyle={{ tableLayout: "fixed" }}
                    selection={selectedTBL_KCD_BANK}
                    loading={loadingTBL_KCD_BANK}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KCD_BANK(e.value);
                        onRowClick1TBL_KCD_BANK(e.value);
                    }}
                    columnResizeMode="expand"
                    showGridlines
                    dataKey="id"
                    className="datatable-responsive"
                    emptyMessage=" "
                    responsiveLayout="scroll"
                    scrollable
                >
                    <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "1rem" }} ></AFColumn>
                    <AFColumn field="BANK_CD" headerClassName="t-header" header="Bank #" headerStyle={{ textAlign: "center", justifContent: "center", }} style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BANK_NAME" headerClassName="t-header" header="Bank_Name" headerStyle={{ textAlign: "center", justifyContent: "center", }} style={{ width: "20rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BANK_BRANCH" headerClassName="t-header" header="Bank Branch" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ACCOUNT_NAME" headerClassName="t-header" header="Account Name" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ACCOUNT_NO" headerClassName="t-header" header="Account NO" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SFTCODE" headerClassName="t-header" header="SWIFT Code" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ADDR1" headerClassName="t-header" header="Address" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="bank_typeName" header="Currency" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STATUS_CD_N" headerClassName="t-header" header="Status" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="fileName" headerClassName="t-header" header="File" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>
            <div
                style={{
                    marginTop: "0.5rem",
                    width: "123rem",
                    height: "28rem",
                }}
            >
                <div
                    className="af-div-first"
                    style={{
                        marginLeft: "0rem",
                        width: "58rem",
                        height: "28rem",
                        background: "white",
                        float: "left",
                    }}
                >
                    <span
                        style={{
                            height: "2rem",
                            display: "block",
                            width: "36rem",
                            marginTop: "0.5rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Bank #</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                            id="id_BANK_CD"
                            value={dataEDT_KCD_BANK_BANK_CD}
                            onChange={(e) =>
                                setDataEDT_KCD_BANK_BANK_CD(e.target.value)
                            }
                            disabled
                        />
                    </span>
                    <span
                        style={{
                            height: "2rem",
                            display: "block",
                            width: "36rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block", color: "red", }}>*Bank Name</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                            id="id_BANK_NAME"
                            value={dataEDT_KCD_BANK_BANK_NAME}
                            onChange={(e) =>
                                setDataEDT_KCD_BANK_BANK_NAME(e.target.value)
                            }
                        />
                    </span>
                    <span
                        style={{
                            height: "2rem",
                            display: "block",
                            width: "36rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block", color: "red", }}>*Account Name</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                            id="id_ACCOUNT_NAME"
                            value={dataEDT_KCD_BANK_ACCOUNT_NAME}
                            onChange={(e) =>
                                setDataEDT_KCD_BANK_ACCOUNT_NAME(e.target.value)
                            }
                        />
                    </span>
                    <span
                        style={{
                            height: "2rem",
                            display: "block",
                            width: "36rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block", color: "red", }}>*Account NO</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                            id="id_ACCOUNT_NO"
                            value={dataEDT_KCD_BANK_ACCOUNT_NO}
                            onChange={(e) =>
                                setDataEDT_KCD_BANK_ACCOUNT_NO(e.target.value)
                            }
                        />
                    </span>
                    <span
                        style={{
                            height: "2rem",
                            display: "block",
                            width: "36rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block", color: "red", }}>*Currency</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                        >
                            <Dropdown
                                style={{ width: "23rem" }}
                                value={dataEDT_KCD_BANK_BANK_TYPE1}
                                onChange={(e) => {
                                    setDataEDT_KCD_BANK_BANK_TYPE1(
                                        e.target.value,
                                    );
                                    toggleSwiftCodeInput(
                                        e.target.value?.CD_CODE,
                                    );
                                }}
                                options={datasEDT_KCD_BANK_BANK_TYPE1}
                                optionLabel="CD_NAME"
                                placeholder="All"
                            />
                        </div>
                    </span>
                    <span
                        style={{
                            height: "2rem",
                            display: "block",
                            width: "36rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Bank Branch</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                            id="id_BANK_BRANCH"
                            value={dataEDT_KCD_BANK_BANK_BRANCH}
                            onChange={(e) =>
                                setDataEDT_KCD_BANK_BANK_BRANCH(e.target.value)
                            }
                        />
                    </span>
                    <span
                        id="sftCodeInput"
                        style={{
                            height: "2rem",
                            display: "none",
                            width: "36rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }} className="red" >*SWIFT/IBAN</p> <InputText style={{ marginLeft: "0.5rem", display: "inline-block", width: "23rem", }} id="id_SFTCODE" value={dataEDT_KCD_BANK_SFTCODE} onChange={(e) => setDataEDT_KCD_BANK_SFTCODE(e.target.value) } /> </span> <span style={{ height: "2rem", display: "block", width: "36rem", }} > <p style={{ width: "8rem", display: "inline-block" }}>Address</p> <InputText style={{ marginLeft: "0.5rem", display: "inline-block", width: "23rem", }} value={dataEDT_KCD_BANK_ADDR1} onChange={(e) => setDataEDT_KCD_BANK_ADDR1(e.target.value) } /> </span> <span style={{ height: "2rem", display: "block", width: "36rem", }} > <p style={{ width: "8rem", display: "inline-block" }}>Status</p> <Dropdown id="id_STATUS_CD" style={{ marginLeft: "0.5rem", width: "23rem" }} value={dataEDT_KCD_BANK_STATUS_CD} onChange={(e) => setDataEDT_KCD_BANK_STATUS_CD(e.target.value) } options={datasEDT_KCD_BANK_STATUS_CD} optionLabel="CD_NAME" placeholder="All" ></Dropdown> </span> <span style={{ height: "2rem", display: "block", width: "36rem", }} > <p style={{ width: "8rem", display: "inline-block" }}>Update User</p> <InputText disabled style={{ marginLeft: "0.5rem", display: "inline-block", width: "23rem", }} id="id_UPD_USER" value={dataEDT_KCD_BANK_UPD_USER} onChange={(e) => setDataEDT_KCD_BANK_UPD_USER(e.target.value) } /> </span> <span style={{ height: "3rem", display: "block", width: "55rem", marginTop: "0rem", }} > <p style={{ width: "8rem", display: "inline-block" }} className="red" >*Bank Copy</p> <div style={{ marginLeft: "0.5rem", display: "inline-block", width: "23rem", }} > <p style={{ width: "23rem", height: "20px", display: "inline-block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", border: "1px solid #d9d9d9", }}>{dataTBL_KCD_BANK.fileName}</p>
                        </div>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "9rem",
                            }}
                        >
                            <label
                                htmlFor="inputFile"
                                className="file-upload-btn"
                            >
                                File Upload
                            </label>
                            <input
                                type="file"
                                id="inputFile"
                                onClick={(e) => {
                                    e.target.value = null;
                                }}
                                onChange={s3FileUpload}
                                style={{ display: "none" }}
                            />
                        </div>
                        <div
                            style={{
                                marginLeft: "0rem",
                                display: "inline-block",
                                width: "9rem",
                            }}
                        >
                            <button
                                style={{ marginLeft: "1rem", width: "9rem" }}
                                onClick={onDownloadFile}
                            >
                                File download
                            </button>
                        </div>
                    </span>

                    <div style={{ marginLeft: "40px", marginTop: "10px" }}>
                        <Button
                            style={{ display: "inline-block", width: "9rem" }}
                            label="Save"
                            className="p-button-text"
                            onClick={process_INSERT}
                        />

                        <Button
                            style={{ display: "inline-block", width: "9rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={process_RESET}
                        />

                        <Button
                            style={{ display: "inline-block", width: "9rem" }}
                            label="Delete"
                            className="p-button-text"
                            onClick={process_DELETE_BANK}
                        />
                    </div>
                </div>

                <div
                    className="af-div-first"
                    style={{
                        marginLeft: "0.5rem",
                        width: "64.5rem",
                        height: "28rem",
                        float: "left",
                    }}
                >
                    <div
                        style={{
                            marginTop: "0.5rem",
                            marginLeft: "0rem",
                            width: "57.5rem",
                            backgroundColor: "white",
                            height: "4rem",
                        }}
                    >
                        <span
                            style={{
                                marginLeft: "1rem",
                                marginTop: "1rem",
                                float: "left",
                                display: "inline-block",
                                height: "2rem",
                                width: "23rem",
                                display: "flex",
                            }}
                        >
                            <p style={{ width: "4rem" }}> Supplier </p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "18rem",
                                }}
                            >
                                <Dropdown
                                    id="id_STATUS_CD"
                                    style={{ width: "18rem" }}
                                    value={dataQRY_KCD_BANK_VENDOR_CD}
                                    onChange={(e) =>
                                        onDropdownChangeQRY_KCD_BANK_VENDOR_CD(
                                            e,
                                        )
                                    }
                                    options={datasQRY_KCD_BANK_VENDOR_CD}
                                    filter
                                    optionLabel="VENDOR_NAME"
                                    placeholder=""
                                ></Dropdown>
                            </div>
                        </span>
                        <span
                            style={{
                                marginTop: "1rem",
                                float: "left",
                                display: "inline-block",
                                height: "2rem",
                                width: "32rem",
                            }}
                        >
                            <Button
                                style={{ width: "3rem" }}
                                label=""
                                icon="pi pi-refresh"
                                className="p-button-text"
                                onClick={search_LIST_2}
                            />

                            <Button
                                style={{ width: "8rem" }}
                                label="Add"
                                className="p-button-text"
                                onClick={process_INSERT_VENDOR}
                            />

                            <Button
                                style={{ width: "9em" }}
                                label="Remove"
                                className="p-button-text"
                                onClick={process_DELETE_VENDOR}
                            />

                            <Button
                                style={{ width: "8em" }}
                                label="GW"
                                className="p-button-text orange"
                                onClick={process_GW}
                            />
                        </span>
                    </div>
                    <div
                        style={{
                            marginLeft: "0rem",
                            width: "64.5rem",
                            height: "15rem",
                        }}
                    >
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_kcd_vendor}
                            size="small"
                            value={datasTBL_KCD_VENDOR}
                            resizableColumns
                            columnResizeMode="expand"
                            tableStyle={{ tableLayout: "fixed" }}
                            selectionMode="checkbox"
                            selection={selectedTBL_KCD_VENDOR}
                            onSelectionChange={(e) => {
                                setSelectedTBL_KCD_VENDOR(e.value);
                                onRowClick1TBL_KCD_VENDOR(e.value);
                            }}
                            dataKey="id"
                            className="datatable-responsive"
                            showGridlines
                            emptyMessage=" "
                            loading={loadingTBL_KCD_VENDOR}
                            responsiveLayout="scroll"
                            virtualScrollerOptions={{ itemSize: 20 }}
                            scrollHeight="flex"
                        >
                            <AFColumn field="VENDOR_CD" headerClassName="t-header" header="Supplier CD" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                            <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier Name" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                            <AFColumn field="INVOICE_NAME" headerClassName="t-header" header="Invoice Name" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                            <AFColumn field="VENDOR_TYPE_N" headerClassName="t-header" header="Supplier Type" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                            <AFColumn field="GW_N" headerClassName="t-header" header="GW" headerStyle={{ width: "5rem", height: "1.8rem", }} bodyStyle={{ width: "5rem" }} ></AFColumn>
                        </AFDataTable>
                    </div>
                </div>
            </div>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(MgrKcdBank, comparisonFn);
