// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_CAPASAMPLE_MST = gql`
    type BASE_QRY_KSV_CAPASAMPLE_MST {
        BOOK_DATE: String
        USER_ID: String
        STATUS_CD: String
        PLAN_FLAG: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_CAPASAMPLE_MST {
        BOOK_DATE: String
        USER_ID: String
        STATUS_CD: String
        PLAN_FLAG: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_CAPASAMPLE_MST;
