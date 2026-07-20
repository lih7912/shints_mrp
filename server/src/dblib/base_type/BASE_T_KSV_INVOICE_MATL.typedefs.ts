// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_INVOICE_MATL = gql`
    type BASE_QRY_KSV_INVOICE_MATL {
        INVOICE_NO: String
        PACK_CD: String
        OUT_DATE: String
        DELIVERY_AMT: Float
        DELIVERY_WON: Float
        CURR_DATE: String
        DOCU_NO: String
        PAYMENT_TYPE: String
        TRADE_TYPE: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        CURR_CD: String
        TRADE_KIND: String
        LICENSE_NO: String
        LICENSE_DATE: String
        BUYER_CD: String
        id: Int
    }

    input BASE_INPUT_KSV_INVOICE_MATL {
        INVOICE_NO: String
        PACK_CD: String
        OUT_DATE: String
        DELIVERY_AMT: Float
        DELIVERY_WON: Float
        CURR_DATE: String
        DOCU_NO: String
        PAYMENT_TYPE: String
        TRADE_TYPE: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        CURR_CD: String
        TRADE_KIND: String
        LICENSE_NO: String
        LICENSE_DATE: String
        BUYER_CD: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_INVOICE_MATL;
