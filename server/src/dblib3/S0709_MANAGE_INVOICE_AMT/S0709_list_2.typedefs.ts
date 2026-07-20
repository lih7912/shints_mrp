// MGR_S0709_LIST_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0709_LIST_2 = gql`
    type T_S0709_LIST_2 {
        BUYER_CD: String
        INVOICE_NO: String
        CURR_CD: String
        BALANCE: String
        SHIP_DATE: String
        DUE_DATE: String
        OVER_DATE: String
        INTEREST: String
    }

    input I_S0709_LIST_2 {
        KIND: String
        BUYER_CD: String
        S_BILL_DATE: String
        E_BILL_DATE: String
        CURR_CD: String
    }

    type Query {
        mgrQueryS0709_LIST_2(data: I_S0709_LIST_2!): [T_S0709_LIST_2!]!
    }
`;

export default moduleTypedefs_S0709_LIST_2;
