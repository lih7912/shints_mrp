// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_SCD_WARE = gql`
    type BASE_QRY_SCD_WARE {
        WARE_CD: String
        WARE_NAME: String
        WARE_PLACE: String
        id: Int
    }

    input BASE_INPUT_SCD_WARE {
        WARE_CD: String
        WARE_NAME: String
        WARE_PLACE: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_SCD_WARE;
