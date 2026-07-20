// MGR_S080101_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S080101_2 = gql`
    type T_S080101_2 {
        INVOICE_NO: String
        BUYER_CD: String
        SHIP_DATE: String
        INVOICE_DATE: String
        NAT_CD: String
        BUYER_NAT_CD: String
        SHIP_PTYPE: String
        DELIVERY_TYPE: String
        SHIP_QTY: String
        ORDER_QTY: String
        BUYER_NAME: String
        BL_FILE: String
        PL_FILE: String
        DEBIT_FILE: String
        SHIP_MODE_N: String
        DELIVERY_TYPE_N: String
        SHIP_AMOUNT: String
        COST_CONFIRM_USER: String
        LICENSE_NO: String
        LICENSE_DATE: String
        IMPORT_FREIGHT_AMT: String
        IMPORT_CLEARANCE_AMT: String
        IMPORT_DUTY_AMT: String
        REMARK: String
        STATUS_NAME: String
        ORDER_CD: String
        STYLE_NAME: String
        PO_CD: String
        SHIP_PRICE: String
        CURR_CD: String
        KRW_SHIP_AMOUNT: String
        KRW_TAX_AMOUNT: String
        KRW_TOT_AMOUNT: String
        KRW_SHIP_PRICE: String
        BAL_QTY: String
        RATEBASE: String
        DUE_DATE: String
        INVOICE_CURR_CD: String
        INVOICE_SHIP_AMOUNT: String
        SALES_PRICE: String
        BUYER_EMAIL: String
        PRODUCT_TYPE: String
    }

    input I_S080101_2 {
        S_SHIP_DATE: String
        E_SHIP_DATE: String
        BUYER_CD: String
        INVOICE_NO: String
        PO_CD: String
        ORDER_CD: String
    }

    type Query {
        mgrQueryS080101_2_0(data: I_S080101_2!): [T_S080101_2!]!
        mgrQueryS080101_2(data: I_S080101_2!): [T_S080101_2!]!
    }
`;

export default moduleTypedefs_S080101_2;
