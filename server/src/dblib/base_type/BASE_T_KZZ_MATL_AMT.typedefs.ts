// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KZZ_MATL_AMT = gql`
    type BASE_QRY_KZZ_MATL_AMT {
        USER_ID: String
        VENDOR_CD: String
        TOT_AMT: Float
        TOT_01: Float
        TOT_02: Float
        TOT_03: Float
        TOT_04: Float
        TOT_05: Float
        TOT_06: Float
        TOT_07: Float
        TOT_08: Float
        TOT_09: Float
        TOT_10: Float
        TOT_11: Float
        TOT_12: Float
        id: Int
    }

    input BASE_INPUT_KZZ_MATL_AMT {
        USER_ID: String
        VENDOR_CD: String
        TOT_AMT: Float
        TOT_01: Float
        TOT_02: Float
        TOT_03: Float
        TOT_04: Float
        TOT_05: Float
        TOT_06: Float
        TOT_07: Float
        TOT_08: Float
        TOT_09: Float
        TOT_10: Float
        TOT_11: Float
        TOT_12: Float
        id: Int
    }
`;

export default moduleTypedefs_BASE_KZZ_MATL_AMT;
