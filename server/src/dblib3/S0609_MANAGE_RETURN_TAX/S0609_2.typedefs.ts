// MGR_S0609_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0609_2 = gql`
    type T_S0609_2 {
        INCOME_NO: String
        VENDOR_NAME: String
        ITEM: String
        INCOME_DATE: String
        DUTY_AMT: Int
        RETURN_AMT: Int
        END_FLAG_N: String
        NO_RET_NAME: String
        REMARK: String
        NO_RET_FLAG: String
        END_FLAG: String
        VENDOR_CD: String
        INCOME_NO1: String
        INCOME_NO2: String
        INCOME_NO3: String
    }

    input I_S0609_2 {
        KEY1: String
    }

    type Query {
        mgrQueryS0609_2(data: I_S0609_2!): [T_S0609_2!]!
    }
`;

export default moduleTypedefs_S0609_2;
