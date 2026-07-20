// MGR_S043101_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S043101_2 = gql`
    type T_S043101_2 {
        PU_STATUS: String
        PU_CD: String
        BUYER_CD: String
        PO_CD: String
        VENDOR_CD: String
        VENDOR_NAME: String
        MATL_TYPE: String
        S_PO_QTY: Float
        S_IN_QTY: Float
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
        DEPOSIT_AMT: Float
        PAY_TYPE: String
        PAY_DATE: String
        GW: String
    }

    input I_S043101_2 {
        BUYER_CD: String
    }

    type Query {
        mgrQueryS043101_2(data: I_S043101_2!): [T_S043101_2!]!
    }
`;

export default moduleTypedefs_S043101_2;
