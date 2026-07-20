// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_a_update_order = gql`
    type BASE_QRY_a_update_order {
        invoice_no: String
        order_cd: String
        ship_date: String
        id: Int
    }

    input BASE_INPUT_a_update_order {
        invoice_no: String
        order_cd: String
        ship_date: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_a_update_order;
