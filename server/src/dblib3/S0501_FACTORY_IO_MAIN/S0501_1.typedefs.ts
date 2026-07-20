// MGR_S0501_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0501_1 = gql`
    input I_S0501_1 {
        KEY1: String
    }

    type T_S0501_CODE {
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
        PO_CD: [BASE_QRY_KSV_PO_MST!]!
        VENDOR_CD: [BASE_QRY_KCD_VENDOR!]!
        MATL_UNIT: [BASE_QRY_KCD_CODE!]!
        ETC: [BASE_QRY_KCD_CODE!]!
    }

    input I_S0501_1_1 {
        KIND: String
        PO_CD: String
        ORDER_CD: String
    }

    type T_S0501_1_1 {
        COL1: String
        COL2: String
        COL3: String
    }

    type Query {
        mgrQueryS0501_CODE(data: I_S0501_1!): T_S0501_CODE!
        mgrQueryS0501_1(data: I_S0501_1_1!): [T_S0501_1_1!]!
    }
`;

export default moduleTypedefs_S0501_1;
