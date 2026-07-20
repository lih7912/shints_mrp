// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0114_KCD_VENDOR = gql`
    type T_S0114_KCD_VENDOR_CODE {
        STATUS_CD: [BASE_QRY_KCD_CODE!]!
        VENDOR_TYPE: [BASE_QRY_KCD_CODE!]!
        PAY_TERM: [BASE_QRY_KCD_CODE!]!
        PERMIT: [BASE_QRY_KCD_CODE!]!
        VENDOR_MATL_TYPE: [BASE_QRY_KCD_CODE!]!
        NAT_CD: [BASE_QRY_KCD_NATION!]!
        SHINTS_USER: [BASE_QRY_KCD_USER!]!
        GW_STATUS: [BASE_QRY_KCD_CODE!]!
        OVERSHORT: [BASE_QRY_KCD_CODE!]!
    }

    type T_S0114_KCD_BANK_VENDOR {
        id: Int!
        BANK_CD: String
        BANK_NAME: String
        ACCOUNT_NO: String
        ACCOUNT_NAME: String
        SFTCODE: String
        ADDR1: String
        ADDR2: String
        BANK_TYPE: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        BANK_BRANCH: String
        BANK_TYPE1: String
        FILENAME: String
        GW: String
        GW_N: String
    }

    type Query {
        mgrQuery_S0114_KCD_VENDOR_CODE: T_S0114_KCD_VENDOR_CODE!
        mgrQuery_S0114_KCD_BANK_VENDOR(
            VENDOR_CD: String!
        ): [T_S0114_KCD_BANK_VENDOR!]!
    }

    input I_S0114_KCD_VENDOR_SAVE {
        id: Int
        VENDOR_CD: String
        VENDOR_NAME: String
        INVOICE_NAME: String
        VENDOR_TYPE_NAME: String
        VENDOR_TYPE: String
        VENDOR_MATL_TYPE_NAME: String
        VENDOR_MATL_TYPE: String
        GW_STATUS_NAME: String
        GW: String
        REG_NO: String
        PRESIDENT: String
        USER_NAME: String
        PART: String
        RANK: String
        EMAIL: String
        TEL_NO: String
        FAX_NO: String
        PAY_TYPE: String
        NAT_NAME: String
        NAT_CD: String
        ZIP_NO: String
        ADDR1: String
        ADDR2: String
        STATUS_NAME: String
        STATUS_CD: String
        REG_USER: String
        PERMIT: String
        APPROKEY: String
        NEOE_NO: String
        LEAD_TIME: String
        REMARK: String
        UPD_USER: String
        USER_TAX: String
        EMAIL_TAX: String
        OVERSHORT_RATE: String
        imgURL: String
        fileName: String
        objectName: String
        NSR_TR_CD: String
    }

    type T_S0114_RET {
        id: Int
        CODE: String
    }

    type Mutation {
        mgrInsert_S0114_KCD_VENDOR_SAVE(
            datas: I_S0114_KCD_VENDOR_SAVE!
        ): [T_S0114_RET!]!
        mgrInsert_S0114_KCD_VENDOR_DELETE(
            datas: I_S0114_KCD_VENDOR_SAVE!
        ): [T_S0114_RET!]!
    }
`;

export default moduleTypedefs_S0114_KCD_VENDOR;
