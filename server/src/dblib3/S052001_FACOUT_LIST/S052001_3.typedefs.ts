// MGR_S052001_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S052001_3 = gql`
    type T_S052001_3 {
        PO_CD: String
        IN_DATE: String
        DELIVERY: String
        VENDOR_NAME: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        PO_QTY: Float
        COL2: String
        IN_QTY: Float
        ERR_QTY: Float
        LOCATION: String
        MATL_CD: String
        VENDOR_TYPE: String
    }

    input I_S052001_3 {
        PO_NO: String
        FACTORY_CD: String
        TYPE: String
        MATL_CD: String
        BUYER_CD: String
        VENDOR_CD: String
        SPEC: String
        MATL_NAME: String
        COLOR: String
        UNIT: String
        DELIVERY: String
    }

    type Query {
        mgrQueryS052001_3(data: I_S052001_3!): [T_S052001_3!]!
    }
`;

export default moduleTypedefs_S052001_3;
