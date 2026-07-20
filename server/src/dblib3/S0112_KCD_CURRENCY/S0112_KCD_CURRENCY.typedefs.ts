// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0112_KCD_CURRENCY = gql`
    input I_S0112_KCD_CURRENCY_QRY_KCD_CURRENCY {
        START_DATE: String
    }
    input I_S0112_KCD_CURRENCY_QRY_KCD_CURRENCY2 {
        S_DATE: String
        E_DATE: String
        CURR_CD: String
    }

    type T_S0112_KCD_CURRENCY_TBL_KCD_CURRENCY {
        CURR_CD: String
        START_DATE: String
        USD_RATE: String
        WON_AMT: String
        WON_AMT2: String
        WON_AMT3: String
    }

    type T_S0112_KCD_CURRENCY_TBL_KCD_CURRENCY2 {
        CURR_CD: String
        START_DATE: String
        USD_RATE: String
        WON_AMT: String
        WON_AMT2: String
    }

    type T_S0112_KCD_CURRENCY_CODE {
        CURR_CD: [BASE_QRY_KCD_CODE!]!
    }

    input I_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY {
        CURR_CD: String
        START_DATE: String
        USD_RATE: String
        WON_AMT: String
        WON_AMT2: String
    }

    type Ret_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY {
        id: Int!
        CODE: String!
    }

    input I_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY2 {
        CURR_CD: String
        START_DATE: String
        USD_RATE: String
        WON_AMT: String
        WON_AMT2: String
    }

    type Ret_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY2 {
        id: Int!
        CODE: String!
    }

    type Query {
        mgrQuery_S0112_KCD_CURRENCY_TBL_KCD_CURRENCY(
            data: I_S0112_KCD_CURRENCY_QRY_KCD_CURRENCY!
        ): [T_S0112_KCD_CURRENCY_TBL_KCD_CURRENCY!]!
        mgrQuery_S0112_KCD_CURRENCY_TBL_KCD_CURRENCY2(
            data: I_S0112_KCD_CURRENCY_QRY_KCD_CURRENCY2!
        ): [T_S0112_KCD_CURRENCY_TBL_KCD_CURRENCY2!]!
        mgrQuery_S0112_KCD_CURRENCY_CODE: T_S0112_KCD_CURRENCY_CODE!
    }

    type Mutation {
        mgrInsert_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY(
            datas: [I_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY!]!
        ): [Ret_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY!]!
        mgrUpdate_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY(
            datas: [I_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY!]!
        ): [Ret_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY!]!
        mgrDelete_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY(
            datas: [I_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY!]!
        ): [Ret_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY!]!

        mgrInsert_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY2(
            datas: [I_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY2!]!
        ): [Ret_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY2!]!
        mgrUpdate_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY2(
            datas: [I_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY2!]!
        ): [Ret_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY2!]!
        mgrDelete_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY2(
            datas: [I_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY2!]!
        ): [Ret_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY2!]!
    }
`;

export default moduleTypedefs_S0112_KCD_CURRENCY;
