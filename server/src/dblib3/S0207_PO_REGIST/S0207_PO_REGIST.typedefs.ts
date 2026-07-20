// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0207_PO_REGIST = gql`
    input I_S0207_PO_REGIST_EDT_KSV_ORDER_MST {
        PO_CD: String
        ORDER_CD: String
        STYLE_NAME: String
        DUE_DATE: String
        TOT_CNT: String
        ORDER_STATUS_NAME: String
        FACTORY_NAME: String
        STYLE_CD: String
        ORDER_STATUS: String
        FACTORY_CD: String
        SAMPLE_FLAG: String
        ORDER_FLAG: String
        MATL_SALE_FLAG: String
        FAC_LC_FLAG: String
    }

    type Ret_S0207_PO_REGIST_EDT_KSV_ORDER_MST {
        id: Int!
        CODE: String!
    }

    input I_S0207_PO_REGIST_QRY_KSV_PO_MST {
        PO_CD: String
        ORDER_CD: String
        STYLE_CD: String
        BUYER_CD: String
        GOODS_FLAG: String
        SAMPLE_FLAG: String
        FACTORY_LC_FLAG: String
    }

    type T_S0207_PO_REGIST_TBL_KSV_ORDER_MST {
        ORDER_CD: String
        STYLE_NAME: String
        DUE_DATE: String
        TOT_CNT: String
        ORDER_STATUS_NAME: String
        FACTORY_NAME: String
        STYLE_CD: String
        ORDER_STATUS: String
        FACTORY_CD: String
        SAMPLE_FLAG: String
    }

    type T_S0207_PO_REGIST_TBL_KSV_PO_MST {
        PO_CD: String
        ORDER_CD: String
        STYLE_NAME: String
        DUE_DATE: String
        TOT_CNT: String
        ORDER_STATUS_NAME: String
        FACTORY_NAME: String
        STYLE_CD: String
        ORDER_STATUS: String
        FACTORY_CD: String
        SAMPLE_FLAG: String
    }

    type T_S0207_PO_REGIST_CODE {
        STYLE: [BASE_QRY_KCD_STYLE!]!
        BUYER: [BASE_QRY_KCD_BUYER!]!
    }

    type Query {
        mgrQuery_S0207_PO_REGIST_TBL_KSV_ORDER_MST(
            data: I_S0207_PO_REGIST_QRY_KSV_PO_MST!
        ): [T_S0207_PO_REGIST_TBL_KSV_ORDER_MST!]!
        mgrQuery_S0207_PO_REGIST_TBL_KSV_PO_MST(
            data: I_S0207_PO_REGIST_QRY_KSV_PO_MST!
        ): [T_S0207_PO_REGIST_TBL_KSV_PO_MST!]!
        mgrQuery_S0207_PO_REGIST_CODE: T_S0207_PO_REGIST_CODE!
    }

    type Mutation {
        mgrInsert_S0207_PO_REGIST_EDT_KSV_ORDER_MST(
            datas: [I_S0207_PO_REGIST_EDT_KSV_ORDER_MST!]!
        ): [Ret_S0207_PO_REGIST_EDT_KSV_ORDER_MST!]!
        mgrUpdate_S0207_PO_REGIST_EDT_KSV_ORDER_MST(
            datas: [I_S0207_PO_REGIST_EDT_KSV_ORDER_MST!]!
        ): [Ret_S0207_PO_REGIST_EDT_KSV_ORDER_MST!]!
        mgrDelete_S0207_PO_REGIST_EDT_KSV_ORDER_MST(
            datas: [I_S0207_PO_REGIST_EDT_KSV_ORDER_MST!]!
        ): [Ret_S0207_PO_REGIST_EDT_KSV_ORDER_MST!]!
    }
`;

export default moduleTypedefs_S0207_PO_REGIST;
