/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import axios from "axios";
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
import { Image } from "primereact/image";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0200_KCD_STYLE } from "../service/service_biz/ServiceS0200_KCD_STYLE";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { ScrollPanel } from "primereact/scrollpanel";

import { TabView, TabPanel } from "primereact/tabview";
import { OverlayPanel } from "primereact/overlaypanel";
import apiOption from "../assets/env_graphql";

import $ from "jquery";

import "./page_common.scss";

function fileButtonDisable() {
    $(".fileButton button").each((i, button) => {
        $(button).prop("disabled", true).addClass("disabled");
    });

    $(".fileButton input").each((i, button) => {
        $(button).prop("disabled", true).addClass("disabled");
    });

    $(".fileButton label").each((i, button) => {
        $(button).prop("disabled", true).addClass("disabled");
    });
}

function fileButtonEnable() {
    $(".fileButton button").each((i, button) => {
        $(button).prop("disabled", false).removeClass("disabled");
    });

    $(".fileButton input").each((i, button) => {
        $(button).prop("disabled", false).removeClass("disabled");
    });

    $(".fileButton label").each((i, button) => {
        $(button).prop("disabled", false).removeClass("disabled");
    });
}

$(document).ready(function () {
    //fileButtonDisable();

    $("#buttonStyleRegistUpload").on("click", () => {
        $("#inputFile").trigger("click");
    });
});

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
    ETC99: "",
};

const emptyKCD_BUYER = {
    id: 0,
    BUYER_CD: "",
    BUYER_NAME: "",
    BUYER_ABBR: "",
    BUYER_TEAM: "",
    SHINTS_USER: "",
    USER_NAME: "",
    EMAIL: "",
    TEL_NO: "",
    FAX_NO: "",
    ZIP_NO: "",
    ADDR1: "",
    ADDR2: "",
    COMM_FLAG: "",
    SALES_TEAM: "",
    NAT_CD: "",
    BANK_CD: "",
    STS_FLAG: "",
    BVT_FLAG: "",
    STATUS_CD: "",
    REG_USER: "",
    REG_DATETIME: "",
    UPD_USER: "",
    UPD_DATETIME: "",
    NEOE_BUYER_CD_MOM: "",
    NEOE_BUYER_CD: "",
    NEOE_A23: "",
    loss_flag: "",
    glove_flag: "",
    MOM_CD: "",
    BUYER_TYPE: "",
    PAY_RULE: "",
    ETC99: "",
};

const emptyKCD_STYLE = {
    id: 0,
    STYLE_CD: "",
    STYLE_NAME: "",
    BUYER_CD: "",
    MW: "",
    EMBRO: "",
    TP: "",
    SP: "",
    LTHR: "",
    G: "",
    W: "",
    S: "",
    FND: "",
    DL: "",
    DOWN: "",
    CUT: "",
    KIND: "",
    BVT_KIND: "",
    YY: 0,
    SEQ: 0,
    BVT_FLAG: "",
    STATUS_CD: "",
    REG_USER: "",
    REG_DATETIME: "",
    UPD_USER: "",
    UPD_DATETIME: "",
    TPR: "0",
    EMBOSSING: "",
    WASHING: "",
    STYLE_UNIT: "",
    PURPOSE: "",
    FABRIC: "",
    style_kname: "",
    ss_direct_rate: "",
    ss_extra_rate: "",
    ss_retail_rate: "",
    ss_web_rate: "",
    ss_nsr_rate: "",
    ss_webex_rate: "",
    minus_limit: 0,
    in_exp_date: "",
    FTP: "",
    DTP: "",
    LAZE: "",
    STATUS_NAME: "",
    BVT_KIND_NAME: "",
    BUYER_NAME: "",
    COLOR_CNT: "",
    COLOR: "",
    ETC99: "",
};

const emptyKSV_PROD_MST = {
    id: 0,
    PROD_CD: "",
    STYLE_CD: "",
    PROD_TYPE: "",
    COLOR: "",
    PROD_UNIT: "",
    COLLECTION: "",
    YY: 0,
    SEQ: 0,
    SIZE_LOSS: "",
    STATUS_CD: "",
    REG_USER: "",
    REG_DATETIME: "",
    UPD_USER: "",
    UPD_DATETIME: "",
};

const MgrKcdStyle = () => {
    const [loadingTBL_KCD_STYLE, setLoadingTBL_KCD_STYLE] = useState(false);

    const [datasKCD_STYLE_STATUS_CD, setDatasKCD_STYLE_STATUS_CD] = useState(
        [],
    );
    const [dataKCD_STYLE_STATUS_CD, setDataKCD_STYLE_STATUS_CD] = useState({});
    const [datasKCD_STYLE_BUYER_CD, setDatasKCD_STYLE_BUYER_CD] = useState([]);
    const [dataKCD_STYLE_BUYER_CD, setDataKCD_STYLE_BUYER_CD] = useState({});
    const [datasKCD_STYLE_KIND, setDatasKCD_STYLE_KIND] = useState([]);
    const [dataKCD_STYLE_KIND, setDataKCD_STYLE_KIND] = useState({});
    const [datasKCD_STYLE_DL, setDatasKCD_STYLE_DL] = useState([]);
    const [dataKCD_STYLE_DL, setDataKCD_STYLE_DL] = useState({});
    const [datasKCD_STYLE_MW, setDatasKCD_STYLE_MW] = useState([]);
    const [dataKCD_STYLE_MW, setDataKCD_STYLE_MW] = useState({});
    const [datasKCD_STYLE_EMBRO, setDatasKCD_STYLE_EMBRO] = useState([]);
    const [dataKCD_STYLE_EMBRO, setDataKCD_STYLE_EMBRO] = useState({});
    const [datasKCD_STYLE_SP, setDatasKCD_STYLE_SP] = useState([]);
    const [dataKCD_STYLE_SP, setDataKCD_STYLE_SP] = useState({});
    const [datasKCD_STYLE_TP, setDatasKCD_STYLE_TP] = useState([]);
    const [dataKCD_STYLE_TP, setDataKCD_STYLE_TP] = useState({});
    const [datasKCD_STYLE_LTHR, setDatasKCD_STYLE_LTHR] = useState([]);
    const [dataKCD_STYLE_LTHR, setDataKCD_STYLE_LTHR] = useState({});
    const [datasKCD_STYLE_G, setDatasKCD_STYLE_G] = useState([]);
    const [dataKCD_STYLE_G, setDataKCD_STYLE_G] = useState({});
    const [datasKCD_STYLE_W, setDatasKCD_STYLE_W] = useState([]);
    const [dataKCD_STYLE_W, setDataKCD_STYLE_W] = useState({});
    const [datasKCD_STYLE_LAZE, setDatasKCD_STYLE_LAZE] = useState([]);
    const [dataKCD_STYLE_LAZE, setDataKCD_STYLE_LAZE] = useState({});
    const [datasKCD_STYLE_S, setDatasKCD_STYLE_S] = useState([]);
    const [dataKCD_STYLE_S, setDataKCD_STYLE_S] = useState({});
    const [datasKCD_STYLE_FND, setDatasKCD_STYLE_FND] = useState([]);
    const [dataKCD_STYLE_FND, setDataKCD_STYLE_FND] = useState({});
    const [datasKCD_STYLE_EMBOSSING, setDatasKCD_STYLE_EMBOSSING] = useState(
        [],
    );
    const [dataKCD_STYLE_EMBOSSING, setDataKCD_STYLE_EMBOSSING] = useState({});
    const [datasKCD_STYLE_WASHING, setDatasKCD_STYLE_WASHING] = useState([]);
    const [dataKCD_STYLE_WASHING, setDataKCD_STYLE_WASHING] = useState({});
    const [datasKCD_STYLE_CUT, setDatasKCD_STYLE_CUT] = useState([]);
    const [dataKCD_STYLE_CUT, setDataKCD_STYLE_CUT] = useState({});
    const [datasKCD_STYLE_FTP, setDatasKCD_STYLE_FTP] = useState([]);
    const [dataKCD_STYLE_FTP, setDataKCD_STYLE_FTP] = useState({});
    const [datasKCD_STYLE_DTP, setDatasKCD_STYLE_DTP] = useState([]);
    const [dataKCD_STYLE_DTP, setDataKCD_STYLE_DTP] = useState({});
    const [datasKCD_STYLE_DOWN, setDatasKCD_STYLE_DOWN] = useState([]);
    const [dataKCD_STYLE_DOWN, setDataKCD_STYLE_DOWN] = useState({});
    const [datasKCD_STYLE_UNIT, setDatasKCD_STYLE_UNIT] = useState([]);
    const [dataKCD_STYLE_UNIT, setDataKCD_STYLE_UNIT] = useState({});
    const [datasKCD_STYLE_PURPOSE, setDatasKCD_STYLE_PURPOSE] = useState([]);
    const [dataKCD_STYLE_PURPOSE, setDataKCD_STYLE_PURPOSE] = useState({});
    const [datasKCD_STYLE_FABRIC, setDatasKCD_STYLE_FABRIC] = useState([]);
    const [dataKCD_STYLE_FABRIC, setDataKCD_STYLE_FABRIC] = useState({});

    const [dataQryStyleName, setDataQryStyleName] = useState("");
    const [dataQryBuyerName, setDataQryBuyerName] = useState("");

    const [datasQryStatus, setDatasQryStatus] = useState([]);
    const [dataQryStatus, setDataQryStatus] = useState("");

    const [datasQryBuyerCd, setDatasQryBuyerCd] = useState([]);
    const [dataQryBuyerCd, setDataQryBuyerCd] = useState("");

    const [datasQryKind, setDatasQryKind] = useState([]);
    const [dataQryKind, setDataQryKind] = useState("");

    const [dataInColor, setDataInColor] = useState("");
    const [dataInSizeLoss, setDataInSizeLoss] = useState("");

    const [datasInProdType, setDatasInProdType] = useState([]);
    const [dataInProdType, setDataInProdType] = useState("");

    const [dataInStyleD, setDataInStyleD] = useState("");
    const [dataInStyleZ, setDataInStyleZ] = useState("");

    const [qrySearchStringKCD_STYLE, setQrySearchStringKCD_STYLE] =
        useState("");
    const [qryBuyerCdKCD_STYLE, setQryBuyerCdKCD_STYLE] =
        useState(emptyKCD_BUYER);
    const [qryBvtKindKCD_STYLE, setQryBvtKindKCD_STYLE] =
        useState(emptyKCD_CODE);
    const [qryStyleCd, setQryStyleCd] = useState("");

    const [dataKCD_BUYER, setDataKCD_BUYER] = useState(emptyKCD_BUYER);

    const [regKCD_STYLE_BUYER_CD, setRegKCD_STYLE_BUYER_CD] = useState({});
    const [regKCD_STYLE_BVT_KIND, setRegKCD_STYLE_BVT_KIND] = useState({});
    const [regKCD_STYLE_MW, setRegKCD_STYLE_MW] = useState({});
    const [regKCD_STYLE_LTHR, setRegKCD_STYLE_LTHR] = useState({});
    const [regKCD_STYLE_G, setRegKCD_STYLE_G] = useState({});
    const [regKCD_STYLE_S, setRegKCD_STYLE_S] = useState({});
    const [regKCD_STYLE_FND, setRegKCD_STYLE_FND] = useState({});
    const [regKCD_STYLE_DL, setRegKCD_STYLE_DL] = useState({});
    const [regKCD_STYLE_EMBOSSING, setRegKCD_STYLE_EMBOSSING] = useState({});
    const [regKCD_STYLE_WASHING, setRegKCD_STYLE_WASHING] = useState({});
    const [regKCD_STYLE_DOWN, setRegKCD_STYLE_DOWN] = useState({});
    const [regKCD_STYLE_UNIT, setRegKCD_STYLE_UNIT] = useState({});
    const [regKCD_STYLE_CUT, setRegKCD_STYLE_CUT] = useState({});
    const [regKCD_STYLE_PURPOSE, setRegKCD_STYLE_PURPOSE] = useState({});
    const [regKCD_STYLE_FABRIC, setRegKCD_STYLE_FABRIC] = useState({});

    const [datasKCD_STYLE, setDatasKCD_STYLE] = useState([]);
    const [datasKSV_PROD_MST, setDatasKSV_PROD_MST] = useState([]);
    const [datasKCD_STYLE_BVT_KIND, setDatasKCD_STYLE_BVT_KIND] = useState([]);

    const [createDialogKCD_STYLE, setCreateDialogKCD_STYLE] = useState(false);
    const [deleteDialogKCD_STYLE, setDeleteDialogKCD_STYLE] = useState(false);
    const [deleteDatasDialogKCD_STYLE, setDeleteDatasDialogKCD_STYLE] =
        useState(false);

    const [submittedKCD_STYLE, setSubmittedKCD_STYLE] = useState(false);
    const [flagModalKCD_STYLE, setFlagModalKCD_STYLE] = useState(false);
    const [flagSelectModeKCD_STYLE, setFlagSelectModeKCD_STYLE] =
        useState(false);

    const dt_KCD_STYLE = useRef(null);
    const [createDialogKSV_PROD_MST, setCreateDialogKSV_PROD_MST] =
        useState(false);
    const [deleteDialogKSV_PROD_MST, setDeleteDialogKSV_PROD_MST] =
        useState(false);
    const [deleteDatasDialogKSV_PROD_MST, setDeleteDatasDialogKSV_PROD_MST] =
        useState(false);

    const [submittedKSV_PROD_MST, setSubmittedKSV_PROD_MST] = useState(false);
    const [flagModalKSV_PROD_MST, setFlagModalKSV_PROD_MST] = useState(false);
    const [flagSelectModeKSV_PROD_MST, setFlagSelectModeKSV_PROD_MST] =
        useState(false);

    const dt_KSV_PROD_MST = useRef(null);

    const [dataKCD_STYLE, setDataKCD_STYLE] = useState(emptyKCD_STYLE);
    const [selectedKCD_STYLE, setSelectedKCD_STYLE] = useState({});

    const [dataKSV_PROD_MST, setDataKSV_PROD_MST] = useState(emptyKSV_PROD_MST);
    const [selectedKSV_PROD_MST, setSelectedKSV_PROD_MST] = useState({});

    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0200_KCD_STYLERef = useRef(null);
    if (!serviceS0200_KCD_STYLERef.current) serviceS0200_KCD_STYLERef.current = new ServiceS0200_KCD_STYLE();
    const serviceS0200_KCD_STYLE = serviceS0200_KCD_STYLERef.current;

    const toast = useRef(null);
    const op = useRef(null);
    const dt_iframe = useRef(null);
    const [urlIframe, setUrlIframe] = useState("");

    //
    const [isInsertColor, setIsInsertColor] = useState(true);
    const [isShints, setIsShints] = useState(true);
    const [isFactory, setIsFactory] = useState(false);

    //

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [disableColor, setDisableColor] = useState(true);

    const [dataUrlFile1, setDataUrlFile1] = useState("");
    const [dataUrlImage, setDataUrlImage] = useState("");

    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);

    const [imgView, setImgView] = useState("");

    ///
    const process_QRY_RESET = () => {
        setDataQryStyleName("");
        setDataQryBuyerName("");
        setDataQryBuyerCd(datasQryBuyerCd[0]);
        setDataQryKind(datasQryKind[0]);
        setDatasKCD_STYLE([]);
        setSelectedKCD_STYLE([]);
        process_RESET();
    };

    const [isDisabled, setIsDisabled] = useState(false);

    const process_RESET = () => {
        //fileButtonDisable();
        $("#inputFile").val(null);
        setIsDisabled(false);

        var tBuyer = { ...dataKCD_BUYER };
        // var tStyle = { ...dataKCD_STYLE };
        var tStyle = { ...emptyKCD_STYLE };
        tStyle.STYLE_CD = "";
        tStyle.STYLE_NAME = "";

        setDataKCD_STYLE_BUYER_CD(datasKCD_STYLE_BUYER_CD[0]);
        tBuyer.BUYER_CD = "";
        tBuyer.BUYER_NAME = "";

        setDataKCD_STYLE_STATUS_CD(datasKCD_STYLE_STATUS_CD[0]);
        setDataKCD_STYLE_BUYER_CD(datasKCD_STYLE_BUYER_CD[0]);
        setDataKCD_STYLE_KIND(datasKCD_STYLE_KIND[0]);
        setDataKCD_STYLE_MW(datasKCD_STYLE_MW[0]);
        setDataKCD_STYLE_EMBRO(datasKCD_STYLE_EMBRO[0]);

        setDataKCD_STYLE_DL(datasKCD_STYLE_DL[0]);
        var tObj0 = {};
        datasKCD_STYLE_DL.forEach((col, i) => {
            var tObj = { ...col };
            if (tObj.CD_CODE === "X") tObj0 = { ...tObj };
        });
        setDataKCD_STYLE_DL(tObj0);
        tStyle.DL = "X";

        setDataKCD_STYLE_SP(datasKCD_STYLE_SP[0]);
        var tObj0 = {};
        datasKCD_STYLE_SP.forEach((col, i) => {
            var tObj = { ...col };
            if (tObj.CD_CODE === "X") tObj0 = { ...tObj };
        });
        setDataKCD_STYLE_SP(tObj0);
        tStyle.SP = "X";

        setDataKCD_STYLE_TP(datasKCD_STYLE_TP[0]);
        setDataKCD_STYLE_LTHR(datasKCD_STYLE_LTHR[0]);

        setDataKCD_STYLE_G(datasKCD_STYLE_G[0]);
        var tObj0 = {};
        datasKCD_STYLE_G.forEach((col, i) => {
            var tObj = { ...col };
            if (tObj.CD_CODE === "X") tObj0 = { ...tObj };
        });
        setDataKCD_STYLE_G(tObj0);
        tStyle.G = "X";

        setDataKCD_STYLE_W(datasKCD_STYLE_W[0]);
        var tObj0 = {};
        datasKCD_STYLE_W.forEach((col, i) => {
            var tObj = { ...col };
            if (tObj.CD_CODE === "X") tObj0 = { ...tObj };
        });
        setDataKCD_STYLE_W(tObj0);
        tStyle.W = "X";

        setDataKCD_STYLE_LAZE(datasKCD_STYLE_LAZE[0]);

        setDataKCD_STYLE_S(datasKCD_STYLE_S[0]);
        var tObj0 = {};
        datasKCD_STYLE_S.forEach((col, i) => {
            var tObj = { ...col };
            if (tObj.CD_CODE === "X") tObj0 = { ...tObj };
        });
        setDataKCD_STYLE_S(tObj0);
        tStyle.S = "X";

        setDataKCD_STYLE_FND(datasKCD_STYLE_FND[0]);
        var tObj0 = {};
        datasKCD_STYLE_FND.forEach((col, i) => {
            var tObj = { ...col };
            if (tObj.CD_CODE === "X") tObj0 = { ...tObj };
        });
        setDataKCD_STYLE_FND(tObj0);
        tStyle.FND = "X";

        setDataKCD_STYLE_EMBOSSING(datasKCD_STYLE_EMBOSSING[0]);
        setDataKCD_STYLE_WASHING(datasKCD_STYLE_WASHING[0]);
        setDataKCD_STYLE_CUT(datasKCD_STYLE_CUT[0]);
        setDataKCD_STYLE_FTP(datasKCD_STYLE_FTP[0]);
        setDataKCD_STYLE_DTP(datasKCD_STYLE_DTP[0]);

        setDataKCD_STYLE_DOWN(datasKCD_STYLE_DOWN[0]);
        var tObj0 = {};
        datasKCD_STYLE_DOWN.forEach((col, i) => {
            var tObj = { ...col };
            if (tObj.CD_CODE === "X") tObj0 = { ...tObj };
        });
        setDataKCD_STYLE_DOWN(tObj0);
        tStyle.DOWN = "X";

        setDataKCD_STYLE_UNIT(datasKCD_STYLE_UNIT[0]);
        var tObj0 = {};
        datasKCD_STYLE_UNIT.forEach((col, i) => {
            var tObj = { ...col };
            if (tObj.CD_CODE === "PC") tObj0 = { ...tObj };
        });
        setDataKCD_STYLE_UNIT(tObj0);
        tStyle.UNIT = "PC";

        setDataKCD_STYLE_PURPOSE(datasKCD_STYLE_PURPOSE[0]);
        setDataKCD_STYLE_FABRIC(datasKCD_STYLE_FABRIC[0]);

        setDataKCD_BUYER(tBuyer);
        setDataKCD_STYLE(tStyle);

        setDatasKSV_PROD_MST([]);
        setSelectedKSV_PROD_MST([]);

        setDataUrlImage("");
        setImgView("");

        setIsInsertColor(false);
    };

    //
    const [popupDialog, setPopupDialog] = useState(false);

    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    const popup_ORDER_REG = (e) => {
        if (dataKCD_STYLE.STYLE_CD === "") {
            alert("조회된 데이터가 없습니다<br><br>There is no data viewed");
            return;
        }

        // var tSTYLE_CD = selectedKCD_STYLE.STYLE_CD;
        // var tSTYLE_NAME = selectedKCD_STYLE.STYLE_NAME;
        var tSTYLE_CD = dataKCD_STYLE.STYLE_CD;
        var tSTYLE_NAME = dataKCD_STYLE.STYLE_NAME;

        var tUrl1 = `${window.location.origin}/#/`;
        tUrl1 +=
            "S020602_ORDER_REG?STYLE_CD=" +
            tSTYLE_CD +
            "&STYLE_NAME=" +
            tSTYLE_NAME;

        var tUrl2 =
            "S020602_ORDER_REG?STYLE_CD=" +
            tSTYLE_CD +
            "&STYLE_NAME=" +
            tSTYLE_NAME;

        var tValObj = {
            key: "1-19",
            label: "Order Regist",
            icon: "pi pi-fw pi-user-edit",
            url1: "S020602_ORDER_REG",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    /* */

    useEffect(() => {
        setBtnDownloadLabel("Download");
        var tUserInfo = serviceLib.getUserInfo();
        if (tUserInfo.FACTORY_CD === "FC010") {
            setIsShints(false);
            //setIsFactory(true);
            setIsFactory(false);
        } else if (
            tUserInfo.FACTORY_CD === "FC034" ||
            tUserInfo.FACTORY_CD === "FC044"
        ) {
            setIsShints(false);
            setIsFactory(false);
        } else {
            setIsShints(false);
            //setIsFactory(true);
            setIsFactory(false);
        }
        setIsInsertColor(false);

        setLoading(true);

        // searchKCD_STYLE();

        serviceS0200_KCD_STYLE.mgr1KcdStyleCode("").then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgr1KCD_BANK.mgr1KcdStyleCode call => " +
                        data.T_KCD_STYLE_STATUS_CD.length,
                );
                console.log(JSON.stringify(data.T_KCD_STYLE_STATUS_CD));
                console.log(
                    "ServiceMgr1KCD_BANK.mgr1KcdStyleCode call => " +
                        data.T_KCD_STYLE_DL.length,
                );
                console.log(JSON.stringify(data.T_KCD_STYLE_DL));

                var tEditObj = { ...dataKCD_STYLE };

                setDatasQryStatus(data.T_KCD_STYLE_STATUS_CD);

                setDatasQryBuyerCd(data.T_KCD_STYLE_BUYER);
                setDataQryBuyerCd(data.T_KCD_STYLE_BUYER[0]);

                setDatasQryKind(data.T_KCD_STYLE_KIND);
                setDataQryKind(data.T_KCD_STYLE_KIND[0]);

                setDatasKCD_STYLE_STATUS_CD(data.T_KCD_STYLE_STATUS_CD);
                setDataKCD_STYLE_STATUS_CD(data.T_KCD_STYLE_STATUS_CD[0]);

                setDatasKCD_STYLE_BUYER_CD(data.T_KCD_STYLE_BUYER);
                setDataKCD_STYLE_BUYER_CD(data.T_KCD_STYLE_BUYER[0]);

                setDatasKCD_STYLE_KIND(data.T_KCD_STYLE_KIND);
                setDataKCD_STYLE_KIND(data.T_KCD_STYLE_KIND[0]);

                setDatasKCD_STYLE_MW(data.T_KCD_STYLE_MW);
                setDataKCD_STYLE_MW(data.T_KCD_STYLE_MW[0]);

                setDatasKCD_STYLE_EMBRO(data.T_KCD_STYLE_EMBRO);
                setDataKCD_STYLE_EMBRO(data.T_KCD_STYLE_EMBRO[0]);

                setDatasKCD_STYLE_SP(data.T_KCD_STYLE_SP);
                var tObj0 = {};
                data.T_KCD_STYLE_SP.forEach((col, i) => {
                    var tObj = { ...col };
                    if (tObj.CD_CODE === "X") tObj0 = { ...tObj };
                });
                setDataKCD_STYLE_SP(tObj0);
                tEditObj.SP = "X";
                // setDataKCD_STYLE_SP(data.T_KCD_STYLE_SP[0]);

                setDatasKCD_STYLE_TP(data.T_KCD_STYLE_TP);
                setDataKCD_STYLE_TP(data.T_KCD_STYLE_TP[0]);

                setDatasKCD_STYLE_LTHR(data.T_KCD_STYLE_LTHR);
                setDataKCD_STYLE_LTHR(data.T_KCD_STYLE_LTHR[0]);

                setDatasKCD_STYLE_DL(data.T_KCD_STYLE_DL);
                var tObj0 = {};
                data.T_KCD_STYLE_DL.forEach((col, i) => {
                    var tObj = { ...col };
                    if (tObj.CD_CODE === "X") tObj0 = { ...tObj };
                });
                setDataKCD_STYLE_DL(tObj0);
                tEditObj.DL = "X";

                setDatasKCD_STYLE_G(data.T_KCD_STYLE_G);
                var tObj0 = {};
                data.T_KCD_STYLE_G.forEach((col, i) => {
                    var tObj = { ...col };
                    if (tObj.CD_CODE === "X") tObj0 = { ...tObj };
                });
                setDataKCD_STYLE_G(tObj0);
                tEditObj.G = "X";

                setDatasKCD_STYLE_W(data.T_KCD_STYLE_W);
                var tObj0 = {};
                data.T_KCD_STYLE_W.forEach((col, i) => {
                    var tObj = { ...col };
                    if (tObj.CD_CODE === "X") tObj0 = { ...tObj };
                });
                setDataKCD_STYLE_W(tObj0);
                tEditObj.W = "X";
                // setDataKCD_STYLE_W(data.T_KCD_STYLE_W[0]);

                setDatasKCD_STYLE_LAZE(data.T_KCD_STYLE_LAZE);
                setDataKCD_STYLE_LAZE(data.T_KCD_STYLE_LAZE[0]);

                setDatasKCD_STYLE_S(data.T_KCD_STYLE_S);
                var tObj0 = {};
                data.T_KCD_STYLE_S.forEach((col, i) => {
                    var tObj = { ...col };
                    if (tObj.CD_CODE === "X") tObj0 = { ...tObj };
                });
                setDataKCD_STYLE_S(tObj0);
                tEditObj.S = "X";
                // setDataKCD_STYLE_S(data.T_KCD_STYLE_S[0]);

                setDatasKCD_STYLE_FND(data.T_KCD_STYLE_FND);
                var tObj0 = {};
                data.T_KCD_STYLE_FND.forEach((col, i) => {
                    var tObj = { ...col };
                    if (tObj.CD_CODE === "X") tObj0 = { ...tObj };
                });
                setDataKCD_STYLE_FND(tObj0);
                tEditObj.FND = "X";
                // setDataKCD_STYLE_FND(data.T_KCD_STYLE_FND[0]);

                setDatasKCD_STYLE_EMBOSSING(data.T_KCD_STYLE_EMBOSSING);
                setDataKCD_STYLE_EMBOSSING(data.T_KCD_STYLE_EMBOSSING[0]);

                setDatasKCD_STYLE_WASHING(data.T_KCD_STYLE_WASHING);
                setDataKCD_STYLE_WASHING(data.T_KCD_STYLE_WASHING[0]);

                setDatasKCD_STYLE_CUT(data.T_KCD_STYLE_CUT);
                setDataKCD_STYLE_CUT(data.T_KCD_STYLE_CUT[0]);

                setDatasKCD_STYLE_FTP(data.T_KCD_STYLE_FTP);
                setDataKCD_STYLE_FTP(data.T_KCD_STYLE_FTP[0]);

                setDatasKCD_STYLE_DTP(data.T_KCD_STYLE_DTP);
                setDataKCD_STYLE_DTP(data.T_KCD_STYLE_DTP[0]);

                setDatasKCD_STYLE_DOWN(data.T_KCD_STYLE_DOWN);
                var tObj0 = {};
                data.T_KCD_STYLE_DOWN.forEach((col, i) => {
                    var tObj = { ...col };
                    if (tObj.CD_CODE === "X") tObj0 = { ...tObj };
                });
                setDataKCD_STYLE_DOWN(tObj0);
                tEditObj.DOWN = "X";
                // setDataKCD_STYLE_DOWN(data.T_KCD_STYLE_DOWN[0]);

                setDatasKCD_STYLE_UNIT(data.T_KCD_STYLE_UNIT);
                var tObj0 = {};
                data.T_KCD_STYLE_UNIT.forEach((col, i) => {
                    var tObj = { ...col };
                    if (tObj.CD_CODE === "PC") tObj0 = { ...tObj };
                });
                setDataKCD_STYLE_UNIT(tObj0);
                tEditObj.STYLE_UNIT = "PC";

                setDatasKCD_STYLE_PURPOSE(data.T_KCD_STYLE_PURPOSE);
                setDataKCD_STYLE_PURPOSE(data.T_KCD_STYLE_PURPOSE[0]);

                setDatasKCD_STYLE_FABRIC(data.T_KCD_STYLE_FABRIC);
                setDataKCD_STYLE_FABRIC(data.T_KCD_STYLE_FABRIC[0]);

                setDatasInProdType(data.T_KCD_STYLE_PROD_TYPE);
                setDataInProdType(data.T_KCD_STYLE_PROD_TYPE[0]);

                setDataKCD_STYLE(tEditObj);

                setLoading(false);
            } else {
                // var tStr = data.graphQLErrors[0].message;
                //toast.current.show({ severity: 'success', summary: 'Query Error', detail: tStr, life: 3000 });
            }
        });
    }, []);
    /******************* EDIT TABLE START: KCD_STYLE ****************************************/ const editKCD_STYLE =
        (argKCD_STYLE) => {
            editKCD_STYLE_STATUS_CD(argKCD_STYLE.STATUS_CD);
            editKCD_STYLE_BUYER_CD(argKCD_STYLE.BUYER_CD);
            editKCD_STYLE_KIND(argKCD_STYLE.KIND);
            editKCD_STYLE_DL(argKCD_STYLE.DL);
            editKCD_STYLE_MW(argKCD_STYLE.MW);
            editKCD_STYLE_EMBRO(argKCD_STYLE.EMBRO);
            editKCD_STYLE_SP(argKCD_STYLE.SP);
            editKCD_STYLE_TP(argKCD_STYLE.TP);
            editKCD_STYLE_LTHR(argKCD_STYLE.LTHR);
            editKCD_STYLE_G(argKCD_STYLE.G);
            editKCD_STYLE_W(argKCD_STYLE.W);
            editKCD_STYLE_LAZE(argKCD_STYLE.LAZE);
            editKCD_STYLE_S(argKCD_STYLE.S);
            editKCD_STYLE_FND(argKCD_STYLE.FND);
            editKCD_STYLE_EMBOSSING(argKCD_STYLE.EMBOSSING);
            editKCD_STYLE_WASHING(argKCD_STYLE.WASHING);
            editKCD_STYLE_CUT(argKCD_STYLE.CUT);
            editKCD_STYLE_FTP(argKCD_STYLE.FTP);
            editKCD_STYLE_DTP(argKCD_STYLE.DTP);
            editKCD_STYLE_DOWN(argKCD_STYLE.DOWN);
            editKCD_STYLE_UNIT(argKCD_STYLE.STYLE_UNIT);
            editKCD_STYLE_PURPOSE(argKCD_STYLE.PURPOSE);
            editKCD_STYLE_FABRIC(argKCD_STYLE.FABRIC);
        };

    /******************* EDIT TABLE END: KCD_STYLE ****************************************/

    /******************* EDIT TABLE START: KSV_PROD_MST ****************************************/

    /******************* EDIT TABLE END: KSV_PROD_MST ****************************************/

    /************************* DATAGRID : KCD_STYLE START **************************************************/
    const onRowClick1KCD_STYLE = (argDataArray) => {
        if (argDataArray === null) return;
        if (argDataArray === "") return;

        var argData = {};
        if (typeof argDataArray.length !== "undefined") {
            argData = { ...argDataArray[0] };
        } else {
            argData = { ...argDataArray };
        }

        fileButtonEnable();
        setDataInColor("");
        setDataInSizeLoss("");

        setIsDisabled(true);

        let argKCD_STYLE = { ...argData };
        editKCD_STYLE(argKCD_STYLE);
        setDataKCD_STYLE(argKCD_STYLE);
        setImgView(argData.fileUrl);
        // setDataKCD_STYLE({...dataKCD_STYLE, imgURL: argData.fileUrl, fileName: argData.fileName});
        setDataKCD_STYLE({
            ...argKCD_STYLE,
            imgURL: argData.fileUrl,
            fileName: argData.fileName,
        });

        setBtnDownloadLabel(argData.fileName);

        console.log(argData);

        var tBuyer = { ...dataKCD_BUYER };
        tBuyer.BUYER_NAME = argData.BUYER_NAME;
        setDataKCD_BUYER(tBuyer);

        if (isFactory) {
            setIsShints(false);
        } else {
            //setIsShints(true);
        }
        setIsInsertColor(false);
        setDatasKSV_PROD_MST([]);
        setSelectedKSV_PROD_MST([]);

        let _url1 = `${apiOption.apiuri}/restapi/`;
        var tUrl = `${_url1}fileupload2/style/${argData.STYLE_CD}/1`;
        setDataUrlFile1(tUrl);

        console.log("ServiceMgrKCD_STYLE: => " + argKCD_STYLE.STYLE_CD);
        serviceS0200_KCD_STYLE
            .mgr1KcdStyleKsvProdMst(argData.STYLE_CD)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyleKsvProdMst call => " +
                            data.length,
                    );
                    setDatasKSV_PROD_MST(data);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        serviceS0200_KCD_STYLE
            .mgr1KcdStyleChild(argData.STYLE_CD)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyleChild call => " +
                            data.length,
                    );
                    var tIdx = 0;
                    var tStyleZ = "";
                    var tStyleD = "";
                    for (tIdx = 0; tIdx < data.length; tIdx++) {
                        var tObj00 = data[tIdx];
                        if (tObj00.STYLE_CD.includes("-ZL")) {
                            tStyleZ = tObj00.STYLE_CD;
                        }
                        if (tObj00.STYLE_CD.includes("-DL")) {
                            tStyleD = tObj00.STYLE_CD;
                        }
                    }
                    setDataInStyleZ(tStyleZ);
                    setDataInStyleD(tStyleD);
                    // setDatasKSV_PROD_MST(data);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        serviceS0200_KCD_STYLE
            .mgr1KcdStyleImage(argData.STYLE_CD)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyleChild call => " +
                            data.length,
                    );
                    var tImageName = data[0].IMAGE_NAME;

                    if (tImageName === "") {
                        setDataUrlImage("");
                    } else {
                        var fileext = tImageName.split(".")[1];

                        let _url1 = `${apiOption.apiuri}/restapi/`;
                        var tUrl = `${_url1}imageget/style/${argKCD_STYLE.STYLE_CD}_1/${fileext}`;
                        setDataUrlImage(tUrl);
                    }

                    // setDatasKSV_PROD_MST(data);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const onRowClickKCD_STYLE = (event) => {};

    const searchKCD_STYLE = (argData) => {
        clearSelectedKCD_STYLE();
        setImgView(null);
        setCreateDialogKCD_STYLE(false);
        setLoading(true);

        var tStyleName = dataQryStyleName;
        var tBuyerName = "";
        if (dataQryBuyerCd.BUYER_CD === null);
        else tBuyerName = dataQryBuyerCd.BUYER_CD;
        var tKind = "";
        if (dataQryKind.CD_CODE === null);
        else tKind = dataQryKind.CD_CODE;

        console.log(dt_KCD_STYLE.current);

        if (
            typeof argData !== "undefined" &&
            typeof argData.STYLE_CD !== "undefined"
        ) {
            tStyleName = argData.STYLE_CD;
            tBuyerName = "";
            tKind = "";
            setDatasKSV_PROD_MST([]);
            setDatasKCD_STYLE([]);
            setSelectedKSV_PROD_MST([]);
        } else {
            // editKCD_STYLE(emptyKCD_STYLE);
            // setDataKCD_STYLE(emptyKCD_STYLE);
            process_RESET();

            setDatasKSV_PROD_MST([]);
            setDatasKCD_STYLE([]);
            setSelectedKSV_PROD_MST([]);
        }

        setLoadingTBL_KCD_STYLE(true);
        serviceS0200_KCD_STYLE
            .mgr1KcdStyle(tStyleName, tBuyerName, tKind)
            .then((data) => {
                setLoadingTBL_KCD_STYLE(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    var tArray = [];
                    data.forEach((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        if (tObj.STYLE_UNIT === null) tObj.STYLE_UNIT = "";
                        if (tObj.PURPOSE === null) tObj.PURPOSE = "";
                        if (tObj.FABRIC === null) tObj.FABRIC = "";
                        tArray.push(tObj);
                    });
                    setDatasKCD_STYLE(tArray);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_SAVE = async () => {
        setSubmittedKCD_STYLE(true);

        let _datasKCD_STYLE = [...datasKCD_STYLE];
        let _datasKSV_PROD_MST = [...datasKSV_PROD_MST];
        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        var tUserInfo = serviceLib.getUserInfo();
        if (
            tUserInfo.FACTORY_CD === "FC034" ||
            tUserInfo.FACTORY_CD === "FC044"
        ) {
            if (
                _dataKCD_STYLE.KIND === "" ||
                _dataKCD_STYLE.KIND === "0" ||
                _dataKCD_STYLE.W === "" ||
                _dataKCD_STYLE.FND === "" ||
                _dataKCD_STYLE.SP === "" ||
                _dataKCD_STYLE.DOWN === ""
            ) {
                alert(
                    `필수정보를 입력하세요.Kind:${_dataKCD_STYLE.KIND}/W:${_dataKCD_STYLE.W}/FND:${_dataKCD_STYLE.FND}/SP:${_dataKCD_STYLE.SP}/DOWN:${_dataKCD_STYLE.S} `,
                );
                // alert (`필수정보를 입력하세요.Kind:${_dataKCD_STYLE.KIND}/G:${_dataKCD_STYLE.G}/W:${_dataKCD_STYLE.W}/S:${_dataKCD_STYLE.S}/FND:${_dataKCD_STYLE.FND}/SP:${_dataKCD_STYLE.SP}/DOWN:${_dataKCD_STYLE.S} `);
                return;
            }
        } else {
            if (
                _dataKCD_STYLE.KIND === "" ||
                _dataKCD_STYLE.KIND === "0" ||
                _dataKCD_STYLE.G === "" ||
                _dataKCD_STYLE.S === ""
            ) {
                alert(
                    `필수정보를 입력하세요.Kind:${_dataKCD_STYLE.KIND}/S:${_dataKCD_STYLE.S}/G:${_dataKCD_STYLE.G} `,
                );
                return;
            }
        }

        if (_dataKCD_STYLE.STYLE_CD !== "") {
            if (typeof selectedKCD_STYLE.STYLE_NAME !== "undefined") {
                var tSelObj = { ...selectedKCD_STYLE };
                if (tSelObj.STYLE_NAME !== _dataKCD_STYLE.STYLE_NAME) {
                    var tRet9 = await confirm(
                        "Style Name을 변경합니다. 진행하시겠습니까?",
                    );
                    if (tRet9);
                    else return;
                }
            } else {
                return;
            }
        }

        if (!imgView) {
            alert("Please upload Style Image");
            return;
        }

        setLoadingTBL_KCD_STYLE(true);

        serviceS0200_KCD_STYLE.mgr1KcdStyleSave(_dataKCD_STYLE).then((data) => {
            setLoadingTBL_KCD_STYLE(false);
            if (typeof data.graphQLErrors === "undefined") {
                alert(`Save Result:${data.STYLE_CD}`);

                if (data.STYLE_CD.includes("ERROR")) {
                    return;
                    // $('#inputFile').val(null);
                } else {
                    _dataKCD_STYLE.STYLE_CD = data.STYLE_CD;
                    setDataKCD_STYLE(_dataKCD_STYLE);

                    if (isFactory) {
                        setIsShints(false);
                    } else {
                        //setIsShints(true);
                    }
                }
                searchKCD_STYLE(data);

                console.log(
                    "ServiceMgrKCD_STYLE: => " + _dataKCD_STYLE.STYLE_CD,
                );
                serviceS0200_KCD_STYLE
                    .mgr1KcdStyleKsvProdMst(_dataKCD_STYLE.STYLE_CD)
                    .then((data) => {
                        if (typeof data.graphQLErrors === "undefined") {
                            console.log(
                                "ServiceMgrKCD_BUYER.mgr1KcdStyleKsvProdMst call => " +
                                    data.length,
                            );
                            setDatasKSV_PROD_MST([]);
                        } else {
                            console.log(
                                "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                                    JSON.stringify(data.graphQLErrors),
                            );
                        }
                    });

                serviceS0200_KCD_STYLE
                    .mgr1KcdStyleKsvProdMst(_dataKCD_STYLE.STYLE_CD)
                    .then((data) => {
                        if (typeof data.graphQLErrors === "undefined") {
                            console.log(
                                "ServiceMgrKCD_BUYER.mgr1KcdStyleKsvProdMst call => " +
                                    data.length,
                            );
                            setDatasKSV_PROD_MST(data);
                        } else {
                            console.log(
                                "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                                    JSON.stringify(data.graphQLErrors),
                            );
                        }
                    });

                serviceS0200_KCD_STYLE
                    .mgr1KcdStyleImage(_dataKCD_STYLE.STYLE_CD)
                    .then((data) => {
                        if (typeof data.graphQLErrors === "undefined") {
                            console.log(
                                "ServiceMgrKCD_BUYER.mgr1KcdStyleChild call => " +
                                    data.length,
                            );
                            var tImageName = data[0].IMAGE_NAME;

                            if (tImageName === "") {
                                setDataUrlImage("");
                            } else {
                                var fileext = tImageName.split(".")[1];

                                let _url1 = `${apiOption.apiuri}/restapi/`;
                                var tUrl = `${_url1}imageget/style/${_dataKCD_STYLE.STYLE_CD}_1/${fileext}`;
                                setDataUrlImage(tUrl);
                            }

                            // setDatasKSV_PROD_MST(data);
                        } else {
                            console.log(
                                "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                                    JSON.stringify(data.graphQLErrors),
                            );
                        }
                    });
            } else {
                var tStr = data.graphQLErrors[0].message;
                alert(`Save Error:${tStr}`);

                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdStyleSave error => " + tStr,
                );
            }
        });
    };

    const process_DELETE = () => {
        if (!selectedKCD_STYLE.STYLE_CD) {
            alert("스타일을 선택해주세요.<br><br>Please select a style.");
            return;
        }

        setLoadingTBL_KCD_STYLE(true);
        serviceS0200_KCD_STYLE
            .mgr1KcdStyleDelete(selectedKCD_STYLE.STYLE_CD)
            .then((data) => {
                setLoadingTBL_KCD_STYLE(false);

                if (typeof data.graphQLErrors === "undefined") {
                    alert(`${data.STYLE_CD}`);
                    searchKCD_STYLE();
                } else {
                    var tStr = data.graphQLErrors[0].message;
                    alert(`Save Error:${tStr}`);
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdStyleSave error => " +
                            tStr,
                    );
                }

                $("#inputFile").val(null);
                fileButtonDisable();
            });
    };

    const copyKCD_STYLE = () => {
        let _dataKCD_STYLE = { ...dataKCD_STYLE };
        _dataKCD_STYLE.STYLE_CD = "";
        _dataKCD_STYLE.id = 0;
        setDataKCD_STYLE(_dataKCD_STYLE);
        setIsDisabled(false);
    };

    const saveKSV_PROD_MST = (argOpMode, argData) => {
        var _tArray = [];
        _tArray.push(argData);

        serviceS0200_KCD_STYLE
            .mgr1KsvProdMstSave(_tArray, dataKCD_STYLE.BUYER_CD, argOpMode)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    toast.current.show({
                        severity: "success",
                        summary: "Color",
                        detail: "STATUS:" + data.STYLE_CD,
                        life: 3000,
                    });

                    setDatasKSV_PROD_MST([]);
                    setLoading1(true);
                    serviceS0200_KCD_STYLE
                        .mgr1KcdStyleKsvProdMst(dataKCD_STYLE.STYLE_CD)
                        .then((data) => {
                            setLoading1(false);
                            if (typeof data.graphQLErrors === "undefined") {
                                console.log(
                                    "ServiceMgrKCD_BUYER.mgr1KcdStyleKsvProdMst call => " +
                                        data.length,
                                );
                                setDatasKSV_PROD_MST(data);
                            } else {
                                console.log(
                                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
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
                        "ServiceMgrKCD_VENDOR.mgr1KcdStyleSave error => " +
                            tStr,
                    );
                }
            });
    };

    const deleteKCD_STYLE = () => {};

    const deleteSelectedKCD_STYLE = () => {};

    const clearSelectedKCD_STYLE = () => {
        setSelectedKCD_STYLE([]);
        setFlagSelectModeKCD_STYLE(false);
    };

    const hideDialogKCD_STYLE = () => {
        setSubmittedKCD_STYLE(false);
        setCreateDialogKCD_STYLE(false);
    };

    const hideDeleteDialogKCD_STYLE = () => {
        setDeleteDialogKCD_STYLE(false);
    };

    const hideDeleteDatasDialogKCD_STYLE = () => {
        clearSelectedKCD_STYLE();
        setDeleteDatasDialogKCD_STYLE(false);
    };

    const exportExcel = () => {
        import("xlsx").then((xlsx) => {
            var tArray = [];
            datasKCD_STYLE.forEach((col, i) => {
                var tObj = {};
                tObj.BUYER_NAME = col.BUYER_NAME;
                tObj.STYLE_CD = col.STYLE_CD;
                tObj.STYLE_NAME = col.STYLE_NAME;
                tObj.Gendor = col.MW;
                tObj.PURPOSE_NAME = col.PURPOSE_NAME;
                tObj.FABRIC_NAME = col.FABRIC_NAME;
                tObj.BVT_KIND = col.BVT_KIND;
                tObj.EMBRO = col.EMBRO;
                tObj.TP = col.TP;
                tObj.SP = col.SP;
                tObj.LTHR = col.LTHR;
                tObj.G = col.G;
                tObj.W = col.W;
                tObj.S = col.S;
                tObj.FND = col.FND;
                tObj.DL = col.DL;
                tObj.TPR = col.TPR;
                tObj.EMBOSSING = col.EMBOSSING;
                tObj.WASHING = col.WASHING;
                tObj.DOWN = col.DOWN;
                tObj.CUT = col.CUT;
                tObj.FTP = col.FTP;
                tObj.DTP = col.DTP;
                tObj.REG_USER = col.REG_USER;
                tArray.push(tObj);
            });

            const worksheet = xlsx.utils.json_to_sheet(tArray);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFile(excelBuffer, "스타일목록");
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

    const headerKCD_STYLE = (
        <div style={{ width: "100rem", height: "3rem" }}>
            <span style={{ width: "40rem", display: "inline-block" }}>
                <p style={{ textAlign: "left", width: "20rem", display: "inline-block", height: "2rem", }}>({datasKCD_STYLE.length}건이 조회되었습니다.)</p>
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
                    onClick={searchKCD_STYLE}
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

    const createDialogFooterKCD_STYLE = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDialogKCD_STYLE}
            />
            <Button
                label="Save"
                icon="pi pi-check"
                className="p-button-text"
                onClick={process_SAVE}
            />
            <Button
                label="Copy"
                icon="pi pi-check"
                className="p-button-text"
                onClick={copyKCD_STYLE}
            />
        </>
    );

    const deleteDialogFooterKCD_STYLE = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDeleteDialogKCD_STYLE}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-text"
                onClick={deleteKCD_STYLE}
            />
        </>
    );

    const deleteDatasDialogFooterKCD_STYLE = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDeleteDatasDialogKCD_STYLE}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-text"
                onClick={deleteSelectedKCD_STYLE}
            />
        </>
    );

    /************************* DATAGRID : KCD_STYLE END **************************************************/

    /************************* DATAGRID : KSV_PROD_MST START **************************************************/

    const onRowClickKSV_PROD_MST = (event) => {
        let argKSV_PROD_MST = event.data;
        // if (flagSelectModeKSV_PROD_MST) return;
        // console.log("RowClick =>" + argKSV_PROD_MST.id );

        var tObj = {};
        datasInProdType.forEach((col, i) => {
            if (col.CD_CODE === event.data.PROD_TYPE) tObj = { ...col };
        });
        setDataInProdType(tObj);

        setDataKSV_PROD_MST(argKSV_PROD_MST);
        setDataInColor(argKSV_PROD_MST.COLOR);
        setDataInSizeLoss(argKSV_PROD_MST.SIZE_LOSS);
    };

    // ETC

    const onInputChangeDataInColor = (e, name) => {
        let val = (e.target && e.target.value) || "";
        setDataInColor(val);
    };

    const process_REMOVE_COL = () => {
        if (dataKCD_STYLE.STYLE_CD === "") {
            alert("조회된 데이터가 없습니다<br><br>There is no data viewed");
            return;
        }

        if (selectedKSV_PROD_MST === null) return;

        var tSelObj = { ...selectedKSV_PROD_MST[0] };
        if (typeof tSelObj.__typename !== "undefined")
            delete tSelObj.__typename;
        tSelObj.id = 1;
        saveKSV_PROD_MST("DELETE", tSelObj);
    };

    const process_UPDATE_COL = () => {
        if (dataKCD_STYLE.STYLE_CD === "") {
            alert("조회된 데이터가 없습니다<br><br>There is no data viewed");
            return;
        }

        if (selectedKSV_PROD_MST === null) return;

        if (dataInColor === "") {
            alert("Color가 입력되지 않았습니다<br><br>Color has not been entered");
            return;
        }

        var tSelObj = { ...selectedKSV_PROD_MST[0] };
        if (typeof tSelObj.__typename !== "undefined")
            delete tSelObj.__typename;

        if (tSelObj.COLOR !== dataInColor) {
            var tRet9 = confirm("Color를 변경합니다. 진행하시겠습니까? <br><br>Change Color. Do you want to proceed?");
            if (tRet9);
            else return;
        }

        tSelObj.COLOR = dataInColor;
        tSelObj.PROD_TYPE = "1";
        tSelObj.id = 1;
        saveKSV_PROD_MST("UPDATE", tSelObj);
    };

    const process_ADD_COL = () => {
        var tFlag = 0;
        datasKSV_PROD_MST.forEach((col, i) => {
            if (col.COLOR === dataInColor) tFlag = 1;
        });
        if (tFlag !== 0) {
            alert("Color가 이미 등록되어있습니다.<br><br>Color is already registered.");
            return;
        }
        if (dataInColor === "") {
            alert("Color가 입력되지 않았습니다<br><br>Color has not been entered");
            return;
        }

        var tObj = { ...emptyKSV_PROD_MST };
        var tSeq = datasKSV_PROD_MST.length + 1;
        tObj.id = tSeq;
        tObj.PROD_CD = "";
        tObj.STYLE_CD = dataKCD_STYLE.STYLE_CD;
        tObj.COLOR = dataInColor;
        tObj.PROD_TYPE = "1";
        tObj.YY = dataKCD_STYLE.YY;
        tObj.SEQ = tSeq;
        tObj.SIZE_LOSS = "0";
        tObj.STATUS_CD = "0";
        tObj.REG_USER = serviceLib.getUserInfo().USER_ID;
        tObj.UPD_USER = serviceLib.getUserInfo().USER_ID;
        saveKSV_PROD_MST("ADD", tObj);
    };

    // Qry
    const onInputChangeQryStyleName = (e, name) => {
        let val = (e.target && e.target.value) || "";
        setDataQryStyleName(val);
    };

    const onQryStyleNameKeyPress = (e) => {
        if (e.key === "Enter") {
            console.log("enter press here! ");
            searchKCD_STYLE();
            // searchKCD_BANK();
        }
    };

    const onDropdownChangeQryBuyerCd = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";
        setDataQryBuyerCd(e.value);
    };

    const onDropdownChangeQryKind = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";
        setDataQryKind(e.value);
    };

    // Edit
    const onInputChangeKCD_STYLE_STYLE_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_STYLE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_STYLE[`${name}`] = parseInt(val);

        setDataKCD_STYLE(_dataKCD_STYLE);
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

    const onInputChangeKCD_STYLE_STYLE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_STYLE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_STYLE[`${name}`] = parseInt(val);

        setDataKCD_STYLE(_dataKCD_STYLE);
    };

    const editKCD_STYLE_STATUS_CD = (argValue) => {
        let _dataKCD_STYLE_STATUS_CD = datasKCD_STYLE_STATUS_CD.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_STYLE_STATUS_CD(_dataKCD_STYLE_STATUS_CD[0]);
    };

    const editKCD_STYLE_BUYER_CD = (argValue) => {
        let _dataKCD_STYLE_BUYER_CD = datasKCD_STYLE_BUYER_CD.filter(
            (val) => val.BUYER_CD === argValue,
        );
        setDataKCD_STYLE_BUYER_CD(_dataKCD_STYLE_BUYER_CD[0]);
    };

    const onDropdownChangeKCD_STYLE_BUYER_CD = (e, name) => {
        console.log(e.value);
        let val = (e.value && e.value.BUYER_CD) || "";

        console.log(val);
        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataKCD_STYLE(_dataKCD_STYLE);
        setDataKCD_STYLE_BUYER_CD(e.value);

        if (typeof e.value.BUYER_NAME !== "undefined") {
            var tBuyer = { ...dataKCD_BUYER };
            tBuyer.BUYER_NAME = e.value.BUYER_NAME;
            setDataKCD_BUYER(tBuyer);
        }
    };

    const editKCD_STYLE_KIND = (argValue) => {
        let _dataKCD_STYLE_KIND = datasKCD_STYLE_KIND.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_STYLE_KIND(_dataKCD_STYLE_KIND[0]);
    };

    const onDropdownChangeKCD_STYLE_KIND = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataKCD_STYLE(_dataKCD_STYLE);
        setDataKCD_STYLE_KIND(e.value);
    };

    const editKCD_STYLE_DL = (argValue) => {
        if (argValue === "") {
            let _tData = [...datasKCD_STYLE_DL];
            setDataKCD_STYLE_DL(_tData[0]);
            console.log(
                "editKCD_STYLE_DL: (" + argValue + ")" + "," + argValue.length,
            );
            return;
        } else {
            let _dataKCD_STYLE_DL = datasKCD_STYLE_DL.filter(
                (val) => val.CD_CODE === argValue,
            );
            setDataKCD_STYLE_DL(_dataKCD_STYLE_DL[0]);
        }
    };

    const onDropdownChangeKCD_STYLE_DL = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataKCD_STYLE(_dataKCD_STYLE);
        setDataKCD_STYLE_DL(e.value);
    };

    const editKCD_STYLE_MW = (argValue) => {
        let _dataKCD_STYLE_MW = datasKCD_STYLE_MW.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_STYLE_MW(_dataKCD_STYLE_MW[0]);
    };

    const onDropdownChangeKCD_STYLE_MW = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataKCD_STYLE(_dataKCD_STYLE);
        setDataKCD_STYLE_MW(e.value);
    };

    const editKCD_STYLE_EMBRO = (argValue) => {
        let _dataKCD_STYLE_EMBRO = datasKCD_STYLE_EMBRO.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_STYLE_EMBRO(_dataKCD_STYLE_EMBRO[0]);
    };

    const onDropdownChangeKCD_STYLE_EMBRO = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataKCD_STYLE(_dataKCD_STYLE);
        setDataKCD_STYLE_EMBRO(e.value);
    };

    const editKCD_STYLE_SP = (argValue) => {
        let _dataKCD_STYLE_SP = datasKCD_STYLE_SP.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_STYLE_SP(_dataKCD_STYLE_SP[0]);
    };

    const onDropdownChangeKCD_STYLE_SP = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataKCD_STYLE(_dataKCD_STYLE);
        setDataKCD_STYLE_SP(e.value);
    };

    const editKCD_STYLE_TP = (argValue) => {
        let _dataKCD_STYLE_TP = datasKCD_STYLE_TP.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_STYLE_TP(_dataKCD_STYLE_TP[0]);
    };

    const onDropdownChangeKCD_STYLE_TP = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataKCD_STYLE(_dataKCD_STYLE);
        setDataKCD_STYLE_TP(e.value);
    };

    const editKCD_STYLE_LTHR = (argValue) => {
        let _dataKCD_STYLE_LTHR = datasKCD_STYLE_LTHR.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_STYLE_LTHR(_dataKCD_STYLE_LTHR[0]);
    };

    const onDropdownChangeKCD_STYLE_LTHR = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataKCD_STYLE(_dataKCD_STYLE);
        setDataKCD_STYLE_LTHR(e.value);
    };

    const editKCD_STYLE_G = (argValue) => {
        let _dataKCD_STYLE_G = datasKCD_STYLE_G.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_STYLE_G(_dataKCD_STYLE_G[0]);
    };

    const onDropdownChangeKCD_STYLE_G = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataKCD_STYLE(_dataKCD_STYLE);
        setDataKCD_STYLE_G(e.value);
    };

    const editKCD_STYLE_W = (argValue) => {
        let _dataKCD_STYLE_W = datasKCD_STYLE_W.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_STYLE_W(_dataKCD_STYLE_W[0]);
    };

    const onDropdownChangeKCD_STYLE_W = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataKCD_STYLE(_dataKCD_STYLE);
        setDataKCD_STYLE_W(e.value);
    };

    const editKCD_STYLE_LAZE = (argValue) => {
        let _dataKCD_STYLE_LAZE = datasKCD_STYLE_LAZE.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_STYLE_LAZE(_dataKCD_STYLE_LAZE[0]);
    };

    const onDropdownChangeKCD_STYLE_LAZE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataKCD_STYLE(_dataKCD_STYLE);
        setDataKCD_STYLE_LAZE(e.value);
    };

    const editKCD_STYLE_S = (argValue) => {
        let _dataKCD_STYLE_S = datasKCD_STYLE_S.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_STYLE_S(_dataKCD_STYLE_S[0]);
    };

    const onDropdownChangeKCD_STYLE_S = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataKCD_STYLE(_dataKCD_STYLE);
        setDataKCD_STYLE_S(e.value);
    };

    const editKCD_STYLE_FND = (argValue) => {
        let _dataKCD_STYLE_FND = datasKCD_STYLE_FND.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_STYLE_FND(_dataKCD_STYLE_FND[0]);
    };

    const onDropdownChangeKCD_STYLE_FND = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataKCD_STYLE(_dataKCD_STYLE);
        setDataKCD_STYLE_FND(e.value);
    };

    const onInputChangeKCD_STYLE_TPR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_STYLE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_STYLE[`${name}`] = parseInt(val);

        setDataKCD_STYLE(_dataKCD_STYLE);
    };

    const editKCD_STYLE_EMBOSSING = (argValue) => {
        let _dataKCD_STYLE_EMBOSSING = datasKCD_STYLE_EMBOSSING.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_STYLE_EMBOSSING(_dataKCD_STYLE_EMBOSSING[0]);
    };

    const onDropdownChangeKCD_STYLE_EMBOSSING = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataKCD_STYLE(_dataKCD_STYLE);
        setDataKCD_STYLE_EMBOSSING(e.value);
    };

    const editKCD_STYLE_WASHING = (argValue) => {
        let _dataKCD_STYLE_WASHING = datasKCD_STYLE_WASHING.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_STYLE_WASHING(_dataKCD_STYLE_WASHING[0]);
    };

    const onDropdownChangeKCD_STYLE_WASHING = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataKCD_STYLE(_dataKCD_STYLE);
        setDataKCD_STYLE_WASHING(e.value);
    };

    const editKCD_STYLE_CUT = (argValue) => {
        let _dataKCD_STYLE_CUT = datasKCD_STYLE_CUT.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_STYLE_CUT(_dataKCD_STYLE_CUT[0]);
    };

    const onDropdownChangeKCD_STYLE_CUT = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataKCD_STYLE(_dataKCD_STYLE);
        setDataKCD_STYLE_CUT(e.value);
    };

    const editKCD_STYLE_FTP = (argValue) => {
        let _dataKCD_STYLE_FTP = datasKCD_STYLE_FTP.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_STYLE_FTP(_dataKCD_STYLE_FTP[0]);
    };

    const onDropdownChangeKCD_STYLE_FTP = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataKCD_STYLE(_dataKCD_STYLE);
        setDataKCD_STYLE_FTP(e.value);
    };

    const editKCD_STYLE_DTP = (argValue) => {
        let _dataKCD_STYLE_DTP = datasKCD_STYLE_DTP.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_STYLE_DTP(_dataKCD_STYLE_DTP[0]);
    };

    const onDropdownChangeKCD_STYLE_DTP = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataKCD_STYLE(_dataKCD_STYLE);
        setDataKCD_STYLE_DTP(e.value);
    };

    const editKCD_STYLE_DOWN = (argValue) => {
        let _dataKCD_STYLE_DOWN = datasKCD_STYLE_DOWN.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_STYLE_DOWN(_dataKCD_STYLE_DOWN[0]);
    };

    const onDropdownChangeKCD_STYLE_DOWN = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataKCD_STYLE(_dataKCD_STYLE);
        setDataKCD_STYLE_DOWN(e.value);
    };

    const editKCD_STYLE_UNIT = (argValue) => {
        let _dataKCD_STYLE_UNIT = datasKCD_STYLE_UNIT.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_STYLE_UNIT(_dataKCD_STYLE_UNIT[0]);
    };

    const onDropdownChangeKCD_STYLE_UNIT = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataKCD_STYLE(_dataKCD_STYLE);
        setDataKCD_STYLE_UNIT(e.value);
    };

    const editKCD_STYLE_PURPOSE = (argValue) => {
        let _dataKCD_STYLE_PURPOSE = datasKCD_STYLE_PURPOSE.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_STYLE_PURPOSE(_dataKCD_STYLE_PURPOSE[0]);
    };

    const onDropdownChangeKCD_STYLE_PURPOSE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataKCD_STYLE(_dataKCD_STYLE);
        setDataKCD_STYLE_PURPOSE(e.value);
    };

    const editKCD_STYLE_FABRIC = (argValue) => {
        let _dataKCD_STYLE_FABRIC = datasKCD_STYLE_FABRIC.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataKCD_STYLE_FABRIC(_dataKCD_STYLE_FABRIC[0]);
    };

    const onDropdownChangeKCD_STYLE_FABRIC = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKCD_STYLE = { ...dataKCD_STYLE };

        let tTypeVal = _dataKCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataKCD_STYLE(_dataKCD_STYLE);
        setDataKCD_STYLE_FABRIC(e.value);
    };

    //

    // Support Area

    const s3FileUpload = async (e) => {
        return new Promise(async (resolve) => {
            var tUserInfo = serviceLib.getUserInfo();

            if (dataKCD_STYLE.STYLE_CD === "") {
                // alert('조회된 데이터가 없습니다');
                resolve(false);
            }

            const fileName = e.target.files[0].name;
            const img = e.target.files[0];
            const formData = new FormData();
            formData.append("file", img);

            try {
                var tUrl = `${apiOption.apiuri}/restapi/imgUpload`;
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

                let _dataKCD_STYLE = { ...dataKCD_STYLE };

                _dataKCD_STYLE.imgURL = imgURL;
                _dataKCD_STYLE.fileName = fileName;
                _dataKCD_STYLE.objectName = objectName;

                setDataKCD_STYLE(_dataKCD_STYLE);
                if (_dataKCD_STYLE.STYTLE_CD !== "") {
                    setLoadingTBL_KCD_STYLE(true);
                    serviceS0200_KCD_STYLE
                        .mgr1KcdStyleSave(_dataKCD_STYLE)
                        .then((data) => {
                            setLoadingTBL_KCD_STYLE(false);
                            if (typeof data.graphQLErrors === "undefined") {
                                alert(`Save File `);
                            } else {
                                var tStr = data.graphQLErrors[0].message;
                                alert(`Save Error:${tStr}`);

                                console.log(
                                    "ServiceMgrKCD_VENDOR.mgr1KcdStyleSave error => " +
                                        tStr,
                                );
                            }
                        });
                }
                setImgView(imgURL);
                resolve(true);
                $("#inputFile").val(null);
            } catch (err) {
                console.log(err);
            }
        });
    };

    const onDownloadFile = () => {
        console.log(dataKCD_STYLE.imgURL);
        let fileName = dataKCD_STYLE.fileName;
        let url = "";

        if (dataKCD_STYLE.imgURL) url = dataKCD_STYLE.imgURL;

        if (!url) {
            alert("Not exist attached file!");
            return;
        }

        serviceLib.downloadFile(url, fileName);
    };

    const s3FileDelete = async () => {
        var tUserInfo = serviceLib.getUserInfo();

        if (dataKCD_STYLE.STYLE_CD === "") {
            alert("조회된 데이터가 없습니다<br><br>There is no data viewed");
            return;
        }

        if (imgView === "") {
            return;
        }

        try {
            const body = {
                objectName: dataKCD_STYLE.objectName,
            };

            var tUrl = `${apiOption.apiuri}/restapi/deleteImg`;
            const response = await axios.post(tUrl, body);

            if (response) {
                let _dataKCD_STYLE = { ...dataKCD_STYLE };

                _dataKCD_STYLE.imgURL = null;
                _dataKCD_STYLE.fileName = null;
                _dataKCD_STYLE.objectName = null;

                setDataKCD_STYLE(_dataKCD_STYLE);
                setImgView("");

                let _datasKCD_STYLE = [...datasKCD_STYLE];

                for (var i = 0; i < _datasKCD_STYLE.length; i++) {
                    if (
                        _datasKCD_STYLE[i].STYLE_CD == _dataKCD_STYLE.STYLE_CD
                    ) {
                        _datasKCD_STYLE[i].fileUrl = null;
                        _datasKCD_STYLE[i].imgURL = null;
                        _datasKCD_STYLE[i].fileName = null;
                        _datasKCD_STYLE[i].objectName = null;
                    }
                }

                setDatasKCD_STYLE([..._datasKCD_STYLE]);
                // console.log(response);
                $("#inputFile").val(null);
            } else {
                alert("삭제 실패<br><br>Deletion failed");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const [showZoom, setShowZoom] = useState(false);
    const [btnDownloadLabel, setBtnDownloadLabel] = useState("Download");

    useEffect(() => {
        if (!loadingTBL_KCD_STYLE && datasKCD_STYLE?.length > 0) {
            // 현재 선택이 없거나, 선택된 항목이 데이터에 존재하지 않으면 첫 행 선택
            const isValid =
                selectedKCD_STYLE &&
                datasKCD_STYLE.some((row) => row.id === selectedKCD_STYLE.id);
            if (!isValid) {
                const first = datasKCD_STYLE[0];
                setSelectedKCD_STYLE(first);
                onRowClick1KCD_STYLE(first);
            }
        }
    }, [datasKCD_STYLE, loadingTBL_KCD_STYLE]);

    const handleSelectionChangeKCD_STYLE = (e) => {
        const next = Array.isArray(e.value) ? e.value[0] : e.value;

        if (!next) {
            // 빈 선택 방지 → 이전 값 또는 첫 행 복구
            const fallback =
                (selectedKCD_STYLE &&
                    datasKCD_STYLE?.find(
                        (r) => r.id === selectedKCD_STYLE.id,
                    )) ||
                datasKCD_STYLE?.[0] ||
                null;

            if (fallback) {
                setSelectedKCD_STYLE(fallback);
                onRowClick1KCD_STYLE(fallback);
            }
            return;
        }

        setSelectedKCD_STYLE(next);
        onRowClick1KCD_STYLE(next);
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "101rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            filter
                            id="id_QryStatus"
                            style={{ width: "10rem" }}
                            value={dataQryBuyerCd}
                            onChange={(e) =>
                                onDropdownChangeQryBuyerCd(e, "QryBuyerCd")
                            }
                            options={datasQryBuyerCd}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "69rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Style</p>
                    <div className="af-span-div" style={{ width: "63rem" }}>
                        <InputText
                            style={{ width: "63rem" }}
                            value={dataQryStyleName}
                            type="search"
                            onChange={(e) =>
                                onInputChangeQryStyleName(e, "QryStyleName")
                            }
                            placeholder=""
                            onKeyPress={(e) => onQryStyleNameKeyPress(e)}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Kind</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            id="id_QryStatus"
                            style={{ width: "10rem" }}
                            value={dataQryKind}
                            onChange={(e) =>
                                onDropdownChangeQryKind(e, "QryKind")
                            }
                            options={datasQryKind}
                            optionLabel="CD_NAME"
                            placeholder=""
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-second"
                style={{ width: "22rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "24rem" }}>
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
                        style={{ width: "6rem", display: "inline-block" }}
                        className="p-button-text"
                        onClick={searchKCD_STYLE}
                    />

                    <Button
                        label="Excel"
                        style={{
                            marginLeft: "0.5rem",
                            width: "6rem",
                            display: "inline-block",
                        }}
                        className="p-button-text green"
                        onClick={exportExcel}
                    />

                    <Button
                        label="Reset"
                        style={{
                            marginLeft: "0.5rem",
                            width: "6rem",
                            display: "inline-block",
                        }}
                        className="p-button-text"
                        onClick={process_QRY_RESET}
                    />
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "37rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_KCD_STYLE}
                    value={datasKCD_STYLE}
                    size="small"
                    loading={loadingTBL_KCD_STYLE}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    metaKeySelection={false}
                    showGridlines
                    selection={selectedKCD_STYLE}
                    onSelectionChange={handleSelectionChangeKCD_STYLE}
                    onRowClick={onRowClickKCD_STYLE}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    //header={headerKCD_STYLE}
                    // responsiveLayout="scroll"
                    scrollable
                    scrollHeight="403px"
                >
                    <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" headerClassName="af-col-heaer" bodyClassName="af-col-body" header="Buyer" className="af-col" style={{ width: "12rem" }} ></AFColumn>
                    <AFColumn field="STYLE_CD" headerClassName="af-col-header" bodyClassName="af-col-body" header="Style CD" className="af-col" style={{ width: "6rem" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="af-col-header" bodyClassName="af-col-body" header="Style Name" className="af-col" style={{ width: "15rem" }} ></AFColumn>
                    <AFColumn field="MW" headerClassName="af-col-header" bodyClassName="af-col-body" header="Gender" className="af-col" style={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="PURPOSE_NAME" headerClassName="af-col-header" bodyClassName="af-col-body" header="Purpose" className="af-col" style={{ width: "7rem" }} ></AFColumn>
                    <AFColumn field="FABRIC_NAME" headerClassName="af-col-header" bodyClassName="af-col-body" header="Fabric" className="af-col" style={{ width: "7rem" }} ></AFColumn>
                    <AFColumn field="BVT_KIND" headerClassName="af-col-header" bodyClassName="af-col-body" header="Kind" className="af-col" style={{ width: "7rem" }} ></AFColumn>
                    <AFColumn field="EMBRO" headerClassName="af-col-header" bodyClassName="af-col-body" header="EMBRO" className="af-col" style={{ width: "2rem" }} ></AFColumn>
                    <AFColumn field="TP" headerClassName="af-col-header" bodyClassName="af-col-body" header="TP" className="af-col" style={{ width: "2rem" }} ></AFColumn>
                    <AFColumn field="SP" headerClassName="af-col-header" bodyClassName="af-col-body" header="SP" className="af-col" style={{ width: "2rem" }} ></AFColumn>
                    <AFColumn field="LTHR" headerClassName="af-col-header" bodyClassName="af-col-body" header="LTHR" className="af-col" style={{ width: "2rem" }} ></AFColumn>
                    <AFColumn field="G" headerClassName="af-col-header" bodyClassName="af-col-body" header="G" className="af-col" style={{ width: "2rem" }} ></AFColumn>
                    <AFColumn field="W" headerClassName="af-col-header" bodyClassName="af-col-body" header="W" className="af-col" style={{ width: "2rem" }} ></AFColumn>
                    <AFColumn field="S" headerClassName="af-col-header" bodyClassName="af-col-body" header="S" className="af-col" style={{ width: "2rem" }} ></AFColumn>
                    <AFColumn field="FND" headerClassName="af-col-header" bodyClassName="af-col-body" header="FND" className="af-col" style={{ width: "2rem" }} ></AFColumn>
                    <AFColumn field="DL" headerClassName="af-col-header" bodyClassName="af-col-body" header="DL" className="af-col" style={{ width: "2rem" }} ></AFColumn>
                    <AFColumn field="TPR" headerClassName="af-col-header" bodyClassName="af-col-body" header="TPR" className="af-col" style={{ width: "2rem" }} ></AFColumn>
                    <AFColumn field="EMBOSSING" headerClassName="af-col-header" bodyClassName="af-col-body" header="EMBOSSING" className="af-col" style={{ width: "2rem" }} ></AFColumn>
                    <AFColumn field="WASHING" headerClassName="af-col-header" bodyClassName="af-col-body" header="WASHING" className="af-col" style={{ width: "2rem" }} ></AFColumn>
                    <AFColumn field="DOWN" headerClassName="af-col-header" bodyClassName="af-col-body" header="DOWN" className="af-col" style={{ width: "2rem" }} ></AFColumn>
                    <AFColumn field="CUT" headerClassName="af-col-header" bodyClassName="af-col-body" header="CUT" className="af-col" style={{ width: "2rem" }} ></AFColumn>
                    <AFColumn field="FTP" headerClassName="af-col-header" bodyClassName="af-col-body" header="FTP" className="af-col" style={{ width: "2rem" }} ></AFColumn>
                    <AFColumn field="DTP" headerClassName="af-col-header" bodyClassName="af-col-body" header="DTP" className="af-col" style={{ width: "2rem" }} ></AFColumn>
                    <AFColumn field="REG_USER" headerClassName="af-col-header" bodyClassName="af-col-body" header="Reg User" className="af-col" style={{ width: "3rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div style={{ height: "18rem" }}>
                <div
                    className="af-div-first"
                    style={{ width: "20rem", height: "24rem" }}
                >
                    <div
                        className="af-span-div"
                        style={{
                            width: "19rem",
                            height: "16rem",
                            marginTop: "0.5rem",
                            backgroundColor: "#e5e5e5",
                        }}
                    >
                        <div className="image-container">
                            <Image
                                src={imgView}
                                alt=""
                                width="208"
                                height="175"
                                onClick={() => setShowZoom(true)}
                                style={{ cursor: "pointer" }}
                            />

                            {showZoom && (
                                <div className="zoomed-image-centered">
                                    <img src={imgView} alt="zoomed" />
                                    <button
                                        className="close-button"
                                        onClick={() => setShowZoom(false)}
                                    >
                                        X
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div
                        className="fileButton"
                        style={{
                            marginTop: "7px",
                            marginLeft: "1rem",
                            width: "200px",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <input
                            type="file"
                            id="inputFile"
                            onChange={s3FileUpload}
                            style={{ display: "none" }}
                        />
                        <Button
                            style={{ width: "62px" }}
                            className="p-button-text"
                            id="buttonStyleRegistUpload"
                            label="Upload"
                        ></Button>
                        <Button
                            style={{
                                width: "62px",
                                display: "inline-block",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                            className="p-button-text"
                            onClick={onDownloadFile}
                            label={btnDownloadLabel}
                        ></Button>
                        <Button
                            style={{ width: "62px" }}
                            className="p-button-text"
                            onClick={s3FileDelete}
                            label="Delete"
                        ></Button>
                    </div>
                    <div style={{ marginLeft: "0.8rem", width: "20rem" }}></div>
                    <div
                        style={{
                            marginLeft: "1rem",
                            marginTop: "3px",
                            display: "inline-block",
                            width: "20rem",
                        }}
                    ></div>
                </div>

                <div
                    className="af-div-first"
                    style={{ width: "70rem", height: "23rem" }}
                >
                    <div
                        className="af-div-second"
                        style={{ width: "58rem", height: "10rem" }}
                    >
                        <span className="af-span-3" style={{ width: "17rem" }}>
                            <p className="af-span-p" style={{ width: "4rem" }}>Style#</p>
                            <div
                                className="af-span-div"
                                style={{ width: "10rem" }}
                            >
                                <InputText
                                    disabled
                                    style={{ width: "10rem" }}
                                    id="id_STYLE_CD"
                                    value={dataKCD_STYLE.STYLE_CD}
                                    onChange={(e) =>
                                        onInputChangeKCD_STYLE_STYLE_CD(
                                            e,
                                            "STYLE_CD",
                                        )
                                    }
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "40rem" }}>
                            <p className="af-span-p" style={{ width: "8rem" }}>Style Name</p>
                            <div
                                className="af-span-div"
                                style={{ width: "31rem" }}
                            >
                                <InputText
                                    style={{ width: "31rem" }}
                                    id="id_Style_Name"
                                    value={dataKCD_STYLE.STYLE_NAME}
                                    onChange={(e) =>
                                        onInputChangeKCD_STYLE_STYLE_NAME(
                                            e,
                                            "STYLE_NAME",
                                        )
                                    }
                                />
                            </div>
                        </span>

                        <span className="af-span-3" style={{ width: "17rem" }}>
                            <p className="af-span-p" style={{ width: "4rem" }}>Buyer#</p>
                            <div
                                className="af-span-div"
                                style={{ width: "10rem" }}
                            >
                                <Dropdown
                                    id="id_STATUS_CD"
                                    style={{ width: "10rem" }}
                                    value={dataKCD_STYLE_BUYER_CD}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_STYLE_BUYER_CD(
                                            e,
                                            "BUYER_CD",
                                        )
                                    }
                                    options={datasKCD_STYLE_BUYER_CD}
                                    optionLabel="BUYER_NAME"
                                    placeholder=""
                                    filter
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "40rem" }}>
                            <p className="af-span-p" style={{ width: "8rem" }}>Buyer Name</p>
                            <div
                                className="af-span-div"
                                style={{ width: "31rem" }}
                            >
                                <InputText
                                    disabled
                                    style={{ width: "31rem" }}
                                    id="id_Buyer_NAME"
                                    value={dataKCD_BUYER.BUYER_NAME}
                                    onChange={(e) =>
                                        onInputChangeKCD_BUYER_BUYER_NAME(
                                            e,
                                            "BUYER_NAME",
                                        )
                                    }
                                />
                            </div>
                        </span>

                        <span className="af-span-3" style={{ width: "15rem" }}>
                            <p className="af-span-p" style={{ width: "4rem" }}>Unit</p>
                            <div
                                className="af-span-div"
                                style={{ width: "10rem" }}
                            >
                                <Dropdown
                                    id="id_STATUS_CD"
                                    style={{ width: "10rem" }}
                                    value={dataKCD_STYLE_UNIT}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_STYLE_UNIT(
                                            e,
                                            "STYLE_UNIT",
                                        )
                                    }
                                    options={datasKCD_STYLE_UNIT}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    filter
                                    disabled={isShints}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "15rem" }}>
                            <p
                                className="af-span-p red"
                                style={{ width: "4rem" }}
                            >*Gore</p>
                            <div
                                className="af-span-div"
                                style={{ width: "10rem" }}
                            >
                                <Dropdown
                                    id="id_G"
                                    style={{ width: "10rem" }}
                                    value={dataKCD_STYLE_G}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_STYLE_G(e, "G")
                                    }
                                    options={datasKCD_STYLE_G}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    disabled={isShints}
                                />
                            </div>
                        </span>

                        <span className="af-span-3" style={{ width: "15rem" }}>
                            <p className="af-span-p" style={{ width: "4rem" }}>Gender</p>
                            <div
                                className="af-span-div"
                                style={{ width: "10rem" }}
                            >
                                <Dropdown
                                    id="id_MW"
                                    style={{ width: "10rem" }}
                                    value={dataKCD_STYLE_MW}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_STYLE_MW(e, "MW")
                                    }
                                    options={datasKCD_STYLE_MW}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    disabled={isShints}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "11rem" }}>
                            <p
                                className="af-span-p red"
                                style={{ width: "4rem" }}
                            >*Seam</p>
                            <div
                                className="af-span-div"
                                style={{ width: "6rem" }}
                            >
                                <Dropdown
                                    id="id_S"
                                    style={{ width: "6rem" }}
                                    value={dataKCD_STYLE_S}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_STYLE_S(e, "S")
                                    }
                                    options={datasKCD_STYLE_S}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    disabled={isShints}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "15rem" }}>
                            <p className="af-span-p" style={{ width: "4rem" }}>D/L</p>
                            <div
                                className="af-span-div"
                                style={{ width: "10rem" }}
                            >
                                <Dropdown
                                    id="id_DL"
                                    style={{ width: "10rem" }}
                                    value={dataKCD_STYLE_DL}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_STYLE_DL(e, "DL")
                                    }
                                    options={datasKCD_STYLE_DL}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    disabled={isShints}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "15rem" }}>
                            <p className="af-span-p" style={{ width: "4rem" }}>Purpose</p>
                            <div
                                className="af-span-div"
                                style={{ width: "10rem" }}
                            >
                                <Dropdown
                                    id="id_PURPOSE"
                                    style={{ width: "10rem" }}
                                    value={dataKCD_STYLE_PURPOSE}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_STYLE_PURPOSE(
                                            e,
                                            "PURPOSE",
                                        )
                                    }
                                    options={datasKCD_STYLE_PURPOSE}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    disabled={isShints}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "26rem" }}>
                            <p className="af-span-p" style={{ width: "4rem" }}>Fabric</p>
                            <div
                                className="af-span-div"
                                style={{ width: "10rem" }}
                            >
                                <Dropdown
                                    id="id_FABRIC"
                                    style={{ width: "10rem" }}
                                    value={dataKCD_STYLE_FABRIC}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_STYLE_FABRIC(
                                            e,
                                            "FABRIC",
                                        )
                                    }
                                    options={datasKCD_STYLE_FABRIC}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    disabled={isShints}
                                />
                            </div>
                        </span>
                    </div>

                    <div
                        className="af-div-first"
                        style={{ width: "9.5rem", height: "10rem" }}
                    >
                        <span className="af-span-3" style={{ width: "9.5rem" }}>
                            <Button
                                label="Save"
                                style={{
                                    width: "9rem",
                                    display: "inline-block",
                                }}
                                className="p-button-text"
                                onClick={process_SAVE}
                            />
                        </span>
                        <span className="af-span-3" style={{ width: "9.5rem" }}>
                            <Button
                                label="Delete"
                                style={{
                                    width: "9rem",
                                    display: "inline-block",
                                }}
                                className="p-button-text"
                                onClick={process_DELETE}
                            />
                        </span>
                        <span className="af-span-3" style={{ width: "9.5rem" }}>
                            <Button
                                label="Order Reg"
                                style={{
                                    width: "9rem",
                                    display: "inline-block",
                                }}
                                className="p-button-text orange"
                                onClick={popup_ORDER_REG}
                            />
                        </span>
                        <span className="af-span-3" style={{ width: "9.5rem" }}>
                            <Button
                                label="Reset"
                                style={{
                                    width: "9rem",
                                    display: "inline-block",
                                }}
                                className="p-button-text"
                                onClick={process_RESET}
                            />
                        </span>
                        <span className="af-span-3" style={{ width: "9.5rem" }}>
                            <Button
                                label="Copy"
                                disabled={isInsertColor}
                                style={{
                                    width: "9rem",
                                    display: "inline-block",
                                }}
                                className="p-button-text"
                                onClick={copyKCD_STYLE}
                            />
                        </span>
                    </div>

                    <div
                        className="af-div-first"
                        style={{
                            width: "69rem",
                            height: "13rem",
                            marginLeft: "99px",
                        }}
                    >
                        <span className="af-span-3" style={{ width: "12rem" }}>
                            <p className="af-span-p" style={{ width: "6rem" }}>Embossing</p>
                            <div
                                className="af-span-div"
                                style={{ width: "5rem" }}
                            >
                                <Dropdown
                                    id="id_PURPOSE"
                                    style={{ width: "5rem" }}
                                    value={dataKCD_STYLE_EMBOSSING}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_STYLE_EMBOSSING(
                                            e,
                                            "EMBOSSING",
                                        )
                                    }
                                    options={datasKCD_STYLE_EMBOSSING}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    disabled={isFactory}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "12rem" }}>
                            <p className="af-span-p" style={{ width: "6rem" }}>Washing</p>
                            <div
                                className="af-span-div"
                                style={{ width: "5rem" }}
                            >
                                <Dropdown
                                    id="id_WASHING"
                                    style={{ width: "5rem" }}
                                    value={dataKCD_STYLE_WASHING}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_STYLE_WASHING(
                                            e,
                                            "WASHING",
                                        )
                                    }
                                    options={datasKCD_STYLE_WASHING}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    disabled={isFactory}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "12rem" }}>
                            <p className="af-span-p" style={{ width: "6rem" }}>TPR</p>
                            <div
                                className="af-span-div"
                                style={{ width: "5rem" }}
                            >
                                <InputText
                                    style={{ width: "5rem" }}
                                    id="id_TPR"
                                    value={dataKCD_STYLE.TPR}
                                    onChange={(e) =>
                                        onInputChangeKCD_STYLE_TPR(e, "TPR")
                                    }
                                    disabled={isFactory}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "12rem" }}>
                            <p className="af-span-p" style={{ width: "6rem" }}>DTP</p>
                            <div
                                className="af-span-div"
                                style={{ width: "5rem" }}
                            >
                                <Dropdown
                                    id="id_DTP"
                                    style={{ width: "5rem" }}
                                    value={dataKCD_STYLE_DTP}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_STYLE_DTP(e, "DTP")
                                    }
                                    options={datasKCD_STYLE_DTP}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    disabled={isFactory}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "12rem" }}>
                            <p className="af-span-p" style={{ width: "6rem" }}>Down Qulit</p>
                            <div
                                className="af-span-div"
                                style={{ width: "5rem" }}
                            >
                                <Dropdown
                                    id="id_DOWN"
                                    style={{ width: "5rem" }}
                                    value={dataKCD_STYLE_DOWN}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_STYLE_DOWN(
                                            e,
                                            "DOWN",
                                        )
                                    }
                                    options={datasKCD_STYLE_DOWN}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    disabled={isFactory}
                                />
                            </div>
                        </span>

                        <span className="af-span-3" style={{ width: "12rem" }}>
                            <p className="af-span-p" style={{ width: "6rem" }}>T/P</p>
                            <div
                                className="af-span-div"
                                style={{ width: "5rem" }}
                            >
                                <Dropdown
                                    id="id_TP"
                                    style={{ width: "5rem" }}
                                    value={dataKCD_STYLE_TP}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_STYLE_TP(e, "TP")
                                    }
                                    options={datasKCD_STYLE_TP}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    disabled={isFactory}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "12rem" }}>
                            <p className="af-span-p" style={{ width: "6rem" }}>4ND</p>
                            <div
                                className="af-span-div"
                                style={{ width: "5rem" }}
                            >
                                <Dropdown
                                    id="id_FND"
                                    style={{ width: "5rem" }}
                                    value={dataKCD_STYLE_FND}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_STYLE_FND(e, "FND")
                                    }
                                    options={datasKCD_STYLE_FND}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    disabled={isFactory}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "12rem" }}>
                            <p className="af-span-p" style={{ width: "6rem" }}>Welding</p>
                            <div
                                className="af-span-div"
                                style={{ width: "5rem" }}
                            >
                                <Dropdown
                                    id="id_W"
                                    style={{ width: "5rem" }}
                                    value={dataKCD_STYLE_W}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_STYLE_W(e, "W")
                                    }
                                    options={datasKCD_STYLE_W}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    disabled={isFactory}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "12rem" }}>
                            <p className="af-span-p" style={{ width: "6rem" }}>Lazer</p>
                            <div
                                className="af-span-div"
                                style={{ width: "5rem" }}
                            >
                                <Dropdown
                                    id="id_LAZE"
                                    style={{ width: "5rem" }}
                                    value={dataKCD_STYLE_LAZE}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_STYLE_LAZE(
                                            e,
                                            "LAZE",
                                        )
                                    }
                                    options={datasKCD_STYLE_LAZE}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    disabled={isFactory}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "12rem" }}>
                            <p className="af-span-p" style={{ width: "6rem" }}>Cut Protect</p>
                            <div
                                className="af-span-div"
                                style={{ width: "5rem" }}
                            >
                                <Dropdown
                                    id="id_CUT"
                                    style={{ width: "5rem" }}
                                    value={dataKCD_STYLE_CUT}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_STYLE_CUT(e, "CUT")
                                    }
                                    options={datasKCD_STYLE_CUT}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    disabled={isFactory}
                                />
                            </div>
                        </span>

                        <span className="af-span-3" style={{ width: "12rem" }}>
                            <p className="af-span-p" style={{ width: "6rem" }}>S/P</p>
                            <div
                                className="af-span-div"
                                style={{ width: "5rem" }}
                            >
                                <Dropdown
                                    id="id_SP"
                                    style={{ width: "5rem" }}
                                    value={dataKCD_STYLE_SP}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_STYLE_SP(e, "SP")
                                    }
                                    options={datasKCD_STYLE_SP}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    disabled={isFactory}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "12rem" }}>
                            <p className="af-span-p" style={{ width: "6rem" }}>FT/P</p>
                            <div
                                className="af-span-div"
                                style={{ width: "5rem" }}
                            >
                                <Dropdown
                                    id="id_FTP"
                                    style={{ width: "5rem" }}
                                    value={dataKCD_STYLE_FTP}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_STYLE_FTP(e, "FTP")
                                    }
                                    options={datasKCD_STYLE_FTP}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    disabled={isFactory}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "12rem" }}>
                            <p className="af-span-p" style={{ width: "6rem" }}>EMB</p>
                            <div
                                className="af-span-div"
                                style={{ width: "5rem" }}
                            >
                                <Dropdown
                                    id="id_EMBRO"
                                    style={{ width: "5rem" }}
                                    value={dataKCD_STYLE_EMBRO}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_STYLE_EMBRO(
                                            e,
                                            "EMBRO",
                                        )
                                    }
                                    options={datasKCD_STYLE_EMBRO}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    disabled={isFactory}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "24rem" }}>
                            <p className="af-span-p" style={{ width: "6rem" }}>LTHR</p>
                            <div
                                className="af-span-div"
                                style={{ width: "5rem" }}
                            >
                                <Dropdown
                                    id="id_LTHR"
                                    style={{ width: "5rem" }}
                                    value={dataKCD_STYLE_LTHR}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_STYLE_LTHR(
                                            e,
                                            "LTHR",
                                        )
                                    }
                                    options={datasKCD_STYLE_LTHR}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    disabled={isFactory}
                                />
                            </div>
                        </span>

                        <span className="af-span-3" style={{ width: "68rem" }}>
                            <p
                                className="af-span-p red"
                                style={{ width: "6rem" }}
                            >*Kind</p>
                            <div
                                className="af-span-div"
                                style={{ width: "55rem" }}
                            >
                                <Dropdown
                                    id="id_KIND"
                                    style={{ width: "30rem" }}
                                    value={dataKCD_STYLE_KIND}
                                    onChange={(e) =>
                                        onDropdownChangeKCD_STYLE_KIND(
                                            e,
                                            "KIND",
                                        )
                                    }
                                    options={datasKCD_STYLE_KIND}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                />
                            </div>
                        </span>

                        <div
                            className="af-span-div"
                            style={{ width: "69rem", height: "3rem" }}
                        >
                            <Image src="" alt="" height="20" />
                        </div>
                    </div>
                </div>

                <div
                    className="af-div-first"
                    style={{ width: "22rem", height: "24rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "21rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Color</p>
                        <div className="af-span-div" style={{ width: "14rem" }}>
                            <InputText
                                style={{ width: "14rem" }}
                                id="id_ColorIn"
                                value={dataInColor}
                                onChange={(e) =>
                                    onInputChangeDataInColor(e, "COLOR")
                                }
                            />
                        </div>
                    </span>

                    <span
                        className="af-span-div"
                        style={{
                            width: "17rem",
                            height: "16rem",
                            marginTop: "5px",
                            marginLeft: "44px",
                        }}
                    >
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_KSV_PROD_MST}
                            value={datasKSV_PROD_MST}
                            tableStyle={{ tableLayout: "fixed" }}
                            loading={loading1}
                            metaKeySelection={false}
                            size="small"
                            resizableColumns
                            columnResizeMode="expand"
                            showGridlines
                            selectionMode="single"
                            selection={selectedKSV_PROD_MST}
                            onSelectionChange={(e) => {
                                setSelectedKSV_PROD_MST(e.value);
                            }}
                            onRowClick={onRowClickKSV_PROD_MST}
                            dataKey="COLOR"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" "
                            //header={headerKSV_PROD_MST}
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="16rem"
                        >
                            <AFColumn field="COLOR" headerClassName="af-col-header" header="Color" className="af-col" style={{ width: "9rem" }} ></AFColumn>
                        </AFDataTable>
                    </span>
                    <div
                        className="af-span-div"
                        style={{ width: "19rem", height: "1rem" }}
                    >
                        <Image src="" alt="" height="10" />
                    </div>
                </div>
                <div
                    className="af-div-first"
                    style={{ width: "11rem", height: "24rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "9.5rem" }}>
                        <Button
                            label="Color Insert"
                            disabled={isInsertColor}
                            style={{ width: "9rem", display: "inline-block" }}
                            className="p-button-text"
                            onClick={process_ADD_COL}
                        />
                    </span>
                    <div className="af-span-3" style={{ width: "9.5rem" }}>
                        <Button
                            label="Color Update"
                            disabled={isInsertColor}
                            style={{ width: "9rem", display: "inline-block" }}
                            className="p-button-text"
                            onClick={process_UPDATE_COL}
                        />
                    </div>
                    <div className="af-span-3" style={{ width: "9.5rem" }}>
                        <Button
                            label="Color Delete"
                            disabled={isInsertColor}
                            style={{ width: "9rem", display: "inline-block" }}
                            className="p-button-text"
                            onClick={process_REMOVE_COL}
                        />
                    </div>
                    <div
                        className="af-span-div"
                        style={{ width: "9.5rem", height: "14rem" }}
                    >
                        <Image src="" alt="" height="140" />
                    </div>
                </div>
            </div>

            <Toast ref={toast} />
            <OverlayPanel
                style={{
                    width: "123rem",
                    height: "60rem",
                    marginLeft: "0rem",
                    marginTop: "0rem",
                }}
                ref={op}
                showCloseIcon
            >
                <iframe
                    src={urlIframe}
                    frameBorder="0"
                    ref={dt_iframe}
                    width="1360px"
                    height="670px"
                    id="id1"
                    className="myClassname"
                    scrolling="no"
                />
            </OverlayPanel>

            <Dialog
                visible={createDialog}
                position="top-right"
                style={{ width: "100vw", height: "100vh" }}
                header=""
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <iframe
                    src={urlIframe}
                    width="1100px"
                    height="1300px"
                    id="id1"
                    className="myClassname"
                    scrolling="no"
                />
            </Dialog>
            <Dialog
                header="Info"
                visible={popupDialog}
                style={{ width: "20vw" }}
                onHide={() => setPopupDialog(false)}
            >
                <p className="m-0">
                    You can't delete it because there is already a registered
                    order with this style
                </p>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(MgrKcdStyle, comparisonFn);
