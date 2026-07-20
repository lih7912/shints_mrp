// MGR_S041202_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S041202_1 = gql`
    type T_S041202_1 {
        VENDOR_NAME: String
        PERMIT: String
        CT_QTY: Int
        CT_QTY2: Int
        TOT: Int
        VENDOR_CD: String
        REG_USER: String
        VENDOR_MATL_TYPE: String
    }

    input I_S041202_1 {
        PACK_CD: String
        USER_ID: String
    }

    type Query {
        mgrQueryS041202_1(data: I_S041202_1!): [T_S041202_1!]!
        mgrQueryS041202_2(data: I_S041202_1!): [T_S041202_1!]!
    }
`;

export default moduleTypedefs_S041202_1;
