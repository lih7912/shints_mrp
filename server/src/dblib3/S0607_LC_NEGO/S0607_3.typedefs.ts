// MGR_S0607_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0607_3 = gql`
    type T_S0607_3 {
        INVOICE_NO: String
        BILL_AMT: String
    }

    input I_S0607_3 {
        REF_NO: String
    }

    type Query {
        mgrQueryS0607_3(data: I_S0607_3!): [T_S0607_3!]!
    }
`;

export default moduleTypedefs_S0607_3;
