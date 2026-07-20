// MGR_S030511_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030511_1 = gql`
    type T_S030511_1_ORDERS {
        ORDER_CD: String
        SUM_QTY: Int
    }

    type T_S030511_1 {
        VENDOR_NAME: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        MATL_CD: String
        QTY_TYPE: String
        TOT_QTY: Int
        MINI_QTY: Int
        ORDERS: [T_S030511_1_ORDERS!]!
    }

    input I_S030511_1 {
        PO_CD: String
    }

    type Query {
        mgrQueryS030511_1(data: I_S030511_1!): [T_S030511_1!]!
    }
`;

export default moduleTypedefs_S030511_1;
