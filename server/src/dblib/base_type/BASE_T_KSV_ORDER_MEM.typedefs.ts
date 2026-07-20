// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_ORDER_MEM = gql`
    type BASE_QRY_KSV_ORDER_MEM {
        ORDER_CD: String
        PROD_CD: String
        ADD_FLAG: String
        PRICE: Float
        TOT_CNT: Int
        SIZE_CNT: String
        OLD_PROD_CD: String
        end_price: Float
        barcode: String
        MID_SIZE: String
        MID_SIZE_QTY: Int
        SIZE_LOSS: String
        id: Int
    }

    input BASE_INPUT_KSV_ORDER_MEM {
        ORDER_CD: String
        PROD_CD: String
        ADD_FLAG: String
        PRICE: Float
        TOT_CNT: Int
        SIZE_CNT: String
        OLD_PROD_CD: String
        end_price: Float
        barcode: String
        MID_SIZE: String
        MID_SIZE_QTY: Int
        SIZE_LOSS: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_ORDER_MEM;
