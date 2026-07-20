// MGR_S0114_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0114_1 = gql`
    type T_S0114_1 {
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
        UPD_USER: String
        PERMIT: String
        APPROKEY: String
        NEOE_NO: String
        LEAD_TIME: String
        REMARK: String
        OVERSHORT_RATE: String
        imgURL: String
        fileName: String
        objectName: String
        payCondition: String
        NSR_TR_CD: String
    }

    input I_S0114_1 {
        VENDOR_CD: String
        VENDOR_NAME: String
        VENDOR_TYPE: String
        VENDOR_MATL_TYPE: String
        STATUS_CD: String
        REG_NO: String
        COMPANY_NAME: String
    }

    type Query {
        mgrQueryS0114_1(data: I_S0114_1!): [T_S0114_1!]!
    }
`;

export default moduleTypedefsS0114_1;
