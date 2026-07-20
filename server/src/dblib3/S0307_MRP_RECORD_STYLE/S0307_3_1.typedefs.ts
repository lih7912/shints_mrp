// MGR_S0307_2_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0307_3_1 = gql`
    type T_S0307_3_1 {
        PROD_CD: String
        ORDER_MRP_SEQ: String
        VERSION: String
        DL_FLAG: String
        MRP_CHECK: String
        MATL_TYPE2: String
        MATL_NAME: String
        MATL_CD: String
        COLOR: String
        SPEC: String
        MATL_PRICE: String
        CURR_CD: String
        UNIT: String
        ADD_LOSS: String
        USE_SIZE: String
        REMARK: String
        BVT_REMARK: String
        COUNTRY: String
        STD_NET: String
        STD_LOSS: String
        NET: String
        LOSS: String
        GROSS: String
        VENDOR_NAME: String
        VENDOR_STATUS: String
        VENDOR_CD: String
        STD_GROSS: String
        SEQ: String
    }

    input I_S0307_3_1 {
        ORDER_CD: String
        PROD_CD: String
        DL_FLAG: String
    }

    type Query {
        mgrQuery_S0307_3_1(data: I_S0307_3_1!): [T_S0307_3_1!]!
    }
`;

export default moduleTypedefs_S0307_3_1;
