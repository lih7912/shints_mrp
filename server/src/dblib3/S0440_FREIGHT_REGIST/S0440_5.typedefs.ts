// MGR_S0440_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0440_5 = gql`
    input I_S0440_5_MATL {
        MATL_CD: String
        MATL_NAME: String
        PO_QTY: String
        COLOR: String
        SPEC: String
        UNIT: String
    }

    input I_S0440_5 {
        SHIP_MODE: String
        CT_NO: String
        SENDER: String
        SHIP_DATE: String
        WEIGHT: String
        RECEIVER: String
        PAYMENT: String
        CBM: String
        BUYER_CD: String
        ORIGIN_PORT: String
        ETC_ORIGIN: String
        DESTINATION: String
        ETC_DESTINATION: String
        SHIP_LINE: String
        DESC: String
        REMARK: String
        TARGET_ETA: String
        AMOUNT: String
        BL_NO: String
        PLACE_CD: String
        STSOUT_CD: String
        PO_CD: String
        ORDER_CD: String
    }

    input I_S0440_5_2 {
        STSOUT_CD: String
    }

    type Ret_S0440_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0440_5(
            datas: I_S0440_5!
            datas1: [I_S0440_5_MATL!]!
        ): [Ret_S0440_5!]!
        mgrUpdate_S0440_5(
            datas: I_S0440_5!
            datas1: [I_S0440_5_MATL!]!
        ): [Ret_S0440_5!]!
        mgrDelete_S0440_5(datas: [I_S0440_5_2!]!): [Ret_S0440_5!]!
    }
`;

export default moduleTypedefs_S0440_5;
