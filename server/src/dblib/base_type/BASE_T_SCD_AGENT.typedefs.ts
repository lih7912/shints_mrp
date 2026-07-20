// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_SCD_AGENT = gql`
    type BASE_QRY_SCD_AGENT {
        AGENT_CD: String
        AGENT_NAME: String
        AGENT_TYPE: String
        AGENT_TYPE2: String
        PAY_TYPE: String
        SALE_RATE: Int
        BUSINESS_NO: String
        BUSINESS_TYPE1: String
        BUSINESS_TYPE2: String
        PRESIDENT: String
        USER_NAME: String
        TEL_NO: String
        PART: String
        RANK: String
        FAX_NO: String
        MOBILE_NO: String
        AREA1: String
        AREA2: String
        AREA3: String
        EMAIL: String
        SHINTS_USER: String
        KB_ACCOUNT_NO: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        id: Int
    }

    input BASE_INPUT_SCD_AGENT {
        AGENT_CD: String
        AGENT_NAME: String
        AGENT_TYPE: String
        AGENT_TYPE2: String
        PAY_TYPE: String
        SALE_RATE: Int
        BUSINESS_NO: String
        BUSINESS_TYPE1: String
        BUSINESS_TYPE2: String
        PRESIDENT: String
        USER_NAME: String
        TEL_NO: String
        PART: String
        RANK: String
        FAX_NO: String
        MOBILE_NO: String
        AREA1: String
        AREA2: String
        AREA3: String
        EMAIL: String
        SHINTS_USER: String
        KB_ACCOUNT_NO: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_SCD_AGENT;
