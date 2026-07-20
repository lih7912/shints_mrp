// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KVW_COMPANY = gql`
    type BASE_QRY_KVW_COMPANY {
        COM_CD: String
        COM_NAME: String
        Expr1: String
        COM_ADDR1: String
        COM_ADDR2: String
        COM_TEL: String
        COM_FAX: String
    }

    input BASE_INPUT_KVW_COMPANY {
        COM_CD: String
        COM_NAME: String
        Expr1: String
        COM_ADDR1: String
        COM_ADDR2: String
        COM_TEL: String
        COM_FAX: String
    }
`;

export default moduleTypedefs_BASE_KVW_COMPANY;
