// MGR_S0412_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0412_1 = gql`
    type T_S0412_1 {
        PO_CD: String
        ORDER_CD: String
        VENDOR_NAME: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        SHIP_DATE: String
        ETA: String
        PACK_CD: String
        HIS_NO: String
        OUT_QTY: Float
        OUT_FROM: String
        CT_QTY: Int
        CT_NO: String
        REMARK: String
        DELIVERY: String
        IN_TYPE_NAME: String
        MATL_CD: String
        OUT_TYPE_NAME: String
        DEBIT_CD: String
        IN_TYPE: String
        OUT_STATUS: String
        PO_SEQ: Int
        MRP_SEQ: Int
        IN_DATETIME: String
        OUT_DATETIME: String
        VENDOR_CD: String
        VENDOR_TYPE: String
        REG_DATETIME: String
        PACK_CONFIRM: String
        STOCK_IDX: String
    }

    input I_S0412_1 {
        S_ETD: String
        E_ETD: String
        MATL_NAME: String
        BUYER_CD: String
        PO_CD: String
        MATL_CD: String
        SPEC: String
        MATL_TYPE: String
        PL_NO: String
        UESR_ID: String
        COLOR: String
        HIS_NO: String
        VENDOR_CD: String
        PL_NO_UPDATE: String
        HIS_NO_UPDATE: String
        IS_ALL: String
    }

    type T_S0412_CODE {
        VENDOR_TYPE: [BASE_QRY_KCD_CODE!]!
        VENDOR_CD: [BASE_QRY_KCD_VENDOR!]!
        PO_CD: [BASE_QRY_KSV_PO_MST!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        PACK_CD: [BASE_QRY_KSV_STOCK_OUT!]!
        HIS_NO: [BASE_QRY_KSV_STOCK_OUT!]!
        USER_ID: [BASE_QRY_KCD_USER!]!
    }

    type T_S0412_DATA {
        DATA1: [T_S0412_1!]!
        DATA2: [T_S0412_1!]!
    }

    type Query {
        mgrQueryS0412_1(data: I_S0412_1!): T_S0412_DATA!
        mgrQueryS0412_CODE(data: I_S0412_1!): T_S0412_CODE!
    }
`;

export default moduleTypedefs_S0412_1;
