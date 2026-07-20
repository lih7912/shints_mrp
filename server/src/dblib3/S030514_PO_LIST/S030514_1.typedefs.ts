// MGR_S030514_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기

const moduleTypedefs_S030514_1 = gql`
    input I_S030514_CODE {
        PO_CD: String
    }

    type T_S030514_CODE_PO_CD {
        PO_CD: String
        PO_NAME: String
    }

    type T_S030514_CODE {
        PO_CD: [T_S030514_CODE_PO_CD!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
        ORDER_KIND: [BASE_QRY_KCD_CODE!]!
    }

    input I_S030514_LIST_1 {
        PO_CD: String
        IS_PRICE: String
        ORDER_CD: String
        BUYER_CD: String
        FACTORY_CD: String
        ORDER_KIND: String
    }

    type T_S030514_LIST_1 {
        REG_USER: String
        PO_CD: String
        PO_STATUS: String
        PO_DATE: String
        VENDOR_NAME: String
        PR_NUM: String
        MATL_CD: String
        COLOR: String
        MATL_NAME: String
        SPEC: String
        UNIT: String
        TOT_CNT: String
        STOCK_QTY: String
        BAL: String
        REMARK: String
        STOCK_QTY1: String
        REMARK1: String
    }

    type T_S030514_LIST_2 {
        FILE_NAME: String
        FILE_URL: String
        TITLE: String
        UPD_DATETIME: String
        UPD_USER: String
    }

    input I_S030514_QRY_PO {
        PO_CD: String
    }

    type T_S030514_QRY_PO {
        PO_CD: String
        PO_NAME: String
    }

    input I_S030514_QRY_BUYER {
        BUYER_CD: String
    }

    type T_S030514_QRY_BUYER {
        BUYER_CD: String
        BUYER_NAME: String
    }

    type Query {
        mgrQueryS030514_CODE(data: I_S030514_CODE!): T_S030514_CODE!
        mgrQueryS030514_QRY_PO(data: I_S030514_QRY_PO!): [T_S030514_QRY_PO!]!
        mgrQueryS030514_QRY_BUYER(
            data: I_S030514_QRY_BUYER!
        ): [T_S030514_QRY_BUYER!]!
        mgrQueryS030514_QRY_PO_BY_BUYER(
            data: I_S030514_QRY_BUYER!
        ): [T_S030514_QRY_PO!]!
        mgrQueryS030514_LIST_1(data: I_S030514_LIST_1!): [T_S030514_LIST_1!]!
        mgrQueryS030514_LIST_2(data: I_S030514_LIST_1!): [T_S030514_LIST_2!]!
        mgrQueryS030514_LIST_3(data: I_S030514_LIST_1!): [T_S030514_LIST_2!]!
    }
`;

export default moduleTypedefs_S030514_1;
