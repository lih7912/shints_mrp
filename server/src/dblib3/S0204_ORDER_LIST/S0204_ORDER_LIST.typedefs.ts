// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0204_ORDER_LIST = gql`
    input I_S0204_ORDER_LIST_QRY_KSV_ORDER_MST {
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
        S_ORDER_DATE: String
        E_ORDER_DATE: String
    }

    type T_S0204_ORDER_LIST_TBL_KSV_ORDER_MST {
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
        ETD: String
        ORDER_QTY: String
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
        PRICE_TERM: String
        REMARK: String
        BUYER_TEAM_N: String
    }

    type T_S0204_ORDER_LIST_REG_USER {
        REG_USER: String
        CNT: Int
    }

    input I_S0204_CODE {
        BUYER_CD: String
        STYLE_CD: String
    }

    type T_S0204_ORDER_LIST_CODE {
        STATUS_CD: [BASE_QRY_KCD_CODE!]!
        BUYER_TEAM: [BASE_QRY_KCD_CODE!]!
        REG_USER: [BASE_QRY_KCD_USER!]!
        STYLE: [BASE_QRY_KCD_STYLE!]!
        BUYER: [BASE_QRY_KCD_BUYER!]!
        FACTORY: [BASE_QRY_KCD_FACTORY!]!
        CURR_CD: [BASE_QRY_KCD_CODE!]!
    }

    input I_S0204_ORDER_SHEET_NORMAL {
        ORDER_CD: String
    }

    type T_S0204_ORDER_SHEET_NORMAL {
        id: Int
        CODE: String
    }

    input I_S0204_ORDER_SHEET_COMBINE {
        ORDERS: [I_S0204_ORDER_SHEET_NORMAL!]!
    }

    type T_S0204_KSV_ORDER_FOB {
        FOB_SEQ: String
        SHIP_QTY: String
        FOB: String
        FOB100: String
    }
    input I_S0204_KSV_ORDER_FOB {
        ORDER_CD: String
    }

    type T_S0204_ORDER_LIST_TBL_KSV_ORDER_MST_0 {
        message: String!
        datas: [T_S0204_ORDER_LIST_TBL_KSV_ORDER_MST]!
    }

    type Query {
        mgrQuery_S0204_ORDER_LIST_TBL_KSV_ORDER_MST(
            data: I_S0204_ORDER_LIST_QRY_KSV_ORDER_MST!
        ): T_S0204_ORDER_LIST_TBL_KSV_ORDER_MST_0!
        mgrQuery_S0204_ORDER_SHEET_NORMAL(
            data: I_S0204_ORDER_SHEET_NORMAL!
        ): [T_S0204_ORDER_SHEET_NORMAL!]!
        mgrQuery_S0204_ORDER_SHEET_COMBINE(
            data: I_S0204_ORDER_SHEET_COMBINE!
        ): [T_S0204_ORDER_SHEET_NORMAL!]!
        mgrQuery_S0204_ORDER_LIST(
            data: I_S0204_ORDER_LIST_QRY_KSV_ORDER_MST!
        ): [T_S0204_ORDER_SHEET_NORMAL!]!
        mgrQuery_S0204_ORDER_LIST_bak(
            data: I_S0204_ORDER_LIST_QRY_KSV_ORDER_MST!
        ): [T_S0204_ORDER_SHEET_NORMAL!]!
        mgrQuery_S0204_ORDER_QTY(
            data: [I_S0204_ORDER_SHEET_NORMAL!]!
        ): [T_S0204_ORDER_SHEET_NORMAL!]!
        mgrQuery_S0204_ORDER_LIST_CODE(
            data: I_S0204_CODE!
        ): T_S0204_ORDER_LIST_CODE!
        mgrQuery_S0204_KSV_ORDER_FOB(
            data: I_S0204_KSV_ORDER_FOB!
        ): [T_S0204_KSV_ORDER_FOB!]!
        mgrQuery_S0204_ORDER_LIST_TBL_KSV_ORDER_MST_bak(
            data: I_S0204_ORDER_LIST_QRY_KSV_ORDER_MST!
        ): T_S0204_ORDER_LIST_TBL_KSV_ORDER_MST_0!
    }
`;

export default moduleTypedefs_S0204_ORDER_LIST;
