/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_STOCK_MEM {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_STOCK_MEM {
                        allQueryKSV_STOCK_MEM {
                            id
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            PO_QTY
                            IN_QTY
                            OUT_QTY
                            INFAC_QTY
                            OUTFAC_QTY
                            STOCK_QTY
                            REMAIN_QTY
                            USE_QTY
                            FACTORY_CD
                            DIFF_PO_TYPE
                            DIFF_QTY
                            STOCK_STATUS
                            STOCK_DATE
                            WARE_CD
                            WARE_DATE
                            WARE_QTY
                            RACK
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            TEMP_PRICE
                            PAY_EXP_DATE
                            MIN_ORDER
                            vendor_cd
                            lc_qty
                            min_conf_user
                            min_conf_datetime
                            min_stock_idx
                        }
                    }
                `,
            });
            console.log(
                "KSV_STOCK_MEM:",
                JSON.stringify(data.allQueryKSV_STOCK_MEM.length),
            );
            return data.allQueryKSV_STOCK_MEM;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParam(qrySearchString, qryStatus) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockMemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvStockMemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            PO_QTY
                            IN_QTY
                            OUT_QTY
                            INFAC_QTY
                            OUTFAC_QTY
                            STOCK_QTY
                            REMAIN_QTY
                            USE_QTY
                            FACTORY_CD
                            DIFF_PO_TYPE
                            DIFF_QTY
                            STOCK_STATUS
                            STOCK_DATE
                            WARE_CD
                            WARE_DATE
                            WARE_QTY
                            RACK
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            TEMP_PRICE
                            PAY_EXP_DATE
                            MIN_ORDER
                            vendor_cd
                            lc_qty
                            min_conf_user
                            min_conf_datetime
                            min_stock_idx
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_STOCK_MEM:",
                JSON.stringify(data.mgrKsvStockMemQuery.length),
            );
            return data.mgrKsvStockMemQuery;
        } catch (e) {
            return e;
        }
    }

    async createData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation CreateKSV_STOCK_MEM(
                        $poCd: String
                        $poSeq: Int
                        $orderCd: String
                        $matlCd: String
                        $mrpSeq: Int
                        $matlSeq: Int
                        $poQty: Float
                        $inQty: Float
                        $outQty: Float
                        $infacQty: Float
                        $outfacQty: Float
                        $stockQty: Float
                        $remainQty: Float
                        $useQty: Float
                        $factoryCd: String
                        $diffPoType: String
                        $diffQty: Float
                        $stockStatus: String
                        $stockDate: String
                        $wareCd: String
                        $wareDate: String
                        $wareQty: Float
                        $rack: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $tempPrice: String
                        $payExpDate: String
                        $minOrder: String
                        $vendorCd: String
                        $lcQty: Float
                        $minConfUser: String
                        $minConfDatetime: String
                        $minStockIdx: String
                    ) {
                        createKSV_STOCK_MEM(
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            ORDER_CD: $orderCd
                            MATL_CD: $matlCd
                            MRP_SEQ: $mrpSeq
                            MATL_SEQ: $matlSeq
                            PO_QTY: $poQty
                            IN_QTY: $inQty
                            OUT_QTY: $outQty
                            INFAC_QTY: $infacQty
                            OUTFAC_QTY: $outfacQty
                            STOCK_QTY: $stockQty
                            REMAIN_QTY: $remainQty
                            USE_QTY: $useQty
                            FACTORY_CD: $factoryCd
                            DIFF_PO_TYPE: $diffPoType
                            DIFF_QTY: $diffQty
                            STOCK_STATUS: $stockStatus
                            STOCK_DATE: $stockDate
                            WARE_CD: $wareCd
                            WARE_DATE: $wareDate
                            WARE_QTY: $wareQty
                            RACK: $rack
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            TEMP_PRICE: $tempPrice
                            PAY_EXP_DATE: $payExpDate
                            MIN_ORDER: $minOrder
                            vendor_cd: $vendorCd
                            lc_qty: $lcQty
                            min_conf_user: $minConfUser
                            min_conf_datetime: $minConfDatetime
                            min_stock_idx: $minStockIdx
                        ) {
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            PO_QTY
                            IN_QTY
                            OUT_QTY
                            INFAC_QTY
                            OUTFAC_QTY
                            STOCK_QTY
                            REMAIN_QTY
                            USE_QTY
                            FACTORY_CD
                            DIFF_PO_TYPE
                            DIFF_QTY
                            STOCK_STATUS
                            STOCK_DATE
                            WARE_CD
                            WARE_DATE
                            WARE_QTY
                            RACK
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            TEMP_PRICE
                            PAY_EXP_DATE
                            MIN_ORDER
                            vendor_cd
                            lc_qty
                            min_conf_user
                            min_conf_datetime
                            min_stock_idx
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    orderCd: argData.ORDER_CD,
                    matlCd: argData.MATL_CD,
                    mrpSeq: argData.MRP_SEQ,
                    matlSeq: argData.MATL_SEQ,
                    poQty: argData.PO_QTY,
                    inQty: argData.IN_QTY,
                    outQty: argData.OUT_QTY,
                    infacQty: argData.INFAC_QTY,
                    outfacQty: argData.OUTFAC_QTY,
                    stockQty: argData.STOCK_QTY,
                    remainQty: argData.REMAIN_QTY,
                    useQty: argData.USE_QTY,
                    factoryCd: argData.FACTORY_CD,
                    diffPoType: argData.DIFF_PO_TYPE,
                    diffQty: argData.DIFF_QTY,
                    stockStatus: argData.STOCK_STATUS,
                    stockDate: argData.STOCK_DATE,
                    wareCd: argData.WARE_CD,
                    wareDate: argData.WARE_DATE,
                    wareQty: argData.WARE_QTY,
                    rack: argData.RACK,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    tempPrice: argData.TEMP_PRICE,
                    payExpDate: argData.PAY_EXP_DATE,
                    minOrder: argData.MIN_ORDER,
                    vendorCd: argData.vendor_cd,
                    lcQty: argData.lc_qty,
                    minConfUser: argData.min_conf_user,
                    minConfDatetime: argData.min_conf_datetime,
                    minStockIdx: argData.min_stock_idx,
                },
            });
            console.log(
                "KSV_STOCK_MEM INSERT:",
                JSON.stringify(data.createKSV_STOCK_MEM),
            );
            return data.createKSV_STOCK_MEM;
        } catch (e) {
            console.log("KSV_STOCK_MEM INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_STOCK_MEM(
                        $updateKsvStockMemId: Int!
                        $poCd: String
                        $poSeq: Int
                        $orderCd: String
                        $matlCd: String
                        $mrpSeq: Int
                        $matlSeq: Int
                        $poQty: Float
                        $inQty: Float
                        $outQty: Float
                        $infacQty: Float
                        $outfacQty: Float
                        $stockQty: Float
                        $remainQty: Float
                        $useQty: Float
                        $factoryCd: String
                        $diffPoType: String
                        $diffQty: Float
                        $stockStatus: String
                        $stockDate: String
                        $wareCd: String
                        $wareDate: String
                        $wareQty: Float
                        $rack: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $tempPrice: String
                        $payExpDate: String
                        $minOrder: String
                        $vendorCd: String
                        $lcQty: Float
                        $minConfUser: String
                        $minConfDatetime: String
                        $minStockIdx: String
                    ) {
                        updateKSV_STOCK_MEM(
                            id: $updateKsvStockMemId
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            ORDER_CD: $orderCd
                            MATL_CD: $matlCd
                            MRP_SEQ: $mrpSeq
                            MATL_SEQ: $matlSeq
                            PO_QTY: $poQty
                            IN_QTY: $inQty
                            OUT_QTY: $outQty
                            INFAC_QTY: $infacQty
                            OUTFAC_QTY: $outfacQty
                            STOCK_QTY: $stockQty
                            REMAIN_QTY: $remainQty
                            USE_QTY: $useQty
                            FACTORY_CD: $factoryCd
                            DIFF_PO_TYPE: $diffPoType
                            DIFF_QTY: $diffQty
                            STOCK_STATUS: $stockStatus
                            STOCK_DATE: $stockDate
                            WARE_CD: $wareCd
                            WARE_DATE: $wareDate
                            WARE_QTY: $wareQty
                            RACK: $rack
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            TEMP_PRICE: $tempPrice
                            PAY_EXP_DATE: $payExpDate
                            MIN_ORDER: $minOrder
                            vendor_cd: $vendorCd
                            lc_qty: $lcQty
                            min_conf_user: $minConfUser
                            min_conf_datetime: $minConfDatetime
                            min_stock_idx: $minStockIdx
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            PO_QTY
                            IN_QTY
                            OUT_QTY
                            INFAC_QTY
                            OUTFAC_QTY
                            STOCK_QTY
                            REMAIN_QTY
                            USE_QTY
                            FACTORY_CD
                            DIFF_PO_TYPE
                            DIFF_QTY
                            STOCK_STATUS
                            STOCK_DATE
                            WARE_CD
                            WARE_DATE
                            WARE_QTY
                            RACK
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            TEMP_PRICE
                            PAY_EXP_DATE
                            MIN_ORDER
                            vendor_cd
                            lc_qty
                            min_conf_user
                            min_conf_datetime
                            min_stock_idx
                        }
                    }
                `,
                variables: {
                    updateKsvStockMemId: argData.id,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    orderCd: argData.ORDER_CD,
                    matlCd: argData.MATL_CD,
                    mrpSeq: argData.MRP_SEQ,
                    matlSeq: argData.MATL_SEQ,
                    poQty: argData.PO_QTY,
                    inQty: argData.IN_QTY,
                    outQty: argData.OUT_QTY,
                    infacQty: argData.INFAC_QTY,
                    outfacQty: argData.OUTFAC_QTY,
                    stockQty: argData.STOCK_QTY,
                    remainQty: argData.REMAIN_QTY,
                    useQty: argData.USE_QTY,
                    factoryCd: argData.FACTORY_CD,
                    diffPoType: argData.DIFF_PO_TYPE,
                    diffQty: argData.DIFF_QTY,
                    stockStatus: argData.STOCK_STATUS,
                    stockDate: argData.STOCK_DATE,
                    wareCd: argData.WARE_CD,
                    wareDate: argData.WARE_DATE,
                    wareQty: argData.WARE_QTY,
                    rack: argData.RACK,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    tempPrice: argData.TEMP_PRICE,
                    payExpDate: argData.PAY_EXP_DATE,
                    minOrder: argData.MIN_ORDER,
                    vendorCd: argData.vendor_cd,
                    lcQty: argData.lc_qty,
                    minConfUser: argData.min_conf_user,
                    minConfDatetime: argData.min_conf_datetime,
                    minStockIdx: argData.min_stock_idx,
                },
            });
            console.log(
                "KSV_STOCK_MEM UPDATE:",
                JSON.stringify(data.updateKSV_STOCK_MEM),
            );
            return data.updateKSV_STOCK_MEM;
        } catch (e) {
            return e;
        }
    }

    async deleteData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation DeleteKSV_STOCK_MEM($deleteKsvStockMemId: Int!) {
                        deleteKSV_STOCK_MEM(id: $deleteKsvStockMemId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvStockMemId: argData.id,
                },
            });
            console.log(
                "KSV_STOCK_MEM DELETE:",
                JSON.stringify(data.deleteKSV_STOCK_MEM),
            );
            return data.deleteKSV_STOCK_MEM;
        } catch (e) {
            return e;
        }
    }

    async deletesData(argDatas) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        var tObjs = [];
        var tIdx = 0;
        for (tIdx = 0; tIdx < argDatas.length; tIdx++) {
            var tOne = argDatas[tIdx];
            var tOneObj = {};
            tOneObj.id = tOne.id;
            tObjs.push(tOneObj);
        }
        var tInputs = {};
        tInputs.ids = tObjs;
        console.log(JSON.stringify(tInputs));

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrKsvStockMemDeletes(
                        $ids: [InputMgrKsvStockMemDeletes!]!
                    ) {
                        mgrKsvStockMemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_STOCK_MEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
