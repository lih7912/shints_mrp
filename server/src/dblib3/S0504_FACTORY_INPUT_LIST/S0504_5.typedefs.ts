// MGR_S0504_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0504_5 = gql`
    input I_S0504_5 {
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

    type Ret_S0504_5 {
        CODE: String
        id: Int
    }

    input I_S0504_5_1 {
        FRT_DATE: String
        BL_NO: String
        AMOUNT: String
        WEIGHT: String
        ETA: String
        USER_ID: String
    }

    type Mutation {
        mgrInsert_S0504_5_CANCEL(datas: [I_S0504_5!]!): [Ret_S0504_5!]!
        mgrUpdate_S0504_5_LOCATION(datas: [I_S0504_5!]!): [Ret_S0504_5!]!
    }
`;

export default moduleTypedefs_S0504_5;
