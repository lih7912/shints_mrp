// MGR_S043101_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S043101_5 = gql`
    input I_S043101_5_3 {
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
        CBM: String
        WEIGHT: String
        GROSS_WEIGHT: String
        VENDOR_CD: String
        VENDOR_NAME: String
        BUYER_CD: String
        BUYER_NAME: String
        PO_CD: String
        CT_NO: String
    }

    input I_S043101_5_3_1 {
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
        DESTINATION_PORT: String
    }

    type Ret_S043101_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrDelete_S043101_5(
            datas: [I_S043101_5_3!]!
            datas1: [I_S043101_5_3_1!]!
            datas2: String!
        ): [Ret_S043101_5!]!
        mgrUpdate_S043101_5(datas: I_S043101_5_3!): [Ret_S043101_5!]!
    }
`;

export default moduleTypedefs_S043101_5;
