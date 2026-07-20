// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_IU_CODE = gql`
    type BASE_QRY_KCD_IU_CODE {
        CD_ACCT: String
        NM_ACCT: String
        CD_DEVIDE: String
        NM_DEVIDE: String
        FLAG: String
        id: Int
    }

    input BASE_INPUT_KCD_IU_CODE {
        CD_ACCT: String
        NM_ACCT: String
        CD_DEVIDE: String
        NM_DEVIDE: String
        FLAG: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_IU_CODE;
