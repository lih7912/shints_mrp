// MGR_S051201_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S051201_1 = gql`
    input I_S051201_1 {
        ROOT_IDX: String
    }

    type T_S051201_CODE {
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        PO_CD: [BASE_QRY_KSV_PO_MST!]!
        ORDER_CD: [BASE_QRY_KSV_ORDER_MST!]!
    }

    input I_S051201_1_1 {
        KIND: String
        PO_CD: String
        ORDER_CD: String
    }

    type T_S051201_1_1 {
        COL1: String
        COL2: String
        COL3: String
    }

    type Query {
        mgrQueryS051201_CODE(data: I_S051201_1!): T_S051201_CODE!
        mgrQueryS051201_1(data: I_S051201_1_1!): [T_S051201_1_1!]!
    }
`;

export default moduleTypedefs_S051201_1;
