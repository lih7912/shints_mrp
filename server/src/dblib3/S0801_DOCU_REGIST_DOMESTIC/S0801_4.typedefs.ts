// MGR_S0801_4.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0801_4 = gql`
    type T_S0801_4 {
        ORDER_CD: String
        PROD_CD: String
        COLOR: String
        PRICE: Float
        TOT_CNT: Int
        ORDER_SIZE_CNT: String
        SHIP_CNT: Int
        SHIP_SIZE_CNT: String
        SIZE_GROUP: String
        SIZE_MEMBER: String
    }

    input I_S0801_4 {
        ORDER_CD: String
        BUYER_CD: String
    }

    type Query {
        mgrQueryS0801_4(data: I_S0801_4!): [T_S0801_4!]!
    }
`;

export default moduleTypedefs_S0801_4;
