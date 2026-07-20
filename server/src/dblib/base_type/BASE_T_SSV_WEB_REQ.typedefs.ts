// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_SSV_WEB_REQ = gql`
    type BASE_QRY_SSV_WEB_REQ {
        web_req_no: String
        style_cd: String
        prod_cd: String
        size: String
        sale_cnt: Int
        sale_price: Int
        reg_user: String
        reg_datetime: String
        status_cd: String
        proc_datetime: String
        id: Int
    }

    input BASE_INPUT_SSV_WEB_REQ {
        web_req_no: String
        style_cd: String
        prod_cd: String
        size: String
        sale_cnt: Int
        sale_price: Int
        reg_user: String
        reg_datetime: String
        status_cd: String
        proc_datetime: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_SSV_WEB_REQ;
