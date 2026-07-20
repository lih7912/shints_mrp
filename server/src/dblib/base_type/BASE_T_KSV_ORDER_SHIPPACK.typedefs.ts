// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_ORDER_SHIPPACK = gql`
    type BASE_QRY_KSV_ORDER_SHIPPACK {
        INVOICE_NO: String
        ORDER_CD: String
        PROD_CD: String
        SHIP_DATE: String
        SHIP_PTYPE: String
        DELIVERY_TYPE: String
        NAT_CD: String
        SHIP_CNT: Int
        SIZE_CNT: String
        CTNO_FROM: Int
        CTNO_TO: Int
        CTNO_QTY: Int
        NW: Float
        GW: Float
        CBM: Float
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_ORDER_SHIPPACK {
        INVOICE_NO: String
        ORDER_CD: String
        PROD_CD: String
        SHIP_DATE: String
        SHIP_PTYPE: String
        DELIVERY_TYPE: String
        NAT_CD: String
        SHIP_CNT: Int
        SIZE_CNT: String
        CTNO_FROM: Int
        CTNO_TO: Int
        CTNO_QTY: Int
        NW: Float
        GW: Float
        CBM: Float
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_ORDER_SHIPPACK;
