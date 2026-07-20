/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_STOCK_USE {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_STOCK_USE {
                        allQueryKSV_STOCK_USE {
                            id
                            STOCK_IDX
                            USE_DATETIME
                            USE_QTY
                            USE_PO_CD
                            USE_PO_SEQ
                            USE_ORDER_CD
                            USE_MATL_CD
                            USE_MRP_SEQ
                            USE_MATL_SEQ
                            FACTORY_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            OUT_DATE
                            CONF_FLAG
                            CONF_USER
                            CONF_DATETIME
                            req_qty
                            defect_qty
                            loss_qty
                            PACK_CD
                            OUTPUT_FLAG
                            ORG_STOCK_IDX
                        }
                    }
                `,
            });
            console.log(
                "KSV_STOCK_USE:",
                JSON.stringify(data.allQueryKSV_STOCK_USE.length),
            );
            return data.allQueryKSV_STOCK_USE;
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
                    query MgrKsvStockUseQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvStockUseQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            STOCK_IDX
                            USE_DATETIME
                            USE_QTY
                            USE_PO_CD
                            USE_PO_SEQ
                            USE_ORDER_CD
                            USE_MATL_CD
                            USE_MRP_SEQ
                            USE_MATL_SEQ
                            FACTORY_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            OUT_DATE
                            CONF_FLAG
                            CONF_USER
                            CONF_DATETIME
                            req_qty
                            defect_qty
                            loss_qty
                            PACK_CD
                            OUTPUT_FLAG
                            ORG_STOCK_IDX
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_STOCK_USE:",
                JSON.stringify(data.mgrKsvStockUseQuery.length),
            );
            return data.mgrKsvStockUseQuery;
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
                    mutation CreateKSV_STOCK_USE(
                        $stockIdx: String
                        $useDatetime: String
                        $useQty: Float
                        $usePoCd: String
                        $usePoSeq: Int
                        $useOrderCd: String
                        $useMatlCd: String
                        $useMrpSeq: Int
                        $useMatlSeq: Int
                        $factoryCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $outDate: String
                        $confFlag: String
                        $confUser: String
                        $confDatetime: String
                        $reqQty: Float
                        $defectQty: Float
                        $lossQty: Float
                        $packCd: String
                        $outputFlag: String
                        $orgStockIdx: String
                    ) {
                        createKSV_STOCK_USE(
                            STOCK_IDX: $stockIdx
                            USE_DATETIME: $useDatetime
                            USE_QTY: $useQty
                            USE_PO_CD: $usePoCd
                            USE_PO_SEQ: $usePoSeq
                            USE_ORDER_CD: $useOrderCd
                            USE_MATL_CD: $useMatlCd
                            USE_MRP_SEQ: $useMrpSeq
                            USE_MATL_SEQ: $useMatlSeq
                            FACTORY_CD: $factoryCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            OUT_DATE: $outDate
                            CONF_FLAG: $confFlag
                            CONF_USER: $confUser
                            CONF_DATETIME: $confDatetime
                            req_qty: $reqQty
                            defect_qty: $defectQty
                            loss_qty: $lossQty
                            PACK_CD: $packCd
                            OUTPUT_FLAG: $outputFlag
                            ORG_STOCK_IDX: $orgStockIdx
                        ) {
                            STOCK_IDX
                            USE_DATETIME
                            USE_QTY
                            USE_PO_CD
                            USE_PO_SEQ
                            USE_ORDER_CD
                            USE_MATL_CD
                            USE_MRP_SEQ
                            USE_MATL_SEQ
                            FACTORY_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            OUT_DATE
                            CONF_FLAG
                            CONF_USER
                            CONF_DATETIME
                            req_qty
                            defect_qty
                            loss_qty
                            PACK_CD
                            OUTPUT_FLAG
                            ORG_STOCK_IDX
                        }
                    }
                `,
                variables: {
                    stockIdx: argData.STOCK_IDX,
                    useDatetime: argData.USE_DATETIME,
                    useQty: argData.USE_QTY,
                    usePoCd: argData.USE_PO_CD,
                    usePoSeq: argData.USE_PO_SEQ,
                    useOrderCd: argData.USE_ORDER_CD,
                    useMatlCd: argData.USE_MATL_CD,
                    useMrpSeq: argData.USE_MRP_SEQ,
                    useMatlSeq: argData.USE_MATL_SEQ,
                    factoryCd: argData.FACTORY_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    outDate: argData.OUT_DATE,
                    confFlag: argData.CONF_FLAG,
                    confUser: argData.CONF_USER,
                    confDatetime: argData.CONF_DATETIME,
                    reqQty: argData.req_qty,
                    defectQty: argData.defect_qty,
                    lossQty: argData.loss_qty,
                    packCd: argData.PACK_CD,
                    outputFlag: argData.OUTPUT_FLAG,
                    orgStockIdx: argData.ORG_STOCK_IDX,
                },
            });
            console.log(
                "KSV_STOCK_USE INSERT:",
                JSON.stringify(data.createKSV_STOCK_USE),
            );
            return data.createKSV_STOCK_USE;
        } catch (e) {
            console.log("KSV_STOCK_USE INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_STOCK_USE(
                        $updateKsvStockUseId: Int!
                        $stockIdx: String
                        $useDatetime: String
                        $useQty: Float
                        $usePoCd: String
                        $usePoSeq: Int
                        $useOrderCd: String
                        $useMatlCd: String
                        $useMrpSeq: Int
                        $useMatlSeq: Int
                        $factoryCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $outDate: String
                        $confFlag: String
                        $confUser: String
                        $confDatetime: String
                        $reqQty: Float
                        $defectQty: Float
                        $lossQty: Float
                        $packCd: String
                        $outputFlag: String
                        $orgStockIdx: String
                    ) {
                        updateKSV_STOCK_USE(
                            id: $updateKsvStockUseId
                            STOCK_IDX: $stockIdx
                            USE_DATETIME: $useDatetime
                            USE_QTY: $useQty
                            USE_PO_CD: $usePoCd
                            USE_PO_SEQ: $usePoSeq
                            USE_ORDER_CD: $useOrderCd
                            USE_MATL_CD: $useMatlCd
                            USE_MRP_SEQ: $useMrpSeq
                            USE_MATL_SEQ: $useMatlSeq
                            FACTORY_CD: $factoryCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            OUT_DATE: $outDate
                            CONF_FLAG: $confFlag
                            CONF_USER: $confUser
                            CONF_DATETIME: $confDatetime
                            req_qty: $reqQty
                            defect_qty: $defectQty
                            loss_qty: $lossQty
                            PACK_CD: $packCd
                            OUTPUT_FLAG: $outputFlag
                            ORG_STOCK_IDX: $orgStockIdx
                        ) {
                            id
                            STOCK_IDX
                            USE_DATETIME
                            USE_QTY
                            USE_PO_CD
                            USE_PO_SEQ
                            USE_ORDER_CD
                            USE_MATL_CD
                            USE_MRP_SEQ
                            USE_MATL_SEQ
                            FACTORY_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            OUT_DATE
                            CONF_FLAG
                            CONF_USER
                            CONF_DATETIME
                            req_qty
                            defect_qty
                            loss_qty
                            PACK_CD
                            OUTPUT_FLAG
                            ORG_STOCK_IDX
                        }
                    }
                `,
                variables: {
                    updateKsvStockUseId: argData.id,
                    stockIdx: argData.STOCK_IDX,
                    useDatetime: argData.USE_DATETIME,
                    useQty: argData.USE_QTY,
                    usePoCd: argData.USE_PO_CD,
                    usePoSeq: argData.USE_PO_SEQ,
                    useOrderCd: argData.USE_ORDER_CD,
                    useMatlCd: argData.USE_MATL_CD,
                    useMrpSeq: argData.USE_MRP_SEQ,
                    useMatlSeq: argData.USE_MATL_SEQ,
                    factoryCd: argData.FACTORY_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    outDate: argData.OUT_DATE,
                    confFlag: argData.CONF_FLAG,
                    confUser: argData.CONF_USER,
                    confDatetime: argData.CONF_DATETIME,
                    reqQty: argData.req_qty,
                    defectQty: argData.defect_qty,
                    lossQty: argData.loss_qty,
                    packCd: argData.PACK_CD,
                    outputFlag: argData.OUTPUT_FLAG,
                    orgStockIdx: argData.ORG_STOCK_IDX,
                },
            });
            console.log(
                "KSV_STOCK_USE UPDATE:",
                JSON.stringify(data.updateKSV_STOCK_USE),
            );
            return data.updateKSV_STOCK_USE;
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
                    mutation DeleteKSV_STOCK_USE($deleteKsvStockUseId: Int!) {
                        deleteKSV_STOCK_USE(id: $deleteKsvStockUseId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvStockUseId: argData.id,
                },
            });
            console.log(
                "KSV_STOCK_USE DELETE:",
                JSON.stringify(data.deleteKSV_STOCK_USE),
            );
            return data.deleteKSV_STOCK_USE;
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
                    mutation MgrKsvStockUseDeletes(
                        $ids: [InputMgrKsvStockUseDeletes!]!
                    ) {
                        mgrKsvStockUseDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_STOCK_USE DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
