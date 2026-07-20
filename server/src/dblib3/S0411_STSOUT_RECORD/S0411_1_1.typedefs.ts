// MGR_S0411_1_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0411_1_1 = gql`
    type T_S0411_1_1 {
        PO_CD: String
        ORDER_CD: String
        VENDOR_NAME: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        IN_DATE: String
        INFAC_QTY: Float
        REMAIN_QTY: Float
        OUT_QTY: Float
        IN_TYPE_NAME: String
        MATL_CD: String
        IN_TYPE: String
        PO_SEQ: Int
        MRP_SEQ: Int
        IN_DATETIME: String
        REG_USER: String
        VENDOR_CD: String
        VENDOR_TYPE: String
        MATL_SEQ: Int
    }

    input I_S0411_1_1 {
        S_IN_DATE: String
        E_IN_DATE: String
        VENDOR_TYPE: String
        VENDOR_CD: String
        USER_ID: String
        PO_CD: String
    }

    type T_S0411_CODE {
        RECEIVER: [BASE_QRY_KCD_RECEIVER!]!
        VENDOR_TYPE: [BASE_QRY_KCD_CODE!]!
        VENDOR_CD: [BASE_QRY_KCD_VENDOR!]!
        PO_CD: [BASE_QRY_KSV_PO_MST!]!
        OUT_TYPE: [BASE_QRY_KCD_CODE!]!
        DELIVERY_TYPE: [BASE_QRY_KCD_CODE!]!

        USER_ID: [BASE_QRY_KCD_USER!]!
        FROM_TYPE: [BASE_QRY_KCD_CODE!]!
        REASON_TYPE: [BASE_QRY_KCD_CODE!]!
        CHARGE1: [BASE_QRY_KCD_CODE!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        BUYER_TEAM: [BASE_QRY_KCD_CODE!]!
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
    }

    type T_S0411_CODE_1 {
        MAX_SEQ: String!
    }

    input I_S0411_CODE_1 {
        PACK_CD: String
    }

    type Query {
        mgrQueryS0411_1_1(data: I_S0411_1_1!): [T_S0411_1_1!]!
        mgrQueryS0411_CODE(data: I_S0411_1_1!): T_S0411_CODE!
        mgrQueryS0411_CODE_1(data: I_S0411_CODE_1!): T_S0411_CODE_1!
    }
`;

export default moduleTypedefs_S0411_1_1;
