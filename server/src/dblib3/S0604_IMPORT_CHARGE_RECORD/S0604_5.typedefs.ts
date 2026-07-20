// MGR_S0604_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0604_5 = gql`
    input I_S0604_5_1 {
        INVOICE_NO: String
        ORDER_AMT: Float
        CURR_CD: String
        TOTAL_AMT: Float
        DUTY_AMT: Float
        SHIP_DATE: String
        DELIVERY_TYPE: String
        VENDOR_NAME: Float
        REMARK: String
        BUYER_CD: String
        FREIGHT_AMT: Float
        COST_CLEAR: Float
        USER_ID: String
    }

    type Ret_S0604_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0604_5(datas1: I_S0604_5_1!): [Ret_S0604_5!]!
        mgrUpdate_S0604_5(datas1: I_S0604_5_1!): [Ret_S0604_5!]!
        mgrDelete_S0604_5(datas1: I_S0604_5_1!): [Ret_S0604_5!]!
    }
`;

export default moduleTypedefs_S0604_5;
