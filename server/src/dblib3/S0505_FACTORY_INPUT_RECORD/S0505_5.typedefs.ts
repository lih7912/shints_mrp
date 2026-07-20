// MGR_S0505_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0505_5 = gql`
    input I_S0505_5 {
        PO_CD: String
        MATL_CD: String
        IN_DATE: String
        IN_QTY: Float
        DELIVERY: String
        USER_ID: String
    }

    type Ret_S0505_5 {
        CODE: String
        id: Int
    }

    input I_S0505_5_1 {
        FRT_DATE: String
        BL_NO: String
        AMOUNT: Float
        WEIGHT: Float
        ETA: String
        USER_ID: String
    }

    type Mutation {
        mgrInsert_S0505_5(datas: [I_S0505_5!]!): [Ret_S0505_5!]!
        mgrInsert_S0505_5_1(datas: [I_S0505_5!]!): [Ret_S0505_5!]!
    }
`;

export default moduleTypedefs_S0505_5;
