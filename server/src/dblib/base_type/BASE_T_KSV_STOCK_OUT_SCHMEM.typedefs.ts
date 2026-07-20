// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_STOCK_OUT_SCHMEM = gql`
    type BASE_QRY_KSV_STOCK_OUT_SCHMEM {
        OUT_DATE: String
        OUT_SEQ: Int
        MEM_SEQ: Int
        READY_DATE: String
        PO_CD: String
        BUYER_CD: String
        VENDOR_CD: String
        ITEM: String
        WEIGHT: Float
        CBM: Float
        REMARK: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_STOCK_OUT_SCHMEM {
        OUT_DATE: String
        OUT_SEQ: Int
        MEM_SEQ: Int
        READY_DATE: String
        PO_CD: String
        BUYER_CD: String
        VENDOR_CD: String
        ITEM: String
        WEIGHT: Float
        CBM: Float
        REMARK: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_STOCK_OUT_SCHMEM;
