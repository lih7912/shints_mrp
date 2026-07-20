// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0218_EXCHANGE_RATE_RECORD = gql`
    input I_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1 {
        CURR: String
        START_DATE: String
        USE_RATE: String
        USE_PRICE: String
        CURR_CD: String
        CURR_AMT: String
        USD_RATE: String
    }

    type Ret_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1 {
        id: Int!
        CODE: String!
    }

    input I_S0218_EXCHANGE_RATE_RECORD_QRY_KCD_CURR_COMM {
        START_DATE: String
    }
    type T_S0218_EXCHANGE_RATE_RECORD_TBL_KCD_CURR_COMM {
        START_DATE: String
    }

    type T_S0218_EXCHANGE_RATE_RECORD_TBL_KCD_CURR_COMM1 {
        CD_FLAG: String
        CURR_CD: String
        START_DATE: String
        CURR_AMT: String
        USD_RATE: String
        CD_CODE: String
    }

    type Query {
        mgrQuery_S0218_EXCHANGE_RATE_RECORD_TBL_KCD_CURR_COMM(
            data: I_S0218_EXCHANGE_RATE_RECORD_QRY_KCD_CURR_COMM!
        ): [T_S0218_EXCHANGE_RATE_RECORD_TBL_KCD_CURR_COMM!]!
        mgrQuery_S0218_EXCHANGE_RATE_RECORD_TBL_KCD_CURR_COMM1(
            data: I_S0218_EXCHANGE_RATE_RECORD_QRY_KCD_CURR_COMM!
        ): [T_S0218_EXCHANGE_RATE_RECORD_TBL_KCD_CURR_COMM1!]!
    }

    type Mutation {
        mgrInsert_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1(
            datas: [I_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1!]!
        ): [Ret_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1!]!
        mgrUpdate_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1(
            datas: [I_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1!]!
        ): [Ret_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1!]!
        mgrDelete_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1(
            datas: [I_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1!]!
        ): [Ret_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1!]!
    }
`;

export default moduleTypedefs_S0218_EXCHANGE_RATE_RECORD;
