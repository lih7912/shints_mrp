// MGR_S052001_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S052001_5 = gql`
    input I_S052001_5 {
        OUT_DATE: String
        PO_CD: String
        ORDER_CD: String
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
        VENDOR_NAME: String
    }

    type Ret_S052001_5 {
        CODE: String
        id: Int
    }

    input I_S052001_5_1 {
        FRT_DATE: String
        BL_NO: String
        AMOUNT: String
        WEIGHT: String
        ETA: String
        USER_ID: String
    }

    type Mutation {
        mgrInsert_S052001_5_CANCEL(datas: [I_S052001_5!]!): [Ret_S052001_5!]!
        mgrUpdate_S052001_5_LOCATION(datas: [I_S052001_5!]!): [Ret_S052001_5!]!
    }
`;

export default moduleTypedefs_S052001_5;
