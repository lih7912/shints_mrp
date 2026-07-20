// MGR_S0802_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0802_5 = gql`
    input I_S0802_5 {
        STATUS_NAME: String
        BUYER_NAME: String
        BUYER_CD: String
        INVOICE_NO: String
        SHIP_DATE: String
        DELIVERY_TYPE: String
        DELIVERY_TYPE_N: String
        SHIP_PTYPE: String
        PAYMENT_TERM: String
        SHIP_MODE_N: String
        CI_NO: String
        FROM_PORT: String
        FROM_PORT_N: String
        TO_PORT: String
        TO_PORT_N: String
        ORD_AMT: String
        TOT_AMT: String
        TOT_AMT_WON: String
        DOCU_NO: String
        DOCU_STATUS: String
        CURR_CD: String
        VAT_AMT: String
        NEOE_A23: String
        NEOE_BUYER_CD: String
        INCOME_DATE: String
        ATD: String
        BUYER_NAT_CD: String
        TOT_AMT1: String
        INCOME_DATE1: String
        TOT_AMT2: String
        INCOME_DATE2: String
        TOT_AMT3: String
        INCOME_DATE3: String
        RECEIVED_AMT: String
        OA_REF_NO: String
        OA_AMT: String
        OA_DATE: String
        TT_AMT: String
        TT_REF_NO: String
        TT_DATE: String
        TT_AMT1: String
        TT_REF_NO1: String
        TT_DATE1: String
        TT_AMT2: String
        TT_REF_NO2: String
        TT_DATE2: String
        TT_AMT3: String
        TT_REF_NO3: String
        TT_DATE3: String
        CRDB_CD: String
        DEPOSIT_AMT: String
        TOTAL_AMT: String
    }

    input I_S0802_5_1 {
        INVOICE_NO: String
        DOCU_NO: String
        NEOE_CODE: String
        CURR_CD: String
        AMOUNT: String
        AMOUNT1: String
        AMOUNT2: String
        AMOUNT3: String
        VAT: String
        INCOME_DATE: String
        INCOME_DATE1: String
        INCOME_DATE2: String
        INCOME_DATE3: String
        REMARK: String
        OA_REF_NO: String
        OA_AMT: String
    }

    input I_S0802_5_DEPOSIT {
        CRDB_CD: String
        DEPOSIT_AMT: String
        INVOICE_NO: String
    }

    type Ret_S0802_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0802_5(
            datas: [I_S0802_5!]!
            datas1: I_S0802_5_1!
        ): [Ret_S0802_5!]!
        mgrInsert_S0802_5_INSERT_DOCU(
            datas: [I_S0802_5!]!
            datas1: I_S0802_5_1!
        ): [Ret_S0802_5!]!
        mgrInsert_S0802_5_UPDATE_INCOME_DATE(
            datas: [I_S0802_5!]!
            datas1: I_S0802_5_1!
        ): [Ret_S0802_5!]!
        mgrInsert_S0802_5_UPDATE_DEPOSIT(
            datas: I_S0802_5_DEPOSIT!
        ): [Ret_S0802_5!]!
        mgrInsert_S0802_5_DELETE_DEPOSIT(
            datas: I_S0802_5_DEPOSIT!
        ): [Ret_S0802_5!]!
        mgrInsert_S0802_5_DELETE_DOCU(
            datas: [I_S0802_5!]!
            datas1: I_S0802_5_1!
        ): [Ret_S0802_5!]!
    }
`;

export default moduleTypedefs_S0802_5;
