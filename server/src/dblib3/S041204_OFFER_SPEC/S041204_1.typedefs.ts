// MGR_S041204_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S041204_1 = gql`
    type T_S041204_1 {
        VENDOR_NAME: String
        MATL_NAME: String
        SPEC: String
        OFFER_SPEC: String
        VENDOR_CD: String
    }

    input I_S041204_1 {
        MATL_TYPE: String
        PACK_CD: String
    }

    type T_S041204_CODE {
        MATL_TYPE: [BASE_QRY_KCD_CODE!]!
    }

    type Query {
        mgrQueryS041204_1(data: I_S041204_1!): [T_S041204_1!]!
        mgrQueryS041204_CODE(data: I_S041204_1!): T_S041204_CODE!
    }
`;

export default moduleTypedefs_S041204_1;
