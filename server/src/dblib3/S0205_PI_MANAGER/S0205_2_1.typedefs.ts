// MGR_S0205_2_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0205_2_1 = gql`
    type T_S0205_2_1 {
        PI_CD: String
        MESSERS: String
        ADDR1: String
        ADDR2: String
        CONSIGNEE: String
        CADDR1: String
        CADDR2: String
        PRICE_TERM: String
        DESTINATION: String
        PORT: String
        BANK_CD: String
        PAY_TYPE_CD: String
        BVT_FLAG: String
        PI_REMARK1: String
        PI_REMARK2: String
        PI_REMARK3: String
        PI_REMARK4: String
        PI_REMARK5: String
        PI_REMARK6: String
        PI_REMARK7: String
        PI_REMARK8: String
        YY: String
        SEQ: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        PAY_RULE: String
        id: String
        BUYER_CD: String
        QTY: String
        AMT: String
        BUYER_NAME: String
        STATUS_NAME: String
        FILE_NAME: String
        FILE_URL: String
        FILE_OBJECT: String
        SHIP_ADDR1: String
        SHIP_ADDR2: String
        SHIP_ADDR3: String
    }

    input I_S0205_2_1 {
        BUYER_CD: String
        PI_CD: String
        STATUS_CD: String
        S_REG_DATE: String
        E_REG_DATE: String
    }

    type Query {
        mgrQueryS0205_2_1(data: I_S0205_2_1!): [T_S0205_2_1!]!
    }
`;

export default moduleTypedefs_S0205_2_1;
