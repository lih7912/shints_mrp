// MGR_S080101_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S080101_5 = gql`
    input I_S080101_5 {
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
        SALES_PRICE: String
        CURR_CD: String
        KRW_SHIP_AMOUNT: String
        KRW_TAX_AMOUNT: String
        KRW_TOT_AMOUNT: String
        KRW_SHIP_PRICE: String
        BAL_QTY: String
        SELL_QTY: String
        DUE_DATE: String
        RATEBASE: String
        INVOICE_CURR_CD: String
        INVOICE_SHIP_AMOUNT: String
        PRODUCT_TYPE: String
        BUYER_EMAIL: String
        DEBIT: String
        CREDIT: String
        DEBIT_INFO: String
    }

    input I_S080101_5_1 {
        REG_DATE: String
        ORDER_USER_ID: String
        BILL_DATE: String
        TAX_CD: String
        PRODUCT_TYPE: String
        BUYER_EMAIL: String
    }

    type Ret_S080101_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S080101_5(
            datas: [I_S080101_5!]!
            datas1: I_S080101_5_1!
        ): [Ret_S080101_5!]!
    }
`;

export default moduleTypedefs_S080101_5;
