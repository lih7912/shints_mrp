// MGR_S0702_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0702_1 = gql`
    input I_S0702_1 {
        USER_ID: String
        COM_CD: String
        BUYER_CD: String
        BANK_CD: String
        PO_CD: String
        ORDER_CD: String
    }

    input I_S0702_2 {
        BUYER_CD: String
    }

    type T_S0702_CODE1 {
        PO_CD: [BASE_QRY_KSV_PO_MST!]!
        ORDER_CD: [BASE_QRY_KSV_PO_MEM!]!
    }

    type T_S0702_CODE {
        FACTORY: [BASE_QRY_KCD_FACTORY!]!
        MESSER: [BASE_QRY_KVW_COMPANY!]!
        BUYER3: [BASE_QRY_KCD_BUYER!]!
        USER: [BASE_QRY_KCD_USER!]!
        DEBIT_STATUS: [BASE_QRY_KCD_CODE!]!
        DEBIT_TYPE: [BASE_QRY_KCD_CODE!]!
        CURR_CD: [BASE_QRY_KCD_CODE!]!
        PAY_TYPE: [BASE_QRY_KCD_CODE!]!
        CREDIT_END_TYPE: [BASE_QRY_KCD_CODE!]!
        AUTH: [BASE_QRY_KCD_USER!]!
        BANK: [BASE_QRY_KCD_BANK!]!
        PO_CD: [BASE_QRY_KSV_PO_MST!]!
        ORDER_CD: [BASE_QRY_KSV_ORDER_MST!]!
    }

    input I_S0702_1_1 {
        KIND: String
        PO_CD: String
        ORDER_CD: String
    }

    type T_S0702_1_1 {
        COL1: String
        COL2: String
        COL3: String
    }

    type Query {
        mgrQueryS0702_CODE(data: I_S0702_1!): T_S0702_CODE!
        mgrQueryS0702_CODE1(data: I_S0702_2!): T_S0702_CODE1!
        mgrQueryS0702_1(data: I_S0702_1_1!): [T_S0702_1_1!]!
    }
`;

export default moduleTypedefs_S0702_1;
