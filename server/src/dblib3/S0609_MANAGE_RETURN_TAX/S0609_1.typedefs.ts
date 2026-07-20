// MGR_S0609_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0609_1 = gql`
    input I_S0609_1 {
        BUYER_CD: String
    }

    type T_S0609_CODE {
        VENDOR_CD: [BASE_QRY_KCD_VENDOR!]!
    }

    type Query {
        mgrQueryS0609_CODE(data: I_S0609_1!): T_S0609_CODE!
    }
`;

export default moduleTypedefs_S0609_1;
