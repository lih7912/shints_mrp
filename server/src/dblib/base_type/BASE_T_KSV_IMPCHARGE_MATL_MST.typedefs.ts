// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_IMPCHARGE_MATL_MST = gql`
    type BASE_QRY_KSV_IMPCHARGE_MATL_MST {
        INVOICE_NO: String
        SHIP_DATE: String
        DELIVERY_TYPE: String
        BUYER_CD: String
        TOT_AMT: Float
        ADJ_AMT: Float
        ORD_AMT: Float
        CURR_CD: String
        REMARK: String
        EXT_INVOICE: String
        INVOICE_TYPE: String
        SUPPLIER: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        customs: Float
        vat: Float
        freight: Float
        clearance: Float
        id: Int
    }

    input BASE_INPUT_KSV_IMPCHARGE_MATL_MST {
        INVOICE_NO: String
        SHIP_DATE: String
        DELIVERY_TYPE: String
        BUYER_CD: String
        TOT_AMT: Float
        ADJ_AMT: Float
        ORD_AMT: Float
        CURR_CD: String
        REMARK: String
        EXT_INVOICE: String
        INVOICE_TYPE: String
        SUPPLIER: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        customs: Float
        vat: Float
        freight: Float
        clearance: Float
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_IMPCHARGE_MATL_MST;
