// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0203_SAMPLE_COST = gql`
    input I_S0203_SAMPLE_COST {
        SAMPLE_END_DATE: String
        WORK_TYPE: String
        WORK_KIND: String
        REPAIR_QTY: String
        ORDER_CD: String
        BUYER_CD: String
        STYLE_CD: String
        REMARK: String
        PATT_LOSS: String
        PATT_LOSS_TIME: String
        SEW_LOSS: String
        SEW_LOSS_TIME: String
        ETC_AMOUNT: String
        SAMPLE_CD: String
        SAMPLE_CD_1: String
        SAMPLE_CD_2: String
        PATT_USER: String
        PATT_COST: String
        PATT_AMT: String
        SEW_USER: String
        SEW_COST: String
        SEW_AMT: String
        WELDING_COST: String
        WELDING_AMT: String
        CUTTING_USER: String
        COMPLETE_USER: String
        PATT3D_USER: String
        PATT3D_COST: String
        PATT3D_AMT: String
        WORK3D_USER: String
        WORK3D_COST: String
        WORK3D_AMT: String
        COLOR3D_QTY: String
        COLOR3D_AMT: String
    }
    type Ret_S0203_SAMPLE_COST_EDT_KZZ_SAMPLE_COST {
        id: Int!
        CODE: String!
    }

    input I_S0203_SAMPLE_COST_QRY_KZZ_SAMPLE_COST {
        IS_DATE: String
        S_DATE: String
        E_DATE: String
        STYLE_CD: String
        ORDER_CD: String
        BUYER_CD: String
        WORK_TYPE: String
        PATT_USER: String
        SEW_USER: String
    }
    type T_S0203_SAMPLE_COST_TBL_KCD_STYLE {
        id: Int
        SAMPLE_SEQ: String
        BUYER_NAME: String
        STYLE_NAME: String
        ORDER_CD: String
        ORG_DUE_DATE: String
        DUE_DATE: String
        TOTAL_COST: String
        PATT_USER: String
        PATT_COST: String
        PATT_COST_NAME: String
        PATT_AMT: String
        ORDER_QTY: String
        SEW_USER: String
        SEW_COST: String
        SEW_COST_NAME: String
        SEW_AMT: String
        WELDING_COST: String
        WELDING_AMT: String
        SUB_PATT_COST: String
        SUB_SEW_COST: String
        SUB_WELDING_COST: String
        BUYER_CD: String
        STYLE_CD: String
        WORK_TYPE_NAME: String
        WORK_TYPE: String
        WORK_KIND_NAME: String
        WORK_KIND: String
        REPAIR_QTY: String
        REPAIR_COST: String
        REMARK: String
        ETC_AMOUNT: String
        SAMPLE_TYPE: String
        SAMPLE_END_FLAG: String
        SAMPLE_END_FLAG_N: String
        SAMPLE_END_DATE: String
        END_FLAG: String
        END_DATE: String
        REG_USER: String
        REG_DATETIME: String
        CONFIRM_FLAG: String
        SAMPLE_CD: String
        PATT_GRADE: String
        SEW_GRADE: String
        FC_PRICE: String
        PATT_LOSS: String
        PATT_LOSS_NAME: String
        PATT_LOSS_TIME: String
        SEW_LOSS: String
        SEW_LOSS_NAME: String
        SEW_LOSS_TIME: String
        PATT_REMARK: String
        SEW_REMARK: String
        PATT: String
        SEW: String
        WELDING: String
        PATT_FLAG: String
        SEW_FLAG: String
        WELDING_FLAG: String
        PATT3D_USER: String
        PATT3D_COST: String
        PATT3D_AMT: String
        WORK3D_USER: String
        WORK3D_COST: String
        WORK3D_COST_NAME: String
        WORK3D_AMT: String
        COLOR3D_COST: String
        PATT3D: String
        WORK3D: String
        COLOR3D_QTY: String
        COLOR3D_AMT: String
        PATT_COST_CODE: String
        SEW_COST_CODE: String
        PATT_LOSS_CODE: String
        SEW_LOSS_CODE: String
        PATT3D_COST_CODE: String
        WORK3D_COST_CODE: String
        CUTTING_USER: String
        COMPLETE_USER: String
    }

    type T_S0203_SAMPLE_COST_CODE {
        WORK_TYPE: [BASE_QRY_KCD_CODE!]!
        WORK_KIND: [BASE_QRY_KCD_CODE!]!
        ORDER_CD: [BASE_QRY_KSV_ORDER_MST!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        STYLE_CD: [BASE_QRY_KCD_STYLE!]!
        PATT_LOSS: [BASE_QRY_KCD_CODE!]!
        SEW_LOSS: [BASE_QRY_KCD_CODE!]!
        PATT_USER: [BASE_QRY_KCD_USER!]!
        PATT_COST: [BASE_QRY_KCD_CODE!]!
        SEW_USER: [BASE_QRY_KCD_USER!]!
        SEW_COST: [BASE_QRY_KCD_CODE!]!
        CUTTING_USER: [BASE_QRY_KCD_USER!]!
        COMPLETE_USER: [BASE_QRY_KCD_USER!]!
        PATT3D_COST: [BASE_QRY_KCD_CODE!]!
        PATT3D_USER: [BASE_QRY_KCD_USER!]!
        WORK3D_COST: [BASE_QRY_KCD_CODE!]!
        WORK3D_USER: [BASE_QRY_KCD_USER!]!
    }

    type Query {
        mgrQuery_S0203_SAMPLE_COST_TBL_KCD_STYLE(
            data: I_S0203_SAMPLE_COST_QRY_KZZ_SAMPLE_COST!
        ): [T_S0203_SAMPLE_COST_TBL_KCD_STYLE!]!
        mgrQuery_S0203_KCD_STYLE_BUYER_CD(
            data: I_S0203_SAMPLE_COST_QRY_KZZ_SAMPLE_COST!
        ): [BASE_QRY_KCD_STYLE!]!
        mgrQuery_S0203_REPORT_1(
            data: I_S0203_SAMPLE_COST_QRY_KZZ_SAMPLE_COST!
        ): [Ret_S0203_SAMPLE_COST_EDT_KZZ_SAMPLE_COST!]!
        mgrQuery_S0203_SAMPLE_COST_CODE: T_S0203_SAMPLE_COST_CODE!
    }

    type Mutation {
        mgrInsert_S0203_SAMPLE_COST_EDT_KZZ_SAMPLE_COST(
            datas: I_S0203_SAMPLE_COST!
        ): [Ret_S0203_SAMPLE_COST_EDT_KZZ_SAMPLE_COST!]!
        mgrUpdate_S0203_SAMPLE_COST(
            datas: I_S0203_SAMPLE_COST!
        ): [Ret_S0203_SAMPLE_COST_EDT_KZZ_SAMPLE_COST!]!
        mgrUpdate_S0203_SAMPLE_COST_END(
            datas: I_S0203_SAMPLE_COST!
        ): [Ret_S0203_SAMPLE_COST_EDT_KZZ_SAMPLE_COST!]!
        mgrUpdate_S0203_SAMPLE_COST_SPW_3D(
            datas: I_S0203_SAMPLE_COST!
        ): [Ret_S0203_SAMPLE_COST_EDT_KZZ_SAMPLE_COST!]!
        mgrDelete_S0203_SAMPLE_COST_EDT_KZZ_SAMPLE_COST(
            datas: I_S0203_SAMPLE_COST!
        ): [Ret_S0203_SAMPLE_COST_EDT_KZZ_SAMPLE_COST!]!
    }
`;

export default moduleTypedefs_S0203_SAMPLE_COST;
