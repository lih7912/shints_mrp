/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_ORDER_MST1 {
    async mgrTemp() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql``,
                variables: {},
            });
            return data.mgrKsvStockInListReport;
        } catch (e) {
            return e;
        }
    }

    async mgrSsvOrderEndCode() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql``,
                variables: {},
            });
            return data.mgrKsvStockInListReport;
        } catch (e) {
            return e;
        }
    }

    async mgrSsvOrderEndQry3(argOrderCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrSsvOrderEndQry3($orderCd: String!) {
                        mgrSsvOrderEndQry3(ORDER_CD: $orderCd) {
                            END_DATE
                            COLOR
                            SIZE
                            END_CNT
                        }
                    }
                `,
                variables: {
                    orderCd: argOrderCd,
                },
            });
            return data.mgrSsvOrderEndQry3;
        } catch (e) {
            return e;
        }
    }

    async mgrSsvOrderEndQry2(argOrderCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrSsvOrderEndQry2($orderCd: String!) {
                        mgrSsvOrderEndQry2(ORDER_CD: $orderCd) {
                            ORDER_CD
                            PROD_CD
                            COLOR
                            SIZE_VAL
                            SUM_SIZE_CNT
                        }
                    }
                `,
                variables: {
                    orderCd: argOrderCd,
                },
            });
            return data.mgrSsvOrderEndQry2;
        } catch (e) {
            return e;
        }
    }

    async mgrSsvOrderEndQry1(
        argOrderCd,
        argBuyerCd,
        argStyleCd,
        argColor,
        argFactoryCd,
    ) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrSsvOrderEndQry1(
                        $orderCd: String!
                        $buyerCd: String!
                        $styleCd: String!
                        $color: String!
                        $factoryCd: String!
                    ) {
                        mgrSsvOrderEndQry1(
                            ORDER_CD: $orderCd
                            BUYER_CD: $buyerCd
                            STYLE_CD: $styleCd
                            COLOR: $color
                            FACTORY_CD: $factoryCd
                        ) {
                            ORDER_CD
                            BUYER_NAME
                            STYLE_NAME
                            ORDER_DATE
                            DUE_DATE
                            TOT_CNT
                            END_CNT1
                        }
                    }
                `,
                variables: {
                    orderCd: argOrderCd,
                    buyerCd: argBuyerCd,
                    styleCd: argStyleCd,
                    color: argColor,
                    factoryCd: argFactoryCd,
                },
            });
            return data.mgrSsvOrderEndQry1;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockFacOutProcessCode(argPoCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockFacOutProcessCode($poCd: String) {
                        mgrKsvStockFacOutProcessCode(PO_CD: $poCd) {
                            T_KCD_VENDOR {
                                VENDOR_CD
                                VENDOR_NAME
                            }
                            T_KSV_PO_MEM {
                                ORDER_CD
                                PO_CD
                                PO_SEQ
                            }
                            T_KSV_STOCK_OUT {
                                PO_CD
                                PACK_CD
                                PO_SEQ
                                OUT_DATETIME
                            }
                        }
                    }
                `,
                variables: {
                    poCd: argPoCd,
                },
            });
            return data.mgrKsvStockFacOutProcessCode;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockFacOutProcess(
        argPoCd,
        argMatlName,
        argVendorCd,
        argColor,
        argSpec,
        argUnit,
    ) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockFacOutProcess(
                        $poCd: String!
                        $matlName: String!
                        $vendorCd: String!
                        $color: String!
                        $spec: String!
                        $unit: String!
                    ) {
                        mgrKsvStockFacOutProcess(
                            PO_CD: $poCd
                            MATL_NAME: $matlName
                            VENDOR_CD: $vendorCd
                            COLOR: $color
                            SPEC: $spec
                            UNIT: $unit
                        ) {
                            PO_CD
                            VENDOR_NAME
                            PR_NUM
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            TOT_CNT
                            IN_QTY_1
                            OUT_QTY_1
                        }
                    }
                `,
                variables: {
                    poCd: argPoCd,
                    matlName: argMatlName,
                    vendorCd: argVendorCd,
                    color: argColor,
                    spec: argSpec,
                    unit: argUnit,
                },
            });
            return data.mgrKsvStockFacOutProcess;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockFacInStock(
        argPoCd,
        argMatlName,
        argVendorCd,
        argColor,
        argSpec,
        argUnit,
    ) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockFacInStock(
                        $poCd: String!
                        $matlName: String!
                        $vendorCd: String!
                        $color: String!
                        $spec: String!
                        $unit: String!
                    ) {
                        mgrKsvStockFacInStock(
                            PO_CD: $poCd
                            MATL_NAME: $matlName
                            VENDOR_CD: $vendorCd
                            COLOR: $color
                            SPEC: $spec
                            UNIT: $unit
                        ) {
                            OUT_FROM
                            MATL_CD
                            VENDOR_NAME
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            MATL_PRICE
                            CURR_CD
                            OUT_QTY
                            REMARK
                            FACIN_USER
                            FACIN_DATETIME
                        }
                    }
                `,
                variables: {
                    poCd: argPoCd,
                    matlName: argMatlName,
                    vendorCd: argVendorCd,
                    color: argColor,
                    spec: argSpec,
                    unit: argUnit,
                },
            });
            return data.mgrKsvStockFacInStock;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockFacInProcess2(
        argPoCd,
        argPackCd,
        argMatlName,
        argVendorCd,
        argColor,
        argSpec,
        argUnit,
    ) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockFacInProcess2(
                        $poCd: String!
                        $packCd: String!
                        $matlName: String!
                        $vendorCd: String!
                        $color: String!
                        $spec: String!
                        $unit: String!
                    ) {
                        mgrKsvStockFacInProcess2(
                            PO_CD: $poCd
                            PACK_CD: $packCd
                            MATL_NAME: $matlName
                            VENDOR_CD: $vendorCd
                            COLOR: $color
                            SPEC: $spec
                            UNIT: $unit
                        ) {
                            PO_CD
                            MATL_CD
                            VENDOR_NAME
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            SUM_OUT_QTY
                        }
                    }
                `,
                variables: {
                    poCd: argPoCd,
                    packCd: argPackCd,
                    matlName: argMatlName,
                    vendorCd: argVendorCd,
                    color: argColor,
                    spec: argSpec,
                    unit: argUnit,
                },
            });
            return data.mgrKsvStockFacInProcess2;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockFacInProcess1Code() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockFacInProcess1Code($kind1: String) {
                        mgrKsvStockFacInProcess1Code(KIND1: $kind1) {
                            T_KSV_PO_MST {
                                PO_CD
                                PO_SEQ
                                PO_DATE
                            }
                            T_KCD_VENDOR {
                                VENDOR_CD
                                VENDOR_NAME
                            }
                        }
                    }
                `,
                variables: {
                    kind1: "",
                },
            });
            return data.mgrKsvStockFacInProcess1Code;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockFacInProcess1(
        argPoCd,
        argMatlName,
        argVendorCd,
        argColor,
        argSpec,
        argUnit,
    ) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockFacInProcess1(
                        $poCd: String!
                        $matlName: String!
                        $vendorCd: String!
                        $color: String!
                        $spec: String!
                        $unit: String!
                    ) {
                        mgrKsvStockFacInProcess1(
                            PO_CD: $poCd
                            MATL_NAME: $matlName
                            VENDOR_CD: $vendorCd
                            COLOR: $color
                            SPEC: $spec
                            UNIT: $unit
                        ) {
                            VENDOR_NAME
                            PR_NUM
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            CURR_CD
                            MATL_PRICE
                            TOT_CNT
                            ORD_CNT
                            STOCK_QTY
                            REMARK
                            REMARK_BVT
                            REG_USER
                        }
                    }
                `,
                variables: {
                    poCd: argPoCd,
                    matlName: argMatlName,
                    vendorCd: argVendorCd,
                    color: argColor,
                    spec: argSpec,
                    unit: argUnit,
                },
            });
            return data.mgrKsvStockFacInProcess1;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockFacInVCompCode(argKind) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockFacInVCompCode($kind1: String!) {
                        mgrKsvStockFacInVCompCode(KIND1: $kind1) {
                            T_KSV_PO_MST {
                                PO_CD
                                PO_SEQ
                                PO_STATUS
                            }
                        }
                    }
                `,
                variables: {
                    kind1: argKind,
                },
            });
            return data.mgrKsvStockFacInVCompCode;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockFacInVComp() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockFacInVComp($poCd: String!) {
                        mgrKsvStockFacInVComp(PO_CD: $poCd) {
                            MATL_NAME
                            COMP1
                        }
                    }
                `,
                variables: {
                    poCd: "",
                },
            });
            return data.mgrKsvStockFacInVComp;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockFacInMain2(argPoCd, argMatlCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockFacInMainSub(
                        $poCd: String!
                        $matlCd: String!
                    ) {
                        mgrKsvStockFacInMainSub(
                            PO_CD: $poCd
                            MATL_CD: $matlCd
                        ) {
                            T_KSV_STOCK_IN {
                                MATL_CD
                                IN_OUT
                                IN_DATE
                                ORDER_CD
                                QTY
                                DELIVERY
                                TYPE
                                REMARK
                                REG_USER
                                REG_DATETIME
                            }
                            T_KSV_STOCK_OUT {
                                MATL_CD
                                IN_OUT
                                IN_DATE
                                ORDER_CD
                                QTY
                                DELIVERY
                                TYPE
                                REMARK
                                REG_USER
                                REG_DATETIME
                            }
                            T_KSV_STOCK_FACIN {
                                MATL_CD
                                IN_OUT
                                IN_DATE
                                ORDER_CD
                                QTY
                                DELIVERY
                                TYPE
                                REMARK
                                REG_USER
                                REG_DATETIME
                            }
                            T_KSV_STOCK_FACOUT {
                                MATL_CD
                                IN_OUT
                                IN_DATE
                                ORDER_CD
                                QTY
                                DELIVERY
                                TYPE
                                REMARK
                                REG_USER
                                REG_DATETIME
                            }
                        }
                    }
                `,
                variables: {
                    poCd: argPoCd,
                    matlCd: argMatlCd,
                },
            });
            return data.mgrKsvStockFacInMainSub;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockFacInMainCode() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockFacInMainCode($kind1: String) {
                        mgrKsvStockFacInMainCode(KIND1: $kind1) {
                            T_KCD_FACTORY {
                                FACTORY_CD
                                FACTORY_NAME
                            }
                            T_KSV_PO_MST {
                                PO_CD
                                PO_SEQ
                                PO_STATUS
                                PO_TYPE
                            }
                            T_KSV_ORDER_MST {
                                ORDER_CD
                                ORDER_TYPE
                                ORDER_STATUS
                            }
                        }
                    }
                `,
                variables: {},
            });
            return data.mgrKsvStockFacInMainCode;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockFacInMain(
        argPoCd,
        argMatlCd,
        argMatlName,
        argColor,
        argSpec,
        argUnit,
        argVendorCd,
    ) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockFacInMain(
                        $poCd: String!
                        $matlCd: String!
                        $matlName: String!
                        $color: String!
                        $spec: String!
                        $unit: String!
                        $vendorCd: String
                    ) {
                        mgrKsvStockFacInMain(
                            PO_CD: $poCd
                            MATL_CD: $matlCd
                            MATL_NAME: $matlName
                            COLOR: $color
                            SPEC: $spec
                            UNIT: $unit
                            VENDOR_CD: $vendorCd
                        ) {
                            PO_CD
                            VENDOR_NAME
                            PR_NUM
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            MATL_PRICE
                            CURR_CD
                            TOT_CNT
                            ORD_CNT
                            TOT_STS_IN
                            TOT_STS_OUT
                            TOT_STS_STOCK
                            TOT_STOCK
                            TOT_FACIN
                            TOT_FACOUT
                            TOT_ETC_QTY
                            TOT_LEFTOVER
                            TOT_STOCK_MOVE
                            REMARK
                            REMARK_BVT
                            VENDOR_TYPE
                            PAY_TERM
                            EXP_DATE
                            ETD
                            ETA
                            DELIVERY
                        }
                    }
                `,
                variables: {
                    poCd: argPoCd,
                    matlCd: argMatlCd,
                    matlName: argMatlName,
                    color: argColor,
                    spec: argSpec,
                    unit: argUnit,
                    vendorCd: argVendorCd,
                },
            });
            return data.mgrKsvStockFacInMain;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockInEndMatlAmtCode(argKind) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockInEndMatlAmtCode($kind1: String) {
                        mgrKsvStockInEndMatlAmtCode(KIND1: $kind1) {
                            T_KSV_STOCK_IN {
                                PO_CD
                                PAY_DATE
                                PO_SEQ
                            }
                            T_KCD_VENDOR {
                                VENDOR_CD
                                VENDOR_NAME
                            }
                            T_KCD_CODE_VENDOR_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                        }
                    }
                `,
                variables: {
                    kind1: "",
                },
            });
            return data.mgrKsvStockInEndMatlAmtCode;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockInEndMatlAmt(argSDate, argEDate) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockInEndMatlAmt(
                        $sDate: String!
                        $eDate: String!
                    ) {
                        mgrKsvStockInEndMatlAmt(
                            S_DATE: $sDate
                            E_DATE: $eDate
                        ) {
                            PO_CD
                            VENDOR_CD_1
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            TOT_QTY
                            IN_QTY
                            IN_CURR_CD
                            IN_PRICE
                            PAY_CURR_CD
                            PAY_PRICE
                            TT_FLAG
                            WARE_NAME
                            PAY_PRICE_1
                            END_FLAG
                            END_DATE
                        }
                    }
                `,
                variables: {
                    sDate: argSDate,
                    eDate: argEDate,
                },
            });
            return data.mgrKsvStockInEndMatlAmt;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockOutListCT_QTY(argPL_NO) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockOutListCT_QTY($plNo: String!) {
                        mgrKsvStockOutListCT_QTY(PL_NO: $plNo) {
                            VENDOR_NAME
                            PERMIT
                            CT_QTY
                            CT_QTY1
                            TOT_QTY
                        }
                    }
                `,
                variables: {
                    plNo: argPL_NO,
                },
            });
            return data.mgrKsvStockOutListCT_QTY;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockOutListComp(argPL_NO) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockOutListComp($plNo: String!) {
                        mgrKsvStockOutListComp(PL_NO: $plNo) {
                            id
                            VENDOR_NAME
                            VENDOR_CD
                            PACK_CD
                            MATL_CD
                            MATL_NAME
                            SPEC
                            WIDTH
                            WEIGHT
                            HS_CD
                            HS_NAME
                            COMP1
                            COMP1_PERCENT
                            COMP2
                            COMP2_PERCENT
                            COMP3
                            COMP3_PERCENT
                            COMP4
                            COMP4_PERCENT
                            SPEC1
                            OFFER_SPEC
                        }
                    }
                `,
                variables: {
                    plNo: argPL_NO,
                },
            });
            return data.mgrKsvStockOutListComp;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockOutListCompCode(argKind) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockOutListCompCode($kind1: String) {
                        mgrKsvStockOutListCompCode(KIND_1: $kind1) {
                            T_KCD_HSCODE {
                                id
                                HS_NO
                                HS_CD
                                HS_NAME
                            }
                            T_KCD_CODE_COMPOSITION {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                        }
                    }
                `,
                variables: {
                    kind1: argKind,
                },
            });
            return data.mgrKsvStockOutListCompCode;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockOutListCode(argKind) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockOutListCode($kind1: String) {
                        mgrKsvStockOutListCode(KIND_1: $kind1) {
                            T_KCD_USER {
                                USER_ID
                                USER_NAME
                            }
                            T_KCD_BUYER {
                                BUYER_CD
                                BUYER_NAME
                            }
                            T_KCD_CODE_MATL_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                            T_KCD_VENDOR {
                                VENDOR_CD
                                VENDOR_NAME
                                VENDOR_TYPE
                            }
                            T_KSV_STOCK_OUT {
                                PO_CD
                                PACK_CD
                                PO_SEQ
                                HIS_NO
                            }
                        }
                    }
                `,
                variables: {
                    kind1: argKind,
                },
            });
            return data.mgrKsvStockOutListCode;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockOutList(
        argSDate,
        argEDate,
        argPoCd,
        argPlNo,
        argVendorType,
        argVendorCd,
        argRegUser,
        argHsNo,
        argBuyerCd,
        argMatlCd,
        argMatlName,
        argSpec,
        argColor,
    ) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockOutList(
                        $sDate: String!
                        $eDate: String!
                        $poCd: String!
                        $plNo: String!
                        $vendorType: String!
                        $vendorCd: String!
                        $regUser: String!
                        $hisNo: String!
                        $buyerCd: String!
                        $matlCd: String!
                        $matlName: String
                        $spec: String
                        $color: String
                    ) {
                        mgrKsvStockOutList(
                            S_DATE: $sDate
                            E_DATE: $eDate
                            PO_CD: $poCd
                            PL_NO: $plNo
                            VENDOR_TYPE: $vendorType
                            VENDOR_CD: $vendorCd
                            REG_USER: $regUser
                            HIS_NO: $hisNo
                            BUYER_CD: $buyerCd
                            MATL_CD: $matlCd
                            MATL_NAME: $matlName
                            SPEC: $spec
                            COLOR: $color
                        ) {
                            id
                            PO_CD
                            ORDER_CD
                            VENDOR_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            SHIP_DATE
                            ETA
                            PACK_NO
                            HIS_NO
                            OUT_QTY
                            out_from
                            CT_QTY
                            CT_NO
                            REMARK
                            IN_TYPE
                            OUT_TYPE
                            DELIVERY_TYPE
                            IN_TYPE_NAME
                            OUT_TYPE_NAME
                            DELIVERY_TYPE_NAME
                        }
                    }
                `,
                variables: {
                    sDate: argSDate,
                    eDate: argEDate,
                    poCd: argPoCd,
                    plNo: argPlNo,
                    vendorType: argVendorType,
                    vendorCd: argVendorCd,
                    regUser: argRegUser,
                    hisNo: argHsNo,
                    buyerCd: argBuyerCd,
                    matlCd: argMatlCd,
                    matlName: argMatlName,
                    spec: argSpec,
                    color: argColor,
                },
            });
            return data.mgrKsvStockOutList;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockOutRecordCode() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockOutRecordCode($kind1: String) {
                        mgrKsvStockOutRecordCode(KIND_1: $kind1) {
                            T_KCD_USER {
                                USER_ID
                                USER_NAME
                            }
                            T_KCD_CODE_TTFLAG {
                                CD_CODE
                                CD_NAME
                            }
                            T_KCD_VENDOR {
                                VENDOR_CD
                                VENDOR_NAME
                                VENDOR_TYPE
                            }
                        }
                    }
                `,
                variables: {
                    kind1: "",
                },
            });
            return data.mgrKsvStockOutRecordCode;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockOutRecord1(
        argPoCd,
        argSDate,
        argEDate,
        argVendorCd,
        argVendorType,
        argRegUser,
    ) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        console.log("STEP-1:" + argSDate + "," + argEDate);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockOutRecord1(
                        $poCd: String!
                        $sDate: String!
                        $eDate: String!
                        $vendorCd: String!
                        $vendorType: String!
                        $regUser: String!
                    ) {
                        mgrKsvStockOutRecord1(
                            PO_CD: $poCd
                            S_DATE: $sDate
                            E_DATE: $eDate
                            VENDOR_CD: $vendorCd
                            VENDOR_TYPE: $vendorType
                            REG_USER: $regUser
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            IN_DATETIME
                            VENDOR_NAME
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            IN_DATE
                            TOT_QTY
                            TOT_QTY_1
                            IN_TYPE
                        }
                    }
                `,
                variables: {
                    poCd: argPoCd,
                    sDate: argSDate,
                    eDate: argEDate,
                    vendorCd: argVendorCd,
                    vendorType: argVendorType,
                    regUser: argRegUser,
                },
            });
            return data.mgrKsvStockOutRecord1;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockOutRecord2(argPoCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockOutRecord2($poCd: String!) {
                        mgrKsvStockOutRecord2(PO_CD: $poCd) {
                            id
                            USE_MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            MATL_PRICE
                            CURR_CD
                            UNIT
                            USE_QTY
                            VENDOR_NAME
                            OUTPUT_FLAG
                            STOCK_IDX
                            USE_DATETIME
                        }
                    }
                `,
                variables: {
                    poCd: argPoCd,
                },
            });
            return data.mgrKsvStockOutRecord2;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockInListReportCode(argVal) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockInListReportCode($kind1: String) {
                        mgrKsvStockInListReportCode(KIND_1: $kind1) {
                            T_KCD_BUYER {
                                BUYER_NAME
                                BUYER_CD
                            }
                            T_KCD_MATL_MST {
                                MATL_CD
                                MATL_NAME
                                MATL_TYPE
                            }
                            T_KCD_CODE_MATL_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                            T_KCD_VENDOR {
                                VENDOR_CD
                                VENDOR_NAME
                            }
                            T_KCD_USER {
                                USER_ID
                                USER_NAME
                            }
                            T_KSV_STOCK_IN {
                                PAY_REPORT
                                PO_CD
                                PO_SEQ
                            }
                            T_KCD_BANK {
                                BANK_CD
                                BANK_NAME
                            }
                            T_KCD_CODE_BILL_TYPE1 {
                                CD_CODE
                                CD_NAME
                            }
                            T_KCD_CODE_BILL_TYPE2 {
                                CD_CODE
                                CD_NAME
                            }
                        }
                    }
                `,
                variables: { kind1: "" },
            });
            return data.mgrKsvStockInListReportCode;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockInListReport(
        argPoCd,
        argVendorCd,
        argBuyerCd,
        argMatlCd,
        argMatlName,
        argBillList,
        argBillType,
        argSDate,
        argEDate,
    ) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        console.log("STEP-1:" + argSDate + "," + argEDate);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockInListReport(
                        $poCd: String
                        $vendorCd: String
                        $buyerCd: String
                        $matlCd: String
                        $matlName: String
                        $billList: String
                        $billType: String
                        $sDate: String
                        $eDate: String
                    ) {
                        mgrKsvStockInListReport(
                            PO_CD: $poCd
                            VENDOR_CD: $vendorCd
                            BUYER_CD: $buyerCd
                            MATL_CD: $matlCd
                            MATL_NAME: $matlName
                            BILL_LIST: $billList
                            BILL_TYPE: $billType
                            S_DATE: $sDate
                            E_DATE: $eDate
                        ) {
                            id
                            PO_CD
                            ORDER_CD
                            VENDOR_NAME
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            IN_QTY
                            TOT_QTY
                            LC_QTY
                            IN_DATE
                            IN_PRICE
                            IN_CURR_CD
                            PAY_PRICE
                            PAY_CURR_CD
                            PAY_DATE
                            PAY_REPORT
                            LC_BILL_NO
                            BILL_TYPE
                            IN_TYPE
                            NN_TYPE_NAME
                            BILL_TYPE_NAME
                        }
                    }
                `,
                variables: {
                    poCd: argPoCd,
                    vendorCd: argVendorCd,
                    buyerCd: argBuyerCd,
                    matlCd: argMatlCd,
                    matlName: argMatlName,
                    billList: argBillList,
                    billType: argBillType,
                    sDate: argSDate,
                    eDate: argEDate,
                },
            });
            return data.mgrKsvStockInListReport;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockInListOne(argPO_CD, argVENDOR_CD, argMATL_CD) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockInListOne(
                        $poCd: String!
                        $matlCd: String!
                        $vendorCd: String
                    ) {
                        mgrKsvStockInListOne(
                            PO_CD: $poCd
                            MATL_CD: $matlCd
                            VENDOR_CD: $vendorCd
                        ) {
                            id
                            PO_CD
                            ORDER_CD
                            VENDOR_NAME
                            MATL_NAME
                            MATL_CD
                            COLOR
                            SPEC
                            UNIT
                            PO_QTY
                            BEF_IN_QTY
                            IN_QTY
                            TOT_QTY
                            MIN_FLAG
                        }
                    }
                `,
                variables: {
                    poCd: argPO_CD,
                    vendorCd: argVENDOR_CD,
                    matlCd: argMATL_CD,
                },
            });
            return data.mgrKsvStockInListOne;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockInListAll(argPO_CD, argVENDOR_CD) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockInListAll(
                        $poCd: String!
                        $vendorCd: String
                    ) {
                        mgrKsvStockInListAll(
                            PO_CD: $poCd
                            VENDOR_CD: $vendorCd
                        ) {
                            id
                            PO_CD
                            ORDER_CD
                            VENDOR_NAME
                            MATL_NAME
                            MATL_CD
                            COLOR
                            SPEC
                            UNIT
                            PO_QTY
                            BEF_IN_QTY
                            IN_QTY
                            TOT_QTY
                            MIN_FLAG
                        }
                    }
                `,
                variables: { poCd: argPO_CD, vendorCd: argVENDOR_CD },
            });
            return data.mgrKsvStockInListAll;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockInStockMemList(argPO_CD, argVENDOR_CD) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockInStockMemList(
                        $poCd: String!
                        $vendorCd: String
                    ) {
                        mgrKsvStockInStockMemList(
                            PO_CD: $poCd
                            VENDOR_CD: $vendorCd
                        ) {
                            id
                            PO_CD
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            MATL_PRICE
                            PO_QTY_SUM
                            IN_QTY_SUM
                            CD_NAME
                            CONF_FLAG
                            CURR_CD
                        }
                    }
                `,
                variables: { poCd: argPO_CD, vendorCd: argVENDOR_CD },
            });
            return data.mgrKsvStockInStockMemList;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockInVendorList(argPO_CD) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockInVendorList($poCd: String!) {
                        mgrKsvStockInVendorList(PO_CD: $poCd) {
                            VENDOR_CD
                            VENDOR_NAME
                            CNT
                        }
                    }
                `,
                variables: { poCd: argPO_CD },
            });
            return data.mgrKsvStockInVendorList;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvStockInPoList(argPO_CD) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockInPoList($poCd: String!) {
                        mgrKsvStockInPoList(PO_CD: $poCd) {
                            PO_CD
                        }
                    }
                `,
                variables: { poCd: argPO_CD },
            });
            return data.mgrKsvStockInPoList;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvOrder1PoRevise1(argPO_CD) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvOrder1PoRevise1($poCd: String!) {
                        mgrKsvOrder1PoRevise1(PO_CD: $poCd) {
                            PO_SEQ
                            SEQ
                            ORDER_CD
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            STATUS1
                            BEF_QTY
                            STOCK_QTY
                            TOT_QTY
                            NEW_QTY
                            DIFF_QTY
                            CD_NAME
                        }
                    }
                `,
                variables: { poCd: argPO_CD },
            });
            return data.mgrKsvOrder1PoRevise1;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvOrder1PoRevise2(argPO_CD, argPO_SEQ, argSeq) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvOrder1PoRevise2(
                        $poCd: String!
                        $poSeq: Int!
                        $seq: Int!
                    ) {
                        mgrKsvOrder1PoRevise2(
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            SEQ: $seq
                        ) {
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            BEF_PO_QTY
                            USE_STOCK_QTY
                            DIFF_RE_QTY
                            DIFF_RE_TYPE
                        }
                    }
                `,
                variables: { poCd: argPO_CD, poSeq: argPO_SEQ, seq: argSeq },
            });
            return data.mgrKsvOrder1PoRevise2;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvOrder1PoRevisePoSeq(argPO_CD) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvOrder1PoRevisePoSeq($poCd: String!) {
                        mgrKsvOrder1PoRevisePoSeq(PO_CD: $poCd) {
                            PO_CD
                            PO_SEQ
                        }
                    }
                `,
                variables: { poCd: argPO_CD },
            });
            return data.mgrKsvOrder1PoRevisePoSeq;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvOrder1RegOrder(argMsts, argMems) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrKsvOrderRecordReg(
                        $msts: [InputKsvOrderMsts!]!
                        $mems: [InputKsvOrderMems!]!
                    ) {
                        mgrKsvOrderRecordReg(msts: $msts, mems: $mems) {
                            count
                        }
                    }
                `,
                variables: { msts: argMsts, mems: argMems },
            });
            return data.mgrKsvOrderRecordReg;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvOrder1RegOrderCombine(argMsts, argMems) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrKsvOrderRecordRegCombine(
                        $msts: [InputKsvOrderMsts!]!
                        $mems: [InputKsvOrderMems!]!
                    ) {
                        mgrKsvOrderRecordRegCombine(msts: $msts, mems: $mems) {
                            count
                        }
                    }
                `,
                variables: { msts: argMsts, mems: argMems },
            });
            return data.mgrKsvOrderRecordRegCombine;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvOrder1Style(qryBuyerCd, qryStatusCd, qryName) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvOrder1Style(
                        $buyerCd: String!
                        $statusCd: String!
                        $name: String
                    ) {
                        mgrKsvOrder1Style(
                            BUYER_CD: $buyerCd
                            STATUS_CD: $statusCd
                            NAME: $name
                        ) {
                            STYLE_CD
                            STYLE_NAME
                            BUYER_CD
                            TOT_ORDER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    buyerCd: qryBuyerCd,
                    statusCd: qryStatusCd,
                    name: qryName,
                },
            });
            console.log(
                "MGR_KSV_ORDER_MST1:mgrKsvOrder1Style",
                JSON.stringify(data.mgrKsvOrder1Style.length),
            );
            return data.mgrKsvOrder1Style;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvOrder1Mst(qryKind, qryStyleCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvOrder1Mst($kind: String!, $styleCd: String) {
                        mgrKsvOrder1Mst(KIND: $kind, STYLE_CD: $styleCd) {
                            ORDER_CD
                            ORDER_TYPE
                            ORDER_STATUS_NAME
                            TOT_CNT
                        }
                    }
                `,
                variables: { kind: qryKind, styleCd: qryStyleCd },
            });
            console.log(
                "MGR_KSV_ORDER_MST1:mgrKsvOrder1Mst",
                JSON.stringify(data.mgrKsvOrder1Mst.length),
            );
            return data.mgrKsvOrder1Mst;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvOrder1Mst2(qryKind, qryOrderCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvOrder1Mst2($kind: String!, $orderCd: String) {
                        mgrKsvOrder1Mst2(KIND: $kind, ORDER_CD: $orderCd) {
                            ORDER_CD
                            ORDER_TYPE
                            ORDER_STATUS_NAME
                            TOT_CNT
                        }
                    }
                `,
                variables: { kind: qryKind, orderCd: qryOrderCd },
            });
            console.log(
                "MGR_KSV_ORDER_MST1:mgrKsvOrder1Mst2",
                JSON.stringify(data.mgrKsvOrder1Mst2.length),
            );
            return data.mgrKsvOrder1Mst2;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvOrder1All(qryOrderCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvOrder1All($orderCd: String!) {
                        mgrKsvOrder1All(ORDER_CD: $orderCd) {
                            MAIN_ORDER_MST {
                                id
                                ORDER_CD
                                STYLE_CD
                                ORDER_TYPE
                                YY
                                SEQ
                                TOT_CNT
                                ADD_CNT
                                AVR_PRICE
                                FC_BEF
                                FC_PRICE
                                MATL_AMT
                                ETC_AMT
                                COMMISSION
                                COMM1
                                COMM2
                                OVER_FLAG
                                OVER_QTY
                                OVER_AMT
                                OVER_BILL
                                CURR_CD
                                USD_PRICE
                                ORDER_DATE
                                DUE_DATE
                                MATL_DUE_DATE
                                NAT_CD
                                FACTORY_CD
                                SIZE_GROUP
                                ORDER_FLAG
                                SAMPLE_FLAG
                                MATL_SALE_FLAG
                                FAC_LC_FLAG
                                FAC_TT_FLAG
                                ORDER_STATUS
                                END_DATETIME
                                REMARK
                                REF_ORDER_NO
                                REF_NO
                                REF_Q_OUTER
                                REF_Q_LINER
                                REF_ORDER_REQ
                                REF_COLOR1
                                REF_COLOR2
                                REF_SIZE1
                                REF_SIZE2
                                REF_QTY1
                                REF_QTY2
                                MATL_PAY_FLAG
                                MATL_PAY_USER
                                MATL_PAY_DATETIME
                                FC_NEGO_TYPE
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                APPROVAL_USER
                                APPROVAL_DATETIME
                                brand
                                season
                                krw_flag
                                krw_matl_amt
                                margin
                                frt_check
                                category
                                ORG_DUE_DATE
                                BUYER_TEAM
                                SAMPLE_COST_FLAG
                                DL_FLAG
                                TRADE_PRICE
                                LINE_CHARGE_PRICE
                                DUTY
                                mid_size1
                                mid_size2
                                mid_size3
                                mid_size4
                                END_STATUS
                                FC_PRICE2
                                CANCEL_DATETIME
                                PO_MATL_AMT
                            }
                            MAIN_ORDER_MEM {
                                id
                                ORDER_CD
                                PROD_CD
                                ADD_FLAG
                                PRICE
                                TOT_CNT
                                SIZE_CNT
                                OLD_PROD_CD
                                end_price
                                barcode
                                MID_SIZE
                                MID_SIZE_QTY
                                SIZE_LOSS
                            }
                            SUB_ORDER_MST {
                                id
                                ORDER_CD
                                STYLE_CD
                                ORDER_TYPE
                                YY
                                SEQ
                                TOT_CNT
                                ADD_CNT
                                AVR_PRICE
                                FC_BEF
                                FC_PRICE
                                MATL_AMT
                                ETC_AMT
                                COMMISSION
                                COMM1
                                COMM2
                                OVER_FLAG
                                OVER_QTY
                                OVER_AMT
                                OVER_BILL
                                CURR_CD
                                USD_PRICE
                                ORDER_DATE
                                DUE_DATE
                                MATL_DUE_DATE
                                NAT_CD
                                FACTORY_CD
                                SIZE_GROUP
                                ORDER_FLAG
                                SAMPLE_FLAG
                                MATL_SALE_FLAG
                                FAC_LC_FLAG
                                FAC_TT_FLAG
                                ORDER_STATUS
                                END_DATETIME
                                REMARK
                                REF_ORDER_NO
                                REF_NO
                                REF_Q_OUTER
                                REF_Q_LINER
                                REF_ORDER_REQ
                                REF_COLOR1
                                REF_COLOR2
                                REF_SIZE1
                                REF_SIZE2
                                REF_QTY1
                                REF_QTY2
                                MATL_PAY_FLAG
                                MATL_PAY_USER
                                MATL_PAY_DATETIME
                                FC_NEGO_TYPE
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                APPROVAL_USER
                                APPROVAL_DATETIME
                                brand
                                season
                                krw_flag
                                krw_matl_amt
                                margin
                                frt_check
                                category
                                ORG_DUE_DATE
                                BUYER_TEAM
                                SAMPLE_COST_FLAG
                                DL_FLAG
                                TRADE_PRICE
                                LINE_CHARGE_PRICE
                                DUTY
                                mid_size1
                                mid_size2
                                mid_size3
                                mid_size4
                                END_STATUS
                                FC_PRICE2
                                CANCEL_DATETIME
                                PO_MATL_AMT
                            }
                            SIZE_MEM {
                                id
                                SIZE_GROUP
                                SIZE_SEQ
                                SIZE_VAL
                                UNIT_RATE
                            }
                        }
                    }
                `,
                variables: { orderCd: qryOrderCd },
            });
            // console.log("MGR_KSV_ORDER_MST1:mgrKsvOrder1All", JSON.stringify(data.mgrKsvOrder1All));
            return data.mgrKsvOrder1All;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvOrder1OrderMem(qryOrderCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvOrder1OrderMem($orderCd: String!) {
                        mgrKsvOrder1OrderMem(ORDER_CD: $orderCd) {
                            id
                            ORDER_CD
                            PROD_CD
                            ADD_FLAG
                            PRICE
                            TOT_CNT
                            SIZE_CNT
                            OLD_PROD_CD
                            end_price
                            barcode
                            MID_SIZE
                            MID_SIZE_QTY
                            SIZE_LOSS
                        }
                    }
                `,
                variables: { orderCd: qryOrderCd },
            });
            console.log(
                "MGR_KSV_ORDER_MST1:mgrKsvOrder1OrderMem",
                JSON.stringify(data.mgrKsvOrder1OrderMem.length),
            );
            return data.mgrKsvOrder1OrderMem;
        } catch (e) {
            return e;
        }
    }

    async mgrKsvOrder1CapaMem(qryUserId) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvOrder1CapaMem($userId: String!) {
                        mgrKsvOrder1CapaMem(USER_ID: $userId) {
                            id
                            BOOK_DATE
                            USER_ID
                            SEQ
                            JOB_CD
                            MONTH
                            IN_DATE
                            BUYER_CD
                            PO_CD
                            ORDER_CD
                            STYLE_CD
                            QTY
                            NR
                            MW
                            CAT
                            EMBRO
                            TP
                            SP
                            LTHR
                            G
                            W
                            S
                            FND
                            DL
                            M_ETA
                            FOB
                            SD
                            KIND
                            BVT_KIND
                            S_ETA
                            EXP_CMPT
                            REMARK
                            TPR
                            EMBOSSING
                            WASHING
                            DOWN
                            CUT
                            ORG_USER_ID
                            SEND_DATETIME
                            CAPABOOK_IDX
                            SEND_FLAG
                            FTP
                            DTP
                            LAZE
                            STYLE_NAME
                            NEGO_TYPE
                        }
                    }
                `,
                variables: { userId: qryUserId },
            });
            console.log(
                "MGR_KSV_ORDER_MST1:mgrKsvOrder1CapaMem",
                JSON.stringify(data.mgrKsvOrder1CapaMem.length),
            );
            return data.mgrKsvOrder1CapaMem;
        } catch (e) {
            return e;
        }
    }
}
