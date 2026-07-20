// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KZZ_FREIGHT = gql`
    type BASE_QRY_KZZ_FREIGHT {
        FRT_IDX: Int
        FRT_DATE: String
        TRADE_TYPE: String
        DEPARTURE: String
        DESTINATION: String
        FRT_TYPE: String
        AREA_TYPE: String
        MATL_TYPE: String
        PO_CD: String
        ORDER_CD: String
        STYLE_CD: String
        MATL_CD: String
        QTY: Float
        WEIGHT: Float
        WEIGHT_NET: Float
        AMOUNT: Float
        CURR_CD: String
        NET: Float
        VAT: Float
        ADP_CHECK: String
        BL_NO: String
        INVOICE_NO: String
        SENDER: String
        RECEIVER: String
        SPEC: String
        REMARK: String
        REG_USER: String
        REG_DATETIME: String
        UNIT: String
        PRICE: Float
        MW: String
        GARMENT_COMPO: String
        CONFIRM_CHECK: String
        DELAY_REASON: String
        PO_SEQ: Int
        MRP_SEQ: Int
        IN_DATETIME: String
        CHARGE_KIND: String
        CHARGE_CODE: String
        buyer_cd: String
        AIR_FLAG: String
    }

    input BASE_INPUT_KZZ_FREIGHT {
        FRT_IDX: Int
        FRT_DATE: String
        TRADE_TYPE: String
        DEPARTURE: String
        DESTINATION: String
        FRT_TYPE: String
        AREA_TYPE: String
        MATL_TYPE: String
        PO_CD: String
        ORDER_CD: String
        STYLE_CD: String
        MATL_CD: String
        QTY: Float
        WEIGHT: Float
        WEIGHT_NET: Float
        AMOUNT: Float
        CURR_CD: String
        NET: Float
        VAT: Float
        ADP_CHECK: String
        BL_NO: String
        INVOICE_NO: String
        SENDER: String
        RECEIVER: String
        SPEC: String
        REMARK: String
        REG_USER: String
        REG_DATETIME: String
        UNIT: String
        PRICE: Float
        MW: String
        GARMENT_COMPO: String
        CONFIRM_CHECK: String
        DELAY_REASON: String
        PO_SEQ: Int
        MRP_SEQ: Int
        IN_DATETIME: String
        CHARGE_KIND: String
        CHARGE_CODE: String
        buyer_cd: String
        AIR_FLAG: String
    }
`;

export default moduleTypedefs_BASE_KZZ_FREIGHT;
