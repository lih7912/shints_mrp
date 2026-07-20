// MGR_S0414_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0414_2 = gql`
    type T_S0414_2 {
        INVOICE_NO: String
        OUT_DATE: String
        PACK_CD: String
        PO_AMT: Float
        DELIVERY_TYPE_N: String
        DELIVERY_WON: Float
        WON_AMT: Float
        DELIVERY_AMT: Float
        FACTORY_NAME: String
        LICENSE_NO: String
        LICENSE_DATE: String
        REG_DATETIME: String
    }

    type T_S0414_2_1 {
        INVOICE_NO: String
        PO_CD: String
        PO_AMT: Float
        DELIVERY_AMT: Float
    }

    input I_S0414_2 {
        S_OUT_DATE: String
        E_OUT_DATE: String
        DELIVERY_TYPE: String
        FACTORY_CD: String
        PAYMENT_TYPE: String
        TRADE_TYPE: String
    }

    input I_S0414_2_1 {
        INVOICE_NO: String
    }

    type Query {
        mgrQueryS0414_2(data: I_S0414_2!): [T_S0414_2!]!
        mgrQueryS0414_2_1(data: I_S0414_2_1!): [T_S0414_2_1!]!
    }
`;

export default moduleTypedefs_S0414_2;
