// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0216_SALES_MATL_PLAN_QRY = gql`
    input I_S0216_SALES_MATL_PLAN_QRY_QRY_KSV_ORDER_PLAN {
        USER_NAME: String
        BUYER_CD: String
        COLLECTION_CD: String
        YEAR: String
        MONTH: String
        TYPE: String
        CUR: String
        FACTORY_CD: String
    }

    type T_S0216_SALES_MATL_PLAN_QRY_TBL_KSV_ORDER_MST {
        LINE_TYPE: String
        LINE_TYPE_N: String
        YYMM: String
        PLAN_QTY: String
        PLAN_PRICE: String
        PLAN_AMT: String
        CM_PRICE: String
        CM_AMT: String
        CURR_CD: String
        USER_ID: String
        ORDER_QTY: String
        ORDER_AMT: String
        CURR_CM_AMT: String
        OLD_ORDER_QTY: String
        OLD_ORDER_AMT: String
        OLD_CM_AMT: String
    }

    type T_S0216_COLLECTION {
        COLLECTION: String
        COLLECTION_N: String
    }

    type T_S0216_SALES_MATL_PLAN_QRY_CODE {
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
        COLLECTION: [T_S0216_COLLECTION!]!
        CURR_CD: [BASE_QRY_KCD_CODE!]!
        LINE_TYPE: [BASE_QRY_KCD_CODE!]!
        YY: [BASE_QRY_KCD_CODE!]!
        MM: [BASE_QRY_KCD_CODE!]!
    }

    input I_S0216_SALES_MATL_PLAN_LIST_QRY_KSV_ORDER_PLAN {
        S_DATE: String
        E_DATE: String
        USER_CD: String
        BUYER_CD: String
        TEAM_CD: String
        FACTORY_CD: String
        TYPE: String
        CUR: String
    }

    type T_S0216_RET_EXCEL {
        id: Int
        CODE: String
    }

    type Query {
        mgrQuery_S0216_LIST1 (
            data: I_S0216_SALES_MATL_PLAN_QRY_QRY_KSV_ORDER_PLAN!
        ): [T_S0216_SALES_MATL_PLAN_QRY_TBL_KSV_ORDER_MST!]!
        mgrQuery_S0216_CODE: T_S0216_SALES_MATL_PLAN_QRY_CODE!
        mgrQuery_S0216_EXCEL_PRINT(
            data: I_S0216_SALES_MATL_PLAN_LIST_QRY_KSV_ORDER_PLAN!
        ): [T_S0216_RET_EXCEL!]!
        mgrQuery_S0216_EXCEL_PRINT_TOT(
            data: I_S0216_SALES_MATL_PLAN_LIST_QRY_KSV_ORDER_PLAN!
        ): [T_S0216_RET_EXCEL!]!

    }
`;

export default moduleTypedefs_S0216_SALES_MATL_PLAN_QRY;
