// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_BANK = gql`
    type BASE_QRY_KCD_BANK {
        BANK_CD: String
        BANK_NAME: String
        ACCOUNT_NO: String
        ACCOUNT_NAME: String
        SFTCODE: String
        ADDR1: String
        ADDR2: String
        BANK_TYPE: String
        BANK_TYPE1: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        BANK_BRANCH: String
        id: Int
    }

    input BASE_INPUT_KCD_BANK {
        BANK_CD: String
        BANK_NAME: String
        ACCOUNT_NO: String
        ACCOUNT_NAME: String
        SFTCODE: String
        ADDR1: String
        ADDR2: String
        BANK_TYPE: String
        BANK_TYPE1: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        BANK_BRANCH: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_BANK;
