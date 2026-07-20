// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030301_COPY_PRODUCT = gql`
    type T_S030301_QRY_STYLE {
        STYLE_CD: String
        STYLE_NAME: String
        BUYER_CD: String
        BUYER_NAME: String
    }

    input I_S030301_QRY_STYLE {
        STYLE_CD: String
    }

    type T_S030301_QRY_PROD {
        STYLE_CD: String
        PROD_CD: String
        COLOR: String
    }

    input I_S030301_QRY_PROD {
        STYLE_CD: String
    }

    type Query {
        mgrQuery_S030301_QRY_STYLE(
            data: I_S030301_QRY_STYLE!
        ): [T_S030301_QRY_STYLE!]!
        mgrQuery_S030301_QRY_PROD(
            data: I_S030301_QRY_PROD!
        ): [T_S030301_QRY_PROD!]!
    }

    type Ret_S030301 {
        CODE: String
        id: Int
    }

    input I_S030301_ADD_PROD1 {
        STYLE_CD: String
        BUYER_CD: String
    }

    input I_S030301_ADD_PROD2 {
        STYLE_CD: String
        BUYER_CD: String
        PROD_CD: String
    }

    type Mutation {
        mgrInsert_S030301_ADD_PROD(
            datas: I_S030301_ADD_PROD1!
            datas1: [I_S030301_ADD_PROD2!]!
        ): [Ret_S030301!]!
        mgrInsert_S030301_DEL_PROD(
            datas: I_S030301_ADD_PROD1!
            datas1: [I_S030301_ADD_PROD2!]!
        ): [Ret_S030301!]!
    }
`;

export default moduleTypedefs_S030301_COPY_PRODUCT;
