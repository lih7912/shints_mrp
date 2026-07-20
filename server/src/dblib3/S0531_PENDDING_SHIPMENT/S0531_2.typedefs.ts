// MGR_S0531_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0531_2 = gql`
    type T_S0531_2 {
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

    input I_S0531_2 {
        FACTORY_CD: String
        BUYER_CD: String
        STYLE_CD: String
        ORDER_CD: String
    }

    type Query {
        mgrQueryS0531_2(data: I_S0531_2!): [T_S0531_2!]!
    }
`;

export default moduleTypedefs_S0531_2;
