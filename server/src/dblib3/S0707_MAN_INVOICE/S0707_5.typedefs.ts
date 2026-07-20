// MGR_S0707_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0707_5 = gql`
    input I_S0707_5_1 {
        REF_NO: String
        BILL_DATE: String
        BILL_AMT: String
        CURR_CD: String
        END_TYPE: String
        BUYER_CD: String
        CHARGE: String
        BILL_TYPE: String
        BANK_CD: String
        CREDIT_AMT: String
        REMARK: String
        USER_ID: String
        BALANCE: String
        CHECK_AMT: String
    }

    input I_S0707_5_2 {
        REF_NO: String
        S_START_DATE: String
        E_START_DATE: String
        BUYER_CD: String
        TOT_AMT: String
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

    type Ret_S0707_5 {
        CODE: String
        id: String
    }

    type Mutation {
        mgrInsert_S0707_5_INSERT_CREDIT(datas: I_S0707_5_1!): [Ret_S0707_5!]!
        mgrInsert_S0707_5_INSERT_TT(datas: I_S0707_5_1!): [Ret_S0707_5!]!
        mgrInsert_S0707_5_UPDATE_TT(datas: I_S0707_5_1!): [Ret_S0707_5!]!
        mgrInsert_S0707_5_DELETE_TT(datas: I_S0707_5_1!): [Ret_S0707_5!]!
        mgrInsert_S0707_5_1(datas1: I_S0707_5_2!): [Ret_S0707_5!]!
        mgrUpdate_S0707_5(datas1: I_S0707_5_1!): [Ret_S0707_5!]!
        mgrDelete_S0707_5(datas1: I_S0707_5_1!): [Ret_S0707_5!]!
    }
`;

export default moduleTypedefs_S0707_5;
