// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_INVENTORY_FACTORY = gql`
    type BASE_QRY_KSV_INVENTORY_FACTORY {
        SEQ: Int
        ORDER_CD: String
        FINISH_QTY: Int
        INVENTORY_DATE: String
        id: Int
    }

    input BASE_INPUT_KSV_INVENTORY_FACTORY {
        SEQ: Int
        ORDER_CD: String
        FINISH_QTY: Int
        INVENTORY_DATE: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_INVENTORY_FACTORY;
