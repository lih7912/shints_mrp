// MGR_S0432_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0432_5 = gql`
    input I_S0432_5 {
        SHIP_MODE: String
        PLACE_CD: String
        BL_FILE: String
        ORIGIN_PORT: String
        BL_NO: String
        PL_FILE: String
        ETA: String
        CONTAINER_NO: String
        CI_FILE: String
        DESTINATION: String
        SINGAPORE_COMBINE: String
        COST: Float
        SHIPMENT_CD: String
        REG_USER: String
        SHIP_LINE: String
    }

    input I_S0432_5_1 {
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
        CT_QTY: Int
        WEIGHT: Float
        CBM: Float
        PU_CD: String
        STSOUT_CD: String
        INVOICE_NO: String
        READY_DATE: String
        DESTINATION: String
    }

    input I_S0432_5_2 {
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

    type Ret_S0432_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0432_5(
            datas: I_S0432_5!
            datas1: [I_S0432_5_1!]!
        ): [Ret_S0432_5!]!
        mgrDelete_S0432_5(datas: I_S0432_5!): [Ret_S0432_5!]!
        mgrUpdate_S0432_5(datas: I_S0432_5!): [Ret_S0432_5!]!
        mgrUpdate_S0432_5_1(datas: I_S0432_5_1!): [Ret_S0432_5!]!
    }
`;

export default moduleTypedefs_S0432_5;
