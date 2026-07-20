// MGR_S0215_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0215_5 = gql`
    input I_S0215_5 {
        PO_CD: String
        ORDER_CD: String
        STYLE_NAME: String
        TOT_CNT: String
        SHIP_CNT: String
        DIFF_CNT: String
        VMD_QTY: String
        VMD_SUB_QTY: String
        SMD_QTY: String
        MAX_SHIP_DATE: String
        CONFIRM_USER: String
        COL1: String
        CONFIRM_AMT: String
        USD_PRICE: String
        FC_PRICE: String
        ORDER_STATUS_NAME: String
        STS_COMMENT: String
        BVT_COMMENT: String
        SUP_QTY: String
        BUYER_QTY: String
        STS_QTY: String
        REMARK: String
        END_FLAG: String
        END_DATE: String
        ORDER_END_DATE: String
    }

    type Ret_S0215_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrUpdate_S0215_STS_END(datas: [I_S0215_5!]!): [Ret_S0215_5!]!
        mgrInsert_S0215_STS_SAVE(datas: [I_S0215_5!]!): [Ret_S0215_5!]!
        mgrInsert_S0215_STS_CANCEL(datas: [I_S0215_5!]!): [Ret_S0215_5!]!
        mgrInsert_S0215_BVT_SAVE(datas: [I_S0215_5!]!): [Ret_S0215_5!]!
    }
`;

export default moduleTypedefs_S0215_5;
