// MGR_S0412_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0412_5 = gql`
    input I_S0412_5 {
        USER_ID: String
        PACK_CD: String
    }

    input I_S0412_5_1 {
        USER_ID: String
        PACK_CD: String
        PACK_CONFIRM: String
        ETA: String
        ETD: String
    }

    type Ret_S0412_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0412_5_CHK_CT_QTY(datas: [I_S0412_5!]!): [Ret_S0412_5!]!
        mgrInsert_S0412_5_CONFIRM_PACK(datas: [I_S0412_5_1!]!): [Ret_S0412_5!]!
    }
`;

export default moduleTypedefs_S0412_5;
