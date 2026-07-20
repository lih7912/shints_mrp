/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSSV_STOCK_REQ {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySSV_STOCK_REQ {
                        allQuerySSV_STOCK_REQ {
                            id
                            REQ_NO
                            AGENT_CD
                            REQ_DATE
                            ORDER_CD
                            PROD_CD
                            SIZE
                            REQ_QTY
                            END_PRICE
                            SALE_RATE
                            SALE_PRICE
                            TOT_AMT
                            ETC_AMT
                            OUT_TYPE
                            OUT_STATUS
                            STOCK_TYPE
                            WARE_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            out_qty
                            out_amt
                            not_qty
                            not_amt
                            not_reason
                        }
                    }
                `,
            });
            console.log(
                "SSV_STOCK_REQ:",
                JSON.stringify(data.allQuerySSV_STOCK_REQ.length),
            );
            return data.allQuerySSV_STOCK_REQ;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParam(qrySearchString, qryStatus) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrSsvStockReqQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrSsvStockReqQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            REQ_NO
                            AGENT_CD
                            REQ_DATE
                            ORDER_CD
                            PROD_CD
                            SIZE
                            REQ_QTY
                            END_PRICE
                            SALE_RATE
                            SALE_PRICE
                            TOT_AMT
                            ETC_AMT
                            OUT_TYPE
                            OUT_STATUS
                            STOCK_TYPE
                            WARE_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            out_qty
                            out_amt
                            not_qty
                            not_amt
                            not_reason
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SSV_STOCK_REQ:",
                JSON.stringify(data.mgrSsvStockReqQuery.length),
            );
            return data.mgrSsvStockReqQuery;
        } catch (e) {
            return e;
        }
    }

    async createData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation CreateSSV_STOCK_REQ(
                        $reqNo: String
                        $agentCd: String
                        $reqDate: String
                        $orderCd: String
                        $prodCd: String
                        $size: String
                        $reqQty: Int
                        $endPrice: Int
                        $saleRate: Int
                        $salePrice: Int
                        $totAmt: Int
                        $etcAmt: Int
                        $outType: String
                        $outStatus: String
                        $stockType: String
                        $wareCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $outQty: Int
                        $outAmt: Int
                        $notQty: Int
                        $notAmt: Int
                        $notReason: String
                    ) {
                        createSSV_STOCK_REQ(
                            REQ_NO: $reqNo
                            AGENT_CD: $agentCd
                            REQ_DATE: $reqDate
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            SIZE: $size
                            REQ_QTY: $reqQty
                            END_PRICE: $endPrice
                            SALE_RATE: $saleRate
                            SALE_PRICE: $salePrice
                            TOT_AMT: $totAmt
                            ETC_AMT: $etcAmt
                            OUT_TYPE: $outType
                            OUT_STATUS: $outStatus
                            STOCK_TYPE: $stockType
                            WARE_CD: $wareCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            out_qty: $outQty
                            out_amt: $outAmt
                            not_qty: $notQty
                            not_amt: $notAmt
                            not_reason: $notReason
                        ) {
                            REQ_NO
                            AGENT_CD
                            REQ_DATE
                            ORDER_CD
                            PROD_CD
                            SIZE
                            REQ_QTY
                            END_PRICE
                            SALE_RATE
                            SALE_PRICE
                            TOT_AMT
                            ETC_AMT
                            OUT_TYPE
                            OUT_STATUS
                            STOCK_TYPE
                            WARE_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            out_qty
                            out_amt
                            not_qty
                            not_amt
                            not_reason
                        }
                    }
                `,
                variables: {
                    reqNo: argData.REQ_NO,
                    agentCd: argData.AGENT_CD,
                    reqDate: argData.REQ_DATE,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    size: argData.SIZE,
                    reqQty: argData.REQ_QTY,
                    endPrice: argData.END_PRICE,
                    saleRate: argData.SALE_RATE,
                    salePrice: argData.SALE_PRICE,
                    totAmt: argData.TOT_AMT,
                    etcAmt: argData.ETC_AMT,
                    outType: argData.OUT_TYPE,
                    outStatus: argData.OUT_STATUS,
                    stockType: argData.STOCK_TYPE,
                    wareCd: argData.WARE_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    outQty: argData.out_qty,
                    outAmt: argData.out_amt,
                    notQty: argData.not_qty,
                    notAmt: argData.not_amt,
                    notReason: argData.not_reason,
                },
            });
            console.log(
                "SSV_STOCK_REQ INSERT:",
                JSON.stringify(data.createSSV_STOCK_REQ),
            );
            return data.createSSV_STOCK_REQ;
        } catch (e) {
            console.log("SSV_STOCK_REQ INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateSSV_STOCK_REQ(
                        $updateSsvStockReqId: Int!
                        $reqNo: String
                        $agentCd: String
                        $reqDate: String
                        $orderCd: String
                        $prodCd: String
                        $size: String
                        $reqQty: Int
                        $endPrice: Int
                        $saleRate: Int
                        $salePrice: Int
                        $totAmt: Int
                        $etcAmt: Int
                        $outType: String
                        $outStatus: String
                        $stockType: String
                        $wareCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $outQty: Int
                        $outAmt: Int
                        $notQty: Int
                        $notAmt: Int
                        $notReason: String
                    ) {
                        updateSSV_STOCK_REQ(
                            id: $updateSsvStockReqId
                            REQ_NO: $reqNo
                            AGENT_CD: $agentCd
                            REQ_DATE: $reqDate
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            SIZE: $size
                            REQ_QTY: $reqQty
                            END_PRICE: $endPrice
                            SALE_RATE: $saleRate
                            SALE_PRICE: $salePrice
                            TOT_AMT: $totAmt
                            ETC_AMT: $etcAmt
                            OUT_TYPE: $outType
                            OUT_STATUS: $outStatus
                            STOCK_TYPE: $stockType
                            WARE_CD: $wareCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            out_qty: $outQty
                            out_amt: $outAmt
                            not_qty: $notQty
                            not_amt: $notAmt
                            not_reason: $notReason
                        ) {
                            id
                            REQ_NO
                            AGENT_CD
                            REQ_DATE
                            ORDER_CD
                            PROD_CD
                            SIZE
                            REQ_QTY
                            END_PRICE
                            SALE_RATE
                            SALE_PRICE
                            TOT_AMT
                            ETC_AMT
                            OUT_TYPE
                            OUT_STATUS
                            STOCK_TYPE
                            WARE_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            out_qty
                            out_amt
                            not_qty
                            not_amt
                            not_reason
                        }
                    }
                `,
                variables: {
                    updateSsvStockReqId: argData.id,
                    reqNo: argData.REQ_NO,
                    agentCd: argData.AGENT_CD,
                    reqDate: argData.REQ_DATE,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    size: argData.SIZE,
                    reqQty: argData.REQ_QTY,
                    endPrice: argData.END_PRICE,
                    saleRate: argData.SALE_RATE,
                    salePrice: argData.SALE_PRICE,
                    totAmt: argData.TOT_AMT,
                    etcAmt: argData.ETC_AMT,
                    outType: argData.OUT_TYPE,
                    outStatus: argData.OUT_STATUS,
                    stockType: argData.STOCK_TYPE,
                    wareCd: argData.WARE_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    outQty: argData.out_qty,
                    outAmt: argData.out_amt,
                    notQty: argData.not_qty,
                    notAmt: argData.not_amt,
                    notReason: argData.not_reason,
                },
            });
            console.log(
                "SSV_STOCK_REQ UPDATE:",
                JSON.stringify(data.updateSSV_STOCK_REQ),
            );
            return data.updateSSV_STOCK_REQ;
        } catch (e) {
            return e;
        }
    }

    async deleteData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation DeleteSSV_STOCK_REQ($deleteSsvStockReqId: Int!) {
                        deleteSSV_STOCK_REQ(id: $deleteSsvStockReqId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteSsvStockReqId: argData.id,
                },
            });
            console.log(
                "SSV_STOCK_REQ DELETE:",
                JSON.stringify(data.deleteSSV_STOCK_REQ),
            );
            return data.deleteSSV_STOCK_REQ;
        } catch (e) {
            return e;
        }
    }

    async deletesData(argDatas) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
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
                    mutation MgrSsvStockReqDeletes(
                        $ids: [InputMgrSsvStockReqDeletes!]!
                    ) {
                        mgrSsvStockReqDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SSV_STOCK_REQ DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
