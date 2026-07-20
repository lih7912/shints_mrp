// MGR_S0705_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0705_1 = gql`
    input I_S0705_1 {
        BUYER_CD: String
    }

    type T_S0705_CODE {
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        INVOICE_TYPE: [BASE_QRY_KCD_CODE!]!
    }

    input I_S0705_1_1 {
        KIND: String
        PO_CD: String
        ORDER_CD: String
    }

    type T_S0705_1_1 {
        COL1: String
        COL2: String
        COL3: String
    }

    type Query {
        mgrQueryS0705_CODE(data: I_S0705_1!): T_S0705_CODE!
        mgrQueryS0705_1(data: I_S0705_1_1!): [T_S0705_1_1!]!
    }
`;

export default moduleTypedefs_S0705_1;
