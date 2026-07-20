// MGR_S030503.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030503 = gql`
    type T_S030503 {
        ORDER_CD: String
        STYLE_NAME: String
        BUYER_NAME: String
        TOT_CNT: String
        DUE_DATE: String
        FACTORY_NAME: String
        FACTORY_CD: String
        PO_LOG_TYPE: String
        PO_LOG_TYPE_N: String
    }

    input I_S030503 {
        PO_CD: String
        PO_SEQ: String
        MATL_CD: String
        PO_LOG_TYPE: String
    }

    type T_S030503_CODE_PO_SEQ {
        PO_SEQ: String
        PO_SEQ_N: String
    }

    type T_S030503_CODE {
        VENDOR_CD: [BASE_QRY_KCD_VENDOR!]!
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
        TYPE2: [BASE_QRY_KCD_MATL_TYPE2!]!
        STATUS_CD: [BASE_QRY_KCD_CODE!]!
        PO_STATUS: [BASE_QRY_KCD_CODE!]!
        PO_MST: [BASE_QRY_KSV_PO_MST!]!
        PO_SEQ: [T_S030503_CODE_PO_SEQ!]!
        PO_LOG_TYPE: [BASE_QRY_KCD_CODE!]!
    }

    type Query {
        mgrQueryS030503(data: I_S030503!): [T_S030503!]!
        mgrQueryS030503_CODE(data: I_S030503!): T_S030503_CODE!
    }
`;

export default moduleTypedefs_S030503;
