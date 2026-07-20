// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0302_MATL_SEARCH = gql`
    input I_S0302_MATL_SEARCH_QRY_KCD_MATL_MST {
        MATL_NAME: String
        COLOR: String
        MATL_CD: String
        SPEC: String
        VENDOR_CD: String
    }
    type T_S0302_MATL_SEARCH_TBL_KCD_MATL_MST {
        MATL_TYPE2: String
        MATL_TYPE2_NAME: String
        MATL_CD: String
        MATL_TYPE: String
        MATL_TYPE_NAME: String
        VENDOR_CD: String
        VENDOR_NAME: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        UNIT_NAME: String
        MATL_PRICE: String
        CURR_CD: String
        S_MATL_PRICE: String
        S_CURR_CD: String
        WEIGHT: String
        BOX_UNIT: String
        BOX_UNIT_NAME: String
        STATUS_CD: String
        STATUS_NAME: String
        UPD_USER: String
        REG_USER: String
        VENDOR_TYPE: String
        HS_CD: String
        ADD_RATE: String
        ADD_AMT: String
        ADD_LOSS: String
        REG_DATETIME: String
        STATUS_CD_NAME: String
        VENDOR_STATUS_CD: String
    }

    type T_S0302_MATL_SEARCH_TBL_KCD_MATL_MST1 {
        MATL_CD: String
        PROD_CD: String
        STYLE_NAME: String
        NET: String
        LOSS: String
        USE_SIZE: String
        REMARK: String
        ORDER_CD: String
        PO_CD: String
    }

    input I_S0302_EXCEL {
        MATL_CD: String
    }

    type T_S0302_EXCEL {
        id: Int
        CODE: String
    }

    type Query {
        mgrQuery_S0302_MATL_SEARCH_TBL_KCD_MATL_MST(
            data: I_S0302_MATL_SEARCH_QRY_KCD_MATL_MST!
        ): [T_S0302_MATL_SEARCH_TBL_KCD_MATL_MST!]!
        mgrQuery_S0302_MATL_SEARCH_TBL_KCD_MATL_MST1(
            data: I_S0302_MATL_SEARCH_QRY_KCD_MATL_MST!
        ): [T_S0302_MATL_SEARCH_TBL_KCD_MATL_MST1!]!
        mgrQuery_S0302_EXCEL(data: I_S0302_EXCEL!): [T_S0302_EXCEL!]!
    }
`;

export default moduleTypedefs_S0302_MATL_SEARCH;
