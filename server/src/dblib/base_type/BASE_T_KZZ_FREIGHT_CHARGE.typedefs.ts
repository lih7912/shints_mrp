// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KZZ_FREIGHT_CHARGE = gql`
    type BASE_QRY_KZZ_FREIGHT_CHARGE {
        FRT_TYPE: String
        CHARGE: Float
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KZZ_FREIGHT_CHARGE {
        FRT_TYPE: String
        CHARGE: Float
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KZZ_FREIGHT_CHARGE;
