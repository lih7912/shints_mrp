// MGR_S0440_2_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0440_2_1 = gql`
    type T_S0440_2_1_MATL {
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        MATL_PRICE: String
        CURR_CD: String
        UNIT: String
        PO_QTY: String
        VENDOR_NAME: String
    }

    type T_S0440_2_1 {
        STSOUT_CD: String
        SHIPMENT_CD: String
        INVOICE_NO: String
        READY_DATE: String
        ORIGIN_PORT: String
        DESTINATION: String
        SHIP_MODE: String
        CT_QTY: String
        WEIGHT: String
        CBM: String
        BUYER_CD: String
        DESCRIPTION: String
        REMARK: String
        TARGET_ETA: String
        SHIP_DATE: String

        SENDER: String
        RECEIVER: String
        BL_NO: String
        AMOUNT: String
        PAYMENT: String

        SHIP_MODE_N: String
        REG_USER: String
        BUYER_NAME: String
        PO_CD2: String
        VENDOR_CD: String
        VENDOR_NAME: String
        TRADE_TERM: String
        EXP_DELIVERY_DATE: String
        PU_CD: String
        TARGET_ETD: String

        ORG_ORIGIN_PORT: String
        ORG_DESTINATION: String
        MATL_INFO: [T_S0440_2_1_MATL!]!
    }

    input I_S0440_2_1 {
        S_READY_DATE: String
        E_READY_DATE: String
        ORIGIN_PORT: String
    }

    type Query {
        mgrQueryS0440_2_1(data: I_S0440_2_1!): [T_S0440_2_1!]!
    }
`;

export default moduleTypedefs_S0440_2_1;
