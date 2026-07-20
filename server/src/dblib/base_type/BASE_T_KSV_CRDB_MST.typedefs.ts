// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_CRDB_MST = gql`
    type BASE_QRY_KSV_CRDB_MST {
        CRDB_CD: String
        CRDB_TYPE: String
        CRDB_DATE: String
        CRDB_SEQ: Int
        END_DATE: String
        MESSER_CD: String
        CRDB_AMT: Float
        CURR_CD: String
        BANK_CD: String
        TITLE: String
        REMARK: String
        YY: Int
        SEQ: Int
        STATUS_CD: String
        CONF_USER: String
        CONF_FLAG: String
        REG_USER: String
        REG_DATETIME: String
        PO_CD: String
        ORDER_CD: String
        REMARK_S: String
        CIP: String
        BUYER_CD: String
        PAYMENT_PLAN: String
        DEBIT_TYPE: String
        DOCU_NO: String
        CHARGER: String
        LINK_TO: String
        END_TYPE: String
        VAT: Float
        FROM_CD: String
        DEBIT_BL_NO: String
        TRANSPORTATION: String
        FREIGHT_TERM: String
        CBM: Float
        WEIGHT: Float
        HISTORY_NO: String
        CI_NO: String
        TOT_CBM: Float
        TOT_AMT: Float
        id: Int
    }

    input BASE_INPUT_KSV_CRDB_MST {
        CRDB_CD: String
        CRDB_TYPE: String
        CRDB_DATE: String
        CRDB_SEQ: Int
        END_DATE: String
        MESSER_CD: String
        CRDB_AMT: Float
        CURR_CD: String
        BANK_CD: String
        TITLE: String
        REMARK: String
        YY: Int
        SEQ: Int
        STATUS_CD: String
        CONF_USER: String
        CONF_FLAG: String
        REG_USER: String
        REG_DATETIME: String
        PO_CD: String
        ORDER_CD: String
        REMARK_S: String
        CIP: String
        BUYER_CD: String
        PAYMENT_PLAN: String
        DEBIT_TYPE: String
        DOCU_NO: String
        CHARGER: String
        LINK_TO: String
        END_TYPE: String
        VAT: Float
        FROM_CD: String
        DEBIT_BL_NO: String
        TRANSPORTATION: String
        FREIGHT_TERM: String
        CBM: Float
        WEIGHT: Float
        HISTORY_NO: String
        CI_NO: String
        TOT_CBM: Float
        TOT_AMT: Float
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_CRDB_MST;
