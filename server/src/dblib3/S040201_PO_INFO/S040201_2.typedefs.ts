// MGR_S040201_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S040201_2 = gql`
    type T_S040201_2 {
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        COL1: String
        ORG_PO_SEQ: Int
        PO_QTY: Float
        DIFF_QTY: Float
        DIFF_PO_TYPE_NAME: String
        COL2: String
        REMARK: String
        VENDOR_NAME: String
        DIFF_PO_TYPE: String
        MRP_SEQ: Int
        MATL_SEQ: Int
        STOCK_IDX: String
        SEQ_COMMENT: String
    }

    input I_S040201_2 {
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

    type T_S040201_2_1 {
        SUM_QTY: Int
        MIN_QTY: Int
    }

    input I_S040201_2_1 {
        PO_CD: String
        MATL_CD: String
    }

    type Query {
        mgrQueryS040201_2(data: I_S040201_2!): [T_S040201_2!]!
        mgrQueryS040201_2_1(data: I_S040201_2_1!): T_S040201_2_1!
    }
`;

export default moduleTypedefs_S040201_2;
