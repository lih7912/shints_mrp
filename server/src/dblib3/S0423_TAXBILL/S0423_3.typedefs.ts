// MGR_S0423_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0423_3 = gql`
    type T_S0423_3 {
        PO_CD: String
        BUYER_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        TOT_QTY: Float
        IN_QTY: Float
        IN_CURR_CD: String
        IN_PRICE: Float
        PAY_CURR_CD: String
        PAY_PRICE: Float
        TT_FLAG: String
        PAY_AMT: Float
        END_FLAG: String
        END_DATE: String
        PAY_DATE: String
        BILL_FLAG: String
        BILL_DATE: String
        VENDOR_NAME: String
        PO_SEQ: Int
        ORDER_CD: String
        MRP_SEQ: Int
        IN_DATETIME: String
        MATL_SEQ: Int
    }

    input I_S0423_3 {
        BILL_CD: String
        END_DATE: String
        VENDOR_NAME: String
        IN_AMT: String
        DEPOSIT_AMT: String
        LC_AMT: String
        CLOSING_AMT: String
        DC_AMOUNT: String
        DN_AMOUNT: String
        CURR_INPUT: String
        TAX: String
        PAY_AMOUNT: String
        PAY_CURR_CD: String
        KRW_AMOUNT: String
        GW_STATUS: String
        CALC_FLAG: String
        PUR_APP: String
        TT_FLAG: String
        PAY_DATE: String
        TAXBILL_DATE: String
        PUR_FACTORY: String
        REMARK: String
        PAY_REPORT: String
        LC_AMOUNT: String
        VENDOR_CD: String
        PAY_TERM: Int
        CALC_FLAG2: String
        PUR_APP2: String
        TT_FLAG2: String
        CRDB_CD: String
        PUR_FACTORY_CD: String
        GW_KEY: String
        OLD_PAY_DATE: String
        VENDOR_TYPE: String
        TEMP: String
        TAXBILL_CD: String
        PAY_BANK: String
        ACCOUNT_NAME: String
        STSIN_CD: String
        INVOICE_NAME: String
        BANK_BRANCH: String
        ACCOUNT_NO: String
        SFTCODE: String
        BANK_NAME: String
    }

    type Query {
        mgrQueryS0423_3(data: I_S0423_3!): [T_S0423_3!]!
    }
`;

export default moduleTypedefs_S0423_3;
