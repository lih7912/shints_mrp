// MGR_S030506_02.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030506_02 = gql`
    type T_S030506_02 {
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

    input I_S030506_02 {
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        VENDOR_CD: String
        FACTORY_CD: String
        VENDOR_NAME: String
    }

    type Query {
        mgrQueryS030506_02(data: I_S030506_02!): [T_S030506_02!]!
    }
`;

export default moduleTypedefs_S030506_02;
