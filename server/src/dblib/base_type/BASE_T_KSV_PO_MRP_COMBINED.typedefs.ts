// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_PO_MRP_COMBINED = gql`
    type BASE_QRY_KSV_PO_MRP_COMBINED {
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: Int
        MATL_SEQ: Int
        MATL_PRICE: Float
        USE_SIZE: String
        USE_QTY: Float
        PO_QTY: Float
        BEF_PO_QTY: Float
        DIFF_QTY: Float
        DIFF_PO_TYPE: String
        CHANGE_REASON: String
        USE_PO_TYPE: String
        PO_MATL_CD: String
        PO_MRP_SEQ: Int
        CURR_CD: String
        TOT_AMT: Float
        CURR_DATE: String
        USD_AMT: Float
        REASON_TYPE: String
        FARE_TYPE: String
        REMARK: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        stock_idx: String
        MT_SHIP_QTY: Float
        MT_CUT_DATE: String
        MT_ETD: String
        MT_ETA: String
        MT_DELAY_REASON: String
        MT_DELIVERY_TYPE: String
        MT_FARE_TYPE: String
        MT_REMARK: String
        TEMP_PRICE: String
        id: Int
    }

    input BASE_INPUT_KSV_PO_MRP_COMBINED {
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: Int
        MATL_SEQ: Int
        MATL_PRICE: Float
        USE_SIZE: String
        USE_QTY: Float
        PO_QTY: Float
        BEF_PO_QTY: Float
        DIFF_QTY: Float
        DIFF_PO_TYPE: String
        CHANGE_REASON: String
        USE_PO_TYPE: String
        PO_MATL_CD: String
        PO_MRP_SEQ: Int
        CURR_CD: String
        TOT_AMT: Float
        CURR_DATE: String
        USD_AMT: Float
        REASON_TYPE: String
        FARE_TYPE: String
        REMARK: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        stock_idx: String
        MT_SHIP_QTY: Float
        MT_CUT_DATE: String
        MT_ETD: String
        MT_ETA: String
        MT_DELAY_REASON: String
        MT_DELIVERY_TYPE: String
        MT_FARE_TYPE: String
        MT_REMARK: String
        TEMP_PRICE: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_PO_MRP_COMBINED;
