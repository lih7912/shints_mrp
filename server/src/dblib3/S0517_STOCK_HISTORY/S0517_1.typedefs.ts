// MGR_S0517_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0517_1 = gql`
    input I_S0517_1 {
        VENDOR_CD: String
        PO_CD: String
    }

    type T_S0517_PO_CD {
        PO_CD: String
    }

    type T_S0517_ORDER_CD {
        ORDER_CD: String
    }

    type T_S0517_CODE {
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        PO_CD: [T_S0517_PO_CD!]!
        ORDER_CD: [T_S0517_ORDER_CD!]!
    }

    type Query {
        mgrQueryS0517_CODE(data: I_S0517_1!): T_S0517_CODE!
    }
`;

export default moduleTypedefs_S0517_1;
