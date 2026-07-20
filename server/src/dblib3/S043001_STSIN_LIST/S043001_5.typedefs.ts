// MGR_S043001_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S043001_5 = gql`
    input I_S043001_5_1 {
        VENDOR_CD: String
        VENDOR_NAME: String
        PU_CD: String
        PO_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        IN_DATETIME: String
        REG_USER: String
        BUYER_CD: String
        MATL_TYPE: String
        TRADE_TERM: String
        BILL_TO: String
        CURR_CD: String
        EX_FACTORY: String
        PAY_DATE: String
        PAY_TERM: String
        PAY_CONDITION: String
        OVERSHORT: String
        STSIN_CD: String
        STSIN_QTY: String
        LC_QTY: String
        OVER_QTY: String
        FOC_QTY: String
        MOQ_QTY: String
        STSIN_AMT: String
        S_WEIGHT: String
        PO_AMT: String
        PO_QTY: String
        STOCK_AMT: String
        MOQ_AMT: String
        SURCHARGE_AMT: String
        OVERSHORT_NAME: String
        STSIN_TYPE: String
        LEADER_CONFIRM: String
        MOQ_CONFIRM: String
        SURCHARGE_CONFIRM: String
        PO_PRICE: String
        PAY_PRICE: String
        ORG_PO_PRICE: String
        ORG_PAY_PRICE: String
    }

    type Ret_S043001_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrDelete_S043001_5(datas: [I_S043001_5_1!]!): [Ret_S043001_5!]!
        mgrDelete_S043001_5_1105(datas: [I_S043001_5_1!]!): [Ret_S043001_5!]!
        mgrDelete_S043001_5_1118(datas: [I_S043001_5_1!]!): [Ret_S043001_5!]!
        mgrUpdate_S043001_Leader_Confirm(
            datas: [I_S043001_5_1!]!
        ): [Ret_S043001_5!]!
    }
`;

export default moduleTypedefs_S043001_5;
