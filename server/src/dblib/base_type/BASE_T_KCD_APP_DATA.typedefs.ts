// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_APP_DATA = gql`
    type BASE_QRY_KCD_APP_DATA {
        PO_CD: String
        PAY_DATE: String
        TAXBILL_DATE: String
        BUY_DATE: String
        IN_DATE: String
        PAY_CURR_CD: String
        VENDOR_CD: String
        NEOE_NO: String
        REG_USER: String
        AMOUNT: Float
        NEOE_LINE: Int
        TAXBILL_CD: String
        id: Int
    }

    input BASE_INPUT_KCD_APP_DATA {
        PO_CD: String
        PAY_DATE: String
        TAXBILL_DATE: String
        BUY_DATE: String
        IN_DATE: String
        PAY_CURR_CD: String
        VENDOR_CD: String
        NEOE_NO: String
        REG_USER: String
        AMOUNT: Float
        NEOE_LINE: Int
        TAXBILL_CD: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_APP_DATA;
