// MGR_S0406_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0406_5 = gql`
    input I_S0406_5 {
        PO_CD: String
        ORDER_CD: String
        VENDOR_NAME: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        PO_QTY: Float
        BEF_IN_QTY: Float
        IN_QTY: Int
        TOT_QTY: Int
        PO_CD_CNT: Int
        MIN_FLAG: String
        MATL_CD: String
        LC_QTY: String
        BILL_TYPE: String
        PO_SEQ: Int
        MRP_SEQ: Int
        VENDOR_CD: String
        VENDOR_TYPE: String
        REMAIN_QTY: Float
        TEMP_PRICE: String
        MIN_CONF_USER: String
        MIN_CONF_DATETIME: String
        MIN_STOCK_IDX: String
    }

    type Ret_S0406_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0406_5(datas: [I_S0406_5!]!): [Ret_S0406_5!]!
    }
`;

export default moduleTypedefs_S0406_5;
