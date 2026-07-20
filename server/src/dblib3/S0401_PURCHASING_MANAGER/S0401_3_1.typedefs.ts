// MGR_S0401_3_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0401_3_1 = gql`
    type T_S0401_3_1 {
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
        EXPECT_DATE: String
        PAY_TERM: String
        CURR_CD: String
        VENDOR_CD: String
        FACTORY_CD: String
        TARGET_ETA: String
        ETA: String
        DEPOSIT_AMT: String
        LC_AMT: String
        DEBIT_AMT: String
        PAY_TYPE: String
        PAY_DATE: String
        PU_AMT: String
        SUM_STS_IN: String
        SUM_PAY: String
        SUM_STS_OUT: String
        SUM_FACIN: String
        BAL_STS_IN: String
        BAL_PAY: String
        BAL_STS_OUT: String
        BAL_FACIN: String
        MOQ_NOT_CONFIRM: String
        SURCHARGE_NOT_CONFIRM: String
        MESSAGE: String
        PI_FILE: String
    }

    input I_S0401_3_1 {
        PO_CD: String
        VENDOR_TYPE: String
        BUYER_CD: String
        VENDOR_CD: String
        USER_ID: String
        PU_CD: String
        PU_STATUS: String
        S_MRP_DATE: String
        E_MRP_DATE: String
        S_ORDER_DATE: String
        E_ORDER_DATE: String
        S_PAY_DATE: String
        E_PAY_DATE: String
        PAY_DATE: String
    }

    type Query {
        mgrQueryS0401_3_1(data: I_S0401_3_1!): [T_S0401_3_1!]!
    }
`;

export default moduleTypedefs_S0401_3_1;
