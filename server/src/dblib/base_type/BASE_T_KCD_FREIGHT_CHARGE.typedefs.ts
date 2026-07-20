// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_FREIGHT_CHARGE = gql`
    type BASE_QRY_KCD_FREIGHT_CHARGE {
        CHARGE_GROUP: String
        CHARGE_WEIGHT: Float
        CHARGE: Float
        id: Int
    }

    input BASE_INPUT_KCD_FREIGHT_CHARGE {
        CHARGE_GROUP: String
        CHARGE_WEIGHT: Float
        CHARGE: Float
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_FREIGHT_CHARGE;
