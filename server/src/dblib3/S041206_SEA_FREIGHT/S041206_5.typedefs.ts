// MGR_S041206_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S041206_5 = gql`
    input I_S041206_5_0 {
        PACK_CD: String
    }

    input I_S041206_5 {
        PACK_CD: String
        BUYER_CD: String
        DELAY_REASON_N: String
        DELAY_REASON: String
        CHARGE_KIND_N: String
        CHARGE_KIND: String
        BUYER_TEAM_N: String
        BUYER_TEAM: String
        FRT_PERCENT: String
        AMOUNT: String
        CURR_CD: String
        PERCENT_FLAG: String
        DISTRIBUTE_FLAG: String
        FRT_FLAG: String
    }

    type Ret_S041206_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S041206_5(datas: [I_S041206_5!]!): [Ret_S041206_5!]!
        mgrInsert_S041206_5_0(datas: I_S041206_5_0!): [Ret_S041206_5!]!
    }
`;

export default moduleTypedefs_S041206_5;
