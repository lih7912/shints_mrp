// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_ALRAM_MST = gql`
    type BASE_QRY_KCD_ALRAM_MST {
        ALRAM_CD: String
        ALRAM_TYPE: String
        USER_ID: String
        MENU_CD: String
        QUERY: String
        COMMENT: String
        STATUS_CD: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KCD_ALRAM_MST {
        ALRAM_CD: String
        ALRAM_TYPE: String
        USER_ID: String
        MENU_CD: String
        QUERY: String
        COMMENT: String
        STATUS_CD: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_ALRAM_MST;
