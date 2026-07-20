// MGR_S051201_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S051201_2 = gql`
    type T_S051201_2_DATA {
        STOCK_IDX: String
        ORG_STOCK_IDX: String
        PO_CD: String
        ORDER_CD: String
        MATL_CD: String
        STOCK_DATE: String
        REG_DATE: String
        STOCK_STATUS_N: String
        STOCK_QTY: Float
        REMAIN_QTY: Float
        USE_QTY: Float
        OUT_QTY: Float
        REG_USER: String
        REMARK: String
        USE_PO: String
        USE_PO_SEQ: String
        USE_ORDER: String
        USE_POQTY: String
        USE_DATETIME: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
    }

    type T_S051201_2_SUM {
        SUM_STOCK_QTY: Float
        SUM_REMAIN_QTY: Float
        SUM_USE_QTY: Float
        SUM_OUT_QTY: Float
    }

    type T_S051201_2 {
        SUM_INFO: [T_S051201_2_SUM!]!
        DATA: [T_S051201_2_DATA!]!
    }

    input I_S051201_2 {
        ROOT_IDX: String
    }

    type Query {
        mgrQueryS051201_2(data: I_S051201_2!): T_S051201_2!
    }
`;

export default moduleTypedefs_S051201_2;
