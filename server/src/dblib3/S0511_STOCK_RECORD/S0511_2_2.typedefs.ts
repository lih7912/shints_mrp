// MGR_S0511_2_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0511_2_2 = gql`
    type T_S0511_2_2 {
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        STOCK_QTY: Int
        RACK: String
        LOCATION: String
        REASON_PLAN: String
        REMARK: String
        VENDOR_NAME: String
        MATL_SEQ: Int
        STATUS_CD: String
        VENDOR_STATUS: String
    }

    input I_S0511_2_2 {
        MATL_NAME: String
        VENDOR_NAME: String
        COLOR: String
        SPEC: String
        MATL_CD: String
    }

    type Query {
        mgrQueryS0511_2_2(data: I_S0511_2_2!): [T_S0511_2_2!]!
    }
`;

export default moduleTypedefs_S0511_2_2;
