// MGR_S0416_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0416_5 = gql`
    input I_S0416_5 {
        REG_DATE: String
        PO_CD: String
        BUYER_CD: String
        PO_CONF_DATE: String
        PLAN_ETD: String
        PLAN_ETA: String
        VENDOR_NAME: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        NEED_QTY: Float
        REMAIN_QTY: Float
        DELAY_REASON: String
        REMARK: String
        EX_IN_DATE: String
        CUT_DATE: String
        ETA: String
        ETD: String
        DELIVERY_TYPE: String
        FARE_TYPE: String
        MATL_CD1: String
        SEQ: Int
        PO_CONF_DATE2: String
        ORIGINAL_ETD2: String
        ORIGINAL_ETDA: String
        SHIP_QTY: Int
        END_FLAG: String
        EX_IN_DATE1: String
        UPD_USER: String
        USER_ID: String
    }

    type Ret_S0416_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0416_5(datas: [I_S0416_5!]!): [Ret_S0416_5!]!
    }
`;

export default moduleTypedefs_S0416_5;
