// MGR_S041203_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S041203_1 = gql`
    type T_S041203_1 {
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

    input I_S041203_1 {
        PACK_CD: String
    }

    type T_S041203_CODE {
        HS_CODE: [BASE_QRY_KCD_HSCODE!]!
        COMP: [BASE_QRY_KCD_CODE!]!
        MATL_TYPE: [BASE_QRY_KCD_CODE!]!
    }

    type Query {
        mgrQueryS041203_1(data: I_S041203_1!): [T_S041203_1!]!
        mgrQueryS041203_CODE(data: I_S041203_1!): T_S041203_CODE!
    }
`;

export default moduleTypedefs_S041203_1;
