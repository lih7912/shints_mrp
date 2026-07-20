// MGR_S030512_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030512_1 = gql`
    type T_S030512_1 {
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        USE_PO_TYPE: String
        USE_PO_TYPE_NAME: String
        PO_QTY: Float
        MATL_PRICE: Float
        CURR_CD: String
        VENDOR_NAME: String
        MRP_SEQ: Int
        MATL_SEQ: Int
        REG_DATETIME: String
    }

    input I_S030512_1 {
        USER_ID: String
        PO_CD: String
        PO_SEQ: String
        MATL_NAME: String
        VENDOR_CD: String
    }

    type Query {
        mgrQueryS030512_1(data: I_S030512_1!): [T_S030512_1!]!
    }
`;

export default moduleTypedefs_S030512_1;
