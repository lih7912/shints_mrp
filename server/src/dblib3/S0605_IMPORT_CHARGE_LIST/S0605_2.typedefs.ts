// MGR_S0605_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0605_2 = gql`
    type T_S0605_2 {
        INVOICE_NO: String
        SHIP_DATE: String
        CURR_CD: String
        ORD_AMT: Float
        TOT_AMT: Float
        CUSTOMS: Float
        VAT: Float
        FREIGHT: Float
        CLEARANCE: Float
        REMARK: String
        CD_NAME: String
        BUYER_CD: String
        BUYER_NAME: String
    }

    input I_S0605_2 {
        S_SHIP_DATE: String
        E_SHIP_DATE: String
        DELIVERY_TYPE: String
        BUYER_CD: String
    }

    type Query {
        mgrQueryS0605_2(data: I_S0605_2!): [T_S0605_2!]!
    }
`;

export default moduleTypedefs_S0605_2;
