// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_MATL_AMOUNT = gql`
    type BASE_QRY_KSV_MATL_AMOUNT {
        ORDER_CD: String
        ORDER_AMT: Float
        DUE_DATE: String
        DELIVERY_DATE: String
        REG_USER: String
        ETD_FLAG: String
        id: Int
    }

    input BASE_INPUT_KSV_MATL_AMOUNT {
        ORDER_CD: String
        ORDER_AMT: Float
        DUE_DATE: String
        DELIVERY_DATE: String
        REG_USER: String
        ETD_FLAG: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_MATL_AMOUNT;
