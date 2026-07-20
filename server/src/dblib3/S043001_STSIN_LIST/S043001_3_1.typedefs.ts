// MGR_S043001_3_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한ql 불러오기
import { gql } from 'apollo-server';

// export default 활용해ql typeDefs 내보내기
const moduleTypedefs_S043001_3_1 = gql`
    type T_S043001_3_1 {
        PU_CD: String
        BUYER_CD: String
        PO_CD: String
        VENDOR_CD: String
        VENDOR_NAME: String
        MATL_TYPE: String
        CURR_CD: String
        S_AMT: Float
        S_PO_QTY: Float
        S_IN_QTY: Float
        S_OUT_QTY: Float
        PAY_TYPE: String
        EXP_DELIVERY_DATE: String
        PAY_DATE: String
        TARGET_ETA: String
        FACTORY_CD: String
        TRADE_TERM: String
        STSIN_CD: String
        PAYER: String
        END_FLAG: String
        END_DATE: String
        BILL_FLAG: String
        BILL_DATE: String
        CALC_FLAG: String
        IN_QTY: String
        IN_PRICE: String
        IN_CURR_CD: String
        IN_AMT: String
        S_IN_QTY1: String
        STSIN_AMT: String
        SURCHARGE_AMT: String
        MOQ_AMT: String
        OVERSHORT: String
    }

    input I_S043001_3_1 {
        BUYER_CD: String
        PO_CD: String
    }

    type Query {
        mgrQueryS043001_3_1(data: I_S043001_3_1!): [T_S043001_3_1!]!
    }
`;

export default moduleTypedefs_S043001_3_1;
