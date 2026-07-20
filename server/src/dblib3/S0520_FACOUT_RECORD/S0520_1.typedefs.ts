// MGR_S0520_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0520_1 = gql`
    type T_S0520_1 {
        PO_CD: String
        PO_SEQ: Int
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
        COL2: Int
        PO_QTY: Float
        ADJ_PO_QTY: Float
        DIFF_PO_TYPE_NAME: String
        UNIT: String
        MATL_PRICE: Float
        CURR_CD: String
        TOT_AMT: Float
        MRP_SEQ: Int
        MATL_SEQ: Int
        REG_DATETIME: String
        USE_PO_TYPE: String
        DIFF_PO_TYPE: String
        PO_MATL_CD: String
        VENDOR_CD: String
    }

    input I_S0520_1 {
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

    input I_S0520_CODE {
        BUYER_CD: String
        PO_CD: String
        ORDER_CD: String
    }

    type T_S0520_1_CODE {
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        PURPOSE: [BASE_QRY_KCD_CODE!]!
        PUR_FACTORY: [BASE_QRY_KCD_CODE!]!
        PAY_TYPE: [BASE_QRY_KCD_CODE!]!
        PO_CD: [BASE_QRY_KCD_CODE!]!
        ORDER_CD: [BASE_QRY_KCD_CODE!]!
        FACOUT_CD: [BASE_QRY_KCD_CODE!]!
    }

    type T_S0520_1_CODE2 {
        PLACE_CD: [BASE_QRY_KCD_PLACE!]!
        NORMI: [BASE_QRY_KCD_CODE!]!
        TRADE_TERM: [BASE_QRY_KCD_CODE!]!
        SHIP_MODE: [BASE_QRY_KCD_CODE!]!
        BILL_TYPE: [BASE_QRY_KCD_CODE!]!
        CURR_CD: [BASE_QRY_KCD_CODE!]!
    }

    input I_S0520_CODE0 {
        BUYER_CD: String
        PO_CD: String
    }

    type T_S0520_1_CODE0 {
        PO_CD: [BASE_QRY_KCD_CODE!]!
        ORDER_CD: [BASE_QRY_KCD_CODE!]!
    }

    type Query {
        mgrQueryS0520_1(data: I_S0520_1!): [T_S0520_1!]!
        mgrQueryS0520_1_CODE(data: I_S0520_CODE!): T_S0520_1_CODE!
        mgrQueryS0520_1_CODE_DETAIL(data: I_S0520_CODE!): T_S0520_1_CODE!
        mgrQueryS0520_1_CODE_DETAIL2(data: I_S0520_CODE!): T_S0520_1_CODE!
        mgrQueryS0520_1_CODE2(data: I_S0520_CODE!): T_S0520_1_CODE2!
        mgrQueryS0520_1_CODE0(data: I_S0520_CODE0!): T_S0520_1_CODE0!
    }
`;

export default moduleTypedefs_S0520_1;
