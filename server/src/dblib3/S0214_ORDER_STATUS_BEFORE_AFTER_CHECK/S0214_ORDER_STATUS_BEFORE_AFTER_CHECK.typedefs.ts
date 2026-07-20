// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK = gql`
    input I_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_QRY_KSV_ORDER_MST {
        SHIPDATE_FLAG: String
        S_SHIP_DATE: String
        E_SHIP_DATE: String
        ORDER_CD: String
        BUYER_CD: String
        PARTIAL_SHIP_FLAG: String
        END_REPORT_FLAG: String
        END_FLAG: String
        REPORT_KIND: String
    }
    type T_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_TBL_KSV_ORDER_MST {
        ORDER_CD: String
        STATUS: String
        STYLE_NAME: String
        TOT_CNT: String
        SHIP_CNT: String
        SHIP_DATE: String
        USD_PRICE: String
        ORD_AMT: String
        COMM_AMT: String
        MATL_AMT: String
        MATL_PRICE: String
        FC_PRICE: String
        ETC_AMT: String
        ETC_PRICE: String
        TOT_AMT: String
        TOT_PRICE: String
        RATE: String
        KIND: String
        COMMISSION: String
        FC_BEF: String
        ORDER_STATUS_NAME: String
        ORDER_STATUS: String
        REMARK: String
        FACTORY_CD: String
        LINE_CHARGE_PRICE: String
        END_DATETIME: String
    }
    type T_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_CODE {
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
    }

    type T_S0214_LIST_1 {
        filename: String
        FILE_NAME: String
        FILE_URL: String
        datas: [T_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_TBL_KSV_ORDER_MST!]!
    }

    type T_S0214_RET {
        id: Int
        CODE: String
        FILE_NAME: String
        URL: String
    }

    type Query {
        mgrQuery_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_TBL_KSV_ORDER_MST(
            data: I_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_QRY_KSV_ORDER_MST!
        ): T_S0214_LIST_1!
        mgrQuery_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_TBL_KSV_ORDER_MST_bak1(
            data: I_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_QRY_KSV_ORDER_MST!
        ): T_S0214_LIST_1!
        mgrQuery_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_CODE: T_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_CODE!
        mgrQuery_S0214_EXCEL_REPORT5(
            data: I_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_QRY_KSV_ORDER_MST!
        ): [T_S0214_RET!]!
    }
`;

export default moduleTypedefs_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK;
