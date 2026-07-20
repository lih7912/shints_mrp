// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_ORDER_MID_SIZE_TEMP = gql`
    type BASE_QRY_KSV_ORDER_MID_SIZE_TEMP {
        USER_ID: String
        PROD_CD: String
        SIZE_VAL: String
        SIZE_QTY: Int
        SIZE_SEQ: Int
        id: Int
    }

    input BASE_INPUT_KSV_ORDER_MID_SIZE_TEMP {
        USER_ID: String
        PROD_CD: String
        SIZE_VAL: String
        SIZE_QTY: Int
        SIZE_SEQ: Int
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_ORDER_MID_SIZE_TEMP;
