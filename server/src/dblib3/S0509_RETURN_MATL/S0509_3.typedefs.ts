// MGR_S0509_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0509_3 = gql`
    type T_S0509_3 {
        MATL_CD: String
        STOCK_STATUS_S_N: String
        STOCK_QTY: Float
        RACK: String
        LOCATION: String
        REMARK: String
        ORDER_CD: String
        STOCK_STATUS: String
        STOCK_IDX: String
        ORG_STOCK_IDX: String
        REMAIN_QTY: Float
    }

    input I_S0509_3 {
        STOCK_IDX: String
    }

    type Query {
        mgrQueryS0509_3(data: I_S0509_3!): [T_S0509_3!]!
    }
`;

export default moduleTypedefs_S0509_3;
