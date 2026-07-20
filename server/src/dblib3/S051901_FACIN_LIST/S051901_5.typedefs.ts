// MGR_S051901_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S051901_5 = gql`
    input I_S051901_5 {
        ATA: String
        BUYER_CD: String
        VENDOR_NAME: String
        USER_ID: String
        DELIVERY_TYPE: String
        DELIVERY_TYPE_N: String
        BL_NO: String
        CUSTOMS_NO: String
        ORIGIN_PORT: String
        PO_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        S_OUT_QTY: String
        SHORTAGE_QTY: String
        DEFECT_QTY: String
        FACIN_QTY: String
        LOCATION: String
        DELIVERY: String
        MOQ: Float
        WEIGHT: String
        CBM: String
        CT_NO: String
        MC_ID: String
        PU_CD: String
        STATUS_CD: String
        STATUS_CD_N: String
        FACTORY_CD: String
        FACTORY_CD_N: String
        SHIPMENT_CD: String
        CLEARANCE_NO: String
        SHIP_MODE: String
        SHIP_MODE_N: String
        STSOUT_CD: String
        VENDOR_CD: String
        FILE_NAME: String
        FILE_URL: String
        FACIN_DATE: String
        INSPECT_DATE: String
        FACIN_CD: String
        PACK_CD: String
        MOQ_QTY: String
        DELIVERY_ORG:String
    }

    type Ret_S051901_5 {
        CODE: String
        id: Int
    }

    type Ret_S051901_5_Export {
        CODE: String
        URL: String
    }

    input I_S051901_5_FILEOBJ {
        FILE_KEY: String
        TITLE: String
        NAME: String
        URL: String
        OBJECT_NAME: String
        STSOUT_CD: String
    }

    input I_S051901_5_LOCATION {
        PO_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        S_OUT_QTY: String
        SHORTAGE_QTY: String
        DEFECT_QTY: String
        FACIN_QTY: String
        LOCATION: String
        STSOUT_CD: String
        FILE_NAME: String
        FILE_URL: String
        FILE_OBJECT: String
        IN_DATE: String
        FACIN_DATE: String
        INSPECT_DATE: String
        PACK_CD: String
    }

    input I_S051901_MoveStockExport {
        ATA: String
        BUYER_CD: String
        VENDOR_NAME: String
        PO_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        STATUS_CD: String
        STATUS_CD_N: String
        FACIN_QTY: Float
        MOQ: Float
        DELIVERY: String
        LOCATION: String
        FACTORY_CD: String
        DELIVERY_ORG: String
    }

    type Ret_S051901_MoveStockExport {
        id: Int
        CODE: String
    }

    type Mutation {
        mgrInsert_S051901_5_CANCEL(datas: [I_S051901_5!]!): [Ret_S051901_5!]!
        mgrUpdate_S051901_5_LOCATION(datas: [I_S051901_5!]!): [Ret_S051901_5!]!
        mgrInsert_S051901_5_UPDATE_LOCATION(
            datas: [I_S051901_5_LOCATION!]!
            datas1: I_S051901_5_FILEOBJ!
        ): [Ret_S051901_5!]!
        mgrExport_S051901_KeepNewPO(datas: [I_S051901_5!]!): Ret_S051901_5_Export!
    }

    type Query {
        mgrExport_S051901_MoveStock(
            datas: [I_S051901_MoveStockExport!]!
        ): [Ret_S051901_MoveStockExport!]!
    }
`;

export default moduleTypedefs_S051901_5;
