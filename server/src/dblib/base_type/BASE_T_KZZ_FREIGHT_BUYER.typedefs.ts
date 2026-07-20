// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KZZ_FREIGHT_BUYER = gql`
    type BASE_QRY_KZZ_FREIGHT_BUYER {
        BUYER_CD: String
        DEPARTURE: String
        SENDER: String
        DESTINATION: String
        RECEIVER: String
        DELAY_REASON: String
        CHARGE_KIND: String
        CHARGE_CODE: String
        REG_USER: String
        id: Int
    }

    input BASE_INPUT_KZZ_FREIGHT_BUYER {
        BUYER_CD: String
        DEPARTURE: String
        SENDER: String
        DESTINATION: String
        RECEIVER: String
        DELAY_REASON: String
        CHARGE_KIND: String
        CHARGE_CODE: String
        REG_USER: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KZZ_FREIGHT_BUYER;
