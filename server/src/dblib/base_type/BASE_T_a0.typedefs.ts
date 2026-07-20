// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_a0 = gql`
    type BASE_QRY_a0 {
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: Int
        LC_QTY: Float
        id: Int
    }

    input BASE_INPUT_a0 {
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: Int
        LC_QTY: Float
        id: Int
    }
`;

export default moduleTypedefs_BASE_a0;
