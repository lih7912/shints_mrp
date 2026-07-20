// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_PO_MST = gql`
    type BASE_QRY_KSV_PO_MST {
        PO_CD: String
        PO_SEQ: Int
        PO_TYPE: String
        PO_DATE: String
        PO_STATUS: String
        MATL_DUE_DATE: String
        PROD_DUE_DATE: String
        PO_CONF_DATE: String
        PLACE_CD: String
        CURR_DATE: String
        FACTORY_CD: String
        DELIVERY_TYPE: String
        YY: Int
        SEQ: Int
        PO_USER_MAIN: String
        PO_USER_SUB: String
        CLOSE_FLAG: String
        CLOSE_USER: String
        CLOSE_DATETIME: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        REMARK: String
        PLAN_FLAG: String
        PLAN_ETD: String
        PLAN_ETA: String
        BVT_FLAG: String
        ENTRY: String
        ENTRY_DATE: String
        NEW_FLAG: String
        STOCK_MOVE_DATE: String
        id: Int
    }

    input BASE_INPUT_KSV_PO_MST {
        PO_CD: String
        PO_SEQ: Int
        PO_TYPE: String
        PO_DATE: String
        PO_STATUS: String
        MATL_DUE_DATE: String
        PROD_DUE_DATE: String
        PO_CONF_DATE: String
        PLACE_CD: String
        CURR_DATE: String
        FACTORY_CD: String
        DELIVERY_TYPE: String
        YY: Int
        SEQ: Int
        PO_USER_MAIN: String
        PO_USER_SUB: String
        CLOSE_FLAG: String
        CLOSE_USER: String
        CLOSE_DATETIME: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        REMARK: String
        PLAN_FLAG: String
        PLAN_ETD: String
        PLAN_ETA: String
        BVT_FLAG: String
        ENTRY: String
        ENTRY_DATE: String
        NEW_FLAG: String
        STOCK_MOVE_DATE: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_PO_MST;
