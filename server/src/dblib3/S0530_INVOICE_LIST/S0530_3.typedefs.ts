// MGR_S0530_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0530_3 = gql`
    type T_S0530_3 {
        INVOICE_NO: String
        ORDER_CD: String
        PROD_CD: String
        COLOR: String
        PRICE: String
        TOT_CNT: String
        SHIP_CNT: String
        ORDER_SIZE_CNT: String
        SHIP_SIZE_CNT: String
        SIZE_GROUP: String
        SIZE_MEMBER: String
    }

    input I_S0530_3 {
        INVOICE_NO: String
        BUYER_CD: String
        SHIP_DATE: String
        NAT_CD: String
        SHIP_MODE: String
        ORDER_CD: String
    }

    type Query {
        mgrQueryS0530_3(data: I_S0530_3!): [T_S0530_3!]!
    }
`;

export default moduleTypedefs_S0530_3;
