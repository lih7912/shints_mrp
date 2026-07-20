// MGR_S0520_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0520_5 = gql`
    input I_S0520_5 {
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
    }

    input I_S0520_5_1 {
        REMARK: String
        OUT_DATE: String
        PURPOSE: String
    }

    type Ret_S0520_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0520_5_FACOUT(
            datas: [I_S0520_5!]!
            datas1: I_S0520_5_1!
        ): [Ret_S0520_5!]!
    }
`;

export default moduleTypedefs_S0520_5;
