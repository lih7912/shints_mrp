// MGR_S0513_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0513_2 = gql`
    type T_S0513_2 {
        REC_COUNT: String
        INVOICE_NO: String
        ORDER_CD: String
        BUYER_CD: String
        SHIP_DATE: String
        NAT_CD: String
        NAT_NAME: String
        SHIP_PTYPE: String
        DELIVERY_TYPE: String
        SHIP_QTY: String
        ORDER_QTY: String
        BUYER_NAME: String
        BL_FILE: String
        BL_FILE_URL: String
        PL_FILE: String
        PL_FILE_URL: String
        CI_FILE: String
        CI_FILE_URL: String
        OTHER_FILE: String
        OTHER_FILE_URL: String
        BL_FILE2: String
        BL_FILE_URL2: String
        PL_FILE2: String
        PL_FILE_URL2: String
        CI_FILE2: String
        CI_FILE_URL2: String
        OTHER_FILE2: String
        OTHER_FILE_URL2: String
        SHIP_MODE_N: String
        DELIVERY_TYPE_N: String
        SHIP_AMOUNT: String
        ADJ_AMT: String
        ORD_AMT: String
        TOT_AMT: String
        DOCU_NO: String
        COMPLETE: String
        EXFACTORY: String
        BL_NO: String
        ATD: String
        PAYMENT_TYPE: String
        PAYMENT_NAME: String
        BILL_AMT: String
        OA_NEGO: String
        IS_NON_GARMENT: String
        FACTORY_CD: String
    }

    input I_S0513_2 {
        FACTORY_CD: String
        BUYER_CD: String
        STYLE_CD: String
        ORDER_CD: String
        INVOICE_NO: String
        S_SHIP_DATE: String
        E_SHIP_DATE: String
        S_ATD: String
        E_ATD: String
        SHIP_MODE: String
        PAYMENT_TYPE: String
        DELIVERY_TYPE: String
        NAT_CD: String
        EMAIL_SEND: String
        BL_NO: String
    }

    type T_S0513_2_NEW {
        DATAS: [T_S0513_2!]!
        COUNT: String
    }

    input I_S0513_2_2 {
        INVOICE_NO: String
    }

    type T_S0513_2_2 {
        BUYER_CD: String
        PO_CD: String
        ORDER_CD: String
        STYLE_NAME: String
        SHIP_QTY: String
        FOB: String
        SALES_PRICE: String
        SHIP_PRICE: String
        TOT_AMT: String
        FACTORY_NAME: String
        INVOICE_NO: String
        SEQ: String
        SHIP_DATE: String
        NAT_CD: String
        COUNTRY: String
        CURR_CD: String
    }

    type Query {
        mgrQueryS0513_2(data: I_S0513_2!): [T_S0513_2!]!
        mgrQueryS0513_2_2(data: I_S0513_2_2!): [T_S0513_2_2!]!
        mgrQueryS0513_2_bak(data: I_S0513_2!): [T_S0513_2!]!
        mgrQueryS0513_2_bak2(data: I_S0513_2!): [T_S0513_2!]!
        mgrQueryS0513_2_bak3(data: I_S0513_2!): [T_S0513_2!]!
    }
`;

export default moduleTypedefs_S0513_2;
