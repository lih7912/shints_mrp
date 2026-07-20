// MGR_S0410_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0410_3 = gql`
    type T_S0410_3 {
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
    }

    input I_S0410_3 {
        S_IN_DATE: String
        E_IN_DATE: String
        PO_CD: String
        MATL_CD: String
        BUYER_CD: String
        MATL_NAME: String
        VENDOR_CD: String
        VENDOR_TYPE: String
        USER_ID: String
    }

    type T_S0410_3_1 {
        VENDOR_TYPE: [BASE_QRY_KCD_CODE!]!
        VENDOR_CD: [BASE_QRY_KCD_VENDOR!]!
        PO_CD: [BASE_QRY_KCD_CODE!]!
        BILL_TYPE: [BASE_QRY_KCD_CODE!]!
        BILL_TYPE2: [BASE_QRY_KCD_CODE!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        USER_ID: [BASE_QRY_KCD_USER!]!
        BANK_CD: [BASE_QRY_KCD_BANK!]!
    }

    type Query {
        mgrQueryS0410_3(data: I_S0410_3!): [T_S0410_3!]!
        mgrQueryS0410_3_1(data: I_S0410_3!): T_S0410_3_1!
    }
`;

export default moduleTypedefs_S0410_3;
