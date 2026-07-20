// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0450_DELAY_REPORT = gql`
    input I_S0450_DELAY_REPORT_QRY_KSV_ORDER_MST {
        ORDER_CD: String
        PO_CD: String
        REF_ORDER_NO: String
        IS_MAIN: String
        IS_SAMPLE: String
        IS_SHIP: String
        IS_SHIP_DATE: String
        S_SHIP_DATE: String
        E_SHIP_DATE: String
        IS_DUEDATE: String
        S_DUE_DATE: String
        E_DUE_DATE: String
        STATUS_CD: String
        REG_USER: String
        STYLE_CD: String
        BUYER_CD: String
        BUYER_TEAM: String
        FACTORY_CD: String
    }

    type T_S0450_DELAY_REPORT_TBL_KSV_ORDER_MST {
        PO_CD: String
        ORDER_CD: String
        BUYER_CD: String
        BUYER_NAME: String
        REF_ORDER_NO: String
        STYLE_NAME: String
        STYLE_CD: String
        ORDER_DATE: String
        DUE_DATE: String
        MATL_DUE_DATE: String
        TOT_CNT: String
        ADD_CNT: String
        SHIP_CNT: String
        AVR_PRICE: String
        CURR_CD: String
        USD_PRICE: String
        FC_PRICE: String
        C_MATL_AMT: String
        C_ETC_AMT: String
        MARGIN: String
        MARGIN2: String
        STATUS_NAME: String
        END_STATUS: String
        REMARK: String
        REG_USER: String
        FACTORY_NAME: String
        FACTORY_CD: String
        REF_Q_OUTER: String
        REF_Q_LINER: String
        ETC_AMT: String
        MATL_AMT: String
        ORDER_TYPE: String
        ORDER_STATUS: String
        ORG_DUE_DATE: String
        ORDER_FLAG: String
        SAMPLE_FLAG: String
        MATL_SALE_FLAG: String
        FAC_LC_FLAG: String
        FAC_TT_FLAG: String
        PI_CD: String
        PU_CD: String
    }

    type T_S0450_DELAY_REPORT_REG_USER {
        REG_USER: String
        CNT: Int
    }

    input I_S0450_CODE {
        BUYER_CD: String
        VENDOR_CD: String
        PO_CD: String
    }

    type T_S0450_DELAY_REPORT_CODE {
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        VENDOR_CD: [BASE_QRY_KCD_VENDOR!]!
        PO_CD: [BASE_QRY_KSV_PO_MST!]!
        MATL_TYPE: [BASE_QRY_KCD_CODE!]!
        VENDOR_TYPE: [BASE_QRY_KCD_CODE!]!
    }

    input I_S0450_ORDER_SHEET_NORMAL {
        ORDER_CD: String
    }

    type T_S0450_ORDER_SHEET_NORMAL {
        id: Int
        CODE: String
    }

    type T_S0450_KSV_ORDER_FOB {
        FOB_SEQ: String
        SHIP_QTY: String
        FOB: String
        FOB100: String
    }
    input I_S0450_KSV_ORDER_FOB {
        ORDER_CD: String
    }

    type T_S0450_DELAY_REPORT {
        REG_DATETIME: String
        PO_CD: String
        BUYER_CD: String
        VENDOR_TYPE: String
        PO_CONF_DATE: String
        TARGET_ETD: String
        TARGET_ETA: String
        VENDOR_NAME: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        NEED_QTY: String

        S_IN_QTY: String
        S_OUT_QTY: String
        S_FAC_IN_QTY: String

        REMAIN_QTY_IN: String
        REMAIN_QTY_OUT: String
        REMAIN_QTY_FAC_IN: String

        DELAY_REASON: String
        REMARK: String
        EX_IN_DATE: String
        CUT_DATE: String
        ETD: String
        ETA: String
        DELIVERY_TYPE: String
        FARE_TYPE: String
        MATL_CD1: String
        SEQ: String
        PO_CONF_DATE2: String
        TARGET_ETD2: String
        TARGET_ETA2: String
        SHIP_QTY: String
        END_FLAG: String
        EX_IN_DATE2: String
        UPD_USER: String
        TOT_CNT: String
        PU_CD: String
    }
    input I_S0450_DELAY_REPORT {
        FACTORY_CD: String
        BUYER_CD: String
        VENDOR_TYPE: String
        VENDOR_CD: String
        PO_CD: String
        MATL_TYPE: String
        IS_NO_INPUT: String
        IS_NO_OUTPUT: String
        IS_PRICE_0: String
        S_TARGET_ETD: String
        E_TARGET_ETD: String
        UPLOAD: String
        PU_CD: String
    }

    type Query {
        mgrQuery_S0450_DELAY_REPORT(
            data: I_S0450_DELAY_REPORT!
        ): [T_S0450_DELAY_REPORT!]!
        mgrQuery_S0450_DELAY_REPORT_EXCEL(
            data: I_S0450_DELAY_REPORT!
        ): [T_S0450_DELAY_REPORT!]!
        mgrQuery_S0450_DELAY_REPORT_CODE(
            data: I_S0450_CODE!
        ): T_S0450_DELAY_REPORT_CODE!

        mgrQuery_S0450_DELAY_REPORT_TBL_KSV_ORDER_MST(
            data: I_S0450_DELAY_REPORT_QRY_KSV_ORDER_MST!
        ): [T_S0450_DELAY_REPORT_TBL_KSV_ORDER_MST!]!
        mgrQuery_S0450_ORDER_SHEET_NORMAL(
            data: I_S0450_ORDER_SHEET_NORMAL!
        ): [T_S0450_ORDER_SHEET_NORMAL!]!
        mgrQuery_S0450_ORDER_SHEET_COMBINE(
            data: I_S0450_ORDER_SHEET_NORMAL!
        ): [T_S0450_ORDER_SHEET_NORMAL!]!
        mgrQuery_S0450_ORDER_QTY(
            data: [I_S0450_ORDER_SHEET_NORMAL!]!
        ): [T_S0450_ORDER_SHEET_NORMAL!]!
        mgrQuery_S0450_KSV_ORDER_FOB(
            data: I_S0450_KSV_ORDER_FOB!
        ): [T_S0450_KSV_ORDER_FOB!]!
    }
`;

export default moduleTypedefs_S0450_DELAY_REPORT;
