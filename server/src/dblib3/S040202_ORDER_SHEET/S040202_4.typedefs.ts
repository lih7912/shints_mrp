// MGR_S0402_2.typeDefs.js

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
const moduleTypedefs_S040202_4 = gql`
    input I_S040202_4 {
        PO_CD: String
        PO_SEQ: String
        ETD: String
        BUYER_CD: String
        PLACE_NAME: String
        FACTORY_NAME: String
        FACTORY_CD: String
        IS_SHIP_PLAN: String
        TARGET_ETD: String
        TARGET_ETA: String
        USER_ID1: String
        USER_ID2: String
    }

    type Ret_S040202_4 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrPoPlan_S040202_4(datas: [I_S040202_4!]!): [Ret_S040202_4!]!
    }
`;

export default moduleTypedefs_S040202_4;
