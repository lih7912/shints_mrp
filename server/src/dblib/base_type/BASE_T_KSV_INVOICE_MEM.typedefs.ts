// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_INVOICE_MEM = gql`
    type BASE_QRY_KSV_INVOICE_MEM {
        INVOICE_NO: String
        ORDER_CD: String
        SEQ: Int
        SHIP_QTY: Float
        SHIP_PRICE: Float
        SALES_PRICE: Float
        ORD_PRICE: Float
        DIFF_PRICE: Float
        TOT_AMT: Float
        PO_CD: String
        FACTORY_CD: String
        COUNTRY: String
        SHIP_DATE: String
        SHIP_PTYPE: String
        NAT_CD: String
        DELIVERY_TYPE: String
        id: Int
    }

    input BASE_INPUT_KSV_INVOICE_MEM {
        INVOICE_NO: String
        ORDER_CD: String
        SEQ: Int
        SHIP_QTY: Float
        SHIP_PRICE: Float
        SALES_PRICE: Float
        ORD_PRICE: Float
        DIFF_PRICE: Float
        TOT_AMT: Float
        PO_CD: String
        FACTORY_CD: String
        COUNTRY: String
        SHIP_DATE: String
        SHIP_PTYPE: String
        NAT_CD: String
        DELIVERY_TYPE: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_INVOICE_MEM;
