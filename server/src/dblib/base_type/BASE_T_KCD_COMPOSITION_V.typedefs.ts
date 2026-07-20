// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_COMPOSITION_V = gql`
    type BASE_QRY_KCD_COMPOSITION_V {
        MATL_NAME: String
        COMP1: String
        SEQ: Int
        id: Int
    }

    input BASE_INPUT_KCD_COMPOSITION_V {
        MATL_NAME: String
        COMP1: String
        SEQ: Int
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_COMPOSITION_V;
