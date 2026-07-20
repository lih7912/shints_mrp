// MGR_S0604_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0604_1 = gql`
    input I_S0604_1 {
        INVOICE_NO: String
    }

    type T_S0604_CODE {
        DELIVERY_TYPE: [BASE_QRY_KCD_CODE!]!
        NAT_CD: [BASE_QRY_KCD_NATION!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        CURR_CD: [BASE_QRY_KCD_CODE!]!
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
        PAYMENT_TYPE: [BASE_QRY_KCD_CODE!]!
        TRADE_TYPE: [BASE_QRY_KCD_CODE!]!
        TRADE_TYPE2: [BASE_QRY_KCD_CODE!]!
    }

    input I_S0604_1_1 {
        INVOICE_NO: String
    }

    type T_S0604_1_1 {
        COL1: String
        COL2: String
        COL3: String
    }

    type Query {
        mgrQueryS0604_CODE(data: I_S0604_1!): T_S0604_CODE!
    }
`;

export default moduleTypedefs_S0604_1;
