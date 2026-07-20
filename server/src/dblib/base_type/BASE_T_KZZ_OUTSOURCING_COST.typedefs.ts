// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KZZ_OUTSOURCING_COST = gql`
    type BASE_QRY_KZZ_OUTSOURCING_COST {
        OUTSOURCING_CD: String
        SEQ: Int
        YY: Int
        ORDER_CD: String
        ORDER_QTY: Float
        STYLE_CD: String
        SUB_PATT_COST: Float
        SUB_SEW_COST: Float
        SUB_WELDING_COST: Float
        CURR_CD: String
        BUYER_CD: String
        REMARK: String
        CONFIRM_FLAG: String
        SHIP_DATE: String
        END_FLAG: String
        END_DATE: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KZZ_OUTSOURCING_COST {
        OUTSOURCING_CD: String
        SEQ: Int
        YY: Int
        ORDER_CD: String
        ORDER_QTY: Float
        STYLE_CD: String
        SUB_PATT_COST: Float
        SUB_SEW_COST: Float
        SUB_WELDING_COST: Float
        CURR_CD: String
        BUYER_CD: String
        REMARK: String
        CONFIRM_FLAG: String
        SHIP_DATE: String
        END_FLAG: String
        END_DATE: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KZZ_OUTSOURCING_COST;
