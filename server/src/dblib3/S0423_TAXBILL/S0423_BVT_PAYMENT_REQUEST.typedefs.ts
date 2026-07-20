import { gql } from 'apollo-server';

const moduleTypedefs_S0423_BVT_PAYMENT_REQUEST = gql`
    input I_S0423_BVT_PAYMENT_REQUEST {
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
    }

    input I_S0423_BVT_PAYMENT_REQUEST_QRY {
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

    type T_RET_S0423_BVT_PAYMENT_REQUEST_RETURN {
        id: Int
        CODE: String
    }

    type Query {
        mgrQueryS0423_BVT_PAYMENT_REQUEST(
            data: [I_S0423_BVT_PAYMENT_REQUEST!]!
            qry: I_S0423_BVT_PAYMENT_REQUEST_QRY
        ): [T_RET_S0423_BVT_PAYMENT_REQUEST_RETURN!]!
    }
`;

export default moduleTypedefs_S0423_BVT_PAYMENT_REQUEST;
