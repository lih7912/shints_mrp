// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_SSV_STOCK_MEM = gql`
    type BASE_QRY_SSV_STOCK_MEM {
        STOCK_IDX: Int
        ORDER_CD: String
        PROD_CD: String
        SIZE: String
        STOCK_QTY: Int
        STOCK_DATETIME: String
        STOCK_TYPE: String
        IO_FLAG: String
        IN_TYPE: String
        OUT_TYPE: String
        REQ_NO: String
        OUT_NO: String
        AGENT_CD: String
        WARE_CD: String
        RET_REQ_NO: String
        REF_STOCK_IDX: Int
        REF_STOCK_QTY: Int
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        END_PRICE: Int
        SALE_RATE: Int
        SALE_PRICE: Int
        TOT_AMT: Int
        ETC_AMT: Int
        OUT_STATUS: String
    }

    input BASE_INPUT_SSV_STOCK_MEM {
        STOCK_IDX: Int
        ORDER_CD: String
        PROD_CD: String
        SIZE: String
        STOCK_QTY: Int
        STOCK_DATETIME: String
        STOCK_TYPE: String
        IO_FLAG: String
        IN_TYPE: String
        OUT_TYPE: String
        REQ_NO: String
        OUT_NO: String
        AGENT_CD: String
        WARE_CD: String
        RET_REQ_NO: String
        REF_STOCK_IDX: Int
        REF_STOCK_QTY: Int
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        END_PRICE: Int
        SALE_RATE: Int
        SALE_PRICE: Int
        TOT_AMT: Int
        ETC_AMT: Int
        OUT_STATUS: String
    }
`;

export default moduleTypedefs_BASE_SSV_STOCK_MEM;
