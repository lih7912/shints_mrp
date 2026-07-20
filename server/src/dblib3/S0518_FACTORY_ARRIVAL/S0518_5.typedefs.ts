// MGR_S0518_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0518_5 = gql`
    input I_S0518_5_0 {
        CUSTOMER_NO: String
        CUSTOMER_FILE: String
        ARRIVAL_DATE: String
        CUSTOMS_NO: String
    }

    input I_S0518_5 {
        ATA: String
        A_ETA: String
        F_ETA: String
        ORIGIN_NATION: String
        CLEARANCE_NO: String
        DELIVERY: String
        FACIN_CNT: String
        SHIPMENT_CD: String
        STATUS_CD: String
        SHIP_STATUS_N: String
        REG_DATETIME: String
        SHIP_MODE: String
        SHIP_MODE_N: String
        ORG_ORIGIN_PORT: String
        ORG_DESTINATION: String
        DESTINATION: String
        IS_SINGAPORE: String
        BL_NO: String
        ETA: String
        ETD: String
        SHIPPING_COST: String
        IMPORT_COST: String
        SHIP_LINE: String
        PLACE_CD: String
        FIX_FLAG: String
        TRACKING_ID: String
        SHIPGO_STATUS: String
        SHIPGO_ETA: String
        SHIPGO_ETC1: String
        SHIPGO_ETC2: String
        SHIPGO_ETC3: String
        SHIPGO_ETC4: String
        SHIPGO_ETC5: String
        UPD_DATETIME: String
        REMARK: String
        INVOICE_NO: String
        REMARK2: String
        S_WEIGHT: String
        S_CBM: String
        S_CT_QTY: String
        FILE_NAME: String
        FILE_URL: String
        BL_FILE: String
        BL_FILE_URL: String
        PL_FILE: String
        PL_FILE_URL: String
        CI_FILE: String
        CI_FILE_URL: String
    }

    input I_S0518_5_2 {
        PU_CD: String
        STSOUT_CD: String
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
        VENDOR_CD: String
        BUYER_CD: String
        PO_CD: String
        PO_SEQ: String
        MATL_CD: String
        ORDER_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        OUT_QTY: String
        STSOUT_WEIGHT: String
        ERR_QTY: String
        SHIP_QTY: String
        DOCU_NO: String
        STSIN_CD: String
        STSIN_PRICE: String
        BL_NO: String
        HS_CODE: String
        COMPOSITION: String
        CUSTOMS_CODE: String
        CUSTOMS_UNIT: String
        VENDOR_NAME: String
    }

    input I_S0518_5_FACIN {
        PO_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        S_OUT_QTY: String
        SHORTAGE_QTY: String
        DEFECT_QTY: String
        FACIN_QTY: String
        LOCATION: String
        STSOUT_CD: String
        FILE_NAME: String
        FILE_URL: String
        FILE_OBJECT: String
        IN_DATE: String
        FACIN_DATE: String
        PACK_CD: String
        CUSTOMS_NO: String
        CT_QTY:String
        WEIGHT:String
        CBM:String
        PU_CD: String
    }


    type Ret_S0518_5 {
        CODE: String
        id: Int
    }

    input I_S0518_5_FILE_ADD {
        FILE_KEY: String
        TITLE: String
        NAME: String
        URL: String
        OBJECT_NAME: String
    }

    type Mutation {
        mgrUpdate_S0518_5_CUSTOMER_NO(
            datas: I_S0518_5_0!
            datas1: [I_S0518_5!]!
        ): [Ret_S0518_5!]!
        mgrUpdate_S0518_5_ARRIVAL(
            datas: I_S0518_5_0!
            datas1: [I_S0518_5!]!
            datas2: [I_S0518_5_FACIN!]!
        ): [Ret_S0518_5!]!
        mgrUpdate_S0518_5_FIXED(
            datas: I_S0518_5_0!
            datas1: [I_S0518_5!]!
        ): [Ret_S0518_5!]!
        mgrInsert_S0518_5_FILE_ADD(
            datas: I_S0518_5_FILE_ADD!
            datas1: [I_S0518_5!]!
        ): [Ret_S0518_5!]!
        mgrUpdate_S0518_5_UPDATE_ERROR_QTY(
            datas: [I_S0518_5_2!]!
        ): [Ret_S0518_5!]!
        mgrUpdate_S0518_5_INSERT_DOCU(datas: I_S0518_5!): [Ret_S0518_5!]!
    }
`;

export default moduleTypedefs_S0518_5;
