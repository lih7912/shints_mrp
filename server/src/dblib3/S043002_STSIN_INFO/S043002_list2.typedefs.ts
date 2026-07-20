// MGR_S043002_LIST_2_0.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S043002_LIST_2_0 = gql`
    type T_S043002_LIST_2_STOCK_MEM {
        PO_CD: String
        PO_SEQ: String
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: String
        MATL_SEQ: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        MRP_QTY: String
        STOCK_QTY: String
        MOQ_QTY: String
        LEFTOVER_QTY: String
        PO_QTY0: String
        PO_QTY: String
        STSIN_QTY: String
        FOC_QTY: String
        SHIP_QTY: String
        CURR_CD: String
        MASTER_PRICE: String
        DIFF_PRICE: String
        PO_PRICE: String
        SURCHARGE_AMT: String
        SURCHARGE_PRICE: String
        SURCHARGE_REMARK: String
        OVERSHORT_RATE: String
        BILL_CD: String
    }

    type T_S043002_LIST_2_PU_MST {
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
        DEPOSIT_AMT: String
        DEPOSIT_FIX: String
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

    type T_S043002_LIST_2 {
        PU_MST: [T_S043002_LIST_2_PU_MST!]!
        STOCK_MEM: [T_S043002_LIST_2_STOCK_MEM!]!
    }

    input I_S043002_LIST_2 {
        STSIN_CD: String
    }

    type Query {
        mgrQueryS043002_LIST_2_0(data: I_S043002_LIST_2!): [T_S043002_LIST_2!]!
        mgrQueryS043002_LIST_2(
            data: I_S043002_LIST_2!
        ): [T_S043002_LIST_2_STOCK_MEM!]!
        mgrQueryS043002_LIST_2_bak(
            data: I_S043002_LIST_2!
        ): [T_S043002_LIST_2_STOCK_MEM!]!
    }
`;

export default moduleTypedefs_S043002_LIST_2_0;
