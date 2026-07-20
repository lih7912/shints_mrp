// MGR_S041206_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S041206_1 = gql`
    type T_S041206_1 {
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

    input I_S041206_1 {
        PACK_CD: String
    }

    type T_S041206_CODE {
        VENDOR: [BASE_QRY_KCD_VENDOR!]!
        REASON_TYPE: [BASE_QRY_KCD_CODE!]!
        CHARGE1: [BASE_QRY_KCD_CODE!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        BUYER_TEAM: [BASE_QRY_KCD_CODE!]!
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
    }

    type T_S041206_0 {
        message: String
        tot_amt: Float
        data: [T_S041206_1!]!
    }

    type Query {
        mgrQueryS041206_1(data: I_S041206_1!): T_S041206_0!
        mgrQueryS041206_CODE(data: I_S041206_1!): T_S041206_CODE!
    }
`;

export default moduleTypedefs_S041206_1;
