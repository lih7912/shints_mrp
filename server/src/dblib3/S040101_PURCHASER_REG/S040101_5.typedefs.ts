// MGR_S040101_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S040101_5 = gql`
    input I_S040101_5 {
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

    input I_S040101_5_1 {
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

    input I_S040101_5_edit {
        PU_CD: String
        VENDOR_CD: String
        VENDOR_TYPE: String
        VENDOR_TYPE_N: String
        REG_USER: String
        BUYER_CD: String
        PAY_TERM: String
        PO_CD1: String
        MRP_DATE: String
        NORMI: String
        OVER_SHORT: String
        PO_CD2: String
        TARGET_ETA: String
        CURR_CD: String
        CURR_CD2: String
        PI_NO: String
        PO_CD3: String
        ORDER_DATE: String
        PAY_AMT: String
        PI_FILE: String
        PO_CD4: String
        DUE_DATE: String
        BILL_TO: String
        PO_CD5: String
        EX_FACTORY: String
        PAY_DATE: String
        PO_CD6: String
        FORWARDER: String
        SHIP_TO: String
        ORIGIN_PORT: String
        TRADE_TERM: String
        PAY_CONDITION: String
    }

    input I_S040101_5_tbl1 {
        VENDOR_CD: String
        VENDOR_NAME: String
        VENDOR_MATL_TYPE: String
        VENDOR_TYPE: String
        VENDOR_TYPE_N: String
        PAY_TERM: String
        PAY_TYPE: String
        OVERSHORT_RATE: String
        CURR_CD: String
        PO_CD: String
        PO_SEQ: String
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
        PU_STATUS: String
        OLD_PO_QTY: String
        PAY_CONDITION: String
    }

    input I_S040101_5_tbl2_sub {
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
        CURR_CD: String
        FACTORY_CD: String
        MASTER_PRICE: String
        SURCHARGE_AMT: String
        SURCHARGE_PRICE: String
        SURCHARGE_REMARK: String
        SURCHAGE_REMARK: String
        PO_PRICE: String
        PU_CD: String
        MRP_QTY2: String
        PO_UPDATE_QTY: String
        DIFF_QTY: String
        PU_STATUS: String
    }

    input I_S040101_5_tbl2 {
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
        CURR_CD: String
        FACTORY_CD: String
        MASTER_PRICE: String
        SURCHARGE_AMT: String
        SURCHARGE_PRICE: String
        SURCHARGE_REMARK: String
        SURCHAGE_REMARK: String
        PO_PRICE: String
        PU_CD: String
        MRP_QTY2: String
        PO_UPDATE_QTY: String
        DIFF_QTY: String
        PU_STATUS: String
        DATAS: [I_S040101_5_tbl2_sub!]!
    }

    input I_S040101_5_2 {
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
        PU_STATUS: String
    }

    input I_S040101_5_1 {
        PU_CD: String
    }

    input I_S040101_5_3 {
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

    input I_S040101_5_4 {
        PU_CD: String
        REG_USER: String
        BUYER_NAME: String
        VENDOR_NAME: String
        TRADE_TERM: String
        AMOUNT: String
        PAY_BANK: String
        PAY_DATE: String
    }

    type Ret_S040101_5 {
        CODE: String
        id: String
    }

    input I_S040101_UPDATE_MATL_PRICE {
        MATL_CD: String
        MATL_PRICE: String
        CURR_CD: String
        UPDATE_REASON: String
        PU_CD: String
        PO_CD: String
        PO_PRICE: String
    }

    type Mutation {
        mgrInsert_S040101_5_pu_mst(
            datas: I_S040101_5_edit!
            datas1: [I_S040101_5_tbl1!]!
            datas2: [I_S040101_5_tbl2!]!
        ): [Ret_S040101_5!]!
        mgrInsert_S040101_5_pu_mst_not_order(
            datas: I_S040101_5_edit!
            datas1: [I_S040101_5_tbl1!]!
            datas2: [I_S040101_5_tbl2!]!
        ): [Ret_S040101_5!]!
        mgrDelete_S040101_5(datas: I_S040101_5_1!): [Ret_S040101_5!]!
        mgrInsert_S040101_5_3(datas: I_S040101_5_3!): [Ret_S040101_5!]!
        mgrInsert_S040101_5_4(datas: I_S040101_5_4!): [Ret_S040101_5!]!
        mgrUpdate_S040101_UPDATE_MATL_PRICE(
            datas: [I_S040101_UPDATE_MATL_PRICE!]!
        ): [Ret_S040101_5!]!
    }
`;

export default moduleTypedefs_S040101_5;
