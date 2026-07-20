// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0708_EXCEL_TT_LIST = gql`
    type T_S0708_EXCEL_TT_LIST {
        id: String
        CODE: String
    }

    input I_S0708_EXCEL_TT_LIST {
        REF_NO: String
    }

    type Query {
        mgrQueryS0708_EXCEL_TT_LIST(
            data: [I_S0708_EXCEL_TT_LIST!]!
        ): [T_S0708_EXCEL_TT_LIST!]!
    }
`;

export default moduleTypedefs_S0708_EXCEL_TT_LIST;
