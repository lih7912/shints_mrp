// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_sysdiagrams = gql`
    type BASE_QRY_sysdiagrams {
        name: String
        principal_id: Int
        diagram_id: Int
        version: Int
    }

    input BASE_INPUT_sysdiagrams {
        name: String
        principal_id: Int
        diagram_id: Int
        version: Int
    }
`;

export default moduleTypedefs_BASE_sysdiagrams;
