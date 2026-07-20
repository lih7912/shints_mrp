// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_LC_MST = gql`
    type BASE_QRY_KSV_LC_MST {
        LC_NO: String
        VENDOR_CD: String
        BANK_CD: String
        LC_TYPE: String
        LC_OPEN_AMT: Float
        LC_OPEN_WON: Float
        LC_BANK_TERM: String
        TOLERANCE: Int
        REMAIN_AMT: Float
        REMAIN_WON: Float
        BANK_WON: Float
        BPAY_WON: Float
        SHIP_DATE: String
        END_DATE: String
        CURR_CD: String
        CURR_DATE: String
        EXCH_RATE: Float
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_LC_MST {
        LC_NO: String
        VENDOR_CD: String
        BANK_CD: String
        LC_TYPE: String
        LC_OPEN_AMT: Float
        LC_OPEN_WON: Float
        LC_BANK_TERM: String
        TOLERANCE: Int
        REMAIN_AMT: Float
        REMAIN_WON: Float
        BANK_WON: Float
        BPAY_WON: Float
        SHIP_DATE: String
        END_DATE: String
        CURR_CD: String
        CURR_DATE: String
        EXCH_RATE: Float
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_LC_MST;
