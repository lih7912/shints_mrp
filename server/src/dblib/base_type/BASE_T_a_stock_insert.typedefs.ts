// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_a_stock_insert = gql`
    type BASE_QRY_a_stock_insert {
        stock_idx: String
        matl_cd: String
        in_qty: Float
        matl_seq: Int
        remark: String
        rack: String
        mrp_seq: Int
        id: Int
    }

    input BASE_INPUT_a_stock_insert {
        stock_idx: String
        matl_cd: String
        in_qty: Float
        matl_seq: Int
        remark: String
        rack: String
        mrp_seq: Int
        id: Int
    }
`;

export default moduleTypedefs_BASE_a_stock_insert;
