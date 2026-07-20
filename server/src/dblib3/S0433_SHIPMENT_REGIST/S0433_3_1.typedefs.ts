// MGR_S0433_3_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0433_3_1 = gql`
    type T_S0433_3_1 {
        id: String
        SHIPMENT_CD: String
        SHIP_MODE: String
        PLACE_CD: String
        ORIGIN_PORT: String
        BL_NO: String
        ETA: String
        CONTAINER_NO: String
        BL_FILE: String
        PL_FILE: String
        CI_FILE: String
        DESTINATION: String
        IS_SINGAPORE: String
        COST: String
        SHIP_LINE: String
        STATUS_CD: String
        SHIP_MODE_N: String
        ETD: String
        WEIGHT: String
        CBM: String
        REMARK: String
        REMARK2: String
        TARGET_ETA: String
        INVOICE_NO: String
    }

    input I_S0433_3_1 {
        BUYER_CD: String
        ORIGIN_PORT: String
        DESTINATION: String
        INVOICE_NO: String
    }

    type Query {
        mgrQueryS0433_3_1(data: I_S0433_3_1!): [T_S0433_3_1!]!
    }
`;

export default moduleTypedefs_S0433_3_1;
