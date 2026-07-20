// MGR_S0431_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0431_5 = gql`
    input I_S0431_5 {
        BUYER_CD: String
        VENDOR_CD: String
        MATL_TYPE: String
        PO_CD: String
        S_PO_QTY: String
        FACTORY_CD: String
        MATL_DUE_DATE: String
        PROD_DUE_DATE: String
        PLAN_FLAG: String
        PLAN_ETD: String
        PLAN_ETA: String
    }

    input I_S0431_5_1 {
        INVOICE_NO: String
        PAY_TERM: String
        CT_QTY: String
        CT_NO: String
        REMARK: String
        PU_CD: String
        READY_DATE: String
        ORIGIN_PORT: String
        WEIGHT: String
        GROSS_WEIGHT: String
        BUYER_NAME: String
        TARGET_ETA: String
        DESTINATION: String
        CBM: String
        VENDOR_NAME: String
        STSIN_CD: String
        PACK_CD: String
        SENDER: String
        RECEIVER: String
        SHIP_MODE: String
    }

    input I_S0431_5_2 {
        BUYER_CD: String
        BUYER_NAME: String
        VENDOR_CD: String
        VENDOR_NAME: String
        PU_CD: String
        STSIN_CD: String
        IN_DATE: String
        MATL_CD: String
        PO_CD: String
        PO_SEQ: String
        MATL_SEQ: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        FACTORY_CD: String
        SHIP_QTY: String
        OUT_QTY: String
        BAL_QTY: String
        WEIGHT: String
        MOQ_QTY: String
        SURCHARGE_AMT: String
        LEADER_CONFIRM: String
        MOQ_CONFIRM: String
        SURCHARGE_CONFIRM: String
        BILL_TO: String
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
    }

    input I_S0431_5_3 {
        PU_CD: String
    }

    type Ret_S0431_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0431_5_1(
            datas: [I_S0431_5_1!]!
            datas1: [I_S0431_5_2!]!
        ): [Ret_S0431_5!]!
        mgrDelete_S0431_5(datas: I_S0431_5_3!): [Ret_S0431_5!]!
    }
`;

export default moduleTypedefs_S0431_5;
