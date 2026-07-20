// MGR_S030504_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030504_1 = gql`
    type T_S030504_1_1 {
        PO_SEQ: String
        ORDER_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        USE_PO_TYPE_N: String
        USE_QTY: String
        PO_QTY: String
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
        USE_PO_TYPE: String
        DIFF_PO_TYPE: String
        SEND_DATETIME: String
    }

    type T_S030504_1_2 {
        BUYER_CHK: String
        SALES_CHK: String
        MATL_CHK: String
        CAD_CHK: String
        MRP_CHK: String
        MRP2_CHK: String
        ETC_CHK: String
        SEQ_REASON: String
        SEQ_COMMENT: String
        APPROVAL: String
    }

    type T_S030504_1 {
        DATA1: [T_S030504_1_1!]!
        DATA2: [T_S030504_1_2!]!
    }

    input I_QRY_S030504_1 {
        ORDER_CD: String
        STYLE_NAME: String
        BUYER_NAME: String
        TOT_CNT: String
        DUE_DATE: String
        FACTORY_NAME: String
        CONS_F: String
        CONS_A: String
        FACTORY_CD: String
        ORDER_STATUS_N: String
        ORDER_STATUS: String
    }

    input I_S030504_1 {
        PO_CD: String
        PO_SEQ: String
        ORDER_CD: String
    }

    type Query {
        mgrQueryS030504_1(data: I_S030504_1!): T_S030504_1!
    }
`;

export default moduleTypedefs_S030504_1;
