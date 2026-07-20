// MGR_S0419_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0419_5 = gql`
    input I_S0419_5 {
        BILL_CD: String
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
    }

    input I_S0419_5_1 {
        IN_DATE: String
        STSIN_CD: String
        IN_QTY: String
        LC_QTY: String
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
        PAY_BANK: String
        PURCHARGER: String
        BILL_CD: String
        END_AMT: String
        BAL_AMT: String
        PUR_APP: String
        TT_FLAG: String
        PUR_FACTORY: String
        END_DATE: String
        PAY_REPORT: String
        COMPANY_CODE: String
        PAY_PRICE: String
    }

    input I_S0419_5_2 {
        BILL_CD: String
        VENDOR_CD: String
        PAY_BANK: String
        REG_USER: String
        INVOICE_DATE: String
        CURR_CD: String
        PO_AMT: String
        DEPOSIT_AMT: String
        DEBIT_AMT: String
        DISCOUNT_AMT: String
        PAY_DATE: String
        VAT_AMT: String
        PAY_AMT: String
        END_AMT: String
        TAX_KIND: String
        IS_TT: String
        IS_LC: String
        PUR_FACTORY: String
        INVOICE_NO: String
    }

    type Ret_S0419_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0419_5(
            datas: [I_S0419_5_1!]!
            datas1: I_S0419_5_2!
        ): [Ret_S0419_5!]!
        mgrInsert_S0419_5_1229(
            datas: [I_S0419_5_1!]!
            datas1: I_S0419_5_2!
        ): [Ret_S0419_5!]!
        mgrInsert_S0419_5_bak(
            datas: [I_S0419_5_1!]!
            datas1: I_S0419_5_2!
        ): [Ret_S0419_5!]!
    }
`;

export default moduleTypedefs_S0419_5;
