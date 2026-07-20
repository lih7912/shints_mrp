// MGR_S030510_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030510_1 = gql`
    type T_S030510_1_0 {
        CHECK: String
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

    type T_S030510_1 {
        PO_MRP: [T_S030510_1_0!]!
        MAX_SEQ: String
        NEW_SEQ: String
    }

    type WorkStatusResult {
        work_status: String
        po_cd: String
    }

    input I_S030510_1 {
        USER_ID: String
        PO_CD: String
        PO_SEQ: String
        MATL_NAME: String
        VENDOR_CD: String
    }

    type Query {
        mgrQueryS030510_1(data: I_S030510_1!): T_S030510_1!
        mgrQuery_MRP_WORK_STATUS(PO_CD: String!): [WorkStatusResult!]!
    }
`;

export default moduleTypedefs_S030510_1;
