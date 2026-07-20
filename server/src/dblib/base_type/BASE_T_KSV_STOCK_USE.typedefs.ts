// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_STOCK_USE = gql`
    type BASE_QRY_KSV_STOCK_USE {
        STOCK_IDX: String
        USE_DATETIME: String
        USE_QTY: Float
        USE_PO_CD: String
        USE_PO_SEQ: Int
        USE_ORDER_CD: String
        USE_MATL_CD: String
        USE_MRP_SEQ: Int
        USE_MATL_SEQ: Int
        FACTORY_CD: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        OUT_DATE: String
        CONF_FLAG: String
        CONF_USER: String
        CONF_DATETIME: String
        req_qty: Float
        defect_qty: Float
        loss_qty: Float
        PACK_CD: String
        OUTPUT_FLAG: String
        ORG_STOCK_IDX: String
        id: Int
    }

    input BASE_INPUT_KSV_STOCK_USE {
        STOCK_IDX: String
        USE_DATETIME: String
        USE_QTY: Float
        USE_PO_CD: String
        USE_PO_SEQ: Int
        USE_ORDER_CD: String
        USE_MATL_CD: String
        USE_MRP_SEQ: Int
        USE_MATL_SEQ: Int
        FACTORY_CD: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        OUT_DATE: String
        CONF_FLAG: String
        CONF_USER: String
        CONF_DATETIME: String
        req_qty: Float
        defect_qty: Float
        loss_qty: Float
        PACK_CD: String
        OUTPUT_FLAG: String
        ORG_STOCK_IDX: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_STOCK_USE;
