// MGR_S0205_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0450_5 = gql`
    input I_S0450_5_END_ORDER {
        ORDER_CD: String
    }

    type Ret_S0450_5 {
        CODE: String
        id: Int
    }

    input I_S0450_5_CHANGE_FOB1 {
        ORDER_CD: String
        STYLE_CD: String
        AVR_PRICE: String
        ORDER_QTY: String
        CURR_CD: String
        USD_PRICE: String
    }

    input I_S0450_5_CHANGE_FOB2 {
        FOB_SEQ: String
        SHIP_QTY: String
        FOB: String
        FOB100: String
    }

    input I_S0450_5_UPDATE_DETAIL {
        ORDER_CD: String
        ORDER_STATUS: String
        PO_CD: String
    }

    input I_S0450_5_UPDATE_REMARK2 {
        REG_DATETIME: String
        PO_CD: String
        BUYER_CD: String
        PO_CONF_DATE: String
        TARGET_ETD: String
        TARGET_ETA: String
        VENDOR_NAME: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        NEED_QTY: String
        REMAIN_QTY_IN: String
        REMAIN_QTY_OUT: String
        DELAY_REASON: String
        REMARK: String
        EX_IN_DATE: String
        CUT_DATE: String
        ETD: String
        ETA: String
        DELIVERY_TYPE: String
        FARE_TYPE: String
        MATL_CD1: String
        SEQ: String
        PO_CONF_DATE2: String
        TARGET_ETD2: String
        TARGET_ETA2: String
        SHIP_QTY: String
        END_FLAG: String
        EX_IN_DATE2: String
        UPD_USER: String
        TOT_CNT: String
        S_IN_QTY: String
        S_OUT_QTY: String
        PU_CD: String
        S_FAC_IN_QTY: String
        REMAIN_QTY_FAC_IN: String
        VENDOR_TYPE: String
    }

    input I_S0450_5_UPDATE_REMARK1 {
        FACTORY_CD: String
        BUYER_CD: String
        VENDOR_TYPE: String
        VENDOR_CD: String
        PO_CD: String
        MATL_TYPE: String
        IS_NO_INPUT: String
        IS_NO_OUTPUT: String
        S_TARGET_ETD: String
        E_TARGET_ETD: String
        UPLOAD: String
        PU_CD: String
        REMARK: String
        IS_PRICE_0:String
    }

    type Mutation {
        mgrUpdate_S0450_5_UPDATE_REMARK(
            datas: I_S0450_5_UPDATE_REMARK1!
            datas1: [I_S0450_5_UPDATE_REMARK2!]!
        ): [Ret_S0450_5!]!

        mgrUpdate_S0450_5_END_ORDER(
            datas: [I_S0450_5_END_ORDER!]!
        ): [Ret_S0450_5!]!
        mgrUpdate_S0450_5_END_ORDER_CANCEL(
            datas: [I_S0450_5_END_ORDER!]!
        ): [Ret_S0450_5!]!
        mgrUpdate_S0450_5_CHANGE_FOB(
            datas1: I_S0450_5_CHANGE_FOB1!
            datas2: [I_S0450_5_CHANGE_FOB2!]!
        ): [Ret_S0450_5!]!
        mgrUpdate_S0450_5_UPDATE_DETAIL(
            datas: [I_S0450_5_UPDATE_DETAIL!]!
        ): [Ret_S0450_5!]!
    }
`;

export default moduleTypedefs_S0450_5;
