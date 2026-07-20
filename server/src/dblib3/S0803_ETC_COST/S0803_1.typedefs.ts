import { gql } from 'apollo-server';

const moduleTypedefs_S0803_ETC_COST = gql`
    type T_S0803_LOOKUP {
        code: String
        name: String
        label: String
        regNo: String
        invoiceName: String
    }

    type T_S0803_CODE_OPTION {
        value: String
        label: String
    }

    type T_S0803_OPTIONS {
        costCenters: [T_S0803_LOOKUP!]!
        accounts: [T_S0803_LOOKUP!]!
        suppliers: [T_S0803_LOOKUP!]!
        currencies: [String!]!
        actOptions: [String!]!
        payTypeOptions: [T_S0803_CODE_OPTION!]!
        requestTypeOptions: [T_S0803_CODE_OPTION!]!
        taxTypeOptions: [T_S0803_CODE_OPTION!]!
        cardOptions: [T_S0803_CODE_OPTION!]!
    }

    type T_S0803_FRM206_ROW {
        CD_SEQ: String
        CD_STATUS: String
        NM_STATUS: String
        DT_DOCUMENT: String
        DT_REQUEST: String
        NM_PAY_TYPE: String
        DT_ACTUAL: String
        BUYER_NAME: String
        NM_DS: String
        NM_CURR: String
        ACTUAL: String
        VENDOR_NAME: String
        BANK_CD: String
        NM_REMARK: String
        CD_CC: String
        CD_ACCT: String
        CD_SUPPLIER: String
        CD_BILL: String
        NM_REQUEST_TYPE: String
        BANK_NAME: String
        ACCOUNT_NO: String
        ACCOUNT_NAME: String
        NM_ACDOC: String
        NM_CARD: String
        REG_NO: String
        AMT: String
        VAT: String
        TOT: String
        MIN_AMT: String
        ACT_OPTION: String
        ACT_REMARK: String
        CD_TAX: String
        NM_TAX: String
        CD_PAY_TYPE: String
        CD_REQUEST_TYPE: String
        CD_CARD: String
        REG_INFO: String
        UPD_INFO: String
        GW_INFO: String
        ISSUE_INFO: String
        SEND_INFO: String
        CD_PART: String
    }

    type T_S0803_FRM206_BANK {
        BANK_CD: String
        BANK_NAME: String
        ACCOUNT_NO: String
        ACCOUNT_NAME: String
        SFTCODE: String
        BANK_BRANCH: String
    }

    type T_S0803_FRM206_TEMPLATE {
        ID: String
        TITLE: String
    }

    type T_S0803_ACTION_RESULT {
        CODE: String
        ID: String
        OPEN_URL: String
    }

    input INPUT_S0803_FRM206_USER {
        USER_ID: String
        PART: String
    }

    input INPUT_S0803_FRM206_FILTER {
        USER_ID: String
        PART: String
        DATE_TYPE: String
        FROM_DATE: String
        TO_DATE: String
        STATUS: String
        COST_CENTER: String
        ACCOUNT: String
        SUPPLIER: String
    }

    input INPUT_S0803_FRM206_KEY {
        USER_ID: String
        PART: String
        ID: String
    }

    input INPUT_S0803_FRM206_VENDOR {
        USER_ID: String
        PART: String
        VENDOR_CD: String
    }

    input INPUT_S0803_FRM206_SAVE {
        ID: String
        USER_ID: String
        PART: String
        DT_DOCUMENT: String
        DT_REQUEST: String
        TITLE: String
        COST_CENTER_CODE: String
        ACCOUNT_CODE: String
        SUPPLIER_CODE: String
        BANK_CODE: String
        CURRENCY: String
        AMT: String
        VAT: String
        TOT: String
        MINUS_AMT: String
        ACTUAL_AMT: String
        ACT_OPTION: String
        ACT_REMARK: String
        TAX_CODE: String
        PAY_TYPE_CODE: String
        REQUEST_TYPE_CODE: String
        CARD_CODE: String
    }

    input INPUT_S0803_FRM206_BATCH {
        USER_ID: String
        PART: String
        IDS: [String!]
        ACCOUNTING_DATE: String
    }

    type Query {
        mgrQueryFrm206Options(data: INPUT_S0803_FRM206_USER!): T_S0803_OPTIONS!
        mgrQueryFrm206List(
            data: INPUT_S0803_FRM206_FILTER!
        ): [T_S0803_FRM206_ROW!]!
        mgrQueryFrm206Detail(data: INPUT_S0803_FRM206_KEY!): T_S0803_FRM206_ROW
        mgrQueryFrm206Banks(
            data: INPUT_S0803_FRM206_VENDOR!
        ): [T_S0803_FRM206_BANK!]!
        mgrQueryFrm206Templates(
            data: INPUT_S0803_FRM206_USER!
        ): [T_S0803_FRM206_TEMPLATE!]!
        mgrQueryFrm206TemplateDetail(
            data: INPUT_S0803_FRM206_KEY!
        ): T_S0803_FRM206_ROW
    }

    type Mutation {
        mgrInsertFrm206Save(
            data: INPUT_S0803_FRM206_SAVE!
        ): T_S0803_ACTION_RESULT!
        mgrUpdateFrm206Save(
            data: INPUT_S0803_FRM206_SAVE!
        ): T_S0803_ACTION_RESULT!
        mgrUpdateFrm206Cancel(
            data: INPUT_S0803_FRM206_KEY!
        ): T_S0803_ACTION_RESULT!
        mgrGwFrm206Expense(
            data: INPUT_S0803_FRM206_BATCH!
        ): T_S0803_ACTION_RESULT!
        mgrGwFrm206DeleteRequest(
            data: INPUT_S0803_FRM206_BATCH!
        ): T_S0803_ACTION_RESULT!
        mgrIssueFrm206Accounting(
            data: INPUT_S0803_FRM206_BATCH!
        ): T_S0803_ACTION_RESULT!
        mgrCancelFrm206Accounting(
            data: INPUT_S0803_FRM206_BATCH!
        ): T_S0803_ACTION_RESULT!
        mgrFinishFrm206Sending(
            data: INPUT_S0803_FRM206_BATCH!
        ): T_S0803_ACTION_RESULT!
    }
`;

export default moduleTypedefs_S0803_ETC_COST;
