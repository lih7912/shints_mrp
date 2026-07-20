// MGR_S0110_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0110_5 = gql`
    type Ret_S0110_5 {
        CODE: String
        id: Int
    }

    input INPUT_S0110_5_1 {
        VENDOR_CD: String
    }

    input INPUT_S0110_5_2 {
        VENDOR_CD: String
        BANK_CD: String
    }

    input INPUT_S0110_5_3 {
        BANK_CD: String
        BANK_NAME: String
        ACCOUNT_NO: String
        ACCOUNT_NAME: String
        SFTCODE: String
        ADDR1: String
        ADDR2: String
        BANK_TYPE: String
        BANK_TYPE1: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        BANK_BRANCH: String
        id: Int
        FILE_NAME: String
        STATUS_CD_N: String
        imgURL: String
        fileName: String
        fileUrl: String
        objectName: String
    }

    type Mutation {
        mgrInsert_S0110_5(datas1: INPUT_S0110_5_3!): [Ret_S0110_5!]!
        mgrUpdate_S0110_5(datas1: INPUT_S0110_5_3!): [Ret_S0110_5!]!
        mgrDelete_S0110_5(datas1: INPUT_S0110_5_2!): [Ret_S0110_5!]!
        mgrUpdate_S0110_5_1(
            datas1: INPUT_S0110_5_3!
            datas2: INPUT_S0110_5_1!
        ): [Ret_S0110_5!]!
        mgrDelete_S0110_5_1(datas: INPUT_S0110_5_2!): [Ret_S0110_5!]!
    }
`;

export default moduleTypedefs_S0110_5;
