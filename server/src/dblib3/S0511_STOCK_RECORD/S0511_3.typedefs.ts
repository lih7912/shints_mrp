// MGR_S0511_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0511_3 = gql`
    type T_S0511_3 {
        MATL_CD: String
        ORDER_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        STOCK_QTY: Float
        REMAIN_QTY: Float
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
    }

    input I_S0511_3 {
        MATL_NAME: String
        VENDOR_NAME: String
        COLOR: String
        SPEC: String
        MATL_CD: String
        PO_CD: String
        ORDER_CD: String
    }

    type Query {
        mgrQueryS0511_3(data: I_S0511_3!): [T_S0511_3!]!
    }
`;

export default moduleTypedefs_S0511_3;
