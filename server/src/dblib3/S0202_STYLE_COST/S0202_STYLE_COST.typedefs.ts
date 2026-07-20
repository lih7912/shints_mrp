// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0202_STYLE_COST = gql`
    input I_S0202_REPORT_1 {
        STYLE_CD: String
        STYLE_NAME: String
        QTY: String
        IS_PRICE: String
        USE_SIZE: String
        SIZE_GROUP: String
    }

    input I_S0202_REPORT_1_1 {
        PROD_CD: String
        COLOR: String
    }

    input I_S0202_STYLE_COST_EDT_STYLE_COST {
        QTY: String
        BUYER_MATL_PRICE: String
        PRICE: String
        USE_SIZE: String
        SIZE: String
    }

    type Ret_S0202_STYLE_COST_EDT_STYLE_COST {
        id: Int!
        CODE: String!
    }

    input I_S0202_STYLE_COST_QRY_KCD_STYLE {
        STYLE_CD: String
        STYLE_NAME: String
        BUYER_CD: String
    }

    input I_S0202_STYLE_COST_QRY_KSV_PROD_MST {
        STYLE_CD: String
    }

    type T_S0202_STYLE_COST_TBL_KCD_STYLE {
        STYLE_NAME: String
        STYLE_CD: String
        BUYER_CD: String
    }

    type T_S0202_STYLE_COST_TBL_KSV_PROD_MST {
        PROD_TYPE_NAME: String
        COLOR: String
        COLLECTION: String
        PROD_UNIT: String
        PROD_CD: String
        PROD_TYPE: String
    }

    type T_S0202_STYLE_COST_CODE_USESIZE {
        USE_SIZE: String
        USE_SIZE_NAME: String
    }

    type T_S0202_STYLE_COST_CODE {
        SIZE_MST: [BASE_QRY_KCD_SIZE_MST!]!
        USE_SIZE: [T_S0202_STYLE_COST_CODE_USESIZE!]!
        BUYER_CD: [BASE_QRY_KCD_BUYER!]!
    }

    type T_S0202_STYLE_CODE {
        STYLE_CD: [BASE_QRY_KCD_STYLE!]!
    }

    input I_S0202_SIZE_GROUP_BY_BUYER {
        BUYER_CD: String
    }

    type T_S0202_SIZE_GROUP_BY_BUYER {
        SIZE_GROUP: String
        SIZE_MEMBER: String
    }

    type Query {
        mgrQuery_S0202_SIZE_GROUP_BY_BUYER(
            data: I_S0202_SIZE_GROUP_BY_BUYER!
        ): [T_S0202_SIZE_GROUP_BY_BUYER!]!
        mgrQuery_S0202_STYLE_COST_TBL_KCD_STYLE(
            data: I_S0202_STYLE_COST_QRY_KCD_STYLE!
        ): [T_S0202_STYLE_COST_TBL_KCD_STYLE!]!

        mgrQuery_S0202_STYLE_COST_TBL_KSV_PROD_MST(
            data: I_S0202_STYLE_COST_QRY_KSV_PROD_MST!
        ): [T_S0202_STYLE_COST_TBL_KSV_PROD_MST!]!
        mgrQuery_S0202_STYLE_COST_CODE(
            data: I_S0202_STYLE_COST_QRY_KCD_STYLE!
        ): T_S0202_STYLE_COST_CODE
        mgrQuery_S0202_STYLE_CODE(
            data: I_S0202_STYLE_COST_QRY_KCD_STYLE!
        ): T_S0202_STYLE_CODE
        mgrQuery_S0202_REPORT_1(
            data1: I_S0202_REPORT_1!
            data2: [I_S0202_REPORT_1_1!]!
        ): [Ret_S0202_STYLE_COST_EDT_STYLE_COST!]!
        mgrQuery_S0202_REPORT_2(
            data1: I_S0202_REPORT_1!
            data2: [I_S0202_REPORT_1_1!]!
        ): [Ret_S0202_STYLE_COST_EDT_STYLE_COST!]!
        mgrQuery_S0202_REPORT_3(
            data1: I_S0202_REPORT_1!
            data2: [I_S0202_REPORT_1_1!]!
        ): [Ret_S0202_STYLE_COST_EDT_STYLE_COST!]!
    }

    type Mutation {
        mgrInsert_S0202_STYLE_COST_EDT_STYLE_COST(
            datas: [I_S0202_STYLE_COST_EDT_STYLE_COST!]!
        ): [Ret_S0202_STYLE_COST_EDT_STYLE_COST!]!
        mgrUpdate_S0202_STYLE_COST_EDT_STYLE_COST(
            datas: [I_S0202_STYLE_COST_EDT_STYLE_COST!]!
        ): [Ret_S0202_STYLE_COST_EDT_STYLE_COST!]!
        mgrDelete_S0202_STYLE_COST_EDT_STYLE_COST(
            datas: [I_S0202_STYLE_COST_EDT_STYLE_COST!]!
        ): [Ret_S0202_STYLE_COST_EDT_STYLE_COST!]!
    }
`;

export default moduleTypedefs_S0202_STYLE_COST;
