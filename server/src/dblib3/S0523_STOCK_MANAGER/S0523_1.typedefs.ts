// MGR_S0523_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0523_1 = gql`
    type T_S0523_1 {
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

    input I_S0523_1 {
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

    input I_S0523_CODE {
        BUYER_CD: String
        VENDOR_CD: String
    }

    type T_S0523_1_CODE {
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        STOCK_CODE: [BASE_QRY_KCD_CODE!]!
        PO_CD: [BASE_QRY_KCD_CODE!]!
        VENDOR_CD: [BASE_QRY_KCD_VENDOR!]!
        KIND2: [BASE_QRY_KCD_CODE!]!
        OWNER_SHIP: [BASE_QRY_KCD_CODE!]!
        REASON_MAKE: [BASE_QRY_KCD_CODE!]!
        AUTHORITY: [BASE_QRY_KCD_CODE!]!
        CONDITION: [BASE_QRY_KCD_CODE!]!
        MANAGER: [BASE_QRY_KCD_CODE!]!
        PURPOSE: [BASE_QRY_KCD_CODE!]!
        REMARK: [BASE_QRY_KCD_CODE!]!
        WARE_CD: [BASE_QRY_KCD_FACTORY_WARE!]!
        STOCK_STATUS_S: [BASE_QRY_KCD_CODE!]!
        PLAN: [BASE_QRY_KCD_CODE!]!
    }

    type T_S0523_1_CODE2 {
        PLACE_CD: [BASE_QRY_KCD_PLACE!]!
        NORMI: [BASE_QRY_KCD_CODE!]!
        TRADE_TERM: [BASE_QRY_KCD_CODE!]!
        SHIP_MODE: [BASE_QRY_KCD_CODE!]!
        BILL_TYPE: [BASE_QRY_KCD_CODE!]!
        CURR_CD: [BASE_QRY_KCD_CODE!]!
    }

    type Query {
        mgrQueryS0523_1_CODE(data: I_S0523_CODE!): T_S0523_1_CODE!
    }
`;

export default moduleTypedefs_S0523_1;
