// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_ORDER_TEMP = gql`
    type BASE_QRY_KSV_ORDER_TEMP {
        USER_ID: String
        ORDER_CD: String
        BUYER: String
        STYLE: String
        FACTORY: String
        DUE_DATE: String
        SHIP_DATE: String
        TOT_CNT: Float
        SHIP_CNT: Float
        USD_PRICE: Float
        ORD_AMT: Float
        FC_AMT: Float
        MATL_AMT: Float
        ETC_AMT: Float
        COMM_AMT: Float
        TOT_AMT: Float
        BUYER_TEAM: String
        TYPE: String
        PO_MATL_AMT: Float
        id: Int
    }

    input BASE_INPUT_KSV_ORDER_TEMP {
        USER_ID: String
        ORDER_CD: String
        BUYER: String
        STYLE: String
        FACTORY: String
        DUE_DATE: String
        SHIP_DATE: String
        TOT_CNT: Float
        SHIP_CNT: Float
        USD_PRICE: Float
        ORD_AMT: Float
        FC_AMT: Float
        MATL_AMT: Float
        ETC_AMT: Float
        COMM_AMT: Float
        TOT_AMT: Float
        BUYER_TEAM: String
        TYPE: String
        PO_MATL_AMT: Float
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_ORDER_TEMP;
