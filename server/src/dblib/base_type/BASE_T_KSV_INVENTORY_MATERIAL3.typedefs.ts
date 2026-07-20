// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_INVENTORY_MATERIAL3 = gql`
    type BASE_QRY_KSV_INVENTORY_MATERIAL3 {
        PO_CD: String
        MATL_CD: String
        FAC_IN_QTY_PERIOD: Float
        PAY_PRICE: Float
        PAY_CURR_CD: String
        MOQ_QTY: Float
        STOCK_USE_QTY: Float
        ESO_QTY: Float
        STOCK_MOVE_QTY: Float
        FAC_IN_QTY: Float
        FAC_OUT_QTY: Float
        PRODUCT_QTY: Float
        FINISH_QTY: Float
        REG_USER: String
        REG_DATETIME: String
        UPD_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_INVENTORY_MATERIAL3 {
        PO_CD: String
        MATL_CD: String
        FAC_IN_QTY_PERIOD: Float
        PAY_PRICE: Float
        PAY_CURR_CD: String
        MOQ_QTY: Float
        STOCK_USE_QTY: Float
        ESO_QTY: Float
        STOCK_MOVE_QTY: Float
        FAC_IN_QTY: Float
        FAC_OUT_QTY: Float
        PRODUCT_QTY: Float
        FINISH_QTY: Float
        REG_USER: String
        REG_DATETIME: String
        UPD_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_INVENTORY_MATERIAL3;
