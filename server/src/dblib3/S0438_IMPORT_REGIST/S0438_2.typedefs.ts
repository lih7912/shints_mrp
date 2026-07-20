// MGR_S0438_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0438_2 = gql`
    type T_S0438_2 {
        KIND: String
        STATUS_CD: String
        INVOICE_NO: String
        BUYER_CD: String
        SHIP_DATE: String
        NAT_CD: String
        NAT_NAME: String
        DELIVERY_TYPE: String
        QTY: String
        SHIP_PRICE: String
        TOT_AMT: String
        ORD_AMT: String
        IMP_TOT_AMT: String
        IMP_ORD_AMT: String
        CURR_CD: String
        BUYER_NAME: String
        DELIVERY_TYPE_N: String
        LICENSE_NO: String
        LICENSE_DATE: String
        CONFIRM_USER: String
        REMARK: String
        IMPORT_FREIGHT_AMT: String
        IMPORT_CLEARANCE_AMT: String
        IMPORT_DUTY_AMT: String
        IMPORT_HANDLING_AMT: String
        IMPORT_FREIGHT_AMT1: String
        IMPORT_CLEARANCE_AMT1: String
        IMPORT_DUTY_AMT1: String
        IMPORT_FREIGHT_AMT2: String
        IMPORT_CLEARANCE_AMT2: String
        IMPORT_DUTY_AMT2: String
        DUTY_ITEM: String
        RETURN_REMARK: String
        DOCU_NO: String
        FACTORY_NAME: String
    }

    input I_S0438_2 {
        STATUS_CD: String
        INVOICE_NO: String
        LICENSE_NO: String
        BUYER_CD: String
        S_SHIP_DATE: String
        E_SHIP_DATE: String
        VENDOR_CD: String
        KIND: String
        REMARK: String
    }

    type T_S0438_2_DUTY_MST {
        INCOME_NO: String
        END_FLAG: String
        RETURN_AMT: String
        EXPORT_DATE: String
        EXPORT_NO: String
        RETURN_DATE: String
        S_RETURN_AMT: String
    }

    input I_S0438_2_DUTY_MST {
        INCOME_NO: String
    }

    type Query {
        mgrQueryS0438_2(data: I_S0438_2!): [T_S0438_2!]!
        mgrQueryS0438_2_DUTY_MST(
            data: I_S0438_2_DUTY_MST!
        ): [T_S0438_2_DUTY_MST!]!
    }
`;

export default moduleTypedefs_S0438_2;
