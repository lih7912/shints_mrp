// MGR_S0801_4_CRDB.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0801_4_CRDB = gql`
    type T_S0801_4_CRDB {
        CRDB_CD: String
        CRDB_SEQ: String
        CRDB_DATE: String
        COM_NAME: String
        CRDB_AMT: String
        BALANCE: String
        CURR_CD: String
        USD_BAL: String
        TITLE: String
        REG_USER: String
        END_DATE: String
        REMARK: String
        STATUS: String
        PO_CD: String
        ORDER_CD: String
        BANK_CD: String
        COM_CD: String
        STATUS_CD: String
        BUYER_CD: String
        BUYER_NAME: String
        PAYMENT_PLAN: String
    }

    type T_S0801_4_CRDB_1 {
        END_DATE: String
        CRDB_AMT: String
    }

    input I_S0801_4_CRDB {
        CRDB_CD: String
        VENDOR_CD: String
        CURR_CD: String
    }

    input I_S0801_4_CRDB_REPORT {
        VENDOR_TYPE_N: String
        VENDOR_NAME: String
        VENDOR_CD: String
        VENDOR_TYPE: String
        BILL_CD: String
        PAY_DATE: String
        INVOICE_DATE: String
        CURR_CD: String
        PO_AMT: String
        LC_AMT: String
        DEPOSIT_AMT: String
        VAT_AMT: String
        PAY_AMT: String
        IN_PAY_AMT: String
        PAY_BANK: String
        TAX_KIND: String
        PAY_TYPE: String
        PAY_TYPE_N: String
        PAY_TERM: String
        PAY_REPORT: String
        PUR_FACTORY: String
        BILL_FLAG: String
        REG_USER: String
        PAID_AMT: String
        BANK_NAME: String
        ACCOUNT_NO: String
        ACCOUNT_NAME: String
        SFTCODE: String
        GW_STATUS_N: String
        GW_STATUS: String
        GW_STATUS_CD: String
        GW_STATUS_N_TAXBILL: String
        GW_STATUS_TAXBILL: String
        GW_STATUS_CD_TAXBILL: String
        TAXBILL_CD: String
        APPROKEY: String
        APPROKEY_TAXBILL: String
        TAX_KIND_N: String
        DEBIT_AMT: String
        DISCOUNT_AMT: String
        BAL_DEBIT: String
        DOCU_NO: String
        DOCU_NO_TAXBILL: String
        BUY_DATE: String
        PUR_APP: String
        TT_FLAG: String
        COMPANY_CODE: String
        BAL_AMT: String
        INVOICE_NO: String
        BILL_END_FLAG: String
    }
    type T_RET_S0801_4_CRDB {
        id: Int
        CODE: String
    }

    type Query {
        mgrQueryS0801_4_CRDB_REPORT(
            data: [I_S0801_4_CRDB_REPORT!]!
        ): [T_RET_S0801_4_CRDB!]!
        mgrQueryS0801_4_CRDB_REPORT_bak1(
            data: [I_S0801_4_CRDB_REPORT!]!
        ): [T_RET_S0801_4_CRDB!]!
        mgrQueryS0801_4_CRDB(data: I_S0801_4_CRDB!): [T_S0801_4_CRDB!]!
        mgrQueryS0801_4_CRDB_1(data: I_S0801_4_CRDB!): [T_S0801_4_CRDB_1!]!
    }
`;

export default moduleTypedefs_S0801_4_CRDB;
