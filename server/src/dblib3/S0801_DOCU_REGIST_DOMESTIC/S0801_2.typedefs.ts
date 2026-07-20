// MGR_S0801_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0801_2 = gql`
    type T_S0801_2 {
        STATUS_NAME: String
        TAX_CD: String
        REG_DATE: String
        BILL_DATE: String
        PAY_DUE_DATE: String
        BILL_USER: String
        BUYER_CD: String
        NEOE_CD_N: String
        BUYER_PAY_DUE_DATE: String
        NEOE_CD: String
        NEOE_BUYER_CD: String
        NEOE_BUYER_CD_MOM: String
        KRW_PAY_AMOUNT: String
        KRW_TAX_AMOUNT: String
        KRW_TOT_AMOUNT: String
        DOCU_NO: String
        ACC_USER: String
        ACC_USER_NAME: String
        ORDER_USER_ID: String
        ORDER_USER_NAME: String
        BUYER_EMAIL: String
    }

    input I_S0801_2 {
        STATUS_CD: String
        ORDER_USER_ID: String
        BUYER_CD: String
        NEOE_CD: String
        S_BILL_DATE: String
        E_BILL_DATE: String
    }

    type Query {
        mgrQueryS0801_2(data: I_S0801_2!): [T_S0801_2!]!
    }
`;

export default moduleTypedefs_S0801_2;
