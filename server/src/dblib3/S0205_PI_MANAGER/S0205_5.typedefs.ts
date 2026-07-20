// MGR_S0205_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0205_5 = gql`
    input I_S0205_5_1 {
        BUYER_CD: String
        PI_CD: String
        CD: String
        REG_DATE: String
        LOADING_PORT: String
        DESTINATION: String
        REG_USER: String
        TOLENCE: String
        TOLENCE_ETC: String
        TOLENCE_N: String
        PART_SHIP: String
        TRANS_SHIP: String
        FILE_NAME: String
        FILE_URL: String
        FILE_OBJECT: String
    }

    input I_S0205_5_2 {
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
        NAT_NAME: String
    }

    input I_S0205_5_1 {
        PU_CD: String
    }

    type Ret_S0205_5 {
        CODE: String
        id: Int
    }

    input I_S0205_5_FILE_INFO {
        PI_CD: String
        TITLE: String
        NAME: String
        URL: String
        OBJECT_NAME: String
    }

    type Mutation {
        mgrInsert_S0205_5(
            datas: I_S0205_5_1!
            datas1: [I_S0205_5_2!]!
        ): [Ret_S0205_5!]!
        mgrInsert_S0205_5_FILE_INFO(
            datas: I_S0205_5_FILE_INFO!
        ): [Ret_S0205_5!]!
        mgrUpdate_S0205_5(
            datas: I_S0205_5_1!
            datas1: [I_S0205_5_2!]!
        ): [Ret_S0205_5!]!
        mgrDelete_S0205_5(
            datas: I_S0205_5_1!
            datas1: [I_S0205_5_2!]!
        ): [Ret_S0205_5!]!
    }
`;

export default moduleTypedefs_S0205_5;
