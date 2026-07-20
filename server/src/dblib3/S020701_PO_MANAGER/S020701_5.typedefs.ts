// MGR_S020701_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S020701_5 = gql`
    input I_S020701_5_1 {
        BUYER_CD: String
        PO_CD: String
        MATL_ETA: String
        CD: String
        REG_DATE: String
        LOADING_PORT: String
        DESTINATION: String
        REG_USER: String
        TOLENCE: String
        TOLENCE_N: String
        PART_SHIP: String
        TRANS_SHIP: String
    }

    input I_S020701_5_2 {
        id: Int
        REF_ORDER_NO: String
        PO_CD: String
        BUYER_NAME: String
        ORDER_CD: String
        STYLE_NAME: String
        STYLE_CD: String
        TOT_CNT: String
        UNIT: String
        PRICE_TERM: String
        AVR_PRICE: String
        AMT: String
        CURR_CD: String
        DUE_DATE: String
        ORDER_CD2: String
        REG_USER: String
        REG_DATETIME: String
        ORDER_STATUS_NAME: String
        ORDER_STATUS: String
    }

    type Ret_S020701_5 {
        CODE: String
        id: String
    }

    type Mutation {
        mgrInsert_S020701_5(
            datas: I_S020701_5_1!
            datas1: [I_S020701_5_2!]!
        ): [Ret_S020701_5!]!
        mgrInsert_S020701_5_REMOVE_ORDER(
            datas: I_S020701_5_1!
            datas1: [I_S020701_5_2!]!
        ): [Ret_S020701_5!]!
        mgrInsert_S020701_5_ADD_ORDER(
            datas: I_S020701_5_1!
            datas1: [I_S020701_5_2!]!
        ): [Ret_S020701_5!]!
        mgrUpdate_S020701_5(
            datas: I_S020701_5_1!
            datas1: [I_S020701_5_2!]!
        ): [Ret_S020701_5!]!
        mgrDelete_S020701_5(
            datas: I_S020701_5_1!
            datas1: [I_S020701_5_2!]!
        ): [Ret_S020701_5!]!
    }
`;

export default moduleTypedefs_S020701_5;
