// MGR_S040102_4_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S040102_4_1 = gql`
    type T_S040102_4_1 {
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
        CURR_CD: String
        MASTER_PRICE: String
        SURCHARGE_AMT: String
        SURCHARGE_PRICE: String
        SURCHARGE_REMARK: String
        PO_PRICE: String
        PU_CD: String
        MRP_QTY2: String
        DIFF_QTY: String
        MIN_CONF_USER: String
        PU_STATUS: String
    }

    input I_S040102_4_1 {
        PU_CD: String
    }

    input I_S040102_4_LOG {
        PU_CD: String
        PU_SEQ: String
    }

    type T_S040102_4_2_0 {
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
        LC_AMT: String
        DEBIT_AMT: String
        CRDB_CD: String
        OVERSHORT_RATE: String
        DUE_DATE: String
        EX_FACTORY: String
        MEMO: String
    }

    type T_S040102_4_2_PO_SEQ {
        PO_SEQ: String
    }

    type T_S040102_4_2_FILE_INFO {
        FILE_KEY: String
        TITLE: String
        NAME: String
        URL: String
        OBJECT_NAME: String
    }

    type T_S040102_4_2 {
        PU_MST: [T_S040102_4_2_0!]!
        STOCK_MEM: [T_S040102_4_1!]!
        PO_SEQ: [T_S040102_4_2_PO_SEQ!]!
        FILE_INFO: [T_S040102_4_2_FILE_INFO!]!
    }

    input I_S040102_4_2 {
        PU_CD: String
    }

    input I_S040102_4_EXCEL_PURCHASE_FACTORY_1 {
        PU_CD: String
        VENDOR_CD: String
        VENDOR_NAME: String
        VENDOR_TYPE: String
        VENDOR_TYPE_N: String
        REG_USER: String
        BUYER_CD: String
        BUYER_NAME: String
        PAY_TERM: String
        PO_CD2: String
        MRP_DATE: String
        NORMI: String
        OVER_SHORT: String
        TARGET_ETA: String
        CURR_CD: String
        PI_NO: String
        ORDER_DATE: String
        PAY_AMT: String
        PI_FILE: String
        PI_FILE_URL: String
        DUE_DATE: String
        BILL_TO: String
        EX_FACTORY: String
        PAY_DATE: String
        PLACE_CD: String
        SHIP_TO: String
        ORIGIN_PORT: String
        TRADE_TERM: String
        DEBIT_AMT: String
        LC_AMT: String
        DEPOSIT_AMT: String
        PU_STATUS: String
    }

    input I_S040102_4_EXCEL_PURCHASE_FACTORY_2 {
        PU_SEQ: String
        KIND: String
        MAIL_TITLE: String
        MAIL_BODY: String
        KIND_OF_REPORT: String
    }

    input I_S040102_4_tbl2_sub_1 {
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

    input I_S040102_4_tbl2_sub {
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
        LEFTOVER_QTY: String
        FOC_QTY: String
        SAVE_DATA: I_S040102_4_tbl2_sub_1!
    }

    input I_S040102_4_EXCEL_PURCHASE_FACTORY_3 {
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
        NEW_PO_QTY: String
        BEF_PO_QTY: String
        CURR_CD: String
        MASTER_PRICE: String
        SURCHARGE_AMT: String
        SURCHARGE_PRICE: String
        SURCHARGE_REMARK: String
        PO_PRICE: String
        PU_CD: String
        MRP_QTY2: String
        DIFF_QTY: String
        BAL: String
        MIN_CONF_USER: String
        PU_STATUS: String
        SEQ: String
        DATAS: [I_S040102_4_tbl2_sub!]!
    }

    type T_S040102_4_EXCEL_RET {
        id: Int
        CODE: String
    }

    type Query {
        mgrQueryS040102_4_1(data: I_S040102_4_1!): T_S040102_4_2!
        mgrQueryS040102_4_2(data: I_S040102_4_2!): T_S040102_4_2!
        mgrQueryS040102_4_LOG(data: I_S040102_4_LOG!): T_S040102_4_2!
        mgrQueryS040102_4_LOG_bak(data: I_S040102_4_LOG!): T_S040102_4_2!
        mgrQueryS040102_EXCEL_PURCHASE_FACTORY(
            data: I_S040102_4_EXCEL_PURCHASE_FACTORY_1!
            data1: I_S040102_4_EXCEL_PURCHASE_FACTORY_2!
            data2: [I_S040102_4_EXCEL_PURCHASE_FACTORY_3!]!
        ): [T_S040102_4_EXCEL_RET!]!
        mgrQueryS040102_EXCEL_PURCHASE_IMPORT(
            data: I_S040102_4_EXCEL_PURCHASE_FACTORY_1!
            data1: I_S040102_4_EXCEL_PURCHASE_FACTORY_2!
            data2: [I_S040102_4_EXCEL_PURCHASE_FACTORY_3!]!
        ): [T_S040102_4_EXCEL_RET!]!
        mgrQueryS040102_EXCEL_PURCHASE_IMPORT_NEW(
            data: I_S040102_4_EXCEL_PURCHASE_FACTORY_1!
            data1: I_S040102_4_EXCEL_PURCHASE_FACTORY_2!
            data2: [I_S040102_4_EXCEL_PURCHASE_FACTORY_3!]!
        ): [T_S040102_4_EXCEL_RET!]!
        mgrQueryS040102_EXCEL_PURCHASE_YKK(
            data: I_S040102_4_EXCEL_PURCHASE_FACTORY_1!
            data1: I_S040102_4_EXCEL_PURCHASE_FACTORY_2!
            data2: [I_S040102_4_EXCEL_PURCHASE_FACTORY_3!]!
        ): [T_S040102_4_EXCEL_RET!]!
        mgrQueryS040102_EXCEL_PURCHASE_NORMAL(
            data: I_S040102_4_EXCEL_PURCHASE_FACTORY_1!
            data1: I_S040102_4_EXCEL_PURCHASE_FACTORY_2!
            data2: [I_S040102_4_EXCEL_PURCHASE_FACTORY_3!]!
        ): [T_S040102_4_EXCEL_RET!]!
    }
`;

export default moduleTypedefs_S040102_4_1;
