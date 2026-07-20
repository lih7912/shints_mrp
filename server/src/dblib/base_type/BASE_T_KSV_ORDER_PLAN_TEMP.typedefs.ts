// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_ORDER_PLAN_TEMP = gql`
    type BASE_QRY_KSV_ORDER_PLAN_TEMP {
        BUYER_CD: String
        USD_AMT: Float
        REG_USER: String
        FACTORY_CD: String
        id: Int
    }

    input BASE_INPUT_KSV_ORDER_PLAN_TEMP {
        BUYER_CD: String
        USD_AMT: Float
        REG_USER: String
        FACTORY_CD: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_ORDER_PLAN_TEMP;
