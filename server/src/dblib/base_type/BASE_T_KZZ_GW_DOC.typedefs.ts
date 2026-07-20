// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KZZ_GW_DOC = gql`
    type BASE_QRY_KZZ_GW_DOC {
        APPROKEY: String
        TITLE: String
        CONTANT: String
        BANK: String
        CONTANT_CNT: Int
        FLAG: Int
        id: Int
    }

    input BASE_INPUT_KZZ_GW_DOC {
        APPROKEY: String
        TITLE: String
        CONTANT: String
        BANK: String
        CONTANT_CNT: Int
        FLAG: Int
        id: Int
    }
`;

export default moduleTypedefs_BASE_KZZ_GW_DOC;
