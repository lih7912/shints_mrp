// MGR_S0516_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0516_5 = gql`
    input I_S0516_5 {
        PO_CD: String
        PO_SEQ: String
        MATL_CD: String
        ORDER_CD: String
        MRP_SEQ: String
        STOCK_IDX: String
        USE_QTY: String
        PO_QTY: String
        DIFF_PO_TYPE: String
        USE_PO_TYPE: String
        STOCK_IDX2: String
        USE_QTY2: String
        CONF_FLAG: String
        CONF_USER: String
        REQ_QTY: String
        OKUSE_QTY: String
        DEFECT_QTY: String
        SHORT_QTY: String
        LOSS_QTY: String
        BALANCE: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        NOTUSE_QTY: String
        REASON: String
        CANCEL_QTY: String
        RACK: String
        LOCATION: String
        WARE_NAME: String
        VENDOR_NAME: String
        ORG_QTY: Float
        ORG_PO_CD: String
        ORG_MATL_CD: String
        CONDITION: String
        USE_DATE: String
        HS_CODE:String
        COMPOSITION:String
        WEIGHT:String
        PRICE:String
        CURR_CD:String
    }

    type Ret_S0516_5 {
        CODE: String
        id: String
    }

    type Mutation {
        mgrInsert_S0516_5_stock_confirm(datas: [I_S0516_5!]!): [Ret_S0516_5!]!
        mgrUpdate_S0516_5_stock_cancel(datas: [I_S0516_5!]!): [Ret_S0516_5!]!
        mgrInsert_S0516_5_stock_confirm_purchase(
            datas: [I_S0516_5!]!
        ): [Ret_S0516_5!]!
        mgrUpdate_S0516_5_stock_cancel_purchase(
            datas: [I_S0516_5!]!
        ): [Ret_S0516_5!]!
    }
`;

export default moduleTypedefs_S0516_5;
