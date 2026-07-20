// MGR_S041201_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S041201_1 = gql`
    type T_S041201_1 {
        PO_CD: String
        ORDER_CD: String
        VENDOR_NAME: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        SHIP_DATE: String
        ETA: String
        PACK_CD: String
        HIS_NO: String
        OUT_QTY: Float
        OUT_FROM: String
        CT_QTY: Int
        CT_NO: String
        REMARK: String
        DELIVERY: String
        IN_TYPE_NAME: String
        MATL_CD: String
        OUT_TYPE_NAME: String
        DEBIT_CD: String
        IN_TYPE: String
        OUT_STATUS: String
        PO_SEQ: Int
        MRP_SEQ: Int
        IN_DATETIME: String
        OUT_DATETIME: String
        VENDOR_CD: String
        VENDOR_TYPE: String
        REG_DATETIME: String
        PACK_CONFIRM: String
        STOCK_IDX: String
    }

    input I_S041201_1 {
        MATL_CD: String
        UNIT: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        VENDOR_NAME: String
    }

    type T_S041201_CODE {
        HS_CODE: [BASE_QRY_KCD_HSCODE!]!
        HS_COMP: [BASE_QRY_KCD_MATL_MST!]!
    }

    type T_S041201_DATA {
        DATA1: [T_S041201_1!]!
        DATA2: [T_S041201_1!]!
    }

    type Query {
        mgrQueryS041201_1(data: I_S041201_1!): T_S041201_DATA!
        mgrQueryS041201_CODE(data: I_S041201_1!): T_S041201_CODE!
    }
`;

export default moduleTypedefs_S041201_1;
