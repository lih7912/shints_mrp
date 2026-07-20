// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0212_NEGO_CMPT = gql`
    input I_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT {
        OP_MODE: String
        PO_CD: String
        ORDER_CD: String
        STYLE_NAME: String
        STYLE_CD: String
        DUE_DATE: String
        PRICE: String
        TOT_CNT: String
        LOC: String
        CMPT: String
        SCREEN_PRINT: String
        HEAT_SILICON: String
        EMBROIDERY: String
        TPR: String
        WELDING: String
        QUILTING: String
        DIGITAL_PRINT: String
        LABEL_PRINT: String
        SUB_TOTAL_COST: String
        LOCAL: String
        LINE_CHARGE: String
        TOTAL_COST: String
        NEGO_TYPE_N: String
        REMARK: String
        NEGO_TYPE: String
        STS_CMPT: String
        ORDER_STATUS: String
        NEGO_SEQ: String
        FACTORY_CD: String
        REG_DATETIME: String
    }

    type Ret_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT {
        id: Int!
        CODE: String!
    }

    input I_S0212_NEGO_CMPT_QRY_KSV_ORDER_CMPT {
        FACTORY_CD: String
        BUYER_CD: String
        STYLE_NAME: String
        FC_NEGO_TYPE: String
        PO_CD: String
        ORDER_CD: String
        DUE_DATE_FLAG: String
        S_DUE_DATE: String
        E_DUE_DATE: String
        EXFACTORY_DATE_FLAG: String
        S_EXFACTORY_DATE: String
        E_EXFACTORY_DATE: String
    }

    type T_S0212_NEGO_CMPT_TBL_KSV_ORDER_CMPT {
        PO_CD: String
        ORDER_CD: String
        STYLE_NAME: String
        STYLE_CD: String
        DUE_DATE: String
        PRICE: String
        TOT_CNT: String
        LOC: String
        CMPT: String
        SCREEN_PRINT: String
        HEAT_SILICON: String
        EMBROIDERY: String
        TPR: String
        WELDING: String
        QUILTING: String
        DIGITAL_PRINT: String
        LABEL_PRINT: String
        SUB_TOTAL_COST: String
        LOCAL: String
        LINE_CHARGE: String
        TOTAL_COST: String
        NEGO_TYPE_N: String
        REMARK: String
        NEGO_TYPE: String
        STS_CMPT: String
        ORDER_STATUS: String
        NEGO_SEQ: String
        FACTORY_CD: String
        REG_DATETIME: String
    }

    type T_S0212_NEGO_CMPT_CODE_PO_CD {
        id: Int
        PO_CD: String
        PO_STATUS: String
        PO_STATUS_NAME: String
    }

    type T_S0212_NEGO_CMPT_CODE {
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        NEGO_TYPE: [BASE_QRY_KCD_CODE!]!
        PO_CD: [T_S0212_NEGO_CMPT_CODE_PO_CD!]!
    }

    input I_S0212_NEGO_HISTORY {
        ORDER_CD: String
    }

    type T_S0212_NEGO_HISTORY {
        NEGO_SEQ: Int
        CMPT: Float
        CD_NAME: String
        STS_CMPT: Float
        REMARK: String
        REG_USER: String
        REG_DATETIME: String
    }

    input I_S0212_EXCEL_PRINT {
        PO_CD: String
        ORDER_CD: String
        IS_LOCAL_DETAIL: String
    }
    type T_S0212_EXCEL_PRINT {
        id: String
        CODE: String
    }

    type Query {
        mgrQuery_S0212_LIST_1(
            data: I_S0212_NEGO_CMPT_QRY_KSV_ORDER_CMPT!
        ): [T_S0212_NEGO_CMPT_TBL_KSV_ORDER_CMPT!]!
        mgrQuery_S0212_NEGO_HISTORY(
            data: I_S0212_NEGO_HISTORY!
        ): [T_S0212_NEGO_HISTORY!]!
        mgrQuery_S0212_NEGO_CMPT_CODE: T_S0212_NEGO_CMPT_CODE!
        mgrQuery_S0212_EXCEL_PRINT(
            data: I_S0212_EXCEL_PRINT!
        ): [T_S0212_EXCEL_PRINT!]!
        mgrQuery_S0212_LIST_1_bak1(
            data: I_S0212_NEGO_CMPT_QRY_KSV_ORDER_CMPT!
        ): [T_S0212_NEGO_CMPT_TBL_KSV_ORDER_CMPT!]!
    }

    type Mutation {
        mgrInsert_S0212_NEGO_PRESENT(
            datas: [I_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT!]!
        ): [Ret_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT!]!
        mgrInsert_S0212_NEGO_ACCEPT(
            datas: [I_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT!]!
        ): [Ret_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT!]!
        mgrInsert_S0212_NEGO_CANCEL(
            datas: [I_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT!]!
        ): [Ret_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT!]!
        mgrInsert_S0212_NEGO_RESET(
            datas: [I_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT!]!
        ): [Ret_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT!]!
        mgrInsert_S0212_NEGO_GET_PHERQDL(
            datas: [I_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT!]!
        ): [Ret_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT!]!
        mgrUpdate_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT(
            datas: [I_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT!]!
        ): [Ret_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT!]!
        mgrDelete_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT(
            datas: [I_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT!]!
        ): [Ret_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT!]!
    }
`;

export default moduleTypedefs_S0212_NEGO_CMPT;
