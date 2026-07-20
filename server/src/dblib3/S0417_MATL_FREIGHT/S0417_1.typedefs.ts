// MGR_S0417_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0417_1 = gql`
    input I_S0417_1 {
        INVOICE_NO: String
        PACK_CD: String
    }

    type T_S0417_CODE {
        BL_TYPE: [BASE_QRY_KCD_CODE!]!
        FRT_TYPE: [BASE_QRY_KCD_CODE!]!
        TRADE_TYPE: [BASE_QRY_KCD_CODE!]!
        PARCEL_TYPE: [BASE_QRY_KCD_CODE!]!
        AREA_TYPE: [BASE_QRY_KCD_CODE!]!
        DESTINATION2: [BASE_QRY_KCD_CODE!]!
        DESTINATION: [BASE_QRY_KCD_CODE!]!
        DEPARTURE: [BASE_QRY_KCD_CODE!]!
        RECEIVER: [BASE_QRY_KCD_RECEIVER!]!
        SENDER: [BASE_QRY_KCD_USER!]!
        FRT_TYPE2: [BASE_QRY_KCD_CODE!]!
        PO_CD: [BASE_QRY_KSV_PO_MST!]!
        UNIT: [BASE_QRY_KCD_CODE!]!
        MW: [BASE_QRY_KCD_CODE!]!
        DELAY_REASON: [BASE_QRY_KCD_CODE!]!
        BL_NO: [BASE_QRY_KZZ_FREIGHT!]!
        VENDOR_CD: [BASE_QRY_KCD_VENDOR!]!
        CURR_CD: [BASE_QRY_KCD_CODE!]!
        EXPRESS_CHARGE: [BASE_QRY_KCD_CODE!]!
        AIR_CHARGE: [BASE_QRY_KCD_CODE!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        BUYER_TEAM: [BASE_QRY_KCD_CODE!]!
        CHARGE_KIND: [BASE_QRY_KCD_CODE!]!
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
    }

    input I_S0417_1_1 {
        KIND: String
        PO_CD: String
        ORDER_CD: String
    }

    type T_S0417_1_1 {
        COL1: String
        COL2: String
        COL3: String
    }

    type Query {
        mgrQueryS0417_CODE(data: I_S0417_1!): T_S0417_CODE!
        mgrQueryS0417_1(data: I_S0417_1_1!): [T_S0417_1_1!]!
    }
`;

export default moduleTypedefs_S0417_1;
