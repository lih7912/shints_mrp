// MGR_S0404_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0404_1 = gql`
    type T_S0404_1 {
        REG_USER: String
        VENDOR_NAME: String
        PR_NUM: String
        MATL_CD: String
        COLOR: String
        MATL_NAME: String
        SPEC: String
        UNIT: String
        TOT_CNT: String
        STOCK_QTY: Int
        COL1: Float
        REMARK: String
    }

    input I_S0404_1 {
        PO_CD: String
        ORDER_CD: String
    }

    type T_S0404_CODE_PO_CD {
        PO_CD: String
        PO_STATUS: String
    }
    type T_S0404_CODE_BUYER_CD {
        COM_NAME: String
        COM_CD: String
    }

    type T_S0404_CODE {
        PO_CD: [T_S0404_CODE_PO_CD!]!
        BUYER_CD: [T_S0404_CODE_BUYER_CD!]!
        FACTORY_CD: [BASE_QRY_KCD_FACTORY!]!
    }

    type Query {
        mgrQueryS0404_1(data: I_S0404_1!): [T_S0404_1!]!
        mgrQueryS0404_CODE(data: I_S0404_1!): T_S0404_CODE!
    }
`;

export default moduleTypedefs_S0404_1;
