// MGR_S0506_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0506_5 = gql`
    input I_S0506_5 {
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

    type Ret_S0506_5 {
        CODE: String
        id: Int
    }

    input I_S0506_5_1 {
        FRT_DATE: String
        BL_NO: String
        AMOUNT: Float
        WEIGHT: Float
        ETA: String
        USER_ID: String
    }

    type Mutation {
        mgrInsert_S0506_5(datas: [I_S0506_5!]!): [Ret_S0506_5!]!
        mgrInsert_S0506_5_1(datas: [I_S0506_5!]!): [Ret_S0506_5!]!
    }
`;

export default moduleTypedefs_S0506_5;
