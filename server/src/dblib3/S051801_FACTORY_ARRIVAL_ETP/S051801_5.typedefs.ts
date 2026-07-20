// MGR_S051801_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S051801_5 = gql`
    input I_S051801_5_0 {
        CUSTOMER_NO: String
    }

    input I_S051801_5 {
        ATA: String
        CLEARANCE_NO: String
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

    type Ret_S051801_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrUpdate_S051801_5_CUSTOMER_NO(
            datas: I_S051801_5_0!
            datas1: [I_S051801_5!]!
        ): [Ret_S051801_5!]!
    }
`;

export default moduleTypedefs_S051801_5;
