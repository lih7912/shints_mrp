// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_INVENTORY_MATL = gql`
    type BASE_QRY_KSV_INVENTORY_MATL {
        PO_CD: String
        ORDER_CD: String
        DATE_FROM: String
        DATE_TO: String
        PO_AMOUNT: Float
        PO_METER: Float
        IN_METER: Float
        IN_AMOUNT: Float
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_INVENTORY_MATL {
        PO_CD: String
        ORDER_CD: String
        DATE_FROM: String
        DATE_TO: String
        PO_AMOUNT: Float
        PO_METER: Float
        IN_METER: Float
        IN_AMOUNT: Float
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_INVENTORY_MATL;
