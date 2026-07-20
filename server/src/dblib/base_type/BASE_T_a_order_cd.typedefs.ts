// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_a_order_cd = gql`
    type BASE_QRY_a_order_cd {
        po_cd: String
        order_cd: String
        krw_amt: Float
        usd_amt: Float
        fob: String
        order_cd1: String
        neoe_no: String
        neoe_line: Int
        pay_report: String
        seq: Int
        id: Int
    }

    input BASE_INPUT_a_order_cd {
        po_cd: String
        order_cd: String
        krw_amt: Float
        usd_amt: Float
        fob: String
        order_cd1: String
        neoe_no: String
        neoe_line: Int
        pay_report: String
        seq: Int
        id: Int
    }
`;

export default moduleTypedefs_BASE_a_order_cd;
