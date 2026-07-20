// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_SSV_STOCK_OUT = gql`
    type BASE_QRY_SSV_STOCK_OUT {
        OUT_NO: String
        REQ_NO: String
        AGENT_CD: String
        OUT_DATE: String
        ORDER_CD: String
        PROD_CD: String
        SIZE: String
        OUT_QTY: Int
        END_PRICE: Int
        SALE_RATE: Int
        SALE_PRICE: Int
        TOT_AMT: Int
        ETC_AMT: Int
        OUT_TYPE: String
        OUT_STATUS: String
        STOCK_TYPE: String
        WARE_CD: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        sale_fee: Int
        pay_date: String
        sale_flag: Int
        id: Int
    }

    input BASE_INPUT_SSV_STOCK_OUT {
        OUT_NO: String
        REQ_NO: String
        AGENT_CD: String
        OUT_DATE: String
        ORDER_CD: String
        PROD_CD: String
        SIZE: String
        OUT_QTY: Int
        END_PRICE: Int
        SALE_RATE: Int
        SALE_PRICE: Int
        TOT_AMT: Int
        ETC_AMT: Int
        OUT_TYPE: String
        OUT_STATUS: String
        STOCK_TYPE: String
        WARE_CD: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        sale_fee: Int
        pay_date: String
        sale_flag: Int
        id: Int
    }
`;

export default moduleTypedefs_BASE_SSV_STOCK_OUT;
