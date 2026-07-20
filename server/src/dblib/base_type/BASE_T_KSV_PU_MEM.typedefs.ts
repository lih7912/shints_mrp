// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_PU_MEM = gql`
    type BASE_QRY_KSV_PU_MEM {
        PU_CD: String
        PO_CD: String
        PO_SEQ: Int
        REG_USER: String
        REG_DATETIME: String
        STS_REMARK: String
        READY_DATE: String
        ETD: String
        ETA: String
        SHIP_WAY: String
        id: Int
    }

    input BASE_INPUT_KSV_PU_MEM {
        PU_CD: String
        PO_CD: String
        PO_SEQ: Int
        REG_USER: String
        REG_DATETIME: String
        STS_REMARK: String
        READY_DATE: String
        ETD: String
        ETA: String
        SHIP_WAY: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_PU_MEM;
