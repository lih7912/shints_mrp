// MGR_S030503_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030503_1 = gql`
    type T_S030503_1 {
        PO_SEQ:String
        ORDER_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        PO_MATL_CD: String
        USE_PO_TYPE_N: String
        USE_QTY: String
        PO_QTY: String
        SUM_QTY: String
        VENDOR_NAME: String
        STOCK_CHK: String
        MRP_SEQ: String
        MATL_SEQ: String
        MATL_PRICE: String
        CURR_CD: String
        PO_MRP_SEQ: String
        REG_DATETIME: String
        STOCK_IDX: String
        RACK: String
        ROOT_IDX: String
        VENDOR_CD: String
        MATL_KIND2: String
        STATUS_CD: String
        FACTORY_CD: String
        NEW_FACTORY_CD: String
    }

    input I_S030503_1 {
        PO_CD: String
        PO_SEQ: String
        USER_ID: String
        ORDER_CD: String
        MATL_CD: String
    }

    type Query {
        mgrQueryS030503_1(data: I_S030503_1!): [T_S030503_1!]!
        mgrQueryS030503_1_260330(data: I_S030503_1!): [T_S030503_1!]!
        mgrQueryS030503_1_bak(data: I_S030503_1!): [T_S030503_1!]!
        mgrQueryS030503_1_0(data: I_S030503_1!): [T_S030503_1!]!
    }
`;

export default moduleTypedefs_S030503_1;
