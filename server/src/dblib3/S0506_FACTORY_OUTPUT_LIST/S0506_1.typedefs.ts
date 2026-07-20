// MGR_S0506_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0506_1 = gql`
    input I_S0506_1 {
        KEY1: String
    }

    type T_S0506_CODE {
        VENDOR_TYPE: [BASE_QRY_KCD_CODE!]!
        VENDOR_CD: [BASE_QRY_KCD_VENDOR!]!
    }

    input I_S0506_1_1 {
        KIND: String
        PO_CD: String
        ORDER_CD: String
    }

    type T_S0506_1_1 {
        COL1: String
        COL2: String
        COL3: String
    }

    type Query {
        mgrQueryS0506_CODE(data: I_S0506_1!): T_S0506_CODE!
        mgrQueryS0506_1(data: I_S0506_1_1!): [T_S0506_1_1!]!
    }
`;

export default moduleTypedefs_S0506_1;
