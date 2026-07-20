// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_INVENTORY_ORDER = gql`
    type BASE_QRY_KSV_INVENTORY_ORDER {
        PO_CD: String
        ORDER_CD: String
        DATE_FROM: String
        DATE_TO: String
        BEF_AMOUNT: Float
        INPUT_AMOUNT: Float
        INPUT_AMOUNT_KRW: Float
        FAC_IN_AMOUNT: Float
        FAC_IN_AMOUNT_KRW: Float
        REG_USER: String
        REG_DATETIME: String
        ORIGINAL_AMOUNT_KRW: Float
        PRODUCT_AMOUNT_KRW: Float
        STOCK_AMOUNT_KRW: Float
        FAC_LC_FLAG: String
        id: Int
    }

    input BASE_INPUT_KSV_INVENTORY_ORDER {
        PO_CD: String
        ORDER_CD: String
        DATE_FROM: String
        DATE_TO: String
        BEF_AMOUNT: Float
        INPUT_AMOUNT: Float
        INPUT_AMOUNT_KRW: Float
        FAC_IN_AMOUNT: Float
        FAC_IN_AMOUNT_KRW: Float
        REG_USER: String
        REG_DATETIME: String
        ORIGINAL_AMOUNT_KRW: Float
        PRODUCT_AMOUNT_KRW: Float
        STOCK_AMOUNT_KRW: Float
        FAC_LC_FLAG: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_INVENTORY_ORDER;
