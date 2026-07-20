// MGR_S0513_4.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0513_4 = gql`
    type T_S0513_4 {
        ORDER_CD: String
        PROD_CD: String
        COLOR: String
        PRICE: String
        TOT_CNT: String
        ORDER_SIZE_CNT: String
        SHIP_CNT: String
        BAL_CNT: String
        STYLE_NAME: String
        SHIP_SIZE_CNT: String
        SIZE_GROUP: String
        SIZE_MEMBER: String
        CURR_CD: String
    }

    input I_S0513_4 {
        ORDER_CD: String
        FACTORY_CD: String
        BUYER_CD: String
    }

    type Query {
        mgrQueryS0513_4_EXCEL_BY_INVOICE(data: I_S0513_2!): [Ret_S0513_5!]!
        mgrQueryS0513_4_EXCEL(data: I_S0513_2!): [Ret_S0513_5!]!
        mgrQueryS0513_4(data: I_S0513_4!): [T_S0513_4!]!
        mgrQueryS0513_4_bak(data: I_S0513_4!): [T_S0513_4!]!
        mgrQueryS0513_4_bak2(data: I_S0513_4!): [T_S0513_4!]!
        mgrQueryS0513_4_EXCEL_bak3(data: I_S0513_2!): [Ret_S0513_5!]!
        mgrQueryS0513_4_EXCEL_bak4(data: I_S0513_2!): [Ret_S0513_5!]!
    }
`;

export default moduleTypedefs_S0513_4;
