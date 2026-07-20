// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_SCD_USER = gql`
    type BASE_QRY_SCD_USER {
        USER_ID: String
        PASSWD: String
        USER_NAME: String
        FACTORY_CD: String
        PART: String
        RANK: String
        EMAIL: String
        USER_LEVEL: String
        STATUS_CD: String
        AUTH_KEY: String
        ID_RSA: String
        TEL_NO: String
        MOBILE_NO: String
        id: Int
    }

    input BASE_INPUT_SCD_USER {
        USER_ID: String
        PASSWD: String
        USER_NAME: String
        FACTORY_CD: String
        PART: String
        RANK: String
        EMAIL: String
        USER_LEVEL: String
        STATUS_CD: String
        AUTH_KEY: String
        ID_RSA: String
        TEL_NO: String
        MOBILE_NO: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_SCD_USER;
