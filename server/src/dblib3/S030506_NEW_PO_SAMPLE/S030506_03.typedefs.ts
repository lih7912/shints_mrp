// MGR_S030506_02.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030506_03 = gql`
    input I_S030506_03 {
        BUYER_CD: String
        FACTORY_CD: String
        PLACE_CD: String
        PO_CD: String
        PO_SEQ: String
        ORDER_CD: String
        PO_TYPE: String
        END_REMARK: String
        PO_DATE: String
        DELIVERY_DATE: String
        MATERIAL_DUE_DATE: String
    }

    input I_S030506_03_1 {
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        MATL_PRICE: String
        CURR_CD: String
        UNIT: String
        STOCK_QTY: String
        PO_QTY: String
        PO_TYPE_NAME: String
        REASON_TYPE: String
        FARE_TYPE: String
        REMARK: String
        VENDOR_NAME: String
        STOCK_STATUS: String
        USE_PO_TYPE: String
        USE_PO_CD: String
        USE_PO_SEQ: String
        USE_ORDER_CD: String
        USE_MRP_SEQ: String
        USE_MATL_SEQ: String
        MATL_SEQ: String
        FACTORY_CD: String
        STOCK_IDX: String
        REMARK2: String
        PLAN_REMARK: String
        VENDOR_CD: String
        ORDER_CD: String
        PO_SEQ: String
        PO_TYPE: String
        PO_DATE: String
        DELIVERY_DATE: String
        MATERIAL_DUE_DATE: String
        PLACE_CD: String
        BUYER_NAME: String
        FACTORY_NAME: String
        RACK: String
    }

    type Ret_S030506_03 {
        CODE: String
        id: String
    }

    type Mutation {
        mgrAddPo_S030506_03(
            datas: I_S030506_03!
            datas1: [I_S030506_03_1!]!
        ): [Ret_S030506_03!]!
        mgrUpdatePo_S030506_03(
            datas: I_S030506_03!
            datas1: [I_S030506_03_1!]!
        ): [Ret_S030506_03!]!
        mgrDeletePo_S030506_03(
            datas: I_S030506_03!
            datas1: [I_S030506_03_1!]!
        ): [Ret_S030506_03!]!
    }
`;

export default moduleTypedefs_S030506_03;
