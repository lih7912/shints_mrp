// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_SCD_BANK = gql`
    type BASE_QRY_SCD_BANK {
        BANK_CD: String
        BANK_NAME: String
        ACCOUNT_NO: String
        id: Int
    }

    input BASE_INPUT_SCD_BANK {
        BANK_CD: String
        BANK_NAME: String
        ACCOUNT_NO: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_SCD_BANK;
