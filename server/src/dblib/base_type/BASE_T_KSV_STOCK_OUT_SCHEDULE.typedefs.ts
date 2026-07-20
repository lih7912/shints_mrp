// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_STOCK_OUT_SCHEDULE = gql`
    type BASE_QRY_KSV_STOCK_OUT_SCHEDULE {
        OUT_DATE: String
        OUT_SEQ: Int
        DEPARTURE: String
        ARRIVAL: String
        FRT_TYPE: String
        ETA: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_STOCK_OUT_SCHEDULE {
        OUT_DATE: String
        OUT_SEQ: Int
        DEPARTURE: String
        ARRIVAL: String
        FRT_TYPE: String
        ETA: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_STOCK_OUT_SCHEDULE;
