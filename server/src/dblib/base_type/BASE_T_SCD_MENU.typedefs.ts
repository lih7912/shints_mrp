// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_SCD_MENU = gql`
    type BASE_QRY_SCD_MENU {
        MENU_ID: String
        MENU_NUM: Int
        MENU_NAME: String
        DEVELOPER: String
        EXP_DATE: String
        END_DATE: String
        FAC_FLAG: String
        id: Int
    }

    input BASE_INPUT_SCD_MENU {
        MENU_ID: String
        MENU_NUM: Int
        MENU_NAME: String
        DEVELOPER: String
        EXP_DATE: String
        END_DATE: String
        FAC_FLAG: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_SCD_MENU;
