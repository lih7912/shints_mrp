// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KZZ_ACC_CC = gql`
    type BASE_QRY_KZZ_ACC_CC {
        CD_SEQ: Int
        CD_CC: String
        NM_CC: String
        id: Int
    }

    input BASE_INPUT_KZZ_ACC_CC {
        CD_SEQ: Int
        CD_CC: String
        NM_CC: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KZZ_ACC_CC;
