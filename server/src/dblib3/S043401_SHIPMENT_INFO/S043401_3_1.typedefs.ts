// MGR_S043401_3_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S043401_3_1 = gql`
    type T_S043401_3_1 {
        id: Int
        SHIPMENT_CD: String
        SHIP_MODE: String
        PLACE_CD: String
        ORIGIN_PORT: String
        BL_NO: String
        ETA: String
        ETD: String
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
        SHIPPING_COST_CURR: String
        IMPORT_COST: String
        DUTY_COST: String
        FIX_FLAG: String
        CLEARANCE_NO: String
        REMARK: String
        CBM: String
        STATUS_N: String
        INVOICE_NO: String
        DESTINATION_PORT: String
    }

    input I_S043401_3_1 {
        SHIPMENT_CD: String
        REMARK: String
    }

    type Query {
        mgrQueryS043401_3_1(data: I_S043401_3_1!): [T_S043401_3_1!]!
        mgrQueryS043401_3_1_bak(data: I_S043401_3_1!): [T_S043401_3_1!]!
    }
`;

export default moduleTypedefs_S043401_3_1;
