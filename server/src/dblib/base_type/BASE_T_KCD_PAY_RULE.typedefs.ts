// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_PAY_RULE = gql`
    type BASE_QRY_KCD_PAY_RULE {
        SEQ: Int
        CD_CODE: Int
        REMARK: String
        RATE: String
        FLAG: String
        TERM: Int
        FN: String
        YN_DEFAULT: String
        DAYS1: String
        PERCENT1: String
        DAYS2: String
        PERCENT2: String
        DAYS3: String
        PERCENT3: String
        id: Int
    }

    input BASE_INPUT_KCD_PAY_RULE {
        SEQ: Int
        CD_CODE: Int
        REMARK: String
        RATE: String
        FLAG: String
        TERM: Int
        FN: String
        YN_DEFAULT: String
        DAYS1: String
        PERCENT1: String
        DAYS2: String
        PERCENT2: String
        DAYS3: String
        PERCENT3: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_PAY_RULE;
