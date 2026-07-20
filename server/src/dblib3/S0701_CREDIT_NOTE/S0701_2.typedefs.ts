// MGR_S0701_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0701_2 = gql`
    type T_S0701_2 {
        CHARGER_TEAM: String
        CRDB_CD: String
        CRDB_SEQ: String
        CRDB_DATE: String
        MESSER: String
        CRDB_AMT: String
        END_AMT: String
        BALANCE: String
        CURR_CD: String
        USD_BAL: String
        TITLE: String
        CHARGER: String
        END_DATE: String
        REMARK: String
        STATUS: String
        GW_STATUS: String
        PO_CD: String
        ORDER_CD: String
        BANK_CD: String
        BANK_NAME: String
        MESSER_CD: String
        STATUS_CD: String
        BUYER_CD: String
        BUYER_NAME: String
        PAYMENT_PLAN: String
        APPROKEY: String
        DOCU_NO: String
        END_USER: String
        REG_USER: String
        DEBIT_TYPE: String
        DEBIT_TYPE_NAME: String
        LINK_TO: String
        END_DATE2: String
        BUYER_TEAM: String
        CONF_USER: String
        END_TYPE_NAME: String
        END_TYPE: String
        VAT: String
        USD_RATE: String
        CA_NO: String
    }

    input I_S0701_2_BY_NUMBER {
        DEBIT_NO: String
        PO_CD: String
        ORDER_CD: String
    }

    input I_S0701_2 {
        S_ISSUE_DATE: String
        E_ISSUE_DATE: String
        PAY_TO: String
        BILL_TO: String
        CHARGER: String
        STATUS_CD: String
        TITLE: String
        BUYER_CD: String
        DEBIT_NO: String
        ORDER_CD: String
        PO_CD: String
    }

    type T_S0701_2_1 {
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

    input I_S0701_2_1 {
        CRDB_CD: String
    }

    type Query {
        mgrQueryS0701_2(data: I_S0701_2!): [T_S0701_2!]!
        mgrQueryS0701_2_BY_NUMBER(data: I_S0701_2_BY_NUMBER!): [T_S0701_2!]!
        mgrQueryS0701_2_1(data: I_S0701_2_1!): [T_S0701_2_1!]!
    }
`;

export default moduleTypedefs_S0701_2;
