// MGR_S040101_4_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S040101_4_1 = gql`
    type T_S040101_4_1_SUB {
        PU_STATUS: String
        PO_CD: String
        PO_SEQ: String
        ORDER_CD: String
        VENDOR_CD: String
        MATL_CD: String
        MRP_SEQ: String
        MATL_SEQ: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        MRP_QTY: String
        MRP_QTY0: String
        MRP_QTY1: String
        STOCK_QTY: String
        MOQ_QTY: String
        PO_QTY: String
        BEF_PO_QTY: String
        OVER_QTY: String
        FOC_QTY: String
        LEFTOVER_QTY: String
        DIFF_QTY: String
        PO_UPDATE_QTY: String
        CURR_CD: String
        FACTORY_CD: String
        MASTER_PRICE: String
        SURCHARGE_AMT: String
        SURCHARGE_PRICE: String
        SURCHARGE_REMARK: String
        PO_PRICE: String
        PU_CD: String
        MRP_QTY2: String
    }

    type T_S040101_4_1 {
        PU_STATUS: String
        PO_CD: String
        PO_SEQ: String
        ORDER_CD: String
        VENDOR_CD: String
        MATL_CD: String
        MRP_SEQ: String
        MATL_SEQ: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        MRP_QTY: String
        MRP_QTY0: String
        MRP_QTY1: String
        STOCK_QTY: String
        MOQ_QTY: String
        OVER_QTY: String
        FOC_QTY: String
        LEFTOVER_QTY: String
        PO_QTY: String
        BEF_PO_QTY: String
        DIFF_QTY: String
        PO_UPDATE_QTY: String
        CURR_CD: String
        FACTORY_CD: String
        MASTER_PRICE: String
        SURCHARGE_AMT: String
        SURCHARGE_PRICE: String
        SURCHARGE_REMARK: String
        PO_PRICE: String
        PU_CD: String
        MRP_QTY2: String
        DATAS: [T_S040101_4_1_SUB!]!
    }

    input I_S040101_4_1 {
        PO_CD: String
        BUYER_CD: String
        VENDOR_CD: String
        CURR_CD:String
        MATL_TYPE: String
        PU_CD2: String
        IN_PO_SEQ: String
        IN_PO_CD: String
        IN_PO_SEQ2: String
        IN_PO_CD2: String
        LAST: String
        PU_CD: String
        PU_SEQ: String
        PO_SEQ: String
        SEARCH_INDEX: String
    }

    type T_S040101_4_2_0 {
        PU_CD: String
        VENDOR_CD: String
        BUYER_CD: String
        FACTORY_CD: String
        PU_DATE: String
        REG_USER: String
        REG_DATETIME: String
        PU_STATUS: String
        MATL_TYPE: String
        BILL_TO: String
        SHIP_TO: String
        CURR_CD: String
        DEPOSIT_AMT: String
        DEPOSIT_FIX: String
        LC_FLAG: String
        LC_AMT: String
        NORMI: String
        TRADE_TERM: String
        ORDER_DATE: String
        DELIVERY_DATE: String
        EXP_DELIVERY_DATE: String
        PAY_DATE: String
        FORWARD: String
        PI_NO: String
        PI_FILE: String
        SHIP_MODE: String
        PO_CD2: String
        TARGET_ETA: String
        PU_TYPE: String
        DEPOSIT_GW_STATUS: String
        ORIGIN_PORT: String
        MEMO: String
        PU_STATUS2: String
        PAY_TYPE: String
        PAY_CONDITION: String
    }

    type T_S040101_4_2_NEW {
        VENDOR_CD: String
        VENDOR_NAME: String
        VENDOR_MATL_TYPE: String
        VENDOR_TYPE: String
        VENDOR_TYPE_N: String
        PAY_TERM: String
        PAY_TYPE: String
        PAY_TYPE_N: String
        PAY_CONDITION: String
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

    type T_S040101_4_2 {
        PU_MST_NEW: [T_S040101_4_2_NEW!]!
        PU_MST: [T_S040101_4_2_0!]!
        STOCK_MEM: [T_S040101_4_1!]!
    }

    input I_S040101_4_2 {
        PU_CD: String
    }

    type Query {
        mgrQueryS040101_4_1(data: I_S040101_4_1!): T_S040101_4_2!
        mgrQueryS040101_4_2(data: I_S040101_4_2!): T_S040101_4_2!
        mgrQueryS040101_4_1_bak(data: I_S040101_4_1!): T_S040101_4_2!
        mgrQueryS040101_4_1_bak1(data: I_S040101_4_1!): T_S040101_4_2!
        mgrQueryS040101_4_1_bak2(data: I_S040101_4_1!): T_S040101_4_2!
        mgrQueryS040101_4_1_bak3(data: I_S040101_4_1!): T_S040101_4_2!
    }
`;

export default moduleTypedefs_S040101_4_1;
