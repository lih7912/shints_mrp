// MGR_S0530_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0530_2 = gql`
    type T_S0530_2 {
        INVOICE_NO: String
        BL_NO: String
        EXFACTORY: String
        ORDER_CD: String
        BUYER_CD: String
        SHIP_DATE: String
        NAT_CD: String
        SHIP_PTYPE: String
        DELIVERY_TYPE: String
        SHIP_QTY: String
        ORDER_QTY: String
        BUYER_NAME: String
        BL_FILE: String
        BL_FILE_URL: String
        PL_FILE: String
        PL_FILE_URL: String
        DEBIT_FILE: String
        SHIP_MODE_N: String
        DELIVERY_TYPE_N: String
        SHIP_AMOUNT: String
    }

    input I_S0530_2 {
        FACTORY_CD: String
        BUYER_CD: String
        STYLE_CD: String
        ORDER_CD: String
        INVOICE_NO: String
        S_DATE: String
        E_DATE: String
    }

    type Query {
        mgrQueryS0530_2(data: I_S0530_2!): [T_S0530_2!]!
        mgrQueryS0530_2_LIST0(data: I_S0530_2!): [T_S0530_2!]!
    }
`;

export default moduleTypedefs_S0530_2;
