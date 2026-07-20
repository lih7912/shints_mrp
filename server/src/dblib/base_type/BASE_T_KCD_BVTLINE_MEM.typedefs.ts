// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_BVTLINE_MEM = gql`
    type BASE_QRY_KCD_BVTLINE_MEM {
        LINE_CD: String
        KIND_CD: String
        KIND_NAME: String
        KIND_QTY: Float
        DAY_QTY: Float
        id: Int
    }

    input BASE_INPUT_KCD_BVTLINE_MEM {
        LINE_CD: String
        KIND_CD: String
        KIND_NAME: String
        KIND_QTY: Float
        DAY_QTY: Float
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_BVTLINE_MEM;
