// MGR_S0419_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0419_2 = gql`
    type T_S0419_2 {
        PO_CD: String
        BUYER_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        TOT_QTY: String
        IN_QTY: String
        IN_CURR_CD: String
        IN_PRICE: String
        PAY_CURR_CD: String
        PAY_PRICE: String
        MATL_PRICE: String
        TT_FLAG: String
        WARE_NAME: String
        IN_AMT: String
        END_FLAG: String
        END_DATE: String
        PAY_DATE: String
        BILL_FLAG: String
        BILL_DATE: String
        VENDOR_NAME: String
        PO_SEQ: Int
        ORDER_CD: String
        MRP_SEQ: Int
        IN_DATETIME: String
        MATL_SEQ: Int
        CALC_FLAG: String
        VENDOR_CD: String
        PUR_FACTORY: String
        PAY_REPORT: String
        VENDOR_TYPE: String
        VENDOR_TYPE_N: String
        BILL_CD: String
    }

    input I_S0419_2 {
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
        mgrQueryS0419_2_0(data: I_S0419_2!): [T_S0419_2!]!
        mgrQueryS0419_2(data: I_S0419_2!): [T_S0419_2!]!
    }
`;

export default moduleTypedefs_S0419_2;
