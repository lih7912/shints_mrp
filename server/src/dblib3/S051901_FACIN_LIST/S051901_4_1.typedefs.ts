// MGR_S051901_4_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S051901_4_1 = gql`
    type T_S051901_4_1 {
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: Int
        MATL_SEQ: Int
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        PO_QTY: Float
        STSIN_QTY: Float
        SHIP_QTY: Float
        IN_DATETIME: String
        BAL_QTY: Float
        OUT_QTY: Float
    }

    input I_S051901_4_1 {
        PO_CD: String
        BUYER_CD: String
        VENDOR_CD: String
        MATL_TYPE: String
    }

    type T_S051901_4_2_0 {
        PU_CD: String
        VENDOR_CD: String
        BUYER_CD: String
        FACTORY_CD: String
        PU_DATE: String
        REG_USER: String
        REG_DATETIME: String
        PU_STATUS: String
        MATL_TYPE: String
        BILL_TO: String
        SHIP_TO: String
        CURR_CD: String
        DEPOSIT_AMT: Float
        DEPOSIT_FIX: Float
        NORMI: String
        TRADE_TERM: String
        ORDER_DATE: String
        DELIVERY_DATE: String
        FORWARD: String
        PI_NO: String
        PI_FILE: String
        SHIP_MODE: String
        PO_CD2: String
        TARGET_ETA: String
        PU_TYPE: String
    }

    type T_S051901_4_2 {
        PU_MST: [T_S051901_4_2_0!]!
        STOCK_MEM: [T_S051901_4_1!]!
    }

    input I_S051901_4_2 {
        PU_CD: String
    }

    type Query {
        mgrQueryS051901_4_1(data: I_S051901_4_1!): [T_S051901_4_1!]!
        mgrQueryS051901_4_2(data: I_S051901_4_2!): [T_S051901_4_1!]!
        mgrQueryS051901_4_2_1(data: I_S051901_4_2!): [T_S051901_4_1!]!
    }
`;

export default moduleTypedefs_S051901_4_1;
