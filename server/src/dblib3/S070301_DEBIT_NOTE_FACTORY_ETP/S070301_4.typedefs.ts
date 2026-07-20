// MGR_S070301_4.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S070301_4 = gql`
    type T_S070301_4 {
        CRDB_CD: String
        CRDB_SEQ: String
        CRDB_DATE: String
        COM_NAME: String
        CRDB_AMT: String
        BALANCE: String
        CURR_CD: String
        USD_BAL: String
        TITLE: String
        REG_USER: String
        END_DATE: String
        REMARK: String
        STATUS: String
        PO_CD: String
        ORDER_CD: String
        BANK_CD: String
        COM_CD: String
        STATUS_CD: String
        BUYER_CD: String
        BUYER_NAME: String
        PAYMENT_PLAN: String
    }

    type T_S070301_4_1 {
        END_DATE: String
        CRDB_AMT: String
    }

    input I_S070301_4 {
        CRDB_CD: String
        VENDOR_CD: String
    }

    type T_RET_S070301_4 {
        id: Int
        CODE: String
    }

    type Query {
        mgrQueryS070301_4_REPORT(data: [I_S070301_4!]!): [T_RET_S070301_4!]!
        mgrQueryS070301_4(data: I_S070301_4!): [T_S070301_4!]!
        mgrQueryS070301_4_1(data: I_S070301_4!): [T_S070301_4_1!]!
    }
`;

export default moduleTypedefs_S070301_4;
