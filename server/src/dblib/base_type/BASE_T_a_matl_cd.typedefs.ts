// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_a_matl_cd = gql`
    type BASE_QRY_a_matl_cd {
        matl_cd: String
        price: Float
        curr_cd: String
        matl_name: String
        spec: String
        color: String
        id: Int
    }

    input BASE_INPUT_a_matl_cd {
        matl_cd: String
        price: Float
        curr_cd: String
        matl_name: String
        spec: String
        color: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_a_matl_cd;
