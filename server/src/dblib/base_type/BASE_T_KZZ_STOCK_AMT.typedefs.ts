// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KZZ_STOCK_AMT = gql`
    type BASE_QRY_KZZ_STOCK_AMT {
        YYMM: String
        FACTORY_CD: String
        BUYER_CD: String
        CURR_CD: String
        CURR_SEQ: Int
        BEF_AMT: Float
        IN_AMT: Float
        OUT_AMT: Float
        TOT_AMT: Float
        id: Int
    }

    input BASE_INPUT_KZZ_STOCK_AMT {
        YYMM: String
        FACTORY_CD: String
        BUYER_CD: String
        CURR_CD: String
        CURR_SEQ: Int
        BEF_AMT: Float
        IN_AMT: Float
        OUT_AMT: Float
        TOT_AMT: Float
        id: Int
    }
`;

export default moduleTypedefs_BASE_KZZ_STOCK_AMT;
