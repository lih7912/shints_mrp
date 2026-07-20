// MGR_S043401_2_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S043401_2_1 = gql`
    type T_S043401_2_1 {
        REG_USER: String
        BUYER_CD: String
        BUYER_NAME: String
        PO_CD2: String
        VENDOR_CD: String
        VENDOR_NAME: String
        PERMIT: String
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
        MATL_PRICE: String
        OUT_QTY: String
    }

    type T_S043401_2_1_COMP {
        VENDOR_NAME: String
        MATL_TYPE: String
        MATL_CD: String
        MATL_NAME: String
        HS_NO: String
        HS_CD: String
        HS_NAME: String
        COMP1: String
        COMP1_PERCENT: String
        COMP2: String
        COMP2_PERCENT: String
        COMP3: String
        COMP3_PERCENT: String
        COMP4: String
        COMP4_PERCENT: String
    }

    type T_S043401_2_1_OFFER_SPEC {
        VENDOR_CD: String
        VENDOR_NAME: String
        MATL_NAME: String
        SPEC: String
        OFFER_SPEC: String
    }

    input I_S043401_2_1 {
        SHIPMENT_CD: String
        STATUS: String
        REMARK: String
    }

    type Query {
        mgrQueryS043401_2_1(data: I_S043401_2_1!): [T_S043401_2_1!]!
        mgrQueryS043401_2_1_COMP(data: I_S043401_2_1!): [T_S043401_2_1_COMP!]!
        mgrQueryS043401_2_1_OFFER_SPEC(
            data: I_S043401_2_1!
        ): [T_S043401_2_1_OFFER_SPEC!]!
    }
`;

export default moduleTypedefs_S043401_2_1;
