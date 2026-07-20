// MGR_S0430_LIST_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0430_LIST_1 = gql`
    type T_S0430_LIST_1 {
        PU_STATUS: String
        REG_USER: String
        BUYER_CD: String
        BUYER_NAME: String
        PU_CD: String
        PO_CD: String
        VENDOR_NAME: String
        VENDOR_TYPE: String
        OVERSHORT_RATE: String
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
        BILL_TO: String
        OVER_SHORT: String
        PU_AMT: String
        STS_IN_AMT: String
        STS_OUT_AMT: String
        FACIN_AMT: String
        MOQ_AMT: String
        SURCHARGE_AMT: String
        BAL_AMT: String
    }

    type T_S0430_LIST_1_0 {
        DATAS: [T_S0430_LIST_1!]!
        MESSAGE: String
    }

    input I_S0430_LIST_1 {
        PU_CD: String
    }

    type Query {
        mgrQueryS0430_LIST_1(data: [I_S0430_LIST_1!]!): T_S0430_LIST_1_0!
    }
`;

export default moduleTypedefs_S0430_LIST_1;
