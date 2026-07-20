// MGR_S041201_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S041201_5 = gql`
    input I_S041201_5 {
        HS_CODE: String
        COMBO1: String
        COMBO2: String
        COMBO3: String
        DETAIL: String
        MATL_CD: String
    }

    type Ret_S041201_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S041201_5(datas: [I_S041201_5!]!): [Ret_S041201_5!]!
    }
`;

export default moduleTypedefs_S041201_5;
