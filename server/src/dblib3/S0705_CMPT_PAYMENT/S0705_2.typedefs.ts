// MGR_S0705_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0705_2 = gql`
    type T_S0705_2 {
        STATUS_NAME: String
        INVOICE_NO: String
        SHIP_DATE: String
        DELIVERY_TYPE: String
        CI_NO: String
        FROM_PORT: String
        FROM_PORT_N: String
        TO_PORT: String
        ORD_AMT: String
        TOT_AMT: String
        TOT_AMT_WON: String
        DOCU_NO: String
        CURR_CD: String
        VAT_AMT: String
    }

    input I_S0705_2 {
        FACTORY_CD: String
        BUYER_CD: String
        STYLE_CD: String
        ORDER_CD: String
    }

    type Query {
        mgrQueryS0705_2(data: I_S0705_2!): [T_S0705_2!]!
    }
`;

export default moduleTypedefs_S0705_2;
