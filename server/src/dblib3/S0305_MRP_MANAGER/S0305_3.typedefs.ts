// MGR_S0305_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0305_3 = gql`
    input I_S0305_3_MAKE_ORDER_MRP {
        USER_ID: String
        PO_CD: String
        ORDER_CD: String
    }

    input I_S0305_3_PO_ADJUST2 {
        BUYER_CD: String
        PO_CD: String
        ORDER_CD: String
        ORDER_MRP_SEQ: String
    }

    input I_S0305_3_PO_ADJUST {
        PO_STATUS_NAME: String
        PO_STATUS: String
        PO_SEQ: String
        BUYER_NAME: String
        BUYER_CD: String
        PO_TYPE_NAME: String
        PO_TYPE: String
        PO_CD: String
        TARGET_ETA: String
        REG_DATETIME: String
        REG_USER: String
        UPD_DATETIME: String
        UPD_USER: String
        MRP_PACK_FLAG: String
        DOMESTIC_FLAG: String
        IMPORT_FLAG: String
        FACTORY_FLAG: String
        FACTORY2_FLAG: String
        FACTORY3_FLAG: String
        FACTORY4_FLAG: String
        FACTORY5_FLAG: String
        FACTORY_CD: String
        FACTORY_NAME: String
        USER_ID: String
        WORK_STATUS: String
        REQ_STATUS: String
        P_STATUS_CD: String
        MATL_DUE_DATE: String
        DUE_DATE: String
        PURCHASE_REQUEST: String
    }

    input I_S0305_3_PO_MST {
        PO_STATUS_NAME: String
        PO_STATUS: String
        PO_SEQ: String
        BUYER_NAME: String
        BUYER_CD: String
        PO_TYPE_NAME: String
        PO_TYPE: String
        PO_CD: String
        TARGET_ETA: String
        REG_DATETIME: String
        REG_USER: String
        UPD_DATETIME: String
        UPD_USER: String
        MRP_PACK_FLAG: String
        DOMESTIC_FLAG: String
        IMPORT_FLAG: String
        FACTORY_FLAG: String
        FACTORY2_FLAG: String
        FACTORY3_FLAG: String
        FACTORY4_FLAG: String
        FACTORY5_FLAG: String
        FACTORY_CD: String
        FACTORY_NAME: String
        USER_ID: String
        WORK_STATUS: String
        REQ_STATUS: String
        P_STATUS_CD: String
        MATL_DUE_DATE: String
        DUE_DATE: String
        PURCHASE_REQUEST: String
    }

    type Ret_S0305_3 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0305_MAKE_ORDER_MRP(
            datas: I_S0305_3_MAKE_ORDER_MRP!
        ): [Ret_S0305_3!]!
        mgrInsert_S0305_ADJUST_LOSS(
            datas: I_S0305_3_PO_ADJUST!
        ): [Ret_S0305_3!]!
        mgrInsert_S0305_ADJUST_LOSS_MRP_BY_ORDER(
            datas: I_S0305_3_PO_ADJUST2!
        ): [Ret_S0305_3!]!
        mgrInsert_S0305_PO_SETTLE(datas: I_S0305_3_PO_MST!): [Ret_S0305_3!]!
        mgrInsert_S0305_PURCHASE_REQUEST(
            datas: [I_S0305_3_PO_MST!]!
        ): [Ret_S0305_3!]!
        mgrInsert_S0305_PO_CANCEL(datas: I_S0305_3_PO_MST!): [Ret_S0305_3!]!
        mgrInsert_S0305_PO_END(datas: I_S0305_3_PO_MST!): [Ret_S0305_3!]!
    }
`;

export default moduleTypedefs_S0305_3;
