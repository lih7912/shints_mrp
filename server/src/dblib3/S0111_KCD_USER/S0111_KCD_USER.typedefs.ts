// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0111_KCD_USER = gql`
    input I_S0111_KCD_USER_EDT_KCD_USER {
        id: Int
        USER_ID: String
        PASSWD: String
        USER_NAME: String
        FACTORY_NAME: String
        FACTORY_CD: String
        PART_NAME: String
        PART: String
        RANK_NAME: String
        RANK: String
        EMAIL: String
        TEL_NO: String
        CELLULAR: String
        EMP_NO: String
        BUYER_TEAM: String
        USER_LEVEL: String
        STATUS_NAME: String
        STATUS_CD: String
    }

    input I_S0111_KCD_USER_EDT_KCD_USER_MENU {
        id: Int
        USER_ID: String
        MENU_ID: String
        MENU_NAME: String
        AUTH_FLAG: String
    }

    type Ret_S0111_KCD_USER_EDT_KCD_USER {
        id: Int!
        CODE: String!
    }

    input I_S0111_KCD_USER_QRY_KCD_USER {
        USER_CD: String
        USER_NAME: String
        FACTORY_CD: String
        PART: String
    }

    input I_S0111_KCD_USER_QRY_KCD_USERMENU {
        USER_ID: String
    }

    input I_S0111_KCD_USER_QRY_KCD_USER_BUYER {
        USER_ID: String
    }

    type T_S0111_KCD_USER_TBL_KCD_USERMENU {
        id: Int
        USER_ID: String
        MENU_ID: String
        MENU_NAME: String
        AUTH_FLAG: String
    }

    type T_S0111_KCD_USER_TBL_KCD_USER_BUYER {
        id: Int
        BUYER_CD: String
        FACTORY: String
        TEAM: String
        USER_ID: String
        USER_NAME: String
    }

    type T_S0111_KCD_USER_TBL_KCD_USER {
        id: Int
        USER_ID: String
        PASSWD: String
        USER_NAME: String
        FACTORY_NAME: String
        FACTORY_CD: String
        PART_NAME: String
        PART: String
        RANK_NAME: String
        RANK: String
        EMAIL: String
        TEL_NO: String
        CELLULAR: String
        EMP_NO: String
        BUYER_TEAM: String
        USER_LEVEL: String
        STATUS_NAME: String
        STATUS_CD: String
        company_code: String
    }

    input I_S0111_KCD_USER_CHECK {
        USER_ID: String
        PASSWD: String
    }

    type T_S0111_KCD_USER_CHECK {
        USER_ID: String
        PASSWD: String
        USER_NAME: String
        FACTORY_NAME: String
        FACTORY_CD: String
        PART: String
        RANK: String
        EMAIL: String
        TEL_NO: String
        STATUS_CD: String
        company_code: String
    }

    type T_S0111_KCD_USER_CODE {
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
        STATUS_CD: [BASE_QRY_KCD_CODE!]!
        PART: [BASE_QRY_KCD_CODE!]!
        RANK: [BASE_QRY_KCD_CODE!]!
    }

    type Query {
        mgrQuery_S0111_KCD_USER_TBL_KCD_USERMENU(
            data: I_S0111_KCD_USER_QRY_KCD_USERMENU!
        ): [T_S0111_KCD_USER_TBL_KCD_USERMENU!]!
        mgrQuery_S0111_KCD_USER_TBL_KCD_USER_BUYER(
            data: I_S0111_KCD_USER_QRY_KCD_USER_BUYER!
        ): [T_S0111_KCD_USER_TBL_KCD_USER_BUYER!]!
        mgrQuery_S0111_KCD_USER_TBL_KCD_USER(
            data: I_S0111_KCD_USER_QRY_KCD_USER!
        ): [T_S0111_KCD_USER_TBL_KCD_USER!]!
        mgrQuery_S0111_KCD_USER_CHECK(
            data: I_S0111_KCD_USER_CHECK!
        ): [T_S0111_KCD_USER_CHECK!]!
        mgrQuery_S0111_KCD_USER_CODE: T_S0111_KCD_USER_CODE!
    }

    type Mutation {
        mgrInsert_S0111_KCD_USER_EDT_KCD_USER(
            datas: [I_S0111_KCD_USER_EDT_KCD_USER!]!
        ): [Ret_S0111_KCD_USER_EDT_KCD_USER!]!
        mgrUpdate_S0111_KCD_USER_EDT_KCD_USER(
            datas: [I_S0111_KCD_USER_EDT_KCD_USER!]!
        ): [Ret_S0111_KCD_USER_EDT_KCD_USER!]!
        mgrDelete_S0111_KCD_USER_EDT_KCD_USER(
            datas: [I_S0111_KCD_USER_EDT_KCD_USER!]!
        ): [Ret_S0111_KCD_USER_EDT_KCD_USER!]!
    }
`;

export default moduleTypedefs_S0111_KCD_USER;
