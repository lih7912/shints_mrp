// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_INVOICE_PREBILL = gql`
    type BASE_QRY_KSV_INVOICE_PREBILL {
        REF_NO: String
        BUYER_CD: String
        TOT_AMT: Float
        CHARGE: Float
        BILL_DATE: String
        CURR_CD: String
        BANK_CD: String
        CREDIT_AMT: Float
        STATUS_CD: String
        END_FLAG: String
        PRE_FLAG: String
        REG_USER: String
        REG_DATETIME: String
        REMARK: String
        id: Int
    }

    input BASE_INPUT_KSV_INVOICE_PREBILL {
        REF_NO: String
        BUYER_CD: String
        TOT_AMT: Float
        CHARGE: Float
        BILL_DATE: String
        CURR_CD: String
        BANK_CD: String
        CREDIT_AMT: Float
        STATUS_CD: String
        END_FLAG: String
        PRE_FLAG: String
        REG_USER: String
        REG_DATETIME: String
        REMARK: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_INVOICE_PREBILL;
