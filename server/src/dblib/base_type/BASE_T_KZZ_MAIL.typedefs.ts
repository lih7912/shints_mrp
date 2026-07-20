// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KZZ_MAIL = gql`
    type BASE_QRY_KZZ_MAIL {
        REG_DATETIME: String
        REG_USER: String
        MAIL_HEADER: String
        MAIL_BODY: String
        MAIL_FROM: String
        MAIL_TO: String
        MAIL_CC: String
        MAIL_BCC: String
        STATUS: Int
        id: Int
    }

    input BASE_INPUT_KZZ_MAIL {
        REG_DATETIME: String
        REG_USER: String
        MAIL_HEADER: String
        MAIL_BODY: String
        MAIL_FROM: String
        MAIL_TO: String
        MAIL_CC: String
        MAIL_BCC: String
        STATUS: Int
        id: Int
    }
`;

export default moduleTypedefs_BASE_KZZ_MAIL;
