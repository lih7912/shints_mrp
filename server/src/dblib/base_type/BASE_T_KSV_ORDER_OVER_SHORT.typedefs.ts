// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_ORDER_OVER_SHORT = gql`
    type BASE_QRY_KSV_ORDER_OVER_SHORT {
        ORDER_CD: String
        VMD_QTY: String
        VMD_SUB_QTY: String
        SMD_QTY: String
        CONFIRM_FLAG: String
        CONFIRM_AMT: String
        STS_COMMENT: String
        BVT_COMMENT: String
        CONFIRM_USER: String
        CONFIRM_DATETIME: String
        END_FLAG: String
        END_DATE: String
        SUP_QTY: String
        BUYER_QTY: String
        STS_QTY: String
        id: Int
    }

    input BASE_INPUT_KSV_ORDER_OVER_SHORT {
        ORDER_CD: String
        VMD_QTY: String
        VMD_SUB_QTY: String
        SMD_QTY: String
        CONFIRM_FLAG: String
        CONFIRM_AMT: String
        STS_COMMENT: String
        BVT_COMMENT: String
        CONFIRM_USER: String
        CONFIRM_DATETIME: String
        END_FLAG: String
        END_DATE: String
        SUP_QTY: String
        BUYER_QTY: String
        STS_QTY: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_ORDER_OVER_SHORT;
