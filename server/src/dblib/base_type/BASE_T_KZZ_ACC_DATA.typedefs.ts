// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KZZ_ACC_DATA = gql`
    type BASE_QRY_KZZ_ACC_DATA {
        CD_SEQ: Int
        CD_STATUS: Int
        DT_DOCUMENT: String
        DT_REQUEST: String
        DT_ACTUAL: String
        CD_CC: String
        CD_ACCT: String
        NM_CURR: String
        AMT: Float
        VAT: Float
        TOT: Float
        MIN: Float
        ACTUAL: Float
        CD_SUPPLIER: String
        NM_REMARK: String
        NM_ACTOPTION: String
        NM_ACTREMARK: String
        ID_REG: String
        DT_REG: String
        CD_PART: String
        ID_UPD: String
        DT_UPD: String
        ID_GW: String
        DT_GW: String
        ID_END: String
        DT_END: String
        ID_SEND: String
        DT_SEND: String
        CD_TAX: Int
        CD_PAY_TYPE: Int
        CD_REQUEST_TYPE: Int
        CD_GW: String
        CD_BILL: String
        CD_ACDOC: String
        BANK_CD: String
        BANK_NAME: String
        ACCOUNT_NO: String
        ACCOUNT_NAME: String
        SFTCODE: String
        BANK_BRANCH: String
        id: Int
    }

    input BASE_INPUT_KZZ_ACC_DATA {
        CD_SEQ: Int
        CD_STATUS: Int
        DT_DOCUMENT: String
        DT_REQUEST: String
        DT_ACTUAL: String
        CD_CC: String
        CD_ACCT: String
        NM_CURR: String
        AMT: Float
        VAT: Float
        TOT: Float
        MIN: Float
        ACTUAL: Float
        CD_SUPPLIER: String
        NM_REMARK: String
        NM_ACTOPTION: String
        NM_ACTREMARK: String
        ID_REG: String
        DT_REG: String
        CD_PART: String
        ID_UPD: String
        DT_UPD: String
        ID_GW: String
        DT_GW: String
        ID_END: String
        DT_END: String
        ID_SEND: String
        DT_SEND: String
        CD_TAX: Int
        CD_PAY_TYPE: Int
        CD_REQUEST_TYPE: Int
        CD_GW: String
        CD_BILL: String
        CD_ACDOC: String
        BANK_CD: String
        BANK_NAME: String
        ACCOUNT_NO: String
        ACCOUNT_NAME: String
        SFTCODE: String
        BANK_BRANCH: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KZZ_ACC_DATA;
