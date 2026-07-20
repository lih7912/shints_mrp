// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_ORDER_SHIP_PLAN = gql`
    type BASE_QRY_KSV_ORDER_SHIP_PLAN {
        ORDER_CD: String
        POSS_DATE: String
        TERM_DATE: String
        PLAN_QTY: Int
        TERM: String
        END_FLAG: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_ORDER_SHIP_PLAN {
        ORDER_CD: String
        POSS_DATE: String
        TERM_DATE: String
        PLAN_QTY: Int
        TERM: String
        END_FLAG: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_ORDER_SHIP_PLAN;
