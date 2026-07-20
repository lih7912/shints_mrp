// MGR_S0435_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0435_5 = gql`
    input I_S0435_5 {
        SHIPMENT_CD: String
        SHIPPING_COST: String
        SHIPPING_COST_PAID: String
        CURR_CD: String
        CHK_SHINTS: String
        CHK_BVT: String
        CHK_ETP: String
        CHK_OTHER: String
        OTHER: String
    }

    type Ret_S0435_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrUpdate_S0435_5(datas: I_S0435_5!): [Ret_S0435_5!]!
        mgrCancel_S0435_5(datas: I_S0435_5!): [Ret_S0435_5!]!
    }
`;

export default moduleTypedefs_S0435_5;
