// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_PO_MATLLISTTEMP = gql`
    type BASE_QRY_KSV_PO_MATLLISTTEMP {
        USER_ID: String
        PO_CD: String
        VENDOR_CD: String
        PR_NUM: String
        MATL_CD: String
        MATL_SEQ: Int
        TOT_CNT: String
        ORD_CNT: String
        ORD_AMT: String
        NEED_CNT: String
        REG_USER: String
        REG_DATETIME: String
        STOCK_QTY: Int
        REMARK: String
        MCARD_QTY: Int
        SAMPLE_QTY: Int
        ACT_CON: Int
        MIS_LINE: Int
        SHORTAGE: Int
        remark_bvt: String
        OTHER_QTY: Int
        ERR_QTY: Int
        stock_move: Int
        EXP_DATE: String
        ETD: String
        ETA: String
        DELIVERY: String
        UPD_USER: String
        UPD_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_PO_MATLLISTTEMP {
        USER_ID: String
        PO_CD: String
        VENDOR_CD: String
        PR_NUM: String
        MATL_CD: String
        MATL_SEQ: Int
        TOT_CNT: String
        ORD_CNT: String
        ORD_AMT: String
        NEED_CNT: String
        REG_USER: String
        REG_DATETIME: String
        STOCK_QTY: Int
        REMARK: String
        MCARD_QTY: Int
        SAMPLE_QTY: Int
        ACT_CON: Int
        MIS_LINE: Int
        SHORTAGE: Int
        remark_bvt: String
        OTHER_QTY: Int
        ERR_QTY: Int
        stock_move: Int
        EXP_DATE: String
        ETD: String
        ETA: String
        DELIVERY: String
        UPD_USER: String
        UPD_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_PO_MATLLISTTEMP;
