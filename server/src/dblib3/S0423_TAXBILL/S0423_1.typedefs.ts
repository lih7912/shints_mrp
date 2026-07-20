// MGR_S0423_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0423_1 = gql`
    input I_S0423_1 {
        INVOICE_NO: String
        PACK_CD: String
    }

    type T_S0423_CODE {
        TAX_KIND: [BASE_QRY_KCD_CODE!]!
        VENDOR_TYPE: [BASE_QRY_KCD_CODE!]!
        GW_STATUS: [BASE_QRY_KCD_CODE!]!
        VENDOR_CD: [BASE_QRY_KCD_VENDOR!]!
    }

    input I_S0423_1_1 {
        KIND: String
        PO_CD: String
        ORDER_CD: String
    }

    type T_S0423_1_1 {
        COL1: String
        COL2: String
        COL3: String
    }

    type Query {
        mgrQueryS0423_CODE(data: I_S0423_1!): T_S0423_CODE!
        mgrQueryS0423_1(data: I_S0423_1_1!): [T_S0423_1_1!]!
    }
`;

export default moduleTypedefs_S0423_1;
