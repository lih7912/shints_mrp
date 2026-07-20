// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_STOCK_FACIN = gql`
    type BASE_QRY_KSV_STOCK_FACIN {
        PO_CD: String
        IN_DATE: String
        MATL_CD: String
        IN_QTY: Float
        ERR_QTY: Float
        DELIVERY: String
        LOCATION: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_STOCK_FACIN {
        PO_CD: String
        IN_DATE: String
        MATL_CD: String
        IN_QTY: Float
        ERR_QTY: Float
        DELIVERY: String
        LOCATION: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_STOCK_FACIN;
