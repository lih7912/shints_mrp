// MGR_S030514_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030514_2 = gql`
    type T_S030514_RET {
        id: Int
        CODE: String
    }

    input I_S030514_REPORT_MATL_LIST_NET_QTY {
        PO_CD: String
        IS_PRICE: String
        ORDER_CD: String
        BUYER_CD: String
        FACTORY_CD: String
        ORDER_KIND: String
        OP_KIND: String
        PO_SEQ: String
    }

    input I_S030514_REPORT_BUYER_ORDER_QTY {
        PO_CD: String
        IS_PRICE: String
        ORDER_CD: String
        BUYER_CD: String
        BUYER_NAME: String
        FACTORY_CD: String
        ORDER_KIND: String
        OP_KIND: String
        SAMPLE_FLAG: String
        PO_SEQ: String
    }

    input I_S030514_REPORT_ORDER_QTY2 {
        PO_CD: String
        PO_NAME: String
    }

    type Query {
        mgrQueryS030514_REPORT_MATL_LIST_NET_QTY(
            data: I_S030514_REPORT_MATL_LIST_NET_QTY!
        ): [T_S030514_RET!]!
        mgrQueryS030514_REPORT_ORDER_QTY(
            data: I_S030514_REPORT_MATL_LIST_NET_QTY!
        ): [T_S030514_RET!]!
        mgrQueryS030514_REPORT_BUYER_ORDER_QTY(
            data: I_S030514_REPORT_BUYER_ORDER_QTY!
        ): [T_S030514_RET!]!
        mgrQueryS030514_REPORT_ORDER_QTY2(
            data: [I_S030514_REPORT_ORDER_QTY2!]!
        ): [T_S030514_RET!]!
    }
`;

export default moduleTypedefs_S030514_2;
