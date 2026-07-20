// MGR_S0435_3_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0435_3_1 = gql`
    type T_S0435_3_1 {
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
        IMPORT_COST: String
        DUTY_COST: String
        SHIPPING_COST_CURR: String
        IMPORT_COST_CURR: String
        SHIPPING_COST_PAID: String
        IMPORT_COST_PAID: String
        S_WEIGHT: String
        S_CBM: String
        REMARK: String
        INVOICE_NO: String
    }

    input I_S0435_3_1 {
        STATUS_CD: String
        SHIP_MODE: String
        ORIGIN_PORT: String
        DESTINATION: String
        S_ETA: String
        E_ETA: String
        PAYER: String
        BL_NO: String
        REMARK: String
        INVOICE_NO: String
    }

    type Query {
        mgrQueryS0435_3_1(data: I_S0435_3_1!): [T_S0435_3_1!]!
    }
`;

export default moduleTypedefs_S0435_3_1;
