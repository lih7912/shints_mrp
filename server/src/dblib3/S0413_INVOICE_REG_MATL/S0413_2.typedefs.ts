// MGR_S0413_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0413_2 = gql`
    type T_S0413_2 {
        PACK_CD: String
        OUT_DATE: String
        DELIVERY_AMT: Float
        DELIVERY_WON: Float
        CURR_DATE: String
        USD_RATE: Float
        DOCU_NO: String
        PAYMENT_TYPE: String
        TRADE_TYPE: String
        CURR_CD: String
        TRADE_KIND: String
        LICENSE_NO: String
        LICENSE_DATE: String
    }

    input I_S0413_2 {
        INVOICE_NO: String
    }

    input I_S0413_2_1 {
        INVOICE_NO: String
        PACK_CD: String
    }

    type T_S0413_2_1 {
        DELIVERY_TYPE_N: String
        FACTORY_NAME: String
        DELIVERY_TYPE: String
        OUT_FACTORY_CD: String
    }

    type Query {
        mgrQueryS0413_2(data: I_S0413_2!): [T_S0413_2!]!
        mgrQueryS0413_2_1(data: I_S0413_2_1!): [T_S0413_2_1!]!
    }
`;

export default moduleTypedefs_S0413_2;
