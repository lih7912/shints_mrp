// MGR_S030506_01.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030506_01 = gql`
    type T_S030506_01_PO_MRP {
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
        FACTORY_NAME: String
        STOCK_IDX: String
        REMARK2: String
        PLAN_REMARK: String
        VENDOR_CD: String
        ORDER_CD: String
        PO_SEQ: String
        PO_TYPE: String
        PO_DATE: String
        DELIVERY_DATE: String
        MATERIAL_DUE_DATE: String
        PLACE_CD: String
        BUYER_NAME: String
    }

    type T_S030506_01_DELIVERY_TYPE {
        FACTORY_CD: String
        FACTORY_NAME: String
        DELIVERY_TYPE: String
        DELIVERY_TYPE_N: String
        CURR_DATE: String
    }

    type T_S030506_01 {
        PO_MRP: [T_S030506_01_PO_MRP!]!
        DELIVERY_TYPE: [T_S030506_01_DELIVERY_TYPE!]!
    }

    input I_S030506_01 {
        BUYER_CD: String
        FACTORY_CD: String
        PLACE_CD: String
        PO_CD: String
        PO_SEQ: String
        ORDER_CD: String
        PO_TYPE: String
        END_REMARK: String
        PO_DATE: String
        DELIVERY_DATE: String
        MATERIAL_DUE_DATE: String
    }

    input I_S030506_01_CODE {
        PO_CD: String
    }

    type T_S030506_01_CODE_PO_CD {
        PO_CD: String
        PO_SEQ: String
    }

    type T_S030506_01_CODE {
        PLACE_CD: [BASE_QRY_KCD_PLACE!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        VENDOR_CD: [BASE_QRY_KCD_VENDOR!]!
        FARE_TYPE: [BASE_QRY_KCD_CODE!]!
        REASON_TYPE: [BASE_QRY_KCD_CODE!]!
        DELIVERY_TYPE: [BASE_QRY_KCD_CODE!]!
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
        PO_TYPE: [BASE_QRY_KCD_CODE!]!
    }

    input I_S030506_01_CODE_VENDOR {
        VENDOR_CD: String
    }

    type T_S030506_01_CODE_VENDOR {
        VENDOR_CD: String
        VENDOR_NAME: String
    }

    input I_S030506_01_CODE_BUYER {
        BUYER_CD: String
    }

    type T_S030506_01_CODE_BUYER {
        BUYER_CD: String
        BUYER_NAME: String
    }

    type Query {
        mgrQueryS030506_LIST_1(data: I_S030506_01!): T_S030506_01!
        mgrQueryS030506_01_CODE(data: I_S030506_01_CODE!): T_S030506_01_CODE!
        mgrQueryS030506_01_CODE_VENDOR(
            data: I_S030506_01_CODE_VENDOR!
        ): [T_S030506_01_CODE_VENDOR!]!
        mgrQueryS030506_01_CODE_BUYER(
            data: I_S030506_01_CODE_BUYER!
        ): [T_S030506_01_CODE_BUYER!]!
    }
`;

export default moduleTypedefs_S030506_01;
