// MGR_S0216_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0216_5 = gql`
    input I_S0216_INSERT_1 {
        USER_NAME: String
        BUYER_CD: String
        COLLECTION_CD: String
        YEAR: String
        MONTH: String
        TYPE: String
        CUR: String
        FACTORY_CD: String
    }

    input I_S0216_INSERT_2 {
        LINE_TYPE: String
        LINE_TYPE_N: String
        YYMM: String
        PLAN_QTY: String
        PLAN_PRICE: String
        PLAN_AMT: String
        CM_PRICE: String
        CM_AMT: String
        CURR_CD: String
        USER_ID: String
        ORDER_QTY: String
        ORDER_AMT: String
        CURR_CM_AMT: String
        OLD_ORDER_QTY: String
        OLD_ORDER_AMT: String
        OLD_CM_AMT: String
    }

    type Ret_S0216_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0216_INSERT(
            datas: I_S0216_INSERT_1!
            datas1: [I_S0216_INSERT_2!]!
        ): [Ret_S0216_5!]!
        mgrInsert_S0216_DELETE(
            datas: I_S0216_INSERT_1!
            datas1: [I_S0216_INSERT_2!]!
        ): [Ret_S0216_5!]!
        mgrInsert_S0216_COPY_YEAR(
            datas: I_S0216_INSERT_1!
            datas1: [I_S0216_INSERT_2!]!
        ): [Ret_S0216_5!]!
        mgrInsert_S0216_RECALC(datas: I_S0216_INSERT_1!): [Ret_S0216_5!]!
    }
`;

export default moduleTypedefs_S0216_5;
