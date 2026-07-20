// MGR_S0414_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0414_1 = gql`
    input I_S0414_1 {
        INVOICE_NO: String
        PACK_CD: String
    }

    type T_S0414_CODE {
        PAYMENT_TYPE: [BASE_QRY_KCD_CODE!]!
        TRADE_TYPE: [BASE_QRY_KCD_CODE!]!
        DELIVERY_TYPE: [BASE_QRY_KCD_CODE!]!
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
    }

    type Query {
        mgrQueryS0414_CODE(data: I_S0414_1!): T_S0414_CODE!
    }
`;

export default moduleTypedefs_S0414_1;
