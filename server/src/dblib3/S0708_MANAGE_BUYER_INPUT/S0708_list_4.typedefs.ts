// MGR_S0708_LIST_4.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0708_LIST_4 = gql`
    type T_S0708_LIST_4 {
        BILL_DATE: String
        BILL_AMT: String
        INVOICE_NO: String
        CURRENCY_RATE: String
        REF_NO: String
        BILL_AMT_ORG: String
        END_DATE: String
        BUYER_CD: String
        PRE_FLAG: String
    }

    input I_S0708_LIST_4 {
        REF_NO: String
        PRE_FLAG: String
    }

    type Query {
        mgrQueryS0708_LIST_4(data: I_S0708_LIST_4!): [T_S0708_LIST_4!]!
    }
`;

export default moduleTypedefs_S0708_LIST_4;
