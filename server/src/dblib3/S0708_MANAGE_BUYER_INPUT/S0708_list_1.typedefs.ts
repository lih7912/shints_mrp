// MGR_S0708_LIST_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0708_LIST_1 = gql`
    type T_S0708_LIST_1 {
        REF_NO: String
        BANK_NAME: String
        BUYER_CD: String
        BILL_DATE: String
        CURR_CD: String
        BILL_AMT: String
        CHECK_AMT: String
        BALANCE: String
        END_FLAG: String
        PRE_FLAG: String
        END_FLAG_N: String
        PRE_FLAG_N: String
        TOT_AMT: String
        CREDIT_AMT: String
        CHARGE: String
        BUYER_NAME: String
        BANK_CD: String
        MOM_CD: String
        REG_DATETIME: String
        REG_USER: String
        REMARK: String
    }

    input I_S0708_LIST_1 {
        BUYER_CD: String
        S_BILL_DATE: String
        E_BILL_DATE: String
        S_PAY_DATE: String
        E_PAY_DATE: String
        END_TYPE: String
        REF_NO: String
    }

    type Query {
        mgrQueryS0708_LIST_1(data: I_S0708_LIST_1!): [T_S0708_LIST_1!]!
    }
`;

export default moduleTypedefs_S0708_LIST_1;
