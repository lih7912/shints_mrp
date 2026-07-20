// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_CAPABOOK_PLAN = gql`
    type BASE_QRY_KSV_CAPABOOK_PLAN {
        USER_ID: String
        SEQ: Int
        BOOK_DATE: String
        JOB_CD: String
        LINE: String
        LINE_STATUS: String
        LINE_SEQ: Int
        ORDER_SEQ: Int
        BUYER_CD: String
        PO_CD: String
        ORDER_CD: String
        STYLE_CD: String
        QTY: Int
        ACT_QTY: Int
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
        MD_BAL: String
        FOB: Float
        SD: String
        SD_BAL: String
        KIND: String
        BVT_KIND: String
        S_ETA: String
        EXP_CMPT: Float
        FIX_CMPT: Float
        TIME_CHECK: String
        CUTTING: String
        SEW_INPUT: String
        SEW_FROM: String
        SEW_TO: String
        DAY_QTY: String
        WORK_PCS: String
        WORK_HOURS: String
        PT_CHECK: String
        LEADER_KIND: String
        LEADER_QTY: String
        PROD_MANAGER: String
        SALES_MANAGER: String
        BOM: String
        FIX: String
        PRO: String
        DEL: String
        EXP_TOT_HOURS: Float
        LINE_CHARGE: Float
        EXP_TOT_CHARGE: Float
        EXP_LAB_COST: Float
        FIX_AMT: Float
        REMARK: String
        DAYS: Float
        DSUM: Float
        id: Int
    }

    input BASE_INPUT_KSV_CAPABOOK_PLAN {
        USER_ID: String
        SEQ: Int
        BOOK_DATE: String
        JOB_CD: String
        LINE: String
        LINE_STATUS: String
        LINE_SEQ: Int
        ORDER_SEQ: Int
        BUYER_CD: String
        PO_CD: String
        ORDER_CD: String
        STYLE_CD: String
        QTY: Int
        ACT_QTY: Int
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
        MD_BAL: String
        FOB: Float
        SD: String
        SD_BAL: String
        KIND: String
        BVT_KIND: String
        S_ETA: String
        EXP_CMPT: Float
        FIX_CMPT: Float
        TIME_CHECK: String
        CUTTING: String
        SEW_INPUT: String
        SEW_FROM: String
        SEW_TO: String
        DAY_QTY: String
        WORK_PCS: String
        WORK_HOURS: String
        PT_CHECK: String
        LEADER_KIND: String
        LEADER_QTY: String
        PROD_MANAGER: String
        SALES_MANAGER: String
        BOM: String
        FIX: String
        PRO: String
        DEL: String
        EXP_TOT_HOURS: Float
        LINE_CHARGE: Float
        EXP_TOT_CHARGE: Float
        EXP_LAB_COST: Float
        FIX_AMT: Float
        REMARK: String
        DAYS: Float
        DSUM: Float
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_CAPABOOK_PLAN;
