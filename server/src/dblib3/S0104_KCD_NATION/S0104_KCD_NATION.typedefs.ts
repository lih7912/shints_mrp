// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0104_KCD_NATION = gql`
    input I_S0104_KCD_NATION_QRY_KCD_NATION {
        NAT_CD: String
        NAT_NAME: String
    }

    input I_S0104_KCD_NATION_EDT_KCD_NATION {
        id: Int
        NAT_CD: String
        NAT_NAME: String
        STATUS_CD: String
    }

    type Ret_S0104_KCD_NATION_EDT_KCD_NATION {
        id: Int
        CODE: String!
    }

    type T_S0104_KCD_NATION_TBL_KCD_NATION {
        id: Int
        NAT_CD: String
        NAT_NAME: String
        STATUS_NAME: String
        STATUS_CD: String
    }

    type T_S0104_KCD_NATION_CODE {
        STATUS_CD: [BASE_QRY_KCD_CODE!]!
    }

    type Query {
        mgrQuery_S0104_KCD_NATION_TBL_KCD_NATION(
            data: I_S0104_KCD_NATION_QRY_KCD_NATION!
        ): [T_S0104_KCD_NATION_TBL_KCD_NATION!]!
        mgrQuery_S0104_KCD_NATION_CODE: T_S0104_KCD_NATION_CODE!
    }

    type Mutation {
        mgrInsert_S0104_KCD_NATION_EDT_KCD_NATION(
            datas: [I_S0104_KCD_NATION_EDT_KCD_NATION!]!
        ): [Ret_S0104_KCD_NATION_EDT_KCD_NATION!]!
        mgrUpdate_S0104_KCD_NATION_EDT_KCD_NATION(
            datas: [I_S0104_KCD_NATION_EDT_KCD_NATION!]!
        ): [Ret_S0104_KCD_NATION_EDT_KCD_NATION!]!
        mgrDelete_S0104_KCD_NATION_EDT_KCD_NATION(
            datas: [I_S0104_KCD_NATION_EDT_KCD_NATION!]!
        ): [Ret_S0104_KCD_NATION_EDT_KCD_NATION!]!
    }
`;

export default moduleTypedefs_S0104_KCD_NATION;
