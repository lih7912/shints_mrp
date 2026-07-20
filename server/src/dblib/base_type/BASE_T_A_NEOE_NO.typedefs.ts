// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_A_NEOE_NO = gql`
    type BASE_QRY_A_NEOE_NO {
        PO_CD: String
        ORDER_CD: String
        KRW_AMOUNT: Float
        USD_AMOUNT: Float
        NEOE_NO: String
        NEOE_LINE: String
        FAC_LC_FLAG: String
        TYPE: String
        REG_USER: String
        REG_DATETIME: String
        VENDOR_CD: String
        MINOVER_CD: String
        PAY_REPORT: String
        id: Int
    }

    input BASE_INPUT_A_NEOE_NO {
        PO_CD: String
        ORDER_CD: String
        KRW_AMOUNT: Float
        USD_AMOUNT: Float
        NEOE_NO: String
        NEOE_LINE: String
        FAC_LC_FLAG: String
        TYPE: String
        REG_USER: String
        REG_DATETIME: String
        VENDOR_CD: String
        MINOVER_CD: String
        PAY_REPORT: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_A_NEOE_NO;
