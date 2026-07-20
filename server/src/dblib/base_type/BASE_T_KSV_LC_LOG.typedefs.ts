// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_LC_LOG = gql`
    type BASE_QRY_KSV_LC_LOG {
        BANK_CD: String
        LOG_DATE: String
        LOG_TYPE: String
        LOG_WON: Float
        LC_NO: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_LC_LOG {
        BANK_CD: String
        LOG_DATE: String
        LOG_TYPE: String
        LOG_WON: Float
        LC_NO: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_LC_LOG;
