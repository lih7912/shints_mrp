// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_PO_TRANSLOG = gql`
    type BASE_QRY_KSV_PO_TRANSLOG {
        PO_CD: String
        FACTORY_CD: String
        NEW_PO_CD: String
        NEW_FACTORY_CD: String
        TRANS_TYPE: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_PO_TRANSLOG {
        PO_CD: String
        FACTORY_CD: String
        NEW_PO_CD: String
        NEW_FACTORY_CD: String
        TRANS_TYPE: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_PO_TRANSLOG;
