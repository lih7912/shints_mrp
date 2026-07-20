// S030516_1.typedefs.ts

import { gql } from 'apollo-server';

const moduleTypedefs_S030516_1 = gql`
    type T_S030516_CODE_PO_CD {
        PO_CD: String
    }

    type T_S030516_CODE {
        MATL_TYPE: [BASE_QRY_KCD_CODE!]!
        VENDOR_TYPE: [BASE_QRY_KCD_CODE!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        PO_CD: [T_S030516_CODE_PO_CD!]!
        VENDOR_CD: [BASE_QRY_KCD_VENDOR!]!
    }

    input I_S030516_CODE {
        BUYER_CD: String
    }

    input I_S030516_LIST_1 {
        DATE_KIND: String
        S_DATE: String
        E_DATE: String
        PO_CD: String
        BUYER_CD: String
        VENDOR_CD: String
        MATL_TYPE: String
        VENDOR_TYPE: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        MATL_CD: String
        DOWNLOAD_KIND: String
    }

    type T_S030516_LIST_1 {
        PO_CD: String
        ORDER_CD: String
        STYLE_NAME: String
        VENDOR_NAME: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        MATL_CD: String
        CURR_CD: String
        MATL_PRICE: Float
        TOT_AMT: Float
        EXP_USEQTY: Float
        EXP_POQTY: Float
        ORDER_DATE: String
        MATL_DUE_DATE: String
    }

    type T_S030516_LIST_1_COUNT {
        ROW_CNT: Int
    }

    input I_S030516_PO_BY_BUYER {
        BUYER_CD: String
    }

    input I_S030516_VENDOR_BY_PO {
        PO_CD: String
    }

    type O_S030516_REPORT_RET {
        id: String
        CODE: String
    }

    type Query {
        mgrQueryS030516_CODE(data: I_S030516_CODE!): T_S030516_CODE!
        mgrQueryS030516_LIST_1(data: I_S030516_LIST_1!): [T_S030516_LIST_1!]!
        mgrQueryS030516_LIST_1_COUNT(data: I_S030516_LIST_1!): T_S030516_LIST_1_COUNT!
        mgrQueryS030516_PO_BY_BUYER(data: I_S030516_PO_BY_BUYER!): [T_S030516_CODE_PO_CD!]!
        mgrQueryS030516_VENDOR_BY_PO(data: I_S030516_VENDOR_BY_PO!): [BASE_QRY_KCD_VENDOR!]!
        mgrQueryS030516_REPORT(data: I_S030516_LIST_1!): [O_S030516_REPORT_RET!]!
    }
`;

export default moduleTypedefs_S030516_1;
