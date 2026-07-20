// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_ksv_stock_2011 = gql`
    type BASE_QRY_ksv_stock_2011 {
        matl_cd: String
        stock_qty: Float
        tot_won: Float
        sheet_no: String
        id: Int
    }

    input BASE_INPUT_ksv_stock_2011 {
        matl_cd: String
        stock_qty: Float
        tot_won: Float
        sheet_no: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_ksv_stock_2011;
