// MGR_S0501_2_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0501_2_3 = gql`
    type T_S0501_2_3 {
        OUT_FROM: String
        PR_NUM: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        MATL_PRICE: Float
        CURR_CD: String
        OUT_QTY: Float
        OUT_QTY_2: Float
        REMARK: String
        COL1: String
        COL2: String
        COL3: String
    }

    input I_S0501_2_3 {
        KEY1: String
    }

    type Query {
        mgrQueryS0501_2_3(data: I_S0501_2_3!): [T_S0501_2_3!]!
    }
`;

export default moduleTypedefs_S0501_2_3;
