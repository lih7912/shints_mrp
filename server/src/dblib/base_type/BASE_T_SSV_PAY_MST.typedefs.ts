// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_SSV_PAY_MST = gql`
    type BASE_QRY_SSV_PAY_MST {
        PAY_IDX: Int
        AGENT_CD: String
        PAY_DATE: String
        PAY_AMT: Float
        IN_AMT: Float
        REM_AMT: Float
        PAY_STATUS: String
        TAX_ISSUE_FLAG: String
        TAX_NO: String
        ISSUE_DATE: String
        ISSUE_USER: String
        REMARK: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        shints_user: String
        docu_no: String
    }

    input BASE_INPUT_SSV_PAY_MST {
        PAY_IDX: Int
        AGENT_CD: String
        PAY_DATE: String
        PAY_AMT: Float
        IN_AMT: Float
        REM_AMT: Float
        PAY_STATUS: String
        TAX_ISSUE_FLAG: String
        TAX_NO: String
        ISSUE_DATE: String
        ISSUE_USER: String
        REMARK: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        shints_user: String
        docu_no: String
    }
`;

export default moduleTypedefs_BASE_SSV_PAY_MST;
