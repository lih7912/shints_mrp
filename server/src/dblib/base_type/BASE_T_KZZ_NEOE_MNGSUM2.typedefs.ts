// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KZZ_NEOE_MNGSUM2 = gql`
    type BASE_QRY_KZZ_NEOE_MNGSUM2 {
        NO_DOCU: String
        DT_ACCT: String
        CD_ACCT: String
        NM_NOTE: String
        AM_CR: String
        CD_MNGD1: String
        NM_MNGD1: String
        CD_MNGD2: String
        NM_MNGD2: String
        CD_MNGD3: String
        NM_PUMM: String
        SANG: String
        USER_ID: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KZZ_NEOE_MNGSUM2 {
        NO_DOCU: String
        DT_ACCT: String
        CD_ACCT: String
        NM_NOTE: String
        AM_CR: String
        CD_MNGD1: String
        NM_MNGD1: String
        CD_MNGD2: String
        NM_MNGD2: String
        CD_MNGD3: String
        NM_PUMM: String
        SANG: String
        USER_ID: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KZZ_NEOE_MNGSUM2;
