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
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";
import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceKSV_ORDER_MST1 } from "../service/service_biz/ServiceKSV_ORDER_MST1";
import { ServiceMgr1KCD_BANK } from "../service/service_biz/ServiceMgr1KCD_BANK";
import { ServiceMgrKSV_ORDER_MST } from "../service/service_biz/ServiceMgrKSV_ORDER_MST";
import { ServiceMgrKSV_ORDER_MEM } from "../service/service_biz/ServiceMgrKSV_ORDER_MEM";
import { ServiceMgrKCD_STYLE } from "../service/service_biz/ServiceMgrKCD_STYLE";
import { ServiceMgrKCD_SIZE_MST } from "../service/service_biz/ServiceMgrKCD_SIZE_MST";
import { ServiceKSV_ORDER_MST } from "../service/service_common/ServiceKSV_ORDER_MST";
import { ServiceKCD_STYLE } from "../service/service_common/ServiceKCD_STYLE";
import { ServiceKSV_PROD_MST } from "../service/service_common/ServiceKSV_PROD_MST";
import { ServiceKSV_ORDER_MEM } from "../service/service_common/ServiceKSV_ORDER_MEM";
import { ServiceKCD_FACTORY } from "../service/service_common/ServiceKCD_FACTORY";
import { ServiceKCD_SIZE_MST } from "../service/service_common/ServiceKCD_SIZE_MST";
import { ServiceKCD_NATION } from "../service/service_common/ServiceKCD_NATION";
import { ServiceKCD_CURRENCY } from "../service/service_common/ServiceKCD_CURRENCY";
import { ServiceKCD_CODE } from "../service/service_common/ServiceKCD_CODE";
import { ServiceKCD_BUYER } from "../service/service_common/ServiceKCD_BUYER";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { ScrollPanel } from "primereact/scrollpanel";
import "./MgrKcdVendor.scss";

const emptyKCD_FACTORY = {
    id: 0,
    FACTORY_CD: "",
    FACTORY_NAME: "",
    FACTORY_NAME2: "",
    USER_NAME: "",
    EMAIL: "",
    COUNTRY: "",
    TEL_NO: "",
    FAX_NO: "",
    ZIP_NO: "",
    ADDR1: "",
    ADDR2: "",
    PORT: "",
    AIRPORT: "",
    NAT_CD: "",
    BANK_CD: "",
    STATUS_CD: "",
    REG_USER: "",
    REG_DATETIME: "",
    UPD_USER: "",
    UPD_DATETIME: "",
    tag_po: "",
    tag_order: "",
    place_cd: "",
    PACK_NAME: "",
    ETC99: "",
};

const emptyKCD_SIZE_MST = {
    id: 0,
    SIZE_GROUP: "",
    SIZE_MEMBER: "",
    SIZE_CNT: 0,
    STATUS_CD: "",
    REG_USER: "",
    REG_DATETIME: "",
    UPD_USER: "",
    UPD_DATETIME: "",
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

const emptyKCD_CURRENCY = {
    id: 0,
    CURR_CD: "",
    START_DATE: "",
    ETC99: "",
};

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
    TPR: 0,
    EMBOSSING: "",
    WASHING: "",
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
    ETC99: "",
};

const emptyKCD_STYLE1 = {
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
    TPR: 0,
    EMBOSSING: "",
    WASHING: "",
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

const emptyKSV_ORDER_MST = {
    id: 0,
    ORDER_CD: "",
    STYLE_CD: "",
    ORDER_TYPE: "0",
    YY: 0,
    SEQ: 0,
    TOT_CNT: 0,
    ADD_CNT: 0,
    AVR_PRICE: 0,
    FC_BEF: 0,
    FC_PRICE: 0,
    MATL_AMT: 0,
    ETC_AMT: 0,
    COMMISSION: 0,
    COMM1: 0,
    COMM2: 0,
    OVER_FLAG: "",
    OVER_QTY: 0,
    OVER_AMT: 0,
    OVER_BILL: "",
    CURR_CD: "",
    USD_PRICE: 0,
    ORDER_DATE: "",
    DUE_DATE: "",
    MATL_DUE_DATE: "",
    NAT_CD: "",
    FACTORY_CD: "",
    SIZE_GROUP: "",
    ORDER_FLAG: "0",
    SAMPLE_FLAG: "0",
    MATL_SALE_FLAG: "0",
    FAC_LC_FLAG: "0",
    FAC_TT_FLAG: "0",
    ORDER_STATUS: "",
    END_DATETIME: "",
    REMARK: "",
    REF_ORDER_NO: "",
    REF_NO: "",
    REF_Q_OUTER: "",
    REF_Q_LINER: "",
    REF_ORDER_REQ: "",
    REF_COLOR1: "",
    REF_COLOR2: "",
    REF_SIZE1: "",
    REF_SIZE2: "",
    REF_QTY1: "",
    REF_QTY2: "",
    MATL_PAY_FLAG: "",
    MATL_PAY_USER: "",
    MATL_PAY_DATETIME: "",
    FC_NEGO_TYPE: "",
    STATUS_CD: "",
    REG_USER: "",
    REG_DATETIME: "",
    UPD_USER: "",
    UPD_DATETIME: "",
    APPROVAL_USER: "",
    APPROVAL_DATETIME: "",
    brand: "",
    season: "",
    krw_flag: "",
    krw_matl_amt: 0,
    margin: 0,
    frt_check: "",
    category: "",
    ORG_DUE_DATE: "",
    BUYER_TEAM: "",
    SAMPLE_COST_FLAG: "",
    DL_FLAG: "",
    TRADE_PRICE: 0,
    LINE_CHARGE_PRICE: 0,
    DUTY: 0,
    mid_size1: "",
    mid_size2: "",
    mid_size3: "",
    mid_size4: "",
    END_STATUS: "",
    FC_PRICE2: 0,
    CANCEL_DATETIME: "",
    PO_MATL_AMT: 0,
    STYLE_ID: 0,
    STYLE_NAME: "",
    BUYER_CD: "",
    BUYER_NAME: "",
    STATUS_NAME: "",
    PO_CD: "",
    SHIP_CNT: "",
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
    ETC99: "",
};

const emptyKSV_ORDER_MEM = {
    id: 0,
    ORDER_CD: "",
    PROD_CD: "",
    ADD_FLAG: "",
    TOT_CNT: 0,
    SIZE_CNT: "",
    OLD_PROD_CD: "",
    barcode: "",
    MID_SIZE: "",
    MID_SIZE_QTY: 0,
    SIZE_LOSS: "",
    ETC99: "",
};

const MgrKsvOrderRecordSub1 = () => {
    const [urlData, setUrlData] = useState("");
    const [urlSrc1, setUrlSrc1] = useState("");
    const [urlSrc2, setUrlSrc2] = useState("");

    const [qryNameKSV_ORDER_MST, setQryNameKSV_ORDER_MST] = useState("");
    const [qryBuyerCdKSV_ORDER_MST, setQryBuyerCdKSV_ORDER_MST] =
        useState(emptyKCD_BUYER);
    const [qryOrderStatusKSV_ORDER_MST, setQryOrderStatusKSV_ORDER_MST] =
        useState(emptyKCD_CODE);
    const [qryStyleCd, setQryStyleCd] = useState("");
    const [qryOrderCd, setQryOrderCd] = useState("");

    const [dataInCombinedOrder, setDataInCombinedOrder] = useState("");
    const [dataInORDER_CD_D, setDataInORDER_CD_D] = useState("");
    const [dataInORDER_CD_Z, setDataInORDER_CD_Z] = useState("");
    const [dataInAddShip, setDataInAddShip] = useState("");

    const [dataQryStyleName, setDataQryStyleName] = useState("");
    const [dataQryBuyerName, setDataQryBuyerName] = useState("");
    const [datasQryStyleCd, setDatasQryStyleCd] = useState([]);
    const [dataQryStyleCd, setDataQryStyleCd] = useState("");

    const [datasKSV_ORDER_MST_DL_FLAG, setDatasKSV_ORDER_MST_DL_FLAG] =
        useState([]);
    const [dataKSV_ORDER_MST_DL_FLAG, setDataKSV_ORDER_MST_DL_FLAG] = useState(
        {},
    );
    const [datasKSV_ORDER_MST_FACTORY_CD, setDatasKSV_ORDER_MST_FACTORY_CD] =
        useState([]);
    const [dataKSV_ORDER_MST_FACTORY_CD, setDataKSV_ORDER_MST_FACTORY_CD] =
        useState({});
    const [datasKSV_ORDER_MST_CURR_CD, setDatasKSV_ORDER_MST_CURR_CD] =
        useState([]);
    const [dataKSV_ORDER_MST_CURR_CD, setDataKSV_ORDER_MST_CURR_CD] = useState(
        {},
    );
    const [datasKSV_ORDER_MST_NAT_CD, setDatasKSV_ORDER_MST_NAT_CD] = useState(
        [],
    );
    const [dataKSV_ORDER_MST_NAT_CD, setDataKSV_ORDER_MST_NAT_CD] = useState(
        {},
    );
    const [datasKSV_ORDER_MST_SIZE_GROUP, setDatasKSV_ORDER_MST_SIZE_GROUP] =
        useState([]);
    const [dataKSV_ORDER_MST_SIZE_GROUP, setDataKSV_ORDER_MST_SIZE_GROUP] =
        useState({});
    const [
        datasKSV_ORDER_MST_SAMPLE_LEVEL,
        setDatasKSV_ORDER_MST_SAMPLE_LEVEL,
    ] = useState([]);
    const [dataKSV_ORDER_MST_SAMPLE_LEVEL, setDataKSV_ORDER_MST_SAMPLE_LEVEL] =
        useState({});
    const [datasKSV_ORDER_MST_SAMPLE_SEQ, setDatasKSV_ORDER_MST_SAMPLE_SEQ] =
        useState([]);
    const [dataKSV_ORDER_MST_SAMPLE_SEQ, setDataKSV_ORDER_MST_SAMPLE_SEQ] =
        useState({});
    const [
        datasKSV_ORDER_MST_SAMPLE_REASON,
        setDatasKSV_ORDER_MST_SAMPLE_REASON,
    ] = useState([]);
    const [
        dataKSV_ORDER_MST_SAMPLE_REASON,
        setDataKSV_ORDER_MST_SAMPLE_REASON,
    ] = useState({});

    const [regKSV_ORDER_MST_FACTORY_CD, setRegKSV_ORDER_MST_FACTORY_CD] =
        useState({});
    const [regKSV_ORDER_MST_SIZE_GROUP, setRegKSV_ORDER_MST_SIZE_GROUP] =
        useState({});
    const [regKSV_ORDER_MST_NAT_CD, setRegKSV_ORDER_MST_NAT_CD] = useState({});
    const [regKSV_ORDER_MST_CURR_CD, setRegKSV_ORDER_MST_CURR_CD] = useState(
        {},
    );
    const [regKSV_ORDER_MST_ORDER_STATUS, setRegKSV_ORDER_MST_ORDER_STATUS] =
        useState({});
    const [regKSV_ORDER_MST_BUYER_CD, setRegKSV_ORDER_MST_BUYER_CD] = useState(
        {},
    );

    const [datasKCD_STYLE, setDatasKCD_STYLE] = useState([]);
    const [datasKCD_STYLE1, setDatasKCD_STYLE1] = useState([]);
    const [datasKCD_SIZE_MEM, setDatasKCD_SIZE_MEM] = useState([]);
    const [datasKSV_ORDER_MST, setDatasKSV_ORDER_MST] = useState([]);
    const [datasKSV_PROD_MST, setDatasKSV_PROD_MST] = useState([]);
    const [datasKSV_ORDER_MEM, setDatasKSV_ORDER_MEM] = useState([]);
    const [
        datasKSV_ORDER_MST_ORDER_STATUS,
        setDatasKSV_ORDER_MST_ORDER_STATUS,
    ] = useState([]);
    const [datasKSV_ORDER_MST_BUYER_CD, setDatasKSV_ORDER_MST_BUYER_CD] =
        useState([]);

    const [datasKSV_ORDER_MEM_COL, setDatasKSV_ORDER_MEM_COL] = useState([]);

    const [createDialogKSV_ORDER_MST, setCreateDialogKSV_ORDER_MST] =
        useState(false);
    const [deleteDialogKSV_ORDER_MST, setDeleteDialogKSV_ORDER_MST] =
        useState(false);
    const [deleteDatasDialogKSV_ORDER_MST, setDeleteDatasDialogKSV_ORDER_MST] =
        useState(false);
    const [createDialogKSV_ORDER_MST_SUB, setCreateDialogKSV_ORDER_MST_SUB] =
        useState(false);

    const [submittedKSV_ORDER_MST, setSubmittedKSV_ORDER_MST] = useState(false);
    const [flagModalKSV_ORDER_MST, setFlagModalKSV_ORDER_MST] = useState(false);
    const [flagSelectModeKSV_ORDER_MST, setFlagSelectModeKSV_ORDER_MST] =
        useState(false);

    const dt_KSV_ORDER_MST = useRef(null);
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
    const [createDialogKSV_ORDER_MEM, setCreateDialogKSV_ORDER_MEM] =
        useState(false);
    const [deleteDialogKSV_ORDER_MEM, setDeleteDialogKSV_ORDER_MEM] =
        useState(false);
    const [deleteDatasDialogKSV_ORDER_MEM, setDeleteDatasDialogKSV_ORDER_MEM] =
        useState(false);

    const [submittedKSV_ORDER_MEM, setSubmittedKSV_ORDER_MEM] = useState(false);
    const [flagModalKSV_ORDER_MEM, setFlagModalKSV_ORDER_MEM] = useState(false);
    const [flagSelectModeKSV_ORDER_MEM, setFlagSelectModeKSV_ORDER_MEM] =
        useState(false);

    const dt_KSV_ORDER_MEM = useRef(null);

    const [dataKCD_STYLE, setDataKCD_STYLE] = useState(emptyKCD_STYLE);
    const [selectedKCD_STYLE, setSelectedKCD_STYLE] = useState([]);

    const [dataKCD_STYLE1, setDataKCD_STYLE1] = useState(emptyKCD_STYLE1);
    const [selectedKCD_STYLE1, setSelectedKCD_STYLE1] = useState([]);

    const [dataKSV_ORDER_MST, setDataKSV_ORDER_MST] =
        useState(emptyKSV_ORDER_MST);
    const [selectedKSV_ORDER_MST, setSelectedKSV_ORDER_MST] = useState([]);

    const [dataKSV_PROD_MST, setDataKSV_PROD_MST] = useState(emptyKSV_PROD_MST);
    const [selectedKSV_PROD_MST, setSelectedKSV_PROD_MST] = useState([]);

    const [dataKSV_ORDER_MEM, setDataKSV_ORDER_MEM] =
        useState(emptyKSV_ORDER_MEM);
    const [selectedKSV_ORDER_MEM, setSelectedKSV_ORDER_MEM] = useState([]);

    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceMgr1KCD_BANKRef = useRef(null);
    if (!serviceMgr1KCD_BANKRef.current) serviceMgr1KCD_BANKRef.current = new ServiceMgr1KCD_BANK();
    const serviceMgr1KCD_BANK = serviceMgr1KCD_BANKRef.current;
    const serviceMgrKSV_ORDER_MSTRef = useRef(null);
    if (!serviceMgrKSV_ORDER_MSTRef.current) serviceMgrKSV_ORDER_MSTRef.current = new ServiceMgrKSV_ORDER_MST();
    const serviceMgrKSV_ORDER_MST = serviceMgrKSV_ORDER_MSTRef.current;
    const serviceKSV_ORDER_MST1Ref = useRef(null);
    if (!serviceKSV_ORDER_MST1Ref.current) serviceKSV_ORDER_MST1Ref.current = new ServiceKSV_ORDER_MST1();
    const serviceKSV_ORDER_MST1 = serviceKSV_ORDER_MST1Ref.current;
    const serviceMgrKSV_ORDER_MEMRef = useRef(null);
    if (!serviceMgrKSV_ORDER_MEMRef.current) serviceMgrKSV_ORDER_MEMRef.current = new ServiceMgrKSV_ORDER_MEM();
    const serviceMgrKSV_ORDER_MEM = serviceMgrKSV_ORDER_MEMRef.current;
    const serviceMgrKCD_STYLERef = useRef(null);
    if (!serviceMgrKCD_STYLERef.current) serviceMgrKCD_STYLERef.current = new ServiceMgrKCD_STYLE();
    const serviceMgrKCD_STYLE = serviceMgrKCD_STYLERef.current;
    const serviceMgrKCD_SIZE_MSTRef = useRef(null);
    if (!serviceMgrKCD_SIZE_MSTRef.current) serviceMgrKCD_SIZE_MSTRef.current = new ServiceMgrKCD_SIZE_MST();
    const serviceMgrKCD_SIZE_MST = serviceMgrKCD_SIZE_MSTRef.current;
    const serviceKSV_ORDER_MSTRef = useRef(null);
    if (!serviceKSV_ORDER_MSTRef.current) serviceKSV_ORDER_MSTRef.current = new ServiceKSV_ORDER_MST();
    const serviceKSV_ORDER_MST = serviceKSV_ORDER_MSTRef.current;
    const serviceKCD_STYLERef = useRef(null);
    if (!serviceKCD_STYLERef.current) serviceKCD_STYLERef.current = new ServiceKCD_STYLE();
    const serviceKCD_STYLE = serviceKCD_STYLERef.current;
    const serviceKSV_PROD_MSTRef = useRef(null);
    if (!serviceKSV_PROD_MSTRef.current) serviceKSV_PROD_MSTRef.current = new ServiceKSV_PROD_MST();
    const serviceKSV_PROD_MST = serviceKSV_PROD_MSTRef.current;
    const serviceKSV_ORDER_MEMRef = useRef(null);
    if (!serviceKSV_ORDER_MEMRef.current) serviceKSV_ORDER_MEMRef.current = new ServiceKSV_ORDER_MEM();
    const serviceKSV_ORDER_MEM = serviceKSV_ORDER_MEMRef.current;
    const serviceKCD_FACTORYRef = useRef(null);
    if (!serviceKCD_FACTORYRef.current) serviceKCD_FACTORYRef.current = new ServiceKCD_FACTORY();
    const serviceKCD_FACTORY = serviceKCD_FACTORYRef.current;
    const serviceKCD_SIZE_MSTRef = useRef(null);
    if (!serviceKCD_SIZE_MSTRef.current) serviceKCD_SIZE_MSTRef.current = new ServiceKCD_SIZE_MST();
    const serviceKCD_SIZE_MST = serviceKCD_SIZE_MSTRef.current;
    const serviceKCD_NATIONRef = useRef(null);
    if (!serviceKCD_NATIONRef.current) serviceKCD_NATIONRef.current = new ServiceKCD_NATION();
    const serviceKCD_NATION = serviceKCD_NATIONRef.current;
    const serviceKCD_CURRENCYRef = useRef(null);
    if (!serviceKCD_CURRENCYRef.current) serviceKCD_CURRENCYRef.current = new ServiceKCD_CURRENCY();
    const serviceKCD_CURRENCY = serviceKCD_CURRENCYRef.current;
    const serviceKCD_CODERef = useRef(null);
    if (!serviceKCD_CODERef.current) serviceKCD_CODERef.current = new ServiceKCD_CODE();
    const serviceKCD_CODE = serviceKCD_CODERef.current;
    const serviceKCD_BUYERRef = useRef(null);
    if (!serviceKCD_BUYERRef.current) serviceKCD_BUYERRef.current = new ServiceKCD_BUYER();
    const serviceKCD_BUYER = serviceKCD_BUYERRef.current;

    var mMaxSeq = 0;
    var g_dataKCD_STYLE = {};
    var g_dataKSV_ORDER_MST = {};
    var g_datasKSV_PROD_MST = [];
    var g_datasKCD_SIZE_MEM = [];
    var g_datasKSV_ORDER_MEM = [];

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* */

    useEffect(() => {
        serviceMgr1KCD_BANK.mgr1KsvOrderMstCode("").then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasKSV_ORDER_MST_DL_FLAG(data.T_KCD_CODE_STYLE_DL);
                setDatasKSV_ORDER_MST_FACTORY_CD(data.T_KCD_FACTORY);
                setDatasKSV_ORDER_MST_CURR_CD(data.T_KCD_CODE_CURR_CD);
                setDatasKSV_ORDER_MST_NAT_CD(data.T_KCD_NATION);
                setDatasKSV_ORDER_MST_SIZE_GROUP(data.T_KCD_SIZE_MST);
                setDatasKSV_ORDER_MST_SAMPLE_LEVEL(data.T_KCD_CODE_CURR_CD);
                setDatasKSV_ORDER_MST_SAMPLE_SEQ(data.T_KCD_CODE_CURR_CD);
                setDatasKSV_ORDER_MST_SAMPLE_REASON(data.T_KCD_CODE_CURR_CD);
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

    const onCellEditCompleteKSV_ORDER_MEM = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;
        var tSaveTotCnt = parseInt(rowData["TOT_CNT"]);
        rowData[field] = newValue;

        // DatasKSV_ORDER_MEM_COL
        var _datasKSV_ORDER_MEM_COL = [...datasKSV_ORDER_MEM_COL];
        var tTotCnt = 0;
        var tIdx = 0;
        for (tIdx = 0; tIdx < _datasKSV_ORDER_MEM_COL.length; tIdx++) {
            var tOne = _datasKSV_ORDER_MEM_COL[tIdx];
            if (
                tOne.field === "PROD_CD" ||
                tOne.field === "ADD_FLAG" ||
                tOne.field === "TOT_CNT" ||
                tOne.field === "PRICE"
            ) {
                continue;
            }

            var tVal1 = rowData[tOne.field];
            tTotCnt += parseInt(tVal1);
        }
        rowData["TOT_CNT"] = tTotCnt;

        var _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };

        if (tSaveTotCnt > tTotCnt) {
            if (rowData["ADD_FLAG"] === "1") {
                _dataKSV_ORDER_MST.ADD_CNT -= tSaveTotCnt - tTotCnt;
            } else {
                _dataKSV_ORDER_MST.TOT_CNT -= tSaveTotCnt - tTotCnt;
            }
        } else if (tSaveTotCnt < tTotCnt) {
            if (rowData["ADD_FLAG"] === "1") {
                _dataKSV_ORDER_MST.ADD_CNT += tTotCnt - tSaveTotCnt;
            } else {
                _dataKSV_ORDER_MST.TOT_CNT += tTotCnt - tSaveTotCnt;
            }
        }

        setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);
        console.log("onEDITCOMPLELE=>" + field + "," + newValue);
    };

    const cellEditorKSV_ORDER_MEM = (options) => {
        return textEditor(options);
    };

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => options.editorCallback(e.target.value)}
            />
        );
    };

    const makeSizeGrid = () => {
        if (selectedKSV_PROD_MST.length > 0 && datasKCD_SIZE_MEM.length > 0) {
            addKSV_PROD_MST();
        } else {
            setDatasKSV_ORDER_MEM([]);
        }
    };

    const addKSV_PROD_MST = () => {
        let _tDatas = [...selectedKSV_PROD_MST];
        let _tDatasKCD_SIZE_MEM = [...datasKCD_SIZE_MEM];

        // console.log("addKSV_PROD_MST:" + _tDatas.length + "," + _tDatasKCD_SIZE_MEM.length);
        var tIdx = 0;
        let _tArrays = [];

        let _tColArrays = [];
        var tmpObj = {};
        tmpObj.field = "";
        tmpObj.field_name = "";

        var tObj = JSON.parse(JSON.stringify(tmpObj, null, 4));
        tObj.field = "PROD_CD";
        tObj.field_name = "제품코드";
        tObj.field_kind = "NOEDIT";
        _tColArrays.push(tObj);
        var tObj1 = JSON.parse(JSON.stringify(tmpObj, null, 4));
        tObj1.field = "ADD_FLAG";
        tObj1.field_name = "ADD_FLAG";
        tObj1.field_kind = "NOEDIT";
        _tColArrays.push(tObj1);
        var tObj2 = JSON.parse(JSON.stringify(tmpObj, null, 4));
        tObj2.field = "TOT_CNT";
        tObj2.field_name = "수량";
        tObj2.field_kind = "NOEDIT";
        _tColArrays.push(tObj2);
        var tObj3 = JSON.parse(JSON.stringify(tmpObj, null, 4));
        tObj3.field = "PRICE";
        tObj3.field_name = "가격";
        tObj3.field_kind = "EDIT";
        _tColArrays.push(tObj3);

        var tIdx1 = 0;
        for (tIdx1 = 0; tIdx1 < _tDatasKCD_SIZE_MEM.length; tIdx1++) {
            let name = _tDatasKCD_SIZE_MEM[tIdx1].SIZE_VAL;
            var tObj = JSON.parse(JSON.stringify(tmpObj, null, 4));
            tObj.field = name;
            tObj.field_name = name;
            tObj.field_kind = "EDIT";
            _tColArrays.push(tObj);
        }
        setDatasKSV_ORDER_MEM_COL(_tColArrays);
        // console.log(_tColArrays);

        var _datasKSV_ORDER_MEM = [...datasKSV_ORDER_MEM];
        console.log("LENGTH: ORDER_MEM=>" + _datasKSV_ORDER_MEM.length);

        var tMaxId = 0;
        for (tIdx = 0; tIdx < _datasKSV_ORDER_MEM.length; tIdx++) {
            let _tOne = _datasKSV_ORDER_MEM[tIdx];
            _tOne.id = tIdx + 1;
            tMaxId = _tOne.id;
            _tArrays.push(_tOne);
        }
        tMaxId += 1;

        for (tIdx = 0; tIdx < _tDatas.length; tIdx++) {
            var tFlag0 = 0;
            var tIdx1 = 0;
            let _tOne = _tDatas[tIdx];

            for (tIdx1 = 0; tIdx1 < _datasKSV_ORDER_MEM.length; tIdx1++) {
                let _tOne1 = _datasKSV_ORDER_MEM[tIdx1];
                // console.log("SEARCH: " + _tOne.PROD_CD + "," + _tOne1.PROD_CD);
                if (
                    _tOne.PROD_CD === _tOne1.PROD_CD &&
                    _tOne.ADD_SHIP === dataInAddShip
                ) {
                    tFlag0 = 1;
                }
            }

            if (tFlag0 === 1) continue;

            var tObj = {};
            tObj.id = tMaxId;
            tMaxId = +1;
            tObj.ORDER_CD = dataKSV_ORDER_MST.ORDER_CD;
            tObj.PROD_CD = _tOne.PROD_CD;
            tObj.ADD_FLAG = dataInAddShip;
            tObj.TOT_CNT = 0;
            tObj.SIZE_CNT = "";
            tObj.OLD_PROD_CD = "";
            tObj.barcode = "";
            tObj.MID_SIZE = "";
            tObj.MID_SIZE_QTY = 0;
            tObj.SIZE_LOSS = "";
            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < _tDatasKCD_SIZE_MEM.length; tIdx1++) {
                let name = _tDatasKCD_SIZE_MEM[tIdx1].SIZE_VAL;
                tObj[name] = 0;
            }
            _tArrays.push(tObj);
        }
        setDatasKSV_ORDER_MEM(_tArrays);
        clearSelectedKSV_ORDER_MEM();
        setDeleteDatasDialogKSV_ORDER_MEM(false);

        setSelectedKSV_PROD_MST([]);
    };

    const callFuncGetOneKCD_STYLE = (qryStyleCd) => {
        // const serviceKCD_STYLE = new ServiceKCD_STYLE();
        serviceMgrKCD_STYLE.getDatasByParam(qryStyleCd, "", "").then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceKCD_STYLE.getDataOne call => " + data.length,
                );
                setDataKCD_STYLE(data[0]);

                var tOne = data[0];

                var _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };
                _dataKSV_ORDER_MST.STYLE_CD = tOne.STYLE_CD;
                _dataKSV_ORDER_MST.STYLE_NAME = tOne.STYLE_NAME;
                _dataKSV_ORDER_MST.YY = 2022;
                _dataKSV_ORDER_MST.BUYER_CD = tOne.BUYER_CD;
                _dataKSV_ORDER_MST.BUYER_NAME = tOne.BUYER_NAME;
                _dataKSV_ORDER_MST.ORDER_DATE = getDateYYYYMMDD();
                _dataKSV_ORDER_MST.DUE_DATE = getDateYYYYMMDD();
                _dataKSV_ORDER_MST.MATL_DUE_DATE = getDateYYYYMMDD();

                setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);

                g_dataKCD_STYLE = { ...data };
            } else {
                // var tStr = data.graphQLErrors[0].message;
                console.log(
                    "ServiceKCD_STYLE.getDataOne error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const callFuncGetMaxSeq = (qryStyleCd, qryYY) => {
        // const serviceKCD_STYLE = new ServiceKCD_STYLE();
        serviceMgrKSV_ORDER_MST.getMaxSeq(qryStyleCd, qryYY).then((data) => {
            if (data === null) {
                mMaxSeq = 1;
            } else {
                mMaxSeq = parseInt(data) + 1;
            }
            localStorage.setItem("MGR_KSV_ORDER_MST_MAX", String(mMaxSeq));
        });
    };

    const callFuncKSV_PROD_MST = (qryStyleCd) => {
        // const serviceMgrKCD_STYLE = new ServiceMgrKCD_STYLE();
        serviceMgrKCD_STYLE
            .getDatasByParamKSV_PROD_MST(qryStyleCd)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_STYLE.getDatasByParamKSV_PROD_MST call => " +
                            data.length,
                    );
                    setDatasKSV_PROD_MST(data);
                    g_datasKSV_PROD_MST = [...data];
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceMgrKCD_STYLE.getDatasByParamKSV_PROD_MST error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const callFuncKSV_ORDER_MEM = (qryOrderCd) => {
        // const serviceMgrKSV_ORDER_MEM = new ServiceMgrKSV_ORDER_MEM();
        serviceMgrKSV_ORDER_MEM.getDatasByParam(qryOrderCd).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKSV_ORDER_MEM.getDatasByParam call => " +
                        data.length,
                );
                g_datasKSV_ORDER_MEM = [...data];
                setDatasKSV_ORDER_MEM(data);
            } else {
                // var tStr = data.graphQLErrors[0].message;
                console.log(
                    "ServiceMgrKSV_ORDER_MEM.getDatasByParam error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /******************* EDIT TABLE START: KSV_ORDER_MST ****************************************/

    /******************* EDIT TABLE END: KSV_ORDER_MST ****************************************/

    /******************* EDIT TABLE START: KSV_PROD_MST ****************************************/

    /******************* EDIT TABLE END: KSV_PROD_MST ****************************************/

    /******************* EDIT TABLE START: KSV_ORDER_MEM ****************************************/

    /******************* EDIT TABLE END: KSV_ORDER_MEM ****************************************/

    const searchRefreshKSV_ORDER_MST = () => {
        clearSelectedKSV_ORDER_MST();
        setCreateDialogKSV_ORDER_MST(false);
        // const serviceMgrKSV_ORDER_MST = new ServiceMgrKSV_ORDER_MST();
        serviceMgrKSV_ORDER_MST.getDatasByParam("", "").then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKSV_ORDER_MST.getDatasByParam call => " +
                        data.length,
                );
                setDatasKSV_ORDER_MST(data);
            } else {
                // var tStr = data.graphQLErrors[0].message;
                console.log(
                    "ServiceMgrKSV_ORDER_MST.getDatasByParam error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /************************* DATAGRID : KSV_ORDER_MST START **************************************************/

    const searchKCD_STYLE = () => {};

    const searchKSV_ORDER_MST = () => {
        clearSelectedKSV_ORDER_MST();
        setCreateDialogKSV_ORDER_MST(false);

        // let _qryStr = 'query value: ' + qrySearchStringKSV_ORDER_MST + '=>' + qryStatusKSV_ORDER_MST.CD_CODE;
        // console.log('searchKSV_ORDER_MST : ' + _qryStr);

        const serviceMgrKSV_ORDER_MST = new ServiceMgrKSV_ORDER_MST();
        serviceMgrKSV_ORDER_MST
            .getDatasByParam(
                qryNameKSV_ORDER_MST,
                qryBuyerCdKSV_ORDER_MST.BUYER_CD,
                qryOrderStatusKSV_ORDER_MST.CD_NAME,
            )
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setDatasKSV_ORDER_MST(data);
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

    const copyKSV_ORDER_MST = () => {
        dataKSV_ORDER_MST.id = 0;
        saveKSV_ORDER_MST();
    };

    const resetKSV_ORDER_MST = () => {};

    const saveKSV_ORDER_MST = () => {
        setSubmittedKSV_ORDER_MST(true);

        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };

        delete _dataKSV_ORDER_MST.STYLE_ID;
        delete _dataKSV_ORDER_MST.STYLE_NAME;
        delete _dataKSV_ORDER_MST.BUYER_CD;
        delete _dataKSV_ORDER_MST.BUYER_NAME;
        delete _dataKSV_ORDER_MST.STATUS_NAME;
        delete _dataKSV_ORDER_MST.PO_CD;
        delete _dataKSV_ORDER_MST.ETC99;
        delete _dataKSV_ORDER_MST.SHIP_CNT;

        _dataKSV_ORDER_MST.STYLE_CD = dataQryStyleCd.STYLE_CD;
        _dataKSV_ORDER_MST.DL_FLAG = dataKSV_ORDER_MST_DL_FLAG.CD_CODE;

        let _datasKSV_ORDER_MEM = [...datasKSV_ORDER_MEM];
        let __datasKSV_ORDER_MEM = _datasKSV_ORDER_MEM.map((col, i) => {
            var tRetObj = {};
            tRetObj.SIZE_CNT = "";
            var keys = Object.keys(col);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (key === "id") tRetObj.id = col.id;
                else if (key === "ORDER_CD")
                    tRetObj.ORDER_CD = _dataKSV_ORDER_MST.ORDER_CD;
                else if (key === "PROD_CD") tRetObj.PROD_CD = col.PROD_CD;
                else if (key === "ADD_FLAG") tRetObj.ADD_FLAG = col.ADD_FLAG;
                else if (key === "OLD_PROD_CD")
                    tRetObj.OLD_PROD_CD = col.OLD_PROD_CD;
                else if (key === "barcode") tRetObj.barcode = col.barcode;
                else if (key === "MID_SIZE") tRetObj.MID_SIZE = col.MID_SIZE;
                else if (key === "MID_SIZE_QTY")
                    tRetObj.MID_SIZE_QTY = col.MID_SIZE_QTY;
                else if (key === "SIZE_LOSS") tRetObj.SIZE_LOSS = col.SIZE_LOSS;
                else if (key === "TOT_CNT") tRetObj.TOT_CNT = col.TOT_CNT;
                else if (key === "__typename");
                else if (key === "SIZE_CNT");
                else {
                    tRetObj.SIZE_CNT += getFormatSizeCnt(col[key]);
                }
            }
            return tRetObj;
        });

        if (_dataKSV_ORDER_MST.ORDER_CD !== "") {
        } else {
            serviceMgr1KCD_BANK
                .mgr1KsvOrderMstSaveInsert(
                    _dataKSV_ORDER_MST,
                    __datasKSV_ORDER_MEM,
                    dataQryStyleCd.BUYER_CD,
                    dataKSV_ORDER_MST_FACTORY_CD.FACTORY_NAME,
                    dataInCombinedOrder,
                )
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        toast.current.show({
                            severity: "success",
                            summary: "Update Succeed",
                            detail: "VENDOR_CD:" + data,
                            life: 3000,
                        });
                        _dataKSV_ORDER_MST.ORDER_CD = data;
                        setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);

                        serviceMgr1KCD_BANK
                            .mgr1KsvOrderMstQuery(data)
                            .then((data) => {
                                if (typeof data.graphQLErrors === "undefined") {
                                    console.log(
                                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                                            data.T_KSV_ORDER_MST.length,
                                    );
                                    // setDatasKCD_STYLE(data);
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
        }
    };

    const deleteKSV_ORDER_MST = () => {
        clearSelectedKSV_ORDER_MST();
        const serviceKSV_ORDER_MST = new ServiceKSV_ORDER_MST();
        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };
        console.log("deleteKSV_ORDER_MST==>" + _dataKSV_ORDER_MST.id);
        serviceKSV_ORDER_MST.deleteData(_dataKSV_ORDER_MST).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                toast.current.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "KSV_ORDER_MST DELETE",
                    life: 3000,
                });
                const serviceMgrKSV_ORDER_MST = new ServiceMgrKSV_ORDER_MST();
                serviceMgrKSV_ORDER_MST
                    .getDatasByParam(
                        qryNameKSV_ORDER_MST,
                        qryBuyerCdKSV_ORDER_MST.BUYER_CD,
                        qryOrderStatusKSV_ORDER_MST.CD_NAME,
                    )
                    .then((data) => {
                        if (typeof data.graphQLErrors === "undefined") {
                            setDatasKSV_ORDER_MST(data);
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

        // setDatasKSV_ORDER_MST(_datasKSV_ORDER_MST);
        setDeleteDialogKSV_ORDER_MST(false);
        setDataKSV_ORDER_MST(emptyKSV_ORDER_MST);
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "KSV_ORDER_MST Deleted",
            life: 3000,
        });
    };

    const deleteSelectedKSV_ORDER_MST = () => {
        const serviceKSV_ORDER_MST = new ServiceKSV_ORDER_MST();
        serviceKSV_ORDER_MST.deletesData(selectedKSV_ORDER_MST).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                toast.current.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "KSV_ORDER_MST DELETS => ",
                    life: 3000,
                });
                const serviceMgrKSV_ORDER_MST = new ServiceMgrKSV_ORDER_MST();
                serviceMgrKSV_ORDER_MST
                    .getDatasByParam(
                        qryNameKSV_ORDER_MST,
                        qryBuyerCdKSV_ORDER_MST.BUYER_CD,
                        qryOrderStatusKSV_ORDER_MST.CD_NAME,
                    )
                    .then((data) => {
                        if (typeof data.graphQLErrors === "undefined") {
                            setDatasKSV_ORDER_MST(data);
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
        setFlagSelectModeKSV_ORDER_MST(false);
        setDeleteDatasDialogKSV_ORDER_MST(false);
        setSelectedKSV_ORDER_MST([]);
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "KSV_ORDER_MST Deleted",
            life: 3000,
        });
    };

    const clearSelectedKSV_ORDER_MST = () => {
        setSelectedKSV_ORDER_MST([]);
        setFlagSelectModeKSV_ORDER_MST(false);
    };

    const openNewKSV_ORDER_MST = () => {
        setCreateDialogKSV_ORDER_MST_SUB(true);
        var tYY = parseInt(getDateYYYYMMDD().substring(0, 4));
        callFuncGetMaxSeq("", tYY);
    };

    const openNewKSV_ORDER_MST_sub = () => {
        let tKCD_STYLE = JSON.parse(localStorage.getItem("AF_STYLE"));
        callFuncGetOneKCD_STYLE(tKCD_STYLE.id);
        callFuncKSV_PROD_MST(tKCD_STYLE.STYLE_CD);
        callFuncKSV_ORDER_MEM("");

        let _tData = { ...emptyKSV_ORDER_MST };

        _tData.id = 0;
        _tData.STYLE_CD = tKCD_STYLE.STYLE_CD;
        _tData.YY = parseInt(getDateYYYYMMDD().substring(0, 4));
        // callFuncGetMaxSeq(_tData.STYLE_CD, _tData.YY);
        console.log("MAX:" + localStorage.getItem("MGR_KSV_ORDER_MST_MAX"));
        _tData.SEQ = parseInt(localStorage.getItem("MGR_KSV_ORDER_MST_MAX"));

        _tData.STYLE_ID = tKCD_STYLE.id;
        _tData.STYLE_NAME = tKCD_STYLE.STYLE_NAME;
        _tData.BUYER_CD = tKCD_STYLE.BUYER_CD;
        _tData.BUYER_NAME = tKCD_STYLE.BUYER_NAME;

        clearSelectedKSV_ORDER_MST();
        setDataKSV_ORDER_MST(_tData);
        setSubmittedKSV_ORDER_MST(false);
        setCreateDialogKSV_ORDER_MST(true);
    };

    const confirmDeleteSelectedKSV_ORDER_MST = () => {
        setDeleteDatasDialogKSV_ORDER_MST(true);
    };

    const onQryNameKSV_ORDER_MST = (e) => {
        const val = (e.target && e.target.value) || "";
        setQryNameKSV_ORDER_MST(val);
    };
    const onQryBuyerCdKSV_ORDER_MST = (e) => {
        setQryBuyerCdKSV_ORDER_MST(e.value);
    };
    const onQryOrderStatusKSV_ORDER_MST = (e) => {
        setQryOrderStatusKSV_ORDER_MST(e.value);
    };

    const hideDialogKSV_ORDER_MST = () => {
        setSubmittedKSV_ORDER_MST(false);
        setCreateDialogKSV_ORDER_MST(false);

        setDataKSV_ORDER_MST(emptyKSV_ORDER_MST);
        setDatasKSV_ORDER_MEM([]);
        setDatasKSV_PROD_MST([]);
    };

    const saveDialogKSV_ORDER_MST_SUB = () => {
        setSubmittedKSV_ORDER_MST(false);
        setCreateDialogKSV_ORDER_MST_SUB(false);
        setDatasKSV_ORDER_MEM([]);
        setDatasKSV_ORDER_MEM_COL([]);
        setDatasKSV_PROD_MST([]);
        openNewKSV_ORDER_MST_sub();
    };

    const hideDeleteDialogKSV_ORDER_MST = () => {
        setDeleteDialogKSV_ORDER_MST(false);
    };

    const hideDeleteDatasDialogKSV_ORDER_MST = () => {
        clearSelectedKSV_ORDER_MST();
        setDeleteDatasDialogKSV_ORDER_MST(false);
    };

    const headerKSV_ORDER_MST = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">주문목록</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <Button
                    label="New"
                    icon="pi pi-plus"
                    className="p-button-text"
                    onClick={openNewKSV_ORDER_MST}
                />
                <Button
                    label="Delete"
                    icon="pi pi-trash"
                    className="p-button-text"
                    onClick={confirmDeleteSelectedKSV_ORDER_MST}
                    disabled={!selectedKSV_ORDER_MST || !selectedKSV_ORDER_MST}
                />
            </span>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    onInput={(e) => onQryNameKSV_ORDER_MST(e)}
                    placeholder="Search..."
                />
                <Dropdown
                    id="id_QryBuyerCdKSV_ORDER_MST"
                    value={qryBuyerCdKSV_ORDER_MST}
                    onChange={(e) => onQryBuyerCdKSV_ORDER_MST(e)}
                    options={datasKSV_ORDER_MST_BUYER_CD}
                    optionLabel="BUYER_NAME"
                    placeholder="Select One"
                ></Dropdown>
                <Dropdown
                    id="id_QryOrderStatusKSV_ORDER_MST"
                    value={qryOrderStatusKSV_ORDER_MST}
                    onChange={(e) => onQryOrderStatusKSV_ORDER_MST(e)}
                    options={datasKSV_ORDER_MST_ORDER_STATUS}
                    optionLabel="CD_NAME"
                    placeholder="Select One"
                ></Dropdown>

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
                    onClick={searchKSV_ORDER_MST}
                />

                <Button
                    label="Reload"
                    icon="pi pi-refresh"
                    className="p-button-text"
                    onClick={searchRefreshKSV_ORDER_MST}
                />
            </span>
        </div>
    );

    const createDialogFooterKSV_ORDER_MST = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDialogKSV_ORDER_MST}
            />
            <Button
                label="Save"
                icon="pi pi-check"
                className="p-button-text"
                onClick={saveKSV_ORDER_MST}
            />
            <Button
                label="Copy"
                icon="pi pi-check"
                className="p-button-text"
                onClick={copyKSV_ORDER_MST}
            />
        </>
    );

    const createDialogFooterKSV_ORDER_MST_SUB = (
        <>
            <Button
                label="Apply"
                icon="pi pi-times"
                className="p-button-text"
                onClick={saveDialogKSV_ORDER_MST_SUB}
            />
        </>
    );

    const deleteDialogFooterKSV_ORDER_MST = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDeleteDialogKSV_ORDER_MST}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-text"
                onClick={deleteKSV_ORDER_MST}
            />
        </>
    );

    const deleteDatasDialogFooterKSV_ORDER_MST = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDeleteDatasDialogKSV_ORDER_MST}
            />

            <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-text"
                onClick={deleteSelectedKSV_ORDER_MST}
            />
        </>
    );

    /************************* DATAGRID : KSV_ORDER_MST END **************************************************/

    /************************* DATAGRID : KSV_PROD_MST START **************************************************/

    const onRowClickKSV_PROD_MST = (event) => {};

    /************************* DATAGRID : KSV_ORDER_MEM START **************************************************/

    const onRowClickKSV_ORDER_MEM = (event) => {};

    const clearSelectedKSV_ORDER_MEM = () => {
        setSelectedKSV_ORDER_MEM([]);
        setFlagSelectModeKSV_ORDER_MEM(false);
    };

    // ETC FUNC
    const dynamicColumnsKSV_ORDER_MEM = datasKSV_ORDER_MEM_COL.map((col, i) => {
        var tHeader = `id_msg_${col.field}_KSV_ORDER_MST_dt`;
        console.log(col);
        console.log(tHeader);
        console.log(i);
        // return <AFColumn field={col.field} header={serviceLib.getLocaleMessage({tHeader})} headerStyle={{ width: '10rem' }}></AFColumn>
        if (col.field_kind === "NOEDIT") {
            return (
                <AFColumn key={col.field} field={col.field} header={col.field} headerStyle={{ width: "5rem" }} bodyStyle={{ width: "5rem" }} ></AFColumn>
            );
        }
        if (col.field_kind === "EDIT") {
            return (
                <AFColumn key={col.field} field={col.field} header={col.field} editor={(options) => cellEditorKSV_ORDER_MEM(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_MEM} headerStyle={{ width: "5rem" }} bodyStyle={{ width: "5rem" }} ></AFColumn>
            );
        }
    });

    // Qry
    const onInputChangeQryStyleName = (e, name) => {
        let val = (e.target && e.target.value) || "";
        setDataQryStyleName(val);
    };

    const onQryStyleNameKeyPress = (e) => {
        if (e.key === "Enter") {
            console.log("enter press here!:  " + dataQryStyleName);

            serviceMgr1KCD_BANK
                .mgr1KsvOrderMstStyle(dataQryStyleName)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        setDatasQryStyleCd(data);
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

    const onInputChangeQryBuyerName = (e, name) => {
        let val = (e.target && e.target.value) || "";
        setDataQryBuyerName(val);
    };

    const onQryBuyerNameKeyPress = (e) => {
        if (e.key === "Enter") {
            console.log("enter press here! ");
        }
    };

    const onDropdownChangeQryStyleCd = (e, name) => {
        let val = (e.value && e.value.STYLE_CD) || "";
        setDataQryStyleCd(e.value);
        console.log(e.value);
        setDataQryBuyerName(e.value.BUYER_NAME);

        let _tData = datasKSV_ORDER_MST_DL_FLAG.filter(
            (el) => el.CD_CODE === e.value.DL,
        );
        setDataKSV_ORDER_MST_DL_FLAG(_tData[0]);

        console.log("DL_FLAG:" + e.value.DL);

        serviceMgr1KCD_BANK
            .mgr1KcdStyleKsvProdMst(e.value.STYLE_CD)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setDatasKSV_PROD_MST(data);
                } else {
                    setDatasKSV_PROD_MST([]);
                    var tStr = data.graphQLErrors[0].message;
                    toast.current.show({
                        severity: "success",
                        summary: "Query Error",
                        detail: tStr,
                        life: 3000,
                    });
                }
            });

        setDatasKSV_ORDER_MEM([]);
        setDataKSV_ORDER_MST_SIZE_GROUP(emptyKCD_SIZE_MST);
    };

    // EDIT
    const onInputChangeKSV_ORDER_MST_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };

        let tTypeVal = _dataKSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataKSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);
    };

    const onCheckboxChangeDataInCombinedOrder = (e, name) => {
        let val = "";
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        setDataInCombinedOrder(val);
        // _dataKSV_ORDER_MST[`${name}`] = val;
        // setDataKSV_ORDER_MST(val);
    };

    const onCheckboxChangeDataInAddShip = (e, name) => {
        let val = "";
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        setDataInAddShip(val);
        // _dataKSV_ORDER_MST[`${name}`] = val;
        // setDataKSV_ORDER_MST(val);
    };

    const onCheckboxChangeKSV_ORDER_MST_SAMPLE_FLAG = (e, name) => {
        let val = "";
        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataKSV_ORDER_MST[`${name}`] = val;
        setDataKSV_ORDER_MST(val);
    };

    const onCheckboxChangeKSV_ORDER_MST_FAC_LC_FLAG = (e, name) => {
        let val = "";
        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataKSV_ORDER_MST[`${name}`] = val;
        setDataKSV_ORDER_MST(val);
    };

    const onDropdownChangeKSV_ORDER_MST_DL_FLAG = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };

        let tTypeVal = _dataKSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);
        setDataKSV_ORDER_MST_DL_FLAG(e.value);
    };

    const onInputChangeKSV_ORDER_MST_TOT_CNT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };

        let tTypeVal = _dataKSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataKSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);
    };

    const onInputChangeKSV_ORDER_MST_ADD_CNT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };

        let tTypeVal = _dataKSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataKSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);
    };

    const onCalChangeKSV_ORDER_MST_ORDER_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        console.log(
            "onCalChangeKSV_ORDER_MST_ORDER_DATE:" + val + "," + typeof val,
        );

        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };
        _dataKSV_ORDER_MST[`${name}`] = val;
        setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);
    };

    const onCalChangeKSV_ORDER_MST_DUE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };
        _dataKSV_ORDER_MST[`${name}`] = val;
        setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);
    };

    const onCalChangeKSV_ORDER_MST_ORG_DUE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };
        _dataKSV_ORDER_MST[`${name}`] = val;
        setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);
    };

    const onDropdownChangeKSV_ORDER_MST_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };

        let tTypeVal = _dataKSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);
        setDataKSV_ORDER_MST_FACTORY_CD(e.value);
    };

    const onDropdownChangeKSV_ORDER_MST_CURR_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };

        let tTypeVal = _dataKSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);
        setDataKSV_ORDER_MST_CURR_CD(e.value);
    };

    const onInputChangeKSV_ORDER_MST_FOB = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };

        let tTypeVal = _dataKSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataKSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);
    };

    const onDropdownChangeKSV_ORDER_MST_NAT_CD = (e, name) => {
        let val = (e.value && e.value.NAT_CD) || "";

        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };

        let tTypeVal = _dataKSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);
        setDataKSV_ORDER_MST_NAT_CD(e.value);
    };

    const onInputChangeKSV_ORDER_MST_USD_PRICE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };

        let tTypeVal = _dataKSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataKSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);
    };

    const onDropdownChangeKSV_ORDER_MST_SIZE_GROUP = (e, name) => {
        let val = (e.value && e.value.SIZE_GROUP) || "";

        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };

        let tTypeVal = _dataKSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);
        setDataKSV_ORDER_MST_SIZE_GROUP(e.value);

        serviceMgr1KCD_BANK
            .mgr1KsvOrderMstSizeMem(e.value.SIZE_GROUP)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setDatasKCD_SIZE_MEM(data);
                } else {
                    setDatasKCD_SIZE_MEM([]);
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

    const onInputChangeKSV_ORDER_MST_BUYER_PO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };

        let tTypeVal = _dataKSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataKSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);
    };

    const onInputChangeKSV_ORDER_MST_REMARK1 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };

        let tTypeVal = _dataKSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataKSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);
    };

    const onInputChangeKSV_ORDER_MST_REMARK2 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };

        let tTypeVal = _dataKSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataKSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);
    };

    const onInputChangeKSV_ORDER_MST_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };

        let tTypeVal = _dataKSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataKSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);
    };

    const onDropdownChangeKSV_ORDER_MST_SAMPLE_LEVEL = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };

        let tTypeVal = _dataKSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);
        setDataKSV_ORDER_MST_SAMPLE_LEVEL(e.value);
    };

    const onDropdownChangeKSV_ORDER_MST_SAMPLE_SEQ = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };

        let tTypeVal = _dataKSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);
        setDataKSV_ORDER_MST_SAMPLE_SEQ(e.value);
    };

    const onDropdownChangeKSV_ORDER_MST_SAMPLE_REASON = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataKSV_ORDER_MST = { ...dataKSV_ORDER_MST };

        let tTypeVal = _dataKSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataKSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataKSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataKSV_ORDER_MST(_dataKSV_ORDER_MST);
        setDataKSV_ORDER_MST_SAMPLE_REASON(e.value);
    };

    // Support Area
    const changeCheckBoxVal = (argVal) => {
        if (argVal === "1") return true;
        else return false;
    };

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

    const getDateYYYYMMDD = () => {
        var tDate = new Date();
        var mm = tDate.getMonth() + 1;
        var mm_str = "";
        if (mm > 9) mm_str = mm.toString();
        else mm_str = "0" + mm;

        var dd = tDate.getDate();
        var dd_str = "";
        if (dd > 9) dd_str = dd.toString();
        else dd_str = "0" + dd;

        var hours = tDate.getHours();
        var hours_str = "";
        if (hours > 9) hours_str = hours.toString();
        else hours_str = "0" + hours;

        var minutes = tDate.getMinutes();
        var minutes_str = "";
        if (minutes > 9) minutes_str = minutes.toString();
        else minutes_str = "0" + minutes;

        var seconds = tDate.getSeconds();
        var seconds_str = "";
        if (seconds > 9) seconds_str = seconds.toString();
        else seconds_str = "0" + seconds;

        var yyyy = tDate.getFullYear();

        var tRet =
            yyyy.toString() +
            mm_str +
            dd_str +
            hours_str +
            minutes_str +
            seconds_str;
        return tRet;
    };

    const getFormatSizeCnt = (argVal) => {
        let tVal = parseInt(argVal);
        let tRet = "";
        if (tVal < 10) {
            tRet = "00000" + tVal;
        } else if (tVal < 100) {
            tRet = "0000" + tVal;
        } else if (tVal < 1000) {
            tRet = "000" + tVal;
        } else if (tVal < 10000) {
            tRet = "00" + tVal;
        } else if (tVal < 100000) {
            tRet = "0" + tVal;
        } else {
            tRet = tVal;
        }
        return String(tRet);
    };

    return (
        <div>
            <div style={{ width: "100rem", height: "32rem" }}>
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "50rem", height: "32rem" }}>
                        <div
                            style={{
                                marginTop: "1rem",
                                width: "50rem",
                                height: "2rem",
                            }}
                        >
                            <span
                                style={{
                                    width: "30rem",
                                    display: "inline-block",
                                }}
                            >
                                <p style={{ width: "8rem", display: "inline-block", }}>스타일명</p>
                                <InputText
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "20rem",
                                    }}
                                    type="search"
                                    onChange={(e) =>
                                        onInputChangeQryStyleName(
                                            e,
                                            "QryStyleName",
                                        )
                                    }
                                    placeholder=""
                                    onKeyPress={(e) =>
                                        onQryStyleNameKeyPress(e)
                                    }
                                />
                            </span>
                            <span
                                style={{
                                    display: "inline-block",
                                    width: "19rem",
                                }}
                            >
                                <div
                                    style={{
                                        display: "inline-block",
                                        width: "18rem",
                                    }}
                                >
                                    <Tooltip
                                        className="menuCodeTooltip"
                                        target={`#btnSearch`}
                                        content={`Alt+S`}
                                        position="bottom"
                                    />

                                    <Button
                                        style={{ padding: "0rem" }}
                                        label={
                                            <span>
                                                Search(<u>S</u>)
                                            </span>
                                        }
                                        accessKey="S"
                                        id="btnSearch"
                                        icon="pi pi-check"
                                        className="p-button-text"
                                        onClick={searchKCD_STYLE}
                                    />
                                </div>
                            </span>
                        </div>
                        <div style={{ width: "50rem", height: "2rem" }}>
                            <span style={{ width: "30rem" }}>
                                <p style={{ width: "8rem", display: "inline-block", }}>Style</p>
                                <div
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "20rem",
                                    }}
                                >
                                    <Dropdown
                                        id="id_QryStyleCd"
                                        value={dataQryStyleCd}
                                        onChange={(e) =>
                                            onDropdownChangeQryStyleCd(e, "")
                                        }
                                        options={datasQryStyleCd}
                                        optionLabel="STYLE_NAME"
                                        placeholder="Select One"
                                    ></Dropdown>
                                </div>
                            </span>
                        </div>
                        <div style={{ width: "50rem", height: "2rem" }}>
                            <span
                                style={{
                                    width: "30rem",
                                    display: "inline-block",
                                }}
                            >
                                <p style={{ width: "8rem", display: "inline-block", }}>바이어명</p>
                                <InputText
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "21rem",
                                    }}
                                    value={dataQryBuyerName}
                                    type="search"
                                    onChange={(e) =>
                                        onInputChangeQryBuyerName(
                                            e,
                                            "QryBuyerName",
                                        )
                                    }
                                    placeholder=""
                                    onKeyPress={(e) =>
                                        onQryBuyerNameKeyPress(e)
                                    }
                                />
                            </span>
                            <span
                                style={{
                                    display: "inline-block",
                                    width: "19rem",
                                }}
                            >
                                <p style={{ width: "10rem", display: "inline-block", }}>Combined Order</p>
                                <div
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "3rem",
                                    }}
                                >
                                    <Checkbox
                                        style={{
                                            display: "inline-block",
                                            width: "2rem",
                                        }}
                                        id="id_COMBINED_ORDER"
                                        checked={changeCheckBoxVal(
                                            dataInCombinedOrder,
                                        )}
                                        onChange={(e) =>
                                            onCheckboxChangeDataInCombinedOrder(
                                                e,
                                                "COMBINED_ORDER",
                                            )
                                        }
                                    />
                                </div>
                            </span>
                        </div>
                        <div
                            style={{
                                marginTop: "1rem",
                                width: "50rem",
                                height: "2rem",
                            }}
                        >
                            <div className="formgrid grid">
                                <div className="field col-12 md:col-12">
                                    <Button
                                        style={{
                                            display: "inline-block",
                                            width: "10rem",
                                        }}
                                        label="Reset"
                                        icon="pi pi-times"
                                        className="p-button-text"
                                        onClick={resetKSV_ORDER_MST}
                                    />

                                    <Button
                                        style={{
                                            display: "inline-block",
                                            width: "10rem",
                                        }}
                                        label="Save"
                                        icon="pi pi-check"
                                        className="p-button-text"
                                        onClick={saveKSV_ORDER_MST}
                                    />

                                    <Button
                                        style={{
                                            display: "inline-block",
                                            width: "10rem",
                                        }}
                                        label="Delete"
                                        icon="pi pi-check"
                                        className="p-button-text"
                                        onClick={deleteKSV_ORDER_MST}
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                marginTop: "1rem",
                                width: "50rem",
                                height: "2.5rem",
                            }}
                        >
                            <span
                                style={{
                                    height: "2rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <p style={{ width: "6rem", display: "inline-block", }}>Sample</p>
                                <div
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "3rem",
                                    }}
                                >
                                    <Checkbox
                                        style={{
                                            display: "inline-block",
                                            width: "2rem",
                                        }}
                                        id="id_SAMPLE_FLAG"
                                        checked={changeCheckBoxVal(
                                            dataKSV_ORDER_MST.SAMPLE_FLAG,
                                        )}
                                        onChange={(e) =>
                                            onCheckboxChangeKSV_ORDER_MST_SAMPLE_FLAG(
                                                e,
                                                "SAMPLE_FLAG",
                                            )
                                        }
                                    />
                                </div>
                            </span>
                            <span
                                style={{
                                    height: "2rem",
                                    display: "inline-block",
                                    width: "12rem",
                                }}
                            >
                                <p style={{ width: "8rem", display: "inline-block", }}>Factory FOB</p>
                                <div
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "3rem",
                                    }}
                                >
                                    <Checkbox
                                        style={{
                                            display: "inline-block",
                                            width: "2rem",
                                        }}
                                        id="id_FAC_LC_FLAG"
                                        checked={changeCheckBoxVal(
                                            dataKSV_ORDER_MST.FAC_LC_FLAG,
                                        )}
                                        onChange={(e) =>
                                            onCheckboxChangeKSV_ORDER_MST_FAC_LC_FLAG(
                                                e,
                                                "FAC_LC_FLAG",
                                            )
                                        }
                                    />
                                </div>
                            </span>
                            <span
                                style={{
                                    height: "2rem",
                                    display: "inline-block",
                                    width: "20rem",
                                }}
                            >
                                <p style={{ width: "8rem", display: "inline-block", }}>DL</p>
                                <div
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "11rem",
                                    }}
                                >
                                    <Dropdown
                                        disabled
                                        id="id_DL_FLAG"
                                        value={dataKSV_ORDER_MST_DL_FLAG}
                                        onChange={(e) =>
                                            onDropdownChangeKSV_ORDER_MST_DL_FLAG(
                                                e,
                                                "DL_FLAG",
                                            )
                                        }
                                        options={datasKSV_ORDER_MST_DL_FLAG}
                                        optionLabel="CD_NAME"
                                        placeholder=""
                                    ></Dropdown>
                                </div>
                            </span>
                        </div>
                        <div
                            style={{
                                marginTop: "1rem",
                                width: "50rem",
                                height: "22rem",
                            }}
                        >
                            <span
                                style={{
                                    height: "2rem",
                                    display: "block",
                                    width: "33rem",
                                }}
                            >
                                <p style={{ width: "8rem", display: "inline-block", }}>Order</p>
                                <InputText
                                    disabled
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "10rem",
                                    }}
                                    id="id_ORDER_CD"
                                    value={dataKSV_ORDER_MST.ORDER_CD}
                                    onChange={(e) =>
                                        onInputChangeKSV_ORDER_MST_ORDER_CD(
                                            e,
                                            "ORDER_CD",
                                        )
                                    }
                                />

                                <InputText
                                    disabled
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "10rem",
                                    }}
                                    id="id_ORDER_CD_D"
                                    value={dataInORDER_CD_D}
                                />

                                <InputText
                                    disabled
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "10rem",
                                    }}
                                    id="id_ORDER_CD_Z"
                                    value={dataInORDER_CD_Z}
                                />
                            </span>
                            <span
                                style={{
                                    height: "2rem",
                                    display: "block",
                                    width: "33rem",
                                }}
                            >
                                <p style={{ width: "8rem", display: "inline-block", }}>Factory</p>
                                <div
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "23rem",
                                    }}
                                >
                                    <Dropdown
                                        id="id_FACTORY_CD"
                                        value={dataKSV_ORDER_MST_FACTORY_CD}
                                        onChange={(e) =>
                                            onDropdownChangeKSV_ORDER_MST_FACTORY_CD(
                                                e,
                                                "FACTORY_CD",
                                            )
                                        }
                                        options={datasKSV_ORDER_MST_FACTORY_CD}
                                        optionLabel="FACTORY_NAME"
                                        placeholder=""
                                    ></Dropdown>
                                </div>
                            </span>
                            <span
                                style={{
                                    height: "2rem",
                                    display: "inline-block",
                                    width: "22rem",
                                }}
                            >
                                <p style={{ width: "8rem", display: "inline-block", }}>Order Qty</p>
                                <InputText
                                    disabled
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "13rem",
                                    }}
                                    id="id_TOT_CNT"
                                    value={dataKSV_ORDER_MST.TOT_CNT}
                                    onChange={(e) =>
                                        onInputChangeKSV_ORDER_MST_TOT_CNT(
                                            e,
                                            "TOT_CNT",
                                        )
                                    }
                                />
                            </span>
                            <span
                                style={{
                                    height: "2rem",
                                    display: "inline-block",
                                    width: "22rem",
                                }}
                            >
                                <p style={{ width: "8rem", display: "inline-block", }}>Add Qty</p>
                                <InputText
                                    disabled
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "13rem",
                                    }}
                                    id="id_ADD_CNT"
                                    value={dataKSV_ORDER_MST.ADD_CNT}
                                    onChange={(e) =>
                                        onInputChangeKSV_ORDER_MST_ADD_CNT(
                                            e,
                                            "ADD_CNT",
                                        )
                                    }
                                />
                            </span>
                            <span
                                style={{
                                    height: "2rem",
                                    display: "inline-block",
                                    width: "22rem",
                                }}
                            >
                                <p style={{ width: "8rem", display: "inline-block", }}>Order Date</p>
                                <div
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "13rem",
                                    }}
                                >
                                    <Calendar
                                        showButtonBar
                                        dateFormat="yymmdd"
                                        id="id_ORDER_DATE"
                                        value={changeDateVal(
                                            dataKSV_ORDER_MST.ORDER_DATE,
                                        )}
                                        onChange={(e) =>
                                            onCalChangeKSV_ORDER_MST_ORDER_DATE(
                                                e,
                                                "ORDER_DATE",
                                            )
                                        }
                                    />
                                </div>
                            </span>
                            <span
                                style={{
                                    height: "2rem",
                                    display: "inline-block",
                                    width: "22rem",
                                }}
                            >
                                <p style={{ width: "8rem", display: "inline-block", }}>Due Date</p>
                                <div
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "13rem",
                                    }}
                                >
                                    <Calendar
                                        showButtonBar
                                        dateFormat="yymmdd"
                                        id="id_DUE_DATE"
                                        value={changeDateVal(
                                            dataKSV_ORDER_MST.DUE_DATE,
                                        )}
                                        onChange={(e) =>
                                            onCalChangeKSV_ORDER_MST_DUE_DATE(
                                                e,
                                                "DUE_DATE",
                                            )
                                        }
                                    />
                                </div>
                            </span>
                            <span
                                style={{
                                    height: "2rem",
                                    display: "block",
                                    width: "33rem",
                                }}
                            >
                                <p style={{ width: "8rem", display: "inline-block", }}>Due Date</p>
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
                                        id="id_ORG_DUE_DATE"
                                        value={changeDateVal(
                                            dataKSV_ORDER_MST.ORG_DUE_DATE,
                                        )}
                                        onChange={(e) =>
                                            onCalChangeKSV_ORDER_MST_ORG_DUE_DATE(
                                                e,
                                                "ORG_DUE_DATE",
                                            )
                                        }
                                    />
                                </div>
                            </span>
                            <span
                                style={{
                                    height: "2rem",
                                    display: "inline-block",
                                    width: "22rem",
                                }}
                            >
                                <p style={{ width: "8rem", display: "inline-block", }}>Currency</p>
                                <div
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "13rem",
                                    }}
                                >
                                    <Dropdown
                                        id="id_CURR_CD"
                                        value={dataKSV_ORDER_MST_CURR_CD}
                                        onChange={(e) =>
                                            onDropdownChangeKSV_ORDER_MST_CURR_CD(
                                                e,
                                                "CURR_CD",
                                            )
                                        }
                                        options={datasKSV_ORDER_MST_CURR_CD}
                                        optionLabel="CD_NAME"
                                        placeholder=""
                                    ></Dropdown>
                                </div>
                            </span>
                            <span
                                style={{
                                    height: "2rem",
                                    display: "inline-block",
                                    width: "22rem",
                                }}
                            >
                                <p style={{ width: "8rem", display: "inline-block", }}>FOB</p>
                                <InputText
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "13rem",
                                    }}
                                    id="id_FOB"
                                    value={dataKSV_ORDER_MST.FOB}
                                    onChange={(e) =>
                                        onInputChangeKSV_ORDER_MST_FOB(e, "FOB")
                                    }
                                />
                            </span>
                            <span
                                style={{
                                    height: "2rem",
                                    display: "inline-block",
                                    width: "22rem",
                                }}
                            >
                                <p style={{ width: "8rem", display: "inline-block", }}>Country</p>
                                <div
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "13rem",
                                    }}
                                >
                                    <Dropdown
                                        id="id_NAT_CD"
                                        value={dataKSV_ORDER_MST_NAT_CD}
                                        onChange={(e) =>
                                            onDropdownChangeKSV_ORDER_MST_NAT_CD(
                                                e,
                                                "NAT_CD",
                                            )
                                        }
                                        options={datasKSV_ORDER_MST_NAT_CD}
                                        optionLabel="NAT_NAME"
                                        placeholder=""
                                    ></Dropdown>
                                </div>
                            </span>
                            <span
                                style={{
                                    height: "2rem",
                                    display: "inline-block",
                                    width: "22rem",
                                }}
                            >
                                <p style={{ width: "8rem", display: "inline-block", }}>FOB($)</p>
                                <InputText
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "13rem",
                                    }}
                                    id="id_USD_PRICE"
                                    value={dataKSV_ORDER_MST.USD_PRICE}
                                    onChange={(e) =>
                                        onInputChangeKSV_ORDER_MST_USD_PRICE(
                                            e,
                                            "USD_PRICE",
                                        )
                                    }
                                />
                            </span>
                        </div>
                    </div>

                    <div
                        style={{
                            marginTop: "1rem",
                            width: "50rem",
                            height: "32rem",
                        }}
                    >
                        <div style={{ width: "50rem", height: "13rem" }}>
                            <span
                                style={{
                                    height: "2rem",
                                    display: "inline-block",
                                    width: "30rem",
                                }}
                            >
                                <p style={{ width: "4rem", display: "inline-block", }}>REF</p>
                                <InputText
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "25rem",
                                    }}
                                    id="id_BUYER_PO"
                                    value={dataKSV_ORDER_MST.BUYER_PO}
                                    onChange={(e) =>
                                        onInputChangeKSV_ORDER_MST_BUYER_PO(
                                            e,
                                            "BUYER_PO",
                                        )
                                    }
                                />
                            </span>
                            <span
                                style={{
                                    height: "2rem",
                                    display: "inline-block",
                                    width: "20rem",
                                }}
                            >
                                <p style={{ width: "4rem", display: "inline-block", }}>샘플단계</p>
                                <div
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "15rem",
                                    }}
                                >
                                    <Dropdown
                                        id="id_SAMPLE_LEVEL"
                                        value={dataKSV_ORDER_MST_SAMPLE_LEVEL}
                                        onChange={(e) =>
                                            onDropdownChangeKSV_ORDER_MST_SAMPLE_LEVEL(
                                                e,
                                                "SAMPLE_LEVEL",
                                            )
                                        }
                                        options={
                                            datasKSV_ORDER_MST_SAMPLE_LEVEL
                                        }
                                        optionLabel="CD_NAME"
                                        placeholder=""
                                    ></Dropdown>
                                </div>
                            </span>
                            <span
                                style={{
                                    height: "2rem",
                                    display: "inline-block",
                                    width: "30rem",
                                }}
                            >
                                <p style={{ width: "4rem", display: "inline-block", }}>REMARK1</p>
                                <InputText
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "25rem",
                                    }}
                                    id="id_REMARK1"
                                    value={dataKSV_ORDER_MST.REMARK1}
                                    onChange={(e) =>
                                        onInputChangeKSV_ORDER_MST_REMARK1(
                                            e,
                                            "REMARK1",
                                        )
                                    }
                                />
                            </span>
                            <span
                                style={{
                                    height: "2rem",
                                    display: "inline-block",
                                    width: "20rem",
                                }}
                            >
                                <p style={{ width: "4rem", display: "inline-block", }}>차수</p>
                                <div
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "15rem",
                                    }}
                                >
                                    <Dropdown
                                        id="id_SAMPLE_SEQ"
                                        value={dataKSV_ORDER_MST_SAMPLE_SEQ}
                                        onChange={(e) =>
                                            onDropdownChangeKSV_ORDER_MST_SAMPLE_SEQ(
                                                e,
                                                "SAMPLE_SEQ",
                                            )
                                        }
                                        options={datasKSV_ORDER_MST_SAMPLE_SEQ}
                                        optionLabel="CD_NAME"
                                        placeholder=""
                                    ></Dropdown>
                                </div>
                            </span>
                            <span
                                style={{
                                    height: "2rem",
                                    display: "inline-block",
                                    width: "30rem",
                                }}
                            >
                                <p style={{ width: "4rem", display: "inline-block", }}>REMARK2</p>
                                <InputText
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "25rem",
                                    }}
                                    id="id_REMARK2"
                                    value={dataKSV_ORDER_MST.REMARK2}
                                    onChange={(e) =>
                                        onInputChangeKSV_ORDER_MST_REMARK2(
                                            e,
                                            "REMARK2",
                                        )
                                    }
                                />
                            </span>
                            <span
                                style={{
                                    height: "2rem",
                                    display: "inline-block",
                                    width: "20rem",
                                }}
                            >
                                <p style={{ width: "4rem", display: "inline-block", }}>원인</p>
                                <div
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "15rem",
                                    }}
                                >
                                    <Dropdown
                                        id="id_SAMPLE_REASON"
                                        value={dataKSV_ORDER_MST_SAMPLE_REASON}
                                        onChange={(e) =>
                                            onDropdownChangeKSV_ORDER_MST_SAMPLE_REASON(
                                                e,
                                                "SAMPLE_REASON",
                                            )
                                        }
                                        options={
                                            datasKSV_ORDER_MST_SAMPLE_REASON
                                        }
                                        optionLabel="CD_NAME"
                                        placeholder=""
                                    ></Dropdown>
                                </div>
                            </span>
                            <span
                                style={{
                                    height: "2rem",
                                    display: "block",
                                    width: "30rem",
                                }}
                            >
                                <p style={{ width: "4rem", display: "inline-block", }}>Note</p>
                                <InputTextarea
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "25rem",
                                    }}
                                    rows={5}
                                    cols={30}
                                    value={dataKSV_ORDER_MST.REMARK}
                                    onChange={(e) =>
                                        onInputChangeKSV_ORDER_MST_REMARK(
                                            e,
                                            "REMARK",
                                        )
                                    }
                                />
                            </span>
                        </div>

                        <div
                            style={{
                                marginTop: "1rem",
                                width: "50rem",
                                height: "17rem",
                            }}
                        >
                            <AFDataTable preventUnrelatedRerender
                                ref={dt_KSV_PROD_MST}
                                value={datasKSV_PROD_MST}
                                size="small"
                                resizableColumns
                                columnResizeMode="fit"
                                showGridlines
                                selectionMode="multiple"
                                selection={selectedKSV_PROD_MST}
                                metaKeySelection={false}
                                onSelectionChange={(e) => {
                                    setFlagSelectModeKSV_PROD_MST(true);
                                    setSelectedKSV_PROD_MST(e.value);
                                    console.log(
                                        "selected length:" + e.value.length,
                                    );
                                }}
                                onRowClick={onRowClickKSV_PROD_MST}
                                dataKey="id"
                                className="datatable-responsive"
                                emptyMessage="No KSV_PROD_MST found."
                                header={headerKSV_PROD_MST}
                                responsiveLayout="scroll"
                                scrollable
                                scrollHeight="16rem"
                            >
                                <AFColumn field="COLOR" header=" 컬러" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                                <AFColumn field="PROD_CD" header="코드" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                                <AFColumn field="STYLE_CD" header=" 스타일코드" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                                <AFColumn field="PROD_TYPE" header=" 타입" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                                <AFColumn field="SEQ" header=" 번호" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                            </AFDataTable>
                        </div>
                        <div
                            style={{
                                marginTop: "0.5rem",
                                width: "50rem",
                                height: "2rem",
                            }}
                        >
                            <span
                                style={{
                                    width: "10rem",
                                    display: "inline-block",
                                }}
                            >
                                <p style={{ width: "5rem", display: "inline-block", }}>Add ship</p>
                                <div
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "3rem",
                                    }}
                                >
                                    <Checkbox
                                        style={{
                                            display: "inline-block",
                                            width: "2rem",
                                        }}
                                        id="id_ADD_SHIP"
                                        checked={changeCheckBoxVal(
                                            dataInAddShip,
                                        )}
                                        onChange={(e) =>
                                            onCheckboxChangeDataInAddShip(
                                                e,
                                                "ADD_SHIP",
                                            )
                                        }
                                    />
                                </div>
                            </span>
                            <span
                                style={{
                                    display: "inline-block",
                                    width: "19rem",
                                }}
                            >
                                <div
                                    style={{
                                        display: "inline-block",
                                        width: "18rem",
                                    }}
                                >
                                    <Button
                                        style={{ padding: "0rem" }}
                                        label="Add"
                                        icon="pi pi-check"
                                        className="p-button-text"
                                        onClick={makeSizeGrid}
                                    />
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ width: "100rem", height: "3rem" }}>
                <span
                    style={{ height: "2rem", display: "block", width: "33rem" }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Size</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_SIZE_GROUP"
                            value={dataKSV_ORDER_MST_SIZE_GROUP}
                            onChange={(e) =>
                                onDropdownChangeKSV_ORDER_MST_SIZE_GROUP(
                                    e,
                                    "SIZE_GROUP",
                                )
                            }
                            options={datasKSV_ORDER_MST_SIZE_GROUP}
                            optionLabel="SIZE_MEMBER"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
            </div>
            <div style={{ width: "100rem", height: "15rem" }}>
                <AFDataTable preventUnrelatedRerender
                    ref={dt_KSV_ORDER_MEM}
                    value={datasKSV_ORDER_MEM}
                    size="small"
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selection={selectedKSV_ORDER_MEM}
                    onSelectionChange={(e) => {
                        setSelectedKSV_ORDER_MEM(e.value);
                        console.log(
                            "selected length:" + selectedKSV_ORDER_MEM.length,
                        );
                    }}
                    onRowClick={onRowClickKSV_ORDER_MEM}
                    dataKey="id"
                    className="datatable-responsive"
                    emptyMessage="No KSV_ORDER_MEM found."
                    header={headerKSV_ORDER_MEM}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="13rem"
                >
                    <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                    {dynamicColumnsKSV_ORDER_MEM}
                </AFDataTable>
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(MgrKsvOrderRecordSub1, comparisonFn);
