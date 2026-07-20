// MGR_S0607_3_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0607_3_1 = gql`
    type T_S0607_3_1 {
        REG_USER: String
        PU_STATUS: String
        PU_CD: String
        BUYER_CD: String
        PO_CD: String
        VENDOR_CD: String
        VENDOR_NAME: String
        MATL_TYPE: String
        NORMI: String
        MRP_DATE: String
        ORDER_DATE: String
        PAY_TERM: String
        CONTRACT_DELIVERY_DATE: String
        EXP_DELIVERY_DATE: String
        TARGET_ETA: String
        ETA: String
        PI_NO: String
        PI_FILE: String
        STSIN_STATUS: String
        STSOUT_STATUS: String
        SHIPMENT_STATUS: String
        ORIGIN_PORT: String
        SHIP_MODE: String
        CURR_CD: String
        PU_AMT: String
        DEPOSIT_AMT: String
        PAY_TYPE: String
        PAY_DATE: String
        GW: String
    }

    input I_S0607_3_1 {
        PO_CD: String
        BUYER_CD: String
    }

    type Query {
        mgrQueryS0607_3_1(data: I_S0607_3_1!): [T_S0607_3_1!]!
    }
`;

export default moduleTypedefs_S0607_3_1;
