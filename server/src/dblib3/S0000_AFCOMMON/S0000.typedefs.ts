// MGR_S0000.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0000 = gql`
    type T_S0000_BUYER {
        BUYER_CD: String
        BUYER_NAME: String
    }
    type T_S0000_VENDOR {
        VENDOR_CD: String
        VENDOR_NAME: String
    }
    type T_S0000_STYLE {
        STYLE_CD: String
        STYLE_NAME: String
    }

    input I_S0000_1 {
        SRCH_DATA: String
    }

    type Query {
        mgrQueryS0000_BUYER(data: I_S0000_1!): [T_S0000_BUYER!]!
        mgrQueryS0000_VENDOR(data: I_S0000_1!): [T_S0000_VENDOR!]!
        mgrQueryS0000_STYLE(data: I_S0000_1!): [T_S0000_STYLE!]!
    }
`;

export default moduleTypedefs_S0000;
