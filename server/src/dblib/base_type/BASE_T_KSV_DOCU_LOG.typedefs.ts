// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_DOCU_LOG = gql`
    type BASE_QRY_KSV_DOCU_LOG {
        DOCU_NO: String
        TAX_NO: String
        AGENT_CD: String
        NEOE_AGENT: String
        START_DATE: String
        END_DATE: String
        ISSUE_DATE: String
        TOT_AMT: Float
        ORG_AMT: Float
        VAT: Float
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_DOCU_LOG {
        DOCU_NO: String
        TAX_NO: String
        AGENT_CD: String
        NEOE_AGENT: String
        START_DATE: String
        END_DATE: String
        ISSUE_DATE: String
        TOT_AMT: Float
        ORG_AMT: Float
        VAT: Float
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_DOCU_LOG;
