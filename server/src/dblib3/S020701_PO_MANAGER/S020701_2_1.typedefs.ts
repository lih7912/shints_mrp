// MGR_S020701_2_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S020701_2_1 = gql`
    type T_S020701_2_1 {
        PO_STATUS_NAME: String
        PO_STATUS: String
        PO_SEQ: String
        BUYER_NAME: String
        BUYER_CD: String
        PO_TYPE_NAME: String
        PO_TYPE: String
        PO_CD: String
        TARGET_ETA: String
        REG_DATETIME: String
        REG_USER: String
        UPD_DATETIME: String
        UPD_USER: String
        FACTORY_CD: String
        FACTORY_NAME: String
        MATL_DUE_DATE: String
    }

    input I_S020701_2_1 {
        BUYER_CD: String
        PO_CD: String
        STATUS_CD: String
        S_REG_DATE: String
        E_REG_DATE: String
    }

    type Query {
        mgrQueryS020701_2_1(data: I_S020701_2_1!): [T_S020701_2_1!]!
    }
`;

export default moduleTypedefs_S020701_2_1;
