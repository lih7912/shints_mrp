// MGR_S0703_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0703_1 = gql`
    input I_S0703_1 {
        USER_ID: String
        COM_CD: String
        BUYER_CD: String
        BANK_CD: String
        PO_CD: String
        ORDER_CD: String
    }

    input I_S0703_2 {
        BUYER_CD: String
    }

    type T_S0703_CODE1 {
        PO_CD: [BASE_QRY_KSV_PO_MST!]!
        ORDER_CD: [BASE_QRY_KSV_PO_MEM!]!
    }

    type T_S0703_CODE {
        BUYER3: [BASE_QRY_KCD_BUYER!]!
        USER: [BASE_QRY_KCD_USER!]!
        DEBIT_STATUS: [BASE_QRY_KCD_CODE!]!
        CURR_CD: [BASE_QRY_KCD_CODE!]!
        DEBIT_TYPE: [BASE_QRY_KCD_CODE!]!
    }

    input I_S0703_1_1 {
        KIND: String
        PO_CD: String
        ORDER_CD: String
    }

    type T_S0703_1_1 {
        COL1: String
        COL2: String
        COL3: String
    }

    type Query {
        mgrQueryS0703_CODE(data: I_S0703_1!): T_S0703_CODE!
        mgrQueryS0703_CODE1(data: I_S0703_2!): T_S0703_CODE1!
        mgrQueryS0703_1(data: I_S0703_1_1!): [T_S0703_1_1!]!
    }
`;

export default moduleTypedefs_S0703_1;
