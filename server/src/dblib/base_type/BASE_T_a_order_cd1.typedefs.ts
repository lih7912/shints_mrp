// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_a_order_cd1 = gql`
    type BASE_QRY_a_order_cd1 {
        old_order_cd: String
        new_order_cd1: String
        new_buyer_cd: String
        id: Int
    }

    input BASE_INPUT_a_order_cd1 {
        old_order_cd: String
        new_order_cd1: String
        new_buyer_cd: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_a_order_cd1;
