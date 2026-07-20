// MGR_S040102_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S040102_5 = gql`
    input I_S040102_5 {
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

    input I_S040102_5_1 {
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

    input I_S040102_5_edit {
        PU_STATUS: String
        PU_CD: String
        VENDOR_CD: String
        VENDOR_CD_0: String
        VENDOR_TYPE: String
        REG_USER: String
        BUYER_CD: String
        PAY_TERM: String
        PAY_TYPE: String
        PO_CD1: String
        MRP_DATE: String
        NORMI: String
        OVER_SHORT: String
        PO_CD2: String
        TARGET_ETA: String
        CURR_CD: String
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
        CURR_CD2: String
    }

    input I_S040102_5_tbl1 {
        BUYER_CD: String
        VENDOR_CD: String
        MATL_TYPE: String
        PO_CD: String
        S_MRP_QTY: String
        S_PO_QTY: String
        S_PO_AMT: String
        S_STOCK_QTY: String
        FACTORY_CD: String
        MATL_DUE_DATE: String
        PROD_DUE_DATE: String
        PLAN_FLAG: String
        PLAN_ETD: String
        PLAN_ETA: String
        BUYER_NAME: String
        VENDOR_NAME: String
        FACTORY_NAME: String
        PU_CD2: String
        PU_STATUS: String
        MRP_DATE: String
        PO_SEQ: String
        VENDOR_TYPE: String
        PAY_TERM: String
        PAY_TYPE: String
        CURR_CD: String
        PI_NO: String
        ORDER_DATE: String
        BILL_TO: String
        PAY_DATE: String
        PLACE_CD: String
        SHIP_TO: String
        ORIGIN_PORT: String
        TRADE_TERM: String
        NORMI: String
    }

    input I_S040102_5_tbl2_sub_1 {
        MRP_QTY: String
        STOCK_QTY: String
        MOQ_QTY: String
        OVER_QTY: String
        FOC_QTY: String
        LEFTOVER_QTY: String
        BEF_PO_QTY: String
        PO_QTY: String
        DIFF_QTY: String
        PO_UPDATE_QTY: String
        MASTER_PRICE: String
        PO_PRICE: String
        SURCHARGE_AMT: String
    }

    input I_S040102_5_tbl2_sub {
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
        STATUS: String
        MIN_CONF_USER: String
        PU_STATUS: String
        FACTORY_CD: String
        DIFF: String
        OVER_QTY: String
        FOC_QTY: String
        LEFTOVER_QTY: String
        SAVE_DATA: I_S040102_5_tbl2_sub_1!
    }

    input I_S040102_5_tbl2 {
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
        STATUS: String
        MIN_CONF_USER: String
        PU_STATUS: String
        FACTORY_CD: String
        DIFF: String
        OVER_QTY: String
        FOC_QTY: String
        LEFTOVER_QTY: String
        DATAS: [I_S040102_5_tbl2_sub!]!
    }

    input I_S040102_5_2 {
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
        MIN_CONF_USER: String
    }

    input I_S040102_5_1 {
        PU_CD: String
    }

    input I_S040102_5_INSERT_DEPOSIT {
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

    input I_S040102_5_INSERT_LC {
        PU_CD: String
        REG_USER: String
        BUYER_NAME: String
        VENDOR_NAME: String
        TRADE_TERM: String
        AMOUNT: String
        PAY_BANK: String
        PAY_DATE: String
        OVERSHORT_RATE: String
        EXPIRY_DATE: String
        LATEST_SHIP_DATE: String
        SHIP_MODE: String
        SHIP_DATE: String
    }

    input I_S040102_5_INSERT_LC_2 {
        PO_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        PO_QTY: String
        PO_PRICE: String
        AMOUNT: String
    }

    type Ret_S040102_5 {
        CODE: String
        id: String
    }

    input I_S040102_5_FILE_INFO {
        FILE_KEY: String
        TITLE: String
        NAME: String
        URL: String
        OBJECT_NAME: String
    }

    input I_S040102_5_UPDATE_MEMO {
        PU_CD: String
        MEMO: String
    }

    type Mutation {
        mgrInsert_S040102_5_pu_mst(
            datas: I_S040102_5_edit!
            datas1: [I_S040102_5_tbl1!]!
            datas2: [I_S040102_5_tbl2!]!
        ): [Ret_S040102_5!]!
        mgrDelete_S040102_5(datas: I_S040102_5_1!): [Ret_S040102_5!]!
        mgrInsert_S040102_5_INSERT_DEPOSIT(
            datas: I_S040102_5_INSERT_DEPOSIT!
        ): [Ret_S040102_5!]!
        mgrInsert_S040102_5_CANCEL_DEPOSIT(
            datas: I_S040102_5_INSERT_DEPOSIT!
        ): [Ret_S040102_5!]!
        mgrInsert_S040102_5_INSERT_LC(
            datas: I_S040102_5_INSERT_LC!
            datas1: [I_S040102_5_INSERT_LC_2!]!
        ): [Ret_S040102_5!]!
        mgrInsert_S040102_5_CANCEL_LC(
            datas: I_S040102_5_INSERT_LC!
        ): [Ret_S040102_5!]!
        mgrInsert_S040102_5_MOQ_CONFIRM(
            datas: [I_S040102_5_tbl2!]!
        ): [Ret_S040102_5!]!
        mgrInsert_S040102_5_MOQ_CANCEL(
            datas: [I_S040102_5_tbl2!]!
        ): [Ret_S040102_5!]!
        mgrInsert_S040102_5_FILE_ADD(
            datas: I_S040102_5_FILE_INFO!
        ): [Ret_S040102_5!]!
        mgrInsert_S040102_5_FILE_UPDATE(
            datas: I_S040102_5_FILE_INFO!
        ): [Ret_S040102_5!]!
        mgrInsert_S040102_5_FILE_DELETE(
            datas: I_S040102_5_FILE_INFO!
        ): [Ret_S040102_5!]!
        mgrUpdate_S040102_5_UPDATE_MEMO(
            datas: I_S040102_5_UPDATE_MEMO!
        ): [Ret_S040102_5!]!
    }
`;

export default moduleTypedefs_S040102_5;
