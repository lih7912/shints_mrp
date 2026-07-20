// MGR_S0603_4.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0603_4 = gql`
    type T_S0603_4 {
        INVOICE_NO: String
        ORDER_CD: String
        SHIP_CNT: Int
        SHIP_PTYPE_N: String
        DELIVERY_TYPE_N: String
    }

    input I_S0603_4 {
        INVOICE_NO: String
        SHIP_DATE: String
    }

    type Query {
        mgrQueryS0603_4(data: I_S0603_4!): [T_S0603_4!]!
    }
`;

export default moduleTypedefs_S0603_4;
