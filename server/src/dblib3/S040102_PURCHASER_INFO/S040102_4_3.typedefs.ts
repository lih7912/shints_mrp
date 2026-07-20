// MGR_S040102_4_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S040102_4_3 = gql`
    type T_S040102_4_3 {
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
        SURCHAGE_REMARK: String
        PO_PRICE: String
        PU_CD: String
        MRP_QTY2: String
        DIFF_QTY: String
    }

    input I_S040102_4_3 {
        PU_CD: String
        VENDOR_CD: String
        PO_SEQ: String
    }

    type T_S040102_4_3_STOCK {
        PO_CD: String
        PO_SEQ: String
        STOCK_PO_CD: String
        STOCK_PO_SEQ: String
        ORDER_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        PO_MATL_CD: String
        USE_PO_TYPE_N: String
        USE_QTY: String
        PO_QTY: String
        SUM_QTY: String
        VENDOR_NAME: String
        STOCK_CHK: String
        MRP_SEQ: String
        MATL_SEQ: String
        MATL_PRICE: String
        CURR_CD: String
        PO_MRP_SEQ: String
        REG_DATETIME: String
        STOCK_IDX: String
        RACK: String
        ROOT_IDX: String
        VENDOR_CD: String
        MATL_KIND2: String
        STATUS_CD: String
        FACTORY_CD: String
    }

    input I_S040102_4_3_STOCK {
        PO_CD: String
        PO_SEQ: String
        USER_ID: String
        ORDER_CD: String
        MATL_CD: String
    }

    type T_S040102_REVISE1 {
        PO_CD: String
        PO_SEQ: String
        ORDER_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        USE_PO_TYPE_N: String
        USE_QTY: String
        PO_QTY: String
        OLD_QTY: String
        NEW_QTY: String
        DIFF_QTY: String
        DIFF_PO_TYPE_N: String
        VENDOR_NAME: String
        MRP_SEQ: String
        MATL_SEQ: String
        MATL_PRICE: String
        CURR_CD: String
        USE_SIZE: String
        TOT_AMT: String
        ORDER_STATUS: String
        SEQ: String
        USE_PO_TYPE: String
        DIFF_PO_TYPE: String
        SEND_DATETIME: String
    }

    type T_S040102_REVISE2 {
        BUYER_CHK: String
        SALES_CHK: String
        MATL_CHK: String
        CAD_CHK: String
        MRP_CHK: String
        MRP2_CHK: String
        ETC_CHK: String
        SEQ_REASON: String
        SEQ_COMMENT: String
        APPROVAL: String
    }

    type T_S040102_4_3_REVISE {
        DATA1: [T_S040102_REVISE1!]!
        DATA2: [T_S040102_REVISE2!]!
    }

    input I_S040102_4_3_REVISE {
        PO_CD: String
        PO_SEQ: String
        ORDER_CD: String
        VENDOR_CD: String
    }

    type T_S040102_4_3_LC {
        PU_CD: String
        PO_CD: String
        MATL_CD: String
        LC_QTY: String
    }

    input I_S040102_4_3_LC {
        PU_CD: String
        PO_CD: String
        MATL_CD: String
    }

    type Query {
        mgrQueryS040102_4_3(data: I_S040102_4_3!): [T_S040102_4_3!]!
        mgrQueryS040102_4_3_STOCK(
            data: I_S040102_4_3_STOCK!
        ): [T_S040102_4_3_STOCK!]!
        mgrQueryS040102_4_3_REVISE(
            data: I_S040102_4_3_REVISE!
        ): T_S040102_4_3_REVISE!
        mgrQueryS040102_4_3_LC(data: [I_S040102_4_3_LC!]!): [T_S040102_4_3_LC!]!
        mgrQueryS040102_4_3_DEPOSIT(
            data: [I_S040102_4_3_LC!]!
        ): [T_S040102_4_3_LC!]!
    }
`;

export default moduleTypedefs_S040102_4_3;
