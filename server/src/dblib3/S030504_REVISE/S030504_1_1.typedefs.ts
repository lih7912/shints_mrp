// MGR_S030504_1_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030504_1_1 = gql`
    type T_S030504_1_1 {
        PO_SEQ: String
        ORDER_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        USE_PO_TYPE_N: String
        PO_QTY: String
        USE_QTY: String
        OLD_QTY: String
        NEW_QTY: String
        DIFF_QTY: String
        DIFF_PO_TYPE_N: String
        VENDOR_NAME: String
        MRP_SEQ: String
        MATL_SEQ: String
        MATL_PRICE: String
        CURR_CD: String
        USE_SIZE: String
        TOT_AMT: String
        ORDER_STATUS: String
        SEQ: String
        SEND_DATETIME: String
        PO_FACTORY_CD:String
        PO_FACTORY_CD_N:String
        STOCK_FACTORY_CD:String
        STOCK_FACTORY_CD_N:String
    }

    input I_S030504_1_1 {
        PO_CD: String
        PO_SEQ: String
        ORDER_CD: String
    }

    type Query {
        mgrQueryS030504_1_1(data: I_S030504_1_1!): [T_S030504_1_1!]!
    }
`;

export default moduleTypedefs_S030504_1_1;
