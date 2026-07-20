// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_MENU_POOL = gql`
    type BASE_QRY_KCD_MENU_POOL {
        CD_CODE: String
        MENU_ID: String
        MENU_NAME: String
        MENU_NUM: Int
        NM_TYPE: String
        P: String
        id: Int
    }

    input BASE_INPUT_KCD_MENU_POOL {
        CD_CODE: String
        MENU_ID: String
        MENU_NAME: String
        MENU_NUM: Int
        NM_TYPE: String
        P: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_MENU_POOL;
