// MGR_S040100_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S040100_1 = gql`
    type T_S040100_1 {
        PO_CD: String
        PO_SEQ: String
        ORDER_CD: String
        VENDOR_NAME: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        USE_PO_TYPE_NAME: String
        USE_QTY: Float
        DIFF_QTY: Float
        COL1: String
        COL2: String
        PO_QTY: Float
        ADJ_PO_QTY: Float
        DIFF_PO_TYPE_NAME: String
        UNIT: String
        MATL_PRICE: Float
        CURR_CD: String
        TOT_AMT: Float
        MRP_SEQ: String
        MATL_SEQ: String
        REG_DATETIME: String
        USE_PO_TYPE: String
        DIFF_PO_TYPE: String
        PO_MATL_CD: String
        VENDOR_CD: String
    }

    input I_S040100_1 {
        PO_CD: String
        PO_SEQ: String
        VENDOR_TYPE: String
        MATL_TYPE: String
        VENDOR_NAME: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        TARGET_ETA: String
        TARGET_ETD: String
    }

    input I_S040100_CODE {
        BUYER_CD: String
    }

    input I_S040100_CODE_3 {
        VENDOR_CD: String
    }

    type T_S040100_1_CODE {
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
    }

    type T_S040100_1_CODE2 {
        PLACE_CD: [BASE_QRY_KCD_PLACE!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        NORMI: [BASE_QRY_KCD_CODE!]!
        TRADE_TERM: [BASE_QRY_KCD_CODE!]!
        SHIP_MODE: [BASE_QRY_KCD_CODE!]!
        BILL_TYPE: [BASE_QRY_KCD_CODE!]!
        CURR_CD: [BASE_QRY_KCD_CODE!]!
        ORIGIN_PORT: [BASE_QRY_KCD_CODE!]!
        VENDOR_TYPE: [BASE_QRY_KCD_CODE!]!
        PU_STATUS: [BASE_QRY_KCD_CODE!]!
    }

    type T_S040100_1_CODE3 {
        BANK_CD: [BASE_QRY_KCD_BANK!]!
        PAY_TYPE: [BASE_QRY_KCD_CODE!]!
    }

    type Query {
        mgrQueryS040100_1(data: I_S040100_1!): [T_S040100_1!]!
        mgrQueryS040100_1_CODE: T_S040100_1_CODE!
        mgrQueryS040100_1_CODE2(data: I_S040100_CODE!): T_S040100_1_CODE2!
        mgrQueryS040100_1_CODE3(data: I_S040100_CODE_3!): T_S040100_1_CODE3!
    }
`;

export default moduleTypedefs_S040100_1;
