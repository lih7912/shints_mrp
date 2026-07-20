// MGR_S0521_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0521_5 = gql`
    input I_S0521_5 {
        STOCK_DATE: String
        CHARGER: String
        OWNER_SHIP: String
        REASON_MAKE: String
        AUTHORITY: String
        CONDITION: String
        MANAGER: String
        REMARK: String
        PURPOSE: String
        STOCK_IDX: String
        FACTORY_CD: String
        FACTORY_NAME: String
        IS_NEW: String
    }

    input I_S0521_5_1 {
        SEQ: String
        QTY: Float
        LOCATION: String
        RACK: String
    }

    input I_S0521_5_2 {
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
        REMARK: String
        REMARK0: String
        VENDOR_NAME: String
        MATL_SEQ: Int
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
        SUPPLIER: String
    }

    type Ret_S0521_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0521_5(
            datas: I_S0521_5!
            datas1: [I_S0521_5_1!]!
            datas2: I_S0521_5_2!
        ): [Ret_S0521_5!]!
    }
`;

export default moduleTypedefs_S0521_5;
