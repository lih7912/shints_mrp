// MGR_S0604_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0604_2 = gql`
    type T_S0604_2_0 {
        DELIVERY_TYPE: String
        SHIP_DATE: String
        TOT_AMT: Float
        ORD_AMT: Float
        ADJ_AMT: Float
        BUYER_CD: String
        CURR_CD: String
        REMARK: String
        EXT_INVOICE: String
        CUSTOMS: Float
        VAT: Float
        FREIGHT: Float
        CLEARANCE: Float
    }

    type T_S0604_2_1 {
        BUYER_CD: String
        PO_CD: String
        ORDER_CD: String
        STYLE_NAME: String
        SHIP_QTY: Float
        SHIP_PRICE: Float
        SHIP_AMT: Float
        TOT_AMT: Float
        FACTORY_NAME: String
        INVOICE_NO: String
        SEQ: Int
        SHIP_DATE: String
        SHIP_PTYPE: String
        NAT_CD: String
        DELIVERY_TYPE: String
        IMPORT_ORG: Float
    }

    type T_S0604_2 {
        DATA1: [T_S0604_2_0!]!
        DATA2: [T_S0604_2_1!]!
    }

    input I_S0604_2 {
        INVOICE_NO: String
    }

    type Query {
        mgrQueryS0604_2(data: I_S0604_2!): T_S0604_2!
    }
`;

export default moduleTypedefs_S0604_2;
