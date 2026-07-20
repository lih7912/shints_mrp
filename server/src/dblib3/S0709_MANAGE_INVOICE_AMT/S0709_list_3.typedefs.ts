// MGR_S0709_LIST_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0709_LIST_3 = gql`
    type T_S0709_LIST_3 {
        BUYER_CD: String
        INVOICE_NO: String
        CURR_CD: String
        BALANCE: String
        REG_DATE: String
        END_DATE: String
    }

    input I_S0709_LIST_3 {
        BUYER_CD: String
        BILL_DATE: String
    }

    type Query {
        mgrQueryS0709_LIST_3(data: I_S0709_LIST_3!): [T_S0709_LIST_3!]!
    }
`;

export default moduleTypedefs_S0709_LIST_3;
