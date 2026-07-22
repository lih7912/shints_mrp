// MGR_S0801_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0801_5 = gql`
    input I_S0801_5 {
        STATUS_NAME: String
        TAX_CD: String
        REG_DATE: String
        BILL_DATE: String
        BILL_USER: String
        BUYER_CD: String
        NEOE_CD_N: String
        NEOE_CD: String
        NEOE_BUYER_CD: String
        NEOE_BUYER_CD_MOM: String
        KRW_PAY_AMOUNT: String
        KRW_TAX_AMOUNT: String
        KRW_TOT_AMOUNT: String
        DOCU_NO: String
        ACC_USER: String
        ACC_USER_NAME: String
        ORDER_USER_NAME: String
        ORDER_USER_ID: String
        BUYER_EMAIL: String
        PAY_DUE_DATE: String
        BUYER_PAY_DUE_DATE: String
    }

    input I_S0801_5_1 {
        SHIP_DATE: String
        INVOICE_NO: String
        BUYER_NAME: String
        PO_CD: String
        ORDER_CD: String
        STYLE_NAME: String
        SHIP_QTY: String
        PAY_QTY: String
        CURR_CD: String
        PRICE: String
        PAY_AMT: String
        KRW_SHIP_AMOUNT: String
        KRW_TAX_AMOUNT: String
        KRW_TOT_AMOUNT: String
    }

    input I_S0801_5_DELETE_TAXBILL {
        TAX_CD: String
    }

    type Ret_S0801_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0801_5(
            datas: [I_S0801_5!]!
            datas1: [I_S0801_5_1!]!
        ): [Ret_S0801_5!]!
        mgrInsert_S0801_5_INSERT_DOCU(
            datas: [I_S0801_5!]!
            datas1: [I_S0801_5_1!]!
        ): [Ret_S0801_5!]!
        mgrInsert_S0801_5_DELETE_DOCU(
            datas: [I_S0801_5!]!
            datas1: [I_S0801_5_1!]!
        ): [Ret_S0801_5!]!
        mgrInsert_S0801_5_DELETE_TAXBILL(
            datas: [I_S0801_5_DELETE_TAXBILL!]!
        ): [Ret_S0801_5!]!
        mgrInsert_S0801_5_PROC_FOC(
            datas: [I_S0801_5!]!
            datas1: [I_S0801_5_1!]!
        ): [Ret_S0801_5!]!
    }
`;

export default moduleTypedefs_S0801_5;
