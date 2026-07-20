// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_PO_MRPNET_COMBINED = gql`
    type BASE_QRY_KSV_PO_MRPNET_COMBINED {
        PO_CD: String
        ORDER_CD: String
        PROD_CD: String
        ADD_FLAG: String
        MATL_CD: String
        MATL_SEQ: Int
        PROD_SEQ: Int
        NET: Float
        LOSS: Float
        GROSS: Float
        REMARK: String
        USE_SIZE: String
        ORD_CNT: Int
        NET_QTY: Float
        USE_QTY: Int
        VENDOR_CD: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        COUNTRY: String
        id: Int
    }

    input BASE_INPUT_KSV_PO_MRPNET_COMBINED {
        PO_CD: String
        ORDER_CD: String
        PROD_CD: String
        ADD_FLAG: String
        MATL_CD: String
        MATL_SEQ: Int
        PROD_SEQ: Int
        NET: Float
        LOSS: Float
        GROSS: Float
        REMARK: String
        USE_SIZE: String
        ORD_CNT: Int
        NET_QTY: Float
        USE_QTY: Int
        VENDOR_CD: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        COUNTRY: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_PO_MRPNET_COMBINED;
