// MGR_S0610_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0610_5 = gql`
    input I_S0610_5 {
        id: Int
        BUYER_CD: String
        COST_DATE: String
        PO_CD: String
        SHIPMENT_CD: String
        INVOICE_NO: String
        TYPE: String
        TYPE2: String
        COST_CURR: String
        COST_AMT: String
        REG_USER: String
        CONFIRM_USER: String
        CONFIRM_DATE: String
        MATL_NAME: String
        MATL_CD: String
        BL_NO: String
        SHIP_DATE: String
        VENDOR_NAME: String
        VENDOR_CD: String
        PU_CD: String
        SHIP_DATE1: String
        BL_NO1: String
        DETAIL: String
        STSIN_CD: String
    }

    input I_S0610_5_1 {
        CONFIRM_USER: String
        CONFIRM_DATE: String
    }

    type Ret_S0610_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0610_5(
            datas: [I_S0610_5!]!
            datas1: I_S0610_5_1!
        ): [Ret_S0610_5!]!
        mgrInsert_S0610_5_CANCEL(
            datas: [I_S0610_5!]!
            datas1: I_S0610_5_1!
        ): [Ret_S0610_5!]!
    }
`;

export default moduleTypedefs_S0610_5;
