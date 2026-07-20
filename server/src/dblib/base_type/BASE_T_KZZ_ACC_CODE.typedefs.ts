// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KZZ_ACC_CODE = gql`
    type BASE_QRY_KZZ_ACC_CODE {
        CD_SEQ: Int
        CD_DS: Int
        NM_DS: String
        CD_CS_KR: Int
        NM_CS_KR: String
        CD_CS_OV: Int
        NM_CS_OV: String
        id: Int
    }

    input BASE_INPUT_KZZ_ACC_CODE {
        CD_SEQ: Int
        CD_DS: Int
        NM_DS: String
        CD_CS_KR: Int
        NM_CS_KR: String
        CD_CS_OV: Int
        NM_CS_OV: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KZZ_ACC_CODE;
