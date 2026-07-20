import { gql } from 'apollo-server-express';

const typeDefs = gql`
    # 공통 조회용 Input
    input I_S0914_FAC_IN_OUT_MANAGER {
        BUYER_CD: String
        PO_CD: String
        ORDER_CD: String
        MATL_CD: String
        VENDOR_NAME: String

        UNIT: String
        SHORTOVER: String
        FACINQTY: String

        SUPPLIER: String
        DESCRIPTION: String
        COLOR: String
        SPEC: String
    }

    # 상단 메인 그리드 행 타입
    type T_S0914_TOP_ROW_SUB {
        ORDER_CD: String
        ORDER_QTY: String
        MAIN_USE: String
    }

    type T_S0914_TOP_ROW {
        id: Int

        VENDOR_NAME: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String

        MRPQTY: Float
        STSIN: Float
        STSOUT: Float
        ERROR: Float
        SHIPQTY: Float
        STOCK: Float
        FACIN: Float
        SHORTOVER: Float
        DEFECT: Float
        DEFECT_A: Float
        MAINUSE: Float
        OTHER: Float
        TABLE_SHORT: Float
        KEEP_STOCK: Float
        LOST: Float
        LINE_RETURN: Float
        FACOUT: Float
        REMAIN_E: Float
        REMAIN_A: Float
        DELAYREMARK: String
        PRICE: Float
        MOQ: Float

        MRP1: Float
        USE1: Float
        MRP2: Float
        USE2: Float
        MRP3: Float
        USE3: Float

        DATAS: [T_S0914_TOP_ROW_SUB!]!
    }

    # 하단 좌측 그리드 행 타입
    type T_S0914_BOTTOM_LEFT_ROW {
        id: Int

        SHIPMENTCD: String
        PACKCD: String
        ATA: String
        DELIVERY: String
        BLNO: String
        CTNO: String
        UNIT: String
        SHIPQTY: String
        SHORTOVER: String
        DEFECT: String
        FACINQTY: String
        LOCATION: String
        MC: String
        STSOUT_DATE: String
    }

    # 하단 우측 그리드 행 타입
    type T_S0914_BOTTOM_RIGHT_ROW {
        id: Int

        OUTDATE: String
        UNIT: String
        OUTQTY: Float
        PURPOSE: String
        REMARK: String
        ORDER_CD: String
    }

    # 하단 우측 MOQ 그리드 행 타입
    type T_S0914_BOTTOM_MOQ_ROW {
        id: Int

        USE_PO_CD: String
        USE_ORDER_CD: String
        USE_QTY: Float
        USE_DATETIME: String
    }

    # 상단 STOCK 더블클릭 다이얼로그 행 타입
    type T_S0914_STOCK_USE_ROW {
        id: Int

        WARE_NAME: String
        PO_CD: String
        PO_SEQ: String
        USE_ORDER_CD: String
        ORDER_CD: String
        EMPTY_COL: String
        MATL_CD: String
        VENDOR_NAME: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        RACK: String
        LOCATION: String
        USE_QTY: Float
        STOCK_QTY: Float
        STOCK_IDX: String
    }

    # 코드용 타입
    type T_S0914_BUYER {
        id: Int
        BUYER_CD: String
        BUYER_NAME: String
    }

    type T_S0914_PO {
        id: Int
        PO_CD: String
    }

    type T_S0914_ORDER {
        id: Int
        ORDER_CD: String
    }

    type T_S0914_BUYER_CD {
        BUYER: [T_S0914_BUYER!]!
    }

    type T_S0914_PO_CD {
        PO_CD: [T_S0914_PO!]!
    }

    type T_S0914_ORDER_CD {
        ORDER_CD: [T_S0914_ORDER!]!
    }

    # Query 정의
    type Query {
        # 코드 조회 (콤보박스용)
        mgrQuery_S0914_getBuyerCd: T_S0914_BUYER_CD
        mgrQuery_S0914_getPoCd(data: I_S0914_FAC_IN_OUT_MANAGER!): T_S0914_PO_CD
        mgrQuery_S0914_getOrderCd(
            data: I_S0914_FAC_IN_OUT_MANAGER!
        ): T_S0914_ORDER_CD

        # 상단 메인 그리드
        mgrQuery_S0914_TopList(
            data: I_S0914_FAC_IN_OUT_MANAGER!
        ): [T_S0914_TOP_ROW!]!

        # 하단 좌측 그리드
        mgrQuery_S0914_BottomLeftList(
            data: I_S0914_FAC_IN_OUT_MANAGER!
        ): [T_S0914_BOTTOM_LEFT_ROW!]!

        # 하단 우측 그리드
        mgrQuery_S0914_BottomRightList(
            data: I_S0914_FAC_IN_OUT_MANAGER!
        ): [T_S0914_BOTTOM_RIGHT_ROW!]!

        # 하단 우측 MOQ 그리드
        mgrQuery_S0914_BottomMOQList(
            data: I_S0914_FAC_IN_OUT_MANAGER!
        ): [T_S0914_BOTTOM_MOQ_ROW!]!

        # 상단 STOCK 더블클릭 다이얼로그
        mgrQuery_S0914_StockUseList(
            data: I_S0914_FAC_IN_OUT_MANAGER!
        ): [T_S0914_STOCK_USE_ROW!]!
    }
`;

export default typeDefs;
