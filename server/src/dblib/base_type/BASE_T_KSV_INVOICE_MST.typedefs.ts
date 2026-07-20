// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_INVOICE_MST = gql`
    type BASE_QRY_KSV_INVOICE_MST {
        INVOICE_NO: String
        SHIP_DATE: String
        DUE_DATE: String
        DELIVERY_TYPE: String
        BUYER_CD: String
        TOT_AMT: Float
        ADJ_AMT: Float
        ORD_AMT: Float
        CURR_CD: String
        REMARK: String
        EXT_INVOICE: String
        INVOICE_TYPE: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        DOCU_NO: String
        VALUE_FLAG: String
        VALUE_USER: String
        VALUE_DATETIME: String
        FACTORY_CD: String
        TRADE_TYPE: String
        PAYMENT_TYPE: String
        TO_NAME: String
        ETA: String
        MEASUREMENT: Float
        GROSS_WEIGHT: Float
        TOTAL_CTNS: Int
        BL_NO: String
        FORWARDER_NAME: String
        FREIGHT_COST: Float
        AIR_RATE: Float
        PAYMENT_TERM: String
        DHL_NO: String
        DOC_REC_DATE: String
        DOC_SEND_DATE: String
        SHIP_ADV_DATE: String
        FULL_DOC_REC_DATE: String
        TRANSFER_DATE: String
        MANAGE_AMT: Float
        LICENSE_NO: String
        LICENSE_DATE: String
        ETC_AMT: Float
        TRADE_TYPE2: String
        VOS_AMT: Float
        VAT_AMT: Float
        VAT_DATE: String
        org_reg_datetime: String
        id: Int
    }

    input BASE_INPUT_KSV_INVOICE_MST {
        INVOICE_NO: String
        SHIP_DATE: String
        DUE_DATE: String
        DELIVERY_TYPE: String
        BUYER_CD: String
        TOT_AMT: Float
        ADJ_AMT: Float
        ORD_AMT: Float
        CURR_CD: String
        REMARK: String
        EXT_INVOICE: String
        INVOICE_TYPE: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        DOCU_NO: String
        VALUE_FLAG: String
        VALUE_USER: String
        VALUE_DATETIME: String
        FACTORY_CD: String
        TRADE_TYPE: String
        PAYMENT_TYPE: String
        TO_NAME: String
        ETA: String
        MEASUREMENT: Float
        GROSS_WEIGHT: Float
        TOTAL_CTNS: Int
        BL_NO: String
        FORWARDER_NAME: String
        FREIGHT_COST: Float
        AIR_RATE: Float
        PAYMENT_TERM: String
        DHL_NO: String
        DOC_REC_DATE: String
        DOC_SEND_DATE: String
        SHIP_ADV_DATE: String
        FULL_DOC_REC_DATE: String
        TRANSFER_DATE: String
        MANAGE_AMT: Float
        LICENSE_NO: String
        LICENSE_DATE: String
        ETC_AMT: Float
        TRADE_TYPE2: String
        VOS_AMT: Float
        VAT_AMT: Float
        VAT_DATE: String
        org_reg_datetime: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_INVOICE_MST;
