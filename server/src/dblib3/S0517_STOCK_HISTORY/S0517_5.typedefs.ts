import { gql } from 'apollo-server';

const moduleTypedefs_S0517_5 = gql`
    input I_S0517_5 {
        STOCK_IDX: String
        MATL_CD: String
        BUYER_CD: String
    }

    input I_S0517_5_PO_ORDER {
        STOCK_IDX: String
        PO_CD: String
        ORDER_CD: String
    }

    input I_S0517_5_REMARK {
        DATAS: [I_S0517_5_REMARK_ROW!]!
    }

    input I_S0517_5_REMARK_ROW {
        STOCK_IDX: String
        REMARK: String
    }

    input I_S0517_5_QTY {
        DATAS: [I_S0517_5_QTY_ROW!]!
    }

    input I_S0517_5_QTY_ROW {
        STOCK_IDX: String
        STOCK_QTY: String
        REMAIN_QTY: String
    }

    type Ret_S0517_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrUpdate_S0517_5_MATL_CD(datas: I_S0517_5!): [Ret_S0517_5!]!
        mgrUpdate_S0517_5_BUYER_CD(datas: I_S0517_5!): [Ret_S0517_5!]!
        mgrUpdate_S0517_5_REMARK(datas: I_S0517_5_REMARK!): [Ret_S0517_5!]!
        mgrUpdate_S0517_5_QTY(datas: I_S0517_5_QTY!): [Ret_S0517_5!]!
        mgrUpdate_S0517_5_PO_ORDER(datas: I_S0517_5_PO_ORDER!): [Ret_S0517_5!]!
    }
`;

export default moduleTypedefs_S0517_5;
