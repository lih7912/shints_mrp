// MGR_S0437_3_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0437_3_3 = gql`
    type T_S0437_3_3 {
        STATUS: String
        SHIP_DATE: String
        ETD: String
        SHIP_MODE: String
        SHIP_MODE_N: String
        CI_FILE: String
        BL_FILE: String
        STSOUT_CD: String
        SHIPMENT_CD: String
        INVOICE_NO: String
        ORIGIN_PORT: String
        DESTINATION: String
        OUT_DATE: String
        IN_CURR_CD: String
        S_AMT: String
        PAYMENT_TYPE: String
        LICENSE_NO: String
        LICENSE_DATE: String
        DOCU_NO: String
        BL_NO: String
        PAYMENT_TYPE_N: String
    }

    input I_S0437_3_3 {
        KEY1: String
    }

    type Query {
        mgrQueryS0437_3_3(data: I_S0437_3_1!): [T_S0437_3_3!]!
    }
`;

export default moduleTypedefs_S0437_3_3;
