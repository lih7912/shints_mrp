// MGR_S0513_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0513_5 = gql`
    input I_S0513_5 {
        COLOR: String
        IN_SHIP_QTY: String
        IN_SHIP_SIZE_CNT: String
        PRICE_CNT: String
        ORDER_CD: String
        PRICE: String
        PROD_CD: String
        PO_CD: String
    }

    input I_S0513_5_1 {
        INVOICE_NO: String
        SHIP_DATE: String
        EX_FACTORY_DATE: String
        DELIVERY_TYPE: String
        SHIP_MODE: String
        COUNTRY: String
        USER_ID: String
        BL_NO: String
        ATD: String
        PAYMENT_TYPE: String
        TOT_AMT: String
        ADJ_AMT: String
        SHIP_AMT: String
        IS_NON_GARMENT: String
        BUYER_CD: String
        FACTORY_CD: String
    }

    type Ret_S0513_5 {
        CODE: String
        id: Int
    }

    input I_S0513_FILE_INFO {
        KIND: String
        FILE_KEY: String
        TITLE: String
        NAME: String
        URL: String
        OBJECT_NAME: String
    }

    input I_S0513_5_REMOVE_ORDER {
        ORDER_CD: String
        PROD_CD: String
    }

    input I_S0513_5_CHECK_REMOVE_ORDER {
        ORDER_CD: String
    }

    type Mutation {
        mgrInsert_S0513_5(
            datas: [I_S0513_5!]!
            datas1: I_S0513_5_1!
        ): [Ret_S0513_5!]!
        mgrInsert_S0513_5_REMOVE_ORDER(
            datas: [I_S0513_5_REMOVE_ORDER!]!
            datas1: I_S0513_5_1!
        ): [Ret_S0513_5!]!
        mgrInsert_S0513_5_CHECK_REMOVE_ORDER(
            datas: I_S0513_5_CHECK_REMOVE_ORDER!
        ): [Ret_S0513_5!]!
        mgrDelete_S0513_5(
            datas: [I_S0513_5!]!
            datas1: I_S0513_5_1!
        ): [Ret_S0513_5!]!
        mgrInsert_S0513_FILE_ADD(datas: I_S0513_FILE_INFO!): [Ret_S0513_5!]!
    }
`;

export default moduleTypedefs_S0513_5;
