import { gql } from 'apollo-server';

const moduleTypedefs_S0516_EXPORT_EXCEL = gql`
    type T_S0516_export_STOCK_USE_LIST {
        id: String
        CODE: String
    }

    input I_S0516_export_STOCK_USE_LIST {
        PO_CD: String
        PO_SEQ: String
        MATL_CD: String
        ORDER_CD: String
        MRP_SEQ: String
        STOCK_IDX: String
        USE_QTY: String
        PO_QTY: String
        DIFF_PO_TYPE: String
        USE_PO_TYPE: String
        STOCK_IDX2: String
        USE_QTY2: String
        CONF_FLAG: String
        CONF_USER: String
        REQ_QTY: String
        DEFECT_QTY: String
        LOSS_QTY: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        NOTUSE_QTY: String
        REASON: String
        CANCEL_QTY: String
        RACK: String
        LOCATION: String
        OK_USE: String
        DEFECT: String
        SHORT: String
        LOST: String
        BALANCE: String

        WARE_NAME: String
        ORG_PO_CD: String
        ORG_PO_SEQ: String
        ORG_MATL_CD: String
        VENDOR_NAME: String
        CONDITION: String
        ORG_QTY: String
        USE_DATE: String

        OKUSE_QTY: String
        SHORT_QTY: String

        DELIVERY: String
        HS_CODE: String
        COMPOSITION: String
        WEIGHT: String
        PRICE: String
        CURR_CD: String
    }

    input I_S0516_export_ETP_EXCEL {
        INPUT_PO_CD: String
        BUYER_CD: String
        ORG_PO_CD: String
        ORG_MATL_CD: String
        INVOICE_NO: String
        HS_CODE: String
        COMPOSITION: String
        BVT_NAME: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        VENDOR_NAME: String
        ORIGIN: String
        USE_QTY: String
        CT_QTY: String
        CT_NO: String
        WEIGHT: String
        CBM: String
        PRICE: String
        UNIT: String
        AMOUNT: String
        REMARK: String
    }

    type Query {
        mgrQueryS0516_export_EXCEL(
            data: [I_S0516_export_STOCK_USE_LIST!]!
        ): [T_S0516_export_STOCK_USE_LIST!]!
        mgrQueryS0516_export_STOCK_USE_LIST(
            data: [I_S0516_export_STOCK_USE_LIST!]!
        ): [T_S0516_export_STOCK_USE_LIST!]!
        mgrQueryS0516_export_STOCK_CHECK_FORM(
            data: [I_S0516_export_STOCK_USE_LIST!]!
        ): [T_S0516_export_STOCK_USE_LIST!]!
        mgrQueryS0516_export_EXCEL2(
            data: [I_S0516_export_ETP_EXCEL!]!
        ): [T_S0516_export_STOCK_USE_LIST!]!
    }
`;

export default moduleTypedefs_S0516_EXPORT_EXCEL;
