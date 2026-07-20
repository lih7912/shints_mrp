// MGR_S0215_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0215_2 = gql`
    type T_S0215_2 {
        PO_CD: String
        ORDER_CD: String
        STYLE_NAME: String
        TOT_CNT: String
        SHIP_CNT: String
        DIFF_CNT: String
        VMD_QTY: String
        VMD_SUB_QTY: String
        SMD_QTY: String
        MAX_SHIP_DATE: String
        CONFIRM_USER: String
        COL1: String
        CONFIRM_AMT: String
        USD_PRICE: String
        FC_PRICE: String
        ORDER_STATUS_NAME: String
        STS_COMMENT: String
        BVT_COMMENT: String
        SUP_QTY: String
        BUYER_QTY: String
        STS_QTY: String
        REMARK: String
        END_FLAG: String
        END_DATE: String
        ORDER_END_DATE: String
    }

    input I_S0215_2 {
        ALL_FLAG: String
        BVT_FLAG: String
        ETP_FLAG: String
        SHIP_DATE: String
        END_TYPE: String
        TYPE: String
        TEAM: String
        BUYER_CD: String
        PO_CD: String
        ORDER_CD: String
        STS_COMMENT: String
        BVT_COMMENT: String
        END_DATE: String
    }

    type T_S0215_2_RET {
        id: Int
        CODE: String
        FILE_NAME: String
        URL: String 
    }

    type Query {
        mgrQueryS0215_2(data: I_S0215_2!): [T_S0215_2!]!
        mgrQueryS0215_EXCEL_REPORT(data: I_S0215_2!): [T_S0215_2_RET!]!
    }
`;

export default moduleTypedefs_S0215_2;
