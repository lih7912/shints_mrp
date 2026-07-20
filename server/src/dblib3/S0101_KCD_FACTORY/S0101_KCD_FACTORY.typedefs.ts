// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0101_KCD_FACTORY = gql`
    type T_S0101_KCD_FACTORY_TBL_KCD_FACTORY {
        id: Int
        FACTORY_CD: String
        FACTORY_NAME: String
        USER_NAME: String
        EMAIL: String
        TEL_NO: String
        FAX_NO: String
        NAT_NAME: String
        NAT_CD: String
        ZIP_NO: String
        ADDR1: String
        ADDR2: String
        PORT: String
        AIRPORT: String
        STATUS_NAME: String
        STATUS_CD: String
        BANK_CD: String
        BANK_NAME: String
        ACCOUNT_NO: String
        ACCOUNT_NAME: String
    }

    input I_S0101_KCD_FACTORY_QRY_KCD_FACTORY {
        FACTORY_CD: String
        FACTORY_NAME: String
        STATUS_CD: String
    }

    input I_S0101_KCD_FACTORY_EDT_KCD_FACTORY {
        id: Int
        FACTORY_CD: String
        FACTORY_NAME: String
        USER_NAME: String
        EMAIL: String
        TEL_NO: String
        FAX_NO: String
        ZIP_NO: String
        NAT_CD: String
        ADDR1: String
        ADDR2: String
        PORT: String
        AIRPORT: String
        BANK_CD: String
        BANK_NAME: String
        ACCOUNT_NO: String
        ACCOUNT_NAME: String
        STATUS_CD: String
    }

    type Ret_S0101_KCD_FACTORY_EDT_KCD_FACTORY {
        id: Int!
        CODE: String!
    }

    type T_S0101_KCD_FACTORY_CODE {
        STATUS_CD: [BASE_QRY_KCD_CODE!]!
        NAT_CD: [BASE_QRY_KCD_NATION!]!
    }

    type Query {
        mgrQuery_S0101_KCD_FACTORY_TBL_KCD_FACTORY(
            data: I_S0101_KCD_FACTORY_QRY_KCD_FACTORY!
        ): [T_S0101_KCD_FACTORY_TBL_KCD_FACTORY!]!
        mgrQuery_S0101_KCD_FACTORY_CODE: T_S0101_KCD_FACTORY_CODE!
    }

    type Mutation {
        mgrInsert_S0101_KCD_FACTORY_EDT_KCD_FACTORY(
            datas: [I_S0101_KCD_FACTORY_EDT_KCD_FACTORY!]!
        ): [Ret_S0101_KCD_FACTORY_EDT_KCD_FACTORY!]!
        mgrUpdate_S0101_KCD_FACTORY_EDT_KCD_FACTORY(
            datas: [I_S0101_KCD_FACTORY_EDT_KCD_FACTORY!]!
        ): [Ret_S0101_KCD_FACTORY_EDT_KCD_FACTORY!]!
        mgrDelete_S0101_KCD_FACTORY_EDT_KCD_FACTORY(
            datas: [I_S0101_KCD_FACTORY_EDT_KCD_FACTORY!]!
        ): [Ret_S0101_KCD_FACTORY_EDT_KCD_FACTORY!]!
    }
`;

export default moduleTypedefs_S0101_KCD_FACTORY;
