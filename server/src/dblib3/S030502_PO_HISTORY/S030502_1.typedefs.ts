// MGR_S030502_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기

const moduleTypedefs_S030502_1 = gql`
    type T_S030502_1_SIZE_CNTS {
        SIZE_NAME: String
        SIZE_CNT: Int
    }

    type T_S030502_1 {
        ORDER_CD: String
        TOT_CNT: Int
        DUE_DATE: String
        STYLE_CD: String
        STYLE_NAME: String
        STYLE_MEMBER: String
        SIZE_CNTS: [T_S030502_1_SIZE_CNTS!]!
    }

    input I_S030502_1 {
        PO_CD: String
    }

    type T_S030502_1_CODE {
        PO_SEQ: [BASE_QRY_KCD_CODE!]!
        SEQ_REASON: [BASE_QRY_KCD_CODE!]!
    }

    type Query {
        mgrQueryS030502_1(data: I_S030502_1!): [T_S030502_1!]!
        mgrQueryS030502_1_CODE(data: I_S030502_1!): T_S030502_1_CODE!
    }
`;

export default moduleTypedefs_S030502_1;
