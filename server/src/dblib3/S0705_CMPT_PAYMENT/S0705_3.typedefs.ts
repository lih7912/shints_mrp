// MGR_S0705_3.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0705_3 = gql`
    type T_S0705_3 {
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

    input I_S0705_3 {
        FACTORY_CD: String
        BUYER_CD: String
        S_ISSUE_DATE: String
        E_ISSUE_DATE: String
        IS_SHIP_DATE: String
        IS_EXFACTORY: String
        IS_NEGO_CMPT: String
        INVOICE_NO: String
        INVOICE_TYPE: String
    }

    input I_S0705_EXCEL_PRINT {
        BILL_DATE: String
        FACTORY_CD: String
    }
    type T_S0705_EXCEL_PRINT {
        id: Int
        CODE: String
    }

    type Query {
        mgrQueryS0705_3(data: I_S0705_3!): [T_S0705_3!]!
        mgrQuery_S0705_EXCEL_PRINT(
            data: I_S0705_EXCEL_PRINT!
        ): [T_S0705_EXCEL_PRINT!]!
    }
`;

export default moduleTypedefs_S0705_3;
