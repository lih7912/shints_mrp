// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_FACTORY_WARE = gql`
    type BASE_QRY_KCD_FACTORY_WARE {
        FACTORY_CD: String
        WARE_CD: String
        WARE_NAME: String
        WARE_SIZE: String
        WARE_COM: String
        WARE_FARE: Int
        CURR_CD: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KCD_FACTORY_WARE {
        FACTORY_CD: String
        WARE_CD: String
        WARE_NAME: String
        WARE_SIZE: String
        WARE_COM: String
        WARE_FARE: Int
        CURR_CD: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_FACTORY_WARE;
