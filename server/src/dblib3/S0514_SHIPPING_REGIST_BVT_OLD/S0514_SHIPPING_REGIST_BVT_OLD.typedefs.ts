// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0514_SHIPPING_REGIST_BVT_OLD = gql`
    input I_S0514_SHIPPING_REGIST_BVT_OLD_QRY_KSV_ORDER_SHIP {
        FACTORY_CD: String
        STYLE_CD: String
        BUYER_CD: String
        INVOICE_NO: String
        DELIVERY: String
        IS_SHIP_DATE: String
        S_SHIP_DATE: String
        E_SHIP_DATE: String
        IS_EX_FACTORY: String
        S_EX_FACTORY: String
        E_EX_FACTORY: String
    }
    type T_S0514_SHIPPING_REGIST_BVT_OLD_TBL_KSV_ORDER_SHIP {
        ORDER_CD: String
        BUYER_NAME: String
        STYLE_NAME: String
        DUE_DATE: String
        ORDER_QTY: String
        SHIP_QTY: String
        FOB_USD: String
        EXFACTORY: String
        SHIP_DATE: String
        SHIP_PROD_TYPE: String
        INVOICE_NO: String
        NAT_NAME: String
        DELIVERY_TYPE: String
        ORDER_STATUS: String
        FACTORY_NAME: String
    }

    type Query {
        mgrQuery_S0514_SHIPPING_REGIST_BVT_OLD_TBL_KSV_ORDER_SHIP(
            data: I_S0514_SHIPPING_REGIST_BVT_OLD_QRY_KSV_ORDER_SHIP!
        ): [T_S0514_SHIPPING_REGIST_BVT_OLD_TBL_KSV_ORDER_SHIP!]!
    }
`;

export default moduleTypedefs_S0514_SHIPPING_REGIST_BVT_OLD;
