// MGR_S0110_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0110_1 = gql`
    input I_S0110_1 {
        STATUS_CD: String
        BANK_NAME: String
        ACCOUNT_NAME: String
        BANK_TYPE: String
    }

    input I_S0110_2 {
        VENDOR_CD: String
    }
    input I_S0110_3 {
        BANK_CD: String
    }

    type T_S0110_CODE {
        QRY_STATUS_CD: [BASE_QRY_KCD_CODE!]!
        STATUS_CD: [BASE_QRY_KCD_CODE!]!
        BANK_TYPE1: [BASE_QRY_KCD_CODE!]!
    }

    type T_S0110_KCD_BANK {
        BANK_CD: String
        BANK_NAME: String
        ACCOUNT_NO: String
        ACCOUNT_NAME: String
        SFTCODE: String
        ADDR1: String
        ADDR2: String
        BANK_TYPE: String
        BANK_TYPE1: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        BANK_BRANCH: String
        id: Int
        FILE_NAME: String
        STATUS_CD_N: String
        fileName: String
        fileUrl: String
        objectName: String
        bank_typeName: String
    }

    type T_S0110_KCD_VENDOR {
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
        GW_N: String
        VENDOR_TYPE_N: String
    }

    type Query {
        mgrQueryS0110_CODE(data: I_S0110_1!): T_S0110_CODE!
        mgrQueryS0110_1(data: I_S0110_1!): [T_S0110_KCD_BANK!]!
        mgrQueryS0110_2(data: I_S0110_2!): [T_S0110_KCD_VENDOR!]!
        mgrQueryS0110_3(data: I_S0110_3!): [T_S0110_KCD_VENDOR!]!
    }
`;

export default moduleTypedefs_S0110_1;
