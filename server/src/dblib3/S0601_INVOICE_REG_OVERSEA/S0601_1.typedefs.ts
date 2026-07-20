// MGR_S0601_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0601_1 = gql`
    input I_S0601_1 {
        INVOICE_NO: String
    }

    type T_S0601_CODE {
        DELIVERY_TYPE: [BASE_QRY_KCD_CODE!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        CURR_CD: [BASE_QRY_KCD_CODE!]!
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
        PAYMENT_TYPE: [BASE_QRY_KCD_CODE!]!
        TRADE_TYPE: [BASE_QRY_KCD_CODE!]!
        TRADE_TYPE2: [BASE_QRY_KCD_CODE!]!
        INVOICE_NO: [BASE_QRY_KSV_INVOICE_MST!]!
        EXT_INVOICE: [BASE_QRY_KSV_INVOICE_MST!]!
        LICENSE_NO: [BASE_QRY_KSV_INVOICE_MST!]!
    }

    input I_S0601_1_1 {
        KIND: String
        PO_CD: String
        ORDER_CD: String
    }

    type T_S0601_1_1 {
        COL1: String
        COL2: String
        COL3: String
    }

    type Query {
        mgrQueryS0601_CODE(data: I_S0601_1!): T_S0601_CODE!
    }
`;

export default moduleTypedefs_S0601_1;
