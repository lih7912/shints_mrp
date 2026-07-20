// MGR_S0519_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0519_2 = gql`
    type T_S0519_2 {
        ATA: String
        STATUS_CD_N: String
        BL_NO: String
        CLEARANCE_NO: String
        BUYER_CD: String
        PO_CD: String
        VENDOR_NAME: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        S_OUT_QTY: String
        REG_USER: String
        SHIPMENT_CD: String
        REMARK: String
        SHIP_MODE: String
        STSOUT_CD: String
        VENDOR_CD: String
        DELIVERY_TYPE: String
        PAYER: String
        FACIN_QTY: String
        SHORTAGE_QTY: String
        DEFECT_QTY: String
        FILE_NAME: String
        FILE_URL: String
        STATUS_CD: String
        BAL_QTY: String
        UPDATE_QTY: String
    }

    type T_S0519_2_1 {
        ATA: String
        BUYER_CD: String
        VENDOR_NAME: String
        USER_ID: String
        DELIVERY_TYPE: String
        DELIVERY_TYPE_N: String
        BL_NO: String
        ORIGIN_PORT: String
        PO_CD: String

        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        S_OUT_QTY: String
        SHORTAGE_QTY: String
        DEFECT_QTY: String
        FACIN_QTY: String
        LOCATION: String

        WEIGHT: String
        CBM: String
        CT_QTY: String
        MC_ID: String
        PU_CD: String
        STATUS_CD: String
        STATUS_CD_N: String
        FACTORY_CD: String
        FACTORY_CD_N: String
        SHIPMENT_CD: String
        CLEARANCE_NO: String
        SHIP_MODE: String
        SHIP_MODE_N: String
        STSOUT_CD: String
        VENDOR_CD: String
        FILE_NAME: String
        FILE_URL: String
        FACIN_DATE: String
        FACIN_CD: String

        PACK_CD: String
        DELIVERY: String
        INSPECT_DATE: String
    }

    input I_S0519_2 {
        IS_BVT: String
        IS_ETP: String
        STATUS_CD: String
        BUYER_CD: String
        BL_NO: String
        REMARK: String
        PU_NO: String
        S_ATA: String
        E_ATA: String
        USER_ID: String
        MC_ID: String
        PO_CD: String
        SHIPMENT_CD: String
        CUSTOMS_NO: String
        FACIN_DATE: String

        DESCRIPTION: String
        MATL_CD: String
        SPEC: String
        COLOR: String
        UNIT: String
        SUPPLIER: String
    }

    type Query {
        mgrQueryS0519_2(data: I_S0519_2!): [T_S0519_2_1!]!
        mgrQueryS0519_2_260203(data: I_S0519_2!): [T_S0519_2_1!]!
        mgrQueryS0519_2_bak(data: I_S0519_2!): [T_S0519_2!]!
        mgrQueryS0519_2_bak1(data: I_S0519_2!): [T_S0519_2!]!
    }
`;

export default moduleTypedefs_S0519_2;
