// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0707_MAN_INVOICE = gql`
    input I_S0707_MAN_INVOICE_EDT_KSV_INVOICE_MST {
        REF_NO: String
        BILL_DATE: String
        BILL_AMT: String
        CURR_CD: String
        END_TYPE: String
        BUYER_CD: String
        WORK_FEE: String
        BILL_TYPE: String
        BANK_CD: String
        CREDIT_AMT: String
        REMARK: String
    }

    type Ret_S0707_MAN_INVOICE_EDT_KSV_INVOICE_MST {
        id: Int!
        CODE: String!
    }

    input I_S0707_MAN_INVOICE_QRY_KSV_INVOICE_MST {
        S_BILL_DATE: String
        E_BILL_DATE: String
    }

    type T_S0707_MAN_INVOICE_TBL_KSV_INVOICE_MST {
        REF_NO: String
        BANK_NAME: String
        BUYER_NAME: String
        BILL_DATE: String
        CURR_CD: String
        BILL_AMT: String
        CONFIRM_AMT: String
        BAL_AMT: String
        END_FLAG: String
        BILL_TYPE: String
    }

    type Query {
        mgrQuery_S0707_MAN_INVOICE_TBL_KSV_INVOICE_MST(
            data: I_S0707_MAN_INVOICE_QRY_KSV_INVOICE_MST!
        ): [T_S0707_MAN_INVOICE_TBL_KSV_INVOICE_MST!]!
    }

    type Mutation {
        mgrInsert_S0707_MAN_INVOICE_EDT_KSV_INVOICE_MST(
            datas: [I_S0707_MAN_INVOICE_EDT_KSV_INVOICE_MST!]!
        ): [Ret_S0707_MAN_INVOICE_EDT_KSV_INVOICE_MST!]!
        mgrUpdate_S0707_MAN_INVOICE_EDT_KSV_INVOICE_MST(
            datas: [I_S0707_MAN_INVOICE_EDT_KSV_INVOICE_MST!]!
        ): [Ret_S0707_MAN_INVOICE_EDT_KSV_INVOICE_MST!]!
        mgrDelete_S0707_MAN_INVOICE_EDT_KSV_INVOICE_MST(
            datas: [I_S0707_MAN_INVOICE_EDT_KSV_INVOICE_MST!]!
        ): [Ret_S0707_MAN_INVOICE_EDT_KSV_INVOICE_MST!]!
    }
`;

export default moduleTypedefs_S0707_MAN_INVOICE;
