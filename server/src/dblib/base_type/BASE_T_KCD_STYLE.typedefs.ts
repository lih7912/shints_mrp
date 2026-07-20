// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_STYLE = gql`
    type BASE_QRY_KCD_STYLE {
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
        TPR: Int
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
        id: Int
    }

    input BASE_INPUT_KCD_STYLE {
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
        TPR: Int
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
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_STYLE;
