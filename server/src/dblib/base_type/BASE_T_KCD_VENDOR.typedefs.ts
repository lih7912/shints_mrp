// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_VENDOR = gql`
    type BASE_QRY_KCD_VENDOR {
        VENDOR_CD: String
        VENDOR_NAME: String
        INVOICE_NAME: String
        VENDOR_TYPE: String
        SHINTS_USER: String
        REG_NO: String
        PRESIDENT: String
        USER_NAME: String
        PART: String
        RANK: String
        EMAIL: String
        TEL_NO: String
        FAX_NO: String
        PAY_TYPE: String
        PAY_TERM: Int
        LEAD_TIME: String
        BANK_CD: String
        NAT_CD: String
        ZIP_NO: String
        ADDR1: String
        ADDR2: String
        STATUS_CD: String
        PERMIT: String
        VENDOR_MATL_TYPE: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        BANK1: String
        BANK2: String
        GW: String
        APPROKEY: String
        BANK_CD2: String
        BANK_CD3: String
        NEOE_NO: String
        REMARK: String
        id: Int
    }

    input BASE_INPUT_KCD_VENDOR {
        VENDOR_CD: String
        VENDOR_NAME: String
        INVOICE_NAME: String
        VENDOR_TYPE: String
        SHINTS_USER: String
        REG_NO: String
        PRESIDENT: String
        USER_NAME: String
        PART: String
        RANK: String
        EMAIL: String
        TEL_NO: String
        FAX_NO: String
        PAY_TYPE: String
        PAY_TERM: Int
        LEAD_TIME: String
        BANK_CD: String
        NAT_CD: String
        ZIP_NO: String
        ADDR1: String
        ADDR2: String
        STATUS_CD: String
        PERMIT: String
        VENDOR_MATL_TYPE: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        BANK1: String
        BANK2: String
        GW: String
        APPROKEY: String
        BANK_CD2: String
        BANK_CD3: String
        NEOE_NO: String
        REMARK: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_VENDOR;
