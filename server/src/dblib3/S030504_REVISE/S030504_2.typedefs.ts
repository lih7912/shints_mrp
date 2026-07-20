// MGR_S030504_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030504_2 = gql`
    type T_S030504_2 {
        USER_ID: String
        SEQ: String
        PO_CD: String
        PO_SEQ: String
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: String
        DIFF_RE_TYPE: String
        DIFF_RE_QTY: String
        MATL_SEQ: String
        MATL_PRICE: String
        CURR_CD: String
        TOT_AMT: String
        USE_SIZE: String
        bef_po_qty: String
        use_stock_qty: String
        stock_idx: String
        root_idx: String
        factory_cd: String
        org_po_seq: String
        po_matl_cd: String
        id: String
        DIFF_RE_TYPE_N: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
    }

    input I_S030504_2 {
        SEQ: String
        PO_CD: String
        PO_SEQ: String
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: String
    }

    type Query {
        mgrQueryS030504_2(data: I_S030504_2!): [T_S030504_2!]!
    }
`;

export default moduleTypedefs_S030504_2;
