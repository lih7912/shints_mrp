// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KVW_BUYER = gql`
    type BASE_QRY_KVW_BUYER {
        BUYER_CD: String
        BUYER_NAME: String
        BUYER_TYPE: String
        nat_cd: String
    }

    input BASE_INPUT_KVW_BUYER {
        BUYER_CD: String
        BUYER_NAME: String
        BUYER_TYPE: String
        nat_cd: String
    }
`;

export default moduleTypedefs_BASE_KVW_BUYER;
