// MGR_S0609_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0609_5 = gql`
    input I_S0609_5_1 {
        REF_NO: String
        S_START_DATE: String
        E_START_DATE: String
        BUYER_CD: String
        TOT_AMT: Float
        CURR_CD: String
        INVOICE_NEGO_TYPE: String
        START_DATE: String
        EXCHANGE_COMM: Float
        END_DATE: String
        HANDLING_CHARGE: Float
        BILL_DATE: String
        POSTAGE: Float
        DELAY_DAYS: Int
        TOT_AMT2: Float
        AMT_WON: Float
        DELAY_INTEREST: Float
        DELAY_RATE: Float
        LESS_CHARGE: Float
        GRAND_TOT: Float
        BANK_CD: String
        USER_ID: String
    }

    input I_S0609_5_2 {
        REF_NO: String
        S_START_DATE: String
        E_START_DATE: String
        BUYER_CD: String
        TOT_AMT: Float
        CURR_CD: String
        INVOICE_NEGO_TYPE: String
        START_DATE: String
        EXCHANGE_COMM: Float
        END_DATE: String
        HANDLING_CHARGE: Float
        BILL_DATE: String
        POSTAGE: Float
        DELAY_DAYS: Int
        TOT_AMT2: Float
        AMT_WON: Float
        DELAY_INTEREST: Float
        DELAY_RATE: Float
        LESS_CHARGE: Float
        GRAND_TOT: Float
        BANK_CD: String
        USER_ID: String
        INVOICE_NO: String
        BILL_AMT: Float
    }

    type Ret_S0609_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0609_5(datas1: I_S0609_5_1!): [Ret_S0609_5!]!
        mgrInsert_S0609_5_1(datas1: I_S0609_5_2!): [Ret_S0609_5!]!
        mgrUpdate_S0609_5(datas1: I_S0609_5_1!): [Ret_S0609_5!]!
        mgrDelete_S0609_5(datas1: I_S0609_5_1!): [Ret_S0609_5!]!
    }
`;

export default moduleTypedefs_S0609_5;
