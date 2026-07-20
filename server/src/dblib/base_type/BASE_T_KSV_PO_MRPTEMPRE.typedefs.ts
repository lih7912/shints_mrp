// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_PO_MRPTEMPRE = gql`
    type BASE_QRY_KSV_PO_MRPTEMPRE {
        USER_ID: String
        SEQ: Int
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: Int
        NEW_QTY: Float
        BEF_QTY: Float
        DIFF_QTY: Float
        STOCK_QTY: Float
        DIFF_PO_TYPE: String
        MATL_SEQ: Int
        MATL_PRICE: Float
        CURR_CD: String
        TOT_AMT: Float
        USE_SIZE: String
        id: Int
    }

    input BASE_INPUT_KSV_PO_MRPTEMPRE {
        USER_ID: String
        SEQ: Int
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: Int
        NEW_QTY: Float
        BEF_QTY: Float
        DIFF_QTY: Float
        STOCK_QTY: Float
        DIFF_PO_TYPE: String
        MATL_SEQ: Int
        MATL_PRICE: Float
        CURR_CD: String
        TOT_AMT: Float
        USE_SIZE: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_PO_MRPTEMPRE;
