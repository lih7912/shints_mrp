// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_COMPOSITION = gql`
    type BASE_QRY_KCD_COMPOSITION {
        MATL_NAME: String
        COMP1: String
        COMP1_PERCENT: Int
        COMP2: String
        COMP2_PERCENT: Int
        COMP3: String
        COMP3_PERCENT: Int
        COMP4: String
        COMP4_PERCENT: Int
        id: Int
    }

    input BASE_INPUT_KCD_COMPOSITION {
        MATL_NAME: String
        COMP1: String
        COMP1_PERCENT: Int
        COMP2: String
        COMP2_PERCENT: Int
        COMP3: String
        COMP3_PERCENT: Int
        COMP4: String
        COMP4_PERCENT: Int
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_COMPOSITION;
