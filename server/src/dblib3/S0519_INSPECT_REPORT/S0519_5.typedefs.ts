// MGR_S0519_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0519_5 = gql`
    input I_S0519_5 {
        PO_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        S_OUT_QTY: String
        SHORTAGE_QTY: String
        DEFECT_QTY: String
        FACIN_QTY: String
        LOCATION: String
        STSOUT_CD: String
        FILE_NAME: String
        FILE_URL: String
        FILE_OBJECT: String
        IN_DATE: String
        FACIN_DATE: String
        PACK_CD: String
        CUSTOMS_NO: String
        CT_QTY:String
        WEIGHT:String
        CBM:String
        PU_CD: String
        DELIVERY:String
        FACIN_CD:String
    }

    type Ret_S0519_5 {
        CODE: String
        id: Int
    }

    input I_S0519_5_FILEOBJ {
        FILE_KEY: String
        TITLE: String
        NAME: String
        URL: String
        OBJECT_NAME: String
        STSOUT_CD: String
    }

    type Mutation {
        mgrInsert_S0519_5_FACIN(
            datas: [I_S0519_5!]!
            datas1: I_S0519_5_FILEOBJ!
        ): [Ret_S0519_5!]!
        mgrInsert_S0519_5_UPDATE_LOCATION(
            datas: [I_S0519_5!]!
            datas1: I_S0519_5_FILEOBJ!
        ): [Ret_S0519_5!]!
        mgrInsert_S0519_5_FACIN_bak1(
            datas: [I_S0519_5!]!
            datas1: I_S0519_5_FILEOBJ!
        ): [Ret_S0519_5!]!
    }
`;

export default moduleTypedefs_S0519_5;
