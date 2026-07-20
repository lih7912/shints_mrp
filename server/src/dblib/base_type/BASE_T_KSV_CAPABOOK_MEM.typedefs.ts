// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_CAPABOOK_MEM = gql`
    type BASE_QRY_KSV_CAPABOOK_MEM {
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
        FOB: Float
        SD: String
        KIND: String
        BVT_KIND: String
        S_ETA: String
        EXP_CMPT: Float
        REMARK: String
        TPR: Int
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
        id: Int
    }

    input BASE_INPUT_KSV_CAPABOOK_MEM {
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
        FOB: Float
        SD: String
        KIND: String
        BVT_KIND: String
        S_ETA: String
        EXP_CMPT: Float
        REMARK: String
        TPR: Int
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
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_CAPABOOK_MEM;
