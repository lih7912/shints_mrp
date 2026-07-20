// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_MATL_UPDATE_REMARK = gql`
    type BASE_QRY_KCD_MATL_UPDATE_REMARK {
        MATL_CD: String
        UPDATE_REMARK: String
        UPD_USER: String
        UPD_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KCD_MATL_UPDATE_REMARK {
        MATL_CD: String
        UPDATE_REMARK: String
        UPD_USER: String
        UPD_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_MATL_UPDATE_REMARK;
