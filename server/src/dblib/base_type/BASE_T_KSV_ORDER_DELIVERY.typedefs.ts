// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_ORDER_DELIVERY = gql`
    type BASE_QRY_KSV_ORDER_DELIVERY {
        ORDER_CD: String
        PROD_CD: String
        DELIVERY_DATE: String
        DELIVERY_CNT: Int
        SIZE_CNT: String
        DELIVERY_NO: String
        DELIVERY_PRICE: Float
        DELIVERY_CURR_CD: String
        ISSUE_DATE: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        DELIVERY_DUE_DATE: String
        INVOICE_NO: String
        id: Int
    }

    input BASE_INPUT_KSV_ORDER_DELIVERY {
        ORDER_CD: String
        PROD_CD: String
        DELIVERY_DATE: String
        DELIVERY_CNT: Int
        SIZE_CNT: String
        DELIVERY_NO: String
        DELIVERY_PRICE: Float
        DELIVERY_CURR_CD: String
        ISSUE_DATE: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        DELIVERY_DUE_DATE: String
        INVOICE_NO: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_ORDER_DELIVERY;
