// MGR_S0608_LIST_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0608_LIST_1 = gql`
    type T_S0608_LIST_1 {
        BILL_TYPE: String
        REF_NO: String
        BUYER_NAME: String
        TOT_AMT: String
        CURR_CD: String
        START_DATE: String
        END_DATE: String
        BILL_DATE: String
        DELAY_DAYS: String
        DELAY_INTEREST: String
        LESS_CHARGE: String
        BANK_NAME: String
        BANK_CD: String
        BUYER_CD: String
        BILL_TYPE_CD: String
        BAL_AMT: String
        INVOICE_NO: String
    }

    input I_S0608_LIST_1 {
        BILL_TYPE: String
        S_BILL_DATE: String
        E_BILL_DATE: String
        BUYER_CD: String
        BANK_CD: String
        INVOICE_NO: String
        DEBIT_CD: String
    }

    type Query {
        mgrQueryS0608_LIST_1(data: I_S0608_LIST_1!): [T_S0608_LIST_1!]!
    }
`;

export default moduleTypedefs_S0608_LIST_1;
