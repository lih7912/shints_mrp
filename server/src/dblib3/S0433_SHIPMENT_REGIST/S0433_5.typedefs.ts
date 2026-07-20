// MGR_S0433_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0433_5 = gql`
    input I_S0433_5 {
        SHIP_MODE: String
        PLACE_CD: String
        BL_FILE: String
        ORIGIN_PORT: String
        BL_NO: String
        PL_FILE: String
        ETD: String
        CONTAINER_NO: String
        CI_FILE: String
        DESTINATION: String
        IS_SINGAPORE: String
        COST: String
        SHIPMENT_CD: String
        REG_USER: String
        SHIP_LINE: String
        REMARK: String
        ETA_T: String
        ETA: String
        INVOICE_NO: String
    }

    input I_S0433_5_1 {
        REG_USER: String
        BUYER_CD: String
        BUYER_NAME: String
        PO_CD2: String
        VENDOR_CD: String
        VENDOR_NAME: String
        TRADE_TERM: String
        ORIGIN_PORT: String
        ORG_ORIGIN_PORT: String
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
        ORG_DESTINATION: String
        SHIP_MODE: String
        SHIP_MODE_N: String
        SENDOR: String
        REMARK: String
    }

    input I_S0433_5_2 {
        SHIPMENT_CD: String
        TRACKING_ID: String
        A_ETA: String
        F_ETA: String
        SHIP_STATUS: String
        LOADING_DATE: String
        DEPARTURE_DATE: String
        ARRIVAL_DATE: String
        DISCHARGE_DATE: String
        GATEOUT_DATE: String
    }

    type Ret_S0433_5 {
        CODE: String
        id: String
    }

    type Mutation {
        mgrInsert_S0433_5(
            datas: I_S0433_5!
            datas1: [I_S0433_5_1!]!
        ): [Ret_S0433_5!]!
        mgrInsert_S0433_5_ADD_SHIP(
            datas: I_S0433_5!
            datas1: [I_S0433_5_1!]!
        ): [Ret_S0433_5!]!
        mgrDelete_S0433_5(datas: I_S0433_5!): [Ret_S0433_5!]!
        mgrUpdate_S0433_5(datas: I_S0433_5!): [Ret_S0433_5!]!
        mgrUpdate_S0433_5_1(datas: I_S0433_5_1!): [Ret_S0433_5!]!
    }
`;

export default moduleTypedefs_S0433_5;
