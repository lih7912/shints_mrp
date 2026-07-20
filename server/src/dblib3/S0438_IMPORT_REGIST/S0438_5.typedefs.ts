// MGR_S0438_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0438_5 = gql`
    input I_S0438_5 {
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
        TOTAL_IMPORT_COST: String
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

    input I_S0438_5_1 {
        STATUS_CD: String
        STATUS_NAME: String
        CONFIRM_USER: String
        LICENSE_DATE: String
        LICENSE_NO: String
        REMARK: String
        IMPORT_FREIGHT_AMT: String
        IMPORT_FREIGHT_AMT_CURR: String
        IMPORT_CLEARANCE_AMT: String
        IMPORT_DUTY_AMT: String
        IMPORT_HANDLING_AMT: String
        TOTAL_IMPORT_COST: String
        DUTY_ITEM: String
        RETURN_REMARK: String
        EXPORT_DATE: String
        EXPORT_NO: String
        RETURN_DATE: String
        RETURN_AMT: String
        NOT_RETURN_TAX: String
    }

    type Ret_S0438_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0438_5(
            datas: I_S0438_5!
            datas1: I_S0438_5_1!
        ): [Ret_S0438_5!]!
        mgrInsert_S0438_5_INSERT_RETURN(
            datas: I_S0438_5!
            datas1: I_S0438_5_1!
        ): [Ret_S0438_5!]!
        mgrInsert_S0438_5_END_RETURN(
            datas: I_S0438_5!
            datas1: I_S0438_5_1!
        ): [Ret_S0438_5!]!
        mgrInsert_S0438_5_INSERT_EXPORT(
            datas: I_S0438_5!
            datas1: I_S0438_5_1!
        ): [Ret_S0438_5!]!
        mgrInsert_S0438_5_PROCESS_RETURN(
            datas: I_S0438_5!
            datas1: I_S0438_5_1!
        ): [Ret_S0438_5!]!
        mgrDelete_S0438_5(
            datas: I_S0438_5!
            datas1: I_S0438_5_1!
        ): [Ret_S0438_5!]!
    }
`;

export default moduleTypedefs_S0438_5;
