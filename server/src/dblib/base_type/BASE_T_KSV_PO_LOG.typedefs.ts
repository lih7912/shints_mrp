// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_PO_LOG = gql`
    type BASE_QRY_KSV_PO_LOG {
        PO_CD: String
        PO_SEQ: Int
        REG_USER: String
        REG_DATETIME: String
        FIX_FLAG: String
        PO_LOG_TYPE: String
        id: Int
    }

    input BASE_INPUT_KSV_PO_LOG {
        PO_CD: String
        PO_SEQ: Int
        REG_USER: String
        REG_DATETIME: String
        FIX_FLAG: String
        PO_LOG_TYPE: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_PO_LOG;
