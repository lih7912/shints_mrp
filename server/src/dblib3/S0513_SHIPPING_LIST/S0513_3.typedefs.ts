// MGR_S0513_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0513_3 = gql`
    type T_S0513_3 {
        INVOICE_NO: String
        ORDER_CD: String
        PROD_CD: String
        COLOR: String
        PRICE: String
        TOT_CNT: String
        PROD_CNT: String
        SHIP_CNT: String
        ORDER_SIZE_CNT: String
        SHIP_SIZE_CNT: String
        PRICE_CNT: String
        TOT_SHIP_SIZE_CNT: String
        SIZE_GROUP: String
        SIZE_MEMBER: String
        CURR_CD: String
        SHIP_PRICE: String
        SHIP_PRICE2: String
        SHIP_AMOUNT: String
        STYLE_NAME: String
        ORDER_STATUS: String
    }

    input I_S0513_3 {
        INVOICE_NO: String
        BUYER_CD: String
        SHIP_DATE: String
        NAT_CD: String
        SHIP_MODE: String
        PAYMENT_TYPE: String
        ORDER_CD: String
    }

    input I_S0513_3_1 {
        ORDER_CD: String
        PROD_CD: String
    }

    type Query {
        mgrQueryS0513_3(data: I_S0513_3!): [T_S0513_3!]!
        mgrQueryS0513_3_1(data: [I_S0513_3_1!]!): [T_S0513_3!]!
        mgrQueryS0513_3_bak(data: I_S0513_3!): [T_S0513_3!]!
    }
`;

export default moduleTypedefs_S0513_3;
