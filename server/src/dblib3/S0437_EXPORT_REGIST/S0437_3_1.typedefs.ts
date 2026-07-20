// MGR_S0437_3_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0437_3_1 = gql`
    type T_S0437_3_1 {
        SHIPMENT_CD: String
        STATUS_CD: String
        REG_DATETIME: String
        SHIP_MODE: String
        ORG_ORIGIN_PORT: String
        ORG_DESTINATION: String
        DESTINATION: String
        IS_SINGAPORE: String
        BL_NO: String
        ETA: String
        SHIPPING_COST: String
        IMPORT_COST: String
        S_WEIGHT: String
        S_CBM: String
    }

    input I_S0437_3_1 {
        STATUS_CD: String
        S_ETD: String
        E_ETD: String
        LICENSE_DATE: String
        PAYMENT_TYPE: String
        SHIP_DATE: String
        DESTINATION: String
    }

    type T_S0437_3_2 {
        PU_CD: String
        STSOUT_CD: String
        PACK_CD: String
        INVOICE_NO: String
        TRADE_TERM: String
        READY_DATE: String
        ETA: String
        ORIGIN_PORT: String
        DESTINATION: String
        CT_QTY: String
        CBM: String
        WEIGHT: String
        VENDOR_CD: String
        BUYER_CD: String
        PO_CD: String
    }

    input I_S0437_3_2 {
        SHIPMENT_CD: String
    }

    type Query {
        mgrQueryS0437_3_1(data: I_S0437_3_1!): [T_S0437_3_1!]!
        mgrQueryS0437_3_2(data: I_S0437_3_2!): [T_S0437_3_2!]!
    }
`;

export default moduleTypedefs_S0437_3_1;
