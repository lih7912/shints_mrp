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
import { ServiceMgrKCD_VENDOR } from "../service/service_biz/ServiceMgrKCD_VENDOR";
import { ServiceKCD_VENDOR } from "../service/service_common/ServiceKCD_VENDOR";
import { ServiceKCD_CODE } from "../service/service_common/ServiceKCD_CODE";
import { ServiceKCD_NATION } from "../service/service_common/ServiceKCD_NATION";
import { ServiceKCD_BANK } from "../service/service_common/ServiceKCD_BANK";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { ScrollPanel } from "primereact/scrollpanel";

//
import { TabView, TabPanel } from "primereact/tabview";
import "./MgrKcdVendor.scss";

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
    PAY_TERM: 0,
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
    NAT_NAME: "",
    STATUS_NAME: "",
    BANK_NAME: "",
    ACCOUNT_NO: "",
    ACCOUNT_NAME: "",
    VENDOR_TYPE_1: "",
    VENDOR_MATL_TYPE_1: "",
    ETC99: "",
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

const MgrKcdVendor = () => {
    const [qrySupplierType, setQrySupplierType] = useState(emptyKCD_CODE);
    const [qryStatus, setQryStatus] = useState(emptyKCD_CODE);
    const [qryPermit, setQryPermit] = useState(emptyKCD_CODE);
    const [qryMatlType, setQryMatlType] = useState(emptyKCD_CODE);
    const [qrySupplierTypeVal, setQrySupplierTypeVal] = useState("");
    const [qryStatusVal, setQryStatusVal] = useState("");
    const [qryPermitVal, setQryPermitVal] = useState("");
    const [qryMatlTypeVal, setQryMatlTypeVal] = useState("");
    const [qrySupplierName, setQrySupplierName] = useState("");
    const [qryNeoeNo, setQryNeoeNo] = useState("");

    const [datasQrySupplierType, setDatasQrySupplierType] = useState([]);
    const [dataQrySupplierType, setDataQrySupplierType] = useState("");
    const [datasQryStatus, setDatasQryStatus] = useState([]);
    const [dataQryStatus, setDataQryStatus] = useState("");
    const [datasQryPermit, setDatasQryPermit] = useState([]);
    const [dataQryPermit, setDataQryPermit] = useState("");
    const [datasQryMatlType, setDatasQryMatlType] = useState([]);
    const [dataQryMatlType, setDataQryMatlType] = useState("");
    const [dataQrySupplierName, setDataQrySupplierName] = useState("");
    const [dataQryNeoeNo, setDataQryNeoeNo] = useState("");

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

    const serviceMgr1KCD_BANKRef = useRef(null);
    if (!serviceMgr1KCD_BANKRef.current) serviceMgr1KCD_BANKRef.current = new ServiceMgr1KCD_BANK();
    const serviceMgr1KCD_BANK = serviceMgr1KCD_BANKRef.current;

    const serviceMgrKCD_VENDORRef = useRef(null);
    if (!serviceMgrKCD_VENDORRef.current) serviceMgrKCD_VENDORRef.current = new ServiceMgrKCD_VENDOR();
    const serviceMgrKCD_VENDOR = serviceMgrKCD_VENDORRef.current;

    const serviceKCD_VENDORRef = useRef(null);
    if (!serviceKCD_VENDORRef.current) serviceKCD_VENDORRef.current = new ServiceKCD_VENDOR();
    const serviceKCD_VENDOR = serviceKCD_VENDORRef.current;

    const serviceKCD_CODERef = useRef(null);
    if (!serviceKCD_CODERef.current) serviceKCD_CODERef.current = new ServiceKCD_CODE();
    const serviceKCD_CODE = serviceKCD_CODERef.current;

    const serviceKCD_NATIONRef = useRef(null);
    if (!serviceKCD_NATIONRef.current) serviceKCD_NATIONRef.current = new ServiceKCD_NATION();
    const serviceKCD_NATION = serviceKCD_NATIONRef.current;

    const serviceKCD_BANKRef = useRef(null);
    if (!serviceKCD_BANKRef.current) serviceKCD_BANKRef.current = new ServiceKCD_BANK();
    const serviceKCD_BANK = serviceKCD_BANKRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "97vw" });
    const [styleVal1, setStyleVal1] = useState({ width: "65vw" });

    /* */

    useEffect(() => {
        // TEST
        var tUrls = window.location.href.split("/");
        console.log("URL=>" + tUrls[2]);
        var tUrl1 = "";
        if (window.location.href.includes("3203")) {
            tUrl1 = "http://localhost:3203/#/";
        } else if (window.location.href.includes("3288")) {
            tUrl1 = "http://afroba.iptime.org:3288/webapp/mrpapp/index.html#/";
        } else if (window.location.href.includes("afroba")) {
            tUrl1 = "http://afroba.iptime.org:3201/#/";
        } else if (window.location.href.includes("105")) {
            tUrl1 = "http://192.168.0.105:3203/#/";
        } else {
            tUrl1 = "http://localhost:3201/#/";
        }
        setUrlMgrKcdBankReg(tUrl1 + "S011001_KCD_BANK_REG");

        // const serviceMgrKCD_VENDOR = new ServiceMgrKCD_VENDOR();
        serviceMgr1KCD_BANK.mgr1KcdVendor("", "", "", "").then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdVendor call => " + data.length,
                );
                setDatasKCD_VENDOR(data);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdVendor error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        serviceMgr1KCD_BANK.mgr1KcdVendorCode("").then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgr1KCD_BANK.mgr1KcdVendorCode call => " +
                        data.T_KCD_VENDOR_VENDOR_TYPE.length,
                );
                setDatasQrySupplierType(data.T_KCD_VENDOR_VENDOR_TYPE);
                setDatasQryStatus(data.T_KCD_VENDOR_STATUS_CD);
                setDatasQryMatlType(data.T_KCD_VENDOR_MATL_TYPE);

                setDatasKCD_VENDOR_STATUS_CD(data.T_KCD_VENDOR_STATUS_CD);
                setDatasKCD_VENDOR_VENDOR_TYPE(data.T_KCD_VENDOR_VENDOR_TYPE);
                setDatasKCD_VENDOR_MATL_TYPE(data.T_KCD_VENDOR_MATL_TYPE);
                setDatasKCD_VENDOR_NAT_CD(data.T_KCD_VENDOR_NAT_CD);
                setDatasKCD_VENDOR_PERMIT(data.T_KCD_VENDOR_PERMIT);
                setDatasKCD_VENDOR_PAY_TERM(data.T_KCD_VENDOR_PAY_TERM);
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

        // const serviceKCD_BANK = new ServiceKCD_BANK();
    }, []);

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

    const editKCD_VENDOR = (argKCD_VENDOR) => {
        clearSelectedKCD_VENDOR();
        setDataKCD_VENDOR({ ...argKCD_VENDOR });

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
            (val) => String(val.CD_CODE) === String(argKCD_VENDOR.PAY_TYPE),
        );
        setRegKCD_VENDOR_PAY_TERM(_regKCD_VENDOR_PAY_TERM[0]);

        setCreateDialogKCD_VENDOR(true);
    };

    const onInputChangeKCD_VENDOR = (e, name) => {
        let val = (e.target && e.target.value) || "";
        let _dataKCD_VENDOR = { ...dataKCD_VENDOR };
        _dataKCD_VENDOR[`${name}`] = val;

        setDataKCD_VENDOR(_dataKCD_VENDOR);
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
            setRegKCD_VENDOR_VENDOR_TYPE(e.value);
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
            val = (e.value && e.value.CD_CODE) || "";
            console.log(
                "DROPDOWN CHange : PAY_TERM => " +
                    val +
                    "," +
                    JSON.stringify(e.value),
            );
            setRegKCD_VENDOR_PAY_TERM(e.value);
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

        serviceMgr1KCD_BANK
            .mgr1KcdBankVendor(argKCD_VENDOR.VENDOR_CD)
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

    const onRowClick1KCD_VENDOR = (argData) => {
        let argKCD_VENDOR = argData;
        editKCD_VENDOR(argKCD_VENDOR);
        /*
         */
    };

    const searchKCD_VENDOR = () => {
        clearSelectedKCD_VENDOR();
        setCreateDialogKCD_VENDOR(false);

        let _qryStr =
            "query value: " +
            qrySearchStringKCD_VENDOR +
            "=>" +
            qryStatusKCD_VENDOR.CD_CODE;
        console.log("searchKCD_VENDOR : " + _qryStr);
        toast.current.show({
            severity: "success",
            summary: "Query",
            detail: _qryStr,
            life: 3000,
        });
        const serviceMgrKCD_VENDOR = new ServiceMgrKCD_VENDOR();
        serviceMgrKCD_VENDOR
            .getDatasByParam(
                qrySearchStringKCD_VENDOR,
                qryStatusKCD_VENDOR.CD_CODE,
            )
            .then((data) => {
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

    const resetKCD_VENDOR = () => {
        clearSelectedKCD_VENDOR();
        clearSelectedKCD_BANK();
        setDataKCD_VENDOR(emptyKCD_VENDOR);
        setDatasKCD_BANK([]);
        dataKCD_VENDOR.id = 0;
        editKCD_VENDOR(emptyKCD_VENDOR);
    };

    const copyKCD_VENDOR = () => {};

    const saveKCD_VENDOR = () => {
        setSubmittedKCD_VENDOR(true);

        if (typeof dataKCD_VENDOR.id !== "undefined") {
            let _datasKCD_VENDOR = [...datasKCD_VENDOR];
            let _dataKCD_VENDOR = { ...dataKCD_VENDOR };

            if (_dataKCD_VENDOR.VENDOR_CD !== "") {
                _dataKCD_VENDOR.UPD_USER = "ybwon";
            } else {
                _dataKCD_VENDOR.REG_USER = "ybwon";
                _dataKCD_VENDOR.UPD_USER = "ybwon";
            }

            console.log(JSON.stringify(_dataKCD_VENDOR));

            serviceMgr1KCD_BANK
                .mgr1KcdVendorSave(_dataKCD_VENDOR)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        toast.current.show({
                            severity: "success",
                            summary: "Update Succeed",
                            detail: "VENDOR_CD:" + data,
                            life: 3000,
                        });
                        _dataKCD_VENDOR.VENDOR_CD = data;
                        setDataKCD_VENDOR(_dataKCD_VENDOR);

                        serviceMgr1KCD_BANK
                            .mgr1KcdVendor("", "", "", "")
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
        clearSelectedKCD_VENDOR();
        const serviceKCD_VENDOR = new ServiceKCD_VENDOR();
        let _dataKCD_VENDOR = { ...dataKCD_VENDOR };
        console.log("deleteKCD_VENDOR==>" + _dataKCD_VENDOR.id);
        serviceKCD_VENDOR.deleteData(_dataKCD_VENDOR).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                toast.current.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "KCD_VENDOR DELETE",
                    life: 3000,
                });
                const serviceMgrKCD_VENDOR = new ServiceMgrKCD_VENDOR();
                serviceMgrKCD_VENDOR
                    .getDatasByParam(
                        qrySearchStringKCD_VENDOR,
                        qryStatusKCD_VENDOR.CD_CODE,
                    )
                    .then((data) => {
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

        // setDatasKCD_VENDOR(_datasKCD_VENDOR);
        setDeleteDialogKCD_VENDOR(false);
        setDataKCD_VENDOR(emptyKCD_VENDOR);
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "KCD_VENDOR Deleted",
            life: 3000,
        });
    };

    const deleteSelectedKCD_VENDOR = () => {
        const serviceKCD_VENDOR = new ServiceKCD_VENDOR();
        serviceKCD_VENDOR.deletesData(selectedKCD_VENDOR).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                toast.current.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "KCD_VENDOR DELETS => ",
                    life: 3000,
                });
                const serviceMgrKCD_VENDOR = new ServiceMgrKCD_VENDOR();
                serviceMgrKCD_VENDOR
                    .getDatasByParam(
                        qrySearchStringKCD_VENDOR,
                        qryStatusKCD_VENDOR.CD_CODE,
                    )
                    .then((data) => {
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
        setFlagSelectModeKCD_VENDOR(false);
        setDeleteDatasDialogKCD_VENDOR(false);
        setSelectedKCD_VENDOR([]);
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "KCD_VENDOR Deleted",
            life: 3000,
        });
    };

    const clearSelectedKCD_VENDOR = () => {
        setSelectedKCD_VENDOR([]);
        setFlagSelectModeKCD_VENDOR(false);
    };

    // IFRAME_CODE : MgrKcdBankReg
    const insertKCD_BANK = () => {
        setCreateDialogMgrKcdBankReg(true);
    };
    const deleteKCD_BANK = () => {
        // setCreateDialogMgrKcdBankReg(true);
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

    const hideDialogMgrKcdBankReg = () => {
        setCreateDialogMgrKcdBankReg(false);
        console.log("hideDialogMgrKcdBankReg=>" + dataKCD_VENDOR.VENDOR_CD);
        // SERVICE
        serviceMgr1KCD_BANK
            .mgr1KcdBankVendor(dataKCD_VENDOR.VENDOR_CD)
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

    //

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
                    icon="pi pi-search"
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

    const onQrySupplierNameKeyPress = (e) => {
        if (e.key === "Enter") {
            console.log("enter press here! ");
            searchKCD_VENDOR();
        }
    };

    // Export

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
        setDataQrySupplierName(val);
    };

    // Support Area

    const checkDeleteKCD_BANK = () => {
        deleteKCD_BANK();
    };
    return (
        <div>
            <div
                style={{ marginTop: "1.3rem", width: "100rem", height: "4rem" }}
            >
                <span style={{ width: "40rem", marginTop: "1rem" }}>
                    <p style={{ width: "8rem", display: "inline-block" }}>Supplier Name</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "31rem",
                        }}
                        type="search"
                        onChange={(e) =>
                            onInputChangeQrySupplierName(e, "QrySupplierName")
                        }
                        onKeyPress={(e) => onQrySupplierNameKeyPress(e)}
                    />
                </span>
                <span style={{ width: "10rem" }}>
                    <p style={{ width: "8rem", display: "inline-block" }}>Supplier Type</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "4rem",
                        }}
                    >
                        <Dropdown
                            id="id_QrySupplierType"
                            value={dataQrySupplierType}
                            onChange={(e) =>
                                onDropdownChangeQrySupplierType(e, "")
                            }
                            options={datasQrySupplierType}
                            optionLabel="CD_NAME"
                        ></Dropdown>
                    </div>
                </span>
                <span style={{ width: "10rem" }}>
                    <p style={{ width: "8rem", display: "inline-block" }}>Matl Type</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "4rem",
                        }}
                    >
                        <Dropdown
                            id="id_QryMatlType"
                            value={dataQryMatlType}
                            onChange={(e) => onDropdownChangeQryMatlType(e, "")}
                            options={datasQryMatlType}
                            optionLabel="CD_NAME"
                        ></Dropdown>
                    </div>
                </span>
                <span style={{ width: "10rem" }}>
                    <p style={{ width: "8rem", display: "inline-block" }}>Status</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "4rem",
                        }}
                    >
                        <Dropdown
                            id="id_QryStatus"
                            value={dataQryStatus}
                            onChange={(e) => onDropdownChangeQryStatus(e, "")}
                            options={datasQryStatus}
                            optionLabel="CD_NAME"
                        ></Dropdown>
                    </div>
                </span>

                <div style={{ display: "inline-block" }}>
                    <span
                        style={{
                            width: "40rem",
                            marginLeft: "8rem",
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
                            icon="pi pi-search"
                            className="p-button-text"
                            style={{ height: "1.1rem" }}
                            size="small"
                            onClick={searchKCD_VENDOR}
                        />

                        <Button
                            label="Excel"
                            icon="pi pi-upload"
                            className="p-button-text"
                            style={{ height: "1.1rem" }}
                            size="small"
                            onClick={exportExcel}
                        />
                    </span>
                </div>
            </div>

            <div
                style={{ marginLeft: "1rem", width: "99rem", height: "26rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_KCD_VENDOR}
                    size="small"
                    value={datasKCD_VENDOR}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selection={selectedKCD_VENDOR}
                    onSelectionChange={(e) => {
                        setFlagSelectModeKCD_VENDOR(true);
                        setSelectedKCD_VENDOR(e.value);
                        console.log(
                            "selected length:" + selectedKCD_VENDOR.length,
                        );
                        onRowClick1KCD_VENDOR(e.value);
                    }}
                    onRowClick={onRowClickKCD_VENDOR}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 12 }}
                    emptyMessage="데이터가 없습니다."
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="24rem"
                >
                    <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                    <AFColumn field="VENDOR_CD" header="Supplier CD" headerStyle={{ width: "10rem", height: "1.8rem", textAlign: "center", }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" header="Supplier Name" headerStyle={{ width: "10rem", height: "1.8rem", textAlign: "center", }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_TYPE_1" header="Supplier Type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_MATL_TYPE_1" header="Matl Type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="REG_NO" header="Reg NO" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="USER_NAME" header="User Name" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="EMAIL" header="Email" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="TEL_NO" header="Tel No" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="NAT_NAME" header="Nat" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="ADDR1" header="Addr1" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="ADDR2" header="Addr2" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="STATUS_NAME" header="Status" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PAY_TYPE" header="Pay Type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div style={{ width: "100rem", height: "27rem" }}>
                <div className="flex flex-row justify-content-center align-items-center">
                    <div
                        style={{
                            width: "63rem",
                            height: "27rem",
                            float: "left",
                        }}
                    >
                        <div className="flex flex-row justify-content-center align-items-center">
                            <div style={{ width: "35rem", height: "27rem" }}>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "33rem",
                                    }}
                                >
                                    <p style={{ width: "8rem", display: "inline-block", }}>Supplier Code</p>
                                    <InputText
                                        disabled
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
                                        width: "33rem",
                                    }}
                                >
                                    <p style={{ width: "8rem", display: "inline-block", }}>Supplier Name</p>
                                    <InputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "23rem",
                                        }}
                                        id="id_VENDOR_NAME"
                                        value={dataKCD_VENDOR.VENDOR_NAME}
                                        onChange={(e) =>
                                            onInputChangeKCD_VENDOR(
                                                e,
                                                "VENDOR_NAME",
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
                                    <p style={{ width: "8rem", display: "inline-block", }}>Supplier Type</p>
                                    <div
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "23rem",
                                        }}
                                    >
                                        <Dropdown
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
                                    <p style={{ width: "8rem", display: "inline-block", }}>Matl Type</p>
                                    <div
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "23rem",
                                        }}
                                    >
                                        <Dropdown
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
                                    <p style={{ width: "8rem", display: "inline-block", }}>Reg No</p>
                                    <InputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "23rem",
                                        }}
                                        id="id_REG_NO"
                                        value={dataKCD_VENDOR.REG_NO}
                                        onChange={(e) =>
                                            onInputChangeKCD_VENDOR(e, "REG_NO")
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
                                    <p style={{ width: "8rem", display: "inline-block", }}>President</p>
                                    <InputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "23rem",
                                        }}
                                        id="id_PRESIDENT"
                                        value={dataKCD_VENDOR.PRESIDENT}
                                        onChange={(e) =>
                                            onInputChangeKCD_VENDOR(
                                                e,
                                                "PRESIDENT",
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
                                    <p style={{ width: "8rem", display: "inline-block", }}>P-In-Charge</p>
                                    <InputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "19rem",
                                        }}
                                        id="id_USER_NAME"
                                        value={dataKCD_VENDOR.USER_NAME}
                                        onChange={(e) =>
                                            onInputChangeKCD_VENDOR(
                                                e,
                                                "USER_NAME",
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
                                    <p style={{ width: "8rem", display: "inline-block", color: "red", }}>*Email</p>
                                    <InputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "23rem",
                                        }}
                                        id="id_EMAIL"
                                        value={dataKCD_VENDOR.EMAIL}
                                        onChange={(e) =>
                                            onInputChangeKCD_VENDOR(e, "EMAIL")
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
                                    <p style={{ width: "8rem", display: "inline-block", color: "red", }}>*Tel No</p>
                                    <InputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "19rem",
                                        }}
                                        id="id_TEL_NO"
                                        value={dataKCD_VENDOR.TEL_NO}
                                        onChange={(e) =>
                                            onInputChangeKCD_VENDOR(e, "TEL_NO")
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
                                    <p style={{ width: "8rem", display: "inline-block", }}>Fax No</p>
                                    <InputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "19rem",
                                        }}
                                        id="id_FAX_NO"
                                        value={dataKCD_VENDOR.FAX_NO}
                                        onChange={(e) =>
                                            onInputChangeKCD_VENDOR(e, "FAX_NO")
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
                                    <p style={{ width: "8rem", display: "inline-block", }}>Address</p>
                                    <InputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "54rem",
                                        }}
                                        id="id_ADDR1"
                                        value={dataKCD_VENDOR.ADDR1}
                                        onChange={(e) =>
                                            onInputChangeKCD_VENDOR(e, "ADDR1")
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
                                    {/* <p style={{ width: '8rem', display: 'inline-block'}}> Address2 </p> */}
                                    <InputText
                                        style={{
                                            marginLeft: "8.5rem",
                                            display: "inline-block",
                                            width: "54rem",
                                        }}
                                        id="id_ADDR2"
                                        value={dataKCD_VENDOR.ADDR2}
                                        onChange={(e) =>
                                            onInputChangeKCD_VENDOR(e, "ADDR2")
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
                                    <p style={{ width: "8rem", display: "inline-block", }}>Remark</p>
                                    <InputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "54rem",
                                        }}
                                        id="id_REMARK"
                                        value={dataKCD_VENDOR.REMARK}
                                        onChange={(e) =>
                                            onInputChangeKCD_VENDOR(e, "REMARK")
                                        }
                                    />
                                </span>
                            </div>
                            <div
                                style={{
                                    width: "30rem",
                                    height: "27rem",
                                    marginLeft: "rem",
                                    float: "left",
                                }}
                            >
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "28rem",
                                    }}
                                >
                                    <p style={{ width: "8rem", display: "inline-block", }}>User Tax</p>
                                    <InputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "19rem",
                                        }}
                                        id="id_USER_TAX"
                                        value={dataKCD_VENDOR.USER_TAX}
                                        onChange={(e) =>
                                            onInputChangeKCD_VENDOR(
                                                e,
                                                "USER_TAX",
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
                                    <p style={{ width: "8rem", display: "inline-block", }}>Email Tax</p>
                                    <InputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "19rem",
                                        }}
                                        id="id_EMAIL_TAX"
                                        value={dataKCD_VENDOR.EMAIL_TAX}
                                        onChange={(e) =>
                                            onInputChangeKCD_VENDOR(
                                                e,
                                                "EMAIL_TAX",
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
                                    <p style={{ width: "8rem", display: "inline-block", }}>Pay Rule</p>
                                    <div
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "19rem",
                                        }}
                                    >
                                        <Dropdown
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
                                    <p style={{ width: "8rem", display: "inline-block", }}>Country</p>
                                    <div
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "19rem",
                                        }}
                                    >
                                        <Dropdown
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
                                    <p style={{ width: "8rem", display: "inline-block", }}>Permit</p>
                                    <div
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "19rem",
                                        }}
                                    >
                                        <Dropdown
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
                                    <InputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "19rem",
                                        }}
                                        id="id_NEOE_NO"
                                        value={dataKCD_VENDOR.NEOE_NO}
                                        onChange={(e) =>
                                            onInputChangeKCD_VENDOR(
                                                e,
                                                "NEOE_NO",
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
                                    <p style={{ width: "8rem", display: "inline-block", }}>GW</p>
                                    <InputText
                                        disabled
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "19rem",
                                        }}
                                        id="id_GW"
                                        value={dataKCD_VENDOR.GW}
                                        onChange={(e) =>
                                            onInputChangeKCD_VENDOR(e, "GW")
                                        }
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                    <Divider
                        layout="vertical"
                        style={{ float: "left", height: "28.5rem" }}
                    />

                    <div style={{ width: "35rem", height: "27rem" }}>
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_KCD_BANK}
                            value={datasKCD_BANK}
                            size="small"
                            resizableColumns
                            columnResizeMode="fit"
                            showGridlines
                            selection={selectedKCD_BANK}
                            onSelectionChange={(e) => {
                                setFlagSelectModeKCD_BANK(true);
                                setSelectedKCD_BANK(e.value);
                                console.log(
                                    "selected length:" +
                                        selectedKCD_BANK.length,
                                );
                            }}
                            onRowClick={onRowClickKCD_BANK}
                            dataKey="id"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 50 }}
                            emptyMessage=" "
                            header={headerKCD_BANK}
                            responsiveLayout="scroll"
                            scrollHeight="22rem"
                            tableStyle={{ height: "20rem" }}
                        >
                            <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                            <AFColumn field="ACCOUNT_NO" className="test" header=" ACCOUT NO" style={{}} headerStyle={{ width: "11rem" }} bodyStyle={{ width: "10rem", height: "1.1rem" }} ></AFColumn>
                            <AFColumn field="ACCOUNT_NAME" header=" ACCOUNT NAME" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem", height: "1.1rem" }} ></AFColumn>
                            <AFColumn field="BANK_NAME" header=" BANK NAME" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem", height: "1.1rem" }} ></AFColumn>
                        </AFDataTable>
                    </div>
                </div>
            </div>
            <Divider style={{ marginTop: "1.5rem" }} />

            <div style={{ width: "100rem", height: "2rem" }}>
                <div className="formgrid grid">
                    <div
                        className="field col-8 md:col-8"
                        style={{ marginLeft: "23rem", width: "41rem" }}
                    >
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Reset"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={resetKCD_VENDOR}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Save"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={saveKCD_VENDOR}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Delete"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={copyKCD_VENDOR}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="전자결졔 "
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={copyKCD_VENDOR}
                        />
                    </div>
                    <div
                        className="field col-4 md:col-4"
                        style={{
                            display: "inline-block",
                            marginLeft: "13rem",
                            width: "23rem",
                        }}
                    >
                        <Button
                            style={{ display: "inline-block", width: "11rem" }}
                            label="Insert Bank"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={insertKCD_BANK}
                        />

                        <Button
                            style={{ display: "inline-block", width: "11rem" }}
                            label="Delete Bank"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={checkDeleteKCD_BANK}
                        />
                    </div>
                </div>
            </div>

            <Divider style={{ marginTop: "1.5rem" }} />

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
