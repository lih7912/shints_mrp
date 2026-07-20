// MGR_S040202_3_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S040202_3_1 = gql`
    type T_S040202_3_1 {
        VENDOR_NAME: String
        END_DATE: String
        COL1: String
        EMAIL: String
        COL2: String
        COL3: String
        VENDOR_CD: String
        VENDOR_TYPE: String
        COL4: String
    }

    input I_S040202_3_1 {
        PO_CD: String
        PO_SEQ: String
        BUYER_CD: String
    }

    type T_S040202_PO_SEQ {
        PO_CD: String
        PO_SEQ: String
        BUYER_CD: String
    }

    type T_S040202_PLAN {
        PLAN_FLAG: String
        PLAN_ETD: String
        PLAN_ETA: String
    }

    type T_S040202_MD_LIST {
        MD: String
        EMAIL: String
    }

    type T_S040202_CODE {
        PLACE_CD: [BASE_QRY_KCD_PLACE!]!
        PO_SEQ: [T_S040202_PO_SEQ!]!
    }

    type T_S040202_CODE2 {
        MD_LIST: [T_S040202_MD_LIST!]!
        PLAN: [BASE_QRY_KSV_PO_MST!]!
    }

    type Query {
        mgrQueryS040202_3_1(data: I_S040202_3_1!): [T_S040202_3_1!]!
        mgrQueryS040202_CODE(data: I_S040202_3_1!): T_S040202_CODE!
        mgrQueryS040202_CODE2(data: I_S040202_3_1!): T_S040202_CODE2!
    }
`;

export default moduleTypedefs_S040202_3_1;
