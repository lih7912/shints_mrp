// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_STOCK_MATL = gql`
    type BASE_QRY_KSV_STOCK_MATL {
        STOCK_IDX: String
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: Int
        MATL_SEQ: Int
        STOCK_QTY: Float
        REMAIN_QTY: Float
        USE_QTY: Float
        OUT_QTY: Float
        FACTORY_CD: String
        STOCK_STATUS: String
        STOCK_DATE: String
        WARE_CD: String
        WARE_DATE: String
        WARE_QTY: Float
        RACK: String
        LOCATION: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        REMARK: String
        ORG_STOCK_IDX: String
        GROUP_CD: String
        REASON_REMARK: String
        PLAN_REMARK: String
        move_flag: String
        temp: String
        DEBIT_CD: String
        root_idx: String
        EXP_DATE: String
        REMARK0: String
        id: Int
    }

    input BASE_INPUT_KSV_STOCK_MATL {
        STOCK_IDX: String
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: Int
        MATL_SEQ: Int
        STOCK_QTY: Float
        REMAIN_QTY: Float
        USE_QTY: Float
        OUT_QTY: Float
        FACTORY_CD: String
        STOCK_STATUS: String
        STOCK_DATE: String
        WARE_CD: String
        WARE_DATE: String
        WARE_QTY: Float
        RACK: String
        LOCATION: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        REMARK: String
        ORG_STOCK_IDX: String
        GROUP_CD: String
        REASON_REMARK: String
        PLAN_REMARK: String
        move_flag: String
        temp: String
        DEBIT_CD: String
        root_idx: String
        EXP_DATE: String
        REMARK0: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_STOCK_MATL;
