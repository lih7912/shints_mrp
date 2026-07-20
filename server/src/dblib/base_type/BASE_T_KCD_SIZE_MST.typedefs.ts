// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_SIZE_MST = gql`
    type BASE_QRY_KCD_SIZE_MST {
        SIZE_GROUP: String
        SIZE_MEMBER: String
        SIZE_CNT: Int
        STATUS_CD: String
        BUYER_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KCD_SIZE_MST {
        SIZE_GROUP: String
        SIZE_MEMBER: String
        SIZE_CNT: Int
        STATUS_CD: String
        BUYER_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_SIZE_MST;
