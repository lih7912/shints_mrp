// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_GW_TAXBILL_KR = gql`
    type BASE_QRY_KCD_GW_TAXBILL_KR {
        APPROKEY: String
        DOC_NO: String
        VENDOR_CD: String
        CLOSING_DATE: String
        PAY_DATE: String
        CURR_CD: String
        CURR_INPUT: String
        PUR_APP: String
        TT_FLAG: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        YEAR: String
        PUR_FACTORY: String
        TAX: Float
        MINUS_AMOUNT: Float
        TOT_AMOUNT: Float
        CURR_RATE: Float
        KRW_AMOUNT: Float
        NEOE_NO: String
        TAXBILL_DATE: String
        TAXBILL_CD: String
        PAY_BANK: String
        id: Int
    }

    input BASE_INPUT_KCD_GW_TAXBILL_KR {
        APPROKEY: String
        DOC_NO: String
        VENDOR_CD: String
        CLOSING_DATE: String
        PAY_DATE: String
        CURR_CD: String
        CURR_INPUT: String
        PUR_APP: String
        TT_FLAG: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        YEAR: String
        PUR_FACTORY: String
        TAX: Float
        MINUS_AMOUNT: Float
        TOT_AMOUNT: Float
        CURR_RATE: Float
        KRW_AMOUNT: Float
        NEOE_NO: String
        TAXBILL_DATE: String
        TAXBILL_CD: String
        PAY_BANK: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_GW_TAXBILL_KR;
