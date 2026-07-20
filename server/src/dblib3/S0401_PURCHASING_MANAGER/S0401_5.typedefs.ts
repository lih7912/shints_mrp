// MGR_S0401_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0401_5 = gql`
    input I_S0401_5 {
        BUYER_CD: String
        VENDOR_CD: String
        MATL_TYPE: String
        PO_CD: String
        S_PO_QTY: String
        FACTORY_CD: String
        MATL_DUE_DATE: String
        PROD_DUE_DATE: String
        PLAN_FLAG: String
        PLAN_ETD: String
        PLAN_ETA: String
    }

    input I_S0401_5_1 {
        PU_CD: String
        BUYER_CD: String
        PO_CD2: String
        VENDOR_CD: String
        VENDOR_NAME: String
        MATL_TYPE: String
        REG_USER: String
        SHIP_TO: String
        BILL_TO: String
        BILL_TYPE: String
        DEPOSIT_AMT: String
        DEPOSIT_FIX: String
        PI_NO: String
        ORDER_DATE: String
        DELIVERY_DATE: String
        EXP_DELIVERY_DATE: String
        PAY_DATE: String
        PLACE_CD: String
        NORMI: String
        TRADE_TERM: String
        SHIP_MODE: String
        CURR_CD: String
        FACTORY_CD: String
        LC_FLAG: String
        PAY_AMT: String
        DEPOSIT_REQUEST: String
        LC_REQUEST: String
        ORIGIN_PORT: String
    }

    input I_S0401_5_2 {
        PO_CD: String
        PO_SEQ: String
        ORDER_CD: String
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
        DIFF_QTY: String
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
        STATUS: String
    }

    input I_S0401_5_1 {
        PU_CD: String
    }

    input I_S0401_5_3 {
        PU_CD: String
        REG_USER: String
        VENDOR_NAME: String
        PAY_CONDITION: String
        CURRENCY: String
        AMOUNT: String
        DEPOSIT_AMOUNT: String
        DEPOSIT_RATE: String
        PAY_BANK: String
        PAY_DATE: String
    }

    input I_S0401_5_4 {
        PU_CD: String
        REG_USER: String
        BUYER_NAME: String
        VENDOR_NAME: String
        TRADE_TERM: String
        AMOUNT: String
        PAY_BANK: String
        PAY_DATE: String
    }

    type Ret_S0401_5 {
        CODE: String
        id: String
    }

    input I_S0401_UPDATE_END {
        PU_CD: String
    }

    type Mutation {
        mgrInsert_S0401_5_1(
            datas: [I_S0401_5_1!]!
            datas1: [I_S0401_5_2!]!
        ): [Ret_S0401_5!]!
        mgrDelete_S0401_5(datas: I_S0401_5_1!): [Ret_S0401_5!]!
        mgrInsert_S0401_5_3(datas: I_S0401_5_3!): [Ret_S0401_5!]!
        mgrInsert_S0401_5_4(datas: I_S0401_5_4!): [Ret_S0401_5!]!
        mgrInsert_S0401_UPDATE_END(
            datas: [I_S0401_UPDATE_END!]!
        ): [Ret_S0401_5!]!
    }
`;

export default moduleTypedefs_S0401_5;
