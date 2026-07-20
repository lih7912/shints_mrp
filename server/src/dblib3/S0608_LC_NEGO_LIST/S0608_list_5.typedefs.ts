// MGR_S0608_LIST_5.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0608_LIST_5 = gql`
    type T_S0608_LIST_5 {
        CREDIT_CD: String
        CREDIT_AMT: String
    }

    input I_S0608_LIST_5 {
        REF_NO: String
        PRE_FLAG: String
    }

    type Query {
        mgrQueryS0608_LIST_5(data: I_S0608_LIST_5!): [T_S0608_LIST_5!]!
    }
`;

export default moduleTypedefs_S0608_LIST_5;
