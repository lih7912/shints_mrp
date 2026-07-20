// MGR_S0431_3_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0431_3_1 = gql`
    type T_S0431_3_1 {
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
        VENDOR_TYPE: String
        VENDOR_TYPE_N: String
        NAT_NAME: String
        ORIGIN_PORT: String
        STSIN_CD: String
    }

    input I_S0431_3_1 {
        BUYER_CD: String
        PO_CD: String
        VENDOR_CD: String
    }

    type Query {
        mgrQueryS0431_3_1(data: I_S0431_3_1!): [T_S0431_3_1!]!
    }
`;

export default moduleTypedefs_S0431_3_1;
