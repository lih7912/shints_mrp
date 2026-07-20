// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_ORDER_PRODQTY = gql`
    type BASE_QRY_KSV_ORDER_PRODQTY {
        yymm: String
        order_cd: String
        cut_qty: Int
        cur_qty: Int
        ship_tot: Int
        ship_qty: Int
        cmpt: Float
        line_cd: String
        reg_user: String
        reg_datetime: String
        id: Int
    }

    input BASE_INPUT_KSV_ORDER_PRODQTY {
        yymm: String
        order_cd: String
        cut_qty: Int
        cur_qty: Int
        ship_tot: Int
        ship_qty: Int
        cmpt: Float
        line_cd: String
        reg_user: String
        reg_datetime: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_ORDER_PRODQTY;
