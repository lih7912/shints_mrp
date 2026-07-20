// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0208_CAPABOOK_RECORD_BVT = gql`
    input I_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM {
        id: Int
        IN_DATE: String
        STYLE_CD: String
        STYLE_NAME: String
        BUYER_CD: String
        BUYER_NAME: String
        SHIP_DATE: String
        JOB_CD: String
        PO_CD: String
        ORDER_CD: String
        FOB: String
        QTY: String
        NR: String
        REMARK: String
        MW: String
        SHIP_ETA: String
        SAMPLE_ETA: String
        APPROVAL_DATE: String
        MATL_ETA: String
        EXP_CMPT: String
        BVT_KIND: String
        TPR: String
        EMBOSSING: String
        WASHING: String
        DL: String
        S: String
        FND: String
        DOWN: String
        CUT: String
        EMBRO: String
        TP: String
        SP: String
        LTHR: String
        G: String
        W: String
        FTP: String
        DTP: String
        SD: String
        NEGO_TYPE: String
        LAZE: String
        SEQ: String
        FACTORY_CD: String
        IS_SAMPLE: String
        BOOK_DATE: String
        ETD: String
        EXF: String
        S_ETA: String
        USAGE: String
        USAGE_N: String
    }

    type Ret_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM {
        id: String!
        CODE: String!
    }

    input I_S0208_CAPABOOK_RECORD_BVT_QRY_KSV_CAPABOOK_MEM {
        FACTORY_CD: String
        IS_SAMPLE: String
        PO_CD: String
        BUYER_CD: String
        BOOK_DATE: String
        NEW_DATE: String
        USER_NAME: String
        ORDER_CD: String
    }

    type T_S0208_CAPABOOK_RECORD_BVT_TBL_KSV_CAPABOOK_MEM {
        BOOK_DATE: String
        USER_ID: String
        SEQ: String
        JOB_CD: String
        MONTH: String
        IN_DATE: String
        BUYER_CD: String
        PO_CD: String
        ORDER_CD: String
        STYLE_CD: String
        QTY: String
        NR: String
        MW: String
        CAT: String
        EMBRO: String
        TP: String
        SP: String
        LTHR: String
        G: String
        W: String
        S: String
        FND: String
        DL: String
        M_ETA: String
        ETD: String
        APPROVAL_DATE: String
        FOB: String
        SD: String
        KIND: String
        BVT_KIND: String
        EXF: String
        EXP_CMPT: String
        REMARK: String
        TPR: String
        EMBOSSING: String
        WASHING: String
        DOWN: String
        CUT: String
        ORG_USER_ID: String
        SEND_DATETIME: String
        CAPABOOK_IDX: String
        SEND_FLAG: String
        FTP: String
        DTP: String
        LAZE: String
        id: String
        STYLE_NAME: String
        NEGO_TYPE: String
        BUYER_NAME: String
        SHIP_DATE: String
        S_ETA: String
        USAGE: String
        USAGE_N: String
    }

    type T_S0208_CAPABOOK_RECORD_BVT_TBL_KSV_CAPABOOK_MEM1 {
        JOB_CD: String
        IN_DATE: String
        BUYER_NAME: String
        BUYER_CD: String
        PO_CD: String
        ORDER_CD: String
        STYLE_NAME: String
        STYLE_CD: String
        NR: String
        QTY: String
        MW: String
        SHIP_DATE: String
        EXF: String
        M_ETA: String
        ETD: String
        APPROVAL_DATE: String
        SD: String
        FOB: String
        EXP_CMPT: String
        NEGO_TYPE: String
        EMBRO: String
        TP: String
        SP: String
        LTHR: String
        G: String
        W: String
        S: String
        FND: String
        DL: String
        TPR: String
        EMBOSSING: String
        WASHING: String
        DOWN: String
        CUT: String
        FTP: String
        DTP: String
        LAZE: String
        BVT_KIND: String
        SEQ: String
        REMARK: String
        S_ETA: String
    }

    type T_S0208_CODE {
        BVT_KIND: [BASE_QRY_KCD_CODE!]!
        NR: [BASE_QRY_KCD_CODE!]!
        FACTORY_CD: [BASE_QRY_KCD_CODE!]!
        CAPA_USER: [BASE_QRY_KCD_CODE!]!
    }

    type T_S0208_CAPABOOK_RECORD_BVT_DATE {
        BOOK_DATE_BVT: String
        NEW_DATE_BVT: String
        BOOK_DATE_SAMPLE_BVT: String
        NEW_DATE_SAMPLE_BVT: String
        BOOK_DATE_ETP: String
        NEW_DATE_ETP: String
        BOOK_DATE_SAMPLE_ETP: String
        NEW_DATE_SAMPLE_ETP: String
        BVT_KIND: [BASE_QRY_KCD_CODE!]!
        NR: [BASE_QRY_KCD_CODE!]!
        FACTORY_CD: [BASE_QRY_KCD_CODE!]!
        CAPA_USER: [BASE_QRY_KCD_CODE!]!
    }

    type T_S0208_SEARCH_STYLE2 {
        BUYER_CD: String
        STYLE_CD: String
        STYLE_NAME: String
        EMBOSSING: String
        WASHING: String
        TPR: String
        DTP: String
        DOWN: String
        TP: String
        FND: String
        W: String
        LAZE: String
        CUT: String
        SP: String
        FTP: String
        EMBRO: String
        LTHR: String
        BVT_KIND: String
        MW: String
        DL: String
        G: String
        S: String
        UNIT: String
        PURPOSE: String
        FABRIC: String
    }

    input I_S0208_SEARCH_STYLE2 {
        STYLE_CD2: String
    }

    type T_S0208_SEARCH_ORDER2 {
        STYLE: BASE_QRY_KCD_STYLE
        ORDER: BASE_QRY_KSV_ORDER_MST
        CAPA_DATE: String
        PO_CD: String
    }

    input I_S0208_SEARCH_ORDER2 {
        STYLE_CD: String
        ORDER_CD: String
        USER_NAME: String
        FACTORY_CD: String
        IS_SAMPLE: String
    }

    input I_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM_EDT {
        USER_NAME: String
        FACTORY_CD: String
        IS_SAMPLE: String
        BOOK_DATE: String
        JOB_CD: String
        REMARK: String
        NR: String
        EXF: String
        M_ETA: String
        APPROVAL_DATE: String
        USAGE: String
        EXP_CMPT: String
        PO_CD: String
        QTY: String
        FOB: String
    }

    input I_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM_EDT2 {
        ORDER_CD: String
    }

    type Query {
        mgrQuery_S0208_CAPABOOK_RECORD_BVT_TBL_KSV_CAPABOOK_MEM(
            data: I_S0208_CAPABOOK_RECORD_BVT_QRY_KSV_CAPABOOK_MEM!
        ): [T_S0208_CAPABOOK_RECORD_BVT_TBL_KSV_CAPABOOK_MEM!]!
        mgrQuery_S0208_CAPABOOK_RECORD_BVT_TBL_KSV_CAPABOOK_MEM1(
            data: I_S0208_CAPABOOK_RECORD_BVT_QRY_KSV_CAPABOOK_MEM!
        ): [T_S0208_CAPABOOK_RECORD_BVT_TBL_KSV_CAPABOOK_MEM1!]!
        mgrQuery_S0208_CAPABOOK_RECORD_BVT_DATE(
            USER_ID: String!
        ): T_S0208_CAPABOOK_RECORD_BVT_DATE!
        mgrQuery_S0208_CODE(USER_ID: String!): T_S0208_CODE!
        mgrQuery_S0208_SEARCH_STYLE2(
            data: I_S0208_SEARCH_STYLE2!
        ): [T_S0208_SEARCH_STYLE2!]!
        mgrQuery_S0208_SEARCH_ORDER2(
            data: I_S0208_SEARCH_ORDER2!
        ): [T_S0208_SEARCH_ORDER2!]!
    }

    input I_S0208_CAPA_REFRESH {
        FACTORY_CD: String
        IS_SAMPLE: String
        PO_CD: String
        BUYER_CD: String
        BOOK_DATE: String
        NEW_DATE: String
        USER_NAME: String
    }

    input I_S0208_CAPA_REFRESH2 {
        ORDER_CD: String
    }

    type Mutation {
        mgrUpdate_S0208_CAPA_REFRESH(
            datas: I_S0208_CAPA_REFRESH!
            datas1: [I_S0208_CAPA_REFRESH2!]!
        ): [Ret_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM!]!
        mgrInsert_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM(
            datain: [I_S0208_CAPABOOK_RECORD_BVT_QRY_KSV_CAPABOOK_MEM]!
            datas: [I_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM!]!
        ): [Ret_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM!]!
        mgrUpdate_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM(
            datas: I_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM_EDT!
            datas1: [I_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM_EDT2!]!
        ): [Ret_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM!]!
        mgrUpdate_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM_CANCEL(
            datas: I_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM_EDT!
            datas1: [I_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM_EDT2!]!
        ): [Ret_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM!]!
        mgrDelete_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM(
            datas: [I_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM!]!
        ): [Ret_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM!]!
    }
`;

export default moduleTypedefs_S0208_CAPABOOK_RECORD_BVT;
