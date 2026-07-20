// MGR_S0601_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0601_5 = gql`
    input I_S0601_5_1 {
        INVOICE_NO: String
        INVOICE_TYPE: String
        SHIP_DATE: String
        DUE_DATE: String
        DELIVERY_TYPE: String
        CURR_CD: String
        MANAGE_AMT: Float
        ORD_AMT: Float
        ADD_AMT: Float
        TOT_AMT: Float
        BILL_AMT: Float
        NEGO_AMT: Float
        FROM: String
        REMARK: String
        BUYER_CD: String
        REMAIN_AMT: Float
        ETC_AMT: Float
        PAYMENT_TYPE: String
        TRADE_TYPE: String
        TRADE_TYPE2: String
        LICENSE_DATE: String
        LICENSE_NO: String
        USER_ID: String
        DEBIT_CD: String
        BL_NO: String
    }

    input I_S0601_5_2 {
        EXT_INVOICE: String
        INVOICE_TYPE: String
        VOS_AMT: Float
        VAT_AMT: Float
        VAT_DATE: String
    }

    input I_S0601_5_3 {
        DOCU_NO: String
        PROD_TYPE: String
        NEOE: String
    }

    input I_S0601_5_4 {
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

    type Ret_S0601_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0601_5(
            datas1: I_S0601_5_1!
            datas2: I_S0601_5_2!
            datas3: I_S0601_5_3!
            datas4: [I_S0601_5_4!]!
        ): [Ret_S0601_5!]!
        mgrUpdate_S0601_5(
            datas1: I_S0601_5_1!
            datas2: I_S0601_5_2!
            datas3: I_S0601_5_3!
            datas4: [I_S0601_5_4!]!
        ): [Ret_S0601_5!]!
        mgrDelete_S0601_5(
            datas1: I_S0601_5_1!
            datas2: I_S0601_5_2!
            datas3: I_S0601_5_3!
            datas4: [I_S0601_5_4!]!
        ): [Ret_S0601_5!]!
        mgrInsert_S0601_5_1(
            datas1: I_S0601_5_1!
            datas2: I_S0601_5_2!
            datas3: I_S0601_5_3!
            datas4: [I_S0601_5_4!]!
        ): [Ret_S0601_5!]!
    }
`;

export default moduleTypedefs_S0601_5;
