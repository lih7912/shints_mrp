// MGR_S0410_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0410_5 = gql`
    input I_S0410_5 {
        PO_CD: String
        ORDER_CD: String
        VENDOR_NAME: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        IN_QTY: Float
        TOT_QTY: Float
        LC_QTY: Float
        BILL_TYPE: String
        IN_DATE: String
        IN_TYPE_NAME: String
        PAY_PRICE: Float
        PAY_CURR_CD: String
        PAY_DATE: String
        PAY_REPORT: String
        LC_BILL_NO: String
        MATL_CD: String
        MIN_FLAG: String
        STOCK_QTY: Float
        OUT_STATUS: String
        OUT_QTY: Float
        PO_SEQ: Int
        MRP_SEQ: Int
        IN_DATETIME: String
        BILL_FLAG: String
        IN_TYPE: String
        VENDOR_TYPE: String
        STOCK_IDX: String
        CALC_FLAG: String
        BANK_CD: String
        USER_ID: String
    }

    type Ret_S0410_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0410_5(datas: [I_S0410_5!]!): [Ret_S0410_5!]!
        mgrInsert_S0410_5_1(datas: [I_S0410_5!]!): [Ret_S0410_5!]!
    }
`;

export default moduleTypedefs_S0410_5;
