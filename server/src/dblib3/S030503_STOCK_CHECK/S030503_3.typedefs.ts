// MGR_S030503_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030503_3 = gql`
    input I_S030503_2 {
        PO_CD: String
        ORDER_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        RACK: String
        LOCATION: String
        REMAIN_QTY: String
        VENDOR_NAME: String
        STOCK_STATUS: String
        FACTORY_NAME: String
        FACTORY_CD: String
        NEW_FACTORY_CD: String
        REMARK: String
        PLAN_REMARK: String
        REASON_REMARK: String
        PO_SEQ: String
        MRP_SEQ: String
        MATL_SEQ: String
        MATL_PRICE: String
        CURR_CD: String
        STOCK_IDX: String
        ORG_STOCK_IDX: String
        ROOT_IDX: String
        VENDOR_CD: String
        MATL_KIND2: String
        STATUS_CD: String
        USE_QTY: String
        MATL_TYPE: String
        MATL_TYPE2: String
        MATL_TYPE_N: String
        MATL_TYPE2_N: String
        AUTHORITY: String
        CANCEL_REASON: String
    }

    input I_S030503_1 {
        ORDER_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        PO_MATL_CD: String
        USE_PO_TYPE_N: String
        USE_QTY: String
        PO_QTY: String
        CANCEL_QTY: String
        SUM_QTY: String
        VENDOR_NAME: String
        STOCK_CHK: String
        MRP_SEQ: String
        MATL_SEQ: String
        MATL_PRICE: String
        CURR_CD: String
        PO_MRP_SEQ: String
        REG_DATETIME: String
        STOCK_IDX: String
        RACK: String
        ROOT_IDX: String
        VENDOR_CD: String
        MATL_KIND2: String
        STATUS_CD: String
        FACTORY_CD: String
        NEW_FACTORY_CD: String
        CANCEL_REASON: String
        STOCK_PO_CD: String
        STOCK_PO_SEQ: String
        STOCK_FACTORY: String
    }

    input I_S030503_3 {
        PO_CD: String
        PO_SEQ: String
        USER_ID: String
        DEST_DATA: [I_S030503_1!]!
        SRC_DATA: [I_S030503_2!]!
    }

    type Ret_S030503_3 {
        CODE: String
        id: Int
    }

    input I_S030503_3_0 {
        PO_CD: String
        PO_SEQ: String
        USER_ID: String
        FACTORY_CD: String
        BUYER_CD: String
    }

    input I_S030503_3_1 {
        PO_CD: String
        PO_SEQ: String
        USER_ID: String
        PO_LOG_TYPE: String
    }

    type Mutation {
        mgrUseStock_S030503_3_1_N(datas: I_S030503_3!): [Ret_S030503_3!]!
        mgrUseStock_S030503_3_N_1(datas: I_S030503_3!): [Ret_S030503_3!]!
        mgrUseStock_S030503_3_N_N(datas: I_S030503_3!): [Ret_S030503_3!]!
        mgrAutoUseStock_S030503_3(datas: I_S030503_3_0!): [Ret_S030503_3!]!
        mgrAutoUseStock_S030503_3_bak(datas: I_S030503_3_0!): [Ret_S030503_3!]!
        mgrConfirmUseStock_S030503_3(datas: I_S030503_3_1!): [Ret_S030503_3!]!
        mgrStockCancel_S030503_3(datas: I_S030503_3!): [Ret_S030503_3!]!
    }
`;

export default moduleTypedefs_S030503_3;
