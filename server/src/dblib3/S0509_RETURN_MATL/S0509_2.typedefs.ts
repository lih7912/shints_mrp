// MGR_S0509_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0509_2 = gql`
    type T_S0509_2_SUB {
        OUT_NAME: String
        OUT_QTY: String
    }

    type T_S0509_2 {
        PO_CD: String
        ORDER_CD: String
        MATL_CD: String
        PU_CD: String
        PO_QTY2: String
        PO_QTY: String
        MRP_QTY: String
        PO_SEQ: String
        IN_QTY: String
        OUT_QTY: String
        INFAC_QTY: String
        OUTFAC_QTY: String
        MATL_NAME: String
        VENDOR_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        CURR_CD: String
        MASTER_PRICE: String
        OUTFAC_QTY2: String
        LINEOUT_QTY: String
        RETURN_QTY: String
        STOCK_QTY: String
        LOST_QTY: String
        BAL_QTY: String
        VENDOR_CD: String
        REMARK: String
        FACOUT_ARRAY: [T_S0509_2_SUB!]!
    }

    input I_S0509_2 {
        USER_ID: String
        BUYER_CD: String
        PO_CD: String
        VENDOR_CD: String
        ORDER_CD: String
        S_IN_DATE: String
        E_IN_DATE: String
        PURPOSE: String
        IS_BALANCE: String
        REMARK: String
        OUT_DATE: String
    }

    type Query {
        mgrQueryS0509_2(data: I_S0509_2!): [T_S0509_2!]!
        mgrQueryS0509_2_bak(data: I_S0509_2!): [T_S0509_2!]!
        mgrQueryS0509_2_0(data: I_S0509_2!): [T_S0509_2!]!
    }
`;

export default moduleTypedefs_S0509_2;
