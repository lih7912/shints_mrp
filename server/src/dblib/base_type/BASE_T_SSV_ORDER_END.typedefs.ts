// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_SSV_ORDER_END = gql`
    type BASE_QRY_SSV_ORDER_END {
        ORDER_CD: String
        PROD_CD: String
        END_DATE: String
        SIZE: String
        CT_FROM: Int
        CT_TO: Int
        SIZE_SEQ: Int
        END_CNT: Int
        NAT_CD: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        NET_WEIGHT: Float
        GROSS_WEIGHT: Float
        CBM: Float
        id: Int
    }

    input BASE_INPUT_SSV_ORDER_END {
        ORDER_CD: String
        PROD_CD: String
        END_DATE: String
        SIZE: String
        CT_FROM: Int
        CT_TO: Int
        SIZE_SEQ: Int
        END_CNT: Int
        NAT_CD: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        NET_WEIGHT: Float
        GROSS_WEIGHT: Float
        CBM: Float
        id: Int
    }
`;

export default moduleTypedefs_BASE_SSV_ORDER_END;
