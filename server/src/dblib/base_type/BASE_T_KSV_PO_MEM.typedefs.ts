// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_PO_MEM = gql`
    type BASE_QRY_KSV_PO_MEM {
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        CONS_F: String
        CONS_A: String
        STYLE_CD: String
        id: Int
    }

    input BASE_INPUT_KSV_PO_MEM {
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        CONS_F: String
        CONS_A: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_PO_MEM;
