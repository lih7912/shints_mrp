// MGR_S070301_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S070301_2 = gql`
    type T_S070301_2 {
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
        CHARGER_TEAM: String
        MESSER: String
    }

    input I_S070301_2 {
        S_ISSUE_DATE: String
        E_ISSUE_DATE: String
        PAY_TO: String
        BILL_TO: String
        CHARGER: String
        STATUS_CD: String
        TITLE: String
        BUYER_CD: String
        TEAM: String
        CRDB_CD: String
    }

    type T_S070301_2_1 {
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

    input I_S070301_2_1 {
        CRDB_CD: String
    }

    input I_S070301_2_BY_NUMBER {
        DEBIT_NO: String
        PO_CD: String
        ORDER_CD: String
    }

    type Query {
        mgrQueryS070301_2(data: I_S070301_2!): [T_S070301_2!]!
        mgrQueryS070301_2_bak(data: I_S070301_2!): [T_S070301_2!]!
        mgrQueryS070301_2_BY_NUMBER(
            data: I_S070301_2_BY_NUMBER!
        ): [T_S070301_2!]!
        mgrQueryS070301_2_1(data: I_S070301_2_1!): [T_S070301_2_1!]!
    }
`;

export default moduleTypedefs_S070301_2;
