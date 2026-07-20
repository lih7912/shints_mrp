// MGR_S0608_LIST_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0608_LIST_2 = gql`
    type T_S0608_LIST_2_1 {
        REF_NO: String
        INVOICE_NO: String
        DEBIT_CD: String
        BILL_AMT: String
    }

    type T_S0608_LIST_2_2 {
        REF_NO: String
        CREDIT_CD: String
        CREDIT_AMT: String
    }

    type T_S0608_LIST_2 {
        DATA1: [T_S0608_LIST_2_1!]!
        DATA2: [T_S0608_LIST_2_2!]!
    }

    input I_S0608_LIST_2 {
        REF_NO: String
        BILL_TYPE: String
    }

    type Query {
        mgrQueryS0608_LIST_2(data: I_S0608_LIST_2!): T_S0608_LIST_2!
    }
`;

export default moduleTypedefs_S0608_LIST_2;
