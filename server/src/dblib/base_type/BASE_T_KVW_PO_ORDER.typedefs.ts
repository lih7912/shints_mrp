// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KVW_PO_ORDER = gql`
    type BASE_QRY_KVW_PO_ORDER {
        PO_CD: String
        ORDER_CD: String
    }

    input BASE_INPUT_KVW_PO_ORDER {
        PO_CD: String
        ORDER_CD: String
    }
`;

export default moduleTypedefs_BASE_KVW_PO_ORDER;
