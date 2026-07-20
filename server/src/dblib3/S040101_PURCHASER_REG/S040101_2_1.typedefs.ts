// MGR_S040101_2_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S040101_2_1 = gql`
    type T_S040101_2_1_NEW {
        PU_CD: String
        PU_STATUS: String
        BUYER_NAME: String
        BUYER_CD: String
        CURR_CD: String
        PO_CD: String
        VENDOR_NAME: String
        VENDOR_CD: String
        VENDOR_TYPE: String
        VENDOR_MATL_TYPE: String
        MRP_DATE: String
        FACTORY_NAME: String
        MATL_DUE_DATE: String
        PO_SEQ: String
        PO_QTY: String
        MATL_AMT: String
    }

    type T_S040101_2_1_NEW_0 {
        DATAS: [T_S040101_2_1_NEW!]!
        MESSAGE: String
    }

    type T_S040101_2_1 {
        VENDOR_CD: String
        VENDOR_NAME: String
        VENDOR_MATL_TYPE: String
        VENDOR_TYPE: String
        VENDOR_TYPE_N: String
        PAY_TERM: String
        PAY_TYPE: String
        OVERSHORT_RATE: String
        PO_CD: String
        PU_CD: String
        PO_QTY: String
        MATL_AMT: String
        P_PU_CD: String
        P_CURR_CD: String
        P_PI_NO: String
        P_ORDER_DATE: String
        P_DUE_DATE: String
        P_EX_FACTORY: String
        P_NORMI: String
        P_BILL_TO: String
        P_PAY_DATE: String
        P_PLACE_CD: String
        P_SHIP_TO: String
        ORIGIN_PORT: String
        TRADE_TERM: String
        BUYER_CD: String
        BUYER_NAME: String
        MRP_DATE: String
        PLAN_FLAG: String
        PLAN_ETD: String
        FACTORY_CD: String
        FACTORY_NAME: String
        PROD_DUE_DATE: String
        MATL_DUE_DATE: String
        STOCK_QTY: String
        MRP_QTY: String
        OLD_PO_QTY: String
    }

    input I_S040101_2_1 {
        PU_STATUS: String
        BUYER_CD: String
        VENDOR_TYPE: String
        S_MRP_DATE: String
        E_MRP_DATE: String
        PO_CD: String
        VENDOR_CD: String
        S_MATL_ETA: String
        E_MATL_ETA: String
        PU_CD: String
        USER_ID: String
        IS_NOT_FIX: String
    }

    type T_S040101_2_1_NEW_1 {
        message: String
        datas: [T_S040101_2_1_NEW!]!
    }

    type Query {
        mgrQueryS040101_2_1(data: I_S040101_2_1!): T_S040101_2_1_NEW_1!
        mgrQueryS040101_2_1_bak(data: I_S040101_2_1!): [T_S040101_2_1!]!
        mgrQueryS040101_2_1_bak2(data: I_S040101_2_1!): [T_S040101_2_1!]!
        mgrQueryS040101_2_1_bak3(data: I_S040101_2_1!): [T_S040101_2_1!]!
        mgrQueryS040101_2_1_bak4(data: I_S040101_2_1!): [T_S040101_2_1!]!
        mgrQueryS040101_2_1_bak5(data: I_S040101_2_1!): T_S040101_2_1_NEW_1!
        mgrQueryS040101_2_1_bak6(data: I_S040101_2_1!): [T_S040101_2_1!]!
        mgrQueryS040101_2_1_bak7(data: I_S040101_2_1!): [T_S040101_2_1!]!
        mgrQueryS040101_2_1_bak8(data: I_S040101_2_1!): [T_S040101_2_1!]!
        mgrQueryS040101_2_1_bak9(data: I_S040101_2_1!): T_S040101_2_1_NEW_1!
        mgrQueryS040101_2_1_bak10(data: I_S040101_2_1!): T_S040101_2_1_NEW_1!
        mgrQueryS040101_2_1_bak11(data: I_S040101_2_1!): T_S040101_2_1_NEW_1!
    }
`;

export default moduleTypedefs_S040101_2_1;
