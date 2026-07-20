// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_STOCK_FACIN_ORDER = gql`
    type BASE_QRY_KSV_STOCK_FACIN_ORDER {
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: Int
        MATL_SEQ: Int
        IN_QTY: Float
        TOT_QTY: Float
        IN_DATE: String
        REG_USER: String
        REG_DATETIME: String
        PAY_PRICE: Float
        PAY_CURR_CD: String
        id: Int
    }

    input BASE_INPUT_KSV_STOCK_FACIN_ORDER {
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: Int
        MATL_SEQ: Int
        IN_QTY: Float
        TOT_QTY: Float
        IN_DATE: String
        REG_USER: String
        REG_DATETIME: String
        PAY_PRICE: Float
        PAY_CURR_CD: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_STOCK_FACIN_ORDER;
