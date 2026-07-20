// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_MENU_LOG = gql`
    type BASE_QRY_KSV_MENU_LOG {
        MENU_ID: String
        USER_ID: String
        CLICK_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_MENU_LOG {
        MENU_ID: String
        USER_ID: String
        CLICK_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_MENU_LOG;
