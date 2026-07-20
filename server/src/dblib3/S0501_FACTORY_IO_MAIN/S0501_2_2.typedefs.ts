// MGR_S0501_2_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0501_2_2 = gql`
    type T_S0501_2_2_ORDER {
        ORDER_CD: String
        TOT_CNT: Int
    }

    type T_S0501_2_2_DATA2 {
        OUT_FROM: String
        PR_NUM: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        MATL_PRICE: Float
        CURR_CD: String
        OUT_QTY: Float
        OUT_QTY_2: Float
        REMARK: String
        COL1: String
        COL2: String
        COL3: String
    }

    type T_S0501_2_2_DATA1 {
        VENDOR_NAME: String
        PR_NUM: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        MATL_PRICE: Float
        CURR_CD: String
        TOT_CNT: String
        ORD_CNT: String
        REMARK: String
        REMARK_BVT: String
        VENDOR_TYPE: String
        PAY_TERM: Int
        DATE_INFO: String
    }

    type T_S0501_2_2_ETC {
        MATL_CD: String
        TOT_QTY: Int
        STOCK_QTY: Int
        LEFT_OVER: Int
        ORDER_CD: String
    }

    type T_S0501_2_2 {
        ORDER: [T_S0501_2_2_ORDER!]!
        DATA1: [T_S0501_2_2_DATA1!]!
        DATA2: [T_S0501_2_2_DATA2!]!
        STS_IN: [T_S0501_2_2_ETC!]!
        STS_OUT: [T_S0501_2_2_ETC!]!
        STS_OUT_STOCK: [T_S0501_2_2_ETC!]!
        STOCK_USE: [T_S0501_2_2_ETC!]!
        FACIN: [T_S0501_2_2_ETC!]!
        FACOUT: [T_S0501_2_2_ETC!]!
        FACETC: [T_S0501_2_2_ETC!]!
        LEFT_OVER_WAIT: [T_S0501_2_2_ETC!]!
        STOCK_MOVE: [T_S0501_2_2_ETC!]!
    }

    type T_S0501_2_2_1 {
        COL_1: String
        COL_2: String
        COL_3: String
        COL_4: String
        COL_5: String
        COL_6: String
        COL_7: String
        COL_8: String
        COL_9: String
        COL_10: String
        COL_11: String
        COL_12: String
        COL_13: String
        COL_14: String
        COL_15: String
        COL_16: String
        COL_17: String
    }

    input I_S0501_2_2_1 {
        PO_CD: String
        MATL_CD: String
        OP_KIND: String
    }

    input I_S0501_2_2 {
        FACTORY_CD: String
        PO_CD: String
        ORDER_CD: String
        MATL_CD: String
        VENDOR_CD: String
        MATL_NAME: String
        COLOR: String
        UNIT: String
        SPEC: String
        ETD: String
        ETA: String
        IN_DATE: String
    }

    type Query {
        mgrQueryS0501_2_2(data: I_S0501_2_2!): T_S0501_2_2!
        mgrQueryS0501_2_2_1(data: I_S0501_2_2_1!): [T_S0501_2_2_1!]!
    }
`;

export default moduleTypedefs_S0501_2_2;
