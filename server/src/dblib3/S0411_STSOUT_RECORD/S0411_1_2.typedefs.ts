// MGR_S0411_1_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0411_1_2 = gql`
    type T_S0411_1_2 {
        USE_MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        MATL_PRICE: Float
        CURR_CD: String
        UNIT: String
        STOCK_QTY: String
        OUT_QTY: Float
        VENDOR_NAME: String
        FACTORY: String
        OUTPUT_FLAG: String
        STOCK_IDX: String
        USE_DATETIME: String
        FACTORY_CD: String
        USE_PO_CD: String
        USE_ORDER_CD: String
    }

    input I_S0411_1_2 {
        PO_CD: String
    }

    type Query {
        mgrQueryS0411_1_2(data: I_S0411_1_2!): [T_S0411_1_2!]!
    }
`;

export default moduleTypedefs_S0411_1_2;
