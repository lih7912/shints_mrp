// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_CAPASAMPLE_MEM_ETHIOPIA = gql`
    type BASE_QRY_KSV_CAPASAMPLE_MEM_ETHIOPIA {
        BOOK_DATE: String
        USER_ID: String
        SEQ: Int
        JOB_CD: String
        MONTH: Int
        IN_DATE: String
        BUYER_CD: String
        PO_CD: String
        ORDER_CD: String
        STYLE_CD: String
        QTY: Int
        STS_QTY: Int
        COLOR: String
        USE_SIZE: String
        USAGE: String
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
        M_ETA: String
        SD: String
        KIND: String
        BVT_KIND: String
        S_ETA: String
        P_ETA: String
        STOCK_FLAG: String
        EXP_CMPT: Float
        REMARK: String
        TPR: Int
        EMBOSSING: String
        WASHING: String
        CUT: String
        FTP: String
        DTP: String
        LAZE: String
        id: Int
    }

    input BASE_INPUT_KSV_CAPASAMPLE_MEM_ETHIOPIA {
        BOOK_DATE: String
        USER_ID: String
        SEQ: Int
        JOB_CD: String
        MONTH: Int
        IN_DATE: String
        BUYER_CD: String
        PO_CD: String
        ORDER_CD: String
        STYLE_CD: String
        QTY: Int
        STS_QTY: Int
        COLOR: String
        USE_SIZE: String
        USAGE: String
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
        M_ETA: String
        SD: String
        KIND: String
        BVT_KIND: String
        S_ETA: String
        P_ETA: String
        STOCK_FLAG: String
        EXP_CMPT: Float
        REMARK: String
        TPR: Int
        EMBOSSING: String
        WASHING: String
        CUT: String
        FTP: String
        DTP: String
        LAZE: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_CAPASAMPLE_MEM_ETHIOPIA;
