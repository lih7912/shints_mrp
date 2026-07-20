// MGR_S030506_02_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030506_02_1 = gql`
    type T_S030506_02_1 {
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        MATL_PRICE: String
        CURR_CD: String
        UNIT: String
        STOCK_QTY: String
        PO_QTY: String
        PO_TYPE_NAME: String
        REASON_TYPE: String
        FARE_TYPE: String
        REMARK: String
        VENDOR_NAME: String
        STOCK_STATUS: String
        USE_PO_TYPE: String
        USE_PO_CD: String
        USE_PO_SEQ: String
        USE_ORDER_CD: String
        USE_MRP_SEQ: String
        USE_MATL_SEQ: String
        MATL_SEQ: String
        FACTORY_CD: String
        FACTORY_NAME: String
        STOCK_IDX: String
        REMARK2: String
        PLAN_REMARK: String
        VENDOR_CD: String
        ORDER_CD: String
        RACK: String
    }

    type T_S030506_02_2 {
        PO_STATUS_NAME: String
        PO_STATUS: String
        PO_SEQ: String
        BUYER_NAME: String
        BUYER_CD: String
        PO_TYPE_NAME: String
        PO_TYPE: String
        PO_CD: String
        TARGET_ETA: String
        REG_DATETIME: String
        REG_USER: String
        UPD_DATETIME: String
        UPD_USER: String
        MRP_PACK_FLAG: String
        DOMESTIC_FLAG: String
        IMPORT_FLAG: String
        FACTORY_FLAG: String
        FACTORY2_FLAG: String
        FACTORY3_FLAG: String
        FACTORY4_FLAG: String
        FACTORY5_FLAG: String
        FACTORY_CD: String
        FACTORY_NAME: String
        WORK_STATUS: String
        REQ_STATUS: String
        P_STATUS_CD: String
        MATL_DUE_DATE: String
        DUE_DATE: String
        PURCHASE_REQUEST: String
    }

    input I_S030506_02_1 {
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        VENDOR_CD: String
        FACTORY_CD: String
        VENDOR_NAME: String
    }

    input I_S030506_02_2 {
        PO_CD: String
    }

    type Query {
        mgrQueryS030506_02_1(data: I_S030506_02_1!): [T_S030506_02_1!]!
        mgrQueryS030506_02_2(data: I_S030506_02_2!): [T_S030506_02_2!]!
    }
`;

export default moduleTypedefs_S030506_02_1;
