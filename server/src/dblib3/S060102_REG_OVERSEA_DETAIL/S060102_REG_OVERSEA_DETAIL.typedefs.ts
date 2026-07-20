// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S060102_REG_OVERSEA_DETAIL = gql`
    input I_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST {
        INVOICE_NO: String
        ETA: String
        DOC_REC_DATE: String
        DOC_SEND_DATE: String
        SHIP_ADVICE_DATE: String
        FULL_DOC_REC_DATE: String
        DHL_NO: String
        TO: String
        MEASUREMENT: String
        GROSS_WEIGHT: String
        TOTAL_CTNS: String
        BL_NO: String
        FORWARD_NAME: String
        FREIGHT_COST: String
        AIR_RATE: String
        PAYMENT_TERM: String
    }

    type Ret_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST {
        id: Int!
        CODE: String!
    }

    type Mutation {
        mgrInsert_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST(
            datas: [I_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST!]!
        ): [Ret_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST!]!
        mgrUpdate_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST(
            datas: [I_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST!]!
        ): [Ret_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST!]!
        mgrDelete_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST(
            datas: [I_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST!]!
        ): [Ret_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST!]!
    }
`;

export default moduleTypedefs_S060102_REG_OVERSEA_DETAIL;
