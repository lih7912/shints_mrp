// MGR_S0607_4_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0607_4_1 = gql`
    type T_S0607_4_1 {
        PU_CD: String
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
        MRP_QTY1: String
        STOCK_QTY: String
        MOQ_QTY: String
        PO_QTY: String
        CURR_CD: String
        MASTER_PRICE: String
        MOQ_AMT: String
        MOQ_PRICE: String
        FREIGHT_AMT: String
        FREIGHT_PRICE: String
        OTHER_AMT: String
        OTHER_PRICE: String
        SURCHAGE_REMARK: String
        PO_PRICE: String
    }

    input I_S0607_4_1 {
        PO_CD: String
        BUYER_CD: String
        VENDOR_CD: String
        MATL_TYPE: String
        PU_CD2: String
    }

    type T_S0607_4_2_0 {
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
    }

    type T_S0607_4_2 {
        PU_MST: [T_S0607_4_2_0!]!
        STOCK_MEM: [T_S0607_4_1!]!
    }

    input I_S0607_4_2 {
        PU_CD: String
    }

    type Query {
        mgrQueryS0607_4_1(data: I_S0607_4_1!): T_S0607_4_2!
        mgrQueryS0607_4_2(data: I_S0607_4_2!): T_S0607_4_2!
    }
`;

export default moduleTypedefs_S0607_4_1;
