// MGR_S0603_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0603_3 = gql`
    type T_S0603_3 {
        INVOICE_NO: String
        ORDER_CD: String
        STYLE_NAME: String
        SHIP_QTY: Float
        SHIP_PRICE: Float
        TOT_AMT: Float
        BUYER_CD: String
        PO_CD: String
    }

    input I_S0603_3 {
        INVOICE_NO: String
        SHIP_DATE: String
    }

    type Query {
        mgrQueryS0603_3(data: I_S0603_3!): [T_S0603_3!]!
    }
`;

export default moduleTypedefs_S0603_3;
