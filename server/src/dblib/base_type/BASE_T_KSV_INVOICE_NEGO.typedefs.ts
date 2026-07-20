// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_INVOICE_NEGO = gql`
    type BASE_QRY_KSV_INVOICE_NEGO {
        REF_NO: String
        TOT_AMT: Float
        CURR_CD: String
        START_DATE: String
        END_DATE: String
        BILL_DATE: String
        DELAY_DAYS: Int
        DELAY_INTEREST: Float
        LESS_CHARGE: Float
        EXCHANGE_COMM: Float
        HANDLING_CHARGE: Float
        POSTAGE: Float
        BANK_CD: String
        BUYER_CD: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        FACTORY_CD: String
        INVOICE_NEGO_TYPE: String
        id: Int
    }

    input BASE_INPUT_KSV_INVOICE_NEGO {
        REF_NO: String
        TOT_AMT: Float
        CURR_CD: String
        START_DATE: String
        END_DATE: String
        BILL_DATE: String
        DELAY_DAYS: Int
        DELAY_INTEREST: Float
        LESS_CHARGE: Float
        EXCHANGE_COMM: Float
        HANDLING_CHARGE: Float
        POSTAGE: Float
        BANK_CD: String
        BUYER_CD: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        FACTORY_CD: String
        INVOICE_NEGO_TYPE: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_INVOICE_NEGO;
