// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_ORDER_PLAN_ORDER2 = gql`
    type BASE_QRY_KSV_ORDER_PLAN_ORDER2 {
        USER_ID: String
        YYMM: String
        BUYER_CD: String
        ORDER_CD: String
        LINE_TYPE: String
        ORDER_QTY: Float
        ORDER_AMT: Float
        FACTORY_CD: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        CM_PRICE: Float
        CM_AMT: Float
        id: Int
    }

    input BASE_INPUT_KSV_ORDER_PLAN_ORDER2 {
        USER_ID: String
        YYMM: String
        BUYER_CD: String
        ORDER_CD: String
        LINE_TYPE: String
        ORDER_QTY: Float
        ORDER_AMT: Float
        FACTORY_CD: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        CM_PRICE: Float
        CM_AMT: Float
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_ORDER_PLAN_ORDER2;
