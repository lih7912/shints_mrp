// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_INVOICE_CREDIT = gql`
    type BASE_QRY_KSV_INVOICE_CREDIT {
        REF_NO: String
        CREDIT_CD: String
        CREDIT_AMT: Float
        PRE_FLAG: String
        BUYER_CD: String
        id: Int
    }

    input BASE_INPUT_KSV_INVOICE_CREDIT {
        REF_NO: String
        CREDIT_CD: String
        CREDIT_AMT: Float
        PRE_FLAG: String
        BUYER_CD: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_INVOICE_CREDIT;
