// MGR_S0405_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0405_1 = gql`
    type T_S0405_1 {
        PO_CD: String
        ORDER_CD: String
        STYLE_NAME: String
        BUYER_NAME: String
        DUE_DATE: String
        TOT_CNT: Int
        COL1: Int
        ORDER_STATUS: String
    }

    input I_S0405_1 {
        PO_CD: String
        BUYER_CD: String
        STYLE_CD: String
    }

    type T_S0405_CODE {
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        PO_CD: [BASE_QRY_KSV_PO_MST!]!
    }

    type Query {
        mgrQueryS0405_1(data: I_S0405_1!): [T_S0405_1!]!
        mgrQueryS0405_CODE(data: I_S0405_1!): T_S0405_CODE!
    }
`;

export default moduleTypedefs_S0405_1;
