// MGR_S0607_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0607_5 = gql`
    input I_S0607_5_1 {
        REF_NO: String
        S_START_DATE: String
        E_START_DATE: String
        BUYER_CD: String
        TOT_AMT: String
        BAL_AMT: String
        CURR_CD: String
        INVOICE_NEGO_TYPE: String
        START_DATE: String
        EXCHANGE_COMM: String
        END_DATE: String
        HANDLING_CHARGE: String
        BILL_DATE: String
        POSTAGE: String
        DELAY_DAYS: String
        TOT_AMT2: String
        AMT_WON: String
        DELAY_INTEREST: String
        DELAY_RATE: String
        LESS_CHARGE: String
        GRAND_TOT: String
        BANK_CD: String
        USER_ID: String
    }

    input I_S0607_5_2 {
        REF_NO: String
        S_START_DATE: String
        E_START_DATE: String
        BUYER_CD: String
        TOT_AMT: String
        BAL_AMT: String
        CURR_CD: String
        INVOICE_NEGO_TYPE: String
        START_DATE: String
        EXCHANGE_COMM: String
        END_DATE: String
        HANDLING_CHARGE: String
        BILL_DATE: String
        POSTAGE: String
        DELAY_DAYS: String
        TOT_AMT2: String
        AMT_WON: String
        DELAY_INTEREST: String
        DELAY_RATE: String
        LESS_CHARGE: String
        GRAND_TOT: String
        BANK_CD: String
        USER_ID: String
        INVOICE_NO: String
        BILL_AMT: String
    }

    type Ret_S0607_5 {
        CODE: String
        id: String
    }

    type Mutation {
        mgrInsert_S0607_5_INSERT_NEGO(datas1: I_S0607_5_1!): [Ret_S0607_5!]!
        mgrUpdate_S0607_5_UPDATE_NEGO(datas1: I_S0607_5_1!): [Ret_S0607_5!]!
        mgrDelete_S0607_5_DELETE_NEGO(datas1: I_S0607_5_1!): [Ret_S0607_5!]!
        mgrInsert_S0607_5_INSERT_INVOICE(datas1: I_S0607_5_2!): [Ret_S0607_5!]!
        mgrDelete_S0607_5_DELETE_INVOICE(datas1: I_S0607_5_2!): [Ret_S0607_5!]!
    }
`;

export default moduleTypedefs_S0607_5;
