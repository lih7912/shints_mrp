// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_ORDER_TEMP22 = gql`
    type BASE_QRY_KSV_ORDER_TEMP22 {
        USER_ID: String
        BUYER: String
        M01_ORD: Float
        M01_USE: Float
        M02_ORD: Float
        M02_USE: Float
        M03_ORD: Float
        M03_USE: Float
        M04_ORD: Float
        M04_USE: Float
        M05_ORD: Float
        M05_USE: Float
        M06_ORD: Float
        M06_USE: Float
        M07_ORD: Float
        M07_USE: Float
        M08_ORD: Float
        M08_USE: Float
        M09_ORD: Float
        M09_USE: Float
        M10_ORD: Float
        M10_USE: Float
        M11_ORD: Float
        M11_USE: Float
        M12_ORD: Float
        M12_USE: Float
        TOT_ORD: Float
        TOT_USE: Float
        id: Int
    }

    input BASE_INPUT_KSV_ORDER_TEMP22 {
        USER_ID: String
        BUYER: String
        M01_ORD: Float
        M01_USE: Float
        M02_ORD: Float
        M02_USE: Float
        M03_ORD: Float
        M03_USE: Float
        M04_ORD: Float
        M04_USE: Float
        M05_ORD: Float
        M05_USE: Float
        M06_ORD: Float
        M06_USE: Float
        M07_ORD: Float
        M07_USE: Float
        M08_ORD: Float
        M08_USE: Float
        M09_ORD: Float
        M09_USE: Float
        M10_ORD: Float
        M10_USE: Float
        M11_ORD: Float
        M11_USE: Float
        M12_ORD: Float
        M12_USE: Float
        TOT_ORD: Float
        TOT_USE: Float
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_ORDER_TEMP22;
