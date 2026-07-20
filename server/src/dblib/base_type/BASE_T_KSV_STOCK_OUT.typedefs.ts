// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_STOCK_OUT = gql`
    type BASE_QRY_KSV_STOCK_OUT {
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: Int
        MATL_SEQ: Int
        IN_DATETIME: String
        OUT_DATETIME: String
        OUT_QTY: Float
        OUT_TYPE: String
        OUT_STATUS: String
        OUT_FACTORY_CD: String
        PACK_CD: String
        DELIVERY_TYPE: String
        SHIP_DATE: String
        ETA: String
        CT_QTY: Int
        CT_NO: String
        REMARK: String
        DEBIT_CD: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        stock_idx: String
        out_from: String
        facin_user: String
        facin_datetime: String
        HIS_NO: String
        id: Int
    }

    input BASE_INPUT_KSV_STOCK_OUT {
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: Int
        MATL_SEQ: Int
        IN_DATETIME: String
        OUT_DATETIME: String
        OUT_QTY: Float
        OUT_TYPE: String
        OUT_STATUS: String
        OUT_FACTORY_CD: String
        PACK_CD: String
        DELIVERY_TYPE: String
        SHIP_DATE: String
        ETA: String
        CT_QTY: Int
        CT_NO: String
        REMARK: String
        DEBIT_CD: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        stock_idx: String
        out_from: String
        facin_user: String
        facin_datetime: String
        HIS_NO: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_STOCK_OUT;
