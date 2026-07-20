// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_PROD_MST = gql`
    type BASE_QRY_KSV_PROD_MST {
        PROD_CD: String
        STYLE_CD: String
        PROD_TYPE: String
        COLOR: String
        PROD_UNIT: String
        COLLECTION: String
        YY: Int
        SEQ: Int
        SIZE_LOSS: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_PROD_MST {
        PROD_CD: String
        STYLE_CD: String
        PROD_TYPE: String
        COLOR: String
        PROD_UNIT: String
        COLLECTION: String
        YY: Int
        SEQ: Int
        SIZE_LOSS: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_PROD_MST;
