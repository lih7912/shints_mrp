// MGR_S0707_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0707_2 = gql`
    type T_S0707_2 {
        REF_NO: String
        BANK_NAME: String
        BANK_CD: String
        BUYER_CD: String
        BILL_DATE: String
        CURR_CD: String
        BILL_AMT: String
        CHECK_AMT: String
        BALANCE: String
        END_FLAG: String
        END_FLAG_N: String
        PRE_FLAG: String
        PRE_FLAG_N: String
        TOT_AMT: String
        CREDIT_AMT: String
        CHARGE: String
        BUYER_NAME: String
        REG_USER: String
        REG_DATETIME: String
        REMARK: String
    }

    input I_S0707_2 {
        BUYER_CD: String
        REF_NO: String
        S_BILL_DATE: String
        E_BILL_DATE: String
        END_FLAG: String
        PRE_FLAG: String
    }

    input I_S0707_2_REF_NO {
        REF_NO: String
        BUYER_CD: String
        BILL_TYPE: String
    }

    type T_S0707_2_REF_NO {
        REF_NO: String
        MESSAGE: String
    }

    type Query {
        mgrQueryS0707_2(data: I_S0707_2!): [T_S0707_2!]!
        mgrQueryS0707_2_REF_NO(data: I_S0707_2_REF_NO!): [T_S0707_2_REF_NO!]!
    }
`;

export default moduleTypedefs_S0707_2;
