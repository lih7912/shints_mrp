// MGR_S0433_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0433_1 = gql`
    type T_S0433_1 {
        PO_CD: String
        PO_SEQ: String
        ORDER_CD: String
        VENDOR_NAME: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        USE_PO_TYPE_NAME: String
        USE_QTY: String
        DIFF_QTY: String
        COL1: String
        COL2: String
        PO_QTY: String
        ADJ_PO_QTY: String
        DIFF_PO_TYPE_NAME: String
        UNIT: String
        MATL_PRICE: String
        CURR_CD: String
        TOT_AMT: String
        MRP_SEQ: String
        MATL_SEQ: String
        REG_DATETIME: String
        USE_PO_TYPE: String
        DIFF_PO_TYPE: String
        PO_MATL_CD: String
        VENDOR_CD: String
    }

    input I_S0433_1 {
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

    input I_S0433_CODE {
        BUYER_CD: String
    }

    type T_S0433_1_CODE {
        ORIGIN_PORT: [BASE_QRY_KCD_CODE!]!
        SHIP_LINE: [BASE_QRY_KCD_CODE!]!
        SHIP_MODE: [BASE_QRY_KCD_CODE!]!
        PLACE_CD: [BASE_QRY_KCD_PLACE!]!
        DESTINATION: [BASE_QRY_KCD_CODE!]!
    }

    type T_S0433_1_CODE2 {
        PLACE_CD: [BASE_QRY_KCD_PLACE!]!
        NORMI: [BASE_QRY_KCD_CODE!]!
        TRADE_TERM: [BASE_QRY_KCD_CODE!]!
        SHIP_MODE: [BASE_QRY_KCD_CODE!]!
        BILL_TYPE: [BASE_QRY_KCD_CODE!]!
        CURR_CD: [BASE_QRY_KCD_CODE!]!
    }

    type Query {
        mgrQueryS0433_1_CODE: T_S0433_1_CODE!
    }
`;

export default moduleTypedefs_S0433_1;
