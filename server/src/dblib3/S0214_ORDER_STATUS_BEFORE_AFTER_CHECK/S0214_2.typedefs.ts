// MGR_S0214_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0214_2 = gql`
    type T_S0214_2 {
        ORDER_CD: String
        STYLE_NAME: String
        TOT_CNT: String
        SHIP_CNT: String
        SHIP_DATE: String
        USD_PRICE: String
        ORD_AMT: String
        COMM_AMT: String
        MATL_AMT: String
        MATL_PRICE: String
        FC_PRICE: String
        ETC_AMT: String
        ETC_PRICE: String
        TOT_AMT: String
        TOT_PRICE: String
        RATE: String
        KIND: String
        COMMISSION: String
        FC_BEF: String
        ORDER_STATUS_NAME: String
        ORDER_STATUS: String
        REMARK: String
        FACTORY_CD: String
        LINE_CHARGE_PRICE: String
        END_DATETIME: String
        DW_BEF_COST: String
        MAX_SHIP_DATE: String
    }

    input I_S0214_2 {
        SHIPDATE_FLAG: String
        S_SHIP_DATE: String
        E_SHIP_DATE: String
        BUYER_CD: String
        ORDER_CD: String
        PARTIAL_SHIP_FLAG: String
        END_REPORT_FLAG: String
        END_FLAG: String
        REPORT_KIND: String
    }

    type Query {
        mgrQueryS0214_2(data: I_S0214_2!): [T_S0214_2!]!
    }
`;

export default moduleTypedefs_S0214_2;
