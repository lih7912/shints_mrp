// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0209_CAPABOOK_LIST_BVT = gql`
    input I_S0209_CAPABOOK_LIST_BVT_CAPA_END {
        FACTORY_CD: String
        IS_SAMPLE: String
        BOOK_DATE: String
        USER_NAME: String
    }

    input I_S0209_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM {
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
        FOB: Float
        QTY: Int
        NR: String
        REMARK: String
        MW: String
        SHIP_ETA: String
        SAMPLE_ETA: String
        MATL_ETA: String
        EXP_CMPT: Float
        BVT_KIND: String
        TPR: Int
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
        SEQ: Int
        FACTORY_CD: String
        IS_SAMPLE: String
        BOOK_DATE: String
    }

    type Ret_S0209_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM {
        id: Int!
        CODE: String!
    }

    input I_S0209_CAPABOOK_LIST_BVT_QRY_KSV_CAPABOOK_MEM {
        FACTORY_CD: String
        IS_SAMPLE: String
        PO_CD: String
        BOOK_DATE: String
        NEW_DATE: String
        USER_NAME: String
        IS_ALL: String
    }

    type T_S0209_CAPABOOK_LIST_BVT_TBL_KSV_CAPABOOK_MEM {
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

    type T_S0209_CAPABOOK_LIST_BVT_TBL_KSV_CAPABOOK_MEM1 {
        JOB_CD: String
        BOOK_DATE: String
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
        S_ETA: String
        M_ETA: String
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
    }

    type T_S0209_BOOK_DATE_ARRAY {
        BOOK_DATE: String
        STATUS_CD: String
    }

    type T_S0209_CAPABOOK_LIST_BVT_DATE {
        BOOK_DATE_BVT: String
        NEW_DATE_BVT: String
        BOOK_DATE_ETP: String
        NEW_DATE_ETP: String
        BOOK_DATE_SAMPLE_BVT: String
        NEW_DATE_SAMPLE_BVT: String
        BOOK_DATE_SAMPLE_ETP: String
        NEW_DATE_SAMPLE_ETP: String
        BVT_KIND: [BASE_QRY_KCD_CODE!]!
        NR: [BASE_QRY_KCD_CODE!]!
        FACTORY_CD: [BASE_QRY_KCD_CODE!]!
        BOOK_DATES_ETP: [T_S0209_BOOK_DATE_ARRAY!]!
        BOOK_DATES_BVT: [T_S0209_BOOK_DATE_ARRAY!]!
        SAMPLE_DATES_ETP: [T_S0209_BOOK_DATE_ARRAY!]!
        SAMPLE_DATES_BVT: [T_S0209_BOOK_DATE_ARRAY!]!
    }

    type T_S0209_CODE {
        CAPA_USER: [BASE_QRY_KCD_CODE!]!
    }

    type T_S0209_ALL_LIST {
        KIND: String
        USER_ID: String
        BOOK_DATE: String
    }
    input I_S0209_ALL_LIST {
        BOOK_DATE: String
        FACTORY_CD: String
        IS_SAMPLE: String
    }

    type Query {
        mgrQuery_S0209_CAPABOOK_LIST_BVT_TBL_KSV_CAPABOOK_MEM(
            data: I_S0209_CAPABOOK_LIST_BVT_QRY_KSV_CAPABOOK_MEM!
        ): [T_S0209_CAPABOOK_LIST_BVT_TBL_KSV_CAPABOOK_MEM!]!
        mgrQuery_S0209_CAPABOOK_LIST_BVT_TBL_KSV_CAPABOOK_MEM1(
            data: I_S0209_CAPABOOK_LIST_BVT_QRY_KSV_CAPABOOK_MEM!
        ): [T_S0209_CAPABOOK_LIST_BVT_TBL_KSV_CAPABOOK_MEM1!]!
        mgrQuery_S0209_CAPABOOK_LIST_BVT_DATE(
            USER_ID: String!
        ): T_S0209_CAPABOOK_LIST_BVT_DATE!
        mgrQuery_S0209_CODE(USER_ID: String!): T_S0209_CODE!
        mgrQuery_S0209_EXCEL_PRINT(
            data: I_S0209_CAPABOOK_LIST_BVT_QRY_KSV_CAPABOOK_MEM!
        ): [Ret_S0209_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM!]!
        mgrQuery_S0209_EXCEL_PRINT_SAMPLE(
            data: I_S0209_CAPABOOK_LIST_BVT_QRY_KSV_CAPABOOK_MEM!
        ): [Ret_S0209_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM!]!
        mgrQuery_S0209_EXCEL_PRINT_ALL(
            data: I_S0209_CAPABOOK_LIST_BVT_QRY_KSV_CAPABOOK_MEM!
        ): [Ret_S0209_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM!]!
        mgrQuery_S0209_ALL_LIST(data: I_S0209_ALL_LIST!): [T_S0209_ALL_LIST!]!
        mgrQuery_S0209_ALL_LIST_bak(
            data: I_S0209_ALL_LIST!
        ): [T_S0209_ALL_LIST!]!
        mgrQuery_S0209_ALL_LIST_bak1(
            data: I_S0209_ALL_LIST!
        ): [T_S0209_ALL_LIST!]!
    }

    type Mutation {
        mgrInsert_S0209_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM(
            datain: [I_S0209_CAPABOOK_LIST_BVT_QRY_KSV_CAPABOOK_MEM]!
            datas: [I_S0209_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM!]!
        ): [Ret_S0209_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM!]!
        mgrUpdate_S0209_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM(
            datas: [I_S0209_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM!]!
        ): [Ret_S0209_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM!]!
        mgrDelete_S0209_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM(
            datas: [I_S0209_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM!]!
        ): [Ret_S0209_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM!]!

        mgrUpdate_S0209_CAPABOOK_LIST_BVT_CAPA_END(
            datas: [I_S0209_CAPABOOK_LIST_BVT_CAPA_END!]!
        ): [Ret_S0209_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM!]!
        mgrUpdate_S0209_CAPABOOK_LIST_BVT_CAPA_END_CANCEL(
            datas: [I_S0209_CAPABOOK_LIST_BVT_CAPA_END!]!
        ): [Ret_S0209_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM!]!
    }
`;

export default moduleTypedefs_S0209_CAPABOOK_LIST_BVT;
