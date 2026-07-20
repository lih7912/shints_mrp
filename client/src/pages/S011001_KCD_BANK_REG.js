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
import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceMgr1KCD_BANK } from "../service/service_biz/ServiceMgr1KCD_BANK";
import { ServiceKCD_BANK } from "../service/service_mgrKcdBank/ServiceKCD_BANK";
import { ServiceKCD_CODE } from "../service/service_mgrKcdBank/ServiceKCD_CODE";
import { ServiceKCD_VENDOR } from "../service/service_mgrKcdBank/ServiceKCD_VENDOR";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { ScrollPanel } from "primereact/scrollpanel";

import { TabView, TabPanel } from "primereact/tabview";
import "./MgrKcdBank.scss";

const emptyKCD_VENDOR = {
    id: 0,
    VENDOR_CD: "",
    VENDOR_NAME: "",
    INVOICE_NAME: "",
    VENDOR_TYPE: "",
    SHINTS_USER: "",
    REG_NO: "",
    PRESIDENT: "",
    USER_NAME: "",
    PART: "",
    RANK1: "",
    EMAIL: "",
    TEL_NO: "",
    FAX_NO: "",
    PAY_TYPE: "",
    PAY_TERM: "",
    LEAD_TIME: "",
    BANK_CD: "",
    NAT_CD: "",
    ZIP_NO: "",
    ADDR1: "",
    ADDR2: "",
    STATUS_CD: "",
    PERMIT: "",
    VENDOR_MATL_TYPE: "",
    REG_USER: "",
    REG_DATETIME: "",
    UPD_USER: "",
    UPD_DATETIME: "",
    BANK1: "",
    BANK2: "",
    GW: "",
    APPROKEY: "",
    BANK_CD2: "",
    BANK_CD3: "",
    NEOE_NO: "",
    REMARK: "",
};

const emptyKCD_BANK = {
    id: 0,
    BANK_CD: "",
    BANK_NAME: "",
    ACCOUNT_NO: "",
    ACCOUNT_NAME: "",
    SFTCODE: "",
    ADDR1: "",
    ADDR2: "",
    BANK_TYPE: "",
    STATUS_CD: "",
    REG_USER: "",
    REG_DATETIME: "",
    UPD_USER: "",
    UPD_DATETIME: "",
    BANK_BRANCH: "",
    BANK_TYPE1: "",
};

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const MgrKcdBankReg = () => {
    //
    const [dataInVendorCd, setDataInVendorCd] = useState("");
    const [dataInBankCd, setDataInBankCd] = useState("");
    const [dataUrl, setDataUrl] = useState("");

    // Qry
    const [dataQryBankName, setDataQryBankName] = useState("");
    const [datasQryStatus, setDatasQryStatus] = useState([]);
    const [dataQryStatus, setDataQryStatus] = useState("");

    // Edit
    const [datasKCD_BANK_STATUS_CD, setDatasKCD_BANK_STATUS_CD] = useState([]);
    const [dataKCD_BANK_STATUS_CD, setDataKCD_BANK_STATUS_CD] = useState({});

    const [datasKCD_BANK_BANK_TYPE1, setDatasKCD_BANK_BANK_TYPE1] = useState(
        [],
    );
    const [dataKCD_BANK_BANK_TYPE1, setDataKCD_BANK_BANK_TYPE1] = useState({});

    const [dataTotCnt, setDataTotCnt] = useState(0);
    const [dataRegUser, setDataRegUser] = useState("testuser");

    const [qrySearchString, setQrySearchString] = useState("");
    const [qryStatus, setQryStatus] = useState(emptyKCD_CODE);

    const [regSTATUS_CD, setRegSTATUS_CD] = useState({});
    const [regBANK_TYPE1, setRegBANK_TYPE1] = useState({});

    const [datasKCD_BANK, setDatasKCD_BANK] = useState([]);
    const [datasKCD_VENDOR, setDatasKCD_VENDOR] = useState([]);
    const [datasKCD_CODE_STATUS_CD, setDatasKCD_CODE_STATUS_CD] = useState([]);
    const [datasKCD_CODE_BANK_TYPE1, setDatasKCD_CODE_BANK_TYPE1] = useState(
        [],
    );
    const [createDialog, setCreateDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteDatasDialog, setDeleteDatasDialog] = useState(false);
    const [dataKCD_BANK, setDataKCD_BANK] = useState(emptyKCD_BANK);
    const [selectedKCD_BANK, setSelectedKCD_BANK] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [flagModal, setFlagModal] = useState(false);
    const [flagSelectMode, setFlagSelectMode] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    const dt_vendor = useRef(null);

    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceMgr1KCD_BANKRef = useRef(null);
    if (!serviceMgr1KCD_BANKRef.current) serviceMgr1KCD_BANKRef.current = new ServiceMgr1KCD_BANK();
    const serviceMgr1KCD_BANK = serviceMgr1KCD_BANKRef.current;
    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* */
    useEffect(() => {
        let tVal = dataInBankCd;
        if (tVal === "") return;

        serviceMgr1KCD_BANK.mgr1KcdBank(dataInBankCd).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDataKCD_BANK(data[0]);
                onRowClick1(data[0]);
            } else {
                var tStr = data.graphQLErrors[0].message;
                toast.current.show({
                    severity: "success",
                    summary: "Query Error",
                    detail: tStr,
                    life: 3000,
                });
            }
        });
    }, [datasKCD_BANK_STATUS_CD, datasKCD_BANK_BANK_TYPE1]);

    useEffect(() => {
        let tDataInVendorCd = localStorage.getItem("AF_MGR_KCD_BANK_VENDOR_CD");
        let tDataInBankCd = localStorage.getItem("AF_MGR_KCD_BANK_BANK_CD");

        if (
            typeof tDataInVendorCd === "undefined" ||
            tDataInVendorCd === null
        ) {
            tDataInVendorCd = "V3339";
            // tDataInBankCd = 'B22-236';
            tDataInBankCd = "";
        }

        setDataInVendorCd(tDataInVendorCd);
        setDataInBankCd(tDataInBankCd);

        var tUrls = window.location.href.split("/");

        let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
        var tUrl = `${_url1}fileupload/bank/` + tDataInBankCd;
        setDataUrl(tUrl);

        serviceMgr1KCD_BANK.mgr1KcdBankCode("").then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "useEffect code: " +
                        data.T_KCD_CODE_STATUS_CD.length +
                        "," +
                        data.T_KCD_CODE_BANK_TYPE1.length,
                );
                setDatasQryStatus(data.T_KCD_CODE_STATUS_CD);
                setDatasKCD_BANK_STATUS_CD(data.T_KCD_CODE_STATUS_CD);
                setDatasKCD_BANK_BANK_TYPE1(data.T_KCD_CODE_BANK_TYPE1);
            } else {
                var tStr = data.graphQLErrors[0].message;
                toast.current.show({
                    severity: "success",
                    summary: "Query Error",
                    detail: tStr,
                    life: 3000,
                });
            }
        });
    }, []);

    const clearSelected = () => {
        setSelectedKCD_BANK([]);
        setFlagSelectMode(false);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setCreateDialog(false);
    };

    const hideDeleteDialog = () => {
        setDeleteDialog(false);
    };

    const hideDeleteDatasDialog = () => {
        clearSelected();
        setDeleteDatasDialog(false);
    };

    const searchKCD_BANK = () => {
        clearSelected();
        setCreateDialog(false);
        let _qryStr =
            "query value: " + qrySearchString + "=>" + qryStatus.CD_CODE;
        toast.current.show({
            severity: "success",
            summary: "Query",
            detail: _qryStr,
            life: 3000,
        });
        const serviceKCD_BANK = new ServiceKCD_BANK();
        serviceKCD_BANK
            .getDatasByParamKCD_BANK(qrySearchString, qryStatus.CD_CODE)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setDatasKCD_BANK(data);
                } else {
                    var tStr = data.graphQLErrors[0].message;
                    toast.current.show({
                        severity: "success",
                        summary: "Query Error",
                        detail: tStr,
                        life: 3000,
                    });
                }
            });
    };

    const copyKCD_BANK = () => {
        dataKCD_BANK.id = 0;
        saveKCD_BANK();
    };

    const saveKCD_BANK = () => {
        setSubmitted(true);

        if (typeof dataKCD_BANK.BANK_CD !== "") {
            let _datasKCD_BANK = [...datasKCD_BANK];
            let _dataKCD_BANK = { ...dataKCD_BANK };

            if (_dataKCD_BANK.BANK_CD !== "") {
                _dataKCD_BANK.UPD_USER = "ybwon";
            } else {
                _dataKCD_BANK.REG_USER = dataRegUser;
                _dataKCD_BANK.UPD_USER = "ybwon";
            }

            serviceMgr1KCD_BANK
                .mgr1KcdBankSave(_dataKCD_BANK, dataInVendorCd)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        toast.current.show({
                            severity: "success",
                            summary: "Update Succeed",
                            detail: "BANK_CD:" + data,
                            life: 3000,
                        });
                        _dataKCD_BANK.BANK_CD = data;
                        setDataKCD_BANK(_dataKCD_BANK);
                        onRowClick1(_dataKCD_BANK);

                        var tUrls = window.location.href.split("/");

                        let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
                        var tUrl =
                            `${_url1}fileupload/bank/` + _dataKCD_BANK.BANK_CD;
                        setDataUrl(tUrl);
                    } else {
                        var tStr = data.graphQLErrors[0].message;
                        toast.current.show({
                            severity: "success",
                            summary: "Query Error",
                            detail: tStr,
                            life: 3000,
                        });
                    }
                });

            setCreateDialog(false);
        }
    };

    const editKCD_BANK = (argKCD_BANK) => {
        // clearSelected();
        setDataKCD_BANK({ ...argKCD_BANK });

        editKCD_BANK_STATUS_CD(argKCD_BANK.STATUS_CD);
        editKCD_BANK_BANK_TYPE1(argKCD_BANK.BANK_TYPE1);

        setCreateDialog(true);
    };

    const onRowClick1 = (argData) => {
        let argKCD_BANK = argData;
        console.log(
            "RowClick =>" +
                argKCD_BANK.id +
                "," +
                argKCD_BANK.STATUS_CD +
                "," +
                argKCD_BANK.BANK_TYPE1,
        );
        editKCD_BANK(argKCD_BANK);

        const serviceKCD_VENDOR = new ServiceKCD_VENDOR();
        serviceKCD_VENDOR.qryBankCdKCD_VENDOR(argKCD_BANK).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasKCD_VENDOR(data);
            } else {
                var tStr = data.graphQLErrors[0].message;
                toast.current.show({
                    severity: "success",
                    summary: "Query Error",
                    detail: tStr,
                    life: 3000,
                });
            }
        });
    };

    const deleteKCD_BANK = () => {
        clearSelected();
        const serviceKCD_BANK = new ServiceKCD_BANK();
        let _dataKCD_BANK = { ...dataKCD_BANK };
        console.log("deleteKCD_BANK==>" + _dataKCD_BANK.id);
        serviceKCD_BANK.deleteDataKCD_BANK(_dataKCD_BANK).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                toast.current.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "KCD_BANK DELETE",
                    life: 3000,
                });
                serviceKCD_BANK
                    .getDatasKCD_BANK()
                    .then((data) => setDatasKCD_BANK(data.datas));
            } else {
                var tStr = data.graphQLErrors[0].message;
                toast.current.show({
                    severity: "success",
                    summary: "Query Error",
                    detail: tStr,
                    life: 3000,
                });
            }
        });

        // setDatasKCD_BANK(_datasKCD_BANK);
        setDeleteDialog(false);
        setDataKCD_BANK(emptyKCD_BANK);
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "KCD_BANK Deleted",
            life: 3000,
        });
    };

    // Qry

    // Edit
    const onInputChangeKCD_BANK_BANK_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BANK = { ...dataKCD_BANK };

        let tTypeVal = _dataKCD_BANK[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BANK[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BANK[`${name}`] = parseInt(val);

        setDataKCD_BANK(_dataKCD_BANK);
    };

    const onInputChangeKCD_BANK_BANK_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BANK = { ...dataKCD_BANK };

        let tTypeVal = _dataKCD_BANK[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BANK[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BANK[`${name}`] = parseInt(val);

        setDataKCD_BANK(_dataKCD_BANK);
    };

    const onInputChangeKCD_BANK_ACCOUNT_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BANK = { ...dataKCD_BANK };

        let tTypeVal = _dataKCD_BANK[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BANK[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BANK[`${name}`] = parseInt(val);

        setDataKCD_BANK(_dataKCD_BANK);
    };

    const onInputChangeKCD_BANK_ACCOUNT_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BANK = { ...dataKCD_BANK };

        let tTypeVal = _dataKCD_BANK[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BANK[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BANK[`${name}`] = parseInt(val);

        setDataKCD_BANK(_dataKCD_BANK);
    };

    const editKCD_BANK_BANK_TYPE1 = (argValue) => {
        let _dataKCD_BANK_BANK_TYPE1 = datasKCD_BANK_BANK_TYPE1.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_BANK_BANK_TYPE1(_dataKCD_BANK_BANK_TYPE1[0]);
    };

    const onDropdownChangeKCD_BANK_BANK_TYPE1 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_BANK = { ...dataKCD_BANK };

        let tTypeVal = _dataKCD_BANK[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_BANK[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_BANK[`${name}`] = parseInt(val);
        }

        setDataKCD_BANK(_dataKCD_BANK);
    };

    const onInputChangeKCD_BANK_SFTCODE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BANK = { ...dataKCD_BANK };

        let tTypeVal = _dataKCD_BANK[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BANK[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BANK[`${name}`] = parseInt(val);

        setDataKCD_BANK(_dataKCD_BANK);
    };

    const onInputChangeKCD_BANK_BANK_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BANK = { ...dataKCD_BANK };

        let tTypeVal = _dataKCD_BANK[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BANK[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BANK[`${name}`] = parseInt(val);

        setDataKCD_BANK(_dataKCD_BANK);
    };

    const onInputChangeKCD_BANK_UPD_USER = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BANK = { ...dataKCD_BANK };

        let tTypeVal = _dataKCD_BANK[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BANK[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BANK[`${name}`] = parseInt(val);

        setDataKCD_BANK(_dataKCD_BANK);
    };

    const editKCD_BANK_STATUS_CD = (argValue) => {
        let _dataKCD_BANK_STATUS_CD = datasKCD_BANK_STATUS_CD.filter(
            (val) => val.CD_CODE === argValue,
        );
        console.log(
            "editKCD_BANK_STATUS_CD:" +
                argValue +
                "," +
                datasKCD_BANK_STATUS_CD.length +
                "," +
                _dataKCD_BANK_STATUS_CD.length,
        );
        setDataKCD_BANK_STATUS_CD(_dataKCD_BANK_STATUS_CD[0]);
    };

    const onDropdownChangeKCD_BANK_STATUS_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_BANK = { ...dataKCD_BANK };

        let tTypeVal = _dataKCD_BANK[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_BANK[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_BANK[`${name}`] = parseInt(val);
        }

        setDataKCD_BANK(_dataKCD_BANK);
    };

    const exportExcel = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasKCD_BANK);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFile(excelBuffer, "은행목록");
        });
    };

    const saveAsExcelFile = (buffer, fileName) => {
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

    const deleteSelectedKCD_BANK = () => {
        const serviceKCD_BANK = new ServiceKCD_BANK();
        serviceKCD_BANK.deletesDataKCD_BANK(selectedKCD_BANK).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                toast.current.show({
                    severity: "success",
                    summary: "Successful",
                    detail:
                        "KCD_BANK DELETS => " + data.mgrKcdBankDeletes.count,
                    life: 3000,
                });
                serviceKCD_BANK
                    .getDatasKCD_BANK()
                    .then((data) => setDatasKCD_BANK(data.datas));
            } else {
                var tStr = data.graphQLErrors[0].message;
                toast.current.show({
                    severity: "success",
                    summary: "Query Error",
                    detail: tStr,
                    life: 3000,
                });
            }
        });
        setFlagSelectMode(false);
        setDeleteDatasDialog(false);
        setSelectedKCD_BANK([]);
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "KCD_BANK Deleted",
            life: 3000,
        });
    };

    const onFileUpload = () => {
        toast.current.show({
            severity: "info",
            summary: "Success",
            detail: "File Uploaded with Basic Mode",
        });
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-top">
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <p style={{ width: "20rem", display: "inline-block", marginTop: 10, marginLeft: 2, }}>({datasKCD_BANK.length}건이 조회되었습니다.)</p>
            </span>
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
                    icon="pi pi-search"
                    className="p-button-text"
                    onClick={searchKCD_BANK}
                />

                <Button
                    label="Excel"
                    icon="pi pi-upload"
                    className="p-button-text"
                    onClick={exportExcel}
                />
            </span>
        </div>
    );

    const header_vendor_org = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">공급처 목록</h5>
        </div>
    );

    const header_vendor = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center"></div>
    );

    const createDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDialog}
            />
            <Button
                label="Save"
                icon="pi pi-check"
                className="p-button-text"
                onClick={saveKCD_BANK}
            />
            <Button
                label="Copy"
                icon="pi pi-check"
                className="p-button-text"
                onClick={copyKCD_BANK}
            />
        </>
    );

    const deleteDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDeleteDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-text"
                onClick={deleteKCD_BANK}
            />
        </>
    );

    const deleteDatasDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDeleteDatasDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-text"
                onClick={deleteSelectedKCD_BANK}
            />
        </>
    );

    return (
        <div>
            <div style={{ width: "80rem", height: "1rem" }}></div>
            <div style={{ width: "80rem", height: "2rem" }}>
                <span style={{ width: "19rem" }}>
                    <p style={{ width: "8rem", display: "inline-block" }}>SUPPLIER</p>
                    <InputText
                        disabled
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        value={dataInVendorCd}
                    />
                </span>
                <span style={{ width: "19rem" }}>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Button
                            style={{ padding: "0rem" }}
                            label="Save"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={saveKCD_BANK}
                        />
                    </div>
                </span>
            </div>

            <Divider />

            <div style={{ width: "80rem", height: "22rem" }}>
                <div className="flex flex-row justify-content-center align-items-center">
                    <div
                        style={{
                            marginLeft: "1rem",
                            width: "80rem",
                            height: "21rem",
                        }}
                    >
                        <span
                            style={{
                                height: "2rem",
                                display: "block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>은행코드</p>
                            <InputText
                                disabled
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_BANK_CD"
                                value={dataKCD_BANK.BANK_CD}
                                onChange={(e) =>
                                    onInputChangeKCD_BANK_BANK_CD(e, "BANK_CD")
                                }
                            />
                        </span>
                        <span
                            style={{
                                height: "2rem",
                                display: "block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", color: "red", }}>*은행명</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_BANK_NAME"
                                value={dataKCD_BANK.BANK_NAME}
                                onChange={(e) =>
                                    onInputChangeKCD_BANK_BANK_NAME(
                                        e,
                                        "BANK_NAME",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                height: "2rem",
                                display: "block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", color: "red", }}>*예금주</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_ACCOUNT_NAME"
                                value={dataKCD_BANK.ACCOUNT_NAME}
                                onChange={(e) =>
                                    onInputChangeKCD_BANK_ACCOUNT_NAME(
                                        e,
                                        "ACCOUNT_NAME",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                height: "2rem",
                                display: "block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", color: "red", }}>*계좌번호/IBAN</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_ACCOUNT_NO"
                                value={dataKCD_BANK.ACCOUNT_NO}
                                onChange={(e) =>
                                    onInputChangeKCD_BANK_ACCOUNT_NO(
                                        e,
                                        "ACCOUNT_NO",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                height: "2rem",
                                display: "block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", color: "red", color: "red", }}>*원화/외화</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    value={dataKCD_BANK_BANK_TYPE1}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_BANK_BANK_TYPE1(
                                            e,
                                            "BANK_TYPE1",
                                        )
                                    }
                                    options={datasKCD_BANK_BANK_TYPE1}
                                    optionLabel="CD_NAME"
                                ></Dropdown>
                            </div>
                        </span>
                        <span
                            style={{
                                height: "2rem",
                                display: "block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>STATUS</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_STATUS_CD"
                                    value={dataKCD_BANK_STATUS_CD}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_BANK_STATUS_CD(
                                            e,
                                            "STATUS_CD",
                                        )
                                    }
                                    disabled
                                    options={datasKCD_BANK_STATUS_CD}
                                    optionLabel="CD_NAME"
                                ></Dropdown>
                            </div>
                        </span>
                        <span
                            style={{
                                height: "2rem",
                                display: "block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Update User</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_UPD_USER"
                                value={dataKCD_BANK.UPD_USER}
                                disabled
                                onChange={(e) =>
                                    onInputChangeKCD_BANK_UPD_USER(
                                        e,
                                        "UPD_USER",
                                    )
                                }
                            />
                        </span>

                        <span
                            style={{
                                height: "2rem",
                                display: "block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>SWIFT Code</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_SFTCODE"
                                value={dataKCD_BANK.SFTCODE}
                                onChange={(e) =>
                                    onInputChangeKCD_BANK_SFTCODE(e, "SFTCODE")
                                }
                            />
                        </span>
                        <span
                            style={{
                                height: "2.3rem",
                                display: "block",
                                width: "33rem",
                            }}
                        >
                            <small
                                style={{
                                    padding: 0,
                                    marginTop: "0.1rem",
                                    marginLeft: "9rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="sftcode-help"
                                className="block"
                            >
                                외화 구분선택시 필수 입력입니다.
                            </small>
                        </span>
                        <span
                            style={{
                                height: "2rem",
                                display: "block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Bank No</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_BANK_NO"
                                value={dataKCD_BANK.BANK_NO}
                                onChange={(e) =>
                                    onInputChangeKCD_BANK_BANK_NO(e, "BANK_NO")
                                }
                            />
                        </span>
                        <span
                            style={{
                                height: "2.3rem",
                                display: "block",
                                width: "33rem",
                            }}
                        >
                            <small
                                style={{
                                    padding: 0,
                                    marginTop: "0.1rem",
                                    marginLeft: "9rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="sftcode-help"
                                className="block"
                            >
                                해외송금 처리를 위해 해외은행에서 추가로
                                요구하는 번호로 아래 일부 국가에서 요구하는
                                정보입니다.
                            </small>
                            <small
                                style={{
                                    padding: 0,
                                    marginTop: "0.1rem",
                                    marginLeft: "9rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="sftcode-help"
                                className="block"
                            >
                                - 미국: ABA No / Routing No / FedWire(숫자5자리)
                            </small>
                            <small
                                style={{
                                    padding: 0,
                                    marginTop: "0.1rem",
                                    marginLeft: "9rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="sftcode-help"
                                className="block"
                            >
                                - 캐나다: Transit No(숫자5자리)
                            </small>
                            <small
                                style={{
                                    padding: 0,
                                    marginTop: "0.1rem",
                                    marginLeft: "9rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="sftcode-help"
                                className="block"
                            >
                                - 호주: B5B No(숫자6자리)
                            </small>
                            <small
                                style={{
                                    padding: 0,
                                    marginTop: "0.1rem",
                                    marginLeft: "9rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="sftcode-help"
                                className="block"
                            >
                                - 영국: SortCode (숫자6자리, IBAN 입력시 생략)
                            </small>
                            <small
                                style={{
                                    padding: 0,
                                    marginTop: "0.1rem",
                                    marginLeft: "9rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="sftcode-help"
                                className="block"
                            >
                                - 뉴질랜드: 별도 명칭 없음 (숫자6자리)
                            </small>
                            <small
                                style={{
                                    padding: 0,
                                    marginTop: "0.1rem",
                                    marginLeft: "9rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="sftcode-help"
                                className="block"
                            >
                                - 일본: Branch Code (숫자5자리)
                            </small>
                        </span>

                        <span
                            style={{
                                height: "2rem",
                                display: "block",
                                width: "40rem",
                                marginTop: "8rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>계좌사본</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <FileUpload
                                    mode="basic"
                                    maxFileSize={10000000}
                                    label="Upload"
                                    chooseLabel="Upload"
                                    style={{ padding: "0rem" }}
                                    name="account_doc"
                                    url={dataUrl}
                                    onUpload={onFileUpload}
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

export default React.memo(MgrKcdBankReg, comparisonFn);
