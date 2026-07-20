// MGR_S0609_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0609_3 = gql`
    type T_S0609_3 {
        INCOME_NO: String
        EXPORT_DATE: String
        EXPORT_NO: String
        RETURN_DATE: String
        RETURN_AMT: Int
    }

    input I_S0609_3 {
        KEY1: String
    }

    type Query {
        mgrQueryS0609_3(data: I_S0609_3!): [T_S0609_3!]!
    }
`;

export default moduleTypedefs_S0609_3;
