// MGR_S0413_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0413_1 = gql`
    input I_S0413_1 {
        INVOICE_NO: String
        PACK_CD: String
    }

    type T_S0413_1 {
        INVOICE: [T_S0413_2!]!
        INVOICE_1: [T_S0413_2_1!]!
        INVOICE_PO: [T_S0413_3!]!
    }

    type T_S0412_CODE_NEOE {
        LN_PARTNER: String
        CD_PARTNER: String
    }

    type T_S0413_CODE {
        CURR_CD: [BASE_QRY_KCD_CODE!]!
        INVOICE: [BASE_QRY_KSV_INVOICE_MATL!]!
        PACK_CD: [BASE_QRY_KSV_STOCK_OUT!]!
        PAYMENT_TYPE: [BASE_QRY_KCD_CODE!]!
        TRADE_TYPE: [BASE_QRY_KCD_CODE!]!
        TRADE_KIND: [BASE_QRY_KCD_CODE!]!
        NEOE_KIND: [T_S0412_CODE_NEOE!]!
    }

    type Query {
        mgrQueryS0413_1(data: I_S0413_1!): T_S0413_1!
        mgrQueryS0413_CODE(data: I_S0413_1!): T_S0413_CODE!
    }
`;

export default moduleTypedefs_S0413_1;
