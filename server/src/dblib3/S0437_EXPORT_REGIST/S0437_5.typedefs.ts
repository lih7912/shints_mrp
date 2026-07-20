// MGR_S0437_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0437_5 = gql`
    input I_S0437_5 {
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

    input I_S0437_5_1 {
        PAYMENT_TYPE: String
        LICENSE_NO: String
        LICENSE_DATE: String
        REG_USER: String
    }

    type Ret_S0437_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0437_5(
            datas: [I_S0437_5!]!
            datas1: I_S0437_5_1!
        ): [Ret_S0437_5!]!
    }
`;

export default moduleTypedefs_S0437_5;
