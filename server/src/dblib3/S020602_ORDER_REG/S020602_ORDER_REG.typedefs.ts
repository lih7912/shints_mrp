// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S020602_ORDER_REG = gql`
    type Ret_S020602_ORDER_REG_KSV_ORDER_MST {
        id: Int!
        CODE: String!
    }

    input I_S020602_ORDER_REG_EDT_KSV_ORDER_MST {
        STYLE_NAME: String
        STYLE_CD: String
        PO_CD: String
        XX_ORDER_CD: String
        XX_ORDER_QTY: String
        XX_ORDER_REMAIN: String
        BUYER_NAME: String
        BUYER_CD: String
        COLLECTION: String
        PRICE_TERM: String
        USER_ID: String
        APPROVAL_USER: String
        BUYER_TEAM: String

        IS_COMBINED: String
        IS_SAMPLE: String
        IS_FACTORY_FOB: String
        IS_EXPECTED: String
    }

    input I_S020602_ORDER_REG_EDT_KSV_ORDER_MST1 {
        ORDER_CD: String
        ORDER_CD1: String
        ORDER_CD2: String
        FACTORY_CD: String
        ORDER_QTY: String
        ADD_QTY: String
        ORDER_DATE: String
        DUE_DATE: String
        ETD: String
        NAT_CD: String
        NAT_NAME: String
        CURR_CD: String
        FOB: String
        FOB_USD: String
        SIZE_MEMBER: String
        SIZE_GROUP: String
        CAPA_USER: String
        ORDER_STATUS: String
        PO_CD: String
    }

    input I_S020602_ORDER_REG_EDT_KSV_ORDER_MST2 {
        SAMPLE_STEP: String
        SAMPLE_ROUND: String
        SAMPLE_REASON: String
    }

    input I_S020602_ORDER_REG_EDT_KSV_ORDER_MST_ARRAY {
        id: Int
        ORDER_CD: String
        TYPE: String
        CURR_CD: String
        NAT_CD: String
        NAT_NAME: String
        BUYER_PO: String
        EXF_DATE: String
        ETD_DATE: String
        IS_DL: String
        ORDER_QTY: String
        ADD_QTY: String
        ORDER_QTY_ONLY: String
        REF_ORDER_NO: String
        REMARK1: String
        REMARK2: String
        NOTE: String
        MID_SIZE1: String
        mid_size1: String
        MID_SIZE: String
        MID_SIZE_QTY: String
        IS_OLD_COMBINED: String
        ORDER_MEM: [I_S020602_ORDER_REG_EDT_KSV_ORDER_MEM!]!
    }

    input I_S020602_ORDER_REG_EDT_KSV_ORDER_MEM {
        id: Int
        PROD_CD: String
        ADD_FLAG: String
        COLOR: String
        TOT_CNT: String
        PRICE: String
        SIZE_CNT: String
        MID_SIZE: String
        MID_SIZE_QTY: String
    }

    input I_S020602_ORDER_REG_SAVE {
        OP_MODE: String
        OP_MODE2: String
        ORDER_MST: I_S020602_ORDER_REG_EDT_KSV_ORDER_MST!
        ORDER_MST1: I_S020602_ORDER_REG_EDT_KSV_ORDER_MST1!
        ORDER_MST2: I_S020602_ORDER_REG_EDT_KSV_ORDER_MST2!
        ORDER_MST_ARRAY: [I_S020602_ORDER_REG_EDT_KSV_ORDER_MST_ARRAY!]!
    }

    input I_S020602_ORDER_REG_QRY {
        STYLE_NAME: String
        BUYER_NAME: String
        BUYER_CD: String
    }

    type T_S020602_ORDER_REG_SIZE_MST {
        SIZE_GROUP: String
        SIZE_MEMBER: String
        SIZE_NAME: String
        SIZE_CNT: String
    }

    type T_S020602_ORDER_REG_CURRENCY {
        CURR_CD: String
        USD_RATE: String
        WON_AMT: String
    }

    type T_S020602_ORDER_REG {
        CODE_STYLE_CD: [BASE_QRY_KCD_STYLE!]!
        CODE_SIZE_INFO: [T_S020602_ORDER_REG_SIZE_MST!]!
        CODE_CURRENCY: [T_S020602_ORDER_REG_CURRENCY!]!
        CODE_FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
        CODE_BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        CODE_NAT_CD: [BASE_QRY_KCD_NATION!]!
        CODE_CURR_CD: [BASE_QRY_KCD_CODE!]!
        CODE_SAMPLE_STEP: [BASE_QRY_KCD_CODE!]!
        CODE_SAMPLE_ROUND: [BASE_QRY_KCD_CODE!]!
        CODE_SAMPLE_REASON: [BASE_QRY_KCD_CODE!]!
        CODE_SIZE_MST: [T_S020602_ORDER_REG_SIZE_MST!]!
        CODE_PRICE_TERM: [BASE_QRY_KCD_CODE!]!
        CODE_BUYER_TEAM: [BASE_QRY_KCD_CODE!]!
        CODE_CAPA_USER: [BASE_QRY_KCD_CODE!]!
        CODE_DL_KIND: [BASE_QRY_KCD_CODE!]!
    }

    input I_S020602_ORDER_REG_QRY_KSV_PROD_MEM {
        STYLE_CD: String
    }

    input I_S020602_ORDER_REG_QRY_KCD_STYLE {
        STYLE_NAME: String
        BUYER_NAME: String
    }

    input I_S020602_ORDER_REG_QRY_KCD_STYLE_INFO {
        STYLE_CD: String
    }

    input I_S020602_ORDER_REG_QRY_KCD_STYLE_LIST {
        STYLE_NAME: String
        BUYER_NAME: String
    }

    type T_S020602_FILE_INFO {
        URL: String
        FILE_NAME: String
    }

    type T_S020602_ORDER_REG_QRY_KCD_STYLE_INFO {
        STYLE_CD: [BASE_QRY_KCD_STYLE!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        PROD_MST: [BASE_QRY_KSV_PROD_MST!]!
        SIZE_MST: [T_S020602_ORDER_REG_SIZE_MST!]!
        FILE_INFO: [T_S020602_FILE_INFO!]!
    }

    type T_S020602_ORDER_REG_GET_CURR_DATA {
        USD_RATE: String
        WON_AMT: String
    }

    input I_S020602_ORDER_REG_GET_CURR_DATA {
        CURR_CD: String
    }

    input I_S020602_ORDER_REG_GET_CHANGE_INFO {
        ORDER_CD: String
    }

    type T_S020602_ORDER_REG_CHANGE_INFO_1 {
        ORDER_CD: String
        ORDER_CD1: String
        ORDER_CD2: String
        FACTORY_CD: String
        ORDER_QTY: String
        ADD_QTY: String
        ORDER_DATE: String
        DUE_DATE: String
        ETD_DATE: String
        NAT_CD: String
        NAT_NAME: String
        CURR_CD: String
        FOB: String
        FOB_USD: String
        SIZE_MEMBER: String
        SIZE_GROUP: String
        CAPA_USER: String
        ORDER_STATUS: String
        PO_CD: String
        MATL_DUE_DATE: String
    }

    type T_S020602_ORDER_REG_CHANGE_INFO_2_0 {
        PROD_CD: String
        ADD_FLAG: String
        COLOR: String
        TOT_CNT: String
        PRICE: String
        SIZE_CNT: String
    }

    type T_S020602_ORDER_REG_CHANGE_INFO_2_1 {
        id: Int
        ORDER_CD: String
        TYPE: String
        CURR_CD: String
        NAT_CD: String
        NAT_NAME: String
        BUYER_PO: String
        EXF_DATE: String
        ETD_DATE: String
        IS_DL: String
        ORDER_QTY: String
        ADD_QTY: String
        REMARK1: String
        REMARK2: String
        NOTE: String
        MID_SIZE1: String
        ORDER_MEM: [T_S020602_ORDER_REG_CHANGE_INFO_2_0!]!
    }

    type T_S020602_ORDER_REG_GET_CHANGE_INFO {
        ORDER_MST: T_S020602_ORDER_REG_CHANGE_INFO_1!
        ORDER_MST_ARRAY: [T_S020602_ORDER_REG_CHANGE_INFO_2_1!]!
        ORDER_MST_ARRAY_OLD: [T_S020602_ORDER_REG_CHANGE_INFO_2_1!]!
    }

    type T_S020602_EXCEL_END_REPORT {
        id: Int
        CODE: String
    }

    input I_S020602_EXCEL_END_REPORT {
        ORDER_CD: String
    }

    type T_S020602_FILE_INFO {
        TITLE: String
        NAME: String
        URL: String
        OBJECT_NAME: String
    }

    input I_S020602_FILE_INFO {
        ORDER_CD: String
    }

    type T_S020602_STYLE_LIST_9 {
        STYLE_CD: String
        STYLE_NAME: String
        BUYER_CD: String
        MW: String
        EMBRO: String
        TP: String
        SP: String
        LTHR: String
        G: String
        W: String
        S: String
        FND: String
        DL: String
        DOWN: String
        CUT: String
        KIND: String
        BVT_KIND: String
        YY: Int
        SEQ: Int
        BVT_FLAG: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        TPR: Int
        EMBOSSING: String
        WASHING: String
        style_kname: String
        ss_direct_rate: String
        ss_extra_rate: String
        ss_retail_rate: String
        ss_web_rate: String
        ss_nsr_rate: String
        ss_webex_rate: String
        minus_limit: Int
        in_exp_date: String
        FTP: String
        DTP: String
        LAZE: String
        id: Int
        BUYER_TEAM: String
    }

    type Query {
        mgrQuery_S020602_ORDER_REG_QRY(
            data: I_S020602_ORDER_REG_QRY!
        ): T_S020602_ORDER_REG!
        mgrQuery_S020602_ORDER_REG_QRY_KCD_STYLE(
            data: I_S020602_ORDER_REG_QRY_KCD_STYLE!
        ): [BASE_QRY_KCD_STYLE!]!
        mgrQuery_S020602_ORDER_REG_QRY_KCD_STYLE_INFO(
            data: I_S020602_ORDER_REG_QRY_KCD_STYLE_INFO!
        ): T_S020602_ORDER_REG_QRY_KCD_STYLE_INFO!
        mgrQuery_S020602_ORDER_REG_QRY_KCD_STYLE_LIST(
            data: I_S020602_ORDER_REG_QRY_KCD_STYLE_LIST!
        ): [T_S020602_STYLE_LIST_9!]!
        mgrQuery_S020602_ORDER_REG_GET_CURR_DATA(
            data: I_S020602_ORDER_REG_GET_CURR_DATA!
        ): [T_S020602_ORDER_REG_GET_CURR_DATA!]!
        mgrQuery_S020602_ORDER_REG_GET_CHANGE_INFO(
            data: I_S020602_ORDER_REG_GET_CHANGE_INFO!
        ): T_S020602_ORDER_REG_GET_CHANGE_INFO!
        mgrQuery_S020602_EXCEL_END_REPORT(
            data: I_S020602_EXCEL_END_REPORT!
        ): [T_S020602_EXCEL_END_REPORT!]!
        mgrQuery_S020602_FILE_INFO(
            data: I_S020602_FILE_INFO!
        ): [T_S020602_FILE_INFO!]!
    }

    input I_S020602_BUYER_FILE_INFO_SAVE {
        BUYER_CD: String!
        KIND: String!
        NAME: String!
        FILE_NAME: String!
    }

    input I_S020602_INSERT_CAPA {
        ORDER_CD: String
        USER_ID: String
        CAPA_M_ETA: String
        NR: String
        APPROVAL_DATE: String
        EXF: String
        REMARK: String
        USAGE: String
    }

    input I_S020602_COPY_ORDER {
        ORDER_CD: String
    }

    input I_S020602_END_ORDER {
        ORDER_CD: String
        PO_CD: String
        END_REMARK: String
    }

    input I_S020602_5_FILE_INFO {
        FILE_KEY: String
        TITLE: String
        NAME: String
        URL: String
        OBJECT_NAME: String
    }

    type Mutation {
        mgrInsert_S020602_ORDER_REG(
            datas: I_S020602_ORDER_REG_SAVE!
        ): [Ret_S020602_ORDER_REG_KSV_ORDER_MST!]!
        mgrInsert_S020602_BUYER_FILE_INFO_SAVE(
            datas: I_S020602_BUYER_FILE_INFO_SAVE!
        ): String!
        mgrInsert_S020602_PARTIAL_SHIP(
            datas: I_S020602_COPY_ORDER!
        ): [Ret_S020602_ORDER_REG_KSV_ORDER_MST!]!
        mgrInsert_S020602_INSERT_CAPA(
            datas: I_S020602_INSERT_CAPA!
        ): [Ret_S020602_ORDER_REG_KSV_ORDER_MST!]!
        mgrDelete_S020602_DELETE_ORDER(
            datas: I_S020602_INSERT_CAPA!
        ): [Ret_S020602_ORDER_REG_KSV_ORDER_MST!]!
        mgrUpdate_S020602_CANCEL_ORDER(
            datas: I_S020602_INSERT_CAPA!
        ): [Ret_S020602_ORDER_REG_KSV_ORDER_MST!]!
        mgrUpdate_S020602_CANCEL_STATUS(
            datas: I_S020602_INSERT_CAPA!
        ): [Ret_S020602_ORDER_REG_KSV_ORDER_MST!]!
        mgrUpdate_S020602_APPROVAL_ORDER(
            datas: I_S020602_INSERT_CAPA!
        ): [Ret_S020602_ORDER_REG_KSV_ORDER_MST!]!
        mgrInsert_S020602_COPY_ORDER(
            datas: I_S020602_COPY_ORDER!
        ): [Ret_S020602_ORDER_REG_KSV_ORDER_MST!]!
        mgrUpdate_S020602_END_CONFIRM(
            datas: I_S020602_END_ORDER!
        ): [Ret_S020602_ORDER_REG_KSV_ORDER_MST!]!
        mgrUpdate_S020602_CANCEL_END_REPORT(
            datas: I_S020602_END_ORDER!
        ): [Ret_S020602_ORDER_REG_KSV_ORDER_MST!]!
        mgrUpdate_S020602_END_SHIP(
            datas: I_S020602_END_ORDER!
        ): [Ret_S020602_ORDER_REG_KSV_ORDER_MST!]!
        mgrInsert_S020602_5_FILE_ADD(
            datas: I_S020602_5_FILE_INFO!
        ): [Ret_S020602_ORDER_REG_KSV_ORDER_MST!]!
        mgrInsert_S020602_5_FILE_UPDATE(
            datas: I_S020602_5_FILE_INFO!
        ): [Ret_S020602_ORDER_REG_KSV_ORDER_MST!]!
        mgrInsert_S020602_5_FILE_DELETE(
            datas: I_S020602_5_FILE_INFO!
        ): [Ret_S020602_ORDER_REG_KSV_ORDER_MST!]!
    }
`;

export default moduleTypedefs_S020602_ORDER_REG;
