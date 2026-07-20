// MGR_S0507_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0507_1 = gql`
    input I_S0507_1 {
        PO_CD: String
    }

    type T_S0507_CODE {
        OUT_DATE: [BASE_QRY_KSV_STOCK_FACOUT!]!
        VENDOR_CD: [BASE_QRY_KCD_VENDOR!]!
        MATL_UNIT: [BASE_QRY_KCD_CODE!]!
        ORDER_CD: [BASE_QRY_KSV_ORDER_MST!]!
    }

    input I_S0507_1_1 {
        KIND: String
        PO_CD: String
        ORDER_CD: String
    }

    type T_S0507_1_1 {
        COL1: String
        COL2: String
        COL3: String
    }

    type Query {
        mgrQueryS0507_CODE(data: I_S0507_1!): T_S0507_CODE!
        mgrQueryS0507_1(data: I_S0507_1_1!): [T_S0507_1_1!]!
    }
`;

export default moduleTypedefs_S0507_1;
