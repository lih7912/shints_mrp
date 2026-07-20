// MGR_S0419_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0419_1 = gql`
    input I_S0419_1 {
        VENDOR_CD: String
        BUYER_CD: String
        BANK_CD: String
    }

    type T_S0419_PUR_FACTORY {
        WARE_CD: String
        WARE_NAME: String
    }

    type T_S0419_CODE {
        TAX_KIND: [BASE_QRY_KCD_CODE!]!
        VENDOR_CD: [BASE_QRY_KCD_VENDOR!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        BANK_CD: [BASE_QRY_KCD_BANK!]!
        VENDOR_TYPE: [BASE_QRY_KCD_CODE!]!
        PUR_FACTORY: [T_S0419_PUR_FACTORY!]!
    }

    input I_S0419_1_1 {
        KIND: String
        PO_CD: String
        ORDER_CD: String
    }

    type T_S0419_1_1 {
        COL1: String
        COL2: String
        COL3: String
    }

    type Query {
        mgrQueryS0419_CODE(data: I_S0419_1!): T_S0419_CODE!
        mgrQueryS0419_1(data: I_S0419_1_1!): [T_S0419_1_1!]!
    }
`;

export default moduleTypedefs_S0419_1;
