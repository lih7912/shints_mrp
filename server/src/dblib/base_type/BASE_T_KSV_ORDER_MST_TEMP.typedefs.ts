// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_ORDER_MST_TEMP = gql`
    type BASE_QRY_KSV_ORDER_MST_TEMP {
        ORDER_CD: String
        STYLE_CD: String
        TOT_CNT: Int
        SIZE_GROUP: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_ORDER_MST_TEMP {
        ORDER_CD: String
        STYLE_CD: String
        TOT_CNT: Int
        SIZE_GROUP: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_ORDER_MST_TEMP;
