// MGR_S0516_2_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0516_2_2 = gql`
    type T_S0516_2_2 {
        PO_CD: String
        PO_SEQ: String
        MATL_CD: String
        ORDER_CD: String
        MRP_SEQ: String
        STOCK_IDX: String
        USE_QTY: String
        PO_QTY: String
        DIFF_PO_TYPE: String
        USE_PO_TYPE: String
        STOCK_IDX2: String
        USE_QTY2: String
        CONF_FLAG: String
        CONF_USER: String
        REQ_QTY: String
        OKUSE_QTY: String
        DEFECT_QTY: String
        SHORT_QTY: String
        LOSS_QTY: String
        BALANCE: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        NOTUSE_QTY: String
        REASON: String
        CANCEL_QTY: String
        RACK: String
        LOCATION: String
        WARE_NAME: String
        VENDOR_NAME: String
        ORG_QTY: Float
        ORG_PO_CD: String
        ORG_PO_SEQ: String
        ORG_MATL_CD: String
        CONDITION: String
        USE_DATE: String
        DELIVERY: String
        HS_CODE:String
        COMPOSITION:String
        WEIGHT:String
        PRICE:String
        CURR_CD:String
    }

    type T_S0516_2_2_0 {
        WARE_NAME: String
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        MRP_SEQ: String
        MATL_CD2: String
        MATL_CD: String
        VENDOR_NAME: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        STOCK_STATUS: String
        RACK: String
        LOCATION: String
        USE_QTY: Float
        TOTAL_QTY: String
        REAL_QTY: Float
        DEFECT_QTY2: Float
        LOSS_QTY2: Float
        CONF_FLAG: String
        CONF_USER: String
        CONF_DATETIME: String
        USE_PO_CD: String
        USE_ORDER_CD: String
        USE_DATETIME: String
        USE_PO_SEQ: Int
        USE_MRP_SEQ: Int
        USE_MATL_SEQ: Int
        FACTORY_CD: String
        STOCK_IDX: String
        ROOT_IDX: String
        REQ_QTY: Float
        DEFECT_QTY: Float
        LOSS_QTY: Float
        REG_DATETIME: String
        ORG_STOCK_IDX: String
        ORG_QTY: Float
    }

    input I_S0516_2_2_0 {
        WAREHOUSE: String
        PO_CD: String
        PO_SEQ: String
        VENDOR_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        CONDITION: String
        USE_DATE: String
    }

    type Query {
        mgrQueryS0516_2_2(data: I_S0516_2_2_0!): [T_S0516_2_2!]!
        mgrQueryS0516_2_2_0(data: I_S0516_2_2_0!): [T_S0516_2_2_0!]!
    }
`;

export default moduleTypedefs_S0516_2_2;
