// MGR_S030504_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030504_3 = gql`
    input I_S030504_MRP_MAKE {
        USER_ID: String
        PO_CD: String
        PO_SEQ: String
        S_PO_DATE: String
        E_PO_DATE: String
        SEQ_REASON: String
        BUYER_CHK: String
        SALES_CHK: String
        MATL_CHK: String
        CAD_CHK: String
        MRP_CHK: String
        MRP2_CHK: String
        ETC_CHK: String
        SEQ_COMMENT: String
        APPROVAL: String
        IS_ALL: String
    }

    input I_S030504_CHANGE_2 {
        PO_CD: String
        PO_SEQ: String
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

    input I_S030504_CHANGE_1 {
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
        USE_PO_TYPE: String
        DIFF_PO_TYPE: String
        SEND_DATETIME: String
        PO_FACTORY_CD: String
        PO_FACTORY_CD_N: String
        STOCK_FACTORY_CD: String
        STOCK_FACTORY_CD_N: String
    }

    type Ret_S030504_MRP_MAKE {
        CODE: String
        id: String
    }

    type Ret_S030504_MRP_MAKE2 {
        CODE: String
        CODE1: String
        CODE2: String
        LAST_PO_SEQ: String
        NEW_PO_SEQ: String
        id: String
    }

    type Mutation {
        mgrInsert_S030504_UPDATE_COMMENT(
            datas: I_S030504_MRP_MAKE!
        ): [Ret_S030504_MRP_MAKE!]!
        mgrInsert_S030504_UPDATE_RESP(
            datas: I_S030504_MRP_MAKE!
        ): [Ret_S030504_MRP_MAKE!]!
        mgrInsert_S030504_MRP_MAKE(
            datas: I_S030504_MRP_MAKE!
        ): [Ret_S030504_MRP_MAKE2!]!
        mgrInsert_S030504_CHANGE_PROC(
            datas: I_S030504_MRP_MAKE!
            datas1: [I_S030504_CHANGE_1!]!
            datas2: [I_S030504_CHANGE_2!]!
        ): [Ret_S030504_MRP_MAKE!]!
        mgrInsert_S030504_RESET_PROC(
            datas: I_S030504_MRP_MAKE!
            datas1: [I_S030504_CHANGE_1!]!
            datas2: [I_S030504_CHANGE_2!]!
        ): [Ret_S030504_MRP_MAKE!]!
        mgrInsert_S030504_UPDATE_CONS(
            datas: I_S030504_MRP_MAKE!
            datas1: I_S030504_CHANGE_2!
        ): [Ret_S030504_MRP_MAKE!]!
    }
`;

export default moduleTypedefs_S030504_3;
