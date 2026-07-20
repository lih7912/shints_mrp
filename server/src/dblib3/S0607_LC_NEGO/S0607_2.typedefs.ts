// MGR_S0607_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0607_2 = gql`
    type T_S0607_2 {
        REF_NO: String
        TOT_AMT: String
        BAL_AMT: String
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
        BUYER_NAME: String
        EXCHANGE_COMM: String
        HANDLING_CHARGE: String
        POSTAGE: String
        AMT_WON: String
        AMT_CURR: String
        TOT_AMT2: String
        INVOICE_NEGO_TYPE_N: String
        INVOICE_NEGO_TYPE: String
    }

    input I_S0607_2 {
        REF_NO: String
        BUYER_CD: String
        S_DATE: String
        E_DATE: String
    }

    type Query {
        mgrQueryS0607_2(data: I_S0607_2!): [T_S0607_2!]!
    }
`;

export default moduleTypedefs_S0607_2;
