// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_USERMENU = gql`
    type BASE_QRY_KCD_USERMENU {
        USER_ID: String
        MENU_ID: String
        AUTH_FLAG: String
        UPD_FLAG: String
        id: Int
    }

    input BASE_INPUT_KCD_USERMENU {
        USER_ID: String
        MENU_ID: String
        AUTH_FLAG: String
        UPD_FLAG: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_USERMENU;
