// MGR_S030510_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030510_3 = gql`
    input I_S030510_MRP_MAKE {
        USER_ID: String
        PO_CD: String
    }

    input I_S030510_MRP_SAVE {
        PO_CD: String
        USER_ID: String
        PO_SEQ: String
        ORDER_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        USE_PO_TYPE: String
        USE_PO_TYPE_NAME: String
        PO_QTY: String
        MATL_PRICE: String
        CURR_CD: String
        VENDOR_NAME: String
        MRP_SEQ: String
        MATL_SEQ: String
        REG_DATETIME: String
    }

    type Ret_S030510_MRP_MAKE {
        CODE: String
        id: String
    }

    type Mutation {
        mgrInsert_S030510_MRP_MAKE(
            datas: [I_S030510_MRP_MAKE!]!
        ): [Ret_S030510_MRP_MAKE!]!
        mgrInsert_S030510_MRP_SAVE(
            datas: [I_S030510_MRP_SAVE!]!
        ): [Ret_S030510_MRP_MAKE!]!
    }
`;

export default moduleTypedefs_S030510_3;
