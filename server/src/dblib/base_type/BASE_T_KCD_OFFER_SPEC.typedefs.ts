// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_OFFER_SPEC = gql`
    type BASE_QRY_KCD_OFFER_SPEC {
        VENDOR_CD: String
        MATL_NAME: String
        SPEC: String
        OFFER_SPEC: String
        id: Int
    }

    input BASE_INPUT_KCD_OFFER_SPEC {
        VENDOR_CD: String
        MATL_NAME: String
        SPEC: String
        OFFER_SPEC: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_OFFER_SPEC;
