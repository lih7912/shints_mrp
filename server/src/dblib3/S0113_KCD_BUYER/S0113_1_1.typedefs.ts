// MGR_S0113_1_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_S0113_1_1 = gql`
    type T_S0113_CODE {
        T_KCD_BUYER_STATUS_CD: [BASE_QRY_KCD_CODE!]!
        T_KCD_BUYER_LOSS_FLAG: [BASE_QRY_KCD_CODE!]!
        T_KCD_BUYER_BUYER_TYPE: [BASE_QRY_KCD_CODE!]!
        T_KCD_BUYER_BUYER_TEAM: [BASE_QRY_KCD_CODE!]!
        T_KCD_BUYER_BUYER_TEAM_NEOE: [BASE_QRY_KCD_CODE!]!
        T_KCD_BUYER_NAT_CD: [BASE_QRY_KCD_NATION!]!
        T_KCD_BUYER_BANK_CD: [BASE_QRY_KCD_BANK!]!
        T_KCD_BUYER_PAY_RULE: [BASE_QRY_KCD_CODE!]!
        T_KCD_BUYER_CREDIT: [BASE_QRY_KCD_CODE!]!
        T_KCD_BUYER_CREDIT_CURR: [BASE_QRY_KCD_CODE!]!
        T_KCD_BUYER_TOLERANCE: [BASE_QRY_KCD_CODE!]!
    }

    type T_S0113_KCD_BUYER {
        id: Int!
        BUYER_CD: String
        BUYER_NAME: String
        BUYER_ABBR: String
        SHINTS_USER: String
        USER_NAME: String
        EMAIL: String
        TEL_NO: String
        FAX_NO: String
        ZIP_NO: String
        SHIP_ADDR1: String
        SHIP_ADDR2: String
        SHIP_ADDR3: String
        ADDR1: String
        ADDR2: String
        COMM_FLAG: String
        SALES_TEAM: String
        NAT_CD: String
        BANK_CD: String
        STS_FLAG: String
        BVT_FLAG: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        NEOE_BUYER_CD_MOM: String
        NEOE_BUYER_CD: String
        NEOE_A23: String
        loss_flag: String
        glove_flag: String
        MOM_CD: String
        BUYER_TYPE: String
        PAY_RULE: String
        STATUS_NAME: String
        BUYER_TYPE_NAME: String
        BUYER_TEAM_NAME: String
        BUYER_TEAM_NEOE_NAME: String
        NAT_NAME: String
        PAY_RULE_NAME: String
        BANK_NAME: String
        ACCOUNT_NAME: String
        ACCOUNT_NO: String
        COMPANY_NAME: String
        CREDIT_CURR: String
        CREDIT_AMT: String
        TOLERANCE: String
        CREDIT_DATE: String
        REPRESENTATIVE: String
        BUYER_TEAM: String
    }

    type T_S0113_BUYER_TEAMINFO {
        BUYER_CD: String
        FACTORY: String
        TEAM: String
        USER_ID: String
        USER_NAME: String
    }

    type T_S0113_BUYER_FILE {
        id: Int!
        KIND: String
        FILE_KEY: String
        TITLE: String
        NAME: String
        URL: String
        OBJECT_NAME: String
        UPD_DATETIME: String
    }

    input I_S0113_1 {
        BUYER_CD: String
        BUYER_NAME: String
        COMPANY_NAME: String
        STATUS_CD: String
    }

    type Query {
        mgrQuery_S0113_BUYER(data: I_S0113_1!): [T_S0113_KCD_BUYER!]!
        mgrQuery_S0113_CODE(KIND1: String!): T_S0113_CODE!
        mgrQuery_S0113_BUYER_USER(BUYER_TEAM: String!): [BASE_QRY_KCD_USER!]!
        mgrQuery_S0113_BUYER_CREDIT_RATING(
            BUYER_CD: String!
        ): [BASE_QRY_KCD_BUYER_CREDIT_RATING!]!
        mgrQuery_S0113_BUYER_TEAMINFO(
            BUYER_CD: String!
        ): [T_S0113_BUYER_TEAMINFO!]!
        mgrQuery_S0113_BUYER_FILEINFO(BUYER_CD: String!): [T_S0113_BUYER_FILE]!
        mgrQuery_S0113_BUYER_FILE(BUYER_CD: String!): T_S0113_BUYER_FILE!
        mgrQuery_S0113_BUYER_BANK(BANK_CD: String!): [BASE_QRY_KCD_BANK!]!
    }

    input I_S0113_BUYER_SAVE {
        id: Int!
        BUYER_CD: String
        BUYER_NAME: String
        BUYER_ABBR: String
        BUYER_TEAM: String
        SHINTS_USER: String
        USER_NAME: String
        EMAIL: String
        TEL_NO: String
        FAX_NO: String
        ZIP_NO: String
        SHIP_ADDR1: String
        SHIP_ADDR2: String
        SHIP_ADDR3: String
        ADDR1: String
        ADDR2: String
        COMM_FLAG: String
        SALES_TEAM: String
        NAT_CD: String
        BANK_CD: String
        STS_FLAG: String
        BVT_FLAG: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        NEOE_BUYER_CD_MOM: String
        NEOE_BUYER_CD: String
        NEOE_A23: String
        loss_flag: String
        glove_flag: String
        MOM_CD: String
        BUYER_TYPE: String
        PAY_RULE: String
        STATUS_NAME: String
        BUYER_TYPE_NAME: String
        BUYER_TEAM_NAME: String
        BUYER_TEAM_NEOE_NAME: String
        NAT_NAME: String
        PAY_RULE_NAME: String
        BANK_NAME: String
        ACCOUNT_NAME: String
        ACCOUNT_NO: String
        NEOE_TYPE: String
        ETC99: String
        COMPANY_NAME: String
        CREDIT_CURR: String!
        CREDIT_AMT: String!
        TOLERANCE: String
        CREDIT_DATE: String
        REPRESENTATIVE: String
    }

    input I_S0113_BUYER_CREDIT_RATING_SAVE {
        id: Int!
        BUYER_CD: String!
        CREDIT_RATING: String!
        CREDIT_EXPIRE: String!
        REG_DATETIME: String!
        REG_USER: String!
    }

    input I_S0113_BUYER_TEAM_INFO_SAVE {
        BUYER_CD: String
        FACTORY: String
        TEAM: String
        USER_ID: String
        USER_NAME: String
    }

    input I_S0113_BUYER_FILE_INFO_SAVE {
        BUYER_CD: String!
        fileName: String!
        imgURL: String!
        objectName: String!
        title: String!
    }

    type I_S0113_RET {
        id: Int
        CODE: String
    }

    type Mutation {
        mgrInsert_S0113_BUYER_SAVE(datas: I_S0113_BUYER_SAVE!): [I_S0113_RET!]!
        mgrInsert_S0113_BUYER_CREDIT_RATING_SAVE(
            datas: I_S0113_BUYER_SAVE!
        ): [I_S0113_RET!]!
        mgrInsert_S0113_BUYER_TEAM_INFO_SAVE(
            datas: [I_S0113_BUYER_TEAM_INFO_SAVE!]!
            datas1: String!
        ): [I_S0113_RET!]!
        mgrInsert_S0113_BUYER_FILE_INFO_SAVE(
            datas: I_S0113_BUYER_FILE_INFO_SAVE!
        ): [I_S0113_RET!]!
        mgrInsert_S0113_BUYER_DELETE(
            datas: I_S0113_BUYER_SAVE!
        ): [I_S0113_RET!]!
    }
`;

export default moduleTypedefsS0BVT_S0113_1_1;
