// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0108_KCD_PLACE = gql`
    input I_S0108_KCD_PLACE_EDT_KCD_PLACE {
        id: Int
        PLACE_CD: String
        PLACE_NAME: String
        USER_NAME: String
        TEL_NO: String
        EMAIL: String
        STATUS_CD: String
        PLACE_TYPE: String
        DELIVERY_TYPE: String
    }

    type Ret_S0108_KCD_PLACE_EDT_KCD_PLACE {
        id: Int!
        CODE: String!
    }

    input I_S0108_KCD_PLACE_QRY_KCD_PLACE {
        PLACE_CD: String
        PLACE_NAME: String
        STATUS_CD: String
    }

    type T_S0108_KCD_PLACE_TBL_KCD_PLACE {
        id: Int
        PLACE_CD: String
        PLACE_NAME: String
        USER_NAME: String
        TEL_NO: String
        EMAIL: String
        STATUS_NAME: String
        STATUS_CD: String
        PLACE_TYPE: String
        PLACE_TYPE_NAME: String
        DELIVERY_TYPE: String
        DELIVERY_TYPE_NAME: String
    }

    type T_S0108_KCD_PLACE_CODE {
        STATUS_CD: [BASE_QRY_KCD_CODE!]!
        PLACE_TYPE: [BASE_QRY_KCD_CODE!]!
    }

    type Query {
        mgrQuery_S0108_KCD_PLACE_TBL_KCD_PLACE(
            data: I_S0108_KCD_PLACE_QRY_KCD_PLACE!
        ): [T_S0108_KCD_PLACE_TBL_KCD_PLACE!]!
        mgrQuery_S0108_KCD_PLACE_CODE: T_S0108_KCD_PLACE_CODE!
    }

    type Mutation {
        mgrInsert_S0108_KCD_PLACE_EDT_KCD_PLACE(
            datas: [I_S0108_KCD_PLACE_EDT_KCD_PLACE!]!
        ): [Ret_S0108_KCD_PLACE_EDT_KCD_PLACE!]!
        mgrUpdate_S0108_KCD_PLACE_EDT_KCD_PLACE(
            datas: [I_S0108_KCD_PLACE_EDT_KCD_PLACE!]!
        ): [Ret_S0108_KCD_PLACE_EDT_KCD_PLACE!]!
        mgrDelete_S0108_KCD_PLACE_EDT_KCD_PLACE(
            datas: [I_S0108_KCD_PLACE_EDT_KCD_PLACE!]!
        ): [Ret_S0108_KCD_PLACE_EDT_KCD_PLACE!]!
    }
`;

export default moduleTypedefs_S0108_KCD_PLACE;
