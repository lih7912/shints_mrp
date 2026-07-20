// MGR_S0417_2_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0417_2_1 = gql`
    type T_S0417_2_1 {
        FRT_DATE: String
        TRADE_TYPE_N: String
        COL: String
        CONFIRM_CHECK: String
        DEPARTURE_N: String
        DESTINATION_N: String
        SENDER: String
        RECEIVER: String
        BUYER_CD: String
        PO_CD: String
        ORDER_CD: String
        SPEC: String
        QTY: Float
        WEIGHT: Float
        AMOUNT: Float
        CURR_CD: String
        DELAY_REASON_N: String
        FRT_TYPE_N: String
        AREA_TYPE_N: String
        PARCEL_TYPE_N: String
        BL_NO: String
        COL2: String
        COL3: String
        REMARK: String
        STYLE_NAME: String
        MATL_CD: String
        WEIGHT_NET: Float
        NET: Float
        VAT: Float
        ADP_CHECK: String
        INVOICE_NO: String
        CHARGE_KIND: String
        CHARGE_CODE: String
        REG_USER: String
        REG_DATETIME: String
        TRADE_TYPE: String
        DESTINATION: String
        FRT_TYPE: String
        AREA_TYPE: String
        MATL_TYPE: String
        UNIT: String
        PRICE: Float
        MW: String
        GARMENT_COMPO: String
        PO_SEQ: Int
        MRP_SEQ: Int
        IN_DATETIME: String
        MATL_NAME: String
        COLOR: String
        FRT_IDX: Int
        COL4: String
        DEPARTURE: String
        DELAY_REASON: String
    }

    input I_S0417_2_1 {
        S_FRT_DATE: String
        E_FRT_DATE: String
        FRT_TYPE: String
        SENDER: String
        BL_NO: String
        DESTINATION: String
        VENDOR_CD: String
        USER_ID: String
        PO_CD: String
        BUYER_CD: String
        BL_TYPE: String
        INVOICE_NO: String
        QRY_KIND: String
    }

    type Query {
        mgrQueryS0417_2_1(data: I_S0417_2_1!): [T_S0417_2_1!]!
    }
`;

export default moduleTypedefs_S0417_2_1;
