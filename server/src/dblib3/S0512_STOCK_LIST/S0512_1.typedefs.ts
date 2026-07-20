// MGR_S0512_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0512_1 = gql`
    input I_S0512_1 {
        PO_CD: String
        FACTORY_CD: String
    }

    type T_S0512_CODE {
        MATL_TYPE2: [BASE_QRY_KCD_MATL_TYPE2!]!
        FACTORY_WARE: [BASE_QRY_KCD_FACTORY_WARE!]!
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
        PO_CD: [BASE_QRY_KSV_PO_MST!]!
        STOCK_STATUS_S: [BASE_QRY_KCD_CODE!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        REASON_REMARK: [BASE_QRY_KCD_CODE!]!
    }

    input I_S0512_1_1 {
        KIND: String
        PO_CD: String
        ORDER_CD: String
    }

    type T_S0512_1_1 {
        COL1: String
        COL2: String
        COL3: String
    }

    type Query {
        mgrQueryS0512_CODE(data: I_S0512_1!): T_S0512_CODE!
        mgrQueryS0512_1(data: I_S0512_1_1!): [T_S0512_1_1!]!
    }
`;

export default moduleTypedefs_S0512_1;
