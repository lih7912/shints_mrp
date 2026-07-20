// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_DC_AMOUNT = gql`
    type BASE_QRY_KSV_DC_AMOUNT {
        END_DATE: String
        PAY_DATE: String
        VENDOR_CD: String
        DC_AMOUNT: Float
        DN_AMOUNT: Float
        CURR_CD: String
        BILL_FLAG: String
        BILL_DATE: String
        CRDB_CD: String
        buy_date: String
        CALC_FLAG: String
        TT_FLAG: String
        PUR_FACTORY: String
        PAY_REPORT: String
        CURR_RATE: Float
        KRW_AMOUNT: Float
        id: Int
    }

    input BASE_INPUT_KSV_DC_AMOUNT {
        END_DATE: String
        PAY_DATE: String
        VENDOR_CD: String
        DC_AMOUNT: Float
        DN_AMOUNT: Float
        CURR_CD: String
        BILL_FLAG: String
        BILL_DATE: String
        CRDB_CD: String
        buy_date: String
        CALC_FLAG: String
        TT_FLAG: String
        PUR_FACTORY: String
        PAY_REPORT: String
        CURR_RATE: Float
        KRW_AMOUNT: Float
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_DC_AMOUNT;
