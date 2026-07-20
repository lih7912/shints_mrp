// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_ORDER_MRP_COMBINED = gql`
    type BASE_QRY_KSV_ORDER_MRP_COMBINED {
        ORDER_CD: String
        PROD_CD: String
        ORDER_MRP_SEQ: Int
        MATL_CD: String
        STD_NET: Float
        STD_LOSS: Float
        STD_GROSS: Float
        NET: Float
        LOSS: Float
        GROSS: Float
        REMARK: String
        USE_SIZE: String
        SEQ: Int
        COUNTRY: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_ORDER_MRP_COMBINED {
        ORDER_CD: String
        PROD_CD: String
        ORDER_MRP_SEQ: Int
        MATL_CD: String
        STD_NET: Float
        STD_LOSS: Float
        STD_GROSS: Float
        NET: Float
        LOSS: Float
        GROSS: Float
        REMARK: String
        USE_SIZE: String
        SEQ: Int
        COUNTRY: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_ORDER_MRP_COMBINED;
