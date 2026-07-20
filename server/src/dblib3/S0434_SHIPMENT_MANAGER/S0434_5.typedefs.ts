// MGR_S0434_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0434_5 = gql`
    input I_S0434_5 {
        SHIPMENT_CD: String
        STATUS_CD: String
        REG_DATETIME: String
        SHIP_MODE: String
        ORG_ORIGIN_PORT: String
        ORG_DESTINATION: String
        DESTINATION: String
        IS_SINGAPORE: String
        BL_NO: String
        ETA: String
        SHIPPING_COST: String
        IMPORT_COST: String
        S_WEIGHT: String
        S_CBM: String
    }

    input I_S0434_5_1 {
        SHIPMENT_CD: String
        REMARK: String
        END_DATE: String
    }

    input I_S0434_5_2 {
        SHIPMENT_CD: String
        ETD: String
    }

    type Ret_S0434_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrDelete_S0434_5(datas: [I_S0434_5!]!): [Ret_S0434_5!]!
        mgrInsert_S0434_5_SINGAPORE(datas: [I_S0434_5!]!): [Ret_S0434_5!]!
        mgrInsert_S0434_5_FIX(datas: [I_S0434_5!]!): [Ret_S0434_5!]!
        mgrInsert_S0434_5_END(datas: [I_S0434_5_1!]!): [Ret_S0434_5!]!
        mgrInsert_S0434_5_ETD_SYNC(datas: [I_S0434_5_2!]!): [Ret_S0434_5!]!
    }
`;

export default moduleTypedefs_S0434_5;
