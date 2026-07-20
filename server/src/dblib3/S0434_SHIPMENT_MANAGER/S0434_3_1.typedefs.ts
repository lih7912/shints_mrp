// MGR_S0434_3_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0434_3_1 = gql`
    type T_S0434_3_1 {
        SHIPMENT_CD: String
        STATUS_CD: String
        STATUS_N: String
        ETD: String
        SHIP_MODE: String
        SHIP_LINE: String
        PLACE_CD: String
        SHIP_MODE_N: String
        ORG_ORIGIN_PORT: String
        ORG_DESTINATION: String
        DESTINATION: String
        IS_SINGAPORE: String
        BL_NO: String
        ETA: String
        SHIPPING_COST: String
        SHIPPING_COST_CURR: String
        IMPORT_COST: String
        S_WEIGHT: String
        S_CBM: String
        SHIPGO_STATUS: String
        SHIPGO_ETA: String
        SHIPGO_ETC1: String
        SHIPGO_ETC2: String
        SHIPGO_ETC3: String
        SHIPGO_ETC4: String
        SHIPGO_ETC5: String
        UPD_DATETIME: String
        TRACKING_ID: String
        FIX_FLAG: String
        BL_FILE: String
        REMARK: String
        INVOICE_NO: String
        TRADLINX_STATUS: String
        TRADLINX_POL_NAME: String
        TRADLINX_ETD: String
        TRADLINX_ATD: String
        TRADLINX_POD_NAME: String
        TRADLINX_ETA: String
        TRADLINX_ATA: String
        TRADLINX_UPDATE_DATETIME: String
    }

    input I_S0434_3_1 {
        STATUS_CD: String
        SHIP_MODE: String
        ORIGIN_PORT: String
        DESTINATION: String
        S_ETA: String
        E_ETA: String
        S_ETD: String
        E_ETD: String
        REMARK: String
        INVOICE_NO: String
        SHIPMENT_CD: String
        BL_NO: String
        SHIPPING_COST_CURR: String
    }

    type T_S0434_3_2 {
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
    }

    input I_S0434_3_2 {
        SHIPMENT_CD: String
    }

    type Query {
        mgrQueryS0434_3_1(data: I_S0434_3_1!): [T_S0434_3_1!]!
        mgrQueryS0434_3_1_bak(data: I_S0434_3_1!): [T_S0434_3_1!]!
        mgrQueryS0434_3_1_bak1(data: I_S0434_3_1!): [T_S0434_3_1!]!
        mgrQueryS0434_3_1_0926(data: I_S0434_3_1!): [T_S0434_3_1!]!
        mgrQueryS0434_3_1_1023(data: I_S0434_3_1!): [T_S0434_3_1!]!
        mgrQueryS0434_3_2(data: I_S0434_3_2!): [T_S0434_3_2!]!
    }
`;

export default moduleTypedefs_S0434_3_1;
