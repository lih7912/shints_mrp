// MGR_S0403_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0403_1 = gql`
    type T_S0403_1 {
        PO_CD: String
        ORDER_CD: String
        STYLE_NAME: String
        VENDOR_NAME: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        MATL_CD: String
        CURR_CD: String
        MATL_PRICE: Float
        TOT_AMT: Float
        EXP_USEQTY: Float
        EXP_POQTY: Float
        PO_DATE: String
        MATL_DUE_DATE: String
        EXP_DIFF: Float
    }

    input I_S0403_1 {
        PO_REG_S_DATE: String
        PO_REG_E_DATE: String
        ETD_S_DATE: String
        ETD_E_DATE: String
        PO_CD: String
        MATL_TYPE: String
        MATL_NAME: String
        COLOR: String
        VENDOR_TYPE: String
        VENDOR_CD: String
        SPEC: String
        MATL_CD: String
        BUYER_CD: String
    }

    type T_S0403_CODE_PO_CD {
        PO_CD: String
        BUYER_CD: String
    }

    type T_S0403_CODE {
        MATL_TYPE: [BASE_QRY_KCD_CODE!]!
        VENDOR_TYPE: [BASE_QRY_KCD_CODE!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        PO_CD: [T_S0403_CODE_PO_CD!]!
        VENDOR_CD: [BASE_QRY_KCD_VENDOR!]!
    }

    type Query {
        mgrQueryS0403_1(data: I_S0403_1!): [T_S0403_1!]!
        mgrQueryS0403_CODE(data: I_S0403_1!): T_S0403_CODE!
    }
`;

export default moduleTypedefs_S0403_1;
