// MGR_S0205_4_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0205_4_1 = gql`
    type T_S0205_4_1 {
        REF_ORDER_NO: String
        PO_CD: String
        BUYER_NAME: String
        ORDER_CD: String
        STYLE_NAME: String
        STYLE_CD: String
        TOT_CNT: String
        UNIT: String
        PRICE_TERM: String
        AVR_PRICE: String
        AMT: String
        CURR_CD: String
        DUE_DATE: String
        ORDER_CD2: String
        NAT_NAME: String
    }

    input I_S0205_4_1 {
        PI_CD: String
        BUYER_CD: String
    }

    input I_S0205_4_2 {
        ORDER_CD: [String!]!
    }

    input I_S0205_4_3 {
        BUYER_CD: String!
        ORDER_CD: [String!]!
    }

    type T_S0205_4_RET {
        id: String
        CODE: String
    }

    type Query {
        mgrQueryS0205_4_1(data: I_S0205_4_1!): [T_S0205_4_1!]!
        mgrQueryS0205_4_2(data: I_S0205_4_2!): [T_S0205_4_1!]!
        mgrQueryS0205_4_3(data: I_S0205_4_3!): [T_S0205_4_1!]!
        mgrQueryS0205_EXCEL_PI_PRINT(data: I_S0205_4_1!): [T_S0205_4_RET!]!
    }
`;

export default moduleTypedefs_S0205_4_1;
