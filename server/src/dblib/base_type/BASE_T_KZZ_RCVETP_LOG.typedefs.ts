// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KZZ_RCVETP_LOG = gql`
    type BASE_QRY_KZZ_RCVETP_LOG {
        RCV_DATETIME: String
        RCV_DATA: String
        STATUS_CD: String
        id: Int
    }

    input BASE_INPUT_KZZ_RCVETP_LOG {
        RCV_DATETIME: String
        RCV_DATA: String
        STATUS_CD: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KZZ_RCVETP_LOG;
