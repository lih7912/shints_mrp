// MGR_S0801_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0801_3 = gql`
    type T_S0801_3 {
        SHIP_DATE: String
        INVOICE_NO: String
        BUYER_NAME: String
        PO_CD: String
        ORDER_CD: String
        STYLE_NAME: String
        SHIP_QTY: String
        PAY_QTY: String
        CURR_CD: String
        PRICE: String
        PAY_AMT: String
        KRW_SHIP_AMOUNT: String
        KRW_TAX_AMOUNT: String
        KRW_TOT_AMOUNT: String
    }

    input I_S0801_3 {
        TAX_CD: String
    }

    type Query {
        mgrQueryS0801_3(data: I_S0801_3!): [T_S0801_3!]!
    }
`;

export default moduleTypedefs_S0801_3;
