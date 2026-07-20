// MGR_S0520_2_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0520_2_1 = gql`
    type T_S0520_2_1 {
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: Int
        MATL_SEQ: Int
        PO_QTY: Float
        IN_QTY: Float
        OUT_QTY: Float
        INFAC_QTY: Float
        OUTFAC_QTY: Float
        STOCK_QTY: Float
        REMAIN_QTY: Float
        USE_QTY: Float
        FACTORY_CD: String
        DIFF_PO_TYPE: String
        DIFF_QTY: Float
        STOCK_STATUS: String
        STOCK_DATE: String
        WARE_CD: String
        WARE_DATE: String
        WARE_QTY: Float
        RACK: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        TEMP_PRICE: String
        PAY_EXP_DATE: String
        MIN_ORDER: String
        vendor_cd: String
        lc_qty: Float
        min_conf_user: String
        min_conf_datetime: String
        min_stock_idx: String
        id: Int
        PU_CD: String
        MOQ: Float
        PO_QTY2: Float
        CURR_CD: String
        MASTER_PRICE: Float
        FREIGHT_PRICE: Float
        OTHER_PRICE: Float
        SURCHARGE_REMARK: String
        PO_PRICE: Float
        MOQ_PRICE: Float
        LEFTOVER_QTY: Float
        FOC_QTY: Float
        MOQ_STOCK_IDX: String
        FOC_STOCK_IDX: String
        LEFTOVER_STOCK_IDX: String
    }

    input I_S0520_2_1 {
        PO_CD: String
        VENDOR_CD: String
        MATL_CD: String
    }

    type Query {
        mgrQueryS0520_2_1(data: I_S0520_2_1!): [T_S0520_2_1!]!
    }
`;

export default moduleTypedefs_S0520_2_1;
