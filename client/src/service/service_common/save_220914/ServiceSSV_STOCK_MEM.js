/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSSV_STOCK_MEM {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySSV_STOCK_MEM {
                        allQuerySSV_STOCK_MEM {
                            id
                            STOCK_IDX
                            ORDER_CD
                            PROD_CD
                            SIZE
                            STOCK_QTY
                            STOCK_DATETIME
                            STOCK_TYPE
                            IO_FLAG
                            IN_TYPE
                            OUT_TYPE
                            REQ_NO
                            OUT_NO
                            AGENT_CD
                            WARE_CD
                            RET_REQ_NO
                            REF_STOCK_IDX
                            REF_STOCK_QTY
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            END_PRICE
                            SALE_RATE
                            SALE_PRICE
                            TOT_AMT
                            ETC_AMT
                            OUT_STATUS
                        }
                    }
                `,
            });
            console.log(
                "SSV_STOCK_MEM:",
                JSON.stringify(data.allQuerySSV_STOCK_MEM.length),
            );
            return data.allQuerySSV_STOCK_MEM;
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
                    query MgrSsvStockMemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrSsvStockMemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            STOCK_IDX
                            ORDER_CD
                            PROD_CD
                            SIZE
                            STOCK_QTY
                            STOCK_DATETIME
                            STOCK_TYPE
                            IO_FLAG
                            IN_TYPE
                            OUT_TYPE
                            REQ_NO
                            OUT_NO
                            AGENT_CD
                            WARE_CD
                            RET_REQ_NO
                            REF_STOCK_IDX
                            REF_STOCK_QTY
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            END_PRICE
                            SALE_RATE
                            SALE_PRICE
                            TOT_AMT
                            ETC_AMT
                            OUT_STATUS
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SSV_STOCK_MEM:",
                JSON.stringify(data.mgrSsvStockMemQuery.length),
            );
            return data.mgrSsvStockMemQuery;
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
                    mutation CreateSSV_STOCK_MEM(
                        $stockIdx: Int!
                        $orderCd: String
                        $prodCd: String
                        $size: String
                        $stockQty: Int
                        $stockDatetime: String
                        $stockType: String
                        $ioFlag: String
                        $inType: String
                        $outType: String
                        $reqNo: String
                        $outNo: String
                        $agentCd: String
                        $wareCd: String
                        $retReqNo: String
                        $refStockIdx: Int
                        $refStockQty: Int
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $endPrice: Int
                        $saleRate: Int
                        $salePrice: Int
                        $totAmt: Int
                        $etcAmt: Int
                        $outStatus: String
                    ) {
                        createSSV_STOCK_MEM(
                            STOCK_IDX: $stockIdx
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            SIZE: $size
                            STOCK_QTY: $stockQty
                            STOCK_DATETIME: $stockDatetime
                            STOCK_TYPE: $stockType
                            IO_FLAG: $ioFlag
                            IN_TYPE: $inType
                            OUT_TYPE: $outType
                            REQ_NO: $reqNo
                            OUT_NO: $outNo
                            AGENT_CD: $agentCd
                            WARE_CD: $wareCd
                            RET_REQ_NO: $retReqNo
                            REF_STOCK_IDX: $refStockIdx
                            REF_STOCK_QTY: $refStockQty
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            END_PRICE: $endPrice
                            SALE_RATE: $saleRate
                            SALE_PRICE: $salePrice
                            TOT_AMT: $totAmt
                            ETC_AMT: $etcAmt
                            OUT_STATUS: $outStatus
                        ) {
                            STOCK_IDX
                            ORDER_CD
                            PROD_CD
                            SIZE
                            STOCK_QTY
                            STOCK_DATETIME
                            STOCK_TYPE
                            IO_FLAG
                            IN_TYPE
                            OUT_TYPE
                            REQ_NO
                            OUT_NO
                            AGENT_CD
                            WARE_CD
                            RET_REQ_NO
                            REF_STOCK_IDX
                            REF_STOCK_QTY
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            END_PRICE
                            SALE_RATE
                            SALE_PRICE
                            TOT_AMT
                            ETC_AMT
                            OUT_STATUS
                        }
                    }
                `,
                variables: {
                    stockIdx: argData.STOCK_IDX,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    size: argData.SIZE,
                    stockQty: argData.STOCK_QTY,
                    stockDatetime: argData.STOCK_DATETIME,
                    stockType: argData.STOCK_TYPE,
                    ioFlag: argData.IO_FLAG,
                    inType: argData.IN_TYPE,
                    outType: argData.OUT_TYPE,
                    reqNo: argData.REQ_NO,
                    outNo: argData.OUT_NO,
                    agentCd: argData.AGENT_CD,
                    wareCd: argData.WARE_CD,
                    retReqNo: argData.RET_REQ_NO,
                    refStockIdx: argData.REF_STOCK_IDX,
                    refStockQty: argData.REF_STOCK_QTY,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    endPrice: argData.END_PRICE,
                    saleRate: argData.SALE_RATE,
                    salePrice: argData.SALE_PRICE,
                    totAmt: argData.TOT_AMT,
                    etcAmt: argData.ETC_AMT,
                    outStatus: argData.OUT_STATUS,
                },
            });
            console.log(
                "SSV_STOCK_MEM INSERT:",
                JSON.stringify(data.createSSV_STOCK_MEM),
            );
            return data.createSSV_STOCK_MEM;
        } catch (e) {
            console.log("SSV_STOCK_MEM INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSSV_STOCK_MEM(
                        $updateSsvStockMemId: Int!
                        $stockIdx: Int!
                        $orderCd: String
                        $prodCd: String
                        $size: String
                        $stockQty: Int
                        $stockDatetime: String
                        $stockType: String
                        $ioFlag: String
                        $inType: String
                        $outType: String
                        $reqNo: String
                        $outNo: String
                        $agentCd: String
                        $wareCd: String
                        $retReqNo: String
                        $refStockIdx: Int
                        $refStockQty: Int
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $endPrice: Int
                        $saleRate: Int
                        $salePrice: Int
                        $totAmt: Int
                        $etcAmt: Int
                        $outStatus: String
                    ) {
                        updateSSV_STOCK_MEM(
                            id: $updateSsvStockMemId
                            STOCK_IDX: $stockIdx
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            SIZE: $size
                            STOCK_QTY: $stockQty
                            STOCK_DATETIME: $stockDatetime
                            STOCK_TYPE: $stockType
                            IO_FLAG: $ioFlag
                            IN_TYPE: $inType
                            OUT_TYPE: $outType
                            REQ_NO: $reqNo
                            OUT_NO: $outNo
                            AGENT_CD: $agentCd
                            WARE_CD: $wareCd
                            RET_REQ_NO: $retReqNo
                            REF_STOCK_IDX: $refStockIdx
                            REF_STOCK_QTY: $refStockQty
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            END_PRICE: $endPrice
                            SALE_RATE: $saleRate
                            SALE_PRICE: $salePrice
                            TOT_AMT: $totAmt
                            ETC_AMT: $etcAmt
                            OUT_STATUS: $outStatus
                        ) {
                            id
                            STOCK_IDX
                            ORDER_CD
                            PROD_CD
                            SIZE
                            STOCK_QTY
                            STOCK_DATETIME
                            STOCK_TYPE
                            IO_FLAG
                            IN_TYPE
                            OUT_TYPE
                            REQ_NO
                            OUT_NO
                            AGENT_CD
                            WARE_CD
                            RET_REQ_NO
                            REF_STOCK_IDX
                            REF_STOCK_QTY
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            END_PRICE
                            SALE_RATE
                            SALE_PRICE
                            TOT_AMT
                            ETC_AMT
                            OUT_STATUS
                        }
                    }
                `,
                variables: {
                    updateSsvStockMemId: argData.id,
                    stockIdx: argData.STOCK_IDX,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    size: argData.SIZE,
                    stockQty: argData.STOCK_QTY,
                    stockDatetime: argData.STOCK_DATETIME,
                    stockType: argData.STOCK_TYPE,
                    ioFlag: argData.IO_FLAG,
                    inType: argData.IN_TYPE,
                    outType: argData.OUT_TYPE,
                    reqNo: argData.REQ_NO,
                    outNo: argData.OUT_NO,
                    agentCd: argData.AGENT_CD,
                    wareCd: argData.WARE_CD,
                    retReqNo: argData.RET_REQ_NO,
                    refStockIdx: argData.REF_STOCK_IDX,
                    refStockQty: argData.REF_STOCK_QTY,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    endPrice: argData.END_PRICE,
                    saleRate: argData.SALE_RATE,
                    salePrice: argData.SALE_PRICE,
                    totAmt: argData.TOT_AMT,
                    etcAmt: argData.ETC_AMT,
                    outStatus: argData.OUT_STATUS,
                },
            });
            console.log(
                "SSV_STOCK_MEM UPDATE:",
                JSON.stringify(data.updateSSV_STOCK_MEM),
            );
            return data.updateSSV_STOCK_MEM;
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
                    mutation DeleteSSV_STOCK_MEM($deleteSsvStockMemId: Int!) {
                        deleteSSV_STOCK_MEM(id: $deleteSsvStockMemId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteSsvStockMemId: argData.id,
                },
            });
            console.log(
                "SSV_STOCK_MEM DELETE:",
                JSON.stringify(data.deleteSSV_STOCK_MEM),
            );
            return data.deleteSSV_STOCK_MEM;
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
                    mutation MgrSsvStockMemDeletes(
                        $ids: [InputMgrSsvStockMemDeletes!]!
                    ) {
                        mgrSsvStockMemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SSV_STOCK_MEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
