// MGR_S0430_3_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0430_3_1 = gql`
    type T_S0430_3_1 {
        PU_STATUS: String
        REG_USER: String
        BUYER_CD: String
        BUYER_NAME: String
        PU_CD: String
        PO_CD: String
        VENDOR_NAME: String
        VENDOR_TYPE: String
        VENDOR_TYPE_N: String
        MATL_TYPE: String
        NORMI: String
        MRP_DATE: String
        ORDER_DATE: String
        DUE_DATE: String
        EX_FACTORY: String
        PAY_TERM: String
        CURR_CD: String
        VENDOR_CD: String
        TARGET_ETA: String
        ETA: String
        DEPOSIT_AMT: String
        LC_AMT: String
        PAY_CONDITION: String
        PAY_DATE: String
        OVER_SHORT: String
        PU_AMT: String
        SUM_STS_IN: String
        SUM_STS_OUT: String
        SUM_FACIN: String
        MOQ_AMT: String
        SURCHARGE_AMT: String
        BAL_AMT: String
    }

    input I_S0430_3_1 {
        PU_CD: String
    }

    type Query {
        mgrQueryS0430_3_1(data: I_S0430_3_1!): [T_S0430_3_1!]!
    }
`;

export default moduleTypedefs_S0430_3_1;
