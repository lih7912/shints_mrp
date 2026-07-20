// MGR_S0601_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0601_3 = gql`
    type T_S0601_3 {
        ORDER_CD: String
        BUYER_CD: String
        NAT_NAME: String
        INVOICE_NO: String
        PO_CD: String
        STYLE_NAME: String
        SHIP_PTYPE_N: String
        DELIVERY_TYPE_N: String
        SHIP_CNT: Int
        AVR_PRICE: Float
        FACTORY_NAME: String
        FACTORY_CD: String
        NAT_CD: String
        DELIVERY_TYPE: String
        SHIP_PTYPE: String
        SHIP_DATE: String
        ORDER_STATUS: String
    }

    input I_S0601_3 {
        INVOICE_NO: String
    }

    type Query {
        mgrQueryS0601_3(data: I_S0601_3!): [T_S0601_3!]!
    }
`;

export default moduleTypedefs_S0601_3;
