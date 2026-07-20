// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_ORDER_SHIP = gql`
    type BASE_QRY_KSV_ORDER_SHIP {
        ORDER_CD: String
        PROD_CD: String
        SHIP_DATE0: String
        SHIP_DATE: String
        EXFACTORY: String
        SHIP_PTYPE: String
        DELIVERY_TYPE: String
        SHIP_CNT: Int
        SIZE_CNT: String
        NAT_CD: String
        FC_BILL_PRICE: Float
        FC_BILL_FLAG: String
        FC_BILL_DATE: String
        FC_CHK_FLAG: String
        FC_CHK_USER: String
        FC_CHK_DATETIME: String
        CM_BILL_PRICE: Float
        CM_BILL_FLAG: String
        CM_BILL_DATE: String
        INVOICE_NO: String
        TRADE_CHK_FLAG: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_ORDER_SHIP {
        ORDER_CD: String
        PROD_CD: String
        SHIP_DATE0: String
        SHIP_DATE: String
        EXFACTORY: String
        SHIP_PTYPE: String
        DELIVERY_TYPE: String
        SHIP_CNT: Int
        SIZE_CNT: String
        NAT_CD: String
        FC_BILL_PRICE: Float
        FC_BILL_FLAG: String
        FC_BILL_DATE: String
        FC_CHK_FLAG: String
        FC_CHK_USER: String
        FC_CHK_DATETIME: String
        CM_BILL_PRICE: Float
        CM_BILL_FLAG: String
        CM_BILL_DATE: String
        INVOICE_NO: String
        TRADE_CHK_FLAG: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_ORDER_SHIP;
