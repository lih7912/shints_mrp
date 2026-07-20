// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030303_MRP_BY_SEARCH = gql`
    input I_S030303_MRP_BY_SEARCH_QRY_KCD_STYLE {
        STYLE_NAME: String
    }

    input I_S030303_MRP_BY_SEARCH_QRY_KSV_PROD_MST {
        STYLE_CD: String
    }

    input I_S030303_MRP_BY_SEARCH_QRY_KSV_PROD_MEM {
        STYLE_CD: String
        PROD_CD: String
    }

    input I_S030303_MRP_BY_SEARCH_QRY_KSV_ORDER_MRP {
        STYLE_CD: String
        PROD_CD: String
        ORDER_CD: String
        STYLE_NAME: String
    }

    input I_S030303_MRP_BY_SEARCH_QRY_KCD_STYLE1 {
        COLOR: String
    }

    type T_S030303_MRP_BY_SEARCH_TBL_KCD_STYLE {
        STYLE_NAME: String
        STYLE_CD: String
        BUYER_NAME: String
        BUYER_CD: String
        ORDER_CD: String
    }

    type T_S030303_MRP_BY_SEARCH_TBL_KSV_ORDER_MRP {
        ORDER_CD: String
        PROD_CD: String
        COLOR: String
        STYLE_NAME: String
    }

    type T_S030303_MRP_BY_SEARCH_TBL_KSV_PROD_MEM {
        MATL_TYPE2: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        MATL_PRICE: String
        CURR_CD: String
        UNIT: String
        ADD_LOSS: String
        USE_SIZE: String
        REMARK: String
        BVT_REMARK: String
        COUNTRY: String
        STD_NET: String
        STD_LOSS: String
        STD_GROSS: String
        NET: String
        LOSS: String
        GROSS: String
        VENDOR_NAME: String
        VENDOR_CD: String
        SEQ: String
    }
    type T_S030303_MRP_BY_SEARCH_TBL_KSV_PROD_MEM1 {
        MATL_TYPE2: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        MATL_PRICE: String
        CURR_CD: String
        UNIT: String
        ADD_LOSS: String
        USE_SIZE: String
        REMARK: String
        BVT_REMARK: String
        COUNTRY: String
        STD_NET: String
        STD_LOSS: String
        STD_GROSS: String
        NET: String
        LOSS: String
        GROSS: String
        VENDOR_NAME: String
        VENDOR_CD: String
        SEQ: String
    }

    type T_S030303_MRP_BY_SEARCH_TBL_KSV_PROD_MST {
        PROD_TYPE_NAME: String
        COLOR: String
        COLLECTION: String
        PROD_UNIT: String
        PROD_CD: String
        PROD_TYPE: String
    }

    type T_S030303_MRP_BY_SEARCH_TBL_KCD_STYLE_SRC {
        STYLE: BASE_QRY_KCD_STYLE!
        PROD_MST: [BASE_QRY_KSV_PROD_MST!]!
    }

    type T_S030303_KSV_ORDER_MST {
        STYLE_NAME: String
        ORDER_CD: String
    }

    type Query {
        mgrQuery_S030303_MRP_BY_SEARCH_TBL_KCD_STYLE(
            data: I_S030303_MRP_BY_SEARCH_QRY_KCD_STYLE!
        ): [T_S030303_MRP_BY_SEARCH_TBL_KCD_STYLE!]!
        mgrQuery_S030303_MRP_BY_SEARCH_TBL_KCD_STYLE_SRC(
            data: I_S030303_MRP_BY_SEARCH_QRY_KCD_STYLE!
        ): T_S030303_MRP_BY_SEARCH_TBL_KCD_STYLE_SRC!
        mgrQuery_S030303_MRP_BY_SEARCH_TBL_KSV_PROD_MST(
            data: I_S030303_MRP_BY_SEARCH_QRY_KSV_PROD_MST!
        ): [T_S030303_MRP_BY_SEARCH_TBL_KSV_PROD_MST!]!
        mgrQuery_S030303_KSV_ORDER_MST(
            data: I_S030303_MRP_BY_SEARCH_QRY_KSV_PROD_MST!
        ): [T_S030303_KSV_ORDER_MST!]!
        mgrQuery_S030303_MRP_BY_SEARCH_TBL_KSV_PROD_MEM(
            data: I_S030303_MRP_BY_SEARCH_QRY_KSV_PROD_MEM!
        ): [T_S030303_MRP_BY_SEARCH_TBL_KSV_PROD_MEM!]!
        mgrQuery_S030303_MRP_BY_SEARCH_TBL_KSV_ORDER_MRP(
            data: I_S030303_MRP_BY_SEARCH_QRY_KSV_ORDER_MRP!
        ): [T_S030303_MRP_BY_SEARCH_TBL_KSV_PROD_MEM!]!
        mgrQuery_S030303_MRP_BY_SEARCH_TBL_KSV_ORDER_MRP2(
            data: I_S030303_MRP_BY_SEARCH_QRY_KSV_ORDER_MRP!
        ): [T_S030303_MRP_BY_SEARCH_TBL_KSV_ORDER_MRP!]!
        mgrQuery_S030303_MRP_BY_SEARCH_TBL_KSV_ORDER_MRP2_BY_STYLE(
            data: I_S030303_MRP_BY_SEARCH_QRY_KSV_ORDER_MRP!
        ): [T_S030303_MRP_BY_SEARCH_TBL_KSV_ORDER_MRP!]!
    }

    type Ret_S030303_MRP_BY_SEARCH_EDT_KSV_PROD_MEM {
        CODE: String
        id: Int
    }

    input I_S030303_MRP_BY_SEARCH_EDT_KSV_PROD_MEM {
        PROD_CD: String
        MATL_TYPE2: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        MATL_PRICE: String
        CURR_CD: String
        UNIT: String
        ADD_LOSS: String
        USE_SIZE: String
        REMARK: String
        BVT_REMARK: String
        COUNTRY: String
        STD_NET: String
        STD_LOSS: String
        STD_GROSS: String
        NET: String
        LOSS: String
        GROSS: String
        VENDOR_NAME: String
        VENDOR_CD: String
        SEQ: String
    }

    type Mutation {
        mgrInsert_S030303_MRP_BY_SEARCH_EDT_KSV_PROD_MEM(
            datas: [I_S030303_MRP_BY_SEARCH_EDT_KSV_PROD_MEM!]!
        ): [Ret_S030303_MRP_BY_SEARCH_EDT_KSV_PROD_MEM!]!
        mgrUpdate_S030303_MRP_BY_SEARCH_EDT_KSV_PROD_MEM(
            datas: [I_S030303_MRP_BY_SEARCH_EDT_KSV_PROD_MEM!]!
        ): [Ret_S030303_MRP_BY_SEARCH_EDT_KSV_PROD_MEM!]!
        mgrDelete_S030303_MRP_BY_SEARCH_EDT_KSV_PROD_MEM(
            datas: [I_S030303_MRP_BY_SEARCH_EDT_KSV_PROD_MEM!]!
        ): [Ret_S030303_MRP_BY_SEARCH_EDT_KSV_PROD_MEM!]!
    }
`;

export default moduleTypedefs_S030303_MRP_BY_SEARCH;
