// MGR_S030504.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030504 = gql`
    type T_S030504 {
        ORDER_CD: String
        STYLE_NAME: String
        BUYER_NAME: String
        TOT_CNT: String
        DUE_DATE: String
        FACTORY_NAME: String
        CONS_F: String
        CONS_A: String
        FACTORY_CD: String
        ORDER_STATUS_N: String
        ORDER_STATUS: String
    }

    input I_S030504 {
        PO_CD: String
        PO_SEQ: String
    }

    type T_S030504_CODE {
        PO_SEQ: [BASE_QRY_KCD_CODE!]!
        SEQ_REASON: [BASE_QRY_KCD_CODE!]!
    }

    type Query {
        mgrQueryS030504(data: I_S030504!): [T_S030504!]!
        mgrQueryS030504_CODE(data: I_S030504!): T_S030504_CODE!
    }
`;

export default moduleTypedefs_S030504;
