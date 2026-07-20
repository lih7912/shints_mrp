// MGR_S0531_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0531_5 = gql`
    input I_S0531_5 {
        END_DATE: String
        PENDING_DAYS: String
        BUYER_NAME: String
        ORDER_CD: String
        STYLE_NAME: String
        TOT_CNT: String
        SHIP_QTY: String
        BAL_QTY: String
        CURR_CD: String
        ORDER_PRICE: String
        PENDING_AMT: String
        REMARK: String
        STATUS_CD: String
    }

    type Ret_S0531_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0531_5_UPDATE_PENDING(datas: [I_S0531_5!]!): [Ret_S0531_5!]!
    }
`;

export default moduleTypedefs_S0531_5;
