// MGR_S052001_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S052001_2 = gql`
    type T_S052001_2 {
        OUT_DATE: String
        PO_CD: String
        ORDER_CD: String
        VENDOR_NAME: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        OUT_QTY0: Float
        remark: String
        PO_QTY: Float
        MATL_CD: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        IN_QTY: Float
        OUT_QTY: Float
        INFAC_QTY: Float
        OUTFAC_QTY: Float
        PURPOSE: String
    }

    input I_S052001_2 {
        S_OUT_DATE: String
        E_OUT_DATE: String
        BUYER_CD: String
        PO_CD: String
        ORDER_CD: String
        MATL_NAME: String
        SPEC: String
        COLOR: String
        DESC: String
        UNIT: String
        VENDOR_NAME: String
    }

    type Query {
        mgrQueryS052001_2(data: I_S052001_2!): [T_S052001_2!]!
    }
`;

export default moduleTypedefs_S052001_2;
