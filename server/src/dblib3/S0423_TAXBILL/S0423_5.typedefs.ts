// MGR_S0423_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0423_5 = gql`
    input I_S0423_5 {
        TAX_KIND_N: String
        TAX_KIND: String
        BILL_CD: String
        VENDOR_NAME: String
        VENDOR_CD: String
        VENDOR_TYPE: String
        VENDOR_TYPE_N: String
        INVOICE_DATE: String
        PAY_DATE: String
        PAY_TERM: String
        PAY_TYPE: String
        PAY_TYPE_N: String
        CURR_CD: String
        PO_AMT: String
        DEPOSIT_AMT: String
        LC_AMT: String
        DEBIT_AMT: String
        DISCOUNT_AMT: String
        VAT_AMT: String
        PAY_AMT: String
        PAID_AMT: String
        IN_PAY_AMT: String
        REG_USER: String
        BILL_FLAG: String
        GW_STATUS: String
        GW_STATUS_CD: String
        GW_STATUS_N: String
        GW_STATUS_TAXBILL: String
        GW_STATUS_CD_TAXBILL: String
        GW_STATUS_N_TAXBILL: String
        PAY_BANK: String
        BANK_NAME: String
        ACCOUNT_NO: String
        ACCOUNT_NAME: String
        TAXBILL_CD: String
        SFTCODE: String
        APPROKEY: String
        APPROKEY_TAXBILL: String
        BAL_DEBIT: String
        PAY_REPORT: String
        PUR_FACTORY: String
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
    }

    type Ret_S0423_5 {
        CODE: String
        id: Int
    }

    input I_S0423_5_5_1 {
        CRDB_CD: String
        PART_AMT: String
        REST_AMT: String
        PART_DATE: String
    }

    input I_S0423_5_5_2 {
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

    type Mutation {
        mgrInsert_S0423_TAXBILL(datas: [I_S0423_5!]!): [Ret_S0423_5!]!
        mgrInsert_S0423_TAXBILL_bak2(datas: [I_S0423_5!]!): [Ret_S0423_5!]!
        mgrInsert_S0423_TAXBILL_CANCEL(datas: [I_S0423_5!]!): [Ret_S0423_5!]!
        mgrInsert_S0423_BILL_CANCEL(datas: [I_S0423_5!]!): [Ret_S0423_5!]!
        mgrUpdate_S0423_UPDATE_DC(datas: [I_S0423_5!]!): [Ret_S0423_5!]!
        mgrUpdate_S0423_PAY_DATE(
            datas: [I_S0423_5!]!
            pay_date: String!
        ): [Ret_S0423_5!]!
        mgrUpdate_S0423_GW(datas: [I_S0423_5!]!): [Ret_S0423_5!]!
        mgrUpdate_S0423_GW_TAXBILL(datas: [I_S0423_5!]!): [Ret_S0423_5!]!
        mgrUpdate_S0423_GW_IN(datas: [I_S0423_5!]!): [Ret_S0423_5!]!
        mgrUpdate_S0423_UPDATE_DN(
            datas: [I_S0423_5!]!
            datas1: I_S0423_5_5_1!
            datas2: I_S0423_5_5_2!
        ): [Ret_S0423_5!]!
        mgrDelete_S0423_DELETE_DN(
            datas: [I_S0423_5!]!
            datas1: I_S0423_5_5_1!
            datas2: I_S0423_5_5_2!
        ): [Ret_S0423_5!]!
        mgrUpdate_S0423_BILL_END(datas: [I_S0423_5!]!): [Ret_S0423_5!]!
    }
`;

export default moduleTypedefs_S0423_5;
