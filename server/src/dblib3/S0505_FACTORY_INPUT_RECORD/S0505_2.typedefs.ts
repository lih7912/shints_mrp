// MGR_S0505_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0505_2 = gql`
    type T_S0505_2_DATA {
        VENDOR_NAME: String
        PR_NUM: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        CURR_CD: String
        MATL_PRICE: Float
        TOT_CNT: String
        ORD_CNT: String
        STOCK_QTY: Float
        REMARK: String
        REMARK_BVT: String
        VENDOR_TYPE: String
        PAY_TERM: Int
        IN_TOT: Float
        ETC_ERROR: Float
        ETC_SHORTAGE: Float
        ETC_OTHERS: Float
        ETC_GUBUN: String
        FACIN_VAL: Float
        INPUT: Float
        STS_OUT_QTY: Float
    }

    type T_S0505_2_ETC {
        DELIVERY: String
        IN_DATE: String
        MATL_CD: String
        ETC_TYPE: String
        IN_QTY: Float
    }

    type T_S0505_2 {
        DATA1: [T_S0505_2_DATA!]!
        DATA2: [T_S0505_2_ETC!]!
        DATA3: [T_S0505_2_ETC!]!
        DATA4: [T_S0505_2_ETC!]!
        DATA5: [T_S0505_2_ETC!]!
    }

    input I_S0505_2 {
        PO_NO: String
        DELIVERY: String
        VENDOR_CD: String
        MATL_NAME: String
        COLOR: String
        UNIT: String
        SPEC: String
        IN_DELIVERY: String
    }

    type Query {
        mgrQueryS0505_2(data: I_S0505_2!): T_S0505_2!
    }
`;

export default moduleTypedefs_S0505_2;
