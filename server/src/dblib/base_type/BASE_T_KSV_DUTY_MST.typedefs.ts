// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_DUTY_MST = gql`
    type BASE_QRY_KSV_DUTY_MST {
        INCOME_NO: String
        INCOME_DATE: String
        VENDOR_CD: String
        VENDOR_NAME: String
        ITEM: String
        DUTY_AMT: Int
        RETURN_AMT: Int
        END_FLAG: String
        NO_RET_FLAG: String
        REMARK: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_DUTY_MST {
        INCOME_NO: String
        INCOME_DATE: String
        VENDOR_CD: String
        VENDOR_NAME: String
        ITEM: String
        DUTY_AMT: Int
        RETURN_AMT: Int
        END_FLAG: String
        NO_RET_FLAG: String
        REMARK: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_DUTY_MST;
