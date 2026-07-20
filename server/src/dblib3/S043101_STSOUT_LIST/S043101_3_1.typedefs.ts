// MGR_S043101_3_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S043101_3_1 = gql`
    type T_S043101_3_1 {
        PU_CD: String
        STSOUT_CD: String
        STSIN_CD: String
        PACK_CD: String
        INVOICE_NO: String
        TRADE_TERM: String
        READY_DATE: String
        ETA: String
        ORIGIN_PORT: String
        DESTINATION: String
        CT_QTY: String
        CT_NO: String
        CBM: String
        WEIGHT: String
        GROSS_WEIGHT: String
        VENDOR_CD: String
        VENDOR_NAME: String
        BUYER_CD: String
        BUYER_NAME: String
        PO_CD: String
    }

    input I_S043101_3_1 {
        BUYER_CD: String
        PO_CD: String
        VENDOR_CD: String
        PU_CD: String
        ORIGIN_PORT: String
        DESTINATION: String
        PACK_CD: String
        S_IN_DATE: String
        E_IN_DATE: String
    }

    type Query {
        mgrQueryS043101_3_1(data: I_S043101_3_1!): [T_S043101_3_1!]!
        mgrQueryS043101_3_1_bak(data: I_S043101_3_1!): [T_S043101_3_1!]!
        mgrQueryS043101_3_1_bak2(data: I_S043101_3_1!): [T_S043101_3_1!]!
        mgrQueryS043101_3_1_bak3(data: I_S043101_3_1!): [T_S043101_3_1!]!
        mgrQueryS043101_3_1_1(data: I_S043101_3_1!): [T_S043101_3_1!]!
    }
`;

export default moduleTypedefs_S043101_3_1;
