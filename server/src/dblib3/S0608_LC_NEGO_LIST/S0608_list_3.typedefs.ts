// MGR_S0608_LIST_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0608_LIST_3 = gql`
    type T_S0608_LIST_3 {
        CRDB_CD: String
        CURR_CD: String
        CRDB_AMT: String
        END_DATE: String
        IN_AMT: String
        BALANCE: String
        BUYER_NAME: String
        REST_AMT: String
        VAT_AMT: String
        ORG_AMT: String
    }

    input I_S0608_LIST_3 {
        BUYER_CD: String
    }

    type Query {
        mgrQueryS0608_LIST_3(data: I_S0608_LIST_3!): [T_S0608_LIST_3!]!
    }
`;

export default moduleTypedefs_S0608_LIST_3;
