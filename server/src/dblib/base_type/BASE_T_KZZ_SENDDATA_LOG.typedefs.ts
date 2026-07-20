// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KZZ_SENDDATA_LOG = gql`
    type BASE_QRY_KZZ_SENDDATA_LOG {
        TABLE_NAME: String
        JOB_FLAG: String
        SEND_FLAG: String
        SEND_DATETIME: String
        KEY1: String
        SQL1: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KZZ_SENDDATA_LOG {
        TABLE_NAME: String
        JOB_FLAG: String
        SEND_FLAG: String
        SEND_DATETIME: String
        KEY1: String
        SQL1: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KZZ_SENDDATA_LOG;
