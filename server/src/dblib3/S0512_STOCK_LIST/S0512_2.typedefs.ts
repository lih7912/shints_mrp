// MGR_S0512_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0512_2 = gql`
    type T_S0512_2 {
        MATL_TYPE2: String
        FACTORY_NAME: String
        STOCK_DATE: String
        REG_DATE: String
        PO_CD: String
        ORDER_CD: String
        BUYER_NAME: String
        VENDOR_NAME: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        STOCK_STATUS: String
        TOTAL_QTY: Int
        STOCK_QTY: Float
        REMAIN_QTY: Float
        USE_QTY: Float
        OUT_QTY: Float
        RACK: String
        LOCATION: String
        WARE_NAME: String
        WARE_DATE: String
        WARE_QTY: Float
        PO_SEQ: Int
        MRP_SEQ: Int
        STOCK_IDX: String
        ORG_STOCK_IDX: String
        ROOT_IDX: String
        REMARK: String
        EXP_DATE: String
        FACTORY_CD: String
        MATL_SEQ: Int
        REASON_REMARK_N: String
        PLAN_REMARK: String
        MATL_PRICE: Float
        CURR_CD: String
        DEBIT_CD: String
        REMARK0: String
        REASON_REMARK: String
        SL_N: String
    }

    input I_S0512_2 {
        FACTORY_CD: String
        IS_STOCK_DATE: String
        S_STOCK_DATE: String
        E_STOCK_DATE: String
        IS_REG_DATE: String
        S_REG_DATE: String
        E_REG_DATE: String
        MATL_NAME: String
        SPEC: String
        KIND2: String
        RACK: String
        MATL_CD: String
        COLOR: String
        VENDOR_NAME: String
        IS_USE_STOCK: String
        IS_ZERO: String
        STATUS: String
        BUYER_CD: String
        PO_CD: String
    }

    type Query {
        mgrQueryS0512_2(data: I_S0512_2!): [T_S0512_2!]!
    }
`;

export default moduleTypedefs_S0512_2;
