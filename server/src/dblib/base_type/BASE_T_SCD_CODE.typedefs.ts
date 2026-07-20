// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_SCD_CODE = gql`
    type BASE_QRY_SCD_CODE {
        CD_GROUP: String
        CD_CODE: String
        CD_NAME: String
        CD_FLAG: String
        id: Int
    }

    input BASE_INPUT_SCD_CODE {
        CD_GROUP: String
        CD_CODE: String
        CD_NAME: String
        CD_FLAG: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_SCD_CODE;
