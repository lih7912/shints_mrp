// MGR_S030503_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030503_2 = gql`
    type T_S030503_2 {
        PO_CD: String
        ORDER_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        RACK: String
        LOCATION: String
        REMAIN_QTY: String
        USE_QTY: String
        VENDOR_NAME: String
        STOCK_STATUS: String
        FACTORY_NAME: String
        FACTORY_NAME2: String
        FACTORY_CD: String
        REMARK: String
        PLAN_REMARK: String
        REASON_REMARK: String
        PO_SEQ: String
        MRP_SEQ: String
        MATL_SEQ: String
        MATL_PRICE: String
        CURR_CD: String
        STOCK_IDX: String
        ORG_STOCK_IDX: String
        ROOT_IDX: String
        MATL_TYPE: String
        MATL_TYPE2: String
        MATL_TYPE_N: String
        MATL_TYPE2_N: String
        AUTHORITY: String
        STOCK_STATUS_N: String
    }

    input I_S030503_2 {
        PO_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        RACK: String
        FACTORY_CD: String
        SPEC: String
        VENDOR_CD: String
        MATL_KIND2: String
        STATUS_CD: String
        STOCK_IDX: String
    }

    type Query {
        mgrQueryS030503_2(data: I_S030503_2!): [T_S030503_2!]!
        mgrQueryS030503_2_FACTORY_BY_STOCK_IDX(data: I_S030503_2!): [T_S030503_2!]!
    }
`;

export default moduleTypedefs_S030503_2;
