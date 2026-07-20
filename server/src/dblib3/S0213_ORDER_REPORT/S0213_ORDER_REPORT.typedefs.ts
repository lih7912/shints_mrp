// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0213_ORDER_REPORT = gql`
    input I_S0213_ORDER_REPORT_QRY_KSV_ORDER_MST {
        STYLE_CD: String
        BUYER_CD: String
        FACTORY_CD: String
        DUEDATE_FLAG: String
        S_DUE_DATE: String
        E_DUE_DATE: String
        SHIPDATE_FLAG: String
        S_SHIP_DATE: String
        E_SHIP_DATE: String
        ORDER_CD: String
        CHECK_FLAG_2: String
        CHECK_FLAG_3: String
        CHECK_FLAG_4: String
        CHECK_FLAG_7: String
        CHECK_FLAG_8: String
        CHECK_FLAG_9: String
        DETAIL_FLAG: String
    }
    type T_S0213_ORDER_REPORT_TBL_KSV_ORDER_MST {
        ORDER_CD: String
        STYLE_NAME: String
        DUE_DATE: String
        TOT_CNT: String
        SHIP_DATE: String
        SHIP_CNT: String
        AVR_PRICE: String
        ORDER_AMT: String
        MATL_AMT: String
        BVT_LOCAL: String
        FC_AMT: String
        ETC_AMT: String
        COMM_AMT: String
        TOT_AMT: String
        TOT_PRICE: String
        DIFF: String
        RATE: String
        SHIP_TOT: String
        SHIP_RATE: String
        FACTORY: String
        BUYER: String
        ORDER_STATUS: String
    }

    type T_S0213_ORDER_REPORT_CODE {
        STYLE_CD: [BASE_QRY_KCD_STYLE!]!
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        MATL_UPDATE: String
    }

    type T_S0213_EXCEL_RET {
        id: Int
        CODE: String
    }

    input I_S0213_QRY_STYLE {
        BUYER_CD: String
        STYLE_CD: String
    }

    type T_S0213_QRY_STYLE {
        STYLE_NAME: String
        STYLE_CD: String
    }

    type Query {
        mgrQuery_S0213_ORDER_REPORT_TBL_KSV_ORDER_MST(
            data: I_S0213_ORDER_REPORT_QRY_KSV_ORDER_MST!
        ): [T_S0213_ORDER_REPORT_TBL_KSV_ORDER_MST!]!
        mgrQuery_S0213_ORDER_REPORT_TBL_KSV_ORDER_MST_bak(
            data: I_S0213_ORDER_REPORT_QRY_KSV_ORDER_MST!
        ): [T_S0213_ORDER_REPORT_TBL_KSV_ORDER_MST!]!
        mgrQuery_S0213_ORDER_REPORT_CODE: T_S0213_ORDER_REPORT_CODE!
        mgrQuery_S0213_EXCEL_ORDER_STATUS(
            data: I_S0213_ORDER_REPORT_QRY_KSV_ORDER_MST!
        ): [T_S0213_EXCEL_RET!]!
        mgrQuery_S0213_EXCEL_REPORT2(
            data: I_S0213_ORDER_REPORT_QRY_KSV_ORDER_MST!
        ): [T_S0213_EXCEL_RET!]!
        mgrQuery_S0213_EXCEL_REPORT4(
            data: I_S0213_ORDER_REPORT_QRY_KSV_ORDER_MST!
        ): [T_S0213_EXCEL_RET!]!
        mgrQuery_S0213_EXCEL_REPORT8(
            data: I_S0213_ORDER_REPORT_QRY_KSV_ORDER_MST!
        ): [T_S0213_EXCEL_RET!]!
        mgrQuery_S0213_EXCEL_REPORT9(
            data: I_S0213_ORDER_REPORT_QRY_KSV_ORDER_MST!
        ): [T_S0213_EXCEL_RET!]!
        mgrQuery_S0213_EXCEL_REPORT10(
            data: I_S0213_ORDER_REPORT_QRY_KSV_ORDER_MST!
        ): [T_S0213_EXCEL_RET!]!
        mgrQuery_S0213_UPDATE_MATLAMT(
            data: I_S0213_ORDER_REPORT_QRY_KSV_ORDER_MST!
        ): [T_S0213_EXCEL_RET!]!
        mgrQuery_S0213_QRY_STYLE_BY_BUYER(
            data: I_S0213_QRY_STYLE!
        ): [T_S0213_QRY_STYLE!]!
        mgrQuery_S0213_QRY_STYLE_BY_NAME(
            data: I_S0213_QRY_STYLE!
        ): [T_S0213_QRY_STYLE!]!
    }
`;

export default moduleTypedefs_S0213_ORDER_REPORT;
