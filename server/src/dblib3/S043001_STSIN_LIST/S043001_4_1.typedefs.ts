// MGR_S043001_4_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S043001_4_1 = gql`
    type T_S043001_4_1 {
        REG_USER: String
        BUYER_CD: String
        BUYER_NAME: String
        PO_CD: String
        PO_SEQ: String
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: String
        MATL_SEQ: String
        VENDOR_CD: String
        VENDOR_NAME: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        MRP_QTY: String
        MOQ: String
        LEFTOVER_QTY: String
        PO_QTY: String
        FOC_QTY: String
        SHIP_QTY: String
        IN_QTY: String
        IN_CURR_CD: String
        MASTER_PRICE: String
        FREIGHT_PRICE: String
        MOQ_PRICE: String
        IN_PRICE: String
        IN_AMT: String
        PAY_TYPE: String
        PAY_DATE: String
        OUT_QTY: String
        OUT_STATUS: String
        BILL_FLAG: String
        BILL_DATE: String
        PU_CD: String
        MOQ_STOCK_IDX: String
        FOC_STOCK_IDX: String
        LEFTOVER_STOCK_IDX: String
        IN_DATETIME: String
        STSIN_CD: String
    }

    input I_S043001_4_1 {
        PO_CD: String
        BUYER_CD: String
        VENDOR_CD: String
        MATL_TYPE: String
    }

    type T_S043001_4_2_0 {
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
        DEPOSIT_AMT: Float
        DEPOSIT_FIX: Float
        NORMI: String
        TRADE_TERM: String
        ORDER_DATE: String
        DELIVERY_DATE: String
        FORWARD: String
        PI_NO: String
        PI_FILE: String
        SHIP_MODE: String
        PO_CD2: String
        TARGET_ETA: String
        PU_TYPE: String
    }

    type T_S043001_4_2 {
        PU_CD: String
        PO_CD: String
        STSIN_CD: String
        REG_USER: String
        BUYER_CD: String
        VENDOR_CD: String
        VENDOR_NAME: String
        MATL_TYPE: String
        TRADE_TERM: String
        BILL_TO: String
        CURR_CD: String

        PO_AMT: String
        PO_QTY: String
        STOCK_AMT: String
        STSIN_AMT: String
        STSIN_QTY: String
        MOQ_AMT: String
        S_WEIGHT: String

        STSIN_TYPE: String
        EX_FACTORY: String
        PAY_DATE: String
        IN_DATETIME: String
        PAY_TERM: String
        PAY_CONDITION: String
        LEADER_CONFIRM: String
        MOQ_CONFIRM: String
        SURCHARGE_CONFIRM: String
        SURCHARGE_AMT: String
        OVERSHORT: String
        OVERSHORT_NAME: String
    }

    type T_S043001_4_2_1 {
        VENDOR_CD: String
        VENDOR_NAME: String
        PU_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        IN_DATETIME: String
        REG_USER: String
        BUYER_CD: String
        MATL_TYPE: String
        TRADE_TERM: String
        BILL_TO: String
        CURR_CD: String
        EX_FACTORY: String
        PAY_DATE: String
        PAY_TERM: String
        PAY_CONDITION: String
        OVERSHORT: String
        STSIN_CD: String
        PO_CD: String
        STSIN_QTY: String
        LC_QTY: String
        OVER_QTY: String
        FOC_QTY: String
        MOQ_QTY: String
        STSIN_AMT: String
        S_WEIGHT: String
        PO_AMT: String
        PO_QTY: String
        STOCK_AMT: String
        MOQ_AMT: String
        SURCHARGE_AMT: String
        OVERSHORT_NAME: String
        STSIN_TYPE: String
        LEADER_CONFIRM: String
        MOQ_CONFIRM: String
        SURCHARGE_CONFIRM: String
        PO_PRICE: String
        PAY_PRICE: String
        ORG_PO_PRICE: String
        ORG_PAY_PRICE: String
    }

    input I_S043001_4_2 {
        PU_CD: String
        VENDOR_CD: String
        S_EX_FACTORY: String
        E_EX_FACTORY: String
        REG_USER: String
        VENDOR_TYPE: String
        S_PAY_DATE: String
        E_PAY_DATE: String
        BUYER_CD: String
        BILL_TO: String
        SHIP_TO: String
        PO_CD: String
        MATL_CD: String
        MATL_NAME: String
    }

    type Query {
        mgrQueryS043001_4_1(data: I_S043001_4_1!): [T_S043001_4_1!]!
        mgrQueryS043001_4_2(data: I_S043001_4_2!): [T_S043001_4_2_1!]!
        mgrQueryS043001_4_2_1211(data: I_S043001_4_2!): [T_S043001_4_2_1!]!
        mgrQueryS043001_4_2_bak(data: I_S043001_4_2!): [T_S043001_4_2!]!
        mgrQueryS043001_4_2_bak1(data: I_S043001_4_2!): [T_S043001_4_2!]!
        mgrQueryS043001_4_2_bak2(data: I_S043001_4_2!): [T_S043001_4_2!]!
        mgrQueryS043001_4_2_bak3(data: I_S043001_4_2!): [T_S043001_4_2!]!
        mgrQueryS043001_4_2_1(data: I_S043001_4_2!): [T_S043001_4_1!]!
    }
`;

export default moduleTypedefs_S043001_4_1;
