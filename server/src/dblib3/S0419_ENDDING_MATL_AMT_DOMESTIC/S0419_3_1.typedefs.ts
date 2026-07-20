// MGR_S0419_3_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한ql 불러오기
import { gql } from 'apollo-server';

// export default 활용해ql typeDefs 내보내기
const moduleTypedefs_S0419_3_1 = gql`
    type T_S0419_3_1 {
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
        PUR_FACTORY: String
        BILL_CD: String
        VENDOR_TYPE: String
        VENDOR_TYPE_NAME: String
        IN_DATETIME: String
        DEPOSIT_AMT: String
        LC_AMT: String
        PAY_AMT: String
        LC_FLAG: String
        TT_FLAG: String
        TAX_KIND: String
        BUYER_NAME: String
    }

    input I_S0419_3_1 {
        S_IN_DATE: String
        E_IN_DATE: String
        VENDOR_TYPE: String
        VENDOR_CD: String
        CLOSE_OX: String
        CURR_CD: String
        PO_CD: String
        BUYER_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        CHANGER: String
    }

    type Query {
        mgrQueryS0419_3_1(data: I_S0419_3_1!): [T_S0419_3_1!]!
    }
`;

export default moduleTypedefs_S0419_3_1;
