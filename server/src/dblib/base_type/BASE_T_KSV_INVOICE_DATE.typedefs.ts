// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_INVOICE_DATE = gql`
    type BASE_QRY_KSV_INVOICE_DATE {
        INVOICE_NO: String
        FACTORY_DATE: String
        TRADE_DATE: String
        KOREA_DATE: String
        id: Int
    }

    input BASE_INPUT_KSV_INVOICE_DATE {
        INVOICE_NO: String
        FACTORY_DATE: String
        TRADE_DATE: String
        KOREA_DATE: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_INVOICE_DATE;
