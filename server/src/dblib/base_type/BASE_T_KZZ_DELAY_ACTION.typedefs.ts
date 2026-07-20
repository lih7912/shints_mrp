// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KZZ_DELAY_ACTION = gql`
    type BASE_QRY_KZZ_DELAY_ACTION {
        PO_CD: String
        SEQ: Int
        MATL_CD: String
        PO_CONF_DATE: String
        ORG_ETD: String
        ORG_ETA: String
        NEED_QTY: Float
        IN_QTY: Float
        OUT_QTY: Float
        REMAIN_QTY: Float
        SHIP_QTY: Float
        EX_IN_DATE: String
        CUT_DATE: String
        ETD: String
        ETA: String
        DELAY_REASON: String
        DELIVERY_TYPE: String
        FARE_TYPE: String
        REMARK: String
        TYPE: String
        BUYER_CD: String
        ACTION_FLAG: String
        ADP_FLAG: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KZZ_DELAY_ACTION {
        PO_CD: String
        SEQ: Int
        MATL_CD: String
        PO_CONF_DATE: String
        ORG_ETD: String
        ORG_ETA: String
        NEED_QTY: Float
        IN_QTY: Float
        OUT_QTY: Float
        REMAIN_QTY: Float
        SHIP_QTY: Float
        EX_IN_DATE: String
        CUT_DATE: String
        ETD: String
        ETA: String
        DELAY_REASON: String
        DELIVERY_TYPE: String
        FARE_TYPE: String
        REMARK: String
        TYPE: String
        BUYER_CD: String
        ACTION_FLAG: String
        ADP_FLAG: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KZZ_DELAY_ACTION;
