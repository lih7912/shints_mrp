// MGR_S0407_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0407_3 = gql`
    type T_S0407_3 {
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        MATL_PRICE: Float
        PO_QTY: Float
        LC_QTY: Float
        MATL_CD: String
        MATL_CONF_FLAG_N: String
        CONF_FLAG: String
        CURR_CD: String
        TEMP_PRICE: String
    }

    input I_S0407_3 {
        PO_CD_ARRAY: [String!]!
        VENDOR_CD: String
    }

    input I_S0407_3_1 {
        PO_CD: String
        VENDOR_TYPE: String
    }
    type T_S0407_3_1 {
        PO_CD: String
    }

    input I_S0407_3_2 {
        PO_CD_ARRAY: [String!]!
    }
    type T_S0407_3_2 {
        VENDOR_CD: String
        VENDOR_NAME: String
    }

    type Query {
        mgrQueryS0407_3(data: I_S0407_3!): [T_S0407_3!]!
        mgrQueryS0407_3_1(data: I_S0407_3_1!): [T_S0407_3_1!]!
        mgrQueryS0407_3_2(data: I_S0407_3_2!): [T_S0407_3_2!]!
    }
`;

export default moduleTypedefs_S0407_3;
