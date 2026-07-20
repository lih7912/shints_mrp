// MGR_S0530_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0530_5 = gql`
    input I_S0530_5 {
        COLOR: String
        IN_SHIP_QTY: String
        IN_SHIP_SIZE_CNT: String
        ORDER_CD: String
        PRICE: String
        PROD_CD: String
        PO_CD: String
    }

    input I_S0530_5_1 {
        INVOICE_NO: String
        SHIP_DATE: String
        EX_FACTORY_DATE: String
        DELIVERY_TYPE: String
        SHIP_MODE: String
        COUNTRY: String
        USER_ID: String
        BL_NO: String
    }

    type Ret_S0530_5 {
        CODE: String
        id: Int
    }

    input I_S0530_FILE_INFO {
        KIND: String
        FILE_KEY: String
        TITLE: String
        NAME: String
        URL: String
        OBJECT_NAME: String
    }

    type Mutation {
        mgrInsert_S0530_5(
            datas: [I_S0530_5!]!
            datas1: I_S0530_5_1!
        ): [Ret_S0530_5!]!
        mgrInsert_S0530_FILE_ADD(datas: I_S0530_FILE_INFO!): [Ret_S0530_5!]!
    }
`;

export default moduleTypedefs_S0530_5;
