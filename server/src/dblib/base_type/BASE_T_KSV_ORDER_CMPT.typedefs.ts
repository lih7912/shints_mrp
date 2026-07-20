// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_ORDER_CMPT = gql`
    type BASE_QRY_KSV_ORDER_CMPT {
        ORDER_CD: String
        NEGO_SEQ: Int
        NEGO_TYPE: String
        BVT_CMPT: Float
        STS_CMPT: Float
        REMARK: String
        REG_USER: String
        REG_DATETIME: String
        BVT_SCREEN_PRINT: Float
        BVT_HEAT_SILICON: Float
        BVT_EMBROIDERY: Float
        BVT_TPR: Float
        BVT_WELDING: Float
        BVT_QUILTING: Float
        BVT_DIGITAL_PRINT: Float
        BVT_LINE_CHARGE: Float
        BVT_LABEL_PRINT: Float
        id: Int
    }

    input BASE_INPUT_KSV_ORDER_CMPT {
        ORDER_CD: String
        NEGO_SEQ: Int
        NEGO_TYPE: String
        BVT_CMPT: Float
        STS_CMPT: Float
        REMARK: String
        REG_USER: String
        REG_DATETIME: String
        BVT_SCREEN_PRINT: Float
        BVT_HEAT_SILICON: Float
        BVT_EMBROIDERY: Float
        BVT_TPR: Float
        BVT_WELDING: Float
        BVT_QUILTING: Float
        BVT_DIGITAL_PRINT: Float
        BVT_LINE_CHARGE: Float
        BVT_LABEL_PRINT: Float
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_ORDER_CMPT;
