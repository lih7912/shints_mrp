// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_SSV_MAIL_LOG = gql`
    type BASE_QRY_SSV_MAIL_LOG {
        USER_ID: String
        PO_CD: String
        AGENT_CD: String
        SEND_EMAIL: String
        SEND_DATETIME: String
        SEND_FLAG: String
        SEND_FILENAME: String
        id: Int
    }

    input BASE_INPUT_SSV_MAIL_LOG {
        USER_ID: String
        PO_CD: String
        AGENT_CD: String
        SEND_EMAIL: String
        SEND_DATETIME: String
        SEND_FLAG: String
        SEND_FILENAME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_SSV_MAIL_LOG;
