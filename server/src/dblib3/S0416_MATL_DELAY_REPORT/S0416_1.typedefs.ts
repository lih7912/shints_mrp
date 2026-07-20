// MGR_S0416_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0416_1 = gql`
    input I_S0416_1 {
        INVOICE_NO: String
        PACK_CD: String
    }

    type T_S0416_CODE {
        DELAY_REASON: [BASE_QRY_KCD_CODE!]!
        DELIVERY2: [BASE_QRY_KCD_CODE!]!
        FARE_TYPE: [BASE_QRY_KCD_CODE!]!
        MATL_TYPE: [BASE_QRY_KCD_CODE!]!
        VENDOR_TYPE: [BASE_QRY_KCD_CODE!]!
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        VENDOR_CD: [BASE_QRY_KCD_VENDOR!]!
        PO_CD: [BASE_QRY_KSV_PO_MST!]!
    }

    type Query {
        mgrQueryS0416_CODE(data: I_S0416_1!): T_S0416_CODE!
    }
`;

export default moduleTypedefs_S0416_1;
