// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_SSV_ORDER_PROD = gql`
    type BASE_QRY_SSV_ORDER_PROD {
        ORDER_CD: String
        PROD_DATE: String
        PROD_STEP: String
        SIZE: String
        SIZE_SEQ: Int
        PROD_CNT: Int
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_SSV_ORDER_PROD {
        ORDER_CD: String
        PROD_DATE: String
        PROD_STEP: String
        SIZE: String
        SIZE_SEQ: Int
        PROD_CNT: Int
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_SSV_ORDER_PROD;
