// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_SSV_REPAIR_REQ = gql`
    type BASE_QRY_SSV_REPAIR_REQ {
        REQ_NO: String
        REQ_DATE: String
        ORDER_CD: String
        PROD_CD: String
        SIZE: String
        REQ_QTY: Int
        REPAIR_PRICE: Int
        TOT_AMT: Int
        AGENT_CD: String
        WARE_CD: String
        REMARK: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_SSV_REPAIR_REQ {
        REQ_NO: String
        REQ_DATE: String
        ORDER_CD: String
        PROD_CD: String
        SIZE: String
        REQ_QTY: Int
        REPAIR_PRICE: Int
        TOT_AMT: Int
        AGENT_CD: String
        WARE_CD: String
        REMARK: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_SSV_REPAIR_REQ;
