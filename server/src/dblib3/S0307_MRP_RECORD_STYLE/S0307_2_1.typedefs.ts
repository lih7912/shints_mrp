// MGR_S0307_2_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0307_2_1 = gql`
    type T_S0307_2_1 {
        ORDER_CD: String
        PO_CD: String
        STYLE_CD: String
        STYLE_NAME: String
        PROD_CD: String
        COLOR: String
    }

    input I_S0307_2_1 {
        ORDER_CD: String
    }

    type Query {
        mgrQueryS0307_2_1(data: I_S0307_2_1!): [T_S0307_2_1!]!
    }
`;

export default moduleTypedefs_S0307_2_1;
