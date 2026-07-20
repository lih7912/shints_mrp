// MGR_S0413_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0413_3 = gql`
    type T_S0413_3 {
        PACK_CD: String
        PO_CD: String
        PO_AMT: Float
        DELIVERY_AMT: Float
        DELIVERY_WON: Float
    }

    input I_S0413_3 {
        INVOICE_NO: String
        PACK_CD: String
    }

    type Query {
        mgrQueryS0413_3(data: I_S0413_3!): [T_S0413_3!]!
    }
`;

export default moduleTypedefs_S0413_3;
