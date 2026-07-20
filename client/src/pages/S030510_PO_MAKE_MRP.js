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
import { ProgressSpinner } from "primereact/progressspinner";
import { ProgressBar } from "primereact/progressbar";
import { TabView, TabPanel } from "primereact/tabview";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS030510_PO_MAKE_MRP } from "../service/service_biz/ServiceS030510_PO_MAKE_MRP";
import { ServiceS0305_MRP_MANAGER } from "../service/service_biz/ServiceS0305_MRP_MANAGER";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MST = {
    PO_CD: "",
    USER_ID: "",
    PO_SEQ: "",
    MATL_NAME: "",
    VENDOR_CD: "",
};

const S0305_SEARCH_STORAGE_KEY = "S0305_MRP_MANAGER_SEARCH";
const S0305_REQUERY_STORAGE_KEY = "S0305_MRP_MANAGER_REQUERY";

const emptyTBL_KSV_PO_MST = {
    id: 0,
    PO_STATUS_NAME: "",
    PO_STATUS: "",
    PO_SEQ: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    PO_TYPE_NAME: "",
    PO_TYPE: "",
    PO_CD: "",
    TARGET_ETA: "",
    REG_DATETIME: "",
    REG_USER: "",
    UPD_DATETIME: "",
    UPD_USER: "",
    MRP_PACK_FNAME: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    DOMESTIC_FLAG: "",
    IMPORT_FLAG: "",
    FACTORY_FLAG: "",
};

const S030510_PO_MAKE_MRP = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS030510_PO_MAKE_MRPRef = useRef(null);
    if (!serviceS030510_PO_MAKE_MRPRef.current) serviceS030510_PO_MAKE_MRPRef.current = new ServiceS030510_PO_MAKE_MRP();
    const serviceS030510_PO_MAKE_MRP = serviceS030510_PO_MAKE_MRPRef.current;
    const serviceS0305_MRP_MANAGERRef = useRef(null);
    if (!serviceS0305_MRP_MANAGERRef.current) serviceS0305_MRP_MANAGERRef.current = new ServiceS0305_MRP_MANAGER();
    const serviceS0305_MRP_MANAGER = serviceS0305_MRP_MANAGERRef.current;

    const toast = useRef(null);

    /* progress */
    const [isProgress, setIsProgress] = useState(false);
    const [count, setCount] = useState(0);
    const [progressValue, setProgressValue] = useState(0);
    const [progressMessage, setProgressMessage] = useState("");
    const [workingPoCd, setWorkingPoCd] = useState(null);
    const pollingIntervalRef = useRef(null);
    const isPollingRequestRef = useRef(false);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* QRY KSV_PO_MST*/
    const [dataQRY_KSV_PO_MST, setDataQRY_KSV_PO_MST] =
        useState(emptyQRY_KSV_PO_MST);

    const onInputChangeQRY_KSV_PO_MST_PO_SEQ = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onInputChangeQRY_KSV_PO_MST_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onInputChangeQRY_KSV_PO_MST_VENDOR_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const [datasQRY_KSV_PO_MST_PO_TYPE, setDatasQRY_KSV_PO_MST_PO_TYPE] =
        useState([]);
    const [dataQRY_KSV_PO_MST_PO_TYPE, setDataQRY_KSV_PO_MST_PO_TYPE] =
        useState({});

    const [datasQRY_KSV_PO_MST_PO_STATUS, setDatasQRY_KSV_PO_MST_PO_STATUS] =
        useState([]);
    const [dataQRY_KSV_PO_MST_PO_STATUS, setDataQRY_KSV_PO_MST_PO_STATUS] =
        useState({});

    const onInputChangeQRY_KSV_PO_MST_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const [datasQRY_KSV_PO_MST_BUYER_CD, setDatasQRY_KSV_PO_MST_BUYER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MST_BUYER_CD, setDataQRY_KSV_PO_MST_BUYER_CD] =
        useState({});

    /* TABLE_KSV_PO_MST*/
    // DEFINE DATAGRID : TBL_KSV_PO_MST
    const [datasTBL_KSV_PO_MST, setDatasTBL_KSV_PO_MST] = useState([]);
    const dt_TBL_KSV_PO_MST = useRef(null);
    const [dataTBL_KSV_PO_MST, setDataTBL_KSV_PO_MST] =
        useState(emptyTBL_KSV_PO_MST);
    const [selectedTBL_KSV_PO_MST, setSelectedTBL_KSV_PO_MST] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MST, setFlagSelectModeTBL_KSV_PO_MST] =
        useState(false);
    const [loadingTBL_KSV_PO_MST, setLoadingTBL_KSV_PO_MST] = useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MST
    const searchMRP = (argData) => {
        var _qryObj = {};

        if (typeof argData.PO_CD !== "undefined") {
            var _qryObj0 = { ...argData };
            _qryObj = { ...dataQRY_KSV_PO_MST };
            var _userInfo = serviceLib.getUserInfo();
            _qryObj.USER_ID = _userInfo.USER_ID;
            _qryObj.PO_CD = _qryObj0.PO_CD;
            _qryObj.PO_SEQ = _qryObj0.PO_SEQ;
        } else {
            _qryObj = { ...dataQRY_KSV_PO_MST };
            var _userInfo = serviceLib.getUserInfo();
            _qryObj.USER_ID = _userInfo.USER_ID;
        }

        setLoadingTBL_KSV_PO_MST(true);
        setDatasTBL_KSV_PO_MST([]);

        serviceS030510_PO_MAKE_MRP
            .mgrQuery_CURRENT_MRP(_qryObj)
            .then((data) => {
                setLoadingTBL_KSV_PO_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    var tMaxPoSeq = 1;
                    var tArray = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        if (parseInt(tObj.PO_SEQ) > tMaxPoSeq)
                            tMaxPoSeq = parseInt(tObj.PO_SEQ);
                        return tObj;
                    });
                    setDatasTBL_KSV_PO_MST(tArray);
                    if (data.length <= 0) {
                        var _qryObj0 = { ...dataQRY_KSV_PO_MST };
                        _qryObj0.PO_CD = _qryObj.PO_CD;
                        _qryObj0.USER_ID = _qryObj.USER_ID;
                        // _qryObj0.PO_SEQ = _qryObj.PO_SEQ;
                        _qryObj0.PO_SEQ = "0";
                        setDataQRY_KSV_PO_MST(_qryObj0);
                    } else {
                        var _qryObj0 = { ...dataQRY_KSV_PO_MST };
                        _qryObj0.PO_CD = _qryObj.PO_CD;
                        _qryObj0.USER_ID = _qryObj.USER_ID;
                        _qryObj0.PO_SEQ = String(tMaxPoSeq);
                        setDataQRY_KSV_PO_MST(_qryObj0);
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const searchNewMRP = (argData) => {
        // var _qryObj = { ...dataQRY_KSV_PO_MST };

        var tInObj = {};
        tInObj.PO_CD = argData.PO_CD;
        tInObj.PO_SEQ = argData.PO_SEQ;

        setLoadingTBL_KSV_PO_MST(true);
        setDatasTBL_KSV_PO_MST([]);

        serviceS030510_PO_MAKE_MRP.mgrQuery_NEW_MRP(tInObj).then((data) => {
            setLoadingTBL_KSV_PO_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "mgrQuery_NEW_MRP call(Search New Mrp) => " +
                        data.PO_MRP.length,
                );

                var tSelArray = [];
                var tArray = data.PO_MRP.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    // tObj.PO_SEQ = data.MAX_SEQ;
                    // if (parseInt(tObj.PO_SEQ) === parseInt(data.MAX_SEQ)) tSelArray.push(tObj);
                    if (tObj.CHECK === "*") tSelArray.push(tObj);
                    return tObj;
                });
                setDatasTBL_KSV_PO_MST(tSelArray);
                setSelectedTBL_KSV_PO_MST(tSelArray);

                var _qryObj = { ...dataQRY_KSV_PO_MST };
                _qryObj.PO_CD = tInObj.PO_CD;
                _qryObj.PO_SEQ = data.NEW_SEQ;
                setDataQRY_KSV_PO_MST(_qryObj);
            } else {
                console.log(
                    "mgrQuery_NEW_MRP error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const makeMRP = (argData) => {
        var _qryObj = { ...dataQRY_KSV_PO_MST };
        if (typeof argData.PO_CD !== "undefined") _qryObj.PO_CD = argData.PO_CD;

        var _tObj = {};
        _tObj.PO_CD = _qryObj.PO_CD;
        _tObj.USER_ID = _qryObj.USER_ID;

        setDatasTBL_KSV_PO_MST([]);
        setSelectedTBL_KSV_PO_MST([]);

        setLoadingTBL_KSV_PO_MST(true);

        setIsProgress(true);
        setWorkingPoCd(_tObj.PO_CD);
        setProgressValue(5);
        setProgressMessage("MRP 생성 작업 시작...");

        console.log("[makeMRP] Starting MRP creation for PO_CD:", _tObj.PO_CD);

        serviceS030510_PO_MAKE_MRP.makeMRP(_tObj).then((data) => {
            console.log("[makeMRP] Response received:", data);
            setLoadingTBL_KSV_PO_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    const code = data[0].CODE;
                    console.log("[makeMRP] Response CODE:", code);
                    //alert(code);

                    if (code.includes("SUCC")) {
                        console.log("[makeMRP] Success detected");
                        setProgressValue(100);
                        setProgressMessage("완료!");
                        var tObj = {};
                        tObj.PO_CD = _tObj.PO_CD;
                        tObj.PO_SEQ = String(parseInt(_qryObj.PO_SEQ) + 1);
                        setTimeout(() => {
                            setIsProgress(false);
                            setProgressValue(0);
                            searchNewMRP(tObj);
                        }, 800);
                    } else if (code.includes("WORK")) {
                        console.log("[makeMRP] WORK status detected, starting polling");
                        setProgressMessage("서버 작업 상태 확인 중...");
                        // 폴링 시작
                        startProgressPolling(_tObj.PO_CD, _qryObj.PO_SEQ);
                        setCount(0);
                    } else {
                        setIsProgress(false);
                        setProgressValue(0);
                    }
                } else {
                    setIsProgress(false);
                    setProgressValue(0);
                }
            } else {
                alert(JSON.stringify(data.graphQLErrors));
                setIsProgress(false);
                setProgressValue(0);
            }
        }).catch((error) => {
            console.error("[makeMRP] Error caught:", error);
            alert("Error: " + error.message);
            setIsProgress(false);
            setProgressValue(0);
        });
    };

    const startProgressPolling = (poCd, poSeq) => {
        console.log("[startProgressPolling] Starting polling for PO_CD:", poCd);
        setProgressValue(15);
        setProgressMessage("서버에서 처리 중...");
        
        // 기존 폴링 종료
        if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            console.log("[startProgressPolling] Cleared previous polling");
        }

        let pollCount = 0;
        const maxPolls = 360; // 최대 3분 (0.5초 간격 x 360회)

        const pollFunction = async () => {
            if (isPollingRequestRef.current) return;

            pollCount++;
            if (pollCount > maxPolls) {
                clearInterval(pollingIntervalRef.current);
                pollingIntervalRef.current = null;
                setIsProgress(false);
                setProgressValue(0);
                console.error("[startProgressPolling] Polling timeout after", maxPolls, "attempts");
                alert("작업 시간 초과. 나중에 상태를 확인하세요.");
                return;
            }

            isPollingRequestRef.current = true;
            try {
                // 이미 작동하는 Query 사용
                var tIn1 = {};
                tIn1.PO_CD = poCd;
                tIn1.OP_KIND = "1";

                const data = await serviceS0305_MRP_MANAGER.mgrQuery_WORK_STATUS(tIn1);
                
                console.log(`[Poll #${pollCount}] Result:`, data);
                
                if (typeof data.graphQLErrors !== "undefined") {
                    console.warn(`[Poll #${pollCount}] GraphQL Error`);
                       const progress = Math.min(10 + (pollCount * 0.5), 95);
                    setProgressValue(Math.round(progress));
                    setProgressMessage(`처리 중... (${Math.floor(pollCount * 0.5)}초)`);
                    return;
                }

                if (data && data.length > 0) {
                    const workStatus = data[0].WORK_STATUS;
                    console.log(`[Poll #${pollCount}] Status: "${workStatus}"`);

                    if (workStatus.includes("SUCCESS:MRP MAKE")) {
                        // 작업 완료
                        clearInterval(pollingIntervalRef.current);
                        pollingIntervalRef.current = null;
                        console.log("[startProgressPolling] SUCCESS:MRP MAKE detected");
                           setProgressValue(95);
                           setProgressMessage("마무리 중...");
                        
                           setTimeout(() => {
                               setProgressValue(60*10);
                               setProgressMessage("완료!");
                           }, 5000);
                       
                           setTimeout(() => {
                            setIsProgress(false);
                            setProgressValue(0);
                            var _qryObj = { ...dataQRY_KSV_PO_MST };
                            _qryObj.PO_CD = poCd;
                            _qryObj.PO_SEQ = String(parseInt(poSeq) + 1);
                            searchNewMRP(_qryObj);
                           }, 1800);
                    } else if (workStatus.includes("ERROR")) {
                        // 오류
                        clearInterval(pollingIntervalRef.current);
                        pollingIntervalRef.current = null;
                        console.error("[startProgressPolling] ERROR:", workStatus);
                        setIsProgress(false);
                        setProgressValue(0);
                        alert("오류 발생: " + workStatus);
                    } else if (workStatus.includes("WORK")) {
                        // 진행 중
                           const progress = Math.min(10 + (pollCount * 0.5), 95);
                        setProgressValue(Math.round(progress));
                        setProgressMessage(`처리 중... (${Math.floor(pollCount * 0.5)}초)`);
                    } else if (workStatus === "" || workStatus === null || workStatus === undefined) {
                        // 빈 상태 (작업 완료로 간주)
                        console.log("[startProgressPolling] Empty status - treating as complete");
                        clearInterval(pollingIntervalRef.current);
                        pollingIntervalRef.current = null;
                           setProgressValue(95);
                           setProgressMessage("마무리 중...");
                        
                           setTimeout(() => {
                               setProgressValue(100);
                               setProgressMessage("완료!");
                           }, 1000);
                       
                           setTimeout(() => {
                            setIsProgress(false);
                            setProgressValue(0);
                            var _qryObj = { ...dataQRY_KSV_PO_MST };
                            _qryObj.PO_CD = poCd;
                            _qryObj.PO_SEQ = String(parseInt(poSeq) + 1);
                            searchNewMRP(_qryObj);
                           }, 1800);
                    } else {
                        // 기타 상태
                           const progress = Math.min(10 + (pollCount * 0.5), 95);
                        setProgressValue(Math.round(progress));
                        setProgressMessage(`상태: ${workStatus} (${pollCount})`);
                    }
                } else {
                    console.warn(`[Poll #${pollCount}] No result`);
                       const progress = Math.min(10 + (pollCount * 0.5), 95);
                    setProgressValue(Math.round(progress));
                    setProgressMessage(`처리 중... (${Math.floor(pollCount * 0.5)}초)`);
                }
            } catch (error) {
                console.error(`[Poll #${pollCount}] Error:`, error.message);
                   const progress = Math.min(10 + (pollCount * 0.5), 95);
                setProgressValue(Math.round(progress));
                setProgressMessage(`재시도 중...`);
            } finally {
                isPollingRequestRef.current = false;
            }
        };

        console.log("[startProgressPolling] Starting first poll immediately");
        pollFunction();
        pollingIntervalRef.current = setInterval(pollFunction, 1000); // 1초마다 폴링
    };

    const processWorkCheck = (argPoCd) => {
        var _userInfo = serviceLib.getUserInfo();

        var tIn1 = {};
        tIn1.PO_CD = argPoCd;
        tIn1.OP_KIND = "1";

        var tWorkStatus = "";
        serviceS0305_MRP_MANAGER.mgrQuery_WORK_STATUS(tIn1).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    tWorkStatus = data[0].WORK_STATUS;
                    var tPoSeq = parseFloat(data[0].PO_SEQ);
                    // alert(tWorkStatus);
                    var _qryObj = { ...dataQRY_KSV_PO_MST };
                    _qryObj.PO_CD = argPoCd;
                    _qryObj.USER_ID = _userInfo.USER_ID;
                    setDataQRY_KSV_PO_MST(_qryObj);
                    if (tWorkStatus.includes("SUCCESS:MRP MAKE")) {
                        setCount(0);
                        var tObj = {};
                        tObj.PO_CD = _qryObj.PO_CD;
                        tObj.PO_SEQ = String(parseInt(_qryObj.PO_SEQ) + 1);
                        alert(
                            "계산처리가 완료된 MRP 결과가 있습니다.  내용을 확인후 Save Mrp 해주세요",
                        );
                        setIsProgress(false);

                        searchNewMRP(tObj);
                    } else if (tWorkStatus.includes("SUCCESS:MRP SAVE")) {
                        setIsProgress(false);
                        setCount(0);
                        searchMRP(_qryObj);
                    } else if (tWorkStatus.includes("WORK")) {
                    } else if (tWorkStatus === "") {
                        // 무조건 계산
                        setIsProgress(false);
                        setCount(0);
                        var tInObj1 = {};
                        tInObj1.PO_CD = argPoCd;
                        tInObj1.USER_ID = _userInfo.USER_ID;
                        makeMRP(tInObj1);
                        /*
                        if (tPoSeq > 0) {
                            var tQryObj = {};
                            tQryObj.PO_CD = argPoCd;
                            tQryObj.PO_SEQ = String(tPoSeq);
                            searchMRP(tQryObj);
                        } else {
                            setIsProgress(false);
                            setCount(0);
                            var tInObj1 = {};
                            tInObj1.PO_CD = argPoCd;
                            tInObj1.USER_ID = _userInfo.USER_ID;
                            makeMRP(tInObj1);
                        }
                        */
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

    const processAllSelect = () => {
        if (selectedTBL_KSV_PO_MST.length === datasTBL_KSV_PO_MST.length) {
            setSelectedTBL_KSV_PO_MST([]);
        } else {
            setSelectedTBL_KSV_PO_MST(datasTBL_KSV_PO_MST);
        }
    };

    const saveMRP = async (argData) => {
        if (typeof argData.PO_CD === "undefined") {
            if (selectedTBL_KSV_PO_MST.length <= 0) {
                var tRet = await confirm(
                    "데이타를 선택하지 않고 저장하면 계산된 결과를 초기화합니다. 진행하시겠습니까?<br><br>If you save without selecting data, the calculated results will be initialized. Do you want to proceed?",
                );
                if (tRet);
                else return;
            }
        }

        var _qryObj = { ...dataQRY_KSV_PO_MST };
        if (typeof argData.PO_CD !== "undefined") _qryObj.PO_CD = argData.PO_CD;

        // var _inObjs = datasTBL_KSV_PO_MST.map((col, i) => {
        var _inObjs = selectedTBL_KSV_PO_MST.map((col, i) => {
            var tObj = { ...col };
            tObj.PO_CD = _qryObj.PO_CD;
            tObj.USER_ID = _qryObj.USER_ID;

            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            delete tObj.id;
            delete tObj.CHECK;

            return tObj;
        });

        setDatasTBL_KSV_PO_MST([]);
        setSelectedTBL_KSV_PO_MST([]);

        setLoadingTBL_KSV_PO_MST(true);
        // //setIsProgress(true);

        serviceS030510_PO_MAKE_MRP.saveMRP(_inObjs).then((data) => {
            setLoadingTBL_KSV_PO_MST(false);
            // setIsProgress(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        searchMRP(_qryObj);

                        var tSaveInfo0 =
                            sessionStorage.getItem("S0305_SEL_INFO");
                        var tSaveInfo = JSON.parse(tSaveInfo0);
                        tSaveInfo.PO_STATUS = "2";
                        tSaveInfo.PO_STATUS_NAME = "Cons.Checked";
                        sessionStorage.setItem(
                            "S0305_SEL_INFO",
                            JSON.stringify(tSaveInfo),
                        );

                        let searchCondition = null;
                        const raw = sessionStorage.getItem(
                            S0305_SEARCH_STORAGE_KEY,
                        );

                        if (raw) {
                            try {
                                searchCondition = JSON.parse(raw);
                                sessionStorage.setItem(
                                    S0305_REQUERY_STORAGE_KEY,
                                    JSON.stringify(searchCondition),
                                );
                            } catch (error) {
                                console.log(
                                    `S0305 search parse error => ${error}`,
                                );
                            }
                        }

                        window.parent.postMessage(
                            {
                                func: "requery_s0305_mrp_manager",
                                message: {
                                    searchCondition,
                                },
                            },
                            "*",
                        );

                        // popup_MRP_MANAGER();
                    }
                }
            } else {
                console.log(
                    "saveMRP error => " + JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const onRowClick1TBL_KSV_PO_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MST = argData;

        setDataTBL_KSV_PO_MST(argTBL_KSV_PO_MST);
    };

    const onRowDoubleClickTBL_KSV_PO_MST = (argData0) => {
        let tVendorName = "";
        let tColName = "";
        const tKeys = Object.keys(argData0.data);

        tKeys.forEach((col) => {
            const tValue = argData0.data[col];
            if (col === "VENDOR_NAME") tVendorName = tValue;
            if (tValue === argData0.originalEvent.target.innerText) {
                tColName = col;
            }
        });

        if (tColName !== "VENDOR_NAME") return;

        // 현재 선택된 데이터 복사
        let newSelected = [...selectedTBL_KSV_PO_MST];

        // 동일한 VENDOR_NAME을 가진 모든 행 찾기
        const matchingRows = datasTBL_KSV_PO_MST.filter(
            (row) => row.VENDOR_NAME === tVendorName,
        );

        // 모두 선택되어 있는지 확인
        const allSelected = matchingRows.every((matchRow) =>
            newSelected.some(
                (sel) => JSON.stringify(sel) === JSON.stringify(matchRow),
            ),
        );

        if (allSelected) {
            // 모두 선택되어 있으면 해당 항목들 제거
            newSelected = newSelected.filter(
                (sel) => sel.VENDOR_NAME !== tVendorName,
            );
        } else {
            // 일부만 선택 혹은 전혀 선택 안 된 경우 → 중복 제거하고 추가
            matchingRows.forEach((matchRow) => {
                const isAlreadySelected = newSelected.some(
                    (sel) => JSON.stringify(sel) === JSON.stringify(matchRow),
                );
                if (!isAlreadySelected) {
                    newSelected.push(matchRow);
                }
            });
        }

        setSelectedTBL_KSV_PO_MST(newSelected);
    };

    const onRowClickTBL_KSV_PO_MST = (event) => {
        let argTBL_KSV_PO_MST = event.data;
        if (flagSelectModeTBL_KSV_PO_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MST
    };

    useEffect(() => {
        return () => {
            // 컴포넌트 언마운트 시 폴링 정리
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
                pollingIntervalRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            if (count > 0 && !isProgress && !pollingIntervalRef.current) {
                processWorkCheck(dataQRY_KSV_PO_MST.PO_CD);
            }
            setCount((count) => count - 1);
        }, 1000);

        console.log(`timer: ${count} `);

        if (count === 0) {
            clearInterval(id);
        }
        return () => clearInterval(id);
    }, [count, isProgress, dataQRY_KSV_PO_MST.PO_CD]);

    useEffect(() => {
        let mPoCd = "";
        let mPoSeq = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            tParams1.forEach((col, i) => {
                var tObj = {};
                var tCols = col.split("=");

                if (tCols[0].includes("PO_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    mPoCd = tObj.value;
                }
                if (tCols[0].includes("PO_SEQ")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    mPoSeq = tObj.value;
                }
            });
        }

        var _userInfo = serviceLib.getUserInfo();

        console.log(`useEffect:${mPoCd}, ${mPoSeq}`);

        var _qryObj = { ...dataQRY_KSV_PO_MST };
        _qryObj.PO_CD = mPoCd;
        _qryObj.PO_SEQ = mPoSeq;
        _qryObj.USER_ID = _userInfo.USER_ID;
        setDataQRY_KSV_PO_MST(_qryObj);

        processWorkCheck(mPoCd);

        // searchMRP(_qryObj);

        // Cleanup: isProgress가 false일 때 폴링 정리
        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
                pollingIntervalRef.current = null;
            }
        };
    }, []);

    // Support Area

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>PO#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_PO_MST.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MST_PO_CD(e, "PO_CD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>PO Seq</p>
                    <div className="af-span-div" style={{ width: "3rem" }}>
                        <InputText
                            style={{ width: "3rem" }}
                            id="id_PO_SEQ"
                            value={dataQRY_KSV_PO_MST.PO_SEQ}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MST_PO_SEQ(e, "PO_SEQ")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "28rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Desc</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <InputText
                            style={{ width: "20rem" }}
                            id="id_MATL_NAME"
                            value={dataQRY_KSV_PO_MST.MATL_NAME}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MST_MATL_NAME(
                                    e,
                                    "MATL_NAME",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Supplier#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_VENDOR_CD"
                            value={dataQRY_KSV_PO_MST.VENDOR_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MST_VENDOR_CD(
                                    e,
                                    "VENDOR_CD",
                                )
                            }
                        />
                    </div>
                </span>
            </div>
            {/* make mrp
        make mrp call
        stock check & po fix
        po revise
        material add
        po return */}
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Current MRP"
                            className="p-button-text"
                            onClick={searchMRP}
                        />
                    </div>
                </span>
                {/*
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Need Qty Revise"
                            className="p-button-text"
                            onClick={makeMRP}
                        />
                    </div>
                </span>
                */}
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Save MRP"
                            className="p-button-text"
                            onClick={saveMRP}
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "54.5rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MST}
                    size="small"
                    value={datasTBL_KSV_PO_MST}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    metaKeySelection={false}
                    loading={loadingTBL_KSV_PO_MST}
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MST}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KSV_PO_MST(e.value);
                        onRowClick1TBL_KSV_PO_MST(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MST}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage="No TBL_KSV_PO_MST found."
                    //header={headerTBL_KSV_PO_MST}
                    onRowDoubleClick={onRowDoubleClickTBL_KSV_PO_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="585px"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="PO_SEQ" header="PO Seq" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" header="Order#"></AFColumn>
                    <AFColumn field="MATL_CD" header="Matl#"></AFColumn>
                    <AFColumn field="MATL_NAME" header="Desc"></AFColumn>
                    <AFColumn field="COLOR" header="Color"></AFColumn>
                    <AFColumn field="SPEC" header="Spec"></AFColumn>
                    <AFColumn field="UNIT" header="Unit"></AFColumn>
                    <AFColumn field="USE_PO_TYPE_NAME" header="Use type" ></AFColumn>
                    <AFColumn field="PO_QTY" header="Po Qty" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PO_QTY) } ></AFColumn>
                    <AFColumn field="MATL_PRICE" header="M.price" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.formatNumber(rowData.MATL_PRICE) } ></AFColumn>
                    <AFColumn field="CURR_CD" header="Curr"></AFColumn>
                    <AFColumn field="VENDOR_NAME" header="Supplier"></AFColumn>
                    <AFColumn field="MRP_SEQ" header="MRP seq" bodyStyle={{ textAlign: "right" }} ></AFColumn>
                    <AFColumn field="MATL_SEQ" header="Matl seq" bodyStyle={{ textAlign: "right" }} ></AFColumn>
                    <AFColumn field="REG_DATETIME" header="Reg Date" body={(rowData) => serviceLib.dateFormatHMS(rowData.REG_DATETIME) } ></AFColumn>
                </AFDataTable>
            </div>

            <Toast ref={toast} />
            <Dialog 
                visible={isProgress} 
                modal
                header="MRP 생성 진행 중..."
                style={{ width: "500px" }}
                onHide={() => {}}
                closable={false}
                blockScroll={true}
            >
                <div style={{ padding: "20px", textAlign: "center" }}>
                    <div style={{ width: "100%", marginBottom: "20px" }}>
                        <ProgressBar 
                            value={progressValue} 
                            style={{ height: "35px" }}
                            displayValueTemplate={(value) => <span style={{ color: "white", fontWeight: "bold" }}>{value}%</span>}
                        />
                    </div>
                    <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>
                        {progressMessage}
                    </p>
                    <p style={{ fontSize: "12px", color: "#999" }}>
                        PO#: {workingPoCd}
                    </p>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S030510_PO_MAKE_MRP, comparisonFn);
