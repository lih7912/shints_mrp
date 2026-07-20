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
import { Calendar } from "primereact/calendar";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0102_KCD_BUYER } from "../service/service_biz/ServiceS0102_KCD_BUYER";
import { ServiceKCD_BUYER } from "../service/service_common/ServiceKCD_BUYER";
import { ServiceKCD_CODE } from "../service/service_common/ServiceKCD_CODE";
import { ServiceKCD_BANK } from "../service/service_common/ServiceKCD_BANK";
import { ServiceKCD_USER } from "../service/service_common/ServiceKCD_USER";
import { ServiceKCD_NATION } from "../service/service_common/ServiceKCD_NATION";
import { ServiceKCD_PAY_RULE } from "../service/service_common/ServiceKCD_PAY_RULE";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { ScrollPanel } from "primereact/scrollpanel";

import { TabView, TabPanel } from "primereact/tabview";
import "./MgrKcdVendor.scss";

const emptyKCD_BUYER_TEAM_INFO = {
    id: 0,
    col1: "",
    col2: "",
    col3: "",
};

const emptyKCD_BUYER_CREDIT_RATING = {
    id: 0,
    BUYER_CD: "",
    CREDIT_RATING: "",
    CREDIT_EXPIRE: "",
    REG_DATETIME: "",
    REG_USER: "",
};

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

const emptyKCD_PAY_RULE = {
    id: 0,
    SEQ: 0,
    CD_CODE: 0,
    REMARK: "",
    RATE: "",
    FLAG: "",
    TERM: 0,
    FN: "",
    YN_DEFAULT: "",
    DAYS1: "",
    PERCENT1: "",
    DAYS2: "",
    PERCENT2: "",
    DAYS8: "",
    PERCENT8: "",
    ETC99: "",
};

const emptyKCD_USER = {
    id: 0,
    USER_ID: "",
    PASSWD: "",
    USER_NAME: "",
    FACTORY_CD: "",
    PART: "",
    RANK1: "",
    EMAIL: "",
    USER_LEVEL: "",
    STATUS_CD: "",
    AUTH_KEY: "",
    ID_RSA: "",
    TEL_NO: "",
    EXCEL: "",
    BUYER_TEAM: "",
    CELLULAR: "",
    EMP_NO: "",
    ETC99: "",
};

const emptyKCD_BUYER = {
    id: 0,
    BUYER_CD: "",
    BUYER_NAME: "",
    BUYER_TYPE: "",
    STATUS_CD: "",
    BUYER_TEAM: "",
    SHINTS_USER: "",
    BUYER_ABBR: "",
    USER_NAME: "",
    EMAIL: "",
    TEL_NO: "",
    FAX_NO: "",
    NAT_CD: "",
    ADDR1: "",
    SHIP_ADDR1: "",
    SHIP_ADDR2: "",
    SHIP_ADDR3: "",
    MOM_CD: "",
    NEOE_BUYER_CD: "",
    NEOE_BUYER_CD_MOM: "",
    NEOE_TYPE: "",
    BANK_CD: "",
    BANK_NAME: "",
    ACCOUNT_NAME: "",
    ACCOUNT_NO: "",
    PAY_RULE: "",
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

const MgrKcdBuyer = () => {
    const [dataUrlFile1, setDataUrlFile1] = useState("");
    const [dataUrlFile2, setDataUrlFile2] = useState("");
    const [dataUrlFile3, setDataUrlFile3] = useState("");

    const [dataFile1, setDataFile1] = useState("");
    const [dataFile2, setDataFile2] = useState("");
    const [dataFile3, setDataFile3] = useState("");

    const [qrySearchStringKCD_BUYER, setQrySearchStringKCD_BUYER] =
        useState("");
    const [qryStatusKCD_BUYER, setQryStatusKCD_BUYER] = useState(emptyKCD_CODE);
    const [qrySearchStringKCD_BANK, setQrySearchStringKCD_BANK] = useState("");
    const [qryStatusKCD_BANK, setQryStatusKCD_BANK] = useState(emptyKCD_CODE);

    const [dataQryBuyerName, setDataQryBuyerName] = useState("");
    const [dataQryBuyerCd, setDataQryBuyerCd] = useState("");
    const [datasQryStatus, setDatasQryStatus] = useState([]);
    const [dataQryStatus, setDataQryStatus] = useState("");
    const [dataQryOrderDateS, setDataQryOrderDateS] = useState("");
    const [dataQryOrderDateE, setDataQryOrderDateE] = useState("");

    const [datasKCD_BUYER_CREDIT_RATING, setDatasKCD_BUYER_CREDIT_RATING] =
        useState([]);
    const [dataKCD_BUYER_CREDIT_RATING, setDataKCD_BUYER_CREDIT_RATING] =
        useState(emptyKCD_BUYER_CREDIT_RATING);
    const [
        datasKCD_BUYER_CREDIT_RATING_CREDIT_RATING,
        setDatasKCD_BUYER_CREDIT_RATING_CREDIT_RATING,
    ] = useState([]);
    const [
        dataKCD_BUYER_CREDIT_RATING_CREDIT_RATING,
        setDataKCD_BUYER_CREDIT_RATING_CREDIT_RATING,
    ] = useState({});
    /*
  CREDIT_RATING: String! ^M
  CREDIT_EXPIRE: String! ^M
  */

    const [datasKCD_BUYER_TEAM_INFO, setDatasKCD_BUYER_TEAM_INFO] = useState(
        [],
    );
    const [dataKCD_BUYER_TEAM_INFO, setDataKCD_BUYER_TEAM_INFO] = useState(
        emptyKCD_BUYER_TEAM_INFO,
    );
    const [selectedKCD_BUYER_TEAM_INFO, setSelectedKCD_BUYER_TEAM_INFO] =
        useState([]);

    const [regKCD_BUYER_STATUS_CD, setRegKCD_BUYER_STATUS_CD] = useState({});
    const [regKCD_BUYER_NAT_CD, setRegKCD_BUYER_NAT_CD] = useState({});
    const [regKCD_BUYER_PAY_RULE, setRegKCD_BUYER_PAY_RULE] = useState({});
    const [regKCD_BUYER_BUYER_TEAM, setRegKCD_BUYER_BUYER_TEAM] = useState({});
    const [regKCD_BUYER_SHINTS_USER, setRegKCD_BUYER_SHINTS_USER] = useState(
        {},
    );
    const [regKCD_BUYER_loss_flag, setRegKCD_BUYER_loss_flag] = useState({});
    const [regKCD_BANK_STATUS_CD, setRegKCD_BANK_STATUS_CD] = useState({});

    const [datasKCD_BUYER_BUYER_TYPE, setDatasKCD_BUYER_BUYER_TYPE] = useState(
        [],
    );
    const [dataKCD_BUYER_BUYER_TYPE, setDataKCD_BUYER_BUYER_TYPE] = useState(
        {},
    );

    const [datasKCD_BUYER_STATUS_CD, setDatasKCD_BUYER_STATUS_CD] = useState(
        [],
    );
    const [dataKCD_BUYER_STATUS_CD, setDataKCD_BUYER_STATUS_CD] = useState({});

    const [datasKCD_BUYER_BUYER_TEAM, setDatasKCD_BUYER_BUYER_TEAM] = useState(
        [],
    );
    const [dataKCD_BUYER_BUYER_TEAM, setDataKCD_BUYER_BUYER_TEAM] = useState(
        {},
    );

    const [datasKCD_BUYER_SHINTS_USER, setDatasKCD_BUYER_SHINTS_USER] =
        useState([]);
    const [dataKCD_BUYER_SHINTS_USER, setDataKCD_BUYER_SHINTS_USER] = useState(
        {},
    );

    const [datasKCD_BUYER_TEAM_USER, setDatasKCD_BUYER_TEAM_USER] = useState(
        [],
    );
    const [dataKCD_BUYER_TEAM_USER, setDataKCD_BUYER_TEAM_USER] = useState({});

    const [datasKCD_BUYER_NAT_CD, setDatasKCD_BUYER_NAT_CD] = useState([]);
    const [dataKCD_BUYER_NAT_CD, setDataKCD_BUYER_NAT_CD] = useState({});

    const [datasKCD_BUYER_NEOE_TYPE, setDatasKCD_BUYER_NEOE_TYPE] = useState(
        [],
    );
    const [dataKCD_BUYER_NEOE_TYPE, setDataKCD_BUYER_NEOE_TYPE] = useState({});

    const [datasKCD_BUYER_BANK_CD, setDatasKCD_BUYER_BANK_CD] = useState([]);
    const [dataKCD_BUYER_BANK_CD, setDataKCD_BUYER_BANK_CD] = useState({});

    const [datasKCD_BUYER_PAY_RULE, setDatasKCD_BUYER_PAY_RULE] = useState([]);
    const [dataKCD_BUYER_PAY_RULE, setDataKCD_BUYER_PAY_RULE] = useState({});

    const [datasKCD_BUYER, setDatasKCD_BUYER] = useState([]);
    const [datasKCD_BANK, setDatasKCD_BANK] = useState([]);

    const [createDialogKCD_BUYER, setCreateDialogKCD_BUYER] = useState(false);
    const [deleteDialogKCD_BUYER, setDeleteDialogKCD_BUYER] = useState(false);
    const [deleteDatasDialogKCD_BUYER, setDeleteDatasDialogKCD_BUYER] =
        useState(false);

    const [submittedKCD_BUYER, setSubmittedKCD_BUYER] = useState(false);
    const [flagModalKCD_BUYER, setFlagModalKCD_BUYER] = useState(false);
    const [flagSelectModeKCD_BUYER, setFlagSelectModeKCD_BUYER] =
        useState(false);
    const [
        flagSelectModeKCD_BUYER_TEAM_INFO,
        setFlagSelectModeKCD_BUYER_TEAM_INFO,
    ] = useState(false);

    const dt_KCD_BUYER = useRef(null);
    const [createDialogKCD_BANK, setCreateDialogKCD_BANK] = useState(false);
    const [deleteDialogKCD_BANK, setDeleteDialogKCD_BANK] = useState(false);
    const [deleteDatasDialogKCD_BANK, setDeleteDatasDialogKCD_BANK] =
        useState(false);

    const dt_KCD_BUYER_TEAM_INFO = useRef(null);
    const [createDialogKCD_BANK_TEAM_INFO, setCreateDialogKCD_BANK_TEAM_INFO] =
        useState(false);
    const [deleteDialogKCD_BANK_TEAM_INFO, setDeleteDialogKCD_BANK_TEAM_INFO] =
        useState(false);
    const [
        deleteDatasDialogKCD_BANK_TEAM_INFO,
        setDeleteDatasDialogKCD_BANK_TEAM_INFO,
    ] = useState(false);

    const [submittedKCD_BANK, setSubmittedKCD_BANK] = useState(false);
    const [flagModalKCD_BANK, setFlagModalKCD_BANK] = useState(false);
    const [flagSelectModeKCD_BANK, setFlagSelectModeKCD_BANK] = useState(false);

    const dt_KCD_BANK = useRef(null);

    const [dataKCD_BUYER, setDataKCD_BUYER] = useState(emptyKCD_BUYER);
    const [selectedKCD_BUYER, setSelectedKCD_BUYER] = useState([]);

    const [dataKCD_BANK, setDataKCD_BANK] = useState(emptyKCD_BANK);
    const [selectedKCD_BANK, setSelectedKCD_BANK] = useState([]);

    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0102_KCD_BUYERRef = useRef(null);
    if (!serviceS0102_KCD_BUYERRef.current) serviceS0102_KCD_BUYERRef.current = new ServiceS0102_KCD_BUYER();
    const serviceS0102_KCD_BUYER = serviceS0102_KCD_BUYERRef.current;

    const serviceKCD_BUYERRef = useRef(null);
    if (!serviceKCD_BUYERRef.current) serviceKCD_BUYERRef.current = new ServiceKCD_BUYER();
    const serviceKCD_BUYER = serviceKCD_BUYERRef.current;
    const serviceKCD_CODERef = useRef(null);
    if (!serviceKCD_CODERef.current) serviceKCD_CODERef.current = new ServiceKCD_CODE();
    const serviceKCD_CODE = serviceKCD_CODERef.current;
    const serviceKCD_BANKRef = useRef(null);
    if (!serviceKCD_BANKRef.current) serviceKCD_BANKRef.current = new ServiceKCD_BANK();
    const serviceKCD_BANK = serviceKCD_BANKRef.current;
    const serviceKCD_USERRef = useRef(null);
    if (!serviceKCD_USERRef.current) serviceKCD_USERRef.current = new ServiceKCD_USER();
    const serviceKCD_USER = serviceKCD_USERRef.current;
    const serviceKCD_NATIONRef = useRef(null);
    if (!serviceKCD_NATIONRef.current) serviceKCD_NATIONRef.current = new ServiceKCD_NATION();
    const serviceKCD_NATION = serviceKCD_NATIONRef.current;
    const serviceKCD_PAY_RULERef = useRef(null);
    if (!serviceKCD_PAY_RULERef.current) serviceKCD_PAY_RULERef.current = new ServiceKCD_PAY_RULE();
    const serviceKCD_PAY_RULE = serviceKCD_PAY_RULERef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* */

    useEffect(() => {
        // const serviceMgrKCD_VENDOR = new ServiceMgrKCD_VENDOR();
        serviceS0102_KCD_BUYER
            .mgr1KcdBuyer(dataQryBuyerCd, "", "", "", "")
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdBuyer call => " +
                            data.length,
                    );
                    setDatasKCD_BUYER(data);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        serviceS0102_KCD_BUYER.mgr1KcdBuyerCode("").then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgr1KCD_BANK.mgr1KcdBuyerCode call => " +
                        data.T_KCD_BUYER_STATUS_CD.length,
                );

                setDatasQryStatus(data.T_KCD_BUYER_STATUS_CD);

                setDatasKCD_BUYER_STATUS_CD(data.T_KCD_BUYER_STATUS_CD);
                setDatasKCD_BUYER_BUYER_TYPE(data.T_KCD_BUYER_BUYER_TYPE);
                setDatasKCD_BUYER_BUYER_TEAM(data.T_KCD_BUYER_BUYER_TEAM);
                setDatasKCD_BUYER_NAT_CD(data.T_KCD_BUYER_NAT_CD);
                setDatasKCD_BUYER_NEOE_TYPE(data.T_KCD_BUYER_TEAM_NEOE);
                setDatasKCD_BUYER_BANK_CD(data.T_KCD_BUYER_BANK_CD);
                setDatasKCD_BUYER_PAY_RULE(data.T_KCD_BUYER_PAY_RULE);
                setDatasKCD_BUYER_CREDIT_RATING_CREDIT_RATING(
                    data.T_KCD_BUYER_CREDIT,
                );
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

        serviceS0102_KCD_BUYER.mgr1KcdBuyerUser("").then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdBuyerUser call => " +
                        data.length,
                );
                setDatasKCD_BUYER_SHINTS_USER(data);
                setDatasKCD_BUYER_TEAM_USER(data);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyerUser error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    }, []);

    /******************* EDIT TABLE START: KCD_BUYER ****************************************/

    const hideDialogKCD_BUYER = () => {
        setSubmittedKCD_BUYER(false);
        setCreateDialogKCD_BUYER(false);
    };

    const hideDeleteDialogKCD_BUYER = () => {
        setDeleteDialogKCD_BUYER(false);
    };

    const hideDeleteDatasDialogKCD_BUYER = () => {
        clearSelectedKCD_BUYER();
        setDeleteDatasDialogKCD_BUYER(false);
    };

    const editKCD_BUYER = (argKCD_BUYER) => {
        // clearSelectedKCD_BUYER();
        setDataKCD_BUYER({ ...argKCD_BUYER });

        editKCD_BUYER_BUYER_TYPE(argKCD_BUYER.BUYER_TYPE);
        editKCD_BUYER_STATUS_CD(argKCD_BUYER.STATUS_CD);
        editKCD_BUYER_BUYER_TEAM(argKCD_BUYER.BUYER_TEAM);
        editKCD_BUYER_SHINTS_USER(argKCD_BUYER.SHINTS_USER);
        editKCD_BUYER_NAT_CD(argKCD_BUYER.NAT_CD);
        editKCD_BUYER_BANK_CD(argKCD_BUYER.BANK_CD);
        editKCD_BUYER_PAY_RULE(argKCD_BUYER.PAY_RULE);
    };

    /******************* EDIT TABLE END: KCD_BUYER ****************************************/

    /******************* EDIT TABLE START: KCD_BANK ****************************************/

    /******************* EDIT TABLE END: KCD_BANK ****************************************/

    /************************* DATAGRID : KCD_BUYER START **************************************************/
    const onRowClick1KCD_BUYER = (argData) => {
        let argKCD_BUYER = argData;
        editKCD_BUYER(argKCD_BUYER);

        var tUrls = window.location.href.split("/");
        var tUrl =
            "http://afroba.iptime.org:3202/restapi/fileupload/vendor/file1/" +
            argKCD_BUYER.BUYER_CD;
        setDataUrlFile1(tUrl);
        tUrl =
            "http://afroba.iptime.org:3202/restapi/fileupload/vendor/file2/" +
            argKCD_BUYER.BUYER_CD;
        setDataUrlFile2(tUrl);
        tUrl =
            "http://afroba.iptime.org:3202/restapi/fileupload/vendor/file3/" +
            argKCD_BUYER.BUYER_CD;
        setDataUrlFile3(tUrl);

        serviceS0102_KCD_BUYER
            .mgr1KcdBuyerCreditRating(argKCD_BUYER.BUYER_CD)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdBuyerCreditRating call => " +
                            data.length,
                    );
                    if (data.length > 0) {
                        setDataKCD_BUYER_CREDIT_RATING(data[0]);
                        var tObj = data[0];
                        console.log(JSON.stringify(tObj));
                        editKCD_BUYER_CREDIT_RATING_CREDIT_RATING(
                            tObj.CREDIT_RATING,
                        );
                    } else {
                        setDataKCD_BUYER_CREDIT_RATING(
                            emptyKCD_BUYER_CREDIT_RATING,
                        );
                        editKCD_BUYER_CREDIT_RATING_CREDIT_RATING("");
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        serviceS0102_KCD_BUYER
            .mgr1KcdBuyerTeamInfo(argKCD_BUYER.BUYER_CD)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdBuyerTeamInfo call => " +
                            data.length,
                    );
                    setDatasKCD_BUYER_TEAM_INFO(data);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        serviceS0102_KCD_BUYER
            .mgr1KcdBuyerFile(argKCD_BUYER.BUYER_CD)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdBuyerFile call => " +
                            data.id,
                    );
                    setDataFile1(data.file1);
                    setDataFile2(data.file2);
                    setDataFile3(data.file3);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const onRowClick1KCD_BUYER_TEAM_INFO = (argData) => {
        let argKCD_BUYER_TEAM_INFO = argData;
        setDataKCD_BUYER_TEAM_INFO(argData);

        // editKCD_BUYER(argKCD_BUYER);
    };

    const onRowClickKCD_BUYER_TEAM_INFO = (event) => {};

    const onRowClickKCD_BUYER = (event) => {};

    const searchKCD_BUYER = () => {
        clearSelectedKCD_BUYER();
        setCreateDialogKCD_BUYER(false);

        serviceS0102_KCD_BUYER
            .mgr1KcdBuyer(dataQryBuyerCd, "", "", "", "")
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdBuyer call => " +
                            data.length,
                    );
                    setDatasKCD_BUYER(data);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const copyKCD_BUYER = () => {
        dataKCD_BUYER.id = 0;
        saveKCD_BUYER();
    };

    const resetKCD_BUYER = () => {
        // clearSelectedKCD_BUYER();
        // setDatasKCD_BUYER([]);
        setDataKCD_BUYER(emptyKCD_BUYER);
        dataKCD_BUYER.id = 0;
        editKCD_BUYER(emptyKCD_BUYER);
    };

    const saveKCD_BUYER = () => {
        setSubmittedKCD_BUYER(true);

        if (typeof dataKCD_BUYER.id !== "undefined") {
            let _datasKCD_BUYER = [...datasKCD_BUYER];
            let _dataKCD_BUYER = { ...dataKCD_BUYER };

            console.log(JSON.stringify(_dataKCD_BUYER));

            serviceS0102_KCD_BUYER
                .mgr1KcdBuyerSave(_dataKCD_BUYER)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        toast.current.show({
                            severity: "success",
                            summary: "Update Succeed",
                            detail: "VENDOR_CD:" + data,
                            life: 3000,
                        });
                        _dataKCD_BUYER.BUYER_CD = data;
                        setDataKCD_BUYER(_dataKCD_BUYER);

                        serviceS0102_KCD_BUYER
                            .mgr1KcdBuyer("", "", "", "", "")
                            .then((data) => {
                                if (typeof data.graphQLErrors === "undefined") {
                                    console.log(
                                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer call => " +
                                            data.length,
                                    );
                                    setDatasKCD_BUYER(data);
                                } else {
                                    console.log(
                                        "ServiceMgrKCD_BUYER.mgr1KcdBuyer error => " +
                                            JSON.stringify(data.graphQLErrors),
                                    );
                                }
                            });
                    } else {
                        _dataKCD_BUYER.BUYER_CD = "";
                        setDataKCD_BUYER(_dataKCD_BUYER);

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
        }
    };

    const saveKCD_BUYER_CREDIT_RATING = () => {
        // setSubmittedKCD_BUYER(true);

        if (typeof dataKCD_BUYER_CREDIT_RATING.id !== "undefined") {
            let _datasKCD_BUYER_CREDIT_RATING = [
                ...datasKCD_BUYER_CREDIT_RATING,
            ];
            let _dataKCD_BUYER_CREDIT_RATING = {
                ...dataKCD_BUYER_CREDIT_RATING,
            };

            _dataKCD_BUYER_CREDIT_RATING.BUYER_CD = dataKCD_BUYER.BUYER_CD;
            _dataKCD_BUYER_CREDIT_RATING.REG_USER = "ybwon";

            console.log(JSON.stringify(_dataKCD_BUYER_CREDIT_RATING));

            serviceS0102_KCD_BUYER
                .mgr1KcdBuyerCreditRatingSave(_dataKCD_BUYER_CREDIT_RATING)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        toast.current.show({
                            severity: "success",
                            summary: "Update Succeed",
                            detail: "VENDOR_CD:" + data,
                            life: 3000,
                        });
                        setDataKCD_BUYER_CREDIT_RATING(
                            _dataKCD_BUYER_CREDIT_RATING,
                        );
                    } else {
                        setDataKCD_BUYER_CREDIT_RATING(
                            emptyKCD_BUYER_CREDIT_RATING,
                        );

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
        }
    };

    const deleteKCD_BUYER = () => {};

    const deleteSelectedKCD_BUYER = () => {};

    const clearSelectedKCD_BUYER = () => {
        setSelectedKCD_BUYER([]);
        setFlagSelectModeKCD_BUYER(false);
    };

    const findIndexByIdKCD_BUYER_TEAM_INFO = (id) => {
        let index = -1;
        for (let i = 0; i < datasKCD_BUYER_TEAM_INFO.length; i++) {
            if (datasKCD_BUYER_TEAM_INFO[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const headerKCD_BUYER = (
        <div style={{ width: "100rem", height: "3rem" }}>
            <span style={{ width: "40rem", display: "inline-block" }}>
                <p style={{ textAlign: "left", width: "20rem", display: "inline-block", height: "2rem", }}>({datasKCD_BUYER.length}건이 조회되었습니다.)</p>
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
                    onClick={searchKCD_BUYER}
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

    const headerKCD_BUYER_TEAM_INFO = (
        <div style={{ width: "100rem", height: "0.5rem" }}></div>
    );

    const createDialogFooterKCD_BUYER = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDialogKCD_BUYER}
            />
            <Button
                label="Save"
                icon="pi pi-check"
                className="p-button-text"
                onClick={saveKCD_BUYER}
            />
            <Button
                label="Copy"
                icon="pi pi-check"
                className="p-button-text"
                onClick={copyKCD_BUYER}
            />
        </>
    );

    const deleteDialogFooterKCD_BUYER = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDeleteDialogKCD_BUYER}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-text"
                onClick={deleteKCD_BUYER}
            />
        </>
    );

    const deleteDatasDialogFooterKCD_BUYER = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDeleteDatasDialogKCD_BUYER}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-text"
                onClick={deleteSelectedKCD_BUYER}
            />
        </>
    );

    /************************* DATAGRID : KCD_BUYER END **************************************************/

    /************************* DATAGRID : KCD_BANK START **************************************************/

    const searchKCD_BANK = () => {
        clearSelectedKCD_BANK();
        setCreateDialogKCD_BANK(false);

        let _qryStr =
            "query value: " +
            qrySearchStringKCD_BANK +
            "=>" +
            qryStatusKCD_BANK.CD_CODE;
        console.log("searchKCD_BANK : " + _qryStr);
        toast.current.show({
            severity: "success",
            summary: "Query",
            detail: _qryStr,
            life: 8000,
        });
        const serviceKCD_BANK = new ServiceKCD_BANK();
        serviceKCD_BANK.getDatas().then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasKCD_BANK(data);
            } else {
                var tStr = data.graphQLErrors[0].message;
                toast.current.show({
                    severity: "success",
                    summary: "Query Error",
                    detail: tStr,
                    life: 8000,
                });
            }
        });
    };

    const clearSelectedKCD_BANK = () => {
        setSelectedKCD_BANK([]);
        setFlagSelectModeKCD_BANK(false);
    };

    const onInputChangeKCD_BUYER_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BUYER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BUYER[`${name}`] = parseInt(val);

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const onInputChangeKCD_BUYER_BUYER_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BUYER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BUYER[`${name}`] = parseInt(val);

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const editKCD_BUYER_CREDIT_RATING_CREDIT_RATING = (argValue) => {
        let _dataKCD_BUYER_CREDIT_RATING_CREDIT_RATING =
            datasKCD_BUYER_CREDIT_RATING_CREDIT_RATING.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataKCD_BUYER_CREDIT_RATING_CREDIT_RATING(
            _dataKCD_BUYER_CREDIT_RATING_CREDIT_RATING[0],
        );
    };

    const onDropdownChangeKCD_BUYER_CREDIT_RATING_CREDIT_RATING = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_BUYER_CREDIT_RATING = { ...dataKCD_BUYER_CREDIT_RATING };

        setDataKCD_BUYER_CREDIT_RATING_CREDIT_RATING(e.value);

        let tTypeVal = _dataKCD_BUYER_CREDIT_RATING[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_BUYER_CREDIT_RATING[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_BUYER_CREDIT_RATING[`${name}`] = parseInt(val);
        }

        setDataKCD_BUYER_CREDIT_RATING(_dataKCD_BUYER_CREDIT_RATING);
    };

    const editKCD_BUYER_BUYER_TYPE = (argValue) => {
        let _dataKCD_BUYER_BUYER_TYPE = datasKCD_BUYER_BUYER_TYPE.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_BUYER_BUYER_TYPE(_dataKCD_BUYER_BUYER_TYPE[0]);
    };

    const onDropdownChangeKCD_BUYER_BUYER_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        setDataKCD_BUYER_BUYER_TYPE(e.value);

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_BUYER[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_BUYER[`${name}`] = parseInt(val);
        }

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const editKCD_BUYER_STATUS_CD = (argValue) => {
        let _dataKCD_BUYER_STATUS_CD = datasKCD_BUYER_STATUS_CD.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_BUYER_STATUS_CD(_dataKCD_BUYER_STATUS_CD[0]);
    };

    const onDropdownChangeKCD_BUYER_STATUS_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        setDataKCD_BUYER_STATUS_CD(e.value);

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_BUYER[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_BUYER[`${name}`] = parseInt(val);
        }

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const editKCD_BUYER_BUYER_TEAM = (argValue) => {
        let _dataKCD_BUYER_BUYER_TEAM = datasKCD_BUYER_BUYER_TEAM.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_BUYER_BUYER_TEAM(_dataKCD_BUYER_BUYER_TEAM[0]);
    };

    const onDropdownChangeKCD_BUYER_BUYER_TEAM = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        setDataKCD_BUYER_BUYER_TEAM(e.value);

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_BUYER[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_BUYER[`${name}`] = parseInt(val);
        }

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const editKCD_BUYER_SHINTS_USER = (argValue) => {
        let _dataKCD_BUYER_SHINTS_USER = datasKCD_BUYER_SHINTS_USER.filter(
            (val) => val.USER_ID === argValue,
        );
        setDataKCD_BUYER_SHINTS_USER(_dataKCD_BUYER_SHINTS_USER[0]);
    };

    const onDropdownChangeKCD_BUYER_SHINTS_USER = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        setDataKCD_BUYER_SHINTS_USER(e.value);

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_BUYER[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_BUYER[`${name}`] = parseInt(val);
        }

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const onDropdownChangeKCD_BUYER_TEAM_USER = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

        let _dataKCD_BUYER_TEAM_INFO = { ...dataKCD_BUYER_TEAM_INFO };
        let _datasKCD_BUYER_TEAM_INFO = [...datasKCD_BUYER_TEAM_INFO];

        const index = findIndexByIdKCD_BUYER_TEAM_INFO(
            dataKCD_BUYER_TEAM_INFO.id,
        );
        _dataKCD_BUYER_TEAM_INFO.col3 = val;
        _datasKCD_BUYER_TEAM_INFO[index] = _dataKCD_BUYER_TEAM_INFO;

        setDatasKCD_BUYER_TEAM_INFO(_datasKCD_BUYER_TEAM_INFO);
    };

    const onInputChangeKCD_BUYER_BUYER_ABBR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BUYER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BUYER[`${name}`] = parseInt(val);

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const onInputChangeKCD_BUYER_USER_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BUYER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BUYER[`${name}`] = parseInt(val);

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const onInputChangeKCD_BUYER_EMAIL = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BUYER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BUYER[`${name}`] = parseInt(val);

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const onInputChangeKCD_BUYER_TEL_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BUYER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BUYER[`${name}`] = parseInt(val);

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const onInputChangeKCD_BUYER_FAX_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BUYER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BUYER[`${name}`] = parseInt(val);

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const editKCD_BUYER_NAT_CD = (argValue) => {
        let _dataKCD_BUYER_NAT_CD = datasKCD_BUYER_NAT_CD.filter(
            (val) => val.NAT_CD === argValue,
        );
        setDataKCD_BUYER_NAT_CD(_dataKCD_BUYER_NAT_CD[0]);
    };

    const onDropdownChangeKCD_BUYER_NAT_CD = (e, name) => {
        let val = (e.value && e.value.NAT_CD) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        setDataKCD_BUYER_NAT_CD(e.value);

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_BUYER[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_BUYER[`${name}`] = parseInt(val);
        }

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const onInputChangeKCD_BUYER_ADDR1 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BUYER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BUYER[`${name}`] = parseInt(val);

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const onInputChangeKCD_BUYER_SHIP_ADDR1 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BUYER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BUYER[`${name}`] = parseInt(val);

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const onInputChangeKCD_BUYER_SHIP_ADDR2 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BUYER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BUYER[`${name}`] = parseInt(val);

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const onInputChangeKCD_BUYER_SHIP_ADDR3 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BUYER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BUYER[`${name}`] = parseInt(val);

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const onInputChangeKCD_BUYER_NEOE_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BUYER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BUYER[`${name}`] = parseInt(val);

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const onInputChangeKCD_BUYER_NEOE_BUYER_CD_MOM = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BUYER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BUYER[`${name}`] = parseInt(val);

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const onDropdownChangeKCD_BUYER_NEOE_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        setDataKCD_BUYER_NEOE_TYPE(e.value);

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_BUYER[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_BUYER[`${name}`] = parseInt(val);
        }

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const editKCD_BUYER_BANK_CD = (argValue) => {
        let _dataKCD_BUYER_BANK_CD = datasKCD_BUYER_BANK_CD.filter(
            (val) => val.BANK_CD === argValue,
        );
        setDataKCD_BUYER_BANK_CD(_dataKCD_BUYER_BANK_CD[0]);
    };

    const onDropdownChangeKCD_BUYER_BANK_CD = (e, name) => {
        let val = (e.value && e.value.BANK_CD) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        setDataKCD_BUYER_BANK_CD(e.value);

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_BUYER[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_BUYER[`${name}`] = parseInt(val);
        }

        serviceS0102_KCD_BUYER.mgr1KcdBuyerBank(val).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdBuyerBank call => " +
                        data.length,
                );
                var tObj = data[0];
                _dataKCD_BUYER.ACCOUNT_NO = tObj.ACCOUNT_NO;
                _dataKCD_BUYER.ACCOUNT_NAME = tObj.ACCOUNT_NAME;
                _dataKCD_BUYER.BANK_NAME = tObj.BANK_NAME;

                setDataKCD_BUYER(_dataKCD_BUYER);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const onInputChangeKCD_BUYER_BANK_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BUYER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BUYER[`${name}`] = parseInt(val);

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const onInputChangeKCD_BUYER_ACCOUNT_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BUYER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BUYER[`${name}`] = parseInt(val);

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const onInputChangeKCD_BUYER_ACCOUNT_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_BUYER[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_BUYER[`${name}`] = parseInt(val);

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const editKCD_BUYER_PAY_RULE = (argValue) => {
        let _dataKCD_BUYER_PAY_RULE = datasKCD_BUYER_PAY_RULE.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_BUYER_PAY_RULE(_dataKCD_BUYER_PAY_RULE[0]);
    };

    const onDropdownChangeKCD_BUYER_PAY_RULE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_BUYER = { ...dataKCD_BUYER };

        setDataKCD_BUYER_PAY_RULE(e.value);

        let tTypeVal = _dataKCD_BUYER[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_BUYER[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_BUYER[`${name}`] = parseInt(val);
        }

        setDataKCD_BUYER(_dataKCD_BUYER);
    };

    const onCalChangeKCD_BUYER_CREDIT_RATING_CREDIT_EXPIRE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }
        let _dataKCD_BUYER_CREDIT_RATING = { ...dataKCD_BUYER_CREDIT_RATING };
        _dataKCD_BUYER_CREDIT_RATING.CREDIT_EXPIRE = val;
        setDataKCD_BUYER_CREDIT_RATING(_dataKCD_BUYER_CREDIT_RATING);
    };

    // QRY
    const onInputChangeQryBuyerName = (e, name) => {
        let val = (e.target && e.target.value) || "";
        setDataQryBuyerName(val);
    };

    const onQryBuyerNameKeyPress = (e) => {
        if (e.key === "Enter") {
            console.log("enter press here! ");
            searchKCD_BANK();
        }
    };

    const onInputChangeQryBuyerCd = (e, name) => {
        let val = (e.target && e.target.value) || "";
        setDataQryBuyerCd(val);
    };

    const onQryBuyerCdKeyPress = (e) => {
        if (e.key === "Enter") {
            console.log("enter press here! ");
            searchKCD_BANK();
        }
    };

    const onBuyerCdKeyPress = (e) => {
        if (e.key === "Enter") {
            let _dataKCD_BUYER = { ...dataKCD_BUYER };
            _dataKCD_BUYER.id = 0;
            setDataKCD_BUYER(_dataKCD_BUYER);
        }
    };

    const onDropdownChangeQryStatus = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";
        setDataQryStatus(val);
    };

    const onCalChangeQryOrderDateS = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }
        setDataQryOrderDateS(val);
    };

    const onCalChangeQryOrderDateE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }
        setDataQryOrderDateE(val);
    };

    // Export

    const exportExcel = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasKCD_BUYER);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFile(excelBuffer, "바이어목록");
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

    const onFileUploadFile1 = () => {
        toast.current.show({
            severity: "info",
            summary: "Success",
            detail: "File1 Uploaded with Basic Mode",
        });
        setDataFile1("거래명세서");
    };

    const onFileUploadFile2 = () => {
        toast.current.show({
            severity: "info",
            summary: "Success",
            detail: "File2 Uploaded with Basic Mode",
        });
        setDataFile2("LOGO");
    };

    const onFileUploadFile3 = () => {
        toast.current.show({
            severity: "info",
            summary: "Success",
            detail: "File3 Uploaded with Basic Mode",
        });
        setDataFile3("매뉴얼");
    };
    const onDownloadFile1 = () => {
        var tUrls = window.location.href.split("/");

        var tUrl =
            "http://afroba.iptime.org:3202/restapi/filedown/vendor/file1/" +
            dataKCD_BUYER.BUYER_CD +
            ".pdf";
        if (dataFile1 === "none" || dataFile1 === "") {
        } else {
            window.open(tUrl);
        }
    };
    const onDownloadFile2 = () => {
        var tUrls = window.location.href.split("/");

        var tUrl =
            "http://afroba.iptime.org:3202/restapi/filedown/vendor/file2/" +
            dataKCD_BUYER.BUYER_CD +
            ".pdf";
        if (dataFile2 === "none" || dataFile2 === "") {
        } else {
            window.open(tUrl);
        }
    };
    const onDownloadFile3 = () => {
        var tUrls = window.location.href.split("/");

        var tUrl =
            "http://afroba.iptime.org:3202/restapi/filedown/vendor/file3/" +
            dataKCD_BUYER.BUYER_CD +
            ".pdf";
        if (dataFile3 === "none" || dataFile3 === "") {
        } else {
            window.open(tUrl);
        }
    };

    // Support Area

    const changeDateVal = (argVal) => {
        if (argVal === "") return argVal;

        var tYear = parseInt(argVal.substring(0, 4));
        var tMon = parseInt(argVal.substring(4, 6));
        var tDay = parseInt(argVal.substring(6));

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

        var yyyy = tDate.getFullYear();

        var tRet = yyyy + mm_str + dd_str;
        return tRet;
    };

    return (
        <div className="af-div-main">
            <div style={{ marginTop: "1rem", width: "100rem", height: "2rem" }}>
                <span style={{ width: "19rem" }}>
                    <p style={{ width: "8rem", display: "inline-block" }}>Buyer Code??</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        type="search"
                        onChange={(e) =>
                            onInputChangeQryBuyerCd(e, "QryBuyerCd")
                        }
                        placeholder=""
                        onKeyPress={(e) => onQryBuyerCdKeyPress(e)}
                    />
                </span>
                <span style={{ width: "40rem" }}>
                    <p style={{ width: "8rem", display: "inline-block" }}>Buyer Name</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "31rem",
                        }}
                        type="search"
                        onChange={(e) =>
                            onInputChangeQryBuyerName(e, "QryBuyerName")
                        }
                        placeholder=""
                        onKeyPress={(e) => onQryBuyerNameKeyPress(e)}
                    />
                </span>
                <span style={{ width: "19rem" }}>
                    <p style={{ width: "8rem", display: "inline-block" }}>Status</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Dropdown
                            id="id_QryStatus"
                            value={dataQryStatus}
                            onChange={(e) => onDropdownChangeQryStatus(e, "")}
                            options={datasQryStatus}
                            optionLabel="CD_NAME"
                            placeholder="Select One"
                        ></Dropdown>
                    </div>
                </span>
            </div>
            <div style={{ width: "100rem", height: "2rem" }}>
                <span style={{ width: "20rem" }}>
                    <p style={{ width: "8rem", display: "inline-block" }}>Order Date</p>
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
                            id="id_QryOrderDateS"
                            value={changeDateVal(dataQryOrderDateS)}
                            onChange={(e) =>
                                onCalChangeQryOrderDateS(e, "QryOrderDateS")
                            }
                        />
                    </div>
                </span>
                <span style={{ width: "20rem" }}>
                    <p style={{ width: "8rem", display: "inline-block" }}>~</p>
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
                            id="id_QryOrderDateE"
                            value={changeDateVal(dataQryOrderDateE)}
                            onChange={(e) =>
                                onCalChangeQryOrderDateE(e, "QryOrderDateE")
                            }
                        />
                    </div>
                </span>
            </div>
            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "22rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_KCD_BUYER}
                    size="small"
                    value={datasKCD_BUYER}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selection={selectedKCD_BUYER}
                    onSelectionChange={(e) => {
                        setFlagSelectModeKCD_BUYER(true);
                        setSelectedKCD_BUYER(e.value);
                        console.log(
                            "selected length:" + selectedKCD_BUYER.length,
                        );
                        onRowClick1KCD_BUYER(e.value);
                    }}
                    onRowClick={onRowClickKCD_BUYER}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 18 }}
                    emptyMessage="데이타가 없습니다"
                    header={headerKCD_BUYER}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                    <AFColumn field="BUYER_CD" header="바이어코드" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" header="바이어명" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="CREDIT_RATING" header="바이어신용등급" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="USER_NAME" header="담당자" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="EMAIL" header="이메일" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="TEL_NO" header="전화번호" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="NAT_NAME" header="국가" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ADDR1" header="주소1" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ADDR2" header="주소2" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="STATUS_NAME" header="상태" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="PAY_RULE_NAME" header="결제조건" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="BANK_CD" header="은행코드" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="BANK_NAME" header="은행명" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ACCOUNT_NO" header="계좌번호" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ACCOUNT_NAME" header="계좌명" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div style={{ width: "100rem", height: "2rem" }}>
                <div className="formgrid grid">
                    <div className="field col-8 md:col-8">
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Reset"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={resetKCD_BUYER}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Save"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={saveKCD_BUYER}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Delete"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={copyKCD_BUYER}
                        />
                    </div>
                </div>
            </div>

            <Divider />

            <div style={{ width: "100rem", height: "40rem" }}>
                <div className="flex flex-row justify-content-center align-items-center">
                    <div style={{ width: "70rem", height: "40rem" }}>
                        <div className="flex flex-column justify-content-center align-items-center">
                            <div style={{ width: "70rem", height: "25rem" }}>
                                <div className="flex flex-row justify-content-center align-items-center">
                                    <div
                                        style={{
                                            width: "35rem",
                                            height: "25rem",
                                        }}
                                    >
                                        <span
                                            style={{
                                                height: "2rem",
                                                display: "block",
                                                width: "33rem",
                                            }}
                                        >
                                            <p style={{ width: "8rem", display: "inline-block", }}>Buyer Code</p>
                                            <InputText
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    display: "inline-block",
                                                    width: "10rem",
                                                }}
                                                id="id_BUYER_CD"
                                                value={dataKCD_BUYER.BUYER_CD}
                                                onChange={(e) =>
                                                    onInputChangeKCD_BUYER_BUYER_CD(
                                                        e,
                                                        "BUYER_CD",
                                                    )
                                                }
                                                onKeyPress={(e) =>
                                                    onBuyerCdKeyPress(e)
                                                }
                                            />

                                            <InputText
                                                disabled
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    display: "inline-block",
                                                    width: "13rem",
                                                }}
                                                id="id_BUYER_id"
                                                value={dataKCD_BUYER.id}
                                            />
                                        </span>
                                        <span
                                            style={{
                                                height: "2rem",
                                                display: "block",
                                                width: "33rem",
                                            }}
                                        >
                                            <p style={{ width: "8rem", display: "inline-block", }}>Buyer Name</p>
                                            <InputText
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    display: "inline-block",
                                                    width: "23rem",
                                                }}
                                                id="id_BUYER_NAME"
                                                value={dataKCD_BUYER.BUYER_NAME}
                                                onChange={(e) =>
                                                    onInputChangeKCD_BUYER_BUYER_NAME(
                                                        e,
                                                        "BUYER_NAME",
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
                                            <p style={{ width: "8rem", display: "inline-block", }}>Buyer Type</p>
                                            <div
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    display: "inline-block",
                                                    width: "23rem",
                                                }}
                                            >
                                                <Dropdown
                                                    id="id_BUYER_TYPE"
                                                    value={
                                                        dataKCD_BUYER_BUYER_TYPE
                                                    }
                                                    onChange={(e) =>
                                                        onDropdownChangeKCD_BUYER_BUYER_TYPE(
                                                            e,
                                                            "BUYER_TYPE",
                                                        )
                                                    }
                                                    options={
                                                        datasKCD_BUYER_BUYER_TYPE
                                                    }
                                                    optionLabel="CD_NAME"
                                                    placeholder="Select One"
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
                                            <p style={{ width: "8rem", display: "inline-block", }}>Status</p>
                                            <div
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    display: "inline-block",
                                                    width: "23rem",
                                                }}
                                            >
                                                <Dropdown
                                                    id="id_STATUS_CD"
                                                    value={
                                                        dataKCD_BUYER_STATUS_CD
                                                    }
                                                    onChange={(e) =>
                                                        onDropdownChangeKCD_BUYER_STATUS_CD(
                                                            e,
                                                            "STATUS_CD",
                                                        )
                                                    }
                                                    options={
                                                        datasKCD_BUYER_STATUS_CD
                                                    }
                                                    optionLabel="CD_NAME"
                                                    placeholder="Select One"
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
                                            <p style={{ width: "8rem", display: "inline-block", }}>Team</p>
                                            <div
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    display: "inline-block",
                                                    width: "23rem",
                                                }}
                                            >
                                                <Dropdown
                                                    id="id_BUYER_TEAM"
                                                    value={
                                                        dataKCD_BUYER_BUYER_TEAM
                                                    }
                                                    onChange={(e) =>
                                                        onDropdownChangeKCD_BUYER_BUYER_TEAM(
                                                            e,
                                                            "BUYER_TEAM",
                                                        )
                                                    }
                                                    options={
                                                        datasKCD_BUYER_BUYER_TEAM
                                                    }
                                                    optionLabel="CD_NAME"
                                                    placeholder="Select One"
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
                                            <p style={{ width: "8rem", display: "inline-block", }}>User</p>
                                            <div
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    display: "inline-block",
                                                    width: "23rem",
                                                }}
                                            >
                                                <Dropdown
                                                    id="id_SHINTS_USER"
                                                    value={
                                                        dataKCD_BUYER_SHINTS_USER
                                                    }
                                                    onChange={(e) =>
                                                        onDropdownChangeKCD_BUYER_SHINTS_USER(
                                                            e,
                                                            "SHINTS_USER",
                                                        )
                                                    }
                                                    options={
                                                        datasKCD_BUYER_SHINTS_USER
                                                    }
                                                    optionLabel="USER_NAME"
                                                    placeholder="Select One"
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
                                                id="id_BUYER_ABBR"
                                                value={dataKCD_BUYER.BUYER_ABBR}
                                                onChange={(e) =>
                                                    onInputChangeKCD_BUYER_BUYER_ABBR(
                                                        e,
                                                        "BUYER_ABBR",
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
                                            <p style={{ width: "8rem", display: "inline-block", }}>Charge</p>
                                            <InputText
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    display: "inline-block",
                                                    width: "23rem",
                                                }}
                                                id="id_USER_NAME"
                                                value={dataKCD_BUYER.USER_NAME}
                                                onChange={(e) =>
                                                    onInputChangeKCD_BUYER_USER_NAME(
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
                                            <p style={{ width: "8rem", display: "inline-block", }}>EMAIL</p>
                                            <InputText
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    display: "inline-block",
                                                    width: "23rem",
                                                }}
                                                id="id_EMAIL"
                                                value={dataKCD_BUYER.EMAIL}
                                                onChange={(e) =>
                                                    onInputChangeKCD_BUYER_EMAIL(
                                                        e,
                                                        "EMAIL",
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
                                            <p style={{ width: "8rem", display: "inline-block", }}>Tel No</p>
                                            <InputText
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    display: "inline-block",
                                                    width: "23rem",
                                                }}
                                                id="id_TEL_NO"
                                                value={dataKCD_BUYER.TEL_NO}
                                                onChange={(e) =>
                                                    onInputChangeKCD_BUYER_TEL_NO(
                                                        e,
                                                        "TEL_NO",
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
                                            <p style={{ width: "8rem", display: "inline-block", }}>Fax No</p>
                                            <InputText
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    display: "inline-block",
                                                    width: "23rem",
                                                }}
                                                id="id_FAX_NO"
                                                value={dataKCD_BUYER.FAX_NO}
                                                onChange={(e) =>
                                                    onInputChangeKCD_BUYER_FAX_NO(
                                                        e,
                                                        "FAX_NO",
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
                                            <p style={{ width: "8rem", display: "inline-block", }}>Country</p>
                                            <div
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    display: "inline-block",
                                                    width: "23rem",
                                                }}
                                            >
                                                <Dropdown
                                                    id="id_NAT_CD"
                                                    value={dataKCD_BUYER_NAT_CD}
                                                    onChange={(e) =>
                                                        onDropdownChangeKCD_BUYER_NAT_CD(
                                                            e,
                                                            "NAT_CD",
                                                        )
                                                    }
                                                    options={
                                                        datasKCD_BUYER_NAT_CD
                                                    }
                                                    optionLabel="NAT_NAME"
                                                    placeholder="Select One"
                                                ></Dropdown>
                                            </div>
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            width: "30rem",
                                            height: "25rem",
                                        }}
                                    >
                                        <span
                                            style={{
                                                height: "2rem",
                                                display: "block",
                                                width: "33rem",
                                            }}
                                        >
                                            <p style={{ width: "8rem", display: "inline-block", }}>Neoe Byr Cd</p>
                                            <InputText
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    display: "inline-block",
                                                    width: "23rem",
                                                }}
                                                id="id_NEOE_BUYER_CD"
                                                value={
                                                    dataKCD_BUYER.NEOE_BUYER_CD
                                                }
                                                onChange={(e) =>
                                                    onInputChangeKCD_BUYER_NEOE_BUYER_CD(
                                                        e,
                                                        "NEOE_BUYER_CD",
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
                                            <p style={{ width: "8rem", display: "inline-block", }}>Neoe Mon</p>
                                            <InputText
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    display: "inline-block",
                                                    width: "23rem",
                                                }}
                                                id="id_NEOE_BUYER_CD_MOM"
                                                value={
                                                    dataKCD_BUYER.NEOE_BUYER_CD_MOM
                                                }
                                                onChange={(e) =>
                                                    onInputChangeKCD_BUYER_NEOE_BUYER_CD_MOM(
                                                        e,
                                                        "NEOE_BUYER_CD_MOM",
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
                                            <p style={{ width: "8rem", display: "inline-block", }}>Neoe Type</p>
                                            <div
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    display: "inline-block",
                                                    width: "23rem",
                                                }}
                                            >
                                                <Dropdown
                                                    id="id_NEOE_TYPE"
                                                    value={
                                                        dataKCD_BUYER_NEOE_TYPE
                                                    }
                                                    onChange={(e) =>
                                                        onDropdownChangeKCD_BUYER_NEOE_TYPE(
                                                            e,
                                                            "NEOE_TYPE",
                                                        )
                                                    }
                                                    options={
                                                        datasKCD_BUYER_NEOE_TYPE
                                                    }
                                                    optionLabel="CD_NAME"
                                                    placeholder="Select One"
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
                                            <p style={{ width: "8rem", display: "inline-block", }}>Pay Bank</p>
                                            <div
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    display: "inline-block",
                                                    width: "23rem",
                                                }}
                                            >
                                                <Dropdown
                                                    id="id_BANK_CD"
                                                    value={
                                                        dataKCD_BUYER_BANK_CD
                                                    }
                                                    onChange={(e) =>
                                                        onDropdownChangeKCD_BUYER_BANK_CD(
                                                            e,
                                                            "BANK_CD",
                                                        )
                                                    }
                                                    options={
                                                        datasKCD_BUYER_BANK_CD
                                                    }
                                                    optionLabel="BANK_NAME"
                                                    placeholder="Select One"
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
                                            <p style={{ width: "8rem", display: "inline-block", }}>Bank Name</p>
                                            <InputText
                                                disabled
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    display: "inline-block",
                                                    width: "23rem",
                                                }}
                                                id="id_BANK_NAME"
                                                value={dataKCD_BUYER.BANK_NAME}
                                                onChange={(e) =>
                                                    onInputChangeKCD_BUYER_BANK_NAME(
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
                                            <p style={{ width: "8rem", display: "inline-block", }}>예금주</p>
                                            <InputText
                                                disabled
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    display: "inline-block",
                                                    width: "23rem",
                                                }}
                                                id="id_ACCOUNT_NAME"
                                                value={
                                                    dataKCD_BUYER.ACCOUNT_NAME
                                                }
                                                onChange={(e) =>
                                                    onInputChangeKCD_BUYER_ACCOUNT_NAME(
                                                        e,
                                                        "ACCOUNT_NAME",
                                                    )
                                                }
                                            />
                                        </span>
                                        <span
                                            disable
                                            style={{
                                                height: "2rem",
                                                display: "block",
                                                width: "33rem",
                                            }}
                                        >
                                            <p style={{ width: "8rem", display: "inline-block", }}>계좌번호</p>
                                            <InputText
                                                disabled
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    display: "inline-block",
                                                    width: "23rem",
                                                }}
                                                id="id_ACCOUNT_NO"
                                                value={dataKCD_BUYER.ACCOUNT_NO}
                                                onChange={(e) =>
                                                    onInputChangeKCD_BUYER_ACCOUNT_NO(
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
                                            <p style={{ width: "8rem", display: "inline-block", }}>Pay Rule</p>
                                            <div
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    display: "inline-block",
                                                    width: "23rem",
                                                }}
                                            >
                                                <Dropdown
                                                    id="id_PAY_RULE"
                                                    value={
                                                        dataKCD_BUYER_PAY_RULE
                                                    }
                                                    onChange={(e) =>
                                                        onDropdownChangeKCD_BUYER_PAY_RULE(
                                                            e,
                                                            "PAY_RULE",
                                                        )
                                                    }
                                                    options={
                                                        datasKCD_BUYER_PAY_RULE
                                                    }
                                                    optionLabel="REMARK"
                                                    placeholder="Select One"
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
                                            <p style={{ width: "8rem", display: "inline-block", }} ></p> </span> <span disable style={{ height: "2rem", display: "block", width: "33rem", }} > <p style={{ width: "8rem", display: "inline-block", }}>CREDIT</p>
                                            <div
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    display: "inline-block",
                                                    width: "23rem",
                                                }}
                                            >
                                                <Dropdown
                                                    id="id_CREDIT_RATING"
                                                    value={
                                                        dataKCD_BUYER_CREDIT_RATING_CREDIT_RATING
                                                    }
                                                    onChange={(e) =>
                                                        onDropdownChangeKCD_BUYER_CREDIT_RATING_CREDIT_RATING(
                                                            e,
                                                            "CREDIT_RATING",
                                                        )
                                                    }
                                                    options={
                                                        datasKCD_BUYER_CREDIT_RATING_CREDIT_RATING
                                                    }
                                                    optionLabel="CD_NAME"
                                                    placeholder="Select One"
                                                ></Dropdown>
                                            </div>
                                        </span>
                                        <span
                                            disable
                                            style={{
                                                height: "2rem",
                                                display: "block",
                                                width: "33rem",
                                            }}
                                        >
                                            <p style={{ width: "8rem", display: "inline-block", }}>EXPIRE</p>
                                            <div
                                                style={{
                                                    marginLeft: "0.5rem",
                                                    display: "inline-block",
                                                    width: "23rem",
                                                }}
                                            >
                                                <Calendar
                                                    showButtonBar
                                                    dateFormat="yymmdd"
                                                    id="id_CREDIT_EXPIRE"
                                                    value={changeDateVal(
                                                        dataKCD_BUYER_CREDIT_RATING.CREDIT_EXPIRE,
                                                    )}
                                                    onChange={(e) =>
                                                        onCalChangeKCD_BUYER_CREDIT_RATING_CREDIT_EXPIRE(
                                                            e,
                                                            "CREDIT_EXPIRE",
                                                        )
                                                    }
                                                />
                                            </div>
                                        </span>
                                        <span
                                            disable
                                            style={{
                                                height: "2rem",
                                                display: "block",
                                                width: "33rem",
                                            }}
                                        >
                                            <p style={{ width: "8rem", display: "inline-block", }}></p>
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
                                                    onClick={
                                                        saveKCD_BUYER_CREDIT_RATING
                                                    }
                                                />
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ width: "70rem", height: "12rem" }}>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "50rem",
                                    }}
                                >
                                    <p style={{ width: "8rem", display: "inline-block", }}>Addr1</p>
                                    <InputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "40rem",
                                        }}
                                        id="id_ADDR1"
                                        value={dataKCD_BUYER.ADDR1}
                                        onChange={(e) =>
                                            onInputChangeKCD_BUYER_ADDR1(
                                                e,
                                                "ADDR1",
                                            )
                                        }
                                    />
                                </span>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "50rem",
                                    }}
                                >
                                    <p style={{ width: "8rem", display: "inline-block", }}>Ship Addr1</p>
                                    <InputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "40rem",
                                        }}
                                        id="id_SHIP_ADDR1"
                                        value={dataKCD_BUYER.SHIP_ADDR1}
                                        onChange={(e) =>
                                            onInputChangeKCD_BUYER_SHIP_ADDR1(
                                                e,
                                                "SHIP_ADDR1",
                                            )
                                        }
                                    />
                                </span>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "50rem",
                                    }}
                                >
                                    <p style={{ width: "8rem", display: "inline-block", }}>Ship Addr2</p>
                                    <InputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "40rem",
                                        }}
                                        id="id_SHIP_ADDR2"
                                        value={dataKCD_BUYER.SHIP_ADDR2}
                                        onChange={(e) =>
                                            onInputChangeKCD_BUYER_SHIP_ADDR2(
                                                e,
                                                "SHIP_ADDR2",
                                            )
                                        }
                                    />
                                </span>
                                <span
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "50rem",
                                    }}
                                >
                                    <p style={{ width: "8rem", display: "inline-block", }}>Ship Addr3</p>
                                    <InputText
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "40rem",
                                        }}
                                        id="id_SHIP_ADDR3"
                                        value={dataKCD_BUYER.SHIP_ADDR3}
                                        onChange={(e) =>
                                            onInputChangeKCD_BUYER_SHIP_ADDR3(
                                                e,
                                                "SHIP_ADDR3",
                                            )
                                        }
                                    />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div style={{ width: "30rem", height: "40rem" }}>
                        <div className="flex flex-column justify-content-center align-items-center">
                            <div style={{ width: "30rem", height: "20rem" }}>
                                <AFDataTable preventUnrelatedRerender
                                    ref={dt_KCD_BUYER_TEAM_INFO}
                                    size="small"
                                    value={datasKCD_BUYER_TEAM_INFO}
                                    resizableColumns
                                    columnResizeMode="fit"
                                    showGridlines
                                    selection={selectedKCD_BUYER_TEAM_INFO}
                                    onSelectionChange={(e) => {
                                        setFlagSelectModeKCD_BUYER_TEAM_INFO(
                                            true,
                                        );
                                        setSelectedKCD_BUYER_TEAM_INFO(e.value);
                                        console.log(
                                            "selected length:" +
                                                selectedKCD_BUYER_TEAM_INFO.length,
                                        );
                                        onRowClick1KCD_BUYER_TEAM_INFO(e.value);
                                    }}
                                    onRowClick={onRowClickKCD_BUYER_TEAM_INFO}
                                    dataKey="id"
                                    className="datatable-responsive"
                                    virtualScrollerOptions={{ itemSize: 50 }}
                                    emptyMessage="데이타가 없습니다"
                                    header={headerKCD_BUYER_TEAM_INFO}
                                    responsiveLayout="scroll"
                                    scrollable
                                    scrollHeight="18rem"
                                >
                                    <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                                    <AFColumn field="col1" header="지역" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                                    <AFColumn field="col2" header="업무" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                                    <AFColumn field="col3" header="담당자" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                                </AFDataTable>
                            </div>
                            <div style={{ width: "30rem", height: "3rem" }}>
                                <span
                                    disable
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "30rem",
                                    }}
                                >
                                    <div
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "30rem",
                                        }}
                                    >
                                        <Dropdown
                                            id="id_TEAM_USER"
                                            value={dataKCD_BUYER_TEAM_USER}
                                            onChange={(e) =>
                                                onDropdownChangeKCD_BUYER_TEAM_USER(
                                                    e,
                                                    "TEAM_INFO",
                                                )
                                            }
                                            options={datasKCD_BUYER_TEAM_USER}
                                            optionLabel="USER_NAME"
                                            filter
                                            showClear
                                            filterBy="USER_NAME"
                                            placeholder="Select One"
                                        ></Dropdown>
                                    </div>
                                </span>
                                <span
                                    disable
                                    style={{
                                        height: "2rem",
                                        display: "block",
                                        width: "30rem",
                                    }}
                                ></span>
                                <span
                                    style={{
                                        height: "3rem",
                                        display: "block",
                                        width: "30rem",
                                    }}
                                >
                                    <p style={{ width: "8rem", display: "inline-block", }}>거래계약서</p>
                                    <div
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "10rem",
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
                                    <div
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "10rem",
                                        }}
                                    >
                                        <Button
                                            style={{ padding: "0rem" }}
                                            label={dataFile1}
                                            icon="pi pi-check"
                                            className="p-button-text"
                                            onClick={onDownloadFile1}
                                        />
                                    </div>
                                </span>
                                <span
                                    style={{
                                        height: "3rem",
                                        display: "block",
                                        width: "30rem",
                                    }}
                                >
                                    <p style={{ width: "8rem", display: "inline-block", }}>Logo Artwork</p>
                                    <div
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "10rem",
                                        }}
                                    >
                                        <FileUpload
                                            mode="basic"
                                            maxFileSize={10000000}
                                            label="Upload"
                                            chooseLabel="Upload"
                                            style={{ padding: "0rem" }}
                                            name="file2_doc"
                                            url={dataUrlFile2}
                                            onUpload={onFileUploadFile2}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "10rem",
                                        }}
                                    >
                                        <Button
                                            style={{ padding: "0rem" }}
                                            label={dataFile2}
                                            icon="pi pi-check"
                                            className="p-button-text"
                                            onClick={onDownloadFile2}
                                        />
                                    </div>
                                </span>
                                <span
                                    style={{
                                        height: "3rem",
                                        display: "block",
                                        width: "30rem",
                                    }}
                                >
                                    <p style={{ width: "8rem", display: "inline-block", }}>업체매뉴얼</p>
                                    <div
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "10rem",
                                        }}
                                    >
                                        <FileUpload
                                            mode="basic"
                                            maxFileSize={10000000}
                                            label="Upload"
                                            chooseLabel="Upload"
                                            style={{ padding: "0rem" }}
                                            name="file3_doc"
                                            url={dataUrlFile3}
                                            onUpload={onFileUploadFile3}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            marginLeft: "0.5rem",
                                            display: "inline-block",
                                            width: "10rem",
                                        }}
                                    >
                                        <Button
                                            style={{ padding: "0rem" }}
                                            label={dataFile3}
                                            icon="pi pi-check"
                                            className="p-button-text"
                                            onClick={onDownloadFile3}
                                        />
                                    </div>
                                </span>
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
