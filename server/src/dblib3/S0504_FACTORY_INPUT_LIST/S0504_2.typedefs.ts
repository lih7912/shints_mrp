// MGR_S0504_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0504_2 = gql`
    type T_S0504_2 {
        STSOUT_CD: String
        PO_CD: String
        IN_DATE: String
        DELIVERY: String
        VENDOR_NAME: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        COL1: String
        COL2: String
        IN_QTY: String
        SHORTAGE_QTY: String
        DEFECT_QTY: String
        ERR_QTY: String
        LOCATION: String
        MATL_CD: String
        VENDOR_TYPE: String
        BUYER_NAME: String
        REG_USER: String
    }

    input I_S0504_2 {
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
        mgrQueryS0504_2(data: I_S0504_2!): [T_S0504_2!]!
    }
`;

export default moduleTypedefs_S0504_2;
