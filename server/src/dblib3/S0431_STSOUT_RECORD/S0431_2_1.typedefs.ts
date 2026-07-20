// MGR_S0431_2_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0431_2_1 = gql`
    type T_S0431_2_1 {
        BUYER_CD: String
        VENDOR_CD: String
        MATL_TYPE: String
        PO_CD: String
        S_PO_QTY: String
        FACTORY_CD: String
        MATL_DUE_DATE: String
        PROD_DUE_DATE: String
        PLAN_FLAG: String
        PLAN_ETD: String
        PLAN_ETA: String
        BUYER_NAME: String
        VENDOR_NAME: String
        FACTORY_NAME: String
    }

    input I_S0431_2_1 {
        BUYER_CD: String
    }

    type Query {
        mgrQueryS0431_2_1(data: I_S0431_2_1!): [T_S0431_2_1!]!
    }
`;

export default moduleTypedefs_S0431_2_1;
