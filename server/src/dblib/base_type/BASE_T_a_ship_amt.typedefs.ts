// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_a_ship_amt = gql`
    type BASE_QRY_a_ship_amt {
        buyer_cd: String
        buyer_name: String
        cd_name: String
        amount: Float
        id: Int
    }

    input BASE_INPUT_a_ship_amt {
        buyer_cd: String
        buyer_name: String
        cd_name: String
        amount: Float
        id: Int
    }
`;

export default moduleTypedefs_BASE_a_ship_amt;
