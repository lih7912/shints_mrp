// MGR_S030514_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030514_3 = gql`
    type T_S030514_3_RET {
        id: Int
        CODE: String
    }

    input I_S030514_3 {
        PO_CD: String
    }

    type Mutation {
        mgrUpdate_S030514_3_MATL_LIST_INSERT(
            data: I_S030514_3!
        ): [T_S030514_3_RET!]!
    }
`;

export default moduleTypedefs_S030514_3;
