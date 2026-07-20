// MGR_S030502_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030502_2 = gql`
    type T_S030502_2 {
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        ORG_PO_SEQ: Int
        PO_QTY: Float
        DIFF_QTY: Float
        DIFF_PO_TYPE_NAME: String
        REMARK: String
        MATL_PRICE: Float
        CURR_CD: String
        MATL_AMT: Float
        VENDOR_NAME: String
        MRP_SEQ: Int
        SEQ_COMMENT: String
    }

    input I_S030502_2 {
        PO_CD: String
    }

    input I_S030502_QRY_PO_MRP {
        PO_CD: String
        PO_SEQ: String
    }

    type T_S030502_QRY_PO_MRP2 {
        po_seq: String
        order_cd: String
        matl_cd: String
        matl_name: String
        color: String
        spec: String
        unit: String
        org_po_seq: String
        po_qty: String
        diff_qty: String
        diff_po_type_n: String
        remark: String
        matl_price: String
        curr_cd: String
        po_amt: String
        vendor_name: String
        mrp_seq: String
        seq_comment: String
    }

    type T_S030502_QRY_PO_MRP1 {
        po_seq: String
        order_cd: String
        matl_cd: String
        matl_name: String
        color: String
        spec: String
        unit: String
        use_po_type_n: String
        use_qty: String
        po_qty: String
        diff_qty: String
        diff_po_type_n: String
        matl_price: String
        curr_cd: String
        po_amt: String
        vendor_name: String
        mrp_seq: String
        matl_seq: String
        reg_datetime: String
    }

    type T_S030502_QRY_ORDER_USE_SIZE {
        SIZE_NAME: String
        SIZE_CNT: String
    }

    type T_S030502_QRY_ORDER {
        ORDER_CD: String
        STYLE_NAME: String
        TOT_CNT: String
        COL1: String
        DUE_DATE: String
        ORDER_RATE: String
        MRP_LIST_FILE: String
        MRP_LIST_FILE_URL: String
        USE_SIZE: [T_S030502_QRY_ORDER_USE_SIZE!]!
    }

    type T_S030502_QRY_SEQ_COMMENT {
        SEQ_COMMENT: String
        CHK_BUYER: String
        CHK_SALES: String
        CHK_MATL: String
        CHK_MRP: String
        CHK_MRP2: String
        CHK_ETC: String
        CHK_CAD: String
        SEQ_REASON: String
    }

    type T_S030502_RET {
        id: Int
        CODE: String
    }

    input I_S030502_REPORT_MRP_LIST {
        PO_CD: String
        PO_SEQ: String
        ORDER_CDS: [String!]!
    }

    type Query {
        mgrQueryS030502_2(data: I_S030502_2!): [T_S030502_2!]!
        mgrQueryS030502_QRY_PO_MRP2(
            data: I_S030502_QRY_PO_MRP!
        ): [T_S030502_QRY_PO_MRP2!]!
        mgrQueryS030502_QRY_PO_MRP1(
            data: I_S030502_QRY_PO_MRP!
        ): [T_S030502_QRY_PO_MRP1!]!
        mgrQueryS030502_QRY_ORDER(
            data: I_S030502_QRY_PO_MRP!
        ): [T_S030502_QRY_ORDER!]!
        mgrQueryS030502_QRY_SEQ_COMMENT(
            data: I_S030502_QRY_PO_MRP!
        ): [T_S030502_QRY_SEQ_COMMENT!]!
        mgrQueryS030502_REPORT_1(data: I_S030502_QRY_PO_MRP!): [T_S030502_RET!]!
        mgrQueryS030502_REPORT_ADD_MATL_REQ(
            data: I_S030502_QRY_PO_MRP!
        ): [T_S030502_RET!]!
        mgrQueryS030502_REPORT_MRP_LIST(
            data: I_S030502_REPORT_MRP_LIST!
        ): [T_S030502_RET!]!
    }
`;

export default moduleTypedefs_S030502_2;
