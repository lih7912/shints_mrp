// MGR_S0413_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0413_5 = gql`
    input I_S0413_5 {
        INVOICE_NO: String
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

    input I_S0413_5_1 {
        PACK_CD: String
        PO_CD: String
        PO_AMT: Float
        DELIVERY_AMT: Float
        DELIVERY_WON: Float
    }

    type Ret_S0413_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0413_5(
            datas: I_S0413_5!
            datas1: [I_S0413_5_1!]!
        ): [Ret_S0413_5!]!
    }
`;

export default moduleTypedefs_S0413_5;
