// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_STOCK_FACOUT_TEMP = gql`
    type BASE_QRY_KSV_STOCK_FACOUT_TEMP {
        po_cd: String
        matl_cd: String
        out_qty: Float
        reg_user: String
        etc_type: String
        id: Int
    }

    input BASE_INPUT_KSV_STOCK_FACOUT_TEMP {
        po_cd: String
        matl_cd: String
        out_qty: Float
        reg_user: String
        etc_type: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_STOCK_FACOUT_TEMP;
