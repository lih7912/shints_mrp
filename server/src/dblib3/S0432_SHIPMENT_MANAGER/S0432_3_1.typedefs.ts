// MGR_S0432_3_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0432_3_1 = gql`
    type T_S0432_3_1 {
        id: Int
        SHIPMENT_CD: String
        STSOUT_CD: String
        PU_CD: String
        SHIP_MODE: String
        PLACE_CD: String
        ORIGIN_PORT: String
        BL_NO: String
        ETA: String
        CONTAINER_NO: String
        REG_USER: String
        REG_DATETIME: String
        STATUS_CD: String
    }

    input I_S0432_3_1 {
        BUYER_CD: String
    }

    type Query {
        mgrQueryS0432_3_1(data: I_S0432_3_1!): [T_S0432_3_1!]!
    }
`;

export default moduleTypedefs_S0432_3_1;
