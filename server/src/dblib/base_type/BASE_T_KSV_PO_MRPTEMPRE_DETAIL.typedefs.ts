// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_PO_MRPTEMPRE_DETAIL = gql`
    type BASE_QRY_KSV_PO_MRPTEMPRE_DETAIL {
        USER_ID: String
        SEQ: Int
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: Int
        DIFF_RE_TYPE: String
        DIFF_RE_QTY: Float
        MATL_SEQ: Int
        MATL_PRICE: Float
        CURR_CD: String
        TOT_AMT: Float
        USE_SIZE: String
        bef_po_qty: Float
        use_stock_qty: Float
        stock_idx: String
        root_idx: String
        factory_cd: String
        org_po_seq: Int
        po_matl_cd: String
        id: Int
    }

    input BASE_INPUT_KSV_PO_MRPTEMPRE_DETAIL {
        USER_ID: String
        SEQ: Int
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: Int
        DIFF_RE_TYPE: String
        DIFF_RE_QTY: Float
        MATL_SEQ: Int
        MATL_PRICE: Float
        CURR_CD: String
        TOT_AMT: Float
        USE_SIZE: String
        bef_po_qty: Float
        use_stock_qty: Float
        stock_idx: String
        root_idx: String
        factory_cd: String
        org_po_seq: Int
        po_matl_cd: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_PO_MRPTEMPRE_DETAIL;
