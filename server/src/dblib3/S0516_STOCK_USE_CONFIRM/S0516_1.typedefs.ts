// MGR_S0516_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0516_1 = gql`
    input I_S0516_1 {
        PO_CD: String
    }

    type T_S0516_PO_SEQ {
        PO_SEQ: String
    }

    type T_S0516_CODE {
        PO_SEQ: [T_S0516_PO_SEQ!]!
        FACTORY_WARE: [BASE_QRY_KCD_FACTORY_WARE!]!
        PO_CD: [BASE_QRY_KSV_PO_MST!]!
        VENDOR_CD: [BASE_QRY_KCD_VENDOR!]!
        CONDITION: [BASE_QRY_KCD_CODE!]!
    }

    type Query {
        mgrQueryS0516_CODE(data: I_S0516_1!): T_S0516_CODE!
        mgrQueryS0516_CODE_PO_SEQ(data: I_S0516_1!): T_S0516_CODE!
    }
`;

export default moduleTypedefs_S0516_1;
