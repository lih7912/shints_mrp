// MGR_S030505_01.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030505_01 = gql`
    type T_S030505_01_PO_MRP {
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        MATL_PRICE: String
        CURR_CD: String
        UNIT: String
        STOCK_QTY: String
        PO_QTY: String
        PO_TYPE_NAME: String
        REASON_TYPE: String
        FARE_TYPE: String
        REMARK: String
        VENDOR_NAME: String
        STOCK_STATUS: String
        USE_PO_TYPE: String
        USE_PO_CD: String
        USE_PO_SEQ: String
        USE_ORDER_CD: String
        USE_MRP_SEQ: String
        USE_MATL_SEQ: String
        MATL_SEQ: String
        FACTORY_CD: String
        STOCK_IDX: String
        REMARK2: String
        PLAN_REMARK: String
        VENDOR_CD: String
        ORDER_CD: String
    }

    type T_S030505_01_DELIVERY_TYPE {
        FACTORY_CD: String
        FACTORY_NAME: String
        DELIVERY_TYPE: String
        DELIVERY_TYPE_N: String
        CURR_DATE: String
    }

    type T_S030505_01 {
        PO_MRP: [T_S030505_01_PO_MRP!]!
        DELIVERY_TYPE: [T_S030505_01_DELIVERY_TYPE!]!
    }

    input I_S030505_01 {
        PO_CD: String
        PO_SEQ: String
        ORDER_CD: String
        DELIVERY_TYPE: String
        CURRENCY: String
        USER_ID: String
        FACTORY_CD: String
    }

    input I_S030505_01_CODE {
        PO_CD: String
    }

    type T_S030505_01_CODE_PO_CD {
        PO_CD: String
        PO_SEQ: String
    }

    type T_S030505_01_CODE {
        PO_CD: [T_S030505_01_CODE_PO_CD!]!
        ORDER_CD: [BASE_QRY_KSV_ORDER_MST!]!
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
        VENDOR_CD: [BASE_QRY_KCD_VENDOR!]!
        DELIVERY_TYPE: [BASE_QRY_KCD_CODE!]!
        REASON_TYPE: [BASE_QRY_KCD_CODE!]!
        FARE_TYPE: [BASE_QRY_KCD_CODE!]!
    }

    input I_S030505_01_CODE_VENDOR {
        VENDOR_CD: String
    }

    type T_S030505_01_CODE_VENDOR {
        VENDOR_CD: String
        VENDOR_NAME: String
    }

    type Query {
        mgrQueryS030505_LIST_1(data: I_S030505_01!): T_S030505_01!
        mgrQueryS030505_01_CODE(data: I_S030505_01_CODE!): T_S030505_01_CODE!
        mgrQueryS030505_01_CODE_VENDOR(
            data: I_S030505_01_CODE_VENDOR!
        ): [T_S030505_01_CODE_VENDOR!]!
    }
`;

export default moduleTypedefs_S030505_01;
