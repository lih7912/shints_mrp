// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0200_KCD_STYLE = gql`
    type T_S0200_CODE {
        T_KCD_STYLE_STATUS_CD: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_BUYER: [BASE_QRY_KCD_BUYER!]!
        T_KCD_STYLE_KIND: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_DL: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_MW: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_EMBRO: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_TP: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_SP: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_LTHR: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_G: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_W: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_LAZE: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_S: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_FND: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_EMBOSSING: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_WASHING: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_CUT: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_FTP: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_DTP: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_DOWN: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_UNIT: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_PURPOSE: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_FABRIC: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_PROD_TYPE: [BASE_QRY_KCD_CODE!]!
        T_KCD_STYLE_SAMPLE_USAGE: [BASE_QRY_KCD_CODE!]!
    }

    type T_S0200_KCD_STYLE {
        id: Int!
        STYLE_CD: String
        STYLE_NAME: String
        BUYER_CD: String
        MW: String
        EMBRO: String
        TP: String
        SP: String
        LTHR: String
        G: String
        W: String
        S: String
        FND: String
        DL: String
        DOWN: String
        CUT: String
        KIND: String
        BVT_KIND: String
        YY: Int
        SEQ: Int
        BVT_FLAG: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        TPR: String
        EMBOSSING: String
        WASHING: String
        style_kname: String
        ss_direct_rate: String
        ss_extra_rate: String
        ss_retail_rate: String
        ss_web_rate: String
        ss_nsr_rate: String
        ss_webex_rate: String
        minus_limit: Int
        in_exp_date: String
        FTP: String
        DTP: String
        LAZE: String
        STYLE_UNIT: String
        PURPOSE: String
        FABRIC: String
        BUYER_NAME: String
        STATUS_NAME: String
        COLOR_CNT: Int
        PURPOSE_NAME: String
        FABRIC_NAME: String
        imgURL: String
        fileName: String
        fileUrl: String
        objectName: String
    }

    type T_S0200_KCD_STYLE_IMAGE {
        IMAGE_NAME: String
    }

    type Query {
        mgrQuery_S0200_KCD_STYLE(
            STYLE_NAME: String!
            BUYER_NAME: String!
            KIND: String!
        ): [T_S0200_KCD_STYLE!]!
        mgrQuery_S0200_KCD_STYLE_CODE(KIND1: String!): T_S0200_CODE!
        mgrQuery_S0200_KSV_PROD_MST(STYLE_CD: String!): [T_S0200_KSV_PROD_MST!]!
        mgrQuery_S0200_KCD_STYLE_CHILD(STYLE_CD: String!): [T_S0200_KCD_STYLE!]!
        mgrQuery_S0200_KCD_STYLE_IMAGE(
            STYLE_CD: String!
        ): [T_S0200_KCD_STYLE_IMAGE!]!
    }

    input I_S0200_KCD_STYLE {
        id: Int!
        STYLE_CD: String
        STYLE_NAME: String
        BUYER_CD: String
        MW: String
        EMBRO: String
        TP: String
        SP: String
        LTHR: String
        G: String
        W: String
        S: String
        FND: String
        DL: String
        DOWN: String
        CUT: String
        KIND: String
        BVT_KIND: String
        YY: Int
        SEQ: Int
        BVT_FLAG: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        TPR: String
        EMBOSSING: String
        WASHING: String
        style_kname: String
        ss_direct_rate: String
        ss_extra_rate: String
        ss_retail_rate: String
        ss_web_rate: String
        ss_nsr_rate: String
        ss_webex_rate: String
        minus_limit: Int
        in_exp_date: String
        FTP: String
        DTP: String
        LAZE: String
        STYLE_UNIT: String
        PURPOSE: String
        FABRIC: String
        BUYER_NAME: String
        STATUS_NAME: String
        PURPOSE_NAME: String
        FABRIC_NAME: String
        COLOR_CNT: Int
        imgURL: String
        fileName: String
        fileUrl: String
        objectName: String
    }

    input I_S0200_KCD_STYLE_IN {
        data: I_S0200_KCD_STYLE!
    }

    input I_S0200_KSV_PROD_MST {
        id: Int!
        PROD_CD: String
        STYLE_CD: String
        PROD_TYPE: String
        PROD_TYPE_N: String
        COLOR: String
        PROD_UNIT: String
        COLLECTION: String
        YY: Int
        SEQ: Int
        SIZE_LOSS: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
    }

    type T_S0200_KSV_PROD_MST {
        id: Int!
        PROD_CD: String
        STYLE_CD: String
        PROD_TYPE: String
        PROD_TYPE_N: String
        COLOR: String
        PROD_UNIT: String
        COLLECTION: String
        YY: Int
        SEQ: Int
        SIZE_LOSS: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
    }

    type Ret_S0200 {
        STYLE_CD: String
    }

    type Mutation {
        mgrInsert_KCD_STYLE_SAVE(datas: I_S0200_KCD_STYLE_IN!): Ret_S0200!
        mgrInsert_KSV_PROD_MST_SAVE(
            datas: [I_S0200_KSV_PROD_MST!]!
            BUYER_CD: String!
            opmode: String!
        ): Ret_S0200!
        mgrDelete_KSV_PROD_MST(datas: [I_S0200_KSV_PROD_MST!]!): Ret_S0200!
        mgrDelete_KCD_STYLE(STYLE_CD: String!): Ret_S0200!
    }
`;

export default moduleTypedefs_S0200_KCD_STYLE;
