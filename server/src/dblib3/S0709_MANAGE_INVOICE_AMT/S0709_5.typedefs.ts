// MGR_S0709_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0709_5 = gql`
    input I_S0709_5_REF {
        REF_NO: String
        BANK_NAME: String
        BUYER_CD: String
        BILL_DATE: String
        CURR_CD: String
        BILL_AMT: String
        CHECK_AMT: String
        BALANCE: String
        END_FLAG: String
        PRE_FLAG: String
        END_FLAG_N: String
        PRE_FLAG_N: String
        TOT_AMT: String
        CREDIT_AMT: String
        CHARGE: String
        BUYER_NAME: String
        BANK_CD: String
        MOM_CD: String
        REG_DATETIME: String
    }

    input I_S0709_5_LIST2 {
        INVOICE_NO: String
        CURR_CD: String
        TOT_AMT: String
        SHIP_DATE: String
        DUE_DATE: String
        BALANCE: String
        BUYER_NAME: String
        IN_AMT: String
        OA_NEGO: String
        BUYER_CD: String
    }

    input I_S0709_5_LIST3 {
        CRDB_CD: String
        CURR_CD: String
        CRDB_AMT: String
        END_DATE: String
        IN_AMT: String
        BALANCE: String
        BUYER_NAME: String
        REST_AMT: String
        VAT_AMT: String
        ORG_AMT: String
    }

    input I_S0709_5_LIST4 {
        BILL_DATE: String
        BILL_AMT: String
        INVOICE_NO: String
        CURRENCY_RATE: String
        REF_NO: String
        BILL_AMT_ORG: String
        END_DATE: String
        BUYER_CD: String
        PRE_FLAG: String
    }

    type Ret_S0709_5 {
        CODE: String
        id: String
    }

    type Mutation {
        mgrInsert_S0709_5_INSERT_BILL(
            datas: I_S0709_5_REF!
            datas1: [I_S0709_5_LIST2!]!
        ): [Ret_S0709_5!]!
        mgrInsert_S0709_5_INSERT_DC(
            datas: I_S0709_5_REF!
            datas1: [I_S0709_5_LIST3!]!
        ): [Ret_S0709_5!]!
        mgrInsert_S0709_5_DELETE_BILL(
            datas1: [I_S0709_5_LIST4!]!
        ): [Ret_S0709_5!]!
        mgrInsert_S0709_5_DELETE_DC(
            datas1: [I_S0709_5_LIST4!]!
        ): [Ret_S0709_5!]!
    }
`;

export default moduleTypedefs_S0709_5;
