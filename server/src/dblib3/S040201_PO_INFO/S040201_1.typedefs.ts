// MGR_S040201_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S040201_1 = gql`
    type T_S040201_1 {
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

    input I_S040201_1 {
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

    type T_S040201_1_CODE {
        PO_CD: [BASE_QRY_KSV_PO_MST!]!
        VENDOR_TYPE: [BASE_QRY_KCD_CODE!]!
        MATL_TYPE: [BASE_QRY_KCD_CODE!]!
    }

    type T_S040201_1_CODE2 {
        PO_SEQ: [BASE_QRY_KSV_PO_MST!]!
        PO_STATUS: [BASE_QRY_KCD_CODE!]!
        VENDOR_CD: [BASE_QRY_KCD_VENDOR!]!
    }

    type Query {
        mgrQueryS040201_1(data: I_S040201_1!): [T_S040201_1!]!
        mgrQueryS040201_1_CODE: T_S040201_1_CODE!
        mgrQueryS040201_1_CODE2(data: I_S040201_1!): T_S040201_1_CODE2!
    }
`;

export default moduleTypedefs_S040201_1;
