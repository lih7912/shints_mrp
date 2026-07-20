// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_CURR_COM = gql`
    type BASE_QRY_KCD_CURR_COM {
        START_DATE: String
        CURR_CD: String
        CURR_AMT: Float
        USD_RATE: Float
        id: Int
    }

    input BASE_INPUT_KCD_CURR_COM {
        START_DATE: String
        CURR_CD: String
        CURR_AMT: Float
        USD_RATE: Float
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_CURR_COM;
