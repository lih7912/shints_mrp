// MGR_S0522_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0522_5 = gql`
    input I_S0522_5 {
        STOCK_DATE: String
        CHARGER: String
        OWNER_SHIP: String
        REASON_MAKE: String
        AUTHORITY: String
        CONDITION: String
        MANAGER: String
        REMARK: String
        PURPOSE: String
        STOCK_IDX: String
    }

    input I_S0522_5_1 {
        SEQ: String
        QTY: Float
        LOCATION: String
    }

    type Ret_S0522_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0522_5(
            datas: I_S0522_5!
            datas1: [I_S0522_5_1!]!
        ): [Ret_S0522_5!]!
    }
`;

export default moduleTypedefs_S0522_5;
