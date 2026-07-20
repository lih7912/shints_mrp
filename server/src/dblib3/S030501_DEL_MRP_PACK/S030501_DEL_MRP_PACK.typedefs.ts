// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S030501_DEL_MRP_PACK = gql`
    type T_S030501_DEL_MRP_PACK_TBL_KSV_PO_MST {
        id: Int
        PO_CD: String
        PO_SEQ: String
        PO_TYPE_NAME: String
        PO_TYPE: String
        PO_STATUS_NAME: String
        PO_STATUS: String
        REMARK: String
    }
    input I_S030501_DEL_MRP_PACK_QRY_KSV_PO_MST {
        PO_CD: String
    }

    type Query {
        mgrQuery_S030501_DEL_MRP_PACK_TBL_KSV_PO_MST(
            data: I_S030501_DEL_MRP_PACK_QRY_KSV_PO_MST!
        ): [T_S030501_DEL_MRP_PACK_TBL_KSV_PO_MST!]!
    }

    input I_S030501_DEL_MRP_PACK_TBL_KSV_PO_MST {
        id: Int
        PO_CD: String
        PO_SEQ: String
        PO_TYPE_NAME: String
        PO_TYPE: String
        PO_STATUS_NAME: String
        PO_STATUS: String
        REMARK: String
        USER_ID: String
    }

    type Ret_S030501_DEL_MRP_PACK_TBL_KSV_PO_MST {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrDelete_S030501_DEL_MRP_PACK_TBL_KSV_PO_MST(
            datas: I_S030501_DEL_MRP_PACK_TBL_KSV_PO_MST!
        ): [Ret_S030501_DEL_MRP_PACK_TBL_KSV_PO_MST!]!
    }
`;

export default moduleTypedefs_S030501_DEL_MRP_PACK;
