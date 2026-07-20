// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_BUYER_DELETE = gql`
    type BASE_QRY_KCD_BUYER_DELETE {
        BUYER_CD: String
        BUYER_NAME: String
        BUYER_ABBR: String
        BUYER_TEAM: String
        SHINTS_USER: String
        USER_NAME: String
        EMAIL: String
        TEL_NO: String
        FAX_NO: String
        ZIP_NO: String
        ADDR1: String
        ADDR2: String
        COMM_FLAG: String
        SALES_TEAM: String
        NAT_CD: String
        BANK_CD: String
        STS_FLAG: String
        BVT_FLAG: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        NEOE_BUYER_CD: String
        NEOE_A23: String
        loss_flag: String
        glove_flag: String
        id: Int
    }

    input BASE_INPUT_KCD_BUYER_DELETE {
        BUYER_CD: String
        BUYER_NAME: String
        BUYER_ABBR: String
        BUYER_TEAM: String
        SHINTS_USER: String
        USER_NAME: String
        EMAIL: String
        TEL_NO: String
        FAX_NO: String
        ZIP_NO: String
        ADDR1: String
        ADDR2: String
        COMM_FLAG: String
        SALES_TEAM: String
        NAT_CD: String
        BANK_CD: String
        STS_FLAG: String
        BVT_FLAG: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        NEOE_BUYER_CD: String
        NEOE_A23: String
        loss_flag: String
        glove_flag: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_BUYER_DELETE;
