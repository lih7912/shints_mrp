// MGR_S0107_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0107_1 = gql`
    input I_S0107_1 {
        STATUS_CD: String
        BUYER_CD: String
        SIZE_GROUP: String
        SIZE_GROUP_NAME: String
        SIZE_MEMBER: String
    }

    type T_S0107_CODE {
        STATUS_CD: [BASE_QRY_KCD_CODE!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
    }

    type T_S0107_SIZE_MST {
        SIZE_GROUP: String
        SIZE_GROUP_NAME: String
        SIZE_MEMBER: String
        SIZE_CNT: Int
        STATUS_CD: String
        BUYER_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        id: Int
        STATUS_CD_N: String
        BUYER_NAME: String
    }

    type Query {
        mgrQueryS0107_CODE(data: I_S0107_1!): T_S0107_CODE!
        mgrQueryS0107_1(data: I_S0107_1!): [T_S0107_SIZE_MST!]!
    }
`;

export default moduleTypedefs_S0107_1;
