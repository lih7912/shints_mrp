// MGR_S0408_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0408_3 = gql`
    type T_S0408_3 {
        PO_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        PO_QTY: Float
        CURR_CD: String
        TYPE: String
        BEF_PRICE: Float
        SALE_PRICE: Float
        MATL_PRICE: Float
        MATL_NEGO_PRICE: Float
        RATE: String
        SALE_NEOG_PRICE: Float
        BALANCE: Float
        REMARK: String
        CONF_NAME: String
        TEMP_PRICE: String
        CONF_FLAG: String
        MATL_SEQ: Int
        VENDOR_NAME: String
        MAX_MATL_SEQ: Int
        MAX_SALE_SEQ: Int
    }

    input I_S0408_3 {
        PO_CD_ARRAY: [String!]!
        VENDOR_CD: String
        PRICE_STATUS: String
        MATL_NAME: String
        SPEC: String
        COLOR: String
    }

    input I_S0408_3_1 {
        PO_CD: String
        VENDOR_TYPE: String
    }
    type T_S0408_3_1 {
        PO_CD: String
    }

    type T_S0408_3_1_0 {
        PO_CD: [T_S0408_3_1!]!
        CURR_CD: [BASE_QRY_KCD_CODE!]!
    }

    input I_S0408_3_2 {
        PO_CD_ARRAY: [String!]!
    }
    type T_S0408_3_2 {
        VENDOR_CD: String
        VENDOR_NAME: String
    }

    type Query {
        mgrQueryS0408_3(data: I_S0408_3!): [T_S0408_3!]!
        mgrQueryS0408_3_1(data: I_S0408_3_1!): T_S0408_3_1_0!
        mgrQueryS0408_3_2(data: I_S0408_3_2!): [T_S0408_3_2!]!
    }
`;

export default moduleTypedefs_S0408_3;
