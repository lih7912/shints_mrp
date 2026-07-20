// MGR_S0709_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0709_1 = gql`
    input I_S0709_1 {
        BUYER_CD: String
        BANK_CD: String
    }

    type T_S0709_CODE {
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        BANK_CD: [BASE_QRY_KCD_BANK!]!
        BILL_TYPE: [BASE_QRY_KCD_CODE!]!
    }

    type Query {
        mgrQueryS0709_CODE(data: I_S0709_1!): T_S0709_CODE!
    }
`;

export default moduleTypedefs_S0709_1;
