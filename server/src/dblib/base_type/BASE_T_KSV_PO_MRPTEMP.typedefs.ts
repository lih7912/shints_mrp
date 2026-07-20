// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_PO_MRPTEMP = gql`
    type BASE_QRY_KSV_PO_MRPTEMP {
        USER_ID: String
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MATL_SEQ: Int
        MATL_PRICE: Float
        MRP_SEQ: Int
        USE_SIZE: String
        USE_QTY: Float
        PO_QTY: Float
        BEF_PO_QTY: Float
        DIFF_QTY: Float
        DIFF_PO_TYPE: String
        CHANGE_REASON: String
        USE_PO_TYPE: String
        CURR_CD: String
        TOT_AMT: Float
        CURR_DATE: String
        USD_AMT: Float
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        use_real_qty: Float
        use_sum_qty: Float
        use_int_qty: Float
        id: Int
    }

    input BASE_INPUT_KSV_PO_MRPTEMP {
        USER_ID: String
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MATL_SEQ: Int
        MATL_PRICE: Float
        MRP_SEQ: Int
        USE_SIZE: String
        USE_QTY: Float
        PO_QTY: Float
        BEF_PO_QTY: Float
        DIFF_QTY: Float
        DIFF_PO_TYPE: String
        CHANGE_REASON: String
        USE_PO_TYPE: String
        CURR_CD: String
        TOT_AMT: Float
        CURR_DATE: String
        USD_AMT: Float
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        use_real_qty: Float
        use_sum_qty: Float
        use_int_qty: Float
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_PO_MRPTEMP;
