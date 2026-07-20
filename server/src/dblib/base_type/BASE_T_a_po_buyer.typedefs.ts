// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_a_po_buyer = gql`
    type BASE_QRY_a_po_buyer {
        buyer_name: String
        po_cd: String
        id: Int
    }

    input BASE_INPUT_a_po_buyer {
        buyer_name: String
        po_cd: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_a_po_buyer;
