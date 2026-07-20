// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030304_ADD_SEQ_MRP_BY_ORDER = gql`
    type T_S030304_ADD_SEQ_MRP_BY_ORDER_TBL_KSV_ORDER_MEM {
        PO_CD: String
        PROD_CD: String
        ORDER_CD: String
    }

    input I_S030304_ADD_SEQ_MRP_BY_ORDER_QRY_KSV_ORDER_MEM {
        STYLE_CD: String
    }

    type Query {
        mgrQuery_S030304_ADD_SEQ_MRP_BY_ORDER_TBL_KSV_ORDER_MEM(
            data: I_S030304_ADD_SEQ_MRP_BY_ORDER_QRY_KSV_ORDER_MEM!
        ): [T_S030304_ADD_SEQ_MRP_BY_ORDER_TBL_KSV_ORDER_MEM!]!
    }

    input I_S030304_ADD_SEQ_MRP_BY_ORDER {
        ORDER_CD: String
        PO_CD: String
        PROD_CD: String
    }

    type Ret_S030304_ADD_SEQ_MRP_BY_ORDER {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S030304_ADD_SEQ_MRP_BY_ORDER(
            datas: [I_S030304_ADD_SEQ_MRP_BY_ORDER!]!
        ): [Ret_S030304_ADD_SEQ_MRP_BY_ORDER!]!
        mgrInsert_S030304_ADD_SEQ_MRP_BY_ORDER_bak(
            datas: [I_S030304_ADD_SEQ_MRP_BY_ORDER!]!
        ): [Ret_S030304_ADD_SEQ_MRP_BY_ORDER!]!
    }
`;

export default moduleTypedefs_S030304_ADD_SEQ_MRP_BY_ORDER;
