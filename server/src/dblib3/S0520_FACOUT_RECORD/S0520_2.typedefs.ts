// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0520_2 = gql`
    type T_S0520_2_SUB {
        OUT_NAME: String
        OUT_QTY: String
    }

    type T_S0520_2 {
        PO_CD: String
        ORDER_CD: String
        MATL_CD: String
        PU_CD: String
        PO_QTY2: String
        PO_QTY: String
        PO_SEQ: String

        MATL_NAME: String
        VENDOR_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        CURR_CD: String
        MASTER_PRICE: String

        MRP_QTY: String
        IN_QTY: String
        ERROR_QTY: String
        SHIP_QTY: String
        STOCK_QTY: String
        FAC_IN_QTY: String
        FAC_OUT_QTY: String
        SHORT_QTY: String
        DEFECT_QTY: String
        MAIN_USE_QTY: String
        OTHER_USE_QTY: String
        TABLE_SHORT_QTY: String
        KEEP_STOCK_QTY: String
        LOST_QTY: String
        LINE_RETURN_QTY: String
        REMAIN_E_QTY: String
        REMAIN_A_QTY: String
        OUT_QTY: String
        VENDOR_CD: String
        REMARK: String
        FACOUT_ARRAY: [T_S0520_2_SUB!]!
    }

    input I_S0520_2 {
        USER_ID: String
        BUYER_CD: String
        PO_CD: String
        VENDOR_CD: String
        ORDER_CD: String
        S_IN_DATE: String
        E_IN_DATE: String
        PURPOSE: String
        IS_BALANCE: String
        REMARK: String
        OUT_DATE: String
        FACOUT_CD: String

        SUPPLIER: String
        DESCRIPTION: String
        MATL_CD: String
        SPEC: String
        COLOR: String
        UNIT: String
    }

    type Query {
        mgrQueryS0520_2(data: I_S0520_2!): [T_S0520_2!]!
        mgrQueryS0520_2_0323(data: I_S0520_2!): [T_S0520_2!]!
        mgrQueryS0520_2_bak(data: I_S0520_2!): [T_S0520_2!]!
        mgrQueryS0520_2_0(data: I_S0520_2!): [T_S0520_2!]!
    }
`;

export default moduleTypedefs_S0520_2;
