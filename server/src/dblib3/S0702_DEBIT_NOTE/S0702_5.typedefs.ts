// MGR_S0702_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0702_5 = gql`
    input I_S0702_5 {
        DEBIT_NO: String
        BUYER_CD: String
        STATUS_CD: String
        DATE_OF_ISSUE: String
        LINK_TO: String
        DEBIT_TYPE: String
        PAY_TO: String
        EXP_DATE: String
        BANK_CD: String
        PAYMENT_PLAN: String
        TITLE: String
        REMARK: String
        CHARGER: String
        END_TYPE: String
        PAY_AMT: String
        PAY_CURR_CD: String
        PAY_TYPE: String
        VAT_AMT: String
        PO_CD: String
        ORDER_CD: String
        GW_CODE: String
        USER_ID: String
        BILL_NO: String
        STOCK_IDX: String
    }

    type Ret_S0702_5 {
        CODE: String
        id: Int
    }

    input I_S0702_5_1 {
        END_TYPE: String
        END_DATE: String
        AMT: String
    }

    input I_S0702_5_CANCEL_END_CREDIT {
        CRDB_CD: String
        END_DATE: String
        CRDB_AMT: String
        REF_NO: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        MANAGE_DATE: String
        PRE_FLAG: String
        END_TYPE: String
        VAT: String
    }

    input I_S0702_5_UPDATE_END_TYPE {
        CRDB_CD: String
        END_DATE: String
        AMT: String
        END_TYPE: String
    }

    type Mutation {
        mgrInsert_S0702_5_INSERT_DEBIT_NOTE(datas: I_S0702_5!): [Ret_S0702_5!]!
        mgrInsert_S0702_5_UPDATE_END_TYPE(
            datas: [I_S0702_5_UPDATE_END_TYPE!]!
        ): [Ret_S0702_5!]!
        mgrInsert_S0702_5_CANCEL_DEBIT_NOTE(datas: I_S0702_5!): [Ret_S0702_5!]!
        mgrInsert_S0702_5_UPDATE_DEBIT_NOTE(datas: I_S0702_5!): [Ret_S0702_5!]!
        mgrInsert_S0702_5_END_DEBIT_NOTE(
            datas: I_S0702_5!
            datas1: I_S0702_5_1!
        ): [Ret_S0702_5!]!
        mgrInsert_S0702_5_CANCEL_END_CREDIT(
            datas: I_S0702_5!
            datas1: [I_S0702_5_CANCEL_END_CREDIT!]!
        ): [Ret_S0702_5!]!
        mgrUpdate_S0702_5_GW_DEBIT_NOTE(datas: [I_S0702_5!]!): [Ret_S0702_5!]!
    }
`;

export default moduleTypedefs_S0702_5;
