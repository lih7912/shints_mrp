// MGR_S0436_3_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0436_3_1 = gql`
    type T_S0436_3_1 {
        SHIPMENT_CD: String
        STATUS_CD: String
        REG_DATETIME: String
        SHIP_MODE: String
        ORIGIN_PORT: String
        DESTINATION: String
        BL_NO: String
        ETA: String
        ETD: String
        SHIPPING_COST: String
        SHIPPING_COST_PAID: String
        IMPORT_COST: String
        IMPORT_COST_LOCAL: String
        IMPORT_COST_CURR_LOCAL: String
        IMPORT_COST_PAID_LOCAL: String
        DUTY_COST: String
        SHIPPING_COST_CURR: String
        IMPORT_COST_CURR: String
        IMPORT_COST_PAID: String
        CUSTOMS_NO: String
        S_WEIGHT: String
        S_CBM: String
    }

    input I_S0436_3_1 {
        STATUS_CD: String
        SHIP_MODE: String
        ORIGIN_PORT: String
        DESTINATION: String
        S_ETA: String
        E_ETA: String
        PAYER: String
        CUSTOMS_NO: String
        BL_NO: String
        REMARK: String
    }

    type Query {
        mgrQueryS0436_3_1(data: I_S0436_3_1!): [T_S0436_3_1!]!
    }
`;

export default moduleTypedefs_S0436_3_1;
