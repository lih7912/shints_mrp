// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KZZ_ETC_COST_AMT = gql`
    type BASE_QRY_KZZ_ETC_COST_AMT {
        ETC_CD: String
        ETC_SEQ: Int
        SEQ: Int
        YY: Int
        ETC_DATE: String
        BUYER_CD: String
        ETC_TYPE: String
        VAT: Float
        WITHOUT_TAX: Float
        ETC_AMOUNT: Float
        CURR_CD: String
        ACCOUNT_CD: String
        ACCOUNT: String
        ACCOUNT_BANK: String
        REMARK: String
        END_FLAG: String
        END_USER: String
        END_DATE: String
        REG_USER: String
        REG_DATETIME: String
        TAX: String
        BILL_CD: String
        KIND: Int
        PAY_DATE: String
        PAY_TYPE: String
        id: Int
    }

    input BASE_INPUT_KZZ_ETC_COST_AMT {
        ETC_CD: String
        ETC_SEQ: Int
        SEQ: Int
        YY: Int
        ETC_DATE: String
        BUYER_CD: String
        ETC_TYPE: String
        VAT: Float
        WITHOUT_TAX: Float
        ETC_AMOUNT: Float
        CURR_CD: String
        ACCOUNT_CD: String
        ACCOUNT: String
        ACCOUNT_BANK: String
        REMARK: String
        END_FLAG: String
        END_USER: String
        END_DATE: String
        REG_USER: String
        REG_DATETIME: String
        TAX: String
        BILL_CD: String
        KIND: Int
        PAY_DATE: String
        PAY_TYPE: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KZZ_ETC_COST_AMT;
