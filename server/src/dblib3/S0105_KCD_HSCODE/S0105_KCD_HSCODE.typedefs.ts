// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0105_KCD_HSCODE = gql`
    input I_S0105_KCD_HSCODE_EDT_KCD_HSCODE {
        id: Int
        HS_NO: String
        HS_CD: String
        HS_NAME: String
    }

    type Ret_S0105_KCD_HSCODE_EDT_KCD_HSCODE {
        id: Int!
        CODE: String!
    }

    input I_S0105_KCD_HSCODE_QRY_KCD_HSCODE {
        HS_CD: String
        HS_NAME: String
    }

    type T_S0105_KCD_HSCODE_TBL_KCD_HSCODE {
        id: Int
        HS_NO: String
        HS_CD: String
        HS_NAME: String
    }

    type Query {
        mgrQuery_S0105_KCD_HSCODE_TBL_KCD_HSCODE(
            data: I_S0105_KCD_HSCODE_QRY_KCD_HSCODE!
        ): [T_S0105_KCD_HSCODE_TBL_KCD_HSCODE!]!
    }

    type Mutation {
        mgrInsert_S0105_KCD_HSCODE_EDT_KCD_HSCODE(
            datas: [I_S0105_KCD_HSCODE_EDT_KCD_HSCODE!]!
        ): [Ret_S0105_KCD_HSCODE_EDT_KCD_HSCODE!]!
        mgrUpdate_S0105_KCD_HSCODE_EDT_KCD_HSCODE(
            datas: [I_S0105_KCD_HSCODE_EDT_KCD_HSCODE!]!
        ): [Ret_S0105_KCD_HSCODE_EDT_KCD_HSCODE!]!
        mgrDelete_S0105_KCD_HSCODE_EDT_KCD_HSCODE(
            datas: [I_S0105_KCD_HSCODE_EDT_KCD_HSCODE!]!
        ): [Ret_S0105_KCD_HSCODE_EDT_KCD_HSCODE!]!
    }
`;

export default moduleTypedefs_S0105_KCD_HSCODE;
