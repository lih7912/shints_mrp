// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_PO_VENDOR = gql`
    type BASE_QRY_KSV_PO_VENDOR {
        PO_CD: String
        VENDOR_CD: String
        END_DATE: String
        CHECK_DATE: String
        id: Int
    }

    input BASE_INPUT_KSV_PO_VENDOR {
        PO_CD: String
        VENDOR_CD: String
        END_DATE: String
        CHECK_DATE: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_PO_VENDOR;
