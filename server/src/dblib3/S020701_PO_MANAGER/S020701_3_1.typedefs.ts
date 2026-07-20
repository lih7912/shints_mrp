// MGR_S020701_3_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S020701_3_1 = gql`
    type T_S020701_3_1 {
        REF_ORDER_NO: String
        ORDER_CD: String
        STYLE_NAME: String
        DUE_DATE: String
        QTY: Int
        FOB: Float
        CURR_CD: String
        MESSERS: String
        ADDR1: String
        ADDR2: String
        CONSIGNEE: String
        CADDR1: String
        CADDR2: String
        PRICE_TERM: String
        DESTINATION: String
        PORT: String
        BANK: String
        REMARK: String
        BVT_FLAG: String
        PI_REMARK1: String
        PI_REMARK2: String
        PI_REMARK3: String
        PI_REMARK4: String
        PI_REMARK5: String
        PI_REMARK6: String
        PI_REMARK7: String
        PI_REMARK8: String
    }

    input I_S020701_3_1 {
        PI_CD: String
    }

    type Query {
        mgrQueryS020701_3_1(data: I_S020701_3_1!): [T_S020701_3_1!]!
    }
`;

export default moduleTypedefs_S020701_3_1;
