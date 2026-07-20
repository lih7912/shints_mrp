// MGR_S040201_2.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
/* PO_STATUS
0                    Registered          
2                    Cons.Checked        
3                    Check Stock         
4                    PO Fixed            
5                    Ended               

*/
const moduleTypedefs_S040201_3 = gql`
    input I_S040201_3 {
        PO_CD: String
        FACTORY_CD: String
        USER_ID: String
    }

    type Ret_S040201_3 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrPoFix_S040201_3(datas: [I_S040201_3!]!): [Ret_S040201_3!]!
    }
`;

export default moduleTypedefs_S040201_3;
