// MGR_S0709_LIST_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0709_LIST_1 = gql`
    type T_S0709_LIST_1 {
        BUYER_CD: String
        CURR_CD: String
        OVER_DATE: String
        ONE_WEEK: String
        TWO_WEEK: String
        TWO_WEEK_AFTER: String
        TOTAL: String
        TOTAL_DATE: String
        INTEREST: String
        DEBIT: String
        CREDIT: String
    }

    input I_S0709_LIST_1 {
        BUYER_CD: String
        S_BILL_DATE: String
        E_BILL_DATE: String
    }

    type Query {
        mgrQueryS0709_LIST_1(data: I_S0709_LIST_1!): [T_S0709_LIST_1!]!
    }
`;

export default moduleTypedefs_S0709_LIST_1;
