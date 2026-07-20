// MGR_S0705_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0705_5 = gql`
    input I_S0705_5 {
        BUYER_CD: String
        INVOICE_NO: String
        PO_CD: String
        ORDER_CD: String
        STYLE_NAME: String
        SHIP_PTYPE_N: String
        SHIP_DATE: String
        EXFACTORY: String
        SHIP_CNT: String
        FC_ORD_PRICE: String
        FC_BILL_PRICE: String
        FC_AMT: String
        BILL_CHK_N: String
        BILL_FLAG_N: String
        BILL_DATE: String
        BILL_CHK: String
        BILL_FLAG: String
        SHIP_PTYPE: String
        FC_NEGO_TYPE: String
        SCREEN_PRINT: String
        HEAT_SILICON: String
        EMBROIDERY: String
        TPR: String
        WELDING: String
        QUILTING: String
        DIGITAL_PRINT: String
        LABEL_PRINT: String
        LINE_CHARGE: String
        CMPT_TOTAL: String
        TOTAL_AMT: String
        REMARK: String
        TOTAL_CNT: String
    }

    input I_S0705_5_1 {
        BILL_DATE: String
    }

    type Ret_S0705_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0705_5_UPDATE_BILL(
            datas: [I_S0705_5!]!
            datas1: I_S0705_5_1!
        ): [Ret_S0705_5!]!
        mgrInsert_S0705_5_UPDATE_SALES(
            datas: [I_S0705_5!]!
            datas1: I_S0705_5_1!
        ): [Ret_S0705_5!]!
        mgrInsert_S0705_5_CANCEL_BILL(
            datas: [I_S0705_5!]!
            datas1: I_S0705_5_1!
        ): [Ret_S0705_5!]!
        mgrInsert_S0705_5_CANCEL_SALES(
            datas: [I_S0705_5!]!
            datas1: I_S0705_5_1!
        ): [Ret_S0705_5!]!
    }
`;

export default moduleTypedefs_S0705_5;
