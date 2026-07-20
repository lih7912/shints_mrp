// MGR_S0408_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0408_5 = gql`
    input I_S0408_5 {
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

    type Ret_S0408_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0408_5(datas: [I_S0408_5!]!): [Ret_S0408_5!]!
    }
`;

export default moduleTypedefs_S0408_5;
