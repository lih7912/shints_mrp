// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_IMPCHARGE_MATL_MST_ETHIOPIA = gql`
    type BASE_QRY_KSV_IMPCHARGE_MATL_MST_ETHIOPIA {
        IMPORT_NO: String
        BUYER_CD: String
        INVOICE_NO: String
        SUPPLIER_NAME: String
        DELIVERY_TYPE: String
        BL_NO: String
        ETD: String
        ETA: String
        FACTORY_ETA: String
        PO_NO: String
        SHIPPING_GOODS: String
        DECLEARANCE_DATE: String
        CAPITALIZATION: String
        SENDING_DATE: String
        SALES_CONTACT_NO: String
        REF: String
        REMARK: String
        ORD_AMT: Float
        CURR_CD: String
        FREIGHT_TYPE: String
        FREIGHT_COST: Float
        DUTY: Float
        VAT: Float
        TRANSPORTATION_FEE: Float
        RETURN_COST: Float
        CLEARANCE_FEE: Float
        INSPECTION_FEE: Float
        PORT_HANDLING_CHARGE: Float
        SCANING_FEE: Float
        DISBURSMENT_FEE: Float
        CONTAINER_BOND_FEE: Float
        DEMURRAGE_FEE: Float
        STORAGE_FEE: Float
        TERMINAL_CHARGE: Float
        SPECIAL_CHARGE: Float
        REF_CHARGE: Float
        IMPORT_REMARK: String
        IMPORT_COST: Float
        IMPORT_COST_DATE: String
        FREIGHT_AMT: Float
        FREIGHT_AMT_DATE: String
        LOCAL_CHG_AMT: Float
        LOCAL_CHG_AMT_DATE: String
        DUTY_AMT: Float
        DUTY_AMT_DATE: String
        STATUS_CD: String
        GROSS_WEIGHT: Float
        MEASUREMENT: Float
        AIR_RATE: Float
        ETP_FROM: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_IMPCHARGE_MATL_MST_ETHIOPIA {
        IMPORT_NO: String
        BUYER_CD: String
        INVOICE_NO: String
        SUPPLIER_NAME: String
        DELIVERY_TYPE: String
        BL_NO: String
        ETD: String
        ETA: String
        FACTORY_ETA: String
        PO_NO: String
        SHIPPING_GOODS: String
        DECLEARANCE_DATE: String
        CAPITALIZATION: String
        SENDING_DATE: String
        SALES_CONTACT_NO: String
        REF: String
        REMARK: String
        ORD_AMT: Float
        CURR_CD: String
        FREIGHT_TYPE: String
        FREIGHT_COST: Float
        DUTY: Float
        VAT: Float
        TRANSPORTATION_FEE: Float
        RETURN_COST: Float
        CLEARANCE_FEE: Float
        INSPECTION_FEE: Float
        PORT_HANDLING_CHARGE: Float
        SCANING_FEE: Float
        DISBURSMENT_FEE: Float
        CONTAINER_BOND_FEE: Float
        DEMURRAGE_FEE: Float
        STORAGE_FEE: Float
        TERMINAL_CHARGE: Float
        SPECIAL_CHARGE: Float
        REF_CHARGE: Float
        IMPORT_REMARK: String
        IMPORT_COST: Float
        IMPORT_COST_DATE: String
        FREIGHT_AMT: Float
        FREIGHT_AMT_DATE: String
        LOCAL_CHG_AMT: Float
        LOCAL_CHG_AMT_DATE: String
        DUTY_AMT: Float
        DUTY_AMT_DATE: String
        STATUS_CD: String
        GROSS_WEIGHT: Float
        MEASUREMENT: Float
        AIR_RATE: Float
        ETP_FROM: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_IMPCHARGE_MATL_MST_ETHIOPIA;
