// MGR_S0802_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0802_2 = gql`
    type T_S0802_2 {
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
        OA_AMT: String
        TT_AMT: String
        TT_AMT1: String
        TT_AMT2: String
        TT_AMT3: String
        OA_REF_NO: String
        TT_REF_NO: String
        TT_REF_NO1: String
        TT_REF_NO2: String
        TT_REF_NO3: String
        OA_DATE: String
        TT_DATE: String
        TT_DATE1: String
        TT_DATE2: String
        TT_DATE3: String
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
        CRDB_CD: String
        DEPOSIT_AMT: String
    }

    input I_S0802_2 {
        S_SHIP_DATE: String
        E_SHIP_DATE: String
        INVOICE_NO: String
        FACTORY_CD: String
        BUYER_CD: String
        STYLE_CD: String
        ORDER_CD: String
        SHIP_MODE: String
        DELIVERY_TYPE: String
        PAYMENT_TYPE: String
    }

    input I_S0802_2_LIST_DEPOSIT {
        TYPE: String
        PAY_TO: String
        BUYER_CD: String
    }

    type T_S0802_2_LIST_DEPOSIT {
        CRDB_CD: String
        PAY_TO: String
        TITLE: String
        REMARK: String
        USD_BAL: String
        ISSUE_DATE: String
        CHARGER: String
    }

    type Query {
        mgrQueryS0802_2(data: I_S0802_2!): [T_S0802_2!]!
        mgrQueryS0802_2_LIST_DEPOSIT(
            data: I_S0802_2_LIST_DEPOSIT!
        ): [T_S0802_2_LIST_DEPOSIT!]!
        mgrQueryS0802_2_bak(data: I_S0802_2!): [T_S0802_2!]!
    }
`;

export default moduleTypedefs_S0802_2;
