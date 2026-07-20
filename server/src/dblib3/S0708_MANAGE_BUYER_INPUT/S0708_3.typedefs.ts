// MGR_S0708_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0708_3 = gql`
    type T_S0708_3 {
        INVOICE_NO: String
        CURR_CD: String
        TOT_AMT: Float
        SHIP_DATE: String
        DUE_DATE: String
        BALANCE: Float
        BUYER_NAME: String
    }

    input I_S0708_3 {
        BUYER_CD: String
    }

    type Query {
        mgrQueryS0708_3(data: I_S0708_3!): [T_S0708_3!]!
    }
`;

export default moduleTypedefs_S0708_3;
