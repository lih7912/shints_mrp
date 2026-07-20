// MGR_S0507_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0507_2 = gql`
    type T_S0507_2_DATA {
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
        OUT_QTY: Float
        STOCK_MOVE_QTY: Float
        PO_QTY: Float
        ETC_ERROR: Float
        ETC_SHORTAGE: Float
        ETC_OTHERS: Float
        ETC_GUBUN: String
        FACOUT_VAL: Float
        INPUT: Float
        FAC_IN_QTY: Float
        FAC_OUT_QTY: Float
        FAC_ORDER_OUT_QTY: Float
    }

    type T_S0507_2_ETC {
        OUT_DATE: String
        ORDER_CD: String
        MATL_CD: String
        OUT_QTY: Float
        ETC_TYPE: String
    }

    type T_S0507_2 {
        DATA1: [T_S0507_2_DATA!]!
        OUT_DATE_INFO: [T_S0507_2_ETC!]!
        ORDER_OUT_QTY: [T_S0507_2_ETC!]!
        OUT_QTY: [T_S0507_2_ETC!]!
    }

    input I_S0507_2 {
        PO_CD: String
        ORDER_CD: String
        VENDOR_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
    }

    type Query {
        mgrQueryS0507_2(data: I_S0507_2!): T_S0507_2!
    }
`;

export default moduleTypedefs_S0507_2;
