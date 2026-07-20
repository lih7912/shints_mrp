// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S020401_ORDER_INFO = gql`
    input I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST {
        IS_OUTSOURCING: String
        IS_SAMPLE: String
        IS_FACTORY_FOB: String
        ORDER_CD: String
        STYLE_NAME: String
        BUYER_NAME: String
        SIZE_GROUP: String
        SIZE_MEMBER: String
        FACTORY_CD: String
        PO_CD: String
        REG_USER: String
        ORDER_STATUS: String
        REG_DATETIME: String
        APPROVAL_USER: String
        APPROVAL_DATETIME: String
        BUYER_TEAM: String
        mid_size1: String
    }

    type Ret_S020401_ORDER_INFO_EDT_KSV_ORDER_MST {
        id: Int!
        CODE: String!
    }

    input I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1 {
        ORDER_DATE: String
        DUE_DATE: String
        MATL_DUE_DATE: String
        NAT_CD: String
        CURR_CD: String
        AVR_PRICE: String
        UNIT_COST: String
        TOTAL_COST: String
    }

    type Ret_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1 {
        id: Int!
        CODE: String!
    }

    input I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2 {
        REF_ORDER_NO: String
        REMARK1: String
        REMARK2: String
        NOTE: String
        PATT_USER: String
        PATT_COST: String
        SEW_USER: String
        SEW_COST: String
        WELDING_COST: String
        ETC: String
        ORG_DUE_DATE: String
    }

    type Ret_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2 {
        id: Int!
        CODE: String!
    }

    input I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3 {
        FC_PRICE2: String
        END_REMARK: String
    }

    type Ret_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3 {
        id: Int!
        CODE: String!
    }

    type T_S020401_ORDER_INFO_TBL_KSV_ORDER_MEM {
        PROD_CD: String
        ADD_FLAG: String
        COLOR: String
        TOT_CNT: String
        PRICE: String
        SIZE_CNT: String
        OLD_PROD_CD: String
        end_price: String
        MID_SIZE: String
        MID_SIZE_QTY: String
        SIZE_LOSS: String
    }

    type T_S020401_ORDER_INFO_TBL_KSV_ORDER_MEM1 {
        INVOICE_DATE: String
        SHIP_PROD_TYPE: String
        SHIP_QTY: String
        SALE_PRICE: String
        INVOICE_NO: String
    }

    type T_S020401_ORDER_INFO_ORDER_MST {
        ORDER_CD: String
        STYLE_CD: String
        ORDER_TYPE: String
        YY: Int
        SEQ: Int
        TOT_CNT: Int
        ADD_CNT: Int
        AVR_PRICE: Float
        FC_BEF: Float
        FC_PRICE: Float
        MATL_AMT: Float
        ETC_AMT: Float
        COMMISSION: Float
        COMM1: Float
        COMM2: Float
        OVER_FLAG: String
        OVER_QTY: Int
        OVER_AMT: Float
        OVER_BILL: String
        CURR_CD: String
        USD_PRICE: Float
        ORDER_DATE: String
        DUE_DATE: String
        MATL_DUE_DATE: String
        NAT_CD: String
        FACTORY_CD: String
        SIZE_GROUP: String
        ORDER_FLAG: String
        SAMPLE_FLAG: String
        MATL_SALE_FLAG: String
        FAC_LC_FLAG: String
        FAC_TT_FLAG: String
        ORDER_STATUS: String
        END_DATETIME: String
        REMARK: String
        REF_ORDER_NO: String
        REF_NO: String
        REF_Q_OUTER: String
        REF_Q_LINER: String
        REF_ORDER_REQ: String
        REF_COLOR1: String
        REF_COLOR2: String
        REF_SIZE1: String
        REF_SIZE2: String
        REF_QTY1: String
        REF_QTY2: String
        MATL_PAY_FLAG: String
        MATL_PAY_USER: String
        MATL_PAY_DATETIME: String
        FC_NEGO_TYPE: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        APPROVAL_USER: String
        APPROVAL_DATETIME: String
        brand: String
        season: String
        krw_flag: String
        krw_matl_amt: Float
        margin: Float
        frt_check: String
        category: String
        ORG_DUE_DATE: String
        BUYER_TEAM: String
        SAMPLE_COST_FLAG: String
        DL_FLAG: String
        TRADE_PRICE: Float
        LINE_CHARGE_PRICE: Float
        DUTY: Float
        mid_size1: String
        mid_size2: String
        mid_size3: String
        mid_size4: String
        END_STATUS: String
        FC_PRICE2: Float
        CANCEL_DATETIME: String
        PO_MATL_AMT: Float
        id: Int
        STYLE_NAME: String
        ORDER_STATUS_NAME: String
        BUYER_NAME: String
        SIZE_MEMBER: String
    }

    type T_S020401_ORDER_INFO_CMPT {
        ORDER_CMPT: String
    }

    type T_S020401_ORDER_INFO_SHIP_CNT {
        SUM_SHIP_CNT: String
    }

    type T_S020401_ORDER_INFO_INVOICE {
        SHIP_DATE: String
        SHIP_TYPE_NAME: String
        SHIP_QTY: String
        SALES_PRICE: String
        INVOICE_NO: String
        DELIVERY_TYPE_NAME: String
        SHIP_PRICE: String
        SHIP_DATE1: String
    }

    type T_S020401_ORDER_INFO_ORDER_MEM {
        ORDER_CD: String
        PROD_CD: String
        ADD_FLAG: String
        PRICE: Float
        TOT_CNT: Int
        SIZE_CNT: String
        OLD_PROD_CD: String
        end_price: Float
        barcode: String
        MID_SIZE: String
        MID_SIZE_QTY: Int
        SIZE_LOSS: String
        id: Int
        COLOR: String
    }

    type T_S020401_ORDER_MST_ARRAY {
        ORDER_CD: String
        NAT_CD: String
        DUE_DATE: String
        TOT_QTY: String
        ORDER_MEM: [T_S020401_ORDER_INFO_ORDER_MEM!]!
    }

    type T_S020401_ORDER_INFO {
        ORDER_MST: [T_S020401_ORDER_INFO_ORDER_MST!]!
        ORDER_CMPT: T_S020401_ORDER_INFO_CMPT!
        PO: [BASE_QRY_KSV_PO_MEM!]!
        SHIP_CNT: T_S020401_ORDER_INFO_SHIP_CNT!
        SAMPLE_COST: [BASE_QRY_KZZ_SAMPLE_COST!]!
        ORDER_MST_ARRAY: [T_S020401_ORDER_MST_ARRAY!]!
        ORDER_MEM: [T_S020401_ORDER_INFO_ORDER_MEM!]!
        INVOICE_MEM: [T_S020401_ORDER_INFO_INVOICE!]!

        CODE_FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
        CODE_NAT_CD: [BASE_QRY_KCD_NATION!]!
        CODE_PATT_USER: [BASE_QRY_KCD_USER!]!
        CODE_SEW_USER: [BASE_QRY_KCD_USER!]!
        CODE_BUYER_TEAM: [BASE_QRY_KCD_CODE!]!
        CODE_CURR_CD: [BASE_QRY_KCD_CODE!]!
        CODE_SAMPLE_STEP: [BASE_QRY_KCD_CODE!]!
        CODE_SAMPLE_ROUND: [BASE_QRY_KCD_CODE!]!
        CODE_SAMPLE_REASON: [BASE_QRY_KCD_CODE!]!
    }

    input I_S020401_ORDER_INFO_QRY_KSV_ORDER_MEM {
        ORDER_CD: String
    }

    input I_S020401_ORDER_INFO_QRY_KSV_ORDER_MEM1 {
        ORDER_CD: String
    }

    type T_S020401_ORDER_INFO_CODE {
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
        NAT_CD: [BASE_QRY_KCD_NATION!]!
        PATT_USER: [BASE_QRY_KCD_USER!]!
        SEW_USER: [BASE_QRY_KCD_USER!]!
        BUYER_TEAM: [BASE_QRY_KCD_CODE!]!
        CURR_CD: [BASE_QRY_KCD_CODE!]!
        SAMPLE_STEP: [BASE_QRY_KCD_CODE!]!
        SAMPLE_ROUND: [BASE_QRY_KCD_CODE!]!
        SAMPLE_REASON: [BASE_QRY_KCD_CODE!]!
    }

    type Query {
        mgrQuery_S020401_ORDER_INFO_TBL_KSV_ORDER_MEM(
            data: I_S020401_ORDER_INFO_QRY_KSV_ORDER_MEM!
        ): [T_S020401_ORDER_INFO_TBL_KSV_ORDER_MEM!]!
        mgrQuery_S020401_ORDER_INFO_TBL_KSV_ORDER_MEM1(
            data: I_S020401_ORDER_INFO_QRY_KSV_ORDER_MEM1!
        ): [T_S020401_ORDER_INFO_TBL_KSV_ORDER_MEM1!]!
        mgrQuery_S020401_ORDER_INFO_QRY1(
            data: I_S020401_ORDER_INFO_QRY_KSV_ORDER_MEM!
        ): T_S020401_ORDER_INFO!
        mgrQuery_S020401_ORDER_INFO_QRY2(
            data: I_S020401_ORDER_INFO_QRY_KSV_ORDER_MEM!
        ): T_S020401_ORDER_INFO!
        mgrQuery_S020401_ORDER_INFO_CODE: T_S020401_ORDER_INFO_CODE!
    }

    type Mutation {
        mgrInsert_S020401_ORDER_INFO_EDT_KSV_ORDER_MST(
            datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST!]!
        ): [Ret_S020401_ORDER_INFO_EDT_KSV_ORDER_MST!]!
        mgrUpdate_S020401_ORDER_INFO_EDT_KSV_ORDER_MST(
            datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST!]!
        ): [Ret_S020401_ORDER_INFO_EDT_KSV_ORDER_MST!]!
        mgrDelete_S020401_ORDER_INFO_EDT_KSV_ORDER_MST(
            datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST!]!
        ): [Ret_S020401_ORDER_INFO_EDT_KSV_ORDER_MST!]!

        mgrInsert_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1(
            datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1!]!
        ): [Ret_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1!]!
        mgrUpdate_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1(
            datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1!]!
        ): [Ret_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1!]!
        mgrDelete_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1(
            datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1!]!
        ): [Ret_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1!]!

        mgrInsert_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2(
            datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2!]!
        ): [Ret_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2!]!
        mgrUpdate_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2(
            datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2!]!
        ): [Ret_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2!]!
        mgrDelete_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2(
            datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2!]!
        ): [Ret_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2!]!

        mgrInsert_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3(
            datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3!]!
        ): [Ret_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3!]!
        mgrUpdate_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3(
            datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3!]!
        ): [Ret_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3!]!
        mgrDelete_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3(
            datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3!]!
        ): [Ret_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3!]!
    }
`;

export default moduleTypedefs_S020401_ORDER_INFO;
