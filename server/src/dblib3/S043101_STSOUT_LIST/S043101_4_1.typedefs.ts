// MGR_S043101_4_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S043101_4_1 = gql`
    type T_S043101_4_1 {
        PU_CD: String
        PO_CD: String
        PO_SEQ: String
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: String
        MATL_SEQ: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        WEIGHT: String
        PO_QTY: String
        IN_QTY: String
        SHIP_QTY: String
        STSOUT_CD: String
        SHIPMENT_CD: String
        OUT_QTY: String
        OUT_QTY2: String
        HS_CD: String
        HS_NAME: String
        COMP1: String
        COMP1_P: String
        COMP2: String
        COMP2_P: String
        COMP3: String
        COMP3_P: String
        COMP4: String
        COMP4_P: String
        COMP: String
        V_COMP: String
        OFFER_SPEC: String
        BUYER_CD: String
        BUYER_NAME: String
        VENDOR_CD: String
        VENDOR_NAME: String
        CT_QTY: String
        CT_NO: String
        REMARK: String
        IN_DATETIME: String
    }

    input I_S043101_4_1 {
        PU_CD: String
        STSOUT_CD: String
        PO_CD: String
        VENDOR_CD: String
        PACK_CD: String
    }

    type Query {
        mgrQueryS043101_4_1(data: I_S043101_4_1!): [T_S043101_4_1!]!
        mgrQueryS043101_4_1_bak(data: I_S043101_4_1!): [T_S043101_4_1!]!
        mgrQueryS043101_4_1_bak2(data: I_S043101_4_1!): [T_S043101_4_1!]!
        mgrQueryS043101_4_1_1(data: I_S043101_4_1!): [T_S043101_4_1!]!
        mgrQueryS043101_4_1_EXCEL(data: I_S043101_3_1!): [Ret_S043101_5!]!
        mgrQueryS043101_4_1_EXCEL2(data: I_S043101_3_1!): [Ret_S043101_5!]!
        mgrQueryS043101_4_1_EXCEL2_260225(
            data: I_S043101_3_1!
        ): [Ret_S043101_5!]!
    }
`;

export default moduleTypedefs_S043101_4_1;
