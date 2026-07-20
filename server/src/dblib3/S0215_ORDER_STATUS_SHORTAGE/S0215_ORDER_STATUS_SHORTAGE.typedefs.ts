// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0215_ORDER_STATUS_SHORTAGE = gql`
    input I_S0215_ORDER_STATUS_SHORTAGE_QRY_KSV_ORDER_MST {
        SHIP_DATE: String
        BUYER_CD: String
        FACTORY_CD: String
        ORDER_STATUS: String
        END: String
        PO_CD: String
        ORDER_CD: String
        END_DATE: String
        STS_COMMENT: String
        BVT_COMMENT: String
    }
    type T_S0215_ORDER_STATUS_SHORTAGE_TBL_KSV_ORDER_MST {
        PO_CD: String
        ORDER_CD: String
        STYLE_NAME: String
        STYLE_CD: String
        TOT_CNT: String
        SHIP_CNT: String
        BAL: String
        AGREED_QTY1: String
        AGREED_QTY2: String
        AGREED_QTY3: String
        SHIP_DATE: String
        CONF: String
        CONFIRM_AMT: String
        U_PRICE: String
        FC_PRICE: String
        ORDER_STATUS_N: String
        STS_REMARK: String
        FACTORY_REMARK: String
        CHARGED_SUP: String
        CHARGED_BUYER: String
        CHARGED_STS: String
        REMARK: String
        END_FLAG: String
        END_DATE: String
    }

    type T_S0215_ORDER_DATE {
        ORDER_DATE_MONTH: String
    }

    type T_S0215_ORDER_STATUS_SHORTAGE_CODE {
        SHIP_DATE: [BASE_QRY_KCD_CODE!]!
        END_TYPE: [BASE_QRY_KCD_CODE!]!
        TYPE: [BASE_QRY_KCD_CODE!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
        BUYER_TEAM: [BASE_QRY_KCD_CODE!]!
    }

    type Query {
        mgrQuery_S0215_ORDER_STATUS_SHORTAGE_TBL_KSV_ORDER_MST(
            data: I_S0215_ORDER_STATUS_SHORTAGE_QRY_KSV_ORDER_MST!
        ): [T_S0215_ORDER_STATUS_SHORTAGE_TBL_KSV_ORDER_MST!]!
        mgrQuery_S0215_ORDER_STATUS_SHORTAGE_CODE: T_S0215_ORDER_STATUS_SHORTAGE_CODE!
    }
`;

export default moduleTypedefs_S0215_ORDER_STATUS_SHORTAGE;
