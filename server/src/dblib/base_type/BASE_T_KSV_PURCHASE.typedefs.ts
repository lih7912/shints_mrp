// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_PURCHASE = gql`
    type BASE_QRY_KSV_PURCHASE {
        PUR_CD: String
        PUR_STATUS: String
        PUR_PART: String
        ITEM: String
        SPEC: String
        UNIT: String
        QTY: Int
        S_VENDOR_NAME: String
        S_COUNTRY: String
        S_PRICE: Float
        INCOTERMS: String
        CONFIRMATION: String
        ORDER_DATE: String
        S_INV_NO: String
        PO_RECEIVED_DATE: String
        SALES_CONT_NO: String
        SALES_CONT_DATE: String
        S_METHOD: String
        PUR_KIND: String
        PI_ETP_DATE: String
        BANK_PERMIT: String
        BANK_PERMIT_DATE: String
        ADVANCE_DATE: String
        BALANCE_DATE: String
        S_DOC_DRAFT_DATE: String
        S_DOC_CONFIRM_DATE: String
        ON_BOARD_DATE: String
        S_DOC_ETP_DATE: String
        S_DOC_TRACK_NO: String
        CONTAINER_NO: String
        BL_NUMBER: String
        ARRIVAL_DATE: String
        REMARK: String
        REG_USER: String
        REG_DATETIME: String
        DUE_DATE: String
        id: Int
    }

    input BASE_INPUT_KSV_PURCHASE {
        PUR_CD: String
        PUR_STATUS: String
        PUR_PART: String
        ITEM: String
        SPEC: String
        UNIT: String
        QTY: Int
        S_VENDOR_NAME: String
        S_COUNTRY: String
        S_PRICE: Float
        INCOTERMS: String
        CONFIRMATION: String
        ORDER_DATE: String
        S_INV_NO: String
        PO_RECEIVED_DATE: String
        SALES_CONT_NO: String
        SALES_CONT_DATE: String
        S_METHOD: String
        PUR_KIND: String
        PI_ETP_DATE: String
        BANK_PERMIT: String
        BANK_PERMIT_DATE: String
        ADVANCE_DATE: String
        BALANCE_DATE: String
        S_DOC_DRAFT_DATE: String
        S_DOC_CONFIRM_DATE: String
        ON_BOARD_DATE: String
        S_DOC_ETP_DATE: String
        S_DOC_TRACK_NO: String
        CONTAINER_NO: String
        BL_NUMBER: String
        ARRIVAL_DATE: String
        REMARK: String
        REG_USER: String
        REG_DATETIME: String
        DUE_DATE: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_PURCHASE;
