// MGR_S041203_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S041203_5 = gql`
    input I_S041203_5 {
        VENDOR_NAME: String
        MATL_NAME: String
        SPEC: String
        WIDTH: String
        WEIGHT: Float
        HS_NAME: String
        HS_CD: String
        COMP1: String
        COMP1_PERCENT: Int
        COMP2: String
        COMP2_PERCENT: Int
        COMP3: String
        COMP3_PERCENT: Int
        COMP4: String
        COMP4_PERCENT: Int
    }

    type Ret_S041203_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S041203_5(datas: [I_S041203_5!]!): [Ret_S041203_5!]!
    }
`;

export default moduleTypedefs_S041203_5;
