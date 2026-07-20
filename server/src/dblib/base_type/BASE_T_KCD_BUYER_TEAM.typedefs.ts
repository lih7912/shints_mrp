// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_BUYER_TEAM = gql`
    type BASE_QRY_KCD_BUYER_TEAM {
        BUYER_CD: String
        CHANGED_DATETIME: String
        BUYER_TEAM_AF: String
        BUYER_TEAM_BF: String
        id: Int
    }

    input BASE_INPUT_KCD_BUYER_TEAM {
        BUYER_CD: String
        CHANGED_DATETIME: String
        BUYER_TEAM_AF: String
        BUYER_TEAM_BF: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_BUYER_TEAM;
