// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_SSV_STOCK_RET = gql`
    type BASE_QRY_SSV_STOCK_RET {
        RET_IDX: Int
        RET_REQ_NO: String
        ORDER_CD: String
        PROD_CD: String
        SIZE: String
        RET_QTY: Int
        RET_DATETIME: String
        STOCK_TYPE: String
        IN_TYPE: String
        AGENT_CD: String
        WARE_CD: String
        END_PRICE: Int
        SALE_RATE: Int
        SALE_PRICE: Int
        TOT_AMT: Int
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        sale_fee: Int
        pay_date: String
        sale_flag: String
    }

    input BASE_INPUT_SSV_STOCK_RET {
        RET_IDX: Int
        RET_REQ_NO: String
        ORDER_CD: String
        PROD_CD: String
        SIZE: String
        RET_QTY: Int
        RET_DATETIME: String
        STOCK_TYPE: String
        IN_TYPE: String
        AGENT_CD: String
        WARE_CD: String
        END_PRICE: Int
        SALE_RATE: Int
        SALE_PRICE: Int
        TOT_AMT: Int
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        sale_fee: Int
        pay_date: String
        sale_flag: String
    }
`;

export default moduleTypedefs_BASE_SSV_STOCK_RET;
