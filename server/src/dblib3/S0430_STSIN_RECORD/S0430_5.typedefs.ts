// MGR_S0430_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0430_5 = gql`
    input I_S0430_5_edit {
        PU_CD: String
        VENDOR_NAME: String
        EX_FACTORY: String
        STS_IN_AMT: String
        MOQ_AMT: String
        MOQ_AMT_CURR: String
        REG_USER: String
        PAY_CONDITION: String
        PAY_TYPE: String
        PAY_DATE: String
        BAL_AMT: String
        SURCHARGE_AMT: String
        SURCHARGE_AMT_CURR: String
        BUYER_NAME: String
        OVER_SHORT: String
        PAY_TERM: String
        BILL_TO: String
        IN_TYPE: String
    }

    input I_S0430_5_list1 {
        PU_STATUS: String
        REG_USER: String
        BUYER_CD: String
        BUYER_NAME: String
        PU_CD: String
        PO_CD: String
        VENDOR_NAME: String
        VENDOR_TYPE: String
        VENDOR_TYPE_N: String
        MATL_TYPE: String
        NORMI: String
        MRP_DATE: String
        ORDER_DATE: String
        DUE_DATE: String
        EX_FACTORY: String
        PAY_TERM: String
        CURR_CD: String
        VENDOR_CD: String
        TARGET_ETA: String
        ETA: String
        DEPOSIT_AMT: String
        LC_AMT: String
        PAY_CONDITION: String
        PAY_DATE: String
        BILL_TO: String
        OVER_SHORT: String
        PU_AMT: String
        STS_IN_AMT: String
        STS_OUT_AMT: String
        FACIN_AMT: String
        MOQ_AMT: String
        SURCHARGE_AMT: String
        BAL_AMT: String
        OVERSHORT_RATE: String
    }

    input I_S0430_5_list2 {
        PU_CD: String
        PO_CD: String
        PO_SEQ: String
        MATL_CD: String
        MATL_SEQ: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        MRP_QTY: String
        STOCK_QTY: String
        MOQ_QTY: String
        PO_QTY: String
        LEFTOVER_QTY: String
        PART_IN_QTY: String
        BAL_IN_QTY: String
        SHIP_QTY: String
        OVER_SHORT_QTY: String
        OVER_SHORT_RATE: String
        FOC_QTY: String
        CURR_CD: String
        MASTER_PRICE: String
        CONF_FLAG: String
        DIFF_PRICE: String
        PO_PRICE: String
        SHIP_AMT: String
        SURCHARGE_AMT: String
        SURCHARGE_PRICE: String
        SURCHARGE_REMARK: String
        SAVE_MOQ_QTY: String
        SAVE_PO_QTY: String
        SAVE_BAL_IN_QTY: String
        MOQ_REASON: String
    }

    type Ret_S0430_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0430_5_fullin(
            datas: I_S0430_5_edit!
            datas1: [I_S0430_5_list1!]!
            datas2: [I_S0430_5_list2!]!
        ): [Ret_S0430_5!]!
        mgrInsert_S0430_5_partin(
            datas: I_S0430_5_edit!
            datas1: [I_S0430_5_list1!]!
            datas2: [I_S0430_5_list2!]!
        ): [Ret_S0430_5!]!
        mgrDelete_S0430_5(datas: I_S0430_5_edit!): [Ret_S0430_5!]!
    }
`;

export default moduleTypedefs_S0430_5;
