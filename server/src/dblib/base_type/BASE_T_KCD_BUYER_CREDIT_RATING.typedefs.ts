// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_BUYER_CREDIT_RATING = gql`
    type BASE_QRY_KCD_BUYER_CREDIT_RATING {
        BUYER_CD: String
        CREDIT_RATING: String
        CREDIT_EXPIRE: String
        REG_DATETIME: String
        REG_USER: String
        id: Int
    }

    input BASE_INPUT_KCD_BUYER_CREDIT_RATING {
        BUYER_CD: String
        CREDIT_RATING: String
        CREDIT_EXPIRE: String
        REG_DATETIME: String
        REG_USER: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_BUYER_CREDIT_RATING;
