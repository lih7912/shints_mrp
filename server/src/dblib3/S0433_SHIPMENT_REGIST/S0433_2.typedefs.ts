// MGR_S0433_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0433_2 = gql`
    type T_S0433_2 {
        PU_STATUS: String
        PU_CD: String
        BUYER_CD: String
        PO_CD: String
        VENDOR_CD: String
        VENDOR_NAME: String
        MATL_TYPE: String
        S_PO_QTY: String
        S_IN_QTY: String
        NORMI: String
        ORDER_DATE: String
        PAY_TERM: String
        EXP_DELIVERY_DATE: String
        CONTRACT_DELIVERY_DATE: String
        TARGET_ETA: String
        PI_NO: String
        PI_FILE: String
        STSIN_STATUS: String
        STSOUT_STATUS: String
        SHIPMENT_STATUS: String
        ORIGIN_POART: String
        SHIP_MODE: String
        CURR_CD: String
        DEPOSIT_AMT: String
        PAY_TYPE: String
        PAY_DATE: String
        GW: String
    }

    input I_S0433_2 {
        BUYER_CD: String
    }

    type Query {
        mgrQueryS0433_2(data: I_S0433_2!): [T_S0433_2!]!
    }
`;

export default moduleTypedefs_S0433_2;
