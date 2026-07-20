// MGR_S0708_LIST_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0708_LIST_2 = gql`
    type T_S0708_LIST_2 {
        INVOICE_NO: String
        CURR_CD: String
        ORG_CURR_CD: String
        TOT_AMT: String
        TOT_AMT_ORG: String
        SHIP_DATE: String
        DUE_DATE: String
        BALANCE: String
        BALANCE_ORG: String
        BUYER_NAME: String
        IN_AMT: String
        IN_AMT_ORG: String
        OA_NEGO: String
        OA_NEGO_ORG: String
        BUYER_CD: String
        TAX_TOT_AMT: String
        TAX_TOT_AMT_ORG: String
        TAX_CD: String
    }

    input I_S0708_LIST_2 {
        BUYER_CD: String
        S_DUE_DATE: String
    }

    type Query {
        mgrQueryS0708_LIST_2(data: I_S0708_LIST_2!): [T_S0708_LIST_2!]!
    }
`;

export default moduleTypedefs_S0708_LIST_2;
