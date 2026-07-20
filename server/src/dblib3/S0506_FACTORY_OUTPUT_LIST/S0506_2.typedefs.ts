// MGR_S0506_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0506_2 = gql`
    type T_S0506_2 {
        PO_CD: String
        OUT_DATE: String
        ORDER_CD: String
        VENDOR_NAME: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        OUT_QTY: Float
        MATL_CD: String
        VENDOR_TYPE: String
    }

    input I_S0506_2 {
        DELIVERY: String
        PO_CD: String
        ORDER_CD: String
        VENDOR_CD: String
        MATL_CD: String
        MATL_NAME: String
        SPEC: String
        COLOR: String
        UNIT: String
    }

    type Query {
        mgrQueryS0506_2(data: I_S0506_2!): [T_S0506_2!]!
    }
`;

export default moduleTypedefs_S0506_2;
