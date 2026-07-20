// MGR_S0439_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0439_5 = gql`
    input I_S0439_5 {
        BUYER_CD: String
        VENDOR_CD: String
        MATL_TYPE: String
        PO_CD: String
        S_PO_QTY: String
        FACTORY_CD: String
        MATL_DUE_DATE: String
        PROD_DUE_DATE: String
        PLAN_FLAG: String
        PLAN_ETD: String
        PLAN_ETA: String
    }

    input I_S0439_5_1 {
        PAY_DATE: String
        TYPE: String
        REG_USER: String
        PU_CD: String
        VENDOR_NAME: String
        CURR_CD: String
        PAY_AMOUNT: String
        DEPOSIT_AMT: String
        DEPOSIT_RATE: String
        LC_FLAG: String
        LC_RATE: String
        DEPOSIT_GW_STATUS: String
        DEPOSIT_GW_STATUS_N: String
    }

    input I_S0439_5_2 {
        PO_CD: String
        PO_SEQ: String
        ORDER_CD: String
        MATL_CD: String
        MRP_SEQ: String
        MATL_SEQ: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        MRP_QTY: String
        MRP_QTY1: String
        STOCK_QTY: String
        MOQ_QTY: String
        PO_QTY: String
        DIFF_QTY: String
        CURR_CD: String
        MASTER_PRICE: String
        MOQ_AMT: String
        MOQ_PRICE: String
        FREIGHT_AMT: String
        FREIGHT_PRICE: String
        OTHER_AMT: String
        OTHER_PRICE: String
        SURCHAGE_REMARK: String
        PO_PRICE: String
        STATUS: String
    }

    input I_S0439_5_1 {
        PU_CD: String
    }

    type Ret_S0439_5 {
        CODE: String
        id: String
    }

    type Mutation {
        mgrInsert_S0439_5_1(
            datas: [I_S0439_5_1!]!
            datas1: [I_S0439_5_2!]!
        ): [Ret_S0439_5!]!
        mgrDelete_S0439_5(datas: I_S0439_5_1!): [Ret_S0439_5!]!
    }
`;

export default moduleTypedefs_S0439_5;
