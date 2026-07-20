// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S020601_ORDER_MODIFY = gql`
    type Ret_S020601_ORDER_MODIFY_KSV_ORDER_MST {
        id: Int!
        CODE: String!
    }

    input I_S020601_ORDER_MODIFY_EDT_KSV_ORDER_MST {
        STYLE_NAME: String
        STYLE_CD: String
        BUYER_NAME: String
        BUYER_CD: String
        COLLECTION: String
        USER_ID: String
        BUYER_TEAM: String

        IS_COMBINED: String
        IS_SAMPLE: String
        IS_FACTORY_FOB: String
        IS_DL: String
    }

    input I_S020601_ORDER_MODIFY_EDT_KSV_ORDER_MST1 {
        ORDER_CD: String
        ORDER_CD1: String
        ORDER_CD2: String
        FACTORY_CD: String
        ORDER_QTY: String
        ADD_QTY: String
        ORDER_DATE: String
        DUE_DATE: String
        MATL_DUE_DATE: String
        NAT_CD: String
        NAT_NAME: String
        CURR_CD: String
        FOB: String
        FOB_USD: String
        SIZE_MEMBER: String
        SIZE_GROUP: String
    }

    input I_S020601_ORDER_MODIFY_EDT_KSV_ORDER_MST2 {
        REF_ORDER_NO: String
        REMARK1: String
        REMARK2: String
        NOTE: String
        SAMPLE_LEVEL: String
        SAMPLE_SEQ: String
        SAMPLE_REASON: String
    }

    input I_S020601_ORDER_MODIFY_EDT_KSV_ORDER_MST_ARRAY {
        id: Int
        TYPE: String
        NAT_CD: String
        NAT_NAME: String
        ORDER_QTY: String
        ADD_QTY: String
        ORDER_MEM: [I_S020601_ORDER_MODIFY_EDT_KSV_ORDER_MEM!]!
    }

    input I_S020601_ORDER_MODIFY_EDT_KSV_ORDER_MEM {
        id: Int
        PROD_CD: String
        ADD_FLAG: String
        COLOR: String
        TOT_CNT: String
        PRICE: String
        SIZE_CNT: String
    }

    input I_S020601_ORDER_MODIFY_SAVE {
        ORDER_MST: I_S020601_ORDER_MODIFY_EDT_KSV_ORDER_MST!
        ORDER_MST1: I_S020601_ORDER_MODIFY_EDT_KSV_ORDER_MST1!
        ORDER_MST2: I_S020601_ORDER_MODIFY_EDT_KSV_ORDER_MST2!
        ORDER_MST_ARRAY: [I_S020601_ORDER_MODIFY_EDT_KSV_ORDER_MST_ARRAY!]!
    }

    input I_S020601_ORDER_MODIFY_QRY {
        ORDER_CD: String
    }

    type T_S020601_ORDER_MEM_1 {
        id: Int
        ORDER_CD: String
        PROD_CD: String
        ADD_FLAG: String
        PRICE: String
        TOT_CNT: String
        SIZE_CNT: String
        OLD_PROD_CD: String
        end_price: String
        barcode: String
        MID_SIZE: String
        MID_SIZE_QTY: String
        SIZE_LOSS: String
        COLOR: String
    }

    type T_S020601_ORDER_MODIFY_MST_ARRAY {
        ORDER_MST: T_S020601_ORDER_INFO_ORDER_MST!
        ORDER_MEM: [T_S020601_ORDER_MEM_1!]!
    }

    type T_S020601_FILE_INFO {
        URL: String
        FILE_NAME: String
    }

    type T_S020601_SIZE_MST {
        SIZE_GROUP: String
        SIZE_NAME: String
        SIZE_MEMBER: String
    }

    type T_S020601_ORDER_INFO_INVOICE {
        SHIP_DATE: String
        SHIP_TYPE_NAME: String
        SHIP_QTY: String
        SALES_PRICE: String
        INVOICE_NO: String
        DELIVERY_TYPE_NAME: String
        SHIP_PRICE: String
        SHIP_DATE1: String
        COUNTRY: String
        SALES_DATE: String
        DOCU_NO: String
        CURR_CD: String
        USD_RATE: String
    }

    type T_S020601_ORDER_INFO_CMPT {
        ORDER_CMPT: String
    }

    type T_S020601_ORDER_INFO_ORDER_MST {
        ORDER_CD: String
        STYLE_CD: String
        ORDER_TYPE: String
        YY: Int
        SEQ: Int
        TOT_CNT: Int
        ADD_CNT: Int
        AVR_PRICE: Float
        FC_BEF: Float
        FC_PRICE: Float
        MATL_AMT: Float
        ETC_AMT: Float
        COMMISSION: Float
        COMM1: Float
        COMM2: Float
        OVER_FLAG: String
        OVER_QTY: Int
        OVER_AMT: Float
        OVER_BILL: String
        CURR_CD: String
        USD_PRICE: Float
        ORDER_DATE: String
        DUE_DATE: String
        MATL_DUE_DATE: String
        ETD: String
        NAT_CD: String
        NAT_NAME: String
        FACTORY_CD: String
        SIZE_GROUP: String
        ORDER_FLAG: String
        SAMPLE_FLAG: String
        MATL_SALE_FLAG: String
        FAC_LC_FLAG: String
        FAC_TT_FLAG: String
        ORDER_STATUS: String
        END_DATETIME: String
        REMARK: String
        REF_ORDER_NO: String
        REF_NO: String
        REF_Q_OUTER: String
        REF_Q_LINER: String
        REF_ORDER_REQ: String
        REF_COLOR1: String
        REF_COLOR2: String
        REF_SIZE1: String
        REF_SIZE2: String
        REF_QTY1: String
        REF_QTY2: String
        MATL_PAY_FLAG: String
        MATL_PAY_USER: String
        MATL_PAY_DATETIME: String
        FC_NEGO_TYPE: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        APPROVAL_USER: String
        APPROVAL_DATETIME: String
        brand: String
        season: String
        krw_flag: String
        krw_matl_amt: Float
        margin: Float
        frt_check: String
        category: String
        ORG_DUE_DATE: String
        BUYER_TEAM: String
        SAMPLE_COST_FLAG: String
        DL_FLAG: String
        TRADE_PRICE: Float
        LINE_CHARGE_PRICE: Float
        DUTY: Float
        mid_size1: String
        mid_size2: String
        mid_size3: String
        mid_size4: String
        END_STATUS: String
        FC_PRICE2: Float
        CANCEL_DATETIME: String
        PO_MATL_AMT: Float
        id: Int
        STYLE_NAME: String
        ORDER_STATUS_NAME: String
        BUYER_NAME: String
        SIZE_MEMBER: String
        PRICE_TERM: String
        CAPA_M_ETA: String
    }

    type T_S020601_ORDER_INFO_SHIP_CNT {
        SUM_SHIP_CNT: String
    }

    type T_S020601_CAPA_MEM {
        BOOK_DATE: String
        ORDER_CD: String
        M_ETA: String
        JOB_CD: String
    }

    type T_S020601_ORDER_MODIFY {
        CAPA_MEM: [T_S020601_CAPA_MEM!]!
        ORDER_MST: [T_S020601_ORDER_INFO_ORDER_MST!]!
        ORDER_MST_ARRAY: [T_S020601_ORDER_MODIFY_MST_ARRAY!]!
        PROD_MST: [BASE_QRY_KSV_PROD_MST!]!
        STYLE: [BASE_QRY_KCD_STYLE!]!
        FACTORY: [BASE_QRY_KCD_FACTORY!]!
        BUYER: [BASE_QRY_KCD_BUYER!]!
        FILE_INFO: [T_S020601_FILE_INFO!]!

        CODE_STYLE_CD: [BASE_QRY_KCD_STYLE!]!
        CODE_FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
        CODE_BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        CODE_NAT_CD: [BASE_QRY_KCD_NATION!]!
        CODE_CURRENCY: [BASE_QRY_KCD_CURRENCY!]!
        CODE_CURR_CD: [BASE_QRY_KCD_CODE!]!
        CODE_SAMPLE_STEP: [BASE_QRY_KCD_CODE!]!
        CODE_SAMPLE_ROUND: [BASE_QRY_KCD_CODE!]!
        CODE_SAMPLE_REASON: [BASE_QRY_KCD_CODE!]!
        CODE_SIZE_MST: [T_S020601_SIZE_MST!]!
        CODE_PRICE_TERM: [BASE_QRY_KCD_CODE!]!
        CODE_CAPA_USER: [BASE_QRY_KCD_CODE!]!
        CODE_BUYER_TEAM: [BASE_QRY_KCD_CODE!]!
        CODE_DL_KIND: [BASE_QRY_KCD_CODE!]!
        IS_CHANGE: [BASE_QRY_KCD_CODE!]!

        INFO_INVOICE_MEM: [T_S020601_ORDER_INFO_INVOICE!]!
        INFO_INVOICE_DOCU: [T_S020601_ORDER_INFO_INVOICE!]!
        INFO_ORDER_CMPT: [T_S020601_ORDER_INFO_CMPT!]!
        INFO_ORDER_MST: [T_S020601_ORDER_INFO_ORDER_MST!]!
        INFO_PO: [BASE_QRY_KSV_PO_MEM!]!
        INFO_SAMPLE_COST: [BASE_QRY_KZZ_SAMPLE_COST!]!
        INFO_SHIP_CNT: [T_S020601_ORDER_INFO_SHIP_CNT!]!
    }

    input I_S020601_ORDER_MODIFY_QRY_KSV_PROD_MEM {
        STYLE_CD: String
    }

    input I_S020601_ORDER_MODIFY_QRY_KCD_STYLE {
        STYLE_NAME: String
        BUYER_NAME: String
    }

    input I_S020601_ORDER_MODIFY_QRY_KCD_STYLE_INFO {
        STYLE_CD: String
    }

    type T_S020601_ORDER_MODIFY_QRY_KCD_STYLE_INFO {
        STYLE_CD: [BASE_QRY_KCD_STYLE!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        PROD_MST: [BASE_QRY_KSV_PROD_MST!]!
    }

    type T_S020601_BUYER_TEAMINFO {
        id: Int!
        col1: String
        col2: String
        col3: String
    }

    type Query {
        mgrQuery_S020601_ORDER_MODIFY_QRY(
            data: I_S020601_ORDER_MODIFY_QRY!
        ): T_S020601_ORDER_MODIFY!
        mgrQuery_S020601_ORDER_MODIFY_QRY_1(
            data: I_S020601_ORDER_MODIFY_QRY!
        ): T_S020601_ORDER_MODIFY!
        mgrQuery_S020601_ORDER_MODIFY_QRY_KCD_STYLE(
            data: I_S020601_ORDER_MODIFY_QRY_KCD_STYLE!
        ): [BASE_QRY_KCD_STYLE!]!
        mgrQuery_S020601_ORDER_MODIFY_QRY_KCD_STYLE_INFO(
            data: I_S020601_ORDER_MODIFY_QRY_KCD_STYLE_INFO!
        ): T_S020601_ORDER_MODIFY_QRY_KCD_STYLE_INFO!
        mgrQuery_S020601_BUYER_FILEINFO(
            BUYER_CD: String!
        ): [T_S020601_BUYER_TEAMINFO!]!
    }

    input I_S020601_BUYER_FILE_INFO_SAVE {
        BUYER_CD: String!
        KIND: String!
        NAME: String!
        FILE_NAME: String!
    }

    type Mutation {
        mgrInsert_S020601_ORDER_MODIFY(
            datas: I_S020601_ORDER_MODIFY_SAVE!
        ): [Ret_S020601_ORDER_MODIFY_KSV_ORDER_MST!]!
        mgrInsert_S020601_BUYER_FILE_INFO_SAVE(
            datas: I_S020601_BUYER_FILE_INFO_SAVE!
        ): String!
    }
`;

export default moduleTypedefs_S020601_ORDER_MODIFY;
