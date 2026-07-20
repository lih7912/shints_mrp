// MGR_S0439_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0439_1 = gql`
    type T_S0439_1 {
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

    input I_S0439_1 {
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

    input I_S0439_CODE {
        BUYER_CD: String
    }

    type T_S0439_1_CODE {
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
    }

    type T_S0439_1_CODE2 {
        GW_STATUS: [BASE_QRY_KCD_CODE!]!
        TYPE: [BASE_QRY_KCD_CODE!]!
    }

    type Query {
        mgrQueryS0439_1(data: I_S0439_1!): [T_S0439_1!]!
        mgrQueryS0439_1_CODE: T_S0439_1_CODE!
        mgrQueryS0439_1_CODE2(data: I_S0439_CODE!): T_S0439_1_CODE2!
    }
`;

export default moduleTypedefs_S0439_1;
