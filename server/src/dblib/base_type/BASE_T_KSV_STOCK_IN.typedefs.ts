// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_STOCK_IN = gql`
    type BASE_QRY_KSV_STOCK_IN {
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: Int
        MATL_SEQ: Int
        IN_DATETIME: String
        IN_QTY: Float
        TOT_QTY: Float
        IN_PRICE: Float
        IN_CURR_CD: String
        IN_TYPE: String
        IN_STATUS: String
        IN_FACTORY_CD: String
        OUT_QTY: Float
        OUT_STATUS: String
        PAY_DATE: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        PAY_CURR_CD: String
        PAY_PRICE: Float
        EXCH_RATE: Float
        USD_AMT: Float
        BILL_FLAG: String
        BILL_DATE: String
        END_FLAG: String
        END_DATE: String
        CALC_FLAG: String
        PAY_REPORT: String
        MIN_FLAG: String
        STOCK_QTY: Float
        FRT_FLAG: String
        stock_idx: String
        CHECK_END_DATE: String
        TT_FLAG: String
        REMARK: String
        TAX: Float
        PUR_APP: String
        PACK_DATE: String
        PACK_EXCH_RATE: Float
        PACK_USD_AMT: Float
        PACK_CONFIRM: String
        matl_sale_seq: Int
        BILL_TYPE: String
        lc_qty: Float
        lc_bill_no: String
        lc_conf_flag: String
        lc_conf_date: String
        lc_conf_user: String
        vendor_cd: String
        buy_date: String
        PUR_FACTORY: String
        id: Int
    }

    input BASE_INPUT_KSV_STOCK_IN {
        PO_CD: String
        PO_SEQ: Int
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: Int
        MATL_SEQ: Int
        IN_DATETIME: String
        IN_QTY: Float
        TOT_QTY: Float
        IN_PRICE: Float
        IN_CURR_CD: String
        IN_TYPE: String
        IN_STATUS: String
        IN_FACTORY_CD: String
        OUT_QTY: Float
        OUT_STATUS: String
        PAY_DATE: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        PAY_CURR_CD: String
        PAY_PRICE: Float
        EXCH_RATE: Float
        USD_AMT: Float
        BILL_FLAG: String
        BILL_DATE: String
        END_FLAG: String
        END_DATE: String
        CALC_FLAG: String
        PAY_REPORT: String
        MIN_FLAG: String
        STOCK_QTY: Float
        FRT_FLAG: String
        stock_idx: String
        CHECK_END_DATE: String
        TT_FLAG: String
        REMARK: String
        TAX: Float
        PUR_APP: String
        PACK_DATE: String
        PACK_EXCH_RATE: Float
        PACK_USD_AMT: Float
        PACK_CONFIRM: String
        matl_sale_seq: Int
        BILL_TYPE: String
        lc_qty: Float
        lc_bill_no: String
        lc_conf_flag: String
        lc_conf_date: String
        lc_conf_user: String
        vendor_cd: String
        buy_date: String
        PUR_FACTORY: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_STOCK_IN;
