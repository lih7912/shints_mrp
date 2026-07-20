// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_INVOICE_BILL = gql`
    type BASE_QRY_KSV_INVOICE_BILL {
        INVOICE_NO: String
        BILL_DATE: String
        BILL_AMT: Float
        CURR_CD: String
        REF_NO: String
        DEBIT_CD: String
        BILL_TYPE: String
        START_DATE: String
        END_DATE: String
        BANK_CD: String
        STATUS_CD: String
        PRE_FLAG: String
        REG_USER: String
        REG_DATETIME: String
        BILL_AMT_ORG: Float
        CURRENCY_RATE: Float
        BUYER_CD: String
        id: Int
    }

    input BASE_INPUT_KSV_INVOICE_BILL {
        INVOICE_NO: String
        BILL_DATE: String
        BILL_AMT: Float
        CURR_CD: String
        REF_NO: String
        DEBIT_CD: String
        BILL_TYPE: String
        START_DATE: String
        END_DATE: String
        BANK_CD: String
        STATUS_CD: String
        PRE_FLAG: String
        REG_USER: String
        REG_DATETIME: String
        BILL_AMT_ORG: Float
        CURRENCY_RATE: Float
        BUYER_CD: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_INVOICE_BILL;
