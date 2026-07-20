// MGR_S0401_2_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0401_2_1 = gql`
    type T_S0401_2_1 {
        BUYER_CD: String
        VENDOR_CD: String
        MATL_TYPE: String
        PO_CD: String
        S_MRP_QTY: String
        S_PO_QTY: String
        S_STOCK_QTY: String
        FACTORY_CD: String
        MATL_DUE_DATE: String
        PROD_DUE_DATE: String
        PLAN_FLAG: String
        PLAN_ETD: String
        PLAN_ETA: String
        BUYER_NAME: String
        VENDOR_NAME: String
        FACTORY_NAME: String
        PU_CD2: String
        PU_STATUS: String
    }

    input I_S0401_2_1 {
        PU_STATUS: String
        PU_CD: String
        BUYER_CD: String
        VENDOR_TYPE: String
        S_MRP_DATE: String
        E_MRP_DATE: String
        USER_ID: String
        PO_CD: String
        VENDOR_CD: String
        S_ORDER_DATE: String
        E_ORDER_DATE: String
    }

    type Query {
        mgrQueryS0401_2_1(data: I_S0401_2_1!): [T_S0401_2_1!]!
    }
`;

export default moduleTypedefs_S0401_2_1;
