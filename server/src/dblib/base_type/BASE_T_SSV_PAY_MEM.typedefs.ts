// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_SSV_PAY_MEM = gql`
    type BASE_QRY_SSV_PAY_MEM {
        PAY_IDX: Int
        PAYM_IDX: Int
        AGENT_CD: String
        PAY_DATE: String
        IN_DATE: String
        IN_AMT: Float
        PAY_STATUS: String
        PAY_TYPE: String
        PAY_USER: String
        BANK_CD: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        shints_user: String
    }

    input BASE_INPUT_SSV_PAY_MEM {
        PAY_IDX: Int
        PAYM_IDX: Int
        AGENT_CD: String
        PAY_DATE: String
        IN_DATE: String
        IN_AMT: Float
        PAY_STATUS: String
        PAY_TYPE: String
        PAY_USER: String
        BANK_CD: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        shints_user: String
    }
`;

export default moduleTypedefs_BASE_SSV_PAY_MEM;
