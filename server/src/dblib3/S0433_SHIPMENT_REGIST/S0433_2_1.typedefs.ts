// MGR_S0433_2_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0433_2_1 = gql`
    type T_S0433_2_1 {
        REG_USER: String
        BUYER_CD: String
        BUYER_NAME: String
        PO_CD2: String
        VENDOR_CD: String
        VENDOR_NAME: String
        TRADE_TERM: String
        ORIGIN_PORT: String
        EXP_DELIVERY_DATE: String
        TARGET_ETA: String
        CT_QTY: String
        WEIGHT: String
        CBM: String
        PU_CD: String
        STSOUT_CD: String
        INVOICE_NO: String
        READY_DATE: String
        DESTINATION: String
        SHIP_MODE: String
        SHIP_MODE_N: String
        ORG_ORIGIN_PORT: String
        ORG_DESTINATION: String
        SENDOR: String
        REMARK: String
    }

    input I_S0433_2_1 {
        S_READY_DATE: String
        E_READY_DATE: String
        ORIGIN_PORT: String
        DESTINATION: String
        SHIP_MODE: String
        PO_CD: String
        SUPPLIER: String
        IS_SINGAPORE: String
    }

    type Query {
        mgrQueryS0433_2_1(data: I_S0433_2_1!): [T_S0433_2_1!]!
        mgrQueryS0433_2_1_260413 (data: I_S0433_2_1!): [T_S0433_2_1!]!
    }
`;

export default moduleTypedefs_S0433_2_1;
