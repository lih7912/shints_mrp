// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_SSV_MSG_LOG = gql`
    type BASE_QRY_SSV_MSG_LOG {
        USER_ID: String
        MSG: String
        READ_FLAG: String
        READ_DATETIME: String
        SEND_USER: String
        SEND_DATETIME: String
        STATUS_CD: String
        id: Int
    }

    input BASE_INPUT_SSV_MSG_LOG {
        USER_ID: String
        MSG: String
        READ_FLAG: String
        READ_DATETIME: String
        SEND_USER: String
        SEND_DATETIME: String
        STATUS_CD: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_SSV_MSG_LOG;
