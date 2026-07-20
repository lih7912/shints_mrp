// MGR_S0522_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0522_2 = gql`
    type T_S0522_2 {
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
    }

    input I_S0522_2 {
        BUYER_CD: String
        PO_CD: String
        ORDER_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        MATL_CD: String
        VENDOR_NAME: String
    }

    type Query {
        mgrQueryS0522_2(data: I_S0522_2!): [T_S0522_2!]!
    }
`;

export default moduleTypedefs_S0522_2;
