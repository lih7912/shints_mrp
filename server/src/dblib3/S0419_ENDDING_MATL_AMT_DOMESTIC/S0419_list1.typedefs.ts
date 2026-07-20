// MGR_S0419_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0419_LIST_1 = gql`
    type T_S0419_PAY_BANK {
        BANK_CD: String
        BANK_NAME: String
    }

    type T_S0419_BILL_MST {
        PAY_DATE: String
        PO_AMT: String
        DEPOSIT_AMT: String
        LC_AMT: String
        DEBIT_AMT: String
        DISCOUNT_AMT: String
        VAT_AMT: String
        PAY_AMT: String
        PAY_BANK: String
        TAX_KIND: String
    }

    type T_S0419_LIST_1_1 {
        IN_DATE: String
        STSIN_CD: String
        BUYER_NAME: String
        BUYER_CD: String
        PU_CD: String
        PO_CD2: String
        VENDOR_CD: String
        VENDOR_NAME: String
        VENDOR_TYPE: String
        TARGET_ETA: String
        READY_DATE: String
        PAY_DATE: String
        CURR_CD: String
        DEPOSIT_AMT: String
        LC_FLAG: String
        LC_AMT: String
        PO_AMT: String
        PAY_AMT: String
        END_AMT: String
        PAY_BANK: String
        PURCHARGER: String
        PUR_APP: String
        TT_FLAG: String
        PUR_FACTORY: String
        END_DATE: String
        PAY_REPORT: String
        BILL_CD: String
        IN_QTY: String
        LC_QTY: String
        COMPANY_CODE: String
        PAY_TERM: String
        PAY_PRICE: String
        PAY_BANK_ARRAY: [T_S0419_PAY_BANK!]!
        BILL_MST: [T_S0419_BILL_MST!]!
    }

    type T_S0419_LIST_1 {
        BUYER_CD: String
        BUYER_NAME: String
        PU_CD: String
        PO_CD: String
        VENDOR_CD: String
        VENDOR_NAME: String
        VENDOR_TYPE: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        CURR_CD: String
        PO_QTY: String
        PO_PRICE: String
        PO_AMT: String
        PAY_DATE: String
        REG_USER: String
        PAY_BANK: String
        PAY_BANK2: String
        INVOICE_DATE: String
        VAT_AMT: String
        PAY_AMT: String
        PAYER: String
        DEPOSIT_AMT: String
        PU_AMT: String
        DEPOSIT_RATE: String
        LC_FLAG: String
        LC_AMT: String
        STSIN_CD: String
        PERMIT: String
        FACTORY_CD: String
        BANK_NAME: String
        PAY_REPORT: String
        BILL_CD: String
        PAY_BANK_ARRAY: [T_S0419_PAY_BANK!]!
    }

    input I_S0419_LIST_1 {
        VENDOR_TYPE: String
        PURCHARGER: String
        PU_CD: String
        S_PAY_DATE: String
        E_PAY_DATE: String
        S_END_DATE: String
        E_END_DATE: String
        S_IN_DATE: String
        E_IN_DATE: String
        VENDOR_CD: String
        BUYER_CD: String
        PO_CD: String
        IS_ALL: String
        BILL_CD: String
    }

    input I_S0419_LIST_INFO {
        BILL_CD: String
    }

    type T_S0419_BILL_MST {
        BILL_CD: String
        INVOICE_DATE: String
        PAY_DATE: String
        CURR_CD: String
        PO_AMT: String
        DEPOSIT_AMT: String
        LC_AMT: String
        DEBIT_AMT: String
        DISCOUNT_AMT: String
        VAT_AMT: String
        PAY_AMT: String
        REG_USER: String
        REG_DATETIME: String
        TAX_KIND: String
        VENDOR_CD: String
        GW_STATUS: String
        PAY_BANK: String
    }

    type T_S0419_BANK {
        BANK_CD: String
        BANK_NAME: String
    }

    type T_S0419_LIST_INFO {
        BILL_MST: T_S0419_BILL_MST!
        BILL_LIST: [T_S0419_LIST_1!]!
        BANK_ARRAY: [T_S0419_BANK!]!
    }

    type T_S0419_LIST_DETAIL_0 {
        PU_CD: String
        PO_CD: String
        PO_SEQ: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        TOT_QTY: String
        IN_QTY: String
        LC_QTY: String
        IN_CURR_CD: String
        IN_PRICE: String
        IN_DATETIME: String
        PAY_DATE: String
        END_FLAG: String
        END_DATE: String
        PAY_REPORT: String
        CALC_FLAG: String
        STSIN_CD: String
        BILL_NO: String
        TAX: String
    }

    type T_S0419_LIST_DETAIL_1 {
        DC_AMOUNT: String
        DN_AMOUNT: String
    }

    type T_S0419_LIST_DETAIL {
        datas: [T_S0419_LIST_DETAIL_0!]!
        datas1: [T_S0419_LIST_DETAIL_1!]!
    }

    input I_S0419_LIST_DETAIL {
        PU_CD: String
        PO_CD: String
        PAY_DATE: String
        CURR_CD: String
        IN_DATE: String
        STSIN_CD: String
        END_DATE: String
        VENDOR_CD: String
        PAY_REPORT: String
        BILL_CD: String
        PUR_APP: String
        TT_FLAG: String
        IN_QTY: String
        PURCHARGER: String
    }

    type Query {
        mgrQueryS0419_LIST_1(data: I_S0419_LIST_1!): [T_S0419_LIST_1_1!]!
        mgrQueryS0419_LIST_1_bak(data: I_S0419_LIST_1!): [T_S0419_LIST_1!]!
        mgrQueryS0419_LIST_1_bak2(data: I_S0419_LIST_1!): [T_S0419_LIST_1!]!
        mgrQueryS0419_LIST_1_bak3(data: I_S0419_LIST_1!): [T_S0419_LIST_1_1!]!
        mgrQueryS0419_LIST_1_bak4(data: I_S0419_LIST_1!): [T_S0419_LIST_1_1!]!
        mgrQueryS0419_LIST_1_bak5(data: I_S0419_LIST_1!): [T_S0419_LIST_1_1!]!
        mgrQueryS0419_LIST_1_bak6(data: I_S0419_LIST_1!): [T_S0419_LIST_1_1!]!
        mgrQueryS0419_LIST_INFO(data: I_S0419_LIST_INFO!): T_S0419_LIST_INFO!
        mgrQueryS0419_LIST_DETAIL(
            data: [I_S0419_LIST_DETAIL!]!
        ): T_S0419_LIST_DETAIL!
        mgrQueryS0419_LIST_DETAIL_1106(
            data: [I_S0419_LIST_DETAIL!]!
        ): T_S0419_LIST_DETAIL!
    }
`;

export default moduleTypedefs_S0419_LIST_1;
