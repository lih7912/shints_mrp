// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KZZ_XMD = gql`
    type BASE_QRY_KZZ_XMD {
        DATE: String
        ORIGINAL_AMT: Float
        OUTSTANDING_AMT: Float
        id: Int
    }

    input BASE_INPUT_KZZ_XMD {
        DATE: String
        ORIGINAL_AMT: Float
        OUTSTANDING_AMT: Float
        id: Int
    }
`;

export default moduleTypedefs_BASE_KZZ_XMD;
