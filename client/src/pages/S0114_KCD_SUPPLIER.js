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
import axios from "axios";
import apiOption from "../assets/env_graphql";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0114_KCD_SUPPLIER } from "../service/service_biz/ServiceS0114_KCD_SUPPLIER";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { ScrollPanel } from "primereact/scrollpanel";

import { TabView, TabPanel } from "primereact/tabview";
import "./MgrKcdVendor.scss";

import $ from "jquery";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
    ETC99: "",
};

const emptyKCD_NATION = {
    id: 0,
    NAT_CD: "",
    NAT_NAME: "",
    STATUS_CD: "",
    REG_USER: "",
    REG_DATETIME: "",
    NAT_IDX: "",
    ETC99: "",
};

const emptyKCD_VENDOR = {
    id: 0,
    VENDOR_CD: "",
    VENDOR_NAME: "",
    INVOICE_NAME: "",
    VENDOR_TYPE_NAME: "",
    VENDOR_TYPE: "",
    VENDOR_MATL_TYPE_NAME: "",
    VENDOR_MATL_TYPE: "",
    GW_STATUS_NAME: "",
    GW: "",
    REG_NO: "",
    PRESIDENT: "",
    USER_NAME: "",
    PART: "",
    RANK: "",
    EMAIL: "",
    TEL_NO: "",
    FAX_NO: "",
    PAY_TYPE: "",
    NAT_NAME: "",
    NAT_CD: "",
    ZIP_NO: "",
    ADDR1: "",
    ADDR2: "",
    STATUS_NAME: "",
    STATUS_CD: "",
    REG_USER: "",
    PERMIT: "",
    APPROKEY: "",
    NEOE_NO: "",
    LEAD_TIME: "",
    REMARK: "",
    OVERSHORT_RATE: "",
    imgURL: "",
    fileName: "",
    objectName: "",
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
    ETC99: "",
};

const emptyQRY_KCD_VENDOR = {
    VENDOR_CD: "",
    VENDOR_NAME: "",
    VENDOR_TYPE: "",
    VENDOR_MATL_TYPE: "",
    STATUS_CD: "",
};

const BufferedInputText = ({
    value,
    onValueChange,
    debounce = 120,
    onBlur,
    ...props
}) => {
    const [localValue, setLocalValue] = useState(value || "");
    const timerRef = useRef(null);

    useEffect(() => {
        setLocalValue(value || "");
    }, [value]);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const flushValue = (nextValue) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        onValueChange?.(nextValue);
    };

    return (
        <InputText
            {...props}
            value={localValue}
            onChange={(e) => {
                const nextValue = (e.target && e.target.value) || "";
                setLocalValue(nextValue);
                if (timerRef.current) clearTimeout(timerRef.current);
                timerRef.current = setTimeout(() => {
                    timerRef.current = null;
                    onValueChange?.(nextValue);
                }, debounce);
            }}
            onBlur={(e) => {
                flushValue((e.target && e.target.value) || "");
                onBlur?.(e);
            }}
        />
    );
};

const MgrKcdVendor = () => {
    const [dataQRY_KCD_VENDOR, setDataQRY_KCD_VENDOR] =
        useState(emptyQRY_KCD_VENDOR);
    const [qrySupplierType, setQrySupplierType] = useState(emptyKCD_CODE);
    const [qryStatus, setQryStatus] = useState(emptyKCD_CODE);
    const [qryPermit, setQryPermit] = useState(emptyKCD_CODE);
    const [qryMatlType, setQryMatlType] = useState(emptyKCD_CODE);
    const [qrySupplierTypeVal, setQrySupplierTypeVal] = useState("");
    const [qryStatusVal, setQryStatusVal] = useState("");
    const [qryPermitVal, setQryPermitVal] = useState("");
    const [qryMatlTypeVal, setQryMatlTypeVal] = useState("");
    const [qrySupplierName, setQrySupplierName] = useState("");
    const [qryRegNo, setQryRegNo] = useState("");
    const [qrySupplierCd, setQrySupplierCd] = useState("");
    const [qryNeoeNo, setQryNeoeNo] = useState("");
    const [qryCompanyName, setQryCompanyName] = useState("");

    const [datasQrySupplierType, setDatasQrySupplierType] = useState([]);
    const [dataQrySupplierType, setDataQrySupplierType] = useState("");
    const [datasQryStatus, setDatasQryStatus] = useState([]);
    const [dataQryStatus, setDataQryStatus] = useState("");
    const [datasQryPermit, setDatasQryPermit] = useState([]);
    const [dataQryPermit, setDataQryPermit] = useState("");
    const [datasQryMatlType, setDatasQryMatlType] = useState([]);
    const [dataQryMatlType, setDataQryMatlType] = useState("");
    const [dataQrySupplierName, setDataQrySupplierName] = useState("");
    const [dataQryRegNo, setDataQryRegNo] = useState("");
    const [dataQryNeoeNo, setDataQryNeoeNo] = useState("");
    const [dataQryCompanyName, setDataQryCompanyName] = useState("");

    const [qrySearchStringKCD_VENDOR, setQrySearchStringKCD_VENDOR] =
        useState("");
    const [qryStatusKCD_VENDOR, setQryStatusKCD_VENDOR] =
        useState(emptyKCD_CODE);
    const [qrySearchStringKCD_BANK, setQrySearchStringKCD_BANK] = useState("");
    const [qryStatusKCD_BANK, setQryStatusKCD_BANK] = useState(emptyKCD_CODE);
    const [regKCD_VENDOR_STATUS_CD, setRegKCD_VENDOR_STATUS_CD] = useState({});
    const [regKCD_VENDOR_VENDOR_TYPE, setRegKCD_VENDOR_VENDOR_TYPE] = useState(
        {},
    );
    const [regKCD_VENDOR_MATL_TYPE, setRegKCD_VENDOR_MATL_TYPE] = useState({});
    const [regKCD_VENDOR_VENDOR_MATL_TYPE, setRegKCD_VENDOR_VENDOR_MATL_TYPE] =
        useState({});
    const [regKCD_VENDOR_NAT_CD, setRegKCD_VENDOR_NAT_CD] = useState({});
    const [regKCD_VENDOR_PERMIT, setRegKCD_VENDOR_PERMIT] = useState({});
    const [regKCD_VENDOR_PAY_TERM, setRegKCD_VENDOR_PAY_TERM] = useState({});
    const [regKCD_BANK_STATUS_CD, setRegKCD_BANK_STATUS_CD] = useState({});
    const [regKCD_VENDOR_OVERSHORT, setRegKCD_VENDOR_OVERSHORT] = useState({});
    const [loadingKCD_VENDOR, setLoadingKCD_VENDOR] = useState(false);
    const [datasKCD_VENDOR, setDatasKCD_VENDOR] = useState([]);
    const [datasKCD_BANK, setDatasKCD_BANK] = useState([]);
    const [datasKCD_VENDOR_STATUS_CD, setDatasKCD_VENDOR_STATUS_CD] = useState(
        [],
    );
    const [datasKCD_VENDOR_VENDOR_TYPE, setDatasKCD_VENDOR_VENDOR_TYPE] =
        useState([]);
    const [
        datasKCD_VENDOR_VENDOR_MATL_TYPE,
        setDatasKCD_VENDOR_VENDOR_MATL_TYPE,
    ] = useState([]);
    const [datasKCD_VENDOR_MATL_TYPE, setDatasKCD_VENDOR_MATL_TYPE] = useState(
        [],
    );
    const [datasKCD_VENDOR_NAT_CD, setDatasKCD_VENDOR_NAT_CD] = useState([]);
    const [datasKCD_VENDOR_PERMIT, setDatasKCD_VENDOR_PERMIT] = useState([]);
    const [datasKCD_VENDOR_PAY_TERM, setDatasKCD_VENDOR_PAY_TERM] = useState(
        [],
    );
    const [datasKCD_BANK_STATUS_CD, setDatasKCD_BANK_STATUS_CD] = useState([]);
    const [datasKCD_VENDOR_OVERSHORT, setDatasKCD_VENDOR_OVERSHORT] = useState(
        [],
    );
    const [createDialogKCD_VENDOR, setCreateDialogKCD_VENDOR] = useState(false);
    const [deleteDialogKCD_VENDOR, setDeleteDialogKCD_VENDOR] = useState(false);
    const [deleteDatasDialogKCD_VENDOR, setDeleteDatasDialogKCD_VENDOR] =
        useState(false);

    const [submittedKCD_VENDOR, setSubmittedKCD_VENDOR] = useState(false);
    const [flagModalKCD_VENDOR, setFlagModalKCD_VENDOR] = useState(false);
    const [flagSelectModeKCD_VENDOR, setFlagSelectModeKCD_VENDOR] =
        useState(false);

    const dt_KCD_VENDOR = useRef(null);
    const [createDialogKCD_BANK, setCreateDialogKCD_BANK] = useState(false);
    const [deleteDialogKCD_BANK, setDeleteDialogKCD_BANK] = useState(false);
    const [deleteDatasDialogKCD_BANK, setDeleteDatasDialogKCD_BANK] =
        useState(false);

    const [submittedKCD_BANK, setSubmittedKCD_BANK] = useState(false);
    const [flagModalKCD_BANK, setFlagModalKCD_BANK] = useState(false);
    const [flagSelectModeKCD_BANK, setFlagSelectModeKCD_BANK] = useState(false);

    const dt_KCD_BANK = useRef(null);

    const [dataKCD_VENDOR, setDataKCD_VENDOR] = useState(emptyKCD_VENDOR);
    const [selectedKCD_VENDOR, setSelectedKCD_VENDOR] = useState([]);

    const [dataKCD_BANK, setDataKCD_BANK] = useState(emptyKCD_BANK);
    const [selectedKCD_BANK, setSelectedKCD_BANK] = useState([]);

    // DEFINE IFRAME: MgrKcdBankReg
    const [urlMgrKcdBankReg, setUrlMgrKcdBankReg] = useState("");
    const [createDialogMgrKcdBankReg, setCreateDialogMgrKcdBankReg] =
        useState(false);

    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const userInfo = serviceLib.getUserInfo();
    const isMaterialTeam =
        userInfo.PART === "00D" || userInfo.PART === "S11" || userInfo.USER_ID === 'won21kr';
    const isDomesticOrImportType = (supplierType) => {
        const supplierTypeName = String(supplierType?.CD_NAME || "").toUpperCase();
        const supplierTypeCode = String(supplierType?.CD_CODE || "");

        return (
            supplierTypeName === "DOMESTIC" ||
            supplierTypeName === "IMPORT" ||
            supplierTypeCode === "1" ||
            supplierTypeCode === "3"
        );
    };
    const isDomesticImportSupplier =
        isDomesticOrImportType(regKCD_VENDOR_VENDOR_TYPE);
    const serviceS0114_KCD_SUPPLIERRef = useRef(null);
    if (!serviceS0114_KCD_SUPPLIERRef.current) serviceS0114_KCD_SUPPLIERRef.current = new ServiceS0114_KCD_SUPPLIER();
    const serviceS0114_KCD_SUPPLIER = serviceS0114_KCD_SUPPLIERRef.current;

    const toast = useRef(null);

    const [loading, setLoading] = useState(false);
    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "97vw" });
    const [styleVal1, setStyleVal1] = useState({ width: "65vw" });

    /* */

    useEffect(() => {
        setLoading(true);
        // TEST
        getData();
        resetKCD_VENDOR();
    }, []);

    const getData = async () => {
        console.log("---------get datas----------");
        var tUrls = window.location.href.split("/");
        console.log("URL=>" + tUrls[2]);
        var tUrl1 = "";
        if (window.location.href.includes("3288")) {
            tUrl1 = "http://afroba.iptime.org:3288/webapp/mrpapp/index.html#/";
        } else if (window.location.href.includes("3201")) {
            tUrl1 = "http://afroba.iptime.org:3201/#/";
        } else if (window.location.href.includes("3403")) {
            tUrl1 = "http://192.168.0.105:3403/#/";
        } else {
            tUrl1 = "http://localhost:3201/#/";
        }
        tUrl1 += "S011001_KCD_BANK_REG";
        setUrlMgrKcdBankReg(tUrl1);

        // const serviceMgrKCD_VENDOR = new ServiceMgrKCD_VENDOR();
        let _dataQRY_KCD_VENDOR = { ...dataQRY_KCD_VENDOR };
        _dataQRY_KCD_VENDOR.STATUS_CD = qryStatusVal;
        _dataQRY_KCD_VENDOR.VENDOR_CD = qrySupplierCd;
        _dataQRY_KCD_VENDOR.VENDOR_NAME = qrySupplierName;
        _dataQRY_KCD_VENDOR.VENDOR_TYPE = qrySupplierTypeVal;
        _dataQRY_KCD_VENDOR.VENDOR_MATL_TYPE = qryMatlTypeVal;
        setDataQRY_KCD_VENDOR(_dataQRY_KCD_VENDOR);

        serviceS0114_KCD_SUPPLIER
            .mgrQueryTBL_KCD_VENDOR(_dataQRY_KCD_VENDOR)
            .then((data) => {
                console.log(data[0]);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdVendor call => " +
                            data.length,
                    );
                    var tArray = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });

                    setDatasKCD_VENDOR(tArray);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdVendor error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        serviceS0114_KCD_SUPPLIER
            .mgrQueryTBL_KCD_VENDOR_CODE("")
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgr1KCD_BANK.mgr1KcdVendorCode call => " +
                            data.STATUS_CD.length,
                    );
                    setDatasQrySupplierType(data.VENDOR_TYPE);
                    setDatasQryStatus(data.STATUS_CD);
                    setDatasQryMatlType(data.VENDOR_MATL_TYPE);

                    setDatasKCD_VENDOR_STATUS_CD(data.STATUS_CD);
                    setDatasKCD_VENDOR_VENDOR_TYPE(data.VENDOR_TYPE);
                    setDatasKCD_VENDOR_MATL_TYPE(data.VENDOR_MATL_TYPE);
                    setDatasKCD_VENDOR_NAT_CD(data.NAT_CD);
                    setDatasKCD_VENDOR_PERMIT(data.PERMIT);
                    setDatasKCD_VENDOR_PAY_TERM(data.PAY_TERM);
                    setDatasKCD_VENDOR_OVERSHORT(data.OVERSHORT);

                    setLoading(false);
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

    /******************* EDIT TABLE START: KCD_VENDOR ****************************************/

    const hideDialogKCD_VENDOR = () => {
        setSubmittedKCD_VENDOR(false);
        setCreateDialogKCD_VENDOR(false);
    };

    const hideDeleteDialogKCD_VENDOR = () => {
        setDeleteDialogKCD_VENDOR(false);
    };

    const hideDeleteDatasDialogKCD_VENDOR = () => {
        clearSelectedKCD_VENDOR();
        setDeleteDatasDialogKCD_VENDOR(false);
    };

    const clearSelectedKCD_VENDOR = () => {
        setSelectedKCD_VENDOR([]);
        setFlagSelectModeKCD_VENDOR(false);
    };

    const editKCD_VENDOR = (argKCD_VENDOR) => {
        console.log(datasKCD_VENDOR_STATUS_CD);
        //clearSelectedKCD_VENDOR();
        setFlagSelectModeKCD_VENDOR(false);

        //argKCD_VENDOR.USER_NAME = argKCD_VENDOR.USER_NAME ==null ? '':argKCD_VENDOR.USER_NAME;
        let tempArgKCD_VENDOR = { ...argKCD_VENDOR };

        if (!argKCD_VENDOR) return;

        console.log(argKCD_VENDOR);

        if (tempArgKCD_VENDOR.USER_NAME == null) {
            tempArgKCD_VENDOR.USER_NAME = "";
        }

        if (tempArgKCD_VENDOR.NSR_TR_CD == null) {
            tempArgKCD_VENDOR.NSR_TR_CD = "";
        }

        setDataKCD_VENDOR({ ...tempArgKCD_VENDOR });

        let _regKCD_VENDOR_STATUS_CD = datasKCD_VENDOR_STATUS_CD.filter(
            (val) => String(val.CD_CODE) === String(argKCD_VENDOR.STATUS_CD),
        );
        setRegKCD_VENDOR_STATUS_CD(_regKCD_VENDOR_STATUS_CD[0]);
        let _regKCD_VENDOR_VENDOR_TYPE = datasKCD_VENDOR_VENDOR_TYPE.filter(
            (val) => String(val.CD_CODE) === String(argKCD_VENDOR.VENDOR_TYPE),
        );
        setRegKCD_VENDOR_VENDOR_TYPE(_regKCD_VENDOR_VENDOR_TYPE[0]);
        let _regKCD_VENDOR_MATL_TYPE = datasKCD_VENDOR_MATL_TYPE.filter(
            (val) =>
                String(val.CD_CODE) === String(argKCD_VENDOR.VENDOR_MATL_TYPE),
        );
        setRegKCD_VENDOR_MATL_TYPE(_regKCD_VENDOR_MATL_TYPE[0]);

        let _regKCD_VENDOR_PERMIT = datasKCD_VENDOR_PERMIT.filter(
            (val) => String(val.CD_CODE) === String(argKCD_VENDOR.PERMIT),
        );
        setRegKCD_VENDOR_PERMIT(_regKCD_VENDOR_PERMIT[0]);
        let _regKCD_VENDOR_NAT_CD = datasKCD_VENDOR_NAT_CD.filter(
            (val) => String(val.NAT_CD) === String(argKCD_VENDOR.NAT_CD),
        );
        setRegKCD_VENDOR_NAT_CD(_regKCD_VENDOR_NAT_CD[0]);

        let _regKCD_VENDOR_PAY_TERM = datasKCD_VENDOR_PAY_TERM.filter(
            (val) => String(val.CD_NAME).trim()  === String(argKCD_VENDOR.PAY_TYPE).trim(),
        );
        setRegKCD_VENDOR_PAY_TERM(_regKCD_VENDOR_PAY_TERM[0]);

        console.log(argKCD_VENDOR);
        console.log(argKCD_VENDOR.OVERSHORT);

        let _regKCD_VENDOR_OVERSHORT = datasKCD_VENDOR_OVERSHORT.filter(
            (val) =>
                String(val.CD_CODE) === String(argKCD_VENDOR.OVERSHORT_RATE),
        );
        setRegKCD_VENDOR_OVERSHORT(_regKCD_VENDOR_OVERSHORT[0]);

        setCreateDialogKCD_VENDOR(true);
    };

    const onInputChangeKCD_VENDOR = (e, name) => {
        let val = (e.target && e.target.value) || "";
        let _dataKCD_VENDOR = { ...dataKCD_VENDOR };
        _dataKCD_VENDOR[`${name}`] = val;

        setDataKCD_VENDOR(_dataKCD_VENDOR);
    };

    const onBufferedInputChangeKCD_VENDOR = (name, val) => {
        setDataKCD_VENDOR((prev) => {
            if ((prev[name] || "") === val) return prev;
            return {
                ...prev,
                [name]: val,
            };
        });
    };

    const onDropdownChangeKCD_VENDOR = (e, name) => {
        let val = "";

        if (name === "STATUS_CD") {
            val = (e.value && e.value.CD_CODE) || "";
            console.log(
                "DROPDOWN CHange : STATUS_CD => " +
                    val +
                    "," +
                    JSON.stringify(e.value),
            );
            setRegKCD_VENDOR_STATUS_CD(e.value);
        }
        if (name === "NAT_CD") {
            val = (e.value && e.value.NAT_CD) || "";
            console.log(
                "DROPDOWN CHange : NAT_CD => " +
                    val +
                    "," +
                    JSON.stringify(e.value),
            );
            setRegKCD_VENDOR_NAT_CD(e.value);
        }
        if (name === "VENDOR_TYPE") {
            val = (e.value && e.value.CD_CODE) || "";
            console.log(
                "DROPDOWN CHange : VENDOR_TYPE => " +
                    val +
                    "," +
                    JSON.stringify(e.value),
            );
            console.log("userInfo.PART:", userInfo.PART);
            setRegKCD_VENDOR_VENDOR_TYPE(e.value);

            // Supplier type이 바뀌면 Pay Rule 무조건 초기화
            setRegKCD_VENDOR_PAY_TERM(datasKCD_VENDOR_PAY_TERM[0] || {});
        }
        if (name === "VENDOR_MATL_TYPE") {
            val = (e.value && e.value.CD_CODE) || "";
            console.log(
                "DROPDOWN CHange : MATL_TYPE => " +
                    val +
                    "," +
                    JSON.stringify(e.value),
            );
            setRegKCD_VENDOR_MATL_TYPE(e.value);
        }

        if (name === "PERMIT") {
            val = (e.value && e.value.CD_CODE) || "";
            console.log(
                "DROPDOWN CHange : PERMIT => " +
                    val +
                    "," +
                    JSON.stringify(e.value),
            );
            setRegKCD_VENDOR_PERMIT(e.value);
        }

        if (name === "PAY_TYPE") {
            val = (e.value && e.value.CD_NAME) || "";
            console.log(
                "DROPDOWN CHange : PAY_TERM => " +
                    val +
                    "," +
                    JSON.stringify(e.value),
            );
            setRegKCD_VENDOR_PAY_TERM(e.value);
        }

        if (name === "OVERSHORT_RATE") {
            val = (e.value && e.value.CD_CODE) || "";
            console.log(
                "DROPDOWN CHange : PAY_TERM => " +
                    val +
                    "," +
                    JSON.stringify(e.value),
            );
            setRegKCD_VENDOR_OVERSHORT(e.value);
        }

        let _dataKCD_VENDOR = { ...dataKCD_VENDOR };

        let tTypeVal = _dataKCD_VENDOR[`${name}`];
        console.log(
            "DROPDOWN CHANGE(0): KCD_VENDOR " +
                tTypeVal +
                "," +
                val +
                "," +
                typeof tTypeVal +
                "," +
                typeof val,
        );
        if (typeof tTypeVal === "string" && typeof val === "string") {
            console.log("DROPDOWN CHANGE: KCD_VENDOR , `${name}` => `${val}`");
            _dataKCD_VENDOR[`${name}`] = String(val);
        } else if (typeof tTypeVal === "string" && typeof val !== "string") {
            console.log("DROPDOWN CHANGE: KCD_VENDOR , `${name}` => `${val}`");
            _dataKCD_VENDOR[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            console.log("DROPDOWN CHANGE: KCD_VENDOR , `${name}` => `${val}`");
            _dataKCD_VENDOR[`${name}`] = parseInt(val);
        }

        if (name === "VENDOR_TYPE" && !isDomesticOrImportType(e.value)) {
            _dataKCD_VENDOR.PAY_TYPE =
                (datasKCD_VENDOR_PAY_TERM[0] &&
                    datasKCD_VENDOR_PAY_TERM[0].CD_NAME) ||
                "";
        }

        setDataKCD_VENDOR(_dataKCD_VENDOR);
    };
    /******************* EDIT TABLE END: KCD_VENDOR ****************************************/

    /******************* EDIT TABLE START: KCD_BANK ****************************************/

    /******************* EDIT TABLE END: KCD_BANK ****************************************/

    /************************* DATAGRID : KCD_VENDOR START **************************************************/

    const onRowClickKCD_VENDOR = (event) => {
        let argKCD_VENDOR = event.data;
        if (flagSelectModeKCD_VENDOR) return;
        editKCD_VENDOR(argKCD_VENDOR);

        localStorage.setItem(
            "AF_MGR_KCD_BANK_VENDOR_CD",
            argKCD_VENDOR.VENDOR_CD,
        );
        localStorage.setItem("AF_MGR_KCD_BANK_BANK_CD", "");

        serviceS0114_KCD_SUPPLIER
            .mgrQueryTBL_KCD_BANK_VENDOR(argKCD_VENDOR.VENDOR_CD)
            .then((data) => {
                console.log(data);
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

    const onRowClick1KCD_VENDOR = (argData) => {
        let argKCD_VENDOR = argData;
        editKCD_VENDOR(argKCD_VENDOR);
        /*
         */
    };

    const searchKCD_VENDOR = () => {
        clearSelectedKCD_VENDOR();
        setCreateDialogKCD_VENDOR(false);

        let _dataQRY_KCD_VENDOR = { ...dataQRY_KCD_VENDOR };
        _dataQRY_KCD_VENDOR.STATUS_CD = qryStatusVal;
        _dataQRY_KCD_VENDOR.VENDOR_CD = qrySupplierCd;
        _dataQRY_KCD_VENDOR.VENDOR_NAME = qrySupplierName;
        _dataQRY_KCD_VENDOR.VENDOR_TYPE = qrySupplierTypeVal;
        _dataQRY_KCD_VENDOR.VENDOR_MATL_TYPE = qryMatlTypeVal;
        _dataQRY_KCD_VENDOR.REG_NO = qryRegNo;
        _dataQRY_KCD_VENDOR.COMPANY_NAME = qryCompanyName;
        setDataQRY_KCD_VENDOR(_dataQRY_KCD_VENDOR);

        console.log(_dataQRY_KCD_VENDOR);

        setLoadingKCD_VENDOR(true);
        serviceS0114_KCD_SUPPLIER
            .mgrQueryTBL_KCD_VENDOR(_dataQRY_KCD_VENDOR)
            .then((data) => {
                setLoadingKCD_VENDOR(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdVendor call => " +
                            data.length,
                    );
                    if (data.length > 0) {
                        data.map((col, i) => {
                            col.id = i + 1;
                            return col;
                        });
                        setDatasKCD_VENDOR(data);
                        setFlagSelectModeKCD_VENDOR(true);
                        setSelectedKCD_VENDOR(data[0]);
                        onRowClick1KCD_VENDOR(data[0]);
                    } else {
                        setDatasKCD_VENDOR([]);
                        setSelectedKCD_VENDOR([]);
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdVendor error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const resetKCD_VENDOR = () => {
        clearSelectedKCD_VENDOR();
        clearSelectedKCD_BANK();
        setDataKCD_VENDOR(emptyKCD_VENDOR);
        setDatasKCD_BANK([]);
        dataKCD_VENDOR.id = 0;
        editKCD_VENDOR(emptyKCD_VENDOR);
    };

    const copyKCD_VENDOR = () => {
        var _tData = { ...dataKCD_VENDOR };
        _tData.id = 0;
        _tData.VENDOR_CD = "";
        setDataKCD_VENDOR(_tData);
    };

    // ── 차단 법인 목록 ────────────────────────────────────────────────
    const BLOCKED_VENDOR_EXACT_EN = [
        "chenju (suzhou) science and technology innovation development company limited",
        "dalian hengzhong special material company limited",
        "dalian northeast asia energy company limited",
        "dalian northeast asia petrochemical products company limited",
        "hengli (zhoushan) energy chemical company limited",
        "hengli aviation oil company limited",
        "hengli chemical (dalian) company limited",
        "hengli energy (hainan) company limited",
        "hengli energy (suzhou) company limited",
        "hengli oil and chemical (hainan) company limited",
        "hengli oil and chemical (suzhou) company limited",
        "hengli petrochemical (dalian) new materials technology company limited",
        "hengli petrochemical international private limited",
        "hengli petrochemical public engineering (dalian) company limited",
        "hengli refining and chemical product sales (dalian) company limited",
        "hengli shipping international private limited",
        "nantong hengli import and export company limited",
        "shanghai jinmintai trading company limited",
        "shenzhen shengang trading company limited",
        "suzhou hengli chemical import and export company limited",
        "suzhou hengli chemical polymer company limited",
        "suzhou hengli energy chemical import and export company limited",
    ];
    const BLOCKED_VENDOR_EXACT_ZH = [
        "辰聚（苏州）科创发展有限责任公司",
        "大连恒众特种材料有限公司",
        "大连东北亚能源有限公司",
        "大连东北亚石化产品有限公司",
        "恒力（舟山）能化有限公司",
        "恒力航油有限公司",
        "恒力化学（大连）有限公司",
        "恒力能源（海南）有限公司",
        "恒力能源（苏州）有限公司",
        "恒力油化（海南）有限公司",
        "恒力油化（苏州）有限公司",
        "恒力石化（大连）新材料科技有限公司",
        "恒力石化公用工程（大连）有限公司",
        "恒力炼化产品销售（大连）有限公司",
        "南通恒力进出口有限公司",
        "上海金闵泰商贸有限公司",
        "深圳市申钢贸易有限公司",
        "苏州恒力化工进出口有限公司",
        "苏州恒力化学高分子有限公司",
        "苏州恒力能化进出口有限公司",
    ];
    // 그룹 키워드: 포함 시 차단 (영문은 소문자로 비교)
    const BLOCKED_VENDOR_KEYWORDS_EN = ["hengli", "dalian", "chenju", "jinmintai", "shenzhen shengang"];
    const BLOCKED_VENDOR_KEYWORDS_ZH = ["恒力", "大连", "辰聚", "金闵", "深圳市申"];

    const isBlockedVendorName = (name) => {
        if (!name) return false;
        const normalized = name.replace(/\s+/g, " ").trim().toLowerCase();
        const normalizedNoSpace = name.replace(/\s/g, "").toLowerCase();
        // 영문 정확 매칭 (공백 제거 후 비교)
        for (const blocked of BLOCKED_VENDOR_EXACT_EN) {
            if (normalizedNoSpace === blocked.replace(/\s/g, "")) return true;
        }
        // 중문 정확 매칭
        for (const blocked of BLOCKED_VENDOR_EXACT_ZH) {
            if (name.trim() === blocked) return true;
        }
        // 영문 그룹 키워드 포함 (공백 포함 키워드는 정규화된 문자열로 검사)
        for (const kw of BLOCKED_VENDOR_KEYWORDS_EN) {
            if (normalized.includes(kw)) return true;
        }
        // 중문 그룹 키워드 포함
        for (const kw of BLOCKED_VENDOR_KEYWORDS_ZH) {
            if (name.includes(kw)) return true;
        }
        return false;
    };
    // ─────────────────────────────────────────────────────────────────

    const saveKCD_VENDOR = async (insertUpdateCode) => {
        setSubmittedKCD_VENDOR(true);

        if (typeof dataKCD_VENDOR.id !== "undefined") {
            let _datasKCD_VENDOR = [...datasKCD_VENDOR];
            let _dataKCD_VENDOR = { ...dataKCD_VENDOR };

            // ── 차단 법인 검사 ──────────────────────────────────────────
            if (
                isBlockedVendorName(_dataKCD_VENDOR.VENDOR_NAME) ||
                isBlockedVendorName(_dataKCD_VENDOR.INVOICE_NAME)
            ) {
                alert(
                    "해당 Supplier는 등록 할 수 없습니다.\n\nThis Supplier cannot be registered."
                );
                return;
            }
            // ────────────────────────────────────────────────────────────

            if (insertUpdateCode === "INSERT") {
                if (_dataKCD_VENDOR.VENDOR_CD) {
                    alert("Update 버튼을 눌러주세요.<br><br>Please press the Update button.");
                    return;
                }
            }

            if (insertUpdateCode === "UPDATE") {
                if (!_dataKCD_VENDOR.VENDOR_CD) {
                    alert("Insert 버튼을 눌러주세요.<br><br>Please press the Insert button.");
                    return;
                }

                console.log(selectedKCD_VENDOR);

                if (!selectedKCD_VENDOR) {
                    alert("Supplier를 선택해주세요.<br><br>Please select a supplier.");
                    return;
                }

                if (
                    selectedKCD_VENDOR.VENDOR_NAME !==
                    _dataKCD_VENDOR.VENDOR_NAME
                ) {
                    let tRet = await confirm(
                        `${selectedKCD_VENDOR.VENDOR_NAME}  ->  ${_dataKCD_VENDOR.VENDOR_NAME}으로 변경하시겠습니까?<br><br>Do you want to change ${selectedKCD_VENDOR.VENDOR_NAME}  ->  ${_dataKCD_VENDOR.VENDOR_NAME}?`,
                    );

                    if (!tRet) {
                        return;
                    }
                }
            }

            var tFlag = 0;
            if (_dataKCD_VENDOR.VENDOR_NAME === "") tFlag = 1;
            if (_dataKCD_VENDOR.VENDOR_TYPE === "") tFlag = 1;
            if (_dataKCD_VENDOR.REG_NO === "") tFlag = 1;
            if (_dataKCD_VENDOR.USER_NAME === "") tFlag = 1;
            if (_dataKCD_VENDOR.EMAIL === "") tFlag = 1;
            if (_dataKCD_VENDOR.TEL_NO === "") tFlag = 1;
            if (_dataKCD_VENDOR.ADDR1 === "") tFlag = 1;
            if (_dataKCD_VENDOR.PAY_TYPE === "") tFlag = 1;
            if (_dataKCD_VENDOR.NAT_CD === "") tFlag = 1;
            if (_dataKCD_VENDOR.PERMIT === "") tFlag = 1;
            if (_dataKCD_VENDOR.OVERSHORT_RATE === "") tFlag = 1;
            if (tFlag === 1) {
                alert("필수 입력 항목이 다 입력되지 않았습니다<br><br>All required fields have not been entered");
                return;
            }

            if (_dataKCD_VENDOR.VENDOR_CD !== "") {
                _dataKCD_VENDOR.UPD_USER = "ybwon";
            } else {
                _dataKCD_VENDOR.UPD_USER = "ybwon";
            }

            if (typeof _dataKCD_VENDOR.__typename !== "undefined")
                delete _dataKCD_VENDOR.__typename;

            delete _dataKCD_VENDOR.payCondition;

            serviceS0114_KCD_SUPPLIER
                .mgrInsert_S0114_KCD_VENDOR_SAVE(_dataKCD_VENDOR)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            if (data[0].CODE.includes("SUCC")) {
                                searchKCD_VENDOR();
                            }
                        }
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
        }
    };

    const deleteKCD_VENDOR = () => {
        deleteKCD_VENDOR_Sub();
    };

    const deleteKCD_VENDOR_Sub = () => {
        setSubmittedKCD_VENDOR(true);

        if (typeof dataKCD_VENDOR.id !== "undefined") {
            let _datasKCD_VENDOR = [...datasKCD_VENDOR];
            let _dataKCD_VENDOR = { ...dataKCD_VENDOR };

            if (_dataKCD_VENDOR.VENDOR_CD !== "") {
                _dataKCD_VENDOR.UPD_USER = "ybwon";
            } else {
                _dataKCD_VENDOR.UPD_USER = "ybwon";
            }

            if (typeof _dataKCD_VENDOR.__typename !== "undefined")
                delete _dataKCD_VENDOR.__typename;

            delete _dataKCD_VENDOR.payCondition;
            console.log(JSON.stringify(_dataKCD_VENDOR));

            serviceS0114_KCD_SUPPLIER
                .mgrInsert_S0114_KCD_VENDOR_DELETE(_dataKCD_VENDOR)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                        }

                        if (data[0].CODE.includes("ERROR")) {
                            alert(data[0].CODE);
                            return;
                        }
                            

                        let _dataQRY_KCD_VENDOR = { ...dataQRY_KCD_VENDOR };
                        _dataQRY_KCD_VENDOR.STATUS_CD = "";
                        _dataQRY_KCD_VENDOR.VENDOR_CD = "";
                        _dataQRY_KCD_VENDOR.VENDOR_NAME = "";
                        _dataQRY_KCD_VENDOR.VENDOR_TYPE = "";
                        _dataQRY_KCD_VENDOR.VENDOR_MATL_TYPE = "";
                        setDataQRY_KCD_VENDOR(_dataQRY_KCD_VENDOR);

                        serviceS0114_KCD_SUPPLIER
                            .mgrQueryTBL_KCD_VENDOR(_dataQRY_KCD_VENDOR)
                            .then((data) => {
                                if (typeof data.graphQLErrors === "undefined") {
                                    console.log(
                                        "ServiceMgrKCD_VENDOR.mgr1KcdVendor call => " +
                                            data.length,
                                    );
                                    setDatasKCD_VENDOR(data);
                                } else {
                                    console.log(
                                        "ServiceMgrKCD_VENDOR.mgr1KcdVendor error => " +
                                            JSON.stringify(data.graphQLErrors),
                                    );
                                }
                            });
                    } else {
                        alert(data.graphQLErrors[0].message);
                    }
                });
        }
    };

    const deleteSelectedKCD_VENDOR = () => {};

    // IFRAME_CODE : MgrKcdBankReg

    const hideDialogMgrKcdBankReg = () => {
        setCreateDialogMgrKcdBankReg(false);
        console.log("hideDialogMgrKcdBankReg=>" + dataKCD_VENDOR.VENDOR_CD);
        // SERVICE
        serviceS0114_KCD_SUPPLIER
            .mgrQueryTBL_KCD_BANK_VENDOR(dataKCD_VENDOR.VENDOR_CD)
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

    const createDialogFooterMgrKcdBankReg = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDialogMgrKcdBankReg}
            />
        </>
    );

    //

    const exportExcel = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasKCD_VENDOR);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFile(excelBuffer, "공급자목록");
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

    const headerKCD_VENDOR = (
        <div style={{ width: "100rem", height: "3rem" }}>
            <span style={{ width: "40rem", display: "inline-block" }}>
                <p style={{ textAlign: "left", width: "20rem", display: "inline-block", height: "2rem", }}>({datasKCD_VENDOR.length}건이 조회되었습니다.)</p>
            </span>
            <span style={{ width: "40rem", display: "inline-block" }}>
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
                    onClick={searchKCD_VENDOR}
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

    const createDialogFooterKCD_VENDOR = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDialogKCD_VENDOR}
            />
            <Button
                label="Save"
                icon="pi pi-check"
                className="p-button-text"
                onClick={saveKCD_VENDOR}
            />
            <Button
                label="Copy"
                icon="pi pi-check"
                className="p-button-text"
                onClick={copyKCD_VENDOR}
            />
        </>
    );

    const deleteDialogFooterKCD_VENDOR = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDeleteDialogKCD_VENDOR}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-text"
                onClick={deleteKCD_VENDOR}
            />
        </>
    );

    const deleteDatasDialogFooterKCD_VENDOR = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDeleteDatasDialogKCD_VENDOR}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-text"
                onClick={deleteSelectedKCD_VENDOR}
            />
        </>
    );

    //************************* DATAGRID : KCD_VENDOR END **************************************************/

    /************************* DATAGRID : KCD_BANK START **************************************************/

    const headerKCD_BANK = (
        <div style={{ width: "100%", height: "2rem" }}>
            <span style={{ display: "inline-block" }}>
                ({datasKCD_BANK.length}건이 조회되었습니다.)
            </span>
        </div>
    );

    const onRowClickKCD_BANK = (event) => {
        let argKCD_BANK = event.data;
        console.log("RowClick => KCD_BANK" + argKCD_BANK.id);

        let _dataKCD_VENDOR = { ...dataKCD_VENDOR };
        _dataKCD_VENDOR.BANK_CD = argKCD_BANK.BANK_CD;
        _dataKCD_VENDOR.BANK_NAME = argKCD_BANK.BANK_NAME;
        _dataKCD_VENDOR.ACCOUNT_NO = argKCD_BANK.ACCOUNT_NO;
        _dataKCD_VENDOR.ACCOUNT_NAME = argKCD_BANK.ACCOUNT_NAME;

        setDataKCD_VENDOR(_dataKCD_VENDOR);
    };

    const clearSelectedKCD_BANK = () => {
        setSelectedKCD_BANK([]);
        setFlagSelectModeKCD_BANK(false);
    };

    // Qry

    const handleSearchInputKeyDown = (e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        searchKCD_VENDOR();
    };

    // Export

    // Qry
    const onDropdownChangeQrySupplierType = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";
        setQrySupplierTypeVal(val);
        setDataQrySupplierType(e.value);
    };

    const onDropdownChangeQryStatus = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";
        setQryStatusVal(val);
        setDataQryStatus(e.value);
    };

    const onDropdownChangeQryMatlType = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";
        setQryMatlTypeVal(val);
        setDataQryMatlType(e.value);
    };

    const onInputChangeQrySupplierName = (e, name) => {
        let val = (e.target && e.target.value) || "";
        setQrySupplierName(val);
        setDataQrySupplierName(val);
    };

    const onInputChangeQryRegNo = (e, name) => {
        let val = (e.target && e.target.value) || "";
        setQryRegNo(val);
        setDataQryRegNo(val);
    };

    const onInputChangeQryCompanyName = (e, name) => {
        let val = (e.target && e.target.value) || "";
        setQryCompanyName(val);
        setDataQryCompanyName(val);
    };

    // Support Area

    const onDownloadFile = () => {
        console.log(dataKCD_VENDOR.imgURL);
        let fileName = dataKCD_VENDOR.fileName;
        let url = "";

        if (dataKCD_VENDOR.imgURL) url = dataKCD_VENDOR.imgURL;

        if (!url) {
            alert("Not exist attached file!");
            return;
        }

        serviceLib.downloadFile(url, fileName);
    };

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

            let _dataKCD_VENDOR = { ...dataKCD_VENDOR };

            _dataKCD_VENDOR.imgURL = imgURL;
            _dataKCD_VENDOR.fileName = fileName;
            _dataKCD_VENDOR.objectName = objectName;

            setDataKCD_VENDOR(_dataKCD_VENDOR);
        } catch (err) {
            console.log(err);
        }
    };

    const s3FileDelete = async () => {
        try {
            console.log(dataKCD_VENDOR);
            if (
                dataKCD_VENDOR.objectName == null ||
                dataKCD_VENDOR.objectName == "" ||
                dataKCD_VENDOR.objectName == undefined
            ) {
                alert("삭제할 이미지가 없습니다.<br><br>There are no images to delete.");
            } else {
                const body = {
                    objectName: dataKCD_VENDOR.objectName,
                };
                let tUrl = `${apiOption.apiuri}/restapi/deleteImg`;
                const response = await axios.post(tUrl, body);

                if (response) {
                    getData();
                    let _dataKCD_VENDOR = { ...dataKCD_VENDOR };

                    _dataKCD_VENDOR.imgURL = null;
                    _dataKCD_VENDOR.fileName = null;
                    _dataKCD_VENDOR.objectName = null;

                    setDataKCD_VENDOR(_dataKCD_VENDOR);

                    alert("삭제 되었습니다.<br><br>It has been deleted.");
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
        if (
            !loadingKCD_VENDOR &&
            datasKCD_VENDOR?.length > 0 &&
            (!selectedKCD_VENDOR || selectedKCD_VENDOR.length === 0)
        ) {
            const firstRow = datasKCD_VENDOR[0];
            setSelectedKCD_VENDOR(firstRow);
            onRowClick1KCD_VENDOR([firstRow]); // 첫 행 클릭 동기화
        }
    }, [datasKCD_VENDOR, loadingKCD_VENDOR]);

    const handleSelectionChangeKCD_VENDOR = (e) => {
        if (!e.value || e.value.length === 0) return; // 빈 선택 방지
        setFlagSelectModeKCD_VENDOR(true);
        setSelectedKCD_VENDOR(e.value);
        onRowClick1KCD_VENDOR(e.value);
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Status</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_QryStatus"
                            value={dataQryStatus}
                            onChange={(e) => onDropdownChangeQryStatus(e, "")}
                            options={datasQryStatus}
                            optionLabel="CD_NAME"
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "21rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Supplier Name</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "12rem",
                        }}
                        type="search"
                        onChange={(e) =>
                            onInputChangeQrySupplierName(e, "QrySupplierName")
                        }
                        onKeyDown={handleSearchInputKeyDown}
                    />
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Reg No</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "8rem",
                        }}
                        type="search"
                        onKeyDown={handleSearchInputKeyDown}
                        onChange={(e) => onInputChangeQryRegNo(e, "QryRegNo")}
                    />
                </span>
                <span className="af-span-3-0" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Supplier Type</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "8rem",
                        }}
                    >
                        <Dropdown
                            style={{ width: "8rem" }}
                            id="id_QrySupplierType"
                            value={dataQrySupplierType}
                            onChange={(e) =>
                                onDropdownChangeQrySupplierType(e, "")
                            }
                            options={datasQrySupplierType}
                            optionLabel="CD_NAME"
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span
                    className="af-span-3-0"
                    style={{ width: "14rem", marginLeft: "1rem" }}
                >
                    <p className="af-span-p" style={{ width: "5rem" }}>Matl Type</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "8rem",
                        }}
                    >
                        <Dropdown
                            style={{ width: "8rem" }}
                            id="id_QryMatlType"
                            value={dataQryMatlType}
                            onChange={(e) => onDropdownChangeQryMatlType(e, "")}
                            options={datasQryMatlType}
                            optionLabel="CD_NAME"
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span
                    className="af-span-3-0"
                    style={{ width: "19rem", marginLeft: "1rem" }}
                >
                    <p className="af-span-p" style={{ width: "8rem" }}>Company Name</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "10rem",
                            }}
                            type="search"
                            onKeyDown={handleSearchInputKeyDown}
                            onChange={(e) =>
                                onInputChangeQryCompanyName(e, "QryCompanyName")
                            }
                        />
                    </div>
                </span>
                <div style={{ display: "inline-block" }}>
                    <span
                        style={{
                            width: "30rem",
                            marginLeft: "3rem",
                            height: "2rem",
                            marginBottom: "1.2rem",
                        }}
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
                            className="p-button-text"
                            onClick={searchKCD_VENDOR}
                            style={{ width: "6rem" }}
                        />

                        <Button
                            label="Excel"
                            className="p-button-text green"
                            style={{ width: "6rem" }}
                            onClick={exportExcel}
                        />
                    </span>
                </div>
            </div>

            {/** */}

            {/** */}
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "25rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_KCD_VENDOR}
                    size="small"
                    value={datasKCD_VENDOR}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selection={selectedKCD_VENDOR}
                    loading={loadingKCD_VENDOR}
                    onSelectionChange={handleSelectionChangeKCD_VENDOR}
                    onRowClick={onRowClickKCD_VENDOR}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="272px"
                >
                    <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                    <AFColumn field="STATUS_NAME" headerClassName="t-header" header="Status" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_CD" headerClassName="t-header" header="Supplier#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_TYPE_NAME" headerClassName="t-header" header="Supplier Type" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_MATL_TYPE_NAME" headerClassName="t-header" header="Matl Type" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier Name" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="INVOICE_NAME" headerClassName="t-header" header="Company Name" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REG_NO" headerClassName="t-header" header="Reg NO" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USER_NAME" headerClassName="t-header" header="Contact Person" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="EMAIL" headerClassName="t-header" header="Email" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="TEL_NO" headerClassName="t-header" header="Tel No" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="NAT_NAME" headerClassName="t-header" header="Country" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ADDR1" headerClassName="t-header" header="Addr1" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    {/* <AFColumn field="ADDR2" headerClassName='t-header' header="Addr2" style={{ width: '15rem', flexBasis: 'auto' , }}></AFColumn> */}
                    <AFColumn field="PAY_TYPE" headerClassName="t-header" header="Pay Rule" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="NSR_TR_CD" headerClassName="t-header" header="NSR TR#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                style={{
                    width: "123rem",
                    height: "32rem",
                    display: "inline-block",
                }}
            >
                <div className="flex flex-row justify-content-center align-items-center">
                    <div
                        className="af-div-first"
                        style={{
                            width: "85rem",
                            height: "32rem",
                            float: "left",
                        }}
                    >
                        <div
                            className="flex flex-row justify-content-center align-items-center"
                            style={{ marginTop: "0.5rem" }}
                        >
                            <div style={{ width: "40rem", height: "27rem" }}>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "34rem",
                                    }}
                                >
                                    <p style={{ width: "10rem", display: "inline-block", }}>Supplier#</p>
                                    <InputText
                                        disabled={{}}
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "23rem",
                                        }}
                                        id="id_VENDOR_CD"
                                        value={dataKCD_VENDOR.VENDOR_CD}
                                        onChange={(e) =>
                                            onInputChangeKCD_VENDOR(
                                                e,
                                                "VENDOR_CD",
                                            )
                                        }
                                    />
                                </span>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "34rem",
                                    }}
                                >
                                    <p style={{ width: "10rem", display: "inline-block", color: "red", }}>*Supplier Name</p>
                                    <BufferedInputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "23rem",
                                        }}
                                        id="id_VENDOR_NAME"
                                        value={dataKCD_VENDOR.VENDOR_NAME}
                                        onValueChange={(val) =>
                                            onBufferedInputChangeKCD_VENDOR(
                                                "VENDOR_NAME",
                                                val,
                                            )
                                        }
                                    />
                                </span>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "34rem",
                                    }}
                                >
                                    <p style={{ width: "10rem", display: "inline-block", color: "red", }}>*Supplier Type</p>
                                    <div
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "23rem",
                                        }}
                                    >
                                        <Dropdown
                                            style={{ width: "23rem" }}
                                            id="id_VENDOR_TYPE"
                                            value={regKCD_VENDOR_VENDOR_TYPE}
                                            onChange={(e) =>
                                                onDropdownChangeKCD_VENDOR(
                                                    e,
                                                    "VENDOR_TYPE",
                                                )
                                            }
                                            options={
                                                datasKCD_VENDOR_VENDOR_TYPE
                                            }
                                            optionLabel="CD_NAME"
                                            editable
                                        ></Dropdown>
                                    </div>
                                </span>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "34rem",
                                    }}
                                >
                                    <p style={{ width: "10rem", display: "inline-block", }}>Matl Type</p>
                                    <div
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "23rem",
                                        }}
                                    >
                                        <Dropdown
                                            style={{ width: "23rem" }}
                                            id="id_MATL_TYPE"
                                            value={regKCD_VENDOR_MATL_TYPE}
                                            onChange={(e) =>
                                                onDropdownChangeKCD_VENDOR(
                                                    e,
                                                    "VENDOR_MATL_TYPE",
                                                )
                                            }
                                            options={datasKCD_VENDOR_MATL_TYPE}
                                            optionLabel="CD_NAME"
                                            editable
                                        ></Dropdown>
                                    </div>
                                </span>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "34rem",
                                    }}
                                >
                                    <p style={{ width: "10rem", display: "inline-block", }}>Company Name</p>
                                    <BufferedInputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "23rem",
                                        }}
                                        id="id_REG_NO"
                                        value={dataKCD_VENDOR.INVOICE_NAME}
                                        onValueChange={(val) =>
                                            onBufferedInputChangeKCD_VENDOR(
                                                "INVOICE_NAME",
                                                val,
                                            )
                                        }
                                    />
                                </span>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "34rem",
                                    }}
                                >
                                    <p style={{ width: "10rem", display: "inline-block", color: "red", }}>*Reg No</p>
                                    <BufferedInputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "23rem",
                                        }}
                                        id="id_REG_NO"
                                        value={dataKCD_VENDOR.REG_NO}
                                        onValueChange={(val) =>
                                            onBufferedInputChangeKCD_VENDOR(
                                                "REG_NO",
                                                val,
                                            )
                                        }
                                    />
                                </span>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "34rem",
                                    }}
                                >
                                    <p style={{ width: "10rem", display: "inline-block", }}>President</p>
                                    <BufferedInputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "23rem",
                                        }}
                                        id="id_PRESIDENT"
                                        value={dataKCD_VENDOR.PRESIDENT}
                                        onValueChange={(val) =>
                                            onBufferedInputChangeKCD_VENDOR(
                                                "PRESIDENT",
                                                val,
                                            )
                                        }
                                    />
                                </span>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "34rem",
                                    }}
                                >
                                    <p style={{ width: "10rem", display: "inline-block", color: "red", }}>*Contact Person</p>
                                    <BufferedInputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "23rem",
                                        }}
                                        id="id_USER_NAME"
                                        value={dataKCD_VENDOR.USER_NAME}
                                        onValueChange={(val) =>
                                            onBufferedInputChangeKCD_VENDOR(
                                                "USER_NAME",
                                                val,
                                            )
                                        }
                                    />
                                </span>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "34rem",
                                    }}
                                >
                                    <p style={{ width: "10rem", display: "inline-block", color: "red", }}>*Email</p>
                                    <BufferedInputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "23rem",
                                        }}
                                        id="id_EMAIL"
                                        value={dataKCD_VENDOR.EMAIL}
                                        onValueChange={(val) =>
                                            onBufferedInputChangeKCD_VENDOR(
                                                "EMAIL",
                                                val,
                                            )
                                        }
                                    />
                                </span>

                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "90rem",
                                    }}
                                >
                                    <p style={{ width: "10rem", display: "inline-block", color: "red", verticalAlign: "bottom", }}>*Addr1</p>
                                    <BufferedInputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "54rem",
                                        }}
                                        id="id_ADDR1"
                                        value={dataKCD_VENDOR.ADDR1}
                                        onValueChange={(val) =>
                                            onBufferedInputChangeKCD_VENDOR(
                                                "ADDR1",
                                                val,
                                            )
                                        }
                                    />
                                </span>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "90rem",
                                    }}
                                >
                                    <p style={{ width: "10rem", display: "inline-block", verticalAlign: "bottom", }}>Add2</p>
                                    <BufferedInputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "54rem",
                                        }}
                                        id="id_ADDR2"
                                        value={dataKCD_VENDOR.ADDR2}
                                        onValueChange={(val) =>
                                            onBufferedInputChangeKCD_VENDOR(
                                                "ADDR2",
                                                val,
                                            )
                                        }
                                    />
                                </span>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "90rem",
                                    }}
                                >
                                    <p style={{ width: "10rem", display: "inline-block", }}>Remark</p>
                                    <BufferedInputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "58rem",
                                        }}
                                        id="id_REMARK"
                                        value={dataKCD_VENDOR.REMARK}
                                        onValueChange={(val) =>
                                            onBufferedInputChangeKCD_VENDOR(
                                                "REMARK",
                                                val,
                                            )
                                        }
                                    />
                                </span>
                                <span
                                    style={{
                                        height: "3rem",
                                        display: "block",
                                        width: "60rem",
                                    }}
                                >
                                    <p style={{ width: "10rem", display: "inline-block", color: "red", }}>Business License</p>
                                    <div
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "7rem",
                                            marginTop: "0.5rem",
                                        }}
                                    >
                                        <button>
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
                                            display: "inline-block",
                                            width: "24rem",
                                        }}
                                    >
                                        <p style={{ width: "15rem", display: "inline-block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: "1rem", }}>{dataKCD_VENDOR.fileName}</p>
                                        <button onClick={onDownloadFile}>
                                            <label className="inputFileCustom">
                                                File Download
                                            </label>
                                        </button>
                                    </div>
                                    <div
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "10rem",
                                        }}
                                    >
                                        <button onClick={s3FileDelete}>
                                            File Delete
                                        </button>
                                    </div>
                                </span>
                            </div>
                            <div
                                style={{
                                    width: "38rem",
                                    height: "15rem",
                                    marginBottom: "12rem",
                                    marginLeft: "1rem",
                                    float: "left",
                                }}
                            >
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "34rem",
                                    }}
                                >
                                    <p style={{ width: "8rem", display: "inline-block", color: "red", }}>*Tel No</p>
                                    <BufferedInputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "19rem",
                                        }}
                                        id="id_TEL_NO"
                                        value={dataKCD_VENDOR.TEL_NO}
                                        onValueChange={(val) =>
                                            onBufferedInputChangeKCD_VENDOR(
                                                "TEL_NO",
                                                val,
                                            )
                                        }
                                    />
                                </span>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "34rem",
                                    }}
                                >
                                    <p style={{ width: "8rem", display: "inline-block", }}>Fax No</p>
                                    <BufferedInputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "19rem",
                                        }}
                                        id="id_FAX_NO"
                                        value={dataKCD_VENDOR.FAX_NO}
                                        onValueChange={(val) =>
                                            onBufferedInputChangeKCD_VENDOR(
                                                "FAX_NO",
                                                val,
                                            )
                                        }
                                    />
                                </span>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "28rem",
                                    }}
                                >
                                    <p style={{ width: "8rem", display: "inline-block", color: "red", }}>*Pay Rule</p>
                                    <div
                                        id="payRuleDropdown"
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "19rem",
                                        }}
                                    >
                                        {!isMaterialTeam && isDomesticImportSupplier && (
                                            <Tooltip
                                                target="#payRuleDropdown"
                                                content="Please check with SMC."
                                                position="top"
                                            />
                                        )}
                                        <Dropdown
                                            style={{ width: "19rem" }}
                                            id="id_PAY_TYPE"
                                            value={regKCD_VENDOR_PAY_TERM}
                                            onChange={(e) =>
                                                onDropdownChangeKCD_VENDOR(
                                                    e,
                                                    "PAY_TYPE",
                                                )
                                            }
                                            options={datasKCD_VENDOR_PAY_TERM}
                                            optionLabel="CD_NAME"
                                            filter
                                            disabled={
                                                !isMaterialTeam &&
                                                isDomesticImportSupplier
                                            }
                                        ></Dropdown>
                                    </div>
                                </span>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "28rem",
                                    }}
                                >
                                    <p style={{ width: "8rem", display: "inline-block", color: "red", }}>*Country</p>
                                    <div
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "19rem",
                                        }}
                                    >
                                        <Dropdown
                                            style={{ width: "19rem" }}
                                            id="id_NAT_CD"
                                            value={regKCD_VENDOR_NAT_CD}
                                            onChange={(e) =>
                                                onDropdownChangeKCD_VENDOR(
                                                    e,
                                                    "NAT_CD",
                                                )
                                            }
                                            options={datasKCD_VENDOR_NAT_CD}
                                            optionLabel="NAT_NAME"
                                            filter
                                        ></Dropdown>
                                    </div>
                                </span>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "28rem",
                                    }}
                                >
                                    <p style={{ width: "8rem", display: "inline-block", color: "red", }}>*Permit</p>
                                    <div
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "19rem",
                                        }}
                                    >
                                        <Dropdown
                                            style={{ width: "19rem" }}
                                            id="id_PERMIT"
                                            value={regKCD_VENDOR_PERMIT}
                                            onChange={(e) =>
                                                onDropdownChangeKCD_VENDOR(
                                                    e,
                                                    "PERMIT",
                                                )
                                            }
                                            options={datasKCD_VENDOR_PERMIT}
                                            optionLabel="CD_NAME"
                                        ></Dropdown>
                                    </div>
                                </span>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "28rem",
                                    }}
                                >
                                    <p style={{ width: "8rem", display: "inline-block", }}>Neoe No</p>
                                    <BufferedInputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "6rem",
                                        }}
                                        id="id_NEOE_NO"
                                        value={dataKCD_VENDOR.NEOE_NO}
                                        onValueChange={(val) =>
                                            onBufferedInputChangeKCD_VENDOR(
                                                "NEOE_NO",
                                                val,
                                            )
                                        }
                                    />

                                    <p style={{ width: "6.5rem", display: "inline-block", }}>NSR TR#</p>
                                    <BufferedInputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "6rem",
                                        }}
                                        value={dataKCD_VENDOR.NSR_TR_CD}
                                        onValueChange={(val) =>
                                            onBufferedInputChangeKCD_VENDOR(
                                                "NSR_TR_CD",
                                                val,
                                            )
                                        }
                                    />
                                </span>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "28rem",
                                    }}
                                >
                                    <p style={{ width: "8rem", display: "inline-block", }}>Update User</p>
                                    <InputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "19rem",
                                        }}
                                        id="id_UPD_USER"
                                        value={dataKCD_VENDOR.UPD_USER}
                                        onChange={(e) =>
                                            onInputChangeKCD_VENDOR(
                                                e,
                                                "UPD_USER",
                                            )
                                        }
                                        disabled
                                    />
                                </span>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "28rem",
                                    }}
                                >
                                    <p style={{ width: "8rem", display: "inline-block", }}>Status</p>
                                    <div
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "19rem",
                                        }}
                                    >
                                        <Dropdown
                                            style={{ width: "19rem" }}
                                            id="id_STATUS_CD"
                                            value={regKCD_VENDOR_STATUS_CD}
                                            onChange={(e) =>
                                                onDropdownChangeKCD_VENDOR(
                                                    e,
                                                    "STATUS_CD",
                                                )
                                            }
                                            options={datasKCD_VENDOR_STATUS_CD}
                                            optionLabel="CD_NAME"
                                            editable
                                        ></Dropdown>
                                    </div>
                                </span>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "28rem",
                                    }}
                                >
                                    <p style={{ width: "8rem", display: "inline-block", color: "red", }}>*OverShort</p>
                                    <div
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "19rem",
                                        }}
                                    >
                                        <Dropdown
                                            style={{ width: "19rem" }}
                                            id="id_STATUS_CD"
                                            value={regKCD_VENDOR_OVERSHORT}
                                            onChange={(e) =>
                                                onDropdownChangeKCD_VENDOR(
                                                    e,
                                                    "OVERSHORT_RATE",
                                                )
                                            }
                                            options={datasKCD_VENDOR_OVERSHORT}
                                            optionLabel="CD_NAME"
                                            editable
                                        ></Dropdown>
                                    </div>
                                </span>
                            </div>
                        </div>

                        <div
                            className="field col-8 md:col-8"
                            style={{
                                marginLeft: "10rem",
                                width: "55rem",
                                marginTop: "1rem",
                                display: "flex",
                            }}
                        >
                            <Button
                                style={{ width: "10rem" }}
                                label="Insert"
                                className="p-button-text"
                                onClick={() => saveKCD_VENDOR("INSERT")}
                            />

                            <Button
                                style={{ width: "10rem" }}
                                label="Update"
                                className="p-button-text"
                                onClick={() => saveKCD_VENDOR("UPDATE")}
                            />

                            <Button
                                style={{ width: "10rem" }}
                                label="Copy"
                                className="p-button-text"
                                onClick={() => copyKCD_VENDOR()}
                            />

                            <Button
                                style={{ width: "10rem" }}
                                label="Reset"
                                className="p-button-text"
                                onClick={resetKCD_VENDOR}
                            />

                            <Button
                                style={{ width: "10rem" }}
                                label="Delete"
                                className="p-button-text"
                                onClick={deleteKCD_VENDOR}
                            />
                        </div>
                    </div>
                    <div
                        className="af-div-second"
                        style={{
                            width: "55rem",
                            height: "32rem",
                            marginLeft: "0.5rem",
                            paddingTop: "0.5rem",
                        }}
                    >
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_KCD_BANK}
                            value={datasKCD_BANK}
                            size="small"
                            tableStyle={{ tableLayout: "fixed" }}
                            resizableColumns
                            columnResizeMode="expand"
                            showGridlines
                            selection={selectedKCD_BANK}
                            onSelectionChange={(e) => {
                                setFlagSelectModeKCD_BANK(true);
                                setSelectedKCD_BANK(e.value);
                            }}
                            onRowClick={onRowClickKCD_BANK}
                            dataKey="id"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" "
                            header={headerKCD_BANK}
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="330px"
                            // tableStyle={{height:'20rem'}}
                        >
                            <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                            <AFColumn field="ACCOUNT_NO" headerClassName="t-header" className="test" header=" Account#" style={{}} headerStyle={{ width: "11rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                            <AFColumn field="ACCOUNT_NAME" headerClassName="t-header" header=" Account Name" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                            <AFColumn field="BANK_NAME" headerClassName="t-header" header=" Bank Name" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                            <AFColumn field="GW_N" headerClassName="t-header" header="GW Status" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        </AFDataTable>
                    </div>
                </div>
            </div>

            <Toast ref={toast} />

            <Dialog
                visible={createDialogMgrKcdBankReg}
                position="top-right"
                style={{ width: "80vw" }}
                header="은행계좌등록"
                modal={true}
                className="p-fluid"
                onHide={hideDialogMgrKcdBankReg}
            >
                <iframe
                    src={urlMgrKcdBankReg}
                    width="800px"
                    height="800px"
                    id="id1"
                    className="myClassname"
                    scrolling="no"
                />
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(MgrKcdVendor, comparisonFn);
