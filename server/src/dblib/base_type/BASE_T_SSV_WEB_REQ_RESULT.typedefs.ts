// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_SSV_WEB_REQ_RESULT = gql`
    type BASE_QRY_SSV_WEB_REQ_RESULT {
        web_req_no: String
        return_cd: String
        remark: String
        id: Int
    }

    input BASE_INPUT_SSV_WEB_REQ_RESULT {
        web_req_no: String
        return_cd: String
        remark: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_SSV_WEB_REQ_RESULT;
