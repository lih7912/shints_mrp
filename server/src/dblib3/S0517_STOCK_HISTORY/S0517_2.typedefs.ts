// MGR_S0517_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0517_2 = gql`
    type T_S0517_2_bak {
        PO_CD: String
        PO_SEQ: String
        MATL_CD: String
        ORDER_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        STOCK_QTY: String
        REMAIN_QTY: String
        STOCK_STATUS: String
        RACK: String
        LOCATION: String
        REASON_REMARK: String
        REASON_REMARK_N: String
        REMARK: String
        REMARK0: String
        VENDOR_NAME: String
        MATL_SEQ: String
        USE_QTY: String
        OUT_QTY: String
        DEFECT_QTY: String
        ORG_STOCK_IDX: String
        STOCK_IDX: String
        ROOT_IDX: String
        WAITING_QTY: String
        STOCK_STATUS_2: String
        OWNER_SHIP: String
        REASON_MAKE: String
        AUTHORITY: String
        CONDITION: String
        MANAGER: String
        PURPOSE: String
        STOCK_DATE: String
        CHARGER: String
        REG_DATETIME: String
        WARE_CD: String
        FACTORY_CD: String
        DEBIT_CD: String
        CRDB_DATE: String
        CRDB_AMT: String
        PO_PRICE: String
        VENDOR_CD: String
        CURR_CD: String
    }

    type T_S0517_2 {
        STOCK_IDX: String
        ORG_STOCK_IDX: String
        PO_CD: String
        ORDER_CD: String
        MATL_CD: String
        STOCK_DATE: String
        REG_DATETIME: String
        STOCK_STATUS_S_N: String
        STOCK_STATUS_2: String
        STOCK_QTY: String
        REMAIN_QTY: String
        USE_QTY: String
        OUT_QTY: String
        REG_USER: String
        REMARK: String
        USE_PO_CD: String
        USE_PO_SEQ: String
        USE_ORDER_CD: String
        USE_DATETIME: String
        USE_QTY2: String
    }

    type T_S0517_2_1 {
        MATL_CD: String
        STOCK_IDX: String
        VENDOR_NAME: String
        PO_CD: String
        ORDER_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        BUYER_CD: String
        STOCK_QTY: String
        REMAIN_QTY: String
        USE_QTY: String
        OUT_QTY: String
    }

    type T_S0517_2_0 {
        DATAS: [T_S0517_2!]!
        INFO: T_S0517_2_1!
    }

    input I_S0517_2 {
        STOCK_IDX: String
    }

    type T_S0517_2_EXCEL_PRINT {
        id: Int
        CODE: String
    }

    type Query {
        mgrQueryS0517_2_EXCEL_PRINT(data: I_S0517_2!): [T_S0517_2_EXCEL_PRINT!]!
        mgrQueryS0517_2(data: I_S0517_2!): T_S0517_2_0!
        mgrQueryS0517_2_bak(data: I_S0517_2!): [T_S0517_2!]!
    }
`;

export default moduleTypedefs_S0517_2;
