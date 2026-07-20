// MGR_S0417_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0417_5 = gql`
    input I_S0417_5 {
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
        AIR_CHARAGE: String
        EXPRESS_CHARAGE: String
        STYLE_CD: String
    }

    type Ret_S0417_5 {
        CODE: String
        id: Int
    }

    input I_S0417_5_1 {
        FRT_DATE: String
        BL_NO: String
        AMOUNT: Float
        WEIGHT: Float
        ETA: String
        USER_ID: String
    }

    type Mutation {
        mgrInsert_S0417_5(datas: [I_S0417_5!]!): [Ret_S0417_5!]!
        mgrInsert_S0417_5_1(
            datas: [I_S0417_5!]!
            datas1: I_S0417_5_1!
        ): [Ret_S0417_5!]!
    }
`;

export default moduleTypedefs_S0417_5;
