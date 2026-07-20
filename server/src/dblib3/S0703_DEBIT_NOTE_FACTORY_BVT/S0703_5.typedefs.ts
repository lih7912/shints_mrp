// MGR_S0703_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0703_5 = gql`
    input I_S0703_5 {
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
        BL_NO: String
        TRANSPORT: String
        FREIGHT: String
        CBM: String
        WEIGHT: String
        HISTORY_NO: String
        CI_NO: String
        TOT_CBM: String
        TOT_AMT: String
        CONFIRM_USER: String
        REMARK_S: String
        BAL_AMT: String
        CONFIRM: String
    }

    input I_S0703_5_SELECTED {
        CRDB_CD: String
        CRDB_SEQ: String
        CRDB_DATE: String
        BUYER_CD: String
        CRDB_AMT: String
        BALANCE: String
        CURR_CD: String
        TITLE: String
        CHARGER: String
        CONF_FLAG: String
        CONF_USER: String
        CREDIT_STATUS: String
        REMARK: String
        REMARK_S: String
        DEBIT_TYPE_NAME: String
        DEBIT_TYPE: String
        HISTORY_NO: String
        DEBIT_BL_NO: String
        CI_NO: String
        TRANSPORTATION: String
        TOT_AMT: String
        CBM: String
        STATUS_CD: String
        MESSER: String
        CHARGER_TEAM: String
    }

    type Ret_S0703_5 {
        CODE: String
        id: Int
    }

    input I_S0703_5_1 {
        END_TYPE: String
        END_DATE: String
        AMT: String
    }

    input I_S0703_5_CANCEL_END_CREDIT {
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

    input I_S0703_5_UPDATE_END_TYPE {
        CRDB_CD: String
        END_DATE: String
        AMT: String
        END_TYPE: String
    }

    input I_S0703_5_UPDATE_CRDB_DATE {
        CRDB_CD: String
        CRDB_DATE: String
    }

    type Mutation {
        mgrInsert_S0703_5_INSERT_DEBIT_NOTE_FACTORY_BVT(
            datas: I_S0703_5!
        ): [Ret_S0703_5!]!
        mgrInsert_S0703_5_UPDATE_CONFIRM(
            datas: [I_S0703_5_UPDATE_END_TYPE!]!
        ): [Ret_S0703_5!]!
        mgrInsert_S0703_5_UPDATE_END_TYPE(
            datas: [I_S0703_5_UPDATE_END_TYPE!]!
        ): [Ret_S0703_5!]!
        mgrInsert_S0703_5_CANCEL_DEBIT_NOTE_FACTORY_BVT(
            datas: I_S0703_5!
        ): [Ret_S0703_5!]!
        mgrInsert_S0703_5_UPDATE_DEBIT_NOTE_FACTORY_BVT(
            datas: I_S0703_5!
        ): [Ret_S0703_5!]!
        mgrInsert_S0703_5_END_DEBIT_NOTE_FACTORY_BVT(
            datas: I_S0703_5!
            datas1: I_S0703_5_1!
            selectedItem: [I_S0703_5_SELECTED!]!
        ): [Ret_S0703_5!]!
        mgrInsert_S0703_5_CANCEL_END_CREDIT(
            datas: I_S0703_5!
            datas1: I_S0703_5_1!
            selectedItem: [I_S0703_5_SELECTED!]!
        ): [Ret_S0703_5!]!
        mgrUpdate_S0703_5_GW_DEBIT_NOTE_FACTORY_BVT(
            datas: [I_S0703_5!]!
        ): [Ret_S0703_5!]!
        mgrInsert_S0703_5_UPDATE_CRDB_DATE (
            datas: [I_S0703_5_UPDATE_CRDB_DATE!]!
        ): [Ret_S0703_5!]!
    }
`;

export default moduleTypedefs_S0703_5;
