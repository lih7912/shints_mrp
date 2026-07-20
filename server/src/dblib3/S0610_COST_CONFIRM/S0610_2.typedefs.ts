// MGR_S0610_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0610_2 = gql`
    type T_S0610_2 {
        id: Int
        BUYER_CD: String
        COST_DATE: String
        PO_CD: String
        SHIPMENT_CD: String
        INVOICE_NO: String
        TYPE: String
        TYPE2: String
        COST_CURR: String
        COST_AMT: String
        REG_USER: String
        CONFIRM_USER: String
        CONFIRM_DATE: String
        MATL_NAME: String
        MATL_CD: String
        BL_NO: String
        ETD: String
        SHIP_DATE: String
        VENDOR_NAME: String
        VENDOR_CD: String
        PU_CD: String
        SHIP_DATE1: String
        BL_NO1: String
        STSIN_CD: String
        DETAIL: String
    }

    input I_S0610_2 {
        S_DATE: String
        E_DATE: String
        S_ETD: String
        E_ETD: String
        TYPE: String
        COST_CURR: String
        BUYER_CD: String
        PO_CD: String
        DETAIL: String
        REG_USER: String
        BUYER_TEAM: String
    }

    type Query {
        mgrQueryS0610_2(data: I_S0610_2!): [T_S0610_2!]!
    }
`;

export default moduleTypedefs_S0610_2;
