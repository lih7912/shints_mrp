// MGR_S0601_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0601_2 = gql`
    type T_S0601_2_DATA2 {
        BUYER_CD: String
        PO_CD: String
        ORDER_CD: String
        STYLE_NAME: String
        SHIP_QTY: Float
        ORD_PRICE: Float
        SALES_PRICE: Float
        SHIP_PRICE: Float
        DIFF_PRICE: Float
        TOT_AMT: Float
        COL1: String
        FACTORY_NAME: String
        INVOICE_NO: String
        SEQ: Int
        EXFACTORY: String
        SHIP_DATE: String
        SHIP_PTYPE: String
        NAT_CD: String
        DELIVERY_TYPE: String
    }

    input I_S0601_2 {
        INVOICE_NO: String
    }

    type T_S0601_0_DATA1 {
        INVOICE_NO: String
        DELIVERY_TYPE: String
        SHIP_DATE: String
        TOT_AMT: Float
        ORD_AMT: Float
        ADJ_AMT: Float
        BUYER_CD: String
        CURR_CD: String
        REMARK: String
        EXT_INVOICE: String
        DOCU_NO: String
        FACTORY_CD: String
        PAYMENT_TYPE: String
        TRADE_TYPE: String
        DUE_DATE: String
        TRANSFER_DATE: String
        MANAGE_AMT: Float
        ETC_AMT: Float
        LICENSE_DATE: String
        LICENSE_NO: String
        TRADE_TYPE2: String
        VOS_AMT: Float
        VAT_AMT: Float
        VAT_DATE: String
        BILL_AMT: Float
        BILL_TYPE: String
        CRDB_CD: String
        NEOE_BUYER_CD: String
        NEOE_A23: String
        BL_NO: String
    }

    input I_S0601_0 {
        KEY1: String
    }

    type T_S0601_2 {
        DATA1: [T_S0601_0_DATA1!]!
        DATA2: [T_S0601_2_DATA2!]!
    }

    type Query {
        mgrQueryS0601_2(data: I_S0601_2!): T_S0601_2!
    }
`;

export default moduleTypedefs_S0601_2;
