// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_MATL_MST = gql`
    type BASE_QRY_KCD_MATL_MST {
        MATL_CD: String
        MATL_NAME: String
        VENDOR_CD: String
        MATL_TYPE: String
        SEQ: Int
        COLOR: String
        SPEC: String
        UNIT: String
        HS_CD: String
        WEIGHT: Float
        BOX_UNIT: String
        COUNTRY: String
        ADD_RATE: Float
        ADD_AMT: Float
        PERMIT_COMPO1: String
        PERMIT_COMPO2: String
        PERMIT_COMPO3: String
        PERMIT_DETAIL: String
        COUNT_FLAG: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        BVT_MATL_NAME: String
        MATL_TYPE2: String
        WIDTH: String
        old_vendor_cd: String
        rep_matl_cd: String
        add_loss: Float
        id: Int
    }

    input BASE_INPUT_KCD_MATL_MST {
        MATL_CD: String
        MATL_NAME: String
        VENDOR_CD: String
        MATL_TYPE: String
        SEQ: Int
        COLOR: String
        SPEC: String
        UNIT: String
        HS_CD: String
        WEIGHT: Float
        BOX_UNIT: String
        COUNTRY: String
        ADD_RATE: Float
        ADD_AMT: Float
        PERMIT_COMPO1: String
        PERMIT_COMPO2: String
        PERMIT_COMPO3: String
        PERMIT_DETAIL: String
        COUNT_FLAG: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        BVT_MATL_NAME: String
        MATL_TYPE2: String
        WIDTH: String
        old_vendor_cd: String
        rep_matl_cd: String
        add_loss: Float
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_MATL_MST;
