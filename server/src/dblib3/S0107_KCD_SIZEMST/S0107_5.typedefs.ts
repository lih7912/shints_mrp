// MGR_S0107_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0107_5 = gql`
    type Ret_S0107_5 {
        CODE: String
        id: Int
    }

    input I_S0107_SIZE_MST {
        SIZE_GROUP: String
        SIZE_GROUP_NAME: String
        SIZE_MEMBER: String
        SIZE_CNT: Int
        STATUS_CD: String
        BUYER_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        id: Int
        STATUS_CD_N: String
    }

    type Mutation {
        mgrInsert_S0107_5(datas1: I_S0107_SIZE_MST!): [Ret_S0107_5!]!
        mgrUpdate_S0107_5(datas1: I_S0107_SIZE_MST!): [Ret_S0107_5!]!
        mgrDelete_S0107_5(datas1: I_S0107_SIZE_MST!): [Ret_S0107_5!]!
    }
`;

export default moduleTypedefs_S0107_5;
