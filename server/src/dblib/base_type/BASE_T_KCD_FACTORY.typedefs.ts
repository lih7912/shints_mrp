// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_FACTORY = gql`
    type BASE_QRY_KCD_FACTORY {
        FACTORY_CD: String
        FACTORY_NAME: String
        FACTORY_NAME2: String
        USER_NAME: String
        EMAIL: String
        COUNTRY: String
        TEL_NO: String
        FAX_NO: String
        ZIP_NO: String
        ADDR1: String
        ADDR2: String
        PORT: String
        AIRPORT: String
        NAT_CD: String
        BANK_CD: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        tag_po: String
        tag_order: String
        place_cd: String
        PACK_NAME: String
        id: Int
    }

    input BASE_INPUT_KCD_FACTORY {
        FACTORY_CD: String
        FACTORY_NAME: String
        FACTORY_NAME2: String
        USER_NAME: String
        EMAIL: String
        COUNTRY: String
        TEL_NO: String
        FAX_NO: String
        ZIP_NO: String
        ADDR1: String
        ADDR2: String
        PORT: String
        AIRPORT: String
        NAT_CD: String
        BANK_CD: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        tag_po: String
        tag_order: String
        place_cd: String
        PACK_NAME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_FACTORY;
