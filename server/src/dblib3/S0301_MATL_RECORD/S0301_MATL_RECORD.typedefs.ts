// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0301_MATL_RECORD = gql`
    input I_S0301_MATL_RECORD_EDT_KCD_MATL_MEM {
        MATL_CD: String
        MATL_SEQ: String
        MATL_PRICE: String
        CURR_CD: String
        CURR_CD_NAME: String
        CONF_FLAG: String
        MATL_CONF_FLAG_NAME: String
        PRICE_TYPE: String
        PRICE_TYPE_NAME: String
        CURR_DATE: String
        REG_USER: String
        UPD_USER: String
        UPD_DATETIME: String
        REG_DATETIME: String
        UPDATE_REASON: String
    }

    type Ret_S0301_MATL_RECORD_EDT_KCD_MATL_MEM {
        id: Int!
        CODE: String!
    }

    input I_S0301_MATL_RECORD_EDT_KCD_MATL_MST_MULTI {
        MATL_CD: String
    }

    input I_S0301_MATL_RECORD_EDT_KCD_MATL_MST {
        MATL_TYPE2: String
        MATL_TYPE2_NAME: String
        MATL_CD: String
        MATL_TYPE: String
        MATL_TYPE_NAME: String
        VENDOR_CD: String
        VENDOR_NAME: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        MATL_UNIT_NAME: String
        MATL_PRICE: String
        CURR_CD: String
        S_MATL_PRICE: String
        S_CURR_CD: String
        WEIGHT: String
        BOX_UNIT: String
        BOX_UNIT_NAME: String
        STATUS_CD: String
        STATUS_CD_NAME: String
        VENDOR_STATUS_CD: String
        UPD_USER: String
        REG_USER: String
        VENDOR_TYPE: String
        HS_CD: String
        ADD_RATE: String
        ADD_AMT: String
        ADD_LOSS: String
        REG_DATETIME: String
        MATL_SEQ_MAX: String
        PRICE_TYPE: String
        V_COMP: String
        COMP1: String
        COMP1_P: String
        COMP2: String
        COMP2_P: String
        COMP3: String
        COMP3_P: String
        COMP4: String
        COMP4_P: String
        OFFER_SPEC: String
        UPDATE_REASON: String
        rep_matl_cd: String
        id: Int
        MATL_MEM: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MEM]!
        MATL_SALE: [I_S0301_MATL_RECORD_EDT_KCD_MATL_SALE]!
    }

    type Ret_S0301_MATL_RECORD_EDT_KCD_MATL_MST {
        id: Int!
        CODE: String!
    }

    input I_S0301_MATL_RECORD_EDT_KCD_MATL_MST1 {
        UNIT: String
        MATL_PRICE: String
        CURR_CD_M: String
        CURR_CD_S: String
        VENDOR_CD: String
    }

    type Ret_S0301_MATL_RECORD_EDT_KCD_MATL_MST1 {
        id: Int!
        CODE: String!
    }

    input I_S0301_MATL_RECORD_EDT_KCD_MATL_SALE {
        MATL_CD: String
        MATL_SEQ: String
        MATL_PRICE: String
        CURR_CD: String
        CURR_CD_NAME: String
        CONF_FLAG: String
        PRICE_TYPE: String
        CURR_DATE: String
        REG_DATETIME: String
        UPD_DATETIME: String
        UPD_USER: String
        REG_USER: String
    }

    type Ret_S0301_MATL_RECORD_EDT_KCD_MATL_SALE {
        id: Int!
        CODE: String!
    }

    input I_S0301_MATL_RECORD_QRY_KCD_MATL_MST {
        MATL_CD: String
        MOM_CD: String
        MATL_NAME: String
        VENDOR_CD: String
        COLOR: String
        SPEC: String
        STATUS_CD: String
        MATL_TYPE: String
        MATL_TYPE2: String
        VENDOR_NAME: String
    }

    type T_S0301_MATL_RECORD_TBL_KCD_MATL_MEM {
        MATL_CD: String
        MATL_SEQ: String
        MATL_PRICE: String
        CURR_CD: String
        CURR_CD_NAME: String
        CONF_FLAG: String
        MATL_CONF_FLAG_NAME: String
        PRICE_TYPE: String
        PRICE_TYPE_NAME: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        UPDATE_REASON: String
    }

    type T_S0301_MATL_RECORD_TBL_KCD_MATL_MST {
        MATL_TYPE2: String
        MATL_TYPE2_NAME: String
        MATL_CD: String
        MATL_TYPE: String
        MATL_TYPE_NAME: String
        VENDOR_CD: String
        VENDOR_NAME: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        MATL_UNIT_NAME: String
        MATL_PRICE: String
        CURR_CD: String
        S_MATL_PRICE: String
        S_CURR_CD: String
        WEIGHT: String
        BOX_UNIT: String
        BOX_UNIT_NAME: String
        STATUS_CD: String
        STATUS_CD_NAME: String
        VENDOR_STATUS_CD: String
        UPD_USER: String
        REG_USER: String
        VENDOR_TYPE: String
        HS_CD: String
        V_COMP: String
        OFFER_SPEC: String
        COMP1: String
        COMP1_P: String
        COMP2: String
        COMP2_P: String
        COMP3: String
        COMP3_P: String
        COMP4: String
        COMP4_P: String
        ADD_RATE: String
        ADD_AMT: String
        ADD_LOSS: String
        REG_DATETIME: String
        MATL_SEQ_MAX: String
        PRICE_TYPE: String
        rep_matl_cd: String
    }

    type T_S0301_MATL_RECORD_TBL_KCD_MATL_SALE {
        MATL_CD: String
        MATL_SEQ: String
        MATL_PRICE: String
        CURR_CD: String
        CURR_CD_NAME: String
        CONF_FLAG: String
        PRICE_TYPE: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
    }

    type T_S0301_MATL_RECORD_CODE {
        VENDOR_CD: [BASE_QRY_KCD_VENDOR!]!
        CURR_CD: [BASE_QRY_KCD_CODE!]!
        MATL_CONF_FLAG: [BASE_QRY_KCD_CODE!]!
        PRICE_TYPE: [BASE_QRY_KCD_CODE!]!
        STATUS_CD: [BASE_QRY_KCD_CODE!]!
        MATL_TYPE: [BASE_QRY_KCD_CODE!]!
        MATL_UNIT: [BASE_QRY_KCD_CODE!]!
        BOX_UNIT: [BASE_QRY_KCD_CODE!]!
        KIND2: [BASE_QRY_KCD_MATL_TYPE2!]!
        COMP: [BASE_QRY_KCD_CODE!]!
        HS_CD: [BASE_QRY_KCD_HSCODE!]!
    }

    input I_S0301_QRY_VENDOR {
        VENDOR_CD: String
    }
    type T_S0301_QRY_VENDOR {
        VENDOR_CD: String
        VENDOR_NAME: String
    }

    input I_S0301_QRY_STYLE_LIST {
        MATL_CD: String
    }
    type T_S0301_QRY_STYLE_LIST {
        matl_cd: String
        prod_cd: String
        style_name: String
        net: String
        loss: String
        use_size: String
        remark: String
        order_cd: String
    }

    input I_S0301_QRY_REMARK_LIST {
        MATL_CD: String
    }
    type T_S0301_QRY_REMARK_LIST {
        upd_user: String
        upd_datetime: String
        update_remark: String
    }

    input I_S0301_QRY_BATCH_SAVE {
        reg_user: String
        reg_datetime: String
    }

    type T_S0301_MATL_RECORD_TBL_KCD_MATL_MST_0 {
        message: String
        datas: [T_S0301_MATL_RECORD_TBL_KCD_MATL_MST!]!
    }

    type Query {
        mgrQuery_S0301_MATL_RECORD_TBL_KCD_MATL_MST(
            data: I_S0301_MATL_RECORD_QRY_KCD_MATL_MST!
        ): T_S0301_MATL_RECORD_TBL_KCD_MATL_MST_0!
        mgrQuery_S0301_MATL_RECORD_TBL_KCD_MATL_MEM(
            data: I_S0301_MATL_RECORD_QRY_KCD_MATL_MST!
        ): [T_S0301_MATL_RECORD_TBL_KCD_MATL_MEM!]!
        mgrQuery_S0301_MATL_RECORD_TBL_KCD_MATL_SALE(
            data: I_S0301_MATL_RECORD_QRY_KCD_MATL_MST!
        ): [T_S0301_MATL_RECORD_TBL_KCD_MATL_SALE!]!
        mgrQuery_S0301_MATL_RECORD_CODE: T_S0301_MATL_RECORD_CODE!
        mgrQuery_S0301_QRY_VENDOR(
            data: I_S0301_QRY_VENDOR!
        ): [T_S0301_QRY_VENDOR!]!
        mgrQuery_S0301_QRY_STYLE_LIST(
            data: I_S0301_QRY_STYLE_LIST!
        ): [T_S0301_QRY_STYLE_LIST!]!
        mgrQuery_S0301_QRY_REMARK_LIST(
            data: I_S0301_QRY_REMARK_LIST!
        ): [T_S0301_QRY_REMARK_LIST!]!
        mgrQuery_S0301_QRY_BATCH_SAVE(
            data: I_S0301_QRY_BATCH_SAVE!
        ): [T_S0301_MATL_RECORD_TBL_KCD_MATL_MST!]!
    }

    input I_S0301_SET_MOMCODE {
        MATL_CD: String
    }

    input I_S0301_BATCH_SAVE1 {
        MATL_CD: String
    }

    input I_S0301_BATCH_SAVE2 {
        MATL_NAME: String
        SPEC: String
        COLOR: String
    }

    input I_S0301_BATCH_UPDATE1 {
        MATL_TYPE: String
        MATL_TYPE2: String
        STATUS_CD: String
        BOX_UNIT: String
        ADD_RATE: String
        ADD_LOSS: String
    }

    input I_S0301_BATCH_UPDATE2 {
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
    }

    input I_S0301_BATCH_PRICE {
        MATL_CD: String
    }

    input I_S0301_BATCH_PRICE2 {
        IS_MASTER: String
        IS_SALES: String
        CURR_CD: String
        PRICE: String
    }

    input I_S0301_REMARK {
        MATL_CD: String
        update_remark: String
        update_user: String
        update_datetime: String
    }

    type Result {
        id: String
        CODE: String
    }

    type Mutation {
        mgrInsert_S0301_BATCH_PRICE(
            datas: [I_S0301_BATCH_PRICE!]!
            datas1: I_S0301_BATCH_PRICE2!
        ): [Ret_S0301_MATL_RECORD_EDT_KCD_MATL_MEM!]!
        mgrInsert_S0301_MATL_RECORD_EDT_KCD_MATL_MEM(
            datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MEM!]!
        ): [Ret_S0301_MATL_RECORD_EDT_KCD_MATL_MEM!]!
        mgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_MEM(
            datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MEM!]!
        ): [Ret_S0301_MATL_RECORD_EDT_KCD_MATL_MEM!]!
        mgrDelete_S0301_MATL_RECORD_EDT_KCD_MATL_MEM(
            datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MEM!]!
        ): [Ret_S0301_MATL_RECORD_EDT_KCD_MATL_MEM!]!

        mgrInsert_S0301_MATL_RECORD_EDT_KCD_MATL_MST(
            datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MST!]!
        ): [Ret_S0301_MATL_RECORD_EDT_KCD_MATL_MST!]!
        mgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_MST(
            datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MST!]!
        ): [Ret_S0301_MATL_RECORD_EDT_KCD_MATL_MST!]!
        mgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_MST_MULTI(
            datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MST!]!
            datas1: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MST_MULTI!]!
        ): [Ret_S0301_MATL_RECORD_EDT_KCD_MATL_MST!]!
        mgrDelete_S0301_MATL_RECORD_EDT_KCD_MATL_MST(
            datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MST!]!
        ): [Ret_S0301_MATL_RECORD_EDT_KCD_MATL_MST!]!

        mgrInsert_S0301_MATL_RECORD_EDT_KCD_MATL_MST1(
            datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MST1!]!
        ): [Ret_S0301_MATL_RECORD_EDT_KCD_MATL_MST1!]!
        mgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_MST1(
            datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MST1!]!
        ): [Ret_S0301_MATL_RECORD_EDT_KCD_MATL_MST1!]!
        mgrDelete_S0301_MATL_RECORD_EDT_KCD_MATL_MST1(
            datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MST1!]!
        ): [Ret_S0301_MATL_RECORD_EDT_KCD_MATL_MST1!]!

        mgrInsert_S0301_MATL_RECORD_EDT_KCD_MATL_SALE(
            datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_SALE!]!
        ): [Ret_S0301_MATL_RECORD_EDT_KCD_MATL_SALE!]!
        mgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_SALE(
            datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_SALE!]!
        ): [Ret_S0301_MATL_RECORD_EDT_KCD_MATL_SALE!]!
        mgrDelete_S0301_MATL_RECORD_EDT_KCD_MATL_SALE(
            datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_SALE!]!
        ): [Ret_S0301_MATL_RECORD_EDT_KCD_MATL_SALE!]!

        mgrUpdate_S0301_SET_MOMCODE(
            datas: I_S0301_MATL_RECORD_QRY_KCD_MATL_MST!
            datas1: [I_S0301_SET_MOMCODE!]!
        ): [Ret_S0301_MATL_RECORD_EDT_KCD_MATL_MST!]!
        mgrInsert_S0301_BATCH_SAVE(
            datas: I_S0301_BATCH_SAVE1!
            datas1: [I_S0301_BATCH_SAVE2!]!
        ): [Ret_S0301_MATL_RECORD_EDT_KCD_MATL_MST!]!
        mgrInsert_S0301_BATCH_UPDATE(
            datas: I_S0301_BATCH_UPDATE1!
            datas1: [I_S0301_BATCH_UPDATE2!]!
        ): [Ret_S0301_MATL_RECORD_EDT_KCD_MATL_MST!]!
        mgrInsert_S0301_BATCH_DELETE(
            datas: I_S0301_BATCH_UPDATE1!
            datas1: [I_S0301_BATCH_UPDATE2!]!
        ): [Ret_S0301_MATL_RECORD_EDT_KCD_MATL_MST!]!
        mgrUpdate_S0301_ETC_UPDATE(
            datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MST!]!
        ): [Ret_S0301_MATL_RECORD_EDT_KCD_MATL_MST!]!
        mgrUpdate_S0301_REMARK(datas: [I_S0301_REMARK!]!): Result
    }
`;

export default moduleTypedefs_S0301_MATL_RECORD;
