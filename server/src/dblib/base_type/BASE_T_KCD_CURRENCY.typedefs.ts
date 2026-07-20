// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_CURRENCY = gql`
    type BASE_QRY_KCD_CURRENCY {
        CURR_CD: String
        START_DATE: String
        USD_RATE: Float
        WON_AMT: Float
        WON_AMT2: Float
        id: Int
    }

    input BASE_INPUT_KCD_CURRENCY {
        CURR_CD: String
        START_DATE: String
        USD_RATE: Float
        WON_AMT: Float
        WON_AMT2: Float
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_CURRENCY;
