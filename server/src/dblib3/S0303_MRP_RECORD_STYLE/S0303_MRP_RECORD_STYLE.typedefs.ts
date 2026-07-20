// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0303_MRP_RECORD_STYLE = gql`
    input I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM {
        PROD_CD: String
        PROD_CD_N: String
        VERSION: String
        DL_FLAG: String
        MRP_CHECK: String
        MATL_TYPE2: String
        MATL_TYPE2_N: String
        MATL_NAME: String
        MATL_CD: String
        COLOR: String
        SPEC: String
        MATL_PRICE: String
        CURR_CD: String
        SALES_MATL_PRICE: String
        SALES_CURR_CD: String
        UNIT: String
        ADD_LOSS: String
        USE_SIZE: String
        REMARK: String
        BVT_REMARK: String
        COUNTRY: String
        STD_NET: String
        STD_LOSS: String
        NET: String
        LOSS: String
        GROSS: String
        VENDOR_NAME: String
        VENDOR_STATUS: String
        VENDOR_CD: String
        STD_GROSS: String
        SEQ: String
        S_FLAG: String
        S_MATL_CD: String
        S_USE_SIZE: String
        S_REMARK: String
        MATL_STATUS_CD: String
        VENDOR_STATUS_CD: String
        id: Int
    }

    type Ret_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM {
        id: Int!
        CODE: String!
    }

    type Ret_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MST {
        MATL_CD: String!
    }

    input I_S0303_MRP_RECORD_STYLE_QRY_KCD_MATL_MST {
        MATL_NAME: String
        COLOR: String
        MATL_CD: String
        SPEC: String
        VENDOR_NAME: String
    }
    input I_S0303_MRP_RECORD_STYLE_QRY_KSV_PROD_MST {
        STYLE_CD: String
    }

    input I_S0303_MRP_RECORD_STYLE_QRY_KSV_PROD_MEM {
        PROD_CD: String
        DL_FLAG: String
    }

    input I_S0303_MRP_RECORD_STYLE_QRY_KSV_PROD_MEM_BY_USAGE {
        PROD_CD: String
        REMARK: String
        DL_FLAG: String
        id: String
    }

    input I_S0303_MRP_RECORD_STYLE_QRY_KCD_STYLE {
        STYLE_CD: String
        BUYER_CD: String
    }

    type T_S0303_MRP_RECORD_STYLE_TBL_KCD_MATL_MST {
        MATL_NAME: String
        COLOR: String
        SPEC: String
        MATL_PRICE: String
        CURR_CD: String
        UNIT: String
        VENDOR_NAME: String
        VENDOR_CD: String
        MATL_CD: String
        STATUS_CD: String
        STATUS_NAME: String
        COL1: String
        COL2: String
        COL3: String
        ADD_LOSS: String
    }

    type T_S0303_MRP_RECORD_STYLE_TBL_KCD_STYLE {
        STYLE_NAME: String
        STYLE_CD: String
        PROD_CNT: String
    }

    type T_S0303_MRP_RECORD_STYLE_TBL_KSV_PROD_MEM {
        PROD_CD: String
        PROD_CD_N: String
        VERSION: String
        DL_FLAG: String
        MRP_CHECK: String
        MATL_TYPE2: String
        MATL_TYPE2_N: String
        MATL_NAME: String
        MATL_CD: String
        COLOR: String
        SPEC: String
        SALES_MATL_PRICE: String
        SALES_CURR_CD: String
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
        NET: String
        LOSS: String
        GROSS: String
        VENDOR_NAME: String
        VENDOR_STATUS: String
        VENDOR_CD: String
        STD_GROSS: String
        SEQ: String
        S_FLAG: String
        S_MATL_CD: String
        S_USE_SIZE: String
        S_REMARK: String
        MATL_STATUS_CD: String
        VENDOR_STATUS_CD: String
        id: Int
    }

    type T_S0303_MRP_RECORD_STYLE_TBL_KSV_PROD_MST {
        PROD_TYPE_NAME: String
        COLOR: String
        SIZE_LOSS: String
        UPD_USER: String
        UPD_DATETIME: String
        COLLECTION: String
        PROD_UNIT: String
        PROD_CD: String
        PROD_TYPE: String
        REG_USER: String
        REG_DATETIME: String
        PROD_MEM_CNT: Int
    }

    input I_S0303_QRY_VENDOR {
        VENDOR_CD: String
    }

    type T_S0303_QRY_VENDOR {
        VENDOR_CD: String
        VENDOR_NAME: String
    }

    input I_S0303_QRY_STYLE {
        STYLE_CD: String
    }

    type T_S0303_QRY_STYLE {
        STYLE_CD: String
        STYLE_NAME: String
    }

    input I_S0303_QRY_STYLE_BY_BUYER {
        BUYER_CD: String
    }

    input I_S0303_QRY_BUYER {
        BUYER_CD: String
    }

    input I_S0303_QRY_NATION {
        NAT_CD: String
    }

    type T_S0303_QRY_BUYER {
        BUYER_CD: String
        BUYER_NAME: String
    }

    type T_S0303_QRY_NATION {
        NAT_CD: String
        NAT_NAME: String
    }

    input I_S0303_QRY_BUYER_BY_STYLE {
        STYLE_CD: String
    }

    input DATA_EXPORT_CONSUMPTION {
        STYLE_NAME: String
        COLOR: String
    }

    input GRID_EXPORT_CONSUMPTION {
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        REMARK: String
        USAGE: String
    }

    type Query {
        mgrQuery_S0303_MRP_RECORD_STYLE_TBL_KCD_MATL_MST(
            data: I_S0303_MRP_RECORD_STYLE_QRY_KCD_MATL_MST!
        ): [T_S0303_MRP_RECORD_STYLE_TBL_KCD_MATL_MST!]!
        mgrQuery_S0303_MRP_RECORD_STYLE_TBL_KCD_STYLE(
            data: I_S0303_MRP_RECORD_STYLE_QRY_KCD_STYLE!
        ): [T_S0303_MRP_RECORD_STYLE_TBL_KCD_STYLE!]!
        mgrQuery_S0303_MRP_RECORD_STYLE_TBL_KSV_PROD_MEM(
            data: I_S0303_MRP_RECORD_STYLE_QRY_KSV_PROD_MEM!
        ): [T_S0303_MRP_RECORD_STYLE_TBL_KSV_PROD_MEM!]!
        mgrQuery_S0303_MRP_RECORD_STYLE_TBL_KSV_PROD_MEM_BY_USAGE(
            data: I_S0303_MRP_RECORD_STYLE_QRY_KSV_PROD_MEM_BY_USAGE!
        ): [T_S0303_MRP_RECORD_STYLE_TBL_KSV_PROD_MEM!]!
        mgrQuery_S0303_MRP_RECORD_STYLE_TBL_KSV_PROD_MST(
            data: I_S0303_MRP_RECORD_STYLE_QRY_KSV_PROD_MST!
        ): [T_S0303_MRP_RECORD_STYLE_TBL_KSV_PROD_MST!]!
        mgrQuery_S0303_QRY_STYLE(
            data: I_S0303_QRY_STYLE!
        ): [T_S0303_QRY_STYLE!]!
        mgrQuery_S0303_QRY_VENDOR(
            data: I_S0303_QRY_VENDOR!
        ): [T_S0303_QRY_VENDOR!]!
        mgrQuery_S0303_QRY_STYLE_BY_BUYER(
            data: I_S0303_QRY_STYLE_BY_BUYER!
        ): [T_S0303_QRY_STYLE!]!
        mgrQuery_S0303_QRY_BUYER(
            data: I_S0303_QRY_BUYER!
        ): [T_S0303_QRY_BUYER!]!
        mgrQuery_S0303_QRY_BUYER_BY_STYLE(
            data: I_S0303_QRY_BUYER_BY_STYLE!
        ): [T_S0303_QRY_BUYER!]!
        mgrQuery_S0303_QRY_NATION(
            data: I_S0303_QRY_NATION!
        ): [T_S0303_QRY_NATION!]!
        mgrQuery_S0303_EXPORT_CONSUMPTION(
            data: DATA_EXPORT_CONSUMPTION
            grid: [GRID_EXPORT_CONSUMPTION!]!
        ): [Ret_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
    }

    input I_S0303_PROD_CDS {
        PROD_CD: String
        SIZE_LOSS: String
    }

    input I_S0303_PROD_MEMS {
        PROD_CD: String
        VERSION: String
        DL_FLAG: String
        MRP_CHECK: String
        MATL_TYPE2: String
        MATL_TYPE2_N: String
        MATL_NAME: String
        MATL_CD: String
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
        NET: String
        LOSS: String
        GROSS: String
        VENDOR_NAME: String
        VENDOR_STATUS: String
        VENDOR_STATUS_CD: String
        VENDOR_CD: String
        STD_GROSS: String
        SEQ: String
        S_FLAG: String
        S_MATL_CD: String
        S_USE_SIZE: String
        S_REMARK: String
        MATL_STATUS_CD: String
    }

    input I_S0303_UPDATE_ETC {
        STD_FLAG: String
        ALL_FLAG: String
        ALL_COLOR_FLAG: String
        NET: String
        LOSS: String
        USE_SIZE: String
        REMARK: String
        IS_TOP: String
        IS_BOTTOM: String
        MOVE_CNT: String
        ADD_POSITION: String
    }

    input I_S0303_CHANGE_VENDOR {
        VENDOR_CD: String
        VENDOR_NAME: String
    }

    type Mutation {
        mgrInsert_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM(
            datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
        ): [Ret_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
        mgrUpdate_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM(
            datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
        ): [Ret_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
        mgrDelete_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM(
            datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
        ): [Ret_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!

        mgrInsert_S0303_ALL_ADD_MATERIAL(
            datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
            datas1: [I_S0303_PROD_CDS!]!
            datas2: I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!
        ): [Ret_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
        mgrInsert_S0303_ALL_UPDATE_MATERIAL(
            datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
            datas1: [I_S0303_PROD_CDS!]!
            datas2: I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!
        ): [Ret_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
        mgrInsert_S0303_ALL_UPDATE_MATERIAL_MOVE_UP(
            datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
            datas1: [I_S0303_PROD_CDS!]!
            datas2: I_S0303_UPDATE_ETC!
        ): [Ret_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
        mgrInsert_S0303_ALL_UPDATE_MATERIAL_MOVE_DOWN(
            datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
            datas1: [I_S0303_PROD_CDS!]!
            datas2: I_S0303_UPDATE_ETC!
        ): [Ret_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
        mgrInsert_S0303_ALL_UPDATE_MATERIAL_NET_LOSS(
            datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
            datas1: [I_S0303_PROD_CDS!]!
            datas2: I_S0303_UPDATE_ETC!
        ): [Ret_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
        mgrInsert_S0303_UPDATE_SIZE_LOSS(
            datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
            datas1: [I_S0303_PROD_CDS!]!
            datas2: I_S0303_UPDATE_ETC!
        ): [Ret_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
        mgrInsert_S0303_ALL_UPDATE_MATERIAL_SIZE_USAGE(
            datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
            datas1: [I_S0303_PROD_CDS!]!
            datas2: I_S0303_UPDATE_ETC!
        ): [Ret_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
        mgrInsert_S0303_ALL_UPDATE_MATERIAL_DL_FLAG(
            datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
            datas1: [I_S0303_PROD_CDS!]!
            datas2: I_S0303_UPDATE_ETC!
        ): [Ret_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
        mgrInsert_S0303_ALL_UPDATE_MATERIAL_STD_LOSS_TO_LOSS(
            datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
            datas1: [I_S0303_PROD_CDS!]!
            datas2: I_S0303_UPDATE_ETC!
        ): [Ret_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
        mgrInsert_S0303_ALL_DELETE_MATERIAL(
            datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
            datas1: [I_S0303_PROD_CDS!]!
            datas2: I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!
        ): [Ret_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
        mgrInsert_S0303_ALL_CHANGE_MATERIAL(
            datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
            datas1: [I_S0303_PROD_CDS!]!
            datas2: I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!
        ): [Ret_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
        mgrInsert_S0303_CHANGE_VENDOR(
            datas: [I_S0303_CHANGE_VENDOR!]!
            datas1: [I_S0303_PROD_CDS!]!
            datas2: [I_S0303_PROD_MEMS!]!
        ): [Ret_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
        mgrInsert_S0303_CHANGE_VENDOR_bak(
            datas: [I_S0303_CHANGE_VENDOR!]!
            datas1: [I_S0303_PROD_CDS!]!
            datas2: [I_S0303_PROD_MEMS!]!
        ): [Ret_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
    }
`;

export default moduleTypedefs_S0303_MRP_RECORD_STYLE;
