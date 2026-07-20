// MGR_S043401_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S043401_5 = gql`
    input I_S043401_5 {
        SHIPMENT_CD: String
        SHIP_MODE: String
        PLACE_CD: String
        ORIGIN_PORT: String
        BL_NO: String
        ETD: String
        ETA: String
        CONTAINER_NO: String
        REG_USER: String
        REG_DATETIME: String
        UPD_DATETIME: String
        STATUS_CD: String
        BL_FILE: String
        BL_FILE_URL: String
        PL_FILE: String
        PL_FILE_URL: String
        CI_FILE: String
        CI_FILE_URL: String
        DESTINATION: String
        IS_SINGAPORE: String
        TRACKING_ID: String
        SHIP_LINE: String
        A_ETA: String
        F_ETA: String
        SHIP_STATUS: String
        LOADING_DATE: String
        DEPARTURE_DATE: String
        ARRIVAL_DATE: String
        DISCHARGE_DATE: String
        GATEOUT_DATE: String
        SHIPPING_COST: String
        IMPORT_COST: String
        DUTY_COST: String
        FIX_FLAG: String
        CLEARANCE_NO: String
        REMARK: String
        CBM: String
        STATUS_N: String
        COST: String
        SHIPPING_COST_CURR: String
        INVOICE_NO: String
        DESTINATION_PORT: String
    }

    input I_S043401_5_ITEM {
        BUYER_CD: String
        WEIGHT: String
    }

    type Ret_S043401_5 {
        CODE: String
        id: Int
    }

    input I_S043401_FILE_INFO {
        FILE_KEY: String
        TITLE: String
        NAME: String
        URL: String
        OBJECT_NAME: String
    }

    input I_S043401_5_ITEM {
        STSOUT_CD: String
    }

    input I_S043401_5_HSCODE {
        HS_NO: String
        HS_CD: String
        HS_NAME: String
    }

    input I_S043401_5_HSCODE1 {
        MATL_CD: String
        MATL_NAME: String
    }

    input I_S043401_5_COMP {
        COMP1: String
        COMP1_PERCENT: String
        COMP2: String
        COMP2_PERCENT: String
        COMP3: String
        COMP3_PERCENT: String
        COMP4: String
        COMP4_PERCENT: String
    }

    input I_S043401_5_COMP1 {
        MATL_CD: String
        MATL_NAME: String
    }

    input I_S043401_5_OFFER_SPEC {
        OFFER_SPEC: String
    }

    input I_S043401_5_OFFER_SPEC1 {
        VENDOR_CD: String
        MATL_NAME: String
        SPEC: String
    }

    type Mutation {
        mgrUpdate_S043401_5(
            datas: I_S043401_5!
            datas1: [I_S043401_5_ITEM!]!
        ): [Ret_S043401_5!]!
        mgrUpdate_S043401_5_REMOVE_ITEM(
            datas: I_S043401_5!
            datas1: [I_S043401_5_ITEM!]!
        ): [Ret_S043401_5!]!
        mgrUpdate_S043401_5_FIX(datas: I_S043401_5!): [Ret_S043401_5!]!
        mgrUpdate_S043401_5_TRACKING_ID(datas: I_S043401_5!): [Ret_S043401_5!]!
        mgrDelete_S043401_5(datas: I_S043401_5!): [Ret_S043401_5!]!
        mgrInsert_S043401_FILE_ADD(
            datas: I_S043401_FILE_INFO!
        ): [Ret_S043401_5!]!
        mgrDelete_S043401_FILE_DELETE(
            datas: I_S043401_FILE_INFO!
        ): [Ret_S043401_5!]!
        mgrUpdate_S043401_5_HSCODE(
            datas: I_S043401_5_HSCODE!
            datas1: [I_S043401_5_HSCODE1!]!
        ): [Ret_S043401_5!]!
        mgrUpdate_S043401_5_COMP(
            datas: I_S043401_5_COMP!
            datas1: [I_S043401_5_COMP1!]!
        ): [Ret_S043401_5!]!
        mgrUpdate_S043401_5_OFFER_SPEC(
            datas: I_S043401_5_OFFER_SPEC!
            datas1: [I_S043401_5_OFFER_SPEC1!]!
        ): [Ret_S043401_5!]!
    }
`;

export default moduleTypedefs_S043401_5;
