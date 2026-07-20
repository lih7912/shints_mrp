// MGR_S0205_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0204_5 = gql`
    input I_S0204_5_END_ORDER {
        ORDER_CD: String
    }

    type Ret_S0204_5 {
        CODE: String
        id: Int
    }

    input I_S0204_5_CHANGE_FOB1 {
        ORDER_CD: String
        STYLE_CD: String
        AVR_PRICE: String
        ORDER_QTY: String
        CURR_CD: String
        USD_PRICE: String
    }

    input I_S0204_5_CHANGE_FOB2 {
        FOB_SEQ: String
        SHIP_QTY: String
        FOB: String
        FOB100: String
    }

    input I_S0204_5_UPDATE_DETAIL {
        ORDER_CD: String
        ORDER_STATUS: String
        PO_CD: String
    }

    type Mutation {
        mgrUpdate_S0204_5_END_ORDER(
            datas: [I_S0204_5_END_ORDER!]!
        ): [Ret_S0204_5!]!
        mgrUpdate_S0204_5_END_ORDER_CANCEL(
            datas: [I_S0204_5_END_ORDER!]!
        ): [Ret_S0204_5!]!
        mgrUpdate_S0204_5_CHANGE_FOB(
            datas1: I_S0204_5_CHANGE_FOB1!
            datas2: [I_S0204_5_CHANGE_FOB2!]!
        ): [Ret_S0204_5!]!
        mgrUpdate_S0204_5_UPDATE_DETAIL(
            datas: [I_S0204_5_UPDATE_DETAIL!]!
        ): [Ret_S0204_5!]!
    }
`;

export default moduleTypedefs_S0204_5;
