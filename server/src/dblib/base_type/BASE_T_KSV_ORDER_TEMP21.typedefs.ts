// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_ORDER_TEMP21 = gql`
    type BASE_QRY_KSV_ORDER_TEMP21 {
        USER_ID: String
        HEADER01: String
        HEADER02: String
        HEADER03: String
        HEADER04: String
        HEADER05: String
        HEADER06: String
        HEADER07: String
        HEADER08: String
        HEADER09: String
        HEADER10: String
        HEADER11: String
        HEADER12: String
        HEADER13: String
        HEADER14: String
        id: Int
    }

    input BASE_INPUT_KSV_ORDER_TEMP21 {
        USER_ID: String
        HEADER01: String
        HEADER02: String
        HEADER03: String
        HEADER04: String
        HEADER05: String
        HEADER06: String
        HEADER07: String
        HEADER08: String
        HEADER09: String
        HEADER10: String
        HEADER11: String
        HEADER12: String
        HEADER13: String
        HEADER14: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_ORDER_TEMP21;
