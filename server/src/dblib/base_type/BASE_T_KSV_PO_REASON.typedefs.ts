// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_PO_REASON = gql`
    type BASE_QRY_KSV_PO_REASON {
        PO_CD: String
        PO_SEQ: Int
        BUYER: String
        SALES: String
        MATL: String
        CAD: String
        MRP: String
        MRP2: String
        ETC: String
        SEQ_COMMENT: String
        SEQ_REASON: String
        APPROVAL: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_PO_REASON {
        PO_CD: String
        PO_SEQ: Int
        BUYER: String
        SALES: String
        MATL: String
        CAD: String
        MRP: String
        MRP2: String
        ETC: String
        SEQ_COMMENT: String
        SEQ_REASON: String
        APPROVAL: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_PO_REASON;
