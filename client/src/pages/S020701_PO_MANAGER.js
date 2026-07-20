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
import { ProgressSpinner } from "primereact/progressspinner";

const moment = require("moment");

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS020701_PO_MANAGER } from "../service/service_biz/ServiceS020701_PO_MANAGER";
import { ServiceS0305_MRP_MANAGER } from "../service/service_biz/ServiceS0305_MRP_MANAGER";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_ORDER_PIMST = {
    BUYER_CD: "",
    PO_CD: "",
    STATUS_CD: "",
    S_REG_DATE: "",
    E_REG_DATE: "",
};

const emptyQRY_KSV_ORDER_PIMST2 = {
    ORDER_CD: "",
};

const emptyTBL_KSV_ORDER_PIMST = {
    id: 0,
    STATUS_NAME: "",
    STATUS_CD: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    REG_DATETIME: "",
    PO_CD: "",
    QTY: "",
    AMT: "",
    REG_USER: "",
    File: "",
};

const emptyTBL_KSV_ORDER_PIMST2 = {
    id: 0,
    STATUS_NAME: "",
    STATUS_CD: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    REG_DATETIME: "",
    PO_CD: "",
    QTY: "",
    AMT: "",
    REG_USER: "",
    File: "",
};

const emptyTBL_KSV_ORDER_PIMST3 = {
    id: 0,
    STATUS_NAME: "",
    STATUS_CD: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    REG_DATETIME: "",
    PO_CD: "",
    QTY: "",
    AMT: "",
    REG_USER: "",
    File: "",
};

const emptyEDT_KSV_PI_MST = {
    PO_CD: "",
    BUYER_CD: "",
    MATL_ETA: "",
    CD: "",
    REG_DATE: "",
    LOADING_PORT: "",
    DESTINATION: "",
    REG_USER: "",
    TOLENCE: "",
    PART_SHIP: "",
    TRANS_SHIP: "",
};

const S020701_PO_MANAGER = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS020701_PO_MANAGERRef = useRef(null);
    if (!serviceS020701_PO_MANAGERRef.current) serviceS020701_PO_MANAGERRef.current = new ServiceS020701_PO_MANAGER();
    const serviceS020701_PO_MANAGER = serviceS020701_PO_MANAGERRef.current;
    const serviceS0305_MRP_MANAGERRef = useRef(null);
    if (!serviceS0305_MRP_MANAGERRef.current) serviceS0305_MRP_MANAGERRef.current = new ServiceS0305_MRP_MANAGER();
    const serviceS0305_MRP_MANAGER = serviceS0305_MRP_MANAGERRef.current;

    const toast = useRef(null);

    const [isAddOrder, setIsAddOrder] = useState(false);
    const [btnAddOrderDisabled, setBtnAddOrderDisabled] = useState(false);
    const [isProgress, setIsProgress] = useState(false);

    /* splitter 관련 */

    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const process_RESET = () => {
        setDataQRY_KSV_ORDER_PIMST(emptyQRY_KSV_ORDER_PIMST);
        setDataQRY_KSV_ORDER_PIMST_STATUS_CD(
            datasQRY_KSV_ORDER_PIMST_STATUS_CD[0],
        );
        setDatasTBL_KSV_ORDER_PIMST([]);
        setDatasTBL_KSV_ORDER_PIMST2([]);
        setDataEDT_KSV_PI_MST(emptyEDT_KSV_PI_MST);
    };

    const process_APPLY_ADD_ORDER_PREINSERT = () => {
        if (selectedTBL_KSV_ORDER_PIMST3.length <= 0) return;

        var tNewArray = [...datasTBL_KSV_ORDER_PIMST2];
        var tIdx = 0;
        for (tIdx = 0; tIdx < selectedTBL_KSV_ORDER_PIMST3.length; tIdx++) {
            var tFlag = 0;
            var tOne = { ...selectedTBL_KSV_ORDER_PIMST3[tIdx] };

            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < datasTBL_KSV_ORDER_PIMST2.length; tIdx1++) {
                var tObj0 = { ...datasTBL_KSV_ORDER_PIMST2[tIdx1] };
                if (tObj0.ORDER_CD === tOne.ORDER_CD) {
                    tFlag = 1;
                    break;
                }
            }
            if (tFlag === 1) continue;
            tOne.id = datasTBL_KSV_ORDER_PIMST2.length;
            tNewArray.push(tOne);
        }
        setDatasTBL_KSV_ORDER_PIMST2(tNewArray);

        setIsAddOrder(false);
    };

    const process_APPLY_ADD_ORDER = () => {
        if (selectedTBL_KSV_ORDER_PIMST3.length <= 0) return;

        if (selectedTBL_KSV_ORDER_PIMST3.length > 0) {
            var tSelObj = { ...selectedTBL_KSV_ORDER_PIMST[0] };
        } else {
            alert("추가할 Order를  선택하세요<br><br>Select the Order to add");
            return;
        }

        var _userInfo = serviceLib.getUserInfo();

        var tIn = { ...dataEDT_KSV_PI_MST };
        // tIn.TOLENCE_N = dataEDT_KSV_PI_MST_TOLENCE.CD_NAME;
        if (tIn.MATL_ETA === "" && tIn.PO_CD !== "") {
            alert("MATL ETA을 입력해야 합니다<br><br>You must enter your MATL ETA");
            return;
        }

        if (tIn.PO_CD === "") {
            // alert('등록된 PO에 대해서만 Order을 추가할수 있습니다');
            process_APPLY_ADD_ORDER_PREINSERT();
            return;
        }

        var tIn2 = [];
        selectedTBL_KSV_ORDER_PIMST3.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tIn2.push(tObj);
        });

        setLoadingTBL_KSV_ORDER_PIMST3(true);
        setDatasTBL_KSV_ORDER_PIMST2([]);

        serviceS020701_PO_MANAGER
            .mgrInsert_ADD_ORDER(tIn, tIn2)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_PIMST3(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);

                        if (data[0].CODE.includes("SUCC")) {
                            setIsAddOrder(false);
                            var _tIn9 = { ...emptyQRY_KSV_ORDER_PIMST };
                            _tIn9.PO_CD = tIn.PO_CD;
                            search_LIST_1(_tIn9);

                            if (
                                parseInt(dataTBL_KSV_ORDER_PIMST.PO_STATUS) >=
                                    2 &&
                                parseInt(dataTBL_KSV_ORDER_PIMST.PO_STATUS) <= 4
                            ) {
                                var tIdx2 = 0;
                                var tOrderCds = "";
                                var tBuyerCd = "";
                                for (tIdx2 = 0; tIdx2 < tIn2.length; tIdx2++) {
                                    if (tIdx2 === 0)
                                        tOrderCds = tIn2[tIdx2].ORDER_CD;
                                    else tOrderCds = `/${tIn2[tIdx2].ORDER_CD}`;
                                    tBuyerCd = tIn2[tIdx2].ORDER_CD.substring(
                                        0,
                                        2,
                                    );
                                }
                                var tInput0 = {};
                                tInput0.PO_CD = tIn.PO_CD;
                                tInput0.USER_ID = _userInfo.USER_ID;
                                tInput0.ORDER_CD = tOrderCds;
                                serviceS0305_MRP_MANAGER
                                    .makeOrderMrp(tInput0)
                                    .then((data) => {
                                        if (
                                            typeof data.graphQLErrors ===
                                            "undefined"
                                        ) {
                                            if (data.length > 0) {
                                                if (
                                                    data[0].CODE.includes(
                                                        "SUCC",
                                                    )
                                                ) {
                                                    console.log(
                                                        "mgrQueryTBL_KSV_PO_MST call => " +
                                                            data.length,
                                                    );
                                                    var tInObj = {};
                                                    tInObj.BUYER_CD = tBuyerCd;
                                                    tInObj.PO_CD =
                                                        tInput0.PO_CD;
                                                    tInObj.FACTORY_CD =
                                                        dataTBL_KSV_ORDER_PIMST.FACTORY_CD;
                                                    process_ADJUST_LOSS(tInObj);
                                                }
                                            }
                                        } else {
                                            console.log(
                                                "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                                                    JSON.stringify(
                                                        data.graphQLErrors,
                                                    ),
                                            );
                                        }
                                    });
                            }
                        }
                    }
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "Info",
                        detail: "",
                        life: 3000,
                    });
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_ADJUST_LOSS = (argData) => {
        var tInput0 = argData;

        //setIsProgress(true);
        serviceS0305_MRP_MANAGER.adjustLoss(tInput0).then((data) => {
            setIsProgress(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    if (data[0].CODE.includes("SUCC")) {
                        console.log(
                            "mgrQueryTBL_KSV_PO_MST call => " + data.length,
                        );
                        // popup_PO_MAKE_MRP();
                    }
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const process_CANCEL_ADD_ORDER = () => {
        setIsAddOrder(false);
    };

    const popup_ADD_ORDER = () => {
        if (dataEDT_KSV_PI_MST.BUYER_CD === "") return;

        var tInObj = {};
        tInObj.BUYER_CD = dataEDT_KSV_PI_MST.BUYER_CD;
        tInObj.ORDER_CD = [];
        datasTBL_KSV_ORDER_PIMST2.forEach((col, i) => {
            tInObj.ORDER_CD.push(col.ORDER_CD);
        });

        //search_LIST_2_3(tInObj);
        setIsAddOrder(true);
    };

    const process_SEARCH_ORDER2 = () => {
        var tInObj = {};
        tInObj.BUYER_CD = dataEDT_KSV_PI_MST.BUYER_CD;
        tInObj.ORDER_CD = dataQRY_KSV_ORDER_PIMST2.ORDER_CD;

        search_LIST_2_4(tInObj);
    };

    const hideDialog = () => {
        setIsAddOrder(false);
    };

    const process_REMOVE_ORDER = async () => {
        if (selectedTBL_KSV_ORDER_PIMST2.length <= 0) return;
        if (datasTBL_KSV_ORDER_PIMST2.length <= 1) {
            alert("마지막 1개의 경우 PO를 삭제해 주세요<br><br>For the last one, please delete the PO");
            return;
        }

        var poObj = {};
        if (selectedTBL_KSV_ORDER_PIMST.length > 0) {
            poObj = { ...selectedTBL_KSV_ORDER_PIMST[0] };
        } else {
            alert("작업할 PO을 선택하세요<br><br>Select the PO you want to work on");
            return;
        }

        var tIn = { ...dataEDT_KSV_PI_MST };
        tIn.TOLENCE_N = dataEDT_KSV_PI_MST_TOLENCE.CD_NAME;
        if (tIn.MATL_ETA === "") {
            alert("MATL ETA을 입력해야 합니다<br><br>You must enter your MATL ETA");
            return;
        }

        var tIn20 = [...selectedTBL_KSV_ORDER_PIMST2];

        if (tIn20.length <= 0) {
            alert("삭제할 Order을 선택하세요<br><br>Select the Order you want to delete");
            return;
        }

        var tIn2 = [];
        tIn20.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tIn2.push(tObj);
        });

        var nConfirm = '';
        if (parseInt(poObj.PO_STATUS) < 4)  {
            nConfirm = await confirm(
                "선택한 주문을 PO에서 삭제합니다. PO상태가 Reg상태일때는 Order을 PO에서 삭제합니다. 진행하시겠습니까?<br><br>Delete the selected order from the PO. When the PO status is Reg, the Order will be deleted from the PO. Do you want to proceed?",
            );
        } else {
            nConfirm = await confirm(
                "선택한 주문을 PO에서 삭제합니다. PO상태가 Fix상태일때는 해당 주문을 Cancel합니다. 진행하시겠습니까?<br><br>Delete the selected order from the PO. When the PO status is Fix, the order will be canceled. Do you want to proceed?",
            );
        }
        if (nConfirm) {
            /* 20241230 PO Manager에서 [Remove Order] 클릭 시 즉시 주문이 삭제되는 문제가 있음. [Save] 버튼을 누를 때까지는 삭제가 반영되지 않도록 수정 필요 */
            setLoadingTBL_KSV_ORDER_PIMST(true);
            setDatasTBL_KSV_ORDER_PIMST2([]);

            serviceS020701_PO_MANAGER
                .mgrInsert_REMOVE_ORDER(tIn, tIn2)
                .then((data) => {
                    setLoadingTBL_KSV_ORDER_PIMST(false);
                    if (typeof data.graphQLErrors === "undefined") {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            if (data[0].CODE.includes("SUCC")) {
                                var _tIn9 = { ...emptyQRY_KSV_ORDER_PIMST };
                                _tIn9.PO_CD = tIn.PO_CD;
                                // search_LIST_1(_tIn9);
                                search_LIST_2_1(_tIn9);
                            }
                        }
                    } else {
                        toast.current.show({
                            severity: "success",
                            summary: "Info",
                            detail: "",
                            life: 3000,
                        });
                        console.log(
                            "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                                JSON.stringify(data.graphQLErrors),
                        );
                    }
                });
        }
    };

    const process_RESET_EDT = () => {
        setSelectedTBL_KSV_ORDER_PIMST2([]);
        setDatasTBL_KSV_ORDER_PIMST2([]);

        setSelectedTBL_KSV_ORDER_PIMST3([]);
        setDatasTBL_KSV_ORDER_PIMST3([]);

        setDataEDT_KSV_PI_MST(emptyEDT_KSV_PI_MST);

        editEDT_KSV_PI_MST_BUYER_CD(" ");
        editEDT_KSV_PI_MST_CD(" ");
        editEDT_KSV_PI_MST_TOLENCE(" ");
        editEDT_KSV_PI_MST_PART_SHIP(" ");
        editEDT_KSV_PI_MST_PART_SHIP(" ");
    };

    const process_INSERT_PO = () => {
        if (selectedTBL_KSV_ORDER_PIMST.length > 0) {
            var tSelObj = { ...selectedTBL_KSV_ORDER_PIMST[0] };
            if (tSelObj.PO_STATUS !== "0") {
                alert("Registered 상태의 PO만 작업가능합니다<br><br>Only POs in registered status can work.");
                return;
            }
        }

        var tIn = { ...dataEDT_KSV_PI_MST };
        // tIn.TOLENCE_N = dataEDT_KSV_PI_MST_TOLENCE.CD_NAME;
        if (tIn.MATL_ETA === "") {
            alert("MATL ETA을 입력해야 합니다<br><br>You must enter your MATL ETA");
            return;
        }

        var tIn20 = [...datasTBL_KSV_ORDER_PIMST2];

        var tIn2 = [];
        tIn20.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tIn2.push(tObj);
        });

        setLoadingTBL_KSV_ORDER_PIMST(true);
        setDatasTBL_KSV_ORDER_PIMST2([]);

        if (tIn.PO_CD === "") {
            serviceS020701_PO_MANAGER
                .mgrInsert_PO_MST(tIn, tIn2)
                .then((data) => {
                    setLoadingTBL_KSV_ORDER_PIMST(false);
                    if (typeof data.graphQLErrors === "undefined") {
                        if (data.length > 0) {
                            toast.current.show({
                                severity: "success",
                                summary: "Info",
                                detail: data[0].CODE,
                                life: 3000,
                            });
                            if (data[0].CODE.includes("SUCC")) {
                                var tCol = data[0].CODE.split(":");
                                var _tObj = { ...dataEDT_KSV_PI_MST };
                                _tObj.PO_CD = tCol[1];
                                setDataEDT_KSV_PI_MST(_tObj);

                                var _tIn9 = { ...emptyQRY_KSV_ORDER_PIMST };
                                _tIn9.PO_CD = _tObj.PO_CD;
                                search_LIST_1(_tIn9);
                            }
                        }
                    } else {
                        toast.current.show({
                            severity: "success",
                            summary: "Info",
                            detail: "",
                            life: 3000,
                        });
                        console.log(
                            "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                                JSON.stringify(data.graphQLErrors),
                        );
                    }
                });
        } else {
            serviceS020701_PO_MANAGER
                .mgrUpdate_PO_MST(tIn, tIn2)
                .then((data) => {
                    setLoadingTBL_KSV_ORDER_PIMST(false);
                    if (typeof data.graphQLErrors === "undefined") {
                        if (data.length > 0) {
                            toast.current.show({
                                severity: "success",
                                summary: "Info",
                                detail: data[0].CODE,
                                life: 3000,
                            });
                            if (data[0].CODE.includes("SUCC")) {
                            } else {
                                process_RESET_EDT();
                            }
                            search_LIST_1();
                        }
                    } else {
                        toast.current.show({
                            severity: "success",
                            summary: "Info",
                            detail: "",
                            life: 3000,
                        });
                        console.log(
                            "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                                JSON.stringify(data.graphQLErrors),
                        );
                    }
                });
        }
    };

    const process_DELETE_PO = () => {
        if (selectedTBL_KSV_ORDER_PIMST.length <= 0) {
            alert("작업할 데이타를 선택하세요<br><br>Choose the data you want to work with");
            return;
        }

        var tSelObj = { ...selectedTBL_KSV_ORDER_PIMST[0] };
        if (tSelObj.PO_STATUS !== "0") {
            alert("Registered 상태의 PO만 작업가능합니다<br><br>Only POs in registered status can work.");
            return;
        }

        var tIn = { ...dataEDT_KSV_PI_MST };
        var tIn20 = [...datasTBL_KSV_ORDER_PIMST2];

        var tIn2 = [];
        tIn20.forEach((col, i) => {
            var tObj = { ...col };
            delete tObj.__typename;
            delete tObj.id;
            tIn2.push(tObj);
        });

        // setLoadingTBL_KSV_ORDER_PIMST(true);

        serviceS020701_PO_MANAGER.mgrDelete_PO_MST(tIn, tIn2).then((data) => {
            // setLoadingTBL_KSV_ORDER_PIMST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    toast.current.show({
                        severity: "success",
                        summary: "Info",
                        detail: data[0].CODE,
                        life: 3000,
                    });
                    if (data[0].CODE.includes("SUCC")) {
                        process_RESET_EDT();
                    }
                    search_LIST_1();
                }
            } else {
                toast.current.show({
                    severity: "success",
                    summary: "Info",
                    detail: "",
                    life: 3000,
                });
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_1 = (argData) => {
        var tIn = {};
        if (
            typeof argData !== "undefined" &&
            typeof argData.PO_CD !== "undefined"
        ) {
            tIn = { ...argData };
        } else {
            tIn = { ...dataQRY_KSV_ORDER_PIMST };
        }

        console.log("search_LIST_1=>" + tIn.PO_CD);

        setLoadingTBL_KSV_ORDER_PIMST(true);

        serviceS020701_PO_MANAGER.mgrQuery_LIST_1(tIn).then((data) => {
            setLoadingTBL_KSV_ORDER_PIMST(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = [];
                data.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tArray.push(tObj);
                });
                setDatasTBL_KSV_ORDER_PIMST(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2_1 = (argData) => {
        var tIn = {};
        tIn.PO_CD = argData.PO_CD;
        tIn.BUYER_CD = "";

        setLoadingTBL_KSV_ORDER_PIMST2(true);
        serviceS020701_PO_MANAGER.mgrQuery_LIST_2_1(tIn).then((data) => {
            setLoadingTBL_KSV_ORDER_PIMST2(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });

                console.log(data);
                setDatasTBL_KSV_ORDER_PIMST2(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2_2 = (argData) => {
        var tIn = {};
        tIn.ORDER_CD = [...argData];

        setLoadingTBL_KSV_ORDER_PIMST2(true);

        serviceS020701_PO_MANAGER.mgrQuery_LIST_2_2(tIn).then((data) => {
            setLoadingTBL_KSV_ORDER_PIMST2(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_ORDER_PIMST2(tArray);

                var tObj = { ...dataEDT_KSV_PI_MST };
                tObj.BUYER_CD = tArray[0].ORDER_CD.substring(0, 2);
                setDataEDT_KSV_PI_MST(tObj);

                console.log(tObj.BUYER_CD);

                editEDT_KSV_PI_MST_BUYER_CD(tObj.BUYER_CD);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2_4 = (argData) => {
        setLoadingTBL_KSV_ORDER_PIMST3(true);
        setSelectedTBL_KSV_ORDER_PIMST3([]);
        serviceS020701_PO_MANAGER.mgrQuery_LIST_2_4(argData).then((data) => {
            setLoadingTBL_KSV_ORDER_PIMST3(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_ORDER_PIMST3(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /*QRY KSV_ORDER_PIMST */

    const [dataQRY_KSV_ORDER_PIMST, setDataQRY_KSV_ORDER_PIMST] = useState(
        emptyQRY_KSV_ORDER_PIMST,
    );

    const [
        datasQRY_KSV_ORDER_PIMST_BUYER_CD,
        setDatasQRY_KSV_ORDER_PIMST_BUYER_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_PIMST_BUYER_CD,
        setDataQRY_KSV_ORDER_PIMST_BUYER_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_PIMST_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_ORDER_PIMST = { ...dataQRY_KSV_ORDER_PIMST };

        let tTypeVal = _dataQRY_KSV_ORDER_PIMST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PIMST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PIMST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_PIMST(_dataQRY_KSV_ORDER_PIMST);
        setDataQRY_KSV_ORDER_PIMST_BUYER_CD(e.value);
    };

    const onInputChangeQRY_KSV_ORDER_PIMST_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_PIMST = { ...dataQRY_KSV_ORDER_PIMST };

        let tTypeVal = _dataQRY_KSV_ORDER_PIMST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_PIMST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_PIMST[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_PIMST(_dataQRY_KSV_ORDER_PIMST);
    };

    const [
        datasQRY_KSV_ORDER_PIMST_STATUS_CD,
        setDatasQRY_KSV_ORDER_PIMST_STATUS_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_PIMST_STATUS_CD,
        setDataQRY_KSV_ORDER_PIMST_STATUS_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_PIMST_STATUS_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_PIMST = { ...dataQRY_KSV_ORDER_PIMST };

        let tTypeVal = _dataQRY_KSV_ORDER_PIMST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PIMST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PIMST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_PIMST(_dataQRY_KSV_ORDER_PIMST);
        setDataQRY_KSV_ORDER_PIMST_STATUS_CD(e.value);
    };

    const onCalChangeQRY_KSV_ORDER_PIMST_S_REG_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_PIMST = { ...dataQRY_KSV_ORDER_PIMST };
        _dataQRY_KSV_ORDER_PIMST[`${name}`] = val;
        setDataQRY_KSV_ORDER_PIMST(_dataQRY_KSV_ORDER_PIMST);
    };

    const onCalChangeQRY_KSV_ORDER_PIMST_E_REG_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_PIMST = { ...dataQRY_KSV_ORDER_PIMST };
        _dataQRY_KSV_ORDER_PIMST[`${name}`] = val;
        setDataQRY_KSV_ORDER_PIMST(_dataQRY_KSV_ORDER_PIMST);
    };

    //
    const [dataQRY_KSV_ORDER_PIMST2, setDataQRY_KSV_ORDER_PIMST2] = useState(
        emptyQRY_KSV_ORDER_PIMST2,
    );

    const onInputChangeQRY_KSV_ORDER_PIMST2_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_PIMST2 = { ...dataQRY_KSV_ORDER_PIMST2 };

        let tTypeVal = _dataQRY_KSV_ORDER_PIMST2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_PIMST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_PIMST2[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_PIMST2(_dataQRY_KSV_ORDER_PIMST2);
    };

    /*TABLE KSV_ORDER_PIMST*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_PIMST
    const [loadingTBL_KSV_ORDER_PIMST, setLoadingTBL_KSV_ORDER_PIMST] =
        useState(false);

    const [datasTBL_KSV_ORDER_PIMST, setDatasTBL_KSV_ORDER_PIMST] = useState(
        [],
    );
    const dt_TBL_KSV_ORDER_PIMST = useRef(null);
    const [dataTBL_KSV_ORDER_PIMST, setDataTBL_KSV_ORDER_PIMST] = useState(
        emptyTBL_KSV_ORDER_PIMST,
    );
    const [selectedTBL_KSV_ORDER_PIMST, setSelectedTBL_KSV_ORDER_PIMST] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_PIMST,
        setFlagSelectModeTBL_KSV_ORDER_PIMST,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_PIMST

    const onRowClick1TBL_KSV_ORDER_PIMST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        /* 임시로 풀어놈*/

        let argTBL_KSV_ORDER_PIMST = argData;
        setDataTBL_KSV_ORDER_PIMST(argTBL_KSV_ORDER_PIMST);
        // editTBL_KSV_ORDER_PIMST(argTBL_KSV_ORDER_PIMST);

        var _tObj = { ...dataEDT_KSV_PI_MST };
        _tObj.PO_CD = argData.PO_CD;
        _tObj.BUYER_CD = argData.BUYER_CD;
        _tObj.MATL_ETA = argData.MATL_DUE_DATE;
        setDataEDT_KSV_PI_MST(_tObj);

        editEDT_KSV_PI_MST_BUYER_CD(_tObj.BUYER_CD);

        search_LIST_2_1(argData);

        let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
        var tUrl = `${_url1}fileupload/pi/` + argData.PI_CD;
        setDataUrl(tUrl);
    };

    const onRowClickTBL_KSV_ORDER_PIMST = (event) => {
        let argTBL_KSV_ORDER_PIMST = event.data;
        if (flagSelectModeTBL_KSV_ORDER_PIMST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_PIMST
    };

    const exportExcelTBL_KSV_ORDER_PIMST = () => {};

    const [loadingTBL_KSV_ORDER_PIMST2, setLoadingTBL_KSV_ORDER_PIMST2] =
        useState(false);
    const [datasTBL_KSV_ORDER_PIMST2, setDatasTBL_KSV_ORDER_PIMST2] = useState(
        [],
    );
    const dt_TBL_KSV_ORDER_PIMST2 = useRef(null);
    const [dataTBL_KSV_ORDER_PIMST2, setDataTBL_KSV_ORDER_PIMST2] = useState(
        emptyTBL_KSV_ORDER_PIMST2,
    );
    const [selectedTBL_KSV_ORDER_PIMST2, setSelectedTBL_KSV_ORDER_PIMST2] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_PIMST2,
        setFlagSelectModeTBL_KSV_ORDER_PIMST2,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_PIMST2

    const onRowClick1TBL_KSV_ORDER_PIMST2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        console.log(argData);

        let argTBL_KSV_ORDER_PIMST2 = argData;

        setDataTBL_KSV_ORDER_PIMST2(argTBL_KSV_ORDER_PIMST2);

        editEDT_KSV_PI_MST_BUYER_CD(argData.ORDER_CD.substring(0, 2));
    };

    const onRowClickTBL_KSV_ORDER_PIMST2 = (event) => {
        let argTBL_KSV_ORDER_PIMST2 = event.data;
        if (flagSelectModeTBL_KSV_ORDER_PIMST2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_PIMST2
    };

    /*TABLE KSV_ORDER_PIMST3*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_PIMST3
    const [loadingTBL_KSV_ORDER_PIMST3, setLoadingTBL_KSV_ORDER_PIMST3] =
        useState(false);

    const [datasTBL_KSV_ORDER_PIMST3, setDatasTBL_KSV_ORDER_PIMST3] = useState(
        [],
    );
    const dt_TBL_KSV_ORDER_PIMST3 = useRef(null);
    const [dataTBL_KSV_ORDER_PIMST3, setDataTBL_KSV_ORDER_PIMST3] = useState(
        emptyTBL_KSV_ORDER_PIMST3,
    );
    const [selectedTBL_KSV_ORDER_PIMST3, setSelectedTBL_KSV_ORDER_PIMST3] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_PIMST3,
        setFlagSelectModeTBL_KSV_ORDER_PIMST3,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_PIMST3

    const onRowClick1TBL_KSV_ORDER_PIMST3 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_PIMST3 = argData;

        setDataTBL_KSV_ORDER_PIMST3(argTBL_KSV_ORDER_PIMST3);
    };

    const onRowClickTBL_KSV_ORDER_PIMST3 = (event) => {
        let argTBL_KSV_ORDER_PIMST3 = event.data;
        if (flagSelectModeTBL_KSV_ORDER_PIMST3) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_PIMST3
    };

    // EDIT
    const [dataEDT_KSV_PI_MST, setDataEDT_KSV_PI_MST] =
        useState(emptyEDT_KSV_PI_MST);

    const onInputChangeEDT_KSV_PI_MST_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PI_MST = { ...dataEDT_KSV_PI_MST };

        let tTypeVal = _dataEDT_KSV_PI_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PI_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PI_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PI_MST(_dataEDT_KSV_PI_MST);
    };

    const onInputChangeEDT_KSV_PI_MST_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PI_MST = { ...dataEDT_KSV_PI_MST };

        let tTypeVal = _dataEDT_KSV_PI_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PI_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PI_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PI_MST(_dataEDT_KSV_PI_MST);
    };

    const onCalChangeEDT_KSV_PI_MST_MATL_ETA = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_PI_MST = { ...dataEDT_KSV_PI_MST };
        _dataEDT_KSV_PI_MST[`${name}`] = val;
        setDataEDT_KSV_PI_MST(_dataEDT_KSV_PI_MST);
    };

    const [datasEDT_KSV_PI_MST_BUYER_CD, setDatasEDT_KSV_PI_MST_BUYER_CD] =
        useState([]);
    const [dataEDT_KSV_PI_MST_BUYER_CD, setDataEDT_KSV_PI_MST_BUYER_CD] =
        useState({});

    const editEDT_KSV_PI_MST_BUYER_CD = (argValue) => {
        let _dataEDT_KSV_PI_MST_BUYER_CD = [];
        // console.log(datasEDT_KSV_PI_MST_BUYER_CD);
        datasEDT_KSV_PI_MST_BUYER_CD.forEach((col, i) => {
            var tObj = { ...col };
            // console.log(argValue + ',' + col.BUYER_CD);
            if (col.BUYER_CD === argValue)
                _dataEDT_KSV_PI_MST_BUYER_CD.push(tObj);
        });
        // console.log(argValue);
        // console.log(_dataEDT_KSV_PI_MST_BUYER_CD);
        setDataEDT_KSV_PI_MST_BUYER_CD(_dataEDT_KSV_PI_MST_BUYER_CD[0]);
    };

    const [datasEDT_KSV_PI_MST_CD, setDatasEDT_KSV_PI_MST_CD] = useState([]);
    const [dataEDT_KSV_PI_MST_CD, setDataEDT_KSV_PI_MST_CD] = useState({});

    const editEDT_KSV_PI_MST_CD = (argValue) => {
        let _tDatas = [];
        datasEDT_KSV_PI_MST_CD.forEach((col, i) => {
            var tObj = { ...col };
            if (col.CD_CODE === argValue) _tDatas.push(tObj);
        });
        setDataEDT_KSV_PI_MST_CD(_tDatas[0]);
    };

    const [datasEDT_KSV_PI_MST_TOLENCE, setDatasEDT_KSV_PI_MST_TOLENCE] =
        useState([]);
    const [dataEDT_KSV_PI_MST_TOLENCE, setDataEDT_KSV_PI_MST_TOLENCE] =
        useState({});

    const editEDT_KSV_PI_MST_TOLENCE = (argValue) => {
        let _tDatas = [];
        datasEDT_KSV_PI_MST_TOLENCE.forEach((col, i) => {
            var tObj = { ...col };
            if (col.CD_CODE === argValue) _tDatas.push(tObj);
        });
        setDataEDT_KSV_PI_MST_TOLENCE(_tDatas[0]);
    };

    const [datasEDT_KSV_PI_MST_PART_SHIP, setDatasEDT_KSV_PI_MST_PART_SHIP] =
        useState([]);
    const [dataEDT_KSV_PI_MST_PART_SHIP, setDataEDT_KSV_PI_MST_PART_SHIP] =
        useState({});

    const editEDT_KSV_PI_MST_PART_SHIP = (argValue) => {
        let _tDatas = [];
        datasEDT_KSV_PI_MST_PART_SHIP.forEach((col, i) => {
            var tObj = { ...col };
            if (col.CD_CODE === argValue) _tDatas.push(tObj);
        });
        setDataEDT_KSV_PI_MST_PART_SHIP(_tDatas[0]);
    };

    const [datasEDT_KSV_PI_MST_TRANS_SHIP, setDatasEDT_KSV_PI_MST_TRANS_SHIP] =
        useState([]);
    const [dataEDT_KSV_PI_MST_TRANS_SHIP, setDataEDT_KSV_PI_MST_TRANS_SHIP] =
        useState({});

    /*File Upload */
    const [dataUrl, setDataUrl] = useState("");

    useEffect(() => {
        let tOrderCds = [];
        let tOrderCd = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            if (tParams1[0].split("=")[0] != "label") {
                var tParams2 = tParams1.map((col, i) => {
                    var tObj = {};
                    var tCols = col.split("=");

                    if (tCols[0].includes("ORDER_CD")) {
                        tObj.key = tCols[0];
                        tObj.value = tCols[1];
                        console.log(tObj);
                        return tObj;
                    }
                });

                if (tParams2 && tParams2.length > 0) {
                    tOrderCds = tParams2[0].value.split("|");
                    tOrderCd = tOrderCds[0];
                }
                console.log(tParams2);
            }
        }

        if (tOrderCds.length > 0) {
            console.log("S020701 Order Cd :(param)" + tOrderCds.length);
            console.log(tOrderCds);
            setDatasTBL_KSV_ORDER_PIMST([]);
        } else {
            // setDatasTBL_KSV_ORDER_PIMST([]);
        }
        serviceS020701_PO_MANAGER.mgrQuery_CODE("").then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_ORDER_PIMST_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_ORDER_PIMST_BUYER_CD(data.BUYER_CD[0]);

                setDatasEDT_KSV_PI_MST_BUYER_CD(data.BUYER_CD);
                setDataEDT_KSV_PI_MST_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_ORDER_PIMST_STATUS_CD(data.STATUS_CD);
                setDataQRY_KSV_ORDER_PIMST_STATUS_CD(data.STATUS_CD[0]);

                setDatasEDT_KSV_PI_MST_CD(data.PI_ORIGIN);
                setDataEDT_KSV_PI_MST_CD(data.PI_ORIGIN[0]);

                setDatasEDT_KSV_PI_MST_TOLENCE(data.TOLENCE);
                setDataEDT_KSV_PI_MST_TOLENCE(data.TOLENCE[0]);

                setDatasEDT_KSV_PI_MST_PART_SHIP(data.PART_SHIP);
                setDataEDT_KSV_PI_MST_PART_SHIP(data.PART_SHIP[0]);

                setDatasEDT_KSV_PI_MST_TRANS_SHIP(data.TRANS_SHIP);
                setDataEDT_KSV_PI_MST_TRANS_SHIP(data.TRANS_SHIP[0]);

                var tRetDate = serviceLib.getCurrDate().substring(0, 8);

                var tObj = { ...dataQRY_KSV_ORDER_PIMST };
                tObj.S_REG_DATE = moment(tRetDate, "YYYY-MM-DD")
                    .subtract(6, "months")
                    .format("YYYYMMDD");
                tObj.E_REG_DATE = tRetDate;
                setDataQRY_KSV_ORDER_PIMST(tObj);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        // search_LIST_1();

        if (tOrderCds.length > 0) {
            search_LIST_2_2(tOrderCds);
        }
    }, []);

    const blankFn = () => {};

    // Support Area

    const changeDateVal = (argVal) => {
        if (argVal === "") return argVal;
        var tType = typeof argVal;
        if (tType !== "string") {
            // console.log(tType);
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

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Buyer#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_BUYER_CD"
                            filter
                            value={dataQRY_KSV_ORDER_PIMST_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_PIMST_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_ORDER_PIMST_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>PO#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_PI_CD"
                            value={dataQRY_KSV_ORDER_PIMST.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_PIMST_PO_CD(
                                    e,
                                    "PO_CD",
                                )
                            }
                            onKeyDown={(e) => { if (e.key === "Enter") search_LIST_1(); }}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Status</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_STATUS_CD"
                            value={dataQRY_KSV_ORDER_PIMST_STATUS_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_PIMST_STATUS_CD(
                                    e,
                                    "STATUS_CD",
                                )
                            }
                            options={datasQRY_KSV_ORDER_PIMST_STATUS_CD}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Reg Date</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_REG_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_ORDER_PIMST.S_REG_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_PIMST_S_REG_DATE(
                                    e,
                                    "S_REG_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_REG_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_ORDER_PIMST.E_REG_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_PIMST_E_REG_DATE(
                                    e,
                                    "E_REG_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
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
                            style={{ width: "6rem" }}
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
                        <Button
                            label="Reset"
                            style={{ width: "6rem" }}
                            className="p-button-text"
                            onClick={process_RESET}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
                        <Button
                            label="Excel"
                            style={{ width: "6rem" }}
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_ORDER_PIMST}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
                        <Button
                            label="#Cancel"
                            style={{ width: "6rem" }}
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
                        <Button
                            label="#End"
                            style={{ width: "6rem" }}
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "24rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    tableStyle={{ tableLayout: "fixed", minWidth: "70rem" }}
                    loading={loadingTBL_KSV_ORDER_PIMST}
                    ref={dt_TBL_KSV_ORDER_PIMST}
                    size="small"
                    value={datasTBL_KSV_ORDER_PIMST}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_ORDER_PIMST}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_ORDER_PIMST(true);
                        setSelectedTBL_KSV_ORDER_PIMST(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_ORDER_PIMST.length,
                        );
                        onRowClick1TBL_KSV_ORDER_PIMST(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_PIMST}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    // header={headerTBL_KSV_ORDER_PIMST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="flex"
                >
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer#" style={{ width: "10rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" style={{ width: "6rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="PO_SEQ" headerClassName="t-header" header="Seq" style={{ width: "3rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="FACTORY_NAME" headerClassName="t-header" header="Factory" style={{ width: "10rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="MATL_DUE_DATE" headerClassName="t-header" header="Matl ETA" style={{ width: "6rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="REG_USER" headerClassName="t-header" header="Register" style={{ width: "6rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="PO_STATUS_NAME" headerClassName="t-header" header="PO.S" style={{ width: "4rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="REG_DATETIME" headerClassName="t-header" header="Reg Date" body={(rowData) => serviceLib.dateFormatHMS(rowData.REG_DATETIME) } style={{ width: "6rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="FIX_DATE" headerClassName="t-header" header="Fix Date" body={(rowData) => serviceLib.dateFormatHMS(rowData.FIX_DATE) } style={{ width: "6rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="STSIN_DATE" headerClassName="t-header" header="STSIN" body={(rowData) => serviceLib.dateFormatHMS(rowData.STSIN_DATE) } style={{ width: "6rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="FACIN_DATE" headerClassName="t-header" header="FACIN" body={(rowData) => serviceLib.dateFormatHMS(rowData.FACIN_DATE) } style={{ width: "6rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="FACOUT_DATE" headerClassName="t-header" header="FACOUT" body={(rowData) => serviceLib.dateFormatHMS(rowData.FACOUT_DATE) } style={{ width: "6rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="END_DATE" headerClassName="t-header" header="End Date" body={(rowData) => serviceLib.dateFormatHMS(rowData.END_DATE) } style={{ width: "6rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="CANCEL_DATE" headerClassName="t-header" header="Cancel Date" body={(rowData) => serviceLib.dateFormatHMS(rowData.CANCEL_DATE) } style={{ width: "6rem" }} className="af-col" ></AFColumn>
                </AFDataTable>
            </div>

            <div style={{ height: "3rem" }}>
                <div
                    className="af-div-first"
                    style={{ width: "123rem", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>PO#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                disabled
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PI_MST.PO_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PI_MST_PO_CD(
                                        e,
                                        "PO_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Buyer</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                disabled
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PI_MST.BUYER_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PI_MST_BUYER_CD(
                                        e,
                                        "BUYER_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "15rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "15rem" }}
                        >
                            <Button
                                disabled={btnAddOrderDisabled}
                                label="Add Order"
                                style={{ width: "15rem" }}
                                className="p-button-text"
                                onClick={popup_ADD_ORDER}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "15rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "15rem" }}
                        >
                            <Button
                                label="Remove Order"
                                style={{ width: "15rem" }}
                                className="p-button-text"
                                onClick={process_REMOVE_ORDER}
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Matl ETA</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_REG_DATE"
                                value={changeDateVal(
                                    dataEDT_KSV_PI_MST.MATL_ETA,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_PI_MST_MATL_ETA(
                                        e,
                                        "MATL_ETA",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                label="Save"
                                style={{ width: "9rem" }}
                                className="p-button-text"
                                onClick={process_INSERT_PO}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                label="Delete"
                                style={{ width: "9rem" }}
                                className="p-button-text"
                                onClick={process_DELETE_PO}
                            />
                        </div>
                    </span>
                </div>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "30rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_ORDER_PIMST2}
                    ref={dt_TBL_KSV_ORDER_PIMST2}
                    size="small"
                    value={datasTBL_KSV_ORDER_PIMST2}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_ORDER_PIMST2}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_ORDER_PIMST2(true);
                        setSelectedTBL_KSV_ORDER_PIMST2(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_ORDER_PIMST2.length,
                        );
                        onRowClick1TBL_KSV_ORDER_PIMST2(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_PIMST2}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    // header={headerTBL_KSV_ORDER_PIMST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="327px"
                >
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="ORDER#" style={{ width: "7rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="REF_ORDER_NO" headerClassName="t-header" header="Buyer PO" style={{ width: "6rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style" style={{ width: "10rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="ORDER_STATUS_NAME" headerClassName="t-header" header="Status" style={{ width: "10rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="TOT_CNT" headerClassName="t-header" header="Qty" style={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} className="af-col" body={(rowData) => serviceLib.numWithCommas(rowData.TOT_CNT, 0) } ></AFColumn>
                    <AFColumn field="PRICE_TERM" headerClassName="t-header" header="Term" style={{ width: "4rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "4rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="AVR_PRICE" headerClassName="t-header" header="Price" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToFixed(rowData.AVR_PRICE, 2) } style={{ width: "6rem" }} className="af-col" body={(rowData) => serviceLib.numWithCommas(rowData.AVR_PRICE, 4) } ></AFColumn>
                    <AFColumn field="AMT" headerClassName="t-header" header="Amt" bodyStyle={{ textAlign: "right" }} style={{ width: "6rem" }} className="af-col" body={(rowData) => serviceLib.numWithCommas(rowData.AMT, 2) } ></AFColumn>
                    <AFColumn field="MATL_DUE_DATE" headerClassName="t-header" header="EXF" body={(rowData) => serviceLib.dateFormat(rowData.MATL_DUE_DATE) } style={{ width: "6rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="DUE_DATE" headerClassName="t-header" header="ETD" body={(rowData) => serviceLib.dateFormat(rowData.DUE_DATE) } style={{ width: "6rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="REG_DATETIME" headerClassName="t-header" header="Reg Date" body={(rowData) => serviceLib.dateFormat(rowData.REG_DATETIME) } style={{ width: "6rem" }} className="af-col" ></AFColumn>
                    <AFColumn field="REG_USER" headerClassName="t-header" header="Reg User" style={{ width: "6rem" }} className="af-col" ></AFColumn>
                </AFDataTable>
            </div>

            <Dialog
                visible={isAddOrder}
                position="mid-center"
                style={{ width: "111rem" }}
                header="주문조회"
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <div
                    className="af-div-first"
                    style={{ width: "100%", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Order#</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                style={{ width: "10rem" }}
                                id="id_PI_CD"
                                value={dataQRY_KSV_ORDER_PIMST2.ORDER_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_ORDER_PIMST2_ORDER_CD(
                                        e,
                                        "ORDER_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "11rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "10rem" }}
                        >
                            <Button
                                label="Search"
                                style={{ width: "10rem" }}
                                className="p-button-text"
                                onClick={process_SEARCH_ORDER2}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "11rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "10rem" }}
                        >
                            <Button
                                label="Apply"
                                style={{ width: "10rem" }}
                                className="p-button-text"
                                onClick={process_APPLY_ADD_ORDER}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "11rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "10rem" }}
                        >
                            <Button
                                label="Cancel"
                                style={{ width: "10rem" }}
                                className="p-button-text"
                                onClick={process_CANCEL_ADD_ORDER}
                            />
                        </div>
                    </span>
                </div>
                <div
                    className="af-div-first"
                    style={{ width: "100%", height: "40rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        metaKeySelection={false}
                        tableStyle={{ tableLayout: "fixed" }}
                        showGridlines
                        selectionMode="multiple"
                        loading={loadingTBL_KSV_ORDER_PIMST3}
                        ref={dt_TBL_KSV_ORDER_PIMST3}
                        size="small"
                        value={datasTBL_KSV_ORDER_PIMST3}
                        resizableColumns
                        columnResizeMode="expand"
                        selection={selectedTBL_KSV_ORDER_PIMST3}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_ORDER_PIMST3(true);
                            setSelectedTBL_KSV_ORDER_PIMST3(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_ORDER_PIMST3.length,
                            );
                            onRowClick1TBL_KSV_ORDER_PIMST3(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_ORDER_PIMST3}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        // header={headerTBL_KSV_ORDER_PIMST}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="40rem"
                    >
                        <AFColumn field="REF_ORDER_NO" headerClassName="t-header" header="Buyer.Po" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="ORDER_CD" headerClassName="t-header" header="ORDER#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="TOT_CNT" headerClassName="t-header" header="Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_CNT, 0) } ></AFColumn>
                        <AFColumn field="UNIT" headerClassName="t-header" header="Unit" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="PRICE_TERM" headerClassName="t-header" header="Term" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="AVR_PRICE" headerClassName="t-header" header="U.Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.AVR_PRICE, 4) } ></AFColumn>
                        <AFColumn field="AMT" headerClassName="t-header" header="Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.AMT, 0) } ></AFColumn>
                        <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="DUE_DATE" headerClassName="t-header" header="ETD" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="STYLE_CD" headerClassName="t-header" header="Style#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>
            <Toast ref={toast} />
            <Dialog class="loadingModal" visible={isProgress} modal>
                <ProgressSpinner />
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S020701_PO_MANAGER, comparisonFn);
