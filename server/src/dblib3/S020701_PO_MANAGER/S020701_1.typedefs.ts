// MGR_S020701_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S020701_1 = gql`
    type T_S020701_1_CODE {
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        PI_ORIGIN: [BASE_QRY_KCD_CODE!]!
        STATUS_CD: [BASE_QRY_KCD_CODE!]!
        TOLENCE: [BASE_QRY_KCD_CODE!]!
        CD: [BASE_QRY_KCD_CODE!]!
        PART_SHIP: [BASE_QRY_KCD_CODE!]!
        TRANS_SHIP: [BASE_QRY_KCD_CODE!]!
    }

    type Query {
        mgrQueryS020701_1_CODE: T_S020701_1_CODE!
    }
`;

export default moduleTypedefs_S020701_1;
