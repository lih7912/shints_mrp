// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_ksv_stock_2016 = gql`
    type BASE_QRY_ksv_stock_2016 {
        matl_cd: String
        curr_cd: String
        matl_price: Float
        stock_qty: Float
        remark: String
        remark2: String
        po_cd: String
        tot_won: Float
        factory_cd: String
        id: Int
    }

    input BASE_INPUT_ksv_stock_2016 {
        matl_cd: String
        curr_cd: String
        matl_price: Float
        stock_qty: Float
        remark: String
        remark2: String
        po_cd: String
        tot_won: Float
        factory_cd: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_ksv_stock_2016;
