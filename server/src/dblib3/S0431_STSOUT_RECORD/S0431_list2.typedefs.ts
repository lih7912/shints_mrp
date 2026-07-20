// MGR_S0431_4_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0431_4_1 = gql`
    type T_S0431_4_1 {
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
        PO_QTY: String
        STSIN_QTY: String
        BEF_STSOUT_QTY: String
        SHIP_QTY: String
        IN_DATETIME: String
        BAL_QTY: String
        OUT_QTY: String
    }

    input I_S0431_4_1 {
        PO_CD: String
        BUYER_CD: String
        VENDOR_CD: String
        MATL_TYPE: String
    }

    type T_S0431_4_2_0 {
        PU_CD: String
        VENDOR_CD: String
        BUYER_CD: String
        FACTORY_CD: String
        PU_DATE: String
        REG_USER: String
        REG_DATETIME: String
        PU_STATUS: String
        MATL_TYPE: String
        BILL_TO: String
        SHIP_TO: String
        CURR_CD: String
        DEPOSIT_AMT: String
        DEPOSIT_FIX: String
        NORMI: String
        TRADE_TERM: String
        ORDER_DATE: String
        DELIVERY_DATE: String
        FORWARD: String
        PI_NO: String
        PI_FILE: String
        SHIP_MODE: String
        PO_CD2: String
        TARGET_ETA: String
        PU_TYPE: String
    }

    type T_S0431_4_2 {
        PU_MST: [T_S0431_4_2_0!]!
        STOCK_MEM: [T_S0431_4_1!]!
    }

    input I_S0431_4_2 {
        PU_CD: String
    }

    input I_S0431_LIST_2 {
        PU_CD: String
    }

    type T_S0431_LIST_2_SUB {
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

    type T_S0431_LIST_2 {
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
        DATAS: [T_S0431_LIST_2_SUB!]!
    }

    type Query {
        mgrQueryS0431_4_1(data: I_S0431_4_1!): [T_S0431_4_1!]!
        mgrQueryS0431_LIST_2(data: [I_S0431_LIST_2!]!): [T_S0431_LIST_2!]!
        mgrQueryS0431_4_2_1(data: I_S0431_4_2!): [T_S0431_4_1!]!
        mgrQueryS0431_LIST_2_bak(data: I_S0431_LIST_2!): [T_S0431_LIST_2!]!
    }
`;

export default moduleTypedefs_S0431_4_1;
