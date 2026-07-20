// MGR_S0523_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0523_2 = gql`
    type T_S0523_2_0 {
        MATL_TYPE_N: String
        MATL_TYPE2_N: String
        FACTORY_NAME: String
        STOCK_DATE: String
        REG_DATETIME: String
        PO_CD: String
        ORDER_CD: String
        BUYER_NAME: String
        VENDOR_NAME: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        STOCK_STATUS_N: String
        STOCK_STATUS_2_N: String
        STOCK_STATUS: String
        STOCK_STATUS_2: String
        STOCK_STATUS_S: String
        ORG_QTY: String
        STOCK_QTY: String
        REMAIN_QTY: String
        USE_QTY: String
        OUT_QTY: String
        RACK: String
        LOCATION: String
        ORG_STOCK_IDX: String
        STOCK_IDX: String
        ROOT_IDX: String
        REMARK: String
        EXP_DATE: String
        REASON_REMARK_N: String
        PLAN_REMARK: String
        DEBIT_CD: String
        REMARK0: String
        ORG_REASON: String
        DEFECT_QTY: String
        WAITING_QTY: String
        OWNER_SHIP: String
        REASON_MAKE: String
        AUTHORITY: String
        CONDITION: String
        MANAGER: String
        PURPOSE: String
        CHARGER: String
        PO_PRICE: String
        CURR_CD: String

        MATL_TYPE: String
        FACTORY_CD: String
        BUYER_CD: String
        VENDOR_CD: String

        PO_SEQ: String
        REASON_REMARK: String
        MATL_SEQ: String
        WARE_CD: String
        CRDB_DATE: String
        CRDB_AMT: String
    }

    type T_S0523_2 {
        MESSAGE: String
        DATAS: [T_S0523_2_0!]!
    }

    type T_S0523_2_COUNT {
        TOT_CNT: Int
    }

    input I_S0523_2 {
        FACTORY_CD: String
        BUYER_CD: String
        STATUS_CD2: String
        PO_CD: String
        VENDOR_CD: String
        S_STOCK_DATE: String
        E_STOCK_DATE: String
        IS_STOCK_DATE: String
        S_REG_DATE: String
        E_REG_DATE: String
        IS_REG_DATE: String
        RACK: String
        KIND2: String
        MATL_CD: String
        DESC: String
        COLOR: String
        SPEC: String
        OWNER_SHIP: String
        REMAIN_QTY: String
        AUTHORITY: String
        CONDITION: String
        PURPOSE: String
        LOCATION: String
        BUYER_TEAM: String
        STOCK_IDX: String
        STOCK_STATUS_S: String
        ROOT_IDX: String
    }

    type Query {
        mgrQueryS0523_2(data: I_S0523_2!): T_S0523_2!
        mgrQueryS0523_2_COUNT(data: I_S0523_2!): T_S0523_2_COUNT!
    }
`;

export default moduleTypedefs_S0523_2;
