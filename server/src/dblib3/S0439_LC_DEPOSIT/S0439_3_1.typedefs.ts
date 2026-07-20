// MGR_S0439_3_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0439_3_1 = gql`
    type T_S0439_3_1 {
        PAY_DATE: String
        TYPE: String
        REG_USER: String
        PU_CD: String
        VENDOR_NAME: String
        CURR_CD: String
        PAY_AMOUNT: String
        DEPOSIT_AMT: String
        DEPOSIT_RATE: String
        LC_FLAG: String
        LC_RATE: String
        LC_AMT: String
        DEPOSIT_GW_STATUS: String
        DEPOSIT_GW_KEY: String
        IN_DATETIME: String
        SHIP_MODE: String
        SHIP_DATE: String
        EXPIRY_DATE: String
        LATEST_SHIP_DATE: String
        REQUEST_PAY_DATE: String
        NEOE_NO: String
        PAY_REPORT: String
    }

    input I_S0439_3_1 {
        S_PAY_DATE: String
        E_PAY_DATE: String
        S_IN_DATE: String
        E_IN_DATE: String
        TYPE: String
        PURCHASER: String
        PU_CD: String
        VENDOR_CD: String
        GW_STATUS: String
    }

    type Query {
        mgrQueryS0439_3_1(data: I_S0439_3_1!): [T_S0439_3_1!]!
        mgrQueryS0439_3_1_1223(data: I_S0439_3_1!): [T_S0439_3_1!]!
    }
`;

export default moduleTypedefs_S0439_3_1;
