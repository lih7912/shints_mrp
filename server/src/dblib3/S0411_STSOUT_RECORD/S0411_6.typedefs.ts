// MGR_S0411_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0411_6 = gql`
    input I_S0411_6 {
        USE_MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        MATL_PRICE: Float
        CURR_CD: String
        UNIT: String
        STOCK_QTY: String
        OUT_QTY: Float
        VENDOR_NAME: String
        FACTORY: String
        OUTPUT_FLAG: String
        STOCK_IDX: String
        USE_DATETIME: String
        FACTORY_CD: String
        USE_PO_CD: String
        USE_ORDER_CD: String
    }

    input I_S0411_6_1 {
        FROM_TYPE: String
        TO_TYPE: String
        DELIVERY_TYPE: String
        OUT_DATE: String
        CD_QTY: String
        CT_NO: String
        REASON_TYPE: String
        WEIGHT_CBM: String
        CHARGE1: String
        CHARGE2: String
        REMARK: String
        PL_NO: String
        SENDOR: String
        RECEIVER: String
        IS_STOCKOUT: String
        STOCKOUT_PO_CD: String
        USER_ID: String
    }

    type Ret_S0411_6 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0411_6(
            datas: [I_S0411_6!]!
            datas1: I_S0411_6_1!
        ): [Ret_S0411_6!]!
    }
`;

export default moduleTypedefs_S0411_6;
