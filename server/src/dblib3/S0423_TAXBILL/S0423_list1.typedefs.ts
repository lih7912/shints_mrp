// MGR_S0423_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0423_LIST_1 = gql`
    type T_S0423_LIST_1 {
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
        GW_STATUS: String
        GW_STATUS_N: String
        GW_STATUS_CD: String
        GW_STATUS_TAXBILL: String
        GW_STATUS_N_TAXBILL: String
        GW_STATUS_CD_TAXBILL: String
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
        CHECK_PO_AMT:String
    }

    input I_S0423_LIST_1 {
        BILL_CD: String
        S_IN_DATE: String
        E_IN_DATE: String
        VENDOR_CD: String
        TAX_KIND: String
        S_PAY_DATE: String
        E_PAY_DATE: String
        REG_USER: String
        GW_STATUS: String
        VENDOR_TYPE: String
    }

    type T_S0423_LIST_1_ALL {
        MESSAGE: String
        DATAS: [T_S0423_LIST_1!]!
    }

    type Query {
        mgrQueryS0423_LIST_1(data: I_S0423_LIST_1!): T_S0423_LIST_1_ALL!
        mgrQueryS0423_LIST_1_bak(data: I_S0423_LIST_1!): [T_S0423_LIST_1!]!
        mgrQueryS0423_LIST_1_bak2(data: I_S0423_LIST_1!): [T_S0423_LIST_1!]!
        mgrQueryS0423_LIST_1_bak3(data: I_S0423_LIST_1!): [T_S0423_LIST_1!]!
        mgrQueryS0423_LIST_1_bak4(data: I_S0423_LIST_1!): [T_S0423_LIST_1!]!
        mgrQueryS0423_LIST_1_bak5(data: I_S0423_LIST_1!): T_S0423_LIST_1_ALL!
        mgrQueryS0423_LIST_1_bak6(data: I_S0423_LIST_1!): T_S0423_LIST_1_ALL!
        mgrQueryS0423_LIST_1_bak7(data: I_S0423_LIST_1!): T_S0423_LIST_1_ALL!
        mgrQueryS0423_LIST_1_bak8(data: I_S0423_LIST_1!): T_S0423_LIST_1_ALL!
    }
`;

export default moduleTypedefs_S0423_LIST_1;
