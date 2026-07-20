// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_SSV_STOCK_REQ = gql`
    type BASE_QRY_SSV_STOCK_REQ {
        REQ_NO: String
        AGENT_CD: String
        REQ_DATE: String
        ORDER_CD: String
        PROD_CD: String
        SIZE: String
        REQ_QTY: Int
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
        out_qty: Int
        out_amt: Int
        not_qty: Int
        not_amt: Int
        not_reason: String
        id: Int
    }

    input BASE_INPUT_SSV_STOCK_REQ {
        REQ_NO: String
        AGENT_CD: String
        REQ_DATE: String
        ORDER_CD: String
        PROD_CD: String
        SIZE: String
        REQ_QTY: Int
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
        out_qty: Int
        out_amt: Int
        not_qty: Int
        not_amt: Int
        not_reason: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_SSV_STOCK_REQ;
