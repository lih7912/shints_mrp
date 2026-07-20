// MGR_S030515_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030515_2 = gql`
    type T_S030515_2 {
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

    input I_S030515_2 {
        PO_CD: String
    }

    input I_S030515_QRY_PO_MRP {
        PO_CD: String
        PO_SEQ: String
    }

    input I_S030515_QRY_PO_MRP2 {
        PO_CD: String
        ORDER_CD: String
        PO_SEQ: String
    }

    type T_S030515_QRY_PO_MRP2 {
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

    type T_S030515_QRY_PO_MRP1 {
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

    type T_S030515_QRY_ORDER_USE_SIZE {
        SIZE_NAME: String
        SIZE_CNT: String
    }

    type T_S030515_QRY_ORDER {
        KIND: String
        TITLE: String
        FILE_NAME: String
        FILE_URL: String
        PO_CD: String
        PO_SEQ: String
    }

    type T_S030515_QRY_SEQ_COMMENT {
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

    type T_S030515_RET {
        id: Int
        CODE: String
    }

    input I_S030515_REPORT_MRP_LIST {
        PO_CD: String
        PO_SEQ: String
        CURR_DATE: String
        LOCAL_WORD: String
        MRP_BY_ORDER: String
        MRP_BY_STYLE: String
        WITHOUT_PRICE: String
        ORDER_CDS: [String!]!
    }

    input I_S030515_QRY_ORDER {
        PO_CD: String
        PO_SEQ: String
        SEQ_COMMENT: String
    }

    input I_S030515_QRY_ORDER2 {
        KIND: String
        TITLE: String
        FILE_NAME: String
        FILE_URL: String
        PO_CD: String
        PO_SEQ: String
    }

    type Query {
        mgrQueryS030515_PROCESS_MAIL(
            data: I_S030515_QRY_ORDER!
            data1: [I_S030515_QRY_ORDER2!]!
        ): [T_S030515_RET!]!
        mgrQueryS030515_PROCESS_GENERATE(
            data: I_S030515_QRY_ORDER!
        ): [T_S030515_RET!]!
        mgrQueryS030515_QRY_ORDER(
            data: I_S030515_QRY_PO_MRP!
        ): [T_S030515_QRY_ORDER!]!
        mgrQueryS030515_UPDATE_QRY_ORDER(
            data: I_S030515_QRY_PO_MRP!
        ): [T_S030515_QRY_ORDER!]!
        mgrQueryS030515_QRY_ORDER_COMBINED(
            data: I_S030515_QRY_PO_MRP2!
        ): [T_S030515_QRY_ORDER!]!
        mgrQueryS030515_REPORT_MRP_LIST(
            data: I_S030515_REPORT_MRP_LIST!
        ): [T_S030515_RET!]!
        mgrQueryS030515_REPORT_MRP_LIST2(
            data: I_S030515_REPORT_MRP_LIST!
        ): [T_S030515_RET!]!
        mgrQueryS030515_REPORT_MRP_LIST3(
            data: I_S030515_REPORT_MRP_LIST!
        ): [T_S030515_RET!]!

        mgrQueryS030515_2(data: I_S030515_2!): [T_S030515_2!]!
        mgrQueryS030515_QRY_PO_MRP2(
            data: I_S030515_QRY_PO_MRP!
        ): [T_S030515_QRY_PO_MRP2!]!
        mgrQueryS030515_QRY_PO_MRP1(
            data: I_S030515_QRY_PO_MRP!
        ): [T_S030515_QRY_PO_MRP1!]!
        mgrQueryS030515_QRY_SEQ_COMMENT(
            data: I_S030515_QRY_PO_MRP!
        ): [T_S030515_QRY_SEQ_COMMENT!]!
        mgrQueryS030515_REPORT_1(data: I_S030515_QRY_PO_MRP!): [T_S030515_RET!]!
        mgrQueryS030515_REPORT_ADD_MATL_REQ(
            data: I_S030515_QRY_PO_MRP!
        ): [T_S030515_RET!]!
    }
`;

export default moduleTypedefs_S030515_2;
