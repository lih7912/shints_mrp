// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
/*
0                    Registered 
2                    Cons.Checked
3                    Check Stock
4                    PO Fixed
5                    Ended
*/
const moduleTypedefs_S0305_MRP_MANAGER = gql`
    input I_S0305_MRP_MANAGER_QRY_KSV_PO_MST {
        PO_TYPE: String
        PO_STATUS: String
        PO_CD: String
        BUYER_CD: String
        S_PO_DATE: String
        E_PO_DATE: String
        REG_USER: String
        ORDER_CD: String
        STYLE_CD: String
    }

    type T_S0305_MRP_MANAGER_CODE {
        PO_TYPE: [BASE_QRY_KCD_CODE!]!
        PO_STATUS: [BASE_QRY_KCD_CODE!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        REG_USER: [BASE_QRY_KCD_USER!]!
    }

    type T_S0305_MRP_MANAGER_TBL_KSV_PO_MST {
        PO_STATUS_NAME: String
        PO_STATUS: String
        PO_SEQ: String
        BUYER_NAME: String
        BUYER_CD: String
        PO_TYPE_NAME: String
        PO_TYPE: String
        PO_CD: String
        TARGET_ETA: String
        REG_DATETIME: String
        REG_USER: String
        UPD_DATETIME: String
        UPD_USER: String
        MRP_PACK_FLAG: String
        DOMESTIC_FLAG: String
        IMPORT_FLAG: String
        FACTORY_FLAG: String
        FACTORY2_FLAG: String
        FACTORY3_FLAG: String
        FACTORY4_FLAG: String
        FACTORY5_FLAG: String
        FACTORY_CD: String
        FACTORY_NAME: String
        WORK_STATUS: String
        REQ_STATUS: String
        P_STATUS_CD: String
        MATL_DUE_DATE: String
        DUE_DATE: String
        PURCHASE_REQUEST: String
    }

    type T_S0305_ORDER_MRP_CNT {
        ORDER_MRP_CNT: String
    }

    input I_S0305_ORDER_MRP_CNT {
        PO_CD: String
    }

    input I_S0305_REPORT_SEQ_LIST {
        S_DATE: String
        E_DATE: String
    }

    type T_S0305_RET_EXCEL {
        id: Int
        CODE: String
    }

    input I_S0305_REPORT_US_LIST {
        PO_CD: String
    }

    type T_S0305_WORK_STATUS {
        PO_CD: String
        PO_SEQ: String
        WORK_STATUS: String
        JOB_CNT: String
    }

    input I_S0305_WORK_STATUS {
        PO_CD: String
        OP_KIND: String
    }

    type Query {
        mgrQuery_S0305_MRP_MANAGER_TBL_KSV_PO_MST(
            data: I_S0305_MRP_MANAGER_QRY_KSV_PO_MST!
        ): [T_S0305_MRP_MANAGER_TBL_KSV_PO_MST!]!
        mgrQuery_S0305_MRP_MANAGER_CODE: T_S0305_MRP_MANAGER_CODE!
        mgrQuery_S0305_ORDER_MRP_CNT(
            data: I_S0305_ORDER_MRP_CNT!
        ): T_S0305_ORDER_MRP_CNT!
        mgrQuery_S0305_REPORT_SEQ_LIST(
            data: I_S0305_REPORT_SEQ_LIST!
        ): [T_S0305_RET_EXCEL!]!
        mgrQuery_S0305_REPORT_SEQ_LIST2(
            data: I_S0305_REPORT_SEQ_LIST!
        ): [T_S0305_RET_EXCEL!]!
        mgrQuery_S0305_REPORT_STOCK_LOG(
            data: I_S0305_REPORT_SEQ_LIST!
        ): [T_S0305_RET_EXCEL!]!
        mgrQuery_S0305_REPORT_US_LIST(
            data: I_S0305_REPORT_US_LIST!
        ): [T_S0305_RET_EXCEL!]!
        mgrQuery_S0305_WORK_STATUS(
            data: I_S0305_WORK_STATUS!
        ): [T_S0305_WORK_STATUS!]!
    }
`;

export default moduleTypedefs_S0305_MRP_MANAGER;
