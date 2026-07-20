// MGR_S0708_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0708_1 = gql`
    input I_S0708_1 {
        BUYER_CD: String
    }

    type T_S0708_CODE {
        CURR_CD: [BASE_QRY_KCD_CODE!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        INVOICE_CD: [BASE_QRY_KSV_INVOICE_MST!]!
        BANK_CD: [BASE_QRY_KCD_BANK!]!
        INVOICE_NEGO_TYPE: [BASE_QRY_KCD_CODE!]!
        END_TYPE: [BASE_QRY_KCD_CODE!]!
        PRE_TYPE: [BASE_QRY_KCD_CODE!]!
    }

    type Query {
        mgrQueryS0708_CODE(data: I_S0708_1!): T_S0708_CODE!
    }
`;

export default moduleTypedefs_S0708_1;
