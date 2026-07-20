// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0217_SALES_MATL_PLAN_LIST = gql`
    input I_S0217_SALES_MATL_PLAN_LIST_QRY_KSV_ORDER_PLAN {
        S_DATE: String
        E_DATE: String
        USER_CD: String
        BUYER_CD: String
        TEAM_CD: String
        FACTORY_CD: String
        TYPE: String
        REPORT_KIND: String
    }

    type T_S0217_SALES_MATL_PLAN_LIST_SUM_BY_LINE {
        LINE_TYPE: String
        LINE_QTY: String
        LINE_AMT: String
    }

    type T_S0217_SALES_MATL_PLAN_LIST_SUM_BY_YYMM {
        YYMM: String
        YYMM_QTY: String
        YYMM_AMT: String
    }

    type T_S0217_SALES_MATL_PLAN_LIST_TBL_KSV_ORDER_MST {
        USER_ID: String
        USER_NAME: String
        BUYER_CD: String
        BUYER_NAME: String
        COLLECTION: String
        CURR_CD: String
        TOTAL_QTY: String
        TOTAL_AMT: String
        LINE_SUM: [T_S0217_SALES_MATL_PLAN_LIST_SUM_BY_LINE!]!
    }

    type T_S0217_SALES_MATL_PLAN_LIST_TBL_KSV_ORDER_MST1 {
        COLLECTION: String
        CURR_CD: String
        YYMM_SUM: [T_S0217_SALES_MATL_PLAN_LIST_SUM_BY_YYMM!]!
    }

    type T_S0217_SALES_MATL_PLAN_LIST_CODE {
        S_DATE: [BASE_QRY_KCD_CODE!]!
        E_DATE: [BASE_QRY_KCD_CODE!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
        USER: [BASE_QRY_KCD_USER!]!
        TEAM: [BASE_QRY_KCD_CODE!]!
    }

    type T_S0217_RET_EXCEL {
        id: Int
        CODE: String
    }

    type Query {
        mgrQuery_S0217_SALES_MATL_PLAN_LIST_TBL_KSV_ORDER_MST(
            data: I_S0217_SALES_MATL_PLAN_LIST_QRY_KSV_ORDER_PLAN!
        ): [T_S0217_SALES_MATL_PLAN_LIST_TBL_KSV_ORDER_MST!]!
        mgrQuery_S0217_SALES_MATL_PLAN_LIST_TBL_KSV_ORDER_MST1(
            data: I_S0217_SALES_MATL_PLAN_LIST_QRY_KSV_ORDER_PLAN!
        ): [T_S0217_SALES_MATL_PLAN_LIST_TBL_KSV_ORDER_MST1!]!
        mgrQuery_S0217_SALES_MATL_PLAN_LIST_CODE: T_S0217_SALES_MATL_PLAN_LIST_CODE!
        mgrQuery_S0217_EXCEL_PRINT(
            data: I_S0217_SALES_MATL_PLAN_LIST_QRY_KSV_ORDER_PLAN!
        ): [T_S0217_RET_EXCEL!]!
        mgrQuery_S0217_EXCEL_PRINT_TOT(
            data: I_S0217_SALES_MATL_PLAN_LIST_QRY_KSV_ORDER_PLAN!
        ): [T_S0217_RET_EXCEL!]!
        mgrQuery_S0217_EXCEL_PRINT_QUTER(
            data: I_S0217_SALES_MATL_PLAN_LIST_QRY_KSV_ORDER_PLAN!
        ): [T_S0217_RET_EXCEL!]!
    }
`;

export default moduleTypedefs_S0217_SALES_MATL_PLAN_LIST;
