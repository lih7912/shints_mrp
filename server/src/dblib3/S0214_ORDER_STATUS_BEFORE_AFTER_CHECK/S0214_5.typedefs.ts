// MGR_S0214_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0214_5 = gql`
    input I_S0214_5 {
        ORDER_CD: String
        ORDER_STATUS: String
    }

    type Ret_S0214_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrUpdate_S0214_5_END(datas: [I_S0214_5!]!): [Ret_S0214_5!]!
    }
`;

export default moduleTypedefs_S0214_5;
