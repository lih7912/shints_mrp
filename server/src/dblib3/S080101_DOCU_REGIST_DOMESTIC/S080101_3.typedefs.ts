// MGR_S080101_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S080101_3 = gql`
    type T_S080101_3 {
        INVOICE_NO: String
        ORDER_CD: String
        PROD_CD: String
        COLOR: String
        PRICE: Float
        TOT_CNT: Int
        SHIP_CNT: Int
        ORDER_SIZE_CNT: String
        SHIP_SIZE_CNT: String
        SIZE_GROUP: String
        SIZE_MEMBER: String
    }

    type T_S080101_3_TAX_MST {
        TAX_CD: String
        NAT_CD: String
        BUYER_CD: String
        CURR_CD: String
        PAY_AMT: String
        USD_AMT: String
        KRW_AMT: String
        VAT_AMT: String
        TOT_AMT: String
        RATEBASE: String
        BILL_DATE: String
        BILL_USER: String
        REG_USER: String
        REG_DATETIME: String
        DOCU_NO: String
        BUYER_EMAIL: String
    }

    type T_S080101_3_TAX_MEM {
        TAX_CD: String
        INVOICE_NO: String
        ORDER_CD: String
        NAT_CD: String
        CURR_CD: String
        TOT_QTY: String
        PAY_QTY: String
        PAY_PRICE: String
        PAY_AMT: String
        USD_AMT: String
        KRW_AMT: String
        VAT_AMT: String
        TOT_AMT: String
        RATEBASE: String
        BILL_DATE: String
        BILL_USER: String
        REG_USER: String
        REG_DATETIME: String
        DUE_DATE: String
        BAL_QTY: String
        PO_CD: String
        STYLE_NAME: String
    }

    type T_S080101_3_TAX {
        TAX_MST: [T_S080101_3_TAX_MST!]!
        TAX_MEM: [T_S080101_3_TAX_MEM!]!
    }

    input I_S080101_3_TAX {
        TAX_CD: String
    }

    input I_S080101_3 {
        INVOICE_NO: String
        BUYER_CD: String
        SHIP_DATE: String
        NAT_CD: String
        SHIP_MODE: String
    }

    type Query {
        mgrQueryS080101_3(data: I_S080101_3_TAX!): T_S080101_3_TAX!
        mgrQueryS080101_3_bak(data: I_S080101_3!): [T_S080101_3!]!
    }
`;

export default moduleTypedefs_S080101_3;
