// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_APP_IMPORT = gql`
    type BASE_QRY_KCD_APP_IMPORT {
        PAY_REPORT: String
        LC_REPORT: String
        SEQ: Int
        CURR_CD: String
        AMT: Float
        PAY_DATE: String
        VENDOR_CD: String
        NEOE_NO: String
        NEOE_CD: String
        LC_FLAG: String
        SINYONG: String
        NEOE_LINE: Int
        REG_USER: String
        id: Int
    }

    input BASE_INPUT_KCD_APP_IMPORT {
        PAY_REPORT: String
        LC_REPORT: String
        SEQ: Int
        CURR_CD: String
        AMT: Float
        PAY_DATE: String
        VENDOR_CD: String
        NEOE_NO: String
        NEOE_CD: String
        LC_FLAG: String
        SINYONG: String
        NEOE_LINE: Int
        REG_USER: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_APP_IMPORT;
