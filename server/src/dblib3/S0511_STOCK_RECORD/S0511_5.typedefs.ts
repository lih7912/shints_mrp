// MGR_S0511_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0511_5 = gql`
    input I_S0511_5 {
        MATL_CD: String
        ORDER_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        STOCK_QTY: Float
        REMAIN_QTY: Float
        STOCK_STATUS: String
        RACK: String
        LOCATION: String
        REASON_REMARK: String
        REMARK: String
        REMARK0: String
        VENDOR_NAME: String
        MATL_SEQ: Int
        STOCK_IDX: String
        ROOT_IDX: String

        USER_ID: String
        ORG_REMARK: String
        MOVE_QTY: Float
    }

    type Ret_S0511_5 {
        CODE: String
        id: Int
    }

    input I_S0511_5_1 {
        FRT_DATE: String
        BL_NO: String
        AMOUNT: Float
        WEIGHT: Float
        ETA: String
        USER_ID: String
    }

    type Mutation {
        mgrInsert_S0511_5(datas: [I_S0511_5!]!): [Ret_S0511_5!]!
        mgrInsert_S0511_5_1(datas: [I_S0511_5!]!): [Ret_S0511_5!]!
    }
`;

export default moduleTypedefs_S0511_5;
