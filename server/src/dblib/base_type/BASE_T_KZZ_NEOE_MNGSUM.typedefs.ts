// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KZZ_NEOE_MNGSUM = gql`
    type BASE_QRY_KZZ_NEOE_MNGSUM {
        USER_ID: String
        CD_ACCT: String
        NM_ACCT: String
        CD_CODE: String
        NM_CC: String
        AM_AMT: Float
        SEQ: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KZZ_NEOE_MNGSUM {
        USER_ID: String
        CD_ACCT: String
        NM_ACCT: String
        CD_CODE: String
        NM_CC: String
        AM_AMT: Float
        SEQ: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KZZ_NEOE_MNGSUM;
