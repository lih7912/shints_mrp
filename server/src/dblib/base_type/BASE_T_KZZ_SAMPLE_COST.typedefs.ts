// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KZZ_SAMPLE_COST = gql`
    type BASE_QRY_KZZ_SAMPLE_COST {
        SAMPLE_CD: String
        SEQ: Int
        YY: Int
        SAMPLE_SEQ: String
        ORDER_CD: String
        ORDER_QTY: Float
        STYLE_CD: String
        WORK_TYPE: String
        REPAIR_QTY: Float
        PATT_USER: String
        PATT_COST: String
        PATT_GRADE: Int
        PATT_REMARK: String
        SEW_USER: String
        SEW_COST: String
        SEW_GRADE: Int
        SEW_REMARK: String
        WELDING_COST: String
        SUB_PATT_COST: Float
        SUB_SEW_COST: Float
        SUB_WELDING_COST: Float
        BUYER_CD: String
        ETC_AMOUNT: Float
        REMARK: String
        CONFIRM_FLAG: String
        PATT_LOSS: String
        PATT_LOSS_TIME: Int
        SEW_LOSS: String
        SEW_LOSS_TIME: Int
        SAMPLE_END_FLAG: String
        SAMPLE_END_DATE: String
        END_FLAG: String
        END_DATE: String
        REG_USER: String
        REG_DATETIME: String
        PATT_FLAG: String
        SEW_FLAG: String
        WELDING_FLAG: String
        PATT3D_USER: String
        WORK3D_USER: String
        COLOR3D_QTY: Float
        PATT3D_COST: Float
        WORK3D_COST: Float
        SAMPLE_STEP: String
        SAMPLE_ROUND: String
        SAMPLE_REASON: String
        CUTTING_USER: String
        COMPLETE_USER: String
    }

    input BASE_INPUT_KZZ_SAMPLE_COST {
        SAMPLE_CD: String
        SEQ: Int
        YY: Int
        SAMPLE_SEQ: String
        ORDER_CD: String
        ORDER_QTY: Float
        STYLE_CD: String
        WORK_TYPE: String
        REPAIR_QTY: Float
        PATT_USER: String
        PATT_COST: String
        PATT_GRADE: Int
        PATT_REMARK: String
        SEW_USER: String
        SEW_COST: String
        SEW_GRADE: Int
        SEW_REMARK: String
        WELDING_COST: String
        SUB_PATT_COST: Float
        SUB_SEW_COST: Float
        SUB_WELDING_COST: Float
        BUYER_CD: String
        ETC_AMOUNT: Float
        REMARK: String
        CONFIRM_FLAG: String
        PATT_LOSS: String
        PATT_LOSS_TIME: Int
        SEW_LOSS: String
        SEW_LOSS_TIME: Int
        SAMPLE_END_FLAG: String
        SAMPLE_END_DATE: String
        END_FLAG: String
        END_DATE: String
        REG_USER: String
        REG_DATETIME: String
        PATT_FLAG: String
        SEW_FLAG: String
        WELDING_FLAG: String
        PATT3D_USER: String
        WORK3D_USER: String
        COLOR3D_QTY: Float
        PATT3D_COST: Float
        WORK3D_COST: Float
        SAMPLE_STEP: String
        SAMPLE_ROUND: String
        SAMPLE_REASON: String
        CUTTING_USER: String
        COMPLETE_USER: String
    }
`;

export default moduleTypedefs_BASE_KZZ_SAMPLE_COST;
