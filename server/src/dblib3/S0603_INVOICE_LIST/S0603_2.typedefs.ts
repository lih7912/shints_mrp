// MGR_S0603_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0603_2 = gql`
    type T_S0603_2 {
        INVOICE_NO: String
        EXT_INVOICE: String
        SHIP_DATE: String
        DUE_DATE: String
        TRANSFER_DATE: String
        CURR_CD: String
        TOT_AMT: Float
        ADJ_AMT: Float
        IN_AMT: Int
        OA_NEGO: Int
        REST_AMT: Int
        REMARK: String
        DELIVERY_TYPE_N: String
        BUYER_CD: String
        BUYER_NAME: String
        DOCU_NO: String
        NEOE_BUYER_CD: String
    }

    input I_S0603_2 {
        S_SHIP_DATE: String
        E_SHIP_DATE: String
        BUYER_CD: String
        FROM: String
        NAT_CD: String
        PAYMENT_TYPE: String
        TRADE_TYPE: String
        DELIVERY_TYPE: String
    }

    type Query {
        mgrQueryS0603_2(data: I_S0603_2!): [T_S0603_2!]!
    }
`;

export default moduleTypedefs_S0603_2;
